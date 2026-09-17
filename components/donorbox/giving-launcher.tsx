"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * The homepage's giving card, without the Donorbox iframe.
 *
 * The embedded form on the homepage converted at 0.12% (versus 0.97% on
 * /donate/) while costing every visitor ~6 MB of payment SDKs — Stripe,
 * hCaptcha, Google Pay, Maps, reCAPTCHA, PayPal — before they had read a
 * word. This card captures the two choices that matter and carries them to
 * /donate/, where the real form opens pre-set. Nothing loads here but HTML.
 */
const AMOUNTS = [10, 20, 30, 50, 100, 250];

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export default function GivingLauncher() {
  const [interval, setInterval] = useState<"m" | "o">("m");
  const [amount, setAmount] = useState<number>(20);

  const href = `/donate/?amount=${amount}&interval=${interval}#give`;
  const track = () => {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "donation_intent", placement: "home-hero", amount, interval });
    } catch {}
  };

  return (
    <div className="w-full max-w-[532px] rounded-2xl bg-cream-50 p-6 text-neutral-900 shadow-2xl ring-1 ring-black/10 sm:p-7">
      <p className="text-sm font-semibold">Give securely</p>
      <p className="mt-0.5 text-xs text-neutral-600">501(c)(3) charity · gifts are tax-deductible</p>

      <div className="mt-5 grid grid-cols-2 gap-2" role="group" aria-label="Giving frequency">
        {(["m", "o"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setInterval(v)}
            aria-pressed={interval === v}
            className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
              interval === v
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-neutral-300 bg-white text-neutral-800 hover:border-brand-400"
            }`}
          >
            {v === "m" ? "Monthly" : "One-time"}
          </button>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2" role="group" aria-label="Amount">
        {AMOUNTS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setAmount(a)}
            aria-pressed={amount === a}
            className={`rounded-lg border px-3 py-3 text-base font-semibold tabular-nums transition ${
              amount === a
                ? "border-brand-600 bg-brand-50 text-brand-700 ring-1 ring-brand-600"
                : "border-neutral-300 bg-white text-neutral-800 hover:border-brand-400"
            }`}
          >
            ${a}
          </button>
        ))}
      </div>

      <Link
        href={href}
        onClick={track}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
      >
        Continue to secure donation
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M3 7h8m0 0L8 4m3 3-3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </Link>
      <p className="mt-3 text-center text-xs text-neutral-500">Card, PayPal, Google Pay · change or cancel monthly gifts any time</p>
    </div>
  );
}
