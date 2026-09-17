/** Single source of truth for canonical identity. */
export const SITE_URL = "https://catholicconnect.care";
export const SITE_NAME = "The Catholic Connect Foundation";
export const SITE_SHORT = "Catholic Connect Foundation";
export const SITE_TAGLINE = "Supporting Charitable and Humanitarian Efforts";

/**
 * Canonical URL builder.
 *
 * The live site currently canonicalises inconsistently — some posts point at
 * www.catholicconnect.care and others at the bare host, which splits ranking
 * signals across two hostnames. Every canonical is built here so that cannot
 * recur: one host, always a trailing slash, no query string.
 */
export function canonical(path = "/"): string {
  const clean = "/" + path.replace(/^\/+/, "").replace(/\/+$/, "");
  const withSlash = clean === "/" ? "/" : `${clean}/`;
  return `${SITE_URL}${withSlash}`;
}
