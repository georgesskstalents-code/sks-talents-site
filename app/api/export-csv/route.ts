import { buildDashboardPayload } from "@/lib/dashboardData";
import { listDashboardActions, listDashboardNotes } from "@/lib/dashboardStore";

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

function escapeCsv(value: unknown) {
  const raw = String(value ?? "");
  if (/[",\n]/.test(raw)) {
    return `"${raw.replace(/"/g, "\"\"")}"`;
  }

  return raw;
}

function toCsv(rows: Array<Record<string, unknown>>) {
  if (!rows.length) {
    return "";
  }

  const headers = Object.keys(rows[0]);
  const lines = [headers.join(",")];

  for (const row of rows) {
    lines.push(headers.map((header) => escapeCsv(row[header])).join(","));
  }

  return lines.join("\n");
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const url = new URL(request.url);
  const table = url.searchParams.get("table") ?? "campaigns";
  const range = url.searchParams.get("range") ?? "30d";
  const channel = url.searchParams.get("channel");
  const payload = await buildDashboardPayload(range, channel);

  let rows: Array<Record<string, unknown>> = [];

  switch (table) {
    case "keywords":
      rows = payload.data.seoKeywords.map((item) => ({
        keyword: item.term,
        position: item.pos,
        previous_position: item.prev,
        volume: item.vol,
        clicks: item.clicks
      }));
      break;
    case "pages":
      rows = payload.data.topPages.map((item) => ({
        path: item.path,
        title: item.title,
        sessions: item.sessions,
        avg_time_seconds: item.avgTime,
        bounce_rate: item.bounce,
        conversion_rate: item.convRate
      }));
      break;
    case "channels":
      rows = payload.data.channels.map((item) => ({
        channel: item.name,
        sessions: item.sessions,
        share: item.share,
        delta: item.delta
      }));
      break;
    case "actions":
      rows = (await listDashboardActions()).map((item) => ({
        title: item.title,
        source: item.source,
        owner: item.owner,
        due: item.due,
        priority: item.priority,
        status: item.status
      }));
      break;
    case "notes":
      rows = (await listDashboardNotes()).map((item) => ({
        date: item.date,
        author: item.author,
        tag: item.tag,
        title: item.title,
        body: item.body
      }));
      break;
    default:
      rows = payload.data.paidCampaigns.map((item) => ({
        campaign: item.name,
        channel: item.channel,
        spend: item.spend,
        clicks: item.clicks,
        conversions: item.conv,
        roas: item.roas,
        delta: item.delta
      }));
      break;
  }

  const csv = toCsv(rows);

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="sks-dashboard-${table}.csv"`
    }
  });
}
