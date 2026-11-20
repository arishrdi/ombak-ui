"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FREE_FEATURES, PRICING_SOURCES, PRO_FEATURES, PRO_PRICE, type PricingSource } from "@/lib/pro";
import { cn } from "@/lib/utils";

function readSource(): PricingSource {
  const from = new URLSearchParams(window.location.search).get("from");
  return PRICING_SOURCES.includes(from as PricingSource) ? (from as PricingSource) : "direct";
}

function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={cn("mt-0.5 size-4 shrink-0", className)}>
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Pricing() {
  const source = useRef<PricingSource>("direct");

  // Count one visit per tab session, tagged with the upgrade prompt that led here.
  useEffect(() => {
    source.current = readSource();
    try {
      const key = `ombak:pro-visit:${source.current}`;
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* storage blocked: still count it */
    }
    fetch("/api/pro-interest", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: "visit", source: source.current }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <section className="surface flex flex-col rounded-3xl p-6 md:p-8">
        <p className="font-mono text-[10.5px] tracking-[0.16em] text-muted-foreground uppercase">Free</p>
        <p className="mt-4 font-display text-5xl font-semibold tracking-[-0.04em]">
          {PRO_PRICE.currency}0
        </p>
        <p className="mt-2 text-sm text-muted-foreground">Everything you need to try it and ship a page.</p>
        <ul className="mt-6 space-y-3 text-[14px]">
          {FREE_FEATURES.map((f) => (
            <li key={f} className="flex gap-2.5">
              <Check className="text-muted-foreground" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <Link href="/generate" className="btn-ghost mt-8 w-full md:mt-auto">
          Start generating
        </Link>
      </section>

      <section className="surface glow-border relative flex flex-col overflow-hidden rounded-3xl p-6 md:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--surf), transparent 70%)" }}
        />
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10.5px] tracking-[0.16em] text-surf uppercase">Pro</p>
          <span className="rounded-full bg-surf/15 px-2 py-0.5 font-mono text-[10px] tracking-wider text-surf uppercase">Coming soon</span>
        </div>
        <p className="mt-4 font-display text-5xl font-semibold tracking-[-0.04em]">
          {PRO_PRICE.currency}
          {PRO_PRICE.amount}
          <span className="ml-1 text-base font-normal tracking-normal text-muted-foreground">/ {PRO_PRICE.period}</span>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">For freelancers and teams shipping client sites.</p>
        <ul className="mt-6 space-y-3 text-[14px]">
          <li className="flex gap-2.5">
            <Check className="text-surf" />
            <span>Everything in Free</span>
          </li>
          {PRO_FEATURES.map((f) => (
            <li key={f.id} className="flex gap-2.5">
              <Check className="text-surf" />
              <span>{f.label}</span>
            </li>
          ))}
        </ul>
        <Waitlist source={source} />
      </section>
    </div>
  );
}

function Waitlist({ source }: { source: React.RefObject<PricingSource> }) {
  const [email, setEmail] = useState("");
  const [wanted, setWanted] = useState<string[]>([]);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  if (state === "done") {
    return (
      <div className="mt-8 rounded-2xl border border-hairline bg-background/60 p-5" role="status">
        <p className="font-medium">You’re on the list.</p>
        <p className="mt-1 text-sm text-muted-foreground">We’ll email you once when Pro opens, with an early-bird price.</p>
      </div>
    );
  }

  return (
    <form
      className="mt-8 space-y-4 border-t border-hairline pt-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setState("sending");
        setError(null);
        const company = (e.currentTarget.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "";
        try {
          const res = await fetch("/api/pro-interest", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ type: "signup", email, features: wanted, source: source.current, company }),
          });
          const body = await res.json().catch(() => null);
          if (!res.ok) throw new Error(body?.error ?? "Couldn’t join the waitlist. Try again.");
          setState("done");
        } catch (err) {
          setError(err instanceof Error ? err.message : "Couldn’t join the waitlist. Try again.");
          setState("idle");
        }
      }}
    >
      <fieldset className="space-y-2">
        <legend className="mb-2 text-[13px] text-muted-foreground">Which would you use most? (optional)</legend>
        <div className="flex flex-wrap gap-1.5">
          {PRO_FEATURES.map((f) => {
            const on = wanted.includes(f.id);
            return (
              <label
                key={f.id}
                className={cn(
                  "cursor-pointer rounded-full border px-3 py-1 text-[12px] transition select-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/50",
                  on ? "border-surf/60 bg-surf/15 text-foreground" : "border-hairline text-muted-foreground hover:text-foreground",
                )}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={on}
                  onChange={() => setWanted((w) => (on ? w.filter((x) => x !== f.id) : [...w, f.id]))}
                />
                {f.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Honeypot: hidden from people, filled by bots. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="waitlist-email" className="sr-only">
          Email
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@studio.com"
          className="h-11 min-w-0 flex-1 rounded-full border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        />
        <button type="submit" disabled={state === "sending"} className="btn-primary shrink-0 disabled:opacity-60">
          {state === "sending" ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      {error && (
        <p className="text-[13px] text-red-400" role="alert">
          {error}
        </p>
      )}
      <p className="text-[12px] text-muted-foreground">One email when Pro opens. No spam.</p>
    </form>
  );
}
