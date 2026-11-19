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
  aurora: {
    Demo: D.AuroraDemo,
    stage: "p-0 md:p-0",
    usage: `import { Aurora } from "@/components/aurora";

<Aurora className="h-[480px] bg-slate-950" colors={["#3fd1b0", "#0ea5e9", "#6366f1"]}>
  <h1>After the sunset.</h1>
</Aurora>`,
  },
  "light-rays": {
    Demo: D.LightRaysDemo,
    stage: "p-0 md:p-0",
    usage: `import { LightRays } from "@/components/light-rays";

<LightRays className="h-[480px] bg-gradient-to-b from-sky-900 to-slate-950" count={10}>
  <h1>Into the blue.</h1>
</LightRays>`,
  },
  plankton: {
    Demo: D.PlanktonDemo,
    stage: "p-0 md:p-0",
    usage: `import { Plankton } from "@/components/plankton";

<Plankton className="h-[480px]" color="#5ef0c8" radius={160}>
  <h1>Move to light it up.</h1>
</Plankton>`,
  },
  "rain-ripples": {
    Demo: D.RainRipplesDemo,
    stage: "p-0 md:p-0",
    usage: `import { RainRipples } from "@/components/rain-ripples";

<RainRipples className="h-[480px] bg-slate-900 text-sky-200" rate={8}>
  <h1>Rain on the sea.</h1>
</RainRipples>`,
  },
  "dot-swell": {
    Demo: D.DotSwellDemo,
    stage: "p-0 md:p-0",
    usage: `import { DotSwell } from "@/components/dot-swell";

<DotSwell className="h-[480px] bg-slate-950 text-cyan-300" amplitude={30}>
  <h1>Open water.</h1>
</DotSwell>`,
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
  "wave-loader": {
    Demo: D.WaveLoaderDemo,
    usage: `import { WaveLoader } from "@/components/wave-loader";

<WaveLoader />
<WaveLoader bars={7} size={40} color="#5ef0c8" />`,
  },
  skeleton: {
    Demo: D.SkeletonDemo,
    usage: `import { Skeleton } from "@/components/skeleton";

<Skeleton variant="circle" />
<Skeleton className="h-40" />
<Skeleton variant="text" lines={3} />`,
  },
  "progress-ring": {
    Demo: D.ProgressRingDemo,
    usage: `import { ProgressRing } from "@/components/progress-ring";

<ProgressRing value={uploaded} />
<ProgressRing label="Loading" /> {/* no value = spinner */}`,
  },
  "typing-dots": {
    Demo: D.TypingDotsDemo,
    usage: `import { TypingDots } from "@/components/typing-dots";

{isTyping && <TypingDots label="Dewi is typing" />}`,
  },
  "tide-progress": {
    Demo: D.TideProgressDemo,
    usage: `import { TideProgress } from "@/components/tide-progress";

<TideProgress value={progress} showValue />`,
  },
  "orbit-spinner": {
    Demo: D.OrbitSpinnerDemo,
    usage: `import { OrbitSpinner } from "@/components/orbit-spinner";

<OrbitSpinner />
<OrbitSpinner size={64} dots={4} />`,
  },
  "status-dot": {
    Demo: D.StatusDotDemo,
    usage: `import { StatusDot } from "@/components/status-dot";

<StatusDot status="online">Aris · Online</StatusDot>
<StatusDot status="busy" />`,
  },
  "liquid-loader": {
    Demo: D.LiquidLoaderDemo,
    usage: `import { LiquidLoader } from "@/components/liquid-loader";

<LiquidLoader value={progress} />
<LiquidLoader /> {/* no value = endless loader */}`,
  },
  steps: {
    Demo: D.StepsDemo,
    usage: `import { Steps } from "@/components/steps";

<Steps
  current={1}
  steps={[{ title: "Account" }, { title: "Plan" }, { title: "Payment" }, { title: "Done" }]}
/>`,
  },
  countdown: {
    Demo: D.CountdownDemo,
    usage: `import { Countdown } from "@/components/countdown";

<Countdown to="2026-12-31T23:59:59" onComplete={() => setLive(true)} />`,
  },
  "animated-tabs": {
    Demo: D.AnimatedTabsDemo,
    usage: `import { AnimatedTabs } from "@/components/animated-tabs";

<AnimatedTabs
  tabs={[
    { label: "Overview", content: <Overview /> },
    { label: "Activity", content: <Activity /> },
  ]}
/>`,
  },
  "floating-nav": {
    Demo: D.FloatingNavDemo,
    stage: "p-0 md:p-0",
    usage: `import { FloatingNav } from "@/components/floating-nav";

// at the top of your layout
<FloatingNav>
  <Logo />
  <nav>…links…</nav>
</FloatingNav>`,
  },
  "morph-menu": {
    Demo: D.MorphMenuDemo,
    usage: `import { MorphMenu } from "@/components/morph-menu";

<MorphMenu links={[{ label: "Work", href: "/work" }, { label: "Contact", href: "/contact" }]} />`,
  },
  "segmented-control": {
    Demo: D.SegmentedControlDemo,
    usage: `import { SegmentedControl } from "@/components/segmented-control";

<SegmentedControl label="Billing period" options={["Monthly", "Yearly"]} value={period} onChange={setPeriod} />`,
  },
  "scroll-spy": {
    Demo: D.ScrollSpyDemo,
    usage: `import { ScrollSpy } from "@/components/scroll-spy";

<aside className="sticky top-24">
  <ScrollSpy items={[{ id: "intro", label: "Introduction" }, { id: "usage", label: "Usage" }]} />
</aside>`,
  },
  "hover-nav": {
    Demo: D.HoverNavDemo,
    usage: `import { HoverNav } from "@/components/hover-nav";

<HoverNav current={pathname} links={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }]} />`,
  },
  "bottom-bar": {
    Demo: D.BottomBarDemo,
    usage: `import { BottomBar } from "@/components/bottom-bar";

<div className="fixed inset-x-4 bottom-4 md:hidden">
  <BottomBar items={[{ label: "Home", icon: <HomeIcon /> }, { label: "Search", icon: <SearchIcon /> }]} onChange={go} />
</div>`,
  },
  accordion: {
    Demo: D.AccordionDemo,
    usage: `import { Accordion } from "@/components/accordion";

<Accordion items={[{ title: "Is it free?", content: "Yes, MIT licensed." }]} />`,
  },
  pagination: {
    Demo: D.PaginationDemo,
    usage: `import { Pagination } from "@/components/pagination";

<Pagination total={12} page={page} onChange={setPage} />`,
  },
  "dropdown-menu": {
    Demo: D.DropdownMenuDemo,
    stage: "items-start",
    usage: `import { DropdownMenu } from "@/components/dropdown-menu";

<DropdownMenu
  trigger="Options"
  items={[
    { label: "Edit", onSelect: edit },
    { label: "Delete", onSelect: remove, danger: true },
  ]}
/>`,
  },
  "morphing-text": {
    Demo: D.MorphingTextDemo,
    usage: `import { MorphingText } from "@/components/morphing-text";

<h1 className="text-7xl font-bold">
  <MorphingText words={["Ombak", "Waves", "Motion"]} />
</h1>`,
  },
  "scroll-words": {
    Demo: D.ScrollWordsDemo,
    stage: "p-0 md:p-0",
    usage: `import { ScrollWords } from "@/components/scroll-words";

<ScrollWords className="text-4xl font-semibold" text="Good motion doesn't shout. It guides the eye…" />`,
  },
  "glitch-text": {
    Demo: D.GlitchTextDemo,
    usage: `import { GlitchText } from "@/components/glitch-text";

<GlitchText text="SYSTEM ERROR" className="font-mono text-6xl font-bold" />
<GlitchText text="hover me" trigger="hover" />`,
  },
  "assemble-text": {
    Demo: D.AssembleTextDemo,
    usage: `import { AssembleText } from "@/components/assemble-text";

<AssembleText text="Coming together" className="text-6xl font-bold" />`,
  },
  "swell-text": {
    Demo: D.SwellTextDemo,
    usage: `import { SwellText } from "@/components/swell-text";

// best with a variable font that has a weight axis
<SwellText text="Ride the swell" className="text-7xl" />`,
  },
  "orbit-text": {
    Demo: D.OrbitTextDemo,
    usage: `import { OrbitText } from "@/components/orbit-text";

<OrbitText text="Scroll down • Scroll down • ">
  <ArrowDown />
</OrbitText>`,
  },
  "wave-underline": {
    Demo: D.WaveUnderlineDemo,
    usage: `import { WaveUnderline } from "@/components/wave-underline";

<WaveUnderline href="/docs">documentation</WaveUnderline>`,
  },
  "rotating-words": {
    Demo: D.RotatingWordsDemo,
    usage: `import { RotatingWords } from "@/components/rotating-words";

<h1>
  Build <RotatingWords words={["landing pages", "portfolios", "dashboards"]} />
</h1>`,
  },
  "tide-text": {
    Demo: D.TideTextDemo,
    usage: `import { TideText } from "@/components/tide-text";

<TideText text="OMBAK" level={55} className="text-9xl" />`,
  },
  "curved-marquee": {
    Demo: D.CurvedMarqueeDemo,
    stage: "px-0 md:px-0",
    usage: `import { CurvedMarquee } from "@/components/curved-marquee";

<CurvedMarquee text="Make waves ✦ Ride the swell ✦ " />`,
  },
  "floating-input": {
    Demo: D.FloatingInputDemo,
    usage: `import { FloatingInput } from "@/components/floating-input";

<FloatingInput label="Email" type="email" name="email" required />
<FloatingInput label="Email" error hint="Please enter a complete email address." />`,
  },
  "otp-input": {
    Demo: D.OtpInputDemo,
    usage: `import { OtpInput } from "@/components/otp-input";

<OtpInput length={6} onComplete={(code) => verify(code)} />`,
  },
  "password-input": {
    Demo: D.PasswordInputDemo,
    usage: `import { PasswordInput } from "@/components/password-input";

<PasswordInput name="password" autoComplete="new-password" />`,
  },
  "toggle-switch": {
    Demo: D.ToggleSwitchDemo,
    usage: `import { ToggleSwitch } from "@/components/toggle-switch";

<ToggleSwitch checked={enabled} onChange={setEnabled}>Email notifications</ToggleSwitch>`,
  },
  "range-slider": {
    Demo: D.RangeSliderDemo,
    usage: `import { RangeSlider } from "@/components/range-slider";

<RangeSlider label="Budget" min={500} max={10000} step={100} format={(v) => "$" + v} />`,
  },
  "file-dropzone": {
    Demo: D.FileDropzoneDemo,
    usage: `import { FileDropzone } from "@/components/file-dropzone";

<FileDropzone accept="image/*,.pdf" maxSize={5 * 1024 * 1024} onFiles={upload} />`,
  },
  "tag-input": {
    Demo: D.TagInputDemo,
    usage: `import { TagInput } from "@/components/tag-input";

<TagInput label="Skills" value={skills} onChange={setSkills} max={6} />`,
  },
  "star-rating": {
    Demo: D.StarRatingDemo,
    usage: `import { StarRating } from "@/components/star-rating";

<StarRating label="Rate this product" value={rating} onChange={setRating} />
<StarRating label="Average rating" value={4} readOnly />`,
  },
  "number-stepper": {
    Demo: D.NumberStepperDemo,
    usage: `import { NumberStepper } from "@/components/number-stepper";

<NumberStepper label="Quantity" min={1} max={10} value={qty} onChange={setQty} />`,
  },
  "expand-search": {
    Demo: D.ExpandSearchDemo,
    usage: `import { ExpandSearch } from "@/components/expand-search";

<ExpandSearch onSearch={setQuery} onSubmit={runSearch} />`,
  },
  "toast-stack": {
    Demo: D.ToastStackDemo,
    usage: `import { Toaster, toast } from "@/components/toast-stack";

// once, e.g. in app/layout.tsx
<Toaster position="bottom-right" />

// anywhere
toast("Changes saved", { description: "Your profile is up to date." });
toast.success("Payment received");
toast.error("Upload failed", { duration: 6000 });`,
  },
  "ripple-dialog": {
    Demo: D.RippleDialogDemo,
    usage: `import { RippleDialog } from "@/components/ripple-dialog";

<RippleDialog
  trigger={<button>Delete project</button>}
  title="Delete this project?"
  description="You can't undo this."
>
  <form method="dialog"><button>Cancel</button></form>
</RippleDialog>

// or controlled
<RippleDialog open={open} onOpenChange={setOpen} title="Settings">…</RippleDialog>`,
  },
  "drift-tooltip": {
    Demo: D.DriftTooltipDemo,
    usage: `import { DriftTooltip } from "@/components/drift-tooltip";

<DriftTooltip content="Bold">
  <button aria-label="Bold">B</button>
</DriftTooltip>`,
  },
  "tide-drawer": {
    Demo: D.TideDrawerDemo,
    usage: `import { TideDrawer } from "@/components/tide-drawer";

<TideDrawer trigger={<button>Share</button>} title="Share this page">
  {/* anything */}
</TideDrawer>`,
  },
  "bloom-popover": {
    Demo: D.BloomPopoverDemo,
    usage: `import { BloomPopover } from "@/components/bloom-popover";

<BloomPopover trigger="Notifications" label="Notification settings">
  <p>Notify me about…</p>
</BloomPopover>`,
  },
};
