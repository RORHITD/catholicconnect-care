"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const initiatives = [
  { href: "/feeding-the-poor-fund", label: "Feeding the Poor Fund" },
  { href: "/emergency-relief-fund", label: "Emergency Relief Fund" },
  { href: "/educational-content-fund", label: "Educational Content Fund" },
  { href: "/donor-advised-funds", label: "Donor Advised Funds" },
];

const navItems = [
  { href: "/make-an-online-donation", label: "Make An Online Donation" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/faith-in-action", label: "Stories & News" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [initiativesOpen, setInitiativesOpen] = useState(false);

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
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-burgundy-700 focus:px-4 focus:py-2 focus:text-cream-50"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="The Catholic Connect Foundation home">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-burgundy-700 text-cream-50 font-display text-xl font-bold ring-2 ring-gold-400 ring-offset-2 ring-offset-cream-50">
            C
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-base font-semibold text-burgundy-800">
              The Catholic Connect
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-stone-warm-600">
              Foundation
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          <div
            className="relative"
            onMouseEnter={() => setInitiativesOpen(true)}
            onMouseLeave={() => setInitiativesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setInitiativesOpen((o) => !o)}
              className="flex items-center gap-1.5 text-sm font-medium text-stone-warm-800 hover:text-burgundy-700 transition"
              aria-expanded={initiativesOpen}
              aria-haspopup="true"
            >
              Our Initiatives
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {initiativesOpen && (
              <div className="absolute left-0 top-full pt-3">
                <div className="w-72 rounded-xl border border-stone-warm-200 bg-cream-50 p-2 shadow-lg">
                  {initiatives.map((it) => (
                    <Link
                      key={it.href}
                      href={it.href}
                      className="block rounded-lg px-4 py-3 text-sm text-stone-warm-800 hover:bg-burgundy-50 hover:text-burgundy-800 transition"
                    >
                      {it.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {navItems.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="text-sm font-medium text-stone-warm-800 hover:text-burgundy-700 transition"
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/donate"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-burgundy-700 px-6 py-2.5 text-sm font-semibold text-cream-50 shadow-sm transition hover:bg-burgundy-800 hover:shadow-md"
          >
            Donate Now
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-md text-stone-warm-800 hover:bg-stone-warm-100"
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
        <div className="lg:hidden border-t border-stone-warm-200 bg-cream-50">
          <div className="space-y-1 px-6 py-4">
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-stone-warm-800 hover:bg-stone-warm-100">
                Our Initiatives
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition group-open:rotate-180" aria-hidden>
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </summary>
              <div className="ml-3 mt-1 border-l border-stone-warm-200 pl-3">
                {initiatives.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-stone-warm-700 hover:bg-stone-warm-100"
                  >
                    {it.label}
                  </Link>
                ))}
              </div>
            </details>
            {navItems.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-stone-warm-800 hover:bg-stone-warm-100"
              >
                {it.label}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setMobileOpen(false)}
              className="mt-2 block rounded-full bg-burgundy-700 px-6 py-3 text-center text-sm font-semibold text-cream-50"
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
