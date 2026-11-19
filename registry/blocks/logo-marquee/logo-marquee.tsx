"use client";

import { Marquee } from "@/registry/ombak/marquee/marquee";
import { cn } from "@/lib/utils";

export type LogoMarqueeProps = {
  /** Line above the logos. */
  title?: string;
  /** Brand names (or swap the spans for your own <img> logos). */
  logos?: string[];
  /** Scroll speed in pixels per second. */
  speed?: number;
  className?: string;
};

const DEFAULT_LOGOS = ["Arus", "Karang", "Pasang", "Samudra", "Teluk", "Lagoon", "Tanjung", "Selat", "Muara", "Riak"];

/** A "trusted by" strip: brand names drift past with faded edges and slow down on hover. */
export function LogoMarquee({
  title = "Trusted by teams who ship fast",
  logos = DEFAULT_LOGOS,
  speed = 40,
  className,
}: LogoMarqueeProps) {
  return (
    <section className={cn("border-y bg-background py-12", className)}>
      <p className="mb-8 text-center text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">{title}</p>
      <Marquee speed={speed} fade pauseOnHover gap="4rem">
        {logos.map((name, i) => (
          <span key={name} className="flex items-center gap-2.5 text-xl font-semibold tracking-[-0.03em] text-muted-foreground/80 md:text-2xl">
            <LogoMark index={i} />
            {name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/** Placeholder marks so the strip looks like real logos out of the box. */
function LogoMark({ index }: { index: number }) {
  const shapes = [
    <circle key="c" cx="12" cy="12" r="9" />,
    <rect key="r" x="3" y="3" width="18" height="18" rx="5" />,
    <path key="t" d="M12 3 21 20H3z" />,
    <path key="w" d="M2 15c3 0 3-6 6-6s3 6 6 6 3-6 6-6" fill="none" strokeWidth="3" />,
    <path key="d" d="M12 2 22 12 12 22 2 12z" />,
  ];
  return (
    <svg viewBox="0 0 24 24" className="size-6 fill-current stroke-current" aria-hidden>
      {shapes[index % shapes.length]}
    </svg>
  );
}
