#!/usr/bin/env bash
# Quick commit + push for the hdweb site.
# Stages everything, commits with a message you type (or a timestamp), pushes to origin.
set -euo pipefail

REPO="/home/matt/Clients/hyper-digital/website"
cd "$REPO"

# Nothing to do?
if [[ -z "$(git status --porcelain)" ]]; then
  echo "Nothing to commit. Working tree clean."
  read -rp "Press Enter to close..." _
  exit 0
fi

echo "Changes to be committed:"
git status --short
echo

# Ask for a message; fall back to a timestamped one.
read -rp "Commit message (blank = timestamp): " MSG
if [[ -z "${MSG}" ]]; then
  MSG="Update $(date '+%d/%m/%Y %H:%M')"
fi

git add -A
git commit -m "$MSG"

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
echo
echo "Pushing $BRANCH to origin..."
git push origin "$BRANCH"

echo
echo "Done. Cloudflare will auto-deploy from main."
read -rp "Press Enter to close..." _
