"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BloomPopoverProps = {
  /** Content of the trigger button. */
  trigger: ReactNode;
  /** Popover content. */
  children: ReactNode;
  /** Accessible name for the popover panel. */
  label?: string;
  /** Where the panel opens. Default "bottom" */
  side?: "top" | "bottom";
  /** Horizontal alignment with the trigger. Default "center" */
  align?: "start" | "center" | "end";
  /** Open state (controlled). */
  open?: boolean;
  /** Called when the popover opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Classes for the trigger button. */
  triggerClassName?: string;
  className?: string;
};

// horizontal centering is done with the `translate` style below, alongside the bloom offset
const ALIGN = { start: "left-0", center: "left-1/2", end: "right-0" } as const;
const ORIGIN = { start: "0%", center: "50%", end: "100%" } as const;

/**
 * A popover that blooms out of its trigger like a droplet spreading on the surface: it grows from
 * the trigger's edge with a soft spring and a little tail. Closes on outside click and Escape, and
 * returns focus to the trigger. Fades only for reduced-motion users.
 */
export function BloomPopover({
  trigger,
  children,
  label,
  side = "bottom",
  align = "center",
  open,
  onOpenChange,
  triggerClassName,
  className,
}: BloomPopoverProps) {
  const [inner, setInner] = useState(false);
  const isOpen = open ?? inner;
  const root = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const id = useId();

  const set = (v: boolean) => {
    if (open === undefined) setInner(v);
    onOpenChange?.(v);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) set(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        set(false);
        btn.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const top = side === "top";

  return (
    <div ref={root} className="relative inline-block">
      <button
        ref={btn}
        type="button"
        aria-expanded={isOpen}
        aria-controls={id}
        aria-haspopup="dialog"
        onClick={() => set(!isOpen)}
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-full border bg-background px-4 text-sm font-medium outline-none transition-colors hover:bg-muted focus-visible:ring-4 focus-visible:ring-ring/40",
          triggerClassName,
        )}
      >
        {trigger}
      </button>
      <div
        id={id}
        role="dialog"
        aria-label={label}
        inert={!isOpen}
        className={cn(
          "absolute z-50 w-72 rounded-2xl border bg-popover p-4 text-popover-foreground shadow-xl",
          "transition-[opacity,scale,translate] duration-300 ease-[cubic-bezier(.3,1.45,.5,1)] motion-reduce:transition-opacity",
          top ? "bottom-full mb-3" : "top-full mt-3",
          ALIGN[align],
          isOpen ? "visible opacity-100" : "invisible opacity-0",
          className,
        )}
        style={{
          transformOrigin: `${ORIGIN[align]} ${top ? "100%" : "0%"}`,
          scale: isOpen ? "1" : "0.6",
          translate: align === "center" ? `-50% ${isOpen ? 0 : top ? 8 : -8}px` : `0 ${isOpen ? 0 : top ? 8 : -8}px`,
        }}
      >
        {/* tail */}
        <span
          aria-hidden
          className={cn(
            "absolute size-3 rotate-45 border bg-popover",
            top ? "-bottom-1.5 border-t-0 border-l-0" : "-top-1.5 border-r-0 border-b-0",
            align === "start" ? "left-5" : align === "end" ? "right-5" : "left-1/2 -ml-1.5",
          )}
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
