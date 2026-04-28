import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Test Article Hero V1",
  description:
    "Version test isolée d'un header d'article premium pour valider la hiérarchie visuelle.",
  robots: {
    index: false,
    follow: false
  }
};

export default function TestArticleHeroPage() {
  return (
    <section className={styles.page}>
      <div className={styles.shell}>
        <article className={styles.hero} aria-labelledby="test-article-hero-title">
          <div className={styles.imageFrame}>
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80"
              alt="Réunion autour d'un sujet RH et qualité de vie au travail"
              className={styles.image}
            />
          </div>

          <div className={styles.badgeWrap}>
            <span className={styles.badge}>QVCT</span>
          </div>

          <div className={styles.brandLockup}>
            <div className={styles.brandLogoShell}>
              <Image
                src="/brand/logo-sks-talents-signature.svg"
                alt="SKS TALENTS"
                width={112}
                height={35}
                className={styles.brandLogo}
                priority
              />
            </div>
            <p className={styles.brandTagline}>Your Talents, Our Future</p>
            <p className={styles.brandSignature}>SKS TALENTS</p>
          </div>

          <h1 id="test-article-hero-title" className={styles.title}>
            Mesurer la QVCT sans multiplier les enquêtes : quels indicateurs suivre
            efficacement ?
          </h1>

          <p className={styles.subtitle}>
            Identifiez les indicateurs clés pour piloter la qualité de vie au travail
            sans complexifier vos processus RH.
          </p>
        </article>

        <article className={styles.article} aria-label="Article QVCT de démonstration">
          <p className={styles.intro}>
            Mesurer la QVCT ne veut pas dire lancer de nouvelles enquêtes tous les mois.
            Dans beaucoup d&apos;entreprises, le vrai sujet n&apos;est pas le manque de
            données, mais le manque de lecture utile. Les DRH et dirigeants ont souvent
            déjà sous la main des signaux fiables. Encore faut-il savoir lesquels suivre,
            comment les lire, et à quel moment ils doivent déclencher une action.
          </p>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Quels indicateurs suivre en priorité pour piloter la QVCT ?
            </h2>
            <p className={styles.paragraph}>
              Un pilotage efficace repose sur un nombre limité d&apos;indicateurs, lus
              régulièrement et comparés dans le temps. L&apos;objectif n&apos;est pas de tout
              mesurer, mais de capter rapidement les signaux qui racontent le climat
              social, la charge réelle et la capacité des équipes à durer.
            </p>
            <ul className={styles.list}>
              <li>
                Le taux d&apos;absentéisme, pour repérer une fatigue diffuse, un désengagement
                ou une tension organisationnelle.
              </li>
              <li>
                Le turnover volontaire, surtout sur les profils critiques ou les équipes
                managériales.
              </li>
              <li>
                Le niveau d&apos;engagement managérial, mesuré à travers les entretiens,
                feedbacks et signaux de terrain.
              </li>
              <li>
                Les accidents, incidents ou remontées liées à la charge, à la pression ou
                à l&apos;organisation.
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Pourquoi multiplier les enquêtes est souvent contre-productif
            </h2>
            <p className={styles.paragraph}>
              Trop de questionnaires fatiguent les équipes et produisent parfois une
              illusion de pilotage. On interroge, on collecte, mais on agit peu. À
              l&apos;inverse, une lecture resserrée des indicateurs existants, complétée par
              quelques points qualitatifs avec les managers, donne souvent une vision plus
              utile et plus actionnable.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Comment lire les signaux sans alourdir les processus RH ?
            </h2>
            <p className={styles.paragraph}>
              Le bon niveau de pilotage repose sur un rythme simple : un tableau resserré,
              une lecture mensuelle et un arbitrage clair sur ce qui mérite une action. La
              QVCT devient alors un sujet de gouvernance opérationnelle, pas un chantier
              administratif parallèle.
            </p>
            <ul className={styles.list}>
              <li>Choisir 4 à 6 indicateurs maximum.</li>
              <li>Les relier à des populations ou équipes sensibles.</li>
              <li>Comparer les évolutions, pas seulement les niveaux bruts.</li>
              <li>
                Croiser les chiffres avec une lecture managériale et des cas concrets.
              </li>
            </ul>
          </section>

          <div className={styles.callout}>
            <h3 className={styles.calloutTitle}>
              Ce que montre cette V1 de l&apos;article
            </h3>
            <p className={styles.calloutText}>
              Un hero plus lisible, une vraie hiérarchie visuelle et un corps d&apos;article
              rédigé simplement, sans surcharge graphique. Si cette base vous plaît, on
              peut ensuite la décliner avec une mise en page plus éditoriale ou plus
              premium selon le niveau de sophistication souhaité.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
