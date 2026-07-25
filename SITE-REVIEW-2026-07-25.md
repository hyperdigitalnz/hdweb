# Site review & development plan — hyperdigital.nz

**Date:** 25/07/2026 · **Scope:** design, UX/UI, copy, conversion, mobile nav, interactive tools, performance
**Reviewed:** all 33 routes, 16 components, `global.css`, build output, brand + service context, keyword research (23/07), GHL chatbot training doc (24/07), LOGS.md.
**Updated:** 25/07/2026, after Matt's review. His decisions are folded in throughout and listed in "Decisions locked in" below.

---

## Context

The site was rebuilt in June 2026 and has been tuned steadily since. It is in better shape than most agency sites: the copy is in the tradie's language, the proof is real and verifiable, the pricing is public, and the guarantee is specific. **This is not a teardown.** The work below is surgical.

Three things have changed since the copy was written, and the site hasn't caught up:

1. **The service offer got bigger.** The chatbot training doc (24/07) documents calendar/CRM/accounting integrations and built-in payments. Neither appears anywhere on the website.
2. **We now have keyword data** (23/07) showing where the demand actually is, and the homepage title/description target nothing.
3. **The proof library grew to 8 case studies**, but the homepage still leans on the same 3 quotes and the results index promises numbers the case-study pages don't show.

Plus one structural problem: **the mobile menu is a 224px daisyUI dropdown with 5 links.** Roughly two-thirds of tradie traffic is mobile, and four money pages (`/google-ads`, `/facebook-ads`, `/insights`, `/contact`) are unreachable from it.

**Headline verdict:** the copy needs additions more than rewrites; the design needs rhythm and one accessibility fix; the nav needs replacing on every breakpoint; and there is a short list of interactive tools worth building that tradies will actually use.

---

## Decisions locked in (Matt, 25/07/2026)

1. **Exit terms confirmed.** No lock-in contracts. One month's notice on cancellation, purely so we can clear any media spend that has rolled over or needs to catch up (e.g. an overspend the previous month). Every marketing asset built for the client (Google Ads campaigns, Meta campaigns, landing pages, conversion tracking) is fully owned by and transferred to the client on cancellation. Copy blocks ② and ③ below are updated to match.
2. **Retire the "replies in 30 seconds" claim site-wide.** Matt's call: the stopwatch framing is confusing. Replaced with instant-reply language; full sweep inventory in §3.2. The channel rule is unchanged: a "reply" is the automatic email or AI chat, never a phone answer, never SMS.
3. **Gold-on-light contrast fix approved.** `#8a6432` for text on light backgrounds; `#cea46f` stays for dark sections, fills, borders and button backgrounds.
4. **The nav redesign covers desktop and tablet too**, not just the mobile panel. Same IA, same styling language, one nested `NAV` source.
5. **The lead value calculator and the plan picker merge into one tool**, with a trade dropdown, and every use is recorded (anonymously) so our own trade-level numbers improve over time. Spec in Part 4.
6. **The trade + region CPL benchmark tool is parked.** We don't have the data. The calculator's usage logging is exactly what will eventually build it.
7. **Google reviews go on the site, as a static badge.** 15 reviews, all 5 star. Matt's final call (25/07): not worth the auto-update machinery — the count lives in `consts.ts` and gets bumped by hand as reviews grow. Spec in §3.7.
8. **Primary CTA becomes "Get my free game plan"** (final wording 26/07; the earlier "Book 20 minutes with Ryan or Matt" was too long, and "audit" is retired as the offer name — nobody wants to be audited). The founders' names move to the form microcopy. Spec in §3.5.
9. **Client numbers updated: 107 clients since 2019, 49 on the books today** (Matt, 25/07). "40+" is retired everywhere. 107 goes in the trust stats as the experience number; 49 substantiates the capacity/exclusivity copy. The two never sit adjacent. Spec in §3.6.

---

## Part 1 — Findings, ranked

### A. Things that are wrong (fix first, cheap)

| # | Finding | Evidence |
|---|---|---|
| A1 | **Gold on light backgrounds fails WCAG contrast.** `#cea46f` on `#ffffff` = **2.29:1**. AA needs 4.5:1 for body text, 3:1 for large text. This affects `.marker` (in most H2s), `.eyebrow` (every light section), `text-primary` stat numbers, and ghost-button links. On dark sections it's 8.4:1 and fine. | `global.css:183`, `:234` |
| A2 | **No Drips JSON-LD contradicts the page.** Schema headline says "under the $100 target"; the page says $45 four times. | `results/no-drips.astro:58` vs `:34, :92, :242` |
| A3 | **Results index promises numbers the case studies don't show.** `+122% tracked leads YoY` (Houses On The Move) and `Phone enquiries up 69%` (Tableau) appear on cards and the homepage but nowhere on those case-study pages. Both are likely true (69% is in the chatbot doc); they're just unsubstantiated *on the page a sceptic clicks through to*. | `results.astro:76`, `index.astro:406` |
| A4 | **`/links` is a byte-for-byte duplicate of `/links-in-bio`** and is still in the sitemap despite being noindex. | `pages/links.astro`, `astro.config.mjs:18` |
| A5 | **Homepage passes no `title` or `description`** — it falls through to the Layout defaults, which contain no keyword we're trying to rank for. | `index.astro:120` |
| A6 | **`/ai-automation` contradicts itself.** Hero and site-wide copy promise "AI chat"; all four automations listed on the page are email-only. | `ai-automation.astro:126-146` |
| A7 | **Minor nits (batch with the above):** `SocialProof.astro` says "Trusted by 40+ Kiwi tradies" — inaccurate twice over (the logo wall includes Harcourts, a taxi co-op and a hospice, and the number is now 107) — superseded by the §3.6 numbers refresh + §3.7 live badge. Duplicated `instant instant` attribute at `index.astro:125` and `TradeLandingPage.astro:163`. Trade-LP guarantee uses `text-primary` where every other page uses `.marker`. Dead `heroImage`/`heroImageAlt` fields on `TradeLP`. | `SocialProof.astro:35`, `tradeLeadGen.ts` |

Note: the bracketed placeholder testimonials on five case studies are inside HTML comments — verified not present in the build or on the live site. Not a bug.

### B. Performance (measured, not estimated)

Built from a clean `npm run build`:

| Asset | Size | Problem |
|---|---|---|
| `Layout.C6NWCc3k.css` | **187 KB raw / 30.6 KB gzip** | `@plugin "daisyui" { themes: all }` ships **37 themes**. We use 2, and the A/B picker that justified it no longer exists. |
| `animate.js` (motion) | 61 KB | Loaded on every page for scroll-reveal + two counters. |
| `ClientRouter.js` | 16 KB | View transitions. |
| Homepage HTML | 84 KB | |
| `public/img/` | **31 MB total** | Bypasses Astro entirely (`public/` is served as-is), so no AVIF/WebP, no responsive `srcset`, no content hashing. |

Referenced images shipping at full size: `phone-on-table.jpg` **2.0 MB**, `working-on-laptop.jpg` **1.9 MB**, `bermuda-lifestyle-case-study-hero.jpg` 1.5 MB, `no-drips-main-hero-shot.jpg` 1.3 MB, `tidy-homepage-no-enquiries.jpg` 1.0 MB, `plumbers-serp.jpg` 0.64 MB.

Plus roughly **15 MB of unreferenced images** in `public/img/` (including `pipeline-animation.gif` at 3.8 MB) that deploy on every push.

`@fontsource/source-sans-3/800.css` is imported in `Layout.astro` for **every page** but is only used for SVG chart labels on a handful of case studies — it pulls cyrillic, greek and vietnamese subsets into the global CSS.

**On the "100 on any Lighthouse test" goal — the honest position:** three third-party scripts load eagerly on every page (GTM, a *separate* gtag loader hitting the same domain, and the LeadConnector chat widget). With those unchanged, mobile Performance realistically caps around 85–95 and varies run to run. 100 is achievable, but it requires the chat-widget facade and the GTM deferral in Phase 1. Everything else (CSS trim, images, fonts) is free.

### C. Design & UI

- **Section rhythm is flat.** Almost every section is `py-16 sm:py-24` + centred eyebrow + H2 + a 3-card grid with an `icon-chip`. The 21/07 log already caught "a 6-section light run" on `/facebook-ads`. There's no documented banding system, so each page drifts.
- **Card monotony.** The `icon-chip → h3 → p` card is used ~40 times across the site. It needs 3–4 sibling archetypes (split-with-visual, stat band, overlap/offset, full-bleed quote) to break the pattern.
- **Body copy is `text-base-content/70`** (70% of near-black) at 18px. For a 45-year-old roofer reading on a phone in daylight, `/80` is the floor.
- **Heading line-height is 0.95 globally.** Fine for a 2-line desktop H1; tight for a 3-line mobile H1. Should step to ~1.05 below `sm`.
- **Trust bar stacks to 5 full-width rows on mobile** — a whole screen of scrolling before the first real section.
- **5 of 8 case-study cards have no image** on `/results`, which is the proof page.
- **The phone number is hidden below `sm`** in the header. On a phone, tap-to-call requires opening the menu first.
- Imagery skews stock (`working-on-laptop.jpg`, `phone-on-table.jpg`, `digital-growth-partners.jpg`). Tradies trust sites that look like their world.

### D. Copy & conversion

The writing is strong. The gaps are **things not said**:

- **Integrations are invisible.** Google Calendar, Calendly, Cal.com, monday.com, Asana, ClickUp, Notion, HubSpot, Xero, QuickBooks — all documented in the chatbot doc, none on the site. "Will it work with what I already use?" is a top-5 objection for an established builder or HVAC firm.
- **Payments are invisible.** Card payments on booking, deposits, call-out fees, invoices, payment links, Apple/Google Pay, Stripe/PayPal. For roofers and builders taking deposits on $20k+ jobs this is a differentiator, not a footnote.
- **"I've been burned by an agency before"** is the single most common objection from a tradie with a $15k+ average job value, and the site never addresses it. We have the perfect proof: we cut ~$3,000 of the previous agency's wasted spend at No Drips.
- **"Do I own it if I leave?"** — never answered. With a managed platform this is a genuine question and ducking it reads as a red flag.
- **"What if I get too busy?"** — a real tradie objection (they've all had the flood-of-junk-leads experience). Never answered.
- **"How much of my time does this take?"** — the trade LPs say 20 min + 1 hour, but no other page does.
- **Regional exclusivity** ("we'll only run ads for one roofer in your patch") is the strongest honest urgency device on the site, and it only appears on the trade LPs.
- **Price is absent from every hero.** Tradies self-qualify on price. Putting "From $497 +GST/mo plus ad spend, no lock-in" in the hero costs nothing and filters tyre-kickers.

**Repetition to resolve:** the H2 *"Simple plans. No lock-in. No surprises."* is on 6 pages; the identical guarantee block is on 7 pages plus the trade template; *"Real accounts, real numbers."* and *"The work that actually moves cost per lead."* are verbatim on both ad pages. This is a duplicate-content and a boredom problem. Extract the guarantee into a component with a `variant` prop and vary the framing per page.

### E. SEO / IA (from the 23/07 keyword data)

| Keyword | NZ vol/mo | Difficulty | Our rank | Status |
|---|---|---|---|---|
| `seo agency in new zealand` | 590 | **KD 5** | – | **No SEO page. `/seo` currently 301s to `/lead-generation`.** |
| `seo services nz` | 480 | KD 25 | – | same |
| `seo agency nz` | 210 | KD 26 | – | same |
| `website design nz` | 1,000 | KD 72 | – | `/websites` doesn't use "website design" language |
| `website design auckland` | 5,400 | KD 76 | – | no city pages |
| `digital marketing agency nz` | 390 | KD 43 | ~55 | homepage, weak title |
| `websites for tradies` / `tradie website` | 50 each | thin SERP | – | `/websites` should own these outright |

**The `/seo` gap is the biggest single miss.** ~1,280 monthly searches across three terms at difficulty 5–26, and we currently redirect that URL away. Removing that redirect and building a real `/seo` page is the highest-ROI new page on the list. (Heed the `_redirects` trap documented at line 10: never add a `/seo/` → `/seo` rule — it loops with Cloudflare's trailing-slash normalisation.)

Auckland/Christchurch city pages were already agreed as the next step in the 21/07 log; the volume confirms it.

---

## Part 2 — Mobile navigation

**Replace the daisyUI dropdown with a native `<dialog>` full-screen panel.**

Why `<dialog>` and not a hand-rolled drawer: `showModal()` gives us focus trap, Escape-to-close, `inert` background and top-layer stacking (it renders *above* the GHL chat widget) for free. daisyUI 5's `.modal` / `.modal-top` classes style it. Total cost: ~35 lines of TS and no new dependency.

### Layout

Panel opens **downward from the header** (never from the bottom — the GHL chat embed owns that area, per Matt's 03/07 call).

```
┌──────────────────────────────────────┐
│  HYPERDIGITAL              [ ✕ ]     │  ← 70px, matches header
├──────────────────────────────────────┤
│  ● Open now · give us a bell         │  ← live, from SITE.hours
│                                       │
│  ┌────────────────┐ ┌──────────────┐ │
│  │ 📞 027 666 1973│ │ Free audit → │ │  ← action pair, top of panel
│  └────────────────┘ └──────────────┘ │
│                                       │
│  GET MORE WORK                        │
│  Google Ads              →            │  ← 56px rows, gold chevrons
│  Facebook Ads            →            │
│  SEO & Local             →            │
│  Lead Generation         →            │
│                                       │
│  THE SYSTEM                           │
│  Smart Websites          →            │
│  AI Automation           →            │
│                                       │
│  BY TRADE                             │
│  [Plumbers][Sparkies][Roofers][…]     │  ← horizontal chip scroller
│                                       │
│  PROOF & COMPANY                      │
│  Results · Insights · About · Contact │  ← 2-col compact grid
│                                       │
│  ★ 5.0 · 15 Google reviews            │  ← live badge (§3.7)
└──────────────────────────────────────┘
```

### What makes it "dynamic and exciting" without costing performance

- **Staggered row entrance** — each group animates in on a 40ms cascade via CSS `animation-delay` (no JS, no motion import). Panel itself scales+fades from the hamburger's position.
- **Gold sweep on the active/pressed row** — reuse the existing `.btn-shine` keyframe.
- **Live open/closed indicator** — a small script reads `Pacific/Auckland` time against `SITE.hours` and renders either "Open now, give us a bell" (green dot) or "Closed, but every web enquiry still gets an instant reply" (gold dot). This is the one bit of dynamism tradies notice, because it's the question they're actually asking.
- **Trade chips** are the high-intent path: a roofer landing on the homepage from a Google Ad should be one tap from `/roofers-lead-generation`.
- **`::backdrop`** blurred + darkened, closing on click.

### Hard constraints this must respect

1. **Reduced-motion:** `global.css:497-501` clamps `*` to `0.01ms`. The open state must be visually correct with zero animation — so the panel's resting styles carry all the design, and the animation only adds entrance.
2. **ClientRouter:** close the dialog on `astro:before-swap` (otherwise the panel survives navigation and traps the user), re-wire on `astro:page-load`, guard with a `dataset.wired` flag. `index.astro:687` is the existing teardown reference.
3. **Body scroll lock:** use `position: fixed` + stored `scrollY` on `<body>`. Do **not** set `overflow: hidden` on `html` — it creates a scroll container and breaks the sticky header (`global.css:129-132`).
4. **Header height:** keep it at 70px. `scroll-mt-24` is baked into ~12 `#audit` anchors across the site; changing the height means revisiting all of them.
5. **Trade LPs are unaffected** — all six render with `hideHeader`.

### Desktop and tablet, same treatment (Matt, 25/07)

The redesign is not mobile-only. One nested `NAV` structure in `consts.ts` drives all three surfaces:

- **Desktop (≥1024px):** add a **"Get more work" dropdown** grouping Google Ads / Facebook Ads / SEO / Lead Generation, keeping the top level at 5 labels: `Get more work ▾ · Websites · Automation · Results · About`. Styled with the same language as the mobile panel: same group heading, gold chevrons, staggered row entrance on open. daisyUI `dropdown` driven by CSS with hover + focus support, fully keyboard-navigable (`aria-expanded`, Escape closes). The open/closed pill sits in the header next to the phone number on wide screens.
- **Tablet (<1024px):** gets the new `<dialog>` panel. The header already switches to the hamburger below `lg`, so portrait iPads move from the 224px dropdown to the full panel automatically.
- **Footer** reads from the same nested `NAV`, so the four currently footer-only pages stop drifting out of sync.

*(The "SEO & Local" row lands with Phase 7's `/seo` page; until then that group has three rows.)*

---

## Part 3 — Copy rewrite

### 3.1 Metadata (do this first, it's free)

| Page | Current | Proposed |
|---|---|---|
| `/` title | *(falls through to Layout default)* | `Digital Marketing for NZ Tradies \| Google Ads, Websites & Automation` |
| `/` description | Layout default | `Google Ads, smart websites and automation that get NZ tradies more booked jobs. Every enquiry gets an instant reply, 24/7. From $497 +GST/mo. Free 20-minute audit.` |
| `/websites` | `Smart Websites for Tradies…` | `Website Design for Tradies NZ \| Sites That Book Jobs \| Hyper Digital` — picks up `website design nz` / `websites for tradies` |

### 3.2 Retire the "30 seconds" claim (site-wide sweep)

Matt's call (25/07): the stopwatch framing is confusing. It also invites the wrong reading (that someone answers the phone in 30 seconds), which the lead-response rules already prohibit implying.

**New standard wording:**
- Badge (`SpeedBadge` default and every label passed to it): **"Instant replies, 24/7"**
- Body verb: **"replies straight away"** / "every enquiry gets an instant reply, day or night"
- The claim stays channel-honest: the reply is the automatic email + AI chat. Never "we answer", never calls, never SMS.

**Sweep inventory** (every current touchpoint):

| File | Current | Change to |
|---|---|---|
| `components/SpeedBadge.astro` | default label `Replies in 30 seconds` | `Instant replies, 24/7` |
| every `SpeedBadge` label passed by pages (`index`, `websites`, `TradeLandingPage`, `AuditForm` uses the default) | `Replies in 30 seconds, 24/7` | drop the label prop, take the new default |
| `index.astro` hero sub | "reply to every enquiry in 30 seconds" | "reply to every enquiry straight away" |
| `index.astro` withUs list | "answered in 30 seconds, day or night" | "an instant reply, day or night" |
| `index.astro` system card 02 | "book every enquiry in 30 seconds" | "answer, qualify and book every enquiry on the spot" |
| `index.astro` Speed-wins section | H2 "Yours takes 30 seconds" | keep the speed premise, lose the stopwatch: "The fastest reply wins the job. Yours goes out **before they ring the next name**." |
| `components/ChatDemo.astro` | badge "Replied in 24 seconds" | "Instant reply sent" |
| `components/LeadFeed.astro` | meta "Replied in 28 seconds" | "Replied straight away" |
| `data/pricing.ts` Starter feature | "30-second reply smart website (SEO & AEO optimised)" | "Smart website with instant lead replies (SEO & AEO optimised)" |
| `data/tradeLeadGen.ts` | `heroSub` ×6 + plumbers `seoDescription` "replies in 30 seconds" | "replies straight away" |
| `TradeLandingPage.astro` | "Instant lead response" system card body | verify wording, align |
| `websites.astro` | "01 Replies in 30 seconds" + related copy | "01 Replies instantly" |
| `CLAUDE.md` (this repo) | convention: 'Standard badge wording is "Replies in 30 seconds, 24/7"' | update the convention to the new standard |
| `../ghl-chatbot-training.md` | "booked in about 30 seconds" | outside this repo; update next time the bot doc ships so chat and site say the same thing |

Verification: after the sweep, `grep -rniE "[0-9]+ second" src/ CLAUDE.md` should return nothing customer-facing. The one allowed survivor is the "60-second website check" tool name (that's how long the *check* takes, a different claim).

### 3.3 New copy blocks (the objection work)

These are the sections to add. Each kills an objection before the tradie thinks to ask it.

**① Price in the hero.** ~~Directly under the hero CTA pair~~ **Reversed by Matt 26/07:** the hero
CTA is an email opt-in (the free game plan), not the purchase decision, so price at that point is
friction, not qualification. Price stays where the buying decision happens (the pricing section,
the calculator and the FAQ). Shipped briefly, then removed.

**② "If you've been burned before, read this."** New section, dark band, homepage + `/google-ads`:

> Most tradies we talk to have already paid an agency and got nothing back. Usually the same story: a monthly report full of clicks and impressions, no way to tell if a single job came from it, and a contract you can't get out of.
>
> Here's how we're different, and you can check every line of it:
>
> - **Everything we build for you is yours.** The Google Ads campaigns, the Meta campaigns, the landing pages, the conversion tracking. If you ever leave, all of it transfers to you in full.
> - **You see the raw dashboards**, not our version of them. If our numbers don't match yours, ours are wrong.
> - **We report leads, not clicks.** Real calls and quote requests, and what each one cost.
> - **No lock-in.** One month's notice, and that month is about your money, not ours: it lets us clear any ad spend that's rolled over or catching up, so your account leaves clean.
>
> When we took over No Drips' account, the first thing we did was find close to $3,000 the previous agency had spent on clicks that were never going to book a job. Then we cut it.

*Terms confirmed by Matt 25/07/2026.*

**③ "What happens if I leave?"** FAQ + a line in ②. Terms confirmed by Matt 25/07:

> No lock-in contract. We ask for one month's notice when you cancel, and there's a simple reason: ad spend can roll over from month to month, so the notice month lets us clear anything that's carried over or catching up and hand your account over clean. Everything we've built for your marketing is yours: the Google Ads campaigns, the Meta campaigns, the landing pages, the conversion tracking. All of it transfers to you in full, along with your domain, your Google Business Profile and your customer list. No exit fee, no argument.

**④ Integrations strip.** Homepage + `/websites` + `/ai-automation`. A logo/name row, not a card grid:

> **It plugs into what you already run.**
> Bookings sync with Google Calendar, Calendly and Cal.com. Jobs and meetings drop into monday.com, Asana, ClickUp, Notion or HubSpot automatically. Xero and QuickBooks keep the paperwork side up to date. Using something else? Mention it on your audit and we'll check the fit.

**⑤ Payments block.** `/websites` + `/ai-automation`:

> **Take the deposit while they're still keen.**
> Card payments on bookings (handy for a deposit or a call-out fee), invoices and payment links, Apple Pay and Google Pay. Works with Stripe or PayPal, and plugs into Xero or QuickBooks if that's where your invoicing already lives.

**⑥ "What we need from you."** Homepage, near "How it works":

> **20 minutes.** The free audit call.
> **One hour.** We walk you through the system once it's built.
> **That's it.** No content to write, no photos to chase, no logins to figure out. We build it, we run it, you stay on the tools.

**⑦ "What if I get too busy?"** FAQ, everywhere:

> Good problem, and a real one. We agree your monthly lead target before we start and we can throttle the ad spend up or down any month. Plenty of our clients dial it back over summer and open it up again when they've got capacity. You're never stuck paying for leads you can't service.

**⑧ Promote regional exclusivity to the homepage.** Currently trade-LP-only:

> **We only take one of each trade per patch.** If we're already running ads for a roofer in Napier, we won't take a second one. It's the only way both of you get a fair go, and it's why we can only take on a handful of new clients a month.

*This needs the exclusivity list (Part 5, #8) to be real before it goes site-wide.*

**⑨ Fix the `/ai-automation` contradiction.** The four automations listed are email-only, but AI chat is the headline capability. Add it to the list explicitly, and keep the channel discipline: **email + AI chat + booking + payments. Never SMS, never "we answer your phone".**

### 3.4 Reduce repetition

Extract `<Guarantee>` and `<PricingBlock>` into components taking a `variant` prop, so the six near-identical H2s become six angles on the same promise:

- `/google-ads` → *"Hit your lead goal in 60 days, or we manage your ads for free."*
- `/websites` → *"If the site isn't bringing you leads in 60 days, we keep working for free."*
- `/facebook-ads` → *"60 days to hit your number, or our fee stops."*

### 3.5 CTA and offer rename: "Get my free game plan"

Superseded twice, final on 26/07: "Book 20 minutes with Ryan or Matt" (25/07) was too long, and
Matt's insight on the original: the `Get my free ___` outcome shape was right but **nobody wants to
be audited**. The offer is renamed **"free game plan"** site-wide.

- **Primary CTAs** (heroes, sections, final bands, form submit): **"Get my free game plan"**
- **Compact contexts**: header desktop "Get my free game plan", header mobile "Game plan"
- **The event** is "your game plan call" in body copy; form titles "Get your free game plan"
  (ads/SEO variants: "Get your free Google Ads game plan" etc.)
- **The names live in the microcopy**, not the button: form microcopy is now "20 minutes with
  Ryan or Matt, real numbers, no obligation."
- "Audit" survives only as an honest verb about accounts ("we audit your website and marketing",
  "we took over the account, audited it", No Drips' "search-terms audit") — never as the offer.
- `#audit` anchor ids and the `AuditForm` component name are unchanged (internal, and external
  links may target `/contact#audit`).
- **Message-match warning for Matt:** the live brand RSA 817761894657 and the GHL chatbot doc both
  still say "free 20-minute audit" — update the ad copy and bot doc to "free game plan" so the
  ad-to-page promise stays consistent.

### 3.6 Numbers refresh: 107 since 2019, 49 today (Matt, 25/07)

"40+" retires everywhere. The two new numbers do different jobs, and deliberately never sit next to each other:

- **107 = experience.** Trust bar and anywhere we talk history. Exact beats round: "107 Kiwi businesses" reads more credible than "100+", and since the number only grows, it can never overstate.
- **49 = capacity and focus.** Goes where the site already makes scarcity claims, because it finally substantiates them: the audit-form microcopy ("we only take on a handful of new clients a month"), the exclusivity block, and the founders section — e.g. *"We look after 49 Kiwi businesses right now, and we keep it small enough that when you ring, you get one of us."*
- **Never adjacent.** 107 next to 49 invites churn subtraction. Apart, each is proof; together they're a maths exercise. If we ever want to address longevity head-on, the honest weapon is tenure, not a ratio — see the new Part 5 ask.

`consts.ts` STATS (single source, dated comment, check quarterly):

| Today | Proposed |
|---|---|
| `40+` Kiwi businesses helped | `107` Kiwi businesses since 2019 |
| `$1m+` ad spend managed | unchanged |
| `$4m+` tracked client revenue | unchanged |
| `4x` return on ad spend* | unchanged |
| `2019` in business since | drop — folded into the 107 label, which frees this slot for the live review badge (§3.7) |

Sweep: `grep -rn "40+" src/` — known hits are `SocialProof.astro` ("Trusted by 40+ Kiwi tradies", which also fixes the A7 accuracy nit) plus any page copy. `../ghl-chatbot-training.md` §7 says "40+ Kiwi trade and service businesses" — update to 107/49 next time the bot doc ships.

Staleness policy: 107 is safe (only grows; understating is honest). 49 moves both ways — keep it in the two or three body-copy spots only, sourced from one `consts.ts` value with a `confirmed 25/07/2026` comment, refreshed whenever we touch the site's numbers.

### 3.7 Google review badge (static — Matt's final call, 25/07)

The review count goes on the site as a **static badge**: `★ 5.0 · 15 Google reviews`, linking to the Google profile. No auto-update machinery (Matt's call): the value lives in `consts.ts` as `REVIEWS = { rating: "5.0", count: 15, url: … }` — one source, bumped by hand as reviews grow. Zero runtime cost, zero moving parts.

- **Slots:** `SocialProof.astro` (replaces the hardcoded ★★★★★ + "Trusted by 40+ Kiwi tradies" line, becoming *"★ 5.0 from 15 Google reviews · 107 Kiwi businesses since 2019"*), the freed fifth trust-bar slot, and near the audit form.
- **Honesty:** count understates between manual bumps, which is the safe direction. Still no `AggregateRating` schema (self-serving review markup: no rich result, manual-action risk); the badge links to the profile where the reviews are verifiable.
- **Link:** until Matt supplies the exact Google profile/review link, the badge links to a Google search for the business's reviews — flagged as a one-line const swap.
- **The review drive stands:** run the 5-star review funnel we sell on ourselves — 49 current clients (107 all-time) against 15 reviews is pure headroom. Once the count clears ~25, the line *"we run the same review engine we sell you"* goes next to the badge. Bump the const when you pass milestones (17, 20, 25…).

---

## Part 4 — Interactive elements

The filter: **would a tradie in a ute, on a phone, at smoko actually finish this?** If it's not about their money, their jobs or their own website, it doesn't get built.

### ✅ Build these

**1. "What's a job worth to you?" — job value calculator + plan picker, combined** · Tier 1 · ~2 days · light backend (logging only)

One tool, one screen, two outputs. (Matt, 25/07: merge the calculator and the plan picker; add a trade selector; record what people enter.)

Inputs:
- **Trade** — dropdown, same options as the audit form's trade select (Plumber, Electrician, Roofer, Builder, Painter, HVAC / heat pumps, Other trade). Picking a trade sets sensible slider defaults and swaps the proof line.
- Average job value (`$500 – $50,000`, log-scale native `<input type=range>`)
- Extra jobs a month you'd like (`1 – 20`)
- Roughly what share of quotes you win (`10% – 90%`)
- Two quick toggles: got a website already? · areas you cover (1 / 2–3 / 4+)

Output, updating live:
- Leads you'd need a month · extra revenue a month and a year
- **What you can afford to pay per lead** at that margin
- Where we have **published** trade numbers, a comparison bar against real managed-account CPLs (plumbing $13–$17 from No Drips + Napier Plumber, roofing ~$20 from the HB Roofer study). For trades with no published number, no invented one: *"We'll show you real numbers for your trade on the audit."*
- **The plan that fits** (Starter/Growth/Scale from the toggles + jobs target) with an honest ad-budget range

Closer: **"Book 20 minutes with Ryan or Matt"** → prefills the audit form; the inputs and the recommended plan ride along to GHL (compact summary in the existing `message` field, within the 500-char cap in `api/lead.ts`) so the call opens with their own numbers on the table.

*Why it works:* it's about money, it takes 30 seconds, there's no wrong answer, and it reframes price from "$697 a month" to "$697 against $14,000 of extra work". Merging the picker in kills "which plan do I pick" in the same move and pre-qualifies the lead. This is the one to build first.

*Honesty guard:* CPL figures come from real managed accounts and are labelled as ranges. The output is explicitly "an estimate based on your numbers, not a promise" — same discipline as the existing chart captions.

**Usage logging (Matt's request — this is also how the parked benchmark tool eventually gets its data):**
- New endpoint `src/pages/api/tool-event.ts` (`prerender = false`): POST JSON `{tool, trade, inputs, outputs, converted}` + the page path. Allow-listed fields only, no PII accepted, no IP/UA stored.
- Stored in **D1** (new `hdweb-tools` database, single `tool_events` table: id, ts, tool, trade, inputs JSON, outputs JSON, page, converted). D1 over Workers Logs because logs expire in days and this data is meant to accumulate. Binding added in `wrangler.jsonc`.
- Fire once per session on first meaningful interaction, again on "recommend", and flag `converted=1` when the prefill handoff to the audit form happens — so we can also see which inputs correlate with leads.
- Debounced client-side; basic per-IP rate cap in the Worker to keep bot noise out of the dataset.
- One line added to `/privacy` covering anonymous tool-usage capture.
- Query anytime: `wrangler d1 execute hdweb-tools --command "SELECT trade, COUNT(*), AVG(json_extract(inputs,'$.jobValue')) FROM tool_events GROUP BY trade"`.

**2. "Free 60-second website check"** · Tier 1 · ~3 days · Worker-backed · **highest lead-gen value**

Enter your website URL → instant scored result on: mobile speed (PageSpeed Insights API), is there a tap-to-call number, is there an enquiry form, is a tracking tag installed, is it mobile-usable, HTTPS. Show three findings free, then *"Want the full audit, including what your competitors are spending?"* → form.

**This is already Phase 1 of `funnels/free-audit-pipeline-plan.md`.** Building the front end here and pointing it at the `hdaudit` worker gets both projects moving at once. It also handles the no-website case gracefully (that variant is already designed).

*Why it works:* it's about *their* site, it's instant, and there's no salesperson. It's the single best cold-traffic lead magnet available to us.

**3. Before/after website slider** · Tier 2 · ~0.5 days · **daisyUI `diff` component, zero JS**

Drag a handle across a real client's old site vs new site. daisyUI 5 ships `.diff` / `.diff-item-1` / `.diff-resizer` — it's a CSS `resize` trick, no JavaScript at all.

*Why it works:* before/after is exactly how tradies sell their own work. They read it in half a second. Needs the screenshots in Part 5 (#4).

**4. Missed-call cost ticker** · Tier 3 · ~2 hours

Not a tool, a one-input widget bolted onto the existing "The leak" section: *"3 missed calls a week × your average job value ($____) × a 1-in-3 close rate = **$X,XXX of work a year, gone.**"* Counts up on reveal using the `[data-count]` pattern already in `index.astro`. Its job-value input can share the calculator's per-trade defaults.

### ⏸ Parked

**Trade + region cost-per-lead benchmark.** We don't have region-level data today (Matt, 25/07). The combined calculator's usage logging plus the MCC is exactly how this dataset gets built; revisit when there's enough volume per trade and region to publish honestly. When it exists it'll be strong AEO/LLM-citation material — the kind of page AI answers quote.

### ❌ Don't build these

Spin-to-win / gamified anything (destroys the honest-operator positioning) · a second chat widget (GHL already owns that corner) · long quizzes over 5 questions (mobile abandonment) · fake "SEO score out of 100" gauges with invented numbers (breaks the honest-reporting rule and tradies smell it) · anything needing a login · 3D/WebGL (weight, and it says nothing to a roofer).

---

## Part 5 — What to get me (ranked by conversion impact)

This is the list where your effort buys the most lift.

1. **Video testimonials — 3 × 45 seconds, shot on a phone.** Stephen Harris, Donna Godfrey, Denise Howell. Just: what was happening before, what changed, would you recommend it. For a tradie audience, another business owner's face beats any statistic on the site. **Highest-value single asset on this list.**
2. **Trade-matched proof for electricians, builders and HVAC.** We have plumbing (No Drips, Napier Plumber), roofing (HB Roofer) and spouting (Continuous). The electrician, builder and heat-pump LPs currently show plumbing proof. Pick one account in each trade and pull 12 months of leads + CPL. A builder wants to see a builder.
3. **Average job value + our real CPL range, by trade.** Seeds the combined calculator (interactive #1). Roofer, plumber, builder, electrician, HVAC. Job values can be a sensible range you'd defend on a call; CPLs come straight out of the MCC. The calculator's own usage logging will sharpen these over time, but it needs honest seed values to launch with.
4. **Before/after screenshots for 3 clients** — old site and new site, same page, same width. Feeds the `diff` slider.
5. **A 90-second founder video.** You and Ryan, phone camera, no script beyond: who we are, what we do, what it costs, what the guarantee means. Goes in the homepage hero and on every trade LP. Right now only the plumbers LP has a video, it's a GHL-CDN MP4 with no poster frame, and none of the other five have one.
6. **Real job photos.** 5–10 shots from client sites: a roof going on, a switchboard, a van, a hot water cylinder. The current imagery is laptops and phones on desks, which is agency-world, not tradie-world.
7. **Screenshot proof.** An anonymised Google Ads dashboard, a GHL calendar with a week of booked jobs, a lead notification landing on a phone. We have three results screenshots in `case-studies/`; more of this beats more prose.
8. **The regional exclusivity list.** Which trade/area combinations are already taken. Turns a claim into a fact, and *"Napier plumbing: taken"* is honest urgency rather than manufactured scarcity.
9. **The 69% and +122% source data**, so those numbers can go on the Tableau and Houses On The Move case-study pages rather than sitting unsupported on index cards.
10. **The exact Google review/profile link** for the review badge (a one-line const swap; until then it links to a Google search for the business's reviews).
11. **Client tenure data.** Average client tenure, and the count of clients at 3+ years. With 107 all-time and 49 current now public-facing, tenure is the honest retention proof if anyone ever asks the subtraction question — *"our average client has been with us X years, with no contract holding them"* beats any ratio.

**Resolved 25/07/2026:**

- **Exit terms** — confirmed by Matt; copy blocks ② and ③ updated (§3.3).
- **CTA naming** — confirmed: "Book 20 minutes with Ryan or Matt" (§3.5).
- **Client numbers** — 107 since 2019, 49 current (§3.6). "40+" retires everywhere.
- **Google review count** — goes on the site as a static badge (§3.7): 15 reviews, all 5 star, count kept in `consts.ts` and bumped by hand. The review drive stands: target ~25 by end of August, then add *"we run the same review engine we sell you"* beside the badge. (Still no `AggregateRating` schema — self-serving review markup gets no rich result and can draw a manual action.)

---

## Part 6 — Libraries & daisyUI

**The recommendation is to add almost nothing.** The site is fast because it ships no framework, no hydration and no islands. Every proposal below either removes weight or adds ~1 KB.

### Use more of what daisyUI 5 already gives us (zero new bytes)

| Component | Use it for |
|---|---|
| `diff` | The before/after website slider (interactive #3) — pure CSS |
| `modal` / `modal-top` | The new mobile nav panel, on native `<dialog>` |
| `steps` | "From first look to full calendar" and the 6-step `/google-ads` process |
| `timeline` | Client partnership timelines on the case studies |
| `stat` / `stats` | The at-a-glance strips (currently hand-rolled on all 8 case studies) |
| `range` | Calculator sliders — native input, styled, accessible for free |
| `carousel` | Trade chips and the logo wall on mobile, CSS scroll-snap |
| `join` | Segmented toggles (already hand-rolled as `.tab-btn`) |

### Platform features worth adopting (these *remove* JS)

- **`astro:assets` + the Cloudflare compile image service.** Move `public/img/` into `src/assets/` and use `<Image>` / `<Picture>`. Gets AVIF + WebP, responsive `srcset`, correct intrinsic sizing and content-hashed immutable caching. **This is the single biggest performance win available** and it costs no runtime JavaScript.
- **CSS scroll-driven animations** (`animation-timeline: view()`) for the scroll-reveal, behind `@supports`, falling back to the current motion path. Chrome/Edge/Safari 26 support it. If it holds up, `motion` drops off most pages: **−61 KB**.
- **Native `<dialog>`** for the nav: free focus trap, Escape, `inert`, top-layer.
- **`@starting-style`** for entrance transitions without keyframes.

### Explicitly not recommended

GSAP, Lenis, AOS, Swiper (all duplicate what `motion` + CSS already do, at 3–10× the weight) · Alpine.js or Petite-Vue (the vanilla-TS-module pattern in this repo costs ~1 KB per widget and already handles ClientRouter correctly) · Chart.js or D3 (the hand-authored inline SVG + `.draw-line` / `.grow-bar` charts are better here — zero JS and they animate) · any React/Vue island.

### Optional, flagged as a judgement call

Swapping `ClientRouter` (16 KB) for **native cross-document view transitions** (`@view-transition { navigation: auto }`, 0 KB) would also let us delete the `astro:page-load` plumbing from every script, since scripts would just run normally per page. Payoff is real; the risk is that it touches every interactive component at once. I'd do this only after the rest is stable, if at all.

---

## Part 7 — Getting to Lighthouse 100

In priority order, with expected effect:

1. **Trim daisyUI themes** — 37 themes → 2. *(Done 25/07: measured saving was ~36 KB raw / ~6 KB gzip — the themes are just variable blocks, so my original ~150 KB estimate was wrong. Still worth it.)*
2. **Facade the GHL chat widget.** Render our own gold "Chat with us" button; inject `loader.js` on first click or after `requestIdleCallback`. The widget leaves the critical path entirely. **Biggest TBT win, zero lead loss.**
3. **Fold the Google Ads gtag into GTM.** `AW-703611224` is loaded by a second, separate `googletagmanager.com` script even though we already run a GTM container. Move the tag into GTM and delete lines 95–102 of `Layout.astro`. One fewer third-party request and a chunk less main-thread work, no tracking change.
4. **Defer the GTM container** to `requestIdleCallback` with a first-interaction trigger and a ~3s fallback. *Trade-off to accept consciously:* a small number of sub-second bounces won't be counted in GA4. Most sites take this deal; it's your call.
5. **Move images to `astro:assets`** (see Part 6) and delete the ~15 MB of unreferenced files, including `pipeline-animation.gif`.
6. **Move `@fontsource/source-sans-3/800.css`** out of `Layout.astro` and onto the case-study pages that use it — or switch those SVG chart labels to Outfit and drop the dependency entirely.
7. **Scroll-driven CSS animations** behind `@supports`, dropping `motion` from pages that only use it for reveal: **−61 KB**.
8. Bump `/img/*` caching from 1 week to immutable once assets are content-hashed (`public/_headers`).

Steps 1, 5, 6 and 8 are pure wins with no behaviour change. Steps 2–4 are the ones that actually unlock 100 on mobile, and 4 is the only one with a real trade-off.

---

## Part 8 — Delivery plan

| Phase | Work | Effort |
|---|---|---|
| **0. Truth & hygiene** | A1–A6: contrast token, No Drips schema, case-study stats, `/links` dedupe, homepage meta, `/ai-automation` fix. Delete unreferenced images. | 0.5 day |
| **1. Performance foundation** | daisyUI theme trim · `astro:assets` migration · chat facade · gtag into GTM · GTM defer · font scoping. Re-measure and record. | 1.5 days |
| **2. Navigation & IA** | `<dialog>` mobile panel · desktop services dropdown · nested `NAV` in `consts.ts` · header tap-to-call · open/closed indicator. | 1 day |
| **3. Copy & objections** | Blocks ①–⑨ · the 30-seconds sweep (§3.2) incl. CLAUDE.md convention · CTA rename (§3.5) · numbers refresh 107/49 (§3.6) · `Guarantee`/`PricingBlock` components with variants · metadata pass. | 3 days |
| **4. Interactive round 1** | Combined calculator + plan picker (#1), incl. `/api/tool-event` + D1 usage logging + `/privacy` line. (Static review badge ships with Phase 3 — it's just a component + const.) | 2 days |
| **5. Design system pass** | Section banding rules · 3 new section archetypes · body contrast · mobile heading leading · trust-bar mobile layout · case-study card images · `diff` slider (#4). | 2 days |
| **6. Website check tool** | Front end here + `hdaudit` worker Phase 1. Coordinate with the free-audit pipeline plan. | 3 days |
| **7. SEO expansion** | Remove the `/seo` redirect, build `/seo` (~1,280/mo at KD 5–26) · Auckland + Christchurch city pages. *(CPL benchmark tool parked — no data yet.)* | 2.5 days |

Phases 0–5 are now all unblocked (exit terms and the CTA question were answered 25/07) and phases 0–2 can ship this week. Phase 6 depends on the Anthropic/Resend/PageSpeed accounts in the free-audit pipeline plan's Phase 0.

---

## Part 9 — Verification

Per phase, before pushing to `main` (deploy is automatic on push):

- **Build & measure:** `npm run build`, then compare `dist/client/_astro/*.css` and `*.js` against today's baseline (**CSS 187 KB / JS 89.6 KB**). Record in `LOGS.md`.
- **Lighthouse:** run the `web-perf` skill against `npm run preview` for `/`, `/google-ads`, `/plumbers-lead-generation` and `/results/no-drips`, mobile profile, three runs each. Performance, Accessibility, Best Practices, SEO all 100. Compare against production.
- **Contrast:** verify `.marker`, `.eyebrow` and `text-primary` on light backgrounds hit 4.5:1 after the token change. `#8a6432` measures **5.32:1** on white (approved by Matt 25/07); `#cea46f` stays for dark sections, fills, borders and button backgrounds (near-black on gold is 8.44:1 and already fine).
- **30-seconds sweep:** `grep -rniE "[0-9]+ second" src/ CLAUDE.md` after Phase 3. The only acceptable survivor is the "60-second website check" tool name.
- **CTA rename:** grep for `Get my free audit` after Phase 3; anything remaining should be a deliberate compact variant, not a missed instance.
- **Tool logging:** run the calculator locally, confirm rows land (`wrangler d1 execute hdweb-tools --local --command "SELECT * FROM tool_events ORDER BY id DESC LIMIT 3"`), confirm no PII fields are stored, and confirm `converted` flips when the form prefill fires.
- **Review badge:** renders from the `consts.ts` value everywhere it appears; the link resolves to the Google reviews; the displayed count never exceeds the real count.
- **Numbers refresh:** `grep -rn "40+" src/` returns nothing; 107 and 49 never render in the same section.
- **Mobile nav:** keyboard only (Tab, Escape, focus return to the hamburger) · VoiceOver/TalkBack pass · open the panel then navigate, confirm it closes on `astro:before-swap` · confirm it renders above the GHL chat widget · confirm it's usable with `prefers-reduced-motion: reduce`.
- **Lead form end-to-end:** submit from `/` and one trade LP with Turnstile live; confirm the GHL webhook fires, `/thank-you` loads, the calendar prefills from `sessionStorage`, and the conversion fires exactly once. Grep Workers Logs for `LEAD_DELIVERY_FAILED`.
- **Calculators:** verify the prefill payload reaches GHL as readable context, and that no field breaks the 500-character cap in `api/lead.ts`.
- **Redirects:** after touching `/seo`, curl every rule in `public/_redirects` for a 301 with no loop. Both with and without the trailing slash.
- **Honesty pass:** every number on a page must be traceable to a client account or to `consts.ts`. No new stat ships without a source.

---

## Appendix — one thing to check before starting

`/home/matt/Clients/hyper-digital/website-5/website/` was modified today (25/07/2026) and looks like a duplicate or experiment copy of this site. Worth confirming it isn't work in flight that would conflict with any of the above.
