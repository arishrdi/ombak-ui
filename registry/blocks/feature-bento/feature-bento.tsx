"use client";

import type { ReactNode } from "react";
import { GlowCard } from "@/registry/ombak/glow-card/glow-card";
import { TextReveal } from "@/registry/ombak/text-reveal/text-reveal";
import { cn } from "@/lib/utils";

export type Feature = {
  title: string;
  description: string;
  /** SVG path data for a 24×24 stroke icon. */
  icon: string;
  /** Optional visual shown at the top of the card. */
  visual?: ReactNode;
  /** Grid span on desktop: 2 (third), 3 (half) or 4 (two thirds). */
  span?: 2 | 3 | 4;
};

export type FeatureBentoProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  features?: Feature[];
  className?: string;
};

const SPAN = { 2: "md:col-span-2", 3: "md:col-span-3", 4: "md:col-span-4" } as const;

const DEFAULT_FEATURES: Feature[] = [
  {
    title: "Fast by default",
    description: "Animations pause off-screen and canvases cap their pixel ratio, so pages stay smooth on any device.",
    icon: "M13 2 4 14h7l-1 8 9-12h-7z",
    span: 4,
    visual: <Bars />,
  },
  {
    title: "Accessible motion",
    description: "Everything respects prefers-reduced-motion.",
    icon: "M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3",
    span: 2,
  },
  {
    title: "Yours to edit",
    description: "One readable file per component, copied into your repo.",
    icon: "M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14",
    span: 2,
  },
  {
    title: "Themed automatically",
    description: "Built on shadcn tokens, so light, dark and custom themes just work.",
    icon: "M12 3a9 9 0 1 0 9 9c0-.5-.5-1-1-1h-4a3 3 0 0 1 0-6h1c.5 0 1-.5 1-1A9 9 0 0 0 12 3z",
    span: 2,
  },
  {
    title: "Touch aware",
    description: "Hover-only effects switch off on touch screens.",
    icon: "M9 11V5a2 2 0 1 1 4 0v6m0-1a2 2 0 1 1 4 0v3a7 7 0 0 1-7 7h-.5A5.5 5.5 0 0 1 4 14.5V13a2 2 0 1 1 4 0",
    span: 2,
  },
];

/** A bento grid of feature cards with a cursor-following glow. */
export function FeatureBento({
  eyebrow = "Features",
  title = "Pretty on the surface, careful underneath.",
  description = "Everything you need to add motion without slowing your site down.",
  features = DEFAULT_FEATURES,
  className,
}: FeatureBentoProps) {
  return (
    <section className={cn("bg-background px-6 py-20 md:py-28", className)}>
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">{eyebrow}</p>
        <TextReveal as="h2" className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
          {title}
        </TextReveal>
        <p className="mt-4 max-w-xl text-muted-foreground">{description}</p>
        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {features.map((f) => (
            <GlowCard key={f.title} className={cn("rounded-2xl", SPAN[f.span ?? 2])}>
              <div className="flex h-full flex-col p-6">
                {f.visual && <div className="mb-6">{f.visual}</div>}
                <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={f.icon} />
                  </svg>
                </span>
                <h3 className="mt-5 font-medium tracking-[-0.01em]">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Decorative bar chart for the wide card. */
function Bars() {
  const h = [38, 52, 44, 68, 60, 82, 74, 96];
  return (
    <div className="flex h-28 items-end gap-2" aria-hidden>
      {h.map((v, i) => (
        <span
          key={i}
          className="flex-1 rounded-t-md bg-gradient-to-t from-primary/10 to-primary/50"
          style={{ height: `${v}%` }}
        />
      ))}
    </div>
  );
}
