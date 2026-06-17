import type { APIRoute } from "astro";

// On-demand endpoint (not prerendered): verifies Cloudflare Turnstile, then forwards to GHL webhook.
export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress, locals }) => {
  try {
    const form = await request.formData();

    // Env: in Cloudflare these live on locals.runtime.env; locally on import.meta.env.
    const env = (locals as any)?.runtime?.env ?? {};
    const secret = env.TURNSTILE_SECRET_KEY ?? import.meta.env.TURNSTILE_SECRET_KEY;
    const webhook = env.GHL_WEBHOOK_URL ?? import.meta.env.GHL_WEBHOOK_URL;

    // 1. Bot check (skipped if no secret configured yet)
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
        return json({ ok: false, error: "bot" }, 400);
      }
    }

    // 2. Build the lead payload (drop the Turnstile token)
    const lead: Record<string, string> = {};
    for (const [k, v] of form.entries()) {
      if (k === "cf-turnstile-response") continue;
      lead[k] = String(v);
    }
    lead.source = "website";
    lead.submittedAt = new Date().toISOString();

    // 3. Forward to GoHighLevel (skipped if no webhook configured yet)
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });
    } else {
      console.log("[lead] no GHL_WEBHOOK_URL set — would forward:", lead);
    }

    return json({ ok: true });
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
