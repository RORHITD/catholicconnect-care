import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost-light" | "ghost-dark";
  size?: "md" | "lg";
};

export default function EditorialButton({
  href,
  children,
  variant = "primary",
  size = "md",
}: Props) {
  const base =
    "group inline-flex items-center gap-3 transition-colors duration-300 small-caps tracking-[0.22em]";
  const sizing = size === "lg" ? "px-7 py-4 text-[12px]" : "px-6 py-3 text-[11px]";
  const variants = {
    primary: "bg-brand-500 text-white hover:bg-brand-600 rounded-none",
    "ghost-light":
      "border border-rule text-ink hover:bg-ink hover:text-paper rounded-none",
    "ghost-dark":
      "border border-white/40 text-white hover:bg-white hover:text-ink rounded-none",
  } as const;

  return (
    <Link href={href} className={`${base} ${sizing} ${variants[variant]}`}>
      <span>{children}</span>
      <span aria-hidden className="block h-px w-6 bg-current transition-all duration-300 group-hover:w-10">
        &nbsp;
      </span>
    </Link>
  );
}
