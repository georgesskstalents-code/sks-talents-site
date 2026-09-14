import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";
import { legalEntity } from "@/data/legalEntity";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Cadre contractuel des prestations d'executive search, de RPO et de structuration RH de SKS Talents : commande, honoraires, garantie de remplacement, confidentialité.",
  alternates: { canonical: "https://www.skstalents.fr/legal/cgv" }
};

export default function CgvPage() {
  return (
    <LegalPageLayout
      title="Conditions générales de vente"
      description="Cadre contractuel des prestations d'executive search, de RPO et de structuration RH."
      updatedAt="2026-09-14"
      sections={[
        {
          title: "Champ d'application",
          body: (
            <p>
              Les présentes conditions s'appliquent à toutes les prestations réalisées par{" "}
              {legalEntity.legalName}, exerçant sous le nom commercial {legalEntity.tradeName} :
              recherche et approche directe de cadres et de dirigeants, RPO, et missions de
              structuration RH et de digitalisation des process. Elles prévalent sur les conditions
              d'achat du client, sauf accord écrit contraire.
            </p>
          )
        },
        {
          title: "Formation du contrat",
          body: (
            <>
              <p>
                Toute mission fait l'objet d'une lettre de mission signée précisant le périmètre du
                poste ou du chantier, le calendrier, les livrables, les honoraires et les modalités
                de facturation. La signature de cette lettre vaut acceptation des présentes
                conditions.
              </p>
              <p>
                La mission démarre après une réunion de cadrage. Le client s'engage à désigner un
                interlocuteur décisionnaire et à fournir les informations nécessaires à la bonne
                exécution de la prestation.
              </p>
            </>
          )
        },
        {
          title: "Honoraires et facturation",
          body: (
            <>
              <p>
                Les honoraires sont fixés dans la lettre de mission. Barème et assiette de calcul :
                [[A_FOURNIR: mode de calcul des honoraires, pourcentage ou forfait]].
              </p>
              <p>
                Échéancier de facturation : [[A_FOURNIR: répartition des acomptes et du solde]].
                Délai de paiement : [[A_FOURNIR: délai en jours à compter de la facture]].
              </p>
              <p>
                Tout retard de paiement entraîne de plein droit des pénalités au taux prévu à
                l'article L.441-10 du code de commerce, ainsi que l'indemnité forfaitaire de
                recouvrement de 40 euros prévue à l'article D.441-5.
              </p>
            </>
          )
        },
        {
          title: "Garantie de remplacement",
          body: (
            <>
              <p>
                Si la personne recrutée quitte le poste ou si le contrat prend fin à l'initiative de
                l'une ou l'autre des parties, {legalEntity.tradeName} effectue une recherche de
                remplacement offerte, sans honoraires supplémentaires.
              </p>
              <p>
                Cette garantie s'applique une fois par mission, dans un délai de [[A_FOURNIR: durée
                de la garantie à compter de la prise de poste]], sous réserve que les honoraires
                aient été intégralement réglés et que le périmètre du poste soit inchangé.
              </p>
              <p>
                Elle ne s'applique pas en cas de suppression du poste, de réorganisation, de
                modification substantielle du périmètre, ni de rupture liée à un fait imputable au
                client.
              </p>
            </>
          )
        },
        {
          title: "Obligation de moyens",
          body: (
            <p>
              {legalEntity.tradeName} est tenu à une obligation de moyens. L'engagement porté
              publiquement sur la première shortlist est un engagement de moyens, apprécié sur les
              missions dont le cadrage est complet et le périmètre stable.
            </p>
          )
        },
        {
          title: "Confidentialité et non-sollicitation",
          body: (
            <>
              <p>
                Chaque partie s'engage à préserver la confidentialité des informations échangées :
                organigrammes, grilles de rémunération, projets non publics, identité des candidats
                approchés.
              </p>
              <p>
                Le client s'interdit de communiquer à un tiers les dossiers de candidats présentés
                par {legalEntity.tradeName}. Toute embauche d'un.e candidat.e présenté.e, sur un
                autre poste ou par une autre entité du groupe du client, dans les douze mois suivant
                la présentation, donne lieu au règlement des honoraires prévus.
              </p>
            </>
          )
        },
        {
          title: "Protection des données",
          body: (
            <p>
              Les parties agissent chacune en qualité de responsable de traitement pour les données
              qu'elles collectent. Les traitements mis en oeuvre par {legalEntity.tradeName} sont
              décrits dans la{" "}
              <Link className="text-brand-teal underline" href="/legal/politique-confidentialite">
                politique de confidentialité
              </Link>
              . Les principes appliqués aux candidats figurent dans la{" "}
              <Link className="text-brand-teal underline" href="/legal/charte-recrutement">
                charte recrutement
              </Link>
              .
            </p>
          )
        },
        {
          title: "Résiliation",
          body: (
            <p>
              Chaque partie peut mettre fin à la mission par écrit moyennant un préavis de
              [[A_FOURNIR: durée du préavis]]. Les travaux engagés et les frais exposés jusqu'à la
              date effective de résiliation restent dus.
            </p>
          )
        },
        {
          title: "Droit applicable",
          body: (
            <p>
              Les présentes conditions sont soumises au droit français. En cas de litige, les parties
              rechercheront une solution amiable avant toute action. À défaut, compétence est
              attribuée aux tribunaux de Paris.
            </p>
          )
        }
      ]}
    />
  );
}
