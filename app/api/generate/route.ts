import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { installCommand, itemTitle } from "@/lib/generate/catalog";
import { MODEL, recordUsage, refundGeneration, takeGeneration } from "@/lib/generate/limits";
import type { GenerateEvent } from "@/lib/generate/events";
import { PlanSchema, type Plan } from "@/lib/generate/plan";
import { plannerSystem, writerMessage, writerSystem } from "@/lib/generate/prompts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const MAX_PROMPT = 1200;

function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "local";
}

/** The Ombak blocks and components a plan uses, as shadcn install commands for the Next.js export. */
function exportsFor(plan: Plan) {
  const names = new Set<string>();
  for (const s of plan.sections) {
    if (s.block) names.add(s.block);
    else s.effects.forEach((e) => names.add(e));
  }
  return [...names].map((name) => ({ name, title: itemTitle(name), command: installCommand(name) }));
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "The generator is not configured: set ANTHROPIC_API_KEY." }, { status: 503 });
  }

  const body = (await req.json().catch(() => null)) as { prompt?: unknown } | null;
  const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
  if (prompt.length < 8) return Response.json({ error: "Describe the site in a sentence or two." }, { status: 400 });
  if (prompt.length > MAX_PROMPT) return Response.json({ error: `Keep the prompt under ${MAX_PROMPT} characters.` }, { status: 400 });

  const ip = clientIp(req);
  const limit = takeGeneration(ip);
  if (!limit.ok) return Response.json({ error: limit.reason }, { status: 429 });

  const client = new Anthropic();
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (e: GenerateEvent) => controller.enqueue(encoder.encode(JSON.stringify(e) + "\n"));
      let cost = 0;
      let wroteHtml = false;
      try {
        // 1. Plan: a small structured call that picks sections, palette and Ombak effects.
        send({ type: "status", message: "Planning sections…" });
        const planned = await client.messages.parse(
          {
            model: MODEL,
            max_tokens: 8000,
            output_config: { effort: "low", format: zodOutputFormat(PlanSchema) },
            system: [{ type: "text", text: plannerSystem(), cache_control: { type: "ephemeral" } }],
            messages: [{ role: "user", content: prompt }],
          },
          { signal: req.signal },
        );
        cost += recordUsage(planned.usage);
        if (planned.stop_reason === "refusal") throw new UserError("This request can't be generated. Try a different prompt.");
        const plan = planned.parsed_output;
        if (!plan) throw new Error("The planner returned an invalid plan.");
        send({ type: "plan", plan, exports: exportsFor(plan) });

        // 2. Write: stream the HTML document.
        send({ type: "status", message: "Writing the page…" });
        const writer = client.messages.stream(
          {
            model: MODEL,
            max_tokens: 32000,
            output_config: { effort: "low" },
            system: [{ type: "text", text: writerSystem(), cache_control: { type: "ephemeral" } }],
            messages: [{ role: "user", content: writerMessage(prompt, plan) }],
          },
          { signal: req.signal },
        );
        for await (const event of writer) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            wroteHtml = true;
            send({ type: "html", delta: event.delta.text });
          }
        }
        const final = await writer.finalMessage();
        cost += recordUsage(final.usage);
        if (final.stop_reason === "refusal") throw new UserError("This request can't be generated. Try a different prompt.");
        if (final.stop_reason === "max_tokens") send({ type: "status", message: "The page was cut off at the length limit." });

        send({ type: "done", costUsd: Number(cost.toFixed(5)), remaining: limit.remaining });
      } catch (err) {
        if (!wroteHtml) refundGeneration(ip);
        if (req.signal.aborted) return controller.close();
        console.error("[generate]", err);
        send({ type: "error", message: errorMessage(err) });
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "content-type": "application/x-ndjson; charset=utf-8", "cache-control": "no-store" },
  });
}

class UserError extends Error {}

function errorMessage(err: unknown) {
  if (err instanceof UserError) return err.message;
  if (err instanceof Anthropic.RateLimitError) return "The generator is busy. Try again in a minute.";
  if (err instanceof Anthropic.APIError && (err.status ?? 0) >= 500) return "The model is unavailable right now. Try again shortly.";
  return "Something went wrong while generating. Try again.";
}
