"use client";

import type { ComponentType } from "react";
import { WaveBackground } from "@/registry/ombak/wave-background/wave-background";
import { TextReveal } from "@/registry/ombak/text-reveal/text-reveal";
import { ScrambleText } from "@/registry/ombak/scramble-text/scramble-text";
import { RollingText } from "@/registry/ombak/rolling-text/rolling-text";
import { CountUp } from "@/registry/ombak/count-up/count-up";
import { Marquee } from "@/registry/ombak/marquee/marquee";
import { ImageReveal } from "@/registry/ombak/image-reveal/image-reveal";
import { MagneticButton } from "@/registry/ombak/magnetic-button/magnetic-button";
import { TiltCard } from "@/registry/ombak/tilt-card/tilt-card";

/* Small live previews used on cards (landing bento + components index). */

function WaveThumb() {
  return (
    <WaveBackground
      className="size-full bg-[#06121f]"
      colors={["#173a8a", "#0e7fbf", "#19b5c4", "#5ef0c8"]}
      baseline={0.7}
      amplitude={0.11}
    />
  );
}

function TextRevealThumb() {
  return (
    <TextReveal as="p" split="chars" stagger={0.03} className="font-display text-4xl font-bold tracking-tight">
      Hello, wave.
    </TextReveal>
  );
}

function ScrambleThumb() {
  return <ScrambleText text="HOVER ME" trigger="both" className="text-2xl font-semibold tracking-wider" />;
}

function RollingThumb() {
  return <RollingText text="Hover me" className="font-display text-4xl font-bold tracking-tight" />;
}

function CountUpThumb() {
  return (
    <div className="text-center">
      <CountUp value={12480} suffix="+" className="font-display text-5xl font-bold tracking-tight" />
      <p className="mt-1 text-xs text-muted-foreground">downloads</p>
    </div>
  );
}

function MarqueeThumb() {
  return (
    <Marquee speed={40} gap="0.75rem" className="w-full">
      {["Smooth", "Kinetic", "Tactile", "Fluid", "Alive"].map((w) => (
        <span key={w} className="rounded-full border bg-background px-4 py-1.5 text-sm font-medium">
          {w}
        </span>
      ))}
    </Marquee>
  );
}

function StackThumb() {
  // Static illustration: the real effect needs page scroll.
  return (
    <div className="relative h-32 w-48">
      {["#f4f1ea", "#f97362", "#0ea5e9", "#2dd4bf"].map((c, i) => (
        <div
          key={c}
          className="absolute inset-x-0 h-24 rounded-xl shadow-lg transition-transform duration-500 group-hover:-translate-y-1"
          style={{ background: c, top: i * 10, transform: `scale(${0.85 + i * 0.05})`, zIndex: i }}
        />
      ))}
    </div>
  );
}

function ImageRevealThumb() {
  return (
    <ImageReveal from="left" className="h-32 w-48 rounded-xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/demo/04.svg" alt="" />
    </ImageReveal>
  );
}

function MagneticThumb() {
  // rendered as a span: the whole card is already a link
  return (
    <MagneticButton as="span" strength={0.5}>
      Pull me →
    </MagneticButton>
  );
}

function TiltThumb() {
  return (
    <TiltCard max={14} className="w-40 border-transparent bg-deep text-white">
      <div className="flex h-28 flex-col justify-between p-4">
        <span className="font-mono text-xs opacity-80">Pro</span>
        <span className="font-display text-4xl font-bold">$29</span>
      </div>
    </TiltCard>
  );
}

export const thumbs: Record<string, { Thumb: ComponentType; bleed?: boolean }> = {
  "wave-background": { Thumb: WaveThumb, bleed: true },
  "text-reveal": { Thumb: TextRevealThumb },
  "scramble-text": { Thumb: ScrambleThumb },
  "rolling-text": { Thumb: RollingThumb },
  "count-up": { Thumb: CountUpThumb },
  marquee: { Thumb: MarqueeThumb, bleed: true },
  "stack-cards": { Thumb: StackThumb },
  "image-reveal": { Thumb: ImageRevealThumb },
  "magnetic-button": { Thumb: MagneticThumb },
  "tilt-card": { Thumb: TiltThumb },
};
