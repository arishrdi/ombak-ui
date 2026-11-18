"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FloatingNavProps = {
  /** Nav content: logo, links, a button… */
  children: ReactNode;
  /** Pixels scrolled before the bar turns into a floating pill. Default 40 */
  threshold?: number;
  /** Hide when scrolling down, show again when scrolling up. Default true */
  hideOnScroll?: boolean;
  /** Use a scrollable element instead of the window, e.g. for demos. */
  scrollContainer?: React.RefObject<HTMLElement | null>;
  className?: string;
};

/**
 * A top bar that sits flat at the top of the page, then shrinks into a floating glass pill as you
 * scroll, slipping away while you read down and coming back as soon as you scroll up.
 */
export function FloatingNav({ children, threshold = 40, hideOnScroll = true, scrollContainer, className }: FloatingNavProps) {
  const [floating, setFloating] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el: HTMLElement | Window = scrollContainer?.current ?? window;
    const getY = () => (el instanceof Window ? el.scrollY : el.scrollTop);
    let last = getY();
    const onScroll = () => {
      const y = getY();
      setFloating(y > threshold);
      if (hideOnScroll) setHidden(y > threshold * 3 && y > last + 2 ? true : y < last - 2 ? false : (h) => h);
      last = y;
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [threshold, hideOnScroll, scrollContainer]);

  return (
    <div
      className={cn(
        "sticky top-0 z-50 flex justify-center px-4 transition-transform duration-500 ease-[cubic-bezier(.3,.7,.2,1)] motion-reduce:transition-none",
        hidden ? "-translate-y-[120%]" : "translate-y-0",
        className,
      )}
      // keep it reachable for keyboard users even while "hidden"
      onFocusCapture={() => setHidden(false)}
    >
      <nav
        className={cn(
          "flex w-full items-center justify-between gap-6 transition-all duration-500 ease-[cubic-bezier(.3,.7,.2,1)] motion-reduce:transition-none",
          floating
            ? "mt-3 max-w-2xl rounded-full border bg-background/75 px-5 py-2.5 shadow-lg backdrop-blur-xl"
            : "mt-0 max-w-6xl rounded-none border border-transparent px-2 py-4",
        )}
      >
        {children}
      </nav>
    </div>
  );
}
