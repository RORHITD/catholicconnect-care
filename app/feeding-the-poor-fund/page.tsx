import type { Metadata } from "next";
import PageHero from "@/components/sections/page-hero";
import FeatureGrid from "@/components/sections/feature-grid";
import WhyChoose from "@/components/sections/why-choose";
import Testimonials from "@/components/sections/testimonials";
import CommitToGiving from "@/components/sections/commit-to-giving";

export const metadata: Metadata = {
  title: "Feeding The Poor Fund",
  description:
    "Donate to support sustainable feeding projects, orphanages, and chicken farms that provide adequate nutrition to families and children that are malnourished.",
};

const features = [
  {
    title: "Chicken Farms",
    body:
      "The feeding projects we support many times try to achieve optimal sustainability so they can keep growing and sustaining their communities for the long-term.",
    image: "/wp/wp-content/uploads/2022/07/Fr-Deus-Chickens-2.png",
  },
  {
    title: "Sustainable Growth",
    body:
      "“Give a man a fish, and you feed him for a day; show him how to catch fish, and you feed him for a lifetime.”",
    image: "/wp/wp-content/uploads/2022/07/Fr-Deus-Educating-Children-1.png",
  },
  {
    title: "Supporting Orphanages",
    body:
      "We help support multiple orphanages across the globe and we are open to receiving requests from more orphanages.",
    image: "/wp/wp-content/uploads/2022/07/Copy-of-Sisters-Franiscan-Minorees-The-Catholic-Connect-Foundation.png",
  },
  {
    title: "Supporting Children",
    body:
      "Not all of our feeding the poor fund goes to orphanages. Some projects consist of helping buy food for organizations to keep feeding their youth.",
    image: "/wp/wp-content/uploads/2022/07/Fr-Deus-Chickens-3.png",
  },
];

export default function FeedingThePoorFundPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Initiatives"
        title="Feeding The Poor Fund"
        subtitle="We find and support orphanages and feeding projects that desperately need our support. We prefer feeding initiatives that show a sustainable way to keep going for the long term."
        image="/wp/wp-content/uploads/2022/07/Fr-Deus-Chickens.png"
        imageAlt="Fr. Deus chicken farm — sustainable feeding project"
      />
      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              About Us
            </p>
            <h2 className="mt-4 text-4xl text-neutral-900 md:text-5xl">
              Sustaining feeding projects, supporting children
            </h2>
          </div>
          <div className="prose-content">
            <p>
              We provide charitable and humanitarian assistance to those who need it the most. We vet and ensure all feeding projects we support give us updates so we can always update the donors who make this possible. Your generosity feeds children, supports orphanages, and helps build sustainable food systems where they're needed most.
            </p>
            <p>
              From chicken farms to community gardens, we partner with priests, nuns, and lay-led organizations to help them feed the most vulnerable — and to grow their capacity to keep doing so for years to come.
            </p>
          </div>
        </div>
      </section>
      <FeatureGrid
        eyebrow="Feeding Projects"
        heading="Learn More About Feeding The Poor Fund"
        features={features}
        background="stone"
      />
      <WhyChoose />
      <Testimonials />
      <CommitToGiving />
    </>
  );
}
