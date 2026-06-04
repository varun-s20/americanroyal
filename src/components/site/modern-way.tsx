"use client";

import { Reveal } from "./reveal";

type Pillar = {
  title: string;
  body: string;
};

const PILLARS: Pillar[] = [
  {
    title: "One specialist, start to finish",
    body: "You get a dedicated loan officer who knows your name and your file. The same person answers every question, from first call to closing day.",
  },
  {
    title: "Honest rates, plainly explained",
    body: "We shop the market on your behalf and show you the real numbers, fees and all. No teaser rates, no fine print waiting to surprise you later.",
  },
  {
    title: "A faster, calmer closing",
    body: "Tight underwriting and a team that chases the paperwork for you means fewer delays and a smoother path to the keys in your hand.",
  },
];

export function ModernWay() {
  return (
    <section id="approach" className="bg-paper px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="eyebrow text-brass">Our approach</p>
          <h2 className="display mt-4 max-w-2xl text-[clamp(2rem,6vw,3.1rem)] text-ink">
            A mortgage that feels like it was handled by people.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <article>
                <div className="flex items-baseline gap-3 border-b border-line pb-4">
                  <span className="serif text-[1.6rem] leading-none text-brass">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="serif text-[1.25rem] font-bold leading-tight text-ink">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-4 text-pretty text-[0.95rem] leading-relaxed text-muted">
                  {p.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
