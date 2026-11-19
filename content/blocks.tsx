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

type BlockDoc = {
  /** The block, rendered with its defaults. */
  Block: ComponentType;
  /** Exported name, for the usage snippet. */
  exportName: string;
  /** Rendered on /view instead of the bare block, e.g. with page content to scroll past. */
  Preview?: ComponentType;
  /** Fixed preview height in px. The frame scrolls instead of growing to fit. */
  frameHeight?: number;
};

export const blockDocs: Record<string, BlockDoc> = {
  "navbar-floating": { Block: NavbarFloating, exportName: "NavbarFloating", Preview: NavbarPreview, frameHeight: 560 },
  "hero-wave": { Block: HeroWave, exportName: "HeroWave" },
  "logo-marquee": { Block: LogoMarquee, exportName: "LogoMarquee" },
  "stats-band": { Block: StatsBand, exportName: "StatsBand" },
  "feature-bento": { Block: FeatureBento, exportName: "FeatureBento" },
  "pricing-tiers": { Block: PricingTiers, exportName: "PricingTiers" },
  "testimonial-wall": { Block: TestimonialWall, exportName: "TestimonialWall" },
  "faq-split": { Block: FaqSplit, exportName: "FaqSplit" },
  "cta-caustics": { Block: CtaCaustics, exportName: "CtaCaustics" },
  "contact-form": { Block: ContactForm, exportName: "ContactForm" },
  "footer-wave": { Block: FooterWave, exportName: "FooterWave" },
};
