import { Fragment } from "react";
import Link from "next/link";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import { type DirectionCSector } from "./directionCContent";
import "./direction-c.css";

type Props = { sector: DirectionCSector };

function isExternal(url: string) {
  return /^(https?:|mailto:|tel:)/.test(url);
}

function CtaLink({
  href,
  className,
  children
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  if (isExternal(href)) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

function PathIcon({ name }: { name: "target" | "chip" }) {
  if (name === "target") {
    return (
      <svg viewBox="0 0 28 28" aria-hidden>
        <circle cx="14" cy="14" r="11" />
        <circle cx="14" cy="14" r="6.5" />
        <circle cx="14" cy="14" r="2" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 28 28" aria-hidden>
      <rect x="7" y="7" width="14" height="14" rx="2" />
      <path d="M11 11h6v6h-6z" />
      <path d="M14 3v4M14 21v4M3 14h4M21 14h4M7 10H4M7 18H4M21 10h3M21 18h3M10 7V4M18 7V4M10 21v3M18 21v3" />
    </svg>
  );
}

function Hero({ d }: { d: DirectionCSector }) {
  return (
    <section className="c-hero">
      <div className="c-hero-shape" />
      <div className="c-container">
        <div className="c-hero-grid">
          <div>
            <div className="c-hero-tag-row">
              <span className="c-hero-tag-dot" />
              <span>{d.eyebrow}</span>
            </div>
            <h1 className="c-hero-h1">
              {d.titleLead} <span className="c-hl c-italic">{d.titleTag}</span>
            </h1>
            <p className="c-hero-sub">{d.subtitle}</p>
            <p className="c-hero-desc">{d.description}</p>
            <div className="c-hero-actions">
              <CtaLink href={d.primaryCta.url} className="c-btn c-btn-lg c-btn-primary">
                {d.primaryCta.label}
              </CtaLink>
              <CtaLink href={d.secondaryCta.url} className="c-link">
                {d.secondaryCta.label}
              </CtaLink>
            </div>
            <p className="c-hero-caption">{d.heroCaption}</p>
          </div>
          <aside className="c-hero-card">
            <div className="c-hero-card-eyebrow">{d.metricsEyebrow}</div>
            <div className="c-hero-card-list">
              {d.metrics.map((m, i) => (
                <div key={i} className="c-hero-card-row">
                  <div className="c-hero-card-value">{m.value}</div>
                  <div className="c-hero-card-label">{m.label}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Marquee({ d }: { d: DirectionCSector }) {
  const doubled = [...d.trustedBy, ...d.trustedBy];
  return (
    <section className="c-marquee-section">
      <div className="c-marquee-head">
        <span>{d.logosEyebrow}</span>
        <span className="c-dot" />
        <span>{d.logosCounter}</span>
      </div>
      <div className="c-marquee">
        <div className="c-marquee-track">
          {doubled.map((name, i) => (
            <Fragment key={i}>
              <span className="c-marquee-item">{name}</span>
              <span className="c-marquee-sep" />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function Verticals({ d }: { d: DirectionCSector }) {
  const titleWords = d.verticalsTitle.split(" ");
  const lastTwo = titleWords.slice(-2).join(" ");
  const prefix = titleWords.slice(0, -2).join(" ");
  return (
    <section className="c-section">
      <div className="c-container">
        <div className="c-section-head">
          <span className="c-eyebrow">{d.verticalsEyebrow}</span>
          <h2 className="c-h2">
            {prefix} <span className="c-italic">{lastTwo}.</span>
          </h2>
          <p className="c-section-lede">{d.verticalsIntro}</p>
        </div>
        <div className="c-cases">
          {d.verticals.map((v, i) => (
            <article key={i} className="c-case">
              <div className="c-case-visual">
                <div className="c-case-num">{String(i + 1).padStart(2, "0")}</div>
                <span className="c-case-visual-tag">{v.badge}</span>
              </div>
              <div className="c-case-body">
                <div className="c-case-sub">
                  Vertical · {String(i + 1).padStart(2, "0")} / {String(d.verticals.length).padStart(2, "0")}
                </div>
                <h3 className="c-case-title">{v.title}</h3>
                <p className="c-case-desc">{v.subtitle}</p>
              </div>
              <div className="c-case-roles">
                <div className="c-case-roles-title">Fonctions couvertes</div>
                {v.roles.map((r, j) => (
                  <div key={j} className="c-case-role">
                    {r}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Method({ d }: { d: DirectionCSector }) {
  const [titleHead, titleTail] = d.methodTitle.split("-").map((s) => s.trim());
  return (
    <section className="c-section c-section-soft">
      <div className="c-container">
        <div className="c-section-head c-section-head-center">
          <span className="c-eyebrow">{d.methodEyebrow}</span>
          <h2 className="c-h2" style={{ textAlign: "center" }}>
            {titleHead} <span className="c-italic">- {titleTail}</span>
          </h2>
        </div>
        <div className="c-funnel c-funnel-4">
          {d.method.map((s, i) => (
            <div key={s.n} className="c-funnel-step">
              <div className="c-funnel-step-num" data-n={s.n}>
                Étape {s.n}
              </div>
              <h3 className="c-funnel-step-title">{s.title}</h3>
              <p className="c-funnel-step-body">{s.body}</p>
              <div className="c-funnel-step-time">{s.time}</div>
              {i < d.method.length - 1 && <div className="c-funnel-arrow">→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Differentiation({ d }: { d: DirectionCSector }) {
  const titleWords = d.differentiationTitle.split(" ");
  const lastThree = titleWords.slice(-3).join(" ");
  const prefix = titleWords.slice(0, -3).join(" ");
  return (
    <section className="c-section">
      <div className="c-container">
        <div className="c-section-head">
          <span className="c-eyebrow">{d.differentiationEyebrow}</span>
          <h2 className="c-h2">
            {prefix} <span className="c-italic">{lastThree}</span>
          </h2>
        </div>
        <div className="c-diff">
          {d.differentiation.map((p, i) => (
            <article key={i} className="c-diff-card">
              <div className="c-diff-label">{p.label}</div>
              <div className="c-diff-value">{p.value}</div>
              <p className="c-diff-body">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RHBoard({ d }: { d: DirectionCSector }) {
  const titleParts = d.rhBoardTitle.split(".");
  const head = titleParts[0];
  const tail = titleParts.slice(1).join(".").trim();
  const isAH = d.slug === "animal-health";
  return (
    <section className="c-section c-section-soft">
      <div className="c-container">
        <div className="c-section-head c-section-head-center">
          <span className="c-eyebrow">{d.rhBoardEyebrow}</span>
          <h2 className="c-h2" style={{ textAlign: "center" }}>
            {head}.<span className="c-italic"> {tail}</span>
          </h2>
          <p className="c-section-lede" style={{ margin: "0 auto" }}>
            {d.rhBoardLede}
          </p>
        </div>
        <div className="c-rhboard">
          <div className="c-rhboard-chrome">
            <span className="c-rhboard-dot" />
            <span className="c-rhboard-dot" />
            <span className="c-rhboard-dot" />
            <span className="c-rhboard-title">RH Board · {d.eyebrow}</span>
          </div>
          <div className="c-rhboard-grid">
            <div className="c-rhboard-cards">
              {d.rhBoard.map((m, i) => (
                <article key={i} className="c-rhboard-card">
                  <div className="c-rhboard-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="c-rhboard-kpi">{m.kpi}</div>
                  <h3 className="c-rhboard-label">{m.label}</h3>
                  <p className="c-rhboard-body">{m.body}</p>
                </article>
              ))}
            </div>
            <div className="c-rhboard-video">
              <div className="c-rhboard-mock" aria-hidden>
                <div className="c-rhboard-mock-bar">
                  <span className="c-rhboard-mock-dot" />
                  <span className="c-rhboard-mock-dot" />
                  <span className="c-rhboard-mock-dot" />
                  <span className="c-rhboard-mock-title">copilot.skstalents.fr</span>
                </div>
                <div className="c-rhboard-mock-body">
                  <div className="c-rhboard-mock-prompt">
                    <span className="c-rhboard-mock-eyebrow">
                      {isAH ? "COO Copilot" : "CEO Copilot"} · Semaine 19
                    </span>
                    <span className="c-rhboard-mock-msg">Quels signaux faibles cette semaine ?</span>
                  </div>
                  <div className="c-rhboard-mock-answer">
                    <span className="c-rhboard-mock-typing">
                      <span />
                      <span />
                      <span />
                    </span>
                    <div className="c-rhboard-mock-line c-rhboard-mock-line-1" />
                    <div className="c-rhboard-mock-line c-rhboard-mock-line-2" />
                    <div className="c-rhboard-mock-line c-rhboard-mock-line-3" />
                  </div>
                  <div className="c-rhboard-mock-cards">
                    <div className="c-rhboard-mock-card">
                      <div className="c-rhboard-mock-kpi">+12%</div>
                      <div className="c-rhboard-mock-kpi-l">Pipeline</div>
                    </div>
                    <div className="c-rhboard-mock-card">
                      <div className="c-rhboard-mock-kpi c-rhboard-mock-kpi-warn">−3</div>
                      <div className="c-rhboard-mock-kpi-l">Signal R&D</div>
                    </div>
                    <div className="c-rhboard-mock-card">
                      <div className="c-rhboard-mock-kpi">14j</div>
                      <div className="c-rhboard-mock-kpi-l">Burn runway</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="c-rhboard-video-overlay">
                <div className="c-rhboard-video-eyebrow">
                  Démo · {isAH ? "COO Copilot" : "CEO Copilot"}
                </div>
                <div className="c-rhboard-video-title">À quoi ressemble la lecture hebdo.</div>
              </div>
              <button className="c-rhboard-video-play" aria-label="Lire la démo" type="button">
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="c-tp-section">
      <div className="c-container">
        <div className="c-tp-head">
          <div>
            <span className="c-eyebrow">Avis vérifiés · Trustpilot</span>
            <h2 className="c-h2">
              Ce que nos clients et candidats <span className="c-italic">disent de nous.</span>
            </h2>
            <p className="c-section-lede">
              Témoignages réels de candidats placés et de dirigeants accompagnés depuis 2018.
            </p>
          </div>
          <a
            className="c-link"
            href="https://fr.trustpilot.com/review/skstalents.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir tous les avis Trustpilot →
          </a>
        </div>
        <div className="mt-8">
          <TestimonialMarquee embedded />
        </div>
      </div>
    </section>
  );
}

function Paths({ d }: { d: DirectionCSector }) {
  return (
    <section className="c-section">
      <div className="c-container">
        <div className="c-paths">
          {d.paths.map((p, i) => (
            <article key={i} className={"c-path " + (i === 0 ? "c-path-a" : "c-path-b")}>
              <div className="c-path-icon">
                <PathIcon name={p.icon} />
              </div>
              <div className="c-path-eyebrow">{p.eyebrow}</div>
              <h3 className="c-path-title">{p.title}</h3>
              <p className="c-path-body">{p.body}</p>
              <div className="c-path-stat">
                <div className="c-path-stat-value">{p.statValue}</div>
                <div className="c-path-stat-label">{p.statLabel}</div>
              </div>
              <div className="c-path-actions">
                <CtaLink
                  href={p.cta.url}
                  className={"c-btn " + (i === 0 ? "c-btn-sage" : "c-btn-light")}
                >
                  {p.cta.label}
                </CtaLink>
                {p.secondary ? (
                  <CtaLink
                    href={p.secondary.url}
                    className={"c-link " + (i === 1 ? "c-link-light" : "")}
                  >
                    {p.secondary.label}
                  </CtaLink>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Final({ d }: { d: DirectionCSector }) {
  const titleWords = d.finalTitle.split(" ");
  const lastThree = titleWords.slice(-3).join(" ");
  const prefix = titleWords.slice(0, -3).join(" ");
  return (
    <section className="c-final">
      <div className="c-final-content">
        <h2 className="c-final-h">
          {prefix} <span className="c-italic">{lastThree}</span>
        </h2>
        <div className="c-final-actions">
          <CtaLink href={d.finalPrimary.url} className="c-btn c-btn-lg c-btn-sage">
            {d.finalPrimary.label}
          </CtaLink>
          <CtaLink href={d.finalSecondary.url} className="c-btn c-btn-lg c-btn-outline">
            {d.finalSecondary.label}
          </CtaLink>
        </div>
        <p className="c-final-caption">{d.finalCaption}</p>
      </div>
    </section>
  );
}

function Switcher({ slug }: { slug: DirectionCSector["slug"] }) {
  return (
    <div className="c-switch">
      <Link href="/life-sciences" className={slug === "life-sciences" ? "on" : ""}>
        Life Sciences
      </Link>
      <Link href="/animal-health" className={slug === "animal-health" ? "on" : ""}>
        Animal Health
      </Link>
    </div>
  );
}

export default function DirectionCPage({ sector }: Props) {
  return (
    <div className="c-root">
      <Hero d={sector} />
      <Marquee d={sector} />
      <Verticals d={sector} />
      <Method d={sector} />
      <RHBoard d={sector} />
      <Differentiation d={sector} />
      <Testimonial />
      <Paths d={sector} />
      <Final d={sector} />
      <Switcher slug={sector.slug} />
    </div>
  );
}
