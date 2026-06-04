"use client";

import { Reveal } from "./reveal";

const STEPS = [
  {
    n: "01",
    title: "Tell us about your family",
    body: "Two minutes, no credit pull. Ava reads it instantly and sketches what you can afford.",
    time: "2 min",
  },
  {
    n: "02",
    title: "Connect & get pre-approved",
    body: "Securely link your bank and Ava returns a real, lender-ready pre-approval letter you can put under any offer.",
    time: "11 min",
  },
  {
    n: "03",
    title: "Agents shop & verify",
    body: "Rey hunts your rate daily while Nora gathers and checks every document — quietly, in the background.",
    time: "1–2 wks",
  },
  {
    n: "04",
    title: "The keys are yours",
    body: "Cass coordinates closing and texts the moment it funds. Your kids run through the door.",
    time: "21 days",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow text-aqua-deep">A calmer way home</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="headline mt-5 text-[clamp(2.1rem,4.8vw,3.8rem)] text-ink">
              Hello to keys, <span className="headline-thin">in four steps.</span>
            </h2>
          </Reveal>
        </div>

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-[2.1rem] hidden h-px bg-gradient-to-r from-transparent via-aqua/50 to-transparent lg:block" />

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 110} className="relative">
                <div className="flex items-center gap-4 lg:block">
                  <span className="relative z-10 grid size-17 shrink-0 place-items-center rounded-full border-2 border-aqua bg-foam font-display text-xl font-extrabold text-aqua-deep shadow-soft">
                    {s.n}
                    <span
                      className="absolute inset-0 -z-10 rounded-full bg-aqua/10"
                      style={{
                        animation: `pulse-ring 3s var(--ease-out-strong) ${i * 0.4}s infinite`,
                      }}
                    />
                  </span>
                  <span className="eyebrow rounded-full bg-foam px-3 py-1 text-[0.62rem] text-ink-soft shadow-soft lg:mt-5 lg:inline-block">
                    {s.time}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-extrabold uppercase tracking-[0.02em] text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-pretty leading-relaxed text-ink-soft">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
