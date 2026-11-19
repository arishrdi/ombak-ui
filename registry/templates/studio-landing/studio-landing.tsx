"use client";

import type { CSSProperties } from "react";
import { NavbarFloating } from "@/registry/blocks/navbar-floating/navbar-floating";
import { StatsBand } from "@/registry/blocks/stats-band/stats-band";
import { TestimonialWall } from "@/registry/blocks/testimonial-wall/testimonial-wall";
import { ContactForm } from "@/registry/blocks/contact-form/contact-form";
import { FooterWave } from "@/registry/blocks/footer-wave/footer-wave";
import { TextReveal } from "@/registry/ombak/text-reveal/text-reveal";
import { RotatingWords } from "@/registry/ombak/rotating-words/rotating-words";
import { OrbitText } from "@/registry/ombak/orbit-text/orbit-text";
import { CurvedMarquee } from "@/registry/ombak/curved-marquee/curved-marquee";
import { HoverPreview } from "@/registry/ombak/hover-preview/hover-preview";
import { WaveCard } from "@/registry/ombak/wave-card/wave-card";
import { cn } from "@/lib/utils";

export type StudioLandingProps = {
  /** Accent color for buttons, highlights and focus rings. */
  accent?: string;
  className?: string;
};

/** Placeholder artwork as an inline SVG, so the page works before you add real project images. */
function art(from: string, to: string, shape: number) {
  const shapes = [
    `<circle cx='420' cy='300' r='170' fill='${to}' opacity='.85'/>`,
    `<rect x='230' y='120' width='340' height='340' rx='60' fill='${to}' opacity='.85' transform='rotate(12 400 290)'/>`,
    `<path d='M0 420 C 160 300 280 520 440 380 S 700 300 800 360 V600 H0Z' fill='${to}' opacity='.85'/>`,
    `<path d='M400 90 L640 500 H160Z' fill='${to}' opacity='.85'/>`,
  ];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><rect width='800' height='600' fill='${from}'/>${shapes[shape % shapes.length]}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const WORK = [
  { title: "Selat Coffee", meta: "Brand & web · 2026", image: art("#1e293b", "#f97362", 0) },
  { title: "Arus Bank", meta: "Product design · 2026", image: art("#0f172a", "#38bdf8", 1) },
  { title: "Teluk Festival", meta: "Campaign site · 2025", image: art("#3b0764", "#fbbf24", 2) },
  { title: "Muara Health", meta: "Web app · 2025", image: art("#052e2b", "#5eead4", 3) },
  { title: "Pasang Records", meta: "Identity · 2024", image: art("#1c1917", "#fb7185", 0) },
];

const SERVICES = [
  {
    title: "Brand identity",
    description: "Names, logos and visual systems that hold up from favicon to billboard.",
    colors: ["#f97362", "#fb923c", "#fdba74"],
  },
  {
    title: "Websites",
    description: "Fast marketing sites with motion that guides, not distracts.",
    colors: ["#0ea5e9", "#38bdf8", "#7dd3fc"],
  },
  {
    title: "Product design",
    description: "Interfaces for web and mobile apps, from first sketch to design system.",
    colors: ["#14b8a6", "#2dd4bf", "#99f6e4"],
  },
];

/**
 * A portfolio landing page for a creative studio: oversized rotating headline, curved services
 * marquee, a hover-preview work list, service cards that fill with water, numbers,
 * testimonials, a contact form and a footer.
 */
export function StudioLanding({ accent = "#f97362", className }: StudioLandingProps) {
  const theme = { "--primary": accent, "--primary-foreground": "#ffffff", "--ring": accent } as CSSProperties;

  return (
    <div style={theme} className={cn("min-h-screen bg-background text-foreground", className)}>
      <NavbarFloating
        brand={<span className="text-lg font-semibold tracking-[-0.04em]">Karang®</span>}
        links={[
          { label: "Work", href: "#work" },
          { label: "Services", href: "#services" },
          { label: "Studio", href: "#studio" },
          { label: "Contact", href: "#contact" },
        ]}
        cta={{ label: "Start a project", href: "#contact" }}
      />

      <main>
        {/* hero */}
        <section className="relative px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="mx-auto max-w-6xl">
            <p className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
              <span>Independent design studio</span>
              <span>Bali · Remote</span>
            </p>
            <h1 className="mt-8 text-[clamp(2.75rem,8.5vw,7.5rem)] leading-[0.92] font-semibold tracking-[-0.05em]">
              <TextReveal as="span" split="words" trigger="load" className="block">
                We design websites
              </TextReveal>
              <span className="block">
                that <RotatingWords words={["move.", "convert.", "feel alive.", "last."]} className="text-primary" />
              </span>
            </h1>
            <div className="mt-12 flex flex-wrap items-end justify-between gap-10">
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                Karang is a small team of designers and engineers. We build brands and sites for companies that care
                about the details.
              </p>
              <a href="#contact" aria-label="Start a project" className="rounded-full outline-none focus-visible:ring-4 focus-visible:ring-ring/40">
                <OrbitText text="Available for projects • Available for projects • " size={150} className="text-muted-foreground">
                  <span className="grid size-16 place-items-center rounded-full bg-primary text-2xl text-primary-foreground">↘</span>
                </OrbitText>
              </a>
            </div>
          </div>
        </section>

        <div className="overflow-hidden border-y py-4 text-muted-foreground">
          <CurvedMarquee text="Brand identity ✦ Websites ✦ Product design ✦ Motion ✦ Art direction ✦ " curve={30} fontSize={36} />
        </div>

        {/* work */}
        <section id="work" className="scroll-mt-20 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Selected work</h2>
              <p className="text-sm text-muted-foreground">Hover a project to preview it.</p>
            </div>
            <HoverPreview items={WORK} className="mt-10" />
          </div>
        </section>

        {/* services */}
        <section id="services" className="scroll-mt-20 border-t px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">Services</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Three things, done properly.</h2>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {SERVICES.map((s, i) => (
                <WaveCard key={s.title} colors={s.colors} level={0.3} className="h-72 rounded-2xl">
                  <div className="flex h-full flex-col p-7">
                    <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                    <h3 className="mt-auto text-2xl font-semibold tracking-[-0.03em]">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                  </div>
                </WaveCard>
              ))}
            </div>
          </div>
        </section>

        <div id="studio" className="scroll-mt-20">
          <StatsBand
            eyebrow="The studio"
            title="Eight years, one small team."
            className="border-t"
            stats={[
              { value: 120, suffix: "+", label: "projects shipped" },
              { value: 14, label: "design awards" },
              { value: 9, label: "people, all senior" },
              { value: 96, suffix: "%", label: "clients who come back" },
            ]}
          />
        </div>

        <TestimonialWall
          eyebrow="Kind words"
          title="Clients, in their own words."
          className="border-t"
          testimonials={[
            { quote: "Karang got our brand in one workshop. The site launched a week early.", name: "Nadia Putri", role: "Founder, Selat Coffee" },
            { quote: "The most careful team we've worked with. Every hover state was considered.", name: "Tomás Rivera", role: "Head of product, Arus" },
            { quote: "Ticket sales doubled after the festival site went live.", name: "Wayan Sudira", role: "Director, Teluk Festival" },
            { quote: "They pushed back on the right things and made the whole thing better.", name: "Hana Kim", role: "CMO, Muara Health" },
          ]}
        />

        <div id="contact" className="scroll-mt-20">
          <ContactForm
            eyebrow="New project"
            title="Tell us what you're making."
            description="We take on four projects a quarter. Share a few details and we'll reply within a day."
            className="border-t"
            channels={[
              { label: "Email", value: "studio@karang.design", href: "mailto:studio@karang.design" },
              { label: "Studio", value: "Jl. Kayu Aya 8, Seminyak, Bali", href: "#" },
            ]}
          />
        </div>
      </main>

      <FooterWave
        brand="Karang"
        tagline="Independent design studio in Bali, working worldwide."
        copyright="© Karang Studio. All rights reserved."
        status="Booking from next month"
        columns={[
          { title: "Studio", links: [{ label: "Work", href: "#work" }, { label: "Services", href: "#services" }, { label: "Contact", href: "#contact" }] },
          { title: "Social", links: [{ label: "Instagram", href: "#" }, { label: "Dribbble", href: "#" }, { label: "LinkedIn", href: "#" }] },
          { title: "Legal", links: [{ label: "Privacy", href: "#" }, { label: "Imprint", href: "#" }] },
        ]}
      />
    </div>
  );
}
