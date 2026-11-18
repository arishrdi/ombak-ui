"use client";

import { useEffect, useRef, type ComponentType } from "react";
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
};
