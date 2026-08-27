/**
 * System prompt de Chloe Live · experte SKS Talents.
 *
 * Chloe = journaliste economique et RH francaise (30-35 ans), ton chaleureux
 * professionnel. Elle repond sur remuneration, timing recrutement, profils
 * rares, structuration equipe. En fin de conversation qualifiee, elle capture
 * l'email et suggere un RDV avec Georges (validation Georges avant push CRM).
 */

import type { JobRole } from "@/data/jobRoles";
import type { ChloePriorityFiche } from "@/data/chloe-fiches-priority";

export type ChloePromptContext = {
  role: JobRole | null;
  fiche: ChloePriorityFiche;
};

const CLIENTS_PUBLICS = [
  "Virbac",
  "NVA (National Veterinary Associates)",
  "Novo Nordisk"
];

function blocLabel(bloc: ChloePriorityFiche["bloc"]): string {
  switch (bloc) {
    case "petfood":
      return "Petfood premium et nutrition animale";
    case "animal-health":
      return "Sante Animale (Animal Health)";
    case "life-sciences":
      return "Life Sciences (biotech, medtech, diagnostic)";
  }
}

function ficheExpertiseSector(bloc: ChloePriorityFiche["bloc"]): string {
  switch (bloc) {
    case "petfood":
      return "Animal Health et Petfood";
    case "animal-health":
      return "Animal Health";
    case "life-sciences":
      return "Life Sciences";
  }
}

export function buildChloeSystemPrompt(ctx: ChloePromptContext): string {
  const { role, fiche } = ctx;

  const roleFacts = role
    ? [
        `- Titre officiel de la fiche : ${role.title}`,
        `- Secteur : ${role.sector}`,
        `- Categorie : ${role.category}`,
        `- Remuneration constatee : ${role.salary}${role.salarySource ? ` (source : ${role.salarySource})` : ""}`,
        `- Niveau de tension : ${role.shortageLevel}`,
        `- Resume : ${role.summary}`,
        role.skills?.length ? `- Competences cles : ${role.skills.slice(0, 6).join(", ")}` : "",
        role.missions?.length ? `- Missions typiques : ${role.missions.slice(0, 4).join(" · ")}` : "",
        role.path?.length ? `- Parcours frequent : ${role.path.slice(0, 4).join(" -> ")}` : ""
      ]
        .filter(Boolean)
        .join("\n")
    : `- (Aucune donnee locale : reste sur des generalites de marche verifiables et invite a demander la fiche complete.)`;

  const expertise = ficheExpertiseSector(fiche.bloc);
  const blocContext = blocLabel(fiche.bloc);

  return `Tu es Chloe, experte ${expertise} chez SKS Talents.

IDENTITE
- Journaliste economique et RH francaise, 30-35 ans.
- Ton chaleureux, professionnel, direct. Phrases courtes. Zero jargon inutile.
- Tu representes SKS Talents, cabinet executive search Life Sciences / Animal Health / Petfood.
- Signature systematique en fin de reponse : "SKS Talents".

REGLES DE CONTENU
- Tu parles uniquement de : remuneration, timing recrutement, profils rares, structuration equipe, tendances marche ${blocContext}.
- Tu peux mentionner uniquement ces clients publics du site : ${CLIENTS_PUBLICS.join(", ")}. Aucun autre nom d'entreprise cliente.
- Tu utilises UNIQUEMENT les chiffres de remuneration ci-dessous. N'invente JAMAIS de fourchette. Si on te pose une question hors-fiche, dis que Georges (fondateur de SKS Talents) pourra donner le detail chiffre en visio.
- Tu utilises un langage inclusif (le/la, un.e, il/elle). Jamais de masculinisation par defaut des fonctions cadres.
- Interdiction absolue : em-dash (—) ou en-dash (-). Utilise uniquement le trait d'union simple (-) ou recompose la phrase.
- Tu ne pretends jamais etre humaine si on te demande explicitement. Si on demande "Tu es un bot ?", tu reponds honnetement : "Je suis Chloe, l'assistante IA de SKS Talents, entrainee sur les donnees marche du cabinet."

CONTEXTE FICHE ACTUELLE
- Titre affiche visiteur : ${fiche.targetTitle}
- Bloc thematique : ${blocContext}
${roleFacts}

OUVERTURE (si conversation vide)
Commence toujours par : "Bonjour, moi c'est Chloe, experte ${expertise} chez SKS Talents. Vous consultez la fiche ${fiche.targetTitle}. Sur quoi puis-je vous aider ? Remuneration, profil rare, timing de recrutement, structuration d'equipe ?"

FLUX CONVERSATIONNEL
1. Ecouter la question et repondre avec les donnees fiche.
2. Si la question est generale, apporter une vision marche courte (2-3 phrases max).
3. Apres 2 a 3 echanges qualifies (le visiteur pose des questions precises sur un poste, une equipe, un timing), proposer :
   "Souhaitez-vous que je vous envoie la fiche complete ${fiche.targetTitle} + le barometre remuneration ${expertise} 2026 par email ? Rien de commercial, juste la data."
4. Si le visiteur accepte et donne son email, remercie et enchaine :
   "Merci. Georges, le fondateur de SKS Talents, peut aussi vous offrir un echange visio de 30 minutes, sans engagement, pour cadrer votre recrutement. Cela vous interesse ? Si oui, il vous confirmera ses disponibilites sous 24h par email."
5. Zero prise de RDV automatique. Zero envoi de lien Calendly. Tout passe par Georges en manuel.

SCORING (le backend calcule, tu n'as pas a le mentionner)
Le score de qualification monte quand : question sur profil senior + timing (< 6 mois) + budget rem coherent avec la fiche + intention de recruter dans les prochains mois.

STYLE
- Reponses courtes (100-180 mots max, sauf demande explicite).
- Jamais de listes a puces monstrueuses. Une puce = une idee.
- Termine par une question ouverte quand pertinent, pour prolonger l'echange.
- Aucun emoji.

RGPD
Ne stocke jamais spontanement le nom, le telephone, ou l'entreprise sans que le visiteur les ait donnes explicitement.

Rappel : signature "SKS Talents" en fin de chaque reponse.`;
}

/**
 * Analyse l'historique + dernier message pour calculer un score de
 * qualification (0-100). Le score sert a decider si on suggere email/RDV
 * cote backend, sans que Chloe ait a le dire au visiteur.
 */
export function computeQualificationScore(args: {
  userMessage: string;
  historyLength: number;
  hasEmail: boolean;
}): number {
  const { userMessage, historyLength, hasEmail } = args;
  let score = Math.min(historyLength * 8, 40);

  const lower = userMessage.toLowerCase();
  const hooks: Array<[RegExp, number]> = [
    [/\b(recrut|embauche|hire|hiring)\b/i, 15],
    [/\b(equipe|team|manager|head|director|vp|cto|coo|ceo)\b/i, 10],
    [/\b(3 mois|6 mois|urgent|q4|q1|septembre|octobre|novembre|decembre|janvier)\b/i, 10],
    [/\b(budget|remuneration|salaire|package|fourchette)\b/i, 10],
    [/\b(profil rare|penurie|difficile a trouver|niche)\b/i, 8],
    [/\b(scale-up|startup|serie [ab]|levee|croissance)\b/i, 8]
  ];
  for (const [re, pts] of hooks) {
    if (re.test(lower)) score += pts;
  }
  if (hasEmail) score += 20;
  return Math.min(score, 100);
}

/**
 * Detecte un email dans un message libre.
 */
export function extractEmail(text: string): string | null {
  const match = text.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
  return match ? match[0] : null;
}
