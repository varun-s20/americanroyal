"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type RevealTag = "div" | "li" | "section" | "span" | "article";

/**
 * Lightweight scroll reveal. Toggles the `.is-visible` class (CSS does the
 * heavy lifting — opacity/transform/blur), so the motion runs off the main
 * thread and respects prefers-reduced-motion via globals.css.
 */
export function Reveal({
  children,
  delay = 0,
  as = "div",
  className = "",
  y = 22,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  as?: RevealTag;
  className?: string;
  y?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return createElement(
    as,
    {
      ref,
      className: `reveal ${visible ? "is-visible" : ""} ${className}`,
      style: {
        transitionDelay: `${delay}ms`,
        ["--reveal-y" as string]: `${y}px`,
      },
    },
    children
  );
}
