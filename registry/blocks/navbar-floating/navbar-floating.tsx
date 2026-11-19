"use client";

import type { ReactNode } from "react";
import { FloatingNav } from "@/registry/ombak/floating-nav/floating-nav";
import { HoverNav } from "@/registry/ombak/hover-nav/hover-nav";
import { MorphMenu } from "@/registry/ombak/morph-menu/morph-menu";
import { MagneticButton } from "@/registry/ombak/magnetic-button/magnetic-button";
import { cn } from "@/lib/utils";

export type NavbarFloatingProps = {
  /** Logo or brand name, linked to home. */
  brand?: ReactNode;
  /** Main links. Shown inline on desktop and in a morphing menu on small screens. */
  links?: { label: string; href: string }[];
  /** Highlighted link (matches a link's href). */
  current?: string;
  /** Call to action on the right. */
  cta?: { label: string; href: string };
  /** Use a scrollable element instead of the window. */
  scrollContainer?: React.RefObject<HTMLElement | null>;
  className?: string;
};

const DEFAULT_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "Customers", href: "#customers" },
  { label: "Blog", href: "#blog" },
];

/**
 * A site header that sits flat at the top, then shrinks into a floating glass pill on scroll.
 * Links get a sliding hover highlight; on small screens they move into a morphing menu.
 */
export function NavbarFloating({
  brand = <DefaultBrand />,
  links = DEFAULT_LINKS,
  current,
  cta = { label: "Get started", href: "#" },
  scrollContainer,
  className,
}: NavbarFloatingProps) {
  return (
    <FloatingNav scrollContainer={scrollContainer} className={className}>
      <a href="/" className="shrink-0 rounded-lg outline-none focus-visible:ring-4 focus-visible:ring-ring/40">
        {brand}
      </a>
      <HoverNav links={links} current={current} className="hidden md:flex" />
      <div className="flex items-center gap-2">
        <MagneticButton as="a" href={cta.href} className="hidden px-5 py-2.5 sm:inline-flex">
          {cta.label}
        </MagneticButton>
        <MorphMenu links={[...links, cta]} align="right" className="md:hidden" />
      </div>
    </FloatingNav>
  );
}

function DefaultBrand() {
  return (
    <span className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em]">
      <svg viewBox="0 0 24 24" className="size-6 text-primary" fill="currentColor" aria-hidden>
        <path d="M2 15c3 0 3-6 6-6s3 6 6 6 3-6 6-6v11H2z" />
      </svg>
      Lautan
    </span>
  );
}
