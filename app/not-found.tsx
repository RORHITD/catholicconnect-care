import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="mx-auto max-w-xl px-6 text-center">
        <p className="text-7xl text-brand-600">404</p>
        <h1 className="mt-4 text-3xl text-neutral-900 md:text-4xl">
          We couldn't find that page
        </h1>
        <p className="mt-4 text-neutral-700">
          The page you're looking for may have moved or no longer exists.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3 text-sm font-semibold text-cream-50 transition hover:bg-brand-600"
          >
            Return home
          </Link>
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 rounded-full border border-brand-500 px-7 py-3 text-sm font-semibold text-brand-600 transition hover:bg-brand-50"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </section>
  );
}
