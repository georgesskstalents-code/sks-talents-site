To: infos@skstalents.com
Subject: SKS Weekly Intelligence - 24 Apr 2026 to 1 May 2026

Bonjour,

Voici le point hebdomadaire SKS TALENTS sur la periode du 2026-04-24 au 2026-05-01, avec comparaison contre les 7 jours precedents. Ce rapport utilise uniquement les signaux reels disponibles dans les logs locaux du site.

Resume executif

- Le volume de trafic recule en semaine glissante: 155 pageviews sur 7 jours, contre 186 sur la periode precedente, soit -16.7%.
- La demande commerciale est plus nette qu'auparavant: 2 leads sur 7 jours, contre 1 sur la periode precedente.
- Le site concentre l'attention sur deux pages d'offre: `/life-sciences` et `/animal-health`.
- `/life-sciences` est la page la plus solide cette semaine: 37 vues et 2 demandes de rappel, soit un taux observe de 5.4% sur le signal local.
- `/animal-health` capte 26 vues et une profondeur de scroll forte, mais aucun lead attribue.
- Les recherches internes confirment trois intentions fortes: remuneration, orientation, et lexique RH Life Sciences.
- Les signaux chat et feedback restent trop faibles pour tirer des themes clients fiables cette semaine.

Top pages

- `/life-sciences`: 37 vues sur 7 jours, +27 vs semaine precedente.
- `/`: 31 vues sur 7 jours, -39 vs semaine precedente.
- `/animal-health`: 26 vues sur 7 jours, +18 vs semaine precedente.
- `/search`: 10 vues sur 7 jours, -8 vs semaine precedente.
- `/resources`: 8 vues sur 7 jours, -6 vs semaine precedente.
- `/about`: 5 vues sur 7 jours, nouvelle traction.
- `/orientation`: 4 vues sur 7 jours, -5 vs semaine precedente.
- `/mission`: 4 vues sur 7 jours, nouvelle traction.
- `/references`: 4 vues sur 7 jours, stable a legerement en hausse.

Pages faibles ou a surveiller

- `/`: le volume reste eleve mais baisse fortement semaine sur semaine, sans signal de lead attribue.
- `/search`: usage encore important, mais aucun lead attribue. C'est un signal de friction ou de navigation insuffisamment guidee.
- `/resources`: hub consulte, mais pas de conversion observee.
- `/animal-health`: bon engagement scroll, mais aucun signal de conversion.
- `/orientation`: trafic en baisse et aucun lead sur 7 jours, alors que la page a converti sur 30 jours.
- Plusieurs contenus editoriaux qui etaient vus la semaine precedente n'ont plus de traction cette semaine, notamment `/blog/deeptech-startup-talent-war`.

Tendances trafic et engagement

- Pageviews 7 jours: 155
- Pageviews 7 jours precedents: 186
- Delta: -31
- Recherches internes 7 jours: 9
- Recherches internes 7 jours precedents: 10
- Leads 7 jours: 2
- Leads 7 jours precedents: 1

Les hausses utiles se concentrent sur les pages d'offre:

- `/life-sciences`: +27 vues semaine sur semaine
- `/animal-health`: +18 vues semaine sur semaine

Les baisses concernent surtout le haut de funnel et la consultation exploratoire:

- `/`: -39 vues
- `/search`: -8 vues
- `/resources`: -6 vues
- `/orientation`: -5 vues

Signal d'engagement intermediaire

Les evenements les plus frequents ne sont pas des clics de prise de rendez-vous, mais des scroll-depth events:

- `scroll_depth:hero`: 43
- `scroll_depth:problem`: 27
- `scroll_depth:how`: 12
- `scroll_depth:faq`: 10
- `scroll_depth:final-cta`: 10

Lecture: les visiteurs consomment le contenu des pages coeur d'offre, mais l'instrumentation disponible ne permet pas encore de relier proprement cette profondeur d'engagement a des prises de rendez-vous ou a des revenus.

Search intent opportunities

Les recherches internes des 30 derniers jours restent le meilleur signal d'intention explicite:

- `remuneration`: 7 recherches
- `orientez-vous`: 3 recherches
- `calcul salaire brut/net`: 3 recherches
- `lexique rh life sciences`: 3 recherches
- `absenteisme`: 1 recherche
- `grossesse periode dessai`: 1 recherche
- `actualites`: 1 recherche

Opportunites SEO et contenu a prioriser

- Remuneration / salaire:
  le site repond deja via `/salary-benchmarks`, `/calcul-salaire-brut-net` et plusieurs articles. C'est le theme le plus valide par la recherche interne.
- Orientation:
  l'intention est reelle, mais les meilleurs resultats remontes incluent surtout des articles de blog. Il manque un chemin plus direct entre intention "orientation" et offre / capture lead.
- Lexique RH Life Sciences:
  la page `/lexique-life-sciences-rh` ressort bien. C'est un bon point d'entree SEO, a renforcer avec CTA et ponts vers offres.
- Droit du travail / RH pratique:
  `grossesse periode dessai` et `absenteisme` montrent un besoin de contenu expert a forte valeur de recherche.
- Actualites:
  faible volume, mais signal utile pour renforcer le role de `/news` comme hub recurrent.

Chat et feedback themes

- Chat: 2 requetes sur 7 jours, 5 sur 30 jours.
- Les 2 requetes de la semaine sont des tests techniques internes, pas des demandes client exploitables.
- Sur 30 jours, les seules requetes visiteurs utiles touchent au benchmark salaire.
- Feedback visiteur: 0 entree exploitable sur 7 jours et 0 sur 30 jours.

Conclusion: il n'y a pas assez de volume qualifie en chat ni de feedback client pour etablir des themes conversationnels fiables cette semaine.

Lead et conversion signals

- Leads 7 jours: 2
- Type de lead 7 jours: `callback-request` uniquement
- Page source lead 7 jours: `/life-sciences` uniquement
- Leads 30 jours: 3
- Repartition 30 jours:
  - `/life-sciences`: 2 callback requests
  - `/orientation`: 1 orientation-intake

Pages avec meilleur signal commercial observe

- `/life-sciences`: 37 vues, 2 leads, taux observe 5.4%

Pages a potentiel mais non converties dans les logs disponibles

- `/animal-health`: 26 vues, forts signaux de scroll, 0 lead attribue
- `/search`: 10 vues, 0 lead attribue
- `/resources`: 8 vues, 0 lead attribue

Priority fixes

1. Instrumenter les vrais points de conversion business.
Aujourd'hui, les signaux les plus nombreux sont des pageviews et des scroll-depth events. Il faut journaliser de facon fiable les clics vers Calendly, les soumissions newsletter, les downloads de guides, et les formulaires completes par page.

2. Corriger le trou de mesure sur les integrations durables.
Les variables `SUPABASE_URL`, `CALLBACK_WEBHOOK_URL`, `LEADS_WEBHOOK_URL` et les connexions CRM sont absentes ou vides. Le site ne peut donc pas consolider les leads au-dela du log local.

3. Relier `/animal-health` a une offre plus directement vendable.
La page engage, mais aucun lead n'est observe. Le probable probleme est un CTA insuffisamment explicite ou insuffisamment traque.

4. Reduire la fuite sur `/search`.
La recherche interne est un symptome utile, mais elle ne doit pas devenir une impasse. Ajouter des CTA contextuels et des ponts vers `/contact`, `/life-sciences`, `/orientation`, `/salary-benchmarks`.

5. Rendre la capture feedback operationnelle.
Le composant existe, mais aucun signal exploitable n'est remonte. Sans retour visiteur, il manque la couche qualitative.

SEO opportunities

- Doubler sur le cluster remuneration, deja valide par la demande:
  pages comparatives, salaires par fonction, salaires par vertical, salaires France vs Europe.
- Transformer les intents RH pratiques en pages hub:
  absentéisme, periode d'essai, grossesse, obligations employeur, performance RH.
- Consolider le couple GEO + SEO sur les pages lexique et benchmarks:
  ces pages ont de bonnes chances d'etre citees par moteurs IA et recherches classiques.
- Renforcer les pages d'offre montantes:
  `/life-sciences` et `/animal-health` meritent davantage de preuves, d'etudes de cas, de FAQ et de CTA segmentes.
- Reanimer `/news` et `/resources` avec navigation plus commerciale:
  les hubs existent, mais leur lien vers le service-selling reste faible.

Monetization and service-selling opportunities

- `/life-sciences`:
  c'est la meilleure page commerciale du moment. Priorite a une version encore plus vendeuse avec preuves, cas clients, delais de recrutement, et CTA call.
- `/animal-health`:
  transformer l'engagement en rendez-vous avec une offre plus concrete par sous-segment: diagnostic veterinaire, cliniques, petfood.
- `/salary-benchmarks` et `/calcul-salaire-brut-net`:
  tres bon potentiel pour vendre audit remuneration, scorecard dirigeant, ou abonnement premium.
- `/orientation`:
  potentiel lead clair, mais faible volume. A renforcer via liens depuis job roles, schools, search et contenus orientation.
- `/newsletter`:
  potentiel de capture recurrente, mais aucun lead newsletter n'apparait dans les logs locaux observes. Priorite a verifier l'instrumentation et les soumissions reelles.

Integrations missing or incomplete

- GA4 non connecte: `NEXT_PUBLIC_GA_MEASUREMENT_ID` vide
- Search Console non connecte
- Google Ads non connecte
- Meta Ads non connecte
- LinkedIn Ads non connecte
- Stockage durable leads incomplet: `SUPABASE_URL` vide
- Webhooks leads absents: `CALLBACK_WEBHOOK_URL` et `LEADS_WEBHOOK_URL` vides
- Feedback qualitatif present dans le code, mais aucun jeu de donnees exploitable
- Le widget "chat" existe, mais il n'y a pas de pipeline de themes conversationnels assez riche pour reporting commercial

Niveau de confiance

- Fort sur les volumes locaux de pageviews, recherches internes et leads journalises
- Moyen sur l'interpretation business des scroll events
- Faible sur l'attribution complete, la qualite des leads, le SEO organique et les revenus, faute d'integrations analytics / CRM / GSC

Recommendation simple pour la semaine a venir

- Garder `/life-sciences` comme page commerciale prioritaire
- Corriger la mesure des conversions reelles
- Ajouter un chemin de vente plus direct depuis `/animal-health`, `/search` et `/resources`
- Produire 2 contenus SEO orientes remuneration et 1 contenu RH pratique

Cordialement,

Codex pour SKS Weekly Intelligence
