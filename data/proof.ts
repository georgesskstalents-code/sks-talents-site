/**
 * Source de verite unique des chiffres de preuve publies sur le site.
 *
 * Regle : aucune page, aucune meta et aucun JSON-LD ne doit ecrire un de ces
 * chiffres en dur. Tout passe par cet objet. Une seule valeur a changer ici
 * met a jour la home, les landings, les metas et les donnees structurees.
 *
 * Verifications a l'origine des valeurs (audit du 14 septembre 2026) :
 *  - Trustpilot : fr.trustpilot.com/review/skstalents.fr, releve le 14/09/2026
 *  - Identite legale : annuaire-entreprises.data.gouv.fr, SIREN 919 079 392
 */
export const proof = {
  /** Annees d'expertise du marche revendiquees publiquement. */
  experienceYears: 8,
  /** Immatriculation de la SAS au registre du commerce (source INSEE). */
  legalFoundingDate: "2022-09-07",

  trustpilotRating: 4.6,
  /** Format francais pour l'affichage : 4,6 */
  trustpilotRatingLabel: "4,6",
  trustpilotCount: 17,
  trustpilotUrl: "https://fr.trustpilot.com/review/skstalents.fr",

  /** Premiere shortlist : engagement de moyen sur missions cadrees. */
  firstShortlistDays: 10,
  firstShortlistLabel: "10 jours ouvres",
  /** De l'intake a la signature. */
  intakeToSignature: "15 jours a 1 mois selon le projet",

  /**
   * Garantie de remplacement : une recherche de remplacement offerte, dans les
   * conditions prevues aux CGV. Pas de duree affichee tant que les CGV ne la
   * fixent pas.
   */
  guaranteeLabel: "Une recherche de remplacement offerte",
  guaranteeDetail: "Dans les conditions prevues aux conditions generales de vente.",

  placementsLabel: "100+ placements",
  retention5y: 75,
  retention5yLabel: "75 % de retention a 5 ans"
} as const;

/** Libelles derives, pour eviter de recomposer les memes chaines partout. */
export const proofLabels = {
  experience: `${proof.experienceYears} ans d'expertise`,
  trustpilot: `${proof.trustpilotRatingLabel}/5 Trustpilot`,
  trustpilotWithCount: `${proof.trustpilotRatingLabel}/5 sur ${proof.trustpilotCount} avis`,
  trustpilotSentence: `${proof.trustpilotRatingLabel}/5 sur Trustpilot, ${proof.trustpilotCount} avis`
} as const;
