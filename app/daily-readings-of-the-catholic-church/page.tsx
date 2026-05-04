import type { Metadata } from "next";
import Link from "next/link";
import { fetchUSCCBDailyReadings } from "@/lib/rss";
import { decodeHtml, plainExcerpt } from "@/lib/wp-utils";

export const metadata: Metadata = {
  title: "Saint of the Day — Catholic Church",
  description:
    "Read about the Saint of the Day along with the daily Mass readings from the United States Conference of Catholic Bishops.",
};

export const revalidate = 3600;

export default async function DailyReadingsPage() {
  const items = await fetchUSCCBDailyReadings(14);
  const today = items[0];
  const rest = items.slice(1);

  return (
    <>
      <section className="bg-burgundy-900 py-20 text-cream-50 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">
            Saint of the Day
          </p>
          <h1 className="mt-4 font-display text-4xl text-cream-50 md:text-5xl lg:text-6xl">
            Daily Readings of the Catholic Church
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-cream-100/85">
            Click on the daily reading title below to continue reading. God bless you!
          </p>
        </div>
      </section>

      {today && (
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy-700">
              Today's Reading
            </p>
            <h2 className="mt-4 font-display text-3xl text-burgundy-900 md:text-4xl">
              {decodeHtml(today.title)}
            </h2>
            {today.pubDate && (
              <time className="mt-2 block text-sm text-stone-warm-600">
                {new Date(today.pubDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            )}
            {today.description && (
              <p className="mt-6 text-lg leading-relaxed text-stone-warm-800">
                {plainExcerpt(today.description, 480)}
              </p>
            )}
            <Link
              href={today.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-burgundy-700 px-7 py-3.5 text-sm font-semibold text-cream-50 transition hover:bg-burgundy-800"
            >
              Read full reading at USCCB
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 7h8m0 0L8 4m3 3-3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </Link>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="bg-stone-warm-50 py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2 className="font-display text-2xl text-burgundy-900">More daily readings</h2>
            <ul className="mt-6 space-y-3">
              {rest.map((item) => (
                <li key={item.link} className="rounded-xl bg-cream-50 p-5 ring-1 ring-stone-warm-200">
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-lg text-burgundy-800 hover:text-gold-700 transition"
                  >
                    {decodeHtml(item.title)}
                  </Link>
                  {item.pubDate && (
                    <time className="ml-2 text-xs text-stone-warm-600">
                      {new Date(item.pubDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </time>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
