import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Chatbot } from "@/components/site/chatbot";
import { PageHeader } from "@/components/site/page-header";
import { ConnectCta } from "@/components/site/connect-cta";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "About us — American Royal Mortgage Corp",
  description:
    "A mortgage company that still answers the phone. Meet the people behind American Royal and the way we think about lending.",
};

const VALUES = [
  {
    title: "People over portals",
    body: "Software is useful, but it doesn't reassure you at midnight. Every client gets a real specialist who owns their file from first call to closing.",
  },
  {
    title: "Plain numbers, always",
    body: "We show you the full picture, rate, payment, and every fee, before you commit to anything. No teaser figures, no fine print surprises.",
  },
  {
    title: "Rooted in your corner",
    body: "We work for you, not a quota. If a loan isn't right, we'll say so, even when it means sending you somewhere else.",
  },
];

type Member = {
  name: string;
  role: string;
  bio: string;
  photo: string;
};

const TEAM: Member[] = [
  {
    name: "Elena Marquez",
    role: "Founder & CEO",
    bio: "Opened American Royal in 2009 after a decade of watching big banks treat families like file numbers.",
    photo: "/media/a1.jpg",
  },
  {
    name: "David Cho",
    role: "Head of Lending",
    bio: "Leads underwriting with a simple rule: if he wouldn't take the loan himself, he won't recommend it to you.",
    photo: "/media/a2.jpg",
  },
  {
    name: "Rachel Donnelly",
    role: "Director of Client Care",
    bio: "Makes sure no question goes unanswered and no borrower ever feels lost in the process.",
    photo: "/media/a3.jpg",
  },
  {
    name: "Marcus Bell",
    role: "Senior Loan Officer",
    bio: "Has guided more than 2,000 first-time buyers to the keys, and answers his phone on weekends.",
    photo: "/media/a4.jpg",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="About us"
          title="A mortgage company that still answers the phone."
          lead="We built American Royal on a quiet idea: that the biggest financial decision of your life deserves a human being who knows your name."
        />

        {/* Story */}
        <section className="bg-canvas px-6 py-24 sm:py-28">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16">
            <Reveal>
              <p className="eyebrow text-brass">Our story</p>
              <h2 className="display mt-4 text-[clamp(2rem,5vw,2.9rem)] text-ink">
                Founded on a handshake, run the same way since.
              </h2>
              <div className="mt-6 space-y-4 text-pretty text-[1rem] leading-relaxed text-muted">
                <p>
                  In 2009, after years inside the mortgage machine, Elena Marquez
                  set out to build the lender she wished her own family had: one
                  that explained things, returned calls, and told the truth about
                  the numbers.
                </p>
                <p>
                  Fifteen years later, we&rsquo;ve helped more than twelve thousand
                  families finance a home, and the promise hasn&rsquo;t changed. You
                  get a real specialist, a fair rate, and a team that treats your
                  closing like it&rsquo;s their own.
                </p>
              </div>
              <dl className="mt-9 grid max-w-md grid-cols-3 gap-px border border-line bg-line">
                {[
                  { v: "2009", l: "Year founded" },
                  { v: "12k+", l: "Families served" },
                  { v: "4.9", l: "Average rating" },
                ].map((s) => (
                  <div key={s.l} className="bg-canvas px-4 py-5">
                    <dt className="serif text-[1.6rem] font-bold leading-none text-forest">
                      {s.v}
                    </dt>
                    <dd className="mt-2 text-[0.78rem] leading-snug text-muted">{s.l}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={120}>
              <figure className="border border-line">
                <img
                  src="/media/advisor.jpg"
                  alt="Two people shaking hands across a desk after a mortgage approval"
                  className="aspect-[4/3] w-full object-cover"
                />
              </figure>
            </Reveal>
          </div>
        </section>

        {/* Values */}
        <section className="bg-paper px-6 py-24 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <p className="eyebrow text-brass">What we stand for</p>
              <h2 className="display mt-4 max-w-2xl text-[clamp(2rem,5vw,3rem)] text-ink">
                The principles we won&rsquo;t trade away.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-3">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={i * 90}>
                  <article>
                    <div className="flex items-baseline gap-3 border-b border-line pb-4">
                      <span className="serif text-[1.6rem] leading-none text-brass">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="serif text-[1.25rem] font-bold leading-tight text-ink">
                        {v.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-pretty text-[0.95rem] leading-relaxed text-muted">
                      {v.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-canvas px-6 py-24 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <p className="eyebrow text-brass">The team</p>
              <h2 className="display mt-4 max-w-2xl text-[clamp(2rem,5vw,3rem)] text-ink">
                The people who&rsquo;ll actually pick up.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((m, i) => (
                <Reveal key={m.name} delay={(i % 4) * 80}>
                  <TeamCard {...m} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ConnectCta
          title="Want to meet your specialist?"
          note="Start a quick chat and we'll introduce you to the person who'll guide your loan from here."
        />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

function TeamCard({ name, role, bio, photo }: Member) {
  return (
    <article className="group flex h-full flex-col border border-line bg-paper">
      <div className="overflow-hidden border-b border-line">
        <img
          src={photo}
          alt={`${name}, ${role} at American Royal Mortgage Corp`}
          className="aspect-square w-full object-cover grayscale-[0.15] transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-brass">{role}</p>
        <h3 className="serif mt-2 text-[1.2rem] font-bold leading-tight text-ink">
          {name}
        </h3>
        <p className="mt-3 text-pretty text-[0.85rem] leading-relaxed text-muted">
          {bio}
        </p>
      </div>
    </article>
  );
}
