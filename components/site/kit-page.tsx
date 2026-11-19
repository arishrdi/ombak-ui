"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { kit, useKit } from "@/lib/kit-store";
import { cn } from "@/lib/utils";

export type KitCatalogItem = {
  name: string;
  title: string;
  kind: "component" | "block" | "template";
  /** Category label for components and blocks. */
  group: string;
  href: string;
  /** Direct registry dependencies that are Ombak items. */
  deps: string[];
};

const KIND_LABEL = { template: "Templates", block: "Blocks", component: "Components" } as const;

function CopyLine({ value, label, wrap = false }: { value: string; label: string; wrap?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="code-block overflow-hidden rounded-2xl bg-[oklch(0.16_0.012_250)] text-white shadow-[inset_0_1px_0_oklch(1_0_0/5%),0_0_0_1px_oklch(1_0_0/8%)]">
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2 font-mono text-xs text-white/55">
        <span>{label}</span>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(value);
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
      <pre className={cn("overflow-x-auto p-5 font-mono text-[13px] leading-[1.8] text-[#d6deeb]", wrap ? "whitespace-pre-wrap" : "whitespace-pre")}>{value}</pre>
    </div>
  );
}

/**
 * The kit page: everything the visitor picked, grouped by kind, with one install command.
 * Items already pulled in by another pick (a block inside a chosen template, say) are marked and
 * left out of the command. A share link encodes the kit in the URL.
 */
export function KitPage({ catalog, registryBase }: { catalog: KitCatalogItem[]; registryBase: string }) {
  const names = useKit();
  const [shared, setShared] = useState<string[] | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const byName = useMemo(() => new Map(catalog.map((c) => [c.name, c])), [catalog]);

  // a kit shared through ?items=a,b,c
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("items");
    if (!raw) return;
    const list = raw.split(",").map((s) => s.trim()).filter((n) => byName.has(n));
    if (list.length) setShared([...new Set(list)]);
  }, [byName]);

  const selected = names.map((n) => byName.get(n)).filter((x): x is KitCatalogItem => !!x);

  // everything each pick brings along, transitively
  const closure = useMemo(() => {
    const memo = new Map<string, Set<string>>();
    // the registry graph has no cycles, so plain memoized recursion is enough
    const walk = (n: string): Set<string> => {
      if (memo.has(n)) return memo.get(n)!;
      const out = new Set<string>();
      for (const d of byName.get(n)?.deps ?? []) {
        out.add(d);
        walk(d).forEach((x) => out.add(x));
      }
      memo.set(n, out);
      return out;
    };
    return walk;
  }, [byName]);

  const coveredBy = new Map<string, string>();
  for (const a of selected) {
    for (const b of selected) {
      if (a.name !== b.name && !coveredBy.has(a.name) && closure(b.name).has(a.name)) coveredBy.set(a.name, b.title);
    }
  }
  const toInstall = selected.filter((s) => !coveredBy.has(s.name));
  const total = new Set(toInstall.flatMap((s) => [s.name, ...closure(s.name)])).size;

  const urlCommand = toInstall.length ? `npx shadcn@latest add \\\n  ${toInstall.map((s) => `${registryBase}/${s.name}.json`).join(" \\\n  ")}` : "";
  const nsCommand = toInstall.length ? `npx shadcn@latest add ${toInstall.map((s) => `@ombak/${s.name}`).join(" ")}` : "";

  const groups = (["template", "block", "component"] as const)
    .map((kind) => ({ kind, items: selected.filter((s) => s.kind === kind) }))
    .filter((g) => g.items.length);

  return (
    <div className="space-y-10">
      {shared && (
        <div className="surface flex flex-wrap items-center justify-between gap-4 rounded-3xl p-5">
          <div>
            <p className="font-medium">Someone shared a kit with {shared.length} item{shared.length === 1 ? "" : "s"}.</p>
            <p className="mt-1 text-sm text-muted-foreground">{shared.map((n) => byName.get(n)?.title).join(", ")}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                kit.set([...names, ...shared]);
                setShared(null);
              }}
              className="inline-flex h-9 items-center rounded-full bg-foreground px-4 text-[13px] font-medium text-background"
            >
              Add to my kit
            </button>
            <button
              type="button"
              onClick={() => {
                kit.set(shared);
                setShared(null);
              }}
              className="surface inline-flex h-9 items-center rounded-full px-4 text-[13px] font-medium"
            >
              Replace my kit
            </button>
          </div>
        </div>
      )}

      {selected.length === 0 ? (
        <div className="surface rounded-3xl px-6 py-16 text-center">
          <p className="font-display text-2xl font-semibold tracking-[-0.03em]">Your kit is empty.</p>
          <p className="mx-auto mt-2 max-w-sm text-muted-foreground">
            Press <span className="font-medium text-foreground">+</span> on any component, block or template to collect it here, then install
            everything with one command.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              ["/docs/components", "Browse components"],
              ["/blocks", "Browse blocks"],
              ["/templates", "Browse templates"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="surface inline-flex h-10 items-center rounded-full px-5 text-sm font-medium transition hover:shadow-soft-md">
                {label}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="space-y-6">
            {groups.map((g) => (
              <section key={g.kind}>
                <h2 className="mb-3 font-mono text-[10.5px] tracking-[0.16em] text-muted-foreground uppercase">
                  {KIND_LABEL[g.kind]} · {g.items.length}
                </h2>
                <ul className="surface divide-y divide-[var(--hairline)] overflow-hidden rounded-2xl">
                  {g.items.map((s) => (
                    <li key={s.name} className="flex items-center gap-3 px-4 py-3">
                      <div className="min-w-0 flex-1">
                        <Link href={s.href} className="font-medium hover:underline">
                          {s.title}
                        </Link>
                        <p className="truncate text-xs text-muted-foreground">
                          {coveredBy.has(s.name) ? (
                            <span className="text-surf">Included with {coveredBy.get(s.name)}</span>
                          ) : (
                            <>
                              {s.group}
                              {s.deps.length > 0 && ` · brings ${closure(s.name).size} more`}
                            </>
                          )}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${s.title}`}
                        onClick={() => kit.remove(s.name)}
                        className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      >
                        <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                          <path d="M4 4l8 8M12 4 4 12" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <button type="button" onClick={() => kit.clear()} className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
              Clear kit
            </button>
          </div>

          <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">Install everything</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {toInstall.length} to install, {total} item{total === 1 ? "" : "s"} in total with dependencies.
                </p>
              </div>
              <button
                type="button"
                onClick={async () => {
                  // the current origin, so share links also work on previews and localhost
                  const url = `${window.location.origin}/kit?items=${names.join(",")}`;
                  try {
                    await navigator.clipboard.writeText(url);
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 1500);
                  } catch {
                    /* clipboard blocked */
                  }
                }}
                className="surface inline-flex h-9 items-center gap-2 rounded-full px-4 text-[13px] font-medium transition hover:shadow-soft-md"
              >
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M6.5 9.5a3 3 0 0 0 4.2 0l2-2a3 3 0 0 0-4.2-4.2l-.6.6M9.5 6.5a3 3 0 0 0-4.2 0l-2 2a3 3 0 0 0 4.2 4.2l.6-.6" />
                </svg>
                {linkCopied ? "Link copied ✓" : "Share kit"}
              </button>
            </div>
            <CopyLine label="With registry URLs" value={urlCommand} />
            <CopyLine label="With the @ombak namespace" value={nsCommand} wrap />
            <p className={cn("text-xs leading-relaxed text-muted-foreground")}>
              The namespace version needs the registry in your <code>components.json</code> once; see{" "}
              <Link href="/docs/installation" className="underline underline-offset-4">
                Installation
              </Link>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
