import type { Metadata } from "next";
import Link from "next/link";
import DonorboxEmbed from "@/components/donorbox/donorbox-embed";
import Testimonials from "@/components/sections/testimonials";

export const metadata: Metadata = {
  title: "Donate With Crypto",
  description:
    "Donate cryptocurrency to The Catholic Connect Foundation — Bitcoin, Ethereum, and dozens of other coins. A tax-efficient way to support our mission.",
};

const cryptos = ["Bitcoin (BTC)", "Ethereum (ETH)", "USDC", "USDT", "Solana (SOL)", "Dogecoin (DOGE)"];

export default function DonateWithCryptoPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-burgundy-900 py-20 text-cream-50 lg:py-28">
        <div className="absolute inset-0 opacity-[0.05]" aria-hidden>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="crypto-cross" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M40 20v40M20 40h40" stroke="currentColor" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#crypto-cross)" />
          </svg>
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">
              Crypto Giving
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
              Donate With Crypto
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-100/90">
              Cryptocurrency donations let you support our mission tax-efficiently. We accept Bitcoin, Ethereum, USDC, and many other coins through a secure processor.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-2 max-w-md text-sm text-cream-100/85">
              {cryptos.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center lg:justify-end">
            <DonorboxEmbed />
          </div>
        </div>
      </section>

      <section className="bg-stone-warm-50 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[2fr_3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy-700">
                Why crypto?
              </p>
              <h2 className="mt-4 font-display text-3xl text-burgundy-900 md:text-4xl">
                Donor angels help us keep advancing our mission
              </h2>
            </div>
            <div className="prose-content">
              <p>
                Donating crypto directly to a 501(c)(3) nonprofit can be one of the most tax-efficient ways to give. You don't pay capital gains tax on appreciated crypto when you donate it directly, and you may be eligible for a charitable deduction for the full fair-market value.
              </p>
              <p>
                If you'd prefer to discuss a larger crypto gift, send a wire, or coordinate a donor-advised fund grant, please get in touch.
              </p>
              <p>
                <Link href="/contact-us">Contact us about crypto giving →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
    </>
  );
}
