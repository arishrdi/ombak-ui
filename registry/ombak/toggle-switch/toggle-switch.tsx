"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ToggleSwitchProps = {
  /** On/off (controlled). */
  checked?: boolean;
  /** Starting state when uncontrolled. Default false */
  defaultChecked?: boolean;
  /** Called with the new state. */
  onChange?: (checked: boolean) => void;
  /** Visible label next to the switch. */
  children?: ReactNode;
  /** Accessible name when there's no visible label. */
  label?: string;
  /** Switch size. Default "md" */
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
};

const SIZES = { sm: [36, 20], md: [46, 26], lg: [58, 32] } as const;

/**
 * A switch whose knob springs across with a little overshoot, with role="switch" and aria-checked.
 * Space and Enter toggle it; the whole label is clickable.
 */
export function ToggleSwitch({ checked, defaultChecked = false, onChange, children, label, size = "md", disabled, className }: ToggleSwitchProps) {
  const [inner, setInner] = useState(defaultChecked);
  const on = checked ?? inner;
  const [w, h] = SIZES[size];
  const knob = h - 6;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInner(!on);
    onChange?.(!on);
  };
  return (
    <label className={cn("inline-flex cursor-pointer items-center gap-3 text-sm select-none", disabled && "cursor-not-allowed opacity-50", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={children ? undefined : label}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          "group/sw relative shrink-0 rounded-full outline-none transition-colors duration-300 focus-visible:ring-4 focus-visible:ring-ring/40",
          on ? "bg-primary" : "bg-muted-foreground/30",
        )}
        style={{ width: w, height: h }}
      >
        <span
          aria-hidden
          className="absolute top-[3px] left-[3px] rounded-full bg-white shadow-md transition-[transform,width] duration-300 ease-[cubic-bezier(.3,1.5,.5,1)] motion-reduce:transition-none"
          style={{
            width: knob,
            height: knob,
            transform: `translateX(${on ? w - knob - 6 : 0}px)`,
          }}
        />
      </button>
      {children}
    </label>
  );
}
