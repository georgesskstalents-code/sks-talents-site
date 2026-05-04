import { promises as fs } from "fs";
import path from "path";

function isAuthorized(request: Request) {
  const expectedToken = process.env.DASHBOARD_PRIVATE_TOKEN;

  if (!expectedToken) {
    return true;
  }

  const url = new URL(request.url);
  const queryToken = url.searchParams.get("token");
  const headerToken = request.headers.get("x-dashboard-token");
  return queryToken === expectedToken || headerToken === expectedToken;
}

const EXTERNAL_TOOLS_BANNER = `
<style>
  .sks-tools-banner{position:sticky;top:0;z-index:60;display:flex;flex-wrap:wrap;gap:8px;padding:12px 16px;background:#0f4d4f;color:#fff;font-family:system-ui,-apple-system,sans-serif;font-size:12px;align-items:center;border-bottom:1px solid rgba(255,255,255,.08);}
  .sks-tools-banner b{font-weight:600;letter-spacing:.05em;text-transform:uppercase;font-size:11px;opacity:.75;margin-right:4px;}
  .sks-tools-banner a{color:#fff;text-decoration:none;padding:6px 10px;border-radius:8px;background:rgba(255,255,255,.08);transition:background .2s;font-weight:500;white-space:nowrap;}
  .sks-tools-banner a:hover{background:rgba(255,255,255,.18);}
  .sks-tools-banner a.primary{background:#41a0a4;}
  .sks-tools-banner a.primary:hover{background:#5cb8bd;}
</style>
<div class="sks-tools-banner">
  <b>Mes outils analytics</b>
  <a href="https://search.google.com/search-console?resource_id=sc-domain:skstalents.fr" target="_blank" rel="noopener">📈 Search Console</a>
  <a href="https://datastudio.google.com/u/0/reporting/419ebe34-5b48-47f1-8500-0879d5b9ddf2/page/yvZvF" target="_blank" rel="noopener">📊 Looker Studio</a>
  <a href="https://www.notion.so/Suivi-SKS-Talents-Site-internet-3450c86f96f48133b0b0ff57aa0586ff" target="_blank" rel="noopener">📝 Suivi Notion</a>
  <a href="https://vercel.com/georgesskstalents-6501s-projects/skstalents-le-site" target="_blank" rel="noopener">▲ Vercel</a>
  <a href="https://fr.trustpilot.com/review/skstalents.fr" target="_blank" rel="noopener">⭐ Trustpilot</a>
  <a class="primary" href="https://www.skstalents.fr" target="_blank" rel="noopener">🌐 Voir le site</a>
</div>
`;

function cleanDashboardHtml(html: string) {
  return html
    .replace(/<style data-omelette-injected[\s\S]*?<\/style>/, "")
    .replace(/<script data-omelette-injected[\s\S]*?<\/script>/, "")
    .replace("</head>", '<base href="/dashboard/" />\n</head>')
    .replace(/<body([^>]*)>/, `<body$1>${EXTERNAL_TOOLS_BANNER}`);
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const filePath = path.join(process.cwd(), "public", "dashboard", "Dashboard.html");
  const html = await fs.readFile(filePath, "utf8");

  return new Response(cleanDashboardHtml(html), {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
