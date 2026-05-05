import Image from "next/image";
import Link from "next/link";

const initiatives = [
  { href: "/feeding-the-poor-fund", label: "Feeding the Poor Fund" },
  { href: "/emergency-relief-fund", label: "Emergency Relief Fund" },
  { href: "/educational-content-fund", label: "Educational Content Fund" },
  { href: "/donor-advised-funds", label: "Donor Advised Funds" },
];

const waysToGive = [
  { href: "/make-an-online-donation", label: "Make an Online Donation" },
  { href: "/double-your-donation", label: "Double Your Donation" },
  { href: "/donate-with-crypto", label: "Donate with Crypto" },
  { href: "/donor-advised-funds", label: "Donor Advised Funds" },
];

const navigate = [
  { href: "/", label: "Home" },
  { href: "/faith-in-action", label: "Stories & News" },
  { href: "/news-of-the-catholic-church", label: "Catholic News" },
  { href: "/daily-readings-of-the-catholic-church", label: "Daily Readings" },
  { href: "/contact-us", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

const social = [
  {
    href: "https://facebook.com/catholicconnectfoundation",
    label: "Facebook",
    abbr: "FB",
  },
  {
    href: "https://instagram.com/catholicconnect.care",
    label: "Instagram",
    abbr: "IG",
  },
  {
    href: "https://x.com/catholiccaring",
    label: "X (Twitter)",
    abbr: "X",
  },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-neutral-900 text-white">
      {/* Masthead */}
      <div className="border-b border-white/15">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-12 lg:flex-row lg:items-end lg:justify-between lg:px-12">
          <div className="flex items-start gap-5">
            <Image
              src="/branding/logo-icon.jpg"
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-cover ring-1 ring-white/20"
            />
            <div>
              <span className="small-caps text-white/55 block">The</span>
              <span className="font-editorial text-3xl md:text-4xl text-white block leading-[1] mt-1">
                Catholic Connect <em className="italic font-light">Foundation</em>
              </span>
              <span className="small-caps text-white/45 mt-3 block">
                A 501(c)(3) Catholic charity
              </span>
            </div>
          </div>
          <div className="lg:max-w-md">
            <p className="font-editorial italic text-lg leading-relaxed text-white/75">
              Supporting Catholic priests, nuns, orphanages, and lay-led ministries
              in their humanitarian and charitable work — across the globe.
            </p>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-y-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-12 lg:px-12">
        <div className="lg:col-span-3">
          <span className="small-caps text-white/55">§ 01 — Initiatives</span>
          <ul className="mt-5 space-y-3">
            {initiatives.map((it) => (
              <li key={it.href}>
                <Link href={it.href} className="font-editorial text-[17px] text-white/85 link-editorial hover:text-white">
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <span className="small-caps text-white/55">§ 02 — Ways to Give</span>
          <ul className="mt-5 space-y-3">
            {waysToGive.map((it) => (
              <li key={it.href}>
                <Link href={it.href} className="font-editorial text-[17px] text-white/85 link-editorial hover:text-white">
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <span className="small-caps text-white/55">§ 03 — Navigate</span>
          <ul className="mt-5 space-y-3">
            {navigate.map((it) => (
              <li key={it.href}>
                <Link href={it.href} className="font-editorial text-[17px] text-white/85 link-editorial hover:text-white">
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <span className="small-caps text-white/55">§ 04 — Get in Touch</span>
          <address className="mt-5 not-italic">
            <a
              href="tel:+18322417969"
              className="font-editorial text-2xl text-white block leading-tight link-editorial"
            >
              +1 (832) 241-7969
            </a>
            <span className="small-caps text-white/55 mt-1 block">Call or text</span>
            <a
              href="mailto:contact@catholicconnect.care"
              className="font-editorial italic text-[17px] text-white/85 block mt-5 link-editorial"
            >
              contact@catholicconnect.care
            </a>
            <span className="block mt-5 text-white/75 text-sm leading-relaxed">
              59 Acorn Cluster Ct.
              <br />
              The Woodlands, TX 77381
            </span>
          </address>

          <div className="mt-7 flex gap-3">
            {social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center border border-white/30 text-white/85 small-caps hover:bg-white hover:text-ink transition"
              >
                {s.abbr}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Colophon */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-6 py-7 small-caps text-white/55 sm:flex-row sm:items-center sm:justify-between lg:px-12">
          <span>
            Volume V · No. 04 · {year} · Houston IT Developers LLC
          </span>
          <span className="flex items-center gap-3">
            <span aria-hidden className="block h-px w-8 bg-white/30" />
            <em className="font-editorial italic normal-case tracking-normal text-white/75">
              Ad maiorem Dei gloriam.
            </em>
            <span aria-hidden className="block h-px w-8 bg-white/30" />
          </span>
        </div>
      </div>
    </footer>
  );
}
