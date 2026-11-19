"use client";

import { useState, type ReactNode } from "react";
import { FloatingInput } from "@/registry/ombak/floating-input/floating-input";
import { StatusButton } from "@/registry/ombak/status-button/status-button";
import { StatusDot } from "@/registry/ombak/status-dot/status-dot";
import { WaveUnderline } from "@/registry/ombak/wave-underline/wave-underline";
import { cn } from "@/lib/utils";

export type FooterColumn = { title: string; links: { label: string; href: string }[] };

export type FooterWaveProps = {
  /** Brand name. Also used for the large wordmark at the bottom. */
  brand?: string;
  /** One line about the product. */
  tagline?: ReactNode;
  columns?: FooterColumn[];
  /** Called with the email when someone subscribes. Throw to show an error. */
  onSubscribe?: (email: string) => Promise<unknown> | unknown;
  /** Status line next to the copyright. Set to null to hide it. */
  status?: string | null;
  /** Copyright line. Kept static: reading the clock during render breaks prerendering with cacheComponents. */
  copyright?: string;
  className?: string;
};

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Roadmap", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Licenses", href: "#" },
    ],
  },
];

/**
 * A full footer: newsletter signup with an animated submit button, link columns with wave
 * underlines, a live status line and an oversized wordmark fading into the page.
 */
export function FooterWave({
  brand = "Lautan",
  tagline = "Calm tools for teams who ship fast.",
  columns = DEFAULT_COLUMNS,
  onSubscribe,
  status = "All systems normal",
  copyright = "© Lautan, Inc. All rights reserved.",
  className,
}: FooterWaveProps) {
  const [email, setEmail] = useState("");

  const subscribe = async () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Invalid email");
    await (onSubscribe ? onSubscribe(email) : new Promise((r) => setTimeout(r, 900)));
    setEmail("");
  };

  return (
    <footer className={cn("relative overflow-hidden border-t bg-background", className)}>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-10 md:grid-cols-[1.4fr_2fr] md:pt-20">
        <div>
          <p className="text-lg font-semibold tracking-[-0.02em]">{brand}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{tagline}</p>
          <form
            className="mt-8 flex max-w-sm items-start gap-2"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Newsletter signup"
          >
            <FloatingInput
              label="Email for updates"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <StatusButton onAction={subscribe} successLabel="Subscribed" errorLabel="Check email" width="8.5rem" className="h-14 shrink-0 rounded-xl">
              Subscribe
            </StatusButton>
          </form>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <WaveUnderline
                      href={l.href}
                      // hide the resting line so the wave only appears on hover
                      className="text-sm font-normal text-foreground/75 transition-colors hover:text-foreground [&>span:first-of-type]:opacity-0"
                    >
                      {l.label}
                    </WaveUnderline>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t px-6 py-6 text-xs text-muted-foreground">
        <span>{copyright}</span>
        {status && (
          <span className="inline-flex items-center gap-2">
            <StatusDot status="online" size={8} />
            {status}
          </span>
        )}
      </div>

      <p
        aria-hidden
        className="pointer-events-none -mt-4 -mb-[0.2em] bg-gradient-to-b from-foreground/[0.08] to-transparent bg-clip-text text-center text-[24vw] leading-none font-semibold tracking-[-0.06em] text-transparent select-none lg:text-[16rem]"
      >
        {brand.toLowerCase()}
      </p>
    </footer>
  );
}
