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
};

type LayoutProps = HeroProps & {
  children: ReactNode;
};

export function EditorialContentHero({
  badge,
  title,
  description,
  imageSrc = DEFAULT_HERO_IMAGE,
  imageAlt = "Réunion stratégique autour d'un sujet RH, marché ou organisationnel"
}: HeroProps) {
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
          <p className={styles.brandTagline}>Your Talents, Our Future</p>
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
      />
      <section className={styles.bodyShell}>
        <div className={styles.bodyInner}>
          <article className={styles.article}>
            <div className={styles.content}>{children}</div>
          </article>
        </div>
      </section>
    </>
  );
}
