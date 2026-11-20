import type { Plan } from "./plan";

export type ExportItem = { name: string; title: string; command: string };

/** Events /api/generate streams to the browser, one JSON object per line. */
export type GenerateEvent =
  | { type: "status"; message: string }
  | { type: "plan"; plan: Plan; exports: ExportItem[] }
  | { type: "html"; delta: string }
  | { type: "done"; costUsd: number; remaining: number }
  | { type: "error"; message: string };
