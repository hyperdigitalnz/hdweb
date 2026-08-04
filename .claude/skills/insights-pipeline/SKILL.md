---
name: insights-pipeline
description: Resume the hyperdigital.nz insights content pipeline: check scheduled publishes, draft the next queued article, or publish one manually. Use when Matt says "continue the content pipeline", "what's the content status", "publish the article", or "draft the next article".
---

# Insights content pipeline

The full, current state lives in
`/home/matt/Clients/hyper-digital/keyword-research/CONTENT-PIPELINE.md`. **Read it
first**; it is the single source of truth for what's published, what's scheduled, the
agreed queue, and the copy rules. Update it whenever the pipeline moves.

## On resume, in order

1. Read `CONTENT-PIPELINE.md`.
2. Check whether the scheduled publishes actually fired (they run as session-bound
   timers in a background session; if that session died they silently didn't):
   `grep -c "draft: true" src/content/insights/<file>` for each scheduled article past
   its date, and curl the live URL (trailing slash) expecting 200.
3. If a publish was missed: delete the `draft: true` line, commit ONLY that file with
   message `Publish insights article: <name>` (+ the Claude co-author trailer), push.
   Push auto-deploys.
4. Then continue the queue per `CONTENT-PIPELINE.md` (evidence pull → draft:true →
   Matt-gate if it names a company → schedule 09:07, spaced every ~2 days).

## Hard rules

- Named-company reviews (NoCowboys, Profitable Tradie) NEVER publish without Matt's
  explicit sign-off on the draft.
- No em dashes, no "honest", NZ English, "free game plan" CTA. Full rules in the
  pipeline doc + website CLAUDE.md.
- Never run `npm run build` while `astro dev` is running (check `pgrep -f "astro dev"`).
- Internal CPC data (`google-ads-cpc-by-trade-*.md`) stays out of the website repo.
- Log completed work to victor: `_tools/victor/log-work.sh --client hyper-digital ...`
  and add a dated LOGS.md entry (LOGS.md and CLAUDE.md are gitignored; that's intended).
