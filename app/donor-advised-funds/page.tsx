import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import Link from "next/link";
import PageHero from "@/components/sections/page-hero";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/donor-advised-funds") },
  title: "Donor Advised Funds",
  description:
    "Make a lasting impact by directing your donor-advised fund (DAF) toward The Catholic Connect Foundation's charitable initiatives.",
};

const benefits = [
  {
    title: "Tax Advantages",
    body:
      "Donor-advised funds let you take an immediate tax deduction on the contribution year, even if grants to charity are made in later years.",
  },
  {
    title: "Flexibility & Control",
    body:
      "Recommend grants to The Catholic Connect Foundation on your timeline — whether all at once or spread out across multiple years.",
  },
  {
    title: "Lasting Legacy",
    body:
      "Many DAFs allow successor advisors, so your charitable vision continues to support those most in need long after you.",
  },
];

export default function DonorAdvisedFundsPage() {
  return (
    <>
      <PageHero
        eyebrow="Ways To Give"
        title="Commit Donor Advised Funds For The Catholic Connect Foundation"
        subtitle="A donor-advised fund (DAF) is a simple, flexible, and tax-advantageous way to give to your favorite charities. Direct your DAF to support our work and make a lasting impact."
      />
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              Donor Advised Funds
            </p>
            <h2 className="mt-4 text-3xl text-neutral-900 md:text-4xl">
              Make A Lasting Impact For The Catholic Connect Foundation
            </h2>
          </div>
          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {benefits.map((b) => (
              <article key={b.title} className="rounded-2xl bg-cream-50 p-8 ring-1 ring-neutral-200">
                <h3 className="text-2xl text-neutral-900">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-neutral-700">{b.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-3xl text-neutral-900 md:text-4xl">
            Ready to recommend a grant?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-neutral-700">
            Contact us to receive our EIN and the details your DAF administrator needs to process your grant recommendation. We're grateful for your generosity.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-cream-50 transition hover:bg-brand-600"
            >
              Contact Us About DAFs
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded-full border border-brand-500 px-7 py-3.5 text-sm font-semibold text-brand-600 transition hover:bg-brand-50"
            >
              Other Ways to Give
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
