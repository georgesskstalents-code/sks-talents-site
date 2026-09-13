import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";
import { legalEntity } from "@/data/legalEntity";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description:
    "Cadre d'usage du site skstalents.fr : accès aux contenus, comptes, propriété intellectuelle, responsabilités et droit applicable.",
  alternates: { canonical: "https://www.skstalents.fr/legal/cgu" }
};

export default function CguPage() {
  return (
    <LegalPageLayout
      title="Conditions générales d'utilisation"
      description="Les règles qui encadrent l'accès et l'usage du site skstalents.fr et de ses outils en ligne."
      updatedAt="2026-09-14"
      sections={[
        {
          title: "Objet",
          body: (
            <p>
              Les présentes conditions régissent l'accès et l'utilisation du site skstalents.fr,
              édité par {legalEntity.legalName}. Toute consultation du site vaut acceptation de ces
              conditions. Elles ne régissent pas les prestations commerciales, encadrées par les{" "}
              <Link className="text-brand-teal underline" href="/legal/cgv">
                conditions générales de vente
              </Link>
              .
            </p>
          )
        },
        {
          title: "Accès au site",
          body: (
            <>
              <p>
                Le site est accessible gratuitement. Les frais de connexion et d'équipement restent à
                votre charge. Nous pouvons interrompre l'accès pour maintenance, mise à jour ou pour
                des raisons de sécurité, sans préavis et sans indemnité.
              </p>
              <p>
                Certaines ressources, études et documents téléchargeables sont accessibles après
                renseignement d'une adresse email professionnelle.
              </p>
            </>
          )
        },
        {
          title: "Usage des outils en ligne",
          body: (
            <>
              <p>
                Le calculateur de salaire brut en net, le calculateur de coût d'un mauvais
                recrutement, le diagnostic de structuration RH, la scorecard dirigeant et les
                benchmarks salariaux produisent des estimations indicatives.
              </p>
              <p>
                Ces résultats reposent sur des hypothèses moyennes et sur les sources citées sur
                chaque page. Ils ne remplacent ni un bulletin de paie, ni un avis d'expert-comptable,
                ni un conseil juridique, et n'engagent pas {legalEntity.tradeName} sur une décision
                que vous prendriez sur leur base.
              </p>
            </>
          )
        },
        {
          title: "Engagements de l'utilisateur",
          body: (
            <>
              <p>Vous vous engagez à ne pas :</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>perturber le fonctionnement du site ou tenter d'en contourner les protections</li>
                <li>extraire massivement les contenus, notamment par aspiration automatisée</li>
                <li>transmettre des données fausses, injurieuses ou portant atteinte à des tiers</li>
                <li>utiliser les coordonnées présentes sur le site à des fins de prospection non sollicitée</li>
              </ul>
            </>
          )
        },
        {
          title: "Propriété intellectuelle",
          body: (
            <p>
              Les contenus du site sont protégés. Les conditions de reproduction et de citation sont
              détaillées dans les{" "}
              <Link className="text-brand-teal underline" href="/legal/mentions-legales">
                mentions légales
              </Link>
              .
            </p>
          )
        },
        {
          title: "Données personnelles",
          body: (
            <p>
              Le traitement de vos données est décrit dans la{" "}
              <Link className="text-brand-teal underline" href="/legal/politique-confidentialite">
                politique de confidentialité
              </Link>{" "}
              et la{" "}
              <Link className="text-brand-teal underline" href="/legal/politique-cookies">
                politique cookies
              </Link>
              .
            </p>
          )
        },
        {
          title: "Droit applicable",
          body: (
            <p>
              Les présentes conditions sont soumises au droit français. À défaut de résolution
              amiable, le litige sera porté devant les tribunaux compétents de Paris.
            </p>
          )
        }
      ]}
    />
  );
}
