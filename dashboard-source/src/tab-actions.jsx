// Action board — kanban-style pilotage of recommended actions
// Priority × Impact × Status, with inline editing

const INITIAL_ACTIONS = [
  { id: 1, title: "Relancer le rétargeting IG avec nouvelles créas",
    why: "ROAS en baisse de 3.4× à 2.8× — fatigue créative détectée sur 'Roster Awareness IG'.",
    source: "Paid ads", owner: "Équipe Paid", due: "Apr 22",
    impact: "high", effort: "medium", priority: "P1", status: "in-progress",
    metrics: [{ label: "ROAS actuelle", val: "2.8×" }, { label: "ROAS cible", val: "3.5×" }] },
  { id: 2, title: "Créer contenu support pour « hire musician for event »",
    why: "Mot-clé en position 5 (vs 8 avant) — 8 800 recherches/mois. Potentiel top 3 avec 2-3 articles appui.",
    source: "SEO", owner: "Équipe SEO", due: "May 02",
    impact: "high", effort: "medium", priority: "P1", status: "todo",
    metrics: [{ label: "Position", val: "5" }, { label: "Volume mensuel", val: "8.8k" }] },
  { id: 3, title: "Rediriger trafic paid B2B vers /services/corporate",
    why: "La page Corporate convertit à 3.8% vs Home à 2.8% — gain potentiel de +36% sur conv. paid.",
    source: "Conversion", owner: "Équipe Strategy", due: "Apr 25",
    impact: "high", effort: "low", priority: "P1", status: "todo",
    metrics: [{ label: "Conv. home", val: "2.8%" }, { label: "Conv. corp", val: "3.8%" }] },
  { id: 4, title: "Scaler la campagne LinkedIn conférences (+40% budget)",
    why: "ROAS 5.2× avec 42 conv. — plafond du compte Ads non atteint. Fenêtre d'opportunité événements Q2.",
    source: "Paid ads", owner: "Équipe Paid", due: "Apr 28",
    impact: "medium", effort: "low", priority: "P2", status: "todo",
    metrics: [{ label: "ROAS", val: "5.2×" }, { label: "Spend actuel", val: "4,2 k€" }] },
  { id: 5, title: "Publier page talent pour Jude Okafor (best converter)",
    why: "Taux de conv 7.1% sur sa page actuelle, 9.6k sessions. Opportunité SEO/SEA autour de son nom.",
    source: "Content", owner: "Équipe Strategy", due: "May 05",
    impact: "medium", effort: "medium", priority: "P2", status: "todo",
    metrics: [{ label: "Conv. rate", val: "7.1%" }, { label: "Sessions", val: "9.6k" }] },
  { id: 6, title: "Refonte du formulaire /book (réduire friction)",
    why: "14.2% de conv déjà, mais 80% des visiteurs ne soumettent pas — audit UX recommandé.",
    source: "Conversion", owner: "Équipe UX", due: "May 15",
    impact: "high", effort: "high", priority: "P2", status: "todo",
    metrics: [{ label: "Drop-off", val: "80%" }, { label: "Conv actuelle", val: "14.2%" }] },
  { id: 7, title: "Vérifier budget non-brand Google — CPA en baisse",
    why: "CPA a baissé de 9.4% — marge pour scaler la campagne 'celebrity booking' sans perdre en efficacité.",
    source: "Paid ads", owner: "Équipe Paid", due: "Apr 24",
    impact: "medium", effort: "low", priority: "P2", status: "in-progress",
    metrics: [{ label: "CPA", val: "42,30 €" }, { label: "Delta", val: "-9.4%" }] },
  { id: 8, title: "Mettre à jour la page roster (refonte a boosté +3 positions)",
    why: "La dernière refonte a fait gagner 3 positions SEO sur 'celebrity booking agency'. Appliquer à /talent/*.",
    source: "SEO", owner: "Équipe SEO", due: "—",
    impact: "medium", effort: "high", priority: "P3", status: "done",
    metrics: [{ label: "Gain pos.", val: "+3" }, { label: "Clicks/mois", val: "2.8k" }] },
  { id: 9, title: "Automatiser rapport hebdo stakeholders@",
    why: "Demande récurrente de Léa — un envoi automatique lundi 9h couvrirait 100% des besoins de suivi.",
    source: "Ops", owner: "Équipe Data", due: "—",
    impact: "low", effort: "low", priority: "P3", status: "done",
    metrics: [] },
];

const STATUSES = [
  { id: "todo",        label: "À faire",       color: "var(--ink-softer)" },
  { id: "in-progress", label: "En cours",       color: "var(--accent)" },
  { id: "done",        label: "Terminé",        color: "var(--good)" },
];

const PRIORITIES = {
  P1: { label: "Priorité 1", dot: "var(--bad)",   note: "Cette semaine" },
  P2: { label: "Priorité 2", dot: "var(--warm)",  note: "Ce mois" },
  P3: { label: "Priorité 3", dot: "var(--ink-softer)", note: "Quand possible" },
};

const IMPACT_LABEL = { high: "Impact fort", medium: "Impact moyen", low: "Impact faible" };
const EFFORT_LABEL = { low: "Effort faible", medium: "Effort moyen", high: "Effort fort" };

function ActionsTab() {
  const [actions, setActions] = React.useState(INITIAL_ACTIONS);
  const [filter, setFilter] = React.useState("all");
  const [view, setView] = React.useState("board");   // board | matrix | list
  const [open, setOpen] = React.useState(null);

  const visible = filter === "all" ? actions : actions.filter(a => a.priority === filter);

  const setStatus = (id, status) => setActions(actions.map(a => a.id === id ? { ...a, status } : a));

  const countByStatus = (s) => actions.filter(a => a.status === s).length;
  const countByPriority = (p) => actions.filter(a => a.priority === p).length;

  return (
    <div className="stack-lg">
      <div className="section-head">
        <div>
          <div className="eyebrow">Pilotage</div>
          <h2 className="section-title">Action board</h2>
          <p className="section-sub" style={{ marginTop: 8 }}>
            Les actions à prendre, priorisées par impact et urgence. Basé sur les signaux de performance de ce mois.
          </p>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid-4">
        <div className="mini-stat">
          <div className="mini-label">À faire</div>
          <div className="mini-value">{countByStatus("todo")}</div>
          <div className="action-foot"><span className="dot" style={{ background: "var(--ink-softer)" }} /> en attente</div>
        </div>
        <div className="mini-stat">
          <div className="mini-label">En cours</div>
          <div className="mini-value" style={{ color: "var(--accent)" }}>{countByStatus("in-progress")}</div>
          <div className="action-foot"><span className="dot" style={{ background: "var(--accent)" }} /> cette semaine</div>
        </div>
        <div className="mini-stat">
          <div className="mini-label">Priorité 1</div>
          <div className="mini-value">{countByPriority("P1")}</div>
          <div className="action-foot"><span className="dot" style={{ background: "var(--bad)" }} /> urgence élevée</div>
        </div>
        <div className="mini-stat">
          <div className="mini-label">Gain potentiel</div>
          <div className="mini-value">+{fmt.currency(64200)}</div>
          <div className="action-foot" style={{ color: "var(--good)" }}>revenu estimé</div>
        </div>
      </div>

      {/* Controls */}
      <div className="action-toolbar">
        <div className="seg">
          <button className={`seg-btn ${view === "board" ? "seg-active" : ""}`} onClick={() => setView("board")}>Kanban</button>
          <button className={`seg-btn ${view === "matrix" ? "seg-active" : ""}`} onClick={() => setView("matrix")}>Matrice impact/effort</button>
          <button className={`seg-btn ${view === "list" ? "seg-active" : ""}`} onClick={() => setView("list")}>Liste</button>
        </div>
        <div className="seg">
          {["all", "P1", "P2", "P3"].map(p => (
            <button key={p} className={`seg-btn ${filter === p ? "seg-active" : ""}`} onClick={() => setFilter(p)}>
              {p === "all" ? "Toutes" : p}
            </button>
          ))}
        </div>
      </div>

      {view === "board" && (
        <div className="kanban">
          {STATUSES.map(col => {
            const items = visible.filter(a => a.status === col.id);
            return (
              <div key={col.id} className="kanban-col">
                <header className="kanban-head">
                  <div className="kanban-head-left">
                    <span className="dot" style={{ background: col.color }} />
                    <span className="kanban-title">{col.label}</span>
                    <span className="kanban-count">{items.length}</span>
                  </div>
                </header>
                <div className="kanban-body">
                  {items.length === 0 && <div className="kanban-empty">Aucune action</div>}
                  {items.map(a => (
                    <article key={a.id} className="action-card" onClick={() => setOpen(a)}>
                      <div className="action-card-head">
                        <span className="priority-pill" style={{ borderColor: PRIORITIES[a.priority].dot }}>
                          <span className="dot" style={{ background: PRIORITIES[a.priority].dot }} />{a.priority}
                        </span>
                        <span className="pill pill-source">{a.source}</span>
                      </div>
                      <h4 className="action-title">{a.title}</h4>
                      <p className="action-why">{a.why}</p>
                      {a.metrics.length > 0 && (
                        <div className="action-metrics">
                          {a.metrics.map((m, i) => (
                            <div key={i} className="action-metric">
                              <div className="action-metric-label">{m.label}</div>
                              <div className="action-metric-val">{m.val}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      <footer className="action-foot-row">
                        <span className="action-owner">{a.owner}</span>
                        <span className="action-due">{a.due}</span>
                      </footer>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {view === "matrix" && <MatrixView items={visible} onOpen={setOpen} />}

      {view === "list" && (
        <section className="card" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: 16 }}>Action</th><th>Source</th><th>Owner</th>
                <th>Impact</th><th>Effort</th><th>Priorité</th><th>Due</th><th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {visible.map(a => (
                <tr key={a.id} className="clickable" onClick={() => setOpen(a)}>
                  <td style={{ paddingLeft: 16 }}>
                    <div style={{ fontWeight: 600 }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-soft)", fontFamily: "var(--font-mono)", marginTop: 2 }}>{a.why.slice(0, 90)}…</div>
                  </td>
                  <td><span className="pill">{a.source}</span></td>
                  <td style={{ fontSize: 12, color: "var(--ink-soft)" }}>{a.owner}</td>
                  <td><span className={`impact-dot impact-${a.impact}`} />{IMPACT_LABEL[a.impact]}</td>
                  <td style={{ fontSize: 12, color: "var(--ink-soft)" }}>{EFFORT_LABEL[a.effort]}</td>
                  <td>
                    <span className="priority-pill" style={{ borderColor: PRIORITIES[a.priority].dot }}>
                      <span className="dot" style={{ background: PRIORITIES[a.priority].dot }} />{a.priority}
                    </span>
                  </td>
                  <td style={{ fontSize: 12, fontFamily: "var(--font-mono)" }}>{a.due}</td>
                  <td>
                    <select className="status-sel" value={a.status} onClick={(e) => e.stopPropagation()}
                      onChange={e => setStatus(a.id, e.target.value)}>
                      {STATUSES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {open && <ActionDetail action={open} onClose={() => setOpen(null)} onStatus={(s) => { setStatus(open.id, s); setOpen({ ...open, status: s }); }} />}
    </div>
  );
}

function MatrixView({ items, onOpen }) {
  // Matrix: x = effort (low→high), y = impact (low→high)
  const ex = { low: 0.2, medium: 0.5, high: 0.8 };
  const ey = { low: 0.8, medium: 0.5, high: 0.2 }; // inverted for svg y
  const W = 700, H = 420;
  return (
    <section className="card">
      <header className="card-header">
        <div>
          <h3 className="card-title">Matrice Impact × Effort</h3>
          <p className="card-sub">Priorité recommandée : cadran en haut à gauche (gros impact, peu d'effort).</p>
        </div>
      </header>
      <div style={{ position: "relative" }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="auto" style={{ display: "block" }}>
          {/* Quadrants */}
          <rect x="0" y="0" width={W/2} height={H/2} fill="var(--accent-soft)" />
          <rect x={W/2} y="0" width={W/2} height={H/2} fill="var(--line)" opacity="0.3" />
          <rect x="0" y={H/2} width={W/2} height={H/2} fill="var(--line)" opacity="0.3" />
          <rect x={W/2} y={H/2} width={W/2} height={H/2} fill="var(--line)" opacity="0.15" />
          <line x1={W/2} y1="0" x2={W/2} y2={H} stroke="var(--line-strong)" strokeDasharray="4 3" />
          <line x1="0" y1={H/2} x2={W} y2={H/2} stroke="var(--line-strong)" strokeDasharray="4 3" />

          <text x="16" y="26" fontSize="11" fontFamily="var(--font-mono)" fill="var(--accent)" fontWeight="600">QUICK WINS</text>
          <text x={W/2 + 16} y="26" fontSize="11" fontFamily="var(--font-mono)" fill="var(--ink-soft)" fontWeight="600">BIG BETS</text>
          <text x="16" y={H - 16} fontSize="11" fontFamily="var(--font-mono)" fill="var(--ink-softer)" fontWeight="600">FILL-INS</text>
          <text x={W/2 + 16} y={H - 16} fontSize="11" fontFamily="var(--font-mono)" fill="var(--ink-softer)" fontWeight="600">À ÉVITER</text>

          {/* Axes labels */}
          <text x={W - 10} y={H/2 - 6} textAnchor="end" fontSize="10" fontFamily="var(--font-mono)" fill="var(--ink-soft)">EFFORT →</text>
          <text x="10" y="14" fontSize="10" fontFamily="var(--font-mono)" fill="var(--ink-soft)">↑ IMPACT</text>

          {items.map(a => {
            const cx = ex[a.effort] * W;
            const cy = ey[a.impact] * H;
            return (
              <g key={a.id} onClick={() => onOpen(a)} style={{ cursor: "pointer" }}>
                <circle cx={cx} cy={cy} r="22" fill={PRIORITIES[a.priority].dot} opacity="0.18" />
                <circle cx={cx} cy={cy} r="12" fill={PRIORITIES[a.priority].dot} />
                <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">{a.id}</text>
                <text x={cx} y={cy + 32} textAnchor="middle" fontSize="11" fill="var(--ink)" fontWeight="500">
                  {a.title.length > 28 ? a.title.slice(0, 28) + "…" : a.title}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}

function ActionDetail({ action, onClose, onStatus }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-head">
          <span className="priority-pill" style={{ borderColor: PRIORITIES[action.priority].dot }}>
            <span className="dot" style={{ background: PRIORITIES[action.priority].dot }} />{action.priority} · {PRIORITIES[action.priority].note}
          </span>
          <span className="pill pill-source">{action.source}</span>
        </div>
        <h3 className="modal-title">{action.title}</h3>
        <div className="modal-grid">
          <div><div className="modal-label">Impact</div><div className="modal-val">{IMPACT_LABEL[action.impact]}</div></div>
          <div><div className="modal-label">Effort</div><div className="modal-val">{EFFORT_LABEL[action.effort]}</div></div>
          <div><div className="modal-label">Owner</div><div className="modal-val">{action.owner}</div></div>
          <div><div className="modal-label">Due</div><div className="modal-val" style={{ fontFamily: "var(--font-mono)" }}>{action.due}</div></div>
        </div>
        <div className="modal-label" style={{ marginTop: 18 }}>Pourquoi cette action</div>
        <p className="modal-why">{action.why}</p>
        {action.metrics.length > 0 && (
          <>
            <div className="modal-label" style={{ marginTop: 18 }}>Indicateurs clés</div>
            <div className="modal-metrics">
              {action.metrics.map((m, i) => (
                <div key={i} className="modal-metric">
                  <div className="action-metric-label">{m.label}</div>
                  <div className="action-metric-val" style={{ fontSize: 22 }}>{m.val}</div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="modal-label" style={{ marginTop: 18 }}>Changer le statut</div>
        <div className="modal-status-row">
          {STATUSES.map(s => (
            <button key={s.id} className={`btn ${action.status === s.id ? "btn-primary" : ""}`} onClick={() => onStatus(s.id)}>
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ActionsTab });
