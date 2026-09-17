import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import PageHero from "@/components/sections/page-hero";
import WhyChoose from "@/components/sections/why-choose";
import Testimonials from "@/components/sections/testimonials";
import CommitToGiving from "@/components/sections/commit-to-giving";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/educational-content-fund") },
  title: "Educational Content Fund",
  description:
    "We support educational content for parishes, ministries, and lay leaders across the globe — helping educate, empower, and inspire others to commit time and resources toward charitable causes.",
};

const supports = [
  {
    title: "Catholic Educational Channels",
    body:
      "We help fund the production of free educational videos, podcasts, and online resources that share Catholic teaching and inspire faithful action.",
  },
  {
    title: "Parish & Ministry Outreach",
    body:
      "We work with parishes and ministries to develop content that engages new audiences and supports their evangelization and formation efforts.",
  },
  {
    title: "Faith Formation Resources",
    body:
      "From catechesis to apologetics, our fund underwrites materials that help individuals deepen their faith and live out the Gospel daily.",
  },
  {
    title: "Educating About Poverty",
    body:
      "We support content that brings attention to the realities of poverty around the world — turning awareness into action and generosity.",
  },
];

export default function EducationalContentFundPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Initiatives"
        title="Educational Content Fund"
        subtitle="Our charitable mission supports parishes and Catholic ministries across the globe with content that helps educate people about issues of poverty, the teachings of the faith, and ways everyone can make a meaningful difference."
        image="/wp/wp-content/uploads/2022/12/kal-visuals-jA7iWRaJruA-unsplash-scaled.jpg"
        imageAlt="Hands holding a rosary in prayer"
      />
      <section className="bg-neutral-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              Educational Content Fund
            </p>
            <h2 className="mt-4 text-3xl text-neutral-900 md:text-4xl">
              Learn More About Who The Educational Content Fund Supports
            </h2>
          </div>
          <div className="mt-14 grid gap-7 md:grid-cols-2">
            {supports.map((s) => (
              <article key={s.title} className="rounded-2xl bg-cream-50 p-8 ring-1 ring-neutral-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-2 ring-brand-300">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M4 5h16M4 5v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5M4 5l8 5 8-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="mt-5 text-2xl text-neutral-900">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-neutral-700">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <WhyChoose />
      <Testimonials />
      <CommitToGiving
        placement="educational-content-fund-footer"
        message="Your donation helps The Catholic Connect Foundation provide support for educational content. We thank you for helping and assure you of our prayers and the prayers of all of those you are helping through our content."
      />
    </>
  );
}
