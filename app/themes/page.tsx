import type { Metadata } from "next";
import { Suspense } from "react";
import { ThemeBuilder } from "@/components/site/theme-builder";

export const metadata: Metadata = {
  title: "Themes",
  description: "Pick a primary color, tint and radius, watch Ombak components restyle live, and copy the CSS for your globals.css.",
  openGraph: {
    title: "Theme builder · Ombak UI",
    description: "Pick a primary color, tint and radius, watch Ombak components restyle live, and copy the CSS.",
    url: "/themes",
    siteName: "Ombak UI",
  },
};

export default function Themes() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 pb-28 md:px-6 md:py-16">
      <header className="mb-12 max-w-2xl">
        <p className="eyebrow">Theme builder</p>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
          Your colors, <span className="font-serif font-normal tracking-normal italic">every wave.</span>
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
          Every Ombak component, block and template reads shadcn theme tokens. Pick a color, tint the neutrals and set the radius,
          then paste the CSS into your <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">globals.css</code>.
        </p>
      </header>
      <Suspense>
        <ThemeBuilder />
      </Suspense>
    </main>
  );
}
