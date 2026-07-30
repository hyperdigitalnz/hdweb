---
target: src/pages/index.astro
total_score: 31
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
timestamp: 2026-07-30T23-09-19Z
slug: src-pages-index-astro
---
Method: dual-agent (A: a09865734b4da896f · B: a32ed56a2e09fd0ca)

Assessment A inspected the rendered page in headless Chromium (desktop + 24 mobile band captures, mobile nav open, FAQ expanded, keyboard focus, hydration timing) with the GHL chat widget loading live, so overlap findings are observed rather than simulated. Assessment B ran the detector with the six Matt-approved config ignores in effect; no browser MCP exists, so the in-page overlay did not run and B substituted static analysis of the served HTML. One A capture failed (mobile rotator longest-word shot, caught mid-scroll); the fit was verified by measurement instead.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Nothing signals that the Turnstile check must be ready before submitting; the raw Cloudflare widget is the only status surface for verification problems. |
| 2 | Match System / Real World | 4 | Exceptional trade idiom throughout; no significant issue. |
| 3 | User Control and Freedom | 3 | Auto-rotating H1 word and auto-playing demos have no pause affordance on touch (marquee pause is hover-only). |
| 4 | Consistency and Standards | 3 | Identical-looking CTAs behave differently: header CTA navigates away to `/contact#audit` (`Header.astro:71`) while every on-page CTA anchors to the local `#audit`. |
| 5 | Error Prevention | 3 | Submit is enabled from first paint even before a Turnstile token exists (real window on slow connections given the deferred api.js loader). |
| 6 | Recognition Rather Than Recall | 4 | Calculator results hand off to the form and calendar prefill automatically; visible labels everywhere. |
| 7 | Flexibility and Efficiency | 3 | Express lanes exist, but below `sm` the phone path is buried in the menu panel until the final CTA band. |
| 8 | Aesthetic and Minimalist Design | 3 | ~19,800px tall on mobile (~24 screens); the guarantee is restated three times. |
| 9 | Error Recovery | 2 | Failed bot check or missing fields on the no-JS path silently 303 to `/contact` with all typed input discarded and no explanation (`api/lead.ts:56,71`). |
| 10 | Help and Documentation | 3 | FAQ is well-targeted; the lock-in answer is one ~90-word paragraph. |
| **Total** | | **31/40** | **Good — address weak areas, solid foundation** |

No heuristics n/a (multiple entry lanes make #7 real; the FAQ is the help system for #10). Baseline was 26/40 on 30/07; the five-point move comes from Match (3→4), Recognition (2→4), Aesthetic (2→3), Visibility (3, held with a new cause), with Error Recovery still the floor at 2.

## Design Specificity Verdict

**Authored for this product. A generic B2B service could not swap its content in without the page falling apart.** This is a reversal of the 30/07 verdict ("components authored, composition interchangeable").

**LLM assessment.** The hero demo is now the value proposition made literal: `BookedWeek` renders a tradie's week filling with gold job blocks until "Booked solid" lands, with a resting state that is the finished design. The pain section speaks the audience's clock ("While you were quoting · 11:52am", "check it at smoko"). The calculator is built from the business's own published data and rides into the lead form. The visual system is committed: signwriting type, one gold family, glow-not-shadow, workshop grid. Where the authoring still slips: **the hero demo contradicts the hero headline** (the H1 rotates through 8 trades while BookedWeek stays 100% plumbing); the hero avatar stack and logo wall lead with non-trade brands on a "tradies only" page; and the band skeleton is standard direct-response, with the specificity carried by the furniture inside the bands.

**Deterministic scan.** Source is **fully clean: 0 findings, exit 0 across `index.astro` and all 13 rendered components** (six Matt-approved config ignores in effect; import coverage verified). The served-HTML fallback found 13, of which 12 are attributed false positives (Tailwind utility *definitions* with zero markup usage, daisyUI component CSS, the config-sanctioned workshop grid whose file-scoped ignore can't match the scratchpad path, the DESIGN.md-sanctioned marquee with its aria-hidden/pause/reduced-motion mitigations verified). **One marginal genuine finding:** `aphoristic-cadence` at exactly its 3-instance threshold after discounting the two honest-reporting "Not live data." labels: "No impressions, no engagement, no fog" (`index.astro:354`), "Simple plans. No surprises." (`:615`), "No exit fee, no argument" (`:121`). Note "Simple plans…" repeats near-verbatim on 4 other pages, so any rewrite propagates.

**Visual overlays.** None: no browser MCP connected, so no in-page overlay exists.

## Overall Impression

The page now argues instead of stacking. The arc (aspiration → recognition → pain → relief → confession → evidence → competence → people → price → personal value → safety → ask) is deliberately authored and mostly lands, reassurance sits at all three high-stakes moments, and the two display-scale H2s are the right two. What remains are conversion-path leaks rather than design problems: a third-party chat bubble sitting on the proof, failure paths that lose a decided lead silently, and a phone-first audience given no phone affordance for nineteen thousand pixels.

## What's Working

1. **BookedWeek sells the outcome, not the service.** The page opens with the client's calendar already full, drawn in the brand's own gold-block language, animated as bookings landing out of row order so it reads like life. No-JS and reduced-motion users lose nothing. The single most persuasive element on the page.
2. **The trust architecture matches the actual buyer.** "Been burned before?" before proof, four checkable claims, the $3,000 story linked to a verifiable case study. For an audience whose default objection is "I paid an agency and got nothing", confession before brag is exactly right, and it earns its display type.
3. **The calculator-to-call pipeline removes friction and recall.** Inputs → plan fit → summary rides into the form via sessionStorage → fields prefill the booking calendar. The visitor's own numbers arrive at the call without retyping: end-to-end conversion design, not a widget.

## Priority Issues

### [P1] The GHL chat prompt bubble covers conversion-critical content on mobile (observed live)
**What.** At 390px the prompt bubble + launcher obscured the featured $14 proof stat, most of the "See what your jobs cost" CTA, the calculator's "The fit" output, Growth-tier features and FAQ items at essentially every resting position; its "Have a question?" pop fires during the pain band's emotional beat. The `pb-24` tails defend only the form and calculator's final controls.
**Fix.** GHL widget configuration, not repo code: suppress or heavily delay the mobile text-prompt bubble (keep the launcher), or trigger once per session after idle. Belongs on the Matt-side TODO list in CLAUDE.md.

### [P1] Failure paths lose a decided lead silently
**What.** (a) No-JS submissions can never pass Turnstile and 303 to `/contact` with everything typed discarded and no message (`api/lead.ts:56`); missing-field posts likewise (`:71`). (b) Submit is active from first paint while Turnstile's api.js loads lazily; a fast submitter on a slow connection posts tokenless and gets the generic error. (c) The widget's raw "Verification failed" state renders above the gold button with no form-level explanation.
**Fix.** Redirect failures to `/contact?issue=verify` and render a one-line notice + phone number there; keep the submit button disabled ("Loading secure check…") until a token exists, phone link always visible as fallback.
**Suggested command:** `/impeccable harden`

### [P2] The phone path is invisible on mobile until screen ~20 of 24
**What.** Below `sm` the header shows only "Game plan" + burger; calling requires the menu panel or the final band. Every mid-page CTA moment offers only the form anchor, while PRODUCT.md counts calls as success and this audience's native gesture is the call. (The header tap-to-call icon was Matt's explicit removal, 26/07 — do not re-add there.)
**Fix.** Reuse the final band's "Or call 027 666 1973" outline button as the secondary action beside one or two mid-page primaries (guarantee-band CTA, calculator CTA).
**Suggested command:** `/impeccable clarify` (CTA pairing) or fold into the harden pass

### [P2] The hero demo doesn't follow the rotating trade
**What.** The H1 cycles 8 trades while BookedWeek's ten job blocks are all plumbing/gas. Seven of eight rotator audiences meet a first-viewport self-contradiction ("for Electricians", showing a plumber's diary).
**Fix.** Either drive BookedWeek's labels from the rotator (per-trade job sets, swap keyed to rotator index), or neutralise the job names to cross-trade work ("Emergency callout", "Site quote 3pm", "Day two, big job").
**Suggested command:** `/impeccable delight` (trade-synced) or `/impeccable clarify` (neutral labels)

### [P2] The header CTA leaves the homepage to reach a duplicate of the on-page form
**What.** Header and mobile-panel CTAs go to `/contact#audit` on every page including this one (full navigation, scroll context lost) while five on-page CTAs anchor locally.
**Fix.** Point the header CTA at `#audit` when the current page contains the form (compare `Astro.url.pathname` or pass a prop), falling back to `/contact#audit` elsewhere.
**Suggested command:** `/impeccable harden` (same pass)

## Persona Red Flags

**Jordan (first-timer)** — "Game plan" carries the mobile header CTA with zero explanation until the form microcopy six fields deep. The post-proof CTA teleports ~8,000px to a dark calculator with no orientation, where "Starter · $497/mo" is the first price met and the $1,997 setup fee is absent from the output card (it lives only in the skipped pricing band and FAQ).

**Casey (one thumb, interrupted, slow connection)** — Their thumb, aiming at the partially covered "See what your jobs cost" button, lands on the chat bubble and opens a chat instead. On slow connections they can submit before Turnstile has a token and get "That didn't send" with no hint the fix is waiting. Returning after an interruption, the form fields are empty (calculator numbers survive; the form does not).

**Riley (stress tester)** — JS off: page renders fully, calculator shows sane SSR defaults, the form posts natively… and Turnstile rejects the tokenless post into the silent `/contact` dead end with everything typed gone. That is the one hard dead end on the page. Refresh-after-submit safe; long strings server-capped; double-submit blocked; honeypot non-autofillable; mid-transition nav close handled.

**Dave (52, Hastings roofer, phone in the ute, sunlight, gloves)** — Headlines survive glare; 70-80% body copy on the dark bands washes out in direct sun (the light bands carry better outdoors). The 44px coarse-pointer floor genuinely helps with gloves; smallest targets now are the 40px avatars and ~32px footer links. His call path is burger → panel → phone button, and he must discover the burger holds a number at all. The calculator serves him properly (roofer defaults, ~$20 CPL), but the hero diary shows a plumber's week and the featured case study is plumbing.

## Minor Observations

- The hero `4x return on ad spend*` asterisk resolves ~19,000px later in the footer; the caveat is unfindable in context.
- The count-up animates the $45 target through false intermediate values ("$44" caught mid-flight); consider count-up on the $14 only, in tension with the every-number-verifiable principle otherwise.
- ChatDemo still reserves ~500px of empty black until its stagger plays; start with the first two messages at rest.
- Guarantee appears three times (pricing note, guarantee card, FAQ); the first two are near-verbatim one band apart.
- FAQ lock-in answer is one ~90-word paragraph; split for scanning.
- Non-trade brands sit in the hero avatar stack and logo wall, the page's most prominent proof slots; consider trade-first ordering.
- Desktop dropdown: Escape merely blurs; no arrow-key navigation.
- The hero runs five infinite animations at once (rotator, BookedWeek pops, shine, ping, marquee); all reduced-motion safe but attention-competing.
- Turnstile showed "Verification failed" in dev (dev keys assumed); confirm production monitoring would catch a widget-level failure, since the form has no fallback channel beyond the error-message phone link.
- Mobile hero stat row wraps 2+1 with `4x` alone on its own line; a 2x2 or smaller type would sit tidier.
- `aphoristic-cadence` at threshold: three "X. No Y." constructions page-wide; deliberate register vs tic is Matt's call ("Simple plans…" repeats on 4 other pages).

## Questions to Consider

1. If a phone call counts as a conversion, why does the page treat calling as a footnote until screen 20? What would "Get my free game plan / Or call" as the standard CTA pair from the proof band down do, and would GHL attribution still hold?
2. The rotator proves the page knows the visitor's trade exists; what if one `?trade=` param the ad campaigns already know personalised the whole first viewport (BookedWeek jobs, pain examples, featured case study)?
3. Could the calculator replace the static pricing band entirely (tiers as a compact reference inside "The fit"), cutting four screens and making price always arrive personalised?
4. Success is a booked call and the calendar lives on /thank-you after a form round-trip. What is the measured drop-off between submit and booking, and would embedding the calendar in the `#audit` band convert the ready-now minority faster?
