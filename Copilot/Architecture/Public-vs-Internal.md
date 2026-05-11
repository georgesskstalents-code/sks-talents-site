# Architecture — Public (site) vs Internal (Copilot)

> Doc de référence pour distinguer ce qui appartient au **site public** (pour les visiteurs, indexé Google, lu par les personas) **vs** ce qui appartient à **Copilot/** (interne, pour piloter SKS sans exposer la machinerie).

## Pourquoi cette distinction

Un visiteur n'a pas besoin de connaître :
- Comment on produit la newsletter
- Notre segmentation marketing détaillée
- Notre workflow Notion
- Nos templates de séquences emails
- Nos cibles internes par persona

Il a besoin de :
- Comprendre ce que fait SKS et pour qui
- Trouver le bon parcours selon son profil (recruter, candidater, s'orienter)
- Réserver un appel ou s'inscrire à une ressource

Mélanger les deux **alourdit la lecture publique** et **expose de la stratégie qui n'a pas vocation à être publique**.

---

## PUBLIC (skstalents.fr) — pour les visiteurs

### Personas servis (depuis la grille `PersonaPortalsGrid` sur la home)
1. **Je structure mon équipe** — CEO, COO, DRH biotech/medtech/vétérinaire (cible 1, highlighted en mint)
2. **Je découvre l'IA** — Dirigeants qui veulent automatiser leurs process RH
3. **Je cherche un poste** — Cadres, experts, dirigeants en mobilité
4. **Je m'oriente** — Étudiants, jeunes diplômés

### Pages publiques par persona

| Persona | Pages publiques principales |
|---|---|
| Je recrute | `/services` · `/life-sciences` · `/animal-health` · `/references` |
| Je découvre IA | `/life-sciences/structuration-ia` · `/animal-health/structuration-ia` · `/diagnostic` |
| Je cherche poste | `/rejoignez-nous` · `/job-roles/[slug]` · `/salary-benchmarks` |
| Je m'oriente | `/orientation` · `/schools` · `/lexique-life-sciences-rh` |

### Outils interactifs publics (lead-gen)
- `/diagnostic` — 5 questions diagnostic recrutement
- `/scorecard-dirigeant` — scorecard dirigeant
- `/salary-benchmarks` — benchmarks salaires
- `/comparatifs` — comparatifs cabinets/processus
- `/calcul-salaire-brut-net` — convertisseur brut/net

### Contenus éditoriaux publics
- `/blog` (articles)
- `/studies` (études de marché)
- `/news` (actualités)
- `/newsletter/[slug]` (éditions individuelles — l'index `/newsletter` a été retiré)
- `/lexique-life-sciences-rh` (lexique RH)
- `/job-roles/[slug]` (235 fiches métiers)
- `/orientation`, `/schools` (parcours étudiants)

### Pages cabinet
- `/` (homepage)
- `/about`, `/mission`, `/team` (qui sommes-nous)
- `/references` (preuve sociale)
- `/contact`, `/rejoignez-nous` (interactions)
- `/press`, `/media-kit`, `/partenaires-media` (PR)

---

## INTERNAL (Copilot/) — pour piloter

### Structure Copilot/
- `Copilot/Process/` — comment produire / piloter
- `Copilot/Architecture/` — décisions d'IA, conventions
- `Copilot/Panorama/` — docs de référence vérifiées (personas, fonctions, marché, écosystème)

### Docs Process existants
- `Process/Newsletter-Production.md` — produire chaque édition (cadence, piliers, segments, welcome sequence, workflow Notion)
- `Dashboard-Gestion-Site.md` — gérer le site
- `Email-Hebdo-Configuration.md` — configurer le digest hebdo
- `Notion-Fiches-Metiers-Workflow.md` — workflow Notion pour les fiches métiers
- `Outils-Analytics-Externes.md` — outils analytics
- `Supabase-Setup.md` — setup Supabase
- `Typo-System.md` — système typographique

### Dashboard admin interne (route protégée mais accessible)
- `/dashboard/seo-keywords` — pilotage mots-clés
- `/dashboard/backlinks` — gestion backlinks
- `/dashboard/contenu` — pilotage contenu Notion
- `/dashboard/suivi` — leads + erreurs
- `/dashboard/typo` — démo typographie

---

## Règle de tri à appliquer pour toute nouvelle page

**Si le contenu répond à "comment SKS fait X en interne ?"** → Copilot/
**Si le contenu répond à "qu'est-ce que SKS peut faire pour moi (visiteur) ?"** → site public

### Exemples de tri

| Contenu | Public ou Internal ? | Pourquoi |
|---|---|---|
| Liste des éditions newsletter | Public (`/newsletter/[slug]`) | Le lecteur veut les lire |
| Cadence éditoriale newsletter | Internal (Process/) | Process interne de production |
| Promesse newsletter (« lecture courte ») | Public (sur la page subscribe) | Le lecteur veut savoir avant de s'inscrire |
| Workflow Notion publication | Internal | Notre CMS, pas son problème |
| Templates de séquence emails | Internal | Notre marketing automation |
| Fiches métiers | Public (`/job-roles/[slug]`) | Le candidat les lit |
| Salaires d'une fiche | Public | Info publique de transparence |
| FAQ honoraires/garantie | Public (`/services` FAQ) | Le client veut savoir avant de réserver |
| Modèle commercial agents IA détaillé | Internal | Stratégie produit |

---

## Décisions notables 2026-05-11

- `/newsletter` (page index) **supprimée** + redirect 301 → `/blog`
- Strategy newsletter (4 piliers, 3 segments, cadence, welcome sequence, workflow Notion) **déplacée** dans `Copilot/Process/Newsletter-Production.md`
- `/newsletter/[slug]` (éditions individuelles) **conservée** publique pour SEO + nurture
- Header dropdown "Apprendre" : "Newsletter" retiré de la liste publique
- Footer : "Newsletter" retiré de la colonne candidats
