import Link from "next/link";
import "./fiche-metier.css";

export type FicheMetierRole = {
  slug: string;
  title: string;
  summary: string;
  salary: string;
  salarySource?: string;
  sector: string;
  category: string;
  shortageLevel: "Moderee" | "Elevee" | "Tres elevee";
  skills: string[];
  successFactors: string[];
  path: string[];
  missions: string[];
  studies: string[];
  schools: string[];
  relatedIndustries: string[];
  sources?: { name: string; url: string }[];
};

type RelatedRole = { slug: string; title: string };

type Props = {
  role: FicheMetierRole;
  relatedRoles: RelatedRole[];
};

const TENSION_LEVELS: Record<FicheMetierRole["shortageLevel"], { bars: number; label: string }> = {
  Moderee: { bars: 3, label: "Modérée" },
  Elevee: { bars: 4, label: "Élevée" },
  "Tres elevee": { bars: 5, label: "Très élevée" }
};

function parseSalaryToBand(salary: string): { min: number; max: number; minLabel: string; maxLabel: string } | null {
  const m = salary.match(/(\d+)\s*[---]\s*(\d+)/);
  if (m) {
    return {
      min: Number(m[1]),
      max: Number(m[2]),
      minLabel: `${m[1]} k€`,
      maxLabel: `${m[2]} k€`
    };
  }
  const single = salary.match(/(\d+)/);
  if (single) {
    const v = Number(single[1]);
    return { min: v, max: v, minLabel: `${v} k€`, maxLabel: `${v} k€` };
  }
  return null;
}

function getAxisRange(min: number, max: number): number[] {
  // Round axis to nice intervals of 20 around the band
  const lo = Math.max(0, Math.floor((min - 20) / 20) * 20);
  const hi = Math.ceil((max + 20) / 20) * 20;
  const steps: number[] = [];
  for (let v = lo; v <= hi; v += 20) steps.push(v);
  return steps.slice(0, 6);
}

export default function FicheMetierPage({ role, relatedRoles }: Props) {
  const tension = TENSION_LEVELS[role.shortageLevel];
  const band = parseSalaryToBand(role.salary);
  const axis = band ? getAxisRange(band.min, band.max) : [];

  // Compute band position as percentage of axis range
  let bandLeft = 18;
  let bandRight = 18;
  if (band && axis.length >= 2) {
    const axisMin = axis[0];
    const axisMax = axis[axis.length - 1];
    const span = axisMax - axisMin;
    if (span > 0) {
      bandLeft = Math.round(((band.min - axisMin) / span) * 100);
      bandRight = Math.round(((axisMax - band.max) / span) * 100);
    }
  }

  return (
    <div className="fm-root">
      {/* Breadcrumb */}
      <div className="fm-crumbs">
        <Link href="/job-roles">Fiches métiers</Link>
        <span>/</span>
        <Link href={role.sector.toLowerCase().includes("animal") ? "/animal-health" : "/life-sciences"}>
          {role.sector}
        </Link>
        <span>/</span>
        <b>{role.title}</b>
      </div>

      {/* HERO */}
      <section className="fm-hero" id="role">
        <div>
          <div className="fm-hero-tag">Fiche · {role.sector} · {role.category}</div>
          <h1 className="fm-title">{role.title}</h1>
          <p className="fm-lede">{role.summary}</p>
          <div className="fm-meta-row">
            <span className="fm-chip fill">Tension marché · {tension.label}</span>
            {(() => {
              const seen = new Set<string>();
              const norm = (s: string) => s.trim().toLowerCase();
              const allChips = [role.sector, role.category, ...role.skills];
              return allChips
                .filter((label) => {
                  const k = norm(label);
                  if (!k || seen.has(k)) return false;
                  seen.add(k);
                  return true;
                })
                .slice(0, 4)
                .map((label) => (
                  <span key={label} className="fm-chip">{label}</span>
                ));
            })()}
          </div>
        </div>

        <aside className="fm-summary">
          <dl>
            <dt>Base</dt>
            <dd>
              <span className="fm-salary-mini">
                {role.salary}
                <small>brut annuel · selon scope &amp; localisation</small>
              </span>
            </dd>
            <dt>Tension</dt>
            <dd>
              <span className="fm-tension">
                <span className="fm-tension-bars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className={i < tension.bars ? "on" : ""} />
                  ))}
                </span>
                {tension.label}
              </span>
            </dd>
            <dt>Secteur</dt>
            <dd>{role.sector}</dd>
            <dt>Catégorie</dt>
            <dd>{role.category}</dd>
          </dl>
        </aside>
      </section>

      {/* ABOUT - 3 cards from successFactors */}
      {role.successFactors.length > 0 && (
        <section className="fm-section" id="about">
          <div className="fm-sec-head">
            <div className="fm-sec-num">02 / À PROPOS</div>
            <div>
              <h2 className="fm-sec-title">
                Un rôle <em>structurant</em>, là où la technicité pèse sur la performance.
              </h2>
              <p className="fm-sec-kicker">
                Sur des organisations où la qualité d'exécution et la crédibilité marché conditionnent le chiffre, ce poste demande un cadrage fin entre expertise métier, exposition managériale et maturité de l'organisation.
              </p>
            </div>
          </div>
          <div className="fm-grid-3">
            {role.successFactors.slice(0, 3).map((factor, idx) => (
              <div key={idx} className="cell">
                <span className="n">{String.fromCharCode(65 + idx)} · Pourquoi le poste existe</span>
                <h3>{factor}</h3>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SALARY */}
      {band && (
        <section className="fm-section" id="salary">
          <div className="fm-sec-head">
            <div className="fm-sec-num">03 / RÉMUNÉRATION</div>
            <div>
              <h2 className="fm-sec-title">Repères de <em>package</em>.</h2>
              <p className="fm-sec-kicker">
                Le package final dépend du scope, de la localisation, du niveau de pénurie et du degré d'exposition stratégique du poste.
              </p>
            </div>
          </div>

          <div className="fm-salary-wrap">
            <div />
            <div className="fm-salary-vis">
              <div className="fm-salary-headline">
                <div>
                  <span className="fm-salary-cap">p25 · entrée</span>
                  <span className="fm-salary-num">{band.minLabel}</span>
                </div>
                <span className="fm-salary-headline-arrow" aria-hidden>→</span>
                <div>
                  <span className="fm-salary-cap">p75 · senior</span>
                  <span className="fm-salary-num">{band.maxLabel}</span>
                </div>
              </div>
              <div className="fm-salary-track">
                <div
                  className="fm-salary-band"
                  style={{ left: `${bandLeft}%`, right: `${bandRight}%` }}
                />
              </div>
              {axis.length > 0 && (
                <div className="fm-salary-axis">
                  {axis.map((v) => (
                    <span key={v}>{v} k€</span>
                  ))}
                </div>
              )}

              <div className="fm-salary-notes">
                <div className="item">
                  <h4>Proxy de marché</h4>
                  <p>{role.salarySource || `Repères observés par SKS Talents sur des rôles ${role.category} dans ${role.sector}.`}</p>
                </div>
                <div className="item">
                  <h4>Indice de confiance</h4>
                  <p>À croiser avec l'ancienneté, la taille de l'équipe, le périmètre international et la complexité technique.</p>
                </div>
                <div className="item">
                  <h4>À pondérer</h4>
                  <p>Pénurie locale, exposition COMEX, périmètre international et structure du package (variable, BSPCE, intéressement).</p>
                </div>
              </div>

              {role.sources && role.sources.length > 0 && (
                <div className="fm-sources">
                  {role.sources.map((s) => (
                    <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.name}
                    </a>
                  ))}
                  <Link href="/calcul-salaire-brut-net">Convertir brut → net</Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* MISSIONS */}
      {role.missions.length > 0 && (
        <section className="fm-section" id="missions">
          <div className="fm-sec-head">
            <div className="fm-sec-num">04 / MISSIONS</div>
            <div>
              <h2 className="fm-sec-title">
                Ce que ce rôle <em>fait</em><br />concrètement.
              </h2>
            </div>
          </div>
          <ul className="fm-excel-list" style={{ maxWidth: 880 }}>
            {role.missions.map((mission, idx) => (
              <li key={idx}>
                <span className="num">M·{String(idx + 1).padStart(2, "0")}</span>
                <span className="txt">{mission}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* COMPETENCIES */}
      {(role.skills.length > 0 || role.successFactors.length > 0) && (
        <section className="fm-section" id="skills">
          <div className="fm-sec-head">
            <div className="fm-sec-num">05 / COMPÉTENCES</div>
            <div>
              <h2 className="fm-sec-title">Ce qu'il faut pour <em>exceller</em>.</h2>
            </div>
          </div>

          <div className="fm-comp-wrap">
            {role.skills.length > 0 && (
              <div>
                <h4 className="fm-comp-h4">Compétences clés</h4>
                <div className="fm-skills">
                  {role.skills.map((s) => (
                    <span key={s} className="fm-skill">
                      <span className="dot" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {role.successFactors.length > 0 && (
              <div>
                <h4 className="fm-comp-h4">Signaux à chercher</h4>
                <ul className="fm-excel-list">
                  {role.successFactors.map((factor, idx) => (
                    <li key={idx}>
                      <span className="num">S·{String(idx + 1).padStart(2, "0")}</span>
                      <span className="txt">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CAREER PATH */}
      {role.path.length > 0 && (
        <section className="fm-section" id="path">
          <div className="fm-sec-head">
            <div className="fm-sec-num">06 / PARCOURS</div>
            <div>
              <h2 className="fm-sec-title">
                Le chemin <em>fréquent</em><br />vers ce poste.
              </h2>
              <p className="fm-sec-kicker">
                Trois jalons typiques observés dans la base SKS Talents - non normatifs, mais utiles pour cadrer un brief.
              </p>
            </div>
          </div>

          <div className="fm-path">
            {role.path.slice(0, 3).map((step, idx) => {
              const isCurrent = idx === role.path.length - 1 || idx === 2;
              return (
                <div key={idx} className={`fm-path-step ${isCurrent ? "current" : ""}`}>
                  <div className="lbl">{isCurrent ? "- Vous êtes ici" : `Étape 0${idx + 1}`}</div>
                  <h4>{step}</h4>
                  {idx < role.path.length - 1 && idx < 2 && <div className="arrow">→</div>}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* SCHOOLS */}
      {role.schools.length > 0 && (
        <section className="fm-section" id="schools">
          <div className="fm-sec-head">
            <div className="fm-sec-num">07 / ÉTUDES &amp; VIVIERS</div>
            <div>
              <h2 className="fm-sec-title">Écoles <em>recommandées</em>.</h2>
              <p className="fm-sec-kicker">
                Viviers rapprochés de la base écoles SKS Talents et de pages de formation officielles.
              </p>
            </div>
          </div>

          <div className="fm-schools-grid">
            {role.schools.slice(0, 8).map((school) => (
              <div key={school} className="fm-school">
                <div>
                  <div className="city">École</div>
                  <h5>{school}</h5>
                </div>
                <div>
                  <span className="link">Voir le vivier</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RELATED */}
      {relatedRoles.length > 0 && (
        <section className="fm-section" id="related">
          <div className="fm-sec-head">
            <div className="fm-sec-num">08 / FICHES PROCHES</div>
            <div>
              <h2 className="fm-sec-title">Rôles <em>voisins</em>.</h2>
              <p className="fm-sec-kicker">
                Les enjeux techniques, réglementaires et d'exécution se ressemblent - utile pour comparer un brief ou élargir un sourcing.
              </p>
            </div>
          </div>

          <div className="fm-related-list">
            {relatedRoles.map((r, idx) => (
              <Link key={r.slug} href={`/job-roles/${r.slug}`} className="fm-related">
                <div className="left">
                  <span className="num">R·{String(idx + 1).padStart(2, "0")}</span>
                  <h5>{r.title}</h5>
                </div>
                <span className="go">Ouvrir →</span>
              </Link>
            ))}
          </div>

          {role.relatedIndustries.length > 0 && (
            <>
              <h4 className="fm-comp-h4" style={{ marginTop: 48 }}>Industries connexes</h4>
              <div className="fm-industries">
                {role.relatedIndustries.map((ind) => (
                  <span key={ind}>{ind}</span>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {/* CTA */}
      <section className="fm-section" id="cta" style={{ borderBottom: "none" }}>
        <div className="fm-cta-wrap" style={{ padding: 0 }}>
          <div>
            <div className="fm-sec-num" style={{ marginBottom: 24 }}>09 / ET MAINTENANT</div>
            <h2>
              Cadrons la mission,<br />
              <em>estimons</em> la pénurie,<br />
              proposons un plan d'approche.
            </h2>
          </div>
          <div className="fm-cta-buttons">
            <a className="fm-btn primary" href="https://calendly.com/g-kengue/talentconsulting" target="_blank" rel="noopener noreferrer">
              Réserver 30 min de cadrage <span className="arrow-tail">→</span>
            </a>
            <Link className="fm-btn ghost" href="/contact#rappel">
              Demander un rappel <span className="arrow-tail">↗</span>
            </Link>
            <Link className="fm-btn ghost" href="/services">
              Voir nos services <span className="arrow-tail">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
