"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type PanInfo } from "motion/react";

/**
 * American Royal hero — three full-bleed home clips on a horizontal, swipeable
 * reel, kept bright and true to color (only a light neutral scrim, no green
 * grade), with the brand tagline set large in heritage Caslon, anchored
 * bottom-left. No subheading: the line carries the whole promise.
 *
 * Motion: the reel rides a single virtual page index that only ever counts
 * forward (or backward) — clips re-seat themselves around the current page
 * with modular arithmetic, so wrapping from the last clip to the first slides
 * the same direction as every other shift. No rewind, ever. Swipe, drag,
 * horizontal trackpad scroll, arrow keys, and the indicator bars all feed the
 * same spring. Transform-only animation; under prefers-reduced-motion the
 * shift is instant instead of sliding.
 */
const CLIPS = [
  "https://xhhvokcsehxhjxabtvvw.supabase.co/storage/v1/object/public/dolobuck/Create_me_a_video_with_a_drone%20(2).mp4",
  "https://xhhvokcsehxhjxabtvvw.supabase.co/storage/v1/object/public/dolobuck/Create_me_a_video_with_a_drone%20(1).mp4",
  "https://xhhvokcsehxhjxabtvvw.supabase.co/storage/v1/object/public/dolobuck/Warm_cinematic_shot_of_a_frien%20(1).mp4",
];

const COUNT = CLIPS.length;
const mod = (n: number, m: number) => ((n % m) + m) % m;

/**
 * Where clip `i` sits relative to the virtual page: 0 = on screen, 1 = waiting
 * just off the right edge, -1 = just off the left. Because this is derived
 * from the unbounded page index, the "next" clip is always staged to the
 * right — including when page 2 hands off to clip 0.
 */
function offsetFor(i: number, page: number) {
  const rel = mod(i - page, COUNT);
  return rel === COUNT - 1 ? -1 : rel;
}

export function Hero() {
  const reduce = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  // Unbounded virtual page — mod(page, COUNT) is the visible clip. Never
  // resets, so the reel's direction of travel always matches the gesture.
  const [page, setPage] = useState(0);
  const active = mod(page, COUNT);

  // The track animates in pixels (drag reports pixels), so keep the viewport
  // width on hand.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Horizontal trackpad / wheel swipes drive the reel too. Locked briefly per
  // shift so inertial scrolling doesn't machine-gun through clips.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let locked = false;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // let the page scroll
      e.preventDefault(); // and keep the browser's back-swipe out of it
      if (locked || Math.abs(e.deltaX) < 24) return;
      locked = true;
      setPage((p) => p + (e.deltaX > 0 ? 1 : -1));
      window.setTimeout(() => (locked = false), 650);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Any deliberate swipe commits — a short threshold so a small pull never
  // peeks at the neighbor and then snaps back.
  const onDragEnd = (_: unknown, info: PanInfo) => {
    const power = Math.abs(info.offset.x) * info.velocity.x;
    if (info.offset.x < -48 || power < -4000) {
      setPage((p) => p + 1);
    } else if (info.offset.x > 48 || power > 4000) {
      setPage((p) => p - 1);
    }
    // only a sub-threshold nudge settles back onto the current page
  };

  /** Jump to clip `i` by the shortest forward/backward step — never rewinds. */
  const goTo = (i: number) =>
    setPage((p) => {
      const ahead = mod(i - p, COUNT);
      return p + (ahead === COUNT - 1 ? -1 : ahead);
    });

  return (
    <section id="top" className="relative h-[100svh] bg-night">
      <div
        ref={viewportRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured homes"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setPage((p) => p + 1);
          if (e.key === "ArrowLeft") setPage((p) => p - 1);
        }}
        className="grain relative isolate flex h-full items-end overflow-hidden outline-none"
      >
        {/* — Media reel: one draggable track, clips re-seated around the
              virtual page so the next one is always staged off the right — */}
        <motion.div
          className="absolute inset-0 -z-10 cursor-grab select-none active:cursor-grabbing"
          drag="x"
          dragConstraints={{
            left: -(page + 1) * width,
            right: -(page - 1) * width,
          }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragEnd={onDragEnd}
          animate={{ x: -page * width }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 320, damping: 34, mass: 0.8 }
          }
        >
          {CLIPS.map((src, i) => (
            <Clip
              key={src}
              src={src}
              position={page + offsetFor(i, page)}
              active={i === active}
              first={i === 0}
              onEnded={() => setPage((p) => p + 1)}
            />
          ))}
        </motion.div>

        {/* minimal neutral scrim — fixed over the reel (it doesn't ride the
            drag), no green grade, so the footage keeps its true, bright
            color. Darkens only the lower band, just enough for the headline
            to hold contrast. */}
        <div className="pointer-events-none absolute inset-0 -z-10">
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

        {/* — Content — transparent to gestures so swipes start anywhere */}
        <div className="pointer-events-none relative w-full px-6 pb-20 pt-32 sm:px-8 sm:pb-28">
          <div className="mx-auto max-w-6xl">
            <h1 className="display max-w-4xl text-cream text-[clamp(2.9rem,11vw,6.5rem)]">
              <Line delay={140}>Your home,</Line>
              <Line delay={280}>
                in{" "}
                <em className="font-normal italic text-brass-soft">trusted</em>{" "}
                hands.
              </Line>
            </h1>
          </div>
        </div>

        {/* clip indicator — one quiet bar per clip, tappable */}
        <div className="absolute bottom-8 right-6 flex items-center sm:right-8">
          {CLIPS.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show clip ${i + 1} of ${COUNT}`}
              aria-current={i === active}
              className="group p-1.5"
            >
              <span
                className="block h-px w-7 bg-cream/25 transition-colors duration-700 group-hover:bg-cream/60"
                style={{
                  backgroundColor:
                    i === active ? "rgba(244,239,229,0.85)" : undefined,
                }}
              />
            </button>
          ))}
        </div>

        {/* scroll cue */}
        <div className="pointer-events-none absolute bottom-7 left-1/2 hidden h-12 w-px -translate-x-1/2 overflow-hidden bg-cream/15 sm:block">
          <span
            className="absolute inset-x-0 top-0 h-1/2 bg-cream/70"
            style={{
              animation: "scrollcue 2.4s var(--ease-in-out-strong) infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}

/**
 * One reel clip — stays mounted across shifts (no reload flash), seated at
 * `position` viewport-widths along the track. Plays only while it's the
 * active clip, restarting from the top each time it takes the stage, and
 * hands the reel to the next clip when it finishes.
 */
function Clip({
  src,
  position,
  active,
  first,
  onEnded,
}: {
  src: string;
  position: number;
  active: boolean;
  first: boolean;
  onEnded: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (active) {
      el.currentTime = 0;
      el.play().catch(() => {});
    } else if (!el.paused) {
      el.pause();
    }
  }, [active]);

  return (
    <div
      className="absolute inset-y-0 w-full"
      style={{ left: `${position * 100}%` }}
    >
      <video
        ref={videoRef}
        autoPlay={first}
        muted
        playsInline
        draggable={false}
        preload="auto"
        poster={first ? "/media/home-exterior.jpg" : undefined}
        onCanPlay={() => setReady(true)}
        onEnded={() => {
          if (active) onEnded();
        }}
        className="pointer-events-none size-full object-cover transition-opacity duration-1000 ease-out"
        style={{ opacity: ready ? 1 : 0 }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

/** Staggered headline line — clips up from below and softens into focus. */
function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <span
        className="reveal block"
        ref={useReveal(delay)}
        style={{
          ["--reveal-y" as string]: "110%",
          ["--reveal-blur" as string]: "8px",
        }}
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
