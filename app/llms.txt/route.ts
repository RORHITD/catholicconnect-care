import postsData from "@/data/wp-posts.json";
import { decodeHtml, plainExcerpt } from "@/lib/wp-utils";
import { SITE_NAME, SITE_TAGLINE, canonical } from "@/lib/site";

/**
 * /llms.txt — a curated, plain-text map of the site for language models.
 *
 * Generated from the same data the sitemap uses, so it cannot drift out of
 * sync the way a hand-maintained file would.
 */
export const dynamic = "force-static";

export function GET() {
  const posts = postsData.filter((p) => p.status === "publish");

  const lines: string[] = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_TAGLINE}. A US nonprofit that funds Catholic priests, nuns, orphanages and`,
    `> partner charities carrying out humanitarian work — feeding the hungry, emergency`,
    `> relief, education, and direct aid.`,
    "",
    "## Give",
    "",
    `- [Donate](${canonical("/donate")}): one-time and recurring donations`,
    `- [Feeding the Poor Fund](${canonical("/feeding-the-poor-fund")}): funds meals and food security programs`,
    `- [Emergency Relief Fund](${canonical("/emergency-relief-fund")}): rapid response to disasters and crises`,
    `- [Educational Content Fund](${canonical("/educational-content-fund")}): Catholic educational resources`,
    `- [Donor Advised Funds](${canonical("/donor-advised-funds")}): giving through a DAF`,
    `- [Donate with Crypto](${canonical("/donate-with-crypto")}): cryptocurrency donations`,
    `- [Double Your Donation](${canonical("/double-your-donation")}): employer matching`,
    "",
    "## Articles",
    "",
  ];

  for (const p of posts) {
    const title = decodeHtml(p.title.rendered);
    const desc = plainExcerpt(p.excerpt.rendered || p.content.rendered, 140);
    lines.push(`- [${title}](${canonical(p.slug)}): ${desc}`);
  }

  lines.push(
    "",
    "## Also from the Foundation",
    "",
    "- [Bible Trivia](https://www.bibletrivia.ai/): free Douay-Rheims Catholic Bible with quizzes, verse saving and study tools",
    "- [Mass Times Near Me](https://masstimesnearme.org/): Mass, confession and Adoration times at 39,000+ parishes in 47 countries, free",
  );

  lines.push("", "## About", "", `- [Contact](${canonical("/contact-us")})`, `- [Privacy Policy](${canonical("/privacy-policy")})`, "");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
