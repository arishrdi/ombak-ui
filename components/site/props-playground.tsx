"use client";

import { useEffect, useMemo, useState } from "react";
import { playgroundMap } from "./playground-map";
import { categoryFixture, fixtures } from "@/content/playground-fixtures";
import type { Control, PlaygroundSpec } from "@/lib/playground";
import { cn } from "@/lib/utils";

type Values = Record<string, string | number | boolean>;

/** Control starting values; a fixture's simple value for the same prop wins (e.g. a better label). */
const startValues = (controls: Control[], fixtureProps: Record<string, unknown> = {}): Control[] =>
  controls.map((c) => {
    const f = fixtureProps[c.name];
    return typeof f === typeof c.value ? ({ ...c, value: f } as Control) : c;
  });
const initialValues = (controls: Control[]): Values => Object.fromEntries(controls.map((c) => [c.name, c.value]));

/** Formats a prop for the JSX snippet. */
function attr(name: string, v: unknown) {
  if (typeof v === "boolean") return v ? name : `${name}={false}`;
  if (typeof v === "number") return `${name}={${Number(v.toFixed(4))}}`;
  if (typeof v === "string") return `${name}=${JSON.stringify(v)}`;
  return `${name}={${name}}`;
}

/**
 * Live props editor: controls generated from the props table on the left, the component re-rendered
 * with those values on the right, and the matching JSX underneath. Values the controls can't express
 * (lists, elements) come from content/playground-fixtures.tsx.
 */
export function PropsPlayground({ slug, spec: rawSpec, stage }: { slug: string; spec: PlaygroundSpec; stage?: string }) {
  const entry = playgroundMap[slug];
  const fixture = { ...categoryFixture[rawSpec.category], ...fixtures[slug] };
  const spec = { ...rawSpec, controls: startValues(rawSpec.controls, fixture.props) };
  const [values, setValues] = useState<Values>(() => initialValues(spec.controls));
  const [mountKey, setMountKey] = useState(0);
  const [copied, setCopied] = useState(false);

  // remount shortly after the last change, for effects that read their props once on mount
  const signature = JSON.stringify(values);
  useEffect(() => {
    const id = window.setTimeout(() => setMountKey((k) => k + 1), 350);
    return () => window.clearTimeout(id);
  }, [signature]);

  // the snippet lists required props and anything changed from its default
  const changed = spec.controls.filter((c) => c.required || values[c.name] !== c.value);
  const isDirty = spec.controls.some((c) => values[c.name] !== c.value);

  const live: Record<string, unknown> = useMemo(() => {
    const out: Record<string, unknown> = { ...fixture.props };
    for (const c of spec.controls) {
      const v = values[c.name];
      // skip empty optional text so the component's own default applies
      if (c.kind === "text" && v === "" && !c.required) continue;
      out[c.name] = v;
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, slug]);

  const exportName = entry?.exportName ?? "Component";
  const children = spec.acceptsChildren ? fixture.children : undefined;

  const code = useMemo(() => {
    const parts = [
      ...Object.keys(fixture.props ?? {}).filter((k) => !spec.controls.some((c) => c.name === k)).map((k) => attr(k, fixture.props![k])),
      ...changed.filter((c) => !(c.kind === "text" && values[c.name] === "" && !c.required)).map((c) => attr(c.name, values[c.name])),
    ];
    const open = parts.length > 2 ? `<${exportName}\n${parts.map((p) => `  ${p}`).join("\n")}\n` : `<${exportName}${parts.length ? " " + parts.join(" ") : ""}`;
    const kids = children === undefined || children === null ? "" : typeof children === "string" ? children : "{/* … */}";
    return kids ? `${open}>${parts.length > 2 ? "\n  " : ""}${kids}${parts.length > 2 ? "\n" : ""}</${exportName}>` : `${open}${parts.length > 2 ? "" : " "}/>`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, slug]);

  const set = (name: string, v: string | number | boolean) => setValues((s) => ({ ...s, [name]: v }));

  if (!entry) return null;
  const { Component } = entry;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="min-w-0 space-y-4">
        <div data-playground-stage className={cn("surface relative flex min-h-[420px] w-full items-center justify-center overflow-hidden rounded-3xl p-6 md:p-10", stage)}>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
          />
          <div key={mountKey} className="relative flex w-full flex-col items-center justify-center gap-6">
            <Component {...live} className={fixture.className}>
              {children}
            </Component>
            {fixture.extra}
          </div>
        </div>

        <div className="code-block relative overflow-hidden rounded-2xl bg-[oklch(0.16_0.012_250)] text-white shadow-[inset_0_1px_0_oklch(1_0_0/5%),0_0_0_1px_oklch(1_0_0/8%)]">
          <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2 font-mono text-xs text-white/55">
            <span>Your settings</span>
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(code);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                } catch {
                  /* clipboard blocked */
                }
              }}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/60 transition hover:text-white"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.7] text-[#d6deeb]">{code}</pre>
        </div>
      </div>

      <aside className="surface h-fit rounded-3xl p-1.5 lg:sticky lg:top-20">
        <div className="flex items-center justify-between px-3.5 pt-2.5 pb-2">
          <p className="font-mono text-[10.5px] tracking-[0.16em] text-muted-foreground uppercase">Props</p>
          <button
            type="button"
            disabled={!isDirty}
            onClick={() => setValues(initialValues(spec.controls))}
            className="rounded-full px-2.5 py-1 text-xs font-medium text-muted-foreground transition enabled:hover:bg-muted enabled:hover:text-foreground disabled:opacity-40"
          >
            Reset
          </button>
        </div>
        <div className="max-h-[560px] space-y-1 overflow-y-auto">
          {spec.controls.map((c) => (
            <Field key={c.name} control={c} value={values[c.name]} onChange={(v) => set(c.name, v)} />
          ))}
        </div>
      </aside>
    </div>
  );
}

function Field({ control: c, value, onChange }: { control: Control; value: string | number | boolean; onChange: (v: string | number | boolean) => void }) {
  const id = `pg-${c.name}`;
  return (
    <div className="rounded-2xl px-3.5 py-3 transition-colors hover:bg-muted/40">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="font-mono text-[12.5px] text-foreground">
          {c.name}
          {c.required && <span className="ml-0.5 text-coral">*</span>}
        </label>
        {c.kind === "number" && <span className="font-mono text-[11px] text-muted-foreground tabular-nums">{Number((value as number).toFixed(3))}</span>}
        {c.kind === "boolean" && (
          <button
            id={id}
            type="button"
            role="switch"
            aria-checked={value as boolean}
            onClick={() => onChange(!value)}
            className={cn("relative h-5 w-9 shrink-0 rounded-full transition-colors", value ? "bg-primary" : "bg-muted-foreground/30")}
          >
            <span className={cn("absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow transition-transform", value && "translate-x-4")} />
          </button>
        )}
        {c.kind === "color" && (
          <span className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-muted-foreground">{String(value)}</span>
            <input
              id={id}
              type="color"
              value={String(value).length === 4 ? `#${[...String(value).slice(1)].map((x) => x + x).join("")}` : String(value).slice(0, 7)}
              onChange={(e) => onChange(e.target.value)}
              className="size-6 cursor-pointer rounded-md border-0 bg-transparent p-0"
            />
          </span>
        )}
      </div>
      {c.kind === "number" && (
        <input
          id={id}
          type="range"
          min={c.min}
          max={c.max}
          step={c.step}
          value={value as number}
          onChange={(e) => onChange(Number(e.target.value))}
          className="mt-2.5 w-full accent-[var(--primary)]"
        />
      )}
      {c.kind === "select" && (
        <div className="mt-2.5 flex flex-wrap gap-1" role="radiogroup" aria-label={c.name}>
          {c.options.map((o) => (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={value === o}
              onClick={() => onChange(o)}
              className={cn(
                "rounded-full px-2.5 py-1 font-mono text-[11px] transition",
                value === o ? "bg-foreground text-background" : "bg-muted/60 text-muted-foreground hover:text-foreground",
              )}
            >
              {o}
            </button>
          ))}
        </div>
      )}
      {c.kind === "text" && (
        <input
          id={id}
          type="text"
          value={String(value)}
          placeholder="default"
          onChange={(e) => onChange(e.target.value)}
          className="mt-2.5 h-9 w-full rounded-xl border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        />
      )}
      {c.description && <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{c.description}</p>}
    </div>
  );
}
