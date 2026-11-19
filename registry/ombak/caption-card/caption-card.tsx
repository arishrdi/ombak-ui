import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CaptionCardProps = {
  /** Image URL. */
  src: string;
  /** Alternative text for the image. */
  alt: string;
  /** Always-visible title. */
  title: ReactNode;
  /** Extra details that slide up on hover or focus. */
  caption?: ReactNode;
  /** Optional link; makes the whole card clickable. */
  href?: string;
  /** Size classes. Default "aspect-[4/5] w-64" */
  className?: string;
};

/**
 * An image card whose caption rises from the bottom while the image slowly zooms.
 * Pure CSS, works with keyboard focus, and the caption is always readable on touch screens.
 */
export function CaptionCard({ src, alt, title, caption, href, className }: CaptionCardProps) {
  const Tag = href ? "a" : "div";
  return (
    <Tag
      {...(href ? { href } : { tabIndex: 0 })}
      className={cn(
        "group/caption relative block aspect-[4/5] w-64 overflow-hidden rounded-2xl bg-muted outline-none focus-visible:ring-4 focus-visible:ring-ring/40",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover/caption:scale-110 group-focus-visible/caption:scale-110 motion-reduce:transition-none"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-16 text-white">
        <p className="font-semibold">{title}</p>
        {caption && (
          <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover/caption:grid-rows-[1fr] group-hover/caption:opacity-100 group-focus-visible/caption:grid-rows-[1fr] group-focus-visible/caption:opacity-100 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
            <div className="overflow-hidden">
              <div className="pt-1.5 text-sm text-white/80">{caption}</div>
            </div>
          </div>
        )}
      </div>
    </Tag>
  );
}
