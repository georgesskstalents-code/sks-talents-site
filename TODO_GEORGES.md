# TODO_GEORGES — textes à rédiger avant merge de la PR `feat/refonte-home-personas-2026-05`

> Ce fichier liste tous les placeholders `TODO_GEORGES_*` insérés dans la refonte. Chaque entrée précise le fichier, la ligne, le contexte, la longueur attendue et le ton recommandé. Une fois remplis, supprime ce fichier dans un commit final.

---

## Homepage

### `TODO_GEORGES_HOME_AI_H2`
- **Fichier** : `app/page.tsx` (section "Notre approche IA", ~ligne 87)
- **Contexte** : phrase d'accroche (h2) de la section programmes IA de la home, fond mint
- **Longueur** : 1 phrase courte, 60-80 caractères max
- **Ton** : sobre, factuel, type "deux verticales, deux programmes"
- **Exemples** : « Deux verticales, deux programmes IA pour structurer vos RH. » ou « Vos agents IA, déployés sur votre verticale. »

---

## /services

### `TODO_GEORGES_SERVICES_META`
- **Fichier** : `app/(routes)/services/page.tsx` (constante `DESCRIPTION`, ~ligne 22)
- **Contexte** : meta description de la page /services (Open Graph + SEO)
- **Longueur** : 150-155 caractères max
- **Ton** : factuel, mots-clés "executive search Life Sciences Animal Health, programme IA RH, structuration RH, France"

### `TODO_GEORGES_SERVICES_AI_H2`
- **Fichier** : `app/(routes)/services/page.tsx` (~ligne 130)
- **Contexte** : h2 d'accroche pour la section programmes IA mint dans /services
- **Longueur** : 1 phrase, 60-80 caractères max
- **Ton** : factuel

### FAQ — 5 questions à répondre dans `app/(routes)/services/page.tsx`

Chaque réponse alimente le JSON-LD FAQPage, donc évite les phrases stock IA. 2-3 phrases par réponse, ton direct.

- **`TODO_GEORGES_FAQ_HONORAIRES`** — "Quels honoraires pour une mission executive search ?" → fourchette d'honoraires (% du salaire annuel ou forfait), modalités (acompte/succès), positionnement vs cabinets concurrents.
- **`TODO_GEORGES_FAQ_DUREE`** — "Combien de temps dure une mission de bout en bout ?" → délai moyen intake → signature (60 jours selon les chiffres clés affichés ailleurs sur le site), exemples par typologie de poste.
- **`TODO_GEORGES_FAQ_STADES`** — "Travaillez-vous avec des Series A ou seulement scale-up ?" → phases d'entreprise prises en charge, critères de sélection des missions, ticket minimum.
- **`TODO_GEORGES_FAQ_GARANTIE`** — "Comment fonctionne la garantie de remplacement ?" → durée garantie (12 mois ?), conditions de déclenchement, modalités de remplacement gratuit.
- **`TODO_GEORGES_FAQ_AGENTS`** — "Vos agents IA sont-ils inclus dans les honoraires ?" → modèle commercial des agents IA (inclus, en option, abonnement séparé), différence vs prestation executive search.

---

## /life-sciences

### `TODO_GEORGES_LS_PROG_IA_H2`
- **Fichier** : `app/(routes)/life-sciences/page.tsx` (~ligne 178)
- **Contexte** : h2 d'accroche section "Programme IA Life Sciences" mint
- **Longueur** : 60-80 caractères max
- **Ton** : sobre, persona-centré

### `TODO_GEORGES_LS_PROG_IA_DESC`
- **Fichier** : `app/(routes)/life-sciences/page.tsx` (~ligne 182)
- **Contexte** : 2-3 phrases résumant le programme IA Life Sciences
- **Doit mentionner** : persona Marie Laurent (CEO biotech Series B oncologie), bénéfices clés (anticipation 6 mois, board pack 5 min)

### `TODO_GEORGES_LS_POSTE_1` à `TODO_GEORGES_LS_POSTE_4`
- **Fichier** : `app/(routes)/life-sciences/page.tsx` (~ligne 121)
- **Contexte** : 4 fiches métiers Life Sciences (titres uniquement)
- **Action** : remplacer par les vrais titres de postes (ex: "VP Reg & Affaires médicales", "Head of CMC", "Director Industrialisation", "Lab Manager Biotech") + mettre à jour les `href` vers les slugs réels de `/job-roles/[slug]`

---

## /animal-health

### `TODO_GEORGES_AH_PROG_IA_H2`
- **Fichier** : `app/(routes)/animal-health/page.tsx` (~ligne 178)
- **Contexte** : h2 d'accroche section "Programme IA Animal Health" mint
- **Longueur** : 60-80 caractères max

### `TODO_GEORGES_AH_PROG_IA_DESC`
- **Fichier** : `app/(routes)/animal-health/page.tsx` (~ligne 182)
- **Contexte** : 2-3 phrases résumant le programme IA Animal Health
- **Doit mentionner** : persona Sébastien Dupont (cofondateur DG groupement vétérinaire 32 cliniques), bénéfices clés (3 jours → 4 minutes de reporting)

### `TODO_GEORGES_AH_POSTE_1` à `TODO_GEORGES_AH_POSTE_4`
- **Fichier** : `app/(routes)/animal-health/page.tsx` (~ligne 121)
- **Contexte** : 4 fiches métiers Animal Health (titres + hrefs)
- **Action** : remplacer par les vrais titres (ex: "Directeur Commercial Petfood", "Vétérinaire Référent Multi-Sites", "Responsable M&A Vétérinaire", "Head of Nutrition Animale") + mettre à jour les `href`

---

## Vérifications après remplissage

1. `grep -rn "TODO_GEORGES" app/ components/ data/` → doit retourner 0
2. `npm run lint && npm run typecheck && npm run build` → doit tout passer
3. Vérifier visuellement `/`, `/services`, `/life-sciences`, `/animal-health` sur dev (`npm run dev`)
4. Supprimer `TODO_GEORGES.md` dans le commit final qui boucle la PR
