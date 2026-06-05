"use client";

import { Headset, MessageSquare } from "lucide-react";
import { Reveal } from "./reveal";
import { openChat, WHATSAPP_URL } from "@/lib/chat";

/**
 * Reusable closing band for inner pages — a single brass-accented prompt to
 * reach a real specialist, mirroring the home page's sharp, flat language.
 */
export function ConnectCta({
  title = "Ready to talk it through?",
  note = "A specialist can answer your questions and map out your options, no pressure, no obligation.",
}: {
  title?: string;
  note?: string;
}) {
  return (
    <section className="bg-paper px-6 py-24 sm:py-28">
      <Reveal className="mx-auto max-w-5xl border border-line bg-canvas p-8 sm:p-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-brass">Talk to a real person</p>
            <h2 className="display mt-3 max-w-md text-[clamp(1.7rem,4vw,2.5rem)] text-ink">
              {title}
            </h2>
            <p className="mt-3 max-w-md text-pretty text-[0.98rem] leading-relaxed text-muted">
              {note}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
            <button
              type="button"
              onClick={openChat}
              className="tile-emerald btn-press inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-[0.9rem] font-semibold text-white hover:brightness-105"
            >
              <Headset className="size-[1.05rem]" strokeWidth={1.85} />
              Speak with a specialist
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-press inline-flex items-center justify-center gap-2 rounded-sm border border-line bg-paper px-6 py-3.5 text-[0.9rem] font-semibold text-ink hover:border-forest hover:text-forest"
            >
              <MessageSquare className="size-[1.05rem]" strokeWidth={1.85} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
