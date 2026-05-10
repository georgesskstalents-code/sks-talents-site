"use client";

import { Fragment, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HeroVideoCard from "@/components/HeroVideoCard";
import ResourceLogo from "@/components/ResourceLogo";
import type {
  SectorLandingMetric,
  SectorLandingPage as SectorLandingPageConfig
} from "@/data/sectorLandingPages";
import { trackSiteTelemetry } from "@/lib/siteTelemetryClient";
import styles from "./SectorLandingPage.module.css";

// Soft-cut: hide secondary sections that overlap with hero / problem / services / how / proof.
// Set to true to restore the full landing experience with 9 sections.
const SHOW_FULL_LANDING_BLOCKS = false;

type Props = {
  config: SectorLandingPageConfig;
};

function easeOutCubic(progress: number) {
  return 1 - (1 - progress) ** 3;
}

function parseMetricValue(value: string) {
  const match = value.match(/^(.*?)(\d+)(\+?)(.*)$/);

  if (!match) {
    return null;
  }

  return {
    prefix: match[1],
    numeric: Number(match[2]),
    plus: match[3],
    suffix: match[4]
  };
}

function useInViewOnce<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target || inView) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          setInView(true);
          observer.disconnect();
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
        ...options
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [inView, options]);

  return [ref, inView] as const;
}

function AnimatedMetricValue({ value, active }: { value: string; active: boolean }) {
  const [displayValue, setDisplayValue] = useState(value);
  const parsed = useMemo(() => parseMetricValue(value), [value]);

  useEffect(() => {
    if (!parsed || !active) {
      setDisplayValue(value);
      return undefined;
    }

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplayValue(value);
      return undefined;
    }

    const duration = parsed.numeric > 90 ? 1800 : 1400;
    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.max(0, Math.round(parsed.numeric * eased));
      setDisplayValue(`${parsed.prefix}${current}${parsed.plus}${parsed.suffix}`);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [active, parsed, value]);

  return <>{displayValue}</>;
}

function emitAnalyticsEvent(eventName: string, params: Record<string, string>) {
  if (typeof window === "undefined") {
    return;
  }

  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    gtag("event", eventName, params);
  }
}

function renderHeroWords(text: string, startDelay: number, delayStep: number) {
  const words = text.split(/\s+/);

  return words.map((word, index) => (
    <Fragment key={`${text}-${word}-${index}`}>
      <span className={styles.heroMask}>
        <span
          className={styles.heroWord}
          style={
            {
              ["--word-delay" as string]: `${startDelay + index * delayStep}ms`
            } as CSSProperties
          }
        >
          {word}
        </span>
      </span>
      {index < words.length - 1 ? <span className={styles.heroWordSpacer} aria-hidden="true" /> : null}
    </Fragment>
  ));
}

function MetricCard({
  item,
  index
}: {
  item: SectorLandingMetric;
  index: number;
}) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ threshold: 0.35 });

  return (
    <div
      ref={ref}
      className={`${styles.metricCard} ${styles.reveal} ${inView ? styles.revealInView : ""}`}
      style={
        {
          ["--reveal-delay" as string]: `${index * 80}ms`
        } as CSSProperties
      }
    >
      <p className={styles.metricValue}>
        <AnimatedMetricValue value={item.value} active={inView} />
      </p>
      <p className={styles.metricLabel}>{item.label}</p>
    </div>
  );
}

function StatCard({
  value,
  label,
  description,
  index
}: {
  value: string;
  label: string;
  description: string;
  index: number;
}) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ threshold: 0.35 });

  return (
    <article
      ref={ref}
      className={`${styles.statBlock} ${styles.reveal} ${inView ? styles.revealInView : ""}`}
      style={
        {
          ["--reveal-delay" as string]: `${index * 100}ms`
        } as CSSProperties
      }
    >
      <p className={styles.statHead}>{label}</p>
      <p className={styles.statValue}>
        <AnimatedMetricValue value={value} active={inView} />
      </p>
      <p className={styles.statDescription}>{description}</p>
    </article>
  );
}

function SectionReveal({
  children,
  delay = 0,
  className = ""
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInViewOnce<HTMLElement>({ threshold: 0.18 });

  return (
    <div
      ref={ref as never}
      className={`${styles.reveal} ${inView ? styles.revealInView : ""} ${className}`.trim()}
      style={
        {
          ["--reveal-delay" as string]: `${delay}ms`
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

export default function SectorLandingPage({ config }: Props) {
  const pathname = usePathname() ?? config.slug;
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? process.env.CALENDLY_URL ?? "";
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [heroAnimationCycle, setHeroAnimationCycle] = useState(0);
  const [heroAnimationActive, setHeroAnimationActive] = useState(false);
  const [quoteRef, quoteInView] = useInViewOnce<HTMLDivElement>({ threshold: 0.35 });
  const enhancedLossLead = useMemo(() => {
    let highlightIndex = 0;

    return config.lossLead.replace(/<strong>(.*?)<\/strong>/g, (_match, value) => {
      const delay = 300 + highlightIndex * 200;
      highlightIndex += 1;

      return `<span class="${styles.quoteHighlight}" style="--highlight-delay:${delay}ms"><span>${value}</span></span>`;
    });
  }, [config.lossLead]);
  const focusGridClass =
    config.verticals.length === 3
      ? `${styles.focusGrid} ${styles.focusGridThree}`
      : styles.focusGrid;

  useEffect(() => {
    const seen = new Set<string>();
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-sks-scroll-section]")
    );

    if (targets.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.45) {
            return;
          }

          const sectionId = entry.target.getAttribute("data-sks-scroll-section");
          if (!sectionId || seen.has(sectionId)) {
            return;
          }

          seen.add(sectionId);
          emitAnalyticsEvent("scroll_depth", {
            page: config.key,
            location: sectionId
          });
          trackSiteTelemetry({
            type: "cta_click",
            path: pathname,
            target: `scroll_depth:${sectionId}`,
            message: config.key
          });
        });
      },
      {
        threshold: [0.45]
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [config.key, pathname]);

  useEffect(() => {
    const onScroll = () => {
      setIsNavScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setHeroAnimationActive(true);
      return undefined;
    }

    setHeroAnimationActive(false);
    let frameOne = 0;
    let frameTwo = 0;

    frameOne = window.requestAnimationFrame(() => {
      frameTwo = window.requestAnimationFrame(() => {
        setHeroAnimationActive(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(frameOne);
      window.cancelAnimationFrame(frameTwo);
    };
  }, [heroAnimationCycle]);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-sks-reveal]"));

    if (targets.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(styles.revealInView);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  function openBookCall(location: "hero" | "final" | "sticky" | "nav") {
    emitAnalyticsEvent("book_call_click", {
      page: config.key,
      location
    });
    trackSiteTelemetry({
      type: "cta_click",
      path: pathname,
      target: `book:${location}`,
      message: config.key
    });

    if (!calendlyUrl) {
      window.alert("URL Calendly à renseigner.");
      return;
    }

    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  }

  function scrollToVerticals() {
    const target = document.getElementById("what");
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    trackSiteTelemetry({
      type: "cta_click",
      path: pathname,
      target: "jump:what",
      message: config.key
    });
  }

  function replayHeroAnimation() {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    setHeroAnimationCycle((current) => current + 1);
  }

  return (
    <div className={styles.root} id="top">
      <section className="container-shell pt-4 sm:pt-6">
        <div className={styles.topNavWrap}>
          <nav
            className={`${styles.topNav} ${isNavScrolled ? styles.topNavScrolled : ""}`}
            role="navigation"
            aria-label="Navigation sectorielle"
          >
            <a href="#top" className={styles.navBrand}>
              <span className={styles.navBrandMark}>S</span>
              <span>
                <span className={styles.navBrandName}>SKS Talents</span>
                <span className={styles.navBrandMeta}>{config.switchLabel}</span>
              </span>
            </a>

            <div className={styles.navLinks}>
              <a href="#what" className={styles.navLink}>
                Marchés focus
              </a>
              <a href="#how" className={styles.navLink}>
                Process
              </a>
              <a href="#proof" className={styles.navLink}>
                Résultats
              </a>
              <Link
                href={`${config.slug}/structuration-ia`}
                className={styles.navLinkFeatured}
              >
                Structuration RH (Agent &amp; automatisation)
              </Link>
              <button
                type="button"
                onClick={() => openBookCall("nav")}
                className={styles.navButton}
              >
                Réserver un call
              </button>
            </div>
          </nav>
        </div>
      </section>

      <section
        aria-labelledby={`${config.key}-hero-title`}
        className="container-shell pb-16 pt-10 sm:pb-20 sm:pt-12"
        data-sks-scroll-section="hero"
      >
        <div className={styles.heroShell}>
          <div
            className={`${styles.heroIntro} ${heroAnimationActive ? styles.heroIntroAnimated : ""}`}
            onMouseEnter={replayHeroAnimation}
            onFocus={replayHeroAnimation}
          >
            <div className={styles.heroTagWrap}>
              <span className={styles.chip}>+ {config.heroChip}</span>
            </div>

            <p className={styles.targetLine}>{config.targetLine}</p>

            <h1 id={`${config.key}-hero-title`} className={styles.heroTitle}>
              <span className={styles.heroLine}>{renderHeroWords(config.titleLineOne, 300, 50)}</span>
              <span className={`${styles.heroLine} ${styles.heroAccent}`}>
                {renderHeroWords(config.titleLineTwo, 800, 60)}
              </span>
            </h1>
          </div>

          <SectionReveal delay={180}>
            <p className={styles.heroDescription}>{config.description}</p>
          </SectionReveal>

          <SectionReveal delay={260}>
            <div className={styles.ctaRow}>
              <button
                type="button"
                data-cta="book"
                data-location="hero"
                onClick={() => openBookCall("hero")}
                className={styles.ctaPrimary}
                aria-label="Je réserve un call de 15 minutes"
              >
                Je réserve un call - 15 min
                <span className={styles.arrowShift}>→</span>
              </button>
              <button type="button" onClick={scrollToVerticals} className={styles.ctaSecondary}>
                Voir nos verticaux <span className={styles.arrowShift}>→</span>
              </button>
            </div>
          </SectionReveal>

          <SectionReveal delay={340}>
            <p className={styles.ctaNote}>{config.microTrust.join(" · ")}</p>
          </SectionReveal>

          <div
            className={`${styles.metricsGrid} ${
              config.proofMetrics.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
            }`}
          >
            {config.proofMetrics.map((item, index) => (
              <MetricCard key={item.label} item={item} index={index} />
            ))}
          </div>

          {config.logos.length > 0 ? (
            <SectionReveal delay={360}>
              <div className={styles.logoBlock}>
                <p className={styles.logoNote}>Environnements déjà visibles sur le site</p>
                <div className={styles.logoGrid}>
                  {config.logos.map((logo) => (
                    <a
                      key={logo.name}
                      href={logo.href ?? "#"}
                      className={styles.logoCard}
                    >
                      <ResourceLogo
                        name={logo.name}
                        logoUrl={logo.logoPath}
                        className="flex h-14 w-full items-center justify-center overflow-hidden rounded-[14px] bg-white p-3"
                        imageClassName="h-full w-full object-contain"
                        badgeClassName="flex h-full w-full items-center justify-center rounded-[10px] bg-brand-mint px-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-teal"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </SectionReveal>
          ) : null}

          <SectionReveal delay={420}>
            <div className="mt-10 flex w-full justify-center">
              <div className="w-full max-w-2xl">
                <HeroVideoCard
                  vimeoId={process.env.NEXT_PUBLIC_VIMEO_VIDEO_ID ?? "851364422"}
                  compact
                />
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section
        id="problem"
        aria-labelledby={`${config.key}-problem-title`}
        className={styles.darkSection}
        data-sks-scroll-section="problem"
      >
        <div className={styles.orbOne} aria-hidden="true" />
        <div className={styles.orbTwo} aria-hidden="true" />

        <div className="container-shell py-20 sm:py-28">
          <div ref={quoteRef} className={`${styles.quoteWrap} ${quoteInView ? styles.revealInView : ""}`}>
            <div className={styles.quoteMark} aria-hidden="true">
              “
            </div>
            <div className={styles.quoteLine} aria-hidden="true" />
            <p className={`${styles.sectionLabel} ${styles.onDarkLabel}`}>{config.lossTitle}</p>
            <h2
              id={`${config.key}-problem-title`}
              className={styles.quoteLead}
              dangerouslySetInnerHTML={{ __html: enhancedLossLead }}
            />
          </div>

          <div className={styles.costGrid}>
            {config.painPoints.map((item, index) => (
              <article
                key={item.number}
                className={`${styles.painCard} ${styles.reveal}`}
                data-sks-reveal
                style={
                  {
                    ["--reveal-delay" as string]: `${(index + 1) * 80}ms`
                  } as CSSProperties
                }
              >
                <p className={styles.cardNumber}>
                  {item.number} / {String(config.painPoints.length).padStart(2, "0")}
                </p>
                <h3 className={styles.painTitle}>{item.title}</h3>
                <p className={styles.painDescription}>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="what"
        aria-labelledby={`${config.key}-what-title`}
        className="container-shell pb-16 pt-16 sm:pb-20 sm:pt-20"
        data-sks-scroll-section="what"
      >
        <nav className={styles.marketTabs} aria-label="Basculer entre Life Sciences et Animal Health">
          <Link
            href="/life-sciences"
            aria-current={config.key === "life" ? "page" : undefined}
            className={`${styles.marketTab} ${config.key === "life" ? styles.marketTabCurrent : ""}`}
          >
            Life Sciences
          </Link>
          <Link
            href="/animal-health"
            aria-current={config.key === "animal" ? "page" : undefined}
            className={`${styles.marketTab} ${config.key === "animal" ? styles.marketTabCurrent : ""}`}
          >
            Animal Health
          </Link>
        </nav>

        <div className={styles.surfaceSection}>
          <p className={styles.sectionLabel}>Marchés focus</p>
          <h2
            id={`${config.key}-what-title`}
            className={styles.balancedTitle}
          >
            {config.coverage.title}
          </h2>
          <p className={styles.sectionLede}>{config.whatWeDoLede}</p>

          <div className={styles.angleGrid}>
            <div>
              <p className={styles.angleLabel}>Notre angle</p>
              <h3 className={styles.angleTitle}>{config.coverage.angleTitle}</h3>
            </div>

            <div>
              <p className={styles.angleIntro}>{config.coverage.intro}</p>
              <ul className={styles.angleList}>
                {config.coverage.actions.map((item, index) => (
                  <li
                    key={item}
                    className={`${styles.reveal} ${styles.angleListItem}`}
                    data-sks-reveal
                    style={
                      {
                        ["--reveal-delay" as string]: `${index * 70}ms`
                      } as CSSProperties
                    }
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className={styles.marketIntro}>{config.coverage.marketIntro}</p>

          <div className={styles.strategicLinks}>
            {config.strategicLinks.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.strategicLink} ${styles.reveal}`}
                data-sks-reveal
                style={
                  {
                    ["--reveal-delay" as string]: `${index * 50}ms`
                  } as CSSProperties
                }
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className={focusGridClass}>
            {config.verticals.map((vertical, index) => (
              <article
                key={vertical.number}
                className={`${styles.focusCard} ${styles.reveal}`}
                data-sks-reveal
                style={
                  {
                    ["--reveal-delay" as string]: `${index * 90}ms`
                  } as CSSProperties
                }
              >
                <p className={styles.focusIndex}>
                  {vertical.number} - Marché focus
                </p>

                {vertical.href ? (
                  <Link href={vertical.href} className={styles.focusTitleLink}>
                    {vertical.name}
                  </Link>
                ) : (
                  <h3 className={styles.focusTitle}>{vertical.name}</h3>
                )}

                <p className={styles.focusTag}>{vertical.tag}</p>
                <p className={styles.focusLabel}>Fonctions couvertes :</p>

                <ul className={styles.roleList}>
                  {vertical.roles.map((role) => (
                    <li key={role} className={styles.rolePill}>
                      {role}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        aria-labelledby={`${config.key}-services-title`}
        className="container-shell pb-16 pt-4 sm:pb-20"
        data-sks-scroll-section="services"
      >
        <div className={styles.surfaceSection}>
          <p className={styles.sectionLabel}>Services</p>
          <h2 id={`${config.key}-services-title`} className={styles.balancedTitle}>
            {config.services.title}
          </h2>
          <p className={styles.sectionLede}>{config.services.intro}</p>

          <div className={styles.serviceGrid}>
            {config.services.items.map((service, index) => (
              <article
                key={service.title}
                className={`${styles.serviceCard} ${styles.reveal}`}
                data-sks-reveal
                style={
                  {
                    ["--reveal-delay" as string]: `${index * 90}ms`
                  } as CSSProperties
                }
              >
                <p className={styles.cardNumber}>Service {String(index + 1).padStart(2, "0")}</p>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardCopy}>{service.intro}</p>

                {service.roles ? (
                  <ul className={styles.serviceList}>
                    {service.roles.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}

                <p className={styles.serviceValueTitle}>{service.valueTitle}</p>
                <ul className={styles.serviceList}>
                  {service.values.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                {service.closing ? <p className={styles.serviceClosing}>{service.closing}</p> : null}
              </article>
            ))}
          </div>

        </div>
      </section>

      {SHOW_FULL_LANDING_BLOCKS && (
      <section
        id="specificity"
        aria-labelledby={`${config.key}-specificity-title`}
        className="container-shell pb-16 pt-4 sm:pb-20"
        data-sks-scroll-section="specificity"
      >
        <div className={styles.surfaceSectionAlt}>
          <p className={styles.sectionLabel}>Spécificité</p>
          <h2
            id={`${config.key}-specificity-title`}
            className={styles.balancedTitle}
          >
            {config.coverage.specificityTitle}
          </h2>
          <p className={styles.sectionLede}>
            Vous intervenez sur des marchés où il faut comprendre :
          </p>

          <div className={styles.specificityGrid}>
            {config.coverage.specificityBullets.map((item, index) => (
              <article
                key={item}
                className={`${styles.specificityCard} ${styles.reveal}`}
                data-sks-reveal
                style={
                  {
                    ["--reveal-delay" as string]: `${index * 70}ms`
                  } as CSSProperties
                }
              >
                <p>{item}</p>
              </article>
            ))}
          </div>

          <p className={styles.sectionLede}>{config.coverage.specificityClosing}</p>

          {config.coverage.specificityList ? (
            <ul className={styles.specificityList}>
              {config.coverage.specificityList.map((item, index) => (
                <li
                  key={item}
                  className={`${styles.reveal} ${styles.specificityListItem}`}
                  data-sks-reveal
                  style={
                    {
                      ["--reveal-delay" as string]: `${index * 70}ms`
                    } as CSSProperties
                  }
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
      )}

      <section
        id="how"
        aria-labelledby={`${config.key}-how-title`}
        className="container-shell pb-16 pt-4 sm:pb-20"
        data-sks-scroll-section="how"
      >
        <div className={styles.processSection}>
          <p className={styles.sectionLabel}>§ 03 · Comment ça marche</p>
          <h2 id={`${config.key}-how-title`} className={styles.processHeadline}>
            De l’intake à la signature - <span className={styles.titleAccent}>60 jours.</span>
          </h2>

          <div className={styles.timeline}>
            {config.processSteps.map((step, index) => (
              <article
                key={step.timing}
                className={`${styles.timelineStep} ${styles.reveal}`}
                data-sks-reveal
                style={
                  {
                    ["--reveal-delay" as string]: `${index * 90}ms`
                  } as CSSProperties
                }
              >
                <div className={styles.timelineDot}>
                  <span className={styles.timelineDotInner} aria-hidden="true" />
                </div>
                <p className={styles.timelineLabel}>{step.timing}</p>
                <h3 className={styles.timelineTitle}>{step.title}</h3>
                <p className={styles.timelineDescription}>{step.description}</p>
              </article>
            ))}
          </div>

          <SectionReveal delay={180}>
            <article className={styles.testimonial}>
              <div className={styles.testimonialMark} aria-hidden="true">
                “
              </div>
              <p className={styles.testimonialBody}>{config.testimonial.quote}</p>

              <div className={styles.testimonialAuthor}>
                <div className={styles.avatar}>SK</div>
                <div>
                  <p className={styles.authorName}>{config.testimonial.name}</p>
                  <p className={styles.authorRole}>{config.testimonial.role}</p>
                </div>
              </div>
            </article>
          </SectionReveal>
        </div>
      </section>

      <section
        id="proof"
        aria-labelledby={`${config.key}-proof-title`}
        className={styles.statsSection}
        data-sks-scroll-section="proof"
      >
        <div className="container-shell py-20 sm:py-28">
          <p className={`${styles.sectionLabel} ${styles.onDarkLabel}`}>Différenciation</p>
          <h2 id={`${config.key}-proof-title`} className={styles.statsHeadline}>
            {config.differentiationTitle}{" "}
            <span className={styles.statsAccent}>{config.differentiationAccent}</span> qui évite les
            recherches décoratives.
          </h2>

          <div className={styles.statsGrid}>
            {config.differentiationCards.map((item, index) => (
              <StatCard
                key={item.label}
                value={item.value}
                label={item.label}
                description={item.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {SHOW_FULL_LANDING_BLOCKS && (
      <section
        id="faq"
        aria-labelledby={`${config.key}-faq-title`}
        className="container-shell pb-16 pt-16 sm:pb-20 sm:pt-20"
        data-sks-scroll-section="faq"
      >
        <div className={styles.surfaceSectionAlt}>
          <p className={styles.sectionLabel}>FAQ</p>
          <h2 id={`${config.key}-faq-title`} className={styles.balancedTitle}>
            {config.faqTitle}
          </h2>

          <div className={styles.faqGrid}>
            {config.faqs.map((faq, index) => (
              <details
                key={faq.question}
                className={styles.faqItem}
                open={index === 0}
              >
                <summary className={styles.faqSummary}>
                  <span>{faq.question}</span>
                  <span aria-hidden="true" className={styles.faqIcon}>
                    +
                  </span>
                </summary>
                <p className={styles.faqCopy}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      )}

      <section
        id="final-cta"
        aria-labelledby={`${config.key}-final-title`}
        className="container-shell pb-20 pt-4 sm:pb-24"
        data-sks-scroll-section="final-cta"
      >
        <div className={styles.finalCta}>
          <h2 id={`${config.key}-final-title`} className={styles.finalTitle}>
            <span>{config.finalTitle.top}</span>
            <span className={styles.titleAccent}>{config.finalTitle.accent}</span>
            <span>{config.finalTitle.bottom}</span>
          </h2>

          <div className={styles.ctaRow}>
            <button
              type="button"
              data-cta="book"
              data-location="final"
              onClick={() => openBookCall("final")}
              className={styles.ctaPrimary}
            >
              Je réserve un call - 15 min
              <span className={styles.arrowShift}>→</span>
            </button>
            <Link href="/contact" className={styles.ctaSecondary}>
              Écrivez-nous
            </Link>
          </div>

          <p className={styles.finalNote}>{config.finalNote}</p>
        </div>
      </section>

      <div className={styles.stickyBar}>
        <button
          type="button"
          data-cta="book"
          data-location="sticky"
          onClick={() => openBookCall("sticky")}
          className={styles.stickyButton}
        >
          Je réserve un call - 15 min
        </button>
      </div>
    </div>
  );
}
