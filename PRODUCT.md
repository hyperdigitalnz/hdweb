# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Owners of small NZ trade businesses: plumbers, electricians, roofers, builders, painters,
heat-pump/HVAC installers. Time-poor, often evaluating on a phone between jobs. Their job on
this site is deciding whether Hyper Digital can reliably fill their calendar with good work,
then booking a call. Many arrive from paid search (trade landing pages) already feeling the
pain of slow months or junk leads; some have no website at all (prime prospects, never blocked
by the form).

**Audience is tradies only** (confirmed 29/07/2026). Non-trade case studies (Bermuda Lifestyle,
Houses on the Move) stay as proof of capability; copy never pitches to non-trade businesses.

## Product Purpose

Marketing site for Hyper Digital, a Hawke's Bay-based NZ digital marketing agency working with
tradies NZ-wide. The site exists to produce **booked game-plan calls** with Matt or Ryan
(confirmed 29/07/2026): the form fill is a step, the booked call is success. GHL
"appointment booked" events feed Google/Meta ad bidding for exactly this reason. Phone calls
(027 666 1973) count too. Secondary: the insights section earns organic traffic and answers
buying-stage questions.

## Positioning

**The complete job-booking system for modern tradies** (confirmed 29/07/2026 as the spearhead).
Website + Google/Meta Ads + AI automation sold and operated as one system that books jobs, not
a menu of separate services. Future work organises around this claim.

Supporting claims (true, safe to state, but not the lead):
- All-inclusive Google Ads packages: one price covers management fee and media spend, paid to
  Google on the client's behalf.
- 60-day guarantee: hit the agreed lead goal in 60 days or we work free.
- Ownership and no lock-in: client owns every asset (campaigns, landing pages, tracking);
  one month's notice, no exit fee (terms confirmed 25/07/2026).

## Operating Context

- Traffic: Google Ads (brand + SKAG campaigns, live at $30/day) lands on trade LPs
  (`/<trade>-lead-generation`, header hidden for CRO); organic is currently brand-only
  (SEO benchmark 03/07/2026); socials funnel through `/links-in-bio`.
- Lead pipeline: `AuditForm` → `/api/lead` (Turnstile, honeypot) → GHL webhook → `/thank-you`
  (Ads conversion + GHL booking calendar with sessionStorage prefill).
- The offer is the **free game plan**; primary CTA "Get my free game plan". "Audit" is retired
  as the offer name and survives only as an honest verb.
- After signup the delivery reality is: instant email reply to every website enquiry, AI chat on
  site, ~1 week email nurture. No automatic calls, no SMS, no missed-call text-back.
- Pricing source of truth: `src/data/pricing.ts` ($1,997 +GST setup; Starter $497 / Growth $697 /
  Scale $997 monthly, ad spend separate on the site offer). Legacy pricing must never appear in
  new copy.

## Capabilities and Constraints

- Astro 7 (`output: server`) on Cloudflare Workers; Tailwind 4 + daisyUI 5; motion. Deploys
  automatically on push to `main`.
- Third-party scripts (GTM, gtag, GHL chat) load on first user interaction only; never add an
  eager third-party script to the head.
- **Nothing may be fixed to the bottom of the mobile viewport** (GHL chat widget occupies it).
- **Homepage hero keeps the LeadFeed demo, never an opt-in form** (Matt, 26/07/2026).
- **No ecommerce framing** anywhere: the agency no longer builds online stores.
- Lead-response copy rules: say "reply", "web/website enquiry", "email"; standard badge wording
  is "Instant replies, 24/7"; never a stopwatch number, never voice/SMS claims.
- Trust numbers: 107 clients since 2019 (STATS) and 49 currently on the books (body copy only)
  must never render in the same section.
- Undecided: whether CTAs name a person (site features Matt; old GHL pages said "call Ryan").
- Undecided: no formal accessibility standard has been set; audience reality (phones, outdoors,
  work gloves) argues for large targets and high legibility regardless.

## Brand Commitments

- Name: Hyper Digital; domain hyperdigital.nz (canonical non-www). Tagline: "The complete job
  booking system for modern Tradies."
- NZ English, DD/MM/YYYY, NZD, Pacific/Auckland.
- **No em dashes in any customer-facing copy.** Use full stops, commas, colons, parentheses.
- **The word "honest" is banned in customer-facing copy** (Matt, 27/07/2026).
- Voice: plain-spoken, direct, proof-led, no hype; talks like someone who has run the numbers.
- Google review badge is static (`REVIEWS` in `src/consts.ts`, 5.0 x 15), hand-bumped, no
  AggregateRating schema by design.
- Founders (Matt, Ryan) appear in form microcopy ("20 minutes with Ryan or Matt"), not in
  button labels.

## Evidence on Hand

- `STATS` (`src/consts.ts`): 107 Kiwi businesses since 2019, $1m+ ad spend managed, $4m+
  tracked client revenue, 4x blended ROAS (conservative; footnote in `STATS_NOTE`).
- Four case studies with real client data: `src/pages/results/` (bermuda-lifestyle,
  continuous-spouting, houses-on-the-move, no-drips) + `public/img/case-studies/`.
  Case studies headline conversions/revenue, never clicks/CTR/CPC.
- 15 Google reviews at 5.0.
- Exit terms are confirmed safe to state in copy.
- **Absent, must not be fabricated** (Matt to produce, per CLAUDE.md TODO): video testimonials,
  trade-matched proof for electrician/builder/HVAC, per-trade job-value and CPL seed ranges,
  before/after screenshots, founder video, source data for the 69% / +122% figures.
- Honest-reporting rule: only publish results a client can verify in their own account.

## Product Principles

1. **Every number is verifiable.** Publish only what a client can see in their own account;
   understate rather than round up.
2. **One system, not a menu.** Pages sell the complete job-booking system; individual services
   are entry points into it, not standalone products.
3. **Built for a phone in a ute.** Fast, legible, big targets, no dead ends; a tradie with no
   website is a prospect, never an error state.
4. **Claims match delivery.** Copy never promises a channel or speed the automation does not
   actually deliver.
5. **The path ends in a booked call.** Every surface moves toward the game-plan call; a form
   fill that never books is an incomplete outcome.
