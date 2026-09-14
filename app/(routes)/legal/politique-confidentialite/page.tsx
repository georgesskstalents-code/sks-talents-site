import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, { LegalRow } from "@/components/LegalPageLayout";
import { legalEntity } from "@/data/legalEntity";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Finalités, bases légales, durées de conservation, destinataires et droits RGPD sur les données collectées via skstalents.fr.",
  alternates: { canonical: "https://www.skstalents.fr/legal/politique-confidentialite" }
};

const treatments = [
  {
    purpose: "Demande de contact, de rappel et prise de rendez-vous",
    data: "Nom, prénom, email professionnel, société, fonction, téléphone si vous le renseignez, message",
    basis: "Mesures précontractuelles prises à votre demande (art. 6.1.b RGPD)",
    retention: "3 ans à compter du dernier contact"
  },
  {
    purpose: "Diagnostic structuration RH, scorecard dirigeant et simulateurs",
    data: "Réponses au questionnaire, email, société, fonction",
    basis: "Mesures précontractuelles prises à votre demande (art. 6.1.b RGPD)",
    retention: "3 ans à compter du dernier contact"
  },
  {
    purpose: "Candidatures et mise en relation avec nos clients",
    data: "Identité, coordonnées, parcours professionnel, CV et éléments que vous transmettez",
    basis: "Mesures précontractuelles prises à votre demande (art. 6.1.b RGPD)",
    retention: "2 ans à compter du dernier échange, sauf accord pour une conservation plus longue"
  },
  {
    purpose: "Newsletter, ressources téléchargeables et alertes",
    data: "Email, prénom, société",
    basis: "Consentement (art. 6.1.a RGPD), retirable à tout moment",
    retention: "Jusqu'au retrait du consentement, puis 3 ans de preuve du retrait"
  },
  {
    purpose: "Mesure d'audience et amélioration du site",
    data: "Pages consultées, source de visite, données techniques agrégées",
    basis: "Consentement pour les traceurs non essentiels (art. 82 loi Informatique et Libertés)",
    retention: "13 mois maximum pour les traceurs, 25 mois pour les statistiques agrégées"
  }
];

const processors = [
  ["Vercel Inc.", "Hébergement du site et journaux techniques", "États-Unis, encadré par les clauses contractuelles types"],
  ["Supabase", "Base de données des demandes reçues via le site", "Union européenne"],
  ["Resend", "Envoi des emails transactionnels et de la newsletter", "Union européenne / États-Unis"],
  ["Calendly", "Prise de rendez-vous", "États-Unis, encadré par les clauses contractuelles types"],
  ["Senja", "Affichage des témoignages publiés", "Traitement limité aux contenus publics"],
  ["Trustpilot", "Affichage des avis publics", "Union européenne"],
  ["Vimeo", "Lecture des vidéos intégrées", "États-Unis, encadré par les clauses contractuelles types"],
  ["Plausible Analytics", "Mesure d'audience", "Union européenne"]
];

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPageLayout
      title="Politique de confidentialité"
      description="Ce que nous collectons, pourquoi, pendant combien de temps, avec qui nous le partageons et comment exercer vos droits."
      updatedAt="2026-09-14"
      sections={[
        {
          title: "Responsable de traitement",
          body: (
            <dl>
              <LegalRow label="Responsable" value={`${legalEntity.legalName} (${legalEntity.tradeName})`} />
              <LegalRow label="Siège" value={legalEntity.address} />
              <LegalRow
                label="Contact"
                value={
                  <a className="text-brand-teal underline" href={`mailto:${legalEntity.contactEmail}`}>
                    {legalEntity.contactEmail}
                  </a>
                }
              />
            </dl>
          )
        },
        {
          title: "Traitements mis en oeuvre",
          body: (
            <div className="space-y-6">
              {treatments.map((item) => (
                <div key={item.purpose} className="rounded-[24px] border border-brand-teal/12 bg-brand-mint/25 p-5">
                  <p className="font-semibold text-brand-ink">{item.purpose}</p>
                  <dl className="mt-3">
                    <LegalRow label="Données" value={item.data} />
                    <LegalRow label="Base légale" value={item.basis} />
                    <LegalRow label="Conservation" value={item.retention} />
                  </dl>
                </div>
              ))}
            </div>
          )
        },
        {
          title: "Destinataires et sous-traitants",
          body: (
            <>
              <p>
                Vos données sont accessibles aux seules personnes de {legalEntity.tradeName} qui en ont
                besoin pour traiter votre demande. Dans le cadre d'une mission de recrutement, le
                dossier d'un.e candidat.e n'est transmis à une entreprise cliente qu'après son accord
                explicite.
              </p>
              <p>Nous faisons appel aux prestataires suivants :</p>
              <dl>
                {processors.map(([name, role, location]) => (
                  <LegalRow key={name} label={name} value={`${role} · ${location}`} />
                ))}
              </dl>
              <p>Nous ne vendons ni ne louons vos données personnelles.</p>
            </>
          )
        },
        {
          title: "Vos droits",
          body: (
            <>
              <p>
                Conformément aux articles 15 à 22 du RGPD, vous disposez d'un droit d'accès, de
                rectification, d'effacement, de limitation, d'opposition et de portabilité de vos
                données, ainsi que du droit de définir des directives relatives à leur sort après
                votre décès.
              </p>
              <p>
                Pour exercer ces droits, écrivez à{" "}
                <a className="text-brand-teal underline" href={`mailto:${legalEntity.contactEmail}`}>
                  {legalEntity.contactEmail}
                </a>
                . Nous répondons dans un délai d'un mois. Si la réponse ne vous satisfait pas, vous
                pouvez saisir la CNIL, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.
              </p>
            </>
          )
        },
        {
          title: "Cookies et traceurs",
          body: (
            <p>
              Le détail des traceurs déposés et la gestion de votre consentement figurent dans notre{" "}
              <Link className="text-brand-teal underline" href="/legal/politique-cookies">
                politique cookies
              </Link>
              .
            </p>
          )
        }
      ]}
    />
  );
}
