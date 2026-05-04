To: infos@skstalents.com
Subject: SKS Weekly Intelligence - 21 Apr 2026 to 27 Apr 2026

Bonjour,

Voici le point hebdomadaire SKS TALENTS sur la periode du 2026-04-21 au 2026-04-27, avec comparaison contre les 7 jours precedents. Ce rapport utilise uniquement les signaux reels disponibles dans les logs locaux du site. Note: les logs locaux disponibles s'arretent au 2026-04-27 UTC, donc il n'y a pas de telemetrie locale exploitable apres cette date dans cette extraction.

Resume executif

- Le trafic progresse nettement: 217 pageviews sur 7 jours, contre 155 sur la periode precedente, soit +40%.
- Les leads progressent aussi en volume, mais restent trop faibles pour conclure solidement: 2 leads contre 1.
- Toute la conversion observee vient de `/life-sciences`, qui concentre aussi le meilleur signal commercial de la semaine.
- `/animal-health` attire beaucoup d'attention et de profondeur de scroll, mais ne convertit pas encore.
- La recherche interne confirme 4 intentions dominantes: `lexique rh life sciences`, `remuneration`, `orientez-vous`, et `calcul salaire brut/net`.
- Les signaux chat et feedback ne sont pas exploitables cette semaine faute de donnees conversationnelles ou de feedback localement disponibles.

Top pages

- `/`: 68 vues sur 7 jours, +14 vs semaine precedente.
- `/life-sciences`: 45 vues sur 7 jours, +43 vs semaine precedente, avec 2 leads.
- `/animal-health`: 32 vues sur 7 jours, +30 vs semaine precedente.
- `/search`: 11 vues sur 7 jours, -13 vs semaine precedente.
- `/resources`: 10 vues sur 7 jours, -5 vs semaine precedente.
- `/about`: 5 vues sur 7 jours, +5 vs semaine precedente.
- `/mission`: 4 vues sur 7 jours, +4 vs semaine precedente.
- `/orientation`: 4 vues sur 7 jours, -5 vs semaine precedente.
- `/references`: 4 vues sur 7 jours, +1 vs semaine precedente.

Pages faibles ou a surveiller

- `/search`: la page recule nettement et ne genere aucun lead. La recherche interne est utile, mais elle reste un point de friction si elle ne renvoie pas vers des pages d'offre plus directes.
- `/resources`: trafic en baisse et aucun signal de conversion observe.
- `/orientation`: trafic reduit et aucun lead sur 7 jours, alors que la page avait deja genere un intake sur la periode precedente.
- `/animal-health`: 32 vues et 95 evenements de scroll-depth, mais 0 lead. Le contenu engage, sans chemin de conversion suffisant.
- `/`: volume eleve, mais aucun lead attribue et 3 erreurs frontend loggees sur la page d'accueil.

Tendances trafic et engagement

- Pageviews 7 jours: 217
- Pageviews 7 jours precedents: 155
- Delta: +62
- Recherches internes 7 jours: 9
- Recherches internes 7 jours precedents: 10
- Leads 7 jours: 2
- Leads 7 jours precedents: 1
- Evenements de scroll-depth logges sur 7 jours: 170
- Erreurs frontend loggees sur 7 jours: 3, toutes sur `/` avec le message `Script error.`

Le trafic est tres concentre sur quelques jours:

- 2026-04-21: 58 pageviews
- 2026-04-24: 38 pageviews
- 2026-04-25: 76 pageviews, avec 2 leads et 87 evenements de scroll-depth
- 2026-04-27: 41 pageviews

Lecture: l'audience repond bien aux pages coeur d'offre, mais la conversion reste tres dependante du niveau de CTA et de la qualite du chemin vers la prise de contact.

Search intent opportunities

- `lexique rh life sciences`: 3 recherches. Le site renvoie bien vers `/lexique-life-sciences-rh`, ce qui confirme ce hub comme porte d'entree SEO et IA interessante. A renforcer avec CTA plus visibles vers les offres.
- `remuneration`: 2 recherches. Les meilleurs resultats pointent vers `/salary-benchmarks` et `/calcul-salaire-brut-net`. C'est le meilleur signal pour un cluster remuneration plus large.
- `orientez-vous`: 2 recherches. Les resultats remontent surtout des articles de blog, pas une page de parcours dediee. Il manque un hub d'orientation plus direct et plus conversion-oriented.
- `calcul salaire brut/net`: 2 recherches. Le besoin est clair et peut servir de passerelle vers audit remuneration, benchmark ou prise de rendez-vous.

Le theme `remuneration` et le theme `lexique RH Life Sciences` sont les deux axes les plus exploitables pour attirer du trafic et le transformer en lead.

Chat et feedback themes

- Chat: aucun transcript exploitable n'est present dans les logs locaux de cette extraction.
- Feedback visiteur: aucun jeu de donnees exploitable n'est disponible localement cette semaine.
- Conclusion: il n'y a pas assez de volume qualifie pour etablir des themes conversationnels fiables. Il faut d'abord connecter ou exporter les donnees de chat et feedback avant toute lecture commerciale.

Lead et conversion signals

- Leads 7 jours: 2
- Type de lead 7 jours: `callback-request` uniquement
- Page source lead 7 jours: `/life-sciences` uniquement
- Leads 30 jours disponibles dans les logs locaux: 3
- Repartition observee sur les logs locaux: `/life-sciences` 2 callback requests, `/orientation` 1 orientation-intake sur la periode precedente

Points de prudence:

- Les 2 leads de la semaine sont logges, mais ils utilisent des donnees de test. La presence du signal est reelle, mais la qualite commerciale n'est pas validee.
- Aucun lead n'est observe sur `/animal-health`, `/search`, `/resources` ou `/orientation` dans la periode courante.

Pages avec meilleur signal commercial observe

- `/life-sciences`: 45 vues, 2 leads, taux observe de 4.4%.

Pages a potentiel mais non converties dans les logs disponibles

- `/animal-health`: 32 vues, forte profondeur de scroll, 0 lead attribue.
- `/search`: 11 vues, 0 lead attribue.
- `/resources`: 10 vues, 0 lead attribue.
- `/orientation`: 4 vues, 0 lead attribue.

Priority fixes

1. Instrumenter les vrais points de conversion business.
Journaliser de facon fiable les clics vers call, callback, newsletter, telechargements de guides et formulaires completes par page. Aujourd'hui, les signaux dominants restent la pageview et le scroll-depth.

2. Corriger la collecte durable des leads.
Les variables `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `CALLBACK_WEBHOOK_URL`, `LEADS_WEBHOOK_URL` et `FEEDBACK_WEBHOOK_URL` sont vides dans l'environnement local. Le site ne consolide donc pas les leads au-dela du log local.

3. Reduire la friction sur `/search`.
Ajouter des CTA contextuels et des ponts directs vers `/life-sciences`, `/orientation`, `/salary-benchmarks` et la prise de contact afin que la recherche interne devienne une rampe de conversion.

4. Transformer `/animal-health` en page commerciale explicite.
Le contenu capte l'attention, mais le chemin de conversion reste insuffisant. Il faut un CTA plus direct, des preuves plus nettes et un angle de service plus concret par sous-segment.

5. Capturer les themes chat et feedback.
Sans export ou stockage exploitable, la lecture qualitative reste impossible. Cette couche doit devenir une source de priorisation produit et commerciale.

SEO opportunities

- Doubler sur le cluster remuneration: benchmarks salariaux, comparatifs brut/net, salaires par fonction, salaires par vertical.
- Creer ou renforcer un vrai hub orientation: le besoin existe, mais il est aujourd'hui servi surtout par des articles de blog.
- Consolider le cluster `lexique RH Life Sciences`: FAQ, maillage vers les offres, CTA rendez-vous, et ponts vers les contenus expertises.
- Renforcer les sujets RH pratiques a forte utilite: absentisme, periode d'essai, grossesse, obligations employeur.
- Donner plus de poids commercial aux pages montantes `/life-sciences` et `/animal-health` avec preuves, cas, FAQ et CTA segmentes.

Monetization and service-selling opportunities

- `/life-sciences`: meilleure page commerciale du moment. A pousser comme page de prise de rendez-vous et de generation de leads qualifies.
- `/salary-benchmarks` et `/calcul-salaire-brut-net`: tres bons candidats pour vendre audit remuneration, benchmark premium et diagnostic de structure de paie.
- `/orientation`: potentiel pour une offre de conseil ou d'intake structure, mais il faut un parcours plus direct.
- `/animal-health`: bonne base pour vendre du recrutement sectoriel ou un accompagnement cible par sous-segment.
- `/resources`: a convertir en hub de contenus telechargeables et de lead magnets, mais seulement apres instrumentation fiable.

Integrations missing or incomplete

- GA4 non connecte: `NEXT_PUBLIC_GA_MEASUREMENT_ID` est vide.
- Verification Google non connectee: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` est vide.
- Search Console non connectee dans les signaux locaux disponibles.
- Google Ads, Meta Ads et LinkedIn Ads non connectes dans les signaux locaux disponibles.
- Stockage durable des leads incomplet: `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` sont vides.
- Webhooks leads et feedback absents: `CALLBACK_WEBHOOK_URL`, `LEADS_WEBHOOK_URL` et `FEEDBACK_WEBHOOK_URL` sont vides.
- Donnees chat et feedback non exploitables: aucun export local suffisamment riche n'est disponible pour un reporting themes.

Niveau de confiance

- Fort sur les volumes locaux de pageviews, recherches internes, scroll-depth et leads journalises.
- Moyen sur l'interpretation business des scroll-depth events.
- Faible sur l'attribution complete, la qualite des leads, le SEO organique et les revenus, faute d'integrations analytics et CRM completes.

Recommandation simple pour la semaine a venir

- Garder `/life-sciences` comme page commerciale prioritaire.
- Corriger la mesure des conversions reelles.
- Ajouter un chemin de vente plus direct depuis `/animal-health`, `/search` et `/resources`.
- Produire du contenu SEO sur la remuneration et sur un hub orientation plus direct.

Cordialement,

Codex pour SKS Weekly Intelligence
