"use client";

import type { ReactNode } from "react";
import { Accordion } from "@/registry/ombak/accordion/accordion";
import { cn } from "@/lib/utils";

export type FaqSplitProps = {
  eyebrow?: string;
  title?: string;
  description?: ReactNode;
  /** Questions and answers. */
  faqs?: { question: string; answer: ReactNode }[];
  className?: string;
};

const DEFAULT_FAQS = [
  {
    question: "Is it really free?",
    answer: "Yes. Every component is MIT licensed, so you can use it in personal and commercial projects.",
  },
  {
    question: "Do I need shadcn/ui?",
    answer: "You need the shadcn CLI to install components, and Tailwind CSS v4. You don't have to use any other shadcn components.",
  },
  {
    question: "What about reduced motion?",
    answer: "Every effect checks prefers-reduced-motion and either skips the animation or shows a calm fallback.",
  },
  {
    question: "Can I change the code?",
    answer: "That's the point. Components are copied into your project, so you own every line.",
  },
  {
    question: "Does it work with Next.js App Router?",
    answer: "Yes. Interactive components are marked \"use client\" and render fine inside server components.",
  },
];

/** A two-column FAQ: heading and contact line on the left, an animated accordion on the right. */
export function FaqSplit({
  eyebrow = "FAQ",
  title = "Questions, answered.",
  description = (
    <>
      Can&apos;t find what you need?{" "}
      <a href="#" className="font-medium text-foreground underline underline-offset-4">
        Get in touch
      </a>
      .
    </>
  ),
  faqs = DEFAULT_FAQS,
  className,
}: FaqSplitProps) {
  return (
    <section className={cn("bg-background px-6 py-20 md:py-28", className)}>
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.5fr] md:gap-16">
        <div className="md:sticky md:top-24 md:self-start">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">{eyebrow}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{title}</h2>
          <p className="mt-4 max-w-sm text-muted-foreground">{description}</p>
        </div>
        <Accordion defaultOpen={[0]} items={faqs.map((f) => ({ title: f.question, content: f.answer }))} />
      </div>
    </section>
  );
}
