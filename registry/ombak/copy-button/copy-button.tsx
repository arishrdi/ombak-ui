"use client";

import { useEffect, useState, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type CopyButtonProps = {
  /** The text to copy. */
  value: string;
  /** Label next to the icon. Leave empty for an icon-only button. */
  label?: string;
  /** Label after copying. Default "Copied" */
  copiedLabel?: string;
  /** Milliseconds before returning to the idle state. Default 1600 */
  resetAfter?: number;
  /** Called after a successful copy. */
  onCopied?: () => void;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className" | "value">;

/**
 * Copies text to the clipboard; the icon morphs from two sheets into a check mark.
 * Announces "Copied" to screen readers.
 */
export function CopyButton({ value, label = "", copiedLabel = "Copied", resetAfter = 1600, onCopied, className, ...rest }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), resetAfter);
    return () => window.clearTimeout(id);
  }, [copied, resetAfter]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onCopied?.();
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label ? undefined : copied ? copiedLabel : "Copy to clipboard"}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted",
        "outline-none focus-visible:ring-4 focus-visible:ring-ring/50",
        copied && "border-emerald-500/50",
        className,
      )}
      {...rest}
    >
      <span className="relative size-4">
        {/* sheets */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("absolute inset-0 transition-all duration-300", copied ? "scale-50 rotate-[-30deg] opacity-0" : "scale-100 opacity-100")}
        >
          <rect x="9" y="9" width="12" height="12" rx="2" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
        </svg>
        {/* check, drawn in with a stroke animation */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("absolute inset-0 text-emerald-500 transition-opacity duration-200", copied ? "opacity-100" : "opacity-0")}
        >
          <path
            d="M5 12.5l4.5 4.5L19 7"
            strokeDasharray="24"
            strokeDashoffset={copied ? 0 : 24}
            style={{ transition: "stroke-dashoffset 350ms ease-out 80ms" }}
          />
        </svg>
      </span>
      {label && <span>{copied ? copiedLabel : label}</span>}
      <span className="sr-only" aria-live="polite">
        {copied ? copiedLabel : ""}
      </span>
    </button>
  );
}
