import DonorboxEmbed from "@/components/donorbox/donorbox-embed";

type Props = {
  heading?: string;
  message?: string;
};

export default function CommitToGiving({
  heading = "Commit To Giving",
  message = "Your donation helps The Catholic Connect Foundation provide support for those most in need. We thank you for helping and assure you of our prayers and the prayers of all of those you are helping.",
}: Props) {
  return (
    <section className="bg-stone-warm-50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy-700">
              Make An Impact
            </p>
            <h2 className="mt-4 font-display text-4xl text-burgundy-900 md:text-5xl">
              {heading}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-warm-700">
              {message}
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <DonorboxEmbed height={760} />
          </div>
        </div>
      </div>
    </section>
  );
}
