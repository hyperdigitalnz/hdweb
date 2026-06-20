// Trade-specific tokens for the lead-gen landing page template
// (src/components/TradeLandingPage.astro). Everything that is the SAME across
// trades lives in the template; only the per-trade copy below changes.
//
// To add a trade: add an entry here, then create a thin page file at
// src/pages/<slug>.astro that renders <TradeLandingPage trade={tradeLeadGen.<key>} />.

export interface TradeMistake {
  title: string;
  body: string;
  stat: string;
}

export interface TradeFaq {
  q: string;
  a: string;
}

export interface TradeProof {
  /** Client name shown on the tile. Omit when the whole section is one client. */
  name?: string;
  stat: string;
  statLabel: string;
  body: string;
}

export interface TradeLP {
  /** URL slug, e.g. "plumbers-lead-generation" (also the page filename). */
  slug: string;
  /** Lowercase activity, e.g. "plumbing". */
  trade: string;
  /** Plural people, e.g. "plumbers". */
  tradePlural: string;
  /** Singular person, e.g. "plumber". */
  tradeSingular: string;

  seoTitle: string;
  seoDescription: string;

  /** Eyebrow above the H1, e.g. "For plumbing businesses in NZ". */
  heroEyebrow: string;
  /** First part of the H1 (plain). Carries most of the headline. */
  heroHeadlineLead: string;
  /** Short gold phrase that finishes the H1. Keep it to 2-4 words: it renders
   *  with .marker (white-space: nowrap), so a long clause here will overflow. */
  heroHeadlineMark: string;
  /** Hero sub-paragraph. */
  heroSub: string;

  /** Punchy one-liner used in the problem section. No em dashes. */
  painLine: string;

  /** Exactly three "mistakes" for the problem section. */
  mistakes: TradeMistake[];

  /** Three example Google searches shown on the Google Ads system card. */
  searchTerms: string[];

  /** Optional proof tiles (3). Omit to use the shared default set. Use only
   *  real, verifiable client results. */
  proof?: TradeProof[];

  /** Optional cost-per-lead chart. Omit to use the shared default (Harris Pumps).
   *  topLabel is the higher value (drawn top-left), bottomLabel the lower (bottom-right). */
  chart?: { badge: string; topLabel: string; bottomLabel: string; caption: string };

  /** Optional subhead under the results heading (e.g. naming a single featured client). */
  resultsSub?: string;

  /** Optional hero image; falls back to the pipeline animation. */
  heroImage?: string;
  heroImageAlt?: string;

  /** Optional trade-specific FAQs appended to the shared set. */
  faqExtra?: TradeFaq[];
}

export const tradeLeadGen: Record<string, TradeLP> = {
  plumbers: {
    slug: "plumbers-lead-generation",
    trade: "plumbing",
    tradePlural: "plumbers",
    tradeSingular: "plumber",

    seoTitle: "Plumbing Leads That Book Jobs | Google Ads & Smart Sites | Hyper Digital",
    seoDescription:
      "More booked plumbing jobs from your phone. Google Ads that reach ready-to-buy locals, a site that replies in 30 seconds, and follow-up that books the job. Free audit.",

    heroEyebrow: "For plumbing businesses in NZ",
    heroHeadlineLead: "We get you",
    heroHeadlineMark: "more plumbing jobs.",
    heroSub:
      "We build you a complete lead-to-job system: ads that reach ready-to-buy locals, a website that replies in about 30 seconds, and follow-up that books the job. Real calls and quote requests, not vanity clicks.",

    painLine: "You can't answer the phone with your hands full under a sink.",

    mistakes: [
      {
        title: "Every slow reply is a job booked by someone else.",
        body: "By the time you call back from the job, they've already rung the next plumber on Google and booked them in. The fastest reply usually wins the work.",
        stat: "Most tradies lose 6 to 8 jobs a week to slow callbacks.",
      },
      {
        title: "You forget to follow up.",
        body: "A quote goes out, the customer goes quiet, and you're too flat out to chase it. The job quietly disappears, even though they were keen.",
        stat: "Around 79% of sales need 5 or more follow-ups. Most plumbers stop after one.",
      },
      {
        title: "No reviews, so you slip down Google.",
        body: "Happy customers never get asked, so the reviews never come. Fewer reviews means a lower ranking, which means fewer of these calls next month.",
        stat: "Reviews are one of the biggest local ranking factors on Google.",
      },
    ],

    searchTerms: [
      "emergency plumber near me",
      "blocked drain [your town]",
      "hot water cylinder replacement",
    ],

    // Plumbers page: feature only No Drips, our Hawke's Bay plumbing client.
    resultsSub: "Here's what we did for No Drips Plumbing, a Hawke's Bay plumber.",
    proof: [
      { stat: "$14", statLabel: "cost per lead, best keywords", body: "Our best-performing keywords bring in plumbing leads for as little as $14, well under their $45-a-lead target." },
      { stat: "~9%", statLabel: "click-through rate", body: "Roughly double the 3 to 5% industry average for Google Search ads, so more of the budget turns into clicks." },
      { stat: "~$3k", statLabel: "wasted spend cut", body: "We took over the account, audited it, and cut close to $3,000 the previous agency had spent on clicks that never booked." },
    ],
    chart: {
      badge: "under target",
      topLabel: "$45",
      bottomLabel: "$14",
      caption: "No Drips Plumbing. Their target is $45 a lead. Our best keywords bring leads in at $14. Illustrative chart.",
    },

    faqExtra: [
      {
        q: "Do you only work with plumbers?",
        a: "No. We work with trades right across New Zealand. This page is built for plumbers because the searches, the jobs and the customers are specific to your trade, so the system is tuned for how people look for a plumber.",
      },
    ],
  },
};
