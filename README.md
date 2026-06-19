# Hyper Digital website (hdweb)

Marketing website for **Hyper Digital**, a New Zealand digital marketing agency for trade and
local businesses (plumbers, electricians, roofers, builders, HVAC, painters, etc.).

🌐 Live: **https://hyperdigital.nz** · 📦 Repo: `github.com/hyperdigitalnz/hdweb`

> Contributing with Claude Code? Read [`CLAUDE.md`](./CLAUDE.md) first — it has the full
> architecture, conventions, lead-form pipeline, deploy notes and work log.

## Tech stack

- [Astro 6](https://astro.build) (`output: server`) with the [@astrojs/cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) adapter
- [Tailwind CSS 4](https://tailwindcss.com) + [daisyUI 5](https://daisyui.com)
- [motion](https://motion.dev) for animations, `@astrojs/sitemap` for the sitemap
- Deployed to **Cloudflare Workers** (static assets + a small SSR worker for the lead API)

## Getting started

```sh
npm install
npm run dev      # local dev server (default http://localhost:4321)
```

Create a `.dev.vars` file in the project root for the lead form to work locally (see
[Environment variables](#environment-variables)).

## Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Build to `./dist/` (`dist/client` = assets, `dist/server` = worker) |
| `npm run preview` | Preview the production build locally |
| `npm run generate-types` | Generate Cloudflare binding types (`wrangler types`) |

> ⚠️ Don't run `npm run build` while `npm run dev` is running — it invalidates the Vite
> dep-optimizer cache and triggers "file does not exist in optimize deps" warnings. If that
> happens: stop dev, `rm -rf node_modules/.vite`, restart (or `npx astro dev --force`).

## Project structure

```text
public/                 Static assets served as-is
  _headers              Security + cache headers
  _redirects            301s from the old site (relative URLs only)
  robots.txt, llms.txt  Crawler files
  favicon.ico, ...      Brand favicons
  img/                  Images (case-studies/<client>/, websites/, ...)
src/
  pages/                Routes (incl. results/<client> case studies)
    api/lead.ts         Lead form endpoint (Turnstile → GHL)
  components/           AuditForm, Header, Footer, Icon, Reveal, ...
  layouts/Layout.astro  SEO meta, canonical, OG, favicons, gtag
  consts.ts             SITE info, NAV, STATS (edit site-wide facts here)
  styles/global.css     Brand themes (black + gold)
```

## Lead form pipeline

`AuditForm` → POST `/api/lead` → verify Cloudflare Turnstile → forward lead to GoHighLevel
webhook → redirect to `/thank-you` (fires the Google Ads conversion). Includes a honeypot,
field allow-listing, and a no-JS fallback (303 redirect). See `CLAUDE.md` for detail.

### Environment variables

| Var | Purpose | Type |
| :--- | :--- | :--- |
| `PUBLIC_TURNSTILE_SITE_KEY` | Turnstile widget (build-time, public) | build var |
| `TURNSTILE_SECRET_KEY` | Turnstile server verification | secret |
| `GHL_WEBHOOK_URL` | GoHighLevel inbound webhook | secret |

- **Local:** put them in `.dev.vars` (or `.env`). Template: `public/.env.example`.
- **Production:** `npx wrangler secret put <NAME>` (or the Worker dashboard). `PUBLIC_*` must be
  present at **build time**.
- Never commit real secrets. `.env*` is git-ignored.

## Deployment

Push to `main` — Cloudflare Workers Builds runs `npm run build` then `npx wrangler deploy`
automatically. The `www → apex` redirect is a Cloudflare dashboard Redirect Rule (not in
`_redirects`, which only allows relative URLs).

## Conventions

- **No em dashes** in customer-facing copy. NZ English, DD/MM/YYYY dates, NZD.
- **Honest reporting** — only publish results a client can verify. No invented stats.
- **No ecommerce framing** — sites are framed as fast, search-ready lead/booking sites.
- Never read or display `.env*` files.
