"use client";

import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { PRESETS, decodeTheme, encodeTheme, generateTheme, themeToCss, type ThemeInput } from "@/lib/theme-gen";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/registry/ombak/magnetic-button/magnetic-button";
import { FillButton } from "@/registry/ombak/fill-button/fill-button";
import { RippleButton } from "@/registry/ombak/ripple-button/ripple-button";
import { ShinyButton } from "@/registry/ombak/shiny-button/shiny-button";
import { ArrowButton } from "@/registry/ombak/arrow-button/arrow-button";
import { FloatingInput } from "@/registry/ombak/floating-input/floating-input";
import { PasswordInput } from "@/registry/ombak/password-input/password-input";
import { ToggleSwitch } from "@/registry/ombak/toggle-switch/toggle-switch";
import { SegmentedControl } from "@/registry/ombak/segmented-control/segmented-control";
import { RangeSlider } from "@/registry/ombak/range-slider/range-slider";
import { StarRating } from "@/registry/ombak/star-rating/star-rating";
import { Accordion } from "@/registry/ombak/accordion/accordion";
import { ProgressRing } from "@/registry/ombak/progress-ring/progress-ring";
import { TideProgress } from "@/registry/ombak/tide-progress/tide-progress";
import { StatusDot } from "@/registry/ombak/status-dot/status-dot";
import { Skeleton } from "@/registry/ombak/skeleton/skeleton";
import { PricingTiers } from "@/registry/blocks/pricing-tiers/pricing-tiers";

const DEFAULT = PRESETS[0].input;

function Panel({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[calc(var(--radius)+8px)] border bg-card p-5 text-card-foreground shadow-sm", className)}>
      <p className="mb-4 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">{title}</p>
      {children}
    </div>
  );
}

function Slider({ label, value, min, max, step, onChange, display, track }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; display: string; track?: string }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="font-mono text-xs text-muted-foreground tabular-nums">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full accent-[var(--surf)] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_rgba(0,0,0,.2),0_2px_6px_rgba(0,0,0,.3)]"
        style={{ background: track ?? "var(--muted)" }}
      />
    </label>
  );
}

/** Free-typing hex field: applies the color once it's a valid 3- or 6-digit hex. */
function HexInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);
  return (
    <input
      aria-label="Primary hex"
      value={draft}
      spellCheck={false}
      onChange={(e) => {
        const v = e.target.value.trim();
        setDraft(v);
        const hex = v.startsWith("#") ? v : `#${v}`;
        if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) onChange(hex.toLowerCase());
      }}
      onBlur={() => setDraft(value)}
      className="h-10 min-w-0 flex-1 rounded-xl border bg-background px-3 font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
    />
  );
}

/**
 * Theme builder: pick a preset or a primary color, tint the neutrals, set the radius, and watch real
 * Ombak components and a block restyle live. Copies a :root/.dark CSS block for globals.css; the
 * theme is also kept in the URL for sharing.
 */
export function ThemeBuilder() {
  const [input, setInput] = useState<ThemeInput>(DEFAULT);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [copied, setCopied] = useState<"css" | "link" | null>(null);

  // read a shared theme from the URL once
  useEffect(() => {
    const t = decodeTheme(window.location.search);
    if (t) setInput(t);
  }, []);
  // keep the URL in sync (no history entries)
  useEffect(() => {
    const url = `${window.location.pathname}?${encodeTheme(input)}`;
    window.history.replaceState(null, "", url);
  }, [input]);

  const theme = useMemo(() => generateTheme(input), [input]);
  const css = useMemo(() => themeToCss(theme), [theme]);
  const vars = { ...theme.light, ...(mode === "dark" ? theme.dark : {}) } as CSSProperties;
  const activePreset = PRESETS.find((p) => JSON.stringify(p.input) === JSON.stringify(input))?.name;

  const copy = async (what: "css" | "link") => {
    try {
      await navigator.clipboard.writeText(what === "css" ? css : window.location.href);
      setCopied(what);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard blocked */
    }
  };
  const set = (patch: Partial<ThemeInput>) => setInput((i) => ({ ...i, ...patch }));

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
      {/* ---------- controls ---------- */}
      <aside className="surface h-fit space-y-6 rounded-3xl p-5 lg:sticky lg:top-20">
        <div>
          <p className="mb-3 font-mono text-[10.5px] tracking-[0.16em] text-muted-foreground uppercase">Presets</p>
          <div className="grid grid-cols-4 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setInput(p.input)}
                aria-pressed={activePreset === p.name}
                className={cn(
                  "group flex flex-col items-center gap-1.5 rounded-2xl p-2 text-[11px] text-muted-foreground transition hover:bg-muted/60 hover:text-foreground",
                  activePreset === p.name && "bg-muted text-foreground",
                )}
              >
                <span
                  className="size-8 rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,.15),0_2px_8px_rgba(0,0,0,.25)]"
                  style={{ background: `linear-gradient(135deg, ${p.input.primary} 50%, oklch(0.25 ${p.input.tint * 0.03} ${p.input.neutralHue}) 50%)` }}
                />
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-[10.5px] tracking-[0.16em] text-muted-foreground uppercase">Primary</p>
          <div className="flex items-center gap-3">
            <input
              type="color"
              aria-label="Primary color"
              value={input.primary.length === 4 ? `#${[...input.primary.slice(1)].map((x) => x + x).join("")}` : input.primary}
              onChange={(e) => set({ primary: e.target.value })}
              className="size-10 cursor-pointer rounded-xl border-0 bg-transparent p-0"
            />
            <HexInput value={input.primary} onChange={(v) => set({ primary: v })} />
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-mono text-[10.5px] tracking-[0.16em] text-muted-foreground uppercase">Neutrals</p>
          <Slider
            label="Hue"
            value={input.neutralHue}
            min={0}
            max={360}
            step={1}
            display={`${Math.round(input.neutralHue)}°`}
            onChange={(v) => set({ neutralHue: v })}
            track="linear-gradient(to right, oklch(0.7 0.12 0), oklch(0.7 0.12 60), oklch(0.7 0.12 120), oklch(0.7 0.12 180), oklch(0.7 0.12 240), oklch(0.7 0.12 300), oklch(0.7 0.12 360))"
          />
          <Slider
            label="Tint"
            value={input.tint}
            min={0}
            max={1}
            step={0.05}
            display={`${Math.round(input.tint * 100)}%`}
            onChange={(v) => set({ tint: v })}
            track={`linear-gradient(to right, oklch(0.55 0 0), oklch(0.55 0.08 ${input.neutralHue}))`}
          />
        </div>

        <div className="space-y-3">
          <p className="font-mono text-[10.5px] tracking-[0.16em] text-muted-foreground uppercase">Radius</p>
          <Slider label="Corners" value={input.radius} min={0} max={1.5} step={0.125} display={`${input.radius}rem`} onChange={(v) => set({ radius: v })} />
        </div>

        <div className="space-y-3">
          <p className="font-mono text-[10.5px] tracking-[0.16em] text-muted-foreground uppercase">Preview</p>
          <div className="surface inline-flex rounded-full p-1" role="radiogroup" aria-label="Preview mode">
            {(["light", "dark"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={mode === m}
                onClick={() => setMode(m)}
                className={cn("rounded-full px-4 py-1.5 text-[13px] font-medium capitalize transition", mode === m ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground")}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-hairline pt-5">
          <button type="button" onClick={() => copy("css")} className="inline-flex h-10 flex-1 items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background">
            {copied === "css" ? "Copied ✓" : "Copy CSS"}
          </button>
          <button type="button" onClick={() => copy("link")} className="surface inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium">
            {copied === "link" ? "Copied ✓" : "Share"}
          </button>
          <button type="button" onClick={() => setInput(DEFAULT)} className="inline-flex h-10 items-center rounded-full px-3 text-sm text-muted-foreground hover:text-foreground">
            Reset
          </button>
        </div>
      </aside>

      {/* ---------- live preview ---------- */}
      <div className="min-w-0 space-y-6">
        <div
          data-theme-preview
          style={vars}
          className={cn("overflow-hidden rounded-[28px] bg-background text-foreground shadow-[0_0_0_1px_var(--border)]", mode === "dark" && "dark")}
        >
          <div className="grid items-start gap-4 p-4 md:grid-cols-2 md:p-6 xl:grid-cols-3">
            <Panel title="Sign up">
              <div className="space-y-3">
                <FloatingInput label="Email" type="email" />
                <PasswordInput label="Password" defaultValue="Ombak2026" />
                <ToggleSwitch defaultChecked>Send me product updates</ToggleSwitch>
                <MagneticButton className="mt-1 w-full">Create account</MagneticButton>
              </div>
            </Panel>

            <Panel title="Settings">
              <div className="space-y-5">
                <SegmentedControl label="Billing" options={["Monthly", "Yearly"]} defaultValue="Yearly" className="flex w-full [&>button]:flex-1" />
                <RangeSlider label="Team size" defaultValue={12} min={1} max={50} />
                <div className="flex items-center justify-between">
                  <span className="text-sm">Your rating</span>
                  <StarRating label="Your rating" defaultValue={4} size={20} />
                </div>
              </div>
            </Panel>

            <Panel title="Status" className="md:col-span-2 xl:col-span-1">
              <div className="flex items-center gap-5">
                <ProgressRing value={72} size={72} />
                <div className="flex-1 space-y-3">
                  <TideProgress value={64} label="Upload" />
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <span className="inline-flex items-center gap-2"><StatusDot status="online" size={8} /> Online</span>
                    <span className="inline-flex items-center gap-2"><StatusDot status="away" size={8} /> Away</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <Skeleton lines={2} />
              </div>
            </Panel>

            <Panel title="Buttons" className="md:col-span-2 xl:col-span-2">
              <div className="flex flex-wrap items-center gap-3">
                <RippleButton>Ripple</RippleButton>
                <ShinyButton>Shiny</ShinyButton>
                <FillButton>Fill</FillButton>
                <ArrowButton>Continue</ArrowButton>
              </div>
            </Panel>

            <Panel title="FAQ">
              <Accordion
                defaultOpen={[0]}
                items={[
                  { title: "Can I change the colors?", content: "Yes. Everything reads your theme tokens." },
                  { title: "Light and dark?", content: "Both sets are generated." },
                ]}
              />
            </Panel>
          </div>
          <div className="border-t">
            <PricingTiers className="bg-transparent py-14 md:py-16" />
          </div>
        </div>

        <div className="code-block overflow-hidden rounded-2xl bg-[oklch(0.16_0.012_250)] text-white shadow-[inset_0_1px_0_oklch(1_0_0/5%),0_0_0_1px_oklch(1_0_0/8%)]">
          <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2 font-mono text-xs text-white/55">
            <span>app/globals.css</span>
            <button type="button" onClick={() => copy("css")} className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/60 transition hover:text-white">
              {copied === "css" ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <pre className="max-h-[420px] overflow-auto p-5 font-mono text-[12.5px] leading-[1.7] text-[#d6deeb]">{css}</pre>
        </div>
      </div>
    </div>
  );
}
