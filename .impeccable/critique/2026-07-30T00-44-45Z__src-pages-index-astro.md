---
target: src/pages/index.astro
total_score: 26
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 4
timestamp: 2026-07-30T00-44-45Z
slug: src-pages-index-astro
---
Method: dual-agent (A: ae78753d14abe70a8 · B: a9cb2861bccc73454)

Assessment A inspected the rendered page in headless Chromium over CDP (~40 screenshots at 1440×900 and 390×844, plus mobile nav open, FAQ expanded, keyboard focus, hydration timing and measured touch targets). Assessment B ran the bundled detector and could not run the in-page overlay: no browser MCP is connected to this session and `puppeteer` is not installed, so **no user-visible overlay exists in your browser**. B substituted static analysis of the served dev-server HTML as its fallback signal, which recovers the CSS-anchored rules but produces **no viewport-dependent evidence**. All viewport findings below come from A.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | `ChatDemo` finishes 4.25s after entering view (`ChatDemo.astro:76`, `delay: 0.2 + i*0.7`), holding a third of the mockup empty; the calculator's server-rendered plan silently rewrites itself on hydration. |
| 2 | Match System / Real World | 3 | Voice is excellent ("smoko", "up a ladder or under a house"), but the compare table answers the wrong channel (`index.astro:35` vs `:43`), and the retired word "audit" still surfaces in two user-visible strings. |
| 3 | User Control and Freedom | 3 | A hero CTA tap fires a measured 18,168px / 1.6s smooth scroll on mobile with no way back but scrolling. |
| 4 | Consistency and Standards | 2 | Two identical gold CTAs, different destinations (header → `/contact#audit`, page → `#audit`). Two documented DESIGN.md violations: the featured pricing card is white/1px where the spec commits to 2px gold on `bg-brand-dark`, and `AuditForm.astro:25` uses a 4px accent border against a 2px documented maximum. |
| 5 | Error Prevention | 3 | Genuinely thoughtful (no phone `pattern`, optional website, honeypot renamed off `company`, Turnstile reset, webhook retries), but the failure message hard-codes a plain-text, un-tappable phone number (`AuditForm.astro:142`). |
| 6 | Recognition Rather Than Recall | 2 | "Everything in Starter, plus:" while Starter's 7 bullets sit ~1,000px above on mobile; the calculator recommends "Starter · $497/mo" 2,700px from anything describing Starter. |
| 7 | Flexibility and Efficiency | 3 | Real accelerators exist (12 `#audit` jumps, `tel:` in four places, `af_calc` → lead, `af_prefill` → calendar) but stop at the edges: three identical pricing CTAs (`PricingTiers.astro:33`) cannot express which plan was picked. |
| 8 | Aesthetic and Minimalist Design | 2 | 2,169 words in `<main>` (~10.8 min read), 20,666px of mobile scroll. "107 Kiwi businesses since 2019" and "5.0 from 15 Google reviews" render twice within ~100px; "20 minutes" 7×; 10 buttons labelled "Get my free game plan". |
| 9 | Error Recovery | 2 | One generic "Something went wrong" cannot distinguish a bot-check rejection from a webhook outage, and the Turnstile failure state has no on-page recovery copy. |
| 10 | Help and Documentation | 3 | The FAQ, exclusivity explainer, "everything we need from you" box and the notice-period reasoning are genuinely good, but all 7 FAQ answers are collapsed at identical weight and the lock-in answer is one 84-word block on mobile. |
| **Total** | | **26/40** | **Acceptable — significant improvements needed** |

No heuristics marked n/a. On most Persuade surfaces #7 and #10 would be, but here both do real persuasion work: the FAQ and exclusivity explainer are load-bearing objection handling, and the prefill chain is a genuine accelerator. Both are judgeable, so both are judged.

I moved one score off Assessment A's card: **#2 from 4 to 3.** A treated the channel mismatch as a single blemish on otherwise fluent copy. Combined with the verified reappearance of the retired offer name in two live strings, that is a pattern of the copy describing a system slightly different from the one being sold, which is exactly what heuristic 2 measures.

## Design Specificity Verdict

**The components are authored for this product. The composition is not.** Change gold to teal, swap the copy and images, and an unrelated B2B service ships this page unchanged. The three custom demos are the only things that would break.

**LLM assessment.** What is genuinely specific: `LeadFeed` (a bespoke phone ticker whose per-row chip colour is driven by a `--chip` custom property, `global.css:161-188`), `ChatDemo` (a scripted 9:47pm hot-water-cylinder enquiry from Taradale, choreographed to slide in from each sender's side), and `JobCalculator` (per-trade default job values, a log-scale money slider, published-CPL-only guardrails, a plan recommender, anonymous usage logging so your own per-trade figures improve). No template ships those. The Sign-Written Ute system is really executed: one gold family, 800-weight tight display type, alternating dark-glow and light-paper bands, `num-ghost` numerals, the offset gold frame, the dashed spinning seal. The copy voice is unfakeable.

What is interchangeable is the **shape**. Sixteen full-width centred bands in strict dark/light alternation. Bands 4, 7 and 10 are the identical "text left, object right" two-column layout three times. Bands 5, 6, 8, 9, 11 and 12 are the identical "centred header plus N-up card grid" six times. The composition never breaks its own grid once: no overlap, no asymmetry, no band that earns a different shape because its content demands one. Measured hierarchy flatness confirms it: **14 `<h2>` on the page, twelve at exactly 30px, one at 36px, and the form's heading at 24px.** Twelve interchangeable section headings, and the money heading is the smallest thing on the page.

The order is category-standard too: trust-stat bar, grayscale logo wall, numbered 3-step timeline with connector line, 3-tier table with "Most popular", ✗/✓ compare (the single most reused agency trope), accordion FAQ beside a sticky form, guarantee seal, dark final CTA.

**The most glaring missed opportunity:** the page's central metaphor is a calendar filling. "booked solid", "From first look to full calendar", "Booked jobs land in your calendar". **A calendar is never drawn.** The phone mockups are generic phone mockups. Second: "the leak" is named, then illustrated with three ordinary notification cards. A leak has an image (the drip, the tally, money running out); the section names a strong picture and draws a weak one. Third: your north star is a vehicle covered in your own name, and signwriting never appears as a device. No lettering-on-panel, no plate, no decal. Gold-on-black is the only trace, and gold-on-black is also every luxury-agency template.

**Deterministic scan.** The target file is **clean: 0 findings, exit 0** on `src/pages/index.astro`. Across the 13 components that render on this surface, 3 findings; across the served HTML, 15, of which 10 trace to Tailwind and daisyUI library CSS rather than your code. Genuine, project-authored, and worth acting on:

| Finding | Location | Verdict |
|---|---|---|
| `border-accent-on-rounded` (warning) | `AuditForm.astro:25` — `border-t-4 border-primary` | **Real, and a DESIGN.md violation.** The spec allows 1px hairlines upgraded to 2px gold at 40-60% for three enumerated cases only. 4px at full strength is double the documented maximum and is not one of them. Highest leverage on the list: `AuditForm` renders on every page. |
| `aphoristic-cadence` (warning) | `index.astro:118, 492, 602` | **Real but arguable.** Three sections land on the same "X. No Y." shape ("No exit fee, no argument", "No impressions, no engagement, no fog", "Simple plans. No lock-in"). Blunt phrasing is a defensible register for this audience; the issue is one syntactic shape repeated across three sections, not any single line. |
| `layout-transition` (warning) | `global.css:422` — `.cmp-fill` animates `width` | **Real, low urgency.** DESIGN.md sanctions the effect and the easing, not `width` as the mechanism. `transform: scaleX()` with `transform-origin: left` is visually identical and compositor-only. One-shot reveal on a small bar, so bounded impact. |
| `design-system-font-size` (advisory) | `ChatDemo.astro:35` — `text-[0.65rem]` | **Real, cheapest fix.** Below DESIGN.md's 0.7rem floor, and the same element carries `text-neutral-content/50`, putting ~10.4px of off-white at 50% over `bg-black/30` near the AA threshold. Raise to 0.7rem and lift the opacity. |

Cleared as false positives, with the sanctioning rule: `codex-grid-background` (DESIGN.md documents the faint 64px workshop grid three times, and the implementation is radially masked exactly as specified); `marquee` (DESIGN.md names the 34s client strip as a signature component, pauses-on-hover included); `side-tab` ×2 and `bounce-easing` ×3 (Tailwind utility *definitions*; `grep` finds zero uses of `border-l-4` or `animate-bounce` on this surface); `layout-transition` ×5 of 6 (daisyUI's own dropdown and collapse CSS, absent from `src/`). One low-value hit is technically drift: the mobile nav `::backdrop` scrim uses `rgb(0 0 0 / 0.55)` rather than Midnight Black (`Header.astro:194`); at 55% alpha behind a blur the perceptual consequence is nil, so it is token hygiene at most.

Where the detector beat the review: the `AuditForm` 4px border and the `.cmp-fill` width animation. Where the review beat the detector: everything viewport-dependent, which is most of what actually costs you calls. Note the asymmetry, because a clean `index.astro` scan is not a clean page.

**Visual overlays.** None. Script injection never ran, so there is nothing highlighted in your browser. No browser MCP is connected to this session and `puppeteer` is absent, so the detector's URL mode failed with `puppeteer is required for URL scanning`.

## Overall Impression

This is a well-built page that has been optimised section by section and never composed as a whole. Every band is defensible on its own; the sequence of sixteen of them, all the same shape, at the same heading size, ending in ten identically-labelled gold buttons, is what flattens it. You are not short of material. You are short of a climax, and of any moment where the layout itself does something only this business would do.

The single biggest opportunity is the calendar. The whole promise is a week that fills up, stated three separate times in copy, and never once drawn. One real asset showing a tradie's week going from three jobs to fourteen, gold blocks landing as you watch, would carry the positioning, replace a generic phone mockup, break the grid monotony in the one place that has earned it, and be the thing no competitor can paste.

The second biggest is that your strongest section is buried. "Been burned before?" concedes the industry's failure in the prospect's own words and closes on the only falsifiable number on the page. It sits at 8,541px on mobile, after ten screens of claims, behind a proof section that shows a swimming-pool retailer to a roofer.

## What's Working

**"Been burned before?" inverts the genre, and that is why it works.** Instead of asserting trust it concedes the industry's failure mode in the reader's own language ("a monthly report full of clicks and impressions, no way to tell if a single job came from it, and a contract you can't get out of"), then answers with four checkable statements, exactly at the chunking limit, one line of claim plus one line of reason each. It closes on the only falsifiable number on the page: close to $3,000 of wasted spend found on a named client's account, linked to that client's case study. Nothing in it asks for belief.

**The three live demos show output where the whole category describes features.** `LeadFeed`, `ChatDemo` and `JobCalculator` are the only things a competitor could not paste in. `ChatDemo` is a complete argument in six bubbles: enquiry at 9:47pm, location captured, two slots offered, booked, confirmation promised, and it is labelled "Example conversation. Not live data." `JobCalculator` goes further and refuses to invent: trades without published CPL data get a call, never a made-up figure (`JobCalculator.astro:210-212`). That restraint is the product principle showing up in code.

**The founders band converts an abstract agency into two identifiable people at the exact moment the visitor is deciding whether to hand over $1,997.** A real, un-stocked photo, an offset gold frame, "Matt & Ryan · Founders", "no account managers, no offshore call centre, no runaround", a "You call, we answer" chip. It lands immediately after the trust peak and immediately before the effort objection, which is the correct place in the arc rather than just a nice section.

## Priority Issues

### [P1] The GHL chat widget covers the hero's only proof and the form's bot check on mobile

**Why it matters.** At 390×844 the greeting bubble and avatar occupy roughly the bottom-right 300×200 CSS px at *every* scroll position. In the hero that is the entire `SocialProof` block: stars, "5.0 from 15 Google reviews", "107 Kiwi businesses since 2019". At the form it covers the "What's your goal right now?" select **and the Turnstile widget**. In the calculator it covers the "Got a website?" and "Areas you cover" toggles, so a tap aimed at "Not yet" or "4+" lands on the widget instead. The codebase already treats this zone as forbidden (`CLAUDE.md`; `Layout.astro:177-179`), but content is still being laid out into it. The two highest-value elements on the page are the ones being covered, on the device most of your traffic uses.

**Fix.** Move `<SocialProof />` (`index.astro:163-165`) above the CTA pair, or drop it from the hero entirely since it duplicates the `STATS` bar 100px below. Add `pb-28 lg:pb-0` to the calculator input panel (`JobCalculator.astro:29`) and the `AuditForm` card (`AuditForm.astro:25`) so trailing controls clear the zone. In `AuditForm.astro`, move `<Turnstile />` and the submit button above the two optional selects so the critical path is never what sits under the bubble.

**Suggested command:** `/impeccable adapt`

### [P1] Zero visible keyboard focus, anywhere on the site

**Why it matters.** Verified: `grep focus-visible src/styles/global.css` returns **0 hits**, and no component authors a focus style. Focusing FAQ item 2 produces no visible change at all while it is `document.activeElement`; the control is a `.collapse input` at `opacity: 0` with `outline: none`, 534×60px. That is seven completely invisible focus stops on the objection-handling block directly beside your form, plus every button and link on the page. It is a WCAG 2.4.7 failure. `PRODUCT.md` records that no accessibility standard has been set, and also that audience reality (phones, outdoors, gloves) argues for legibility regardless.

**Fix.** Add to `global.css`: `:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }` plus `.collapse:has(input:focus-visible) { outline: 2px solid var(--color-primary); outline-offset: 2px; }` so the visible pill shows the focus its transparent checkbox receives. Add a skip link before `<main>` in `Layout.astro:172`.

**Suggested command:** `/impeccable audit`

### [P1] The Proof section contains no tradie, and its headline number reads as fabricated

**Why it matters.** `index.astro:371-451`. Featured study: Bermuda Lifestyle, Pools & Spas, at "2,500% more enquiries" and "500% revenue growth". Testimonial 1: Tableau Towbars, headlined "Phone enquiries up 69% year-on-year", a figure `CLAUDE.md` still lists under "Matt to produce: 69%/+122% source data", so it is published without its source. Testimonial 2: Harris Pumps. The logo wall adds a real-estate franchise and a taxi company. A roofer arriving from a roofing ad finds zero roofing proof, while the calculator two bands later claims "our real roofing cost per lead", implying a roofing account exists and is unpublished. And "2,500%" is precisely the number that ends belief in the audience the very next band describes as burned. It cuts against `PRODUCT.md` principle 1: understate rather than round up.

**Fix.** Promote `/results/no-drips` (waterproofing) or `/results/continuous-spouting` into the featured slot at `index.astro:371` and demote Bermuda to the two-up row. Replace the "2,500%" headline with enquiry or booking counts a client can verify in their own account. Either attach the 69% source or swap that card's headline for the Harris CPL figure ($31 down to about $17), which is already sourced.

**Suggested command:** `/impeccable clarify`

### [P1] The compare table promises a fix for missed phone calls that the system does not deliver

**Why it matters.** Verified in source. `index.astro:35` reads "Calls go to voicemail while you're on the tools." Directly opposite, `index.astro:43` reads "Every website enquiry gets an instant reply, day or night." A ✗/✓ two-column compare instructs the reader to pair rows, and the preceding band primes exactly that reading ("The leak": "The phone rings out", three missed-call cards). Rows 1 and 5 are the only pairs that do not share a subject. `CLAUDE.md`'s lead-response rule is explicit that copy must never imply calls are handled automatically, and this is the strongest implication of it on the site, sitting at the moment the visitor forms their model of what they are buying. It will resurface as disappointment on the game-plan call.

**Fix.** Rewrite `withUs[0]` to answer the same channel truthfully, for example "Ads that make the phone ring, and every web enquiry answered the moment it lands." Then reorder `alone`/`withUs` so all five rows pair on the same subject, or reframe `alone[0]` as "Enquiries sit unanswered while you're on the tools."

**Suggested command:** `/impeccable clarify`

### [P2] The JobCalculator ships a wrong recommendation in its HTML and contradicts itself on ad spend

**Why it matters.** Measured. The server-rendered panel says "Growth · $697/mo +GST" and "roughly $400–$700 a month" (`JobCalculator.astro:113`, `:115`). With the same untouched defaults, hydration rewrites both to "Starter · $497/mo +GST" and "$300–$500". So no-JS visitors and crawlers see a recommendation the tool would never produce, and every JS visitor watches the plan and price change under them at load. Separately, the same panel shows "~$200 a month in leads, at our real roofing cost per lead" beside "an ad budget of roughly $300–$500 a month": the `Math.max(300, …)` floor at `:194` is not applied to the `leadsNeeded * cpl` output at `:207-208`, so two contradictory spend figures sit in adjacent boxes. And the pre-selected trade is Roofer at a $15,000 default job value (`:141`), so an untouched load fires **$720,000 a year** at the visitor with the caveat at 12px and 50% opacity. That is the least believable number on a page selling to sceptics.

**Fix.** Server-render the real default state (roofer/74/4/40/yes/1 → Starter, $300–$500), or render placeholders and compute on hydration. Floor the CPL output to the same $300 entry media budget, or relabel it so the two numbers are visibly different things. Change the pre-selected trade to `plumber` ($800 default) so the tool's opening number is credible.

**Suggested command:** `/impeccable harden`

## Convention Drift (verified against your own rules)

Four one-line fixes where the code contradicts a decision already recorded in `CLAUDE.md` or `DESIGN.md`. These are not judgment calls.

| What | Where | Rule it breaks |
|---|---|---|
| Mobile header CTA reads **"Free plan"** below `sm` | `Header.astro:72` | `CLAUDE.md` specifies the header mobile label is "Game plan". Worse, "Free plan" reads as a free pricing tier, and the pricing table has none. The mobile *panel* CTA correctly says "Free game plan". |
| "we'll cover that in your audit" | `AuditForm.astro:60` | "Audit" is retired as the offer name and survives only as a verb about accounts. This is the offer, in the form, on every page. |
| `"Audit"` printed as a calculator output value | `JobCalculator.astro:211` | Same retired-name rule, rendered as UI text where a price should be. |
| `border-t-4 border-primary` | `AuditForm.astro:25` | `DESIGN.md` allows 1px hairlines upgraded to 2px gold at 40-60% for three enumerated cases. 4px full-strength is double the maximum and not one of them. Detector-confirmed. |

Also worth knowing: the **107-and-49 rule is being respected.** 107 renders in the hero `STATS` bar, 49 in the Founders band. Different sections, no churn subtraction available.

## Cognitive Load

**4 of 8 checklist items fail: critical band.**

| Item | Verdict |
|---|---|
| Single focus | PASS — each screenful carries one idea; the calculator band is the lone exception. |
| Chunking ≤4 per group | **FAIL** |
| Visual grouping | PASS — eyebrow → heavy head → body → cards is the system's real strength. |
| Visual hierarchy | **FAIL** (page-level) |
| One thing at a time | PASS — the scroll is a sequence; nothing demands simultaneous input. |
| Minimal choices ≤4 | **FAIL** |
| Working memory | **FAIL** |
| Progressive disclosure | PASS — FAQ collapses, cards link out, calculator is opt-in, tiers are cumulative. |

Two of the four (hierarchy, working memory) are consequences of page length rather than local errors, but they are still failures.

**Ten decision points exceed four visible options:** desktop header (5 nav + dropdown + phone + CTA = 7); mobile nav "By trade" (9 chips in one scroller, `Header.astro:150`); trades marquee (10); trust bar (5 stats, wrapping 2+2+1 with an orphan row on mobile); compare lists (5 each side); logo wall (7); Starter tier (7 bullets, `pricing.ts:22-30`); calculator input panel (6 controls, one a 7-option select); FAQ (7); form trade select (8).

**Working memory, specifically:** the pricing decision requires holding Starter's 7 bullets while reading Growth's "Everything in Starter, plus:", and on mobile Starter is ~1,000px off-screen. The compare section requires remembering 5 pain bullets while reading 5 fix bullets on a different screen entirely, because the cards stack at `md:`. The comparison mechanic is destroyed on the primary device.

## Emotional Journey

**Hero:** confident, curious. "The system that keeps [Roofers] booked solid" beside a phone ticking with bookings. Strong lift, immediately dampened on mobile when the chat widget lands on the proof block.

**Trust bar and marquee:** mild reassurance, then noise. At 390px the marquee shows two moving trades, so "is my trade on this list?" goes unanswered.

**"The leak":** first valley, intentional and well made. "By the time you check it at smoko, they've rung the next name on Google." The ache lands.

**"The difference":** relief, misfired on mobile. Stacked cards put pain and fix on separate screens so the contrast never fires, and row 1 answers a different channel than the pain opposite it.

**"The system":** cool-down. Three explanatory cards. Head, not gut.

**"Speed wins":** the best micro-moment on the page, if you wait for it. Takes 4.25s and holds a third of the panel empty, so most scrollers never reach "JOB BOOKED WHILE YOU SLEPT".

**"Proof":** should be the summit; for a tradie it is a valley. Pools and spas at 2,500%, then towbars, then pumps, over a logo wall at `opacity: .55` including a real-estate franchise and a taxi company.

**"Been burned before?":** the true peak, and the best section on the page. Trust rises sharply on a falsifiable receipt.

**Founders:** warmth, correctly placed. Right after the trust peak, right before the effort objection.

**Getting started:** relief on effort. "20 minutes / One hour / That's it" answers "I don't have time for this".

**Pricing:** second valley, and the reassurance is missing. The number lands after an emotional high, which is right, but at the moment of maximum anxiety the support is thinnest: the exclusivity box sits *below* the table and reads as scarcity pressure, and the guarantee is 2,700px further down.

**Calculator:** agency and hope, then undercut by $720,000.

**Guarantee:** reassurance, correctly placed, immediately before the form.

**FAQ and form:** the ask, whispered. Reassurance is 12px grey text *below* the button, the form's heading is the smallest `<h2>` on the page, and the last thing between visitor and send is a third-party bot check with no friendly failure copy.

**Final CTA:** strong peak-end. "The work's out there. Let's make it ring your phone." with an equal-weight "Or call 027 666 1973". Ending on a phone option is exactly right for this audience, and the goal counts phone calls.

## Persona Red Flags

**Jordan (confused first-timer)**
- The mobile header CTA reads **"Free plan"**. He reads a free pricing tier; the table three screens later has none.
- Two identical gold buttons, different behaviours: the sticky one leaves the homepage for `/contact#audit`, the hero one stays and scrolls. He cannot predict which does what.
- "System" is asserted four times before it is defined, and the band titled "The system" explains three *jobs* (Find / Book / Keep) rather than three *deliverables*, so by the pricing table at 12,432px he still has to infer it means website plus ads plus automation.
- His first question is FAQ item 1, "How many leads will I actually get?" The answer is "It depends... which is exactly what your free game plan works out." He asked for a number and got a booking prompt.

**Casey (distracted mobile, one thumb, interrupted, slow connection)**
- Taps the hero CTA and gets a measured 18,168px / 1.6s animated scroll past 21 screens.
- The chat bubble sits in his thumb-reach zone at every scroll position; at the calculator it covers "Not yet" and "4+".
- The hamburger measures **32×32** and the header CTA **97×32**. **43 of 61 visible interactive elements are under 44px in at least one dimension.** Pricing CTAs are 40px tall; "Read the full story", "See all case studies" and "Our story" are 40px; the three system-card links are 20px.
- LeadFeed rows are cut mid-word: "Auto email reply, then a nur...", "After the job was marked d..." (`truncate`, `LeadFeed.astro:32`).
- On a slow connection every `data-reveal` band is `opacity: 0` until Motion executes or the 3s `forceVisible` fallback fires (`global.css:453`), so returning to a half-loaded page shows a blank column below the hero.
- Interrupted mid-form and returning: nothing is persisted, all six fields are empty again.

**Riley (deliberate stress tester)**
- Turnstile in a failed state offers no on-page recovery. Submitting yields "Something went wrong. Please call us on 027 666 1973." as **plain text, not a `tel:` link**, hard-coded rather than `SITE.phone` (`AuditForm.astro:142`). The same string covers a bot rejection and a webhook outage, so he cannot tell whether to retry or call.
- JS disabled: the calculator's `aria-pressed` selected-state CSS is injected by script (`JobCalculator.astro:282-284`), so "Yes / Not yet" and "1 / 2–3 / 4+" render identically with nothing selected, while the panel still shows a hard-coded "Growth · $697/mo +GST".
- Label growth already breaks things at rest: the mobile nav CTA "Free game plan" wraps to two lines inside its pill (`Header.astro:112-114`), and "Stephen Harris, Harris Pumps & Filtration" reaches its card edge at 390px.
- Tabs the page: 7 FAQ controls with no visible focus, no skip link, and the desktop dropdown opens only on `:hover`/`:focus-within` so its open state is never signalled beyond `aria-expanded`.
- Refreshes after using the calculator: `af_calc` persists in sessionStorage but the sliders reset, so the summary riding to GHL can describe numbers no longer on screen.

**Dave, 48, Napier roofer, one ute, no website** (derived from `PRODUCT.md`: "some have no website at all, prime prospects, never blocked by the form")
- The marquee exists to tell him his trade is covered. At 390px it shows two moving items, and "ROOFERS" scrolls past before he can look for it. The H1 rotator shows "Roofers" for 3 seconds in every 24.
- The calculator pre-selects Roofer at $15,000 and shows him **$720,000 a year**. He knows that is not a roofing business, so he reads the tool, and by extension the site, as sales fiction. The caveat that would save it is 12px at 50% opacity below the panel's visual fold.
- He goes looking for a roofer's results. Featured: pools and spas. Testimonials: towbars, pumps. The only legible logos are "no drips" and "Harcourts". Nothing shows Hyper Digital has ever run roofing ads, even though the calculator claims "our real roofing cost per lead".
- He has no website, which the form handles beautifully. But its hint calls the offer **"your audit"**, the word you retired because nobody wants to be audited, so Dave reads scrutiny rather than help.
- His real decision is whether $1,997 up front is safe. The FAQ answering it ("Do I have to pay upfront?" / "Yes.") is collapsed and visually identical to six others, and the guarantee that offsets it is 700px above in a different band.

## Minor Observations

- **The H1's accessible name renders as "The system that keepsPlumbersbooked solid."** in Chromium: the three `<span class="block">` lines (`index.astro:140-142`) produce no word separation in the accname computation. Add an explicit space or `sr-only` separator.
- The rotating trade has no `aria-live` and mutates the H1 every 3s. A static `sr-only` alternative ("tradies") would keep the accessible name stable.
- Calculator sliders expose `aria-label` but not `aria-valuetext`, so a screen reader announces "**74**" for "$15,000" (`JobCalculator.astro:48`).
- `REVIEWS.url` (`consts.ts:18`) is still a Google *search* URL, so the hero's "5.0 from 15 Google reviews" link lands on a SERP rather than the review profile. It is the page's one externally verifiable trust claim. (Already TODO item (c) in `CLAUDE.md`.)
- `.logo-strip img { opacity: .55; filter: grayscale(1) }` (`global.css:249`) lifts only on `:hover`, which does not exist on the primary device. Five of seven logos are pale grey on warm stone while No Drips and Harcourts render as smaller dark boxes (`h-5 sm:h-6` vs `h-9 sm:h-10`), so the wall is faint *and* incoherent. Raise to `opacity: .8` with `contrast(1.15)` and normalise the assets to one optical height rather than boxing two.
- `SocialProof.astro:15-21` puts three brand wordmarks into 40px circular `object-cover` crops beside two faces, producing unreadable fragments. Faces only, or drop the stack.
- Growth's `who` line and its third feature bullet are the same sentence: "Multiple services and a wider catchment" (`pricing.ts:35` and `:41`).
- Starter runs 7 bullets while Growth and Scale run 5, so the cheapest plan looks the most feature-rich. Because only Growth and Scale carry a `leadIn`, the three lists begin at three different heights (y=515 / 615 / 636 at 1440px), making cross-scanning impossible. Give Starter a `leadIn` ("What you get:").
- All three pricing CTAs are the identical label to the identical `#audit` (`PricingTiers.astro:33`), so picking a tier has no consequence and sends no signal to GHL. On mobile, add `order-first md:order-none` to the popular tier so Growth leads.
- System-card out-links do not bottom-align; card 3's sits ~24px higher. `mt-auto` on the `<a>` at `index.astro:316`.
- `mt-auto` on the calculator CTA (`JobCalculator.astro:125`) is dead, overridden by an inline `style="margin-top: 1.25rem"` on the same element.
- `ChatDemo` completes at ~4.25s holding a third of the mockup empty. Tighten the stagger to ~0.35s and reserve less empty height.
- The mobile nav has no route to pricing or the calculator, the two things a price-shopper opens a menu to find.
- The JS-injected `<style>` for `aria-pressed` (`JobCalculator.astro:282`) is appended to `document.head` on every `setupCalc()` after a view transition, accumulating duplicates.
- The marquee lists 10 trades, the form select 8, the calculator 7. A drainlayer, landscaper, concreter or auto sparky who sees his trade in the marquee can only pick "Other trade".
- `"Not a trade business"` in the trade select (`AuditForm.astro:76`) invites exactly the leads `PRODUCT.md` says the site never pitches to.
- An orphaned Impeccable live server (PID 965393, started 28/07) is running from the parent `/home/matt/Clients/.claude/` tree, not this project. Kill it if it is stale.

## Questions to Consider

1. **The whole promise is a calendar that fills. Why is a calendar never drawn?** What would the hero be if, instead of a generic phone mockup, it showed a tradie's week going from three jobs to fourteen, gold blocks landing as you watch? That one asset carries "booked solid", "From first look to full calendar" and "Booked jobs land in your calendar" at once, and it is the one thing a competitor cannot paste.

2. **"Been burned before?" is your strongest section and it sits at 8,541px on mobile, after ten screens of claims.** What happens to booked calls if the page opens by conceding the industry's failure instead of asserting a system: pain, confession, proof, ask, and the 2,169 words shrink to fit that arc?

3. **All sixteen bands are full-width centred stacks.** If exactly one were allowed to break the grid, which would earn it? And what does it say that none currently does, on a site whose north star is a hand-lettered ute rather than a template?

4. **The calculator already knows the visitor's trade, job value, win rate, coverage and whether they have a website, and hands all of it to GHL via `af_calc`.** Why does the page then ask for six more fields? What would it cost to make the calculator itself the lead capture, name and phone appended to the panel he has just spent thirty seconds personalising, and let the long form serve the visitor who skipped it?
