# Email hebdomadaire — Rapport SKS Talents

## Récap

| | |
|---|---|
| **Destinataire** | g.kengue@skstalents.com |
| **Fréquence** | Tous les **lundis à 8h** (heure de Paris approximative) |
| **Cron Vercel** | `0 7 * * 1` UTC (= 8h Paris hiver, 9h Paris été) |
| **Endpoint** | `/api/cron/weekly-digest` |
| **Source** | Logs locaux (`site-analytics-log.jsonl` + `site-lead-log.jsonl`) |
| **Envoi via** | Resend (RESEND_API_KEY) |
| **From** | SKS Talents Suivi <g.kengue@skstalents.com> (= MAIL_FROM_EMAIL) |

## Contenu du mail

1. **Header** : "Rapport hebdomadaire SKS Talents — semaine du XX au YY"
2. **3 pills statut** : Vues ↑/↓, Leads ↑/↓, Conversions ↑/↓ (vs semaine précédente)
3. **6 KPI cards** (style Notion) :
   - Sessions (vs S-1)
   - Utilisateurs uniques (vs S-1)
   - Conversions (vs S-1)
   - **Leads (sales)** (vs S-1) ← métrique business clé
   - Clics CTA (vs S-1)
   - Taux de conversion form (succès / envois)
4. **Pages populaires** — top 5
5. **Top recherches chat** — ce que les visiteurs demandent
6. **Contenus manquants** — questions où l'IA n'a pas répondu (= sujets d'articles à créer)
7. **Leads récents** — top 5 avec email + page d'origine
8. **Plan d'action — cette semaine** — 6-8 actions générées automatiquement
9. **CTAs** : "Voir le dashboard complet" + "Suivi quotidien"

## Plan d'action — comment c'est généré

Les actions sont calculées automatiquement selon les data de la semaine :

| Si... | Alors action ajoutée |
|---|---|
| Trafic ↓ > 15% | "Investiguer la baisse — vérifier GSC + GA4" |
| Trafic ↑ > 25% | "Identifier la source de croissance et l'amplifier" |
| Content gaps ≥ 3 | "Créer N articles sur les sujets X" |
| Erreurs > 0 | "Investiguer les erreurs (chaque erreur = lead potentiel perdu)" |
| Leads ↓ vs S-1 | "Tester un nouveau CTA ou variante du formulaire" |
| Leads = 0 | "Action prioritaire : GSC + LinkedIn + relance réseau" |

**Actions toujours présentes** :
- Trustpilot : répondre aux nouveaux avis
- Notion : mettre à jour le suivi
- LinkedIn : planifier 1 RDV avec un dirigeant biotech / vétérinaire

## Tester l'email manuellement

Sans attendre lundi 8h :

```
https://www.skstalents.fr/api/cron/weekly-digest?token=<DASHBOARD_PRIVATE_TOKEN>
```

→ Renvoie un JSON `{"ok":true,"sent":true,"summary":{...}}` et envoie l'email.

## Modifier le destinataire ou le timing

| Action | Fichier |
|---|---|
| Changer le destinataire | `app/api/cron/weekly-digest/route.ts` constante `RECIPIENT` |
| Changer l'heure / le jour | `vercel.json` → champ `schedule` (cron syntax UTC) |
| Modifier le contenu (HTML) | `app/api/cron/weekly-digest/route.ts` fonction `buildHtmlEmail` |
| Modifier les actions auto | `app/api/cron/weekly-digest/route.ts` fonction `buildActions` |

## Variables d'environnement requises

| Variable | Rôle |
|---|---|
| `RESEND_API_KEY` | Pour envoyer l'email (déjà configuré ✅) |
| `MAIL_FROM_EMAIL` | Adresse expéditeur (déjà configuré ✅) |
| `DASHBOARD_PRIVATE_TOKEN` | Pour les liens dashboard dans le mail (déjà configuré ✅) |
| `CRON_SECRET` | (Optionnel) Auth supplémentaire entre Vercel Cron et l'endpoint |

## Limitations

- Sur Vercel Hobby, **2 cron max** par projet. Notre cron hebdo en utilise 1 → reste 1 dispo.
- Les data sont **calculées sur les logs locaux**. Sur Vercel, ces logs se réinitialisent à chaque deploy. Si tu déploies souvent, les KPIs hebdomadaires risquent d'être incomplets.
- **Solution** pour une persistance fiable : router les events vers Supabase (déjà presque prêt — `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` configurés).

## Désactiver l'email

```bash
# Supprime simplement vercel.json (ou le bloc "crons" dedans)
# Ou commente la ligne "schedule" dans vercel.json
```

L'endpoint `/api/cron/weekly-digest` reste en place et peut être appelé manuellement.
