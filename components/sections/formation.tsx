import Image from "next/image";

/**
 * The Foundation's second pillar. Relief work feeds people; these two services
 * form them. Both are free and run by the Foundation, so they belong on the
 * homepage as mission, not as a partner logo strip.
 */
const services = [
  {
    name: "Bible Trivia",
    href: "https://www.bibletrivia.ai",
    domain: "bibletrivia.ai",
    image: "/ecosystem/bibletrivia-og.png",
    tagline: "Read, study and quiz the Catholic Bible",
    body:
      "The full Douay-Rheims Bible, free to read, with quizzes that turn Scripture into something you remember — save verses, track your progress and deepen your faith one chapter at a time.",
    cta: "Start reading",
  },
  {
    name: "Mass Times Near Me",
    href: "https://masstimesnearme.org",
    domain: "masstimesnearme.org",
    image: "/ecosystem/masstimes-og.png",
    tagline: "Find Mass, confession and Adoration anywhere",
    body:
      "Sunday, vigil and daily Mass times, plus confession and Adoration, at more than 39,000 parishes in 47 countries. Free, no account needed — a service of The Catholic Connect Foundation.",
    cta: "Find a Mass",
  },
];

export default function Formation() {
  return (
    <section className="bg-cream-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
            Forming the Faithful
          </p>
          <h2 className="mt-4 text-3xl leading-tight text-neutral-900 md:text-4xl">
            Relief for the body. Formation for the soul.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-neutral-700">
            Feeding the hungry is half of our mission. The other half is helping people
            grow in the faith and find their way to the fullness of truth — so the
            Foundation also builds and runs two free services used by Catholics around
            the world.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {services.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid overflow-hidden rounded-2xl bg-cream-50 ring-1 ring-neutral-200 transition hover:shadow-xl hover:ring-brand-200 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
            >
              <div className="relative aspect-[1200/630] md:aspect-auto md:min-h-[260px] bg-neutral-100">
                <Image
                  src={s.image}
                  alt={`${s.name} — ${s.tagline}`}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col p-7 lg:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  {s.domain}
                </p>
                <h3 className="mt-2 text-2xl text-neutral-900">{s.name}</h3>
                <p className="mt-1 text-sm font-medium text-brand-600">{s.tagline}</p>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-neutral-700">{s.body}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                  {s.cta}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M3 7h8m0 0L8 4m3 3-3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
