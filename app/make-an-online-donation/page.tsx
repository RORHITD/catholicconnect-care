import type { Metadata } from "next";
import Link from "next/link";
import DonorboxEmbed from "@/components/donorbox/donorbox-embed";
import Testimonials from "@/components/sections/testimonials";

export const metadata: Metadata = {
  title: "Make An Online Donation",
  description:
    "Make a one-time or recurring online donation to The Catholic Connect Foundation. Support feeding the poor, emergency relief, and educational ministries.",
};

const ways = [
  {
    title: "Monetary Donations",
    body: "Any monetary donation helps further our mission to help charitable and humanitarian projects across the world.",
  },
  {
    title: "Amazon Smile",
    body: "Amazon donates any time that you shop at Amazon through their link smile.amazon.com — be sure to shop through there and select us as your charity of choice.",
  },
  {
    title: "Asset Stocks",
    body: "By donating stocks, real estate, adding us in your will, or any other type of asset donation, you can help further and expand our mission for the long term.",
  },
];

export default function MakeAnOnlineDonationPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-burgundy-900 py-20 text-cream-50 lg:py-28">
        <div className="absolute inset-0 opacity-[0.06]" aria-hidden>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="online-cross" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M40 20v40M20 40h40" stroke="currentColor" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#online-cross)" />
          </svg>
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">
              Make An Online Donation
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
              Donate &amp; Support Our Mission
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-100/90">
              Our donor angels help us keep advancing our mission by contributing to current and future projects we support across the world. The more donor angels we have, the more we can do.
            </p>
            <p className="mt-4 max-w-xl text-cream-100/85">
              Your monthly donation makes a particular impact — it sustains the long-term feeding, education, and emergency-relief projects we care for.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <DonorboxEmbed height={760} />
          </div>
        </div>
      </section>

      <section className="bg-stone-warm-50 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy-700">
                Recurring Giving
              </p>
              <h2 className="mt-4 font-display text-4xl text-burgundy-900 md:text-5xl">
                Consider becoming a monthly donor
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-stone-warm-700">
                Our ongoing missions are possible through the generosity of our recurring donor base. It's the way we know how many projects we can sustainably support. If you become a monthly donor of even $5/mo, it helps us keep providing continuous support for those who seriously need our help. God bless you!
              </p>
            </div>
            <div className="rounded-2xl bg-cream-50 p-8 ring-1 ring-stone-warm-200">
              <h3 className="font-display text-2xl text-burgundy-800">
                Donor angels keep our mission moving forward
              </h3>
              <p className="mt-4 leading-relaxed text-stone-warm-700">
                Beyond ongoing operating costs, recurring donations let us respond rapidly to emergencies, commit to long-term feeding partnerships, and invest in educational content reach — without scrambling for funding each time a need arises.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy-700">
              How People Can Donate
            </p>
            <h2 className="mt-4 font-display text-4xl text-burgundy-900 md:text-5xl">
              Multiple ways to give back
            </h2>
          </div>
          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {ways.map((w) => (
              <article key={w.title} className="rounded-2xl bg-cream-50 p-8 ring-1 ring-stone-warm-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700 ring-1 ring-gold-200">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 2v20M5 12h14" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="mt-5 font-display text-2xl text-burgundy-800">{w.title}</h3>
                <p className="mt-3 leading-relaxed text-stone-warm-700">{w.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 rounded-2xl bg-burgundy-50 p-8 text-center ring-1 ring-burgundy-100 sm:p-12">
            <h3 className="font-display text-2xl text-burgundy-800 md:text-3xl">
              Request Information To Donate Stocks Or Other Types Of Assets
            </h3>
            <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-stone-warm-700">
              Asset donations could include holdings in a brokerage trading account, bonds, stocks, ETFs, mutual funds, options, fixed-income investments, used cars, gifts of real estate, gifts of insurance, gifts of a closely-held business, or other assets.
            </p>
            <Link
              href="/contact-us"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-burgundy-700 px-7 py-3.5 text-sm font-semibold text-cream-50 transition hover:bg-burgundy-800"
            >
              Contact Us About Asset Donations
            </Link>
          </div>
        </div>
      </section>
      <Testimonials />
    </>
  );
}
