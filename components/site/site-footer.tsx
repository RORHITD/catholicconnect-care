import Image from "next/image";
import Link from "next/link";

const ourWork: { href: string; label: string; external?: boolean }[] = [
  { href: "/feeding-the-poor-fund", label: "Feeding the Poor Fund" },
  { href: "/emergency-relief-fund", label: "Emergency Relief Fund" },
  { href: "/educational-content-fund", label: "Educational Content Fund" },
  { href: "/faith-in-action", label: "Stories from the Field" },
];

const faithResources: { href: string; label: string; external?: boolean }[] = [
  { href: "/daily-readings", label: "Daily Readings" },
  { href: "/daily-readings-of-the-catholic-church", label: "Saint of the Day" },
  { href: "/news-of-the-catholic-church", label: "Catholic News" },
];

const waysToDonate = [
  { href: "/donate", label: "Donate Online" },
  { href: "/double-your-donation", label: "Double Your Donation" },
  { href: "/donate-with-crypto", label: "Donate with Crypto" },
  { href: "/donor-advised-funds", label: "Donor Advised Funds" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-neutral-900 text-cream-100">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/branding/logo-icon.jpg"
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <span className="text-base font-semibold text-white">
                The Catholic Connect<br />Foundation
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-cream-100/80">
              Supporting Catholic humanitarian and charitable causes across the globe.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://facebook.com/catholicconnectfoundation"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 hover:bg-brand-600 transition"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/catholicconnect.care"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 hover:bg-brand-600 transition"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4a3.7 3.7 0 0 1-1.4-.9 3.7 3.7 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1C2.6 8.5 2.6 8.9 2.6 12s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1a3.5 3.5 0 0 0-.8-1.3 3.5 3.5 0 0 0-1.3-.8c-.4-.2-1-.3-2.1-.4C15.5 4 15.1 4 12 4Zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.2-2.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
                </svg>
              </a>
              <a
                href="https://x.com/catholiccaring"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 hover:bg-brand-600 transition"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.244 2H21l-6.527 7.46L22 22h-6.84l-4.737-6.197L4.8 22H2.04l6.974-7.97L2 2h6.91l4.286 5.668L18.244 2Zm-1.198 18.18h1.74L7.05 3.74H5.18l11.866 16.44Z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-cream-50">Our Work</h3>
            <ul className="mt-4 space-y-2.5">
              {ourWork.map((it) =>
                it.external ? (
                  <li key={it.label}>
                    <a href={it.href} target="_blank" rel="noopener noreferrer" className="text-sm text-cream-100/80 hover:text-brand-400 transition">
                      {it.label} ↗
                    </a>
                  </li>
                ) : (
                  <li key={it.label}>
                    <Link href={it.href} className="text-sm text-cream-100/80 hover:text-brand-400 transition">
                      {it.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-cream-50">Ways to Give</h3>
            <ul className="mt-4 space-y-2.5">
              {waysToDonate.map((it) => (
                <li key={it.label}>
                  <Link
                    href={it.href}
                    className="text-sm text-cream-100/80 hover:text-brand-400 transition"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-cream-50">Faith Resources</h3>
            <ul className="mt-4 space-y-2.5">
              {faithResources.map((it) =>
                it.external ? (
                  <li key={it.label}>
                    <a
                      href={it.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-cream-100/80 hover:text-brand-400 transition"
                    >
                      {it.label} ↗
                    </a>
                  </li>
                ) : (
                  <li key={it.label}>
                    <Link href={it.href} className="text-sm text-cream-100/80 hover:text-brand-400 transition">
                      {it.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-cream-50">Contact Us</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream-100/80">
              <li>
                <a href="tel:+18322417969" className="hover:text-brand-400 transition">
                  Call or Text: +1 (832) 241-7969
                </a>
              </li>
              <li>The Woodlands, TX 77381</li>
              <li>
                <a href="mailto:contact@catholicconnect.care" className="hover:text-brand-400 transition">
                  contact@catholicconnect.care
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-1.5 text-brand-400 hover:text-brand-300 transition"
                >
                  Send us a message
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M3 6h6m0 0L6 3m3 3L6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-neutral-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-cream-100/60">
            Copyright © {new Date().getFullYear()} The Catholic Connect Foundation ·{" "}
            <a
              href="https://ameliasagent.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-400 transition"
            >
              Built with Amelia&apos;s Agent
            </a>
          </p>
          <Link href="/privacy-policy" className="text-xs text-cream-100/60 hover:text-brand-400 transition">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
