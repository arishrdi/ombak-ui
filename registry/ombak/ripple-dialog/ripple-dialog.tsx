"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type RippleDialogProps = {
  /** Open state (controlled). */
  open?: boolean;
  /** Called when the dialog wants to open or close. */
  onOpenChange?: (open: boolean) => void;
  /** Element that opens the dialog on click, e.g. a button. The ripple starts where it was clicked. */
  trigger?: ReactNode;
  /** Dialog heading, also its accessible name. */
  title: ReactNode;
  /** Optional line under the title. */
  description?: ReactNode;
  /** Dialog body. */
  children?: ReactNode;
  /** Close when the backdrop is clicked. Default true */
  dismissible?: boolean;
  className?: string;
};

/**
 * A modal that opens as a ripple spreading from where you clicked and drains back there when it
 * closes. Built on the native <dialog> element, so focus is trapped, Escape closes it and the
 * page behind is inert. Reduced-motion users get a simple fade.
 */
export function RippleDialog({ open, onOpenChange, trigger, title, description, children, dismissible = true, className }: RippleDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [inner, setInner] = useState(false);
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });
  const [phase, setPhase] = useState<"closed" | "open" | "closing">("closed");
  const isOpen = open ?? inner;
  const titleId = useId();
  const descId = useId();

  const set = (v: boolean) => {
    if (open === undefined) setInner(v);
    onOpenChange?.(v);
  };

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (isOpen && !d.open) {
      d.showModal();
      requestAnimationFrame(() => setPhase("open"));
    } else if (!isOpen && d.open) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setPhase("closing");
      const id = window.setTimeout(() => {
        d.close();
        setPhase("closed");
      }, reduced ? 150 : 450);
      return () => window.clearTimeout(id);
    }
  }, [isOpen]);

  const shown = phase === "open";

  return (
    <>
      {trigger && (
        <span
          className="contents"
          onClickCapture={(e) => {
            setOrigin({ x: `${e.clientX}px`, y: `${e.clientY}px` });
            set(true);
          }}
        >
          {trigger}
        </span>
      )}
      <dialog
        ref={ref}
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        onCancel={(e) => {
          e.preventDefault();
          set(false);
        }}
        // closed natively (e.g. a <form method="dialog"> button): sync our state
        onClose={() => {
          setPhase("closed");
          if (isOpen) set(false);
        }}
        onClick={(e) => {
          if (dismissible && e.target === e.currentTarget) set(false);
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none bg-transparent p-4 text-foreground backdrop:bg-transparent open:grid open:place-items-center"
      >
        {/* backdrop ripple */}
        <span
          aria-hidden
          className="pointer-events-none fixed inset-0 bg-black/40 backdrop-blur-sm transition-[clip-path,opacity] duration-500 ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-opacity"
          style={{
            clipPath: shown ? `circle(150% at ${origin.x} ${origin.y})` : `circle(0% at ${origin.x} ${origin.y})`,
            opacity: shown ? 1 : 0,
          }}
        />
        <div
          className={cn(
            "relative w-full max-w-md rounded-3xl border bg-popover p-6 text-popover-foreground shadow-2xl transition-[clip-path,opacity,transform] duration-500 ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-opacity",
            className,
          )}
          style={{
            clipPath: shown ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)",
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "scale(.96)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 id={titleId} className="pr-8 text-lg font-semibold tracking-[-0.02em]">
            {title}
          </h2>
          {description && (
            <p id={descId} className="mt-1.5 text-sm text-muted-foreground">
              {description}
            </p>
          )}
          {children && <div className="mt-5">{children}</div>}
          <button
            type="button"
            aria-label="Close"
            onClick={() => set(false)}
            className="absolute top-4 right-4 grid size-8 place-items-center rounded-full text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <path d="M4 4l8 8M12 4 4 12" />
            </svg>
          </button>
        </div>
      </dialog>
    </>
  );
}
