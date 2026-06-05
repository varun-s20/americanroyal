"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Headset } from "lucide-react";
import { Logo } from "./logo";
import { Magnetic } from "./magnetic";
import { openChat } from "@/lib/chat";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Talk to us", href: "/#connect" },
  { label: "Our approach", href: "/#approach" },
  { label: "Reviews", href: "/#reviews" },
];

/**
 * American Royal top bar — transparent over the hero, condensing to a solid
 * paper bar once scrolled. Small, widely-tracked links and a single sharp-edged
 * action keep the lockup quiet and premium.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          "flex items-center justify-between gap-6 px-5 transition-all duration-300 sm:px-8",
          scrolled
            ? "h-14 border-b border-line bg-canvas/85 backdrop-blur-xl"
            : "h-16 bg-gradient-to-b from-black/30 to-transparent"
        )}
      >
        <Link href="/" aria-label="American Royal Mortgage Corp home" className="btn-press">
          <Logo tone={scrolled ? "ink" : "foam"} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "link-underline text-[0.78rem] font-medium tracking-[0.01em] transition-colors",
                scrolled
                  ? "text-ink-soft hover:text-forest"
                  : "text-cream/75 hover:text-cream"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Magnetic strength={0.35} className="inline-flex shrink-0">
          <button
            type="button"
            onClick={openChat}
            aria-label="Speak with a specialist"
            title="Speak with a specialist"
            className={cn(
              "btn-press relative grid size-9 shrink-0 place-items-center rounded-sm",
              scrolled
                ? "bg-forest text-cream hover:bg-forest-deep"
                : "border border-cream/35 text-cream hover:bg-cream hover:text-forest"
            )}
          >
            <Headset className="size-[1.1rem]" strokeWidth={1.75} />
            <span
              className={cn(
                "absolute -right-0.5 -top-0.5 size-2 rounded-full bg-brass",
                scrolled ? "ring-2 ring-canvas" : "ring-2 ring-night/40"
              )}
              aria-hidden="true"
            />
          </button>
        </Magnetic>
      </div>
    </header>
  );
}
