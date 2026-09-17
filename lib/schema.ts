import { SITE_URL, SITE_NAME, SITE_TAGLINE, canonical } from "./site";

/**
 * JSON-LD graph builders.
 *
 * Yoast emitted Organization / WebSite / WebPage / BreadcrumbList on the live
 * WordPress site. The Next rebuild shipped none, so launching as-is would have
 * been a structured-data regression. These restore it and add NGO-specific
 * typing that Yoast never produced.
 */

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export function organization() {
  return {
    "@type": ["NGO", "Organization"],
    "@id": ORG_ID,
    name: SITE_NAME,
    url: canonical("/"),
    description: SITE_TAGLINE,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: `${SITE_URL}/branding/logo-icon.jpg`,
    },
    // Donation intent is the whole point of this site; make it machine-readable
    // so assistants can answer "how do I donate to X" with a real action.
    potentialAction: {
      "@type": "DonateAction",
      target: canonical("/donate"),
      name: `Donate to ${SITE_NAME}`,
    },
  };
}

export function website() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: canonical("/"),
    name: SITE_NAME,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: canonical(t.path),
    })),
  };
}

export function article(a: {
  title: string;
  description: string;
  path: string;
  published: string;
  modified: string;
  image?: string | null;
}) {
  return {
    "@type": "Article",
    "@id": `${canonical(a.path)}#article`,
    headline: a.title.slice(0, 110),
    description: a.description,
    datePublished: a.published,
    dateModified: a.modified,
    mainEntityOfPage: canonical(a.path),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    ...(a.image ? { image: a.image.startsWith("http") ? a.image : `${SITE_URL}${a.image}` } : {}),
    isPartOf: { "@id": SITE_ID },
  };
}

/** FAQ blocks are the single most effective format for AI answer surfaces. */
export function faq(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

/** Wrap any set of nodes into one @graph — one script tag per page, not five. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
