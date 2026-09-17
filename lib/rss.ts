export type RssItem = {
  title: string;
  link: string;
  description?: string;
  pubDate?: string;
};

/**
 * XML text content is entity-encoded by spec. USCCB's readings feed puts HTML
 * in <description> as &lt;h4&gt;… rather than inside CDATA, so without this
 * decode the excerpt helper sees no tags to strip and the page prints
 * "<h4>Reading 1 <a href=…" as literal text.
 */
function decodeXml(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function pluck(xml: string, tag: string): string | undefined {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = xml.match(re);
  if (!m) return undefined;
  const raw = m[1].trim();
  // CDATA holds literal markup; everything else is entity-encoded text.
  const cdata = raw.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return (cdata ? cdata[1] : decodeXml(raw)).trim();
}

export function parseRss(xml: string): RssItem[] {
  const items: RssItem[] = [];
  const itemRe = /<item[^>]*>([\s\S]*?)<\/item>/gi;
  let m: RegExpExecArray | null;
  while ((m = itemRe.exec(xml)) !== null) {
    const block = m[1];
    const title = pluck(block, "title") ?? "";
    const link = pluck(block, "link") ?? "";
    if (!title || !link) continue;
    items.push({
      title,
      link,
      description: pluck(block, "description"),
      pubDate: pluck(block, "pubDate"),
    });
  }
  return items;
}

async function fetchFeed(url: string, limit: number, revalidate: number): Promise<RssItem[]> {
  try {
    const res = await fetch(url, {
      next: { revalidate },
      headers: { "User-Agent": "CatholicConnect/1.0" },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRss(xml).slice(0, limit);
  } catch {
    return [];
  }
}

export async function fetchUSCCBDailyReadings(limit = 14) {
  return fetchFeed("https://bible.usccb.org/readings.rss", limit, 3600);
}

export async function fetchUSCCBNews(limit = 10) {
  return fetchFeed("https://www.usccb.org/news/all/feed", limit, 1800);
}

export async function fetchNCRegister(limit = 15) {
  return fetchFeed("https://www.ncregister.com/rss/news.xml", limit, 1800);
}

export async function fetchEWTNNews(limit = 15) {
  return fetchFeed("https://www.ewtn.com/api/v1/news/rss", limit, 1800);
}

export async function fetchVaticanNews(limit = 10) {
  return fetchFeed(
    "https://www.vaticannews.va/en.rss.xml",
    limit,
    1800,
  );
}

export async function fetchSaintOfTheDay(limit = 1) {
  return fetchFeed("https://feeds.feedburner.com/AmericanCatholic_org-saint-of-the-day", limit, 3600);
}
