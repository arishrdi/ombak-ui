"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { WaveBackground } from "@/registry/ombak/wave-background/wave-background";
import { TextReveal } from "@/registry/ombak/text-reveal/text-reveal";
import { ScrambleText } from "@/registry/ombak/scramble-text/scramble-text";
import { RollingText } from "@/registry/ombak/rolling-text/rolling-text";
import { CountUp } from "@/registry/ombak/count-up/count-up";
import { Marquee } from "@/registry/ombak/marquee/marquee";
import { ImageReveal } from "@/registry/ombak/image-reveal/image-reveal";
import { MagneticButton } from "@/registry/ombak/magnetic-button/magnetic-button";
import { TiltCard } from "@/registry/ombak/tilt-card/tilt-card";
import { RippleGrid } from "@/registry/ombak/ripple-grid/ripple-grid";
import { Bubbles } from "@/registry/ombak/bubbles/bubbles";
import { WaveText } from "@/registry/ombak/wave-text/wave-text";
import { Typewriter } from "@/registry/ombak/typewriter/typewriter";
import { HighlightText } from "@/registry/ombak/highlight-text/highlight-text";
import { GlowCard } from "@/registry/ombak/glow-card/glow-card";
import { Caustics } from "@/registry/ombak/caustics/caustics";
import { CurrentLines } from "@/registry/ombak/current-lines/current-lines";
import { SplitFlap } from "@/registry/ombak/split-flap/split-flap";
import { Odometer } from "@/registry/ombak/odometer/odometer";
import { GradientText } from "@/registry/ombak/gradient-text/gradient-text";
import { ShimmerText } from "@/registry/ombak/shimmer-text/shimmer-text";
import { TorchReveal } from "@/registry/ombak/torch-reveal/torch-reveal";
import { RippleButton } from "@/registry/ombak/ripple-button/ripple-button";
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
import { FlipCard } from "@/registry/ombak/flip-card/flip-card";
import { ExpandCard } from "@/registry/ombak/expand-card/expand-card";
import { DepthGrid } from "@/registry/ombak/depth-grid/depth-grid";
import { FanCards } from "@/registry/ombak/fan-cards/fan-cards";
import { Book3D } from "@/registry/ombak/book-3d/book-3d";
import { DepthCard } from "@/registry/ombak/depth-card/depth-card";
import { CaptionCard } from "@/registry/ombak/caption-card/caption-card";
import { WaveCard } from "@/registry/ombak/wave-card/wave-card";
import { ScratchCard } from "@/registry/ombak/scratch-card/scratch-card";
import { ScatterPhotos } from "@/registry/ombak/scatter-photos/scatter-photos";
import { WaveLoader } from "@/registry/ombak/wave-loader/wave-loader";
import { Skeleton } from "@/registry/ombak/skeleton/skeleton";
import { ProgressRing } from "@/registry/ombak/progress-ring/progress-ring";
import { TypingDots } from "@/registry/ombak/typing-dots/typing-dots";
import { TideProgress } from "@/registry/ombak/tide-progress/tide-progress";
import { OrbitSpinner } from "@/registry/ombak/orbit-spinner/orbit-spinner";
import { StatusDot } from "@/registry/ombak/status-dot/status-dot";
import { LiquidLoader } from "@/registry/ombak/liquid-loader/liquid-loader";
import { Steps } from "@/registry/ombak/steps/steps";
import { Countdown } from "@/registry/ombak/countdown/countdown";
import { AnimatedTabs } from "@/registry/ombak/animated-tabs/animated-tabs";
import { FloatingNav } from "@/registry/ombak/floating-nav/floating-nav";
import { MorphMenu } from "@/registry/ombak/morph-menu/morph-menu";
import { SegmentedControl } from "@/registry/ombak/segmented-control/segmented-control";
import { ScrollSpy } from "@/registry/ombak/scroll-spy/scroll-spy";
import { HoverNav } from "@/registry/ombak/hover-nav/hover-nav";
import { BottomBar } from "@/registry/ombak/bottom-bar/bottom-bar";
import { Accordion } from "@/registry/ombak/accordion/accordion";
import { Pagination } from "@/registry/ombak/pagination/pagination";
import { DropdownMenu } from "@/registry/ombak/dropdown-menu/dropdown-menu";
import { MorphingText } from "@/registry/ombak/morphing-text/morphing-text";
import { ScrollWords } from "@/registry/ombak/scroll-words/scroll-words";
import { GlitchText } from "@/registry/ombak/glitch-text/glitch-text";
import { AssembleText } from "@/registry/ombak/assemble-text/assemble-text";
import { SwellText } from "@/registry/ombak/swell-text/swell-text";
import { OrbitText } from "@/registry/ombak/orbit-text/orbit-text";
import { WaveUnderline } from "@/registry/ombak/wave-underline/wave-underline";
import { RotatingWords } from "@/registry/ombak/rotating-words/rotating-words";
import { TideText } from "@/registry/ombak/tide-text/tide-text";
import { CurvedMarquee } from "@/registry/ombak/curved-marquee/curved-marquee";
import { FloatingInput } from "@/registry/ombak/floating-input/floating-input";
import { OtpInput } from "@/registry/ombak/otp-input/otp-input";
import { PasswordInput } from "@/registry/ombak/password-input/password-input";
import { ToggleSwitch } from "@/registry/ombak/toggle-switch/toggle-switch";
import { RangeSlider } from "@/registry/ombak/range-slider/range-slider";
import { FileDropzone } from "@/registry/ombak/file-dropzone/file-dropzone";
import { TagInput } from "@/registry/ombak/tag-input/tag-input";
import { StarRating } from "@/registry/ombak/star-rating/star-rating";
import { NumberStepper } from "@/registry/ombak/number-stepper/number-stepper";
import { ExpandSearch } from "@/registry/ombak/expand-search/expand-search";
import { RippleDialog } from "@/registry/ombak/ripple-dialog/ripple-dialog";
import { DriftTooltip } from "@/registry/ombak/drift-tooltip/drift-tooltip";
import { TideDrawer } from "@/registry/ombak/tide-drawer/tide-drawer";
import { BloomPopover } from "@/registry/ombak/bloom-popover/bloom-popover";
import { Aurora } from "@/registry/ombak/aurora/aurora";
import { LightRays } from "@/registry/ombak/light-rays/light-rays";
import { Plankton } from "@/registry/ombak/plankton/plankton";
import { RainRipples } from "@/registry/ombak/rain-ripples/rain-ripples";
import { DotSwell } from "@/registry/ombak/dot-swell/dot-swell";

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

function RippleGridThumb() {
  return <RippleGrid className="size-full" gap={18} />;
}

function BubblesThumb() {
  return <Bubbles className="size-full bg-gradient-to-b from-[#0b3b66] to-[#06121f]" count={22} maxSize={9} />;
}

function WaveTextThumb() {
  return <WaveText text="Ombak" className="font-display text-5xl font-bold tracking-tight" />;
}

function TypewriterThumb() {
  return (
    <p className="font-display text-3xl font-bold tracking-tight">
      We build <Typewriter words={["sites.", "waves.", "brands."]} className="text-surf" />
    </p>
  );
}

function HighlightThumb() {
  return (
    <p className="max-w-[14rem] text-center text-xl leading-snug font-semibold">
      Make it <HighlightText color="rgba(94, 240, 200, 0.5)">easy to notice.</HighlightText>
    </p>
  );
}

function VelocitySkewThumb() {
  // illustration: tiles lean while the card is hovered
  return (
    <div className="grid grid-cols-3 gap-2 transition-transform duration-500 ease-out group-hover:-skew-y-6">
      {[1, 2, 3].map((n) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={n} src={`/demo/0${n}.svg`} alt="" className="size-16 rounded-lg object-cover" />
      ))}
    </div>
  );
}

function HorizontalScrollThumb() {
  // illustration: the row slides sideways on hover
  return (
    <div className="w-56 overflow-hidden rounded-lg">
      <div className="flex w-max gap-2 transition-transform duration-[1200ms] ease-in-out group-hover:-translate-x-40">
        {[1, 2, 3, 4, 5].map((n) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={n} src={`/demo/0${n}.svg`} alt="" className="h-24 w-28 rounded-lg object-cover" />
        ))}
      </div>
    </div>
  );
}

function ParallaxThumb() {
  // illustration: the image drifts inside its frame on hover
  return (
    <div className="h-32 w-48 overflow-hidden rounded-xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/demo/01.svg"
        alt=""
        className="h-[150%] w-full -translate-y-[25%] scale-110 object-cover transition-transform duration-[1400ms] ease-out group-hover:translate-y-0 group-hover:scale-100"
      />
    </div>
  );
}

function GlowCardThumb() {
  return (
    <div className="grid w-60 grid-cols-2 gap-2">
      {["Starter", "Studio"].map((t) => (
        <GlowCard key={t} size={200}>
          <div className="p-4 text-sm font-semibold">{t}</div>
        </GlowCard>
      ))}
    </div>
  );
}


function HoverPreviewThumb() {
  return (
    <div className="relative w-56">
      {["Lumen Lamp", "Field Notes", "Coral Coffee"].map((t, i) => (
        <div key={t} className={`border-b py-2 text-sm font-semibold ${i === 1 ? "" : "opacity-40"}`}>{t}</div>
      ))}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/demo/03.svg"
        alt=""
        className="absolute top-3 left-28 w-24 rotate-6 rounded-md shadow-xl transition-transform duration-500 group-hover:translate-x-4 group-hover:-rotate-3"
      />
    </div>
  );
}

function CustomCursorThumb() {
  return (
    <div className="relative h-32 w-48 overflow-hidden rounded-xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/demo/02.svg" alt="" className="size-full object-cover" />
      <span className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-xs font-semibold text-black transition-transform duration-500 group-hover:scale-110">
        View
      </span>
    </div>
  );
}

function CausticsThumb() {
  return <Caustics className="size-full" interactive={false} />;
}
function CurrentLinesThumb() {
  return <CurrentLines className="size-full bg-[#06121f]" density={1.8} />;
}
function SplitFlapThumb() {
  return <SplitFlap text="OMBAK" className="text-3xl" />;
}
function OdometerThumb() {
  return <Odometer value={48210} className="font-display text-5xl font-bold tracking-tight" />;
}
function GradientTextThumb() {
  return <GradientText className="font-display text-4xl font-bold tracking-tight">Deep blue</GradientText>;
}
function ShimmerTextThumb() {
  return <ShimmerText className="font-display text-3xl font-bold tracking-tight">Thinking…</ShimmerText>;
}
function MagnifyDockThumb() {
  // static mini dock (the real one is made of links/buttons, which can't sit inside the card link)
  const sizes = [26, 32, 44, 32, 26];
  return (
    <div className="flex items-end gap-1.5 rounded-xl border bg-card/80 px-2 pt-2 pb-1.5 shadow-lg">
      {sizes.map((s, i) => (
        <span
          key={i}
          className="rounded-[28%]"
          style={{ width: s, height: s, background: ["#2dd4bf", "#38bdf8", "#5ef0c8", "#818cf8", "#f97362"][i] }}
        />
      ))}
    </div>
  );
}
function TorchRevealThumb() {
  return (
    <TorchReveal
      radius={70}
      className="h-32 w-48 rounded-xl"
      reveal={
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/demo/04.svg" alt="" className="size-full object-cover" />
      }
    >
      <div className="grid size-full place-items-center bg-[#020a12] text-xs text-white/60">Hover to explore</div>
    </TorchReveal>
  );
}
function SwipeStackThumb() {
  return (
    <div className="relative h-32 w-28">
      {["#f4f1ea", "#38bdf8", "#2dd4bf"].map((c, i) => (
        <span
          key={c}
          className="absolute inset-0 rounded-xl shadow-lg transition-transform duration-500"
          style={{ background: c, transform: `translateY(${(2 - i) * 8}px) scale(${0.9 + i * 0.05})`, zIndex: i }}
        />
      ))}
      <span className="absolute inset-0 z-10 rounded-xl bg-[#f97362] shadow-xl transition-transform duration-500 group-hover:translate-x-10 group-hover:rotate-12" />
    </div>
  );
}

function ShinyThumb() {
  return <ShinyButton interval={2}>Get started</ShinyButton>;
}
function BorderBeamThumb() {
  return (
    <BorderBeam className="w-48 rounded-xl">
      <div className="p-4 text-sm font-semibold">Pro plan</div>
    </BorderBeam>
  );
}
function HoldThumb() {
  return <HoldButton doneLabel="Deleted">Hold to delete</HoldButton>;
}
function CopyThumb() {
  return <CopyButton value="npx shadcn add @ombak/copy-button" label="Copy" />;
}
function LikeThumb() {
  return <LikeButton count={128} />;
}
function SlideThumb() {
  return <SlideButton className="w-60" label="Slide to confirm" />;
}
function ArrowThumb() {
  return <ArrowButton>Start building</ArrowButton>;
}
function SonarThumb() {
  return <SonarButton>Book a call</SonarButton>;
}
function FillThumb() {
  return <FillButton>Dive in</FillButton>;
}
function StatusThumb() {
  return <StatusButton onAction={() => new Promise((r) => setTimeout(r, 1000))}>Save</StatusButton>;
}
function RippleRealThumb() {
  return <RippleButton>Click me</RippleButton>;
}
function SplashRealThumb() {
  return <SplashButton>Subscribe</SplashButton>;
}

function FlipThumb() {
  return (
    <FlipCard
      className="h-36 w-28"
      front={<div className="grid size-full place-items-center bg-[#0e7fbf] font-display text-xl font-bold text-white">Front</div>}
      back={<div className="grid size-full place-items-center bg-[#5ef0c8] font-display text-xl font-bold text-[#06121f]">Back</div>}
    />
  );
}
function ExpandThumb() {
  return (
    <ExpandCard label="Lumen Lamp" className="w-40" expanded={<div className="p-8 font-display text-3xl font-bold">Lumen Lamp</div>}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/demo/01.svg" alt="" className="aspect-video w-full object-cover" />
      <p className="p-2 text-xs font-semibold">Click to expand</p>
    </ExpandCard>
  );
}
function DepthGridThumb() {
  return (
    <DepthGrid className="w-56 grid-cols-3 gap-2">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={n} src={`/demo/0${n}.svg`} alt="" className="aspect-square w-full rounded-md object-cover" />
      ))}
    </DepthGrid>
  );
}
function FanThumb() {
  return (
    <FanCards cardClassName="h-28 w-20" offset={30} spread={36}>
      {["#2dd4bf", "#38bdf8", "#818cf8", "#f97362"].map((c) => (
        <div key={c} className="size-full rounded-lg border border-black/10 shadow-lg" style={{ background: c }} />
      ))}
    </FanCards>
  );
}
function BookThumb() {
  return (
    <Book3D
      className="h-36 w-28"
      cover={<p className="p-3 font-display text-sm leading-tight font-bold text-white">The Motion Handbook</p>}
      page={<p className="text-[10px]">Chapter 1…</p>}
      thickness={14}
    />
  );
}
function DepthCardThumb() {
  return (
    <DepthCard className="h-36 w-48 border-0 bg-[#06121f] text-white" shift={14}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/demo/02.svg" alt="" data-depth="0.2" className="absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)] object-cover opacity-80" />
      <p data-depth="1" className="absolute bottom-3 left-3 font-display text-lg font-bold">Depth</p>
    </DepthCard>
  );
}
function CaptionThumb() {
  return <CaptionCard src="/demo/06.svg" alt="" title="Coral Coffee" caption="Brand identity · 2025" className="w-36" />;
}
function WaveCardThumb() {
  return (
    <WaveCard className="h-32 w-48">
      <p className="p-3 text-sm font-semibold">Starter</p>
    </WaveCard>
  );
}
function ScratchThumb() {
  return (
    <ScratchCard className="h-28 w-48" brush={16}>
      <p className="font-display text-2xl font-bold text-surf">20% OFF</p>
    </ScratchCard>
  );
}
function ScatterThumb() {
  return (
    <ScatterPhotos
      className="size-full"
      size={86}
      photos={[{ src: "/demo/01.svg" }, { src: "/demo/03.svg" }, { src: "/demo/05.svg" }]}
    />
  );
}

function useCycle(step = 10, ms = 700) {
  const [v, setV] = useState(20);
  useEffect(() => {
    const id = window.setInterval(() => setV((x) => (x >= 100 ? 0 : Math.min(100, x + step))), ms);
    return () => window.clearInterval(id);
  }, [step, ms]);
  return v;
}
function WaveLoaderThumb() {
  return <WaveLoader size={40} bars={6} />;
}
function SkeletonThumb() {
  return (
    <div className="w-48 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" className="size-9" />
        <Skeleton className="h-3 w-24 rounded-md" />
      </div>
      <Skeleton variant="text" lines={2} />
    </div>
  );
}
function ProgressRingThumb() {
  return <ProgressRing value={useCycle()} size={84} thickness={8} />;
}
function TypingThumb() {
  return <TypingDots />;
}
function TideThumb() {
  return <TideProgress value={useCycle(8)} className="w-52" showValue />;
}
function OrbitThumb() {
  return <OrbitSpinner size={56} />;
}
function StatusDotThumb() {
  return (
    <div className="grid gap-2">
      <StatusDot status="online">Online</StatusDot>
      <StatusDot status="away">Away</StatusDot>
      <StatusDot status="busy">Busy</StatusDot>
    </div>
  );
}
function LiquidThumb() {
  return <LiquidLoader value={useCycle(10, 800)} size={100} />;
}
function StepsThumb() {
  return (
    <Steps className="w-60" current={2} steps={[{ title: "Plan" }, { title: "Pay" }, { title: "Done" }]} />
  );
}
function CountdownThumb() {
  const [to] = useState(() => Date.now() + 2 * 86400000 + 5 * 3600000);
  return <Countdown to={to} tileClassName="text-xl px-2 py-1.5" labels={["d", "h", "m", "s"]} />;
}

const ti = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);
function TabsThumb() {
  return (
    <AnimatedTabs
      className="w-auto"
      tabs={[{ label: "Overview", content: null }, { label: "Activity", content: null }, { label: "Settings", content: null }]}
    />
  );
}
function FloatingNavThumb() {
  // illustration: a pill nav floating over a page
  return (
    <div className="relative h-36 w-56 overflow-hidden rounded-xl border bg-background">
      <div className="absolute inset-x-3 top-3 flex items-center justify-between rounded-full border bg-background/80 px-3 py-1.5 text-[10px] shadow-md backdrop-blur transition-transform duration-500 group-hover:-translate-y-12">
        <b>ombak</b>
        <span className="text-muted-foreground">Work · About</span>
      </div>
      <div className="space-y-2 px-3 pt-14">
        <div className="h-3 w-3/4 rounded bg-muted" />
        <div className="h-3 w-1/2 rounded bg-muted" />
        <div className="h-10 rounded bg-muted/60" />
      </div>
    </div>
  );
}
function MorphThumb() {
  return <MorphMenu links={[{ label: "Work", href: "#" }, { label: "Contact", href: "#" }]} />;
}
function SegmentedThumb() {
  return <SegmentedControl label="Billing" options={["Monthly", "Yearly"]} />;
}
function ScrollSpyThumb() {
  return (
    <div className="w-40 border-l text-xs">
      {["Introduction", "Installation", "Usage", "Props"].map((t, i) => (
        <p key={t} className={`relative py-1 pl-3 ${i === 1 ? "font-medium text-foreground" : "text-muted-foreground"}`}>
          {i === 1 && <span className="absolute inset-y-0 -left-px w-0.5 bg-primary" />}
          {t}
        </p>
      ))}
    </div>
  );
}
function HoverNavThumb() {
  return <HoverNav current="/work" links={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: "About", href: "/about" }]} />;
}
function BottomBarThumb() {
  return (
    <BottomBar
      className="max-w-60"
      items={[
        { label: "Home", icon: ti("M3 11l9-8 9 8M5 10v10h14V10") },
        { label: "Search", icon: ti("M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4") },
        { label: "Profile", icon: ti("M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0") },
      ]}
    />
  );
}
function AccordionThumb() {
  return <Accordion className="w-60 text-sm" items={[{ title: "Is it free?", content: "Yes." }, { title: "Is it typed?", content: "Yes." }]} />;
}
function PaginationThumb() {
  return <Pagination total={9} defaultPage={3} />;
}
function DropdownThumb() {
  return <DropdownMenu trigger="Options" items={[{ label: "Edit" }, { label: "Share" }, { label: "Delete", danger: true }]} />;
}

function MorphingThumb() {
  return <MorphingText words={["Ombak", "Waves", "Flow"]} className="font-display text-5xl font-bold tracking-tight" />;
}
function ScrollWordsThumb() {
  // illustration: words lighting up left to right on hover
  const words = "Good motion guides the eye then gets out of the way".split(" ");
  return (
    <p className="w-56 text-lg leading-snug font-semibold">
      {words.map((w, i) => (
        <span key={i} className="opacity-25 transition-opacity duration-300 group-hover:opacity-100" style={{ transitionDelay: `${i * 70}ms` }}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
function GlitchThumb() {
  return <GlitchText text="ERROR" className="font-mono text-4xl font-bold" />;
}
function AssembleThumb() {
  return <AssembleText text="Assemble" trigger="hover" scatter={70} className="font-display text-4xl font-bold" />;
}
function SwellThumb() {
  return <SwellText text="Swell" radius={90} className="font-display text-5xl" />;
}
function OrbitTextThumb() {
  return <OrbitText text="Scroll down • Scroll down • " size={120}>↓</OrbitText>;
}
function WaveUnderlineThumb() {
  return <WaveUnderline href="#" className="text-xl">Hover this link</WaveUnderline>;
}
function RotatingThumb() {
  return (
    <p className="font-display text-3xl font-bold">
      Build <RotatingWords words={["sites", "apps", "magic"]} className="text-surf" />
    </p>
  );
}
function TideTextThumb() {
  return <TideText text="WAVE" className="font-display text-6xl" />;
}
function CurvedThumb() {
  return <CurvedMarquee text="Make waves ✦ " fontSize={60} curve={30} className="w-full" />;
}

function FloatingInputThumb() {
  return <FloatingInput label="Email address" className="w-56" />;
}
function OtpThumb() {
  return <OtpInput length={4} />;
}
function PasswordThumb() {
  return <PasswordInput className="w-56" defaultValue="Ombak2026" />;
}
function ToggleThumb() {
  return (
    <ToggleSwitch defaultChecked size="lg">
      Notifications
    </ToggleSwitch>
  );
}
function RangeThumb() {
  return <RangeSlider label="Volume" defaultValue={65} className="w-52" format={(v) => v + "%"} />;
}
function DropzoneThumb() {
  return <FileDropzone className="w-56 [&_label]:py-5" prompt="Drop files here" />;
}
function TagThumb() {
  return <TagInput label="Skills" defaultValue={["React", "GSAP"]} className="w-56" />;
}
function StarThumb() {
  return <StarRating label="Rating" defaultValue={4} size={30} />;
}
function StepperThumb() {
  return <NumberStepper label="Quantity" defaultValue={2} />;
}
function SearchThumb() {
  return <ExpandSearch hotkey={false} width="13rem" />;
}


function AuroraThumb() {
  return <Aurora className="size-full bg-[#050c16]" blur={40} />;
}
function LightRaysThumb() {
  return <LightRays className="size-full bg-gradient-to-b from-[#0b4a6e] to-[#031421]" />;
}
function PlanktonThumb() {
  return <Plankton className="size-full" count={90} />;
}
function RainRipplesThumb() {
  return <RainRipples className="size-full bg-gradient-to-b from-[#0c2533] to-[#071822]" maxRadius={50} />;
}
function DotSwellThumb() {
  return <DotSwell className="size-full bg-[#050c16]" columns={36} rows={16} amplitude={16} />;
}
function ToastThumb() {
  // a still picture of the stack: the real <Toaster /> is fixed to the viewport
  return (
    <div className="relative h-28 w-64" aria-hidden>
      {[2, 1, 0].map((d) => (
        <div
          key={d}
          className="absolute inset-x-0 bottom-0 flex items-start gap-3 rounded-2xl border bg-popover p-3.5 text-left shadow-lg"
          style={{ transform: `translateY(${-d * 12}px) scale(${1 - d * 0.06})`, zIndex: 3 - d, opacity: d === 2 ? 0.6 : 1 }}
        >
          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-emerald-500" />
          <div>
            <p className="text-sm font-medium">Payment received</p>
            <p className="text-xs text-muted-foreground">Rp 250.000 from Wayan</p>
          </div>
          {d === 0 && <span className="absolute inset-x-0 bottom-0 h-0.5 w-2/3 rounded-full bg-emerald-500/60" />}
        </div>
      ))}
    </div>
  );
}
function RippleDialogThumb() {
  return (
    <RippleDialog
      trigger={<button type="button" className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">Open dialog</button>}
      title="Ripple Dialog"
      description="Opened from where you clicked."
    />
  );
}
function DriftTooltipThumb() {
  return (
    <DriftTooltip content="Drifting along">
      <button type="button" className="rounded-full border bg-background px-8 py-2.5 text-sm font-medium">Hover along me</button>
    </DriftTooltip>
  );
}
function TideDrawerThumb() {
  return (
    <TideDrawer
      trigger={<button type="button" className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">Open drawer</button>}
      title="Tide Drawer"
      description="Drag the handle down to close."
    />
  );
}
function BloomPopoverThumb() {
  return (
    <BloomPopover trigger="Open popover" label="Example">
      <p className="text-sm">Blooms out of its trigger.</p>
    </BloomPopover>
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
  "ripple-grid": { Thumb: RippleGridThumb, bleed: true },
  bubbles: { Thumb: BubblesThumb, bleed: true },
  "wave-text": { Thumb: WaveTextThumb },
  typewriter: { Thumb: TypewriterThumb },
  "highlight-text": { Thumb: HighlightThumb },
  "velocity-skew": { Thumb: VelocitySkewThumb },
  "horizontal-scroll": { Thumb: HorizontalScrollThumb },
  "parallax-image": { Thumb: ParallaxThumb },
  "glow-card": { Thumb: GlowCardThumb },
  "ripple-button": { Thumb: RippleRealThumb },
  "hover-preview": { Thumb: HoverPreviewThumb },
  "custom-cursor": { Thumb: CustomCursorThumb },
  caustics: { Thumb: CausticsThumb, bleed: true },
  "current-lines": { Thumb: CurrentLinesThumb, bleed: true },
  "split-flap": { Thumb: SplitFlapThumb },
  odometer: { Thumb: OdometerThumb },
  "gradient-text": { Thumb: GradientTextThumb },
  "shimmer-text": { Thumb: ShimmerTextThumb },
  "magnify-dock": { Thumb: MagnifyDockThumb },
  "torch-reveal": { Thumb: TorchRevealThumb },
  "swipe-stack": { Thumb: SwipeStackThumb },
  "splash-button": { Thumb: SplashRealThumb },
  "shiny-button": { Thumb: ShinyThumb },
  "border-beam": { Thumb: BorderBeamThumb },
  "hold-button": { Thumb: HoldThumb },
  "copy-button": { Thumb: CopyThumb },
  "like-button": { Thumb: LikeThumb },
  "slide-button": { Thumb: SlideThumb },
  "arrow-button": { Thumb: ArrowThumb },
  "sonar-button": { Thumb: SonarThumb },
  "fill-button": { Thumb: FillThumb },
  "status-button": { Thumb: StatusThumb },
  "flip-card": { Thumb: FlipThumb },
  "expand-card": { Thumb: ExpandThumb },
  "depth-grid": { Thumb: DepthGridThumb },
  "fan-cards": { Thumb: FanThumb },
  "book-3d": { Thumb: BookThumb },
  "depth-card": { Thumb: DepthCardThumb },
  "caption-card": { Thumb: CaptionThumb },
  "wave-card": { Thumb: WaveCardThumb },
  "scratch-card": { Thumb: ScratchThumb },
  "scatter-photos": { Thumb: ScatterThumb, bleed: true },
  "wave-loader": { Thumb: WaveLoaderThumb },
  skeleton: { Thumb: SkeletonThumb },
  "progress-ring": { Thumb: ProgressRingThumb },
  "typing-dots": { Thumb: TypingThumb },
  "tide-progress": { Thumb: TideThumb },
  "orbit-spinner": { Thumb: OrbitThumb },
  "status-dot": { Thumb: StatusDotThumb },
  "liquid-loader": { Thumb: LiquidThumb },
  steps: { Thumb: StepsThumb },
  countdown: { Thumb: CountdownThumb },
  "animated-tabs": { Thumb: TabsThumb },
  "floating-nav": { Thumb: FloatingNavThumb },
  "morph-menu": { Thumb: MorphThumb },
  "segmented-control": { Thumb: SegmentedThumb },
  "scroll-spy": { Thumb: ScrollSpyThumb },
  "hover-nav": { Thumb: HoverNavThumb },
  "bottom-bar": { Thumb: BottomBarThumb },
  accordion: { Thumb: AccordionThumb },
  pagination: { Thumb: PaginationThumb },
  "dropdown-menu": { Thumb: DropdownThumb },
  "morphing-text": { Thumb: MorphingThumb },
  "scroll-words": { Thumb: ScrollWordsThumb },
  "glitch-text": { Thumb: GlitchThumb },
  "assemble-text": { Thumb: AssembleThumb },
  "swell-text": { Thumb: SwellThumb },
  "orbit-text": { Thumb: OrbitTextThumb },
  "wave-underline": { Thumb: WaveUnderlineThumb },
  "rotating-words": { Thumb: RotatingThumb },
  "tide-text": { Thumb: TideTextThumb },
  "curved-marquee": { Thumb: CurvedThumb, bleed: true },
  "floating-input": { Thumb: FloatingInputThumb },
  "otp-input": { Thumb: OtpThumb },
  "password-input": { Thumb: PasswordThumb },
  "toggle-switch": { Thumb: ToggleThumb },
  "range-slider": { Thumb: RangeThumb },
  "file-dropzone": { Thumb: DropzoneThumb },
  "tag-input": { Thumb: TagThumb },
  "star-rating": { Thumb: StarThumb },
  "number-stepper": { Thumb: StepperThumb },
  "expand-search": { Thumb: SearchThumb },
  aurora: { Thumb: AuroraThumb, bleed: true },
  "light-rays": { Thumb: LightRaysThumb, bleed: true },
  plankton: { Thumb: PlanktonThumb, bleed: true },
  "rain-ripples": { Thumb: RainRipplesThumb, bleed: true },
  "dot-swell": { Thumb: DotSwellThumb, bleed: true },
  "toast-stack": { Thumb: ToastThumb },
  "ripple-dialog": { Thumb: RippleDialogThumb },
  "drift-tooltip": { Thumb: DriftTooltipThumb },
  "tide-drawer": { Thumb: TideDrawerThumb },
  "bloom-popover": { Thumb: BloomPopoverThumb },
};
