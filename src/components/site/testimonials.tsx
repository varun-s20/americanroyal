"use client";

import { Reveal } from "./reveal";
import { Star, Quote } from "lucide-react";

const QUOTES = [
  {
    quote:
      "We were pre-approved before dinner was over. The kids literally ran through the door three weeks later — exactly like the website promised.",
    name: "The Alvarez Family",
    place: "Austin, TX · First home",
    avatar: "/media/a1.jpg",
    big: true,
  },
  {
    quote:
      "Rey caught a rate dip I never would've noticed and refinanced us automatically. Saved us $260 a month.",
    name: "Marcus Bell",
    place: "Denver, CO · Refinance",
    avatar: "/media/a4.jpg",
  },
  {
    quote:
      "I called my advisor at 9pm and a real person answered. AI did the work, but it never felt cold.",
    name: "Priya & Sam",
    place: "Raleigh, NC · Move-up",
    avatar: "/media/a2.jpg",
  },
  {
    quote:
      "Thirty years ago they did my first mortgage. They just did my daughter's. Still the best.",
    name: "Eleanor Hughes",
    place: "Columbus, OH · Returning",
    avatar: "/media/a3.jpg",
  },
];

export function Testimonials() {
  return (
    <section id="stories" className="relative overflow-hidden bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <span className="eyebrow text-aqua-deep">Front-door moments</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="headline mt-5 text-[clamp(2.1rem,4.8vw,3.8rem)] text-ink">
                8,200 families.{" "}
                <span className="headline-thin">Countless keys.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <div className="flex items-center gap-3 rounded-xl border border-black/8 bg-card px-5 py-3 shadow-soft">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-4 fill-aqua text-aqua" />
                ))}
              </div>
              <div className="text-sm">
                <span className="font-display text-lg font-extrabold text-ink">4.9</span>{" "}
                <span className="text-ink-faint">avg. rating</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={i} delay={i * 90} className={q.big ? "lg:col-span-2" : ""}>
              <figure
                className={`group relative flex h-full flex-col rounded-2xl border border-black/8 p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift ${
                  q.big ? "bg-abyss text-foam" : "bg-card text-ink"
                }`}
              >
                <Quote
                  className={`size-9 ${q.big ? "text-aqua-bright" : "text-aqua-deep/60"}`}
                  strokeWidth={1.5}
                />
                <blockquote
                  className={`mt-4 flex-1 text-pretty leading-relaxed ${
                    q.big ? "font-display text-2xl font-semibold sm:text-[1.7rem]" : "text-lg"
                  }`}
                >
                  {q.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <img
                    src={q.avatar}
                    alt=""
                    className="size-11 rounded-full object-cover ring-2 ring-aqua/40"
                  />
                  <div>
                    <div className={`font-semibold ${q.big ? "text-foam" : "text-ink"}`}>
                      {q.name}
                    </div>
                    <div className={`text-sm ${q.big ? "text-foam/60" : "text-ink-faint"}`}>
                      {q.place}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
