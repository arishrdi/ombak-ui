"use client";

import { useEffect, useState, type ComponentType } from "react";

// one shared download for all demos; cached across Replay remounts and page navigations
let demosModule: Promise<Record<string, unknown>> | null = null;
const loadDemos = () => (demosModule ??= import("@/components/demos") as Promise<Record<string, unknown>>);

/**
 * Renders a docs demo by its export name, loading the demos module on the client. Keeps every
 * component's demo (and GSAP) out of the page's initial JavaScript.
 */
export function LazyDemo({ name }: { name: string }) {
  const [Demo, setDemo] = useState<ComponentType | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadDemos().then((m) => {
      if (!cancelled) setDemo(() => (m[name] as ComponentType | undefined) ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [name]);

  if (!Demo) {
    return <span aria-label="Loading demo" role="status" className="block h-10 w-40 animate-pulse rounded-full bg-muted/70" />;
  }
  return <Demo />;
}
