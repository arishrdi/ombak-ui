"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TideDrawerProps = {
  /** Open state (controlled). */
  open?: boolean;
  /** Called when the drawer wants to open or close. */
  onOpenChange?: (open: boolean) => void;
  /** Element that opens the drawer on click. */
  trigger?: ReactNode;
  /** Heading, also the accessible name. */
  title: ReactNode;
  /** Optional line under the title. */
  description?: ReactNode;
  /** Drawer body. */
  children?: ReactNode;
  /** Pixels you need to drag down before it closes. Default 120 */
  closeThreshold?: number;
  className?: string;
};

/**
 * A bottom sheet that rises like the tide, with a gently rolling wave along its top edge. Drag the
 * handle (or the sheet) down to let it ebb away; Escape and the backdrop close it too. Built on the
 * native <dialog> element for focus trapping. The wave holds still for reduced-motion users.
 */
export function TideDrawer({ open, onOpenChange, trigger, title, description, children, closeThreshold = 120, className }: TideDrawerProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [inner, setInner] = useState(false);
  const [shown, setShown] = useState(false);
  const [drag, setDrag] = useState(0);
  const start = useRef<number | null>(null);
  const isOpen = open ?? inner;
  const titleId = useId();

  const set = (v: boolean) => {
    if (open === undefined) setInner(v);
    onOpenChange?.(v);
  };

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (isOpen && !d.open) {
      d.showModal();
      requestAnimationFrame(() => setShown(true));
    } else if (!isOpen && d.open) {
      setShown(false);
      const id = window.setTimeout(() => {
        d.close();
        setDrag(0);
      }, 450);
      return () => window.clearTimeout(id);
    }
  }, [isOpen]);

  // dragging starts from the crest/handle strip, so the body can still scroll on touch screens
  const onDown = (e: React.PointerEvent) => {
    start.current = e.clientY;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (start.current === null) return;
    setDrag(Math.max(0, e.clientY - start.current));
  };
  const onUp = () => {
    if (start.current === null) return;
    start.current = null;
    if (drag > closeThreshold) set(false);
    else setDrag(0);
  };

  const wave = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='16' viewBox='0 0 160 16'><path d='M0 10 C 20 2 40 2 60 8 S 100 16 120 8 S 150 2 160 6 V16 H0Z' fill='black'/></svg>`,
  );

  return (
    <>
      {trigger && (
        <span className="contents" onClickCapture={() => set(true)}>
          {trigger}
        </span>
      )}
      <dialog
        ref={ref}
        aria-labelledby={titleId}
        onCancel={(e) => {
          e.preventDefault();
          set(false);
        }}
        // closed natively (e.g. a <form method="dialog"> button): sync our state
        onClose={() => {
          setShown(false);
          setDrag(0);
          if (isOpen) set(false);
        }}
        onClick={(e) => e.target === e.currentTarget && set(false)}
        className="fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none overflow-hidden bg-transparent p-0 text-foreground backdrop:bg-transparent"
      >
        <style>{`@keyframes ombak-tide-roll{to{-webkit-mask-position-x:-160px;mask-position-x:-160px}}`}</style>
        <span
          aria-hidden
          className="pointer-events-none fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-500"
          style={{ opacity: shown ? Math.max(0, 1 - drag / 400) : 0 }}
        />
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "absolute inset-x-0 bottom-0 mx-auto flex max-h-[85dvh] w-full max-w-2xl flex-col",
            start.current === null && "transition-transform duration-500 ease-[cubic-bezier(.2,.9,.25,1)] motion-reduce:duration-200",
          )}
          style={{ transform: shown ? `translateY(${drag}px)` : "translateY(105%)" }}
        >
          {/* rolling wave crest + handle: the drag area */}
          <div onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} className="cursor-grab touch-none active:cursor-grabbing">
          <span
            aria-hidden
            className="block h-4 w-full bg-popover [animation:ombak-tide-roll_4s_linear_infinite] motion-reduce:animate-none"
            style={{
              WebkitMaskImage: `url("data:image/svg+xml,${wave}")`,
              maskImage: `url("data:image/svg+xml,${wave}")`,
              WebkitMaskSize: "160px 16px",
              maskSize: "160px 16px",
              WebkitMaskRepeat: "repeat-x",
              maskRepeat: "repeat-x",
            }}
          />
            <div className="-mt-px flex justify-center bg-popover pt-1 pb-3">
              <span className="h-1.5 w-12 rounded-full bg-muted-foreground/30" aria-hidden />
            </div>
          </div>
          <div className={cn("-mt-px flex min-h-0 flex-1 flex-col bg-popover text-popover-foreground shadow-2xl", className)}>
            <div data-drawer-scroll className="min-h-0 flex-1 overflow-y-auto px-6 pb-8">
              <h2 id={titleId} className="text-lg font-semibold tracking-[-0.02em]">
                {title}
              </h2>
              {description && <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>}
              {children && <div className="mt-5">{children}</div>}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
