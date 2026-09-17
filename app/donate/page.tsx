import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import DonorboxEmbed from "@/components/donorbox/donorbox-embed";
import JsonLd from "@/components/seo/json-ld";
import { graph, faq, breadcrumbs } from "@/lib/schema";
import FeatureGrid from "@/components/sections/feature-grid";
import Testimonials from "@/components/sections/testimonials";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/donate") },
  title: { absolute: "Donate to The Catholic Connect Foundation" },
  description:
    "Donate to support charitable and humanitarian causes including feeding the poor, emergency relief, and educational content for Catholic communities worldwide.",
};

const donateFaq = [
  { q: "Is my donation to The Catholic Connect Foundation tax-deductible?", a: "Yes. The Catholic Connect Foundation is a 501(c)(3) charity, so gifts are tax-deductible in the United States to the extent the law allows. You receive a receipt by email for every gift." },
  { q: "Can I give monthly?", a: "Yes. Choose Monthly in the form above; you can change or cancel a recurring gift at any time from the link in your receipt." },
  { q: "What other ways can I give?", a: "Besides card and PayPal, you can give through a donor-advised fund, in cryptocurrency, or double your gift through an employer matching program." },
  { q: "Where does my gift go?", a: "To priests, nuns, orphanages and partner charities the Foundation has vetted — feeding programs, emergency relief and Catholic educational content. You can direct your gift to a specific fund." },
];

const beneficiaries = [
  { src: "/wp/wp-content/uploads/2022/07/Fr-Deus-Chickens.png", alt: "Fr. Deus chicken farm in Uganda" },
  { src: "/wp/wp-content/uploads/2022/07/Fr-Deus-Educating-Children-1.png", alt: "Children being educated by Fr. Deus" },
  { src: "/wp/wp-content/uploads/2022/07/Copy-of-Sisters-Franiscan-Minorees-The-Catholic-Connect-Foundation.png", alt: "Sisters Franciscan Minorees" },
  { src: "/wp/wp-content/uploads/2022/07/Typhoon-Philippines-The-Catholic-Connect-Foundation.png", alt: "Typhoon relief in the Philippines" },
];

const feedingFeatures = [
  {
    title: "Chicken Farms",
    body: "Sustainable feeding projects that grow alongside the communities they serve.",
    image: "/wp/wp-content/uploads/2022/07/Fr-Deus-Chickens-2.png",
  },
  {
    title: "Sustainable Growth",
    body: "“Give a man a fish, and you feed him for a day; show him how to catch fish, and you feed him for a lifetime.”",
    image: "/wp/wp-content/uploads/2022/07/Fr-Deus-Educating-Children-1.png",
  },
  {
    title: "Supporting Orphanages",
    body: "We help support multiple orphanages across the globe and we are open to receiving requests from more orphanages.",
    image: "/wp/wp-content/uploads/2022/07/Copy-of-Sisters-Franiscan-Minorees-The-Catholic-Connect-Foundation.png",
  },
  {
    title: "Supporting Children",
    body: "Some projects consist of helping buy food for organizations to keep feeding their youth.",
    image: "/wp/wp-content/uploads/2022/07/Fr-Deus-Chickens-3.png",
  },
];

const emergencyFeatures = [
  {
    title: "Church Attacks",
    body: "Supporting churches and people injured during attacks across the globe.",
    image: "/wp/wp-content/uploads/2022/07/Sri-Lanka-Bombing-The-Catholic-Connect-Foundation-Emergency-Relief-2.png",
  },
  {
    title: "Natural Disasters",
    body: "Providing assistance for those most in need when natural disasters strike.",
    image: "/wp/wp-content/uploads/2022/07/Typhoon-Philippines-The-Catholic-Connect-Foundation.png",
  },
  {
    title: "Medical Emergencies",
    body: "Helping those facing unexpected medical emergencies — children, orphans, and adults.",
    image: "/wp/wp-content/uploads/2022/07/Fr-Deus-Chickens-6.png",
  },
  {
    title: "Family Emergencies",
    body: "Supporting children that lose their parents, and the families that step in for them.",
    image: "/wp/wp-content/uploads/2022/12/sam-mcghee-KieCLNzKoBo-unsplash-scaled.jpg",
  },
];

const otherWaysToGive = [
  {
    title: "Double Your Donation!",
    href: "/double-your-donation",
    body:
      "Your company may match your donation to our nonprofit foundation! Thousands of companies match donations by employees. Check now to see if you're eligible.",
  },
  {
    title: "Donor Advised Funds",
    href: "/donor-advised-funds",
    body:
      "A donor-advised fund (DAF) is a simple, flexible, and tax-advantageous way to give to your favorite charities. Recommend grants to us and make a lasting impact.",
  },
  {
    title: "Donate With Crypto",
    href: "/donate-with-crypto",
    body:
      "Donate cryptocurrency including Bitcoin, Ethereum, and dozens of other coins — a tax-efficient way to support our mission.",
  },
];

export default function DonatePage() {
  return (
    <>
      <JsonLd data={graph(faq(donateFaq), breadcrumbs([{ name: "Home", path: "/" }, { name: "Donate", path: "/donate" }]))} />
      <section className="relative overflow-hidden bg-neutral-900 text-cream-50">
        <div className="absolute inset-0 opacity-[0.08]" aria-hidden>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="donate-cross" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M40 20v40M20 40h40" stroke="currentColor" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#donate-cross)" />
          </svg>
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,532px)] lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-brand-400">
              Support Us &amp; Donate Now
            </p>
            <h1 className="text-4xl leading-[1.08] md:text-5xl">
              Donate To Support The Catholic Connect Foundation
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-100/90">
              Checkout some of the people you are supporting. Thank you for your generosity. <em>1 John 4:19</em>
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {beneficiaries.map((b) => (
                <div key={b.src} className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-brand-700/50">
                  <Image src={b.src} alt={b.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[532px] rounded-2xl bg-cream-50 p-4 shadow-2xl ring-1 ring-black/10">
              <div className="px-2 pt-2 pb-3 sm:px-3">
                <p className="text-sm font-semibold text-neutral-900">Give securely</p>
                <p className="mt-0.5 text-xs text-neutral-600">
                  501(c)(3) charity · gifts are tax-deductible · one-time or monthly
                </p>
              </div>
              <div id="give">
                <Suspense fallback={<div style={{ minHeight: 940 }} />}>
                  <DonorboxEmbed placement="donate-page" width={500} height={940} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FeatureGrid
        eyebrow="Feeding Projects"
        heading="Learn More About Feeding The Poor Fund"
        features={feedingFeatures}
      />
      <FeatureGrid
        eyebrow="Emergency Relief"
        heading="Who The Emergency Relief Fund Supports"
        features={emergencyFeatures}
        background="stone"
      />
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              Other Ways To Give
            </p>
            <h2 className="mt-4 text-3xl text-neutral-900 md:text-4xl">
              More Paths To Make An Impact
            </h2>
          </div>
          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {otherWaysToGive.map((w) => (
              <Link
                key={w.href}
                href={w.href}
                className="group flex flex-col rounded-2xl bg-cream-50 p-8 ring-1 ring-neutral-200 transition hover:shadow-lg hover:ring-brand-200"
              >
                <h3 className="text-2xl text-neutral-900 group-hover:text-brand-600">
                  {w.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-neutral-700">{w.body}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M3 7h8m0 0L8 4m3 3-3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Testimonials />
    </>
  );
}
