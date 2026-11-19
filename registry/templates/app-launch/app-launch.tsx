"use client";

import { useState, type CSSProperties } from "react";
import { NavbarFloating } from "@/registry/blocks/navbar-floating/navbar-floating";
import { FeatureBento } from "@/registry/blocks/feature-bento/feature-bento";
import { FaqSplit } from "@/registry/blocks/faq-split/faq-split";
import { FooterWave } from "@/registry/blocks/footer-wave/footer-wave";
import { Bubbles } from "@/registry/ombak/bubbles/bubbles";
import { TextReveal } from "@/registry/ombak/text-reveal/text-reveal";
import { Countdown } from "@/registry/ombak/countdown/countdown";
import { FloatingInput } from "@/registry/ombak/floating-input/floating-input";
import { StatusButton } from "@/registry/ombak/status-button/status-button";
import { CountUp } from "@/registry/ombak/count-up/count-up";
import { ScrollWords } from "@/registry/ombak/scroll-words/scroll-words";
import { cn } from "@/lib/utils";

export type AppLaunchProps = {
  /** When the app launches. Drives the countdown. */
  launchDate?: Date | string | number;
  /** People already on the waitlist, shown under the form. */
  waitlistCount?: number;
  /** Called with the email when someone joins. Throw to show an error. */
  onJoin?: (email: string) => Promise<unknown> | unknown;
  /** Accent color for buttons, highlights and focus rings. */
  accent?: string;
  className?: string;
};

/**
 * A pre-launch page for an app: bubbly hero with a countdown and waitlist form, a statement that
 * lights up word by word as you scroll, features, FAQ and a footer.
 */
export function AppLaunch({
  launchDate = "2027-03-01T09:00:00",
  waitlistCount = 2480,
  onJoin,
  accent = "#8b5cf6",
  className,
}: AppLaunchProps) {
  const theme = { "--primary": accent, "--primary-foreground": "#ffffff", "--ring": accent } as CSSProperties;
  const [email, setEmail] = useState("");

  const join = async () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Invalid email");
    await (onJoin ? onJoin(email) : new Promise((r) => setTimeout(r, 1000)));
    setEmail("");
  };

  return (
    <div style={theme} className={cn("min-h-screen bg-background text-foreground", className)}>
      <NavbarFloating
        brand={
          <span className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em]">
            <span className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground">◌</span>
            Riak
          </span>
        }
        links={[
          { label: "Features", href: "#features" },
          { label: "FAQ", href: "#faq" },
        ]}
        cta={{ label: "Join the waitlist", href: "#waitlist" }}
      />

      <main>
        {/* hero */}
        <Bubbles color={accent} count={36} className="border-b text-foreground">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklch,var(--primary)_18%,transparent),transparent_70%)]"
          />
          <section id="waitlist" className="mx-auto flex max-w-3xl scroll-mt-20 flex-col items-center px-6 pt-16 pb-24 text-center md:pt-24 md:pb-32">
            <span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs font-medium backdrop-blur">
              <span className="size-1.5 rounded-full bg-primary" />
              Launching soon on iOS, Android and web
            </span>
            <TextReveal
              as="h1"
              split="words"
              trigger="load"
              className="mt-7 text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] font-semibold tracking-[-0.045em]"
            >
              Notes that drift into place.
            </TextReveal>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Riak quietly sorts your notes, links and voice memos into one calm stream you can actually search.
            </p>

            <Countdown to={launchDate} className="mt-10" tileClassName="bg-background/70 backdrop-blur" />

            <form className="mt-10 flex w-full max-w-md items-start gap-2" onSubmit={(e) => e.preventDefault()} aria-label="Join the waitlist">
              <FloatingInput label="Your email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <StatusButton onAction={join} successLabel="You're in" errorLabel="Check email" width="8.5rem" className="h-14 shrink-0 rounded-xl">
                Join
              </StatusButton>
            </form>
            <p className="mt-4 text-sm text-muted-foreground">
              Join <CountUp value={waitlistCount} suffix="+" className="font-medium text-foreground tabular-nums" /> people already waiting.
            </p>
          </section>
        </Bubbles>

        {/* statement */}
        <section className="px-6 py-24 md:py-36">
          <ScrollWords
            as="p"
            text="Most note apps ask you to organise. Riak listens instead: it groups what belongs together, surfaces what you need, and lets the rest sink out of sight."
            className="mx-auto max-w-4xl text-center text-3xl leading-tight font-semibold tracking-[-0.03em] md:text-5xl"
          />
        </section>

        <div id="features" className="scroll-mt-20">
          <FeatureBento
            eyebrow="Features"
            title="Calm on the surface, clever underneath."
            description="Everything Riak does happens on your device first. Sync is end-to-end encrypted."
            className="border-t"
            features={[
              { title: "Auto-sorting", description: "Notes cluster by topic as you write, no folders needed.", icon: "M4 6h16M7 12h10M10 18h4", span: 4 },
              { title: "Voice memos", description: "Speak; Riak transcribes and files it.", icon: "M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3", span: 2 },
              { title: "Instant search", description: "Find anything by meaning, not just keywords.", icon: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-3.5-3.5", span: 2 },
              { title: "Private by design", description: "On-device processing and end-to-end encrypted sync.", icon: "M6 10V8a6 6 0 1 1 12 0v2M5 10h14v10H5z", span: 2 },
              { title: "Everywhere", description: "iOS, Android, web and a tiny menu-bar app.", icon: "M4 5h16v10H4zM2 19h20", span: 2 },
            ]}
          />
        </div>

        <div id="faq" className="scroll-mt-20">
          <FaqSplit
            className="border-t"
            title="Before you join."
            faqs={[
              { question: "When does Riak launch?", answer: "The countdown above is our public launch. Waitlist members get access two weeks earlier." },
              { question: "How much will it cost?", answer: "Free for personal use. A Pro plan with unlimited voice memos will be $6 a month." },
              { question: "Can I import my notes?", answer: "Yes: Apple Notes, Notion, Obsidian and plain Markdown on day one." },
              { question: "Where is my data stored?", answer: "On your devices. Sync goes through our servers end-to-end encrypted, so we can't read it." },
            ]}
          />
        </div>
      </main>

      <FooterWave
        brand="Riak"
        tagline="Notes that drift into place."
        copyright="© Riak Labs. All rights reserved."
        status={null}
        columns={[
          { title: "Product", links: [{ label: "Features", href: "#features" }, { label: "Waitlist", href: "#waitlist" }, { label: "FAQ", href: "#faq" }] },
          { title: "Company", links: [{ label: "About", href: "#" }, { label: "Press kit", href: "#" }] },
          { title: "Legal", links: [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }] },
        ]}
      />
    </div>
  );
}
