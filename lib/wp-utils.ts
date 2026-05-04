const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#039;": "'",
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
  "&hellip;": "…",
  "&mdash;": "—",
  "&ndash;": "–",
  "&rsquo;": "’",
  "&lsquo;": "‘",
  "&rdquo;": "”",
  "&ldquo;": "“",
  "&#8216;": "‘",
  "&#8217;": "’",
  "&#8220;": "“",
  "&#8221;": "”",
  "&#8211;": "–",
  "&#8212;": "—",
  "&#8230;": "…",
};

export function decodeHtml(s: string): string {
  if (!s) return "";
  return s
    .replace(/&#(\d+);/g, (_m, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_m, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&[a-z#0-9]+;/gi, (m) => ENTITIES[m] ?? m);
}

export function rewriteWpUrls(html: string): string {
  if (!html) return "";
  return html
    .replace(/https?:\/\/(?:www\.)?catholicconnect\.care\/wp-content\//g, "/wp/wp-content/")
    .replace(/https?:\/\/(?:www\.)?catholicconnect\.care(?=\/[a-z0-9-]+\/?)/g, "");
}

export function stripWp(html: string): string {
  if (!html) return "";
  return rewriteWpUrls(html);
}

export function plainExcerpt(html: string, max = 200): string {
  const text = decodeHtml(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}
