"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { MessageSquare, X, ArrowUp, Phone } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { OPEN_CHAT_EVENT, WHATSAPP_URL } from "@/lib/chat";

/**
 * American Royal chat assistant — a small, scripted concierge. It collects a
 * name, number, and email, then hands anything substantive to a human
 * specialist or a WhatsApp agent. Deliberately not an "AI" persona: it gathers
 * details and connects you to a person. Sharp edges, warm monochrome, flat.
 */

type Step = "name" | "phone" | "email" | "ask" | "handoff";
type Sender = "bot" | "user";

type Message = {
  id: number;
  from: Sender;
  text: string;
};

const AGENT = "Maya";

const QUESTION_CHIPS = [
  "What rate could I get?",
  "Am I pre-qualified?",
  "I want to refinance",
  "Closing costs & fees",
];

const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim());
const isPhone = (v: string) => (v.replace(/\D/g, "").length >= 7);

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<Step>("name");
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const reduce = useReducedMotion();

  const idRef = useRef(0);
  const startedRef = useRef(false);
  const leadRef = useRef({ name: "", phone: "", email: "" });
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const nextId = () => {
    idRef.current += 1;
    return idRef.current;
  };

  const pushUser = useCallback((text: string) => {
    setMessages((m) => [...m, { id: nextId(), from: "user", text }]);
  }, []);

  /** Bot says one line after a short, human-feeling typing pause. */
  const botSay = useCallback((text: string, after = 0) => {
    return new Promise<void>((resolve) => {
      window.setTimeout(() => {
        setTyping(true);
        window.setTimeout(() => {
          setTyping(false);
          setMessages((m) => [...m, { id: nextId(), from: "bot", text }]);
          resolve();
        }, Math.min(220 + text.length * 14, 1100));
      }, after);
    });
  }, []);

  // Greet once, the first time the panel opens.
  useEffect(() => {
    if (!open || startedRef.current) return;
    startedRef.current = true;
    (async () => {
      await botSay(
        `Hi, I'm ${AGENT} from American Royal. I'll get you to the right specialist, fast.`
      );
      await botSay("First, what's your name?", 250);
    })();
  }, [open, botSay]);

  // Open via the shared event (navbar, connect section).
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, []);

  // Keep the latest message in view; focus the field when ready.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    if (open && !typing && step !== "handoff") inputRef.current?.focus();
  }, [messages, typing, open, step]);

  const handleSend = useCallback(
    async (raw: string) => {
      const value = raw.trim();
      if (!value || typing) return;
      pushUser(value);
      setDraft("");

      if (step === "name") {
        leadRef.current.name = value;
        setStep("phone");
        await botSay(`Good to meet you, ${value}. What's the best number to reach you?`);
        return;
      }

      if (step === "phone") {
        if (!isPhone(value)) {
          await botSay("That number looks a little short, mind sending it again?");
          return;
        }
        leadRef.current.phone = value;
        setStep("email");
        await botSay("Thanks. And your email, so we can send your options across?");
        return;
      }

      if (step === "email") {
        if (!isEmail(value)) {
          await botSay("Hmm, that doesn't look like a full email. Could you re-enter it?");
          return;
        }
        leadRef.current.email = value;
        setStep("ask");
        await botSay(
          `You're all set, ${leadRef.current.name}. A specialist now has your details.`
        );
        await botSay("What's on your mind? Pick one below, or just type it.", 300);
        return;
      }

      // Any real question is handed to a human.
      setStep("handoff");
      await botSay(
        "That's a great question, and exactly the kind of thing our specialists answer best."
      );
      await botSay(
        `Let me connect you with someone who can guide you properly, ${leadRef.current.name}.`,
        250
      );
    },
    [step, typing, pushUser, botSay]
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend(draft);
  };

  const inputType =
    step === "email" ? "email" : step === "phone" ? "tel" : "text";
  const placeholder =
    step === "name"
      ? "Your name"
      : step === "phone"
        ? "Your phone number"
        : step === "email"
          ? "you@email.com"
          : "Type your question";

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with a specialist"}
        className="btn-press fixed bottom-5 right-5 z-50 inline-flex items-center gap-2.5 rounded-sm bg-forest px-4 py-3.5 text-cream shadow-panel transition-colors hover:bg-forest-deep sm:bottom-6 sm:right-6"
      >
        {open ? (
          <X className="size-5" strokeWidth={2} />
        ) : (
          <>
            <span className="relative inline-flex">
              <MessageSquare className="size-5" strokeWidth={1.9} />
              <span className="absolute -right-1 -top-1 size-2 rounded-full bg-brass ring-2 ring-forest" />
            </span>
            <span className="text-[0.85rem] font-semibold">Chat with us</span>
          </>
        )}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
        <motion.div
          key="chat-panel"
          role="dialog"
          aria-label="Chat with an American Royal specialist"
          className="fixed bottom-20 right-5 z-50 flex h-[32rem] max-h-[calc(100svh-7rem)] w-[calc(100vw-2.5rem)] max-w-[23rem] flex-col overflow-hidden rounded-md border border-line bg-canvas shadow-panel sm:bottom-24 sm:right-6"
          style={{ transformOrigin: "bottom right" }}
          initial={
            reduce
              ? { opacity: 0 }
              : { opacity: 0, y: 16, scale: 0.96, filter: "blur(8px)" }
          }
          animate={
            reduce
              ? { opacity: 1 }
              : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          }
          exit={
            reduce
              ? { opacity: 0 }
              : { opacity: 0, y: 10, scale: 0.98, filter: "blur(6px)" }
          }
          transition={
            reduce ? { duration: 0 } : { type: "spring", duration: 0.45, bounce: 0 }
          }
        >
          {/* Header */}
          <header className="flex items-center gap-3 border-b border-forest-deep bg-forest px-4 py-3.5 text-cream">
            <span className="grid size-9 shrink-0 place-items-center rounded-sm bg-cream/12 serif text-[1.05rem] font-bold">
              {AGENT.charAt(0)}
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-[0.92rem] font-semibold">{AGENT} · American Royal</p>
              <p className="flex items-center gap-1.5 text-[0.72rem] text-cream/65">
                <span className="size-1.5 rounded-full bg-brass-soft" />
                Specialist concierge · online
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="btn-press -mr-1 grid size-8 place-items-center rounded-sm text-cream/70 hover:bg-cream/10 hover:text-cream"
            >
              <X className="size-4" strokeWidth={2} />
            </button>
          </header>

          {/* Messages */}
          <div
            ref={scrollRef}
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((m) => (
              <Bubble key={m.id} from={m.from} text={m.text} />
            ))}
            {typing && <Typing />}

            {/* Quick replies once we're gathering questions */}
            {step === "ask" && !typing && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUESTION_CHIPS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSend(q)}
                    className="btn-press rounded-sm border border-line bg-paper px-3 py-1.5 text-[0.8rem] font-medium text-ink-soft transition-colors hover:border-forest hover:text-forest"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer: input, or the human hand-off */}
          {step === "handoff" ? (
            <div className="space-y-2.5 border-t border-line bg-paper p-3.5">
              <a
                href="tel:+15551234567"
                className="btn-press flex items-center justify-center gap-2 rounded-sm bg-forest px-4 py-3 text-[0.88rem] font-semibold text-cream hover:bg-forest-deep"
              >
                <Phone className="size-4" strokeWidth={2} />
                Talk to a specialist now
              </a>
              <a
                href={WHATSAPP_URL}
                className="btn-press flex items-center justify-center gap-2 rounded-sm border border-line bg-canvas px-4 py-3 text-[0.88rem] font-semibold text-ink hover:border-forest hover:text-forest"
              >
                <MessageSquare className="size-4" strokeWidth={1.9} />
                Continue on WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="border-t border-line bg-paper p-3">
              <div className="flex items-center gap-2 rounded-sm border border-line bg-canvas px-3 focus-within:border-forest">
                <input
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  type={inputType}
                  inputMode={step === "phone" ? "tel" : undefined}
                  placeholder={placeholder}
                  aria-label={placeholder}
                  disabled={typing}
                  className="h-11 flex-1 bg-transparent text-[0.9rem] text-ink outline-none placeholder:text-faint disabled:opacity-50"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  disabled={typing || !draft.trim()}
                  className="btn-press grid size-8 shrink-0 place-items-center rounded-sm bg-forest text-cream transition-opacity hover:bg-forest-deep disabled:opacity-30"
                >
                  <ArrowUp className="size-4" strokeWidth={2.2} />
                </button>
              </div>
              <p className="mt-2 px-0.5 text-[0.68rem] text-faint">
                We&rsquo;ll only use your details to help with your mortgage.
              </p>
            </form>
          )}
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ from, text }: { from: Sender; text: string }) {
  const isBot = from === "bot";
  return (
    <div
      className={isBot ? "flex justify-start" : "flex justify-end"}
      style={{ animation: "bubble-in 0.35s var(--ease-out-quart)" }}
    >
      <p
        className={
          isBot
            ? "max-w-[85%] rounded-sm rounded-tl-none border border-line bg-paper px-3.5 py-2.5 text-[0.88rem] leading-relaxed text-ink"
            : "max-w-[85%] rounded-sm rounded-br-none bg-forest px-3.5 py-2.5 text-[0.88rem] leading-relaxed text-cream"
        }
      >
        {text}
      </p>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-sm rounded-tl-none border border-line bg-paper px-3.5 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 rounded-full bg-muted"
            style={{ animation: `typing-dot 1.2s ${i * 0.16}s var(--ease-in-out-strong) infinite` }}
          />
        ))}
      </div>
    </div>
  );
}
