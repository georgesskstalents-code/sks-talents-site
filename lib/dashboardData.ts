import { dashboardDemoData } from "@/data/dashboardDemo";
import { listDashboardNotes, getDashboardSourceState } from "@/lib/dashboardStore";

const DEFAULT_RANGE = "30d";
const DEFAULT_CHANNEL = "Tous les canaux";

function cloneDemoData() {
  return structuredClone(dashboardDemoData) as typeof dashboardDemoData;
}

function formatFrDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short"
  }).format(date);
}

function buildPeriodLabel(range: string) {
  const now = new Date();
  const currentEnd = new Date(now);
  const currentStart = new Date(now);
  const compareEnd = new Date(now);
  const compareStart = new Date(now);

  const days =
    range === "7d" ? 7 : range === "qtd" ? 30 : range === "ytd" ? 90 : range === "custom" ? 30 : 30;

  currentStart.setDate(currentStart.getDate() - (days - 1));
  compareEnd.setDate(compareEnd.getDate() - days);
  compareStart.setDate(compareStart.getDate() - (days * 2 - 1));

  return {
    period: `${formatFrDate(currentStart)} — ${formatFrDate(currentEnd)} ${currentEnd.getFullYear()}`,
    comparedTo: `${formatFrDate(compareStart)} — ${formatFrDate(compareEnd)} ${compareEnd.getFullYear()}`
  };
}

function normaliseChannel(channel: string | null) {
  if (!channel || channel === "all") return DEFAULT_CHANNEL;
  return channel;
}

function applyRange(data: typeof dashboardDemoData, range: string) {
  const ranged = cloneDemoData();
  ranged.dailySeries =
    range === "7d" ? (data.dailySeries.slice(-7) as typeof ranged.dailySeries) : data.dailySeries;
  const labels = buildPeriodLabel(range);
  ranged.client.period = labels.period;
  ranged.client.comparedTo = labels.comparedTo;
  return ranged;
}

function applyChannel(data: typeof dashboardDemoData, channel: string) {
  if (channel === DEFAULT_CHANNEL) {
    return data;
  }

  const selected = data.channels.find((item) => item.name === channel);
  if (!selected) {
    return data;
  }

  const share = selected.share;
  const next = structuredClone(data) as typeof dashboardDemoData;
  next.channels = [selected] as typeof next.channels;
  next.dailySeries = next.dailySeries.map((point) => ({
    ...point,
    sessions: Math.round(point.sessions * share),
    prev: Math.round(point.prev * share),
    conv: Math.max(1, Math.round(point.conv * share))
  })) as typeof next.dailySeries;
  next.kpis = next.kpis.map((kpi) => {
    if (["sessions", "users", "conversions", "revenue"].includes(kpi.id)) {
      return {
        ...kpi,
        value: Math.round(Number(kpi.value) * share)
      };
    }

    return kpi;
  }) as typeof next.kpis;
  return next;
}

export async function buildDashboardPayload(range: string, channelParam: string | null) {
  const channel = normaliseChannel(channelParam);
  const rangedData = applyRange(cloneDemoData(), range || DEFAULT_RANGE);
  const data = applyChannel(rangedData, channel);
  const notes = await listDashboardNotes();
  const sourceState = getDashboardSourceState();

  data.notes = notes.map((note) => ({
    date: note.date,
    author: note.author,
    tag: note.tag,
    title: note.title,
    body: note.body
  })) as typeof data.notes;

  return {
    ok: true,
    demoMode: true,
    lastUpdated: new Date().toISOString(),
    range: range || DEFAULT_RANGE,
    channel,
    data,
    sourceStatus: [
      {
        id: "ga4",
        label: "GA4",
        status: "missing",
        detail: "À connecter après déploiement"
      },
      {
        id: "gsc",
        label: "Search Console",
        status: "missing",
        detail: "À connecter après déploiement"
      },
      {
        id: "google-ads",
        label: "Google Ads",
        status: "missing",
        detail: "À connecter après déploiement"
      },
      {
        id: "meta-ads",
        label: "Meta Ads",
        status: "missing",
        detail: "À connecter si utilisé"
      },
      {
        id: "linkedin-ads",
        label: "LinkedIn Ads",
        status: "missing",
        detail: "À connecter si utilisé"
      },
      {
        id: "notion-notes",
        label: "Notion Notes",
        status: sourceState.notesConfigured ? "configured" : "demo",
        detail: sourceState.notesConfigured ? "Base Notes connectée" : "Fallback local actif"
      },
      {
        id: "notion-actions",
        label: "Notion Actions",
        status: sourceState.actionsConfigured ? "configured" : "demo",
        detail: sourceState.actionsConfigured ? "Base Actions connectée" : "Fallback local actif"
      }
    ],
    missingIntegrations: [
      "GA4_PROPERTY_ID",
      "GSC_SITE_URL",
      "GOOGLE_ADS_CUSTOMER_ID",
      "META_AD_ACCOUNT_ID",
      "LINKEDIN_AD_ACCOUNT_ID"
    ]
  };
}
