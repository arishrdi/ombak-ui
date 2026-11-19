"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label="Copy to clipboard"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* clipboard blocked */
        }
      }}
      className={cn(
        "rounded-lg border bg-background/80 px-2.5 py-1 font-mono text-[11px] font-medium text-muted-foreground backdrop-blur transition hover:text-foreground active:scale-95",
        className,
      )}
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}
