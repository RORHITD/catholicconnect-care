type Props = {
  quote: string;
  attribution: string;
  role?: string;
  variant?: "light" | "dark";
};

export default function PullQuote({ quote, attribution, role, variant = "light" }: Props) {
  const main = variant === "dark" ? "text-white" : "text-ink";
  const muted = variant === "dark" ? "text-white/65" : "text-neutral-600";
  const rule = variant === "dark" ? "bg-white/30" : "bg-rule";
  return (
    <figure className="relative">
      <span
        aria-hidden
        className={`absolute -left-2 -top-8 font-editorial text-[8rem] leading-none ${variant === "dark" ? "text-white/15" : "text-brand-500/20"}`}
      >
        &ldquo;
      </span>
      <blockquote className={`pull-quote ${main} relative pl-1`}>{quote}</blockquote>
      <figcaption className={`mt-8 flex items-center gap-4 ${muted}`}>
        <span className={`block h-px w-12 ${rule}`} aria-hidden />
        <span>
          <span className={`block ${main} font-medium`}>{attribution}</span>
          {role && <span className="block small-caps mt-1">{role}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
