import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact The Catholic Connect Foundation. Call or text +1 (832) 241-7969, email contact@catholicconnect.care, or use the form to send a message.",
};

export default function ContactUsPage() {
  return (
    <>
      <section className="bg-neutral-900 py-16 text-cream-50 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-400">
            Get In Touch
          </p>
          <h1 className="mt-4 text-4xl leading-tight md:text-5xl lg:text-6xl">
            Contact Us At The Catholic Connect Foundation
          </h1>
          <p className="mt-5 max-w-2xl text-cream-100/85">
            Whether you have a question about giving, want to recommend a project, or are interested in partnering with us, we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
          <div className="rounded-3xl bg-cream-50 p-8 ring-1 ring-neutral-200 lg:p-10">
            <h2 className="text-2xl text-neutral-900 md:text-3xl">Send us a message</h2>
            <p className="mt-2 text-neutral-700">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-7">
            <div className="rounded-2xl bg-brand-50 p-7 ring-1 ring-brand-100">
              <h3 className="text-xl text-neutral-900">Reach us directly</h3>
              <ul className="mt-4 space-y-4 text-sm">
                <li>
                  <span className="block text-xs uppercase tracking-wide text-neutral-600">Phone</span>
                  <a href="tel:+18322417969" className="mt-1 block font-semibold text-brand-600 hover:text-brand-600 transition">
                    +1 (832) 241-7969
                  </a>
                  <span className="block text-xs text-neutral-600">Call or text</span>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wide text-neutral-600">Email</span>
                  <a href="mailto:contact@catholicconnect.care" className="mt-1 block font-semibold text-brand-600 hover:text-brand-600 transition">
                    contact@catholicconnect.care
                  </a>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wide text-neutral-600">Mailing Address</span>
                  <span className="mt-1 block text-neutral-800">
                    59 Acorn Cluster Ct.<br />
                    The Woodlands, TX 77381
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-neutral-50 p-7 ring-1 ring-neutral-200">
              <h3 className="text-lg text-neutral-900">Other ways to give</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/donate" className="text-brand-600 hover:text-brand-600 transition">Make a donation →</Link></li>
                <li><Link href="/donor-advised-funds" className="text-brand-600 hover:text-brand-600 transition">Donor advised funds →</Link></li>
                <li><Link href="/double-your-donation" className="text-brand-600 hover:text-brand-600 transition">Employer matching →</Link></li>
                <li><Link href="/donate-with-crypto" className="text-brand-600 hover:text-brand-600 transition">Crypto donations →</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
