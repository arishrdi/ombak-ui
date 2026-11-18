import Link from "next/link";
import { WaveBackground } from "@/registry/ombak/wave-background/wave-background";
import { TextReveal } from "@/registry/ombak/text-reveal/text-reveal";
import { Marquee } from "@/registry/ombak/marquee/marquee";
import { MagneticButton } from "@/registry/ombak/magnetic-button/magnetic-button";
import { RollingText } from "@/registry/ombak/rolling-text/rolling-text";
import { CodeBlock } from "@/components/site/code-block";
import { CATEGORY_LABELS, items } from "@/lib/registry";
import { registryUrl } from "@/lib/site";

const FEATURES = [
  ["Built for shadcn", "Install any component with the shadcn CLI. It lands in your codebase, styled with your theme tokens."],
  ["Motion with manners", "Every effect respects prefers-reduced-motion, and hover effects switch off on touch screens."],
  ["Yours to change", "No package to update and no black box. Copy the file, read it, tweak it."],
];

export default function Home() {
  return (
    <main>
      {/* hero */}
      <WaveBackground
        className="flex min-h-[calc(100svh-3.5rem)] items-start bg-[#06121f]"
        colors={["#173a8a", "#0e7fbf", "#19b5c4", "#5ef0c8"]}
        baseline={0.88}
        amplitude={0.07}
        blur={3}
      >
        <div className="mx-auto w-full max-w-7xl px-4 pt-[14vh] md:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
            <span className="size-1.5 rounded-full bg-surf" /> {items.length} free components · MIT
          </span>
          <TextReveal
            as="h1"
            split="words"
            trigger="load"
            stagger={0.06}
            className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] font-bold tracking-tight text-white sm:text-6xl md:text-8xl"
          >
            Motion components that make your site move.
          </TextReveal>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            Scroll, GSAP and canvas effects for React. Paste them into any shadcn project and make them your own.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton as="a" href="/docs/components/wave-background" className="bg-surf text-[#06121f]">
              Browse components →
            </MagneticButton>
            <Link href="/docs/installation" className="group/roll text-sm font-medium text-white/85">
              <RollingText text="Get started" />
            </Link>
          </div>
        </div>
      </WaveBackground>

      {/* marquee band */}
      <div className="border-y py-6">
        <Marquee speed={50}>
          {items.map((i) => (
            <span key={i.name} className="flex items-center gap-12 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {i.title}
              <span className="text-surf">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* components grid */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <TextReveal as="h2" className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            The first wave
          </TextReveal>
          <p className="max-w-md text-muted-foreground">Ten components to start with, more every week.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.name}
              href={`/docs/components/${item.name}`}
              className="group relative overflow-hidden rounded-xl border bg-card p-6 transition hover:border-surf/50"
            >
              <span className="text-xs font-medium tracking-wide text-surf uppercase">
                {CATEGORY_LABELS[item.categories?.[0] ?? ""] ?? ""}
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              <span className="mt-6 inline-block text-sm font-medium transition group-hover:translate-x-1">View →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* install + features */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 pb-28 md:grid-cols-2 md:px-6 [&>*]:min-w-0">
        <div>
          <h2 className="font-display text-4xl font-bold tracking-tight">One command away.</h2>
          <p className="mt-4 text-muted-foreground">Already using shadcn/ui? Add any component straight from the registry.</p>
          <CodeBlock lang="bash" className="mt-6" code={`npx shadcn@latest add ${registryUrl("wave-background")}`} />
        </div>
        <div className="space-y-6">
          {FEATURES.map(([t, d]) => (
            <div key={t} className="border-t pt-5">
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-4 py-8 text-sm text-muted-foreground md:px-6">
          <span>Ombak UI · Made in Indonesia 🌊</span>
          <span>Free components are MIT licensed.</span>
        </div>
      </footer>
    </main>
  );
}
