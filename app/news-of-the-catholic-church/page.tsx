import type { Metadata } from "next";
import Link from "next/link";
import {
  fetchUSCCBNews,
  fetchNCRegister,
  fetchEWTNNews,
  fetchVaticanNews,
  type RssItem,
} from "@/lib/rss";
import { decodeHtml, plainExcerpt } from "@/lib/wp-utils";

export const metadata: Metadata = {
  title: "News of the Catholic Church",
  description:
    "Read the latest news from trusted Catholic sources — USCCB, the National Catholic Register, EWTN, and Vatican News.",
};

export const revalidate = 1800;

const sources: Array<{
  name: string;
  fetch: () => Promise<RssItem[]>;
  homepage: string;
  description: string;
}> = [
  {
    name: "USCCB News",
    fetch: () => fetchUSCCBNews(10),
    homepage: "https://www.usccb.org/news",
    description: "United States Conference of Catholic Bishops",
  },
  {
    name: "National Catholic Register",
    fetch: () => fetchNCRegister(15),
    homepage: "https://www.ncregister.com",
    description: "Catholic news, opinion, and analysis",
  },
  {
    name: "EWTN News",
    fetch: () => fetchEWTNNews(15),
    homepage: "https://www.ewtn.com/news",
    description: "Eternal Word Television Network",
  },
  {
    name: "Vatican News",
    fetch: () => fetchVaticanNews(10),
    homepage: "https://www.vaticannews.va/en.html",
    description: "Official news of the Holy See",
  },
];

export default async function NewsOfTheCatholicChurchPage() {
  const all = await Promise.all(sources.map((s) => s.fetch().then((items) => ({ ...s, items }))));

  return (
    <>
      <section className="bg-neutral-900 py-20 text-cream-50">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-400">
            Catholic News
          </p>
          <h1 className="mt-4 text-4xl text-cream-50 md:text-5xl lg:text-6xl">
            News of the Catholic Church
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-cream-100/85">
            Brought to you by trusted Catholic news sources.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl space-y-16 px-6 lg:px-8">
          {all.map((src) => (
            <div key={src.name}>
              <header className="flex flex-col gap-2 border-b border-neutral-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-3xl text-neutral-900">{src.name}</h2>
                  <p className="text-sm text-neutral-600">{src.description}</p>
                </div>
                <Link
                  href={src.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-brand-600 hover:text-brand-600 transition"
                >
                  Visit {src.name} →
                </Link>
              </header>
              {src.items.length === 0 ? (
                <p className="mt-6 text-sm text-neutral-600">News feed temporarily unavailable. Please visit the source directly.</p>
              ) : (
                <ul className="mt-6 space-y-4">
                  {src.items.map((item) => (
                    <li key={item.link} className="rounded-xl bg-cream-50 p-5 ring-1 ring-neutral-200">
                      <Link
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg leading-snug text-neutral-900 hover:text-brand-700 transition"
                      >
                        {decodeHtml(item.title)}
                      </Link>
                      {item.pubDate && (
                        <time className="ml-2 text-xs text-neutral-600">
                          {new Date(item.pubDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </time>
                      )}
                      {item.description && (
                        <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                          {plainExcerpt(item.description, 220)}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
