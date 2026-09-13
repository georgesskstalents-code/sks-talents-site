/**
 * Identite legale publiee dans les mentions legales et les pages juridiques.
 *
 * Source : annuaire-entreprises.data.gouv.fr / base INSEE, SIREN 919 079 392,
 * consulte le 14 septembre 2026. Hebergeur releve dans la politique de
 * confidentialite publiee par Vercel.
 *
 * Ne rien ajouter ici sans source officielle.
 */
export const legalEntity = {
  legalName: "SPECIFIC KEY SKILLS TALENTS",
  tradeName: "SKS TALENTS",
  legalForm: "Société par actions simplifiée (SAS)",
  /** Non publie par l'INSEE, a completer depuis les statuts. */
  shareCapital: "[[A_FOURNIR: montant du capital social]]",
  siren: "919 079 392",
  siret: "919 079 392 00016",
  vatNumber: "FR93919079392",
  rcs: "RCS Paris 919 079 392",
  registrationDate: "7 septembre 2022",
  apeCode: "70.22Z",
  apeLabel: "Conseil pour les affaires et autres conseils de gestion",
  address: "128, rue la Boétie, 75008 Paris, France",
  publicationDirector: "Georges Kengue, Président",
  contactEmail: "g.kengue@skstalents.fr",
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis",
    url: "https://vercel.com"
  }
} as const;
