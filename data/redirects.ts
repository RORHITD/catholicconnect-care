/**
 * 301 map for the WordPress → Next migration.
 *
 * Rules:
 *  - Every slug that earns impressions keeps its exact path. Only slugs with
 *    negligible organic value are changed, and each change is justified below.
 *  - Host-level redirects (www → apex, http → https) are NOT here. Those belong
 *    at the edge (Coolify/Caddy or Cloudflare) because Next only sees requests
 *    that already reached it. See MIGRATION notes.
 */

export type Redirect = { source: string; destination: string; permanent: boolean; why: string };

export const SLUG_CHANGES: Redirect[] = [
  {
    // 8 organic clicks / 6,225 impressions at position 20.1 over 480 days —
    // negligible. Its ~22,000 sessions came almost entirely from Google Ads
    // DSA. A slug reading "elementor-38554" is a liability in the SERP, in ad
    // previews and in any AI citation, and there is no ranking to protect.
    source: "/elementor-38554",
    // Trailing slash is explicit: with trailingSlash:true a destination
    // without it produces a 308 -> 308 chain, and every hop loses signal.
    destination: "/daily-readings/",
    permanent: true,
    why: "Junk builder slug; negligible organic value; renaming is safe.",
  },
];

/**
 * WordPress surfaces that will 404 on a static Next site and should not.
 * These were live endpoints for years and still attract crawlers and links.
 */
export const WORDPRESS_LEGACY: Redirect[] = [
  { source: "/support-charitable-initiatives-the-catholic-connect-foundation", destination: "/", permanent: true, why: "Front page is reachable at both / and its page slug; collapse the duplicate." },
  { source: "/feed", destination: "/rss.xml", permanent: true, why: "WordPress RSS." },
  { source: "/feed/:path*", destination: "/rss.xml", permanent: true, why: "Category/comment feeds." },
  { source: "/comments/feed", destination: "/rss.xml", permanent: true, why: "WordPress comment feed." },
  { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true, why: "Yoast sitemap index — submitted in Search Console." },
  { source: "/post-sitemap.xml", destination: "/sitemap.xml", permanent: true, why: "Yoast child sitemap." },
  { source: "/page-sitemap.xml", destination: "/sitemap.xml", permanent: true, why: "Yoast child sitemap." },
  { source: "/wp-sitemap.xml", destination: "/sitemap.xml", permanent: true, why: "WordPress core sitemap." },
  { source: "/author/:path*", destination: "/faith-in-action/", permanent: true, why: "Author archives had no unique content." },
  { source: "/tag/:path*", destination: "/faith-in-action/", permanent: true, why: "Tag archives are not rebuilt." },
  { source: "/wp-admin/:path*", destination: "/", permanent: false, why: "Admin is gone; do not 301 (temporary is correct for a removed app surface)." },
  { source: "/wp-login.php", destination: "/", permanent: false, why: "Login is gone." },
];

export const ALL_REDIRECTS: Redirect[] = [...SLUG_CHANGES, ...WORDPRESS_LEGACY];
