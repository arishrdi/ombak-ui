import { cn } from "@/lib/utils";

export type TypingDotsProps = {
  /** Dot color. Default your theme's muted-foreground color */
  color?: string;
  /** Dot size in px. Default 7 */
  size?: number;
  /** Show the chat bubble behind the dots. Default true */
  bubble?: boolean;
  /** Text for screen readers. Default "Typing" */
  label?: string;
  className?: string;
};

/**
 * The "someone is typing…" indicator from chat apps: three dots hopping in turn inside a bubble.
 * Pure CSS; pulses instead of hopping for reduced-motion users.
 */
export function TypingDots({ color = "var(--muted-foreground)", size = 7, bubble = true, label = "Typing", className }: TypingDotsProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center gap-1", bubble && "rounded-2xl rounded-bl-md bg-muted px-4 py-3", className)}
    >
      <style>{`@keyframes ombak-typing{0%,60%,100%{transform:translateY(0);opacity:.45}30%{transform:translateY(-55%);opacity:1}}@keyframes ombak-typing-calm{0%,60%,100%{opacity:.35}30%{opacity:1}}`}</style>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden
          className="rounded-full motion-reduce:![animation-name:ombak-typing-calm]"
          style={{ width: size, height: size, background: color, animation: `ombak-typing 1.2s ease-in-out ${i * 0.16}s infinite` }}
        />
      ))}
    </span>
  );
}
