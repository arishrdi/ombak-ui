"use client";

import { NavbarFloating } from "@/registry/blocks/navbar-floating/navbar-floating";

/** Navbar in context: page content underneath so the bar has something to float over. */
export function NavbarPreview() {
  return (
    <div className="min-h-[1600px] bg-background">
      <NavbarFloating current="#product" />
      <div className="mx-auto max-w-3xl px-6 pt-20 text-center">
        <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">Scroll this frame</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">The bar turns into a floating pill.</h1>
        <p className="mx-auto mt-5 max-w-md text-muted-foreground">
          Scroll down and it slips away. Scroll back up and it returns.
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-5xl gap-4 px-6 sm:grid-cols-3" aria-hidden>
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="h-44 rounded-2xl border bg-muted/40" />
        ))}
      </div>
    </div>
  );
}
