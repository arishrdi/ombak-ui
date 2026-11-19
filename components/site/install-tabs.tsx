"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function InstallTabs({ cli, manual }: { cli: ReactNode; manual: ReactNode }) {
  const [tab, setTab] = useState<"cli" | "manual">("cli");
  return (
    <div>
      <div className="surface mb-3 inline-flex rounded-full p-1">
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
              "rounded-full px-4 py-1.5 text-[13px] font-medium transition duration-300",
              tab === key ? "bg-foreground text-background shadow-soft-sm" : "text-muted-foreground hover:text-foreground",
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
