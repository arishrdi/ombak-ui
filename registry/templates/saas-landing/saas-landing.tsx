"use client";

import { NavbarFloating } from "@/registry/blocks/navbar-floating/navbar-floating";
import { HeroWave } from "@/registry/blocks/hero-wave/hero-wave";
import { LogoMarquee } from "@/registry/blocks/logo-marquee/logo-marquee";
import { FeatureBento } from "@/registry/blocks/feature-bento/feature-bento";
import { StatsBand } from "@/registry/blocks/stats-band/stats-band";
import { PricingTiers } from "@/registry/blocks/pricing-tiers/pricing-tiers";
import { TestimonialWall } from "@/registry/blocks/testimonial-wall/testimonial-wall";
import { FaqSplit } from "@/registry/blocks/faq-split/faq-split";
import { CtaCaustics } from "@/registry/blocks/cta-caustics/cta-caustics";
import { FooterWave } from "@/registry/blocks/footer-wave/footer-wave";
import { cn } from "@/lib/utils";

export type SaasLandingProps = {
  className?: string;
};

/**
 * A complete SaaS landing page: floating navbar, wave hero, logos, features, numbers, pricing,
 * testimonials, FAQ, closing CTA and footer. Every section is an Ombak block, so edit the copy
 * here or open the block file to change its layout.
 */
export function SaasLanding({ className }: SaasLandingProps) {
  return (
    <div className={cn("min-h-screen bg-background text-foreground", className)}>
      <NavbarFloating
        links={[
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Customers", href: "#customers" },
          { label: "FAQ", href: "#faq" },
        ]}
        cta={{ label: "Start free", href: "#pricing" }}
        // overlap the dark hero; the "dark" class gives the bar light text and a dark glass pill
        className="dark -mb-[76px] text-foreground"
      />
      <main>
        <HeroWave
          badge="Lautan 2.0 is here"
          title="Ship calm, fast websites your team loves."
          description="Lautan gives product teams a motion-ready design system, hosting and analytics in one place. Set up in minutes, not sprints."
          primary={{ label: "Start free", href: "#pricing" }}
          secondary={{ label: "Book a demo", href: "#faq" }}
        />
        <LogoMarquee />
        <div id="features" className="scroll-mt-20">
          <FeatureBento />
        </div>
        <StatsBand className="border-y bg-muted/30" />
        <div id="pricing" className="scroll-mt-20">
          <PricingTiers />
        </div>
        <div id="customers" className="scroll-mt-20">
          <TestimonialWall className="border-t" />
        </div>
        <div id="faq" className="scroll-mt-20">
          <FaqSplit className="border-t" />
        </div>
        <CtaCaustics title="Your next launch, without the stress." primary={{ label: "Start free", href: "#pricing" }} secondary={{ label: "Talk to sales", href: "#faq" }} />
      </main>
      <FooterWave />
    </div>
  );
}
