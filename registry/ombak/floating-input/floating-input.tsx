"use client";

import { useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type FloatingInputProps = {
  /** The label. It sits inside the field and floats up when focused or filled. */
  label: string;
  /** Helper or error text under the field. */
  hint?: string;
  /** Show the hint as an error and mark the field invalid. Default false */
  error?: boolean;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "placeholder">;

/**
 * A text field whose label rests inside it and floats up when you focus or type. Pure CSS
 * (peer-placeholder-shown), with a real label, aria-invalid and aria-describedby wiring.
 */
export function FloatingInput({ label, hint, error = false, className, id, ...rest }: FloatingInputProps) {
  const auto = useId();
  const inputId = id ?? auto;
  const hintId = hint ? `${inputId}-hint` : undefined;
  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <input
          id={inputId}
          placeholder=" "
          aria-invalid={error || undefined}
          aria-describedby={hintId}
          className={cn(
            "peer h-14 w-full rounded-xl border bg-background px-4 pt-5 pb-1.5 text-sm outline-none transition-colors",
            "focus:border-primary focus:ring-4 focus:ring-primary/15",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/15",
          )}
          {...rest}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "pointer-events-none absolute top-1/2 left-4 origin-left -translate-y-1/2 text-sm text-muted-foreground transition-all duration-200",
            "peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs",
            "peer-focus:text-primary",
            error && "peer-focus:text-red-500",
          )}
        >
          {label}
        </label>
      </div>
      {hint && (
        <p id={hintId} className={cn("mt-1.5 px-1 text-xs", error ? "text-red-500" : "text-muted-foreground")}>
          {hint}
        </p>
      )}
    </div>
  );
}
