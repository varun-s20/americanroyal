"use client";

import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Reveal } from "./reveal";
import { Sparkles, TrendingDown, ShieldCheck } from "lucide-react";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function Calculator() {
  const [price, setPrice] = useState(480000);
  const [downPct, setDownPct] = useState(12);
  const [term, setTerm] = useState(30);
  const [rate, setRate] = useState(5.62);

  const { monthly, principal, down, loan } = useMemo(() => {
    const down = (price * downPct) / 100;
    const loan = price - down;
    const r = rate / 100 / 12;
    const n = term * 12;
    const principal =
      r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));
    const taxIns = (price * 0.011) / 12 + 95; // rough taxes + insurance
    return { monthly: principal + taxIns, principal, down, loan };
  }, [price, downPct, term, rate]);

  // "savings" vs a retail 0.43% higher rate
  const retailRate = rate + 0.43;
  const retailMonthly = useMemo(() => {
    const r = retailRate / 100 / 12;
    const n = term * 12;
    return (loan * r) / (1 - Math.pow(1 + r, -n));
  }, [retailRate, term, loan]);
  const saved = Math.max(0, retailMonthly - principal);

  return (
    <section id="calculator" className="relative overflow-hidden bg-foam py-24 sm:py-32">
      <div
        className="pointer-events-none absolute right-0 top-1/4 size-[28rem] rounded-full opacity-[0.08] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-aqua), transparent 60%)" }}
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.02fr]">
          {/* Controls */}
          <Reveal className="flex flex-col">
            <span className="eyebrow text-aqua-deep">Try it yourself</span>
            <h2 className="headline mt-5 text-[clamp(2rem,4.6vw,3.4rem)] text-ink">
              Move the sliders.{" "}
              <span className="headline-thin">Watch an agent do the math.</span>
            </h2>
            <p className="mt-5 max-w-md text-pretty text-ink-soft">
              A live estimate including taxes &amp; insurance. No credit pull, no
              email wall — just numbers you can trust.
            </p>

            <div className="mt-9 space-y-8 rounded-2xl border border-black/8 bg-card p-6 shadow-soft sm:p-8">
              <Control
                label="Home price"
                value={fmt(price)}
                min={150000}
                max={1500000}
                step={5000}
                v={[price]}
                onChange={(v) => setPrice(v[0])}
              />
              <Control
                label="Down payment"
                value={`${downPct}%  ·  ${fmt(down)}`}
                min={3}
                max={50}
                step={1}
                v={[downPct]}
                onChange={(v) => setDownPct(v[0])}
              />
              <div className="grid grid-cols-2 gap-6">
                <Control
                  label="Rate (APR)"
                  value={`${rate.toFixed(2)}%`}
                  min={4}
                  max={9}
                  step={0.01}
                  v={[rate]}
                  onChange={(v) => setRate(v[0])}
                />
                <div>
                  <div className="mb-3 flex items-baseline justify-between">
                    <span className="text-sm font-medium text-ink-soft">Term</span>
                    <span className="font-mono text-sm font-semibold text-ink">
                      {term} yrs
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {[15, 20, 30].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTerm(t)}
                        className={`btn-press flex-1 rounded-lg border py-2 text-sm font-bold transition-colors ${
                          term === t
                            ? "border-aqua bg-aqua text-[#04222a]"
                            : "border-black/10 bg-foam text-ink-soft hover:border-aqua/50"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Result panel */}
          <Reveal delay={140}>
            <div className="grain relative flex h-full flex-col overflow-hidden rounded-2xl bg-abyss p-7 text-foam shadow-float sm:p-9">
              <div
                className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full opacity-30 blur-3xl"
                style={{ background: "radial-gradient(circle, var(--color-aqua), transparent 60%)" }}
              />
              <div className="relative flex items-center justify-between">
                <span className="eyebrow text-foam/70">Estimated monthly</span>
                <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                  <Sparkles className="size-3.5 text-aqua-bright" />
                  Ava&apos;s estimate
                </span>
              </div>

              <div className="relative mt-3 font-display text-[clamp(3rem,7vw,5rem)] font-extrabold leading-none tracking-tight">
                {fmt(monthly)}
                <span className="ml-2 align-baseline text-xl font-normal text-foam/60">
                  /mo
                </span>
              </div>

              <div className="relative mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5 text-center">
                {[
                  ["Loan", fmt(loan)],
                  ["Down", fmt(down)],
                  ["Principal & int.", fmt(principal)],
                ].map(([l, v]) => (
                  <div key={l} className="bg-abyss/40 px-2 py-4">
                    <div className="font-display text-base font-extrabold sm:text-lg">
                      {v}
                    </div>
                    <div className="mt-0.5 text-[0.68rem] uppercase tracking-[0.08em] text-foam/55">
                      {l}
                    </div>
                  </div>
                ))}
              </div>

              {/* savings callout */}
              <div className="relative mt-5 flex items-center gap-3 rounded-xl border border-aqua/30 bg-aqua/10 p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-aqua/20">
                  <TrendingDown className="size-5 text-aqua-bright" />
                </span>
                <div className="text-sm leading-snug">
                  <span className="font-semibold text-aqua-bright">
                    Rey is saving you {fmt(saved)}/mo
                  </span>
                  <span className="text-foam/60">
                    {" "}vs. the average retail rate, hunted automatically.
                  </span>
                </div>
              </div>

              <div className="relative mt-auto pt-7">
                <a
                  href="#cta"
                  className="btn-press flex w-full items-center justify-center rounded-full bg-aqua py-4 text-[0.82rem] font-extrabold uppercase tracking-[0.1em] text-[#04222a] shadow-aqua transition-colors hover:bg-aqua-bright"
                >
                  Get this rate in writing
                </a>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-foam/55">
                  <ShieldCheck className="size-3.5 text-aqua-bright" />
                  Soft check only · won&apos;t affect your credit score
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Control({
  label,
  value,
  min,
  max,
  step,
  v,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  v: number[];
  onChange: (v: number[]) => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-sm font-medium text-ink-soft">{label}</span>
        <span className="font-mono text-sm font-semibold text-ink">{value}</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={v}
        onValueChange={onChange}
        className="[&_[data-slot=slider-track]]:bg-mist-deep [&_[data-slot=slider-range]]:bg-aqua [&_[data-slot=slider-thumb]]:border-aqua [&_[data-slot=slider-thumb]]:bg-white"
      />
    </div>
  );
}
