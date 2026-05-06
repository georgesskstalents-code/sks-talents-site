/**
 * Email templates pour outreach backlinks SKS Talents.
 *
 * Voix : directe, sans flagornerie, basée sur ce que SKS apporte concrètement
 * (audience CEO biotech, contenu éditorial, références placements). Toujours
 * proposer un échange de valeur, pas demander un lien gratuit.
 */

import type { BacklinkTarget, BacklinkTemplate } from "@/data/backlinkTargets";

const SIGNATURE = `Georges Kengue
Fondateur · SKS Talents
Executive Search Life Sciences & Santé animale
g.kengue@skstalents.fr · 128 rue la Boétie, 75008 Paris
Calendly 15 min : https://calendly.com/g-kengue/talentconsulting
LinkedIn : https://www.linkedin.com/in/georges-kengue-81988b36/`;

type TemplateFn = (target: BacklinkTarget) => { subject: string; body: string };

const ecosystemTemplate: TemplateFn = (t) => ({
  subject: `Partenariat ${t.name} × SKS Talents — exec search Life Sciences/Santé animale`,
  body: `Bonjour,

Je suis Georges Kengue, fondateur de SKS Talents — cabinet d'executive search exclusivement Life Sciences & Santé animale (biotech, diagnostic, medtech, vétérinaire, petfood). 8+ ans, 100+ placements, 4,5/5 Trustpilot.

Je me permets de vous écrire parce que ${t.name} couvre précisément le segment où nous opérons. Trois pistes que j'aimerais explorer avec vous :

1. **Adhésion / référencement membre** — figurer dans votre annuaire avec lien vers skstalents.fr (notre site centralise fiches métiers, benchmarks salaires Series A/B, études signature).

2. **Contribution éditoriale** — je peux écrire pour votre newsletter ou blog une tribune basée sur notre dataset (par exemple : "Recruter un dirigeant Series B en 2026 — les 3 erreurs qui coûtent 18 mois de retard"). Notre contenu se positionne déjà sur les requêtes long-tail biotech RH.

3. **Co-organisation événement** — je suis dispo pour intervenir à vos événements (j'enseigne déjà au Master Biology & Health Paris-Saclay) sur la structuration RH des biotech en croissance.

Auriez-vous 15 minutes cette semaine ou la prochaine ? Voici mon Calendly : https://calendly.com/g-kengue/talentconsulting

Merci pour votre temps,

${SIGNATURE}`
});

const fundTemplate: TemplateFn = (t) => ({
  subject: `${t.name} portfolio — partenaire RH SKS Talents pour vos sociétés Series A/B`,
  body: `Bonjour,

Georges Kengue, fondateur de SKS Talents. Cabinet d'executive search dédié Life Sciences & Santé animale (100+ placements, ~75% des dirigeants placés sont toujours en poste 6 ans plus tard).

Vos portcos en Series A/B sont précisément notre sweet spot : recruter le 1er CCO biotech, le COO scale-up vétérinaire, le CFO post-Series B medtech. Nous avons publié sur skstalents.fr un répertoire fonds santé qui mentionne ${t.name} — je serais ravi d'aller plus loin :

- **Mention partenaire RH** sur votre page écosystème ou portfolio support
- **Sessions de cadrage** avec les CEOs de vos portcos en chasse (gratuit, sur demande)
- **Benchmarks salaires** Series A/B mis à jour trimestriellement, accessibles à votre équipe

15 minutes pour en discuter ? https://calendly.com/g-kengue/talentconsulting

${SIGNATURE}`
});

const mediaTemplate: TemplateFn = (t) => ({
  subject: `Tribune ${t.name} — recruter dirigeant biotech 2026 (data SKS Talents)`,
  body: `Bonjour,

Georges Kengue, fondateur de SKS Talents — executive search Life Sciences & Santé animale (8+ ans, 100+ placements en biotech/medtech/diagnostic/vétérinaire/petfood).

Je vous propose une tribune éditoriale exclusive basée sur notre dataset interne. Quelques angles qui pourraient intéresser votre audience :

1. **"Les 3 erreurs qui coûtent 18 mois à un CEO biotech en Series B"** — enseignements de 100+ mandats
2. **"Pénurie vétérinaire 2026 — pourquoi les groupements paient 30% au-dessus du marché"**
3. **"COMEX biotech Series A → C : où chasser, comment qualifier, combien payer"** (avec benchmarks salaires)
4. **"IA dans le recrutement Life Sciences : ce qui marche vraiment, ce qui rate"** (cas concrets d'agents IA chez nos clients)

Contenu offert, pas de demande de paiement. En échange : lien dofollow vers skstalents.fr et mention auteur.

Quel angle vous parle le plus ? Je peux vous envoyer un draft sous 7 jours.

${SIGNATURE}`
});

const academicTemplate: TemplateFn = (t) => ({
  subject: `${t.name} — partenariat carrière SKS Talents (intervention + débouchés Life Sciences)`,
  body: `Bonjour,

Georges Kengue — fondateur de SKS Talents, cabinet executive search Life Sciences & Santé animale. J'interviens déjà au Master Biology & Health de Paris-Saclay sur les parcours carrière biotech.

Je vous écris parce que vos étudiants sont les futurs cadres et dirigeants que nos clients (biotech, medtech, vétérinaire premium) cherchent à recruter. Je propose 3 modes de partenariat :

1. **Conférence-atelier annuelle** — "Carrière Life Sciences : du master à la direction COMEX" (gratuit, 2h)
2. **Mentorat alumni** — accompagnement de 5-10 jeunes diplômés/an sur leur premier poste
3. **Page partenaire carrière** sur votre site — figurer parmi les recruteurs partenaires avec lien vers nos fiches métiers et benchmarks salaires (skstalents.fr/job-roles)

Aucune contrepartie financière demandée. Échange de valeur : visibilité chez SKS pour vos diplômés, accompagnement RH-carrière pour vous.

15 minutes pour en parler ? https://calendly.com/g-kengue/talentconsulting

${SIGNATURE}`
});

const directoryTemplate: TemplateFn = (t) => ({
  subject: `Inscription annuaire ${t.name} — SKS Talents (executive search Life Sciences)`,
  body: `Bonjour,

Je souhaite inscrire SKS Talents dans votre annuaire. Voici les éléments à publier :

**Nom :** SKS Talents
**Catégorie :** Executive Search · Cabinet de recrutement spécialisé
**Spécialité :** Life Sciences & Santé animale (biotech, diagnostic, medtech, vétérinaire, petfood)
**Site web :** https://www.skstalents.fr
**Adresse :** 128 rue la Boétie, 75008 Paris
**Contact :** Georges Kengue, fondateur — g.kengue@skstalents.fr
**Description courte (160 caractères) :** Cabinet d'executive search dédié Life Sciences & Santé animale. Recrutement Série A/B, scale-up. 100+ placements, 4,5/5 Trustpilot.
**Description longue :** SKS Talents accompagne les dirigeants biotech, medtech, diagnostic, vétérinaire et petfood premium qui doivent recruter leur COMEX vite et juste — sans dégrader la qualité. Méthode lucide en 4 étapes (cadrage → lecture marché → shortlist en 10 jours → sécurisation post-signature). Membre des écosystèmes France Biotech, Medicen, Lyonbiopôle.

Logo et autres assets disponibles sur demande.

Merci d'avance,

${SIGNATURE}`
});

const TEMPLATES: Record<BacklinkTemplate, TemplateFn> = {
  ecosystem: ecosystemTemplate,
  fund: fundTemplate,
  media: mediaTemplate,
  academic: academicTemplate,
  directory: directoryTemplate
};

export function generateBacklinkEmail(target: BacklinkTarget): { subject: string; body: string } {
  return TEMPLATES[target.template](target);
}
