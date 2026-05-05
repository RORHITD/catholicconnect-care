type Props = {
  items: string[];
  variant?: "light" | "dark";
};

export default function Dateline({ items, variant = "light" }: Props) {
  const text = variant === "dark" ? "text-white/65" : "text-neutral-600";
  const sep = variant === "dark" ? "text-white/25" : "text-neutral-300";
  return (
    <p className={`small-caps ${text}`}>
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className={`mx-2 ${sep}`}>·</span>}
          {item}
        </span>
      ))}
    </p>
  );
}
