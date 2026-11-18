"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Preview / Code switcher. Both panes are rendered on the server and passed in. */
export function PreviewTabs({ preview, code, stage }: { preview: ReactNode; code: ReactNode; stage?: string }) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  return (
    <div>
      <div className="mb-3 flex gap-1 border-b">
        {(["preview", "code"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "-mb-px border-b-2 px-4 py-2 text-sm font-medium capitalize transition",
              tab === t ? "border-surf text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <div className={cn(tab !== "preview" && "hidden")}>
        <div
          className={cn(
            "flex min-h-[380px] w-full items-center justify-center overflow-hidden rounded-xl border bg-card/40 p-6 md:p-10",
            stage,
          )}
        >
          {preview}
        </div>
      </div>
      <div className={cn(tab !== "code" && "hidden")}>{code}</div>
    </div>
  );
}
