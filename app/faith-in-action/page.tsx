import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import postsData from "@/data/wp-posts.json";
import { decodeHtml, plainExcerpt } from "@/lib/wp-utils";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/faith-in-action") },
  title: { absolute: "Faith in Action — Stories from the Field" },
  description:
    "Stories, news, and inspiration from The Catholic Connect Foundation — Catholic charity work, role models, saints, and reflections on Scripture.",
};

type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string | null;
  imageAlt: string;
  category: { name: string; slug: string } | null;
};

function getPosts(): Post[] {
  return postsData
    .filter((p) => p.status === "publish")
    .sort((a, b) => b.date.localeCompare(a.date))
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
        excerpt: plainExcerpt(p.excerpt.rendered || p.content.rendered, 200),
        image: localImage,
        imageAlt: featured?.alt_text ?? decodeHtml(p.title.rendered),
        category: cat ? { name: cat.name, slug: cat.slug } : null,
      };
    });
}

export default function FaithInActionPage() {
  const posts = getPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  const usedCats = new Map<string, { name: string; slug: string; count: number }>();
  for (const p of posts) {
    if (!p.category) continue;
    const existing = usedCats.get(p.category.slug);
    if (existing) existing.count++;
    else usedCats.set(p.category.slug, { ...p.category, count: 1 });
  }
  const categories = [...usedCats.values()].sort((a, b) => b.count - a.count);

  return (
    <>
      <section className="bg-neutral-900 py-20 text-cream-50 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-400">
            Stories &amp; News
          </p>
          <h1 className="mt-4 text-4xl leading-tight md:text-5xl lg:text-6xl">
            Faith in Action: Catholic Charity Bringing Hope to The World
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-cream-100/85">
            Stories of faith, charity, and the Catholic communities making a difference around the world.
          </p>
        </div>
      </section>

      {featured && (
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Link
              href={`/${featured.slug}`}
              className="group grid overflow-hidden rounded-3xl bg-cream-50 ring-1 ring-neutral-200 transition hover:shadow-xl lg:grid-cols-[1.2fr_1fr]"
            >
              {featured.image && (
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 lg:aspect-auto">
                  <Image
                    src={featured.image}
                    alt={featured.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                    priority
                  />
                </div>
              )}
              <div className="flex flex-col justify-center p-8 lg:p-12">
                {featured.category && (
                  <span className="inline-flex w-fit items-center rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-600">
                    {featured.category.name}
                  </span>
                )}
                <h2 className="mt-4 text-3xl leading-snug text-neutral-900 md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 leading-relaxed text-neutral-700">{featured.excerpt}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm font-semibold text-brand-600 group-hover:text-brand-600 transition">
                    Read More »
                  </span>
                  <time className="text-xs text-neutral-600">
                    {new Date(featured.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {categories.length > 0 && (
        <section className="border-y border-neutral-200 bg-neutral-50 py-6">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 lg:px-8">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">
              Topics:
            </span>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="rounded-full bg-cream-50 px-4 py-1.5 text-sm font-medium text-neutral-900 ring-1 ring-neutral-200 hover:bg-brand-50 hover:text-neutral-900 transition"
              >
                {c.name} <span className="text-neutral-500">{c.count}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <article
                key={p.slug}
                className="group flex flex-col overflow-hidden rounded-2xl bg-cream-50 ring-1 ring-neutral-200 transition hover:shadow-lg"
              >
                {p.image && (
                  <Link href={`/${p.slug}`} className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </Link>
                )}
                <div className="flex flex-1 flex-col p-6">
                  {p.category && (
                    <span className="inline-flex w-fit items-center rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-600">
                      {p.category.name}
                    </span>
                  )}
                  <h3 className="mt-4 text-xl leading-snug text-neutral-900">
                    <Link href={`/${p.slug}`} className="hover:text-brand-600 transition">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-700">{p.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <Link
                      href={`/${p.slug}`}
                      className="text-sm font-semibold text-brand-600 hover:text-brand-600 transition"
                    >
                      Read More »
                    </Link>
                    <time className="text-xs text-neutral-600">
                      {new Date(p.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
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
    </>
  );
}
