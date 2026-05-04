#!/usr/bin/env bun
import { readFileSync, writeFileSync } from "node:fs";

const pages = JSON.parse(readFileSync(`${import.meta.dir}/../data/wp-pages.json`, "utf-8"));

function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_m, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_m, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function extract(html: string) {
  const out: { tag: string; text: string }[] = [];
  const re = /<(h[1-6]|p|li|figcaption)[^>]*>([\s\S]*?)<\/\1>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const tag = m[1].toLowerCase();
    const innerHtml = m[2];
    if (innerHtml.includes("<" + tag)) continue;
    const text = decodeEntities(innerHtml.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
    if (text) out.push({ tag, text });
  }
  return out;
}

const targetSlugs = [
  "feeding-the-poor-fund",
  "emergency-relief-fund",
  "educational-content-fund",
  "donor-advised-funds",
  "donate",
  "make-an-online-donation",
  "donate-with-crypto",
  "double-your-donation",
  "contact-us",
  "privacy-policy",
  "news-of-the-catholic-church",
  "daily-readings-of-the-catholic-church",
  "faith-in-action",
  "feeding-the-hungry-2",
  "emergency-relief-2",
  "elementor-38554",
];

const result: Record<string, { title: string; nodes: { tag: string; text: string }[] }> = {};
for (const slug of targetSlugs) {
  const p = pages.find((x: { slug: string }) => x.slug === slug);
  if (!p) continue;
  result[slug] = {
    title: decodeEntities(p.title.rendered),
    nodes: extract(p.content.rendered),
  };
}

writeFileSync(`${import.meta.dir}/../data/page-text.json`, JSON.stringify(result, null, 2));
console.log(`Wrote ${Object.keys(result).length} pages of text content`);
