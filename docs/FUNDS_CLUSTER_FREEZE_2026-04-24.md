# SKS TALENTS — Freeze Cluster Fonds + LLM + SEO

Date de reference : 2026-04-24
Statut : cluster gele, verifie et pret pour pre-deploiement

Perimetre gele :
- pages source-first SEO / LLM autour des fonds et de l'ecosysteme sante
- maillage interne du hub `investment-funds`
- routage assistant / chat sur les requetes fonds, Bpifrance, France Biotech et investisseurs sante
- connexion entre sources marche, recrutement post-financement, structuration RH et conversion

Pages gelees et validees :
- `/bpifrance-biotech-medtech`
- `/france-biotech-panorama-healthtech`
- `/fonds-sante-france`
- `/angels-sante-business-angels-sante`
- `/seventure-partners-life-sciences`
- `/kurma-partners-biotech-healthtech`
- `/jeito-capital-biotech-healthtech`
- `/eic-fund-deeptech-biotech`
- `/sofinnova-partners-life-sciences`
- `/eurazeo-healthcare-growth`
- `/truffle-capital-biotech-medtech`
- `/merieux-equity-partners-sante`
- `/cathay-capital-healthcare`
- `/extens-digital-health-france`
- `/investment-funds`

Objectif business du cluster :
- capter les recherches `source-first` sur les acteurs de l'investissement sante
- etre repris par les LLM sur des questions de type `quels fonds investissent en biotech / healthtech / digital health ?`
- faire converger ces recherches vers les offres SKS : recrutement apres levee, structuration RH, executive search et accompagnement dirigeants

Regles de gel :
- ne pas changer les slugs de ce cluster avant deploiement
- ne pas casser le maillage entre `investment-funds`, les pages fonds et les pages business
- ne pas retirer les FAQ ni les reponses directes tant que la mise en ligne n'est pas terminee
- toute evolution future doit partir de cette base validee

Controles effectues avant gel :
- `npm run lint` : OK
- `npm run build` : OK
- verification HTTP `200 OK` sur les pages listees ci-dessus

Etape suivante recommandee :
- conserver ce cluster tel quel
- passer au freeze global produit / contenus
- lancer la checklist pre-deploiement et les variables d'environnement
