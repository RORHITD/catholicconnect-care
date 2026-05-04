import type { Metadata } from "next";
import PageHero from "@/components/sections/page-hero";
import FeatureGrid from "@/components/sections/feature-grid";
import WhyChoose from "@/components/sections/why-choose";
import Testimonials from "@/components/sections/testimonials";
import CommitToGiving from "@/components/sections/commit-to-giving";

export const metadata: Metadata = {
  title: "Emergency Relief Fund",
  description:
    "We help support emergency relief projects: medical emergencies, victims of terror attacks, natural disasters, and family emergencies across the globe.",
};

const features = [
  {
    title: "Church Attacks",
    body:
      "Our emergency relief fund has supported and will keep supporting churches who are attacked or people who are injured during attacks on churches across the globe.",
    image: "/wp/wp-content/uploads/2022/07/Sri-Lanka-Bombing-The-Catholic-Connect-Foundation-Emergency-Relief-2.png",
  },
  {
    title: "Natural Disasters",
    body:
      "We will keep providing assistance for those most in need while hit by natural disasters. Many times, communities flood and families have a hard time getting by, we want to be there for them.",
    image: "/wp/wp-content/uploads/2022/07/Typhoon-Philippines-The-Catholic-Connect-Foundation.png",
  },
  {
    title: "Medical Emergencies",
    body:
      "Whether it is a baby in need, an orphan, a child, or adults that experience unexpected medical emergencies, we want to be there for them and provide assistance to them and their families.",
    image: "/wp/wp-content/uploads/2022/07/Fr-Deus-Chickens-6.png",
  },
  {
    title: "Family Emergencies",
    body:
      "We have helped children that unexpectedly lose their parents and provided support for the family members that support those children. We continue to be open to helping more families in emergency situations.",
    image: "/wp/wp-content/uploads/2022/12/sam-mcghee-KieCLNzKoBo-unsplash-scaled.jpg",
  },
];

export default function EmergencyReliefFundPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Initiatives"
        title="Emergency Relief Fund"
        subtitle="We find and support the immediate needs of people and communities in dire need who are going through natural disasters, medical emergencies, terrorist attacks, or any other type of serious emergency."
        image="/wp/wp-content/uploads/2022/07/Sri-Lanka-Bombing-The-Catholic-Connect-Foundation-Emergency-Relief-2.png"
        imageAlt="Emergency relief — Sri Lanka bombing response"
      />
      <FeatureGrid
        eyebrow="Emergency Relief Fund"
        heading="Learn More About Who The Emergency Relief Fund Supports"
        features={features}
      />
      <WhyChoose />
      <Testimonials />
      <CommitToGiving />
    </>
  );
}
