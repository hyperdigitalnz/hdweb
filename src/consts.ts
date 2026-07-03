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

// Request-a-callback window and copy. Pages are prerendered, so the open/closed state is
// evaluated client-side in the visitor's browser against Pacific/Auckland time. A wrong
// device clock only ever affects the copy shown, never the submission itself.
export const CALLBACK = {
  timeZone: "Pacific/Auckland",
  days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  startMinutes: 8 * 60 + 30, // 08:30
  endMinutes: 17 * 60, // 17:00
  openCopy: "Leave your name and number and we'll ring you back shortly.",
  closedCopy: "Leave your name and number and we'll call you on the next business day.",
  openLabel: "Request a callback",
} as const;

// True when it's currently inside the callback window in NZ. Importable from client
// <script>s (Vite bundles this module into them); no date libraries needed.
export function isCallbackOpen(now: Date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat("en-NZ", {
    timeZone: CALLBACK.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23", // avoids the hour-"24" midnight quirk of hour12: false
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const mins = parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10);
  return (
    (CALLBACK.days as readonly string[]).includes(get("weekday")) &&
    mins >= CALLBACK.startMinutes &&
    mins < CALLBACK.endMinutes
  );
}

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
