"use client";

import { Reveal } from "./reveal";
import { ArrowRight } from "lucide-react";

const PILLARS = [
  {
    id: "buy",
    kicker: "01 — Buying a home",
    title: ["Buying", "a home"],
    body: "From first keys to forever home. Down payments from 3%, gift funds welcome, and a real pre-approval letter you can put under any offer — usually within minutes of connecting your bank.",
    img: "/media/home-exterior.jpg",
    stat: "3% down",
    href: "#buy",
  },
  {
    id: "refinance",
    kicker: "02 — Refinancing",
    title: ["Refinancing", "yours"],
    body: "We watch the market around the clock across 40+ investors and re-shop your rate every day. When a refinance finally makes sense, you hear about it first — and the savings are automatic.",
    img: "/media/home-interior.jpg",
    stat: "−$214/mo avg.",
    href: "#refinance",
  },
  {
    id: "equity",
    kicker: "03 — Home equity",
    title: ["Tapping", "equity"],
    body: "Turn the value you’ve built into a renovation, a bridge to a bigger home, or breathing room — without selling first. One timeline, no surprises, advisor on call.",
    img: "/media/home-interior2.jpg",
    stat: "Buy before you sell",
    href: "#loans",
  },
];

export function Pillars() {
  return (
    <section className="relative overflow-hidden bg-abyss-700 py-24 text-foam sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow text-aqua-bright">What we do</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="headline mt-5 max-w-3xl text-[clamp(2rem,4.6vw,3.6rem)]">
            <span className="headline-thin">Three ways</span> we get you home.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-20 sm:space-y-28">
          {PILLARS.map((p, i) => (
            <PillarRow key={p.id} {...p} flip={i % 2 === 1} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarRow({
  id,
  kicker,
  title,
  body,
  img,
  stat,
  href,
  flip,
  index,
}: (typeof PILLARS)[number] & { flip: boolean; index: number }) {
  return (
    <div
      id={id}
      className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
    >
      {/* Image */}
      <Reveal
        delay={index * 60}
        className={`group relative overflow-hidden rounded-2xl shadow-float ${
          flip ? "lg:order-2" : ""
        }`}
      >
        <div className="relative aspect-[4/3] w-full">
          <img
            src={img}
            alt={title.join(" ")}
            className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-abyss/60 to-transparent" />
          <span className="absolute bottom-5 left-5 rounded-full bg-aqua px-4 py-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.08em] text-[#04222a]">
            {stat}
          </span>
        </div>
      </Reveal>

      {/* Text */}
      <Reveal delay={index * 60 + 80} className={flip ? "lg:order-1" : ""}>
        <p className="eyebrow text-aqua-bright">{kicker}</p>
        <h3 className="headline mt-5 text-[clamp(2.2rem,5vw,4rem)]">
          {title[0]} <span className="headline-thin">{title[1]}</span>
        </h3>
        <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-foam/70">
          {body}
        </p>
        <a
          href={href === "#buy" || href === "#refinance" ? "#calculator" : "#loans"}
          className="btn-press group mt-8 inline-flex items-center gap-2.5 rounded-full bg-aqua px-7 py-3.5 text-[0.78rem] font-extrabold uppercase tracking-[0.1em] text-[#04222a] shadow-aqua transition-colors hover:bg-aqua-bright"
        >
          Learn more
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </Reveal>
    </div>
  );
}
