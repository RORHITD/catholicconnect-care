type Props = {
  variant?: "light" | "dark";
  thin?: boolean;
};

export default function Hairline({ variant = "light", thin = false }: Props) {
  let bg: string;
  if (thin) {
    bg = variant === "dark" ? "bg-white/20" : "bg-neutral-300";
  } else {
    bg = variant === "dark" ? "bg-white/60" : "bg-rule";
  }
  return <div className={`h-px w-full ${bg}`} role="separator" aria-hidden />;
}
