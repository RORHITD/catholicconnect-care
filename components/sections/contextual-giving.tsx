import Link from "next/link";

/**
 * In-content contextual links from an article to the fund it relates to.
 *
 * The link audit found every page on this site with ZERO in-content inbound
 * links — /catholic-biblical-quotes/ draws 635,659 impressions and links to
 * nothing but a breadcrumb. Header and footer navigation exists, but it is the
 * same on every page and carries no topical signal. These links are chosen per
 * article so both the reader and the crawler get a relevant next step.
 */

type Fund = { href: string; label: string; blurb: string };

const FUNDS: Record<string, Fund> = {
  feeding: {
    href: "/feeding-the-poor-fund/",
    label: "Feeding the Poor Fund",
    blurb: "funds meals, chicken farms and food security projects run by priests and sisters on the ground",
  },
  relief: {
    href: "/emergency-relief-fund/",
    label: "Emergency Relief Fund",
    blurb: "moves money fast when a typhoon, earthquake or conflict displaces a community",
  },
  education: {
    href: "/educational-content-fund/",
    label: "Educational Content Fund",
    blurb: "pays for Catholic educational resources and the people who teach them",
  },
  general: {
    href: "/donate/",
    label: "donate to the Foundation",
    blurb: "supports priests, nuns and orphanages carrying out humanitarian work worldwide",
  },
};

/**
 * Article slug → the fund its subject matter actually relates to.
 * Anything unmapped falls back to the general donate page rather than guessing.
 */
const SLUG_TO_FUND: Record<string, keyof typeof FUNDS> = {
  "facts-about-child-hunger-in-america": "feeding",
  "4-ways-to-ensure-universal-access-to-nutrition-for-all-children": "feeding",
  "causes-and-solutions-to-eradicate-hunger-in-2021": "feeding",
  "hunger-in-africa-causes-consequences-and-solutions": "feeding",
  "why-global-hunger-needs-our-immediate-attention": "feeding",
  "4-reasons-that-lead-to-hunger-and-poverty": "feeding",
  "5-ways-to-help-those-affected-by-natural-disasters": "relief",
  "5-challenges-faced-in-housing-poor-filipinos": "relief",
  "poverty-in-the-philippines-getting-better-or-worse": "relief",
  "7-ways-you-can-help-the-homeless": "relief",
  "factors-leading-to-poverty-in-africa": "relief",
  "how-to-adopt-an-orphan-child-in-africa": "education",
  "what-you-should-know-about-orphans": "education",
  "understanding-worldwide-orphan-crisis-and-how-you-can-help": "education",
  "catholic-university": "education",
  "catholic-biblical-quotes": "education",
  "saint-padre-pio-quotes-inspiration-faith": "education",
  "how-can-i-be-less-selfish-catholic": "general",
  "catholic-nonprofits": "general",
};

export default function ContextualGiving({ slug }: { slug: string }) {
  const fund = FUNDS[SLUG_TO_FUND[slug] ?? "general"];

  return (
    <aside className="my-12 rounded-2xl border-l-4 border-brand-600 bg-neutral-50 p-6">
      <p className="text-neutral-800">
        The Catholic Connect Foundation&apos;s{" "}
        <Link href={fund.href} className="font-semibold text-brand-700 underline underline-offset-2">
          {fund.label}
        </Link>{" "}
        {fund.blurb}.{" "}
        <Link href="/donate/" className="font-semibold text-brand-700 underline underline-offset-2">
          Make a tax-deductible gift
        </Link>{" "}
        or read about{" "}
        <Link
          href="/top-15-catholic-charities-to-donate-to-in-the-usa/"
          className="font-semibold text-brand-700 underline underline-offset-2"
        >
          the best Catholic charities to donate to
        </Link>
        .
      </p>
    </aside>
  );
}
