import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/sections/page-hero";
import CommitToGiving from "@/components/sections/commit-to-giving";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/feeding-the-hungry-2") },
  title: "Feeding The Hungry",
  description:
    "Our mission to feed the hungry partners with local parishes and priests so donations go directly to those most in need — not administrative overhead.",
};

const threeWays = [
  {
    title: "Direct partnership with parishes",
    body:
      "We work with priests, sisters, and parish-led ministries that already know their community — so help reaches the people who need it most, without bureaucratic overhead.",
    image: "/wp/wp-content/uploads/2022/07/Fr-Deus-Chickens-2.png",
  },
  {
    title: "Sustainable feeding projects",
    body:
      "We prioritize projects that build long-term capacity — chicken farms, gardens, and other initiatives that keep feeding communities for years to come.",
    image: "/wp/wp-content/uploads/2022/07/Fr-Deus-Educating-Children-1.png",
  },
  {
    title: "Orphanage support",
    body:
      "Multiple orphanages across the globe receive ongoing support — and we're always open to applications from new orphanages that meet our vetting criteria.",
    image: "/wp/wp-content/uploads/2022/07/Copy-of-Sisters-Franiscan-Minorees-The-Catholic-Connect-Foundation.png",
  },
];

export default function FeedingTheHungry2Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Initiatives"
        title="Feeding The Hungry"
        subtitle="Helping ensure that no donor dollar is lost to administrative fees — by working directly with vetted local parishes and priests."
        image="/wp/wp-content/uploads/2022/07/Fr-Deus-Chickens.png"
        imageAlt="Fr. Deus and his chicken farm"
      />
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              Three ways we help
            </p>
            <h2 className="mt-4 text-3xl text-neutral-900 md:text-4xl">
              From sustainable farms to orphanages
            </h2>
          </div>
          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {threeWays.map((w) => (
              <article key={w.title} className="overflow-hidden rounded-2xl bg-cream-50 ring-1 ring-neutral-200">
                <div className="relative aspect-[4/3] bg-neutral-100">
                  <Image src={w.image} alt={w.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-neutral-900">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">{w.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 py-20 text-cream-50 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="text-5xl text-brand-400 md:text-7xl">45%</p>
          <h2 className="mt-4 text-3xl md:text-4xl">
            of deaths among children under five are caused by malnutrition
          </h2>
          <p className="mx-auto mt-5 max-w-3xl leading-relaxed text-cream-100/85">
            Hunger is preventable. By giving directly through trusted local communities, we help ensure that food, education, and care reach the families who need it most.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
            Our Mission
          </p>
          <h2 className="mt-4 text-3xl text-neutral-900 md:text-4xl">
            Mission to feed the hungry
          </h2>
          <p className="mx-auto mt-6 text-lg leading-relaxed text-neutral-700">
            Our mission to feed the hungry is by working with local parishes and priests to prevent donor money from going to administrative fees of other non-profit organizations. We will vet any non-profit or feeding project before partnering with them — and we keep our donors updated as the work progresses.
          </p>
          <div className="mt-8">
            <Link
              href="/feeding-the-poor-fund"
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-cream-50 transition hover:bg-brand-700"
            >
              See the Feeding The Poor Fund
            </Link>
          </div>
        </div>
      </section>

      <CommitToGiving placement="feeding-the-hungry-2-footer" />
    </>
  );
}
