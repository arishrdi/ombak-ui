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
  caustics: {
    Demo: D.CausticsDemo,
    stage: "p-0 md:p-0",
    usage: `import { Caustics } from "@/components/caustics";

<Caustics className="h-[480px]" color="#7df9ff" deep="#03243a">
  <h1>Under the surface.</h1>
</Caustics>`,
  },
  "current-lines": {
    Demo: D.CurrentLinesDemo,
    stage: "p-0 md:p-0",
    usage: `import { CurrentLines } from "@/components/current-lines";

<CurrentLines className="h-[480px] bg-slate-950 text-sky-300/80">
  <h1>Go with the flow.</h1>
</CurrentLines>`,
  },
  "split-flap": {
    Demo: D.SplitFlapDemo,
    usage: `import { SplitFlap } from "@/components/split-flap";

// change \`text\` and the board flips to it
<SplitFlap text={city} length={8} className="text-5xl" />
<SplitFlap text="GATE 12" cellClassName="bg-amber-400 text-zinc-900" />`,
  },
  odometer: {
    Demo: D.OdometerDemo,
    usage: `import { Odometer } from "@/components/odometer";

<Odometer value={followers} className="text-7xl font-bold" />
<Odometer value={99.5} decimals={1} suffix="%" />`,
  },
  "gradient-text": {
    Demo: D.GradientTextDemo,
    usage: `import { GradientText } from "@/components/gradient-text";

<GradientText className="text-7xl font-bold">Deep blue sea</GradientText>
<GradientText colors={["#f97362", "#fbbf24", "#f472b6"]}>single word</GradientText>`,
  },
  "shimmer-text": {
    Demo: D.ShimmerTextDemo,
    usage: `import { ShimmerText } from "@/components/shimmer-text";

<ShimmerText>Generating your component</ShimmerText>`,
  },
  "magnify-dock": {
    Demo: D.MagnifyDockDemo,
    usage: `import { MagnifyDock } from "@/components/magnify-dock";

<MagnifyDock
  items={[
    { label: "Home", icon: <HomeIcon />, href: "/" },
    { label: "Search", icon: <SearchIcon />, onClick: openSearch },
  ]}
/>`,
  },
  "torch-reveal": {
    Demo: D.TorchRevealDemo,
    usage: `import { TorchReveal } from "@/components/torch-reveal";

<TorchReveal className="h-96" reveal={<img src="/secret.jpg" alt="" />}>
  <div className="size-full bg-black">It's dark down here.</div>
</TorchReveal>`,
  },
  "swipe-stack": {
    Demo: D.SwipeStackDemo,
    usage: `import { SwipeStack } from "@/components/swipe-stack";

<SwipeStack className="w-72" onSwipe={(i, dir) => console.log(i, dir)}>
  <Card title="Reef" />
  <Card title="Swell" />
  <Card title="Coral" />
</SwipeStack>`,
  },
  "splash-button": {
    Demo: D.SplashButtonDemo,
    usage: `import { SplashButton } from "@/components/splash-button";

<SplashButton onClick={subscribe}>Subscribe</SplashButton>`,
  },
  "shiny-button": {
    Demo: D.ShinyButtonDemo,
    usage: `import { ShinyButton } from "@/components/shiny-button";

<ShinyButton>Get started</ShinyButton>
<ShinyButton trigger="hover">Shine on hover</ShinyButton>`,
  },
  "border-beam": {
    Demo: D.BorderBeamDemo,
    usage: `import { BorderBeam } from "@/components/border-beam";

<BorderBeam className="rounded-2xl">
  <div className="p-6">Pro plan</div>
</BorderBeam>`,
  },
  "hold-button": {
    Demo: D.HoldButtonDemo,
    usage: `import { HoldButton } from "@/components/hold-button";

<HoldButton holdTime={1200} onConfirm={deleteProject} doneLabel="Deleted">
  Hold to delete
</HoldButton>`,
  },
  "copy-button": {
    Demo: D.CopyButtonDemo,
    usage: `import { CopyButton } from "@/components/copy-button";

<CopyButton value="npx shadcn add @ombak/copy-button" />
<CopyButton value={email} label="Copy email" />`,
  },
  "like-button": {
    Demo: D.LikeButtonDemo,
    usage: `import { LikeButton } from "@/components/like-button";

<LikeButton count={128} onChange={(liked, count) => save(liked)} />`,
  },
  "slide-button": {
    Demo: D.SlideButtonDemo,
    usage: `import { SlideButton } from "@/components/slide-button";

<SlideButton label="Slide to pay $49" doneLabel="Paid" onConfirm={pay} />`,
  },
  "arrow-button": {
    Demo: D.ArrowButtonDemo,
    usage: `import { ArrowButton } from "@/components/arrow-button";

<ArrowButton>Start building</ArrowButton>
<ArrowButton as="a" href="/docs" variant="grow">Read the docs</ArrowButton>`,
  },
  "sonar-button": {
    Demo: D.SonarButtonDemo,
    usage: `import { SonarButton } from "@/components/sonar-button";

<SonarButton>Book a call</SonarButton>`,
  },
  "fill-button": {
    Demo: D.FillButtonDemo,
    usage: `import { FillButton } from "@/components/fill-button";

<FillButton>Dive in</FillButton>
<FillButton color="#0ea5e9" fillTextColor="#fff">Make waves</FillButton>`,
  },
  "status-button": {
    Demo: D.StatusButtonDemo,
    usage: `import { StatusButton } from "@/components/status-button";

// resolve = success, throw/reject = error
<StatusButton onAction={() => saveSettings(form)}>Save changes</StatusButton>`,
  },
  "flip-card": {
    Demo: D.FlipCardDemo,
    usage: `import { FlipCard } from "@/components/flip-card";

<FlipCard className="h-72 w-56" front={<Front />} back={<Back />} />
<FlipCard trigger="click" axis="x" front={<Front />} back={<Back />} />`,
  },
  "expand-card": {
    Demo: D.ExpandCardDemo,
    usage: `import { ExpandCard } from "@/components/expand-card";

<ExpandCard label="Lumen Lamp" expanded={<ProjectDetails />}>
  <img src="/lumen.jpg" alt="" />
  <p className="p-4">Lumen Lamp</p>
</ExpandCard>`,
  },
  "depth-grid": {
    Demo: D.DepthGridDemo,
    usage: `import { DepthGrid } from "@/components/depth-grid";

<DepthGrid className="grid-cols-3 gap-4">
  {photos.map((p) => <img key={p.id} src={p.src} alt="" />)}
</DepthGrid>`,
  },
  "fan-cards": {
    Demo: D.FanCardsDemo,
    usage: `import { FanCards } from "@/components/fan-cards";

<FanCards spread={40}>
  <Card /> <Card /> <Card /> <Card />
</FanCards>`,
  },
  "book-3d": {
    Demo: D.Book3DDemo,
    usage: `import { Book3D } from "@/components/book-3d";

<Book3D cover={<h3 className="p-5 text-white">The Motion Handbook</h3>} page={<p>Chapter 1…</p>} />`,
  },
  "depth-card": {
    Demo: D.DepthCardDemo,
    usage: `import { DepthCard } from "@/components/depth-card";

<DepthCard className="h-80 w-72">
  <img src="/bg.jpg" alt="" data-depth="0.2" />
  <div data-depth="0.6">Glass panel</div>
  <h3 data-depth="1">Title</h3>
</DepthCard>`,
  },
  "caption-card": {
    Demo: D.CaptionCardDemo,
    usage: `import { CaptionCard } from "@/components/caption-card";

<CaptionCard src="/lumen.jpg" alt="Lumen lamp" title="Lumen Lamp" caption="Product launch · 2026" href="/work/lumen" />`,
  },
  "wave-card": {
    Demo: D.WaveCardDemo,
    usage: `import { WaveCard } from "@/components/wave-card";

<WaveCard className="h-64">
  <div className="p-6">Starter</div>
</WaveCard>`,
  },
  "scratch-card": {
    Demo: D.ScratchCardDemo,
    usage: `import { ScratchCard } from "@/components/scratch-card";

<ScratchCard onReveal={() => track("revealed")}>
  <p className="text-4xl font-bold">20% OFF</p>
</ScratchCard>`,
  },
  "scatter-photos": {
    Demo: D.ScatterPhotosDemo,
    usage: `import { ScatterPhotos } from "@/components/scatter-photos";

<ScatterPhotos
  photos={[
    { src: "/a.jpg", caption: "first light" },
    { src: "/b.jpg", caption: "the swell" },
  ]}
/>`,
  },
};
