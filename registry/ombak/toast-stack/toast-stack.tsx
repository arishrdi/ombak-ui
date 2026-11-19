"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ToastType = "default" | "success" | "error";
type ToastItem = { id: number; title: ReactNode; description?: ReactNode; type: ToastType; duration: number };
type ToastOptions = { description?: ReactNode; type?: ToastType; duration?: number };

// A tiny module-level store so `toast()` can be called from anywhere.
let items: ToastItem[] = [];
let nextId = 1;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const EMPTY: ToastItem[] = [];

/** Shows a toast. Returns its id, which you can pass to `toast.dismiss`. */
export function toast(title: ReactNode, options: ToastOptions = {}) {
  const id = nextId++;
  items = [...items, { id, title, description: options.description, type: options.type ?? "default", duration: options.duration ?? 4000 }];
  emit();
  return id;
}
toast.success = (title: ReactNode, options: Omit<ToastOptions, "type"> = {}) => toast(title, { ...options, type: "success" });
toast.error = (title: ReactNode, options: Omit<ToastOptions, "type"> = {}) => toast(title, { ...options, type: "error" });
toast.dismiss = (id: number) => {
  items = items.filter((t) => t.id !== id);
  emit();
};

export type ToasterProps = {
  /** Corner the stack sits in. Default "bottom-right" */
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left" | "bottom-center" | "top-center";
  /** How many toasts stay visible; older ones fold behind. Default 3 */
  visible?: number;
  className?: string;
};

const POSITIONS = {
  "bottom-right": "bottom-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-4 right-4 items-end",
  "top-left": "top-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
} as const;

const DOT = { default: "bg-primary", success: "bg-emerald-500", error: "bg-red-500" } as const;

/**
 * Render once (e.g. in your root layout), then call `toast("Saved")` anywhere. Toasts fold into a
 * stack like overlapping waves and fan out on hover; each one drains a tide line while it waits,
 * pauses on hover, and can be swiped away. Announced politely to screen readers.
 */
export function Toaster({ position = "bottom-right", visible = 3, className }: ToasterProps) {
  const list = useSyncExternalStore(subscribe, () => items, () => EMPTY);
  const [expanded, setExpanded] = useState(false);
  const top = position.startsWith("top");
  const shown = list.slice(-visible - 1);

  return (
    <section
      aria-label="Notifications"
      aria-live="polite"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocusCapture={() => setExpanded(true)}
      onBlurCapture={() => setExpanded(false)}
      className={cn("fixed z-[100] flex w-[min(380px,calc(100vw-2rem))] flex-col", POSITIONS[position], className)}
    >
      <style>{`@keyframes ombak-toast-in{from{opacity:0;transform:translateY(var(--from)) scale(.96)}}`}</style>
      <ol className="relative grid w-full">
        {shown.map((t, i) => {
          const depth = shown.length - 1 - i; // 0 = newest
          return (
            <ToastCard
              key={t.id}
              item={t}
              depth={depth}
              hidden={depth >= visible}
              expanded={expanded}
              top={top}
              paused={expanded}
            />
          );
        })}
      </ol>
    </section>
  );
}

function ToastCard({
  item,
  depth,
  hidden,
  expanded,
  top,
  paused,
}: {
  item: ToastItem;
  depth: number;
  hidden: boolean;
  expanded: boolean;
  top: boolean;
  paused: boolean;
}) {
  const [drag, setDrag] = useState(0);
  const start = useRef<number | null>(null);
  const left = useRef(item.duration);
  const tick = useRef(0);

  // countdown that pauses while the stack is hovered
  useEffect(() => {
    if (paused || item.duration === Infinity) return;
    tick.current = performance.now();
    const id = window.setTimeout(() => toast.dismiss(item.id), left.current);
    return () => {
      window.clearTimeout(id);
      left.current -= performance.now() - tick.current;
    };
  }, [paused, item.id, item.duration]);

  const dir = top ? 1 : -1;
  const offset = expanded ? depth * 72 : depth * 10;
  const scale = expanded ? 1 : 1 - depth * 0.05;

  return (
    <li
      role="status"
      onPointerDown={(e) => {
        start.current = e.clientX;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      }}
      onPointerMove={(e) => start.current !== null && setDrag(e.clientX - start.current)}
      onPointerUp={() => {
        if (Math.abs(drag) > 90) toast.dismiss(item.id);
        start.current = null;
        setDrag(0);
      }}
      className={cn(
        "relative col-start-1 row-start-1 flex w-full touch-pan-y items-start gap-3 overflow-hidden rounded-2xl border bg-popover p-4 pr-10 text-popover-foreground shadow-xl select-none",
        "transition-[transform,opacity] duration-500 ease-[cubic-bezier(.2,.9,.25,1)] [animation:ombak-toast-in_.5s_cubic-bezier(.2,.9,.25,1)] motion-reduce:transition-none motion-reduce:[animation:none]",
        hidden && "pointer-events-none opacity-0",
        top ? "self-start" : "self-end",
      )}
      style={
        {
          "--from": `${dir * -24}px`,
          transform: `translate(${drag}px, ${dir * offset}px) scale(${scale})`,
          opacity: hidden ? 0 : drag ? 1 - Math.min(Math.abs(drag) / 200, 0.7) : 1,
          zIndex: 10 - depth,
          transformOrigin: top ? "bottom center" : "top center",
        } as React.CSSProperties
      }
    >
      <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", DOT[item.type])} aria-hidden />
      <div className="min-w-0">
        <p className="text-sm font-medium">{item.title}</p>
        {item.description && <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>}
      </div>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => toast.dismiss(item.id)}
        className="absolute top-3 right-3 grid size-6 place-items-center rounded-md text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
          <path d="M4 4l8 8M12 4 4 12" />
        </svg>
      </button>
      {item.duration !== Infinity && depth === 0 && (
        <span
          aria-hidden
          className={cn("absolute inset-x-0 bottom-0 h-0.5 origin-left opacity-60", DOT[item.type])}
          style={{
            animation: `ombak-toast-drain ${item.duration}ms linear forwards`,
            animationPlayState: paused ? "paused" : "running",
          }}
        />
      )}
      <style>{`@keyframes ombak-toast-drain{to{transform:scaleX(0)}}`}</style>
    </li>
  );
}
