#!/usr/bin/env bash
# Sentinelle skstalents.fr · verifie la sante des URLs en production.
#
# Pourquoi ce script existe : la routine cloud creee le 2026-09-02 ne peut pas
# atteindre skstalents.fr depuis son sandbox (egress bloque). GitHub Actions,
# lui, a un acces reseau normal. La detection vit donc ici.
#
# Sortie : un rapport markdown sur stdout, et un code de sortie non nul si au
# moins une anomalie est trouvee.

set -uo pipefail

BASE="https://www.skstalents.fr"
REPORT="${REPORT_FILE:-/tmp/sentinelle-report.md}"
ANOMALIES=0

: > "$REPORT"
: > /tmp/sentinelle-cases.txt

note() { printf '%s\n' "$1" >> "$REPORT"; }
anomaly() { ANOMALIES=$((ANOMALIES + 1)); note "$1"; }

status_of() {
  curl -s -o /dev/null -w '%{http_code}' --max-time 25 "$1"
}

redirect_of() {
  curl -s -o /dev/null -w '%{redirect_url}' --max-time 25 "$1"
}

note "# Sentinelle skstalents.fr"
note ""
note "Execution : $(date -u '+%Y-%m-%d %H:%M UTC')"
note ""

# ---------------------------------------------------------------- 1. Sitemap
note "## 1. Crawl du sitemap"
note ""

SITEMAP_CODE=$(status_of "$BASE/sitemap.xml")
if [ "$SITEMAP_CODE" != "200" ]; then
  anomaly "- Sitemap inaccessible : \`$BASE/sitemap.xml\` renvoie \`$SITEMAP_CODE\`. Crawl impossible."
  note ""
  echo "ANOMALIES=$ANOMALIES" >> "${GITHUB_ENV:-/dev/null}"
  cat "$REPORT"
  exit 1
fi

curl -s --max-time 60 "$BASE/sitemap.xml" \
  | grep -o '<loc>[^<]*</loc>' \
  | sed 's|<loc>||; s|</loc>||' > /tmp/sentinelle-urls.txt

TOTAL=$(wc -l < /tmp/sentinelle-urls.txt | tr -d ' ')

if [ "$TOTAL" -lt 100 ]; then
  anomaly "- Sitemap suspect : seulement \`$TOTAL\` URLs extraites, un effondrement du nombre d'URLs est un incident en soi."
fi

# Une URL du sitemap doit repondre 200. Une redirection est un signal negatif
# pour Google : le sitemap ne doit annoncer que des URLs finales.
# -n 1 sans -I : avec -I, xargs impose une limite de longueur de ligne qui fait
# echouer l'assemblage de la commande sur les URLs longues, et le fichier de
# resultats sort vide. Un fichier vide passerait pour "tout est en 200".
xargs -P 8 -n 1 bash -c \
  'printf "%s %s\n" "$(curl -s -o /dev/null -w "%{http_code}" --max-time 25 "$1")" "$1"' _ \
  < /tmp/sentinelle-urls.txt > /tmp/sentinelle-results.txt

TESTED=$(wc -l < /tmp/sentinelle-results.txt | tr -d ' ')
if [ "$TESTED" -ne "$TOTAL" ]; then
  anomaly "- **Crawl incomplet** : $TESTED URLs testees sur $TOTAL annoncees par le sitemap. Resultat non fiable, ne pas conclure que le site est sain."
fi

BAD=$(awk '$1 != "200"' /tmp/sentinelle-results.txt)

if [ -n "$BAD" ]; then
  COUNT=$(printf '%s\n' "$BAD" | wc -l | tr -d ' ')
  anomaly "- **$COUNT URL(s) du sitemap ne repondent pas 200** sur $TOTAL testees :"
  note ""
  note '```'
  printf '%s\n' "$BAD" >> "$REPORT"
  note '```'
else
  note "- $TOTAL URLs testees, toutes en 200."
fi
note ""

# ------------------------------------------------- 2. Filet anti-404 et legacy
note "## 2. Redirections attendues"
note ""

# Format : chemin|code attendu|fragment attendu dans la destination (vide = non verifie)
CASES="
/job-roles/key-account-manager-animal-health|308|medical-vet-key-account-manager-large-accounts
/job-roles/responsable-production-biotech|308|biotech-production-manager
/schools-%C3%89coles|308|/schools
/diagnostic-Diagnostic|308|/diagnostic
/references-R%C3%A9f%C3%A9rences|308|/references
/barometre-life-sciences-2026-2027/opengraph|308|/barometre-life-sciences-2026-2027
/job-roles/plombier-chauffagiste-lyon|404|
/robots.txt|200|
/sitemap.xml|200|
"

printf '%s\n' "$CASES" | while IFS='|' read -r path expected fragment; do
  [ -z "$path" ] && continue
  code=$(status_of "$BASE$path")
  dest=$(redirect_of "$BASE$path")
  if [ "$code" != "$expected" ]; then
    echo "KO|$path|attendu $expected, obtenu $code" >> /tmp/sentinelle-cases.txt
  elif [ -n "$fragment" ] && ! printf '%s' "$dest" | grep -q -- "$fragment"; then
    echo "KO|$path|redirige vers $dest au lieu de $fragment" >> /tmp/sentinelle-cases.txt
  fi
done

if [ -s /tmp/sentinelle-cases.txt ]; then
  COUNT=$(wc -l < /tmp/sentinelle-cases.txt | tr -d ' ')
  anomaly "- **$COUNT cas de redirection cassee(s)** :"
  note ""
  note '```'
  cut -d'|' -f2,3 /tmp/sentinelle-cases.txt | tr '|' ' ' >> "$REPORT"
  note '```'
else
  note "- Tous les cas de redirection attendus sont conformes."
fi
note ""

# ---------------------------------------- 3. Confidentialite des fiches metiers
note "## 3. Confidentialite des fiches metiers"
note ""

# Les fiches /job-roles sont liees depuis des annonces pour des clients
# confidentiels : aucun nom d'entreprise privee ne doit y figurer. Les
# institutions publiques et les ecoles restent autorisees.
NAMES="Boehringer|Zoetis|MSD Animal|Ceva Sant|Elanco|Virbac|Vetoquinol|Vétoquinol|Mars Petcare|Purina|Royal Canin|AniCura|IVC Evidensia|VetPartners|Sevetys|Sévétys|Centravet|Alcyon|Coveto|Cooperl|Lactalis|Sodiaal|Cargill|Sofinnova|Ardian|McKinsey|Deloitte|IDEXX"

LEAKS=$(grep -n -E "$NAMES" data/jobRoles.ts | grep -v '{ name:' || true)

if [ -n "$LEAKS" ]; then
  COUNT=$(printf '%s\n' "$LEAKS" | wc -l | tr -d ' ')
  anomaly "- **$COUNT occurrence(s) de nom d'entreprise** dans \`data/jobRoles.ts\` (hors sources documentaires) :"
  note ""
  note '```'
  printf '%s\n' "$LEAKS" | cut -c1-180 >> "$REPORT"
  note '```'
else
  note "- Aucun nom d'entreprise dans les fiches metiers."
fi
note ""

# ------------------------------------------------------------------- Verdict
note "## Verdict"
note ""
if [ "$ANOMALIES" -eq 0 ]; then
  note "Tout est vert. $TOTAL URLs verifiees."
else
  note "**$ANOMALIES bloc(s) d'anomalies.** Details ci-dessus."
fi

cat "$REPORT"

if [ -n "${GITHUB_ENV:-}" ]; then
  echo "SENTINELLE_ANOMALIES=$ANOMALIES" >> "$GITHUB_ENV"
fi

[ "$ANOMALIES" -eq 0 ]
