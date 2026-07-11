import type { APIRoute } from "astro";
// Astro 6 removed Astro.locals.runtime.env — Worker secrets/vars now come from cloudflare:workers.
import { env as cfEnv } from "cloudflare:workers";

// On-demand endpoint (not prerendered): verifies Cloudflare Turnstile, then forwards to GHL webhook.
export const prerender = false;

// Only these fields are ever forwarded to GHL. Anything else a bot tries to
// inject is dropped. Values are capped to keep the payload sane. (`type` was
// removed with the callback form, retired 11/07/2026.)
const ALLOWED_FIELDS = ["name", "email", "phone", "trade", "website", "goal", "message", "page"] as const;
// `website` is deliberately NOT required: no-website tradies are prime prospects,
// and a blank value tells the audit "no website yet".
const REQUIRED_AUDIT = ["name", "email", "phone"] as const;
const MAX_FIELD_LEN = 500;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const form = await request.formData();

    // Env: Worker secrets come from cloudflare:workers; fall back to import.meta.env for `astro dev`.
    const env = cfEnv as unknown as Record<string, string | undefined>;
    const secret = env.TURNSTILE_SECRET_KEY ?? import.meta.env.TURNSTILE_SECRET_KEY;
    const webhook = env.GHL_WEBHOOK_URL ?? import.meta.env.GHL_WEBHOOK_URL;

    // The JS path uses fetch and reads JSON; a no-JS form POST wants an HTML redirect.
    const wantsHtml = (request.headers.get("accept") ?? "").includes("text/html");

    // 1. Honeypot — a hidden field real users never fill. Bots do. Pretend success.
    //    Renamed from `company` 11/07/2026: browser autofill matched it as an organisation
    //    field and silently dropped real leads. The old `company` key is deliberately NOT
    //    checked (stale cached pages + autofill would drop leads again); Turnstile still
    //    covers bots posting the old form. Trips are logged with whatever the submitter
    //    sent, so a false positive is recoverable from Workers Logs.
    if (String(form.get("hp_field") ?? "").trim() !== "") {
      const suspect: Record<string, string> = {};
      for (const key of ALLOWED_FIELDS) {
        const raw = form.get(key);
        if (raw != null && String(raw).trim()) suspect[key] = String(raw).trim().slice(0, MAX_FIELD_LEN);
      }
      console.log(JSON.stringify({ evt: "honeypot_tripped", lead: suspect }));
      return wantsHtml ? redirect("/thank-you") : json({ ok: true });
    }

    // 2. Bot check (skipped if no secret configured yet)
    if (secret) {
      const token = String(form.get("cf-turnstile-response") ?? "");
      const body = new URLSearchParams({ secret, response: token });
      try { body.set("remoteip", clientAddress); } catch {}
      const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body,
      });
      const outcome = (await verify.json()) as { success: boolean };
      if (!outcome.success) {
        return wantsHtml ? redirect("/contact") : json({ ok: false, error: "bot" }, 400);
      }
    }

    // 3. Build the lead payload from the allow-list only, capping each value.
    const lead: Record<string, string> = {};
    for (const key of ALLOWED_FIELDS) {
      const raw = form.get(key);
      if (raw == null) continue;
      const value = String(raw).trim().slice(0, MAX_FIELD_LEN);
      if (value) lead[key] = value;
    }

    // 4. Reject obviously incomplete submissions.
    for (const key of REQUIRED_AUDIT) {
      if (!lead[key]) return wantsHtml ? redirect("/contact") : json({ ok: false, error: "missing" }, 400);
    }

    lead.source = "website";
    lead.submittedAt = new Date().toISOString();

    // 5. Forward to GoHighLevel with retries (skipped if no webhook configured yet).
    //    Every submission is logged as a JSON line either way (Workers Logs, observability
    //    is on in wrangler.jsonc), so a lead is recoverable from the logs even if GHL is
    //    down. Grep for LEAD_DELIVERY_FAILED to find leads that never reached GHL.
    if (webhook) {
      const delivered = await forwardToGhl(webhook, lead);
      console.log(JSON.stringify({ evt: delivered ? "lead_delivered" : "LEAD_DELIVERY_FAILED", lead }));
    } else {
      console.log(JSON.stringify({ evt: "lead_received_no_webhook", lead }));
    }

    return wantsHtml ? redirect("/thank-you") : json({ ok: true });
  } catch (err) {
    console.error("[lead] error", err);
    return json({ ok: false, error: "server" }, 500);
  }
};

// POST the lead to the GHL webhook, retrying twice on a non-2xx response or a network
// error (GHL blips shouldn't lose a lead). Worst case adds ~2s before the user is
// redirected, and only when GHL is already failing. Returns whether delivery succeeded;
// the visitor still gets the thank-you page either way, since the lead is in the logs.
async function forwardToGhl(webhook: string, lead: Record<string, string>): Promise<boolean> {
  const delaysMs = [0, 500, 1500];
  for (const delay of delaysMs) {
    if (delay) await new Promise((r) => setTimeout(r, delay));
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (res.ok) return true;
      console.error(`[lead] GHL webhook responded ${res.status}, ${delay === delaysMs.at(-1) ? "giving up" : "retrying"}`);
    } catch (err) {
      console.error("[lead] GHL webhook fetch failed", err);
    }
  }
  return false;
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

// 303 so the browser follows with a GET (no form re-submission on refresh).
function redirect(location: string) {
  return new Response(null, { status: 303, headers: { location } });
}
