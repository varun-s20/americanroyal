"use client";

import { Reveal } from "./reveal";
import { ArrowUpRight, Gauge, Radar, MessagesSquare } from "lucide-react";

const WAYS = [
  {
    icon: Gauge,
    title: "Get pre-approved",
    body: "Connect your bank and a real, lender-ready letter lands in your inbox in minutes — no credit pull, no email wall.",
    cta: "Start now",
    href: "#calculator",
  },
  {
    icon: Radar,
    title: "Find your rate",
    body: "We re-shop your rate across 40+ investors every day and lock the lowest. The day it drops, you drop with it.",
    cta: "See today’s rate",
    href: "#calculator",
  },
  {
    icon: MessagesSquare,
    title: "Talk to an advisor",
    body: "A licensed human advisor answers in about 30 seconds — for the questions a calculator can’t. Day or night.",
    cta: "Call an advisor",
    href: "tel:18001989",
  },
];

const LOANS = [
  ["First-Home", "Down payments from 3%"],
  ["VA", "$0 down for those who served"],
  ["FHA", "Credit-friendly approvals"],
  ["Jumbo Estate", "Luxury homes, white-glove"],
];

export function Join() {
  return (
    <section id="loans" className="relative">
      {/* Aqua top — centered intro */}
      <div className="bg-aqua pt-24 pb-44 text-center sm:pt-28 sm:pb-52">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <h2 className="headline text-[clamp(2.2rem,6vw,4.5rem)] text-[#04222a]">
              <span className="headline-thin">Start your</span> journey home
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-[#063b44]">
              Buying, refinancing, or just exploring — there&apos;s a doorway in
              for you. Pick how you&apos;d like to begin and an agent (plus a
              human, whenever you want one) takes it from there.
            </p>
          </Reveal>
        </div>
      </div>

      {/* White panel pulled up under the aqua, with the circular image straddling */}
      <div className="relative bg-foam">
        {/* circular image straddling the seam */}
        <Reveal className="absolute inset-x-0 -top-28 flex justify-center sm:-top-32">
          <span className="relative block size-56 overflow-hidden rounded-full ring-8 ring-foam sm:size-64">
            <img
              src="/media/keys.jpg"
              alt="House keys handed over on the doorstep"
              className="size-full object-cover"
            />
          </span>
        </Reveal>

        <div className="mx-auto max-w-7xl px-5 pt-40 pb-24 sm:px-8 sm:pt-44 sm:pb-32">
          {/* Ways to start */}
          <div className="grid gap-6 md:grid-cols-3">
            {WAYS.map((w, i) => (
              <Reveal key={w.title} delay={i * 90}>
                <WayCard {...w} />
              </Reveal>
            ))}
          </div>

          {/* Loan-product chips */}
          <div className="mt-16 border-t border-black/10 pt-12">
            <Reveal>
              <p className="eyebrow text-ink-faint">More ways to borrow</p>
            </Reveal>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {LOANS.map(([t, d], i) => (
                <Reveal key={t} delay={i * 60}>
                  <a
                    href="#calculator"
                    className="group flex items-center justify-between rounded-xl border border-black/10 bg-card px-5 py-4 transition-all hover:border-aqua hover:shadow-soft"
                  >
                    <div>
                      <div className="font-display text-base font-extrabold uppercase tracking-[0.03em] text-ink">
                        {t}
                      </div>
                      <div className="text-sm text-ink-faint">{d}</div>
                    </div>
                    <ArrowUpRight className="size-4 text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-aqua-deep" />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WayCard({
  icon: Icon,
  title,
  body,
  cta,
  href,
}: (typeof WAYS)[number]) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-black/8 bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
      <span className="grid size-12 place-items-center rounded-xl bg-aqua/15 text-aqua-deep transition-colors group-hover:bg-aqua group-hover:text-[#04222a]">
        <Icon className="size-6" />
      </span>
      <h3 className="mt-6 font-display text-xl font-extrabold uppercase tracking-[0.02em] text-aqua-deep">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-pretty leading-relaxed text-ink-soft">{body}</p>
      <a
        href={href}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:text-aqua-deep"
      >
        {cta}
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
}
