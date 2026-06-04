"use client";

import { ArrowUpRight, MessageCircle, Phone, CalendarDays } from "lucide-react";
import { Reveal } from "./reveal";
import { openChat, WHATSAPP_URL } from "@/lib/chat";

/**
 * "Talk to a real person" — a single-column band of sharp-edged action rows:
 * start a chat, reach a specialist on WhatsApp, or book a callback. Flat, 1px
 * borders, one brass accent. No rounded pills, no heavy shadows, no imagery.
 */

type Action = {
  label: string;
  note: string;
  icon: typeof MessageCircle;
  onClick?: () => void;
  href?: string;
};

const ACTIONS: Action[] = [
  {
    label: "Connect me to a specialist",
    note: "A quick chat, then a real person takes it from there",
    icon: MessageCircle,
    onClick: openChat,
  },
  {
    label: "Chat with an agent on WhatsApp",
    note: "Message us directly, replies within the hour",
    icon: Phone,
    href: WHATSAPP_URL,
  },
  {
    label: "Request a callback",
    note: "Tell us when works, we call you back",
    icon: CalendarDays,
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
            However you&rsquo;d like to start, we&rsquo;re here for it.
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-[1.02rem] leading-relaxed text-muted">
            Ask a question, leave your details, or jump straight to a specialist.
            No call centers, no scripts, no pressure.
          </p>
        </Reveal>

        <div className="mt-12 border-t border-line">
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

function ActionRow({ label, note, icon: Icon, onClick, href }: Action) {
  const inner = (
    <>
      <span className="grid size-11 shrink-0 place-items-center border border-line bg-paper text-forest transition-colors group-hover:border-forest group-hover:bg-forest group-hover:text-cream">
        <Icon className="size-[1.1rem]" strokeWidth={1.75} />
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
    "btn-press group flex w-full items-center gap-4 border-b border-line bg-transparent px-1 py-5 text-left transition-colors hover:bg-paper";

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
