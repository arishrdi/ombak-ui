"use client";

import { Caustics } from "@/registry/ombak/caustics/caustics";
import { MagneticButton } from "@/registry/ombak/magnetic-button/magnetic-button";
import { cn } from "@/lib/utils";

export type CtaCausticsProps = {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  className?: string;
};

/** A closing call to action in a rounded panel with shimmering underwater light. */
export function CtaCaustics({
  title = "Ready to make your site move?",
  description = "Free, open source, and one command away.",
  primary = { label: "Get started", href: "#" },
  secondary = { label: "Star on GitHub", href: "#" },
  className,
}: CtaCausticsProps) {
  return (
    <section className={cn("bg-background px-4 py-16 md:px-6 md:py-24", className)}>
      <Caustics className="mx-auto max-w-6xl rounded-[28px] bg-[#04202a] text-white shadow-2xl ring-1 ring-white/10">
        <div className="flex flex-col items-center px-6 py-20 text-center md:py-28">
          <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.045em] md:text-6xl">{title}</h2>
          <p className="mt-5 max-w-lg text-white/65">{description}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <MagneticButton as="a" href={primary.href} className="bg-white text-[#04202a]">
              {primary.label}
            </MagneticButton>
            <MagneticButton as="a" href={secondary.href} className="bg-white/5 text-white ring-1 ring-white/25">
              {secondary.label}
            </MagneticButton>
          </div>
        </div>
      </Caustics>
    </section>
  );
}
