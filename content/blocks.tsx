import type { ComponentType } from "react";
import { HeroWave } from "@/registry/blocks/hero-wave/hero-wave";
import { LogoMarquee } from "@/registry/blocks/logo-marquee/logo-marquee";
import { StatsBand } from "@/registry/blocks/stats-band/stats-band";
import { FeatureBento } from "@/registry/blocks/feature-bento/feature-bento";
import { PricingTiers } from "@/registry/blocks/pricing-tiers/pricing-tiers";
import { TestimonialWall } from "@/registry/blocks/testimonial-wall/testimonial-wall";
import { FaqSplit } from "@/registry/blocks/faq-split/faq-split";
import { CtaCaustics } from "@/registry/blocks/cta-caustics/cta-caustics";

/** Block slug → component (rendered with its defaults) and its exported name for the usage snippet. */
export const blockDocs: Record<string, { Block: ComponentType; exportName: string }> = {
  "hero-wave": { Block: HeroWave, exportName: "HeroWave" },
  "logo-marquee": { Block: LogoMarquee, exportName: "LogoMarquee" },
  "stats-band": { Block: StatsBand, exportName: "StatsBand" },
  "feature-bento": { Block: FeatureBento, exportName: "FeatureBento" },
  "pricing-tiers": { Block: PricingTiers, exportName: "PricingTiers" },
  "testimonial-wall": { Block: TestimonialWall, exportName: "TestimonialWall" },
  "faq-split": { Block: FaqSplit, exportName: "FaqSplit" },
  "cta-caustics": { Block: CtaCaustics, exportName: "CtaCaustics" },
};
