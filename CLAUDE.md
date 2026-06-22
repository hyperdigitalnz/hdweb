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

### 2026-06-22 — Trade landing pages rollout (5 more trades)
- Built out the remaining trades on the existing template (see the template log below). Added 5
  data entries to `src/data/tradeLeadGen.ts` + thin page files:
  - **electricians** → `/electricians-lead-generation`
  - **roofers** → `/roofers-lead-generation`
  - **builders** → `/builders-lead-generation`
  - **painters** → `/painters-lead-generation`
  - **heat-pumps** (covers the "HVAC" item) → `/heat-pump-lead-generation`. Copy framed around
    heat pump installers (the dominant NZ search); data key is `"heat-pumps"`, SEO/FAQ name HVAC
    too. Slug is `heat-pump-...`, not `hvac-...`, for NZ search intent.
- Each entry tailors hero, `painLine`, the 3 mistakes (mistake #1 + stats trade-specific; #2/#3
  reworded with the trade noun), `searchTerms`, and one `faqExtra`. **No per-trade `proof`/`chart`
  supplied**, so all 5 fall back to the shared default results (Tableau / Harris / Bermuda), which
  are real and client-verifiable. (Plumbers keeps its No Drips-only override.)
- **Linked from `lead-generation.astro`**: new "By trade" section before the final CTA, built by
  mapping `Object.values(tradeLeadGen)` (DRY — new trades appear automatically). Labels are the
  capitalised `tradePlural`.
- Verified via the running dev server (port 4321): all 6 trade pages + `/lead-generation` return
  200 with no Astro/Vite error overlay, correct H1s, 0 em dashes. Did **not** run `npm run build`
  (dev server was live; building invalidates its Vite cache per the rule above).
- **Footer not touched** — 6 trade links would clutter it; the `lead-generation.astro` "By trade"
  row is the hub. Add to Footer later if Matt wants it.
- **No top nav on the trade LPs** (CRO for paid traffic): added a `hideHeader?: boolean` prop to
  `Layout.astro` (`{!hideHeader && <Header />}`), and `TradeLandingPage.astro` passes `hideHeader`.
  So every trade page renders with no header (no nav links / menu / exit paths); the rest of the
  site is unchanged. Footer kept in full (Matt's call: visitor has scrolled the whole page by
  then, low exit risk; keeps Privacy/Terms + partner badges). Mobile `StickyCall` tap-to-call bar
  still shows. `/lead-generation` itself keeps its header (it's a hub page that links out by
  design) — give it `hideHeader` too if it becomes a direct paid destination. Nothing
  committed/pushed.

### 2026-06-22 — Trade landing pages (template + plumbers) + copy de-roofing
- **De-roofed generic copy**: reframed roofer-specific imagery (on the roof / up a ladder /
  under a sink) into generic tradie lines across `index.astro` and `websites.astro` (e.g. "flat
  out on a job", "finished the job in front of you"). "On the tools" left as-is (generic NZ).
- **Trade landing pages — data-driven template.** New top-level URL pattern
  `/[trade]-lead-generation` (NOT `/lp/[trade]`). Built one reusable template + a per-trade data
  map + thin page files (Astro can't do partial-segment dynamic routes, and a `[slug]` catch-all
  would shadow other routes, so each trade page is a real file):
  - `src/data/tradeLeadGen.ts` — `TradeLP` type + `tradeLeadGen` record. Per-trade tokens only:
    slug, trade/tradePlural/tradeSingular, SEO title/desc, hero (`heroEyebrow`,
    `heroHeadlineLead`, `heroHeadlineMark`, `heroSub`), `painLine`, `mistakes[3]`,
    `searchTerms[3]`, optional `proof[]` / `chart` / `resultsSub` / `faqExtra`.
  - `src/components/TradeLandingPage.astro` — the shared long-form template (13 sections): hero +
    VSL, trust bar (`STATS`), 3 mistakes, why-point-solutions-fail, 3-option compare, 6-part
    system, results (chart + tiles), pricing + **$10,600 value stack**, 60-day guarantee,
    who-it's-for/not, how-it-works, FAQ + `AuditForm`, final CTA. FAQ JSON-LD included.
  - `src/components/Vsl.astro` — responsive 16:9 click-to-play video block.
  - `src/pages/plumbers-lead-generation.astro` — thin page wiring template + `tradeLeadGen.plumbers`.
- **Offer model (locked with Matt):** match the main site — **$1,497 +GST setup + from
  $497/mo +GST**, ad spend separate, "hit your agreed lead goal in 60 days or we work free"
  guarantee. The value stack is a perceived-value anchor only; the real price sits beneath it.
- **VSL** is set once in `TradeLandingPage.astro` (`VSL_SRC`, currently
  `…/media/69e1ba1950b9a3263a793b97.mp4`), so it updates every trade page at once.
- **`.marker` gotcha**: the gold marker span is `white-space: nowrap`, so `heroHeadlineMark`
  must be a short 2-4 word phrase or it overflows the H1. Plumbers H1 = "We get you **more
  plumbing jobs.**" (kept dead simple on purpose).
- **Edits during review (plumbers page):** removed the client-logo cluster (also removed it from
  `lead-generation.astro`); removed the ROI "math" section (doubled up with pricing); swapped
  value-stack "SMS follow-up" → "Email follow-up & nurture system"; hero stacks single-column at
  all breakpoints (VSL underneath, not squished beside text); **results section is now No Drips
  only** (per-trade `proof`/`chart`/`resultsSub` tokens; chart $45 target → $14, tiles $14 CPL /
  ~9% CTR / ~$3k wasted spend cut — all from `results/no-drips.astro`, client-verifiable).
- **Conventions honoured**: no em dashes, NZ spelling, `STATS` from `consts.ts` as the single
  source of trust numbers (the old GHL LPs' "17 years / 60+ clients" were wrong), real clients
  only in results.
- **Open question for Matt**: old GHL LPs said "call Ryan"; site/About features Matt and
  `consts` has no first name, so CTAs use the phone number only. Confirm whether to name a person.
- Build verified clean each step; **nothing committed/pushed yet.**

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

- **Trade landing pages — rollout**: ✅ template + 6 trades built (plumbers, electricians,
  roofers, builders, painters, heat-pumps) and linked from a "By trade" row on
  `lead-generation.astro`. All awaiting Matt's sign-off. To add more trades: new entry in
  `src/data/tradeLeadGen.ts` + a thin `src/pages/<trade>-lead-generation.astro` (the by-trade row
  picks it up automatically). Open items: (a) decide whether to also link the trade pages from
  `Footer.astro`; (b) no `_redirects` needed (no legacy GHL trade slugs exist); (c) review/refine
  the per-trade copy with Matt; (d) consider per-trade `proof`/`chart` where a verifiable client
  matches the trade (currently only plumbers overrides, via No Drips).
- **`www → apex` Redirect Rule**: create in the Cloudflare dashboard (Rules → Redirect Rules):
  hostname `www.hyperdigital.nz` → 301 `concat("https://hyperdigital.nz", http.request.uri.path)`,
  preserve query string.
- **`.dev.vars` is not git-ignored** — add it to `.gitignore` so local secrets can't be
  committed.
- **Google Ads final URL**: the SKAG campaign's final URL is `/google-ads` (301s to
  `/lead-generation` for now). Update the campaign final URL to `/lead-generation` once live.
- **`public/favicon.svg`** (old Astro default) is unreferenced but still on disk — delete it.
- After cutover: submit the sitemap in Google Search Console and request indexing.
