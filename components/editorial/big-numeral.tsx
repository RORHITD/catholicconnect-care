import type { ReactNode } from "react";

type Props = {
  value: string;
  label: string | ReactNode;
  variant?: "light" | "dark";
};

export default function BigNumeral({ value, label, variant = "light" }: Props) {
  const numColor = variant === "dark" ? "text-white" : "text-ink";
  const labelColor = variant === "dark" ? "text-white/70" : "text-neutral-600";
  return (
    <div className="flex flex-col gap-4">
      <span className={`number-display text-7xl md:text-8xl lg:text-9xl ${numColor}`}>{value}</span>
      <span className={`text-sm leading-relaxed max-w-xs ${labelColor}`}>{label}</span>
    </div>
  );
}
