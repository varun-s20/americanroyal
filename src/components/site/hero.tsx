"use client";

import { useEffect, useRef, useState } from "react";

/**
 * American Royal hero — a full-bleed home clip kept bright and true to color
 * (only a light neutral scrim, no green grade), with the brand tagline set
 * large in heritage Caslon, anchored bottom-left. No subheading: the line
 * carries the whole promise.
 */
export function Hero() {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section
      id="top"
      className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden bg-night"
    >
      {/* — Media: video only — */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/home-exterior.jpg"
          onCanPlay={() => setVideoReady(true)}
          className="size-full object-cover transition-opacity duration-1000"
          style={{ opacity: videoReady ? 1 : 0 }}
        >
          <source
            src="https://xhhvokcsehxhjxabtvvw.supabase.co/storage/v1/object/public/dolobuck/7348153-uhd_3840_2160_25fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* minimal neutral scrim — no green grade, so the footage keeps its
            true, bright color. Darkens only the lower band, just enough for
            the headline to hold contrast. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(12,14,11,0.62) 0%, rgba(12,14,11,0.18) 26%, transparent 52%)",
          }}
        />
        <div
          className="absolute inset-y-0 left-0 w-2/3"
          style={{
            background:
              "linear-gradient(to right, rgba(12,14,11,0.34) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* — Content — */}
      <div className="relative w-full px-6 pb-20 pt-32 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-6xl">
          <h1 className="display max-w-4xl text-cream text-[clamp(2.9rem,11vw,6.5rem)]">
            <Line delay={120}>Your home,</Line>
            <Line delay={220}>
              in{" "}
              <em className="font-normal italic text-brass-soft">trusted</em>{" "}
              hands.
            </Line>
          </h1>
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-7 left-1/2 hidden h-12 w-px -translate-x-1/2 overflow-hidden bg-cream/15 sm:block">
        <span
          className="absolute inset-x-0 top-0 h-1/2 bg-cream/70"
          style={{ animation: "scrollcue 2.4s var(--ease-in-out-strong) infinite" }}
        />
      </div>
    </section>
  );
}

/** Staggered headline line — clips up from below. */
function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <span
        className="reveal block"
        ref={useReveal(delay)}
        style={{ ["--reveal-y" as string]: "110%" }}
      >
        {children}
      </span>
    </span>
  );
}

/** Ref that toggles `.is-visible` shortly after mount (+ delay). */
function useReveal(delay = 0) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = setTimeout(() => el.classList.add("is-visible"), delay + 60);
    return () => clearTimeout(t);
  }, [delay]);
  return ref as React.RefObject<never>;
}
