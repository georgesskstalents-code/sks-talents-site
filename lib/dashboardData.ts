import { createClient } from "@supabase/supabase-js";
import { dashboardDemoData } from "@/data/dashboardDemo";
import { listDashboardNotes, getDashboardSourceState } from "@/lib/dashboardStore";

const DEFAULT_RANGE = "30d";
const DEFAULT_CHANNEL = "Tous les canaux";

function getSupabase() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
    if (!url || !key) return null;
    return createClient(url, key);
}

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
        period: `${formatFrDate(currentStart)} - ${formatFrDate(currentEnd)} ${currentEnd.getFullYear()}`,
        comparedTo: `${formatFrDate(compareStart)} - ${formatFrDate(compareEnd)} ${compareEnd.getFullYear()}`
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
    if (channel === DEFAULT_CHANNEL) return data;
    const selected = data.channels.find((item) => item.name === channel);
    if (!selected) return data;
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
                  return { ...kpi, value: Math.round(Number(kpi.value) * share) };
          }
          return kpi;
    }) as typeof next.kpis;
    return next;
}

async function fetchSupabaseMetrics(range: string) {
    const supabase = getSupabase();
    if (!supabase) return null;

  const days = range === "7d" ? 7 : 30;
    const since = new Date();
    since.setDate(since.getDate() - days);
    const sinceIso = since.toISOString();

  try {
        const [keywordsRes, llmRes, gscRes] = await Promise.all([
                supabase
                  .from("seo_keyword_proposals")
                  .select("keyword, score, source_category, status")
                  .eq("status", "approved")
                  .order("score", { ascending: false })
                  .limit(20),
                supabase
                  .from("llm_mention_checks")
                  .select("provider, mentioned, run_at")
                  .gte("run_at", sinceIso)
                  .order("run_at", { ascending: false })
                  .limit(50),
                supabase
                  .from("gsc_weekly_snapshots")
                  .select("week_start, clicks, impressions, avg_position, ctr")
                  .order("week_start", { ascending: false })
                  .limit(8)
              ]);

      const keywords = keywordsRes.data ?? [];
        const llmMentions = llmRes.data ?? [];
        const gscData = gscRes.data ?? [];

      const llmByProvider: Record<string, { total: number; mentioned: number }> = {};
        for (const row of llmMentions) {
                if (!llmByProvider[row.provider]) llmByProvider[row.provider] = { total: 0, mentioned: 0 };
                llmByProvider[row.provider].total++;
                if (row.mentioned) llmByProvider[row.provider].mentioned++;
        }

      const latestGsc = gscData[0] ?? null;

      return {
              keywords,
              llmByProvider,
              latestGsc,
              gscHistory: gscData
      };
  } catch {
        return null;
  }
}

export async function buildDashboardPayload(range: string, channelParam: string | null) {
    const channel = normaliseChannel(channelParam);
    const rangedData = applyRange(cloneDemoData(), range || DEFAULT_RANGE);
    const data = applyChannel(rangedData, channel);
    const notes = await listDashboardNotes();
    const sourceState = getDashboardSourceState();
    const supabaseMetrics = await fetchSupabaseMetrics(range || DEFAULT_RANGE);

  data.notes = notes.map((note) => ({
        date: note.date,
        author: note.author,
        tag: note.tag,
        title: note.title,
        body: note.body
  })) as typeof data.notes;

  const hasRealData = supabaseMetrics !== null;

  return {
        ok: true,
        demoMode: !hasRealData,
        lastUpdated: new Date().toISOString(),
        range: range || DEFAULT_RANGE,
        channel,
        data,
        supabase: hasRealData ? {
                seoKeywords: supabaseMetrics.keywords,
                llmMentions: supabaseMetrics.llmByProvider,
                gsc: {
                          latest: supabaseMetrics.latestGsc,
                          history: supabaseMetrics.gscHistory
                }
        } : null,
        sourceStatus: [
          {
                    id: "supabase",
                    label: "Supabase",
                    status: hasRealData ? "ok" : "missing",
                    detail: hasRealData ? "Connecte - donnees reelles actives" : "Variables SUPABASE non configurees"
          },
          {
                    id: "gsc",
                    label: "Search Console",
                    status: supabaseMetrics?.latestGsc ? "ok" : "partial",
                    detail: supabaseMetrics?.latestGsc
                      ? `Derniere semaine : ${supabaseMetrics.latestGsc.clicks} clics, pos. ${supabaseMetrics.latestGsc.avg_position}`
                                : "Aucune donnee GSC en base"
          },
          {
                    id: "seo",
                    label: "Mots-cles SEO",
                    status: (supabaseMetrics?.keywords?.length ?? 0) > 0 ? "ok" : "missing",
                    detail: `${supabaseMetrics?.keywords?.length ?? 0} mots-cles approuves`
          },
          {
                    id: "llm",
                    label: "LLM Tracking",
                    status: Object.keys(supabaseMetrics?.llmByProvider ?? {}).length > 0 ? "ok" : "missing",
                    detail: Object.entries(supabaseMetrics?.llmByProvider ?? {})
                      .map(([p, v]) => `${p}: ${v.mentioned}/${v.total}`)
                      .join(" | ") || "Aucune donnee LLM recente"
          }
              ]
  };
}
