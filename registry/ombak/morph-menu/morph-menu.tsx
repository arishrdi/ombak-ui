"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type MorphMenuLink = { label: string; href: string };

export type MorphMenuProps = {
  /** Links shown in the menu. */
  links: MorphMenuLink[];
  /** Panel position relative to the button. Default "right" */
  align?: "left" | "right";
  className?: string;
};

/**
 * A menu button whose three lines morph into a cross, opening a panel where links rise in one
 * after another. Escape and clicking outside close it, and focus returns to the button.
 */
export function MorphMenu({ links, align = "right", className }: MorphMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const line = "absolute left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(.3,.7,.2,1)]";
  return (
    <div ref={rootRef} className={cn("relative inline-block", className)}>
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className="relative grid size-11 place-items-center rounded-full border bg-background text-foreground outline-none hover:bg-muted focus-visible:ring-4 focus-visible:ring-ring/40"
      >
        <span className={cn(line, open ? "top-1/2 rotate-45" : "top-[15px]")} />
        <span className={cn(line, "top-1/2 -translate-y-1/2", open && "scale-x-0 opacity-0")} />
        <span className={cn(line, open ? "top-1/2 -rotate-45" : "top-[27px]")} />
      </button>
      <div
        id={id}
        hidden={!open}
        className={cn(
          "absolute top-14 z-50 w-56 origin-top overflow-hidden rounded-2xl border bg-popover p-2 text-popover-foreground shadow-xl [animation:ombak-menu-in_.25s_ease-out] motion-reduce:animate-none",
          align === "right" ? "right-0" : "left-0",
        )}
      >
        <style>{`@keyframes ombak-menu-in{from{opacity:0;transform:scale(.96) translateY(-6px)}}@keyframes ombak-menu-link{from{opacity:0;transform:translateY(10px)}}`}</style>
        <ul>
          {links.map((l, i) => (
            <li key={l.href} className="motion-reduce:!animate-none" style={{ animation: open ? `ombak-menu-link .4s cubic-bezier(.2,.8,.2,1) ${80 + i * 50}ms both` : undefined }}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 font-display text-lg font-semibold tracking-tight outline-none hover:bg-muted focus-visible:bg-muted"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
