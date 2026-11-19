/**
 * Builds a full shadcn-style token set (light + dark) from a few inputs: a primary color, a tint for
 * the neutrals, and a corner radius. Colors are written in OKLCH, like the rest of the site.
 */

export type ThemeInput = {
  /** Primary color as hex, e.g. "#2dd4bf". */
  primary: string;
  /** Hue (0–360) that tints the neutrals: backgrounds, borders, muted text. */
  neutralHue: number;
  /** How strongly the neutrals are tinted, 0 (pure gray) to 1. */
  tint: number;
  /** Corner radius in rem. */
  radius: number;
};

export type Tokens = Record<string, string>;

export const PRESETS: Array<{ name: string; input: ThemeInput }> = [
  { name: "Ombak", input: { primary: "#2dd4bf", neutralHue: 230, tint: 0.5, radius: 0.875 } },
  { name: "Lagoon", input: { primary: "#0ea5e9", neutralHue: 220, tint: 0.6, radius: 0.75 } },
  { name: "Coral", input: { primary: "#f97362", neutralHue: 25, tint: 0.35, radius: 1 } },
  { name: "Deep Sea", input: { primary: "#6366f1", neutralHue: 265, tint: 0.7, radius: 0.625 } },
  { name: "Kelp", input: { primary: "#16a34a", neutralHue: 150, tint: 0.4, radius: 0.5 } },
  { name: "Sand", input: { primary: "#d97706", neutralHue: 60, tint: 0.45, radius: 1.25 } },
  { name: "Mono", input: { primary: "#27272a", neutralHue: 0, tint: 0, radius: 0.375 } },
];

/* ---------- color math: sRGB hex → OKLCH ---------- */

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

export function hexToOklch(hex: string): { l: number; c: number; h: number } {
  let v = hex.replace("#", "").trim();
  if (v.length === 3) v = [...v].map((x) => x + x).join("");
  const n = parseInt(v.slice(0, 6), 16);
  const r = toLinear(((n >> 16) & 255) / 255);
  const g = toLinear(((n >> 8) & 255) / 255);
  const b = toLinear((n & 255) / 255);
  // linear sRGB → LMS → OKLab (Björn Ottosson)
  const l_ = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m_ = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s_ = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  const c = Math.sqrt(A * A + B * B);
  let h = (Math.atan2(B, A) * 180) / Math.PI;
  if (h < 0) h += 360;
  return { l: L, c, h: c < 0.0001 ? 0 : h };
}

const f = (x: number, d = 3) => Number(x.toFixed(d)).toString();
const ok = (l: number, c: number, h: number, alpha?: number) =>
  `oklch(${f(Math.min(1, Math.max(0, l)))} ${f(Math.max(0, c))} ${f(h, 1)}${alpha === undefined ? "" : ` / ${Math.round(alpha * 100)}%`})`;

/** Light and dark token sets for the given input. */
export function generateTheme(input: ThemeInput): { light: Tokens; dark: Tokens } {
  const p = hexToOklch(input.primary);
  const nh = input.neutralHue;
  const t = Math.max(0, Math.min(1, input.tint)) * 0.03; // max neutral chroma

  // primary: as picked in light mode; lifted in dark mode so it reads on a dark background
  const pLight = { l: p.l, c: p.c, h: p.h };
  const pDark = { l: Math.max(p.l, p.c < 0.03 ? 0.92 : 0.72), c: p.c, h: p.h };
  const onColor = (l: number) => (l > 0.68 ? ok(0.18, Math.min(0.03, p.c * 0.2), p.h) : ok(0.985, 0.005, p.h));

  const light: Tokens = {
    "--radius": `${input.radius}rem`,
    "--background": ok(0.99, t * 0.25, nh),
    "--foreground": ok(0.19, t * 1.1, nh),
    "--card": ok(1, 0, 0),
    "--card-foreground": ok(0.19, t * 1.1, nh),
    "--popover": ok(1, 0, 0),
    "--popover-foreground": ok(0.19, t * 1.1, nh),
    "--primary": ok(pLight.l, pLight.c, pLight.h),
    "--primary-foreground": onColor(pLight.l),
    "--secondary": ok(0.96, t * 0.5, nh),
    "--secondary-foreground": ok(0.24, t, nh),
    "--muted": ok(0.96, t * 0.5, nh),
    "--muted-foreground": ok(0.52, t * 0.8, nh),
    "--accent": ok(0.94, Math.min(p.c, 0.12) * 0.45, p.h),
    "--accent-foreground": ok(0.24, Math.min(p.c, 0.12) * 0.6, p.h),
    "--border": ok(0.19, t, nh, 0.09),
    "--input": ok(0.19, t, nh, 0.12),
    "--ring": ok(pLight.l, pLight.c, pLight.h, 0.6),
  };

  const dark: Tokens = {
    "--background": ok(0.145, t * 0.8, nh),
    "--foreground": ok(0.94, t * 0.3, nh),
    "--card": ok(0.175, t * 0.9, nh),
    "--card-foreground": ok(0.94, t * 0.3, nh),
    "--popover": ok(0.185, t * 0.9, nh),
    "--popover-foreground": ok(0.94, t * 0.3, nh),
    "--primary": ok(pDark.l, pDark.c, pDark.h),
    "--primary-foreground": onColor(pDark.l),
    "--secondary": ok(0.22, t * 0.9, nh),
    "--secondary-foreground": ok(0.94, t * 0.3, nh),
    "--muted": ok(0.21, t * 0.85, nh),
    "--muted-foreground": ok(0.68, t * 0.6, nh),
    "--accent": ok(0.27, Math.min(p.c, 0.12) * 0.5, p.h),
    "--accent-foreground": ok(0.94, t * 0.3, nh),
    "--border": ok(1, 0, 0, 0.08),
    "--input": ok(1, 0, 0, 0.12),
    "--ring": ok(pDark.l, pDark.c, pDark.h, 0.55),
  };

  return { light, dark };
}

/** CSS ready to paste into globals.css. */
export function themeToCss({ light, dark }: { light: Tokens; dark: Tokens }) {
  const block = (sel: string, t: Tokens) => `${sel} {\n${Object.entries(t).map(([k, v]) => `  ${k}: ${v};`).join("\n")}\n}`;
  return `${block(":root", light)}\n\n${block(".dark", dark)}\n`;
}

/** Compact URL form of a theme, for share links. */
export const encodeTheme = (t: ThemeInput) =>
  new URLSearchParams({ p: t.primary.replace("#", ""), h: String(Math.round(t.neutralHue)), t: String(t.tint), r: String(t.radius) }).toString();

export function decodeTheme(search: string): ThemeInput | null {
  const q = new URLSearchParams(search);
  const p = q.get("p");
  if (!p || !/^[0-9a-f]{3}([0-9a-f]{3})?$/i.test(p)) return null;
  const num = (k: string, min: number, max: number, d: number) => {
    const v = Number(q.get(k));
    return Number.isFinite(v) && q.get(k) !== null ? Math.min(max, Math.max(min, v)) : d;
  };
  return { primary: `#${p}`, neutralHue: num("h", 0, 360, 230), tint: num("t", 0, 1, 0.5), radius: num("r", 0, 2, 0.875) };
}
