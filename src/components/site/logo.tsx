import { cn } from "@/lib/utils";

/**
 * American Royal Mortgage Corp wordmark — a two-line text lockup: "American
 * Royal" in heritage Caslon over a tracked "MORTGAGE CORP" label. `tone` flips
 * it for dark (over the hero) or light surfaces.
 */
export function Logo({
  className,
  tone = "ink",
  size = "md",
}: {
  className?: string;
  tone?: "ink" | "foam";
  size?: "md" | "lg";
}) {
  const fg = tone === "foam" ? "var(--color-cream)" : "var(--color-ink)";
  const sub = tone === "foam" ? "rgba(243,239,228,0.62)" : "var(--color-muted)";

  const name = size === "lg" ? "text-[1.35rem]" : "text-[1.02rem]";
  const label = size === "lg" ? "text-[0.62rem]" : "text-[0.55rem]";

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span className="flex flex-col leading-none">
        <span
          className={cn("serif font-bold tracking-[-0.01em]", name)}
          style={{ color: fg }}
        >
          American Royal
        </span>
        <span
          className={cn("mt-[0.18em] font-medium uppercase", label)}
          style={{
            color: sub,
            letterSpacing: "0.26em",
            fontFamily: "var(--font-mono)",
          }}
        >
          Mortgage Corp
        </span>
      </span>
    </span>
  );
}
