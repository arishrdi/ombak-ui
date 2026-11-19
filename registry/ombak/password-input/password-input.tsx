"use client";

import { useId, useState, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type PasswordInputProps = {
  /** Field label. Default "Password" */
  label?: string;
  /** Show the strength meter and checklist. Default true */
  showStrength?: boolean;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type">;

const RULES: Array<[string, (v: string) => boolean]> = [
  ["8+ characters", (v) => v.length >= 8],
  ["Upper and lower case", (v) => /[a-z]/.test(v) && /[A-Z]/.test(v)],
  ["A number", (v) => /\d/.test(v)],
  ["A symbol", (v) => /[^A-Za-z0-9]/.test(v)],
];
const LEVELS = [
  { label: "Too weak", color: "#ef4444" },
  { label: "Weak", color: "#f97316" },
  { label: "Fair", color: "#eab308" },
  { label: "Good", color: "#22c55e" },
  { label: "Strong", color: "#10b981" },
];

/**
 * A password field with a show/hide toggle and a strength meter that fills as rules are met.
 * The strength is announced politely to screen readers. It's a hint, not a security policy.
 */
export function PasswordInput({ label = "Password", showStrength = true, className, id, value, defaultValue, onChange, ...rest }: PasswordInputProps) {
  const auto = useId();
  const inputId = id ?? auto;
  const [shown, setShown] = useState(false);
  const [inner, setInner] = useState(String(defaultValue ?? ""));
  const v = value !== undefined ? String(value) : inner;
  const passed = RULES.filter(([, test]) => test(v)).length;
  const level = v ? LEVELS[passed] : null;

  return (
    <div className={cn("w-full max-w-sm", className)}>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={shown ? "text" : "password"}
          value={v}
          onChange={(e) => {
            if (value === undefined) setInner(e.target.value);
            onChange?.(e);
          }}
          aria-describedby={showStrength ? `${inputId}-strength` : undefined}
          className="h-11 w-full rounded-xl border bg-background pr-12 pl-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
          {...rest}
        />
        <button
          type="button"
          onClick={() => setShown((s) => !s)}
          aria-label={shown ? "Hide password" : "Show password"}
          aria-pressed={shown}
          className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
            <circle cx="12" cy="12" r="3" />
            <path d="M4 20 20 4" className={cn("transition-opacity", shown ? "opacity-0" : "opacity-100")} />
          </svg>
        </button>
      </div>
      {showStrength && (
        <div id={`${inputId}-strength`} className="mt-3 space-y-2.5">
          <div className="flex gap-1.5" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full origin-left transition-transform duration-500 ease-out"
                  style={{ background: level?.color, transform: `scaleX(${i < passed ? 1 : 0})` }}
                />
              </span>
            ))}
          </div>
          <p className="text-xs font-medium" aria-live="polite" style={{ color: level?.color }}>
            {level ? `Strength: ${level.label}` : ""}
          </p>
          <ul className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
            {RULES.map(([text, test]) => {
              const ok = test(v);
              return (
                <li key={text} className={cn("flex items-center gap-1.5 transition-colors", ok && "text-foreground")}>
                  <span className={cn("grid size-3.5 place-items-center rounded-full border transition-colors", ok && "border-emerald-500 bg-emerald-500 text-white")}>
                    {ok && (
                      <svg viewBox="0 0 24 24" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.5l4.5 4.5L19 7" /></svg>
                    )}
                  </span>
                  {text}
                  <span className="sr-only">{ok ? " (met)" : " (not met)"}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
