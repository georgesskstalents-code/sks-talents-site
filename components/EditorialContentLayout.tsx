import Image from "next/image";
import type { ReactNode } from "react";
import { DEFAULT_HERO_IMAGE, getEditorialHeroImage } from "@/lib/editorialHeroImage";
import styles from "./EditorialContentLayout.module.css";

export { getEditorialHeroImage };

type HeroProps = {
  badge: string;
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  /**
   * "typographic" supprime l'image de couverture de la page et laisse la
   * typographie porter le hero. Utilise par le blog : la couverture generee
   * contient deja le titre, l'afficher au-dessus du titre HTML le repetait
   * deux fois. L'image reste utilisee comme visuel de partage social.
   */
  variant?: "image" | "typographic";
  /** Surtitre affiche au-dessus du titre, sur sa propre ligne. */
  overline?: string;
  /** Ligne de contexte sous le titre : auteur, date, temps de lecture. */
  meta?: string[];
  /** Colonne laterale, utilisee par le blog pour le sommaire cliquable. */
  sidebar?: ReactNode;
};

type LayoutProps = HeroProps & {
  children: ReactNode;
};

export function EditorialContentHero({
  badge,
  title,
  description,
  imageSrc = DEFAULT_HERO_IMAGE,
  imageAlt = "Réunion stratégique autour d'un sujet RH, marché ou organisationnel",
  variant = "image",
  overline,
  meta = []
}: HeroProps) {
  if (variant === "typographic") {
    return (
      <section className={styles.typoHero}>
        <div className={styles.typoShell}>
          <p className={styles.typoBadge}>{badge}</p>
          {overline ? <p className={styles.typoOverline}>{overline}</p> : null}
          <h1 className={styles.typoTitle}>{title}</h1>
          <hr className={styles.typoRule} />
          {description ? <p className={styles.typoStandfirst}>{description}</p> : null}
          {meta.length ? (
            <div className={styles.typoMeta}>
              {meta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  const isArbitraryRemoteImage =
    /^https?:\/\//.test(imageSrc) &&
    !imageSrc.includes("images.unsplash.com") &&
    !imageSrc.includes("upload.wikimedia.org");

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroShell}>
        <div className={styles.imageFrame}>
          {isArbitraryRemoteImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt={imageAlt}
              className={styles.image}
            />
          ) : (
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1600}
              height={900}
              className={styles.image}
              priority
              unoptimized={imageSrc.includes("upload.wikimedia.org")}
            />
          )}
        </div>

        <div className={styles.badgeWrap}>
          <span className={styles.badge}>{badge}</span>
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
          <p className={styles.brandTagline}>Your Talent · Our Future</p>
          <p className={styles.brandSignature}>SKS TALENTS</p>
        </div>

        <h1 className={styles.title}>{title}</h1>
        {description ? <p className={styles.subtitle}>{description}</p> : null}
      </div>
    </section>
  );
}

export default function EditorialContentLayout({
  badge,
  title,
  description,
  imageSrc,
  imageAlt,
  variant,
  overline,
  meta,
  sidebar,
  children
}: LayoutProps) {
  return (
    <>
      <EditorialContentHero
        badge={badge}
        title={title}
        description={description}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        variant={variant}
        overline={overline}
        meta={meta}
      />
      <section className={styles.bodyShell}>
        <div className={sidebar ? styles.bodyWithAside : styles.bodyInner}>
          {sidebar ? <aside className={styles.aside}>{sidebar}</aside> : null}
          <article className={sidebar ? styles.articleFlat : styles.article}>
            <div className={styles.content}>{children}</div>
          </article>
        </div>
      </section>
    </>
  );
}
