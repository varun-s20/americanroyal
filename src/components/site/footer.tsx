import Link from "next/link";
import { Logo } from "./logo";

const PAGES = [
  { label: "Home loans", href: "/products" },
  { label: "About us", href: "/about" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Talk to us", href: "/#connect" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Licensing", href: "#licensing" },
];

export function Footer() {
  return (
    <footer className="bg-forest px-6 pb-12 pt-20 text-cream">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-10 border-b border-cream/15 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <Logo tone="foam" size="lg" />
            <p className="serif mt-6 max-w-sm text-[1.45rem] italic leading-snug text-cream/90">
              Your home, in trusted hands.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {PAGES.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[0.9rem] font-medium text-cream/75 transition-colors hover:text-cream"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-6 text-[0.78rem] leading-relaxed text-cream/55 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {LEGAL.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="transition-colors hover:text-cream/90"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <p>© 2026 American Royal Mortgage Corp. All rights reserved.</p>
          </div>
          <p className="max-w-xl md:text-right">
            NMLS #000000. Equal Housing Lender. This is not a commitment to lend.
            All loans subject to credit approval.
          </p>
        </div>
      </div>
    </footer>
  );
}
