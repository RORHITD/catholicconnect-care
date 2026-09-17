import type { ReactNode } from "react";

type Pillar = {
  title: string;
  body: string;
  icon: ReactNode;
};

const pillars: Pillar[] = [
  {
    title: "Vetted",
    body:
      "We vet each applicant of our grants. That way our donors know their donation is creating the maximum positive impact. We love helping people and organizations that make a long lasting impact.",
    icon: (
      <path
        d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4Z M9 12l2 2 4-4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Sustainable",
    body:
      "We love seeing projects that show a sustainable way for growth whether it is through growing an audience for educational efforts or supporting orphanages that create a sustainable food source.",
    icon: (
      <path
        d="M12 3a9 9 0 0 1 9 9c0 4-3 7-7 7M12 21a9 9 0 0 1-9-9c0-4 3-7 7-7M8 8l4-4M16 16l-4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Maximum Impact",
    body:
      "Whatever project we end up supporting, we will ensure that it will have maximum impact whether it is content to educate people or money to fund children's education.",
    icon: (
      <path d="M12 2v20M5 9l7-7 7 7M19 15l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Immediate Need",
    body:
      "We prioritize projects that need emergency funds to continue their good work. Many times these projects focus on serving children that are hungry, in medical emergencies, or projects that may educate people through enriching content.",
    icon: (
      <path d="M12 6v6l4 2M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

export default function WhyChoose() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
            Our Values
          </p>
          <h2 className="mt-4 text-3xl text-neutral-900 md:text-4xl">
            Why Choose Our Charity
          </h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.title} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-2 ring-brand-300">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  {p.icon}
                </svg>
              </div>
              <h3 className="mt-5 text-xl text-neutral-900">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
