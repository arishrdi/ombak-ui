"use client";

import { useRef, useState, type ReactNode } from "react";
import { FloatingInput } from "@/registry/ombak/floating-input/floating-input";
import { SegmentedControl } from "@/registry/ombak/segmented-control/segmented-control";
import { StatusButton } from "@/registry/ombak/status-button/status-button";
import { StatusDot } from "@/registry/ombak/status-dot/status-dot";
import { cn } from "@/lib/utils";

export type ContactData = { name: string; email: string; company: string; budget: string; message: string };

export type ContactFormProps = {
  eyebrow?: string;
  title?: string;
  description?: ReactNode;
  /** Budget options for the segmented control. Pass [] to hide it. */
  budgets?: string[];
  /** Other ways to reach you, shown under the intro. */
  channels?: { label: string; value: string; href: string }[];
  /** Called with the form values. Resolve for success; throw to show an error. */
  onSubmit?: (data: ContactData) => Promise<unknown> | unknown;
  className?: string;
};

const DEFAULT_CHANNELS = [
  { label: "Email", value: "hello@lautan.dev", href: "mailto:hello@lautan.dev" },
  { label: "Office", value: "Jl. Pantai Indah 12, Bali", href: "#" },
];

/**
 * A two-column contact section: intro, availability and channels on the left; a form with
 * floating labels, a budget switch and a submit button that shows progress on the right.
 */
export function ContactForm({
  eyebrow = "Contact",
  title = "Let's build something that moves.",
  description = "Tell us about your project. We reply within one working day.",
  budgets = ["< $5k", "$5–15k", "$15–50k", "$50k+"],
  channels = DEFAULT_CHANNELS,
  onSubmit,
  className,
}: ContactFormProps) {
  const form = useRef<HTMLFormElement>(null);
  const [budget, setBudget] = useState(budgets[1] ?? budgets[0] ?? "");

  const send = async () => {
    const el = form.current;
    if (!el || !el.reportValidity()) throw new Error("Invalid form");
    const f = new FormData(el);
    const data: ContactData = {
      name: String(f.get("name") ?? ""),
      email: String(f.get("email") ?? ""),
      company: String(f.get("company") ?? ""),
      message: String(f.get("message") ?? ""),
      budget,
    };
    await (onSubmit ? onSubmit(data) : new Promise((r) => setTimeout(r, 1200)));
    el.reset();
  };

  return (
    <section className={cn("bg-background px-6 py-20 md:py-28", className)}>
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">{eyebrow}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{title}</h2>
          <p className="mt-4 max-w-sm text-muted-foreground">{description}</p>
          <p className="mt-8 inline-flex items-center gap-2.5 rounded-full border bg-card px-3.5 py-1.5 text-sm">
            <StatusDot status="online" size={8} />
            Booking projects for next month
          </p>
          <dl className="mt-10 space-y-5">
            {channels.map((c) => (
              <div key={c.label}>
                <dt className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">{c.label}</dt>
                <dd className="mt-1">
                  <a href={c.href} className="font-medium underline-offset-4 hover:underline">
                    {c.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <form
          ref={form}
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4 rounded-3xl border bg-card p-6 text-card-foreground shadow-sm md:p-8"
          aria-label="Contact form"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FloatingInput label="Your name" name="name" autoComplete="name" required />
            <FloatingInput label="Email" name="email" type="email" autoComplete="email" required />
          </div>
          <FloatingInput label="Company (optional)" name="company" autoComplete="organization" />
          {budgets.length > 0 && (
            <div className="space-y-2 pt-1">
              <p className="px-1 text-xs text-muted-foreground">Budget</p>
              <SegmentedControl label="Budget" options={budgets} value={budget} onChange={setBudget} className="flex w-full [&>button]:min-w-0 [&>button]:flex-1 [&>button]:px-2" />
            </div>
          )}
          <label className="block">
            <span className="sr-only">Project details</span>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="What are you building?"
              className="w-full resize-none rounded-xl border bg-background px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/15"
            />
          </label>
          <StatusButton onAction={send} successLabel="Message sent" errorLabel="Check the form" width="100%" className="h-12 rounded-xl">
            Send message
          </StatusButton>
        </form>
      </div>
    </section>
  );
}
