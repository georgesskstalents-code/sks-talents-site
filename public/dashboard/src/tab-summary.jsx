// Executive Summary tab: KPI grid + hero chart + channel mix + notes preview

function KPICard({ k, selected, onSelect, compare, variant }) {
  const cls = `kpi-card ${selected ? "kpi-selected" : ""} ${variant === "navy" ? "card-navy" : ""} ${variant === "alert" ? "card-navy alert" : ""}`;
  return (
    <button className={cls} onClick={() => onSelect(k.id)}>
      <div className="kpi-label">{k.label}</div>
      <div className="kpi-row">
        <div className="kpi-value">{formatKPI(k.value, k.format)}</div>
        <Sparkline data={k.spark} width={96} height={28} stroke="var(--accent)" fill="var(--accent)" />
      </div>
      <div className="kpi-foot">
        <DeltaPill delta={k.delta} inverse={k.inverse} />
        {compare && <span className="kpi-prev">vs {formatKPI(k.value / (1 + (k.inverse ? -k.delta : k.delta)), k.format)}</span>}
      </div>
    </button>
  );
}

function HeroChart({ state }) {
  const [hoverIdx, setHoverIdx] = React.useState(null);
  const [metric, setMetric] = React.useState("sessions");
  const data = DATA.dailySeries;
  const point = hoverIdx != null ? data[hoverIdx] : null;

  return (
    <section className="card card-lg">
      <header className="card-header">
        <div>
          <h3 className="card-title">Quotidien : {metric === "sessions" ? "sessions" : "conversions"}</h3>
          <p className="card-sub">{DATA.client.period}{state.compare ? ` · vs ${DATA.client.comparedTo}` : ""}</p>
        </div>
        <div className="seg">
          <button className={`seg-btn ${metric === "sessions" ? "seg-active" : ""}`} onClick={() => setMetric("sessions")}>Sessions</button>
          <button className={`seg-btn ${metric === "conv" ? "seg-active" : ""}`} onClick={() => setMetric("conv")}>Conversions</button>
        </div>
      </header>

      <div className="chart-holder">
        <LineAreaChart
          data={data}
          xKey="d"
          yKey={metric}
          compareKey={state.compare && metric === "sessions" ? "prev" : null}
          height={280}
          accent="var(--accent)"
          onHover={(i) => setHoverIdx(i)}
          hoverIdx={hoverIdx}
        />
        {point && (
          <div className="tooltip" style={{ position: "absolute", top: 14, right: 14 }}>
            <div className="tt-row"><span className="tt-dot" /><span className="tt-label">{point.d}</span></div>
            <div className="tt-row"><span className="tt-label">Sessions</span><span className="tt-val">{fmt.number(point.sessions)}</span></div>
            {state.compare && <div className="tt-row"><span className="tt-label tt-muted">Précédent</span><span className="tt-val tt-muted">{fmt.number(point.prev)}</span></div>}
            <div className="tt-row"><span className="tt-label">Conversions</span><span className="tt-val">{point.conv}</span></div>
          </div>
        )}
      </div>
    </section>
  );
}

function ChannelMixCard({ onDrill }) {
  const total = DATA.channels.reduce((s, c) => s + c.sessions, 0);
  const colorFor = (k) => ({
    accent: "var(--accent)",
    ink:    "var(--ink)",
    warm:   "var(--warm)",
    cool:   "var(--cool)",
    mute:   "var(--ink-softer)",
    mute2:  "var(--line-strong)",
  }[k]);
  const segments = DATA.channels.map(c => ({ value: c.sessions, color: colorFor(c.color), label: c.name }));
  return (
    <section className="card">
      <header className="card-header">
        <div>
          <h3 className="card-title">Répartition des canaux</h3>
          <p className="card-sub">Part des sessions · {fmt.number(total)} au total</p>
        </div>
        <button className="link-btn" onClick={() => onDrill("traffic")}>Voir le trafic ↗</button>
      </header>
      <div style={{ marginTop: 4 }}>
        <ShareBar segments={segments} height={10} />
      </div>
      <ul className="chan-list">
        {DATA.channels.map(c => (
          <li key={c.id} className="chan-row">
            <span className="chan-swatch" style={{ background: colorFor(c.color) }} />
            <span className="chan-name">{c.name}</span>
            <span className="chan-val">{fmt.number(c.sessions)}</span>
            <span className="chan-share">{fmt.pct(c.share, 1)}</span>
            <DeltaPill delta={c.delta} size="sm" />
          </li>
        ))}
      </ul>
    </section>
  );
}

function FunnelCard({ onDrill }) {
  const max = DATA.funnel[0].count;
  return (
    <section className="card">
      <header className="card-header">
        <div>
          <h3 className="card-title">Entonnoir de conversion</h3>
          <p className="card-sub">Parcours lead → mandat signé</p>
        </div>
        <button className="link-btn" onClick={() => onDrill("conversions")}>Explorer ↗</button>
      </header>
      <ul className="funnel">
        {DATA.funnel.map((f, i) => {
          const pct = f.count / max;
          const rate = i === 0 ? null : f.count / DATA.funnel[i - 1].count;
          return (
            <li key={i} className="funnel-row">
              <div className="funnel-head">
                <span className="funnel-stage">{f.stage}</span>
                <span className="funnel-count">{fmt.number(f.count)}</span>
              </div>
              <div className="funnel-bar-wrap">
                <div className="funnel-bar" style={{ width: (pct * 100) + "%" }} />
              </div>
              {rate != null && <div className="funnel-rate">{fmt.pct(rate, 1)} de conversion à l'étape</div>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function NotesPreview({ onDrill }) {
  return (
    <section className="card">
      <header className="card-header">
        <div>
          <h3 className="card-title">Notes récentes</h3>
          <p className="card-sub">De l'équipe SKS</p>
        </div>
        <button className="link-btn" onClick={() => onDrill("notes")}>Toutes les notes ↗</button>
      </header>
      <ul className="notes-preview">
        {DATA.notes.slice(0, 3).map((n, i) => (
          <li key={i} className="note-mini">
            <div className="note-mini-head">
              <span className={`note-tag note-tag-${n.tag.toLowerCase()}`}>{n.tag}</span>
              <span className="note-mini-date">{n.date}</span>
            </div>
            <div className="note-mini-title">{n.title}</div>
            <div className="note-mini-author">{n.author}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SummaryTab({ state, setState }) {
  const [selected, setSelected] = React.useState("sessions");
  const drill = (tab) => setState(s => ({ ...s, tab }));

  return (
    <div className="stack-lg">
      <div className="summary-head">
        <div>
          <div className="eyebrow">Rapport de performance</div>
          <h1 className="page-title">{DATA.client.name}</h1>
          <p className="page-sub">{DATA.client.subtitle} · {DATA.client.period}</p>
        </div>
        <div className="summary-chips">
          <span className="chip chip-pos">
            <span className="chip-dot" /> Revenus en hausse de {fmt.pctSigned(0.186)}
          </span>
          <span className="chip">
            <span className="chip-dot chip-dot-ink" /> Demandes de RDV {fmt.pctSigned(0.284)}
          </span>
          <span className="chip chip-warn">
            <span className="chip-dot" /> 1 campagne à revoir
          </span>
        </div>
      </div>

      <div className="kpi-grid">
        {DATA.kpis.map((k, i) => (
          <KPICard key={k.id} k={k} selected={selected === k.id} onSelect={setSelected} compare={state.compare}
            variant={i === 0 ? "navy" : (k.id === "cpa" ? "alert" : null)} />
        ))}
      </div>

      <HeroChart state={state} />

      <div className="grid-2-1">
        <ChannelMixCard onDrill={drill} />
        <FunnelCard onDrill={drill} />
      </div>

      <NotesPreview onDrill={drill} />
    </div>
  );
}

Object.assign(window, { SummaryTab });
