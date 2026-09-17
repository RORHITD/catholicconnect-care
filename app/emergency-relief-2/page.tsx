import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/sections/page-hero";
import CommitToGiving from "@/components/sections/commit-to-giving";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/emergency-relief-2") },
  title: "Emergency Relief",
  description:
    "We respond quickly to emergencies — natural disasters, violence, and medical crises — through trusted local Catholic partners.",
};

const threeWays = [
  {
    title: "Natural disaster relief",
    body:
      "When typhoons, earthquakes, and floods devastate communities, we get aid moving fast through local parishes already on the ground.",
    image: "/wp/wp-content/uploads/2022/07/Typhoon-Philippines-The-Catholic-Connect-Foundation.png",
    caption: "Natural disaster relief",
  },
  {
    title: "Disaster relief — terrorism & violence",
    body:
      "We have stood with churches and the families of victims after attacks like the 2019 Sri Lanka Easter bombings — providing financial relief and pastoral care.",
    image: "/wp/wp-content/uploads/2022/07/Sri-Lanka-Bombing-The-Catholic-Connect-Foundation-Emergency-Relief-2.png",
    caption: "Disaster relief terrorism/violence",
  },
  {
    title: "Medical emergency relief",
    body:
      "Babies, orphans, and adults facing sudden medical crises need help fast. We support emergency surgeries, treatments, and family care.",
    image: "/wp/wp-content/uploads/2022/07/Fr-Deus-Chickens-6.png",
    caption: "Medical emergency relief",
  },
];

export default function EmergencyRelief2Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Initiatives"
        title="Emergency Relief"
        subtitle="When crisis strikes, we respond quickly through trusted Catholic partners on the ground — getting help to those who need it most."
        image="/wp/wp-content/uploads/2022/07/Sri-Lanka-Bombing-The-Catholic-Connect-Foundation-Emergency-Relief-2.png"
      />
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              Three ways we help
            </p>
            <h2 className="mt-4 text-4xl text-neutral-900 md:text-5xl">
              Responding to emergencies, fast
            </h2>
          </div>
          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {threeWays.map((w) => (
              <figure key={w.title} className="overflow-hidden rounded-2xl bg-cream-50 ring-1 ring-neutral-200">
                <div className="relative aspect-[4/3] bg-neutral-100">
                  <Image src={w.image} alt={w.caption} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="p-6">
                  <h3 className="text-xl text-neutral-900">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">{w.body}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/emergency-relief-fund"
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-cream-50 transition hover:bg-brand-600"
            >
              See the Emergency Relief Fund
            </Link>
          </div>
        </div>
      </section>
      <CommitToGiving placement="emergency-relief-2-footer" />
    </>
  );
}
