// Per-trade job sets for the BookedWeek hero demo, keyed EXACTLY by the H1 rotator
// labels in index.astro so the planner can follow the rotating trade (critique
// 31/07/2026: seven of eight rotator audiences used to meet a plumbing-only week).
// 11 titles per trade, in slot order Mon(2) Tue(2) Wed(2) Thu(2) Fri(2) Sat(1).
// Labels are illustrative job types (max ~20 chars so nothing wraps past two lines
// at 390px), never claims; times/days live in BookedWeek.astro and stay constant.

export const DEFAULT_TRADE = "Electricians"; // matches the H1's server-rendered word

export const TRADE_JOBS: Record<string, string[]> = {
  Electricians: [
    "Switchboard upgrade", "Downlights swap",
    "Hot water fault", "New build pre-wire",
    "Power to the shed", "Heat pump circuit",
    "No power callout", "Rewire quote",
    "Pre-wire, day two", "EV charger install",
    "Emergency callout",
  ],
  Plumbers: [
    "Kitchen re-pipe", "Leaking mixer",
    "Hot water cylinder", "Bathroom rough-in",
    "Blocked drain", "Gas hob install",
    "Burst pipe", "New build quote",
    "Re-pipe, day two", "Cylinder swap",
    "Emergency callout",
  ],
  Roofers: [
    "Re-roof, day one", "Leak find and fix",
    "Gutter replacement", "Roof report",
    "Flashing repair", "Long-run install",
    "Storm damage callout", "Re-roof quote",
    "Re-roof, day two", "Skylight install",
    "Emergency callout",
  ],
  Builders: [
    "Deck build, day one", "Fence line repair",
    "Bathroom reno start", "Reclad quote",
    "Garage frame-up", "Pergola build",
    "Insurance repair", "New build quote",
    "Deck build, day two", "Kitchen install",
    "Weekend callout",
  ],
  Painters: [
    "Exterior wash, prep", "Colour consult",
    "Interior, day one", "Roof spray quote",
    "Fence and gates", "Hall and stairwell",
    "Water damage repaint", "Repaint quote",
    "Interior, day two", "Deck stain and oil",
    "Weekend job",
  ],
  Landscapers: [
    "Retaining wall start", "Garden makeover",
    "Irrigation install", "Section clear quote",
    "Planting day", "Lawn prep and lay",
    "Storm cleanup", "Landscape quote",
    "Retaining, day two", "Paths and pavers",
    "Weekend tidy-up",
  ],
  Drainlayers: [
    "Blocked drain jet", "CCTV drain survey",
    "New connection", "Soak pit install",
    "Trench and lay", "Downpipe connect",
    "Flooding callout", "Drainage quote",
    "Trench, day two", "Septic install",
    "Emergency callout",
  ],
  Concreters: [
    "Driveway prep", "Path and steps",
    "Shed slab pour", "Driveway quote",
    "Boxing and mesh", "Patio pour",
    "Cut and seal", "Concrete quote",
    "Pour, day two", "Exposed agg finish",
    "Weekend pour",
  ],
};
