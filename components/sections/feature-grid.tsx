import Image from "next/image";

export type Feature = {
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
};

type Props = {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  features: Feature[];
  background?: "cream" | "stone";
};

export default function FeatureGrid({ eyebrow, heading, subheading, features, background = "cream" }: Props) {
  const bg = background === "stone" ? "bg-neutral-50" : "bg-cream-50";
  const cols =
    features.length === 4 ? "lg:grid-cols-4" :
    features.length === 3 ? "lg:grid-cols-3" :
    features.length === 2 ? "lg:grid-cols-2" :
    "lg:grid-cols-3";
  return (
    <section className={`${bg} py-20 lg:py-28`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {(eyebrow || heading || subheading) && (
          <div className="mx-auto max-w-3xl text-center">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="mt-4 text-3xl text-neutral-900 md:text-4xl">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-6 text-lg leading-relaxed text-neutral-700">
                {subheading}
              </p>
            )}
          </div>
        )}
        <div className={`mt-14 grid gap-7 sm:grid-cols-2 ${cols}`}>
          {features.map((f) => (
            <article key={f.title} className="flex flex-col overflow-hidden rounded-2xl bg-cream-50 ring-1 ring-neutral-200">
              {f.image && (
                <div className="relative aspect-square overflow-hidden bg-neutral-100">
                  <Image
                    src={f.image}
                    alt={f.imageAlt ?? f.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl text-neutral-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{f.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
