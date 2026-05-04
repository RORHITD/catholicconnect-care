export type RssItem = {
  title: string;
  link: string;
  description?: string;
  pubDate?: string;
};

function pluck(xml: string, tag: string): string | undefined {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = xml.match(re);
  if (!m) return undefined;
  return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
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
