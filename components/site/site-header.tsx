"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type NavLink = { href: string; label: string; hint?: string; external?: boolean };
type NavGroup = { label: string; items: NavLink[] };

/**
 * Grouped by what a visitor came to do, not by how the site is built.
 * "Make An Online Donation" used to sit in the nav beside a "Donate Now"
 * button — the same action twice. It now lives under Ways to Give.
 */
const groups: NavGroup[] = [
  {
    label: "Our Work",
    items: [
      { href: "/feeding-the-poor-fund", label: "Feeding the Poor Fund", hint: "Meals, farms and food security" },
      { href: "/emergency-relief-fund", label: "Emergency Relief Fund", hint: "Disasters, attacks and medical crises" },
      { href: "/educational-content-fund", label: "Educational Content Fund", hint: "Catholic teaching and resources" },
      { href: "/faith-in-action", label: "Stories from the Field", hint: "News from the people you support" },
    ],
  },
  {
    label: "Ways to Give",
    items: [
      { href: "/donate", label: "Donate Online", hint: "One-time or monthly, by card or PayPal" },
      { href: "/double-your-donation", label: "Double Your Donation", hint: "Employer matching" },
      { href: "/donor-advised-funds", label: "Donor Advised Funds", hint: "Give through your DAF" },
      { href: "/donate-with-crypto", label: "Donate with Crypto", hint: "Bitcoin, Ethereum and more" },
    ],
  },
  {
    label: "Faith Resources",
    items: [
      { href: "/daily-readings", label: "Daily Readings", hint: "Today's Mass readings" },
      { href: "/daily-readings-of-the-catholic-church", label: "Saint of the Day" },
      { href: "/news-of-the-catholic-church", label: "Catholic News" },
      { href: "https://www.bibletrivia.ai", label: "Bible Trivia", hint: "Read, study and quiz the Bible", external: true },
      { href: "https://masstimesnearme.org", label: "Mass Times Near Me", hint: "Find Mass anywhere, free", external: true },
    ],
  },
];

const topLinks: NavLink[] = [{ href: "/contact-us", label: "Contact" }];

function ItemLink({ it, onClick, className }: { it: NavLink; onClick?: () => void; className: string }) {
  if (it.external) {
    return (
      <a href={it.href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className}>
        <span className="block">{it.label} <span aria-hidden>↗</span></span>
        {it.hint && <span className="block text-xs text-neutral-500">{it.hint}</span>}
      </a>
    );
  }
  return (
    <Link href={it.href} onClick={onClick} className={className}>
      <span className="block">{it.label}</span>
      {it.hint && <span className="block text-xs text-neutral-500">{it.hint}</span>}
    </Link>
  );
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-cream-50/95 backdrop-blur-md shadow-sm"
          : "bg-cream-50"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-cream-50"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="The Catholic Connect Foundation home">
          <Image
            src="/branding/logo-icon.jpg"
            alt=""
            width={48}
            height={48}
            priority
            className="h-12 w-12 rounded-full object-cover"
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-base font-semibold text-neutral-900">
              The Catholic Connect
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
              Foundation
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {groups.map((g, gi) => (
            <div
              key={g.label}
              className="relative"
              onMouseEnter={() => setOpenGroup(gi)}
              onMouseLeave={() => setOpenGroup((o) => (o === gi ? null : o))}
            >
              <button
                type="button"
                onClick={() => setOpenGroup((o) => (o === gi ? null : gi))}
                onKeyDown={(e) => e.key === "Escape" && setOpenGroup(null)}
                className={`flex items-center gap-1.5 py-2 text-sm font-medium transition ${
                  openGroup === gi ? "text-brand-600" : "text-neutral-800 hover:text-brand-600"
                }`}
                aria-expanded={openGroup === gi}
                aria-haspopup="true"
              >
                {g.label}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className={`transition ${openGroup === gi ? "rotate-180" : ""}`}>
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              {openGroup === gi && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="w-80 rounded-xl border border-neutral-200 bg-cream-50 p-2 shadow-xl">
                    {g.items.map((it) => (
                      <ItemLink
                        key={it.href}
                        it={it}
                        onClick={() => setOpenGroup(null)}
                        className="block rounded-lg px-4 py-2.5 text-sm text-neutral-900 hover:bg-brand-50 transition"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {topLinks.map((it) => (
            <Link key={it.href} href={it.href} className="py-2 text-sm font-medium text-neutral-800 hover:text-brand-600 transition">
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/donate"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600 hover:shadow-md"
          >
            Donate
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-md text-neutral-800 hover:bg-neutral-100"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-cream-50">
          <div className="space-y-1 px-6 py-4">
            {groups.map((g) => (
              <details key={g.label} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-800 hover:bg-neutral-100">
                  {g.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition group-open:rotate-180" aria-hidden>
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </summary>
                <div className="ml-3 mt-1 border-l border-neutral-200 pl-3">
                  {g.items.map((it) => (
                    <ItemLink
                      key={it.href}
                      it={it}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-neutral-800 hover:bg-neutral-100"
                    />
                  ))}
                </div>
              </details>
            ))}
            {topLinks.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-800 hover:bg-neutral-100"
              >
                {it.label}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setMobileOpen(false)}
              className="mt-2 block rounded-full bg-brand-500 px-6 py-3 text-center text-sm font-semibold text-white"
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
