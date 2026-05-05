import Image from "next/image";
import Link from "next/link";
import DonorboxEmbed from "@/components/donorbox/donorbox-embed";
import {
  SectionMark,
  Dateline,
  PullQuote,
  FigureCaption,
  Hairline,
  BigNumeral,
  EditorialButton,
} from "@/components/editorial";
import postsData from "@/data/wp-posts.json";
import { decodeHtml } from "@/lib/wp-utils";

const initiatives = [
  {
    no: "01",
    href: "/feeding-the-poor-fund",
    title: "Feeding the Poor Fund",
    body:
      "Sustainable feeding projects—chicken farms, gardens, orphanage kitchens—that nourish families and grow with the communities they serve.",
    image: "/wp/wp-content/uploads/2022/07/Fr-Deus-Chickens.png",
    caption: "Fr. Deus oversees the chicken farm in Uganda — a sustainable feeding project our donors support directly.",
    credit: "Photograph from the field",
  },
  {
    no: "02",
    href: "/educational-content-fund",
    title: "Educational Content Fund",
    body:
      "Funding parishes and ministries to produce educational content that forms faith, illuminates need, and turns awareness into action.",
    image: "/wp/wp-content/uploads/2022/12/kal-visuals-jA7iWRaJruA-unsplash-scaled.jpg",
    caption: "Hands at prayer — a moment of devotion captured in the work that educational content seeks to share.",
    credit: "Photograph by Kal Visuals",
  },
  {
    no: "03",
    href: "/emergency-relief-fund",
    title: "Emergency Relief Fund",
    body:
      "When natural disasters, terror attacks, or medical crises strike, we get aid moving through trusted Catholic partners on the ground.",
    image: "/wp/wp-content/uploads/2022/07/Sri-Lanka-Bombing-The-Catholic-Connect-Foundation-Emergency-Relief-2.png",
    caption: "Sri Lanka, Easter 2019 — the bombings of three churches; the families of the deceased received emergency support.",
    credit: "From the relief fund archive",
  },
];

const pillars = [
  {
    label: "Vetted",
    body: "Each grant applicant is vetted directly. Donors know exactly where their gift goes and what it accomplishes.",
  },
  {
    label: "Sustainable",
    body: "We back projects with a clear path to long-term self-sufficiency — not perpetual aid dependence.",
  },
  {
    label: "Maximum Impact",
    body: "From feeding to faith formation, every dollar is directed where it can do the most measurable good.",
  },
  {
    label: "Immediate Need",
    body: "Emergencies don't wait. Our reserves and partners let us move funding within hours when crises hit.",
  },
];

const testimonial = {
  quote:
    "Thank you so much my brothers and sisters for the money. You are a blessing to our children in Uganda. Many blessings to this ministry.",
  attribution: "Fr. Deus",
  role: "Catholic Priest, Uganda — recipient of the Feeding the Poor Fund",
};

const stats = [
  { value: "776+", label: "children supported and cared for through our donors' generosity." },
  { value: "359+", label: "children helped through education, faith formation, and tuition coverage." },
  { value: "7M+", label: "Catholics reached across the globe through educational content channels." },
  { value: "100%", label: "of executive staff are unpaid volunteers — every dollar goes to the mission." },
];

function getLatestPosts(limit = 3) {
  return [...postsData]
    .filter((p) => p.status === "publish")
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit)
    .map((p) => {
      const cat = p._embedded?.["wp:term"]?.[0]?.[0];
      const featured = p._embedded?.["wp:featuredmedia"]?.[0];
      const localImage = featured?.source_url
        ?.replace(/^https?:\/\/(www\.)?catholicconnect\.care/, "/wp")
        ?? null;
      return {
        slug: p.slug,
        title: decodeHtml(p.title.rendered),
        date: p.date,
        category: cat ? { name: cat.name, slug: cat.slug } : null,
        image: localImage,
      };
    });
}

export default function HomePage() {
  const latest = getLatestPosts(3);
  const [lead, ...followups] = latest;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-neutral-900 text-white">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        >
          <source src="/wp/wp-content/uploads/2022/08/pexels-tima-miroshnichenko-5988655.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-neutral-900/30" aria-hidden />
        <div className="relative mx-auto grid max-w-[1400px] gap-y-12 gap-x-12 px-6 pt-16 pb-20 lg:grid-cols-12 lg:gap-x-16 lg:px-12 lg:pt-24 lg:pb-28">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <Dateline
              variant="dark"
              items={["Volume V", "No. 04", "Spring Edition", "Mission Brief"]}
            />
            <div className="mt-12 lg:mt-20">
              <h1 className="editorial-display text-[16vw] leading-[0.92] sm:text-7xl md:text-8xl lg:text-[112px]">
                Donate today
                <span className="block">
                  <em className="not-italic text-brand-400 font-light">&</em>{" "}
                  <span className="italic font-light">support</span>
                </span>
                <span className="block">our mission.</span>
              </h1>
              <div className="mt-10 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-start">
                <span aria-hidden className="hidden sm:block h-px w-12 bg-brand-400 mt-3" />
                <p className="font-editorial italic text-lg lg:text-xl text-white/80 max-w-xl leading-relaxed">
                  Helping Catholic priests, nuns, orphanages, and lay-led ministries
                  carry out their humanitarian and charitable missions across the globe.
                </p>
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-6">
                <EditorialButton href="/donate" size="lg" variant="primary">
                  Donate Now
                </EditorialButton>
                <EditorialButton href="/faith-in-action" size="lg" variant="ghost-dark">
                  Read the Stories
                </EditorialButton>
              </div>
            </div>
            <div className="mt-16 hidden lg:flex items-end gap-6 text-white/55">
              <span className="small-caps">Scroll</span>
              <span aria-hidden className="block h-px w-20 bg-white/30" />
              <span className="font-editorial italic text-white/70">— Spring 2026</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end" id="donate">
            <div className="w-full max-w-[500px]">
              <div className="mb-3 flex items-center justify-between text-white/70 small-caps">
                <span>Give Online</span>
                <span className="font-editorial italic normal-case tracking-normal text-sm text-white/55">
                  secure · monthly
                </span>
              </div>
              <DonorboxEmbed />
            </div>
          </div>
        </div>
      </section>

      {/* MISSION — alternating editorial rows */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionMark number="01" label="Three Pillars" />
              <h2 className="mt-8 editorial-display text-5xl md:text-6xl">
                We give to the people who give first.
              </h2>
              <p className="mt-8 max-w-md text-base leading-relaxed text-neutral-700">
                Three funds, each direct, each accountable. Choose where your generosity
                lands — or split it across all three.
              </p>
            </div>
            <div className="lg:col-span-8">
              <Hairline />
              <div className="divide-y divide-neutral-300">
                {initiatives.map((it) => (
                  <article
                    key={it.href}
                    className="grid gap-8 py-12 md:grid-cols-12 md:gap-10 first:pt-12"
                  >
                    <div className="md:col-span-2 flex md:flex-col gap-4 items-baseline md:items-start">
                      <span className="number-display text-6xl text-ink">{it.no}</span>
                      <span className="small-caps text-neutral-500">A Fund</span>
                    </div>
                    <div className="md:col-span-5 flex flex-col">
                      <h3 className="font-editorial text-3xl font-medium leading-tight text-ink md:text-[34px]">
                        <Link href={it.href} className="link-editorial">
                          {it.title}
                        </Link>
                      </h3>
                      <p className="mt-5 text-[15px] leading-relaxed text-neutral-700">
                        {it.body}
                      </p>
                      <div className="mt-7">
                        <EditorialButton href={it.href} variant="ghost-light">
                          Support {it.no}
                        </EditorialButton>
                      </div>
                    </div>
                    <figure className="md:col-span-5">
                      <div className="relative aspect-[5/4] overflow-hidden bg-neutral-100">
                        <Image
                          src={it.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 35vw, 100vw"
                          className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                      <FigureCaption caption={it.caption} credit={it.credit} />
                    </figure>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL — single full-bleed pull quote */}
      <section className="bg-paper-warm py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="mb-12">
            <SectionMark number="02" label="From Those We Serve" />
          </div>
          <PullQuote {...testimonial} />
        </div>
      </section>

      {/* PILLARS — typographic, no icons */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-12 mb-16">
            <div className="lg:col-span-5 lg:col-start-1">
              <SectionMark number="03" label="Why Choose Us" />
              <h2 className="mt-8 editorial-display text-5xl md:text-6xl">
                A standard of trust, not a list of features.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 self-end">
              <p className="font-editorial italic text-xl leading-relaxed text-neutral-700">
                Four commitments that decide which projects we back —
                and which we politely decline.
              </p>
            </div>
          </div>
          <Hairline />
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <li
                key={p.label}
                className={`p-8 md:p-10 ${i !== pillars.length - 1 ? "lg:border-r border-neutral-200" : ""} ${i < pillars.length - 1 ? "border-b lg:border-b-0 border-neutral-200" : ""}`}
              >
                <span className="number-display text-3xl text-brand-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-editorial text-2xl font-medium text-ink">
                  {p.label}.
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
          <Hairline />
        </div>
      </section>

      {/* STATS — number-led editorial */}
      <section className="bg-neutral-900 py-24 text-white lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-12 mb-20">
            <div className="lg:col-span-6">
              <SectionMark number="04" label="Since 2019" variant="dark" />
              <h2 className="mt-8 editorial-display text-5xl md:text-6xl">
                <span className="italic font-light">Numbers,</span>{" "}
                <span className="font-light">but a person behind every one.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 self-end">
              <p className="font-editorial italic text-xl text-white/75 leading-relaxed">
                Six years of grants tell a story we are proud of, and one we know
                is far from finished.
              </p>
            </div>
          </div>
          <Hairline variant="dark" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.value}
                className={`p-8 md:p-10 ${i !== stats.length - 1 ? "lg:border-r border-white/15" : ""} ${i < stats.length - 1 ? "border-b lg:border-b-0 border-white/15" : ""}`}
              >
                <BigNumeral value={s.value} label={s.label} variant="dark" />
              </div>
            ))}
          </div>
          <Hairline variant="dark" />
          <div className="mt-16 text-center">
            <EditorialButton href="/donate" variant="ghost-dark" size="lg">
              Become a monthly donor
            </EditorialButton>
          </div>
        </div>
      </section>

      {/* LATEST STORIES — 1 lead + 2 followups */}
      {latest.length > 0 && (
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <div>
                <SectionMark number="05" label="Stories & News" />
                <h2 className="mt-8 editorial-display text-5xl md:text-6xl max-w-2xl">
                  Inspired by faith, lived in action.
                </h2>
              </div>
              <Link
                href="/faith-in-action"
                className="small-caps text-ink link-editorial inline-flex items-center gap-3"
              >
                The Archive
                <span aria-hidden className="block h-px w-8 bg-current" />
              </Link>
            </div>
            <Hairline />
            {lead && (
              <article className="grid gap-10 py-12 lg:grid-cols-12 lg:gap-16">
                {lead.image && (
                  <Link href={`/${lead.slug}`} className="lg:col-span-7 block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                      <Image
                        src={lead.image}
                        alt=""
                        fill
                        priority
                        sizes="(min-width: 1024px) 60vw, 100vw"
                        className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                      />
                    </div>
                    <FigureCaption
                      caption={lead.title}
                      credit={lead.category?.name ? `Filed: ${lead.category.name}` : undefined}
                    />
                  </Link>
                )}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  {lead.category && (
                    <span className="small-caps text-brand-500 mb-5">
                      Filed in {lead.category.name}
                    </span>
                  )}
                  <h3 className="font-editorial text-3xl md:text-4xl font-medium leading-tight">
                    <Link href={`/${lead.slug}`} className="link-editorial">
                      {lead.title}
                    </Link>
                  </h3>
                  <time className="mt-6 small-caps text-neutral-500">
                    {new Date(lead.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <div className="mt-8">
                    <EditorialButton href={`/${lead.slug}`} variant="ghost-light">
                      Read the story
                    </EditorialButton>
                  </div>
                </div>
              </article>
            )}
            {followups.length > 0 && (
              <>
                <Hairline />
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {followups.map((p, i) => (
                    <article
                      key={p.slug}
                      className={`py-10 md:py-12 grid grid-cols-[auto_1fr] gap-6 ${i === 0 ? "md:pr-10 md:border-r md:border-neutral-200" : "md:pl-10"} ${i === 0 ? "border-b md:border-b-0 border-neutral-200" : ""}`}
                    >
                      {p.image && (
                        <Link
                          href={`/${p.slug}`}
                          className="relative block h-24 w-24 md:h-32 md:w-32 overflow-hidden bg-neutral-100 shrink-0"
                        >
                          <Image
                            src={p.image}
                            alt=""
                            fill
                            sizes="128px"
                            className="object-cover"
                          />
                        </Link>
                      )}
                      <div className="flex flex-col justify-center">
                        {p.category && (
                          <span className="small-caps text-brand-500">{p.category.name}</span>
                        )}
                        <h3 className="mt-3 font-editorial text-xl font-medium leading-tight">
                          <Link href={`/${p.slug}`} className="link-editorial">
                            {p.title}
                          </Link>
                        </h3>
                        <time className="mt-3 small-caps text-neutral-500">
                          {new Date(p.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                    </article>
                  ))}
                </div>
                <Hairline />
              </>
            )}
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      <section className="bg-paper-warm py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <SectionMark number="—" label="The Dispatch" />
          <h2 className="mt-6 editorial-display text-4xl md:text-5xl">
            A short letter, monthly.
          </h2>
          <p className="mt-5 font-editorial italic text-lg text-neutral-700 max-w-md">
            Stories from the field, prayer requests, project updates — and nothing else.
          </p>
          <form
            action="/api/newsletter"
            method="post"
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end"
          >
            <label className="flex-1">
              <span className="small-caps block text-neutral-600 mb-2">Email Address</span>
              <input
                type="email"
                name="email"
                required
                placeholder="you@parish.org"
                className="w-full border-0 border-b border-rule bg-transparent px-0 py-3 text-lg font-editorial italic text-ink placeholder:text-neutral-400 focus:border-brand-500 focus:outline-none focus:ring-0"
              />
            </label>
            <button
              type="submit"
              className="bg-ink px-7 py-4 small-caps text-paper hover:bg-brand-500 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
