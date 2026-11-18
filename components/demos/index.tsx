"use client";

import { WaveBackground } from "@/registry/ombak/wave-background/wave-background";
import { TextReveal } from "@/registry/ombak/text-reveal/text-reveal";
import { ScrambleText } from "@/registry/ombak/scramble-text/scramble-text";
import { RollingText } from "@/registry/ombak/rolling-text/rolling-text";
import { CountUp } from "@/registry/ombak/count-up/count-up";
import { Marquee } from "@/registry/ombak/marquee/marquee";
import { StackCards } from "@/registry/ombak/stack-cards/stack-cards";
import { ImageReveal } from "@/registry/ombak/image-reveal/image-reveal";
import { MagneticButton } from "@/registry/ombak/magnetic-button/magnetic-button";
import { TiltCard } from "@/registry/ombak/tilt-card/tilt-card";

/* Live demos shown in the docs. Each one is also what the "Usage" snippet describes. */

export function WaveBackgroundDemo() {
  return (
    <WaveBackground className="flex h-[420px] w-full items-start justify-center rounded-xl bg-[#071a2b] pt-20" blur={2}>
      <div className="text-center">
        <p className="font-display text-5xl font-bold tracking-tight text-white md:text-6xl">Ride the wave.</p>
        <p className="mt-3 text-sm text-white/70">Move your cursor across the water.</p>
      </div>
    </WaveBackground>
  );
}

export function TextRevealDemo() {
  return (
    <div className="flex min-h-[320px] w-full max-w-2xl flex-col justify-center gap-8 px-6">
      <TextReveal as="h3" split="lines" trigger="load" className="font-display text-4xl font-bold tracking-tight md:text-5xl">
        Motion that makes your site feel alive.
      </TextReveal>
      <TextReveal as="p" split="words" blur trigger="load" delay={0.4} className="text-lg text-muted-foreground">
        Every word arrives a beat after the last, softly coming into focus.
      </TextReveal>
    </div>
  );
}

export function ScrambleTextDemo() {
  return (
    <div className="grid w-full max-w-xl gap-4 px-6 sm:grid-cols-2">
      {["SYSTEM ONLINE", "HOVER ME", "ACCESS GRANTED", "DEPLOYING"].map((t) => (
        <div key={t} className="rounded-xl border bg-card px-5 py-8">
          <ScrambleText text={t} className="text-xl font-semibold" />
        </div>
      ))}
    </div>
  );
}

export function RollingTextDemo() {
  return (
    <nav className="flex flex-wrap items-center justify-center gap-8 font-display text-4xl font-bold tracking-tight md:text-5xl">
      {["Work", "Studio", "Journal", "Contact"].map((t) => (
        <a key={t} href="#" onClick={(e) => e.preventDefault()} className="group/roll">
          <RollingText text={t} />
        </a>
      ))}
    </nav>
  );
}

export function CountUpDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-8 px-6 sm:grid-cols-3">
      {[
        { value: 12480, suffix: "+", label: "developers" },
        { value: 98.6, decimals: 1, suffix: "%", label: "uptime" },
        { value: 2.4, decimals: 1, prefix: "$", suffix: "M", label: "raised" },
      ].map(({ label, ...p }) => (
        <div key={label} className="border-t pt-4">
          <CountUp {...p} className="font-display text-5xl font-bold tracking-tight" />
          <p className="mt-2 text-sm text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>
  );
}

export function MarqueeDemo() {
  const words = ["Smooth", "Kinetic", "Tactile", "Alive", "Fluid"];
  return (
    <div className="w-full space-y-4">
      <Marquee speed={60}>
        {words.map((w) => (
          <span key={w} className="flex items-center gap-12 font-display text-5xl font-bold tracking-tight">
            {w}
            <span className="text-surf">✦</span>
          </span>
        ))}
      </Marquee>
      <Marquee speed={45} direction="right" gap="1rem">
        {["Next.js", "React", "GSAP", "Tailwind", "TypeScript", "shadcn"].map((w) => (
          <span key={w} className="rounded-full border bg-card px-5 py-2 text-sm font-medium">
            {w}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export function StackCardsDemo() {
  const cards = [
    ["#2dd4bf", "01", "Discover"],
    ["#0ea5e9", "02", "Design"],
    ["#f97362", "03", "Develop"],
    ["#f4f1ea", "04", "Deliver"],
  ];
  return (
    <div className="w-full px-4 py-10">
      <p className="mb-6 text-center text-sm text-muted-foreground">Scroll the page ↓</p>
      <StackCards top="15vh">
        {cards.map(([bg, n, t]) => (
          <div
            key={n}
            className="flex h-72 flex-col justify-between rounded-2xl p-8 text-[#0b1f33]"
            style={{ background: bg }}
          >
            <span className="font-mono text-sm">{n} / 04</span>
            <span className="font-display text-5xl font-bold tracking-tight md:text-6xl">{t}</span>
          </div>
        ))}
      </StackCards>
    </div>
  );
}

export function ImageRevealDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 px-6 sm:grid-cols-3">
      {(["up", "left", "down"] as const).map((from, i) => (
        <div key={from}>
          <ImageReveal from={from} delay={i * 0.12} className="aspect-[3/4] rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/demo/0${i + 1}.svg`} alt="" />
          </ImageReveal>
          <p className="mt-2 font-mono text-xs text-muted-foreground">from=&quot;{from}&quot;</p>
        </div>
      ))}
    </div>
  );
}

export function MagneticButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <MagneticButton>Start a project →</MagneticButton>
      <MagneticButton className="border bg-transparent text-foreground" strength={0.5}>
        See the work
      </MagneticButton>
      <MagneticButton className="size-32 bg-surf p-0 text-[#0b1f33]" strength={0.6} innerStrength={0.35}>
        Say hi
      </MagneticButton>
    </div>
  );
}

export function TiltCardDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-5 px-6 sm:grid-cols-3">
      {[
        ["Starter", "$9", ""],
        ["Pro", "$29", "bg-deep text-white border-transparent"],
        ["Team", "$79", ""],
      ].map(([name, price, cls]) => (
        <TiltCard key={name} className={cls}>
          <div className="flex h-60 flex-col justify-between p-6">
            <span className="font-mono text-sm opacity-80">{name}</span>
            <span className="font-display text-6xl font-bold tracking-tight">{price}</span>
          </div>
        </TiltCard>
      ))}
    </div>
  );
}
