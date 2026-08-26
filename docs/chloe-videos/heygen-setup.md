# HeyGen · Setup pas à pas pour les vidéos Chloé SKS Talents News

**Objectif** · Créer 2 vidéos pilots de 85 secondes chacune avec l'avatar Chloé, format 16:9 (à cropper ensuite en 9:16 pour LinkedIn).
**Temps estimé setup complet** · 45 minutes
**Temps estimé par vidéo une fois setup validé** · 10 à 15 minutes

---

## Étape 1 · Création du compte HeyGen (5 min)

1. Aller sur https://www.heygen.com/pricing
2. Choisir le plan **Creator** (24 $ / mois environ 22 €) qui donne :
   - 15 minutes de vidéo par mois (suffisant pour 8 à 10 vidéos courtes)
   - Export 1080p sans watermark
   - Voix française premium
   - Avatars premium accessibles
3. Payer en carte (facturable perso, à re-facturer à SKS Talents)
4. Bien noter les identifiants dans 1Password

**Alternative si volume plus élevé** · Team plan à 69 $ / mois (30 min de vidéo, plus avatars custom possibles pour créer un vrai avatar personnalisé Chloé plus tard).

---

## Étape 2 · Sélection avatar Chloé (15 min)

Aller dans **Avatar Library** puis filtrer :
- Sexe · Female
- Ethnicity · European ou Mediterranean
- Style · Business Professional

### Critères visuels stricts pour Chloé

- Femme, âge apparent 30-35 ans
- Look pro chaleureux, ni trop corporate ni trop décontracté
- Sourire posé (pas figé, pas trop large)
- Tenue smart casual · blazer, blouse ou pull fin uni
- Coloris tenue neutres (blanc, beige, gris anthracite, bleu marine) · pas de rouge ni motifs
- Regard direct caméra
- Cheveux mi-longs ou coiffure structurée (bun, brushing)
- Pas de bijoux voyants ni maquillage prononcé

### 3 candidates à tester en priorité

Chercher dans HeyGen ces prénoms d'avatars (noms typiques HeyGen, à confirmer selon la bibliothèque du moment) :

1. **Anna in Business Attire** · plutôt corporate assumée
2. **Clara Casual Studio** · plus chaleureuse, notre favorite a priori
3. **Sofia Modern Pro** · alternative avec look méditerranéen

**Test à faire** · Générer 10 secondes de la phrase d'ouverture avec chaque avatar et comparer.

**Livrable étape 2** · Georges valide l'avatar définitif avant de lancer les 2 vidéos complètes.

---

## Étape 3 · Voix française (5 min)

Aller dans **Voice Library** puis filtrer Language = French.

### 3 options recommandées

1. **Léa (French, Female, Warm)** · voix chaleureuse type journaliste radio, notre favorite
2. **Camille (French, Female, Professional)** · plus posée, style presse écrite
3. **Manon (French, Female, Conversational)** · plus jeune, style podcast

**Réglages** :
- Speed · 1.0x (par défaut). Si le débit paraît lent, monter à 1.05x max.
- Pitch · neutre
- Pause between sentences · 0.4 sec

**Test à faire** · Charger le paragraphe d'ouverture (0-5 sec) sur les 3 voix et écouter au casque. Georges choisit celle qui matche le mieux le ton BFM Business.

---

## Étape 4 · Background studio SKS (5 min)

Deux options possibles :

### Option A · Background solid teal (le plus simple)
- Dans HeyGen, choisir **Background** puis **Solid Color**
- Code hexa · `#4A9B9B` (teal SKS)
- Résultat propre, avatar bien détouré

### Option B · Background wave SKS custom (plus premium)
- Générer une image 1920x1080 avec fond teal `#4A9B9B` et motif wave SKS discret (à récupérer dans `/public/brand/`)
- Uploader dans HeyGen · **Background** puis **Upload Image**
- Vérifier que le motif wave n'interfère pas avec la lisibilité des overlays texte

**Recommandé pour le pilot** · Option A (solid teal). Passer en Option B pour la vidéo 3 une fois le format validé.

---

## Étape 5 · Overlays texte (rubriques + logo)

HeyGen permet d'ajouter des overlays via **Text Elements** :

- Logo SKS Talents News · haut à gauche, présent pendant toute la vidéo, taille 120px
- Cartouches rubriques (LE SIGNAL, L'ENTREPRISE, LE POINT DIRIGEANT) · bas d'écran, hauteur 100px, fond teal semi-transparent, texte blanc, police sans-serif bold
- Timing overlays précisé dans chaque script (fichiers `pilot-01-*.md` et `pilot-02-*.md`)

**Alternative** · Si les overlays HeyGen sont trop rigides, monter les cartouches en post-prod dans CapCut (voir `scripts/heygen-linkedin-crop.md`).

---

## Étape 6 · Génération des 2 vidéos (20 min · 10 min chacune)

Pour chaque script :

1. Créer un nouveau projet HeyGen
2. Choisir avatar validé étape 2
3. Choisir voix validée étape 3
4. Choisir background validé étape 4
5. Copier-coller chaque bloc de dialogue du script (fichiers `pilot-01-*.md` et `pilot-02-*.md`) dans un scene séparé
6. Ajouter les overlays texte selon le timing du script
7. Preview la vidéo entière
8. Générer en 1080p
9. Télécharger le MP4

**Résolution export** · 1920x1080 (16:9). Le crop en 9:16 se fait après (voir `scripts/heygen-linkedin-crop.md`).

---

## Étape 7 · Contrôle qualité avant publication

Checklist par vidéo :

- [ ] Durée totale entre 80 et 90 sec
- [ ] Prononciation correcte de tous les noms propres (Edgard Cooper, IVC Evidensia, Univet, Mon Véto)
- [ ] Signature "Je suis Chloé pour SKS Talents. Bonne semaine à tous." bien articulée
- [ ] Overlays texte lisibles pendant au moins 3 sec chacun
- [ ] Aucun em-dash ni en-dash à l'écran
- [ ] Fond teal uniforme sur toute la vidéo
- [ ] Pas de coupure brutale entre les rubriques

---

## Coûts totaux estimés

- Abonnement HeyGen Creator · 22 € / mois
- 2 vidéos pilots · dans le forfait mensuel
- Post-prod crop 9:16 · 0 € (CapCut gratuit ou ffmpeg local)

**Budget mensuel prévisionnel** · 22 € pour 8 à 10 vidéos courtes, soit environ 2 à 3 € par vidéo. À comparer à 800 à 1500 € pour une production vidéo humaine équivalente.
