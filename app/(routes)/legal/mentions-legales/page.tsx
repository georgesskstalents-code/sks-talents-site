import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, { LegalRow } from "@/components/LegalPageLayout";
import { legalEntity } from "@/data/legalEntity";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Éditeur, hébergeur, propriété intellectuelle et données personnelles du site skstalents.fr, édité par SPECIFIC KEY SKILLS TALENTS.",
  alternates: { canonical: "https://www.skstalents.fr/legal/mentions-legales" }
};

export default function MentionsLegalesPage() {
  return (
    <LegalPageLayout
      title="Mentions légales"
      description="Informations relatives à l'éditeur du site, à son hébergeur, à la propriété intellectuelle et au traitement des données personnelles."
      updatedAt="2026-09-14"
      sections={[
        {
          title: "Éditeur du site",
          body: (
            <dl>
              <LegalRow label="Dénomination sociale" value={legalEntity.legalName} />
              <LegalRow label="Nom commercial" value={legalEntity.tradeName} />
              <LegalRow label="Forme juridique" value={legalEntity.legalForm} />
              <LegalRow label="Capital social" value={legalEntity.shareCapital} />
              <LegalRow label="Siège social" value={legalEntity.address} />
              <LegalRow label="SIREN" value={legalEntity.siren} />
              <LegalRow label="SIRET (siège)" value={legalEntity.siret} />
              <LegalRow label="Immatriculation" value={`${legalEntity.rcs}, immatriculée le ${legalEntity.registrationDate}`} />
              <LegalRow label="Numéro de TVA intracommunautaire" value={legalEntity.vatNumber} />
              <LegalRow label="Code APE" value={`${legalEntity.apeCode} · ${legalEntity.apeLabel}`} />
              <LegalRow label="Directeur de la publication" value={legalEntity.publicationDirector} />
              <LegalRow
                label="Contact"
                value={<a className="text-brand-teal underline" href={`mailto:${legalEntity.contactEmail}`}>{legalEntity.contactEmail}</a>}
              />
            </dl>
          )
        },
        {
          title: "Hébergeur",
          body: (
            <dl>
              <LegalRow label="Hébergeur" value={legalEntity.host.name} />
              <LegalRow label="Adresse" value={legalEntity.host.address} />
              <LegalRow
                label="Site"
                value={
                  <a className="text-brand-teal underline" href={legalEntity.host.url} target="_blank" rel="noreferrer">
                    {legalEntity.host.url}
                  </a>
                }
              />
            </dl>
          )
        },
        {
          title: "Propriété intellectuelle",
          body: (
            <>
              <p>
                L'ensemble des contenus publiés sur skstalents.fr, textes, études, benchmarks
                salariaux, fiches métiers, visuels, logos, marques et éléments de charte graphique,
                est protégé par le droit de la propriété intellectuelle et demeure la propriété
                exclusive de {legalEntity.legalName}, sauf mention contraire explicite.
              </p>
              <p>
                Toute reproduction, représentation, adaptation ou exploitation, totale ou partielle,
                sur quelque support que ce soit, est interdite sans autorisation écrite préalable.
                La citation d'un extrait reste possible à condition de mentionner la source et
                d'inclure un lien vers la page d'origine.
              </p>
              <p>
                Les marques et logos de tiers apparaissant sur le site appartiennent à leurs
                détenteurs respectifs et sont utilisés à des fins d'identification.
              </p>
            </>
          )
        },
        {
          title: "Données personnelles",
          body: (
            <>
              <p>
                Les traitements de données personnelles mis en oeuvre depuis ce site, formulaires de
                contact, diagnostic, candidatures et inscription à la newsletter, sont décrits dans
                notre{" "}
                <Link className="text-brand-teal underline" href="/legal/politique-confidentialite">
                  politique de confidentialité
                </Link>
                , qui précise les finalités, les bases légales, les durées de conservation et les
                modalités d'exercice de vos droits.
              </p>
              <p>
                La gestion des traceurs et de votre consentement est détaillée dans notre{" "}
                <Link className="text-brand-teal underline" href="/legal/politique-cookies">
                  politique cookies
                </Link>
                .
              </p>
            </>
          )
        },
        {
          title: "Responsabilité",
          body: (
            <>
              <p>
                Les informations publiées sur ce site, notamment les fourchettes de rémunération, les
                benchmarks et les analyses de marché, sont fournies à titre indicatif. Elles
                s'appuient sur des sources citées et sur nos observations, et ne constituent ni un
                conseil juridique, ni un conseil en investissement, ni une garantie de résultat.
              </p>
              <p>
                {legalEntity.tradeName} met tout en oeuvre pour assurer l'exactitude et la mise à jour
                des informations diffusées, sans pouvoir en garantir l'exhaustivité. Les liens vers
                des sites tiers sont proposés à titre de ressource et n'engagent pas notre
                responsabilité quant à leur contenu.
              </p>
            </>
          )
        },
        {
          title: "Signaler un contenu",
          body: (
            <p>
              Pour toute demande de rectification, de retrait de contenu ou question relative à ces
              mentions légales, écrivez à{" "}
              <a className="text-brand-teal underline" href={`mailto:${legalEntity.contactEmail}`}>
                {legalEntity.contactEmail}
              </a>
              . Nous répondons sous 30 jours.
            </p>
          )
        }
      ]}
    />
  );
}
