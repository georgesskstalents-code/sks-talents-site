# Crop vidéo HeyGen 16:9 vers LinkedIn 9:16 vertical

**Objectif** · Convertir une vidéo HeyGen exportée en 1920x1080 (16:9) vers un format 1080x1920 (9:16) vertical LinkedIn, en gardant Chloé bien cadrée au centre.

**Deux options** · ffmpeg (rapide, ligne de commande) ou CapCut (visuel, ajustement manuel).

---

## Option A · ffmpeg (recommandé, 30 secondes par vidéo)

### Prérequis

ffmpeg installé. Si non installé :
```
brew install ffmpeg
```

### Commande de crop centrée

```
ffmpeg -i input.mp4 -vf "crop=ih*9/16:ih,scale=1080:1920" -c:a copy output.mp4
```

### Décomposition de la commande

- `-i input.mp4` · fichier source HeyGen
- `-vf "crop=ih*9/16:ih,scale=1080:1920"` · crop rectangle 9:16 centré depuis les 1080 px de hauteur (soit 607x1080), puis upscale à 1080x1920
- `-c:a copy` · garde l'audio tel quel (pas de ré-encodage, plus rapide)
- `output.mp4` · fichier vertical prêt LinkedIn

### Cas concret

```
cd ~/Downloads
ffmpeg -i chloe-pilot-01-petfood.mp4 -vf "crop=ih*9/16:ih,scale=1080:1920" -c:a copy chloe-pilot-01-petfood-vertical.mp4
```

### Variante · crop décentré si Chloé n'est pas parfaitement centrée

Si Chloé apparaît plutôt sur la gauche de l'image HeyGen (avatar mal cadré), ajouter un offset X :

```
ffmpeg -i input.mp4 -vf "crop=ih*9/16:ih:200:0,scale=1080:1920" -c:a copy output.mp4
```

Le `:200:0` décale le crop de 200 px depuis la gauche. À ajuster entre 0 et 900 selon le cadrage HeyGen.

### Vérification qualité

```
ffprobe output.mp4
```

Vérifier que la sortie mentionne bien `1080x1920` et un bitrate supérieur à 5 Mbps.

---

## Option B · CapCut (recommandé si ajustement visuel nécessaire)

CapCut desktop gratuit · https://www.capcut.com/

### Étapes

1. Ouvrir CapCut, créer un nouveau projet
2. Cliquer **Ratio** en haut à droite, choisir **9:16 (Portrait)**
3. Glisser le fichier MP4 HeyGen dans la timeline
4. La vidéo apparaît au milieu avec bandes noires sur les côtés
5. Cliquer sur le clip vidéo puis onglet **Basic** à droite
6. Modifier **Scale** jusqu'à ce que la vidéo remplisse tout le cadre 9:16 (environ 1.78x pour du 16:9 vers 9:16)
7. Ajuster **Position X** pour centrer Chloé si besoin
8. Vérifier le rendu sur toute la durée (les overlays HeyGen doivent rester visibles)
9. Cliquer **Export** en haut à droite
10. Paramètres export · 1080p, 30 fps, format MP4
11. Sauver le fichier avec suffixe `-vertical.mp4`

---

## Contrôles qualité systématiques

Après chaque crop, vérifier :

- [ ] Résolution finale · 1080 x 1920
- [ ] Durée identique à la source
- [ ] Audio synchronisé (pas de décalage voix / lèvres)
- [ ] Chloé bien cadrée sur toute la durée (visage jamais coupé)
- [ ] Overlays texte HeyGen toujours lisibles (pas coupés à droite / gauche)
- [ ] Poids fichier inférieur à 200 MB (limite LinkedIn)

---

## Cas particulier · overlays coupés après crop

Si les cartouches rubriques HeyGen (LE SIGNAL, L'ENTREPRISE, LE POINT DIRIGEANT) se retrouvent coupés par le crop 9:16, deux solutions :

### Solution 1 · re-générer sur HeyGen sans overlays

Régénérer les vidéos HeyGen sans les overlays texte, puis remettre les cartouches directement dans CapCut (option **Text** puis positionner en bas de l'écran vertical).

### Solution 2 · overlay ffmpeg post-crop

```
ffmpeg -i output.mp4 -vf "drawtext=text='LE SIGNAL · Petfood premium +14%':fontcolor=white:fontsize=48:box=1:boxcolor=0x4A9B9B@0.85:boxborderw=20:x=(w-tw)/2:y=h-th-100:enable='between(t,15,35)'" -c:a copy final.mp4
```

Cette commande ajoute un cartouche teal SKS avec texte blanc en bas de l'écran, visible de 15 à 35 sec. À répéter pour chaque rubrique.

---

## Automatisation batch (pour série 10 vidéos)

Script bash pour traiter un dossier entier de vidéos HeyGen :

```
#!/bin/bash
for f in ~/Downloads/heygen-raw/*.mp4; do
  name=$(basename "$f" .mp4)
  ffmpeg -i "$f" -vf "crop=ih*9/16:ih,scale=1080:1920" -c:a copy "~/Downloads/linkedin-ready/${name}-vertical.mp4"
done
```

À sauvegarder dans `scripts/crop-heygen-batch.sh` le jour où la série passera en production.
