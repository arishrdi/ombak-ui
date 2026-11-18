"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function InstallTabs({ cli, manual }: { cli: ReactNode; manual: ReactNode }) {
  const [tab, setTab] = useState<"cli" | "manual">("cli");
  return (
    <div>
      <div className="mb-3 inline-flex rounded-lg border bg-muted/40 p-1">
        {(
          [
            ["cli", "CLI"],
            ["manual", "Manual"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition",
              tab === key ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={cn(tab !== "cli" && "hidden")}>{cli}</div>
      <div className={cn(tab !== "manual" && "hidden")}>{manual}</div>
    </div>
  );
}
