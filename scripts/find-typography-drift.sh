#!/usr/bin/env bash
# Find inline typography that should use design system tokens.
# Run from repo root: bash scripts/find-typography-drift.sh
#
# Output: file:line  ▸ class
# Goal: zero hits across the codebase. Each hit = a candidate to migrate
# to a `t-*` utility class (see Copilot/Typo-System.md).

set -e
cd "$(dirname "$0")/.."

echo "▸ Scanning components/ + app/ for typography drift…"
echo ""

INCLUDE_FLAGS=(--include="*.tsx" --include="*.ts" --include="*.jsx")
EXCLUDE_DIRS=(--exclude-dir=node_modules --exclude-dir=.next --exclude-dir=public --exclude-dir=Copilot)

count_pattern() {
  local label="$1"
  local pattern="$2"
  local n=$(grep -rE "${pattern}" "${INCLUDE_FLAGS[@]}" "${EXCLUDE_DIRS[@]}" . 2>/dev/null | grep -v "// drift-ok" | wc -l | tr -d ' ')
  printf "  %-40s %s\n" "${label}" "${n}"
}

show_pattern() {
  local label="$1"
  local pattern="$2"
  local hits=$(grep -rEn "${pattern}" "${INCLUDE_FLAGS[@]}" "${EXCLUDE_DIRS[@]}" . 2>/dev/null | grep -v "// drift-ok" | head -10)
  if [ -n "${hits}" ]; then
    echo ""
    echo "── ${label} ──"
    echo "${hits}"
  fi
}

echo "Counts (hits to fix):"
count_pattern "Inline px text size text-\\[Npx\\]"   'text-\[[0-9]+px\]'
count_pattern "Inline rem text size text-\\[Nrem\\]" 'text-\[[0-9.]+rem\]'
count_pattern "Inline leading-\\[N\\]"               'leading-\[[0-9.]+'
count_pattern "Inline tracking-\\[N\\]"              'tracking-\[[0-9.]+'
count_pattern "Old text-brand-stone/70 (low contrast)" 'text-brand-stone/70'
count_pattern "Hardcoded font-display + custom size"  'font-display.*text-[0-9]xl|font-display.*text-\['

echo ""
echo "Sample drifts (first 10 each):"
show_pattern "Inline px sizes"            'text-\[[0-9]+px\]'
show_pattern "Inline leading"             'leading-\[[0-9.]+'
show_pattern "Inline tracking"            'tracking-\[[0-9.]+'
show_pattern "Low-contrast stone/70"      'text-brand-stone/70'

echo ""
echo "Replace with the design system tokens defined in tailwind.config.ts."
echo "Visual reference: https://www.skstalents.fr/dashboard/typo?token=…"
echo "Doc: Copilot/Typo-System.md"
