import type Anthropic from "@anthropic-ai/sdk";

/**
 * Guards for the free generator: a per-IP daily limit and a global daily spending cap.
 *
 * State lives in this server instance's memory, so it resets on redeploy and is per instance
 * on serverless hosts. Good enough for a prototype; move it to Redis (e.g. Upstash) before launch.
 */

export const MODEL = process.env.GENERATE_MODEL ?? "claude-haiku-5-5";
const PER_IP_PER_DAY = Number(process.env.GENERATE_LIMIT_PER_DAY ?? 10);
const DAILY_BUDGET_USD = Number(process.env.GENERATE_DAILY_BUDGET_USD ?? 1);

/** USD per million tokens [input, output]. Cache writes cost 1.25x input, cache reads 0.1x. */
const PRICES: Record<string, [number, number]> = {
  "claude-haiku-5-5": [0.1, 0.5],
  "claude-sonnet-5-5": [2, 10],
  "claude-opus-5-5": [4, 20],
};

const today = () => new Date().toISOString().slice(0, 10);

let day = today();
let spent = 0;
const hits = new Map<string, number>();

function rollOver() {
  const d = today();
  if (d !== day) {
    day = d;
    spent = 0;
    hits.clear();
  }
}

export type LimitResult = { ok: true; remaining: number } | { ok: false; reason: string };

/** Counts one generation for this IP, or refuses when the IP or the daily budget is used up. */
export function takeGeneration(ip: string): LimitResult {
  rollOver();
  if (spent >= DAILY_BUDGET_USD) {
    return { ok: false, reason: "Today's free generations are used up. Come back tomorrow." };
  }
  const used = hits.get(ip) ?? 0;
  if (used >= PER_IP_PER_DAY) {
    return { ok: false, reason: `You've used your ${PER_IP_PER_DAY} free generations for today. Come back tomorrow.` };
  }
  hits.set(ip, used + 1);
  return { ok: true, remaining: PER_IP_PER_DAY - used - 1 };
}

/** Gives a generation back when it failed before producing anything. */
export function refundGeneration(ip: string) {
  const used = hits.get(ip) ?? 0;
  if (used > 0) hits.set(ip, used - 1);
}

/** Estimated USD cost of one response; adds it to today's spend and returns it. */
export function recordUsage(usage: Anthropic.Usage) {
  rollOver();
  const [inPrice, outPrice] = PRICES[MODEL] ?? PRICES["claude-sonnet-5-5"];
  const input =
    usage.input_tokens + (usage.cache_creation_input_tokens ?? 0) * 1.25 + (usage.cache_read_input_tokens ?? 0) * 0.1;
  const cost = (input * inPrice + usage.output_tokens * outPrice) / 1_000_000;
  spent += cost;
  return cost;
}
