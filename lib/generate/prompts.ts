import { catalogText } from "./catalog";
import type { Plan } from "./plan";

const TAILWIND_CDN = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4.3.3";
const GSAP_CDN = "https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/gsap.min.js";
const SCROLLTRIGGER_CDN = "https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/ScrollTrigger.min.js";

/** Built once per server instance; identical bytes on every request keep the prompt cache warm. */
let catalog: string | undefined;
const getCatalog = () => (catalog ??= catalogText());

export function plannerSystem() {
  return `You plan landing pages for Ombak, a generator that builds motion-rich static websites from Ombak UI, a library of animated components.

Read the user's request and return a plan: brand name, tagline, audience, palette, fonts and the sections in page order. For each section, pick 0-2 Ombak components whose motion fits it (an animated background behind the hero, a marquee of logos, count-up numbers in stats, and so on) and the closest Ombak block, if any.

Rules:
- Write the plan in the language of the user's request; that is the page language.
- Motion should serve the content: one striking effect in the hero, lighter touches below. Do not put an effect in every section.
- Pick a palette with strong contrast between background and foreground. Avoid the generic purple-to-blue gradient unless asked.
- Invent concrete, plausible copy details in the briefs (feature names, numbers, plan prices) instead of placeholders.
- If the request is vague, make confident choices rather than asking.

${getCatalog()}`;
}

export function writerSystem() {
  return `You write a complete, production-quality single-file static website from a plan. Output ONLY the HTML document, starting with <!doctype html> and ending with </html>. No markdown fences, no commentary.

## Stack (use exactly these)
- Tailwind CSS v4 browser build: <script src="${TAILWIND_CDN}"></script>
- Define the palette and fonts as a <style type="text/tailwindcss"> @theme { --color-background: …; --color-foreground: …; --color-muted: …; --color-primary: …; --color-accent: …; --font-heading: …; --font-body: …; } </style> and use them as utilities (bg-background, text-primary, font-heading …).
- Google Fonts via <link> for the two families in the plan.
- When a section needs scroll or timeline animation: <script src="${GSAP_CDN}"></script> and <script src="${SCROLLTRIGGER_CDN}"></script>, then gsap.registerPlugin(ScrollTrigger).
- Everything else is hand-written vanilla JS, CSS and <canvas>. No other libraries, no frameworks, no build step.

## Recreating Ombak effects
Each section lists Ombak component names in "effects". Recreate that motion faithfully in vanilla JS/CSS from the component description in the catalog below (e.g. an "aurora" background is slow drifting blurred color blobs; "count-up" animates numbers when scrolled into view; "marquee" is an endless horizontal scroll). Keep each effect self-contained and performant: requestAnimationFrame for canvas, pause offscreen canvases with IntersectionObserver, and size canvases to devicePixelRatio.
Respect prefers-reduced-motion: when it is set, show the final state without animation.

## Structure and quality
- Wrap each planned section in <section data-section="{id}" id="{id}"> (use <header>/<footer> semantics inside as appropriate), in the plan's order.
- Responsive from 360px to 1440px; no horizontal scroll on phones. A working mobile menu in the navbar.
- Real, specific copy in the plan's language. No lorem ipsum, no "[Your text]".
- No external images. Use CSS gradients, inline SVG illustrations and inline SVG icons.
- Links and buttons point to in-page anchors (#pricing) or "#".
- Accessible: semantic landmarks, alt text on SVG with role="img", visible focus styles, sufficient contrast.

${getCatalog()}`;
}

export function writerMessage(prompt: string, plan: Plan) {
  return `User request:\n${prompt}\n\nPlan:\n${JSON.stringify(plan, null, 2)}\n\nWrite the page now.`;
}
