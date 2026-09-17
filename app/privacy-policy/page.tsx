import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import pages from "@/data/wp-pages.json";
import { stripWp, decodeHtml } from "@/lib/wp-utils";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/privacy-policy") },
  title: "Privacy Policy",
  description:
    "Privacy Policy for The Catholic Connect Foundation — how we collect, use, and protect information.",
};

export default function PrivacyPolicyPage() {
  const page = pages.find((p) => p.slug === "privacy-policy");
  if (!page) return null;
  const html = stripWp(page.content.rendered);

  return (
    <article className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <header className="mb-10 border-b border-neutral-200 pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Legal</p>
          <h1 className="mt-3 text-4xl text-neutral-900 md:text-5xl">
            {decodeHtml(page.title.rendered)}
          </h1>
        </header>
        <div className="prose-content" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </article>
  );
}
