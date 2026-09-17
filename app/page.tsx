import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import DonorboxEmbed from "@/components/donorbox/donorbox-embed";
import Formation from "@/components/sections/formation";
import postsData from "@/data/wp-posts.json";
import { decodeHtml } from "@/lib/wp-utils";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/") },
};

const initiatives = [
  {
    href: "/feeding-the-poor-fund",
    title: "Feeding The Poor Fund",
    image: "/wp/wp-content/uploads/2022/07/Fr-Deus-Chickens.png",
    alt: "Fr. Deus chicken farm — sustainable feeding project",
    blurb:
      "Donate to support sustainable feeding projects that provide adequate nutrition to families and children that are malnourished.",
    cta: "Learn More & Support",
  },
  {
    href: "/educational-content-fund",
    title: "Educational Content Fund",
    image: "/wp/wp-content/uploads/2022/12/kal-visuals-jA7iWRaJruA-unsplash-scaled.jpg",
    alt: "Hands holding rosary in prayer",
    blurb:
      "We support educational content so we can educate, empower, and help people commit their time and resources to helping others.",
    cta: "Donate & Support",
  },
  {
    href: "/emergency-relief-fund",
    title: "Emergency Relief Fund",
    image: "/wp/wp-content/uploads/2022/07/Sri-Lanka-Bombing-The-Catholic-Connect-Foundation-Emergency-Relief-2.png",
    alt: "Emergency relief — Sri Lanka bombing response",
    blurb:
      "We help support emergency relief projects including assisting people in medical need, assisting victims of terror attacks, and more.",
    cta: "Learn More & Support",
  },
];

const feedingFeatures = [
  {
    image: "/wp/wp-content/uploads/2022/07/Fr-Deus-Chickens-2.png",
    title: "Chicken Farms",
    body: "The feeding projects we support many times try to achieve optimal sustainability so they can keep growing and sustaining their communities for the long-term.",
  },
  {
    image: "/wp/wp-content/uploads/2022/07/Fr-Deus-Educating-Children-1.png",
    title: "Sustainable Growth",
    body: "“Give a man a fish, and you feed him for a day; show him how to catch fish, and you feed him for a lifetime.”",
  },
  {
    image: "/wp/wp-content/uploads/2022/07/Copy-of-Sisters-Franiscan-Minorees-The-Catholic-Connect-Foundation.png",
    title: "Supporting Orphanages",
    body: "We help support multiple orphanages across the globe and we are open to receiving requests from more orphanages.",
  },
  {
    image: "/wp/wp-content/uploads/2022/07/Fr-Deus-Chickens-3.png",
    title: "Supporting Children",
    body: "Not all of our feeding the poor fund goes to orphanages. Some projects consist of helping buy food for organizations to keep feeding their youth.",
  },
];

const emergencyFeatures = [
  {
    image: "/wp/wp-content/uploads/2022/07/Sri-Lanka-Bombing-The-Catholic-Connect-Foundation-Emergency-Relief-2.png",
    title: "Church Attacks",
    body: "Our emergency relief fund has supported and will keep supporting churches who are attacked or people who are injured during attacks on churches across the globe.",
  },
  {
    image: "/wp/wp-content/uploads/2022/07/Typhoon-Philippines-The-Catholic-Connect-Foundation.png",
    title: "Natural Disasters",
    body: "We will keep providing assistance for those most in need while hit by natural disasters. Many times, communities flood and families have a hard time getting by, we want to be there for them.",
  },
  {
    image: "/wp/wp-content/uploads/2022/07/Fr-Deus-Chickens-6.png",
    title: "Medical Emergencies",
    body: "Whether it is a baby in need, an orphan, a child, or adults that experience unexpected medical emergencies, we want to be there for them and provide assistance to them and their families.",
  },
  {
    image: "/wp/wp-content/uploads/2022/12/sam-mcghee-KieCLNzKoBo-unsplash-scaled.jpg",
    title: "Family Emergencies",
    body: "We have helped children that unexpectedly lose their parents and provided support for the family members that support those children. We continue to be open to helping more families in emergency situations.",
  },
];

const testimonials = [
  {
    quote:
      "Thank you so much my brothers and sisters for the money. You are a blessing to our Children in Uganda. Many blessings to this ministry!",
    name: "Fr. Deus",
    role: "Catholic Priest Serving The Poor In Uganda Through His Orphanage",
    image: "/wp/wp-content/uploads/2022/07/965092.jpg",
  },
  {
    quote:
      "Kindly convey my sincere gratitude to all those who contributed towards this fund [to help the families of the deceased] by the senseless attack on Easter Sunday.",
    name: "Cardinal Albert Malcolm Ranjith",
    role: "Metropolitan Archbishop of Colombo",
    image: "/wp/wp-content/uploads/2022/07/eknswc0qxz8.jpg",
  },
  {
    quote: "May the Lord bless your wonderful work — may He bless your many donors. Sincerely in our Lord",
    name: "Bishop Graham Rose",
    role: "Bishop Of The Diocese Of Dundee In South Africa",
    image: "/wp/wp-content/uploads/2022/07/3wgktdw7xye.jpg",
  },
];

const whyChoose = [
  {
    title: "Vetted",
    body:
      "We vet each applicant of our grants. That way our donors know their donation is creating the maximum positive impact. We love helping people and organizations that make a long lasting impact.",
    icon: (
      <path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4Z M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Sustainable",
    body:
      "We love seeing projects that show a sustainable way for growth whether it is through growing an audience for educational efforts or supporting orphanages that create a sustainable food source.",
    icon: (
      <path d="M12 3a9 9 0 0 1 9 9c0 4-3 7-7 7M12 21a9 9 0 0 1-9-9c0-4 3-7 7-7M8 8l4-4M16 16l-4 4" strokeLinecap="round" strokeLinejoin="round" />
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

const stats = [
  {
    value: "776+",
    label: "children supported and cared for through our donors' support.",
  },
  {
    value: "359+",
    label: "children helped through education, faith formation, and tuition coverage.",
  },
  {
    value: "7M+",
    label:
      "Catholics we reach across the globe through online channels because of the Catholic community that helps share and empower our mission.",
  },
  {
    value: "100%",
    label: "of our executive staff is not paid — we believe in this mission.",
  },
];

function getLatestPosts(limit = 3) {
  const sorted = [...postsData]
    .filter((p) => p.status === "publish")
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
  return sorted.map((p) => {
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

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-neutral-900 text-cream-50">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          autoPlay
          muted
          loop
          playsInline
          poster="/wp/wp-content/uploads/2022/07/Rectangle-5209.png"
        >
          <source src="/wp/wp-content/uploads/2022/08/pexels-tima-miroshnichenko-5988655.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/85 via-neutral-900/70 to-neutral-900/80" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pt-16 pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,600px)] lg:items-center lg:gap-16 lg:px-8 lg:pt-24 lg:pb-24">
          <div className="flex flex-col justify-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-brand-400">
              The Catholic Connect Foundation
            </p>
            <h1 className="text-4xl leading-[1.08] md:text-5xl lg:text-6xl">
              Donate Today
              <br />
              <span className="text-brand-400">&</span> Support Our Mission
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-100/90">
              Help Catholic priests, nuns, orphanages, and other nonprofits achieve their humanitarian and charitable missions across the globe.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-neutral-900 shadow-lg transition hover:bg-brand-600"
              >
                Donate Now
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M3 7h8m0 0L8 4m3 3-3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </Link>
              <Link
                href="/faith-in-action"
                className="inline-flex items-center gap-2 rounded-full border border-cream-100/30 px-7 py-3.5 text-sm font-semibold text-cream-50 transition hover:border-cream-100/60 hover:bg-cream-50/5"
              >
                Read Our Stories
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end" id="donate">
            <div className="w-full max-w-[600px] rounded-2xl bg-cream-50 p-3 shadow-2xl ring-1 ring-black/10 sm:p-4">
              <div className="px-2 pt-2 pb-3 sm:px-3">
                <p className="text-sm font-semibold text-neutral-900">Give securely</p>
                <p className="mt-0.5 text-xs text-neutral-600">
                  501(c)(3) charity · gifts are tax-deductible · one-time or monthly
                </p>
              </div>
              <DonorboxEmbed placement="home-hero" width={600} height={960} />
            </div>
          </div>
        </div>
      </section>

      {/* INTRO + INITIATIVES */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              Our Initiatives
            </p>
            <h2 className="mt-4 text-3xl leading-tight text-neutral-900 md:text-4xl">
              Donate to The Catholic Connect Foundation
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-neutral-700">
              Choose the initiative you would like to support. Our charitable and humanitarian projects fund priests, nuns and organizations serving the poor — and alongside them, the Foundation forms the faithful through free resources like Bible Trivia and Mass Times Near Me.
            </p>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {initiatives.map((it) => (
              <article
                key={it.href}
                className="group flex flex-col overflow-hidden rounded-2xl bg-cream-50 ring-1 ring-neutral-200 transition hover:shadow-xl hover:ring-brand-200"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  <Image
                    src={it.image}
                    alt={it.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-2xl text-neutral-900">
                    {it.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-neutral-700">
                    {it.blurb}
                  </p>
                  <Link
                    href={it.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-600 transition"
                  >
                    {it.cta}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M3 7h8m0 0L8 4m3 3-3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FEEDING PROJECTS */}
      <section className="bg-neutral-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              Feeding Projects
            </p>
            <h2 className="mt-4 text-3xl text-neutral-900 md:text-4xl">
              Learn More About Feeding The Poor Fund
            </h2>
          </div>
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {feedingFeatures.map((f) => (
              <article key={f.title} className="flex flex-col overflow-hidden rounded-2xl bg-cream-50 ring-1 ring-neutral-200">
                <div className="relative aspect-square overflow-hidden bg-neutral-100">
                  <Image
                    src={f.image}
                    alt={f.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-neutral-900">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">{f.body}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/feeding-the-poor-fund"
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-cream-50 transition hover:bg-brand-600"
            >
              Support Feeding the Poor
            </Link>
          </div>
        </div>
      </section>

      {/* EMERGENCY RELIEF */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              Emergency Relief Fund
            </p>
            <h2 className="mt-4 text-3xl text-neutral-900 md:text-4xl">
              Learn More About Who The Emergency Relief Fund Supports
            </h2>
          </div>
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {emergencyFeatures.map((f) => (
              <article key={f.title} className="flex flex-col overflow-hidden rounded-2xl bg-cream-50 ring-1 ring-neutral-200">
                <div className="relative aspect-square overflow-hidden bg-neutral-100">
                  <Image
                    src={f.image}
                    alt={f.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-neutral-900">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">{f.body}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/emergency-relief-fund"
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-cream-50 transition hover:bg-brand-600"
            >
              Support Emergency Relief
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {/* FORMATION — Bible Trivia + Mass Times Near Me */}
      <Formation />

      <section className="relative overflow-hidden bg-neutral-900 py-20 text-cream-50 lg:py-28">
        <div className="absolute inset-0 opacity-[0.05]" aria-hidden>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="testi-cross" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50 25v50M25 50h50" stroke="currentColor" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#testi-cross)" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-400">
              Testimonials
            </p>
            <h2 className="mt-4 text-3xl text-cream-50 md:text-4xl">
              About The Catholic Connect Foundation
            </h2>
          </div>
          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl bg-neutral-800/50 p-8 ring-1 ring-brand-700/50">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-brand-400 mb-4" aria-hidden>
                  <path
                    d="M10 8c-3 0-6 2-6 6 0 3 2 5 5 5 0 3-2 5-4 6l1 2c5-1 8-5 8-12 0-4-2-7-4-7Zm14 0c-3 0-6 2-6 6 0 3 2 5 5 5 0 3-2 5-4 6l1 2c5-1 8-5 8-12 0-4-2-7-4-7Z"
                    fill="currentColor"
                  />
                </svg>
                <blockquote className="text-cream-50/95 leading-relaxed">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-brand-500/50 pt-5">
                  <span className="relative h-12 w-12 flex-none overflow-hidden rounded-full bg-neutral-700">
                    <Image src={t.image} alt={t.name} fill sizes="48px" className="object-cover" />
                  </span>
                  <span>
                    <span className="block font-semibold text-cream-50">{t.name}</span>
                    <span className="block text-xs text-cream-100/70">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
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
            {whyChoose.map((w) => (
              <div key={w.title} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-2 ring-brand-300">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    {w.icon}
                  </svg>
                </div>
                <h3 className="mt-5 text-xl text-neutral-900">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-700">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MONTHLY DONOR CTA */}
      <section className="bg-neutral-50 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-10 text-center text-cream-50 shadow-xl md:p-14">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-400">
              Recurring Giving
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl">
              Consider Becoming a Monthly Donor
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-cream-100/90">
              Our ongoing missions are possible through the generosity of our recurring donor base. It's the way we know how many projects we can sustainably support. If you become a monthly donor of even $5/mo, it helps us keep providing continuous support for those who seriously need our help. God bless you!
            </p>
            <div className="mt-7">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-8 py-3.5 text-sm font-semibold text-neutral-900 shadow transition hover:bg-brand-600"
              >
                Donate &amp; Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST STORIES */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
                Stories &amp; News
              </p>
              <h2 className="mt-4 text-3xl text-neutral-900 md:text-4xl">
                Be Inspired By The Catholic Connect Foundation
              </h2>
            </div>
            <Link
              href="/faith-in-action"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-600 transition"
            >
              Read Latest Stories
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 7h8m0 0L8 4m3 3-3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </Link>
          </div>
          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {latest.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col overflow-hidden rounded-2xl bg-cream-50 ring-1 ring-neutral-200 transition hover:shadow-xl"
              >
                {post.image && (
                  <Link href={`/${post.slug}`} className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </Link>
                )}
                <div className="flex flex-1 flex-col p-6">
                  {post.category && (
                    <span className="inline-flex w-fit items-center rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-600">
                      {post.category.name}
                    </span>
                  )}
                  <h3 className="mt-4 text-xl leading-snug text-neutral-900">
                    <Link href={`/${post.slug}`} className="hover:text-brand-600 transition">
                      {post.title}
                    </Link>
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <Link
                      href={`/${post.slug}`}
                      className="text-sm font-semibold text-brand-600 hover:text-brand-600 transition"
                    >
                      Read More »
                    </Link>
                    <time className="text-xs text-neutral-600">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-neutral-900 py-20 text-cream-50 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-400">
              Our Impact
            </p>
            <h2 className="mt-4 text-3xl text-cream-50 md:text-4xl">
              Since 2019, we have helped support thousands of people
            </h2>
            <p className="mt-4 text-cream-100/85">
              especially children in extreme poverty. Our goal is to support those most in need.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.value} className="rounded-2xl bg-neutral-800/60 p-7 ring-1 ring-neutral-700">
                <div className="text-5xl text-brand-400">{s.value}</div>
                <p className="mt-3 text-sm leading-relaxed text-cream-100/85">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-cream-100 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-3xl text-neutral-900 md:text-4xl">
            Join Our Newsletter
          </h2>
          <p className="mt-3 text-neutral-700">
            Subscribe to get notified of our latest events and stories.
          </p>
          <form
            action="/api/newsletter"
            method="post"
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              className="flex-1 rounded-full border border-neutral-300 bg-cream-50 px-5 py-3 text-sm text-ink placeholder:text-neutral-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-700/20"
            />
            <button
              type="submit"
              className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-cream-50 transition hover:bg-brand-600"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
