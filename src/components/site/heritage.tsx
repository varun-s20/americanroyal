"use client";

import { Reveal } from "./reveal";
import { CountUp } from "./count-up";

export function Heritage() {
  return (
    <section id="story" className="relative isolate overflow-hidden">
      {/* Marquee ribbon */}
      <div className="relative flex overflow-hidden bg-aqua py-4">
        <div
          className="flex shrink-0 items-center gap-10 whitespace-nowrap pr-10"
          style={{ animation: "marquee 38s linear infinite" }}
        >
          {Array.from({ length: 2 }).flatMap((_, k) =>
            [
              "Est. 1989",
              "Licensed in 50 states",
              "$31B funded",
              "4.9★ from 8,200 families",
              "Equal Housing Lender",
              "Human + AI underwriting",
              "21-day average close",
            ].map((t, i) => (
              <span
                key={`${k}-${i}`}
                className="flex items-center gap-10 font-display text-lg font-extrabold uppercase tracking-[0.04em] text-[#04222a]"
              >
                {t}
                <span className="text-[#04222a]/50">✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Heritage story */}
      <div className="relative grain bg-abyss py-24 text-foam sm:py-32">
        <img
          src="/media/family.jpg"
          alt="A family together at golden hour"
          className="absolute inset-0 -z-10 size-full object-cover opacity-25"
          style={{ animation: "kenburns 30s var(--ease-in-out-strong) infinite alternate" }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-abyss via-abyss/85 to-abyss/65" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-xl">
              <Reveal>
                <span className="eyebrow text-aqua-bright">Since 1989</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="headline mt-5 text-[clamp(2.1rem,4.8vw,3.8rem)]">
                  Three generations.{" "}
                  <span className="headline-thin">One promise.</span>
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-6 text-pretty text-lg leading-relaxed text-foam/75">
                  We&apos;ve been handing families their keys for over thirty
                  years — long before the algorithms arrived. Today our AI agents
                  carry the paperwork so our people can do what they always have:
                  sit beside you and make sure you feel at home.
                </p>
              </Reveal>
            </div>

            <Reveal delay={160}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: <CountUp to={36} suffix=" yrs" />, l: "Helping families home" },
                  { v: <CountUp to={210} suffix="K+" />, l: "Loans closed" },
                  { v: <CountUp to={31} prefix="$" suffix="B" />, l: "Funded to date" },
                  { v: <CountUp to={98} suffix="%" />, l: "Would recommend us" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/12 bg-white/[0.05] p-6 backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1"
                  >
                    <div className="font-display text-4xl font-extrabold text-foam">
                      {s.v}
                    </div>
                    <div className="mt-2 text-sm uppercase tracking-[0.1em] text-foam/65">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
