/**
 * Title / meta description overrides, written from Search Console query data.
 *
 * These pages rank well and are barely clicked, which is a title-and-snippet
 * problem rather than a ranking problem. Each override is chosen to match the
 * language people actually search, taken from the 480-day query export.
 *
 * Leave a page out of this map and it keeps its WordPress title.
 */
export type SeoOverride = {
  title: string;
  description: string;
  /** Why this was changed — kept so the next person can re-evaluate it. */
  note: string;
};

export const SEO_OVERRIDES: Record<string, SeoOverride> = {
  "catholic-university": {
    title: "Top Catholic Universities and Colleges in the USA",
    description:
      "A guide to the top Catholic universities and colleges in the United States — what makes each one distinct, what they cost, and how to choose between them.",
    // 130,437 impressions, 0.33% CTR at position 12.7. The old title led with
    // "Catholic University" (singular), but every query is plural and
    // comparative: "catholic colleges" (3,921 impr, pos 23.8, 2 clicks),
    // "top catholic universities" (3,013, pos 9.1), "top catholic colleges"
    // (1,649, pos 8.7), "top catholic universities in usa" (1,490, pos 8.0).
    note: "Title did not contain 'colleges' or 'top', which are in nearly every ranking query.",
  },

  "catholic-nonprofits": {
    title: "Catholic Nonprofits: 20 Organizations Worth Supporting",
    description:
      "Which Catholic nonprofits actually deserve your donation? A vetted list of organizations doing charity work worldwide, what each one funds, and how to give.",
    // 90,584 impressions, 1.12% CTR at position 10.7.
    note: "Added a number and a value judgement — the query set is evaluative, not definitional.",
  },

  "facts-about-child-hunger-in-america": {
    title: "Child Hunger in America: Statistics and Facts",
    description:
      "How many children go hungry in America, how many die of starvation worldwide each day, and what the numbers actually show — with sources.",
    // 110,908 impressions, 0.86% CTR at position 16.3. Ranking queries are
    // explicit statistic lookups: "how many children die of starvation every
    // day" (1,587 impr, pos 8.7, 2 clicks), "starving children in america"
    // (1,347, pos 15.9), "how many people die of starvation in the us" (1,262).
    note: "Queries are 'how many' lookups; the title promised facts but not numbers.",
  },

  "top-15-catholic-charities-to-donate-to-in-the-usa": {
    title: "15 Best Catholic Charities to Donate To in the USA",
    description:
      "The best Catholic charities to donate to in the USA, ranked and reviewed — what each one funds, how much reaches the field, and how to give today.",
    // 203,298 impressions, 2.77% CTR at position 15.0, and already position 2.0
    // for "best catholic charities to donate to" at 21.07% CTR. Leading with
    // "Best" matches the winning query exactly.
    note: "Highest commercial-intent page on the site; align title with its best-converting query.",
  },

  "saint-padre-pio-quotes-inspiration-faith": {
    title: "50 Padre Pio Quotes on Faith, Suffering and Prayer",
    description:
      "Fifty of the most powerful Saint Padre Pio quotes on faith, suffering, prayer and trust in God — with the context behind each one.",
    // 213,163 impressions, 1.85% CTR at position 6.8. "padre pio quotes"
    // alone is 15,988 impressions at 0.92% CTR.
    note: "Front-loaded the exact query and the count.",
  },
};
