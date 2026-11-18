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
import { cardItems } from "@/lib/nav";
import { registryUrl, site } from "@/lib/site";

const HERO_WAVES = ["#173a8a", "#0e7fbf", "#19b5c4", "#5ef0c8"];

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
        className="bg-[#06121f] text-white"
        colors={HERO_WAVES}
        baseline={0.9}
        amplitude={0.06}
        blur={3}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(60%_50%_at_70%_10%,rgba(94,240,200,.16),transparent_70%),radial-gradient(50%_60%_at_0%_30%,rgba(23,58,138,.45),transparent_70%)]"
        />
        <div className="mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-7xl flex-col px-4 pt-[12vh] pb-[24vh] md:px-6">
          <Link
            href="/docs/components"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1 pr-3 pl-1 text-xs text-white/80 backdrop-blur transition hover:border-white/30"
          >
            <span className="rounded-full bg-surf px-2 py-0.5 font-medium text-[#06121f]">New</span>
            {cards.length} free components are live →
          </Link>

          <TextReveal
            as="h1"
            split="words"
            trigger="load"
            stagger={0.06}
            className="mt-7 max-w-5xl font-display text-[clamp(3rem,8.5vw,7.5rem)] leading-[0.92] font-bold tracking-[-0.04em]"
          >
            Make your website move like water.
          </TextReveal>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
            Ombak UI is a free library of motion components for React: scroll effects, text animations and interactive
            details. Paste them into any shadcn project.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <MagneticButton as="a" href="/docs/components" className="bg-surf px-8 text-[#06121f]">
              Browse components →
            </MagneticButton>
            <Link href="/docs/installation" className="group/roll text-sm font-medium text-white">
              <RollingText text="Read the docs" />
            </Link>
          </div>

          <div className="mt-12 flex w-full max-w-xl items-center gap-3 rounded-xl border border-white/10 bg-black/30 py-2 pr-2 pl-4 font-mono text-[13px] text-white/80 backdrop-blur">
            <span className="text-surf">$</span>
            <span className="min-w-0 flex-1 truncate">{installCmd}</span>
            <CopyButton value={installCmd} className="border-white/15 bg-white/5 text-white/70 hover:text-white" />
          </div>
        </div>
      </WaveBackground>

      {/* ---------- marquee band ---------- */}
      <div className="border-b bg-background py-5">
        <Marquee speed={45}>
          {cards.map((c) => (
            <span key={c.name} className="flex items-center gap-12 font-display text-2xl font-semibold tracking-tight text-muted-foreground md:text-3xl">
              {c.title}
              <span className="text-surf">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ---------- stats ---------- */}
      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-20 md:grid-cols-4 md:px-6">
        {[
          { value: cards.length, label: "free components, more every week" },
          { value: 1, label: "command to install any of them" },
          { value: 100, suffix: "%", label: "of the source in your repo" },
          { value: 0, prefix: "$", label: "to use, even commercially" },
        ].map((s) => (
          <div key={s.label} className="border-t pt-5">
            <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} duration={1.6} className="font-display text-5xl font-bold tracking-tight" />
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </section>

      {/* ---------- bento ---------- */}
      <section id="components" className="mx-auto max-w-7xl px-4 pb-28 md:px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-surf">The first wave</p>
            <TextReveal as="h2" className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight md:text-6xl">
              Hover anything. It all moves.
            </TextReveal>
          </div>
          <Link href="/docs/components" className="group/roll text-sm font-medium">
            <RollingText text="See all components →" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-6">
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
        </div>
      </section>

      {/* ---------- how it works ---------- */}
      <section className="border-y bg-muted/20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 md:grid-cols-[1fr_1.4fr] md:px-6 [&>*]:min-w-0">
          <div>
            <p className="text-sm font-medium text-surf">How it works</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">Copy, paste, ride.</h2>
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
                <span className="grid size-8 shrink-0 place-items-center rounded-full border font-mono text-sm">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{t}</h3>
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
        <TextReveal as="h2" className="max-w-3xl font-display text-4xl font-bold tracking-tight md:text-5xl">
          Pretty on the surface, careful underneath.
        </TextReveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(([icon, title, desc]) => (
            <div key={title} className="rounded-2xl border bg-card p-6">
              <span className="grid size-10 place-items-center rounded-xl bg-surf/15 text-surf">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icon} />
                </svg>
              </span>
              <h3 className="mt-5 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- final CTA ---------- */}
      <section className="px-4 pb-24 md:px-6">
        <WaveBackground
          className="mx-auto max-w-7xl rounded-3xl bg-[#06121f] text-white"
          colors={HERO_WAVES}
          baseline={0.92}
          amplitude={0.08}
        >
          <div className="flex flex-col items-center px-6 pt-20 pb-36 text-center">
            <h2 className="max-w-3xl font-display text-4xl font-bold tracking-tight md:text-6xl">Make your next site move.</h2>
            <p className="mt-5 max-w-lg text-white/70">Free, open source, and one command away.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <MagneticButton as="a" href="/docs/installation" className="bg-white text-[#06121f]">
                Get started
              </MagneticButton>
              <MagneticButton as="a" href={site.github} className="border border-white/25 bg-transparent text-white">
                Star on GitHub
              </MagneticButton>
            </div>
          </div>
        </WaveBackground>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="border-t">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 md:grid-cols-4 md:px-6">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">Motion components for React. Made in Indonesia.</p>
          </div>
          <div>
            <p className="text-sm font-medium">Docs</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/docs" className="hover:text-foreground">Introduction</Link></li>
              <li><Link href="/docs/installation" className="hover:text-foreground">Installation</Link></li>
              <li><Link href="/docs/components" className="hover:text-foreground">Components</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium">Resources</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><a href={site.github} className="hover:text-foreground">GitHub</a></li>
              <li><a href="/llms.txt" className="hover:text-foreground">llms.txt</a></li>
              <li><a href="/r/registry.json" className="hover:text-foreground">Registry index</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 border-t px-4 py-6 text-xs text-muted-foreground md:px-6">
          <span>© 2026 Ombak UI</span>
          <span>Free components are MIT licensed.</span>
        </div>
      </footer>
    </main>
  );
}
