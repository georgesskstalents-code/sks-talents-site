// Shared primitives: format helpers, sparkline, delta pill, chart primitives

const fmt = {
  number: (n) => n >= 1000 ? n.toLocaleString("en-US", { maximumFractionDigits: 0 }) : String(n),
  compact: (n) => {
    const abs = Math.abs(n);
    if (abs >= 1e6) return (n / 1e6).toFixed(abs >= 1e7 ? 0 : 1) + "M";
    if (abs >= 1e3) return (n / 1e3).toFixed(abs >= 1e4 ? 0 : 1) + "k";
    return String(Math.round(n));
  },
  currency: (n) => "€" + Math.round(n).toLocaleString("fr-FR"),
  currencyDec: (n) => "€" + n.toFixed(2).replace(".", ","),
  multiple: (n) => n.toFixed(1) + "×",
  pct: (n, digits = 1) => (n * 100).toFixed(digits) + "%",
  pctSigned: (n, digits = 1) => (n >= 0 ? "+" : "") + (n * 100).toFixed(digits) + "%",
  duration: (s) => {
    const m = Math.floor(s / 60); const r = s % 60;
    return m + "m " + String(r).padStart(2, "0") + "s";
  },
};

function formatKPI(value, format) {
  switch (format) {
    case "number":       return fmt.compact(value);
    case "currency":     return "€" + fmt.compact(value);
    case "currency-dec": return fmt.currencyDec(value);
    case "multiple":     return fmt.multiple(value);
    case "percent":      return fmt.pct(value);
    default: return String(value);
  }
}

// Delta pill: arrow + percent. Inverse = lower is better (e.g. CPA).
function DeltaPill({ delta, inverse = false, size = "md" }) {
  const good = inverse ? delta < 0 : delta > 0;
  const sign = delta >= 0 ? "+" : "";
  const cls = good ? "delta-good" : "delta-bad";
  const arrow = delta >= 0 ? "↑" : "↓";
  return (
    <span className={`delta ${cls} delta-${size}`}>
      <span className="delta-arrow">{arrow}</span>
      {sign}{(delta * 100).toFixed(1)}%
    </span>
  );
}

// Sparkline: simple path, no axes
function Sparkline({ data, width = 120, height = 32, stroke = "currentColor", fill = "none", strokeWidth = 1.5 }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const pts = data.map((v, i) => [i * step, height - ((v - min) / range) * (height - 4) - 2]);
  const d = pts.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = d + ` L ${width} ${height} L 0 ${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block", overflow: "visible" }}>
      {fill !== "none" && <path d={area} fill={fill} opacity="0.18" />}
      <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Hover tooltip controller
function useHover() {
  const [hover, setHover] = React.useState(null);
  return [hover, setHover];
}

// Line/area chart with compare line
function LineAreaChart({ data, xKey, yKey, compareKey, height = 260, accent = "var(--accent)", showGrid = true, onHover, hoverIdx, yFormat = fmt.compact }) {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(800);
  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setW(e.contentRect.width);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const padL = 44, padR = 14, padT = 16, padB = 28;
  const innerW = Math.max(10, w - padL - padR);
  const innerH = height - padT - padB;
  const vals = data.map(d => d[yKey]);
  const cmpVals = compareKey ? data.map(d => d[compareKey]) : [];
  const all = [...vals, ...cmpVals];
  const min = 0;
  const max = Math.max(...all) * 1.1;
  const range = max - min || 1;
  const step = innerW / (data.length - 1);

  const x = (i) => padL + i * step;
  const y = (v) => padT + innerH - ((v - min) / range) * innerH;

  const line = (key) => data.map((d, i) => (i === 0 ? "M" : "L") + x(i).toFixed(1) + " " + y(d[key]).toFixed(1)).join(" ");
  const area = (key) => line(key) + ` L ${x(data.length - 1).toFixed(1)} ${padT + innerH} L ${x(0).toFixed(1)} ${padT + innerH} Z`;

  const ticks = 4;
  const gridLines = Array.from({ length: ticks + 1 }, (_, i) => {
    const v = min + (range * i) / ticks;
    return { v, y: y(v) };
  });

  const xTicks = [];
  const tickCount = Math.min(6, data.length);
  for (let i = 0; i < tickCount; i++) {
    const idx = Math.round(((data.length - 1) * i) / (tickCount - 1));
    xTicks.push({ i: idx, label: data[idx][xKey] });
  }

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left - padL;
    const idx = Math.max(0, Math.min(data.length - 1, Math.round(px / step)));
    onHover && onHover(idx, { x: x(idx), y: y(data[idx][yKey]) });
  };

  return (
    <div ref={ref} style={{ width: "100%", position: "relative" }}>
      <svg width={w} height={height} onMouseMove={handleMove} onMouseLeave={() => onHover && onHover(null)}>
        {showGrid && gridLines.map((g, i) => (
          <g key={i}>
            <line x1={padL} x2={w - padR} y1={g.y} y2={g.y} stroke="var(--line)" strokeWidth="1" strokeDasharray={i === ticks ? "" : "2 3"} opacity={i === ticks ? 1 : 0.6} />
            <text x={padL - 8} y={g.y + 4} textAnchor="end" fontSize="10.5" fill="var(--ink-soft)" fontFamily="var(--font-mono)">{yFormat(g.v)}</text>
          </g>
        ))}
        {xTicks.map((t, i) => (
          <text key={i} x={x(t.i)} y={height - 8} textAnchor="middle" fontSize="10.5" fill="var(--ink-soft)" fontFamily="var(--font-mono)">{t.label}</text>
        ))}

        {compareKey && (
          <path d={line(compareKey)} fill="none" stroke="var(--ink-soft)" strokeWidth="1.25" strokeDasharray="3 3" opacity="0.55" />
        )}

        <path d={area(yKey)} fill={accent} opacity="0.10" />
        <path d={line(yKey)} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {hoverIdx != null && (
          <g>
            <line x1={x(hoverIdx)} x2={x(hoverIdx)} y1={padT} y2={padT + innerH} stroke="var(--ink)" strokeWidth="1" opacity="0.35" />
            <circle cx={x(hoverIdx)} cy={y(data[hoverIdx][yKey])} r="4" fill="var(--bg)" stroke={accent} strokeWidth="2" />
            {compareKey && <circle cx={x(hoverIdx)} cy={y(data[hoverIdx][compareKey])} r="3" fill="var(--bg)" stroke="var(--ink-soft)" strokeWidth="1.5" />}
          </g>
        )}
      </svg>
    </div>
  );
}

function BarChart({ data, xKey, yKey, compareKey, height = 180, accent = "var(--accent)", yFormat = fmt.compact }) {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(600);
  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => setW(entries[0].contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  const padL = 44, padR = 14, padT = 12, padB = 28;
  const innerW = Math.max(10, w - padL - padR);
  const innerH = height - padT - padB;
  const max = Math.max(...data.map(d => Math.max(d[yKey], compareKey ? d[compareKey] : 0))) * 1.1;
  const bw = innerW / data.length;
  const barW = bw * (compareKey ? 0.34 : 0.58);

  return (
    <div ref={ref} style={{ width: "100%" }}>
      <svg width={w} height={height}>
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const v = max * (1 - t);
          const y = padT + innerH * t;
          return (
            <g key={i}>
              <line x1={padL} x2={w - padR} y1={y} y2={y} stroke="var(--line)" strokeDasharray={t === 1 ? "" : "2 3"} opacity={t === 1 ? 1 : 0.6} />
              <text x={padL - 8} y={y + 4} textAnchor="end" fontSize="10.5" fill="var(--ink-soft)" fontFamily="var(--font-mono)">{yFormat(v)}</text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const cx = padL + bw * i + bw / 2;
          const h1 = (d[yKey] / max) * innerH;
          const h2 = compareKey ? (d[compareKey] / max) * innerH : 0;
          return (
            <g key={i}>
              {compareKey && (
                <rect x={cx - barW - 2} y={padT + innerH - h2} width={barW} height={h2} fill="var(--ink-soft)" opacity="0.35" />
              )}
              <rect x={compareKey ? cx + 2 : cx - barW / 2} y={padT + innerH - h1} width={barW} height={h1} fill={accent} />
              <text x={cx} y={height - 8} textAnchor="middle" fontSize="10.5" fill="var(--ink-soft)" fontFamily="var(--font-mono)">{d[xKey]}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// Horizontal stacked share bar
function ShareBar({ segments, height = 8 }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  let acc = 0;
  return (
    <div style={{ display: "flex", width: "100%", height, borderRadius: 2, overflow: "hidden", background: "var(--line)" }}>
      {segments.map((s, i) => {
        const w = (s.value / total) * 100;
        const el = <div key={i} style={{ width: w + "%", background: s.color, height: "100%" }} title={s.label} />;
        acc += w;
        return el;
      })}
    </div>
  );
}

Object.assign(window, { fmt, formatKPI, DeltaPill, Sparkline, LineAreaChart, BarChart, ShareBar, useHover });
