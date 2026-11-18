"use client";

import { useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export type StatusButtonProps = {
  /** Button content while idle. */
  children?: ReactNode;
  /** Runs on click. Resolve for success, throw or reject for an error. */
  onAction?: () => Promise<unknown> | unknown;
  /** Label shown after success. Default "Saved" */
  successLabel?: ReactNode;
  /** Label shown after an error. Default "Try again" */
  errorLabel?: ReactNode;
  /** Milliseconds before returning to idle. Default 1800 */
  resetAfter?: number;
  /** Button width while not loading, any CSS length. Default "10rem" */
  width?: string;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className" | "onClick">;

/**
 * A button that shows what happened: it shrinks into a spinner while your async action runs,
 * then springs open with a check (or a cross). Status changes are announced to screen readers.
 */
export function StatusButton({
  children,
  onAction,
  successLabel = "Saved",
  errorLabel = "Try again",
  resetAfter = 1800,
  width = "10rem",
  className,
  ...rest
}: StatusButtonProps) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status !== "success" && status !== "error") return;
    const id = window.setTimeout(() => setStatus("idle"), resetAfter);
    return () => window.clearTimeout(id);
  }, [status, resetAfter]);

  const run = async () => {
    if (status === "loading") return;
    setStatus("loading");
    try {
      await onAction?.();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const loading = status === "loading";
  return (
    <button
      type="button"
      onClick={run}
      aria-busy={loading}
      className={cn(
        "relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full text-sm font-medium whitespace-nowrap text-primary-foreground",
        "transition-[width,background-color] duration-300 ease-out outline-none focus-visible:ring-4 focus-visible:ring-ring/50",
        status === "success" ? "bg-emerald-500 text-white" : status === "error" ? "bg-red-500 text-white" : "bg-primary",
        className,
      )}
      style={{ width: loading ? "3rem" : width }}
      {...rest}
    >
      {loading ? (
        <span className="size-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <span key={status} className="inline-flex items-center gap-2 [animation:ombak-status-in_.3s_ease-out] motion-reduce:animate-none">
          {status === "success" && (
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
          )}
          {status === "error" && (
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          )}
          {status === "success" ? successLabel : status === "error" ? errorLabel : children}
        </span>
      )}
      <span className="sr-only" aria-live="polite">
        {status === "loading" ? "Loading" : status === "success" ? "Success" : status === "error" ? "Error" : ""}
      </span>
      <style>{`@keyframes ombak-status-in{from{transform:scale(.6);opacity:0}to{transform:none;opacity:1}}`}</style>
    </button>
  );
}
