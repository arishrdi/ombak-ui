import { z } from "zod";
import { BLOCK_NAMES, EFFECT_NAMES, SECTION_KINDS } from "./catalog";

const hex = z.string().describe("A hex color such as #0ea5e9");

export const PlanSchema = z.object({
  siteName: z.string().describe("Short brand or product name shown in the navbar"),
  tagline: z.string().describe("One-line promise used in the hero"),
  audience: z.string().describe("Who the page is for, in a few words"),
  language: z.string().describe("Language the page copy is written in, matching the user's prompt, e.g. English or Indonesian"),
  theme: z.enum(["dark", "light"]),
  palette: z.object({
    background: hex,
    foreground: hex,
    muted: hex.describe("Secondary text color"),
    primary: hex.describe("Main accent for buttons and highlights"),
    accent: hex.describe("Second accent for gradients and effects"),
  }),
  fonts: z.object({
    heading: z.string().describe("A Google Fonts family for headings"),
    body: z.string().describe("A Google Fonts family for body text"),
  }),
  sections: z
    .array(
      z.object({
        id: z.string().describe("Unique kebab-case id, e.g. hero or pricing"),
        kind: z.enum(SECTION_KINDS),
        brief: z.string().describe("What this section says and shows: headline idea, items, numbers. 1-3 sentences."),
        effects: z.array(z.enum(EFFECT_NAMES)).describe("0-2 Ombak components whose motion this section recreates"),
        block: z.enum(BLOCK_NAMES).nullable().describe("The closest Ombak block for this section, or null"),
      }),
    )
    .describe("4 to 9 sections in page order, usually starting with navbar and hero and ending with footer"),
});

export type Plan = z.infer<typeof PlanSchema>;
