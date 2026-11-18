import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

const COLORS = { online: "#22c55e", away: "#f59e0b", busy: "#ef4444", offline: "#94a3b8" } as const;

export type StatusDotProps = {
  /** Which status to show. Default "online" */
  status?: keyof typeof COLORS;
  /** Pulse outward to draw attention. Defaults to true when online */
  pulse?: boolean;
  /** Optional text next to the dot. When omitted, the status is still announced to screen readers. */
  children?: ReactNode;
  /** Dot size in px. Default 10 */
  size?: number;
  className?: string;
};

/**
 * A presence indicator: a colored dot with a soft sonar pulse. Use it on avatars, team lists and
 * system status pages. Pure CSS; no pulse for reduced-motion users.
 */
export function StatusDot({ status = "online", pulse, children, size = 10, className }: StatusDotProps) {
  const color = COLORS[status];
  const pulsing = pulse ?? status === "online";
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm", className)}>
      <style>{`@keyframes ombak-status-ping{75%,100%{transform:scale(2.4);opacity:0}}`}</style>
      <span className="relative inline-flex" style={{ width: size, height: size }}>
        {pulsing && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full opacity-60 [animation:ombak-status-ping_1.6s_cubic-bezier(0,0,.2,1)_infinite] motion-reduce:hidden"
            style={{ background: color }}
          />
        )}
        <span className="relative inline-flex size-full rounded-full" style={{ background: color }} />
      </span>
      {children ?? <span className="sr-only">{status}</span>}
    </span>
  );
}
