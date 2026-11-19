"use client";

import { WaveBackground } from "@/registry/ombak/wave-background/wave-background";
import { TextReveal } from "@/registry/ombak/text-reveal/text-reveal";
import { MagneticButton } from "@/registry/ombak/magnetic-button/magnetic-button";
import { RollingText } from "@/registry/ombak/rolling-text/rolling-text";
import { cn } from "@/lib/utils";

export type HeroWaveProps = {
  /** Small label in the pill above the headline. */
  badge?: string;
  /** Main headline. Revealed word by word on load. */
  title?: string;
  /** Supporting paragraph under the headline. */
  description?: string;
  /** Primary call to action. */
  primary?: { label: string; href: string };
  /** Secondary text link. */
  secondary?: { label: string; href: string };
  /** Wave colors, back to front. */
  colors?: string[];
  className?: string;
};

/**
 * A full-height hero on animated ocean waves: badge, word-by-word headline,
 * a magnetic primary button and a rolling text link.
 */
export function HeroWave({
  badge = "New: 92 components",
  title = "Make your website move like water.",
  description = "A calm, fast landing page hero. Waves swell under the cursor, the headline rises word by word.",
  primary = { label: "Get started", href: "#" },
  secondary = { label: "Read the docs", href: "#" },
  colors = ["#0f2a66", "#0b5e91", "#138fa3", "#3fd1b0"],
  className,
}: HeroWaveProps) {
  return (
    <WaveBackground colors={colors} baseline={0.88} amplitude={0.06} blur={2} className={cn("bg-[#050c16] text-white", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(50%_40%_at_50%_0%,rgba(94,240,200,.14),transparent_70%)]"
      />
      <div className="mx-auto flex min-h-[640px] max-w-5xl flex-col items-center px-6 pt-24 pb-56 text-center md:pt-32">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-xs text-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_0_0_1px_rgba(255,255,255,.1)] backdrop-blur">
          <span className="size-1.5 rounded-full bg-[#5ef0c8] shadow-[0_0_10px_#5ef0c8]" />
          {badge}
        </span>
        <TextReveal
          as="h1"
          split="words"
          trigger="load"
          stagger={0.06}
          className="mt-7 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.045em]"
        >
          {title}
        </TextReveal>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">{description}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <MagneticButton as="a" href={primary.href} className="bg-white px-7 text-[#050c16]">
            {primary.label} →
          </MagneticButton>
          <a href={secondary.href} className="group/roll text-sm font-medium text-white/85 hover:text-white">
            <RollingText text={secondary.label} />
          </a>
        </div>
      </div>
    </WaveBackground>
  );
}
