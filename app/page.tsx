import Link from "next/link";
import { WaveBackground } from "@/registry/ombak/wave-background/wave-background";
import { TextReveal } from "@/registry/ombak/text-reveal/text-reveal";
import { Marquee } from "@/registry/ombak/marquee/marquee";
import { MagneticButton } from "@/registry/ombak/magnetic-button/magnetic-button";
import { RollingText } from "@/registry/ombak/rolling-text/rolling-text";
import { CountUp } from "@/registry/ombak/count-up/count-up";
import { CodeBlock } from "@/components/site/code-block";
import { CopyButton } from "@/components/site/copy-button";
import { ComponentCard } from "@/components/site/component-card";
import { Logo } from "@/components/site/logo";
import { BlockThumb } from "@/components/site/block-frame";
import { cardItems } from "@/lib/nav";
import { blocks, templateParts, templates } from "@/lib/registry";
import { templateDocs } from "@/content/templates";
import { registryUrl, site } from "@/lib/site";

const HERO_WAVES = ["#0f2a66", "#0b5e91", "#138fa3", "#3fd1b0"];

const FEATURES: Array<[string, string, string]> = [
  ["M4 7h16M4 12h10M4 17h7", "Built for shadcn", "Install with the shadcn CLI. Components land in your codebase and use your theme tokens."],
  ["M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3", "Motion with manners", "Every effect respects prefers-reduced-motion. Hover-only effects switch off on touch screens."],
  ["M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14", "Readable code", "One file per component, typed props, no hidden runtime. Read it, change it, own it."],
  ["M13 2 4 14h7l-1 8 9-12h-7z", "Fast by default", "Animations pause off-screen, canvases cap their pixel ratio, and nothing ships that you didn't add."],
];

export default function Home() {
  const cards = cardItems();
  const byName = Object.fromEntries(cards.map((c) => [c.name, c]));
  const installCmd = `npx shadcn@latest add ${registryUrl("wave-background")}`;

  return (
    <main className="overflow-x-clip">
      {/* ---------- hero ---------- */}
      <WaveBackground
        className="grain bg-[#050c16] text-white"
        colors={HERO_WAVES}
        baseline={0.9}
        amplitude={0.06}
        blur={3}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(50%_40%_at_50%_0%,rgba(94,240,200,.14),transparent_70%),radial-gradient(40%_50%_at_0%_30%,rgba(23,58,138,.35),transparent_70%),radial-gradient(40%_50%_at_100%_40%,rgba(14,127,191,.18),transparent_70%)]"
        />
        <div className="mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-7xl flex-col items-center px-4 pt-[14vh] pb-[26vh] text-center md:px-6">
          <Link
            href="/templates"
            className="group inline-flex w-fit items-center gap-2.5 rounded-full bg-white/[0.04] py-1 pr-3.5 pl-1 text-xs text-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_0_0_1px_rgba(255,255,255,.1)] backdrop-blur-md transition hover:bg-white/[0.07] hover:text-white"
          >
            <span className="rounded-full bg-gradient-to-b from-[#7ff5d6] to-[#3fd1b0] px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-[#04201a] uppercase shadow-[inset_0_1px_0_rgba(255,255,255,.5)]">New</span>
            Templates: whole landing pages in one command
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>

          <TextReveal
            as="h1"
            split="words"
            trigger="load"
            stagger={0.06}
            className="mt-8 max-w-5xl font-display text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-white [text-shadow:0_2px_40px_rgba(94,240,200,.15)]"
          >
            Make your website move like water.
          </TextReveal>

          <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-white/60">
            Ombak UI is a free library of motion components for React: scroll effects, text animations and interactive
            details. Paste them into any shadcn project.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton as="a" href="/docs/components" className="btn-primary px-7">
              Browse components
            </MagneticButton>
            <Link href="/docs/installation" className="btn-ghost group/roll text-white">
              <RollingText text="Read the docs" />
            </Link>
          </div>

          <div className="mt-12 flex w-full max-w-xl items-center gap-3 rounded-2xl bg-black/30 py-2 pr-2 pl-4 text-left font-mono text-[12.5px] text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_0_0_1px_rgba(255,255,255,.08),0_20px_40px_-12px_rgba(0,0,0,.6)] backdrop-blur-xl">
            <span className="text-surf">$</span>
            <span className="min-w-0 flex-1 truncate">{installCmd}</span>
            <CopyButton value={installCmd} className="border-white/10 bg-white/[0.04] text-white/60 hover:text-white" />
          </div>
        </div>
      </WaveBackground>

      {/* ---------- marquee band ---------- */}
      <div className="relative border-b border-hairline bg-background py-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <Marquee speed={45}>
          {cards.map((c) => (
            <span key={c.name} className="flex items-center gap-12 font-serif text-3xl text-muted-foreground/70 italic md:text-4xl">
              {c.title}
              <span className="font-sans text-base text-surf/70 not-italic">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ---------- stats ---------- */}
      <section className="mx-auto grid max-w-7xl grid-cols-2 px-4 py-24 md:grid-cols-4 md:px-6">
        {[
          { value: cards.length, label: "free components, more every week" },
          { value: 1, label: "command to install any of them" },
          { value: 100, suffix: "%", label: "of the source in your repo" },
          { value: 0, prefix: "$", label: "to use, even commercially" },
        ].map((s) => (
          <div key={s.label} className="border-hairline px-2 py-6 text-center md:border-l md:first:border-l-0">
            <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} duration={1.6} className="font-display text-5xl font-semibold tracking-[-0.04em] tabular-nums md:text-6xl" />
            <p className="mx-auto mt-3 max-w-[16ch] text-[13px] leading-snug text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </section>

      {/* ---------- bento ---------- */}
      <section id="components" className="mx-auto max-w-7xl px-4 pb-28 md:px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">The first wave</p>
            <TextReveal as="h2" className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Hover anything. It all moves.
            </TextReveal>
          </div>
          <Link href="/docs/components" className="group/roll surface rounded-full px-4 py-2 text-[13px] font-medium">
            <RollingText text="See all components →" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-6">
          <ComponentCard item={byName["wave-background"]} className="md:col-span-4" tall />
          <ComponentCard item={byName["magnetic-button"]} className="md:col-span-2" tall />
          <ComponentCard item={byName["text-reveal"]} className="md:col-span-2" />
          <ComponentCard item={byName["tilt-card"]} className="md:col-span-2" />
          <ComponentCard item={byName["scramble-text"]} className="md:col-span-2" />
          <ComponentCard item={byName["marquee"]} className="md:col-span-3" />
          <ComponentCard item={byName["rolling-text"]} className="md:col-span-3" />
          <ComponentCard item={byName["count-up"]} className="md:col-span-2" />
          <ComponentCard item={byName["image-reveal"]} className="md:col-span-2" />
          <ComponentCard item={byName["stack-cards"]} className="md:col-span-2" />
          <ComponentCard item={byName["ripple-grid"]} className="md:col-span-3" tall />
          <ComponentCard item={byName["glow-card"]} className="md:col-span-3" tall />
          <ComponentCard item={byName["wave-text"]} className="md:col-span-2" />
          <ComponentCard item={byName["ripple-button"]} className="md:col-span-2" />
          <ComponentCard item={byName["typewriter"]} className="md:col-span-2" />
          <ComponentCard item={byName["caustics"]} className="md:col-span-4" tall />
          <ComponentCard item={byName["swipe-stack"]} className="md:col-span-2" tall />
          <ComponentCard item={byName["split-flap"]} className="md:col-span-3" />
          <ComponentCard item={byName["odometer"]} className="md:col-span-3" />
        </div>
      </section>

      {/* ---------- blocks & templates ---------- */}
      <section className="relative border-t border-hairline">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-80 [background:radial-gradient(50%_100%_at_50%_0%,color-mix(in_oklch,var(--surf)_10%,transparent),transparent)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-28 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="eyebrow">Blocks & templates</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Whole pages, <span className="font-serif font-normal tracking-normal italic">one command.</span>
              </h2>
              <p className="mt-5 max-w-lg text-muted-foreground">
                {blocks.length} ready-made sections and {templates.length} complete landing pages, composed from the
                components above. Install one and everything it uses comes along.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/templates"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background shadow-soft-md transition-transform duration-300 active:scale-[0.98]"
              >
                Browse templates →
              </Link>
              <Link href="/blocks" className="surface inline-flex h-11 items-center rounded-full px-6 text-sm font-medium transition hover:shadow-soft-md">
                See all blocks
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {templates.map((t) => {
              const accent = templateDocs[t.name]?.accent;
              return (
                <Link
                  key={t.name}
                  href={`/templates/${t.name}`}
                  className="surface glow-border group block overflow-hidden rounded-[24px] outline-none transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-soft-lg focus-visible:ring-4 focus-visible:ring-ring/40 motion-reduce:hover:translate-y-0"
                >
                  <div className="m-1.5 mb-0 aspect-[4/5] overflow-hidden rounded-[18px] shadow-[inset_0_0_0_1px_var(--hairline)]">
                    <BlockThumb slug={t.name} title={t.title} fill />
                  </div>
                  <div className="flex items-center justify-between gap-4 px-5 pt-4 pb-5">
                    <div>
                      <h3 className="flex items-center gap-2 font-display text-[15px] font-semibold tracking-[-0.01em]">
                        <span className="size-2 rounded-full" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
                        {t.title}
                      </h3>
                      <p className="mt-1 font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground uppercase">
                        {templateParts(t.name).blocks.length} blocks
                      </p>
                    </div>
                    <span className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="mr-2 font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">Blocks</span>
            {blocks.map((b) => (
              <Link
                key={b.name}
                href={`/blocks/${b.name}`}
                className="rounded-full bg-muted/50 px-3 py-1 text-[13px] text-muted-foreground shadow-[inset_0_0_0_1px_var(--hairline)] transition hover:bg-muted hover:text-foreground"
              >
                {b.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- how it works ---------- */}
      <section className="relative border-y border-hairline bg-muted/25">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 md:grid-cols-[1fr_1.4fr] md:px-6 [&>*]:min-w-0">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
              Copy, paste, <span className="font-serif font-normal tracking-normal italic">ride.</span>
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Ombak isn&apos;t an npm package you depend on. The CLI copies the component into your project, so it&apos;s
              your code from the first second.
            </p>
          </div>
          <ol className="space-y-6">
            {[
              ["Set up shadcn", "Once per project. Skip it if you already use shadcn/ui.", "npx shadcn@latest init"],
              ["Add a component", "It lands in components/, with its dependencies installed.", `npx shadcn@latest add ${registryUrl("marquee")}`],
              ["Use it", "Import it like any other component and make it yours.", `import { Marquee } from "@/components/marquee";`],
            ].map(([t, d, code], i) => (
              <li key={t} className="flex gap-5">
                <span className="surface grid size-8 shrink-0 place-items-center rounded-full font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium tracking-[-0.01em]">{t}</h3>
                  <p className="mt-1 mb-3 text-sm text-muted-foreground">{d}</p>
                  <CodeBlock lang={i === 2 ? "tsx" : "bash"} code={code} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- features ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-28 md:px-6">
        <p className="eyebrow">Craft</p>
        <TextReveal as="h2" className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
          Pretty on the surface, careful underneath.
        </TextReveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(([icon, title, desc]) => (
            <div key={title} className="surface glow-border rounded-[20px] p-6 transition-shadow duration-500 hover:shadow-soft-lg">
              <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-b from-surf/25 to-surf/5 text-surf shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--surf)_30%,transparent)]">
                <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icon} />
                </svg>
              </span>
              <h3 className="mt-6 font-medium tracking-[-0.01em]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- final CTA ---------- */}
      <section className="px-4 pb-24 md:px-6">
        <WaveBackground
          className="grain mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#050c16] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_0_0_1px_rgba(255,255,255,.06),var(--shadow-lg)]"
          colors={HERO_WAVES}
          baseline={0.92}
          amplitude={0.08}
        >
          <div className="flex flex-col items-center px-6 pt-20 pb-36 text-center">
            <h2 className="max-w-3xl font-display text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
              Make your next site <span className="font-serif font-normal tracking-normal italic">move.</span>
            </h2>
            <p className="mt-5 max-w-lg text-white/60">Free, open source, and one command away.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <MagneticButton as="a" href="/docs/installation" className="btn-primary px-7">
                Get started
              </MagneticButton>
              <MagneticButton as="a" href={site.github} className="btn-ghost px-7 text-white">
                Star on GitHub
              </MagneticButton>
            </div>
          </div>
        </WaveBackground>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="relative overflow-hidden border-t border-hairline">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 md:grid-cols-4 md:px-6">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">Motion components for React. <span className="font-serif text-base italic">Made in Indonesia.</span></p>
          </div>
          <div>
            <p className="font-mono text-[10.5px] tracking-[0.16em] text-muted-foreground/70 uppercase">Docs</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/docs" className="hover:text-foreground">Introduction</Link></li>
              <li><Link href="/docs/installation" className="hover:text-foreground">Installation</Link></li>
              <li><Link href="/docs/components" className="hover:text-foreground">Components</Link></li>
              <li><Link href="/blocks" className="hover:text-foreground">Blocks</Link></li>
              <li><Link href="/templates" className="hover:text-foreground">Templates</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10.5px] tracking-[0.16em] text-muted-foreground/70 uppercase">Resources</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><a href={site.github} className="hover:text-foreground">GitHub</a></li>
              <li><a href="/llms.txt" className="hover:text-foreground">llms.txt</a></li>
              <li><a href="/r/registry.json" className="hover:text-foreground">Registry index</a></li>
            </ul>
          </div>
        </div>
        <p
          aria-hidden
          className="pointer-events-none mx-auto max-w-7xl -mb-[0.22em] bg-gradient-to-b from-foreground/[0.07] to-transparent bg-clip-text px-4 text-center font-display text-[22vw] leading-none font-semibold tracking-[-0.06em] text-transparent select-none md:px-6 xl:text-[17rem]"
        >
          ombak
        </p>
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 border-t border-hairline px-4 py-6 text-xs text-muted-foreground md:px-6">
          <span>© 2026 Ombak UI</span>
          <span>Free components are MIT licensed.</span>
        </div>
      </footer>
    </main>
  );
}
