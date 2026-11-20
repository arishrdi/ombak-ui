/**
 * Lightweight facts about blocks and templates, with no component imports, so pages that only
 * need a name or a color don't pull every block into their JavaScript. The components themselves
 * are mapped in content/blocks.tsx and content/templates.tsx (used by /view).
 */
export const blockMeta: Record<string, { exportName: string; frameHeight?: number }> = {
  "navbar-floating": { exportName: "NavbarFloating", frameHeight: 560 },
  "hero-wave": { exportName: "HeroWave" },
  "logo-marquee": { exportName: "LogoMarquee" },
  "stats-band": { exportName: "StatsBand" },
  "feature-bento": { exportName: "FeatureBento" },
  "pricing-tiers": { exportName: "PricingTiers" },
  "testimonial-wall": { exportName: "TestimonialWall" },
  "faq-split": { exportName: "FaqSplit" },
  "cta-caustics": { exportName: "CtaCaustics" },
  "contact-form": { exportName: "ContactForm" },
  "footer-wave": { exportName: "FooterWave" },
};

export const templateMeta: Record<string, { exportName: string; accent: string }> = {
  "saas-landing": { exportName: "SaasLanding", accent: "#3fd1b0" },
  "studio-landing": { exportName: "StudioLanding", accent: "#f97362" },
  "app-launch": { exportName: "AppLaunch", accent: "#8b5cf6" },
};
