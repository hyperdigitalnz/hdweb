// Single source of truth for the three Hyper Digital packages.
// Used on the home page and the websites page (and anywhere else tiers appear),
// so prices and inclusions only ever change in one spot.

export const SETUP_FEE = "$1,997"; // one-off, +GST

export type PricingTier = {
  name: string;
  price: string; // monthly, NZD, +GST (digits only, no $)
  who: string;
  popular: boolean;
  leadIn?: string; // e.g. "Everything in Starter, plus:" for the cumulative tiers
  features: string[];
};

export const PRICING: PricingTier[] = [
  {
    name: "Starter",
    price: "497",
    who: "Getting found in your local area, one core service.",
    popular: false,
    features: [
      "30-second reply smart website (SEO & AEO optimised)",
      "Google Ads management (one core service)",
      "Local SEO & Google Business Profile optimisation",
      "AI chat: qualifies the job and books it in",
      "Automated email follow-ups",
      "5-star review funnel",
      "Monthly reporting",
    ],
  },
  {
    name: "Growth",
    price: "697",
    who: "Most trades: multiple services and a wider catchment.",
    popular: true,
    leadIn: "Everything in Starter, plus:",
    features: [
      "Meta (Facebook & Instagram) Ads management",
      "Retargeting campaigns",
      "Multiple services and a wider catchment",
      "Email nurture & reactivation workflows",
      "Live analytics dashboard",
    ],
  },
  {
    name: "Scale",
    price: "997",
    who: "Busy operators chasing volume across multiple regions.",
    popular: false,
    leadIn: "Everything in Growth, plus:",
    features: [
      "Multi-region ad campaigns",
      "Expanded keyword & audience coverage",
      "Advanced automation workflows",
      "Conversion-rate optimisation",
      "Priority strategy & support",
    ],
  },
];
