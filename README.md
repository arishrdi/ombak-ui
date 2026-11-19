# Ombak UI

Motion components for React: scroll, GSAP and canvas effects you can paste into any shadcn project.

```bash
npx shadcn@latest add https://ombakui.com/r/wave-background.json
```

## Components (102)

| Component | Category | Dependencies |
|---|---|---|
| Wave Background | Backgrounds | none |
| Ripple Grid | Backgrounds | none |
| Bubbles | Backgrounds | none |
| Caustics | Backgrounds | none |
| Current Lines | Backgrounds | none |
| Aurora | Backgrounds | none |
| Light Rays | Backgrounds | none |
| Plankton | Backgrounds | none |
| Rain Ripples | Backgrounds | none |
| Dot Swell | Backgrounds | none |
| Text Reveal | Text | gsap, @gsap/react |
| Scramble Text | Text | gsap |
| Rolling Text | Text | none |
| Count Up | Text | gsap |
| Wave Text | Text | none |
| Typewriter | Text | none |
| Highlight Text | Text | gsap, @gsap/react |
| Split Flap | Text | none |
| Odometer | Text | none |
| Gradient Text | Text | none |
| Shimmer Text | Text | none |
| Morphing Text | Text | none |
| Scroll Words | Text | gsap |
| Glitch Text | Text | none |
| Assemble Text | Text | none |
| Swell Text | Text | none |
| Orbit Text | Text | none |
| Wave Underline | Text | none |
| Rotating Words | Text | none |
| Tide Text | Text | none |
| Curved Marquee | Text | none |
| Marquee | Scroll | gsap |
| Stack Cards | Scroll | gsap, @gsap/react |
| Image Reveal | Scroll | gsap, @gsap/react |
| Velocity Skew | Scroll | gsap |
| Horizontal Scroll | Scroll | gsap, @gsap/react |
| Parallax Image | Scroll | gsap, @gsap/react |
| Magnetic Button | Buttons | gsap |
| Ripple Button | Buttons | none |
| Splash Button | Buttons | none |
| Shiny Button | Buttons | none |
| Border Beam | Buttons | none |
| Hold Button | Buttons | none |
| Copy Button | Buttons | none |
| Like Button | Buttons | none |
| Slide Button | Buttons | none |
| Arrow Button | Buttons | none |
| Sonar Button | Buttons | none |
| Fill Button | Buttons | none |
| Status Button | Buttons | none |
| Flip Card | Cards | none |
| Expand Card | Cards | none |
| Depth Grid | Cards | none |
| Fan Cards | Cards | none |
| Book 3D | Cards | none |
| Depth Card | Cards | none |
| Caption Card | Cards | none |
| Wave Card | Cards | none |
| Scratch Card | Cards | none |
| Scatter Photos | Cards | none |
| Wave Loader | Loaders | none |
| Skeleton | Loaders | none |
| Progress Ring | Loaders | none |
| Typing Dots | Loaders | none |
| Tide Progress | Loaders | none |
| Orbit Spinner | Loaders | none |
| Status Dot | Loaders | none |
| Liquid Loader | Loaders | none |
| Steps | Loaders | none |
| Countdown | Loaders | none |
| Animated Tabs | Navigation | none |
| Floating Nav | Navigation | none |
| Morph Menu | Navigation | none |
| Segmented Control | Navigation | none |
| Scroll Spy | Navigation | none |
| Hover Nav | Navigation | none |
| Bottom Bar | Navigation | none |
| Accordion | Navigation | none |
| Pagination | Navigation | none |
| Dropdown Menu | Navigation | none |
| Floating Input | Forms | none |
| OTP Input | Forms | none |
| Password Input | Forms | none |
| Toggle Switch | Forms | none |
| Range Slider | Forms | none |
| File Dropzone | Forms | none |
| Tag Input | Forms | none |
| Star Rating | Forms | none |
| Number Stepper | Forms | none |
| Expand Search | Forms | none |
| Toast Stack | Overlays | none |
| Ripple Dialog | Overlays | none |
| Drift Tooltip | Overlays | none |
| Tide Drawer | Overlays | none |
| Bloom Popover | Overlays | none |
| Tilt Card | Interaction | gsap |
| Glow Card | Interaction | none |
| Hover Preview | Interaction | gsap |
| Custom Cursor | Interaction | gsap |
| Magnify Dock | Interaction | none |
| Torch Reveal | Interaction | none |
| Swipe Stack | Interaction | none |

## Project structure

```
registry/ombak/<name>/<name>.tsx   ← the components (what users install)
registry.json                     ← registry index: title, description, deps, category
public/r/*.json                   ← built registry files (npm run registry:build)
components/demos/index.tsx        ← live demos shown in the docs
content/docs.tsx                  ← per-component usage snippet + demo mapping
content/playground-fixtures.tsx   ← sample props/children for the Playground tab
components/thumbs/index.tsx       ← small live previews for component cards
components/site/*                 ← docs site UI (header, ⌘K search, theme toggle, mobile nav, previews)
app/                              ← landing, /docs, /docs/components/[slug], /llms.txt
lib/site.ts                       ← site URL (change when the domain is live)
```

## Develop

```bash
npm install
npm run registry:build   # writes public/r/*.json
npm run dev              # http://localhost:3000
npm run build            # registry + production build
```

## Add a new component

1. Create `registry/ombak/<name>/<name>.tsx`. Rules:
   - `"use client"` when it uses hooks; import `cn` from `@/lib/utils`.
   - Style with shadcn theme tokens (`bg-primary`, `bg-card`, `text-muted-foreground`, …) so it follows the user's theme.
   - Export `type <Name>Props` with a `/** comment. Default x */` above each prop: the docs props table is generated from it.
   - Respect `prefers-reduced-motion`; skip hover-only effects on touch devices.
   - Register GSAP plugins at the top of the file (`if (typeof window !== "undefined") gsap.registerPlugin(...)`).
2. Add an entry to `registry.json` (name, title, description, dependencies, categories, files).
3. Add a demo to `components/demos/index.tsx`, a usage snippet to `content/docs.tsx`, and a small preview to `components/thumbs/index.tsx`. Add it to the landing bento in `app/page.tsx` if it deserves a spot.
   The **Playground** tab is generated from the props table: numbers become sliders, booleans toggles,
   string unions buttons, hex colors color pickers. If a required prop is a list or an element (or
   `children` needs a specific shape), add sample values to `content/playground-fixtures.tsx`; tune
   slider ranges or starting values in `lib/playground.ts`. `npm run registry:build` regenerates
   `components/site/playground-map.tsx`.
4. `npm run build`, then check the page at `/docs/components/<name>`.

## Going live

1. Set the domain in `lib/site.ts` (or the `NEXT_PUBLIC_SITE_URL` env var) and in `registry.json` → `homepage`.
2. Deploy to Vercel. The registry is served as static files from `/r/`.
3. Submit the registry to the shadcn registry directory so people can use `npx shadcn add @ombak/<name>` without extra config.

## License

Free components: MIT, see LICENSE.
