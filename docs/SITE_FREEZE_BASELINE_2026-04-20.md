# SKS TALENTS — Freeze Baseline

Date de référence : 2026-04-21
Statut : baseline gelée, verrouillée et validée

Base locale validée :
- http://127.0.0.1:3200/

Règle active :
- Toute prochaine modification part de cette URL locale validée.
- Toute prochaine modification de contenu, d'interface ou de parcours doit prendre en compte `français + anglais`.
- Cette base inclut les derniers correctifs sur :
  - la carte Purple orientation
  - le bloc vidéo home
  - le bloc contenus / machine éditoriale
  - le sélecteur site `FR / EN` dans le header
  - la traduction anglaise directe de la page active
  - la recherche augmentée bilingue
  - le dashboard exact validé sur `/dashboard`
  - les nouvelles landing pages `/life-sciences` et `/animal-health`
  - le verrou copywriting appliqué aux prompts éditoriaux

Règle de travail :
- Toute nouvelle modification part de cette base locale validée.
- Ne pas repartir d'une ancienne build ni d'un ancien port.
- Toute évolution doit préserver les flux ci-dessous avant d'être considérée comme acceptable.
- Toute évolution doit être pensée comme :
  - `native FR`
  - `native EN quand disponible`
  - ou `fallback de traduction propre` quand la version anglaise native n'existe pas encore
- Aucun nouveau contenu ne doit être considéré comme complet sans une prise en compte explicite de l'anglais.

Flux validés à préserver :
- Homepage locale sur `3200`
- Blog et pages article
- Studies / livres blancs
- Search interne
- Orientation
- Carte `Mini-formation dirigeant` avec lien direct vers `https://www.purplesquirrel.fr/miniformation-dirigeant`
- Formulaire étudiant / ancre `#orientation-intake`
- Agent / chat local
- Intégration Notion pour les contenus `Published`
- Heroes éditoriaux articles et livres blancs
 - Sélecteur site `FR / EN` propre dans le header
 - Traduction directe de la page active pour `EN`
 - Recherche bilingue avec réponse rapide SKS
 - Dashboard exact sur `/dashboard`
 - Landings premium `/life-sciences` et `/animal-health`

Verrou explicite :
- Toute prochaine modification repart de `http://127.0.0.1:3200/`.
- Cette étape devient la nouvelle référence de travail.
- Ne pas revenir à une ancienne logique de traducteur widget tant que cette base fonctionne.
- Ne pas revenir à l'ancien composant `VerticalLandingPage` pour les hubs `Life Sciences` et `Animal Health`.

Rappel de production :
- Les nouvelles publications de contenu doivent continuer à privilégier Notion.
- Les modifications de design ou de structure doivent être testées sur cette base avant tout déploiement.
- En cas de doute entre amélioration visuelle et stabilité, la stabilité prime.
- Pour toute future modification, la question de contrôle devient :
  - `que voit l'utilisateur français ?`
  - `que voit l'utilisateur anglais ?`
  - `si la page n'est pas encore localisée nativement, le fallback reste-t-il propre ?`
