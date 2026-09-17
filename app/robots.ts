import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Crawler policy.
 *
 * The assistant crawlers are listed explicitly rather than left to the `*`
 * rule. Two reasons: it documents an intentional decision (this is a charity
 * that WANTS to be cited in AI answers), and SiteGround's bot protection was
 * challenging non-browser clients with an sgcaptcha interstitial — content an
 * assistant cannot read cannot be cited. Moving off that host is what makes
 * this policy actually take effect.
 */
export default function robots(): MetadataRoute.Robots {
  const allowAll = { allow: "/", disallow: ["/api/"] };

  return {
    rules: [
      { userAgent: "*", ...allowAll },
      // Search
      { userAgent: "Googlebot", ...allowAll },
      { userAgent: "Bingbot", ...allowAll },
      // Assistant / answer-engine crawlers — explicitly welcome.
      { userAgent: "GPTBot", ...allowAll },
      { userAgent: "OAI-SearchBot", ...allowAll },
      { userAgent: "ChatGPT-User", ...allowAll },
      { userAgent: "ClaudeBot", ...allowAll },
      { userAgent: "Claude-User", ...allowAll },
      { userAgent: "PerplexityBot", ...allowAll },
      { userAgent: "Google-Extended", ...allowAll },
      { userAgent: "Applebot-Extended", ...allowAll },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
