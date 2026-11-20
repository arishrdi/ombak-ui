import type { Metadata } from "next";
import { Pricing } from "@/components/site/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Ombak UI components and the site generator are free. Ombak Pro adds a stronger model, no badge and Next.js export.",
  openGraph: {
    title: "Pricing · Ombak UI",
    description: "Components and the site generator are free. Pro adds a stronger model, no badge and Next.js export.",
    url: "/pricing",
    siteName: "Ombak UI",
  },
};

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 pb-28 md:px-6 md:py-16">
      <header className="mb-12 max-w-2xl">
        <p className="eyebrow">Pricing</p>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
          Free to ride, <span className="font-serif font-normal tracking-normal italic">Pro to go further.</span>
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
          The component library stays free and open source. Pro is for the site generator: a stronger model, more generations
          and pages you can hand to a client without our badge. It isn’t open yet, so join the waitlist.
        </p>
      </header>
      <Pricing />
    </main>
  );
}
