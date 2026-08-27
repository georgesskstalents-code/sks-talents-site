// Email HTML template · Lundi Matin SKS Talents
// Palette SKS · teal #4A9B9B · cream #EFEDE4 · ink #163334 · sand #F4F1E8
// Playfair Display + Inter · responsive mobile-first

function esc(s) {
  if (s === undefined || s === null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function trend(current, previous) {
  if (previous === undefined || previous === null || previous === 0) return "";
  const delta = current - previous;
  const pct = Math.round((delta / previous) * 100);
  if (delta > 0) return `<span style="color:#17A7A0;">+${pct}%</span>`;
  if (delta < 0) return `<span style="color:#C0392B;">${pct}%</span>`;
  return `<span style="color:#666;">stable</span>`;
}

function section(title, content) {
  return `
    <tr><td style="padding:24px 24px 8px 24px;border-top:1px solid #E5E1D6;">
      <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:22px;color:#163334;margin:0 0 12px 0;">${esc(title)}</h2>
      ${content}
    </td></tr>`;
}

function renderHeadline(data) {
  return `
    <tr><td style="padding:32px 24px 16px 24px;background:#4A9B9B;color:#FFFFFF;">
      <div style="font-family:'Inter',sans-serif;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;opacity:0.9;">
        📊 Lundi ${esc(data.date_label)} · Semaine ${esc(data.week_num)}
      </div>
      <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:26px;margin:12px 0 8px 0;line-height:1.2;">
        ${esc(data.headline_title)}
      </h1>
      <div style="font-family:'Inter',sans-serif;font-size:14px;opacity:0.92;">
        ${esc(data.headline_subtitle)}
      </div>
      <div style="margin-top:16px;font-family:'Inter',sans-serif;font-size:13px;">
        Momentum : <strong>${esc(data.momentum_arrow)}</strong> · ${esc(data.momentum_comment)}
      </div>
    </td></tr>`;
}

function renderSignals(rouge, vert) {
  const list = (items) =>
    (items || [])
      .map(
        (t, i) =>
          `<li style="margin:6px 0;font-family:'Inter',sans-serif;font-size:14px;color:#163334;">${i + 1}. ${esc(t)}</li>`
      )
      .join("");
  return section(
    "Les 3 signaux de la semaine",
    `
    <div style="display:table;width:100%;">
      <div style="display:table-cell;width:50%;padding-right:12px;vertical-align:top;">
        <div style="font-family:'Inter',sans-serif;font-weight:700;color:#C0392B;font-size:13px;margin-bottom:6px;">🔴 À TRAITER</div>
        <ol style="padding-left:16px;margin:0;">${list(rouge)}</ol>
      </div>
      <div style="display:table-cell;width:50%;padding-left:12px;vertical-align:top;border-left:1px solid #E5E1D6;">
        <div style="font-family:'Inter',sans-serif;font-weight:700;color:#17A7A0;font-size:13px;margin-bottom:6px;">🟢 À RÉPLIQUER</div>
        <ol style="padding-left:16px;margin:0;">${list(vert)}</ol>
      </div>
    </div>`
  );
}

function renderLeadsTable(rows) {
  const trs = (rows || [])
    .map(
      (r) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #E5E1D6;font-family:'Inter',sans-serif;font-size:13px;">${esc(r.source)}</td>
        <td style="padding:8px;border-bottom:1px solid #E5E1D6;font-family:'Inter',sans-serif;font-size:13px;text-align:right;">${esc(r.count)}</td>
        <td style="padding:8px;border-bottom:1px solid #E5E1D6;font-family:'Inter',sans-serif;font-size:13px;text-align:right;">${esc(r.emails)}</td>
        <td style="padding:8px;border-bottom:1px solid #E5E1D6;font-family:'Inter',sans-serif;font-size:13px;text-align:right;color:#17A7A0;font-weight:700;">${esc(r.qualified)}</td>
        <td style="padding:8px;border-bottom:1px solid #E5E1D6;font-family:'Inter',sans-serif;font-size:13px;text-align:right;">${esc(r.rdv)}</td>
      </tr>`
    )
    .join("");
  return section(
    "Leads par source",
    `
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th style="text-align:left;padding:8px;border-bottom:2px solid #4A9B9B;font-family:'Inter',sans-serif;font-size:12px;color:#163334;">Source</th>
          <th style="text-align:right;padding:8px;border-bottom:2px solid #4A9B9B;font-family:'Inter',sans-serif;font-size:12px;color:#163334;">Chats/leads</th>
          <th style="text-align:right;padding:8px;border-bottom:2px solid #4A9B9B;font-family:'Inter',sans-serif;font-size:12px;color:#163334;">Emails</th>
          <th style="text-align:right;padding:8px;border-bottom:2px solid #4A9B9B;font-family:'Inter',sans-serif;font-size:12px;color:#163334;">Score &gt; 70</th>
          <th style="text-align:right;padding:8px;border-bottom:2px solid #4A9B9B;font-family:'Inter',sans-serif;font-size:12px;color:#163334;">RDV</th>
        </tr>
      </thead>
      <tbody>${trs}</tbody>
    </table>`
  );
}

function renderSeo(seo) {
  const list = (items, arrow) =>
    (items || [])
      .map(
        (r) =>
          `<li style="margin:4px 0;font-family:'Inter',sans-serif;font-size:13px;color:#163334;">${arrow} <strong>${esc(r.query)}</strong> · Position ${esc(r.from)} → ${esc(r.to)}</li>`
      )
      .join("");
  return section(
    "SEO · les requêtes qui bougent",
    `
    <div style="font-family:'Inter',sans-serif;font-size:13px;color:#163334;">
      <div style="margin-bottom:8px;"><strong style="color:#17A7A0;">🟢 GAGNÉES cette semaine</strong></div>
      <ul style="padding-left:16px;margin:0 0 12px 0;">${list(seo.gained, "↑")}</ul>
      <div style="margin-bottom:8px;"><strong style="color:#C0392B;">🔴 PERDUES cette semaine</strong></div>
      <ul style="padding-left:16px;margin:0 0 12px 0;">${list(seo.lost, "↓")}</ul>
      <div style="margin-bottom:8px;"><strong style="color:#666;">🎯 À SURVEILLER (Top 20 stable)</strong></div>
      <ul style="padding-left:16px;margin:0;">${list(seo.watch, "→")}</ul>
    </div>`
  );
}

function renderLlm(llm) {
  const providers = Object.entries(llm.by_provider || {})
    .map(
      ([name, obj]) => `
      <tr>
        <td style="padding:6px;font-family:'Inter',sans-serif;font-size:13px;color:#163334;text-transform:capitalize;">${esc(name)}</td>
        <td style="padding:6px;font-family:'Inter',sans-serif;font-size:13px;text-align:right;">${esc(obj.mentions)}/${esc(obj.out_of)}</td>
        <td style="padding:6px;font-family:'Inter',sans-serif;font-size:13px;text-align:right;color:${obj.pct >= 40 ? "#17A7A0" : obj.pct >= 20 ? "#666" : "#C0392B"};font-weight:700;">${esc(obj.pct)}%</td>
      </tr>`
    )
    .join("");
  return section(
    "LLM domination · le nouveau SEO",
    `
    <div style="font-family:'Inter',sans-serif;font-size:14px;color:#163334;margin-bottom:12px;">
      <strong style="font-size:20px;color:#4A9B9B;">${esc(llm.score_num)}/${esc(llm.score_denom)}</strong> mentions "SKS Talents" détectées sur ${esc(llm.query_count)} requêtes × ${esc(llm.provider_count)} LLM = <strong>${esc(llm.score_pct)}%</strong>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th style="text-align:left;padding:6px;border-bottom:2px solid #4A9B9B;font-family:'Inter',sans-serif;font-size:12px;">LLM</th>
          <th style="text-align:right;padding:6px;border-bottom:2px solid #4A9B9B;font-family:'Inter',sans-serif;font-size:12px;">Mentions</th>
          <th style="text-align:right;padding:6px;border-bottom:2px solid #4A9B9B;font-family:'Inter',sans-serif;font-size:12px;">%</th>
        </tr>
      </thead>
      <tbody>${providers}</tbody>
    </table>
    <div style="font-family:'Inter',sans-serif;font-size:12px;color:#666;margin-top:8px;">🎯 Cible juin 2027 · 45/75 (60%)</div>`
  );
}

function renderLinkedIn(li) {
  return section(
    "LinkedIn · pilotage",
    `
    <div style="font-family:'Inter',sans-serif;font-size:13px;color:#163334;line-height:1.7;">
      <strong>PROFIL PERSO GEORGES</strong><br>
      Followers · ${esc(li.perso_followers)} (${trend(li.perso_followers, li.perso_followers_prev)})<br>
      Impressions · ${esc(li.perso_impressions?.toLocaleString?.("fr-FR") || li.perso_impressions)} (${trend(li.perso_impressions, li.perso_impressions_prev)})<br>
      Top post · ${esc(li.perso_top_post)}<br><br>
      <strong>PAGE SKS TALENTS</strong><br>
      Followers · ${esc(li.page_followers)} (${trend(li.page_followers, li.page_followers_prev)})<br>
      Impressions · ${esc(li.page_impressions?.toLocaleString?.("fr-FR") || li.page_impressions)} (${trend(li.page_impressions, li.page_impressions_prev)})<br>
      Top post · ${esc(li.page_top_post)}<br><br>
      <strong>NEWSLETTER LINKEDIN</strong><br>
      Abonnés · ${esc(li.newsletter_subs)} (${trend(li.newsletter_subs, li.newsletter_subs_prev)})<br>
      Édition · ${esc(li.newsletter_edition)}
    </div>`
  );
}

function renderDecision(txt) {
  return `
    <tr><td style="padding:24px;">
      <div style="background:#FFF9E5;border:2px solid #F4C542;border-radius:10px;padding:20px;">
        <div style="font-family:'Inter',sans-serif;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#8B7500;margin-bottom:8px;">🎯 La décision de la semaine</div>
        <div style="font-family:'Playfair Display',Georgia,serif;font-size:17px;color:#163334;line-height:1.4;">${esc(txt)}</div>
      </div>
    </td></tr>`;
}

export function renderLundiMatinEmail(data) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Lundi Matin SKS Talents · ${esc(data.date_label)}</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:#EFEDE4;font-family:'Inter','Helvetica Neue',Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EFEDE4;">
  <tr><td align="center" style="padding:24px 12px;">
    <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;background:#FFFFFF;border-radius:12px;overflow:hidden;">
      ${renderHeadline(data)}
      ${renderSignals(data.signals_rouge, data.signals_vert)}
      ${renderLeadsTable(data.leads_par_source)}
      ${renderSeo(data.seo)}
      ${renderLlm(data.llm)}
      ${renderLinkedIn(data.linkedin)}
      ${section("Contenu produit vs publié", `<div style="font-family:'Inter',sans-serif;font-size:13px;color:#163334;">${esc(data.content_summary)}</div>`)}
      ${section("Sales Pipeline (Notion)", `<div style="font-family:'Inter',sans-serif;font-size:13px;color:#163334;">${esc(data.sales_pipeline_summary)}</div>`)}
      ${section("Ops · Sprint SKS Autonomous Cabinet v3", `<div style="font-family:'Inter',sans-serif;font-size:13px;color:#163334;line-height:1.7;">${esc(data.ops_sprint_summary)}</div>`)}
      ${renderDecision(data.decision_semaine)}
      <tr><td style="padding:24px;background:#EFEDE4;text-align:center;border-top:1px solid #E5E1D6;">
        <div style="font-family:'Playfair Display',Georgia,serif;font-size:14px;color:#163334;font-weight:700;">SKS Talents</div>
        <div style="font-family:'Inter',sans-serif;font-size:11px;color:#666;margin-top:4px;">Lundi Matin · rapport hebdomadaire consolidé</div>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}
