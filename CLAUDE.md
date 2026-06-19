# CLAUDE.md — Hyper Digital website (hdweb)

Guidance for Claude Code when working in this repo. This is the marketing website for
**Hyper Digital**, a New Zealand digital marketing agency for trade/local businesses
(plumbers, electricians, roofers, builders, HVAC, painters, etc.). Live at
**https://hyperdigital.nz**.

> Parent agency context lives in `/home/matt/Clients/hyper-digital/CLAUDE.md` and
> `/home/matt/Clients/CLAUDE.md`. This file is specific to the website build.

## Tech stack

- **Astro 6** (`output: server`) with the **@astrojs/cloudflare** adapter.
- **Tailwind CSS 4** (`@tailwindcss/vite`) + **daisyUI 5**.
- **motion** for scroll/count-up animations.
- **@astrojs/sitemap** for sitemap generation.
- Deployed to **Cloudflare Workers** (static assets + a small SSR worker for the API route).
- Repo: `github.com/hyperdigitalnz/hdweb`. The Cloudflare Worker is named **`hdweb`** in CI
  (local `wrangler.json` says `website`; CI overrides the name — this warning is expected).

## Commands

```bash
npm run dev          # local dev server (astro dev)
npm run build        # production build → dist/ (dist/client = assets, dist/server = worker)
npm run preview      # preview the build
npm run generate-types  # wrangler types
```

- **Deploy is automatic on `git push origin main`** via Cloudflare Workers Builds
  (runs `npm run build` then `npx wrangler deploy`). There is no `deploy` npm script.
- **Do not run `npm run build` while `npm run dev` is running** — it invalidates the Vite
  dep-optimizer cache (`node_modules/.vite`) and causes "file does not exist in optimize deps"
  warnings. Fix: stop dev, `rm -rf node_modules/.vite`, restart, or `npx astro dev --force`.

## Project structure

- `src/pages/` — routes. Top-level: `index`, `websites`, `lead-generation`, `ai-automation`,
  `about`, `contact`, `results`, `privacy`, `terms`, `thank-you`, `404`.
- `src/pages/results/` — per-client case studies: `bermuda-lifestyle`, `continuous-spouting`,
  `houses-on-the-move`, `no-drips`. Listed/linked from `results.astro` (data array at top; a
  `slug` field gives a card its "Read the full case study" link).
- `src/pages/api/lead.ts` — the lead form endpoint (`prerender = false`, runs in the worker).
- `src/layouts/Layout.astro` — base layout: SEO meta, canonical, OG, favicons, gtag base tag.
- `src/components/` — `AuditForm`, `Header`, `Footer`, `Icon`, `Reveal` (animation wrapper),
  `SocialProof`, `StickyCall`, `LeadFeed`, etc.
- `src/consts.ts` — `SITE` (name, phone `027 666 1973`, email `sales@hyperdigital.nz`),
  `NAV`, `STATS`. **Update site-wide facts here, not inline.**
- `src/styles/global.css` — brand themes. Default theme `hyper` (black `#0c0b0a` + gold
  `#cea46f`); alt theme `hyper-alt`. Brand-dark sections use `bg-brand-dark` (dark bg + gold glow).
- `public/` — static assets served as-is: `img/`, `_headers`, `_redirects`, `robots.txt`,
  `llms.txt`, favicons, `.env.example`.
- `public/img/case-studies/<client>/` — per-client case-study images.
- `public/img/websites/` — portfolio screenshots shown on `/websites` (Recent builds).

## Conventions (must follow)

- **No em dashes (`—`) in any customer-facing copy.** Use full stops, commas, colons, or
  parentheses. (Agency-wide rule.)
- **NZ English** (colour, optimise), **DD/MM/YYYY** dates, **NZD**, timezone Pacific/Auckland.
- **Honest reporting.** Only publish results a client can verify in their own account. No
  invented stats, guarantees, awards or reviews. Case-study numbers come from real client data.
- **No ecommerce framing.** We no longer build online stores. Bermuda Lifestyle and Tableau
  Towbars stay as case studies but are framed as fast, search-ready lead/booking sites.
- **Never read/display `.env*` files** (global security rule). Reference variable names only.
- Match existing component patterns (the `Reveal` wrapper, daisyUI classes, `Icon` names from
  `src/components/Icon.astro`).

## Lead form pipeline

Flow: `AuditForm.astro` → POST `/api/lead` → Turnstile verify → forward to GHL → redirect to
`/thank-you` (which fires the Google Ads conversion).

- **`AuditForm.astro`**: native form, JS progressive enhancement (fetch). Honeypot field
  `company`. Renders the Turnstile widget only if `PUBLIC_TURNSTILE_SITE_KEY` is set. On a
  verified `{ok:true}` it does `window.location.assign("/thank-you")`.
- **`api/lead.ts`**: honeypot check → Turnstile siteverify (skipped if no secret) → allow-list
  fields (`name, phone, trade, region, goal, email, message`; `name`+`phone` required, capped
  500 chars) → POST JSON to `GHL_WEBHOOK_URL` (skipped if unset). Returns JSON for the JS path;
  for a no-JS form POST (Accept: text/html) it returns a **303 redirect** (`/thank-you` on
  success, `/contact` on bot/missing).
- **`thank-you.astro`** (`noindex`): fires `gtag('event','conversion', {send_to:
  'AW-703611224/KEGlCPfXyr4cENiCwc8C'})` on load. Conversion fires here only (not in the form)
  to avoid double-counting.
- **gtag base tag** (`AW-703611224`) is in `Layout.astro`.

### Environment variables (see `public/.env.example`)

| Var | Where | Type |
|---|---|---|
| `PUBLIC_TURNSTILE_SITE_KEY` | `AuditForm` (build-time, baked into client) | public build var |
| `TURNSTILE_SECRET_KEY` | `api/lead.ts` siteverify (runtime) | Worker secret |
| `GHL_WEBHOOK_URL` | `api/lead.ts` forward (runtime) | Worker secret |

- Local: `.dev.vars` (Wrangler) / `.env` (`astro dev`). Production: `wrangler secret put …` or
  Worker → Settings → Variables & Secrets. `PUBLIC_*` must exist at **build time**.

## SEO / infra

- **`public/_redirects`** — 14 × 301 from the old GHL site URLs to new pages. **Relative URLs
  only** (Cloudflare rejects absolute URLs here and fails the whole deploy).
- **Canonical host = non-www (apex).** Canonical `<link>` tags already use the apex
  (`Astro.site`). The `www → apex` 301 must be a **Cloudflare dashboard Redirect Rule**, NOT in
  `_redirects` (absolute URLs are disallowed there).
- **`public/_headers`** — security headers + caching (`/_astro/*` immutable, `/img/*` 1 week).
- **`public/robots.txt`** → points at `sitemap-index.xml`. **`public/llms.txt`** — AI crawler
  summary of services/results/company.
- **Favicons**: brand mark generated from `public/img/hd-favicon.png` →
  `public/favicon.ico` (16/32/48), `favicon-48.png`, `apple-touch-icon.png` (180, white bg).
  Layout references these; the old Astro `favicon.svg` link was removed.

## Work log

### 2026-06-19 — v1.0 (initial site build, committed & deployed)
- **Case studies**: created `results/bermuda-lifestyle.astro` (multi-channel: website + Google +
  Meta) and `results/no-drips.astro`; wired both into `results.astro` (Bermuda is the featured
  card with a "Read the full case study" link).
- **Case-study images**: reorganised into per-client subfolders under `img/case-studies/`;
  updated all hero/gallery paths; set new heroes (Continuous Spouting → bevelled-rakes photo,
  Houses on the Move → moving-truck photo, No Drips → main-hero-shot) and results screenshots.
- **Removed the "See it for yourself" image section** from all four case-study pages.
- **About page**: swapped Matt's profile photo to `matt-profile-new.png` (green background).
- **Websites page**: repointed the Bermuda proof image, then **removed** it; rebuilt the
  "Recent builds" portfolio to show 6 transparent PNG screenshots from `img/websites/` on the
  black brand background, each clickable to the live site (`rel="nofollow noopener noreferrer"`,
  opens new tab) with the domain shown beneath in a white box (dark text). Two columns, wide
  `16/10` images. Live URLs verified (200) and confirmed via search where non-obvious:
  bermuda.co.nz, continuous-spouting.co.nz, stichautos.co.nz, lukopainting.nz,
  chesterhopekennels.co.nz, adrenalinr.com.
- **Forms → `/thank-you`**: created `thank-you.astro` (fires conversion), updated `AuditForm` to
  redirect there, added no-JS 303 handling in `api/lead.ts`.
- **Redirects + 404**: created `public/_redirects` (old GHL URLs → new pages) and a branded
  `404.astro`.
- **llms.txt**: created `public/llms.txt`.
- **Favicon**: replaced the Astro default with the HD brand mark (ico + png + apple-touch).
- Turnstile + GHL wiring was already in the code; configuration (keys/secrets/webhook) is done
  by the user outside the repo.

## Pending / TODO

- **Trade landing pages** (plumbers, electricians, roofers, HVAC, builders, painters, …):
  NOT started. Matt will provide an existing template page to model them on first. **Do not
  build until that template is supplied.**
- **`www → apex` Redirect Rule**: create in the Cloudflare dashboard (Rules → Redirect Rules):
  hostname `www.hyperdigital.nz` → 301 `concat("https://hyperdigital.nz", http.request.uri.path)`,
  preserve query string.
- **`.dev.vars` is not git-ignored** — add it to `.gitignore` so local secrets can't be
  committed.
- **Google Ads final URL**: the SKAG campaign's final URL is `/google-ads` (301s to
  `/lead-generation` for now). Update the campaign final URL to `/lead-generation` once live.
- **`public/favicon.svg`** (old Astro default) is unreferenced but still on disk — delete it.
- After cutover: submit the sitemap in Google Search Console and request indexing.
