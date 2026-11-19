"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Preview / Code switcher with a replay button that remounts the demo. */
export function PreviewTabs({ preview, code, stage }: { preview: ReactNode; code: ReactNode; stage?: string }) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [run, setRun] = useState(0);
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
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
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
            Replay
          </button>
        )}
      </div>
      <div className={cn(tab !== "preview" && "hidden")}>
        <div
          className={cn(
            "surface relative flex min-h-[420px] w-full items-center justify-center overflow-hidden rounded-3xl p-6 md:p-10",
            stage,
          )}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
          />
          <div key={run} className="relative flex w-full items-center justify-center">
            {preview}
          </div>
        </div>
      </div>
      <div className={cn(tab !== "code" && "hidden")}>{code}</div>
    </div>
  );
}
