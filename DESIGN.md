---
name: Hyper Digital
description: Black-and-gold marketing site for a NZ trade-business growth agency
colors:
  worksite-gold: "#cea46f"
  deep-gold: "#b88a52"
  light-gold: "#e6b97a"
  gold-ink: "#8a6432"
  midnight-black: "#0c0b0a"
  midnight-lifted: "#141210"
  midnight-raised: "#1c1916"
  off-white: "#faf8f5"
  white: "#ffffff"
  warm-stone: "#f4f2ef"
  sand: "#e6e1d9"
  success-green: "#22c55e"
  error-red: "#ef4444"
  info-blue: "#3b82f6"
  warning-amber: "#f59e0b"
typography:
  display:
    fontFamily: "Outfit Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Outfit Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Outfit Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Outfit Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Outfit Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 700
    letterSpacing: "0.14em"
rounded:
  field: "0.5rem"
  box: "0.875rem"
  pill: "9999px"
spacing:
  gutter: "1.25rem"
  card: "1.75rem"
  section-sm: "4rem"
  section-lg: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.worksite-gold}"
    textColor: "{colors.midnight-black}"
    rounded: "{rounded.field}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.gold-ink}"
    rounded: "{rounded.field}"
  card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.box}"
    padding: "{spacing.card}"
  card-dark:
    backgroundColor: "{colors.midnight-lifted}"
    textColor: "{colors.off-white}"
    rounded: "{rounded.box}"
    padding: "{spacing.card}"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.midnight-black}"
    rounded: "{rounded.field}"
  chip-trade:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.off-white}"
    rounded: "{rounded.pill}"
  eyebrow:
    textColor: "{colors.gold-ink}"
    typography: "{typography.label}"
---

# Design System: Hyper Digital

## Overview

**Creative North Star: "The Sign-Written Ute"**

A flagship black ute with proud gold signwriting: a working tradie's mobile billboard.
Everything on this site behaves like lettering on that ute. Headlines are heavy, tight and
legible at speed (Outfit at weight 800, line-height 0.95); the palette is one black, one
family of golds, and warm paper neutrals; the message is readable in two seconds from
across the street. Dark sections are the ute's paintwork: near-black surfaces catching a
warm gold glow, with a faint 64px workshop grid behind them. Light sections are the
quote on warm paper: white and stone surfaces, hairline sand borders, gold used sparingly
as ink.

The system sells work, not aesthetics. Motion exists to prove the product is alive (the
lead feed ticks, the CTA shines, charts draw themselves) and every animation's resting
state is the finished design. It is confident and hard-working, never precious: no
tech-startup gradient washes, no lime, no corporate stock-photo polish, and no cartoon
tradie clichés.

**Key Characteristics:**
- One accent hue: the gold family (Worksite Gold, Deep Gold, Light Gold, Gold Ink). No second accent.
- Ultra-heavy, ultra-tight display type at every heading level; hierarchy comes from size, not weight changes.
- Alternating dark (glowing, gridded) and light (flat, papery) sections give pages their rhythm.
- Depth is glow, not shadow: gold light and tonal layering carry elevation.
- Conversion furniture (CTA, form, lead feed) is the most vivid thing on any screen.

## Colors

One black, one gold family, warm paper neutrals: the palette of gold signwriting on a black ute.

### Primary
- **Worksite Gold** (#cea46f): the brand accent. Used at full strength for button fills, borders, icons, chips and glows on any surface, and for accent TEXT only on dark surfaces.
- **Gold Ink** (#8a6432): the readable gold. Every gold-coloured piece of TEXT on a light background (`.marker`, `.eyebrow`, `text-primary`) uses this ink variant (5.32:1 on white). Implemented as the `--gold-ink` token, which flips back to Worksite Gold inside dark surfaces automatically.
- **Deep Gold** (#b88a52): the dark end of the gold gradient (`text-gold-gradient`, comparison-bar fills); adds depth behind Worksite Gold.
- **Light Gold** (#e6b97a): the bright end of gradients and highlights.

### Neutral
- **Midnight Black** (#0c0b0a): the ute's paint. Primary text on light surfaces, background of dark sections, text on gold buttons.
- **Midnight Lifted** (#141210) and **Midnight Raised** (#1c1916): tonal steps for cards and chips sitting on Midnight Black (`.surface-2`, `.surface-3`).
- **White** (#ffffff): card and page surface.
- **Warm Stone** (#f4f2ef): alternating light-section background.
- **Sand** (#e6e1d9): hairline borders and dividers on light surfaces. On dark surfaces, borders are `white/10`.
- **Off-White** (#faf8f5): text on dark surfaces.

### Functional
- **Success Green** (#22c55e): live/open status dots, success-themed cards. **Error Red** (#ef4444): pain-point cards, validation. **Info Blue** (#3b82f6) and **Warning Amber** (#f59e0b): reserved daisyUI semantics, rarely seen.

### Named Rules
**The Gold Ink Rule.** Gold text on a light background is always Gold Ink (#8a6432); bright Worksite Gold text is only legal on dark surfaces. Fills, borders, buttons and glows stay #cea46f everywhere. The `--gold-ink` custom property enforces this; never hard-code a gold text colour.

**The One Family Rule.** Gold is the only accent hue. New accents come from the gold family or the functional colours doing their literal job; never introduce a second brand hue (and never lime).

## Typography

**Display Font:** Outfit Variable (with ui-sans-serif, system-ui fallback)
**Body Font:** Outfit Variable (same family throughout)

**Character:** One geometric sans doing two jobs: at weight 800 with tight tracking and 0.95 line-height it reads as signwriting; at weight 400 it is a plain, friendly quote on paper. The logo pushes to 900 italic with -2px tracking.

### Hierarchy
- **Display** (800, 2.25rem mobile stepping to 3.75rem at `sm` and 4.5rem at `xl`, line-height 0.95): page hero H1 only. Key words emphasised with `.marker` (gold ink) or `.highlight` (gold swipe behind the word).
- **Headline** (800, 1.875rem stepping to 3rem at `sm`, line-height 0.95): section H2s, usually preceded by an eyebrow.
- **Title** (800, 1.125rem-1.25rem): card titles, stat labels, CTA button labels (`font-display` with `tracking-wide`, 0.025em, overriding the tight default).
- **Body** (400, 1rem, line-height 1.5): paragraphs, usually at 70% opacity of the surface's content colour for secondary copy.
- **Label** (700, 0.8rem, 0.14em tracking, UPPERCASE): the `.eyebrow` section kicker in gold ink; also feed chips (`.cat-chip`, 0.7rem).

### Named Rules
**The Heavy Head Rule.** Every heading is Outfit 800, -0.015em, line-height 0.95. Hierarchy is expressed through size steps only; there are no light or medium headings.

**The Marked Word Rule.** A hero headline earns exactly one emphasised phrase (`.marker` or `.highlight`), kept short for punch. Marked phrases wrap normally; never prevent line breaks to protect one.

## Layout

Single centred container, `max-w-[1160px]` with a fixed 1.25rem (`px-5`) gutter; narrow
prose moments drop to 900-1000px. Pages are built as full-width alternating bands: dark
glowing section, light paper section, repeat, with the lead form as the destination.
Section rhythm is `py-16` (4rem) to `py-24` (6rem). Inside sections, content is a
two-column split (`lg:` and up) or a 3-up card grid that stacks to one column on mobile.
The header is sticky (70px, near-black at 95% opacity with backdrop blur); nothing is ever
fixed to the bottom of the mobile viewport (the chat widget owns that area). Breakpoints
are Tailwind defaults; the meaningful ones are `sm` (640px, type steps up), `lg` (1024px,
columns appear, desktop nav), `xl` (1280px, hero reaches full size).

## Elevation & Depth

**The Glow Over Shadow Rule.** Depth on this site is light, not weight. Dark sections get
their depth from radial gold glows (`color-mix` tints of Worksite Gold at 12-26%) plus
tonal surface steps (Midnight → Lifted → Raised) and a faint 64px grid overlay; light
sections are flat with hairline sand borders. Grey drop shadows are rare and mostly
state-driven: cards lift and glow gold on hover, primary CTAs carry a gold-tinted shadow,
active tabs glow. A static grey `shadow-xl` appears only under hero imagery and feature
mockups that need to sit above the glow.

### Shadow Vocabulary
- **Card hover glow** (`box-shadow: 0 18px 44px color-mix(in srgb, var(--color-primary) 22%, transparent)` with `translateY(-6px)` and a gold border): the `.card-glow` interaction; success-themed cards swap gold for green.
- **CTA presence** (`shadow-lg shadow-primary/30`): resting gold underglow on hero-level primary buttons.
- **Active tab** (`box-shadow: 0 6px 18px` gold at 30%): segmented tab selection.
- **Hero media** (`shadow-2xl`): plain dark shadow under real screenshots/photos in the hero.

## Shapes

Two radii do almost everything: fields and buttons at 0.5rem (`--radius-field`), boxes and
cards at 0.875rem (`--radius-box`). Chips, dots and the trade pills are full-round
(9999px). Corners never mix within a component. Borders are 1px hairlines (sand on light,
`white/10` on dark), upgraded to 2px gold at 40-60% only for deliberate emphasis (the
featured pricing card, the offset frame behind hero images, media placeholders' dashed
border). Recurring silhouettes: the pill chip with a leading colour dot, the oversized
ghost numeral (gold at 13%) behind system cards, and the offset gold frame sitting
behind photos.

## Components

Component character: **confident and hard-working**. Big, legible, unmissable controls
that do their job without fuss; shine and glow signal energy, not luxury.

### Buttons
- **Shape:** softly rounded (0.5rem), daisyUI `btn` sizing; hero CTAs are `btn-lg`.
- **Primary:** Worksite Gold fill, Midnight Black text, display font at 1.125rem with `tracking-wide`; hero-level instances add the gold underglow and the `.btn-shine` sweep (a skewed white gleam crossing every 3.4s) plus a gentle `hover:scale-[1.03]`.
- **Hover / Focus:** daisyUI default darkening on primary; outline buttons invert (fill with their border colour, flip text).
- **Outline:** transparent with a visible border; three context variants observed: gold border + gold-ink text (light surfaces), `white/60` border + white text (dark surfaces), `base-content/30` border (quiet secondary).
- **Ghost:** text-only gold links for tertiary actions.

### Cards / Containers
- **Corner Style:** 0.875rem (`rounded-box`).
- **Light card:** white on Warm Stone sections, 1px sand border, minimal or no shadow at rest.
- **Dark card:** Midnight Lifted (`surface-2`) with `white/10` border, sitting on the glowing dark band.
- **Featured card:** 2px gold border at 60% + `bg-brand-dark`, used for the highlighted pricing tier.
- **Interaction:** interactive cards take `.card-glow` (lift + gold border + gold glow).
- **Internal Padding:** 1.5-1.75rem (`p-6`/`p-7`), up to `p-9` for hero-level panels.

### Inputs / Fields
- **Style:** daisyUI `input-bordered`/`select-bordered`: white fill, sand border, 0.5rem radius, full-width inside the form grid.
- **Focus:** daisyUI focus border shift; no custom glow.
- **Error:** functional red; honeypot and Turnstile widgets render inside the same form card.

### Chips
- **Category chip** (`.cat-chip`): full-round pill, uppercase 0.7rem display font, tinted 16% of its category colour with a 32% border and a leading colour dot; colour set per-row via the `--chip` custom property (LeadFeed).
- **Trade chip:** `btn-sm` pill, `white/5` fill and `white/20` border on dark, gold border + gold text on hover.
- **Icon chip** (`.icon-chip`): 3rem square, 0.75rem radius, gold at 12% fill with 30% border, holds a gold icon on service cards and steps.

### Navigation
- **Header:** sticky 70px bar, `bg-neutral/95` + backdrop blur, `white/10` bottom hairline. Logo is Outfit 900 italic, "HYPER" white + "DIGITAL" gold. Links are 0.875rem semibold at 80% white, hover to gold with a gold underline growing left-to-right. Desktop dropdown: dark panel, staggered item entrance, chevron flips.
- **Mobile:** full-screen native `<dialog>` top sheet (dark), staggered group entrance, eyebrow-labelled link groups at `text-xl` display weight with gold arrow affordances, phone + CTA action pair at top, review badge at bottom.

### Signature: the live proof machine
The components that make the system feel alive are custom demos: `LeadFeed` (vertical
auto-scroll ticker of incoming leads with category chips, masked at both ends, 22s loop),
the marquee client strip (34s, pauses on hover, logos grayscale until hover), the
guarantee seal (slow-spinning dashed gold ring, 16s), animated SVG charts (line draws in
1.7s with the spring curve, bars grow from their baseline) and `flow-pulse` automation
nodes. They share one easing (`cubic-bezier(0.16, 1, 0.3, 1)`), loop slowly, pause on
hover where relevant, and collapse gracefully under `prefers-reduced-motion` because
their resting state is already the finished design.

## Do's and Don'ts

### Do:
- **Do** open sections with an eyebrow (uppercase, 0.14em, gold ink) above a Heavy Head headline; it is the system's most consistent pattern.
- **Do** use `.marker` for gold keyword emphasis in headings; the `--gold-ink` token handles light/dark legibility for you.
- **Do** alternate dark glowing bands and light paper bands down a page, and keep the lead form (`AuditForm`) as the destination of the scroll.
- **Do** give interactive cards `.card-glow`, and reserve `.btn-shine` for the primary conversion CTA (the game-plan button), roughly one per viewport.
- **Do** design every animation's resting state as the finished layout, so `prefers-reduced-motion` (globally clamped to 0.01ms) shows a complete page.
- **Do** wrap scroll-entrance content in the `Reveal` component (spring curve, 14-16px rise) rather than writing new entrance animations.

### Don't:
- **Don't** use tech-startup gradient washes (blue/purple SaaS gradients). The only legal gradients are the gold glows, the gold text ramp, and gold-family fills.
- **Don't** introduce lime, neon, or any second accent hue; the gold family is the entire accent vocabulary.
- **Don't** chase corporate-agency polish: no stock-photo handshakes, thin grey type, or sterile white minimalism. It should feel like the trades, not a consultancy.
- **Don't** use cartoon tradie clichés: clip-art hard hats, hi-vis mascots, caution-tape borders.
- **Don't** fix anything to the bottom of the mobile viewport; the chat widget owns that area.
- **Don't** set bright Worksite Gold (#cea46f) text on a light background; it fails contrast (2.29:1). That is what Gold Ink is for.
- **Don't** reintroduce the retired `hyper-alt` theme (Hi-Vis orange/navy, deleted from `global.css` 30/07/2026) or any multi-theme fallback machinery; `hyper` is the only theme that ships.
