import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import postsData from "@/data/wp-posts.json";
import { decodeHtml, stripWp, plainExcerpt } from "@/lib/wp-utils";
import JsonLd from "@/components/seo/json-ld";
import { graph, article, breadcrumbs } from "@/lib/schema";
import { canonical } from "@/lib/site";
import DonorboxEmbed from "@/components/donorbox/donorbox-embed";
import { SEO_OVERRIDES } from "@/data/seo-overrides";
import ContextualGiving from "@/components/sections/contextual-giving";
import PreferredSourceButton from "@/components/seo/preferred-source";

/**
 * Posts whose search intent is explicitly "I want to give money".
 *
 * /top-15-catholic-charities-to-donate-to-in-the-usa/ alone drew 11,422
 * pageviews in 480 days and fired ZERO checkout events, because the only route
 * to giving was two inline text links. It is the highest-intent page on the
 * site and the only content page that converts at all (3 key events, $45).
 * Put the form where the intent already is.
 */
const DONATION_INTENT_SLUGS = new Set([
  "top-15-catholic-charities-to-donate-to-in-the-usa",
  "catholic-nonprofits",
]);

type Params = { slug: string };

const posts = postsData.filter((p) => p.status === "publish");

function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  const override = SEO_OVERRIDES[slug];
  const title = override?.title ?? decodeHtml(post.title.rendered);
  const description =
    override?.description ?? plainExcerpt(post.excerpt.rendered || post.content.rendered, 160);
  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url?.replace(
    /^https?:\/\/(www\.)?catholicconnect\.care/,
    "/wp",
  );
  return {
    // Articles carry no brand suffix: WordPress titles are already long, and
    // the brand lives in og:site_name and the Organization schema. Google
    // shows roughly 60 characters.
    title: { absolute: title },
    description,
    alternates: { canonical: canonical(slug) },
    openGraph: {
      url: canonical(slug),
      type: "article",
      title,
      description,
      images: image ? [image] : undefined,
      publishedTime: post.date,
      modifiedTime: post.modified,
    },
  };
}

export default async function PostPage(props: { params: Promise<Params> }) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const title = decodeHtml(post.title.rendered);
  const featured = post._embedded?.["wp:featuredmedia"]?.[0];
  const heroImage = featured?.source_url?.replace(/^https?:\/\/(www\.)?catholicconnect\.care/, "/wp") ?? null;
  const heroAlt = featured?.alt_text ?? title;
  const category = post._embedded?.["wp:term"]?.[0]?.[0];
  const html = stripWp(post.content.rendered);

  const related = posts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => {
      if (!category) return false;
      return p._embedded?.["wp:term"]?.[0]?.some((t) => t.id === category.id);
    })
    .slice(0, 3);

  const description = plainExcerpt(post.excerpt.rendered || post.content.rendered, 160);

  return (
    <>
      <JsonLd
        data={graph(
          article({
            title,
            description,
            path: slug,
            published: post.date,
            modified: post.modified,
            image: heroImage,
          }),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Faith in Action", path: "/faith-in-action" },
            { name: title, path: slug },
          ]),
        )}
      />
      <article>
        <header className="bg-neutral-900 py-16 text-cream-50 lg:py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <Link href="/faith-in-action" className="text-brand-400 hover:text-brand-200 transition">
                Stories &amp; News
              </Link>
              {category && (
                <>
                  <span className="text-cream-100/40">/</span>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-cream-100/80 hover:text-brand-400 transition"
                  >
                    {category.name}
                  </Link>
                </>
              )}
            </div>
            <h1 className="mt-5 text-3xl leading-[1.15] md:text-5xl">{title}</h1>
            <time className="mt-5 block text-sm text-cream-100/70">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </header>

        {heroImage && (
          <div className="relative -mt-8 lg:-mt-12">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-neutral-200 shadow-xl">
                <Image src={heroImage} alt={heroAlt} fill priority sizes="(min-width: 1024px) 56rem, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="prose-content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </article>
      {DONATION_INTENT_SLUGS.has(slug) && (
        <section className="bg-neutral-50 py-16">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2 className="text-3xl text-neutral-900">Give to a vetted Catholic charity today</h2>
            <p className="mt-3 text-neutral-600">
              The Catholic Connect Foundation funds priests, nuns and orphanages doing this
              work directly. Every gift is tax-deductible.
            </p>
            <div className="mt-8">
              <Suspense fallback={<div style={{ minHeight: 760 }} />}>
                  <DonorboxEmbed height={760} placement={`post-${slug}`} lazy />
                </Suspense>
            </div>
          </div>
        </section>
      )}
      
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <ContextualGiving slug={slug} />
        <PreferredSourceButton />
      </div>

      {related.length > 0 && (
        <section className="bg-neutral-50 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl text-neutral-900 md:text-3xl">More from our blog</h2>
            <div className="mt-8 grid gap-7 md:grid-cols-3">
              {related.map((p) => {
                const fm = p._embedded?.["wp:featuredmedia"]?.[0]?.source_url?.replace(
                  /^https?:\/\/(www\.)?catholicconnect\.care/,
                  "/wp",
                );
                return (
                  <article key={p.slug} className="overflow-hidden rounded-2xl bg-cream-50 ring-1 ring-neutral-200">
                    {fm && (
                      <Link href={`/${p.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-neutral-100">
                        <Image src={fm} alt={decodeHtml(p.title.rendered)} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                      </Link>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg leading-snug text-neutral-900">
                        <Link href={`/${p.slug}`} className="hover:text-brand-600 transition">
                          {decodeHtml(p.title.rendered)}
                        </Link>
                      </h3>
                      <Link
                        href={`/${p.slug}`}
                        className="mt-3 inline-block text-sm font-semibold text-brand-600 hover:text-brand-600 transition"
                      >
                        Read More »
                      </Link>
                    </div>
                  
      </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
