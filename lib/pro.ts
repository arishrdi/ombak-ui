/**
 * Ombak Pro is not on sale yet. The pricing page shows the planned offer and collects a waitlist,
 * so demand can be measured before billing is built. Edit the offer here.
 */
export const PRO_PRICE = { amount: 9, currency: "$", period: "month" };

export const FREE_FEATURES = [
  "Every Ombak component, block and template: free and open source",
  "10 site generations a day",
  "Download the page as a single HTML file",
  "shadcn install commands for the components it uses",
  "Small “Made with Ombak” badge on generated pages",
];

/** Pro features people can say they want on the waitlist form. Ids are stored with each signup. */
export const PRO_FEATURES = [
  { id: "no-badge", label: "No “Made with Ombak” badge" },
  { id: "quality", label: "High-quality mode with a stronger model" },
  { id: "credits", label: "More generations every month" },
  { id: "iterate", label: "Unlimited edits and section regenerates" },
  { id: "nextjs-export", label: "Export as a Next.js project (.zip) with real Ombak components" },
  { id: "projects", label: "Saved projects and version history" },
] as const;

export type ProFeatureId = (typeof PRO_FEATURES)[number]["id"];

/** Where a visit to /pricing came from; used to see which upgrade prompt people click. */
export const PRICING_SOURCES = ["badge", "limit", "generator", "nav", "direct"] as const;
export type PricingSource = (typeof PRICING_SOURCES)[number];
