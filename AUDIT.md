# AUDIT - Reparations SEO de confiance + page pilier /structuration-rh

**Date de l'audit** : lundi 14 septembre 2026
**Branche** : `fix/seo-confiance-et-structuration-rh` (creee depuis `main`, commit `8910712`)
**Perimetre** : lecture seule. Aucun fichier du site n'a ete modifie a ce stade.

## Note prealable sur la base de code

Le repo n'a pas de dossier `src/`. L'App Router est a la racine : `app/`, `components/`, `lib/`, `data/`.
Toutes les references de ce document utilisent cette arborescence.

**Point de vigilance branche.** La branche `content/reecriture-148-articles` a **24 commits non mergees**
dans `main` (reecriture de 81 articles + couvertures). J'ai verifie que **toutes les anomalies listees
ci-dessous sont identiques sur `main` et sur cette branche** : les 7 dates futures, les metas, le JSON-LD,
les pages legales et le sitemap sont strictement les memes. Les deux branches devront cependant recevoir
le correctif de dates, ou etre rebasees avant merge, sinon la correction sera ecrasee.

Comptages de reference : `main` = 148 articles / 271 job-roles / **474 URLs sitemap**.
Branche contenu = 149 articles / 272 job-roles / **475 URLs sitemap** (le chiffre du brief).

---

## 1a) Chiffres de preuve : toutes les occurrences

### Anciennete / annee de creation - 3 valeurs contradictoires

| Valeur affichee | Fichier | Ligne |
|---|---|---|
| `foundingDate: "2018"` | `lib/seo.ts` | 18 |
| "depuis 2018" (title meta) | `app/(routes)/about/page.tsx` | 4 |
| "8 ans d'expertise" (meta description) | `app/(routes)/about/page.tsx` | 6 |
| "8 ans" (og:description) | `app/(routes)/about/page.tsx` | 11 |
| **"Plus de 10 ans"** (H2 visible) | `app/(routes)/about/page.tsx` | 52 |
| "8 ans d'expertise" | `app/(routes)/life-sciences/structuration-ia/LifeSciencesLanding.tsx` | 63 |
| "8 ans d'expertise veterinaire" | `app/(routes)/animal-health/structuration-ia/AnimalHealthLanding.tsx` | 63 |
| "observations SKS 8 ans" | `app/(routes)/barometre-life-sciences-2026-2027/page.tsx` | 13 |
| "8 ans" (stat card) | `app/(routes)/barometre-life-sciences-2026-2027/page.tsx` | 190 |
| "terrain 8 ans" | `app/(routes)/barometre-life-sciences-2026-2027/page.tsx` | 253 |
| "depuis 2018" | `app/(routes)/barometre-life-sciences-2026-2027/page.tsx` | 349 |
| "8 ans d'executive search" | `app/(routes)/barometre-life-sciences-2026-2027/page.tsx` | 417 |
| "cumules sur 8 ans" | `app/(routes)/cout-mauvais-recrutement/page.tsx` | 85 |
| "(8 ans)" | `components/CoutRecrutementCalculator.tsx` | 369 |
| "depuis 2018" | `components/landings/DirectionCPage.tsx` | 332 |

**Contradiction.** 2018 + "8 ans" est coherent (2018 a 2026). "Plus de 10 ans" sur le H2 de `/about`
contredit les deux autres, sur la page meme ou la meta dit "8 ans". C'est la page la plus lue par un
dirigeant qui verifie la credibilite du cabinet.

### Trustpilot - 4 combinaisons note/nombre d'avis differentes

| Note / avis | Fichier | Ligne |
|---|---|---|
| **4,6 / 17 avis** (JSON-LD `aggregateRating`, sur toutes les pages) | `lib/seo.ts` | 77-83 |
| 4,6 / 17 avis | `app/(routes)/about/page.tsx` | 108 |
| 4,6 / 17 avis | `app/(routes)/references/page.tsx` | 116 |
| 4,6 / 17 avis (fallback widget) | `components/TrustpilotWidget.tsx` | 27, 30, 34, 47-49 |
| 4,6/5 (trust signals) | `app/(routes)/life-sciences/structuration-ia/LifeSciencesLanding.tsx` | 22, 63 |
| 4,6/5 (trust signals) | `app/(routes)/animal-health/structuration-ia/AnimalHealthLanding.tsx` | 22, 63 |
| **4,5 / 13 avis** | `app/(routes)/team/page.tsx` | 55 |
| 4,5 / 13 avis | `app/(routes)/rejoignez-nous/page.tsx` | 114 |
| 4,5 / 13 avis | `app/(routes)/services/website/page.tsx` | 113 |
| **4,5 / 15 avis** | `app/(routes)/barometre-life-sciences-2026-2027/page.tsx` | 210-212 |
| 4,5/5 (sans nombre) | `app/(routes)/about/page.tsx` | 6, 11 |
| 4,5/5 (sans nombre) | `app/(routes)/mission/page.tsx` | 73 |
| 4,5/5 (sans nombre) | `components/Hero.tsx` | 71 |
| 4,5/5 (sans nombre) | `components/MobileTrustpilotPrompt.tsx` | 118 |

**Contradiction majeure.** Le JSON-LD envoie 4,6/17 a Google pendant que le hero de la home affiche 4,5.
Un rich snippet qui ne correspond pas au contenu visible est un motif documente de perte d'etoiles.
Le barometre annonce meme un 3e nombre d'avis (15), date "Trustpilot 2026-07-27".

### Delai de premiere shortlist - coherent (10 jours)

`app/page.tsx:73` · `app/(routes)/mission/page.tsx:72` · `app/(routes)/team/page.tsx:53` ·
`app/(routes)/rejoignez-nous/page.tsx:29-31, 112` · `app/(routes)/services/website/page.tsx:111` ·
`app/(routes)/services/website/components/content.tsx:267` · `components/Hero.tsx:6` ·
`components/GuaranteeBadge.tsx:17, 38, 42` (seul endroit qui precise "jours **ouvres**") ·
`app/api/site-translate/route.ts:32, 53`.

Seule nuance a trancher : "10 jours" vs "10 jours ouvres" (2 semaines calendaires). L'ecart est reel
pour un dirigeant qui compte.

### Delai intake a signature - 2 valeurs contradictoires

| Valeur | Fichier | Ligne |
|---|---|---|
| "15 jours a 1 mois selon le projet" | `components/SectorLandingPage.tsx` | 847 |
| "15j -> 1M" | `components/SeoGrowthLandingPage.tsx` | 13 |
| "15j -> 1M" / "15 jours a 1 mois" | `components/landings/directionCContent.ts` | 81, 125, 169-170, 199, 243, 287 |
| **"3 a 4 semaines" pour couvrir un poste** | `app/(routes)/team/page.tsx` | 54 |
| "3 a 4 semaines" | `app/(routes)/rejoignez-nous/page.tsx` | 113 |

Les deux fourchettes se recoupent partiellement mais ne disent pas la meme chose. A unifier.

### Duree de garantie - AUCUNE VALEUR CHIFFREE

`components/GuaranteeBadge.tsx` s'intitule "Garantie SKS Talents" mais ne porte qu'un engagement de moyen
sur la shortlist (10 jours ouvres). `app/(routes)/services/website/components/content.tsx:52` liste
"Garantie de remplacement" **sans duree**, et ligne 61 "Suivi 3 mois".
Aucune duree de garantie de remplacement n'est publiee nulle part. **Valeur a fournir.**

### Placements - coherent (100+), mais un ecart avec le chiffre interne

"100+ placements" : `app/(routes)/references/page.tsx:4, 9` · `app/(routes)/team/page.tsx:52` ·
`components/Hero.tsx:72` · les 2 landings structuration-ia (l.22, 63) · `app/(routes)/about/page.tsx:6, 11` ·
`app/(routes)/barometre-life-sciences-2026-2027/page.tsx:349, 489` · `app/(routes)/cout-mauvais-recrutement/page.tsx:85` ·
`components/CoutRecrutementCalculator.tsx:368` · `components/diagnostic/EmailGateDeliverables.tsx:77`.

Coherent partout. **A confirmer** : le chiffre interne que tu m'avais donne est 142 placements cumules.
"100+" est donc vrai mais te sous-vend de 40%.

### Retention - coherent sur 75%, mais deux formulations differentes

| Formulation | Fichier | Ligne |
|---|---|---|
| "75% de retention a 5 ans" | `app/page.tsx` | 44 |
| "75 % de retention a 5 ans" | `app/(routes)/references/page.tsx` | 6, 11 |
| "75 % de retention a 5 ans des candidats places" | `app/(routes)/barometre-life-sciences-2026-2027/page.tsx` | 205-206 |
| "restent 5 ans ou plus" | `components/landings/directionCContent.ts` | 136, 254 |
| **"75 % des recrutements 2019 sont toujours en poste 6 ans plus tard"** | `app/(routes)/about/page.tsx` | 43 |

La derniere formulation ("2019", "6 ans") est une base de calcul differente des autres ("5 ans").
Soit c'est la source du 75%, soit c'est une 2e mesure. A trancher.

### Missions satisfaites - 92%, source inconnue

`components/landings/directionCContent.ts:159, 161` (Life Sciences) et `277, 279` (Animal Health) :
"92% missions satisfaites". Ce chiffre n'apparait nulle part ailleurs et n'a aucune source citee.
**A justifier ou a retirer** (regle "jamais de chiffre non verifie").

---

## 1b) Dates d'articles posterieures au 13 septembre 2026

**Source de la date** : champ `date` dans `data/articles.ts` (pas de frontmatter, pas de CMS pour ces
articles). Consommee par :
- affichage : `components/landings/BlogMagazine.tsx:11` (`formatDate`), lignes 53, 109, 116, 182 ·
  `components/LatestInsights.tsx:88` · `app/(routes)/blog/[slug]/page.tsx:332`
- JSON-LD : `app/(routes)/blog/[slug]/page.tsx:167` (`publishedAt`) puis 232-233 (`datePublished` **et**
  `dateModified`, identiques)

**7 articles dates dans le futur :**

| Date | Slug | Ligne dans `data/articles.ts` |
|---|---|---|
| 2026-12-25 | `ce-que-2026-nous-a-appris-recrutement-dirigeants-life-sciences` | 4411 |
| 2026-12-04 | `7-decisions-marque-dirigeants-2026-sks-talents` | 4373 |
| 2026-11-27 | `apres-acquisition-100-premiers-jours-retention-talents` | 4392 |
| 2026-11-06 | `consolidation-veterinaire-acquisitions-detruisent-valeur-1ere-annee` | 4430 |
| 2026-10-30 | `drh-ne-peut-plus-deployer-ia-sans-gouvernance` | 4449 |
| 2026-10-02 | `ia-act-dirigeants-life-sciences-premiers-controles` | 4468 |
| 2026-09-25 | `innovation-nutrition-animale-competences-industriels-2026` | 4487 |

**"VOL. XII . DEC 2026"** : `components/landings/BlogMagazine.tsx:108-109`. Le "VOL. XII . N°01" est
**codé en dur** (ce n'est pas une date). Le "DEC 2026" a cote vient de `formatDate(featured.date)`,
l'article mis en avant etant le plus recent, donc celui du 2026-12-25. **Corriger les 7 dates corrige
mecaniquement l'affichage** ; aucune modification de `BlogMagazine.tsx` n'est necessaire pour ce point.

**Consequence SEO** : Google ignore ou deprecie un `datePublished` futur, et un lecteur qui voit
"25 decembre 2026" un 14 septembre comprend que le contenu est fabrique.

**Autre defaut du meme bloc** : aucune balise `<time datetime="...">` dans l'affichage. Les dates sont
rendues en texte brut via `toLocaleDateString`. A ajouter en 2.3.

**Note** : `app/(routes)/newsletter/[slug]/page.tsx:72-73` utilise `new Date()` en fallback, ce qui
produit une `datePublished` glissante a chaque build. Meme famille de probleme, hors perimetre du brief.

---

## 1c) Sitemap : pourquoi un `lastmod` uniforme

**Cause identifiee** : `app/sitemap.ts:122` -> `lastModified: new Date()`.
La date est evaluee **au build**. Les 474 (475) URLs recoivent donc l'horodatage du dernier deploiement
Vercel, d'ou le 2026-09-07 uniforme. Meme cause pour `changeFrequency: "weekly"` (l.120), litteral
applique a toutes les URLs sans distinction.

**Composition des 474 URLs** (mesure sur `main`) :

| Type | Nombre | Source d'un `lastmod` reel |
|---|---|---|
| Routes statiques | 38 | date du dernier commit du fichier `page.tsx` (`git log -1 --format=%cI`) |
| Sous-routes sectorielles | 17 | date du dernier commit de `data/sectors.ts` |
| Articles de blog | 114 / 148 | **champ `date` existant** (immediat) |
| Job-roles | 271 / 271 | `publishDate` present sur les `strategicExtras` ; **absent des roles generes en matrice** |
| References | 16 | aucune date dans `data/references.ts` |
| Fonds d'investissement | 6 | aucune date |
| Comparatifs | 2 | aucune date |
| Market hubs | 10 | aucune date |

**Recommandation realiste** : `date` pour les articles, `publishDate` quand il existe pour les job-roles,
et date de dernier commit du fichier de donnees pour le reste (calculable au build via `git log`, ou
fige dans un fichier genere par un script). Ne pas inventer de dates par URL.

**Filtres deja en place** (a ne pas casser) : `hasSubstantialArticle` (l.36-38) exclut 34 articles ;
`hasSubstantialJobRole` (l.40-47) n'exclut aujourd'hui aucun job-role.

---

## 1d) JSON-LD par type de page

Injections globales dans `app/layout.tsx:142-148` : `organizationSchema` + `websiteSchema` depuis
`lib/seo.ts`. Presentes sur **toutes** les pages du site.

| Page | Scripts `ld+json` | `@type` de premier niveau | Anomalie |
|---|---|---|---|
| `/` (`app/page.tsx`) | 2 | Organization (+ VideoObject) | Organization redefini alors que le layout l'injecte deja |
| `/life-sciences` | 4 + FAQSection | CollectionPage, ItemList, BreadcrumbList, **FAQPage** + **FAQPage** | **2 FAQPage** : un inline, un emis par `components/FAQSection.tsx:23` (rendu l.141) |
| `/animal-health` | 4 + FAQSection | idem | **2 FAQPage**, meme cause |
| `/calcul-salaire-brut-net` | + FAQSection | FAQPage inline + FAQPage composant | **2 FAQPage** |
| `/services` | 2 | Service, BreadcrumbList, Organization | 1 seul FAQPage (via FAQSection) : OK |
| `/team` | **0** | aucun | Aucun JSON-LD sur la page fondateur |
| `/about` | **0** | aucun (FAQSection seulement) | Aucun JSON-LD |
| `/blog/[slug]` | 3 | Article, BreadcrumbList, HowTo | `datePublished` = `dateModified` (l.232-233) |
| `/job-roles/[slug]` | 1 | Occupation | pas de BreadcrumbList |
| `/life-sciences/structuration-ia` | 4 | Service, BreadcrumbList, VideoObject, FAQPage | conforme |
| `/animal-health/structuration-ia` | 4 | Service, BreadcrumbList, VideoObject, FAQPage | conforme |

**Corrections a apporter au brief, apres verification du code :**

1. **Pas de `Organization` ni de `WebSite` dupliques sur `/animal-health/structuration-ia`.** Les deux
   occurrences de `"@type": "Organization"` (l.41 et 79) sont des **references imbriquees** : l.41 est le
   `provider` du `Service`, correctement rattache par `"@id": "https://www.skstalents.fr/#organization"` ;
   l.79 est le `publisher` du `VideoObject`. `"WebSite"` n'apparait qu'une seule fois dans tout le repo
   (`lib/seo.ts:99`). **Ces deux pages sont les mieux structurees du site** et n'ont besoin d'aucune
   correction JSON-LD, ce qui est coherent avec la regle 4 du brief.
2. **Le vrai doublon `Organization`** est ailleurs : `app/page.tsx:132`, `/life-sciences:72`,
   `/animal-health:71`, `/services:36` redefinissent un noeud Organization alors que le layout l'injecte
   deja. A remplacer par une reference `{"@id": ".../#organization"}`.
3. **`Person` autonome** : confirme absent. Georges Kengue n'existe qu'en `founder` imbrique dans
   `lib/seo.ts:60-65`. Pas de noeud `Person` avec son propre `@id`.
4. **`Service` distincts** : un seul `Service` generique sur `/services` (l.36) + un par page
   structuration-ia. Pas de `Service` separe pour executive search, RPO et structuration RH.
5. **URL LinkedIn personnelle deja dans le code** : `https://www.linkedin.com/in/georges-kengue-81988b36/`
   (`lib/seo.ts:57, 64`). La question 5 du brief est donc **deja repondue** sauf si tu veux une autre URL.
6. **`telephone`** : absent de `lib/seo.ts`. Aucun numero public sur le site.

---

## 1e) Page `/legal/mentions-legales`

`app/(routes)/legal/mentions-legales/page.tsx` : **13 lignes au total**. Un `PageHero` et rien d'autre.
Texte affiche : *"Version de travail a completer avec les informations editeur, hebergeur et propriete
intellectuelle."*

**Le probleme est plus large que le brief.** 5 des 6 pages legales sont des coquilles vides de 13 lignes :

| Page | Lignes | Contenu |
|---|---|---|
| `/legal/mentions-legales` | 13 | hero seul, "Version de travail a completer" |
| `/legal/politique-confidentialite` | 13 | hero seul, "Base structuree pour detailler..." |
| `/legal/cgu` | 13 | hero seul |
| `/legal/cgv` | 13 | hero seul |
| `/legal/charte-recrutement` | 13 | hero seul |
| `/legal/politique-cookies` | 79 | seule page reellement redigee |

Les 6 sont dans le sitemap (`app/sitemap.ts:69-74`) et donc indexees. Metadonnees : aucune de ces pages
n'a de `title` propre, elles heritent du titre generique.

**Gravite.** Des mentions legales absentes sont une non-conformite LCEN, pas seulement un signal de
confiance. Une politique de confidentialite vide alors que le site collecte des leads
(`/api/diagnostic-structuration-lead`, formulaires) est une non-conformite RGPD. Le brief ne couvrait
que les mentions legales : je recommande de traiter les 5 dans la meme PR.

---

## 1f) Texte oublie "trustpilot-widget-id"

**Localise** : ce n'est pas dans `/about` mais dans `components/TrustpilotWidget.tsx:39-42`.

```
Le widget peut être connecté avec l'identifiant {widgetId}, mais la page publique
suffit déjà à rassurer avant conversion...
```

`widgetId` vient de `process.env.TRUSTPILOT_WIDGET_ID ?? "widget-id"` (l.4). Les variables
`NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID` et `NEXT_PUBLIC_TRUSTPILOT_TEMPLATE_ID` n'etant pas definies,
c'est le **fallback qui s'affiche en production**, avec le mot litteral "widget-id".

**Pages impactees** : `/about` (l.111) et `/references` (l.119), soit les deux pages ou un dirigeant va
verifier la credibilite du cabinet. Le texte s'adresse a l'operateur du site, pas au lecteur.

---

## 1g) Titles > 60 caracteres et metas > 160 caracteres

Le layout applique le template `"%s | SKS TALENTS"` (`app/layout.tsx:73`), qui **ajoute 15 caracteres**
a chaque title de page. Les longueurs ci-dessous sont les longueurs finales rendues.

| Page | Title | Meta | Verdict |
|---|---|---|---|
| `/about` | **98 c.** | **228 c.** | les deux hors normes |
| `/life-sciences` | **97 c.** | 141 c. | title |
| `/life-sciences/structuration-ia` | **96 c.** | **188 c.** | regle 4 : meta seule |
| `/barometre-life-sciences-2026-2027` | **95 c.** | 245 c. | les deux |
| `/references` | **92 c.** | 158 c. | title |
| `/animal-health/structuration-ia` | **90 c.** | **212 c.** | regle 4 : meta seule |
| `/animal-health` | **84 c.** | 150 c. | title |
| `/services` | **75 c.** | **194 c.** | les deux |
| `/` (home) | 63 c. | 146 c. | title limite |

**Pages sans `metadata` propre** (title generique
`"SKS TALENTS | Executive Search Life Sciences & Santé animale"`, 60 c.) :
`/team`, `/blog`, `/job-roles`, `/mission`, `/market-hubs`, `/resources`, `/press`, `/schools`, `/news`,
`/events`, `/search`, `/france`, `/senegal`, `/benin`, `/cote-divoire`, et les 6 pages `/legal/*`.

`/team` est la page fondateur et `/blog` la porte d'entree de 114 articles indexes : ce sont les deux
plus couteuses de la liste.

---

## 1h) `/calcul-salaire-brut-net` : liens internes

**Confirme : zero lien interne sortant.** Les deux seuls `href` de la page sont des ancres internes
(`app/(routes)/calcul-salaire-brut-net/page.tsx:94` -> `#simulateur-brut-net`, l.100 ->
`#comparateur-packages`). Aucun lien vers `/salary-benchmarks`, `/life-sciences` ou `/animal-health`.

La page est un cul-de-sac : elle capte du trafic informationnel large et ne le redirige vers rien.

---

## 1i) Job-roles generes en matrice secteur x poste

`data/jobRoles.ts` genere les roles par produit cartesien : `sectorConfigs` (6 secteurs, l.33 :
Biotech, Diagnostic, Cosmetique, Medical Vet, Veterinary, Petfood) x `roleTemplates` (18 modeles,
l.627), via `coreRoles = sectorConfigs.flatMap(...)` (l.1059-1061). Les `strategicExtras` (l.1063+)
sont, eux, rediges un par un.

**18 intitules apparaissent dans 4 secteurs ou plus, soit 107 URLs :**

| Occurrences | Intitule |
|---|---|
| 6 | AI Product Manager |
| 6 | CEO |
| 6 | CFO |
| 6 | COO |
| 6 | Customer Service Manager |
| 6 | Cybersecurity Specialist |
| 6 | Directeur Business Unit |
| 6 | Directeur des ventes |
| 6 | Directeur EMEA |
| 6 | DRH |
| 6 | Export Manager Afrique |
| 6 | Export Manager EMEA |
| 6 | Ingenieur d'application |
| 6 | Ingenieur de maintenance |
| 6 | Ingenieur Middleware |
| 6 | Production Manager |
| 6 | Supply Chain Manager |
| 5 | Regulatory Affairs Manager |

**Niveau de differenciation reel.** Exemple `cybersecurity-specialist` (l.380-399) : `skills`,
`successFactors`, `path`, `studies`, `salary` et `category` sont **strictement identiques** sur les 6
secteurs. Seules varient 2 phrases ou le nom du secteur est interpole en minuscules :

```
summary:  "...dans des organisations ${sector.toLowerCase()} ou la conformite..."
missions: "Contribuer a la resilience cyber des environnements ${sector.toLowerCase()} regules..."
```

Ces 107 URLs representent **23% du sitemap** et passent toutes le filtre `hasSubstantialJobRole`.
Aucune modification faite. **Decision a prendre** : noindex, canonical vers une page mere, ou
differenciation editoriale reelle.

Pour contexte : les job-roles pesent 271 des 474 URLs du sitemap, soit **57%**.

---

## Ecarts entre le brief et le code (a valider)

| Point du brief | Ce que dit le code |
|---|---|
| "2 FAQPage sur /life-sciences et /animal-health" | **Confirme**, et un 3e cas : `/calcul-salaire-brut-net` |
| "Organization et WebSite dupliques sur /animal-health/structuration-ia" | **Infirme.** Ce sont des references `@id` correctes. Le vrai doublon Organization est sur `/`, `/life-sciences`, `/animal-health`, `/services` |
| "aucun Person autonome" | **Confirme** |
| "aucun Service distinct" | **Confirme** |
| "URL LinkedIn personnel a fournir" | **Deja dans le code** : `linkedin.com/in/georges-kengue-81988b36` |
| "les 11 articles automatisation RH" | **6 articles** correspondent au filtre (automatisation / structuration / digitalisation / gouvernance IA). Liste ci-dessous |
| "475 URLs sitemap" | **474 sur `main`**, 475 sur la branche contenu |
| "sitemap lastmod 2026-09-07" | **Confirme** : `new Date()` au build |

Articles rattachables a la page pilier `/structuration-rh` :
`comment-gagner-du-temps-ceo-automatisation-rh` (2026-04-23) ·
`quelles-taches-rh-automatiser-priorite` (2026-04-21) ·
`pourquoi-automatisation-rh-levier-productivite` (2026-04-15) ·
`ia-act-rh-recrutement` (2026-06-05) ·
`drh-ne-peut-plus-deployer-ia-sans-gouvernance` (2026-10-30, **date a corriger**) ·
`csv-validation-data-integrity-biotech` (2026-04-20, rattachement plus faible).

---

## Trouvailles hors brief, a arbitrer

1. **5 pages legales vides** (voir 1e). Non-conformite LCEN et RGPD, pas seulement un enjeu SEO.
2. **"92% missions satisfaites"** sans source (`components/landings/directionCContent.ts:159, 277`).
3. **`components/TrustpilotWidget.tsx`** affiche en production un texte destine a l'operateur.
4. **`app/(routes)/newsletter/[slug]/page.tsx:72-73`** : `datePublished` calculee avec `new Date()`,
   donc glissante a chaque build.
5. **`/team` et `/about` n'ont aucun JSON-LD**, alors que ce sont les pages de credibilite.
6. **"100+ placements"** sous-vend le chiffre interne (142).

## Etat des tirets cadratins

Recherche des tirets cadratins et demi-cadratins sur `app/ components/ lib/ data/` : 8 fichiers, **tous hors contenu public**
(prompts IA, tests, dashboard interne). Aucun tiret cadratin dans les textes affiches aux visiteurs.

---

## Questions bloquantes avant l'etape 2

1. **Anciennete** : on garde "8 ans" + `foundingDate 2018` partout et on corrige le "Plus de 10 ans"
   de `/about` ? Ou 2018 est-il faux ?
2. **Trustpilot** : quelle est la note et le nombre d'avis exacts aujourd'hui ? (le code contient
   4,6/17, 4,5/13 et 4,5/15)
3. **Shortlist** : "10 jours" ou "10 jours ouvres" ? Et intake a signature : "15 jours a 1 mois" ou
   "3 a 4 semaines" ?
4. **Garantie de remplacement** : quelle duree ? (aucune valeur publiee aujourd'hui)
5. **Placements** : on passe a "142 placements" ou on reste sur "100+" ?
6. **Retention** : "75% a 5 ans" est-il la meme mesure que "75% des recrutements 2019 toujours en poste
   6 ans plus tard" ?
7. **"92% missions satisfaites"** : sur quelle base ? Sinon je le retire.
8. **Mentions legales** : denomination sociale, forme juridique, capital, SIREN/SIRET, RCS + ville,
   directeur de publication, hebergeur (Vercel Inc. ?). L'adresse 128 rue la Boetie 75008 Paris est-elle
   bien le siege social ?
9. **Pages legales vides** : je traite les 5 dans cette PR, ou seulement les mentions legales ?
10. **Telephone public** : oui/non ? (aucun ajout si non)
11. **LinkedIn** : on garde `linkedin.com/in/georges-kengue-81988b36` ?
