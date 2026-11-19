"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export type ExpandCardProps = {
  /** The compact card. */
  children: ReactNode;
  /** Content of the expanded view. */
  expanded: ReactNode;
  /** Accessible label for the expanded dialog. */
  label: string;
  /** Classes for the compact card. */
  className?: string;
  /** Classes for the expanded panel, e.g. a max width. Default "max-w-2xl" */
  panelClassName?: string;
};

/**
 * A card that grows smoothly out of its own spot into a full view, then shrinks back into place.
 * The expanded view is a real dialog: Escape and the backdrop close it, focus moves in and returns.
 */
export function ExpandCard({ children, expanded, label, className, panelClassName = "max-w-2xl" }: ExpandCardProps) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);

  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // FLIP: start the panel at the card's rectangle and animate to its natural place
  const flip = (reverse: boolean) => {
    const card = cardRef.current?.getBoundingClientRect();
    const panel = panelRef.current;
    if (!card || !panel) return null;
    const p = panel.getBoundingClientRect();
    const from = `translate(${card.left - p.left}px, ${card.top - p.top}px) scale(${card.width / p.width}, ${card.height / p.height})`;
    const frames = [{ transform: from, opacity: 0.6 }, { transform: "none", opacity: 1 }];
    const opts = { duration: reduced() ? 0 : 420, easing: "cubic-bezier(.2,.8,.2,1)" };
    backdropRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], { ...opts, direction: reverse ? "reverse" : "normal", fill: "forwards" });
    return panel.animate(frames, { ...opts, direction: reverse ? "reverse" : "normal", fill: "forwards" });
  };

  useLayoutEffect(() => {
    if (!open) return;
    flip(false);
    panelRef.current?.focus();
  }, [open]);

  const close = () => {
    if (closing.current) return;
    closing.current = true;
    const a = flip(true);
    const done = () => {
      closing.current = false;
      setOpen(false);
    };
    if (a) a.finished.then(done, done);
    else done();
  };

  // return focus to the card after the dialog closes (it's visible again by then)
  const wasOpen = useRef(false);
  useEffect(() => {
    if (!open && wasOpen.current) cardRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      <button
        ref={cardRef}
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className={cn(
          "block overflow-hidden rounded-2xl border bg-card text-left text-card-foreground transition-transform duration-200 outline-none hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-ring/40",
          open && "invisible",
          className,
        )}
      >
        {children}
      </button>
      {open &&
        createPortal(
          <div className="fixed inset-0 z-[100] grid place-items-center p-4">
            <div ref={backdropRef} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={label}
              tabIndex={-1}
              className={cn("relative max-h-[90vh] w-full origin-top-left overflow-auto rounded-2xl border bg-card text-card-foreground shadow-2xl outline-none", panelClassName)}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={close}
                className="absolute top-3 right-3 z-10 grid size-9 place-items-center rounded-full bg-background/80 backdrop-blur hover:bg-muted"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
              {expanded}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
