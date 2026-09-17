"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

type Props = {
  campaign?: string;
  defaultInterval?: "o" | "w" | "m";
  amount?: number;
  height?: number;
  /**
   * Rendered width of the form, in px. Donorbox renders its form at a fixed
   * ~490px and left-aligns it, so a wider iframe only adds blank space beside
   * it — 500 is the width their own embed snippet uses. The wrapper owns the
   * width: an iframe's intrinsic width is 300px,
   * and inside a shrink-to-fit flex child `width: 100%` collapses to exactly
   * that — which is how every form on the site ended up a 302px strip.
   */
  width?: number;
  title?: string;
  /**
   * Where on the site this widget sits. Sent with every event so the funnel
   * can be read per placement — the live data shows the homepage widget
   * converting at 0.12% against 0.97% on /donate/, and without this label
   * those two are indistinguishable in GA4.
   */
  placement: string;
  /**
   * Mount the iframe only when the wrapper scrolls near the viewport. The
   * Donorbox embed pulls Stripe, hCaptcha, Google Pay, Maps, reCAPTCHA and
   * PayPal — about 6 MB and ~180 ms of main-thread time — so a form below
   * the fold should not cost that on page load.
   */
  lazy?: boolean;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function track(event: string, params: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export default function DonorboxEmbed({
  campaign = "the-catholic-connect-foundation",
  defaultInterval = "m",
  amount = 20,
  height = 1100,
  width = 500,
  title = "Donate to The Catholic Connect Foundation",
  placement,
  lazy = false,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [armed, setArmed] = useState(!lazy);

  // The homepage launcher hands the visitor's choice over in the URL so the
  // form opens on the amount and cadence they already picked.
  const search = useSearchParams();
  const qAmount = Number(search?.get("amount"));
  const qInterval = search?.get("interval");
  const interval = qInterval === "o" || qInterval === "m" || qInterval === "w" ? qInterval : defaultInterval;
  const chosen = Number.isFinite(qAmount) && qAmount > 0 ? qAmount : amount;

  const params = new URLSearchParams();
  params.set("default_interval", interval);
  if (chosen) params.set("amount", String(chosen));
  const src = `https://donorbox.org/embed/${campaign}?${params.toString()}`;

  // Lazy forms arm when they come within 600px of the viewport.
  useEffect(() => {
    if (armed) return;
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") { setArmed(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { setArmed(true); io.disconnect(); } },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [armed]);

  // 1. Did the widget actually come into view? A donation form below a 1100px
  //    fold that nobody scrolls to is not an abandoned donation.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    let fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !fired) {
            fired = true;
            track("donation_widget_viewed", { placement, campaign });
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [placement, campaign]);

  // 2. Did it ever load? A third-party iframe blocked by an ad blocker, a
  //    consent gate or a slow network is silent — it looks exactly like a
  //    donor who changed their mind.
  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => {
      if (!loaded) {
        setFailed(true);
        track("donation_widget_failed", { placement, campaign, reason: "timeout" });
      }
    }, 8000);
    return () => clearTimeout(t);
  }, [armed, loaded, placement, campaign]);

  // 3. Donorbox posts progress messages from inside the iframe. Without this
  //    the checkout is a black box and "2,290 started, 8 finished" cannot be
  //    attributed to any particular step.
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (!/donorbox\.org$/.test(new URL(e.origin).hostname)) return;
      const d = e.data as Record<string, unknown> | string;
      const kind = typeof d === "string" ? d : (d?.type ?? d?.event ?? "message");
      track("donation_widget_message", { placement, campaign, donorbox_event: String(kind) });
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [placement, campaign]);

  return (
    <div ref={wrapRef} className="w-full" style={{ maxWidth: `${width}px` }}>
      {armed && (
        <Script
          src="https://donorbox.org/widget.js"
          strategy="afterInteractive"
          // @ts-expect-error — non-standard Donorbox attribute
          paypalexpress="true"
        />
      )}
      <iframe
        ref={frameRef}
        src={armed ? src : undefined}
        title={title}
        name="donorbox"
        allow="payment"
        seamless
        scrolling="no"
        onLoad={() => {
          setLoaded(true);
          track("donation_widget_loaded", { placement, campaign });
        }}
        className="block w-full rounded-2xl border border-neutral-200 bg-cream-50 shadow-sm"
        style={{
          width: "100%",
          minWidth: "250px",
          maxHeight: "none",
          minHeight: `${height}px`,
        }}
      />
      {failed && (
        // Never leave a donor with a blank rectangle — give them a route out.
        <p className="mt-3 max-w-[500px] text-sm text-neutral-600">
          Having trouble with the form?{" "}
          <a
            className="underline"
            href={`https://donorbox.org/${campaign}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("donation_fallback_clicked", { placement, campaign })}
          >
            Open the secure donation page directly
          </a>
          .
        </p>
      )}
    </div>
  );
}
