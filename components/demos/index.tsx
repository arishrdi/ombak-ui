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
import { RippleGrid } from "@/registry/ombak/ripple-grid/ripple-grid";
import { Bubbles } from "@/registry/ombak/bubbles/bubbles";
import { WaveText } from "@/registry/ombak/wave-text/wave-text";
import { Typewriter } from "@/registry/ombak/typewriter/typewriter";
import { HighlightText } from "@/registry/ombak/highlight-text/highlight-text";
import { VelocitySkew } from "@/registry/ombak/velocity-skew/velocity-skew";
import { HorizontalScroll } from "@/registry/ombak/horizontal-scroll/horizontal-scroll";
import { ParallaxImage } from "@/registry/ombak/parallax-image/parallax-image";
import { GlowCard } from "@/registry/ombak/glow-card/glow-card";
import { RippleButton } from "@/registry/ombak/ripple-button/ripple-button";
import { HoverPreview } from "@/registry/ombak/hover-preview/hover-preview";
import { CustomCursor } from "@/registry/ombak/custom-cursor/custom-cursor";

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

export function RippleGridDemo() {
  return (
    <RippleGrid className="flex h-[420px] w-full items-center justify-center rounded-xl">
      <div className="pointer-events-none text-center">
        <p className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">Touch the water.</p>
        <p className="mt-2 text-sm">Move or click anywhere.</p>
      </div>
    </RippleGrid>
  );
}

export function BubblesDemo() {
  return (
    <Bubbles className="flex h-[420px] w-full items-center justify-center rounded-xl bg-gradient-to-b from-[#0b3b66] to-[#06121f]">
      <p className="pointer-events-none font-display text-4xl font-bold tracking-tight text-white md:text-5xl">Deep dive.</p>
    </Bubbles>
  );
}

export function WaveTextDemo() {
  return (
    <div className="space-y-10 text-center">
      <WaveText text="Ombak" className="font-display text-7xl font-bold tracking-tight md:text-8xl" />
      <p className="text-muted-foreground">
        Or only on hover:{" "}
        <WaveText text="hover me" trigger="hover" amplitude="0.4em" className="font-semibold text-foreground" />
      </p>
    </div>
  );
}

export function TypewriterDemo() {
  return (
    <p className="font-display text-4xl font-bold tracking-tight md:text-6xl">
      We build{" "}
      <Typewriter words={["websites.", "products.", "brands.", "waves."]} className="text-surf" />
    </p>
  );
}

export function HighlightTextDemo() {
  return (
    <p className="max-w-2xl px-6 text-3xl leading-snug font-semibold tracking-tight md:text-4xl">
      Good design is mostly about{" "}
      <HighlightText>knowing what to leave out</HighlightText>, and great motion is about{" "}
      <HighlightText color="rgba(94, 240, 200, 0.45)" delay={0.5}>
        knowing when to stop.
      </HighlightText>
    </p>
  );
}

export function VelocitySkewDemo() {
  return (
    <div className="w-full py-6">
      <p className="mb-6 text-center text-sm text-muted-foreground">Scroll the page quickly ↕</p>
      <VelocitySkew>
        <div className="grid grid-cols-3 gap-4 px-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={n} src={`/demo/0${n}.svg`} alt="" className="aspect-square w-full rounded-xl object-cover" />
          ))}
        </div>
      </VelocitySkew>
    </div>
  );
}

export function HorizontalScrollDemo() {
  const names = ["Shore", "Swell", "Reef", "Tide", "Current", "Deep"];
  return (
    <div className="w-full">
      <p className="mb-6 text-center text-sm text-muted-foreground">Scroll down: the row moves sideways →</p>
      <HorizontalScroll className="rounded-xl" gap="1rem">
        {names.map((n, i) => (
          <div key={n} className="relative h-[340px] w-[min(70vw,420px)] shrink-0 overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/demo/0${i + 1}.svg`} alt="" className="size-full object-cover" />
            <span className="absolute bottom-4 left-5 font-display text-3xl font-bold text-white mix-blend-difference">{n}</span>
          </div>
        ))}
      </HorizontalScroll>
    </div>
  );
}

export function ParallaxImageDemo() {
  return (
    <div className="grid w-full max-w-3xl items-end gap-5 px-6 sm:grid-cols-2">
      <ParallaxImage src="/demo/01.svg" alt="Abstract ocean artwork" className="aspect-[4/5] rounded-xl" />
      <ParallaxImage src="/demo/03.svg" alt="Abstract ocean artwork" speed={0.25} className="aspect-square rounded-xl" />
    </div>
  );
}

export function GlowCardDemo() {
  const plans = [
    ["Starter", "Everything to ship a landing page."],
    ["Studio", "For teams shipping every week."],
    ["Agency", "Unlimited client projects."],
  ];
  return (
    <div className="grid w-full max-w-3xl gap-4 px-6 sm:grid-cols-3">
      {plans.map(([t, d]) => (
        <GlowCard key={t}>
          <div className="flex h-48 flex-col justify-between p-6">
            <span className="font-display text-2xl font-semibold">{t}</span>
            <span className="text-sm text-muted-foreground">{d}</span>
          </div>
        </GlowCard>
      ))}
    </div>
  );
}

export function RippleButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5">
      <RippleButton>Click me</RippleButton>
      <RippleButton className="bg-surf text-[#06121f]" rippleColor="rgba(6, 18, 31, 0.25)">
        Make a splash
      </RippleButton>
      <RippleButton className="border bg-transparent text-foreground" rippleColor="rgba(94, 240, 200, 0.35)">
        Outline
      </RippleButton>
    </div>
  );
}

export function HoverPreviewDemo() {
  return (
    <div className="w-full max-w-3xl px-6">
      <HoverPreview
        items={[
          { title: "Lumen Lamp", meta: "Product launch", image: "/demo/01.svg" },
          { title: "Field Notes", meta: "Editorial", image: "/demo/03.svg" },
          { title: "Coral Coffee", meta: "Brand identity", image: "/demo/06.svg" },
          { title: "Tide Studio", meta: "Portfolio", image: "/demo/02.svg" },
        ]}
      />
    </div>
  );
}

export function CustomCursorDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 px-6 sm:grid-cols-3">
      <CustomCursor />
      {(["View", "Drag", "Play"] as const).map((label, i) => (
        <div key={label} data-cursor-label={label} className="aspect-[4/5] overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/demo/0${i + 2}.svg`} alt="" className="size-full object-cover" />
        </div>
      ))}
    </div>
  );
}
