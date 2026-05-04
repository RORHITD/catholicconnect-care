import Image from "next/image";

const testimonials = [
  {
    quote:
      "Thank you so much my brothers and sisters for the money. You are a blessing to our Children in Uganda. Many blessings to this ministry!",
    name: "Fr. Deus",
    role: "Catholic Priest Serving The Poor In Uganda Through His Orphanage",
    image: "/wp/wp-content/uploads/2022/07/965092.jpg",
  },
  {
    quote:
      "Kindly convey my sincere gratitude to all those who contributed towards this fund [to help the families of the deceased] by the senseless attack on Easter Sunday.",
    name: "Cardinal Albert Malcolm Ranjith",
    role: "Metropolitan Archbishop of Colombo",
    image: "/wp/wp-content/uploads/2022/07/eknswc0qxz8.jpg",
  },
  {
    quote: "May the Lord bless your wonderful work — may He bless your many donors. Sincerely in our Lord",
    name: "Bishop Graham Rose",
    role: "Bishop Of The Diocese Of Dundee In South Africa",
    image: "/wp/wp-content/uploads/2022/07/3wgktdw7xye.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-burgundy-900 py-20 text-cream-50 lg:py-28">
      <div className="absolute inset-0 opacity-[0.05]" aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="testi-cross" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 25v50M25 50h50" stroke="currentColor" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#testi-cross)" />
        </svg>
      </div>
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">Testimonials</p>
          <h2 className="mt-4 font-display text-4xl text-cream-50 md:text-5xl">
            About The Catholic Connect Foundation
          </h2>
        </div>
        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl bg-burgundy-800/50 p-8 ring-1 ring-burgundy-700/50">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-gold-400 mb-4" aria-hidden>
                <path
                  d="M10 8c-3 0-6 2-6 6 0 3 2 5 5 5 0 3-2 5-4 6l1 2c5-1 8-5 8-12 0-4-2-7-4-7Zm14 0c-3 0-6 2-6 6 0 3 2 5 5 5 0 3-2 5-4 6l1 2c5-1 8-5 8-12 0-4-2-7-4-7Z"
                  fill="currentColor"
                />
              </svg>
              <blockquote className="text-cream-50/95 leading-relaxed">{t.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-burgundy-700/50 pt-5">
                <span className="relative h-12 w-12 flex-none overflow-hidden rounded-full bg-stone-warm-700">
                  <Image src={t.image} alt={t.name} fill sizes="48px" className="object-cover" />
                </span>
                <span>
                  <span className="block font-semibold text-cream-50">{t.name}</span>
                  <span className="block text-xs text-cream-100/70">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
