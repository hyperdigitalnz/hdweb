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

export const NAV = [
  { label: "Find Work", href: "/lead-generation" },
  { label: "Websites", href: "/websites" },
  { label: "Automation", href: "/ai-automation" },
  { label: "Results", href: "/results" },
  { label: "About", href: "/about" },
];

// Trust stats — all confirmed true (16/06/2026)
export const STATS = [
  { value: "40+", label: "Kiwi businesses helped" },
  { value: "$1m+", label: "ad spend managed" },
  { value: "$4m+", label: "tracked client revenue" },
  { value: "4x", label: "return on ad spend*" },
  { value: "2019", label: "in business since" },
];

// Fine print for the asterisked 4x stat, shown once in the footer (not under every trust
// bar, where it was too distracting). The 4x figure is a deliberately conservative blended
// average across managed accounts, so individual case studies (e.g. Tableau Towbars at ~7x)
// can sit higher without contradicting the headline.
export const STATS_NOTE =
  "4x return on ad spend is a conservative blended average across managed accounts. Individual campaigns vary, and some run higher.";
