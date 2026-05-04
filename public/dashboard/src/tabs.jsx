// Traffic, SEO, Paid, Conversions, Pages, Geography, Notes tabs

// ------------------------------- TRAFFIC -------------------------------
function TrafficTab({ state }) {
  const [hoverIdx, setHoverIdx] = React.useState(null);
  const colorFor = (k) => ({
    accent: "var(--accent)", ink: "var(--ink)", warm: "var(--warm)",
    cool: "var(--cool)", mute: "var(--ink-softer)", mute2: "var(--line-strong)",
  }[k]);
  const point = hoverIdx != null ? DATA.dailySeries[hoverIdx] : null;

  return (
    <div className="stack-lg">
      <div className="section-head">
        <div>
          <div className="eyebrow">Acquisition</div>
          <h2 className="section-title">Trafic</h2>
        </div>
        <p className="section-sub">D'où proviennent les {fmt.compact(184230)} sessions de cette période.</p>
      </div>

      <section className="card card-lg">
        <header className="card-header">
          <div>
            <h3 className="card-title">Sessions dans le temps</h3>
            <p className="card-sub">Quotidien, tous canaux {state.channel !== "Tous les canaux" ? `· filtré : ${state.channel}` : ""}</p>
          </div>
        </header>
        <div className="chart-holder">
          <LineAreaChart data={DATA.dailySeries} xKey="d" yKey="sessions"
            compareKey={state.compare ? "prev" : null}
            height={260} accent="var(--accent)"
            onHover={setHoverIdx} hoverIdx={hoverIdx} />
          {point && (
            <div className="tooltip" style={{ position: "absolute", top: 14, right: 14 }}>
              <div className="tt-row"><span className="tt-label">{point.d}</span></div>
              <div className="tt-row"><span className="tt-label">Sessions</span><span className="tt-val">{fmt.number(point.sessions)}</span></div>
              {state.compare && <div className="tt-row"><span className="tt-label tt-muted">Précédent</span><span className="tt-val tt-muted">{fmt.number(point.prev)}</span></div>}
            </div>
          )}
        </div>
      </section>

      <section className="card">
        <header className="card-header">
          <div>
            <h3 className="card-title">Par canal</h3>
            <p className="card-sub">Sessions, part et évolution vs période précédente</p>
          </div>
        </header>
        <table className="data-table">
          <thead>
            <tr>
              <th>Canal</th><th className="num">Sessions</th><th className="num">Part</th>
              <th>Distribution</th><th className="num">Évolution</th>
            </tr>
          </thead>
          <tbody>
            {DATA.channels.map(c => (
              <tr key={c.id}>
                <td><span className="chan-swatch" style={{ background: colorFor(c.color) }} />{c.name}</td>
                <td className="num tnum">{fmt.number(c.sessions)}</td>
                <td className="num tnum">{fmt.pct(c.share, 1)}</td>
                <td style={{ width: "32%" }}>
                  <div className="tbar-track"><div className="tbar-fill" style={{ width: (c.share * 100 / DATA.channels[0].share) + "%", background: colorFor(c.color) }} /></div>
                </td>
                <td className="num"><DeltaPill delta={c.delta} size="sm" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

// --------------------------------- SEO ---------------------------------
function SeoTab() {
  return (
    <div className="stack-lg">
      <div className="section-head">
        <div>
          <div className="eyebrow">Recherche organique</div>
          <h2 className="section-title">SEO</h2>
        </div>
        <p className="section-sub">Positions des mots-clés, performance des clics et évolution de la visibilité.</p>
      </div>

      <div className="grid-3">
        <div className="mini-stat"><div className="mini-label">Position moyenne</div><div className="mini-value">8.4</div><DeltaPill delta={-0.164} inverse size="sm" /></div>
        <div className="mini-stat"><div className="mini-label">Mots-clés top 10</div><div className="mini-value">426</div><DeltaPill delta={+0.184} size="sm" /></div>
        <div className="mini-stat"><div className="mini-label">Clics organiques</div><div className="mini-value">{fmt.compact(68420)}</div><DeltaPill delta={+0.164} size="sm" /></div>
      </div>

      <div className="grid-2-1">
        <section className="card">
          <header className="card-header">
            <div>
              <h3 className="card-title">Positions des mots-clés</h3>
              <p className="card-sub">Requêtes les plus impactantes de la période</p>
            </div>
          </header>
          <table className="data-table">
            <thead><tr><th>Mot-clé</th><th className="num">Pos.</th><th className="num">Évol.</th><th className="num">Volume</th><th className="num">Clics</th><th>Tendance</th></tr></thead>
            <tbody>
              {DATA.seoKeywords.map((k, i) => {
                const delta = k.prev - k.pos;
                return (
                  <tr key={i}>
                    <td className="kw-term">{k.term}</td>
                    <td className="num tnum"><span className={`pos-chip ${k.pos <= 3 ? "pos-top" : k.pos <= 10 ? "pos-mid" : "pos-low"}`}>{k.pos}</span></td>
                    <td className="num tnum">{delta === 0 ? <span className="mute">—</span> : <span className={delta > 0 ? "delta-good" : "delta-bad"}>{delta > 0 ? "↑" : "↓"} {Math.abs(delta)}</span>}</td>
                    <td className="num tnum">{fmt.number(k.vol)}</td>
                    <td className="num tnum">{fmt.number(k.clicks)}</td>
                    <td><Sparkline data={k.trend.map(v => -v)} width={72} height={22} stroke="var(--accent)" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section className="card">
          <header className="card-header">
            <div>
              <h3 className="card-title">Distribution des positions</h3>
              <p className="card-sub">Mots-clés par tranche de position</p>
            </div>
          </header>
          <BarChart data={DATA.seoPositionBuckets} xKey="bucket" yKey="count" compareKey="prev" height={220} accent="var(--accent)" />
          <div className="legend">
            <span><span className="legend-sw" style={{ background: "var(--accent)" }} /> Cette période</span>
            <span><span className="legend-sw" style={{ background: "var(--ink-soft)", opacity: 0.5 }} /> Précédente</span>
          </div>
        </section>
      </div>
    </div>
  );
}

// --------------------------------- PAID --------------------------------
function PaidTab() {
  const total = DATA.paidCampaigns.reduce((a, c) => ({
    spend: a.spend + c.spend, clicks: a.clicks + c.clicks, conv: a.conv + c.conv,
  }), { spend: 0, clicks: 0, conv: 0 });
  const blendedRoas = (total.conv * 280) / total.spend; // illustrative
  return (
    <div className="stack-lg">
      <div className="section-head">
        <div>
          <div className="eyebrow">Médias payants</div>
          <h2 className="section-title">Publicité</h2>
        </div>
        <p className="section-sub">Dépenses, clics, conversions et ROAS sur Google, Meta, LinkedIn et YouTube.</p>
      </div>

      <div className="grid-4">
        <div className="mini-stat"><div className="mini-label">Dépense totale</div><div className="mini-value">{fmt.currency(total.spend)}</div><DeltaPill delta={+0.084} inverse size="sm" /></div>
        <div className="mini-stat"><div className="mini-label">Clics</div><div className="mini-value">{fmt.compact(total.clicks)}</div><DeltaPill delta={+0.142} size="sm" /></div>
        <div className="mini-stat"><div className="mini-label">Conversions</div><div className="mini-value">{fmt.number(total.conv)}</div><DeltaPill delta={+0.218} size="sm" /></div>
        <div className="mini-stat"><div className="mini-label">ROAS global</div><div className="mini-value">{blendedRoas.toFixed(1)}×</div><DeltaPill delta={+0.087} size="sm" /></div>
      </div>

      <section className="card">
        <header className="card-header">
          <div>
            <h3 className="card-title">Campagnes</h3>
            <p className="card-sub">Cliquer une ligne pour plus de détails</p>
          </div>
        </header>
        <table className="data-table">
          <thead><tr><th>Campagne</th><th>Canal</th><th className="num">Dépense</th><th className="num">Clics</th><th className="num">Conv.</th><th className="num">ROAS</th><th className="num">Évol.</th></tr></thead>
          <tbody>
            {DATA.paidCampaigns.map((c, i) => (
              <tr key={i} className="clickable" onClick={() => alert(`Détail : ${c.name}\n\nDépense ${fmt.currency(c.spend)} · ${c.clicks} clics · ${c.conv} conversions\nROAS ${c.roas.toFixed(1)}×`)}>
                <td><strong>{c.name}</strong></td>
                <td><span className="pill">{c.channel}</span></td>
                <td className="num tnum">{fmt.currency(c.spend)}</td>
                <td className="num tnum">{fmt.number(c.clicks)}</td>
                <td className="num tnum">{c.conv}</td>
                <td className="num tnum"><span className={c.roas >= 3 ? "good" : "bad"}>{c.roas.toFixed(1)}×</span></td>
                <td className="num"><DeltaPill delta={c.delta} size="sm" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

// ----------------------------- CONVERSIONS -----------------------------
function ConversionsTab() {
  return (
    <div className="stack-lg">
      <div className="section-head">
        <div>
          <div className="eyebrow">Objectifs</div>
          <h2 className="section-title">Conversions</h2>
        </div>
        <p className="section-sub">Tous les objectifs atteints sur le site cette période.</p>
      </div>

      <div className="grid-2-1">
        <section className="card">
          <header className="card-header"><div><h3 className="card-title">Par objectif</h3><p className="card-sub">Nombre et valeur attribuée</p></div></header>
          <ul className="goal-list">
            {DATA.conversions.map(c => (
              <li key={c.id} className="goal-row">
                <div className="goal-head">
                  <span className="goal-name">{c.name}</span>
                  <span className="goal-count">{fmt.number(c.count)}</span>
                </div>
                <div className="goal-bar-wrap"><div className="goal-bar" style={{ width: (c.count / DATA.conversions[0].count * 100) + "%" }} /></div>
                <div className="goal-meta">
                  <span>{c.value > 0 ? fmt.currency(c.value) + " attribués" : "Aucun revenu associé"}</span>
                  <DeltaPill delta={c.delta} size="sm" />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <header className="card-header"><div><h3 className="card-title">Entonnoir</h3><p className="card-sub">Parcours lead → mandat signé</p></div></header>
          <ul className="funnel">
            {DATA.funnel.map((f, i) => {
              const pct = f.count / DATA.funnel[0].count;
              const rate = i === 0 ? null : f.count / DATA.funnel[i - 1].count;
              return (
                <li key={i} className="funnel-row">
                  <div className="funnel-head">
                    <span className="funnel-stage">{f.stage}</span>
                    <span className="funnel-count">{fmt.number(f.count)}</span>
                  </div>
                  <div className="funnel-bar-wrap"><div className="funnel-bar" style={{ width: (pct * 100) + "%" }} /></div>
                  {rate != null && <div className="funnel-rate">{fmt.pct(rate, 1)} de conversion à l'étape</div>}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}

// ------------------------------ TOP PAGES ------------------------------
function PagesTab() {
  return (
    <div className="stack-lg">
      <div className="section-head">
        <div>
          <div className="eyebrow">Contenu</div>
          <h2 className="section-title">Pages populaires</h2>
        </div>
        <p className="section-sub">Pages les plus visitées et leur taux de conversion.</p>
      </div>

      <section className="card">
        <table className="data-table">
          <thead><tr><th>Page</th><th className="num">Sessions</th><th className="num">Temps moy.</th><th className="num">Rebond</th><th className="num">Taux de conv.</th><th>Part</th></tr></thead>
          <tbody>
            {DATA.topPages.map((p, i) => (
              <tr key={i} className="clickable" onClick={() => alert(`Détail : ${p.title}\n${p.path}\n\n${fmt.number(p.sessions)} sessions · ${fmt.duration(p.avgTime)} de temps moyen · ${fmt.pct(p.convRate, 1)} de conversion`)}>
                <td>
                  <div className="page-row-title">{p.title}</div>
                  <div className="page-path">{p.path}</div>
                </td>
                <td className="num tnum">{fmt.number(p.sessions)}</td>
                <td className="num tnum">{fmt.duration(p.avgTime)}</td>
                <td className="num tnum">{fmt.pct(p.bounce, 0)}</td>
                <td className="num tnum"><span className={p.convRate >= 0.04 ? "good" : p.convRate >= 0.02 ? "" : "mute"}>{fmt.pct(p.convRate, 1)}</span></td>
                <td style={{ width: "24%" }}>
                  <div className="tbar-track"><div className="tbar-fill" style={{ width: (p.sessions / DATA.topPages[0].sessions * 100) + "%" }} /></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

// ------------------------------ GEOGRAPHY ------------------------------
// Simple world choropleth: abstract dotted world + ranked country list.
// We render a dot-grid "world" for aesthetic; real choropleth would need TopoJSON.
function GeoTab() {
  const [hover, setHover] = React.useState(null);
  return (
    <div className="stack-lg">
      <div className="section-head">
        <div>
          <div className="eyebrow">Audience</div>
          <h2 className="section-title">Géographie</h2>
        </div>
        <p className="section-sub">D'où vient l'audience.</p>
      </div>

      <div className="grid-2-1">
        <section className="card">
          <header className="card-header">
            <div>
              <h3 className="card-title">Sessions par pays</h3>
              <p className="card-sub">Carte en grille de points · intensité = volume de sessions</p>
            </div>
          </header>
          <DotWorldMap data={DATA.geo} hover={hover} setHover={setHover} />
        </section>

        <section className="card">
          <header className="card-header"><div><h3 className="card-title">Pays les plus actifs</h3></div></header>
          <ul className="country-list">
            {DATA.geo.map((g, i) => (
              <li key={g.code} className={`country-row ${hover === g.code ? "country-hover" : ""}`}
                  onMouseEnter={() => setHover(g.code)} onMouseLeave={() => setHover(null)}>
                <span className="country-rank">{String(i + 1).padStart(2, "0")}</span>
                <span className="country-code">{g.code}</span>
                <span className="country-name">{g.name}</span>
                <span className="country-val tnum">{fmt.number(g.sessions)}</span>
                <div className="country-bar-wrap"><div className="country-bar" style={{ width: (g.intensity * 100) + "%" }} /></div>
                <span className="country-share tnum">{fmt.pct(g.share, 1)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

// Dot world: hand-placed country blobs with approximate positions
const COUNTRY_POS = {
  US: { x: 0.22, y: 0.40, r: 4.0 },
  GB: { x: 0.48, y: 0.30, r: 2.4 },
  CA: { x: 0.22, y: 0.28, r: 3.2 },
  FR: { x: 0.50, y: 0.36, r: 2.2 },
  DE: { x: 0.53, y: 0.32, r: 2.1 },
  AU: { x: 0.85, y: 0.74, r: 2.7 },
  AE: { x: 0.63, y: 0.48, r: 1.9 },
  JP: { x: 0.87, y: 0.42, r: 2.1 },
  BR: { x: 0.34, y: 0.66, r: 2.3 },
  IN: { x: 0.72, y: 0.50, r: 2.1 },
};

function DotWorldMap({ data, hover, setHover }) {
  const W = 640, H = 320;
  // Build a dot grid for landmass silhouette (very abstract)
  const dots = [];
  const rows = 34, cols = 72;
  // approximate land mask via simple functions — produces a believable-but-abstract world
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const u = c / cols, v = r / rows;
      // Crude mask combining a few ellipses for continents
      const inEllipse = (cx, cy, rx, ry) => {
        const dx = (u - cx) / rx, dy = (v - cy) / ry;
        return dx * dx + dy * dy < 1;
      };
      const isLand =
        inEllipse(0.22, 0.42, 0.13, 0.24) ||       // N America
        inEllipse(0.32, 0.68, 0.07, 0.15) ||       // S America
        inEllipse(0.50, 0.34, 0.07, 0.10) ||       // Europe
        inEllipse(0.55, 0.62, 0.11, 0.22) ||       // Africa
        inEllipse(0.72, 0.42, 0.18, 0.18) ||       // Asia
        inEllipse(0.85, 0.74, 0.06, 0.08);         // Oceania
      if (isLand) dots.push({ x: u * W, y: v * H });
    }
  }
  return (
    <div style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="auto" style={{ display: "block" }}>
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="1.4" fill="var(--line-strong)" opacity="0.6" />
        ))}
        {data.map(g => {
          const p = COUNTRY_POS[g.code];
          if (!p) return null;
          const x = p.x * W, y = p.y * H;
          const r = 6 + g.intensity * 22;
          const active = hover === g.code;
          return (
            <g key={g.code} onMouseEnter={() => setHover(g.code)} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
              <circle cx={x} cy={y} r={r} fill="var(--accent)" opacity={active ? 0.45 : 0.22} />
              <circle cx={x} cy={y} r={4 + g.intensity * 6} fill="var(--accent)" />
              {active && (
                <g>
                  <rect x={x + 12} y={y - 24} width="130" height="38" rx="4" fill="var(--ink)" />
                  <text x={x + 20} y={y - 10} fontSize="11" fill="var(--bg)" fontFamily="var(--font-sans)" fontWeight="600">{g.name}</text>
                  <text x={x + 20} y={y + 5} fontSize="10" fill="var(--bg)" opacity="0.8" fontFamily="var(--font-mono)">{fmt.number(g.sessions)} · {fmt.pct(g.share, 1)}</text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// --------------------------------- NOTES -------------------------------
function NotesTab() {
  const [drafting, setDrafting] = React.useState(false);
  const [notes, setNotes] = React.useState(DATA.notes);
  const [draft, setDraft] = React.useState({ title: "", body: "", tag: "Insight" });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let mounted = true;

    window.fetchDashboardNotes?.()
      .then((items) => {
        if (!mounted || !items || !items.length) return;
        setNotes(items);
        setError("");
      })
      .catch(() => {
        if (mounted) {
          setError("Impossible de charger les notes live.");
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const add = async () => {
    if (!draft.title.trim()) return;

    const optimistic = {
      id: `draft-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      author: "Équipe Strategy",
      tag: draft.tag,
      title: draft.title,
      body: draft.body
    };
    setNotes([optimistic, ...notes]);

    try {
      const saved = await window.createDashboardNote?.({
        title: draft.title,
        body: draft.body,
        tag: draft.tag,
        author: "Équipe Strategy"
      });
      if (saved) {
        setNotes((current) => [saved, ...current.filter((item) => item.id !== optimistic.id)]);
      }
      setError("");
      setDraft({ title: "", body: "", tag: "Insight" });
      setDrafting(false);
    } catch (err) {
      setNotes((current) => current.filter((item) => item.id !== optimistic.id));
      setError("La note n'a pas pu être enregistrée.");
    }
  };

  return (
    <div className="stack-lg">
      <div className="section-head">
        <div>
          <div className="eyebrow">Contexte</div>
          <h2 className="section-title">Notes</h2>
        </div>
        <button className="btn" onClick={() => setDrafting(!drafting)}>{drafting ? "Annuler" : "+ Nouvelle note"}</button>
      </div>

      {(loading || error) && (
        <section className="card">
          <div className="card-sub">
            {loading ? "Chargement des notes…" : error}
          </div>
        </section>
      )}

      {drafting && (
        <section className="card">
          <input className="input" placeholder="Titre de la note" value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} />
          <textarea className="textarea" placeholder="Contexte, ce qui a changé, la suite…" value={draft.body} onChange={e => setDraft({ ...draft, body: e.target.value })} />
          <div className="row-between">
            <div className="tag-select">
              {["Insight", "Gain", "Risque", "Lancement"].map(t => (
                <button key={t} className={`tag-opt ${draft.tag === t ? "tag-opt-active" : ""}`} onClick={() => setDraft({ ...draft, tag: t })}>{t}</button>
              ))}
            </div>
            <button className="btn btn-primary" onClick={add}>Publier la note</button>
          </div>
        </section>
      )}

      <ul className="notes-list">
        {notes.map((n, i) => (
          <li key={i} className="note-card">
            <div className="note-head">
              <span className={`note-tag note-tag-${n.tag.toLowerCase()}`}>{n.tag}</span>
              <span className="note-date">{n.date} · {n.author}</span>
            </div>
            <h3 className="note-title">{n.title}</h3>
            <p className="note-body">{n.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

Object.assign(window, { TrafficTab, SeoTab, PaidTab, ConversionsTab, PagesTab, GeoTab, NotesTab });
