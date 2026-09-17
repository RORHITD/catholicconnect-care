import DonorboxEmbed from "@/components/donorbox/donorbox-embed";

type Props = {
  heading?: string;
  message?: string;
  /** Required so each page's copy of this section reports its own funnel. */
  placement: string;
};

export default function CommitToGiving({
  placement,
  heading = "Commit To Giving",
  message = "Your donation helps The Catholic Connect Foundation provide support for those most in need. We thank you for helping and assure you of our prayers and the prayers of all of those you are helping.",
}: Props) {
  return (
    <section className="bg-neutral-50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              Make An Impact
            </p>
            <h2 className="mt-4 text-4xl text-neutral-900 md:text-5xl">
              {heading}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-700">
              {message}
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <DonorboxEmbed height={760} placement={placement} />
          </div>
        </div>
      </div>
    </section>
  );
}
