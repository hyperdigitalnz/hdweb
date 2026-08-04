// Site-wide constants. Update phone/email/hours once confirmed.
export const SITE = {
  name: "Hyper Digital",
  tagline: "The complete job booking system for modern Tradies.",
  phone: "027 666 1973",
  phoneHref: "tel:+64276661973",
  hours: "Mon–Fri 7am–9pm, Sat–Sun 9am–7pm",
  email: "sales@hyperdigital.nz",
  location: "Hawke's Bay, NZ. Working with tradies NZ-wide",
};

// Google reviews badge (static by design, Matt 25/07/2026: no auto-update machinery).
// Bump `count` by hand as reviews land; understating between bumps is the safe direction.
// TODO(Matt): swap `url` for the exact Google profile/review link when you have it.
export const REVIEWS = {
  rating: "5.0",
  count: 15,
  url: "https://www.google.com/search?q=Hyper+Digital+Hawke%27s+Bay+reviews",
};

// Author identity for insights articles: byline, bio card (AuthorBio.astro) and the
// BlogPosting Person schema. Real external profiles, confirmed by Matt 02/08/2026.
export const AUTHOR = {
  name: "Matt McAuliffe",
  role: "Co-founder, Hyper Digital",
  photo: "/img/matt-profile-new.png",
  linkedin: "https://www.linkedin.com/in/mdamcauliffe/",
  website: "https://mattmcauliffe.co.nz",
  bio: "Co-founder of Hyper Digital. Matt has been building Google Ads campaigns, websites and marketing systems for NZ trade and local businesses since 2019, and writes from what's working across the agency's client accounts.",
};

/**
 * Navigation, single source for the header (desktop + mobile panel) and footer.
 * `children` on a primary item renders as a dropdown on desktop and a link group
 * in the mobile panel. Keep the top level at five labels.
 */
export type NavLink = { label: string; href: string };
export type NavItem = NavLink & { children?: NavLink[] };

export const NAV: NavItem[] = [
  {
    label: "Get more work",
    href: "/lead-generation/",
    children: [
      { label: "Google Ads", href: "/google-ads/" },
      { label: "Facebook Ads", href: "/facebook-ads/" },
      { label: "Lead Generation", href: "/lead-generation/" },
      // { label: "SEO & Local", href: "/seo/" }, // lands with the /seo page build
    ],
  },
  { label: "Websites", href: "/websites/" },
  { label: "Automation", href: "/ai-automation/" },
  { label: "Results", href: "/results/" },
  { label: "About", href: "/about/" },
];

// Footer columns + the mobile panel's "Proof & company" group.
export const NAV_SERVICES: NavLink[] = [
  { label: "Google Ads", href: "/google-ads/" },
  { label: "Facebook Ads", href: "/facebook-ads/" },
  { label: "Lead Generation", href: "/lead-generation/" },
  { label: "Websites", href: "/websites/" },
  { label: "AI Automation", href: "/ai-automation/" },
];
export const NAV_COMPANY: NavLink[] = [
  { label: "Results", href: "/results/" },
  { label: "Insights", href: "/insights/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

// Trust stats. 107/49 confirmed by Matt 25/07/2026 ("40+" retired; check quarterly).
// 107 = clients since 2019 (only grows, safe). The current-book figure (49) deliberately
// does NOT appear here next to 107 — it lives in body copy only (capacity/exclusivity),
// so the two numbers never invite subtraction. See SITE-REVIEW-2026-07-25.md §3.6.
export const STATS = [
  { value: "107", label: "Kiwi businesses since 2019" },
  { value: "$1m+", label: "ad spend managed" },
  { value: "$4m+", label: "tracked client revenue" },
  { value: "4x", label: "return on ad spend*" },
  // Number first (matches the other stats' rhythm) + non-breaking space so the
  // star can never wrap onto its own line in any of the trust bars.
  { value: `${REVIEWS.rating} ★`, label: `from ${REVIEWS.count} Google reviews` },
];

// Current client count, body-copy use only (see note above). Confirmed 25/07/2026.
export const CURRENT_CLIENTS = 49;

// Fine print for the asterisked 4x stat, shown once in the footer (not under every trust
// bar, where it was too distracting). The 4x figure is a deliberately conservative blended
// average across managed accounts, so individual case studies (e.g. Tableau Towbars at ~7x)
// can sit higher without contradicting the headline.
export const STATS_NOTE =
  "4x return on ad spend is a conservative blended average across managed accounts. Individual campaigns vary, and some run higher.";
