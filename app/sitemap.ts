import type { MetadataRoute } from "next";
import postsData from "@/data/wp-posts.json";
import categoriesData from "@/data/wp-categories.json";

const SITE = "https://catholicconnect.care";

const staticPages: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/donate", changeFrequency: "weekly", priority: 0.95 },
  { path: "/make-an-online-donation", changeFrequency: "weekly", priority: 0.9 },
  { path: "/feeding-the-poor-fund", changeFrequency: "weekly", priority: 0.9 },
  { path: "/emergency-relief-fund", changeFrequency: "weekly", priority: 0.9 },
  { path: "/educational-content-fund", changeFrequency: "weekly", priority: 0.85 },
  { path: "/donor-advised-funds", changeFrequency: "monthly", priority: 0.7 },
  { path: "/donate-with-crypto", changeFrequency: "monthly", priority: 0.7 },
  { path: "/double-your-donation", changeFrequency: "monthly", priority: 0.7 },
  { path: "/feeding-the-hungry-2", changeFrequency: "monthly", priority: 0.6 },
  { path: "/emergency-relief-2", changeFrequency: "monthly", priority: 0.6 },
  { path: "/elementor-38554", changeFrequency: "weekly", priority: 0.5 },
  { path: "/faith-in-action", changeFrequency: "daily", priority: 0.85 },
  { path: "/news-of-the-catholic-church", changeFrequency: "daily", priority: 0.7 },
  { path: "/daily-readings-of-the-catholic-church", changeFrequency: "daily", priority: 0.7 },
  { path: "/contact-us", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = staticPages.map((p) => ({
    url: `${SITE}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const posts = postsData
    .filter((p) => p.status === "publish")
    .map((p) => ({
      url: `${SITE}/${p.slug}`,
      lastModified: new Date(p.modified),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }));

  const usedCategoryIds = new Set<number>();
  for (const p of postsData) {
    const cat = p._embedded?.["wp:term"]?.[0]?.[0];
    if (cat) usedCategoryIds.add(cat.id);
  }
  const categories = categoriesData
    .filter((c) => usedCategoryIds.has(c.id))
    .map((c) => ({
      url: `${SITE}/category/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }));

  return [...pages, ...posts, ...categories];
}
