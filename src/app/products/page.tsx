import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Chatbot } from "@/components/site/chatbot";
import { PageHeader } from "@/components/site/page-header";
import { ConnectCta } from "@/components/site/connect-cta";
import { Reveal } from "@/components/site/reveal";
import { CountUp } from "@/components/site/count-up";

export const metadata: Metadata = {
  title: "Home loan products — American Royal Mortgage Corp",
  description:
    "Fixed and adjustable rates, FHA, VA, jumbo, and refinancing. Loans built around the life you are financing, with a specialist on every one.",
};

type Product = {
  name: string;
  rate: string;
  rateNote: string;
  body: string;
  points: string[];
};

const PRODUCTS: Product[] = [
  {
    name: "Fixed-Rate Mortgage",
    rate: "5.875%",
    rateNote: "30-yr APR from",
    body: "One rate, one payment, for the life of the loan. The steady choice for buyers who plan to stay a while.",
    points: ["15, 20 & 30-year terms", "Rate locked at approval", "No prepayment penalty"],
  },
  {
    name: "Adjustable-Rate (ARM)",
    rate: "5.250%",
    rateNote: "5/6 ARM APR from",
    body: "A lower rate for the first years, ideal if you expect to move or refinance before it adjusts.",
    points: ["Lower intro payment", "Clear adjustment caps", "5, 7 & 10-year intro periods"],
  },
  {
    name: "FHA Loan",
    rate: "3.5%",
    rateNote: "down payment from",
    body: "A gentler path to ownership with flexible credit requirements. A favorite for first-time buyers.",
    points: ["Lower credit thresholds", "Gift funds allowed", "Down payment help eligible"],
  },
  {
    name: "VA Loan",
    rate: "$0",
    rateNote: "down payment",
    body: "Earned benefits for service members, veterans, and their families. No down payment, no private mortgage insurance.",
    points: ["No down payment", "No monthly PMI", "Competitive fixed rates"],
  },
  {
    name: "Jumbo Loan",
    rate: "6.125%",
    rateNote: "APR from",
    body: "Financing beyond conventional limits for higher-value homes, underwritten with the same personal care.",
    points: ["Loans above conforming limits", "Primary & second homes", "Tailored underwriting"],
  },
  {
    name: "Refinance",
    rate: "Save",
    rateNote: "on your rate or term",
    body: "Lower your rate, shorten your term, or tap equity for what matters next. We run the numbers honestly.",
    points: ["Rate & term options", "Cash-out available", "Break-even shown upfront"],
  },
];

const METRICS = [
  { to: 4.2, decimals: 1, prefix: "$", suffix: "B", label: "Funded in home loans" },
  { to: 12000, suffix: "+", label: "Families guided home" },
  { to: 18, suffix: " days", label: "Average time to close" },
  { to: 50, label: "States licensed" },
];

const STEPS = [
  { title: "Tell us your story", body: "Share where you are and what you're hoping for. A specialist listens before quoting anything." },
  { title: "See real numbers", body: "We shop the market and show you honest rates, payments, and fees side by side." },
  { title: "Get pre-approved", body: "A clear approval letter you can shop with, often the same day you apply." },
  { title: "Close with confidence", body: "We handle the paperwork and keep you posted until the keys are in your hand." },
];

const FAQS = [
  {
    q: "How much do I need for a down payment?",
    a: "Less than most people expect. VA loans can require nothing down, FHA starts at 3.5%, and many conventional loans accept 5%. A specialist will show you the options for your situation.",
  },
  {
    q: "Will checking my rate affect my credit?",
    a: "Getting an estimate does not. A formal pre-approval involves a credit check, but multiple mortgage inquiries within a short window count as one, so it is safe to compare.",
  },
  {
    q: "How long does approval take?",
    a: "Pre-approval is often same-day once we have your details. Full closing averages 18 days, faster than the industry norm, because a real team chases the paperwork for you.",
  },
  {
    q: "Can I get pre-approved before I find a home?",
    a: "Yes, and we recommend it. A pre-approval letter tells sellers you're serious and shows you exactly what you can comfortably afford before you start looking.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="Home loan products"
          title="Loans built around the life you're financing."
          lead="Whatever you're buying, refinancing, or planning for, there's a loan that fits, and a specialist who'll make sure it actually does."
        />

        {/* Products */}
        <section className="bg-canvas px-6 py-24 sm:py-28">
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 80}>
                <ProductCard {...p} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Metrics */}
        <section className="bg-forest px-6 py-20 text-cream sm:py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <p className="eyebrow text-brass-soft/80">By the numbers</p>
              <h2 className="display mt-4 max-w-2xl text-[clamp(1.8rem,5vw,2.8rem)] text-cream">
                A track record families can count on.
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-2 gap-px border border-cream/15 bg-cream/15 lg:grid-cols-4">
              {METRICS.map((m, i) => (
                <Reveal key={m.label} delay={i * 70}>
                  <div className="h-full bg-forest p-7">
                    <p className="serif text-[clamp(2.2rem,5vw,3rem)] font-bold leading-none text-cream">
                      <CountUp
                        to={m.to}
                        decimals={m.decimals ?? 0}
                        prefix={m.prefix ?? ""}
                        suffix={m.suffix ?? ""}
                      />
                    </p>
                    <p className="mt-3 text-[0.85rem] leading-snug text-cream/65">
                      {m.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-paper px-6 py-24 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <p className="eyebrow text-brass">How it works</p>
              <h2 className="display mt-4 max-w-2xl text-[clamp(2rem,5vw,3rem)] text-ink">
                Four steps, one familiar voice the whole way.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <Reveal key={s.title} delay={i * 80}>
                  <div>
                    <div className="flex items-baseline gap-3 border-b border-line pb-4">
                      <span className="serif text-[1.5rem] leading-none text-brass">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="serif text-[1.15rem] font-bold leading-tight text-ink">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-pretty text-[0.92rem] leading-relaxed text-muted">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-canvas px-6 py-24 sm:py-28">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.7fr_1fr]">
            <Reveal>
              <p className="eyebrow text-brass">Good to know</p>
              <h2 className="display mt-4 text-[clamp(2rem,5vw,2.8rem)] text-ink">
                Questions, answered plainly.
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <div className="border-t border-line">
                {FAQS.map((f) => (
                  <details key={f.q} className="group border-b border-line">
                    <summary className="btn-press flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[1.02rem] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span className="serif grid size-6 shrink-0 place-items-center text-[1.4rem] leading-none text-brass transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="faq-answer max-w-prose pb-6 text-pretty text-[0.95rem] leading-relaxed text-muted">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <ConnectCta
          title="Not sure which loan fits?"
          note="Tell a specialist about your plans and they'll point you to the right product, no jargon, no sales pitch."
        />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

function ProductCard({ name, rate, rateNote, body, points }: Product) {
  return (
    <article className="card-lift flex h-full flex-col border border-line bg-paper p-7 hover:border-forest/40">
      <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
        <h3 className="serif text-[1.3rem] font-bold leading-tight text-ink">{name}</h3>
      </div>
      <div className="mt-5">
        <p className="eyebrow text-faint">{rateNote}</p>
        <p className="serif mt-1.5 text-[2rem] font-bold leading-none text-forest">{rate}</p>
      </div>
      <p className="mt-5 flex-1 text-pretty text-[0.92rem] leading-relaxed text-muted">
        {body}
      </p>
      <ul className="mt-6 space-y-2 border-t border-line pt-5">
        {points.map((pt) => (
          <li key={pt} className="flex items-start gap-2.5 text-[0.88rem] text-ink-soft">
            <span className="mt-[0.5em] size-1.5 shrink-0 bg-brass" aria-hidden="true" />
            {pt}
          </li>
        ))}
      </ul>
    </article>
  );
}
