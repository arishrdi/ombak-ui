"use client";

import { useState } from "react";
import { SegmentedControl } from "@/registry/ombak/segmented-control/segmented-control";
import { BorderBeam } from "@/registry/ombak/border-beam/border-beam";
import { FillButton } from "@/registry/ombak/fill-button/fill-button";
import { cn } from "@/lib/utils";

export type Plan = {
  name: string;
  description: string;
  /** Price per month when billed monthly. */
  monthly: number;
  /** Price per month when billed yearly. */
  yearly: number;
  features: string[];
  cta: string;
  /** The highlighted plan gets a travelling border beam. */
  featured?: boolean;
};

export type PricingTiersProps = {
  eyebrow?: string;
  title?: string;
  plans?: Plan[];
  /** Currency symbol shown before prices. */
  currency?: string;
  /** Called with the plan name when a button is pressed. */
  onSelect?: (plan: string) => void;
  className?: string;
};

const DEFAULT_PLANS: Plan[] = [
  {
    name: "Starter",
    description: "For side projects and personal sites.",
    monthly: 0,
    yearly: 0,
    features: ["All free components", "Community support", "MIT license"],
    cta: "Start free",
  },
  {
    name: "Pro",
    description: "For freelancers shipping client work.",
    monthly: 24,
    yearly: 19,
    features: ["Everything in Starter", "Premium blocks and templates", "Figma kit", "Priority email support"],
    cta: "Go Pro",
    featured: true,
  },
  {
    name: "Team",
    description: "For studios and product teams.",
    monthly: 79,
    yearly: 64,
    features: ["Everything in Pro", "Up to 10 seats", "Private Discord channel", "Custom component requests"],
    cta: "Contact sales",
  },
];

/** Three pricing tiers with a monthly/yearly switch; the featured plan is wrapped in a border beam. */
export function PricingTiers({
  eyebrow = "Pricing",
  title = "Simple plans that scale with you.",
  plans = DEFAULT_PLANS,
  currency = "$",
  onSelect,
  className,
}: PricingTiersProps) {
  const [billing, setBilling] = useState("Yearly");
  const yearly = billing === "Yearly";

  return (
    <section className={cn("bg-background px-6 py-20 md:py-28", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">{eyebrow}</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{title}</h2>
          <div className="mt-8 flex items-center gap-3">
            <SegmentedControl label="Billing period" options={["Monthly", "Yearly"]} value={billing} onChange={setBilling} />
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">Save 20%</span>
          </div>
        </div>

        <div className="mt-14 grid items-stretch gap-4 md:grid-cols-3">
          {plans.map((plan) => {
            const price = yearly ? plan.yearly : plan.monthly;
            const body = (
              <div className="flex h-full flex-col p-7">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{plan.name}</h3>
                  {plan.featured && (
                    <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-medium text-primary-foreground">Popular</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                <p className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-semibold tracking-[-0.04em] tabular-nums">
                    {currency}
                    {price}
                  </span>
                  <span className="text-sm text-muted-foreground">/ month</span>
                </p>
                <p className="mt-1 h-5 text-xs text-muted-foreground">{yearly && price > 0 ? "billed yearly" : ""}</p>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="m3.5 8.5 3 3 6-7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <FillButton className="mt-8 w-full" onClick={() => onSelect?.(plan.name)}>
                  {plan.cta}
                </FillButton>
              </div>
            );
            return plan.featured ? (
              <BorderBeam key={plan.name} className="rounded-2xl shadow-xl shadow-primary/10 md:-my-3">
                {body}
              </BorderBeam>
            ) : (
              <div key={plan.name} className="rounded-2xl border bg-card text-card-foreground">
                {body}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
