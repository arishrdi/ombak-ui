"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type CountdownProps = {
  /** Target date/time (Date, timestamp, or ISO string). */
  to: Date | number | string;
  /** Labels under each unit. Default ["Days", "Hours", "Minutes", "Seconds"] */
  labels?: [string, string, string, string];
  /** Called once when the countdown reaches zero. */
  onComplete?: () => void;
  /** Classes for each number tile. */
  tileClassName?: string;
  className?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
}

/** One digit that slides the old value out and the new one in. */
function Digit({ d }: { d: string }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden">
      <span key={d} className="absolute inset-0 [animation:ombak-count-in_.45s_cubic-bezier(.2,.8,.2,1)] motion-reduce:animate-none">
        {d}
      </span>
    </span>
  );
}

/**
 * A countdown to a date: days, hours, minutes and seconds, with each digit sliding in as it changes.
 * Renders the same on the server and client, and announces the remaining time once per minute.
 */
export function Countdown({ to, labels = ["Days", "Hours", "Minutes", "Seconds"], onComplete, tileClassName, className }: CountdownProps) {
  const target = new Date(to).getTime();
  // null until mounted, so server and client render the same markup
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const left = now === null ? null : target - now;
  const done = left !== null && left <= 0;
  useEffect(() => {
    if (done) onComplete?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const values = left === null ? null : parts(left);
  const minuteAnnouncement = values ? `${values[0]} days, ${values[1]} hours, ${values[2]} minutes left` : "";

  return (
    <div className={cn("inline-flex items-start gap-3", className)}>
      <style>{`@keyframes ombak-count-in{from{transform:translateY(-100%);opacity:0}to{transform:none;opacity:1}}`}</style>
      <span className="sr-only" aria-live="polite">
        {minuteAnnouncement}
      </span>
      {labels.map((label, i) => {
        const text = values ? pad(values[i]) : "--";
        return (
          <div key={label} aria-hidden className="flex flex-col items-center gap-2">
            <span className={cn("rounded-xl border bg-card px-3 py-2 font-display text-4xl leading-none font-bold tabular-nums", tileClassName)}>
              {text.split("").map((d, j) => (
                <Digit key={j} d={d} />
              ))}
            </span>
            <span className="text-xs text-muted-foreground uppercase">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
