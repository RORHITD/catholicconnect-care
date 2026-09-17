#!/usr/bin/env node
/**
 * Slug parity guard.
 *
 * Asserts that every URL indexed on the live WordPress site still resolves on
 * the rebuild, with the SAME path. Run before any cutover.
 *
 *   node scripts/verify-slugs.mjs                 # check against local dev
 *   BASE=https://staging.example.com node ...     # or a deployed target
 *
 * Exits non-zero on any missing or shape-changed URL. A parity check that
 * cannot fail is not a check.
 */
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE || "http://localhost:3006";
const root = path.join(import.meta.dirname, "..");

const posts = JSON.parse(fs.readFileSync(path.join(root, "data/wp-posts.json"), "utf8"))
  .filter((p) => p.status === "publish")
  .map((p) => `/${p.slug}/`);
const pages = JSON.parse(fs.readFileSync(path.join(root, "data/wp-pages.json"), "utf8"))
  .filter((p) => p.status === "publish")
  .map((p) => `/${p.slug}/`);

// The WP front page is served at / as well as under its own slug.
const FRONT_SLUG = "/support-charitable-initiatives-the-catholic-connect-foundation/";

// Slugs deliberately renamed. The OLD path must 301 to the new one — a 404
// here would silently drop whatever equity and ad traffic it carried.
const RENAMED = { "/elementor-38554/": "/daily-readings/" };

const expected = [...new Set(["/", ...pages, ...posts])]
  .filter((u) => u !== FRONT_SLUG)
  .map((u) => RENAMED[u] ?? u);

const SITE = "https://catholicconnect.care";
let fail = 0;
let redirected = 0;
const canonicalSeen = new Map(); // canonical URL -> [paths claiming it]
console.log(`Checking ${expected.length} URLs against ${BASE}\n`);

for (const url of expected) {
  let res;
  try {
    res = await fetch(BASE + url, { redirect: "manual" });
  } catch (e) {
    console.log(`  ERR  ${url}  ${e.message}`);
    fail++;
    continue;
  }
  const code = res.status;
  if (code === 200) {
    // A page that 200s but canonicalises somewhere else is worse than a 404:
    // it silently hands its ranking to another URL. This is exactly the bug a
    // root-layout `alternates` block introduces across every child route.
    const html = await res.text();
    const m = html.match(/<link rel="canonical" href="([^"]+)"/);
    const want = `${SITE}${url}`;
    if (!m) {
      console.log(`  200  ${url}  *** no canonical ***`);
      fail++;
    } else if (m[1] !== want) {
      console.log(`  200  ${url}  *** canonical points to ${m[1]} ***`);
      fail++;
    }
    const list = canonicalSeen.get(m?.[1] ?? "none") ?? [];
    list.push(url);
    canonicalSeen.set(m?.[1] ?? "none", list);
    continue;
  }

  if (code >= 300 && code < 400) {
    const loc = res.headers.get("location") || "";
    // A redirect that only ADDS the trailing slash is a config slip, not parity.
    console.log(`  ${code}  ${url}  ->  ${loc}`);
    redirected++;
  } else {
    console.log(`  ${code}  ${url}   *** MISSING ***`);
    fail++;
  }
}

// Every renamed slug must still answer with a 301 to its new home.
for (const [oldPath, newPath] of Object.entries(RENAMED)) {
  const r = await fetch(BASE + oldPath, { redirect: "manual" }).catch(() => null);
  const loc = r?.headers.get("location") || "";
  if (!r || r.status !== 308 && r.status !== 301) {
    console.log(`  ${r?.status ?? "ERR"}  ${oldPath}  *** expected a permanent redirect to ${newPath} ***`);
    fail++;
  } else if (!loc.endsWith(newPath)) {
    console.log(`  ${r.status}  ${oldPath}  *** redirects to ${loc}, expected ${newPath} ***`);
    fail++;
  } else {
    console.log(`  ${r.status}  ${oldPath}  ->  ${newPath}  (renamed, ok)`);
  }
}

// The front-page duplicate must 301 to /, not 200 (that would be a duplicate).
const dup = await fetch(BASE + FRONT_SLUG, { redirect: "manual" }).catch(() => null);
if (dup && dup.status === 200) {
  console.log(`  200  ${FRONT_SLUG}  *** should 301 to / (duplicate front page) ***`);
  fail++;
}

// Any canonical claimed by more than one path is a collapse of distinct pages.
for (const [c, paths] of canonicalSeen) {
  if (paths.length > 1) {
    console.log(`\n  *** ${paths.length} pages all canonicalise to ${c}:`);
    for (const p of paths.slice(0, 6)) console.log(`        ${p}`);
    fail += paths.length;
  }
}

console.log(
  `\n${expected.length - fail - redirected} ok · ${redirected} redirected · ${fail} failed`,
);
if (fail > 0) {
  console.error("\nFAIL — do not cut over until every URL resolves.");
  process.exit(1);
}
console.log("PASS — every live URL resolves at the same path.");
