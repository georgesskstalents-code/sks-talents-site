import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  readLeadEventLog,
  readSiteAnalyticsLog,
  type LeadEventLog,
  type SiteAnalyticsEvent
} from "@/lib/siteIntelligence";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Suivi SKS Talents - routine matinale",
  description: "Tableau de bord quotidien SKS Talents. Vue d'ensemble pour démarrer la journée.",
  robots: { index: false, follow: false }
};

type SearchParams = { token?: string };

function isoDay(d: Date) {
  return d.toISOString().slice(0, 10);
}

function withinDays(timestamp: string, days: number) {
  const t = new Date(timestamp).getTime();
  if (Number.isNaN(t)) return false;
  return Date.now() - t < days * 24 * 60 * 60 * 1000;
}

function topN<T extends string | undefined>(
  items: (T | undefined)[],
  n: number
): { key: string; count: number }[] {
  const map = new Map<string, number>();
  for (const item of items) {
    if (!item) continue;
    map.set(item, (map.get(item) ?? 0) + 1);
  }
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([key, count]) => ({ key, count }));
}

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n);
}

function relativeTime(timestamp: string) {
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "à l'instant";
  if (diffMin < 60) return `il y a ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `il y a ${diffH} h`;
  const diffD = Math.floor(diffH / 24);
  return `il y a ${diffD} j`;
}

export default async function SuiviPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const expectedToken = process.env.DASHBOARD_PRIVATE_TOKEN;

  if (expectedToken) {
    const headerStore = await headers();
    const headerToken = headerStore.get("x-dashboard-token");
    const queryToken = params.token;
    if (queryToken !== expectedToken && headerToken !== expectedToken) {
      redirect("/");
    }
  }

  let analytics: SiteAnalyticsEvent[] = [];
  let leads: LeadEventLog[] = [];
  try {
    analytics = await readSiteAnalyticsLog();
  } catch {
    /* ignore */
  }
  try {
    leads = await readLeadEventLog();
  } catch {
    /* ignore */
  }

  const today = isoDay(new Date());
  const yesterday = isoDay(new Date(Date.now() - 24 * 60 * 60 * 1000));

  const todayEvents = analytics.filter((e) => e.createdAt?.startsWith(today));
  const yesterdayEvents = analytics.filter((e) => e.createdAt?.startsWith(yesterday));
  const last7d = analytics.filter((e) => withinDays(e.createdAt, 7));
  const last30d = analytics.filter((e) => withinDays(e.createdAt, 30));

  const todayPageviews = todayEvents.filter((e) => e.type === "pageview").length;
  const yesterdayPageviews = yesterdayEvents.filter((e) => e.type === "pageview").length;
  const todayQueries = todayEvents.filter(
    (e) => e.type === "agent_query" || e.type === "agent_query_voice"
  ).length;
  const todayCtaClicks = todayEvents.filter((e) => e.type === "cta_click").length;
  const todayFormSubmits = todayEvents.filter((e) => e.type === "form_submit").length;
  const todayFormSuccess = todayEvents.filter((e) => e.type === "form_success").length;
  const todayFormErrors = todayEvents.filter(
    (e) => e.type === "form_error" || e.type === "frontend_error"
  ).length;

  const todayLeads = leads.filter((l) => l.createdAt?.startsWith(today));
  const last7dLeads = leads.filter((l) => withinDays(l.createdAt, 7));
  const last30dLeads = leads.filter((l) => withinDays(l.createdAt, 30));

  const topPages7d = topN(
    last7d.filter((e) => e.type === "pageview").map((e) => e.path),
    10
  );
  const topQueries30d = topN(
    last30d
      .filter((e) => e.type === "agent_query" || e.type === "agent_query_voice")
      .map((e) => e.query),
    10
  );
  const contentGaps30d = topN(
    last30d.filter((e) => e.type === "agent_content_gap").map((e) => e.query),
    10
  );
  const recentLeads = leads
    .slice()
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
    .slice(0, 8);
  const recentErrors = analytics
    .filter((e) => e.type === "form_error" || e.type === "frontend_error")
    .slice(-5)
    .reverse();

  const pageviewDelta = todayPageviews - yesterdayPageviews;
  const deltaPct =
    yesterdayPageviews > 0 ? Math.round((pageviewDelta / yesterdayPageviews) * 100) : 0;

  const morningChecklist = [
    {
      label: "Vérifier Search Console - nouvelles requêtes & erreurs d'indexation",
      href: "https://search.google.com/search-console?resource_id=sc-domain:skstalents.fr"
    },
    {
      label: "Ouvrir Looker Studio - vues, sources, durée moyenne",
      href: "https://datastudio.google.com/u/0/reporting/419ebe34-5b48-47f1-8500-0879d5b9ddf2/page/yvZvF"
    },
    {
      label: "Lire les nouveaux leads ci-dessous + relancer ceux d'hier",
      href: "#leads"
    },
    {
      label: "Vérifier les content gaps (questions sans réponse) → créer du contenu",
      href: "#gaps"
    },
    {
      label: "Mettre à jour Notion (Suivi SKS Talents)",
      href: "https://www.notion.so/Suivi-SKS-Talents-Site-internet-3450c86f96f48133b0b0ff57aa0586ff"
    },
    {
      label: "Trustpilot - répondre aux nouveaux avis",
      href: "https://fr.trustpilot.com/review/skstalents.fr"
    }
  ];

  const tokenSuffix = expectedToken ? `?token=${expectedToken}` : "";

  return (
    <main className="min-h-screen bg-[#f7f8f8] py-8 font-sans text-brand-ink">
      <div className="container-shell max-w-6xl space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-3 rounded-[24px] bg-gradient-to-br from-brand-teal via-[#1a5759] to-brand-ink p-6 text-white shadow-soft sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-mint">
            Suivi quotidien · {new Date().toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
          </p>
          <h1 className="font-display text-3xl leading-[1.1] sm:text-4xl">
            Bonjour Georges. Voilà ce qui s'est passé sur SKS Talents.
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-white/80 sm:text-base">
            Ouvre cette page chaque matin. Tout y est en 5 minutes : pageviews, leads,
            recherches utilisateurs, contenus manquants à créer, et raccourcis vers tes
            outils externes.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link
              href={`/dashboard${tokenSuffix}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/25"
            >
              ← Dashboard complet
            </Link>
            <a
              href="https://www.skstalents.fr"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/25"
            >
              🌐 Voir le site live
            </a>
          </div>
        </header>

        {/* KPIs aujourd'hui */}
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            label="Vues aujourd'hui"
            value={fmt(todayPageviews)}
            sub={
              yesterdayPageviews > 0
                ? `${pageviewDelta >= 0 ? "+" : ""}${deltaPct}% vs hier`
                : "Pas de comparaison"
            }
            tone={pageviewDelta >= 0 ? "positive" : "negative"}
          />
          <KpiCard
            label="Leads aujourd'hui"
            value={fmt(todayLeads.length)}
            sub={`${fmt(last7dLeads.length)} sur 7j · ${fmt(last30dLeads.length)} sur 30j`}
            tone={todayLeads.length > 0 ? "positive" : "neutral"}
          />
          <KpiCard
            label="Recherches chat"
            value={fmt(todayQueries)}
            sub={`${fmt(todayCtaClicks)} clics CTA`}
            tone="neutral"
          />
          <KpiCard
            label="Formulaires"
            value={`${fmt(todayFormSuccess)} / ${fmt(todayFormSubmits)}`}
            sub={
              todayFormErrors > 0
                ? `⚠ ${todayFormErrors} erreurs à investiguer`
                : "0 erreur - tout passe"
            }
            tone={todayFormErrors > 0 ? "negative" : "positive"}
          />
        </section>

        {/* Routine matinale */}
        <section className="rounded-[24px] border border-brand-teal/15 bg-white p-6 shadow-soft sm:p-8">
          <h2 className="mb-4 font-display text-xl text-brand-ink">
            ☕ Routine matinale (5 min)
          </h2>
          <ul className="space-y-3">
            {morningChecklist.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="flex items-start gap-3 rounded-2xl border border-brand-teal/8 bg-brand-mint/15 px-4 py-3 transition hover:border-brand-teal/25 hover:bg-brand-mint/30"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand-teal/30 bg-white text-xs font-semibold text-brand-teal">
                    {idx + 1}
                  </span>
                  <span className="text-sm leading-6 text-brand-ink">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Top pages */}
        <section className="grid gap-4 lg:grid-cols-2">
          <Card title="🔥 Top pages (7j)" subtitle={`${fmt(topPages7d.length)} pages avec activité`}>
            {topPages7d.length === 0 ? (
              <Empty />
            ) : (
              <ol className="space-y-2">
                {topPages7d.map((row, idx) => (
                  <li
                    key={row.key}
                    className="flex items-center justify-between gap-3 rounded-xl px-2 py-2 hover:bg-brand-mint/15"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="text-xs font-mono text-brand-stone/60">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={row.key}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="truncate text-sm font-semibold text-brand-ink hover:text-brand-teal"
                      >
                        {row.key}
                      </a>
                    </div>
                    <span className="shrink-0 rounded-full bg-brand-mint/45 px-2.5 py-0.5 text-xs font-semibold text-brand-teal">
                      {fmt(row.count)} vues
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </Card>

          <Card title="🔍 Top recherches chat (30j)" subtitle="Ce que les visiteurs demandent à l'assistant">
            {topQueries30d.length === 0 ? (
              <Empty />
            ) : (
              <ol className="space-y-2">
                {topQueries30d.map((row, idx) => (
                  <li
                    key={row.key + idx}
                    className="flex items-start justify-between gap-3 rounded-xl px-2 py-2 hover:bg-brand-mint/15"
                  >
                    <span className="flex-1 text-sm leading-6 text-brand-ink">{row.key}</span>
                    <span className="shrink-0 rounded-full bg-brand-mint/45 px-2.5 py-0.5 text-xs font-semibold text-brand-teal">
                      {fmt(row.count)}×
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </Card>
        </section>

        {/* Content gaps */}
        <section
          id="gaps"
          className="rounded-[24px] border border-amber-300/40 bg-amber-50/40 p-6 sm:p-8"
        >
          <h2 className="mb-4 flex items-center gap-2 font-display text-xl text-brand-ink">
            🚨 Contenus manquants à créer ({contentGaps30d.length})
          </h2>
          <p className="mb-4 max-w-3xl text-sm leading-7 text-brand-stone">
            Ces questions ont été posées au chat mais l'IA n'a pas su répondre. Chaque
            question = un sujet d'article ou de page à créer pour capter l'audience.
          </p>
          {contentGaps30d.length === 0 ? (
            <Empty hint="Bon signe - l'assistant répond à tout. Surveille demain." />
          ) : (
            <ol className="space-y-2">
              {contentGaps30d.map((row, idx) => (
                <li
                  key={row.key + idx}
                  className="flex items-start justify-between gap-3 rounded-xl bg-white/85 px-3 py-2.5"
                >
                  <span className="flex-1 text-sm leading-6 text-brand-ink">{row.key}</span>
                  <span className="shrink-0 rounded-full bg-amber-200 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
                    {fmt(row.count)}× demandé
                  </span>
                </li>
              ))}
            </ol>
          )}
        </section>

        {/* Leads */}
        <section
          id="leads"
          className="rounded-[24px] border border-brand-teal/15 bg-white p-6 shadow-soft sm:p-8"
        >
          <h2 className="mb-2 font-display text-xl text-brand-ink">
            ✉️ Derniers leads ({fmt(recentLeads.length)})
          </h2>
          <p className="mb-4 text-xs text-brand-stone/80">
            Données issues des logs locaux (réinitialisées à chaque deploy Vercel).
            Pour persistance permanente → activer Supabase.
          </p>
          {recentLeads.length === 0 ? (
            <Empty hint="Aucun lead enregistré récemment." />
          ) : (
            <ul className="divide-y divide-brand-teal/8">
              {recentLeads.map((lead, idx) => (
                <li
                  key={`${lead.email ?? "anon"}-${idx}-${lead.createdAt}`}
                  className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-sm font-semibold text-brand-ink">
                      {lead.email ?? "-"}
                    </p>
                    <p className="text-xs text-brand-stone/80">
                      {lead.kind} · {lead.pagePath}
                    </p>
                  </div>
                  <p className="shrink-0 text-xs text-brand-stone/60">
                    {relativeTime(lead.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Erreurs récentes */}
        {recentErrors.length > 0 ? (
          <section className="rounded-[24px] border border-red-200 bg-red-50/40 p-6 sm:p-8">
            <h2 className="mb-3 font-display text-xl text-brand-ink">
              ⚠ Erreurs récentes ({recentErrors.length})
            </h2>
            <ul className="space-y-2">
              {recentErrors.map((e, idx) => (
                <li
                  key={idx}
                  className="rounded-xl bg-white/85 px-3 py-2.5 font-mono text-xs text-red-900"
                >
                  <span className="font-semibold">{e.type}</span> · {e.path}
                  {e.message ? ` - ${e.message}` : ""}
                  <span className="ml-2 text-red-700/70">{relativeTime(e.createdAt)}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Footer */}
        <footer className="flex flex-wrap items-center justify-between gap-2 px-2 pt-4 text-xs text-brand-stone/80">
          <p>
            Dernière mise à jour : {new Date().toLocaleString("fr-FR")} · Total events
            : {fmt(analytics.length)}
          </p>
          <p>SKS Talents · Suivi privé</p>
        </footer>
      </div>
    </main>
  );
}

function KpiCard({
  label,
  value,
  sub,
  tone
}: {
  label: string;
  value: string;
  sub: string;
  tone: "positive" | "negative" | "neutral";
}) {
  const ringClass =
    tone === "positive"
      ? "ring-emerald-200"
      : tone === "negative"
        ? "ring-red-200"
        : "ring-brand-teal/15";
  const subClass =
    tone === "positive"
      ? "text-emerald-700"
      : tone === "negative"
        ? "text-red-700"
        : "text-brand-stone";
  return (
    <div className={`rounded-[20px] bg-white p-5 shadow-soft ring-1 ${ringClass}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-stone/80">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl text-brand-ink">{value}</p>
      <p className={`mt-1 text-xs font-medium ${subClass}`}>{sub}</p>
    </div>
  );
}

function Card({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-brand-teal/15 bg-white p-5 shadow-soft sm:p-6">
      <h3 className="font-display text-lg text-brand-ink">{title}</h3>
      {subtitle ? (
        <p className="mt-0.5 text-xs text-brand-stone/80">{subtitle}</p>
      ) : null}
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Empty({ hint }: { hint?: string }) {
  return (
    <p className="rounded-xl bg-brand-mint/15 px-4 py-3 text-xs text-brand-stone/80">
      {hint ?? "Pas encore de données - la vue se remplira dès que le trafic démarre."}
    </p>
  );
}
