"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Calculator,
  MessageCircle,
  Phone,
  CalendarDays,
} from "lucide-react";
import { Reveal } from "./reveal";
import { openChat, WHATSAPP_URL } from "@/lib/chat";

/**
 * "Talk to a real person" — led by one bold, sun-gold quote CTA (the primary
 * path we steer everyone toward), followed by quieter action rows: chat with a
 * specialist, reach us on WhatsApp, or book a callback. The rows lead with a
 * vivid, glowing icon tile (emerald / teal / coral) so the choices feel alive
 * and genuinely pop off the warm paper, while the gold CTA above outranks them.
 */

type Action = {
  label: string;
  note: string;
  icon: typeof MessageCircle;
  tile: string;
  onClick?: () => void;
  href?: string;
};

const ACTIONS: Action[] = [
  {
    label: "Connect me to a specialist",
    note: "A short chat, then a real person takes it from there",
    icon: MessageCircle,
    tile: "tile-red",
    onClick: openChat,
  },
  {
    label: "Chat with an agent on WhatsApp",
    note: "Message us directly, with replies within the hour",
    icon: Phone,
    tile: "tile-teal",
    href: WHATSAPP_URL,
  },
  {
    label: "Request a callback",
    note: "Tell us when suits you, and we'll call you back",
    icon: CalendarDays,
    tile: "tile-coral",
    onClick: openChat,
  },
];

export function Connect() {
  return (
    <section id="connect" className="bg-canvas px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="eyebrow text-brass">Talk to a real person</p>
          <h2 className="display mt-4 max-w-2xl text-[clamp(2rem,6vw,3.1rem)] text-ink">
            Let&rsquo;s get you home. Start however feels right.
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-[1.02rem] leading-relaxed text-muted">
            See your numbers in minutes, or ask us anything first. No call
            centers, no scripts, no pressure, only people who treat your home
            like it&rsquo;s their own.
          </p>
        </Reveal>

        {/* — Primary path: the bold sun-gold quote CTA — */}
        <Reveal delay={80}>
          <button
            type="button"
            onClick={openChat}
            className="quote-cta btn-press group mt-10 flex w-full items-center justify-between gap-5 overflow-hidden rounded-2xl px-6 py-6 text-left sm:px-8 sm:py-7"
          >
            <span className="relative z-10 flex items-center gap-4 sm:gap-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-cream/15 text-cream sm:size-14">
                <Calculator className="size-6 sm:size-7" strokeWidth={2} />
              </span>
              <span className="min-w-0">
                <span className="display block text-[1.5rem] leading-none text-cream sm:text-[1.9rem]">
                  Get a quote now
                </span>
                <span className="mt-1.5 block text-[0.9rem] font-medium text-cream/75">
                  Free, with no impact on your credit. About two minutes.
                </span>
              </span>
            </span>
            <span className="tile-gold relative z-10 grid size-11 shrink-0 place-items-center rounded-full text-night transition-transform duration-300 ease-out group-hover:translate-x-1 sm:size-12">
              <ArrowRight className="size-5" strokeWidth={2.25} />
            </span>
          </button>
        </Reveal>

        {/* — Quieter ways in, for people who want to talk first — */}
        <Reveal delay={140}>
          <p className="eyebrow mt-12 text-faint">Or reach a person directly</p>
        </Reveal>
        <div className="mt-4 border-t border-line">
          {ACTIONS.map((a, i) => (
            <Reveal key={a.label} delay={i * 80}>
              <ActionRow {...a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ActionRow({ label, note, icon: Icon, tile, onClick, href }: Action) {
  const inner = (
    <>
      <span
        className={`tile-lift grid size-12 shrink-0 place-items-center rounded-xl text-white ${tile}`}
      >
        <Icon className="size-[1.25rem]" strokeWidth={2.25} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[1.02rem] font-semibold text-ink">{label}</span>
        <span className="mt-0.5 block text-pretty text-[0.88rem] leading-snug text-muted">
          {note}
        </span>
      </span>
      <ArrowUpRight
        className="size-4 shrink-0 text-faint transition-all group-hover:text-forest group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={2}
      />
    </>
  );

  const cls =
    "btn-press group flex w-full items-center gap-4 rounded-xl border-b border-line bg-transparent px-2 py-5 text-left transition-colors hover:bg-paper";

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
