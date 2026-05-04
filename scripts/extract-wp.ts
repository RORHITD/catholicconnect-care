#!/usr/bin/env bun
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, extname, basename } from "node:path";

const WP_BASE = "https://catholicconnect.care";
const WP_API = `${WP_BASE}/wp-json/wp/v2`;
const OUT_DIR = `${import.meta.dir}/../data`;
const IMG_DIR = `${import.meta.dir}/../public/wp`;

type WpItem = {
  id: number;
  slug: string;
  link: string;
  date: string;
  modified: string;
  status: string;
  type: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  categories?: number[];
  yoast_head_json?: Record<string, unknown>;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
      media_details?: { width: number; height: number };
    }>;
    "wp:term"?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
};

async function fetchAll<T>(endpoint: string): Promise<T[]> {
  const out: T[] = [];
  let page = 1;
  while (true) {
    const url = `${WP_API}/${endpoint}?per_page=100&page=${page}&_embed=1&status=publish`;
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 400) break;
      throw new Error(`Failed: ${url} → ${res.status}`);
    }
    const data = (await res.json()) as T[];
    if (!data.length) break;
    out.push(...data);
    const totalPages = Number(res.headers.get("x-wp-totalpages") ?? "1");
    if (page >= totalPages) break;
    page++;
  }
  return out;
}

function extractImageUrls(html: string): string[] {
  const urls = new Set<string>();
  const patterns = [
    /<img[^>]+src=["']([^"']+)["']/g,
    /<img[^>]+srcset=["']([^"']+)["']/g,
    /background-image\s*:\s*url\(["']?([^"')]+)["']?\)/g,
    /url\((https?:\/\/[^)]+\.(?:jpe?g|png|webp|gif|svg|avif))\)/gi,
    /(https?:\/\/[^\s"'<>]+\.(?:jpe?g|png|webp|gif|svg|avif))/gi,
  ];
  for (const re of patterns) {
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) {
      const captured = m[1];
      if (captured.includes(",")) {
        for (const part of captured.split(",")) {
          const u = part.trim().split(/\s+/)[0];
          if (u.startsWith("http")) urls.add(u);
        }
      } else if (captured.startsWith("http")) {
        urls.add(captured);
      }
    }
  }
  return [...urls].filter((u) => u.includes("catholicconnect.care") || u.includes("wp-content"));
}

function localPathFor(url: string): string {
  const u = new URL(url);
  const path = u.pathname.replace(/^\/+/, "");
  return `${IMG_DIR}/${path}`;
}

function localUrlFor(url: string): string {
  try {
    const u = new URL(url);
    if (!u.pathname.includes("/wp-content/")) return url;
    return `/wp${u.pathname}`;
  } catch {
    return url;
  }
}

async function downloadImage(url: string): Promise<{ ok: boolean; path: string }> {
  const dest = localPathFor(url);
  if (existsSync(dest)) return { ok: true, path: dest };
  try {
    const res = await fetch(url);
    if (!res.ok) return { ok: false, path: dest };
    const buf = await res.arrayBuffer();
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(buf));
    return { ok: true, path: dest };
  } catch {
    return { ok: false, path: dest };
  }
}

async function pLimit<T>(items: T[], concurrency: number, fn: (t: T) => Promise<void>) {
  const queue = [...items];
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      const next = queue.shift();
      if (next === undefined) break;
      await fn(next);
    }
  });
  await Promise.all(workers);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(IMG_DIR, { recursive: true });

  console.log("→ Fetching pages...");
  const pages = await fetchAll<WpItem>("pages");
  console.log(`  got ${pages.length} pages`);

  console.log("→ Fetching posts...");
  const posts = await fetchAll<WpItem>("posts");
  console.log(`  got ${posts.length} posts`);

  console.log("→ Fetching categories...");
  const cats = await fetchAll<{ id: number; name: string; slug: string }>("categories");

  await writeFile(`${OUT_DIR}/wp-pages.json`, JSON.stringify(pages, null, 2));
  await writeFile(`${OUT_DIR}/wp-posts.json`, JSON.stringify(posts, null, 2));
  await writeFile(`${OUT_DIR}/wp-categories.json`, JSON.stringify(cats, null, 2));

  console.log("→ Collecting image URLs...");
  const allImgs = new Set<string>();
  for (const item of [...pages, ...posts]) {
    for (const u of extractImageUrls(item.content.rendered)) allImgs.add(u);
    for (const u of extractImageUrls(item.title.rendered)) allImgs.add(u);
    const fm = item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    if (fm) allImgs.add(fm);
  }
  console.log(`  found ${allImgs.size} unique image URLs`);

  console.log("→ Downloading images (concurrency=8)...");
  let done = 0;
  let failed = 0;
  await pLimit([...allImgs], 8, async (url) => {
    const r = await downloadImage(url);
    done++;
    if (!r.ok) failed++;
    if (done % 20 === 0) console.log(`    ${done}/${allImgs.size} (${failed} failed)`);
  });
  console.log(`  done: ${done - failed}/${allImgs.size} downloaded, ${failed} failed`);

  const imageMap: Record<string, string> = {};
  for (const url of allImgs) imageMap[url] = localUrlFor(url);
  await writeFile(`${OUT_DIR}/image-map.json`, JSON.stringify(imageMap, null, 2));

  console.log("\n✓ Extraction complete");
  console.log(`  data/      ${pages.length} pages, ${posts.length} posts, ${cats.length} cats`);
  console.log(`  public/wp/ ${done - failed} images`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
