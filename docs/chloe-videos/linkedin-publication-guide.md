# LinkedIn · Guide publication vidéos Chloé SKS Talents News

**Cible** · Compte perso Georges Kengue (9 283 followers)
**Format** · Vidéo native LinkedIn vertical 9:16, durée 80-90 sec
**Fréquence pilot** · 1 vidéo Lundi 8h (créneau optimal engagement B2B)

---

## 1 · Spécifications techniques LinkedIn

| Paramètre | Valeur |
|---|---|
| Format vidéo | MP4, codec H.264 |
| Ratio | 9:16 vertical (obligatoire pour affichage plein écran mobile) |
| Résolution | 1080 x 1920 px |
| Frame rate | 30 fps |
| Bitrate | 8 à 10 Mbps |
| Audio | AAC, 48 kHz stéréo |
| Durée max recommandée | 90 sec (au-delà, chute engagement de 40%) |
| Poids max fichier | 200 MB (largement OK pour 90 sec) |
| Cover image | 1080 x 1920, JPG ou PNG, moins de 2 MB |

---

## 2 · Cover image (thumbnail)

**Recommandé** · Screenshot du sommaire à 12 sec (les 3 vignettes rubriques bien visibles avec Chloé en plan wide).

**Procédure** :
1. Ouvrir la vidéo finale dans QuickTime ou VLC
2. Se positionner à 00:12
3. Capture d'écran (Cmd+Shift+4 puis clic sur la fenêtre)
4. Sauver en JPG dans `docs/chloe-videos/covers/pilot-XX-cover.jpg`
5. Uploader dans LinkedIn au moment de la publication

**Alternative** · Générer une cover custom Canva 1080x1920 avec titre gros + logo SKS Talents News + photo Chloé freeze-frame.

---

## 3 · Caption LinkedIn optimisée

### Structure standard

```
[HOOK 1 ligne · 100 caractères max, doit sortir avant le "voir plus"]

[CONTEXTE 3 à 4 lignes · pourquoi ce sujet, en quoi ça matter maintenant]

[3 CLÉS de la vidéo en bullets]
- Clé 1
- Clé 2
- Clé 3

[CTA · 2 liens actionnables]
- Fiche métier détaillée · [URL]
- Newsletter hebdo SKS Talents · [URL]

[SIGNATURE + hashtags]
```

### Exemple Pilot 01 · Petfood premium

```
Petfood premium · le segment vient de dépasser Mars et Nestlé Purina sur la croissance en 2026.

Cinq marques changent la donne cette année en Europe · Edgard Cooper qui vient de lever 40 M€, Tails.com repris par Nestlé, Butternut Box qui vise l'IPO, Ziwi Peak et Farmina qui doublent leurs équipes commerciales.

Dans cette vidéo de 85 secondes, Chloé de SKS Talents News décode :
- Le signal marché · +14% premium vs +2% mainstream
- L'entreprise qui monte · Edgard Cooper, 40 M€ levés
- La fonction qui explose · Head of R&D Petfood, +45% offres

Pour aller plus loin :
- Fiche métier Head of R&D Petfood · https://skstalents.fr/job-roles/head-of-rd-petfood
- Newsletter SKS Talents · https://skstalents.fr/newsletter

#PetfoodPremium #SantéAnimale #Recrutement
```

### Exemple Pilot 02 · Consolidation cliniques

```
Un cabinet vétérinaire français sur cinq est désormais adossé à un groupe consolidateur. Et ça change tout pour les carrières.

IVC Evidensia, Univet et Mon Véto ont racheté plus de 180 cliniques sur les 12 derniers mois. Les jeunes vétérinaires arbitrent salarié versus installation libérale sous un angle nouveau.

Dans cette vidéo de 85 secondes, Chloé de SKS Talents News décrypte :
- Le signal · 22% des cliniques FR consolidées en 2026 (vs 8% en 2020)
- Les 3 groupes actifs · IVC Evidensia, Univet, Mon Véto
- La fonction émergente · Directeur.rice régional.e cliniques, 85 à 120 K€

Pour aller plus loin :
- Fiche métier Directeur.rice régional.e cliniques · https://skstalents.fr/job-roles/directeur-regional-cliniques-veterinaires
- Newsletter SKS Talents · https://skstalents.fr/newsletter

#SantéAnimale #Vétérinaire #Recrutement
```

---

## 4 · Règles hashtags LinkedIn

- **Max 3 hashtags** (au-delà, l'algo pénalise)
- Un hashtag secteur + un hashtag fonction + un hashtag universel
- Placer les hashtags en fin de post uniquement (pas dans le corps du texte)
- Éviter les hashtags trop génériques (#business, #linkedin) qui diluent

---

## 5 · Horaires optimaux publication (compte perso B2B France)

| Jour | Créneau | Note |
|---|---|---|
| Lundi | 8h00 - 8h30 | **OPTIMAL** · captation avant réunions |
| Mardi | 7h30 - 9h00 | Alternative solide |
| Mercredi | 12h30 - 13h30 | Bon pour formats visuels |
| Jeudi | 8h00 - 9h00 | Bon deuxième créneau |
| Vendredi | 16h00 - 17h30 | Créneau réservé teasers newsletter |

**Recommandation pilot** · Publier Lundi 25 août 2026 8h00 (Pilot 01) puis Lundi 1er septembre 2026 8h00 (Pilot 02).

---

## 6 · Workflow publication via Buffer

**Note importante** · L'API vidéo LinkedIn n'est pas disponible pour les comptes perso. Buffer permet néanmoins de programmer les vidéos manuellement (upload direct depuis Buffer vers LinkedIn).

### Procédure Buffer

1. Se connecter à Buffer (compte SKS Talents)
2. Choisir le canal · LinkedIn Personal (Georges Kengue)
3. Créer un nouveau post
4. Uploader la vidéo MP4 9:16 (issue du crop, voir `scripts/heygen-linkedin-crop.md`)
5. Uploader la cover image
6. Coller la caption préparée (voir section 3)
7. Vérifier le preview du rendu
8. Programmer à la date/heure choisie (voir section 5)
9. Sauvegarder

**Fallback si Buffer bug sur vidéo native** · Publier manuellement depuis LinkedIn mobile (l'app iOS gère mieux les uploads vidéo que le desktop).

---

## 7 · Post-publication · mesure et itération

### KPIs à tracker (dans les 72h post-publication)

- Impressions (objectif pilot · 3 000+)
- Taux de vue à 3 sec (objectif · 30%+)
- Taux de vue complète (objectif · 15%+)
- Reactions (objectif pilot · 40+)
- Commentaires (objectif · 5+)
- Clics vers fiche métier (mesure via UTM · `?utm_source=linkedin&utm_medium=video&utm_campaign=chloe-pilot-01`)

### À faire J+1 après chaque publication

- Répondre à tous les commentaires dans les 24h (booste l'algo)
- Épingler un commentaire avec les 2 liens fiche métier + newsletter
- Noter les KPIs dans le tableau de bord Notion "Vidéos Chloé"

### Décision GO/NO-GO série

Après les 2 pilots, si :
- Vue à 3 sec > 30% ET reactions > 40 · **GO série de 10 vidéos**
- Vue à 3 sec entre 20 et 30% · **Itération script** (ajuster hook, format)
- Vue à 3 sec < 20% · **STOP et pivot format** (test autre style, autre créneau)

---

## 8 · Commentaire épinglé (template)

À poster juste après la publication, puis épingler manuellement :

### Pilot 01

```
Pour prolonger la vidéo :
Fiche métier Head of R&D Petfood · https://skstalents.fr/job-roles/head-of-rd-petfood
Newsletter hebdo SKS Talents · https://skstalents.fr/newsletter
Site cabinet · https://skstalents.fr

Vous êtes dirigeant.e petfood premium et cherchez à recruter ce profil, écrivez-moi en DM.
```

### Pilot 02

```
Pour prolonger la vidéo :
Fiche métier Directeur.rice régional.e cliniques · https://skstalents.fr/job-roles/directeur-regional-cliniques-veterinaires
Newsletter hebdo SKS Talents · https://skstalents.fr/newsletter
Site cabinet · https://skstalents.fr

Vous êtes vétérinaire senior ou groupe consolidateur en recherche active, DM ouverts.
```
