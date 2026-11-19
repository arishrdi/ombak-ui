/**
 * Release notes, newest first. Add an entry to the top when you ship something;
 * /changelog, its RSS feed and the "What's new" link read from here.
 */

export type ChangeType = "new" | "improved" | "fixed";

export type Release = {
  /** Stable id, used for anchors and RSS guids. */
  id: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  title: string;
  summary: string;
  /** Main page to try the release. */
  href?: string;
  changes: { type: ChangeType; text: string; href?: string }[];
};

export const releases: Release[] = [
  {
    id: "copy-for-ai",
    date: "2026-11-19",
    title: "Copy for AI",
    summary: "Hand any component, block or template to ChatGPT, Claude, Cursor or v0 with everything it needs to know.",
    href: "/docs/components/magnetic-button",
    changes: [
      { type: "new", text: "A Copy for AI menu on every component, block and template page." },
      { type: "new", text: "Copy prompt: description, install command, dependencies, usage and the props table as Markdown." },
      { type: "new", text: "Copy prompt + source adds the full code, for edits and refactors." },
      { type: "new", text: "Open in v0 starts a v0 chat with the registry item." },
    ],
  },
  {
    id: "theme-builder",
    date: "2026-11-19",
    title: "Theme Builder",
    summary: "Pick a color, tint the neutrals and set the radius, then copy the CSS. Every component, block and template follows.",
    href: "/themes",
    changes: [
      { type: "new", text: "Theme Builder with seven ocean presets: Ombak, Lagoon, Coral, Deep Sea, Kelp, Sand and Mono.", href: "/themes" },
      { type: "new", text: "Live light and dark preview with real components and the Pricing Tiers block." },
      { type: "new", text: "Copy a :root / .dark block for globals.css, or share the theme as a link." },
      { type: "improved", text: "The header switches to the menu below 1024px, so six links never squeeze the logo or search." },
    ],
  },
  {
    id: "kit-builder",
    date: "2026-11-19",
    title: "Kit Builder",
    summary: "Collect components, blocks and templates as you browse, then install them all with one command.",
    href: "/kit",
    changes: [
      { type: "new", text: "Add to kit buttons on every card and on component, block and template pages." },
      { type: "new", text: "A floating tray that counts your picks and opens your kit.", href: "/kit" },
      { type: "new", text: "Items already included by another pick are left out of the command, so nothing installs twice." },
      { type: "new", text: "Share a kit as a link; whoever opens it can add it to theirs or replace their own." },
    ],
  },
  {
    id: "props-playground",
    date: "2026-11-19",
    title: "Props Playground",
    summary: "A Playground tab on 93 component pages: tweak props with live controls and copy the resulting JSX.",
    href: "/docs/components/wave-background",
    changes: [
      { type: "new", text: "Controls generated from each component's props: sliders, switches, option buttons, color pickers and text fields." },
      { type: "new", text: "The snippet lists only the props you changed, ready to paste." },
      { type: "improved", text: "New components get a playground automatically when the registry is built." },
    ],
  },
  {
    id: "overlays",
    date: "2026-11-19",
    title: "Overlays and more Backgrounds",
    summary: "Ten new components bring the library to 102, including a new Overlays category.",
    href: "/docs/components/toast-stack",
    changes: [
      { type: "new", text: "Toast Stack: call toast() anywhere; toasts stack, fan out on hover and swipe away.", href: "/docs/components/toast-stack" },
      { type: "new", text: "Ripple Dialog and Tide Drawer, both on the native <dialog> element.", href: "/docs/components/ripple-dialog" },
      { type: "new", text: "Drift Tooltip and Bloom Popover.", href: "/docs/components/bloom-popover" },
      { type: "new", text: "Backgrounds: Aurora, Light Rays, Plankton, Rain Ripples and Dot Swell.", href: "/docs/components/plankton" },
      { type: "fixed", text: "Dialogs and drawers closed by a <form method=\"dialog\"> button can be opened again." },
    ],
  },
  {
    id: "share-images",
    date: "2026-11-19",
    title: "Share images and a homepage tour",
    summary: "Every page now has its own share image, and the homepage introduces Blocks and Templates.",
    changes: [
      { type: "new", text: "Open Graph images for every component, block and template, set in Geist." },
      { type: "new", text: "A Blocks & Templates section on the homepage with live template previews.", href: "/" },
      { type: "fixed", text: "Shared links now show the page's own title instead of “Ombak UI”." },
    ],
  },
  {
    id: "templates",
    date: "2026-11-19",
    title: "Templates",
    summary: "Three complete landing pages built from blocks, each installed with a single command.",
    href: "/templates",
    changes: [
      { type: "new", text: "SaaS Landing, Studio Landing and App Launch, each with its own accent color.", href: "/templates" },
      { type: "new", text: "Navbar Floating, Contact Form and Footer Wave blocks.", href: "/blocks/navbar-floating" },
      { type: "fixed", text: "Blocks and templates now build in new Next.js apps that enable cacheComponents." },
    ],
  },
  {
    id: "blocks",
    date: "2026-11-19",
    title: "Blocks and a new look",
    summary: "Ready-made page sections, and a calmer, more polished site.",
    href: "/blocks",
    changes: [
      { type: "new", text: "Eight blocks: Hero Wave, Logo Marquee, Stats Band, Feature Bento, Pricing Tiers, Testimonial Wall, FAQ Split and CTA Caustics.", href: "/blocks" },
      { type: "new", text: "Block previews at desktop, tablet and mobile widths." },
      { type: "improved", text: "Site redesign: refined palette, hairline borders, soft shadows, Geist with serif accents." },
    ],
  },
  {
    id: "forms-and-text",
    date: "2026-11-19",
    title: "Forms and text effects",
    summary: "Twenty components: a full Forms category and ten more text effects.",
    changes: [
      { type: "new", text: "Forms: Floating Input, OTP Input, Password Input, Toggle Switch, Range Slider, File Dropzone, Tag Input, Star Rating, Number Stepper and Expand Search." },
      { type: "new", text: "Ten more text components, including Glitch Text, Orbit Text, Tide Text and Curved Marquee." },
      { type: "improved", text: "Search now opens with ⌘K / Ctrl+K only, leaving / free for components on the page." },
    ],
  },
  {
    id: "categories",
    date: "2026-11-18",
    title: "Buttons, cards, loaders and navigation",
    summary: "Forty components across four new categories, with gallery filters.",
    changes: [
      { type: "new", text: "Buttons, Cards, Loaders and Navigation categories, ten components each." },
      { type: "new", text: "Category filters and search on the components gallery.", href: "/docs/components" },
    ],
  },
  {
    id: "first-wave",
    date: "2026-11-18",
    title: "The first wave",
    summary: "Ombak UI launches: a docs site, a shadcn registry and the first motion components.",
    changes: [
      { type: "new", text: "Docs site with live previews, ⌘K search, light and dark themes and a mobile menu." },
      { type: "new", text: "A shadcn registry: install any component with one command.", href: "/docs/installation" },
      { type: "new", text: "The first 32 components, from Wave Background to Marquee and Text Reveal." },
    ],
  },
];
