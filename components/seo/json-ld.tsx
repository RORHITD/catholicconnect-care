/**
 * Renders a JSON-LD graph as a script tag.
 *
 * Server-rendered on purpose: assistant crawlers (GPTBot, ClaudeBot,
 * PerplexityBot) do not reliably execute JavaScript, so structured data
 * injected client-side is invisible to exactly the surfaces it is meant for.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
