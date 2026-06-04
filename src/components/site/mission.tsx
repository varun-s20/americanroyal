"use client";

import { Reveal } from "./reveal";
import { CountUp } from "./count-up";

/**
 * Mission band — a single, oversized statement on the deep-dark surface, the
 * working verb-phrase carried in aqua, followed by a thin stat strip. Mirrors
 * the "we develop and scale solutions to…" idiom of mission-driven sites.
 */
export function Mission() {
  return (
    <section className="relative overflow-hidden bg-abyss py-24 text-foam sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow text-aqua-bright">Our mission</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="headline mt-6 max-w-5xl text-[clamp(1.9rem,5vw,4rem)] font-extrabold">
            <span className="headline-thin">We </span>
            <span className="text-aqua">build and fund smarter mortgages</span>
            <span className="headline-thin"> to put </span>
            more families in homes.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-foam/70">
            For over three decades we&apos;ve treated home financing as a public
            good, not a product. Lower rates hunted around the clock, paperwork
            carried for you, and a licensed advisor who answers when you call —
            so the door to a home opens for more people, faster.
          </p>
        </Reveal>

        {/* stat strip */}
        <Reveal delay={120}>
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-4">
            {[
              { v: <CountUp to={31} prefix="$" suffix="B" />, l: "Funded since 1989" },
              { v: <CountUp to={210} suffix="K+" />, l: "Families financed" },
              { v: <CountUp to={11} suffix="min" />, l: "Avg. to pre-approval" },
              { v: <CountUp to={50} />, l: "States licensed" },
            ].map((s, i) => (
              <div key={i} className="bg-abyss/40 px-5 py-7 sm:px-7">
                <div className="font-display text-3xl font-extrabold text-foam sm:text-4xl">
                  {s.v}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.12em] text-foam/55 sm:text-[0.78rem]">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
