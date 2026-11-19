import Link from "next/link";
import type { Metadata } from "next";
import { items } from "@/lib/registry";

export const metadata: Metadata = { title: "Introduction" };

export default function Intro() {
  return (
    <article className="prose-ombak max-w-2xl">
      <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] md:text-5xl">Introduction</h1>
      <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
        Ombak UI is a collection of motion components for React: scroll effects, text animations and interactive
        details, built with GSAP, Tailwind CSS and canvas.
      </p>
      <div className="mt-10 space-y-6 leading-relaxed text-muted-foreground">
        <p>
          It is <strong className="text-foreground">not a package you install</strong>. Like shadcn/ui, each component is
          copied into your project, so you own the code and can change anything.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Styled with shadcn theme tokens, so it matches your design out of the box.</li>
          <li>Respects <code className="text-foreground">prefers-reduced-motion</code> everywhere.</li>
          <li>Hover-only effects switch off on touch devices.</li>
          <li>Typed props, documented right on each page.</li>
        </ul>
        <p>
          Start with the{" "}
          <Link href="/docs/installation" className="text-foreground underline underline-offset-4">
            installation guide
          </Link>{" "}
          or jump to any of the {items.length} components in the sidebar.
        </p>
      </div>
    </article>
  );
}
