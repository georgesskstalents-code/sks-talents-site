import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";
import { legalEntity } from "@/data/legalEntity";

export const metadata: Metadata = {
  title: "Charte recrutement",
  description:
    "Non-discrimination, confidentialité, transparence et respect des candidats : les engagements de SKS Talents sur chaque mission.",
  alternates: { canonical: "https://www.skstalents.fr/legal/charte-recrutement" }
};

export default function CharteRecrutementPage() {
  return (
    <LegalPageLayout
      title="Charte recrutement"
      description="Les engagements que nous tenons vis-à-vis des candidats et des entreprises sur chaque mission."
      updatedAt="2026-09-14"
      sections={[
        {
          title: "Non-discrimination",
          body: (
            <>
              <p>
                {legalEntity.tradeName} évalue les candidatures sur les seuls critères de compétence,
                d'expérience et d'adéquation au poste. Aucune décision n'est prise sur un critère
                prohibé par l'article L.1132-1 du code du travail, notamment l'origine, le sexe, la
                situation de famille, la grossesse, l'apparence physique, l'état de santé, le
                handicap, l'âge, les opinions politiques, les convictions religieuses ou
                l'orientation sexuelle.
              </p>
              <p>
                Si un client formule une demande contraire à ce principe, nous la refusons et nous
                l'expliquons. Nous préférons perdre un mandat que d'y déroger.
              </p>
            </>
          )
        },
        {
          title: "Confidentialité des candidatures",
          body: (
            <>
              <p>
                Une candidature ne quitte jamais notre cabinet sans l'accord explicite de la personne
                concernée. Nous ne transmettons ni CV, ni coordonnées, ni éléments de rémunération à
                une entreprise avant cet accord.
              </p>
              <p>
                Nous n'informons pas l'employeur actuel d'un.e candidat.e, et nous ne divulguons pas
                l'identité de nos clients avant d'avoir vérifié l'intérêt réel de la personne
                approchée.
              </p>
            </>
          )
        },
        {
          title: "Transparence de l'information",
          body: (
            <>
              <p>Avant tout entretien, nous communiquons à chaque candidat.e :</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>le contexte réel du poste, y compris ses difficultés</li>
                <li>la fourchette de rémunération envisagée</li>
                <li>les étapes du processus et les personnes rencontrées</li>
                <li>le calendrier prévisionnel de décision</li>
              </ul>
            </>
          )
        },
        {
          title: "Retour à chaque candidat",
          body: (
            <p>
              Toute personne rencontrée en entretien reçoit une réponse motivée, y compris en cas
              d'issue négative. Une candidature n'est jamais laissée sans réponse.
            </p>
          )
        },
        {
          title: "Vérifications et prises de références",
          body: (
            <p>
              Les prises de références ne sont réalisées qu'avec l'accord préalable du/de la
              candidat.e, auprès des personnes qu'il ou elle désigne. Nous ne contactons pas
              l'employeur en cours sans autorisation expresse.
            </p>
          )
        },
        {
          title: "Traitement des données des candidats",
          body: (
            <p>
              Les données de candidature sont conservées deux ans à compter du dernier échange, sauf
              accord pour une durée plus longue. Les modalités d'exercice de vos droits figurent dans
              la{" "}
              <Link className="text-brand-teal underline" href="/legal/politique-confidentialite">
                politique de confidentialité
              </Link>
              .
            </p>
          )
        },
        {
          title: "Signaler un manquement",
          body: (
            <p>
              Si vous estimez qu'un de ces engagements n'a pas été tenu, écrivez à{" "}
              <a className="text-brand-teal underline" href={`mailto:${legalEntity.contactEmail}`}>
                {legalEntity.contactEmail}
              </a>
              . Chaque signalement fait l'objet d'une réponse.
            </p>
          )
        }
      ]}
    />
  );
}
