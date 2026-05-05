"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const initiatives = [
  { href: "/feeding-the-poor-fund", label: "Feeding the Poor Fund" },
  { href: "/emergency-relief-fund", label: "Emergency Relief Fund" },
  { href: "/educational-content-fund", label: "Educational Content Fund" },
  { href: "/donor-advised-funds", label: "Donor Advised Funds" },
];

const navItems = [
  { href: "/make-an-online-donation", label: "Donate" },
  { href: "/faith-in-action", label: "Stories" },
  { href: "/contact-us", label: "Contact" },
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
        scrolled ? "bg-paper/95 backdrop-blur-md" : "bg-paper"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>

      {/* Top metadata strip */}
      <div className="hidden border-b border-neutral-200 bg-paper md:block">
        <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between px-6 text-[10.5px] uppercase tracking-[0.22em] text-neutral-500 lg:px-12">
          <span>Est. 2019 · The Woodlands, TX · 501(c)(3)</span>
          <span className="flex items-center gap-5">
            <a href="tel:+18322417969" className="hover:text-ink transition">+1 (832) 241-7969</a>
            <span className="text-neutral-300">·</span>
            <a href="mailto:contact@catholicconnect.care" className="hover:text-ink transition">contact@catholicconnect.care</a>
          </span>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex h-20 max-w-[1400px] items-center gap-10 px-6 lg:px-12">
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="The Catholic Connect Foundation home">
          <Image
            src="/branding/logo-icon.jpg"
            alt=""
            width={44}
            height={44}
            priority
            className="h-11 w-11 rounded-full object-cover ring-1 ring-neutral-200"
          />
          <span className="hidden flex-col leading-[1.1] sm:flex">
            <span className="font-editorial text-[17px] font-medium text-ink">
              The Catholic Connect
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
              Foundation
            </span>
          </span>
        </Link>

        <span aria-hidden className="hidden lg:block h-8 w-px bg-neutral-300" />

        <nav className="hidden flex-1 lg:flex items-center gap-8" aria-label="Primary">
          <div
            className="relative"
            onMouseEnter={() => setInitiativesOpen(true)}
            onMouseLeave={() => setInitiativesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setInitiativesOpen((o) => !o)}
              className="small-caps text-neutral-700 hover:text-ink transition flex items-center gap-2"
              aria-expanded={initiativesOpen}
              aria-haspopup="true"
            >
              Initiatives
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
                <path d="M1.5 3L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
            {initiativesOpen && (
              <div className="absolute left-0 top-full pt-3 z-50">
                <div className="w-80 border border-neutral-200 bg-paper p-1 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.15)]">
                  {initiatives.map((it, i) => (
                    <Link
                      key={it.href}
                      href={it.href}
                      className="flex items-center gap-3 px-5 py-3.5 text-[15px] text-neutral-800 hover:bg-paper-warm hover:text-ink transition"
                    >
                      <span className="font-editorial italic text-brand-500 text-sm tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-editorial">{it.label}</span>
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
              className="small-caps text-neutral-700 hover:text-ink transition"
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <Link
            href="/donate"
            className="hidden md:inline-flex items-center gap-3 bg-ink px-6 py-3 small-caps text-paper hover:bg-brand-500 transition-colors"
          >
            Donate Now
            <span aria-hidden className="block h-px w-5 bg-current" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden flex h-10 w-10 items-center justify-center text-ink hover:bg-neutral-100"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                <path d="M3 7h16M3 15h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-neutral-200" />

      {mobileOpen && (
        <div className="lg:hidden border-b border-neutral-200 bg-paper">
          <div className="space-y-1 px-6 py-5">
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between py-3 small-caps text-ink">
                Initiatives
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="transition group-open:rotate-180" aria-hidden>
                  <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </summary>
              <div className="ml-3 mt-1 border-l border-neutral-300 pl-4 pb-2">
                {initiatives.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2.5 font-editorial text-[15px] text-neutral-700 hover:text-ink"
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
                className="block py-3 small-caps text-ink"
              >
                {it.label}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setMobileOpen(false)}
              className="mt-4 block bg-ink px-6 py-4 text-center small-caps text-paper"
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
