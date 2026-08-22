// Internal "new enquiry" notification, sent from the Worker via Resend.
//
// Why this exists: GoHighLevel's workflow email is the notification we actually get, and
// its public API v2 exposes workflows as a LIST only (no GET of a workflow's actions, no
// PUT), so the fields it includes can only be edited by hand in the GHL UI. This sends our
// own notification instead, carrying every field the form collected, so a new form field
// shows up in the inbox without anyone remembering to update a workflow.
//
// It is strictly additive: it runs after the GHL forward and can never change the
// response the visitor gets. If Resend is down or unconfigured, the lead is unaffected.

/** Pretty labels, in the order they should read in the email. Anything in the lead that
 *  isn't listed here still gets rendered underneath, so a field added to the form later
 *  can never silently go missing from the notification. */
const FIELD_LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  trade: "Trade",
  goal: "Goal",
  web_presence: "Has a website?",
  website: "Website / page",
  message: "Message / calculator",
  page: "Enquired from",
  source: "Source",
  submittedAt: "Submitted",
};

const WEB_PRESENCE_LABELS: Record<string, string> = {
  website: "Yes, has a website",
  facebook: "Facebook/Instagram page only",
  none: "No website yet",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** NZ-readable timestamp; the raw ISO string stays in the payload GHL receives. */
function formatSubmitted(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.valueOf())) return iso;
  return parsed.toLocaleString("en-NZ", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Pacific/Auckland",
  });
}

/** Turn a stored value into what a human wants to read. */
function displayValue(key: string, value: string, siteOrigin: string): string {
  if (key === "web_presence") return WEB_PRESENCE_LABELS[value] ?? value;
  if (key === "submittedAt") return formatSubmitted(value);
  if (key === "page") return `${siteOrigin}${value}`;
  return value;
}

/** Make the fields you'd actually click clickable. */
function linkFor(key: string, display: string): string | null {
  if (key === "email") return `mailto:${display}`;
  if (key === "phone") return `tel:${display.replace(/[^\d+]/g, "")}`;
  if (key === "page") return display;
  if (key === "website") return /^https?:\/\//i.test(display) ? display : null;
  return null;
}

export function buildLeadEmail(lead: Record<string, string>, siteOrigin: string) {
  // Known fields first, in the order above, then anything else the form starts sending.
  const known = Object.keys(FIELD_LABELS).filter((key) => lead[key]);
  const extra = Object.keys(lead).filter((key) => !(key in FIELD_LABELS) && lead[key]);
  const rows = [...known, ...extra].map((key) => {
    const display = displayValue(key, lead[key]!, siteOrigin);
    return { key, label: FIELD_LABELS[key] ?? key, display, href: linkFor(key, display) };
  });

  const who = lead.name || "Someone";
  const trade = lead.trade ? ` (${lead.trade})` : "";
  const subject = `New enquiry: ${who}${trade}${lead.phone ? `, ${lead.phone}` : ""}`;

  const text = rows.map((r) => `${r.label}: ${r.display}`).join("\n");

  // Inline styles and a plain table: email clients are not browsers.
  const cells = rows
    .map(({ label, display, href }) => {
      const value = href
        ? `<a href="${escapeHtml(href)}" style="color:#8a6a3b;">${escapeHtml(display)}</a>`
        : escapeHtml(display);
      return `<tr>
        <td style="padding:8px 14px 8px 0;vertical-align:top;color:#6b6b6b;font-size:13px;white-space:nowrap;">${escapeHtml(label)}</td>
        <td style="padding:8px 0;vertical-align:top;color:#0c0b0a;font-size:15px;word-break:break-word;">${value}</td>
      </tr>`;
    })
    .join("");

  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f6f4f0;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e6e1d9;border-radius:14px;padding:24px;">
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#8a6a3b;">New website enquiry</p>
    <h1 style="margin:0 0 18px;font-size:22px;color:#0c0b0a;">${escapeHtml(who)}${escapeHtml(trade)}</h1>
    <table style="border-collapse:collapse;width:100%;">${cells}</table>
    <p style="margin:20px 0 0;font-size:12px;color:#8b8b8b;">
      Sent by the website, not GoHighLevel. Reply to this email to answer ${escapeHtml(who)} directly.
    </p>
  </div>
</div>`;

  return { subject, html, text };
}

/**
 * Send the notification. Returns whether it was sent; never throws, so a Resend outage
 * can't cost a lead. `RESEND_API_KEY` unset simply means "not configured yet".
 */
export async function sendLeadNotification(
  env: Record<string, string | undefined>,
  lead: Record<string, string>,
  siteOrigin: string,
): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) return { sent: false, reason: "no_api_key" };

  // Overridable so the recipients can change without a deploy; the defaults are the two
  // addresses Matt asked for.
  const from = env.LEAD_NOTIFY_FROM || "Hyper Digital website <leads@hyperdigital.nz>";
  const to = (env.LEAD_NOTIFY_TO || "sales@hyperdigital.nz,matt@hyperdigital.nz")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  const { subject, html, text } = buildLeadEmail(lead, siteOrigin);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject,
        html,
        text,
        // Hitting reply in the inbox answers the customer, not us.
        ...(lead.email ? { reply_to: lead.email } : {}),
      }),
    });
    if (res.ok) return { sent: true };
    return { sent: false, reason: `resend_${res.status}` };
  } catch {
    return { sent: false, reason: "resend_fetch_failed" };
  }
}
