import { getItem, getProps, type PropDoc } from "@/lib/registry";

/** One control in the props playground, derived from the component's props table. */
export type Control =
  | { kind: "boolean"; name: string; description: string; value: boolean; initial: boolean | undefined; required: boolean }
  | { kind: "number"; name: string; description: string; value: number; initial: number | undefined; min: number; max: number; step: number; required: boolean }
  | { kind: "select"; name: string; description: string; value: string; initial: string | undefined; options: string[]; required: boolean }
  | { kind: "color"; name: string; description: string; value: string; initial: string | undefined; required: boolean }
  | { kind: "text"; name: string; description: string; value: string; initial: string | undefined; required: boolean };

export type PlaygroundSpec = {
  controls: Control[];
  acceptsChildren: boolean;
  category: string;
};

/**
 * Components whose effect depends on scrolling the page or on the whole window, so a small stage
 * can't show them meaningfully. Their docs keep the regular preview.
 */
const EXCLUDE = new Set([
  "stack-cards",
  "image-reveal",
  "velocity-skew",
  "horizontal-scroll",
  "parallax-image",
  "scroll-words",
  "scroll-spy",
  "floating-nav",
  "custom-cursor",
]);

/** Starting values for required simple props, by prop name. */
const REQUIRED_DEFAULTS: Record<string, string | number> = {
  text: "Make waves",
  label: "Your email",
  value: 2026,
  total: 12,
  current: 1,
  alt: "Demo image",
  src: "/demo/01.svg",
  to: "2027-01-01T00:00:00",
};

/** Better starting values than the prop's own default, for a more telling first render. */
const INITIAL: Record<string, Record<string, string | number | boolean>> = {
  "count-up": { value: 12480 },
  odometer: { value: 2026 },
  "progress-ring": { value: 64 },
  "liquid-loader": { value: 64 },
  "tide-progress": { value: 64 },
  "range-slider": { value: 40 },
  "number-stepper": { value: 2 },
};

/** Hand-tuned slider ranges where the heuristic would be off: [min, max, step]. */
const RANGES: Record<string, Record<string, [number, number, number]>> = {
  "count-up": { value: [0, 100000, 1], decimals: [0, 3, 1], duration: [0.2, 5, 0.1] },
  odometer: { value: [0, 99999, 1] },
  "tide-progress": { value: [0, 100, 1] },
  "progress-ring": { value: [0, 100, 1] },
  "liquid-loader": { value: [0, 100, 1] },
  "range-slider": { value: [0, 100, 1] },
  "number-stepper": { value: [0, 20, 1] },
  steps: { current: [0, 3, 1] },
  pagination: { total: [1, 40, 1] },
  "tilt-card": { max: [0, 30, 1], scale: [1, 1.2, 0.01] },
};

const parseDefault = (raw: string): string | number | boolean | undefined => {
  const v = raw.trim();
  if (!v) return undefined;
  if (v === "true" || v === "false") return v === "true";
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  const q = v.match(/^"(.*)"$/) ?? v.match(/^'(.*)'$/);
  if (q) return q[1];
  return undefined;
};

/** A slider range from the prop name and its default. */
function rangeFor(name: string, d: number): [number, number, number] {
  const n = name.toLowerCase();
  if (/opacity|level|dim/.test(n) && d <= 1) return [0, 1, 0.01];
  if (/intensity/.test(n)) return [0, 2, 0.05];
  if (/speed/.test(n)) return [0, Math.max(3, d * 3), 0.1];
  if (/tilt/.test(n) && d <= 1) return [0.1, 1, 0.01];
  if (/stagger|delay/.test(n) && d < 1) return [0, Math.max(0.3, d * 4), 0.01];
  if (Number.isInteger(d)) {
    const max = d === 0 ? 10 : d < 10 ? Math.max(10, d * 3) : d * 3;
    return [0, max, Math.max(1, Math.round(max / 200))];
  }
  const mag = Math.pow(10, Math.floor(Math.log10(Math.abs(d) || 1)));
  return [0, Number((d * 3).toFixed(3)), mag / 100];
}

const isColor = (value: unknown) => typeof value === "string" && /^#[0-9a-f]{3,8}$/i.test(value);

function toControl(slug: string, p: PropDoc): Control | null {
  if (["className", "style", "children", "as", "id"].includes(p.name)) return null;
  const type = p.type.trim();
  const d = parseDefault(p.default);
  const base = { name: p.name, description: p.description, required: p.required };
  // starting value: hand-picked, else the documented default, else (for required props) a sample
  const start = INITIAL[slug]?.[p.name] ?? d ?? (p.required ? REQUIRED_DEFAULTS[p.name] : undefined);

  if (type === "boolean") return { ...base, kind: "boolean", value: (d as boolean) ?? false, initial: d as boolean | undefined };

  if (type === "number") {
    const value = typeof start === "number" ? start : undefined;
    if (value === undefined) return null;
    const [min, max, step] = RANGES[slug]?.[p.name] ?? rangeFor(p.name, value);
    return { ...base, kind: "number", value, initial: d as number | undefined, min, max, step };
  }

  const literals = type.split("|").map((s) => s.trim());
  if (literals.length > 1 && literals.every((s) => /^"[^"]*"$/.test(s))) {
    const options = literals.map((s) => s.slice(1, -1));
    const value = typeof d === "string" && options.includes(d) ? d : options[0];
    return { ...base, kind: "select", value, initial: d as string | undefined, options };
  }

  if (type === "string" || type === "Date | number | string") {
    const value = start === undefined ? undefined : String(start);
    if (value === undefined) return p.required ? null : { ...base, kind: "text", value: "", initial: undefined };
    if (isColor(value)) return { ...base, kind: "color", value, initial: d as string | undefined };
    return { ...base, kind: "text", value: String(value), initial: d as string | undefined };
  }
  return null;
}

/** Playground spec for a component, or null when it has no playground. */
export function playgroundSpec(slug: string): PlaygroundSpec | null {
  if (EXCLUDE.has(slug)) return null;
  const props = getProps(slug);
  const controls = props.map((p) => toControl(slug, p)).filter((c): c is Control => !!c);
  if (!controls.length) return null;
  return {
    controls,
    acceptsChildren: props.some((p) => p.name === "children"),
    category: getItem(slug)?.categories?.[0] ?? "",
  };
}
