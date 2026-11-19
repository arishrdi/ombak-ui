"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useKit } from "@/lib/kit-store";
import { cn } from "@/lib/utils";

/** A floating pill that shows how many items are in the kit and links to /kit. */
export function KitTray() {
  const items = useKit();
  const pathname = usePathname();
  const [bump, setBump] = useState(false);
  const prev = useRef(items.length);

  // little pop whenever the count goes up
  useEffect(() => {
    if (items.length > prev.current) {
      setBump(true);
      const id = window.setTimeout(() => setBump(false), 450);
      prev.current = items.length;
      return () => window.clearTimeout(id);
    }
    prev.current = items.length;
  }, [items.length]);

  const hidden = items.length === 0 || pathname === "/kit" || pathname?.startsWith("/view/");

  return (
    <div
      className={cn(
        "fixed right-4 bottom-4 z-[80] transition-[opacity,transform] duration-500 ease-out-expo md:right-6 md:bottom-6",
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "translate-y-0 opacity-100",
      )}
      aria-hidden={hidden}
    >
      <Link
        href="/kit"
        tabIndex={hidden ? -1 : 0}
        className={cn(
          "flex h-12 items-center gap-3 rounded-full bg-foreground pr-5 pl-2 text-sm font-medium text-background shadow-soft-lg outline-none transition-transform duration-300 focus-visible:ring-4 focus-visible:ring-ring/40",
          bump && "scale-110",
        )}
      >
        <span className="grid size-8 place-items-center rounded-full bg-surf font-mono text-[13px] font-semibold text-[#04201a] tabular-nums">
          {items.length}
        </span>
        Your kit
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
