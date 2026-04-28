#!/usr/bin/env bash
# Push variables from .env.local to Vercel (production + preview + development).
# Usage: bash scripts/push-env-to-vercel.sh
# Requires: project linked via `vercel link`, devDependency `vercel` installed.
# Values are NEVER printed — only key names + status.

set -uo pipefail

ENV_FILE=".env.local"
ENVS=(production preview development)
FAIL_COUNT=0
OK_COUNT=0

if [[ ! -f "$ENV_FILE" ]]; then
  echo "✗ $ENV_FILE not found"; exit 1
fi

while IFS= read -r line; do
  # skip blank lines and comments
  [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
  # split key/value at first =
  key="${line%%=*}"
  value="${line#*=}"
  # trim whitespace around key
  key="$(echo "$key" | tr -d '[:space:]')"
  # only uppercase + underscore + digits
  [[ ! "$key" =~ ^[A-Z_][A-Z0-9_]*$ ]] && continue
  # skip empty values
  [[ -z "$value" ]] && continue

  for env in "${ENVS[@]}"; do
    if printf '%s' "$value" | npx --no-install vercel env add "$key" "$env" --force >/dev/null 2>&1; then
      printf "  ✅ %-40s [%s]\n" "$key" "$env"
      OK_COUNT=$((OK_COUNT + 1))
    else
      # try without --force (older CLI) or report fail
      if printf '%s' "$value" | npx --no-install vercel env add "$key" "$env" >/dev/null 2>&1; then
        printf "  ✅ %-40s [%s]\n" "$key" "$env"
        OK_COUNT=$((OK_COUNT + 1))
      else
        printf "  ⚠️  %-40s [%s] (may already exist)\n" "$key" "$env"
        FAIL_COUNT=$((FAIL_COUNT + 1))
      fi
    fi
  done
done < "$ENV_FILE"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  OK: $OK_COUNT   ⚠️ skipped/exists: $FAIL_COUNT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
