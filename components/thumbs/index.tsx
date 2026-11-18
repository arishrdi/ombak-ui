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

function RippleButtonThumb() {
  // a span (the card is already a link) with a ripple that repeats on its own
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      const ring = document.createElement("span");
      Object.assign(ring.style, {
        position: "absolute", left: "50%", top: "50%", width: "220px", height: "220px", margin: "-110px 0 0 -110px",
        borderRadius: "9999px", background: "rgba(255,255,255,.45)", pointerEvents: "none", zIndex: "-1",
      });
      el.appendChild(ring);
      ring.animate([{ transform: "scale(0)", opacity: 1 }, { transform: "scale(1)", opacity: 0 }], { duration: 900, easing: "cubic-bezier(.2,.7,.3,1)" })
        .finished.then(() => ring.remove(), () => ring.remove());
    }, 1600);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span ref={ref} className="relative isolate inline-flex overflow-hidden rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground">
      Make a splash
    </span>
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
function SplashButtonThumb() {
  // droplets burst out of the button while the card is hovered
  const drops = [[-38, -30], [-14, -44], [12, -42], [38, -28], [-52, -8], [54, -6], [-26, -52], [28, -50]];
  return (
    <span className="relative inline-flex">
      <span className="relative z-10 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground">Subscribe</span>
      {drops.map(([x, y], i) => (
        <span
          key={i}
          className="absolute top-1/2 left-1/2 size-2 -translate-1/2 rounded-full opacity-0 transition-all duration-700 ease-out group-hover:translate-x-[var(--x)] group-hover:translate-y-[var(--y)] group-hover:opacity-100"
          style={{ ["--x" as string]: `${x}px`, ["--y" as string]: `${y}px`, background: ["#5ef0c8", "#38bdf8", "#2dd4bf"][i % 3] }}
        />
      ))}
    </span>
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
  "ripple-button": { Thumb: RippleButtonThumb },
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
  "splash-button": { Thumb: SplashButtonThumb },
};
