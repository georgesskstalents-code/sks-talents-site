# SKS TALENTS Notion Publishing Checklist

## Objectif

Publier un contenu depuis Notion et le voir apparaitre proprement sur le site.

## Types de contenus supportes

- `article`
- `study`
- `job_role`
- `event`
- `reference`
- `school`

## Champs minimum a remplir

- `Title`
- `Slug`
- `Content Type`
- `Status`
- `Vertical`
- `Excerpt` ou `Main Content`
- une prise en compte `FR + EN`

## Champs fortement recommandes

- `Publish date`
- `SEO Title`
- `Meta Description`
- `English Title`
- `English Excerpt`
- `English SEO Title`
- `English Meta Description`
- `English Primary Keyword`
- `English Keyword Variations`
- `Hero Image URL` si vous voulez imposer votre propre image sur le site
- `Hero Image Alt` si vous voulez controler le texte alternatif
- `Source Name`
- `Source URL`
- `Primary Keyword`
- `Keyword Variations`
- `Suggested Alt Text` si un visuel est utilise
- `Internal Links`
- `Mini FAQ` si le sujet est un article informationnel

## Regles de publication

- `Status` doit etre `Published`
- `Slug` doit etre unique
- `Content Type` doit correspondre exactement au type attendu par le site
- `Source Name` et `Source URL` doivent etre renseignes avant publication
- tout nouveau contenu doit etre prepare pour `francais + anglais`
- si la version anglaise native n'est pas encore publiee, il faut au minimum preparer :
  - un `English Title`
  - un `English Excerpt`
  - un `English SEO Title`
  - une `English Meta Description`
  - un angle ou resume anglais assez propre pour la traduction / adaptation
- pour controler l'image d'un `article` ou d'un `study`, vous pouvez :
  remplir `Hero Image URL`
  ou utiliser une propriete fichier `Hero Image`
  ou definir la `cover` de la page Notion
- le `SEO Title` doit rester clair et centrer la requete principale
- la `Meta Description` doit etre utile et specifique, pas seulement repetitive
- si un visuel est utilise, son `alt text` doit decrire le sujet de facon utile
- les `Internal Links` doivent relier le contenu a l'univers SKS TALENTS
- pour un `article`, le premier paragraphe doit repondre clairement a la question principale
- pour un `article`, les intertitres doivent reprendre des questions, decisions ou sous-problemes reels
- pour un `article`, il faut privilegier des paragraphes courts et extractibles
- pour un `article`, une mini FAQ de fin renforce la lisibilite SEO / GEO quand le sujet s'y prete
- pour un `article`, verifier aussi que les questions et promesses se traduisent proprement en anglais
- pour un `article` ou un `study`, la version anglaise ne doit jamais contredire la version francaise

## Apparition attendue sur le site

- `article` : `/blog` + page article
- `job_role` : `/job-roles` + page fiche metier
- `event` : `/events` + page evenement
- `reference` : `/references` + page reference
- `school` : `/schools` + page ecole

## Si un contenu ne remonte pas

Verifier dans cet ordre :
1. `Status = Published`
2. `Content Type` correct
3. `Slug` unique
4. `Title` renseigne
5. `Excerpt` ou `Main Content` renseigne
6. `Source Name` et `Source URL` remplis
7. le contenu n'est pas en doublon avec un slug existant
8. le `SEO Title` et la `Meta Description` sont renseignes
9. si l'image n'est pas bonne, verifier `Hero Image URL`, `Hero Image` ou la cover Notion
10. les liens internes utiles ont ete ajoutes
11. les elements anglais minimaux sont prets ou la version native EN existe
12. le contenu reste comprehensible pour un utilisateur arrivant en `EN`

## Note technique

Le site lit Notion en direct avec fallback de securite si Notion repond lentement ou mal.
En production, si les champs sont corrects, le contenu publie est concu pour apparaitre sans sync manuelle supplementaire.
Le site dispose maintenant d'un selecteur `FR / EN` :
- la recherche est bilingue nativement
- les pages non encore localisees nativement peuvent etre aidees par le fallback de traduction
- il reste recommande de preparer les champs anglais dans Notion pour converger vers une vraie version bilingue propre
