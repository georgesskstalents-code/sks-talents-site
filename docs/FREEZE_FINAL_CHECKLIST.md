# SKS TALENTS Freeze Checklist

## 1. Interface finale

- Vérifier la homepage sur desktop large, laptop et mobile.
- Vérifier qu’aucune section n’écrase le scroll ou ne compresse le texte.
- Vérifier la vidéo Vimeo depuis la homepage.
- Vérifier le bouton de chat en bas à droite.
- Vérifier le bandeau cookies et le bouton `Préférences cookies`.
- Vérifier le widget d’avis après 2 minutes.

## 2. Parcours à tester avant mise en prod

- `/`
- `/contact`
- `/resources`
- `/references`
- `/events`
- `/schools`
- `/job-roles`
- un article blog
- une fiche métier

## 3. Chatwoot

- Confirmer que le bon `Website Token` est utilisé.
- Confirmer que le domaine final est autorisé dans l’inbox.
- Vérifier qu’un message de test remonte bien dans le dashboard.
- Garder le fallback local tant que la prod Chatwoot n’est pas confirmée.

## 4. Formulaires business

- Envoyer un test de demande de rappel.
- Envoyer un test de feedback site.
- Envoyer un test d’alerte ressources.
- Vérifier l’arrivée côté mail, store ou dashboard.

## 5. Déploiement sécurisé

- Coller les vraies variables dans Vercel.
- Vérifier `NEXT_PUBLIC_SITE_URL` et `SITE_URL`.
- Vérifier les clés Turnstile, Upstash et Resend.
- Vérifier les headers de sécurité et la CSP.
- Activer Cloudflare, WAF, bot protection et rate limiting `/api/*`.

## 6. Contenu / CMS

- Vérifier qu’un article publié dans Notion remonte bien.
- Vérifier qu’une fiche métier publiée remonte bien.
- Vérifier qu’un event publié remonte bien.
- Vérifier que les sources officielles sont bien renseignées.

## 7. GO / NO GO

Le site est prêt à être figé si :

- `lint` passe
- `build` passe
- les routes clés répondent
- le chat est validé sur le vrai domaine
- les formulaires remontent bien
- la homepage vous paraît assez fluide et respirante
