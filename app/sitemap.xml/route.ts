import postsData from "@/data/wp-posts.json";
import categoriesData from "@/data/wp-categories.json";
import { canonical } from "@/lib/site";

/**
 * Sitemap as a route handler rather than Next's `sitemap.ts` convention.
 *
 * Reason: Next's MetadataRoute.Sitemap serializer normalises away the trailing
 * slash, so with `trailingSlash: true` the sitemap advertised /donate while the
 * page canonicalised to /donate/. Google treats those as different URLs and
 * the mismatch is exactly the kind of quiet signal-splitting this migration is
 * meant to fix. Emitting the XML directly keeps sitemap and canonical identical.
 */
export const dynamic = "force-static";

type Entry = { path: string; lastmod: Date; changefreq: string; priority: number };

const staticPages: { path: string; changefreq: string; priority: number }[] = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/donate", changefreq: "weekly", priority: 0.95 },
  { path: "/make-an-online-donation", changefreq: "weekly", priority: 0.9 },
  { path: "/feeding-the-poor-fund", changefreq: "weekly", priority: 0.9 },
  { path: "/emergency-relief-fund", changefreq: "weekly", priority: 0.9 },
  { path: "/educational-content-fund", changefreq: "weekly", priority: 0.85 },
  { path: "/donor-advised-funds", changefreq: "monthly", priority: 0.7 },
  { path: "/donate-with-crypto", changefreq: "monthly", priority: 0.7 },
  { path: "/double-your-donation", changefreq: "monthly", priority: 0.7 },
  { path: "/feeding-the-hungry-2", changefreq: "monthly", priority: 0.6 },
  { path: "/emergency-relief-2", changefreq: "monthly", priority: 0.6 },
  { path: "/daily-readings", changefreq: "daily", priority: 0.6 },
  { path: "/faith-in-action", changefreq: "daily", priority: 0.85 },
  { path: "/news-of-the-catholic-church", changefreq: "daily", priority: 0.7 },
  { path: "/daily-readings-of-the-catholic-church", changefreq: "daily", priority: 0.7 },
  { path: "/contact-us", changefreq: "monthly", priority: 0.6 },
  { path: "/privacy-policy", changefreq: "yearly", priority: 0.3 },
];

export function GET() {
  const published = postsData.filter((p) => p.status === "publish");

  const newest = published.reduce(
    (max, p) => (new Date(p.modified) > max ? new Date(p.modified) : max),
    new Date(0),
  );

  const entries: Entry[] = [
    ...staticPages.map((p) => ({
      path: p.path,
      lastmod: newest,
      changefreq: p.changefreq,
      priority: p.priority,
    })),
    // Every published post, including the 11 that Yoast omitted from the live
    // sitemap while leaving them reachable and indexable.
    ...published.map((p) => ({
      path: `/${p.slug}`,
      lastmod: new Date(p.modified),
      changefreq: "monthly",
      priority: 0.65,
    })),
  ];

  const usedCategoryIds = new Set<number>();
  for (const p of published) {
    const cat = p._embedded?.["wp:term"]?.[0]?.[0];
    if (cat) usedCategoryIds.add(cat.id);
  }
  for (const c of categoriesData) {
    if (usedCategoryIds.has(c.id)) {
      entries.push({
        path: `/category/${c.slug}`,
        lastmod: newest,
        changefreq: "weekly",
        priority: 0.5,
      });
    }
  }

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(
      (e) =>
        `  <url><loc>${canonical(e.path)}</loc>` +
        `<lastmod>${e.lastmod.toISOString().slice(0, 10)}</lastmod>` +
        `<changefreq>${e.changefreq}</changefreq>` +
        `<priority>${e.priority.toFixed(2)}</priority></url>`,
    ),
    "</urlset>",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
