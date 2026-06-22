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

  electricians: {
    slug: "electricians-lead-generation",
    trade: "electrical",
    tradePlural: "electricians",
    tradeSingular: "electrician",

    seoTitle: "Electrician Leads That Book Jobs | Google Ads & Smart Sites | Hyper Digital",
    seoDescription:
      "More booked electrical jobs from your phone. Google Ads that reach ready-to-buy locals, a site that replies in 30 seconds, and follow-up that books the job. Free audit.",

    heroEyebrow: "For electrical businesses in NZ",
    heroHeadlineLead: "We get you",
    heroHeadlineMark: "more electrical jobs.",
    heroSub:
      "We build you a complete lead-to-job system: ads that reach ready-to-buy locals, a website that replies in about 30 seconds, and follow-up that books the job. Real calls and quote requests, not vanity clicks.",

    painLine: "You can't stop and quote a job with live wires in your hands.",

    mistakes: [
      {
        title: "Every slow reply is a job booked by someone else.",
        body: "By the time you're down off the ladder and ring back, they've already called the next sparky on Google and booked them in. The fastest reply usually wins the work.",
        stat: "Most tradies lose 6 to 8 jobs a week to slow callbacks.",
      },
      {
        title: "You forget to follow up.",
        body: "A quote goes out, the customer goes quiet, and you're too flat out to chase it. The job quietly disappears, even though they were keen.",
        stat: "Around 79% of sales need 5 or more follow-ups. Most electricians stop after one.",
      },
      {
        title: "No reviews, so you slip down Google.",
        body: "Happy customers never get asked, so the reviews never come. Fewer reviews means a lower ranking, which means fewer of these calls next month.",
        stat: "Reviews are one of the biggest local ranking factors on Google.",
      },
    ],

    searchTerms: [
      "emergency electrician near me",
      "switchboard upgrade [your town]",
      "electrician for new build",
    ],

    faqExtra: [
      {
        q: "Do you only work with electricians?",
        a: "No. We work with trades right across New Zealand. This page is built for electricians because the searches, the jobs and the customers are specific to your trade, so the system is tuned for how people look for a sparky.",
      },
    ],
  },

  roofers: {
    slug: "roofers-lead-generation",
    trade: "roofing",
    tradePlural: "roofers",
    tradeSingular: "roofer",

    seoTitle: "Roofing Leads That Book Jobs | Google Ads & Smart Sites | Hyper Digital",
    seoDescription:
      "More booked roofing jobs from your phone. Google Ads that reach ready-to-buy locals, a site that replies in 30 seconds, and follow-up that books the job. Free audit.",

    heroEyebrow: "For roofing businesses in NZ",
    heroHeadlineLead: "We get you",
    heroHeadlineMark: "more roofing jobs.",
    heroSub:
      "We build you a complete lead-to-job system: ads that reach ready-to-buy locals, a website that replies in about 30 seconds, and follow-up that books the job. Real calls and quote requests, not vanity clicks.",

    painLine: "You can't take a call when you're two storeys up on a roof.",

    mistakes: [
      {
        title: "Every slow reply is a job booked by someone else.",
        body: "By the time you've climbed down and rung back, they've already called the next roofer on Google and booked the job in. The fastest reply usually wins the work.",
        stat: "Most tradies lose 6 to 8 jobs a week to slow callbacks.",
      },
      {
        title: "You forget to follow up.",
        body: "A quote goes out, the customer goes quiet, and you're too flat out to chase it. The job quietly disappears, even though they were keen. Roofing jobs are big tickets to let slip.",
        stat: "Around 79% of sales need 5 or more follow-ups. Most roofers stop after one.",
      },
      {
        title: "No reviews, so you slip down Google.",
        body: "Happy customers never get asked, so the reviews never come. Fewer reviews means a lower ranking, which means fewer of these calls next month.",
        stat: "Reviews are one of the biggest local ranking factors on Google.",
      },
    ],

    searchTerms: [
      "roof repairs near me",
      "reroofing cost [your town]",
      "roof leak repair",
    ],

    faqExtra: [
      {
        q: "Do you only work with roofers?",
        a: "No. We work with trades right across New Zealand. This page is built for roofers because the searches, the jobs and the customers are specific to your trade, so the system is tuned for how people look for a roofer.",
      },
    ],
  },

  builders: {
    slug: "builders-lead-generation",
    trade: "building",
    tradePlural: "builders",
    tradeSingular: "builder",

    seoTitle: "Building Leads That Book Jobs | Google Ads & Smart Sites | Hyper Digital",
    seoDescription:
      "More booked building jobs from your phone. Google Ads that reach ready-to-buy locals, a site that replies in 30 seconds, and follow-up that books the job. Free audit.",

    heroEyebrow: "For building businesses in NZ",
    heroHeadlineLead: "We get you",
    heroHeadlineMark: "more building jobs.",
    heroSub:
      "We build you a complete lead-to-job system: ads that reach ready-to-buy locals, a website that replies in about 30 seconds, and follow-up that books the job. Real calls and quote requests, not vanity clicks.",

    painLine: "You can't price a new job when you're flat out running the current one.",

    mistakes: [
      {
        title: "Every slow reply is a job booked by someone else.",
        body: "By the time you get a quiet moment to call back, they've moved on to the next builder who picked up. With jobs this size, one slow reply is real money out the door.",
        stat: "Most tradies lose 6 to 8 jobs a week to slow callbacks.",
      },
      {
        title: "You forget to follow up.",
        body: "A quote goes out, the customer goes quiet, and you're too flat out on site to chase it. The job quietly disappears, even though they were keen.",
        stat: "Around 79% of sales need 5 or more follow-ups. Most builders stop after one.",
      },
      {
        title: "No reviews, so you slip down Google.",
        body: "Happy customers never get asked, so the reviews never come. Fewer reviews means a lower ranking, which means fewer of these calls next month.",
        stat: "Reviews are one of the biggest local ranking factors on Google.",
      },
    ],

    searchTerms: [
      "builder near me",
      "home renovation builder [your town]",
      "new build quote",
    ],

    faqExtra: [
      {
        q: "Do you only work with builders?",
        a: "No. We work with trades right across New Zealand. This page is built for builders because the searches, the jobs and the customers are specific to your trade, so the system is tuned for how people look for a builder.",
      },
    ],
  },

  painters: {
    slug: "painters-lead-generation",
    trade: "painting",
    tradePlural: "painters",
    tradeSingular: "painter",

    seoTitle: "Painting Leads That Book Jobs | Google Ads & Smart Sites | Hyper Digital",
    seoDescription:
      "More booked painting jobs from your phone. Google Ads that reach ready-to-buy locals, a site that replies in 30 seconds, and follow-up that books the job. Free audit.",

    heroEyebrow: "For painting businesses in NZ",
    heroHeadlineLead: "We get you",
    heroHeadlineMark: "more painting jobs.",
    heroSub:
      "We build you a complete lead-to-job system: ads that reach ready-to-buy locals, a website that replies in about 30 seconds, and follow-up that books the job. Real calls and quote requests, not vanity clicks.",

    painLine: "You can't answer the phone with a brush in one hand and a wall half done.",

    mistakes: [
      {
        title: "Every slow reply is a job booked by someone else.",
        body: "By the time you've cleaned up and rung back, they've already booked the next painter who answered. The fastest reply usually wins the work.",
        stat: "Most tradies lose 6 to 8 jobs a week to slow callbacks.",
      },
      {
        title: "You forget to follow up.",
        body: "A quote goes out, the customer goes quiet, and you're too flat out on the tools to chase it. The job quietly disappears, even though they were keen.",
        stat: "Around 79% of sales need 5 or more follow-ups. Most painters stop after one.",
      },
      {
        title: "No reviews, so you slip down Google.",
        body: "Happy customers never get asked, so the reviews never come. Fewer reviews means a lower ranking, which means fewer of these calls next month.",
        stat: "Reviews are one of the biggest local ranking factors on Google.",
      },
    ],

    searchTerms: [
      "house painters near me",
      "interior house painting [your town]",
      "exterior repaint quote",
    ],

    faqExtra: [
      {
        q: "Do you only work with painters?",
        a: "No. We work with trades right across New Zealand. This page is built for painters because the searches, the jobs and the customers are specific to your trade, so the system is tuned for how people look for a painter.",
      },
    ],
  },

  "heat-pumps": {
    slug: "heat-pump-lead-generation",
    trade: "heat pump",
    tradePlural: "heat pump installers",
    tradeSingular: "heat pump installer",

    seoTitle: "Heat Pump & HVAC Leads That Book Jobs | Google Ads & Smart Sites | Hyper Digital",
    seoDescription:
      "More booked heat pump and HVAC jobs from your phone. Google Ads that reach ready-to-buy locals, a site that replies in 30 seconds, and follow-up that books the job. Free audit.",

    heroEyebrow: "For heat pump and HVAC businesses in NZ",
    heroHeadlineLead: "We get you",
    heroHeadlineMark: "more heat pump jobs.",
    heroSub:
      "We build you a complete lead-to-job system: ads that reach ready-to-buy locals, a website that replies in about 30 seconds, and follow-up that books the job. Real calls and quote requests, not vanity clicks.",

    painLine: "You can't return calls when you're up a ladder mounting a unit.",

    mistakes: [
      {
        title: "Every slow reply is a job booked by someone else.",
        body: "By the time you call back from the install you're on, they've booked the next installer on Google. The fastest reply usually wins the work.",
        stat: "Most tradies lose 6 to 8 jobs a week to slow callbacks.",
      },
      {
        title: "You forget to follow up.",
        body: "A quote goes out, the customer goes quiet, and you're too flat out to chase it. The job quietly disappears, even though they were keen.",
        stat: "Around 79% of sales need 5 or more follow-ups. Most installers stop after one.",
      },
      {
        title: "No reviews, so you slip down Google.",
        body: "Happy customers never get asked, so the reviews never come. Fewer reviews means a lower ranking, which means fewer of these calls next month.",
        stat: "Reviews are one of the biggest local ranking factors on Google.",
      },
    ],

    searchTerms: [
      "heat pump installation near me",
      "heat pump servicing [your town]",
      "ducted heat pump quote",
    ],

    faqExtra: [
      {
        q: "Do you only work with heat pump installers?",
        a: "No. We work with trades right across New Zealand. This page is built for heat pump and HVAC installers because the searches, the jobs and the customers are specific to your trade, so the system is tuned for how people look for an installer.",
      },
    ],
  },
};
