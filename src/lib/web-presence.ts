// What the visitor told us about their online presence, and how we clean up whatever
// they pasted into the box.
//
// Shared deliberately: AuditForm.astro imports this for client-side validation (so the
// browser shows a native message before a round trip) and src/pages/api/lead.ts imports
// the same functions to re-check on the server, which has the final say. One
// implementation means the browser can never accept a value the server then rejects.

/** The three answers to "do you have a website?". `""` = an older cached page that
 *  posted the pre-11/08/2026 form, which had a single free-text website box. */
export type WebPresence = "website" | "facebook" | "none";

export const WEB_PRESENCE_VALUES = ["website", "facebook", "none"] as const;

export function isWebPresence(value: string): value is WebPresence {
  return (WEB_PRESENCE_VALUES as readonly string[]).includes(value);
}

// Hosts we treat as "that's a social page, not a website". Matched after the scheme
// and any www./m. prefix are stripped.
const SOCIAL_HOST = /^(facebook\.com|fb\.com|fb\.me|instagram\.com|instagr\.am)$/;

// A plausible domain: at least one dot, sane label characters, an alphabetic TLD.
// Deliberately not a full RFC check, just enough to reject "n/a", "dunno", "yes"
// and the rest of what people actually type.
const DOMAIN = /^(?=.{4,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}$/;

const HANDLE = /^@[a-z0-9._-]{2,50}$/i;

/** Split whatever was pasted into a bare lowercase host plus the rest of the URL. */
function split(raw: string): { host: string; rest: string; bare: string } {
  const bare = raw.trim().replace(/^https?:\/\//i, "").replace(/^\/+/, "");
  const host = (bare.split(/[/?#]/)[0] ?? "").toLowerCase();
  return { host, rest: bare.slice(host.length), bare };
}

/** Drop the prefixes people include but that aren't part of matching the host. */
function baseHost(host: string): string {
  return host.replace(/^(www\.|m\.)+/, "");
}

export type WebsiteResult =
  | { ok: true; value: string }
  | { ok: false; reason: "empty" | "social" | "invalid" };

/**
 * Validate and normalise a website address. Accepts what people actually type
 * ("yourbusiness.co.nz", "www.yourbusiness.co.nz/", "https://yourbusiness.co.nz")
 * and always returns it with a scheme so the link is clickable in GHL.
 */
export function normaliseWebsite(raw: string): WebsiteResult {
  const { host, rest } = split(raw);
  if (!host) return { ok: false, reason: "empty" };
  // Sent to the Facebook option instead: a social page is not a website, and letting
  // it through here is how the two answers get muddled in the first place.
  if (SOCIAL_HOST.test(baseHost(host))) return { ok: false, reason: "social" };
  if (!DOMAIN.test(host)) return { ok: false, reason: "invalid" };
  return { ok: true, value: `https://${host}${rest}` };
}

export type SocialResult =
  | { ok: true; value: string }
  | { ok: false; reason: "invalid" };

/**
 * Validate and normalise a Facebook/Instagram page. Optional by design: the visitor
 * has already told us they're social-only by picking the option, so a blank box must
 * never block the lead. If they did paste something, it has to look like a page.
 */
export function normaliseSocial(raw: string): SocialResult {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: true, value: "" };
  if (HANDLE.test(trimmed)) return { ok: true, value: trimmed };

  const { host, rest } = split(trimmed);
  const base = baseHost(host);
  if (!SOCIAL_HOST.test(base)) return { ok: false, reason: "invalid" };
  // Bare "facebook.com" with no page after it tells us nothing.
  const page = rest.replace(/^\/+/, "");
  if (!page) return { ok: false, reason: "invalid" };
  return { ok: true, value: `https://${base}/${page}` };
}

/** Copy shown to the visitor. Same strings client-side and in the no-JS notice. */
export const WEBSITE_MESSAGES = {
  empty: "Pop your website address in, or choose Facebook page or No website above.",
  social: "That looks like a social page. Choose “Facebook or Instagram page” above instead.",
  invalid: "That doesn’t look like a website address. Try something like yourbusiness.co.nz",
} as const;

export const SOCIAL_MESSAGE =
  "Paste the link to your page (like facebook.com/yourbusiness), or leave it blank.";
