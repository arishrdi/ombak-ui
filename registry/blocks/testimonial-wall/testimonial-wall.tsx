"use client";

import { Marquee } from "@/registry/ombak/marquee/marquee";
import { StarRating } from "@/registry/ombak/star-rating/star-rating";
import { cn } from "@/lib/utils";

export type Testimonial = { quote: string; name: string; role: string; rating?: number };

export type TestimonialWallProps = {
  eyebrow?: string;
  title?: string;
  /** Split across two rows that drift in opposite directions. */
  testimonials?: Testimonial[];
  className?: string;
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { quote: "We swapped our hero for the wave background and time on page went up the same week.", name: "Dewi Lestari", role: "Design lead, Arus" },
  { quote: "The code is small enough to read in one sitting. We changed three lines and it matched our brand.", name: "Rafi Pratama", role: "Frontend engineer" },
  { quote: "Finally, motion components that respect reduced-motion without me asking.", name: "Maya Chen", role: "Accessibility consultant" },
  { quote: "Clients ask how we made it feel so smooth. I just send them the docs.", name: "Bima Saputra", role: "Founder, Studio Teluk" },
  { quote: "Installed with one command, themed by our tokens, shipped before lunch.", name: "Laura Gómez", role: "Product engineer" },
  { quote: "The magnetic button alone doubled clicks on our signup CTA.", name: "Ardi Nugroho", role: "Growth, Karang" },
];

/** Two rows of review cards drifting in opposite directions; hover to pause and read. */
export function TestimonialWall({
  eyebrow = "Loved by builders",
  title = "Don't take our word for it.",
  testimonials = DEFAULT_TESTIMONIALS,
  className,
}: TestimonialWallProps) {
  const half = Math.ceil(testimonials.length / 2);
  const rows = [testimonials.slice(0, half), testimonials.slice(half)];

  return (
    <section className={cn("overflow-hidden bg-background py-20 md:py-28", className)}>
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">{eyebrow}</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{title}</h2>
      </div>
      <div className="mt-14 space-y-4">
        {rows.map((row, r) => (
          <Marquee key={r} speed={28} direction={r % 2 ? "right" : "left"} pauseOnHover fade gap="1rem">
            {row.map((t) => (
              <figure key={t.name} className="w-[320px] shrink-0 rounded-2xl border bg-card p-6 text-card-foreground shadow-sm md:w-[380px]">
                <StarRating label={`${t.rating ?? 5} out of 5 stars`} value={t.rating ?? 5} readOnly size={14} />
                <blockquote className="mt-4 text-[15px] leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-primary/30 to-primary/5 text-xs font-semibold">
                    {t.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
