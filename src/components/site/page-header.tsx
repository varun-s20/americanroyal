/**
 * Inner-page header — a compact warm evergreen band that sits under the fixed
 * navbar (keeping its over-dark, light-text treatment) and carries an eyebrow,
 * a Caslon title, and an optional lead line.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
}) {
  return (
    <header className="grain relative isolate overflow-hidden bg-night px-6 pb-16 pt-32 sm:pb-20 sm:pt-36">
      {/* luminous gold glow, top-right */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 -z-10 size-80 rounded-full opacity-[0.32] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-gold) 0%, transparent 70%)" }}
      />
      {/* bright emerald counter-glow, bottom-left — keeps the band alive */}
      <div
        className="pointer-events-none absolute -bottom-28 -left-20 -z-10 size-80 rounded-full opacity-[0.3] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-emerald) 0%, transparent 70%)" }}
      />
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow text-brass-soft/80">{eyebrow}</p>
        <h1 className="display mt-5 max-w-3xl text-cream text-[clamp(2.4rem,7vw,4.2rem)]">
          {title}
        </h1>
        {lead && (
          <p className="mt-6 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-cream/70">
            {lead}
          </p>
        )}
      </div>
    </header>
  );
}
