"use client";

import { useState, type ReactNode } from "react";
import { BlockFrame } from "./block-frame";
import { cn } from "@/lib/utils";

const VIEWPORTS = [
  { key: "desktop", label: "Desktop", width: "100%", icon: "M3 5h18v11H3zM8 20h8M12 16v4" },
  { key: "tablet", label: "Tablet", width: 768, icon: "M6 3h12v18H6zM11 18h2" },
  { key: "mobile", label: "Mobile", width: 390, icon: "M8 3h8v18H8zM11 18h2" },
] as const;

/** Preview / Code switcher for a block, with viewport sizes, replay and open-in-new-tab. */
export function BlockPreview({ slug, title, code, frameHeight }: { slug: string; title: string; code: ReactNode; frameHeight?: number }) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [vp, setVp] = useState<(typeof VIEWPORTS)[number]["key"]>("desktop");
  const [run, setRun] = useState(0);
  const width = VIEWPORTS.find((v) => v.key === vp)!.width;

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="surface inline-flex gap-1 rounded-full p-1">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full px-4 py-1.5 text-[13px] font-medium capitalize transition duration-300",
                tab === t ? "bg-foreground text-background shadow-soft-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        {tab === "preview" && (
          <div className="flex items-center gap-1">
            <div className="surface hidden gap-0.5 rounded-full p-1 sm:inline-flex" role="group" aria-label="Viewport size">
              {VIEWPORTS.map((v) => (
                <button
                  key={v.key}
                  type="button"
                  aria-label={v.label}
                  aria-pressed={vp === v.key}
                  title={v.label}
                  onClick={() => setVp(v.key)}
                  className={cn(
                    "grid size-8 place-items-center rounded-full transition duration-300",
                    vp === v.key ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={v.icon} />
                  </svg>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setRun((r) => r + 1)}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
              Replay
            </button>
            <a
              href={`/view/${slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 11 11 5M6 5h5v5" /></svg>
              Open
            </a>
          </div>
        )}
      </div>

      <div className={cn(tab !== "preview" && "hidden")}>
        <div className="surface relative overflow-hidden rounded-3xl p-0 sm:p-3">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px]"
          />
          <div
            className="relative mx-auto max-w-full overflow-hidden rounded-[18px] shadow-[0_0_0_1px_var(--border)] transition-[width] duration-500 ease-out-expo"
            style={{ width }}
          >
            <BlockFrame slug={slug} title={title} width="100%" reloadKey={run} fixedHeight={frameHeight} />
          </div>
        </div>
      </div>
      <div className={cn(tab !== "code" && "hidden")}>{code}</div>
    </div>
  );
}
