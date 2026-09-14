import Image from "next/image";
import Link from "next/link";
import { LINKEDIN_PERSONAL_URL } from "@/lib/seo";
import { proof, proofLabels } from "@/data/proof";

/**
 * Bloc "Votre interlocuteur" affiche sur les pages sectorielles.
 * Remplace les avis candidats, qui restent sur la home.
 */
export default function SectorInterlocutor() {
  return (
    <section className="c-tp-section">
      <div className="c-container">
        <div className="c-tp-head">
          <div>
            <span className="c-eyebrow">Votre interlocuteur</span>
            <h2 className="c-h2">
              Un seul interlocuteur, <span className="c-italic">du brief à la prise de poste.</span>
            </h2>
            <p className="c-section-lede">
              Pas de chargé de recherche intermédiaire : la personne qui cadre la mission est celle
              qui vous présente les profils.
            </p>
          </div>
          <a className="c-link" href={LINKEDIN_PERSONAL_URL} target="_blank" rel="noopener noreferrer">
            Voir le profil LinkedIn →
          </a>
        </div>
        <div className="mt-8 grid gap-6 rounded-[28px] border border-brand-teal/12 bg-white/70 p-6 sm:p-8 lg:grid-cols-[200px_1fr] lg:items-start">
          <div className="relative h-[200px] w-[200px] overflow-hidden rounded-[24px]">
            <Image
              src="/images/georges-kengue.jpeg"
              alt="Georges Kengue, fondateur de SKS Talents"
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-display text-2xl text-brand-ink">Georges Kengue</p>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-teal">
                Fondateur
              </p>
            </div>
            <p className="text-base leading-8 text-brand-stone">
              Georges Kengue a construit SKS Talents après un master Responsable Ressources Humaines
              à l&apos;IGS Paris, un passage en multinationales puis plusieurs années dans un cabinet
              anglophone de chasse de talents. Cette trajectoire nourrit une lecture concrète des
              marchés scientifiques et techniques.
            </p>
            <ul className="space-y-2 text-sm leading-7 text-brand-stone">
              <li>{proof.placementsLabel} cadres sur des marchés spécialisés.</li>
              <li>{proof.firstShortlistLabel} pour une première shortlist sur les missions cadrées.</li>
              <li>{proofLabels.trustpilotSentence} publics sur Trustpilot.</li>
            </ul>
            <Link className="c-link" href="/team">
              Voir le parcours complet →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
