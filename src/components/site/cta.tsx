"use client";

import { Reveal } from "./reveal";
import { Magnetic } from "./magnetic";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section id="cta" className="relative bg-foam px-4 py-20 sm:py-28">
      <Reveal>
        <div className="grain relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-aqua px-6 py-16 text-center shadow-float sm:px-12 sm:py-24">
          <div
            className="pointer-events-none absolute left-1/2 top-0 size-[34rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--color-aqua-bright), transparent 60%)" }}
          />

          <div className="relative mx-auto max-w-2xl">
            <span className="eyebrow text-[#04222a]/70">Your agents are standing by</span>

            <h2 className="headline mt-6 text-[clamp(2.4rem,6vw,4.6rem)] text-[#04222a]">
              Let&apos;s get your <span className="headline-thin">family home.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-pretty text-lg text-[#06343f]">
              Start with an AI agent in under two minutes. No credit pull, no
              pressure — just the clearest path to your front door.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic strength={0.45}>
                <a
                  href="#calculator"
                  className="btn-press group inline-flex items-center gap-2.5 rounded-full bg-abyss px-8 py-4 text-[0.82rem] font-extrabold uppercase tracking-[0.1em] text-foam shadow-lift transition-colors hover:bg-abyss-700"
                >
                  Get pre-approved
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Magnetic>
              <a
                href="tel:18001989"
                className="btn-press inline-flex items-center rounded-full border-2 border-[#04222a]/30 px-7 py-3.5 text-[0.82rem] font-extrabold uppercase tracking-[0.1em] text-[#04222a] transition-colors hover:border-[#04222a]/60"
              >
                Talk to an advisor
              </a>
            </div>

            <p className="mt-7 text-sm text-[#06343f]/70">
              Equal Housing Lender · NMLS #198919 · Licensed in 50 states
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
