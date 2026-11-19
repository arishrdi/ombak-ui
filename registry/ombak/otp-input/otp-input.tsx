"use client";

import { useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

export type OtpInputProps = {
  /** Number of boxes. Default 6 */
  length?: number;
  /** Called on every change with the current code. */
  onChange?: (code: string) => void;
  /** Called once every box is filled. */
  onComplete?: (code: string) => void;
  /** Only accept digits. Default true */
  numeric?: boolean;
  /** Accessible name for the group. Default "Verification code" */
  label?: string;
  className?: string;
};

/**
 * A one-time-code input: typing moves to the next box, Backspace moves back, arrow keys
 * navigate, and pasting a whole code fills every box. Supports SMS autofill (one-time-code).
 */
export function OtpInput({ length = 6, onChange, onComplete, numeric = true, label = "Verification code", className }: OtpInputProps) {
  const [vals, setVals] = useState<string[]>(() => Array(length).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const commit = (next: string[]) => {
    setVals(next);
    const code = next.join("");
    onChange?.(code);
    if (next.every(Boolean)) onComplete?.(code);
  };
  const clean = (s: string) => (numeric ? s.replace(/\D/g, "") : s.replace(/\s/g, ""));

  const fillFrom = (start: number, text: string) => {
    const chars = clean(text).slice(0, length - start).split("");
    if (!chars.length) return;
    const next = [...vals];
    chars.forEach((c, k) => (next[start + k] = c));
    commit(next);
    refs.current[Math.min(start + chars.length, length - 1)]?.focus();
  };

  const onKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !vals[i] && i > 0) {
      e.preventDefault();
      const next = [...vals];
      next[i - 1] = "";
      commit(next);
      refs.current[i - 1]?.focus();
    } else if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    else if (e.key === "ArrowRight" && i < length - 1) refs.current[i + 1]?.focus();
  };
  const onPaste = (i: number, e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    fillFrom(i, e.clipboardData.getData("text"));
  };

  return (
    <div role="group" aria-label={label} className={cn("flex gap-2", className)}>
      {vals.map((v, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={v}
          inputMode={numeric ? "numeric" : "text"}
          autoComplete={i === 0 ? "one-time-code" : "off"}
          aria-label={`Digit ${i + 1} of ${length}`}
          maxLength={length}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw.length > 1) return fillFrom(i, raw); // autofill or fast typing
            const c = clean(raw);
            const next = [...vals];
            next[i] = c;
            commit(next);
            if (c && i < length - 1) refs.current[i + 1]?.focus();
          }}
          onKeyDown={(e) => onKey(i, e)}
          onPaste={(e) => onPaste(i, e)}
          onFocus={(e) => e.target.select()}
          className={cn(
            "size-12 rounded-xl border bg-background text-center font-mono text-xl font-semibold outline-none transition-all",
            "focus:border-primary focus:ring-4 focus:ring-primary/15",
            v && "border-primary/60 [animation:ombak-otp-pop_.2s_ease-out] motion-reduce:animate-none",
          )}
        />
      ))}
      <style>{`@keyframes ombak-otp-pop{50%{transform:scale(1.08)}}`}</style>
    </div>
  );
}
