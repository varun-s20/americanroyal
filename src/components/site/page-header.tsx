"use client";

import { useEffect, useRef } from "react";

/**
 * Inner-page header — a compact warm evergreen band that sits under the fixed
 * navbar (keeping its over-dark, light-text treatment) and carries an eyebrow,
 * a Caslon title, and an optional lead line.
 *
 * Motion: the eyebrow, title and lead materialize in sequence on load (the
 * title clips up from below like the home hero), and the ambient glows drift
 * slowly to keep the band alive. All gated by prefers-reduced-motion.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
}) {
  const eyebrowRef = useMountReveal(80);
  const titleRef = useMountReveal(180);
  const leadRef = useMountReveal(320);

  return (
    <header className="grain relative isolate overflow-hidden bg-night px-6 pb-16 pt-32 sm:pb-20 sm:pt-36">
      {/* luminous gold glow, top-right */}
      <div
        className="drift pointer-events-none absolute -right-24 -top-24 -z-10 size-80 rounded-full blur-3xl"
        style={{
          ["--drift-opacity" as string]: "0.32",
          background: "radial-gradient(circle, var(--color-gold) 0%, transparent 70%)",
        }}
      />
      {/* bright emerald counter-glow, bottom-left — keeps the band alive */}
      <div
        className="drift-slow pointer-events-none absolute -bottom-28 -left-20 -z-10 size-80 rounded-full blur-3xl"
        style={{
          ["--drift-opacity" as string]: "0.3",
          background: "radial-gradient(circle, var(--color-emerald) 0%, transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-5xl">
        <p className="reveal eyebrow text-brass-soft/80" ref={eyebrowRef}>
          {eyebrow}
        </p>
        <h1 className="display mt-5 max-w-3xl text-cream text-[clamp(2.4rem,7vw,4.2rem)]">
          <span className="block overflow-hidden pb-[0.05em]">
            <span
              className="reveal block"
              ref={titleRef}
              style={{
                ["--reveal-y" as string]: "108%",
                ["--reveal-blur" as string]: "8px",
              }}
            >
              {title}
            </span>
          </span>
        </h1>
        {lead && (
          <p
            className="reveal mt-6 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-cream/70"
            ref={leadRef}
          >
            {lead}
          </p>
        )}
      </div>
    </header>
  );
}

/** Ref that toggles `.is-visible` shortly after mount (+ delay). */
function useMountReveal(delay = 0) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = setTimeout(() => el.classList.add("is-visible"), delay + 60);
    return () => clearTimeout(t);
  }, [delay]);
  return ref as React.RefObject<never>;
}
