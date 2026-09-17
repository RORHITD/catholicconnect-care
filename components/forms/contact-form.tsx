"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "ok" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      setStatus("ok");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl bg-brand-50 p-6 text-center ring-1 ring-brand-200">
        <h3 className="text-xl text-neutral-900">Thank you!</h3>
        <p className="mt-2 text-sm text-neutral-700">
          Your message has been sent. We'll get back to you as soon as possible. God bless.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First Name" name="firstName" required />
        <Field label="Last Name" name="lastName" required />
      </div>
      <Field label="Email" name="email" type="email" required />
      <Field label="Phone" name="phone" type="tel" optional />
      <Field label="Subject" name="subject" required />
      <div>
        <label className="block text-sm font-medium text-neutral-800">
          Message <span className="text-brand-600">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-xl border border-neutral-300 bg-cream-50 px-4 py-3 text-sm text-ink placeholder:text-neutral-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-700/20"
        />
      </div>
      <input type="text" name="website" tabIndex={-1} aria-hidden className="hidden" />

      {errorMsg && (
        <p className="rounded-lg bg-brand-50 px-4 py-2 text-sm text-brand-600 ring-1 ring-brand-100">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-cream-50 transition hover:bg-brand-700 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  optional = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-neutral-800">
        {label} {required && <span className="text-brand-600">*</span>}
        {optional && <span className="text-neutral-500 text-xs"> (optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl border border-neutral-300 bg-cream-50 px-4 py-3 text-sm text-ink placeholder:text-neutral-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-700/20"
      />
    </div>
  );
}
