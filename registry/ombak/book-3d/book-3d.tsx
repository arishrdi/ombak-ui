import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Book3DProps = {
  /** Cover content (title, image…). */
  cover: ReactNode;
  /** First page, revealed when the cover opens. */
  page?: ReactNode;
  /** Cover color behind your content. Default "#0e7fbf" */
  color?: string;
  /** Book thickness in px. Default 22 */
  thickness?: number;
  /** Size classes. Default "h-64 w-48" */
  className?: string;
};

/**
 * A 3D book that turns toward you and swings its cover open on hover or focus. Great for
 * ebooks, guides, case studies and lead magnets. Pure CSS; no turning for reduced-motion users.
 */
export function Book3D({ cover, page, color = "#0e7fbf", thickness = 22, className }: Book3DProps) {
  return (
    <div tabIndex={0} className={cn("group/book relative h-64 w-48 outline-none [perspective:1400px]", className)}>
      <div
        className="relative size-full [transform-style:preserve-3d] [transform:rotateY(-24deg)] transition-transform duration-700 ease-[cubic-bezier(.3,.7,.2,1)] group-hover/book:[transform:rotateY(-8deg)] group-focus-visible/book:[transform:rotateY(-8deg)] motion-reduce:transition-none"
      >
        {/* pages block (the book's thickness) */}
        <div
          className="absolute inset-y-[3px] right-0 bg-[repeating-linear-gradient(90deg,#f8fafc_0_2px,#e2e8f0_2px_3px)]"
          style={{ width: thickness, transform: `rotateY(90deg) translateZ(${thickness / 2}px) translateX(${thickness / 2}px)`, transformOrigin: "right" }}
        />
        {/* back cover */}
        <div className="absolute inset-0 rounded-r-md" style={{ background: color, transform: `translateZ(${-thickness}px)` }} />
        {/* first page */}
        <div className="absolute inset-[3px] overflow-hidden rounded-r-sm bg-[#f8fafc] p-4 text-sm text-slate-700" style={{ transform: "translateZ(-1px)" }}>
          {page}
        </div>
        {/* front cover, hinged on the left */}
        <div
          className="absolute inset-0 origin-left overflow-hidden rounded-r-md shadow-[inset_4px_0_6px_-3px_rgba(0,0,0,.35)] transition-transform duration-700 ease-[cubic-bezier(.3,.7,.2,1)] group-hover/book:[transform:rotateY(-58deg)] group-focus-visible/book:[transform:rotateY(-58deg)] motion-reduce:transition-none"
          style={{ background: color }}
        >
          {cover}
        </div>
      </div>
      {/* floor shadow */}
      <div className="pointer-events-none absolute inset-x-4 -bottom-4 h-6 rounded-[50%] bg-black/30 blur-md" />
    </div>
  );
}
