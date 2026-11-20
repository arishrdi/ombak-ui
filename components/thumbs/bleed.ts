/**
 * Card previews that fill the whole preview area (backgrounds, marquees) instead of sitting
 * centered with padding. Kept apart from the thumbs themselves so cards can lay out before the
 * (lazy-loaded) thumbs module arrives.
 */
export const BLEED = new Set([
  "wave-background",
  "marquee",
  "ripple-grid",
  "bubbles",
  "caustics",
  "current-lines",
  "scatter-photos",
  "curved-marquee",
  "aurora",
  "light-rays",
  "plankton",
  "rain-ripples",
  "dot-swell",
]);
