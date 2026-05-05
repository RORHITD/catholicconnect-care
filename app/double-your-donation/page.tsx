import type { Metadata } from "next";
import DonorboxEmbed from "@/components/donorbox/donorbox-embed";
import Testimonials from "@/components/sections/testimonials";
import CommitToGiving from "@/components/sections/commit-to-giving";

export const metadata: Metadata = {
  title: "Double Your Donation",
  description:
    "Your company may match your donation. Within the last 12 months, matching gift programs identified over $100,000 in donations that qualify to be doubled.",
};

export default function DoubleYourDonationPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-burgundy-900 py-20 text-cream-50 lg:py-28">
        <div className="absolute inset-0 opacity-[0.06]" aria-hidden>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dyd-cross" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M40 20v40M20 40h40" stroke="currentColor" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dyd-cross)" />
          </svg>
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">
              Employer Donation Matching
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
              Double Your Donation
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-100/90">
              Your company may match your donation to our nonprofit foundation. Did you know that thousands of companies match employee donations to organizations like ours?
            </p>
            <div className="mt-7 rounded-2xl bg-burgundy-800/50 p-6 ring-1 ring-burgundy-700/50">
              <p className="text-sm text-cream-100/85">
                Within the last 12 months, matching gift programs helped us identify over <strong className="text-gold-300">$100,000</strong> of donations that qualify to be doubled.
              </p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <DonorboxEmbed />
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy-700">
              How It Works
            </p>
            <h2 className="mt-4 font-display text-4xl text-burgundy-900 md:text-5xl">
              Check to see if your company will double your donation!
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-warm-700">
              Use the search tool inside the donation form to see if your company will match your donation. It will give you the forms, guidelines, and instructions you need to submit a match request to your employer.
            </p>
          </div>
          <ol className="mx-auto mt-12 max-w-2xl space-y-6">
            {[
              {
                title: "Make your donation",
                body: "Use the donation form to give in any amount, one-time or recurring.",
              },
              {
                title: "Search your employer",
                body: "Type your company name in the matching-gift tool inside the donation form to see eligibility.",
              },
              {
                title: "Submit the match request",
                body: "Follow your employer's instructions — many companies will match 1:1, some will double or triple.",
              },
              {
                title: "Maximize your impact",
                body: "Your donation could be doubled or tripled — multiplying every dollar that reaches those most in need.",
              },
            ].map((step, i) => (
              <li key={step.title} className="flex gap-5 rounded-2xl bg-cream-50 p-6 ring-1 ring-stone-warm-200">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-burgundy-700 font-display text-lg font-bold text-cream-50">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl text-burgundy-800">{step.title}</h3>
                  <p className="mt-1 leading-relaxed text-stone-warm-700">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Testimonials />
      <CommitToGiving />
    </>
  );
}
