"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ExportItem, GenerateEvent } from "@/lib/generate/events";
import type { Plan } from "@/lib/generate/plan";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

const EXAMPLES = [
  "Landing page untuk kedai kopi specialty di Bandung, nuansa hangat dan earthy",
  "A launch page for an AI note-taking app for students, dark and electric",
  "Portfolio for a freelance motion designer, bold typography, playful",
  "Waitlist page for a surf trip booking app in Bali",
];

const VIEWPORTS = { desktop: "100%", tablet: "820px", mobile: "390px" } as const;
type Viewport = keyof typeof VIEWPORTS;

const STORAGE_KEY = "ombak:generate:last";

type Saved = { prompt: string; plan: Plan | null; exports: ExportItem[]; html: string };

/** The model sometimes wraps the page in markdown fences; keep only the document. */
function cleanHtml(raw: string) {
  const start = raw.search(/<!doctype html|<html/i);
  let html = start >= 0 ? raw.slice(start) : raw;
  const end = html.toLowerCase().lastIndexOf("</html>");
  if (end >= 0) html = html.slice(0, end + "</html>".length);
  return html.replace(/```\s*$/, "").trim();
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "ombak-site";
}

export function Generator() {
  const [prompt, setPrompt] = useState("");
  const [plan, setPlan] = useState<Plan | null>(null);
  const [exports, setExports] = useState<ExportItem[]>([]);
  const [raw, setRaw] = useState("");
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<"preview" | "code" | "export">("preview");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [meta, setMeta] = useState<{ costUsd: number; remaining: number } | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const rawRef = useRef("");

  // Restore the last result after a reload.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as Saved | null;
      if (saved?.html) {
        setPrompt(saved.prompt);
        setPlan(saved.plan);
        setExports(saved.exports);
        setRaw(saved.html);
        setPreview(saved.html);
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  // While streaming, refresh the preview every few seconds so the page visibly builds up.
  useEffect(() => {
    if (!busy) return;
    const t = setInterval(() => setPreview(cleanHtml(rawRef.current)), 3000);
    return () => clearInterval(t);
  }, [busy]);

  const html = useMemo(() => cleanHtml(raw), [raw]);
  const done = useMemo(() => {
    const ids = new Set<string>();
    for (const m of raw.matchAll(/data-section="([^"]+)"/g)) ids.add(m[1]);
    return ids;
  }, [raw]);

  async function generate(text = prompt) {
    const value = text.trim();
    if (value.length < 8 || busy) return;
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setBusy(true);
    setError(null);
    setPlan(null);
    setExports([]);
    setRaw("");
    rawRef.current = "";
    setPreview("");
    setMeta(null);
    setStatus("Starting…");
    setTab("preview");

    let finalPlan: Plan | null = null;
    let finalExports: ExportItem[] = [];
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt: value }),
        signal: ac.signal,
      });
      if (!res.ok || !res.body) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? `Request failed (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { value: chunk, done: finished } = await reader.read();
        if (finished) break;
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line) as GenerateEvent;
          switch (event.type) {
            case "status":
              setStatus(event.message);
              break;
            case "plan":
              finalPlan = event.plan;
              finalExports = event.exports;
              setPlan(event.plan);
              setExports(event.exports);
              break;
            case "html":
              rawRef.current += event.delta;
              setRaw(rawRef.current);
              break;
            case "done":
              setMeta({ costUsd: event.costUsd, remaining: event.remaining });
              break;
            case "error":
              throw new Error(event.message);
          }
        }
      }

      const page = cleanHtml(rawRef.current);
      setPreview(page);
      setStatus(null);
      try {
        const saved: Saved = { prompt: value, plan: finalPlan, exports: finalExports, html: page };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      } catch {
        /* storage full or blocked */
      }
    } catch (err) {
      if (ac.signal.aborted) {
        setStatus("Stopped.");
        setPreview(cleanHtml(rawRef.current));
      } else {
        setError(err instanceof Error ? err.message : "Something went wrong.");
        setStatus(null);
      }
    } finally {
      setBusy(false);
    }
  }

  function download() {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slugify(plan?.siteName ?? "ombak-site")}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const hasPage = html.length > 0;

  return (
    <div className="grid gap-4 lg:h-[calc(100dvh-3.5rem-2rem)] lg:grid-cols-[360px_minmax(0,1fr)]">
      {/* Left: prompt and plan */}
      <aside className="surface flex min-h-0 flex-col gap-5 rounded-3xl p-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            generate();
          }}
          className="space-y-3"
        >
          <label htmlFor="gen-prompt" className="eyebrow">
            Describe your site
          </label>
          <textarea
            id="gen-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) generate();
            }}
            rows={5}
            maxLength={1200}
            placeholder="A landing page for a specialty coffee shop in Bandung, warm and earthy…"
            className="w-full resize-none rounded-2xl border bg-background px-4 py-3 text-sm leading-relaxed outline-none placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring/50"
          />
          <div className="flex gap-2">
            {busy ? (
              <button type="button" onClick={() => abortRef.current?.abort()} className="btn-ghost h-10 flex-1">
                Stop
              </button>
            ) : (
              <button type="submit" disabled={prompt.trim().length < 8} className="btn-primary h-10 flex-1 disabled:opacity-50">
                Generate
              </button>
            )}
          </div>
        </form>

        {!plan && !busy && (
          <div className="space-y-2">
            <p className="font-mono text-[10.5px] tracking-[0.16em] text-muted-foreground uppercase">Try</p>
            <ul className="space-y-1.5">
              {EXAMPLES.map((ex) => (
                <li key={ex}>
                  <button
                    type="button"
                    onClick={() => {
                      setPrompt(ex);
                      generate(ex);
                    }}
                    className="w-full rounded-xl border border-hairline px-3 py-2 text-left text-[13px] leading-snug text-muted-foreground transition hover:bg-muted/50 hover:text-foreground"
                  >
                    {ex}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {plan && (
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto">
            <div>
              <p className="font-display text-lg font-semibold tracking-tight">{plan.siteName}</p>
              <p className="text-[13px] text-muted-foreground">{plan.tagline}</p>
              <div className="mt-3 flex gap-1.5">
                {Object.entries(plan.palette).map(([k, c]) => (
                  <span key={k} title={`${k} ${c}`} className="size-5 rounded-full ring-1 ring-border" style={{ background: c }} />
                ))}
              </div>
            </div>
            <ol className="space-y-1.5">
              {plan.sections.map((s) => {
                const isDone = done.has(s.id);
                return (
                  <li key={s.id} className="flex items-start gap-2.5 rounded-xl px-2 py-1.5 text-[13px]">
                    <span
                      className={cn(
                        "mt-1 size-2 shrink-0 rounded-full",
                        isDone ? "bg-surf shadow-[0_0_8px_var(--surf)]" : busy ? "animate-pulse bg-muted-foreground/40" : "bg-muted-foreground/30",
                      )}
                    />
                    <span className="min-w-0">
                      <span className="font-medium capitalize">{s.kind}</span>
                      {s.effects.length > 0 && (
                        <span className="ml-1.5 font-mono text-[11px] text-surf">{s.effects.join(" · ")}</span>
                      )}
                      <span className="block text-muted-foreground">{s.brief}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        )}

        {(status || error || meta) && (
          <div className="mt-auto space-y-1 text-[12px]">
            {status && <p className="text-muted-foreground">{status}</p>}
            {error && <p className="text-red-400">{error}</p>}
            {meta && (
              <p className="font-mono text-muted-foreground">
                ~${meta.costUsd.toFixed(4)} · {meta.remaining} free left today
              </p>
            )}
          </div>
        )}
      </aside>

      {/* Right: preview, code, export */}
      <section className="surface flex min-h-[70dvh] min-w-0 flex-col overflow-hidden rounded-3xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline p-2">
          <div className="surface inline-flex rounded-full p-1" role="tablist">
            {(["preview", "code", "export"] as const).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-full px-3 py-1 text-[13px] font-medium capitalize transition",
                  tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {tab === "preview" &&
              (Object.keys(VIEWPORTS) as Viewport[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setViewport(v)}
                  aria-pressed={viewport === v}
                  className={cn(
                    "hidden rounded-full px-2.5 py-1 text-[12px] capitalize transition sm:inline-block",
                    viewport === v ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {v}
                </button>
              ))}
            <button
              onClick={download}
              disabled={!hasPage || busy}
              className="ml-1 rounded-full bg-foreground px-3 py-1 text-[12px] font-medium text-background transition disabled:opacity-40"
            >
              Download .html
            </button>
          </div>
        </div>

        <div className="relative min-h-0 flex-1 bg-muted/30">
          {tab === "preview" &&
            (preview ? (
              <div className="flex h-full justify-center overflow-auto">
                <iframe
                  title="Generated site preview"
                  srcDoc={preview}
                  // Scripts run, but the page gets an opaque origin: no access to this site.
                  sandbox="allow-scripts"
                  className="h-full min-h-[70dvh] border-0 bg-white transition-[width] duration-300"
                  style={{ width: VIEWPORTS[viewport] }}
                />
              </div>
            ) : (
              <EmptyState busy={busy} />
            ))}

          {tab === "code" && (
            <div className="relative h-full">
              {hasPage && <CopyButton value={html} className="absolute top-3 right-3 z-10" />}
              <pre className="h-full overflow-auto p-5 font-mono text-[12px] leading-[1.7] whitespace-pre-wrap text-muted-foreground">
                {raw || "The HTML appears here as it's written."}
              </pre>
            </div>
          )}

          {tab === "export" && (
            <div className="h-full space-y-4 overflow-auto p-5 text-sm">
              <p className="max-w-prose text-muted-foreground">
                The page is plain HTML, ready for any static host. To rebuild it in Next.js with the real Ombak components, install
                the blocks and components it was planned from:
              </p>
              {exports.length ? (
                <ul className="space-y-2">
                  {exports.map((e) => (
                    <li key={e.name} className="rounded-2xl border border-hairline bg-background p-3">
                      <p className="mb-1.5 text-[13px] font-medium">{e.title}</p>
                      <div className="flex items-center gap-2">
                        <code className="min-w-0 flex-1 truncate font-mono text-[12px] text-muted-foreground">{e.command}</code>
                        <CopyButton value={e.command} />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">Generate a page first.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function EmptyState({ busy }: { busy: boolean }) {
  return (
    <div className="flex h-full min-h-[60dvh] flex-col items-center justify-center gap-3 p-8 text-center">
      <span className={cn("size-3 rounded-full bg-surf shadow-[0_0_16px_var(--surf)]", busy && "animate-ping")} />
      <p className="max-w-sm text-sm text-muted-foreground">
        {busy ? "Planning the page and picking Ombak effects…" : "Describe a site and Ombak builds a motion-rich static page from its components."}
      </p>
    </div>
  );
}
