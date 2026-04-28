#!/usr/bin/env bash
# Fix Vercel env vars: remove empty entries and re-add with correct values from .env.local.
# IMPORTANT: NEXT_PUBLIC_* are pushed with --no-sensitive so they remain readable for local
# prebuilt builds (`vercel pull` returns "" for sensitive vars otherwise).
# Server-side secrets stay sensitive (default).
# Usage: bash scripts/fix-vercel-env.sh [production|preview|both]

set -uo pipefail

TARGET="${1:-both}"
ENV_FILE=".env.local"
VERCEL="./node_modules/.bin/vercel"
OK=0
FAIL=0

push_one() {
  local key="$1" value="$2" env="$3"
  env -u AI_AGENT -u CLAUDECODE "$VERCEL" env rm "$key" "$env" --yes >/dev/null 2>&1 || true

  # Decide sensitivity: NEXT_PUBLIC_* are public anyway, mark non-sensitive so pull/build can read them
  local sens_flag=""
  if [[ "$key" =~ ^NEXT_PUBLIC_ ]]; then
    sens_flag="--no-sensitive"
  fi

  if [[ "$env" == "preview" ]]; then
    if ./scripts/push-env-preview.exp "$key" "$value" >/dev/null 2>&1; then
      printf "  ✅ %-40s [%s]%s\n" "$key" "$env" "${sens_flag:+ public}"; OK=$((OK + 1))
    else
      printf "  ❌ %-40s [%s] FAILED\n" "$key" "$env"; FAIL=$((FAIL + 1))
    fi
  else
    if env -u AI_AGENT -u CLAUDECODE "$VERCEL" env add "$key" "$env" --value "$value" --yes $sens_flag < /dev/null >/dev/null 2>&1; then
      printf "  ✅ %-40s [%s]%s\n" "$key" "$env" "${sens_flag:+ public}"; OK=$((OK + 1))
    else
      printf "  ❌ %-40s [%s] FAILED\n" "$key" "$env"; FAIL=$((FAIL + 1))
    fi
  fi
}

ENVS=()
case "$TARGET" in
  production) ENVS=(production) ;;
  preview)    ENVS=(preview) ;;
  both)       ENVS=(production preview) ;;
  *) echo "Usage: $0 [production|preview|both]"; exit 1 ;;
esac

while IFS= read -r line; do
  [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
  key="${line%%=*}"
  value="${line#*=}"
  key="$(echo "$key" | tr -d '[:space:]')"
  [[ ! "$key" =~ ^[A-Z_][A-Z0-9_]*$ ]] && continue
  [[ -z "$value" ]] && continue
  [[ "$key" == "VERCEL_TOKEN" ]] && continue

  for env in "${ENVS[@]}"; do
    push_one "$key" "$value" "$env"
  done
done < "$ENV_FILE"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  OK: $OK   ❌ failed: $FAIL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
