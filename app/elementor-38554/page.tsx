import type { Metadata } from "next";
import Link from "next/link";
import { fetchUSCCBDailyReadings } from "@/lib/rss";
import { decodeHtml, plainExcerpt } from "@/lib/wp-utils";

export const metadata: Metadata = {
  title: "Daily Readings of the Catholic Church",
  description: "Daily Mass readings brought to you by the United States Conference of Catholic Bishops (USCCB).",
};

export const revalidate = 3600;

export default async function DailyReadingsAlternatePage() {
  const items = await fetchUSCCBDailyReadings(14);
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
            Daily Readings
          </p>
          <h1 className="mt-4 text-4xl text-neutral-900 md:text-5xl">
            Daily Readings of the Catholic Church
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-neutral-700">
            Brought to you by the United States Conference of Catholic Bishops.
          </p>
        </header>

        <ul className="mt-12 space-y-4">
          {items.map((item) => (
            <li key={item.link} className="rounded-2xl bg-cream-50 p-6 ring-1 ring-neutral-200">
              <h2 className="text-xl text-neutral-900">
                <Link href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 transition">
                  {decodeHtml(item.title)}
                </Link>
              </h2>
              {item.pubDate && (
                <time className="mt-1 block text-xs text-neutral-600">
                  {new Date(item.pubDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </time>
              )}
              {item.description && (
                <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                  {plainExcerpt(item.description, 280)}
                </p>
              )}
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-600 transition"
              >
                Read at USCCB
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M3 6h6m0 0L6 3m3 3L6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
