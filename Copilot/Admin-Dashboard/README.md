# SKS Talents · Admin / Home Agence

> Dashboard interne CEO pour piloter le site + LinkedIn + missions + leads depuis une seule interface.

**Status au 2026-05-13 : design valide, pas encore code.**

Le design vient d'une session de prototypage Claude le 13 mai 2026, fusionnant 2 concepts :
- **SKS Talents · Admin** (admin panel technique du site)
- **Home Agence** (cockpit operations marketing-communication CEO)

## Pourquoi

Aujourd'hui le pilotage est eclate :
- Rapport hebdo par email (vue retrospective, pas actionable en live)
- 3 cockpits Notion (Agence Board, Site, SALES) avec des donnees parfois redondantes
- Pas de "single source of truth" CEO

L'idee : **une URL `skstalents.fr/admin` (protegee par DASHBOARD_PRIVATE_TOKEN) qui agrege tout en temps reel.**

## 3 options d'implementation

| Option | Effort | Resultat | Cout |
|--------|--------|----------|------|
| **1. Reproduire dans Notion** | 30 min | Fonctionnel, simple, peu joli | 0 € |
| **2. Looker Studio** | 2 h | Visuel pro, lecture seule | 0 € |
| **3. Code skstalents.fr/admin** | 3-4 j Claude Code | Tout l'effet design + actions inline | 0 € + temps |

**Decision en attente CEO 2026-05-13.**

## Structure des fichiers dans ce dossier

- `README.md` (ce fichier) - overview + decision
- `design-spec.md` - layout detaille section par section
- `data-sources.md` - vrais chiffres reels + APIs sources pour chaque KPI

## Contexte business au moment du design (2026-05-13)

### Chiffres reels SKS Talents
- 18 missions actives (7 Animal Health + 11 Life Sciences)
- 75% retention 5 ans (placements)
- 1407 abonnes newsletter
- 9283 abonnes LinkedIn perso Georges
- 595 abonnes Page entreprise SKS Talents
- Adresse : 128 rue la Boetie, 75008 Paris

### 4 piliers editoriaux
- LE FIL · LA DONNEE · LE CONSEIL · LE SIGNAL

### 3 cockpits Notion existants
- Agence Board (LinkedIn + marketing)
- Site (contenu site)
- SALES (CRM commercial)

### Stack technique
- Notion (CMS + DB editoriale)
- Vercel + Supabase (site + persistance)
- Cowork (futur, pour agents IA)
- Hetzner + n8n (futur Run 2, agents long-running)

### 6 departements + avancement
- Communication 90%
- Marketing 95%
- Commercial 50%
- Produit IA 0%
- Analytics 60%
- Ops 30%

### Offre 3 tiers
- Executive Search (core, 25-33% honoraires)
- Diagnostic gated (5k€ one-shot)
- Agents IA SaaS (1.5k€/mois retainer)

### Objectifs 2030
- Top 1 Google sur 5 requetes phares
- Top 1 LLM citations sur 5 prompts
- Reference francaise Life Sciences + Animal Health
