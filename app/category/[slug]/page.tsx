import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import postsData from "@/data/wp-posts.json";
import categoriesData from "@/data/wp-categories.json";
import { decodeHtml, plainExcerpt } from "@/lib/wp-utils";

type Params = { slug: string };
type Cat = { id: number; name: string; slug: string };

export function generateStaticParams() {
  return categoriesData.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await props.params;
  const cat = (categoriesData as Cat[]).find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: `${cat.name} — Faith in Action`,
    description: `Posts from The Catholic Connect Foundation in the ${cat.name} category.`,
  };
}

export default async function CategoryPage(props: { params: Promise<Params> }) {
  const { slug } = await props.params;
  const cat = (categoriesData as Cat[]).find((c) => c.slug === slug);
  if (!cat) notFound();

  const posts = postsData
    .filter((p) => p.status === "publish")
    .filter((p) => p._embedded?.["wp:term"]?.[0]?.some((t) => t.id === cat.id))
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <section className="bg-neutral-900 py-16 text-cream-50 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Link href="/faith-in-action" className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-400 hover:text-brand-200 transition">
            ← Back to Stories &amp; News
          </Link>
          <h1 className="mt-4 text-4xl text-cream-50 md:text-5xl lg:text-6xl">
            {cat.name}
          </h1>
          <p className="mt-3 text-cream-100/85">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-neutral-700">No posts yet in this category.</p>
          ) : (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => {
                const fm = p._embedded?.["wp:featuredmedia"]?.[0]?.source_url?.replace(
                  /^https?:\/\/(www\.)?catholicconnect\.care/,
                  "/wp",
                );
                return (
                  <article key={p.slug} className="group flex flex-col overflow-hidden rounded-2xl bg-cream-50 ring-1 ring-neutral-200 transition hover:shadow-lg">
                    {fm && (
                      <Link href={`/${p.slug}`} className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                        <Image src={fm} alt={decodeHtml(p.title.rendered)} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
                      </Link>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="text-xl leading-snug text-neutral-900">
                        <Link href={`/${p.slug}`} className="hover:text-brand-600 transition">
                          {decodeHtml(p.title.rendered)}
                        </Link>
                      </h2>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-700">
                        {plainExcerpt(p.excerpt.rendered || p.content.rendered, 200)}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-5">
                        <Link href={`/${p.slug}`} className="text-sm font-semibold text-brand-600 hover:text-brand-600 transition">
                          Read More »
                        </Link>
                        <time className="text-xs text-neutral-600">
                          {new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                        </time>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
