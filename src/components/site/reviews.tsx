"use client";

import { Star } from "lucide-react";
import { Reveal } from "./reveal";
import { CountUp } from "./count-up";

type Review = {
  quote: string;
  name: string;
  detail: string;
};

const REVIEWS: Review[] = [
  {
    quote:
      "We were first-time buyers and terrified of the paperwork. Our specialist walked us through every line and answered texts at 9pm. We closed early.",
    name: "Danielle & Marcus Reyes",
    detail: "First home · Austin, TX",
  },
  {
    quote:
      "I refinanced expecting the usual runaround. Instead I had one person, one number, and a rate that actually beat what my bank quoted me.",
    name: "Priya Anand",
    detail: "Refinance · Edison, NJ",
  },
  {
    quote:
      "They caught an error our last lender missed and saved us thousands at closing. Honest people who clearly do this because they care.",
    name: "Tom Whitaker",
    detail: "Move-up buyer · Columbus, OH",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="bg-canvas px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-line pb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-brass">Reviews</p>
              <h2 className="display mt-4 max-w-xl text-[clamp(2rem,6vw,3.1rem)] text-ink">
                Families trust us with the biggest move of their lives.
              </h2>
            </div>
            <div className="shrink-0 sm:text-right">
              <div className="flex items-center gap-1 sm:justify-end">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-brass text-brass" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-2 text-[0.9rem] text-muted">
                <CountUp
                  to={4.9}
                  decimals={1}
                  duration={1400}
                  className="serif text-[1.4rem] font-bold text-ink"
                />{" "}
                out of 5 ·{" "}
                <CountUp to={1200} suffix="+" duration={1800} /> closings
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 90}>
              <ReviewCard {...r} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ quote, name, detail }: Review) {
  return (
    <article className="card-lift flex h-full flex-col border border-line bg-paper p-7">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-[0.85rem] fill-brass text-brass" strokeWidth={0} />
        ))}
      </div>
      <p className="serif mt-5 flex-1 text-pretty text-[1.05rem] leading-relaxed text-ink-soft">
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="mt-6 border-t border-line pt-4">
        <p className="text-[0.92rem] font-semibold text-ink">{name}</p>
        <p className="mt-0.5 text-[0.8rem] text-muted">{detail}</p>
      </footer>
    </article>
  );
}
