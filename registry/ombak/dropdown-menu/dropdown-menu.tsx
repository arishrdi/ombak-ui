"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type DropdownItem = {
  /** Item text. */
  label: string;
  /** Optional icon. */
  icon?: ReactNode;
  /** Optional keyboard hint on the right, e.g. "⌘K". */
  shortcut?: string;
  /** Called when the item is chosen. */
  onSelect?: () => void;
  /** Style the item as destructive. */
  danger?: boolean;
};

export type DropdownMenuProps = {
  /** Text or element inside the trigger button. */
  trigger: ReactNode;
  /** Menu items. */
  items: DropdownItem[];
  /** Menu alignment under the trigger. Default "start" */
  align?: "start" | "end";
  className?: string;
};

/**
 * A dropdown menu whose items cascade in. Follows the WAI-ARIA menu button pattern: Enter, Space
 * or ArrowDown opens it, arrow keys move, Home/End jump, Escape closes and returns focus.
 */
export function DropdownMenu({ trigger, items, align = "start", className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  useEffect(() => {
    if (open) itemRefs.current[focus]?.focus();
  }, [open, focus]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const close = () => {
    setOpen(false);
    btnRef.current?.focus();
  };
  const openAt = (i: number) => {
    setFocus(i);
    setOpen(true);
  };
  const onMenuKey = (e: KeyboardEvent) => {
    const n = items.length;
    const map: Record<string, number> = { ArrowDown: (focus + 1) % n, ArrowUp: (focus - 1 + n) % n, Home: 0, End: n - 1 };
    if (e.key in map) {
      e.preventDefault();
      setFocus(map[e.key]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={cn("relative inline-block", className)}>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => (open ? setOpen(false) : openAt(0))}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            openAt(0);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            openAt(items.length - 1);
          }
        }}
        className="inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium outline-none hover:bg-muted focus-visible:ring-4 focus-visible:ring-ring/40"
      >
        {trigger}
        <svg viewBox="0 0 24 24" className={cn("size-4 transition-transform duration-200", open && "rotate-180")} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div
          id={id}
          role="menu"
          onKeyDown={onMenuKey}
          className={cn(
            "absolute top-full z-50 mt-2 min-w-52 origin-top rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-xl [animation:ombak-dd-in_.18s_ease-out] motion-reduce:animate-none",
            align === "end" ? "right-0" : "left-0",
          )}
        >
          <style>{`@keyframes ombak-dd-in{from{opacity:0;transform:scale(.96) translateY(-4px)}}@keyframes ombak-dd-item{from{opacity:0;transform:translateX(-6px)}}`}</style>
          {items.map((it, i) => (
            <button
              key={it.label}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              type="button"
              role="menuitem"
              tabIndex={i === focus ? 0 : -1}
              onPointerEnter={() => setFocus(i)}
              onClick={() => {
                it.onSelect?.();
                close();
              }}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm outline-none focus:bg-muted motion-reduce:!animate-none [&>svg]:size-4",
                it.danger ? "text-red-500" : "",
              )}
              style={{ animation: `ombak-dd-item .25s ease-out ${i * 30}ms both` }}
            >
              {it.icon}
              <span className="flex-1">{it.label}</span>
              {it.shortcut && <kbd className="font-mono text-xs text-muted-foreground">{it.shortcut}</kbd>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
