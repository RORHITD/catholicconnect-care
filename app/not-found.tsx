import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="mx-auto max-w-xl px-6 text-center">
        <p className="font-display text-7xl text-burgundy-700">404</p>
        <h1 className="mt-4 font-display text-3xl text-burgundy-900 md:text-4xl">
          We couldn't find that page
        </h1>
        <p className="mt-4 text-stone-warm-700">
          The page you're looking for may have moved or no longer exists.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-burgundy-700 px-7 py-3 text-sm font-semibold text-cream-50 transition hover:bg-burgundy-800"
          >
            Return home
          </Link>
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 rounded-full border border-burgundy-700 px-7 py-3 text-sm font-semibold text-burgundy-700 transition hover:bg-burgundy-50"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </section>
  );
}
