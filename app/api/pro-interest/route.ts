import { PRICING_SOURCES, PRO_FEATURES, type PricingSource } from "@/lib/pro";

/**
 * Records interest in Ombak Pro: visits to /pricing from an upgrade prompt ("visit")
 * and waitlist signups ("signup").
 *
 * Each event is logged to the server console and, when PRO_INTEREST_WEBHOOK_URL is set,
 * POSTed there as JSON with `text` and `content` fields, so a Slack or Discord webhook
 * (or a Google Apps Script / Zapier hook) shows it as a message.
 */

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FEATURE_IDS = new Set<string>(PRO_FEATURES.map((f) => f.id));

// Light abuse guard, per server instance.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 20;
const hits = new Map<string, { count: number; resetAt: number }>();

function allow(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || h.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  h.count += 1;
  return h.count <= MAX_PER_WINDOW;
}

const asSource = (v: unknown): PricingSource =>
  PRICING_SOURCES.includes(v as PricingSource) ? (v as PricingSource) : "direct";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!allow(ip)) return Response.json({ error: "Too many requests. Try again later." }, { status: 429 });

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "Invalid request." }, { status: 400 });

  const source = asSource(body.source);
  const at = new Date().toISOString();

  if (body.type === "visit") {
    await record({ event: "pro_visit", source, at }, `👀 Pricing visit from "${source}"`);
    return new Response(null, { status: 204 });
  }

  if (body.type !== "signup") return Response.json({ error: "Invalid request." }, { status: 400 });

  // Bots fill every field; people never see this one.
  if (typeof body.company === "string" && body.company.length > 0) return Response.json({ ok: true });

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (email.length > 254 || !EMAIL.test(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  const features = Array.isArray(body.features)
    ? [...new Set(body.features.filter((f): f is string => typeof f === "string" && FEATURE_IDS.has(f)))]
    : [];

  await record(
    { event: "pro_signup", email, features, source, at },
    `🌊 Pro waitlist: ${email} (from "${source}")${features.length ? `\nWants: ${features.join(", ")}` : ""}`,
  );
  return Response.json({ ok: true });
}

async function record(data: Record<string, unknown>, text: string) {
  console.log("[pro-interest]", JSON.stringify(data));
  const url = process.env.PRO_INTEREST_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text, content: text, ...data }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    console.error("[pro-interest] webhook failed", err);
  }
}
