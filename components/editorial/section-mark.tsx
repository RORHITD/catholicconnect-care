type Props = {
  number: string;
  label: string;
  variant?: "light" | "dark";
};

export default function SectionMark({ number, label, variant = "light" }: Props) {
  const text = variant === "dark" ? "text-white/70" : "text-neutral-600";
  const accent = variant === "dark" ? "text-brand-400" : "text-brand-500";
  return (
    <div className={`flex items-baseline gap-3 ${text}`}>
      <span className={`font-editorial italic text-base ${accent}`}>§</span>
      <span className="small-caps tabular-nums">{number}</span>
      <span className={variant === "dark" ? "text-white/30" : "text-neutral-300"}>—</span>
      <span className="small-caps">{label}</span>
    </div>
  );
}
