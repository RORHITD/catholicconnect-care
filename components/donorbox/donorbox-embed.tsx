"use client";

type Props = {
  campaign?: string;
  defaultInterval?: "o" | "w" | "m";
  amount?: number;
  height?: number;
  title?: string;
};

export default function DonorboxEmbed({
  campaign = "the-catholic-connect-foundation",
  defaultInterval = "m",
  amount = 20,
  height = 900,
  title = "Donate to The Catholic Connect Foundation",
}: Props) {
  const params = new URLSearchParams();
  params.set("default_interval", defaultInterval);
  if (amount) params.set("amount", String(amount));
  const src = `https://donorbox.org/embed/${campaign}?${params.toString()}`;

  return (
    <div className="w-full">
      <iframe
        src={src}
        title={title}
        name="donorbox"
        seamless
        allow="payment"
        scrolling="no"
        className="w-full rounded-2xl border border-stone-warm-200 bg-cream-50 shadow-sm"
        style={{
          maxWidth: "500px",
          minWidth: "250px",
          maxHeight: "none",
          minHeight: `${height}px`,
        }}
      />
    </div>
  );
}
