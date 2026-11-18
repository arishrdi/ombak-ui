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
import { Caustics } from "@/registry/ombak/caustics/caustics";
import { CurrentLines } from "@/registry/ombak/current-lines/current-lines";
import { SplitFlap } from "@/registry/ombak/split-flap/split-flap";
import { Odometer } from "@/registry/ombak/odometer/odometer";
import { GradientText } from "@/registry/ombak/gradient-text/gradient-text";
import { ShimmerText } from "@/registry/ombak/shimmer-text/shimmer-text";
import { MagnifyDock } from "@/registry/ombak/magnify-dock/magnify-dock";
import { TorchReveal } from "@/registry/ombak/torch-reveal/torch-reveal";
import { SwipeStack } from "@/registry/ombak/swipe-stack/swipe-stack";
import { SplashButton } from "@/registry/ombak/splash-button/splash-button";
import { ShinyButton } from "@/registry/ombak/shiny-button/shiny-button";
import { BorderBeam } from "@/registry/ombak/border-beam/border-beam";
import { HoldButton } from "@/registry/ombak/hold-button/hold-button";
import { CopyButton } from "@/registry/ombak/copy-button/copy-button";
import { LikeButton } from "@/registry/ombak/like-button/like-button";
import { SlideButton } from "@/registry/ombak/slide-button/slide-button";
import { ArrowButton } from "@/registry/ombak/arrow-button/arrow-button";
import { SonarButton } from "@/registry/ombak/sonar-button/sonar-button";
import { FillButton } from "@/registry/ombak/fill-button/fill-button";
import { StatusButton } from "@/registry/ombak/status-button/status-button";
import { useEffect, useState } from "react";

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

export function CausticsDemo() {
  return (
    <Caustics className="flex h-[440px] w-full items-center justify-center rounded-xl">
      <div className="pointer-events-none text-center text-white">
        <p className="font-display text-5xl font-bold tracking-tight drop-shadow md:text-6xl">Under the surface.</p>
        <p className="mt-3 text-sm text-white/75">A tiny WebGL shader, no libraries.</p>
      </div>
    </Caustics>
  );
}

export function CurrentLinesDemo() {
  return (
    <CurrentLines className="flex h-[440px] w-full items-center justify-center rounded-xl bg-[#06121f]">
      <p className="pointer-events-none font-display text-5xl font-bold tracking-tight text-white md:text-6xl">Go with the flow.</p>
    </CurrentLines>
  );
}

export function SplitFlapDemo() {
  const cities = ["JAKARTA", "BALI", "TOKYO", "BERLIN", "LIMA"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % cities.length), 3800);
    return () => window.clearInterval(id);
  }, [cities.length]);
  return (
    <div className="space-y-3 text-center">
      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Now boarding</p>
      <SplitFlap text={cities[i]} length={8} className="text-4xl md:text-5xl" />
      <div>
        <SplitFlap text="GATE 12" className="text-xl" cellClassName="bg-amber-400 text-zinc-900" />
      </div>
    </div>
  );
}

export function OdometerDemo() {
  const [v, setV] = useState(12480);
  return (
    <div className="space-y-8 text-center">
      <Odometer value={v} className="font-display text-7xl font-bold tracking-tight" />
      <div className="flex justify-center gap-3">
        <button className="rounded-full border px-4 py-2 text-sm hover:bg-muted" onClick={() => setV((n) => n + Math.floor(Math.random() * 900 + 100))}>
          + Add
        </button>
        <button className="rounded-full border px-4 py-2 text-sm hover:bg-muted" onClick={() => setV(Math.floor(Math.random() * 99999))}>
          Random
        </button>
      </div>
    </div>
  );
}

export function GradientTextDemo() {
  return (
    <div className="space-y-6 text-center">
      <GradientText className="font-display text-6xl font-bold tracking-tight md:text-7xl">Deep blue sea</GradientText>
      <p className="text-xl text-muted-foreground">
        Use it for a <GradientText colors={["#f97362", "#fbbf24", "#f472b6"]} className="font-semibold">single word</GradientText> too.
      </p>
    </div>
  );
}

export function ShimmerTextDemo() {
  return (
    <div className="space-y-6 text-center">
      <ShimmerText className="font-display text-5xl font-bold tracking-tight md:text-6xl">Thinking about waves…</ShimmerText>
      <p>
        <ShimmerText className="text-sm font-medium">Generating your component</ShimmerText>
      </p>
    </div>
  );
}

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const DOCK = [
  { label: "Home", icon: icon("M3 11l9-8 9 8M5 10v10h14V10") },
  { label: "Search", icon: icon("M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4") },
  { label: "Music", icon: icon("M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z") },
  { label: "Photos", icon: icon("M4 5h16v14H4zM4 15l5-5 4 4 3-3 4 4") },
  { label: "Mail", icon: icon("M3 6h18v12H3zM3 7l9 6 9-6") },
  { label: "Settings", icon: icon("M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1") },
];
export function MagnifyDockDemo() {
  return (
    <div className="flex h-56 items-end">
      <MagnifyDock items={DOCK} />
    </div>
  );
}

export function TorchRevealDemo() {
  return (
    <TorchReveal
      className="h-[400px] w-full max-w-3xl rounded-xl"
      reveal={
        <div className="relative size-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/demo/04.svg" alt="" className="size-full object-cover" />
          <p className="absolute inset-0 grid place-items-center font-display text-5xl font-bold tracking-tight text-[#06121f]">You found it.</p>
        </div>
      }
    >
      <div className="grid size-full place-items-center bg-[#020a12] text-center">
        <div>
          <p className="font-display text-4xl font-bold tracking-tight text-white/90">It&apos;s dark down here.</p>
          <p className="mt-2 text-sm text-white/50">Move your torch around.</p>
        </div>
      </div>
    </TorchReveal>
  );
}

export function SwipeStackDemo() {
  const cards = [
    ["#2dd4bf", "Reef", "Drag me, or use ← →"],
    ["#38bdf8", "Swell", "Swiped cards go to the back"],
    ["#f97362", "Coral", "So the deck never ends"],
    ["#f4f1ea", "Foam", "Works with touch, too"],
  ];
  return (
    <SwipeStack className="w-72">
      {cards.map(([bg, t, d]) => (
        <div key={t} className="flex h-80 flex-col justify-between rounded-2xl p-6 text-[#06121f] shadow-xl" style={{ background: bg }}>
          <span className="font-display text-4xl font-bold tracking-tight">{t}</span>
          <span className="text-sm font-medium opacity-80">{d}</span>
        </div>
      ))}
    </SwipeStack>
  );
}

export function SplashButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <SplashButton>Make a splash</SplashButton>
      <SplashButton className="bg-surf text-[#06121f]" colors={["#f97362", "#fbbf24", "#f472b6"]}>
        Subscribe
      </SplashButton>
    </div>
  );
}

export function ShinyButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5">
      <ShinyButton>Get started</ShinyButton>
      <ShinyButton trigger="hover" className="bg-surf text-[#06121f]">Shine on hover</ShinyButton>
    </div>
  );
}

export function BorderBeamDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-6 px-6 sm:grid-cols-2">
      <BorderBeam className="rounded-2xl">
        <div className="p-6">
          <p className="font-display text-xl font-semibold">Pro plan</p>
          <p className="mt-2 text-sm text-muted-foreground">The beam keeps circling the card.</p>
        </div>
      </BorderBeam>
      <BorderBeam className="rounded-full" colors={["transparent", "#f97362", "#fbbf24"]} duration={3}>
        <div className="flex items-center gap-3 rounded-full px-5 py-3 text-sm">
          <span className="size-2 rounded-full bg-emerald-500" /> New: 42 components
        </div>
      </BorderBeam>
    </div>
  );
}

export function HoldButtonDemo() {
  const [n, setN] = useState(0);
  return (
    <div className="space-y-4 text-center">
      <HoldButton onConfirm={() => setN((x) => x + 1)} doneLabel="Deleted">Hold to delete</HoldButton>
      <p className="text-sm text-muted-foreground">Confirmed {n} time{n === 1 ? "" : "s"}. Let go early and nothing happens.</p>
    </div>
  );
}

export function CopyButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <div className="flex items-center gap-3 rounded-xl border bg-card py-2 pr-2 pl-4 font-mono text-sm">
        npx shadcn add @ombak/copy-button
        <CopyButton value="npx shadcn add @ombak/copy-button" />
      </div>
      <CopyButton value="hello@ombakui.com" label="Copy email" />
    </div>
  );
}

export function LikeButtonDemo() {
  return (
    <div className="flex items-center gap-4">
      <LikeButton count={128} />
      <LikeButton count={2049} defaultLiked color="#0ea5e9" />
    </div>
  );
}

export function SlideButtonDemo() {
  return <SlideButton label="Slide to pay $49" doneLabel="Paid" />;
}

export function ArrowButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5">
      <ArrowButton>Start building</ArrowButton>
      <ArrowButton variant="grow" className="border bg-transparent text-foreground">
        Read the docs
      </ArrowButton>
    </div>
  );
}

export function SonarButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-12 py-10">
      <SonarButton>Book a call</SonarButton>
      <SonarButton className="bg-surf text-[#06121f]" color="#5ef0c8" rings={2}>
        Live now
      </SonarButton>
    </div>
  );
}

export function FillButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5">
      <FillButton>Dive in</FillButton>
      <FillButton color="#0ea5e9" fillTextColor="#fff">
        Make waves
      </FillButton>
    </div>
  );
}

export function StatusButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5">
      <StatusButton onAction={() => new Promise((r) => setTimeout(r, 1200))}>Save changes</StatusButton>
      <StatusButton
        onAction={() => new Promise((_, reject) => setTimeout(() => reject(new Error("nope")), 1200))}
        className="bg-transparent text-foreground ring-1 ring-border"
      >
        This one fails
      </StatusButton>
    </div>
  );
}
