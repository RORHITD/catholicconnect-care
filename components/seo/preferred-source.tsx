import Script from "next/script";

/**
 * Google "Add as Preferred Source" button.
 *
 * Readers who opt in are more likely to see this site in Top Stories and can
 * carry a preferred badge in AI Mode and AI Overviews — one of the few levers
 * that survives an AI answer surface, which matters for a site whose traffic is
 * informational content that assistants routinely summarise.
 *
 * It is a loyalty ask, not a ranking fix, so it belongs at the end of an
 * article where someone has just finished reading — never in the header.
 */
export default function PreferredSourceButton() {
  return (
    <div className="mt-10 border-t border-neutral-200 pt-6">
      <Script
        src="https://news.google.com/swg/js/v1/publisher.js"
        strategy="afterInteractive"
      />
      <p className="mb-3 text-sm text-neutral-600">
        Find this useful? Make us a preferred source in Google.
      </p>
      {/* Custom attribute must be a literal string — React drops unknown booleans. */}
      <div google-add-preferred-source-btn="" />
      <noscript>
        <a
          className="text-sm underline"
          href="https://www.google.com/preferences/source?q=catholicconnect.care"
        >
          Add as Preferred Source
        </a>
      </noscript>
    </div>
  );
}
