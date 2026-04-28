// Top bar: brand, tabs, filters (date range, channel), actions (compare, dark mode, export)

const TABS = [
  { id: "summary",    label: "Synthèse" },
  { id: "actions",    label: "Plan d'action" },
  { id: "traffic",    label: "Trafic" },
  { id: "seo",        label: "SEO" },
  { id: "paid",       label: "Publicité" },
  { id: "conversions",label: "Conversions" },
  { id: "pages",      label: "Pages populaires" },
  { id: "geo",        label: "Géographie" },
  { id: "notes",      label: "Notes" },
];

const DATE_PRESETS = [
  { id: "7d",  label: "7 derniers jours" },
  { id: "30d", label: "30 derniers jours" },
  { id: "qtd", label: "Trimestre en cours" },
  { id: "ytd", label: "Année en cours" },
  { id: "custom", label: "Personnalisé…" },
];

const CHANNELS = ["Tous les canaux", "Recherche organique", "Recherche payante", "Réseaux sociaux", "Accès direct", "Référent", "Email"];

function Logo() {
  return (
    <div className="brand">
      <img src="assets/sks-logo.svg" alt="SKS Talents" className="brand-mark" width="40" height="40" />
      <div className="brand-text">
        <div className="brand-name">SKS Talents</div>
        <div className="brand-sub">Your talent · our future</div>
      </div>
    </div>
  );
}

function TopBar({ state, setState, runtime, onRefresh }) {
  const [dateOpen, setDateOpen] = React.useState(false);
  const [chanOpen, setChanOpen] = React.useState(false);
  const [exportOpen, setExportOpen] = React.useState(false);

  React.useEffect(() => {
    const close = () => { setDateOpen(false); setChanOpen(false); setExportOpen(false); };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const stop = (e) => e.stopPropagation();

  return (
    <header className="topbar">
      <div className="topbar-row topbar-row-top">
        <Logo />

        <div className="topbar-filters">
          <div className="filter" onClick={stop}>
            <button className="filter-btn" onClick={(e) => { stop(e); setDateOpen(!dateOpen); setChanOpen(false); setExportOpen(false); }}>
              <span className="filter-label">Période</span>
              <span className="filter-value">{DATE_PRESETS.find(d => d.id === state.datePreset)?.label}</span>
              <span className="chev">▾</span>
            </button>
            {dateOpen && (
              <div className="menu" onClick={stop}>
                {DATE_PRESETS.map(d => (
                  <button key={d.id} className={`menu-item ${state.datePreset === d.id ? "active" : ""}`}
                    onClick={() => { setState(s => ({ ...s, datePreset: d.id })); setDateOpen(false); }}>
                    {d.label}
                  </button>
                ))}
                <div className="menu-divider" />
                <div className="menu-footnote">Actuelle : {DATA.client.period}</div>
              </div>
            )}
          </div>

          <div className="filter" onClick={stop}>
            <button className="filter-btn" onClick={(e) => { stop(e); setChanOpen(!chanOpen); setDateOpen(false); setExportOpen(false); }}>
              <span className="filter-label">Canal</span>
              <span className="filter-value">{state.channel}</span>
              <span className="chev">▾</span>
            </button>
            {chanOpen && (
              <div className="menu" onClick={stop}>
                {CHANNELS.map(c => (
                  <button key={c} className={`menu-item ${state.channel === c ? "active" : ""}`}
                    onClick={() => { setState(s => ({ ...s, channel: c })); setChanOpen(false); }}>
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          <label className="toggle">
            <input type="checkbox" checked={state.compare} onChange={e => setState(s => ({ ...s, compare: e.target.checked }))} />
            <span className="toggle-track"><span className="toggle-dot" /></span>
            <span className="toggle-label">Comparer à la période précédente</span>
          </label>
        </div>

        <div className="topbar-actions">
          {onRefresh && (
            <button className="btn" onClick={() => onRefresh(true)} title="Rafraîchir maintenant">
              {runtime && runtime.loading ? "Chargement…" : "Rafraîchir"}
            </button>
          )}
          <button className="icon-btn" title={state.dark ? "Mode clair" : "Mode sombre"} onClick={() => setState(s => ({ ...s, dark: !s.dark }))}>
            {state.dark ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4"/><g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><line x1="8" y1="1.5" x2="8" y2="3"/><line x1="8" y1="13" x2="8" y2="14.5"/><line x1="1.5" y1="8" x2="3" y2="8"/><line x1="13" y1="8" x2="14.5" y2="8"/><line x1="3.2" y1="3.2" x2="4.3" y2="4.3"/><line x1="11.7" y1="11.7" x2="12.8" y2="12.8"/><line x1="3.2" y1="12.8" x2="4.3" y2="11.7"/><line x1="11.7" y1="4.3" x2="12.8" y2="3.2"/></g></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.5 9.5A5.5 5.5 0 1 1 6.5 2.5a4.5 4.5 0 0 0 7 7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
            )}
          </button>

          <div className="export-wrap" onClick={stop}>
            <button className="btn btn-primary" onClick={(e) => { stop(e); setExportOpen(!exportOpen); setDateOpen(false); setChanOpen(false); }}>
              Exporter & partager
              <span className="chev">▾</span>
            </button>
            {exportOpen && (
              <div className="menu menu-right" onClick={stop}>
                <button
                  className="menu-item"
                  onClick={() => {
                    window.open(getDashboardApiUrl("/api/export-pdf", { range: state.datePreset, channel: state.channel }), "_blank", "noopener,noreferrer");
                    setExportOpen(false);
                  }}
                >
                  <span>Rapport PDF</span><span className="menu-sub">Dashboard complet, à la marque</span>
                </button>
                <button
                  className="menu-item"
                  onClick={() => {
                    window.location.href = getDashboardApiUrl("/api/export-csv", {
                      table: "campaigns",
                      range: state.datePreset,
                      channel: state.channel
                    });
                    setExportOpen(false);
                  }}
                >
                  <span>Données CSV</span><span className="menu-sub">Tous les tableaux, cette période</span>
                </button>
                <button
                  className="menu-item"
                  onClick={async () => {
                    await navigator.clipboard?.writeText(window.location.href);
                    setExportOpen(false);
                  }}
                >
                  <span>Copier le lien de partage</span><span className="menu-sub">Lecture seule, expire à 7 jours</span>
                </button>
                <div className="menu-divider" />
                <button className="menu-item" onClick={() => { window.location.href = getDashboardApiUrl("/dashboard/print"); setExportOpen(false); }}>
                  <span>Ouvrir la version print</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="tabs">
        {TABS.map(t => (
          <button key={t.id}
            className={`tab ${state.tab === t.id ? "tab-active" : ""}`}
            onClick={() => setState(s => ({ ...s, tab: t.id }))}>
            {t.label}
            {state.tab === t.id && <span className="tab-underline" />}
          </button>
        ))}
      </nav>
    </header>
  );
}

Object.assign(window, { TopBar, TABS });
