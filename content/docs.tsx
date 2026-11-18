import type { ComponentType } from "react";
import * as D from "@/components/demos";

type DocEntry = {
  Demo: ComponentType;
  /** Snippet shown under "Usage". */
  usage: string;
  /** Extra classes for the preview stage (e.g. taller for scroll demos). */
  stage?: string;
};

export const docs: Record<string, DocEntry> = {
  "wave-background": {
    Demo: D.WaveBackgroundDemo,
    stage: "p-0 md:p-0",
    usage: `import { WaveBackground } from "@/components/wave-background";

export function Hero() {
  return (
    <WaveBackground className="h-[480px] bg-slate-950" blur={2}>
      <h1>Ride the wave.</h1>
    </WaveBackground>
  );
}`,
  },
  "text-reveal": {
    Demo: D.TextRevealDemo,
    usage: `import { TextReveal } from "@/components/text-reveal";

<TextReveal as="h1" split="lines">
  Motion that makes your site feel alive.
</TextReveal>

<TextReveal split="words" blur>Softly, one word at a time.</TextReveal>
<TextReveal split="chars" trigger="load">Hello</TextReveal>`,
  },
  "scramble-text": {
    Demo: D.ScrambleTextDemo,
    usage: `import { ScrambleText } from "@/components/scramble-text";

<ScrambleText text="SYSTEM ONLINE" trigger="both" />`,
  },
  "rolling-text": {
    Demo: D.RollingTextDemo,
    usage: `import { RollingText } from "@/components/rolling-text";

// add "group/roll" to the link so hovering anywhere on it rolls the text
<a href="/work" className="group/roll">
  <RollingText text="Work" />
</a>`,
  },
  "count-up": {
    Demo: D.CountUpDemo,
    usage: `import { CountUp } from "@/components/count-up";

<CountUp value={12480} suffix="+" />
<CountUp value={98.6} decimals={1} suffix="%" />`,
  },
  marquee: {
    Demo: D.MarqueeDemo,
    stage: "px-0 md:px-0",
    usage: `import { Marquee } from "@/components/marquee";

<Marquee speed={60}>
  <span>Smooth</span>
  <span>Kinetic</span>
  <span>Alive</span>
</Marquee>`,
  },
  "stack-cards": {
    Demo: D.StackCardsDemo,
    stage: "items-start",
    usage: `import { StackCards } from "@/components/stack-cards";

<StackCards top="15vh">
  <div className="h-72 rounded-2xl bg-teal-300">Discover</div>
  <div className="h-72 rounded-2xl bg-sky-400">Design</div>
  <div className="h-72 rounded-2xl bg-orange-400">Develop</div>
</StackCards>`,
  },
  "image-reveal": {
    Demo: D.ImageRevealDemo,
    usage: `import { ImageReveal } from "@/components/image-reveal";

<ImageReveal from="left" className="aspect-[3/4] rounded-xl">
  <img src="/photo.jpg" alt="" />
</ImageReveal>`,
  },
  "magnetic-button": {
    Demo: D.MagneticButtonDemo,
    usage: `import { MagneticButton } from "@/components/magnetic-button";

<MagneticButton>Start a project</MagneticButton>

<MagneticButton as="a" href="/work" className="border bg-transparent text-foreground">
  See the work
</MagneticButton>`,
  },
  "tilt-card": {
    Demo: D.TiltCardDemo,
    usage: `import { TiltCard } from "@/components/tilt-card";

<TiltCard max={12}>
  <div className="p-6">Pro · $29</div>
</TiltCard>`,
  },
  "ripple-grid": {
    Demo: D.RippleGridDemo,
    stage: "p-0 md:p-0",
    usage: `import { RippleGrid } from "@/components/ripple-grid";

<RippleGrid className="h-[480px]">
  <h1>Touch the water.</h1>
</RippleGrid>`,
  },
  bubbles: {
    Demo: D.BubblesDemo,
    stage: "p-0 md:p-0",
    usage: `import { Bubbles } from "@/components/bubbles";

<Bubbles className="h-[480px] bg-slate-950 text-sky-300" count={50}>
  <h1>Deep dive.</h1>
</Bubbles>`,
  },
  "wave-text": {
    Demo: D.WaveTextDemo,
    usage: `import { WaveText } from "@/components/wave-text";

<WaveText text="Ombak" className="text-7xl font-bold" />
<WaveText text="hover me" trigger="hover" amplitude="0.4em" />`,
  },
  typewriter: {
    Demo: D.TypewriterDemo,
    usage: `import { Typewriter } from "@/components/typewriter";

<h1>
  We build <Typewriter words={["websites.", "products.", "brands."]} />
</h1>`,
  },
  "highlight-text": {
    Demo: D.HighlightTextDemo,
    usage: `import { HighlightText } from "@/components/highlight-text";

<p>
  Good design is about <HighlightText>knowing what to leave out</HighlightText>.
</p>

// follow the scroll position instead of playing once
<HighlightText scrub color="rgba(94, 240, 200, 0.45)">…</HighlightText>`,
  },
  "velocity-skew": {
    Demo: D.VelocitySkewDemo,
    usage: `import { VelocitySkew } from "@/components/velocity-skew";

<VelocitySkew max={8}>
  <div className="grid grid-cols-3 gap-4">{images}</div>
</VelocitySkew>`,
  },
  "horizontal-scroll": {
    Demo: D.HorizontalScrollDemo,
    stage: "items-start",
    usage: `import { HorizontalScroll } from "@/components/horizontal-scroll";

<HorizontalScroll gap="1rem">
  {projects.map((p) => (
    <div key={p.id} className="h-[60vh] w-[480px] shrink-0">…</div>
  ))}
</HorizontalScroll>`,
  },
  "parallax-image": {
    Demo: D.ParallaxImageDemo,
    usage: `import { ParallaxImage } from "@/components/parallax-image";

<ParallaxImage src="/hero.jpg" alt="Studio" className="aspect-[4/5] rounded-xl" />`,
  },
  "glow-card": {
    Demo: D.GlowCardDemo,
    usage: `import { GlowCard } from "@/components/glow-card";

<div className="grid grid-cols-3 gap-4">
  <GlowCard><div className="p-6">Starter</div></GlowCard>
  <GlowCard><div className="p-6">Studio</div></GlowCard>
  <GlowCard><div className="p-6">Agency</div></GlowCard>
</div>`,
  },
  "ripple-button": {
    Demo: D.RippleButtonDemo,
    usage: `import { RippleButton } from "@/components/ripple-button";

<RippleButton onClick={save}>Click me</RippleButton>
<RippleButton className="border bg-transparent text-foreground" rippleColor="rgba(0,0,0,.15)">
  Outline
</RippleButton>`,
  },
  "hover-preview": {
    Demo: D.HoverPreviewDemo,
    usage: `import { HoverPreview } from "@/components/hover-preview";

<HoverPreview
  items={[
    { title: "Lumen Lamp", meta: "2026", image: "/lumen.jpg", href: "/work/lumen" },
    { title: "Field Notes", meta: "2025", image: "/field.jpg" },
  ]}
/>`,
  },
  "custom-cursor": {
    Demo: D.CustomCursorDemo,
    usage: `// app/layout.tsx
import { CustomCursor } from "@/components/custom-cursor";

<body>
  {children}
  <CustomCursor />
</body>

// anywhere: show a label inside the cursor
<a href="/case" data-cursor-label="View">…</a>`,
  },
};
