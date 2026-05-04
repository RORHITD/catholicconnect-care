import Image from "next/image";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
};

export default function PageHero({ eyebrow, title, subtitle, image, imageAlt }: Props) {
  return (
    <section className="relative overflow-hidden bg-burgundy-800 text-cream-50">
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-burgundy-900/95 via-burgundy-900/70 to-burgundy-800/40" />
        </div>
      )}
      {!image && (
        <>
          <div className="absolute inset-0 opacity-[0.04]" aria-hidden>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hero-cross" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M40 20v40M20 40h40" stroke="currentColor" strokeWidth="1" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-cross)" />
            </svg>
          </div>
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" aria-hidden />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-burgundy-500/20 blur-3xl" aria-hidden />
        </>
      )}
      <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-32 lg:px-8">
        {eyebrow && (
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl leading-[1.1] md:text-6xl lg:text-7xl text-cream-50">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream-100/85">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
