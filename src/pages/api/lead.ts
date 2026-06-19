import type { APIRoute } from "astro";
// Astro 6 removed Astro.locals.runtime.env — Worker secrets/vars now come from cloudflare:workers.
import { env as cfEnv } from "cloudflare:workers";

// On-demand endpoint (not prerendered): verifies Cloudflare Turnstile, then forwards to GHL webhook.
export const prerender = false;

// Only these fields are ever forwarded to GHL. Anything else a bot tries to
// inject is dropped. Values are capped to keep the payload sane.
const ALLOWED_FIELDS = ["name", "phone", "trade", "region", "goal", "email", "message"] as const;
const REQUIRED_FIELDS = ["name", "phone"] as const;
const MAX_FIELD_LEN = 500;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const form = await request.formData();

    // Env: Worker secrets come from cloudflare:workers; fall back to import.meta.env for `astro dev`.
    const env = cfEnv as Record<string, string | undefined>;
    const secret = env.TURNSTILE_SECRET_KEY ?? import.meta.env.TURNSTILE_SECRET_KEY;
    const webhook = env.GHL_WEBHOOK_URL ?? import.meta.env.GHL_WEBHOOK_URL;

    // The JS path uses fetch and reads JSON; a no-JS form POST wants an HTML redirect.
    const wantsHtml = (request.headers.get("accept") ?? "").includes("text/html");

    // 1. Honeypot — a hidden field real users never fill. Bots do. Pretend success.
    if (String(form.get("company") ?? "").trim() !== "") {
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
    for (const key of REQUIRED_FIELDS) {
      if (!lead[key]) return wantsHtml ? redirect("/contact") : json({ ok: false, error: "missing" }, 400);
    }

    lead.source = "website";
    lead.submittedAt = new Date().toISOString();

    // 5. Forward to GoHighLevel (skipped if no webhook configured yet)
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });
    } else {
      console.log("[lead] no GHL_WEBHOOK_URL set — would forward:", lead);
    }

    return wantsHtml ? redirect("/thank-you") : json({ ok: true });
  } catch (err) {
    console.error("[lead] error", err);
    return json({ ok: false, error: "server" }, 500);
  }
};

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
