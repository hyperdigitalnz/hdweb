import type { APIRoute } from "astro";
// Worker bindings come from cloudflare:workers (same pattern as api/lead.ts).
import { env as cfEnv } from "cloudflare:workers";

export const prerender = false;

// Anonymous usage logging for on-site tools (the job calculator), so our own
// per-trade numbers improve over time (Matt, 25/07/2026). Strictly no PII: the
// allow-list below is the complete set of accepted fields, and nothing about the
// visitor (IP, UA, cookies) is stored.
//
// Storage: D1 binding `TOOLS_DB` (database "hdweb-tools", created + schema applied
// 25/07/2026; binding in wrangler.jsonc, schema in db/tool_events.sql). If the
// binding is ever missing (e.g. local dev without --local D1), events fall back to
// Workers Logs as JSON lines tagged TOOL_EVENT so nothing errors.

const TRADES = new Set(["plumber", "electrician", "roofer", "builder", "painter", "hvac", "other"]);
const TOOLS = new Set(["job-calculator"]);

// Soft per-isolate rate limit to keep bot noise out of the dataset.
const seen = new Map<string, { n: number; t: number }>();
const LIMIT = 40; // events/hour/IP
function limited(ip: string): boolean {
  const now = Date.now();
  const e = seen.get(ip);
  if (!e || now - e.t > 3_600_000) {
    seen.set(ip, { n: 1, t: now });
    return false;
  }
  e.n += 1;
  return e.n > LIMIT;
}

function cleanObj(v: unknown): string | null {
  if (typeof v !== "object" || v === null) return null;
  const out: Record<string, string | number | boolean> = {};
  for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
    if (!/^[a-zA-Z]{1,24}$/.test(k)) continue;
    if (typeof val === "number" && Number.isFinite(val)) out[k] = val;
    else if (typeof val === "boolean") out[k] = val;
    else if (typeof val === "string") out[k] = val.slice(0, 40);
  }
  const s = JSON.stringify(out);
  return s.length <= 2000 ? s : null;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body) return json({ ok: false }, 400);

    const tool = typeof body.tool === "string" && TOOLS.has(body.tool) ? body.tool : null;
    const trade = typeof body.trade === "string" && TRADES.has(body.trade) ? body.trade : "other";
    const inputs = cleanObj(body.inputs);
    const outputs = cleanObj(body.outputs);
    const converted = body.converted === true ? 1 : 0;
    const page = typeof body.page === "string" ? body.page.slice(0, 100) : "";
    if (!tool || !inputs) return json({ ok: false }, 400);

    const ip = request.headers.get("cf-connecting-ip") ?? clientAddress ?? "?";
    if (limited(ip)) return json({ ok: true }); // silently drop; never error the tool

    const db = (cfEnv as unknown as { TOOLS_DB?: D1Database }).TOOLS_DB;
    if (db) {
      await db
        .prepare(
          "INSERT INTO tool_events (tool, trade, inputs, outputs, page, converted) VALUES (?1, ?2, ?3, ?4, ?5, ?6)"
        )
        .bind(tool, trade, inputs, outputs ?? "{}", page, converted)
        .run();
    } else {
      // Fallback: structured log line (Workers Logs). Retention is days, not forever —
      // set up the D1 database to keep this data.
      console.log(JSON.stringify({ event: "TOOL_EVENT", tool, trade, inputs, outputs, page, converted }));
    }
    return json({ ok: true });
  } catch (err) {
    console.log(JSON.stringify({ event: "TOOL_EVENT_ERROR", error: String(err) }));
    return json({ ok: true }); // logging must never surface an error to the visitor
  }
};

export const GET: APIRoute = async () => json({ ok: false }, 405);

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
