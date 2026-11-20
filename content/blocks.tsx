import type { ComponentType } from "react";
import { HeroWave } from "@/registry/blocks/hero-wave/hero-wave";
import { LogoMarquee } from "@/registry/blocks/logo-marquee/logo-marquee";
import { StatsBand } from "@/registry/blocks/stats-band/stats-band";
import { FeatureBento } from "@/registry/blocks/feature-bento/feature-bento";
import { PricingTiers } from "@/registry/blocks/pricing-tiers/pricing-tiers";
import { TestimonialWall } from "@/registry/blocks/testimonial-wall/testimonial-wall";
import { FaqSplit } from "@/registry/blocks/faq-split/faq-split";
import { CtaCaustics } from "@/registry/blocks/cta-caustics/cta-caustics";
import { NavbarFloating } from "@/registry/blocks/navbar-floating/navbar-floating";
import { FooterWave } from "@/registry/blocks/footer-wave/footer-wave";
import { ContactForm } from "@/registry/blocks/contact-form/contact-form";
import { NavbarPreview } from "@/components/site/block-previews";

/** Block slug → component for /view. Names and frame heights live in content/meta.ts. */
type BlockDoc = {
  /** The block, rendered with its defaults. */
  Block: ComponentType;
  /** Rendered on /view instead of the bare block, e.g. with page content to scroll past. */
  Preview?: ComponentType;
};

export const blockDocs: Record<string, BlockDoc> = {
  "navbar-floating": { Block: NavbarFloating, Preview: NavbarPreview },
  "hero-wave": { Block: HeroWave },
  "logo-marquee": { Block: LogoMarquee },
  "stats-band": { Block: StatsBand },
  "feature-bento": { Block: FeatureBento },
  "pricing-tiers": { Block: PricingTiers },
  "testimonial-wall": { Block: TestimonialWall },
  "faq-split": { Block: FaqSplit },
  "cta-caustics": { Block: CtaCaustics },
  "contact-form": { Block: ContactForm },
  "footer-wave": { Block: FooterWave },
};
