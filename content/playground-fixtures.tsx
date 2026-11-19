/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import { toast } from "@/registry/ombak/toast-stack/toast-stack";

/**
 * Sample values for the props playground: required props the controls can't express (lists,
 * elements) and children. Anything not listed here falls back to the category defaults below.
 */
export type Fixture = {
  /** Props passed as-is, shown in the snippet as `name={name}`. */
  props?: Record<string, unknown>;
  /** Children for the component (null means none). */
  children?: ReactNode;
  /** Extra classes on the component, e.g. a size for backgrounds. */
  className?: string;
  /** Rendered next to the component, e.g. buttons that trigger it. */
  extra?: ReactNode;
};

const Face = ({ bg, children }: { bg: string; children: ReactNode }) => (
  <div className="flex size-full flex-col justify-between rounded-2xl p-5 text-[#06121f]" style={{ background: bg }}>
    {children}
  </div>
);

const Card = ({ title = "Ombak UI", body = "Motion components for React." }: { title?: string; body?: string }) => (
  <div className="w-64 rounded-2xl p-6">
    <p className="text-lg font-semibold tracking-tight">{title}</p>
    <p className="mt-1 text-sm text-muted-foreground">{body}</p>
  </div>
);

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);
const ICONS = {
  home: "M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-3.5-3.5",
  heart: "M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
};

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

/** Defaults by category, used when a component has no fixture of its own. */
export const categoryFixture: Record<string, Fixture> = {
  background: {
    className: "flex h-[380px] w-full items-center justify-center rounded-xl",
    children: <p className="pointer-events-none font-display text-4xl font-bold tracking-tight text-white md:text-5xl">Ride the wave.</p>,
  },
  text: { children: "Make waves", className: "font-display text-5xl font-bold tracking-tight" },
  buttons: { children: "Get started" },
  cards: { children: <Card /> },
  interaction: { children: <Card /> },
  scroll: { children: null },
  loaders: { children: null },
  navigation: { children: null },
  forms: { children: null },
  overlays: { children: null },
};

/** Per-component fixtures. */
export const fixtures: Record<string, Fixture> = {
  "wave-background": { className: "flex h-[380px] w-full items-center justify-center rounded-xl bg-[#06121f]" },
  "ripple-grid": { className: "flex h-[380px] w-full items-center justify-center rounded-xl bg-[#06121f]" },
  bubbles: { className: "flex h-[380px] w-full items-center justify-center rounded-xl bg-gradient-to-b from-[#0b3b66] to-[#06121f]" },
  "current-lines": { className: "flex h-[380px] w-full items-center justify-center rounded-xl bg-[#06121f]" },
  aurora: { className: "flex h-[380px] w-full items-center justify-center rounded-xl bg-[#050c16]" },
  "light-rays": { className: "flex h-[380px] w-full items-center justify-center rounded-xl bg-gradient-to-b from-[#0b4a6e] to-[#031421]" },
  "rain-ripples": { className: "flex h-[380px] w-full items-center justify-center rounded-xl bg-gradient-to-b from-[#0c2533] to-[#071822]" },
  "dot-swell": { className: "flex h-[380px] w-full items-start justify-center rounded-xl bg-[#050c16] pt-12" },

  // text
  typewriter: { props: { words: ["websites", "products", "stories"] } },
  "morphing-text": { props: { words: ["Ombak", "Waves", "Motion"] } },
  "rotating-words": { props: { words: ["move.", "convert.", "feel alive."] } },
  "wave-underline": { children: "Hover this link", className: "text-xl", props: { href: "#" } },
  "count-up": { className: "font-display text-6xl font-bold tracking-tight tabular-nums" },
  odometer: { className: "font-display text-6xl font-bold tracking-tight" },
  "orbit-text": { className: "", children: <span className="text-2xl">✦</span> },
  "curved-marquee": { className: "w-full" },

  // scroll
  marquee: {
    className: "w-full",
    children: ["Smooth", "Kinetic", "Tactile", "Alive", "Fluid"].map((w) => (
      <span key={w} className="flex items-center gap-12 font-display text-4xl font-bold tracking-tight">
        {w}
        <span className="text-primary">✦</span>
      </span>
    )),
  },

  // buttons
  "border-beam": { children: <div className="px-8 py-6 text-sm font-medium">Border beam</div> },
  "copy-button": { props: { value: "npx shadcn@latest add ombak" } },

  // cards
  "flip-card": {
    props: {
      front: (
        <Face bg="#0e7fbf">
          <span className="font-mono text-xs text-white/80">Hover me</span>
          <span className="font-display text-4xl font-bold text-white">Front</span>
        </Face>
      ),
      back: (
        <Face bg="#5ef0c8">
          <span className="font-mono text-xs">The other side</span>
          <span className="text-sm">Anything can live back here.</span>
        </Face>
      ),
    },
  },
  "expand-card": {
    className: "w-72",
    props: {
      label: "Coral Coffee",
      expanded: (
        <div>
          <img src="/demo/06.svg" alt="" className="aspect-video w-full rounded-xl object-cover" />
          <p className="mt-4 text-sm text-muted-foreground">A full brand identity for a small coffee roaster by the sea.</p>
        </div>
      ),
    },
    children: (
      <div>
        <img src="/demo/06.svg" alt="" className="aspect-video w-full rounded-xl object-cover" />
        <p className="mt-3 font-semibold">Coral Coffee</p>
        <p className="text-sm text-muted-foreground">Brand identity</p>
      </div>
    ),
  },
  "book-3d": {
    props: {
      cover: (
        <div className="flex size-full flex-col justify-between p-5 text-white">
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-80">Free guide</span>
          <span className="font-display text-2xl leading-tight font-bold">The Motion Handbook</span>
        </div>
      ),
    },
  },
  "caption-card": { className: "w-72", props: { src: "/demo/03.svg", alt: "", title: "Field Notes" } },
  "scatter-photos": {
    props: {
      photos: [1, 2, 3, 4, 5].map((n) => ({ src: `/demo/0${n}.svg`, caption: `Photo ${n}`, alt: "" })),
    },
  },
  "depth-grid": {
    className: "grid w-full max-w-xl grid-cols-3 gap-3",
    children: [1, 2, 3, 4, 5, 6].map((n) => <img key={n} src={`/demo/0${n}.svg`} alt="" className="aspect-square w-full rounded-xl object-cover" />),
  },
  "fan-cards": {
    className: "h-64",
    children: ["#2dd4bf", "#38bdf8", "#818cf8", "#f97362", "#f4f1ea"].map((c, i) => (
      <div key={c} className="flex size-full flex-col justify-between rounded-2xl border border-black/10 p-4 text-[#06121f] shadow-xl" style={{ background: c }}>
        <span className="font-mono text-xs">0{i + 1}</span>
        <span className="font-display text-2xl font-bold">Wave {i + 1}</span>
      </div>
    )),
  },
  "depth-card": {
    className: "h-72 w-64 border-0 bg-[#06121f] text-white",
    children: (
      <>
        <img src="/demo/02.svg" alt="" data-depth="0.2" className="absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] object-cover opacity-80" />
        <p data-depth="1" className="absolute inset-x-5 bottom-5 font-display text-3xl font-bold">Depth</p>
      </>
    ),
  },
  "wave-card": { className: "h-56 w-64", children: <Card title="Starter" body="Hover to raise the tide." /> },
  "scratch-card": {
    className: "h-48 w-72",
    children: <div className="grid size-full place-items-center bg-[#5ef0c8] font-display text-3xl font-bold text-[#06121f]">You won 🌊</div>,
  },

  // loaders
  steps: {
    props: {
      steps: [{ title: "Account" }, { title: "Profile" }, { title: "Plan" }, { title: "Done" }],
    },
  },

  // navigation
  "animated-tabs": {
    props: {
      tabs: [
        { label: "Overview", content: <p className="text-sm text-muted-foreground">Everything at a glance.</p> },
        { label: "Activity", content: <p className="text-sm text-muted-foreground">What happened lately.</p> },
        { label: "Settings", content: <p className="text-sm text-muted-foreground">Make it yours.</p> },
      ],
    },
  },
  "morph-menu": { props: { links: LINKS } },
  "hover-nav": { props: { links: LINKS } },
  "segmented-control": { props: { options: ["Daily", "Weekly", "Monthly"], label: "Range" } },
  "bottom-bar": {
    className: "w-80",
    props: {
      items: [
        { label: "Home", icon: <Icon d={ICONS.home} /> },
        { label: "Search", icon: <Icon d={ICONS.search} /> },
        { label: "Saved", icon: <Icon d={ICONS.heart} /> },
        { label: "Profile", icon: <Icon d={ICONS.user} /> },
      ],
    },
  },
  accordion: {
    className: "w-full max-w-md",
    props: {
      items: [
        { title: "Is it free?", content: "Yes, MIT licensed." },
        { title: "Do I need shadcn?", content: "Only the CLI, to install." },
        { title: "Reduced motion?", content: "Respected everywhere." },
      ],
    },
  },
  "dropdown-menu": {
    props: {
      trigger: "Options",
      items: [
        { label: "Edit", shortcut: "⌘E" },
        { label: "Duplicate", shortcut: "⌘D" },
        { label: "Archive" },
        { label: "Delete" },
      ],
    },
  },

  // interaction
  "hover-preview": {
    className: "w-full max-w-lg",
    props: {
      items: [
        { title: "Selat Coffee", image: "/demo/01.svg", meta: "2026" },
        { title: "Arus Bank", image: "/demo/02.svg", meta: "2026" },
        { title: "Teluk Festival", image: "/demo/03.svg", meta: "2025" },
      ],
    },
  },
  "magnify-dock": {
    props: {
      items: Object.entries(ICONS).map(([label, d]) => ({ label, icon: <Icon d={d} /> })),
    },
  },
  "torch-reveal": {
    className: "h-[320px] w-full max-w-xl rounded-xl",
    props: {
      reveal: (
        <div className="relative size-full">
          <img src="/demo/04.svg" alt="" className="size-full object-cover" />
        </div>
      ),
    },
    children: (
      <div className="grid size-full place-items-center bg-[#020a12] font-display text-3xl font-bold text-white/90">It&apos;s dark down here.</div>
    ),
  },
  "swipe-stack": {
    className: "w-64",
    children: [
      ["#2dd4bf", "Reef"],
      ["#38bdf8", "Swell"],
      ["#f97362", "Coral"],
    ].map(([bg, t]) => (
      <div key={t} className="flex h-72 items-end rounded-2xl p-6 text-[#06121f] shadow-xl" style={{ background: bg }}>
        <span className="font-display text-4xl font-bold tracking-tight">{t}</span>
      </div>
    )),
  },
  "glow-card": { className: "w-72" },
  "tilt-card": { className: "rounded-2xl border bg-card" },

  // forms
  "range-slider": { className: "w-72", props: { label: "Volume" } },
  "tag-input": { className: "w-80", props: { label: "Skills" } },
  "star-rating": { props: { label: "Rating" } },
  "number-stepper": { props: { label: "Quantity" } },
  "floating-input": { className: "w-72" },
  "otp-input": {},
  "password-input": { className: "w-72" },
  "file-dropzone": { className: "w-full max-w-md" },

  // overlays
  "toast-stack": {
    extra: <ToastButtons />,
  },
  "ripple-dialog": {
    props: {
      title: "Delete this project?",
      description: "This can't be undone.",
      trigger: <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">Open dialog</button>,
    },
  },
  "drift-tooltip": {
    props: { content: "Drifting along" },
    children: <button className="rounded-full border bg-background px-10 py-2.5 text-sm font-medium">Hover along me</button>,
  },
  "tide-drawer": {
    props: {
      title: "Share this page",
      description: "Drag the handle down to close.",
      trigger: <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">Open drawer</button>,
    },
  },
  "bloom-popover": {
    props: { trigger: "Open popover", label: "Example" },
    children: <p className="text-sm">Blooms out of its trigger.</p>,
  },
};

function ToastButtons() {
  return (
    <button
      type="button"
      onClick={() => toast("Changes saved", { description: "Your profile is up to date." })}
      className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
    >
      Show toast
    </button>
  );
}
