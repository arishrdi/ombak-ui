"use client";

import dynamic from "next/dynamic";

/** The props playground, downloaded the first time its tab is opened. */
export const LazyPlayground = dynamic(() => import("./props-playground").then((m) => m.PropsPlayground), {
  ssr: false,
  loading: () => (
    <div className="surface grid min-h-[420px] place-items-center rounded-3xl text-sm text-muted-foreground">Loading playground…</div>
  ),
});
