"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * "Copy for AI" menu: copy a ready-made prompt (with or without the source code) for ChatGPT,
 * Claude, Cursor and friends, or open the registry item straight in v0.
 */
export function AiMenu({ prompt, promptWithSource, v0Url, className }: { prompt: string; promptWithSource: string; v0Url: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<"short" | "full" | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const copy = async (which: "short" | "full") => {
    try {
      await navigator.clipboard.writeText(which === "short" ? prompt : promptWithSource);
      setCopied(which);
      setTimeout(() => {
        setCopied(null);
        setOpen(false);
      }, 1100);
    } catch {
      /* clipboard blocked */
    }
  };

  const kb = (n: string) => `${Math.max(1, Math.round(new Blob([n]).size / 1024))} KB`;
  const item = "flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left outline-none transition-colors hover:bg-muted focus-visible:bg-muted";

  return (
    <div ref={root} className={cn("relative", className)}>
      <button
        ref={btn}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="surface inline-flex h-9 items-center gap-2 rounded-full px-4 text-[13px] font-medium transition hover:shadow-soft-md focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:outline-none"
      >
        <svg viewBox="0 0 16 16" className="size-3.5 text-surf" fill="currentColor" aria-hidden>
          <path d="M8 1.5l1.3 3.2 3.2 1.3-3.2 1.3L8 10.5 6.7 7.3 3.5 6l3.2-1.3zM13 10l.6 1.4 1.4.6-1.4.6L13 14l-.6-1.4-1.4-.6 1.4-.6z" />
        </svg>
        Copy for AI
        <svg viewBox="0 0 16 16" className={cn("size-3 text-muted-foreground transition-transform", open && "rotate-180")} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m4 6 4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          // a bottom sheet on phones, a dropdown from sm up
          className="fixed inset-x-3 bottom-3 z-[90] origin-bottom sm:absolute sm:inset-x-auto sm:bottom-auto sm:right-0 sm:z-50 sm:mt-2 sm:w-80 sm:origin-top-right rounded-2xl bg-popover/95 p-1.5 text-popover-foreground shadow-[inset_0_1px_0_var(--highlight),0_0_0_1px_var(--border),var(--shadow-lg)] backdrop-blur-xl [animation:ombak-menu-in_.18s_ease-out] motion-reduce:animate-none"
        >
          <style>{`@keyframes ombak-menu-in{from{opacity:0;transform:translateY(-4px) scale(.98)}}`}</style>
          <button type="button" role="menuitem" onClick={() => copy("short")} className={item}>
            <Icon d="M5 3h6l2 2v8H5zM3 5v9h7" />
            <span>
              <span className="block text-sm font-medium">{copied === "short" ? "Copied ✓" : "Copy prompt"}</span>
              <span className="block text-xs text-muted-foreground">Description, install, usage and props. {kb(prompt)}</span>
            </span>
          </button>
          <button type="button" role="menuitem" onClick={() => copy("full")} className={item}>
            <Icon d="M5.5 5 2.5 8l3 3M10.5 5l3 3-3 3M9 3.5 7 12.5" />
            <span>
              <span className="block text-sm font-medium">{copied === "full" ? "Copied ✓" : "Copy prompt + source"}</span>
              <span className="block text-xs text-muted-foreground">Everything above plus the full code. {kb(promptWithSource)}</span>
            </span>
          </button>
          <div className="my-1 h-px bg-[var(--hairline)]" />
          <a role="menuitem" href={v0Url} target="_blank" rel="noreferrer" className={item} onClick={() => setOpen(false)}>
            <Icon d="M3 4l4 8 2-4M10 4h3v8h-3" />
            <span>
              <span className="block text-sm font-medium">Open in v0 ↗</span>
              <span className="block text-xs text-muted-foreground">Start a v0 chat with this registry item.</span>
            </span>
          </a>
        </div>
      )}
    </div>
  );
}

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}
