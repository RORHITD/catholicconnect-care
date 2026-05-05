type Props = {
  caption: string;
  credit?: string;
  variant?: "light" | "dark";
};

export default function FigureCaption({ caption, credit, variant = "light" }: Props) {
  const main = variant === "dark" ? "text-white/80" : "text-neutral-700";
  const credited = variant === "dark" ? "text-white/45" : "text-neutral-500";
  const rule = variant === "dark" ? "border-white/30" : "border-neutral-300";
  return (
    <figcaption className={`mt-3 flex items-baseline gap-3 border-l ${rule} pl-3 text-sm`}>
      <span className={`font-editorial italic leading-snug ${main}`}>{caption}</span>
      {credit && <span className={`small-caps shrink-0 ${credited}`}>{credit}</span>}
    </figcaption>
  );
}
