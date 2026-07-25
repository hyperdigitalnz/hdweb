-- Anonymous on-site tool usage (job calculator). No PII by design.
-- Apply: wrangler d1 execute hdweb-tools --remote --file=./db/tool_events.sql
CREATE TABLE IF NOT EXISTS tool_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL DEFAULT (datetime('now')),
  tool TEXT NOT NULL,
  trade TEXT NOT NULL,
  inputs TEXT NOT NULL,    -- JSON: {jobValue, jobsWanted, winRate, website, areas}
  outputs TEXT NOT NULL,   -- JSON: {revMo, leadsNeeded, plan, budget}
  page TEXT NOT NULL DEFAULT '',
  converted INTEGER NOT NULL DEFAULT 0  -- 1 = went on to the audit form handoff
);
CREATE INDEX IF NOT EXISTS idx_tool_events_trade ON tool_events (trade);
CREATE INDEX IF NOT EXISTS idx_tool_events_ts ON tool_events (ts);
