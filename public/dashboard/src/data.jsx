// Mock data for SKS Talents dashboard
// All values are illustrative placeholders

const DEMO_DATA = {
  client: {
    name: "SKS Talents",
    subtitle: "Agence de management et de booking d'artistes",
    period: "20 mars — 20 avril 2026",
    comparedTo: "17 fév — 19 mars 2026",
  },

  kpis: [
    { id: "sessions",    label: "Sessions",            value: 184230, delta: +0.142, format: "number",   spark: [62,68,71,74,72,78,81,84,88,92,96,101,108,115,122,128,134,140,146,152,158,164,170,176,178,182,184] },
    { id: "users",       label: "Utilisateurs uniques",    value: 126840, delta: +0.118, format: "number",   spark: [48,51,54,57,58,62,65,68,71,74,77,81,85,89,93,97,101,105,109,113,116,119,121,123,124,125,126] },
    { id: "conversions", label: "Conversions",     value: 3842,   delta: +0.231, format: "number",   spark: [1.2,1.3,1.4,1.5,1.6,1.7,1.9,2.0,2.2,2.3,2.5,2.6,2.8,3.0,3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.7,3.8,3.8,3.8,3.84,3.84] },
    { id: "revenue",     label: "Chiffre d'affaires attribué", value: 284920, delta: +0.186, format: "currency", spark: [110,118,125,132,140,148,156,164,172,180,188,196,204,212,220,228,236,244,252,260,268,274,278,281,283,284,285] },
    { id: "cpa",         label: "Coût par acquisition", value: 42.30, delta: -0.094, format: "currency-dec", spark: [52,51,50,50,49,49,48,48,47,47,46,46,46,45,45,44,44,44,44,43,43,43,43,42,42,42,42], inverse: true },
    { id: "roas",        label: "ROAS",            value: 4.2,    delta: +0.087, format: "multiple", spark: [3.4,3.5,3.5,3.6,3.6,3.7,3.7,3.8,3.8,3.8,3.9,3.9,3.9,4.0,4.0,4.0,4.1,4.1,4.1,4.1,4.1,4.2,4.2,4.2,4.2,4.2,4.2] },
  ],

  // Daily sessions + conversions for the hero chart (27 days)
  dailySeries: [
    { d: "Mar 20", sessions: 5420, prev: 4810, conv: 118 },
    { d: "Mar 21", sessions: 5810, prev: 5020, conv: 124 },
    { d: "Mar 22", sessions: 4920, prev: 4410, conv: 102 },
    { d: "Mar 23", sessions: 6120, prev: 5340, conv: 138 },
    { d: "Mar 24", sessions: 6540, prev: 5610, conv: 142 },
    { d: "Mar 25", sessions: 6810, prev: 5820, conv: 151 },
    { d: "Mar 26", sessions: 7120, prev: 6040, conv: 158 },
    { d: "Mar 27", sessions: 6980, prev: 6120, conv: 148 },
    { d: "Mar 28", sessions: 5840, prev: 5210, conv: 122 },
    { d: "Mar 29", sessions: 5210, prev: 4810, conv: 108 },
    { d: "Mar 30", sessions: 6430, prev: 5580, conv: 134 },
    { d: "Mar 31", sessions: 7240, prev: 6210, conv: 162 },
    { d: "Apr 01", sessions: 7810, prev: 6540, conv: 174 },
    { d: "Apr 02", sessions: 8120, prev: 6810, conv: 182 },
    { d: "Apr 03", sessions: 8340, prev: 7020, conv: 188 },
    { d: "Apr 04", sessions: 7520, prev: 6540, conv: 164 },
    { d: "Apr 05", sessions: 6810, prev: 6020, conv: 142 },
    { d: "Apr 06", sessions: 7920, prev: 6810, conv: 178 },
    { d: "Apr 07", sessions: 8640, prev: 7240, conv: 194 },
    { d: "Apr 08", sessions: 8920, prev: 7410, conv: 204 },
    { d: "Apr 09", sessions: 9120, prev: 7620, conv: 212 },
    { d: "Apr 10", sessions: 9340, prev: 7810, conv: 218 },
    { d: "Apr 11", sessions: 8620, prev: 7320, conv: 192 },
    { d: "Apr 12", sessions: 7920, prev: 6940, conv: 174 },
    { d: "Apr 13", sessions: 9240, prev: 7810, conv: 214 },
    { d: "Apr 14", sessions: 9640, prev: 8020, conv: 226 },
    { d: "Apr 15", sessions: 9820, prev: 8120, conv: 232 },
  ],

  channels: [
    { id: "organic",  name: "Recherche organique",  sessions: 68420, share: 0.371, delta: +0.164, color: "accent" },
    { id: "direct",   name: "Accès direct",           sessions: 42180, share: 0.229, delta: +0.082, color: "ink" },
    { id: "social",   name: "Réseaux sociaux",           sessions: 31240, share: 0.170, delta: +0.241, color: "warm" },
    { id: "paid",     name: "Recherche payante",      sessions: 22840, share: 0.124, delta: +0.118, color: "cool" },
    { id: "referral", name: "Référent",         sessions: 12680, share: 0.069, delta: -0.032, color: "mute" },
    { id: "email",    name: "E-mail",            sessions: 6870,  share: 0.037, delta: +0.054, color: "mute2" },
  ],

  seoKeywords: [
    { term: "celebrity booking agency",       pos: 3,  prev: 6,  vol: 12100, clicks: 2840, trend: [6,6,5,5,4,4,3,3] },
    { term: "hire musician for event",        pos: 5,  prev: 8,  vol: 8800,  clicks: 1920, trend: [9,8,8,7,7,6,5,5] },
    { term: "talent agency new york",         pos: 2,  prev: 2,  vol: 6200,  clicks: 2140, trend: [2,2,2,3,2,2,2,2] },
    { term: "book a speaker for conference",  pos: 8,  prev: 14, vol: 5400,  clicks: 640,  trend: [14,13,12,11,10,9,9,8] },
    { term: "sks talents",                    pos: 1,  prev: 1,  vol: 4800,  clicks: 3820, trend: [1,1,1,1,1,1,1,1] },
    { term: "dj booking agency",              pos: 4,  prev: 7,  vol: 4100,  clicks: 1120, trend: [8,7,7,6,5,5,4,4] },
    { term: "corporate event entertainment",  pos: 11, prev: 18, vol: 3600,  clicks: 320,  trend: [18,17,16,15,14,13,12,11] },
    { term: "keynote speaker agency",         pos: 6,  prev: 9,  vol: 2900,  clicks: 420,  trend: [10,9,9,8,7,7,6,6] },
  ],

  seoPositionBuckets: [
    { bucket: "1–3",   count: 142, prev: 118 },
    { bucket: "4–10",  count: 284, prev: 246 },
    { bucket: "11–20", count: 318, prev: 342 },
    { bucket: "21–50", count: 612, prev: 684 },
    { bucket: "51+",   count: 428, prev: 472 },
  ],

  conversions: [
    { id: "booking",   name: "Demande de booking",     count: 1842, value: 184200, delta: +0.284 },
    { id: "callback",  name: "Rappel demandé",  count: 984,  value: 0,       delta: +0.142 },
    { id: "newsletter",name: "Inscription newsletter",   count: 624,  value: 0,       delta: +0.068 },
    { id: "download",  name: "Téléchargement press-kit",  count: 292,  value: 0,       delta: +0.318 },
    { id: "purchase",  name: "Acompte versé",        count: 100,  value: 100720,  delta: +0.214 },
  ],

  funnel: [
    { stage: "Site visité",                  count: 184230 },
    { stage: "Roster consulté",              count: 82640  },
    { stage: "Fiche artiste ouverte",        count: 38420  },
    { stage: "Demande de booking soumise",   count: 7840   },
    { stage: "Contrat signé",                count: 3842   },
  ],

  topPages: [
    { path: "/",                             title: "Accueil",                       sessions: 42180, avgTime: 142, bounce: 0.34, convRate: 0.028 },
    { path: "/roster",                       title: "Roster complet",                sessions: 28640, avgTime: 218, bounce: 0.22, convRate: 0.041 },
    { path: "/talent/maya-rivera",           title: "Maya Rivera",                sessions: 18920, avgTime: 284, bounce: 0.18, convRate: 0.062 },
    { path: "/talent/the-north-collective",  title: "The North Collective",       sessions: 14240, avgTime: 246, bounce: 0.21, convRate: 0.048 },
    { path: "/services/corporate",           title: "Événements corporate",           sessions: 11820, avgTime: 194, bounce: 0.28, convRate: 0.038 },
    { path: "/talent/jude-okafor",           title: "Jude Okafor",                sessions: 9640,  avgTime: 312, bounce: 0.16, convRate: 0.071 },
    { path: "/book",                         title: "Formulaire de booking",               sessions: 7840,  avgTime: 198, bounce: 0.12, convRate: 0.142 },
    { path: "/about",                        title: "À propos de SKS",                  sessions: 6420,  avgTime: 124, bounce: 0.42, convRate: 0.014 },
    { path: "/press",                        title: "Presse & media kit",          sessions: 4820,  avgTime: 168, bounce: 0.38, convRate: 0.022 },
  ],

  paidCampaigns: [
    { name: "Marque — SKS Talents",        channel: "Google Ads", spend: 8420, clicks: 4820, conv: 184, roas: 6.8, delta: +0.124 },
    { name: "Hors-marque — Booking célébrités", channel: "Google Ads", spend: 12840,clicks: 6420, conv: 142, roas: 3.2, delta: +0.082 },
    { name: "Événements corporate — retargeting",channel: "Meta",       spend: 6840, clicks: 8240, conv: 98,  roas: 4.1, delta: +0.214 },
    { name: "Notoriété roster — IG",      channel: "Meta",       spend: 5210, clicks: 12640,conv: 62,  roas: 2.8, delta: -0.042 },
    { name: "LinkedIn — leads conférences",channel: "LinkedIn",   spend: 4180, clicks: 2120, conv: 42,  roas: 5.2, delta: +0.168 },
    { name: "YouTube — reels artistes",     channel: "YouTube",    spend: 2840, clicks: 3820, conv: 24,  roas: 1.8, delta: +0.318 },
  ],

  // country code -> relative intensity 0..1 + sessions
  geo: [
    { code: "US", name: "États-Unis",  sessions: 84620, share: 0.459, intensity: 1.00 },
    { code: "GB", name: "Royaume-Uni", sessions: 18240, share: 0.099, intensity: 0.62 },
    { code: "CA", name: "Canada",         sessions: 14820, share: 0.080, intensity: 0.54 },
    { code: "FR", name: "France",         sessions: 11240, share: 0.061, intensity: 0.44 },
    { code: "AU", name: "Australia",      sessions: 9840,  share: 0.053, intensity: 0.38 },
    { code: "DE", name: "Allemagne",        sessions: 8420,  share: 0.046, intensity: 0.33 },
    { code: "AE", name: "UAE",            sessions: 6840,  share: 0.037, intensity: 0.28 },
    { code: "JP", name: "Japon",          sessions: 5420,  share: 0.029, intensity: 0.22 },
    { code: "BR", name: "Brésil",         sessions: 4820,  share: 0.026, intensity: 0.20 },
    { code: "IN", name: "Inde",          sessions: 3840,  share: 0.021, intensity: 0.16 },
  ],

  notes: [
    { date: "Apr 14", author: "Équipe Strategy", tag: "Lancement",   title: "Campagne roster printemps lancée",
      body: "Lancement du roster printemps sur Meta + Google. Signal précoce : +24% de sessions en semaine-sur-semaine, demandes de booking en hausse significative. À surveiller : le CPA sur la campagne hors-marque — tendance à la baisse, excellent signe." },
    { date: "Apr 08", author: "Équipe SEO",   tag: "Gain",      title: "Position 3 sur « celebrity booking agency »",
      body: "Passage de la position 6 → 3 après la refonte du contenu de la page roster. Ce seul mot-clé génère maintenant ~2.8k clics/mois. Suite : créer du contenu de support pour « hire musician for event »." },
    { date: "Apr 02", author: "Équipe Paid",   tag: "Risque",     title: "ROAS de la campagne notoriété IG en baisse",
      body: "Le ROAS de la campagne Notoriété Roster IG est passé de 3.4 → 2.8. Fatigue créative suspectée. Nouvelles créas style reel livrées le 22 avril. Recommandation : baisse de budget de 30% d'ici là." },
    { date: "Mar 26", author: "Équipe Strategy", tag: "Insight",  title: "Page corporate convertit 2× plus que l'accueil",
      body: "La landing page événements corporate convertit à 3.8% contre 2.8% sur l'accueil. Intéressant d'y rediriger directement le trafic paid sur les requêtes B2B." },
  ],
};

let DATA = DEMO_DATA;

const DASHBOARD_POLL_MS = 5 * 60 * 1000;
const DASHBOARD_CACHE_PREFIX = "sks-dashboard";

function getDashboardToken() {
  const params = new URLSearchParams(window.location.search);
  return params.get("token") || window.localStorage.getItem(`${DASHBOARD_CACHE_PREFIX}:token`) || "";
}

function getDashboardApiUrl(path, extra = {}) {
  const url = new URL(path, window.location.origin);
  const token = getDashboardToken();

  if (token) {
    window.localStorage.setItem(`${DASHBOARD_CACHE_PREFIX}:token`, token);
    url.searchParams.set("token", token);
  }

  Object.entries(extra).forEach(([key, value]) => {
    if (value == null || value === "") return;
    url.searchParams.set(key, value);
  });

  return url.toString();
}

function getCachedJson(key) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setCachedJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota issues.
  }
}

function setDashboardData(nextData) {
  DATA = nextData || DEMO_DATA;
  window.DATA = DATA;
  return DATA;
}

async function fetchJson(url, init) {
  const response = await fetch(url, {
    ...init,
    cache: "no-store",
    headers: {
      ...(init && init.headers ? init.headers : {}),
      ...(getDashboardToken() ? { "x-dashboard-token": getDashboardToken() } : {})
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

async function fetchDashboardDataset({ range = "30d", channel = "all" } = {}) {
  const url = getDashboardApiUrl("/api/dashboard", { range, channel });
  const cacheKey = `${DASHBOARD_CACHE_PREFIX}:dataset:${range}:${channel}`;

  try {
    const payload = await fetchJson(url);
    setDashboardData(payload.data || DEMO_DATA);
    setCachedJson(cacheKey, payload);
    window.DASHBOARD_LAST_PAYLOAD = payload;
    return payload;
  } catch (error) {
    const cached = getCachedJson(cacheKey);
    if (cached && cached.data) {
      setDashboardData(cached.data);
      window.DASHBOARD_LAST_PAYLOAD = { ...cached, cached: true };
      return { ...cached, cached: true };
    }

    setDashboardData(DEMO_DATA);
    const fallback = {
      ok: true,
      demoMode: true,
      cached: false,
      lastUpdated: new Date().toISOString(),
      data: DEMO_DATA,
      sourceStatus: [],
      error: error instanceof Error ? error.message : "Erreur inconnue"
    };
    window.DASHBOARD_LAST_PAYLOAD = fallback;
    return fallback;
  }
}

async function fetchDashboardNotes() {
  const payload = await fetchJson(getDashboardApiUrl("/api/notion-notes"));
  return payload.items || [];
}

async function createDashboardNote(note) {
  const payload = await fetchJson(getDashboardApiUrl("/api/notion-notes"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(note)
  });
  return payload.item;
}

async function fetchDashboardActions() {
  const payload = await fetchJson(getDashboardApiUrl("/api/notion-actions"));
  return payload.items || [];
}

async function updateDashboardAction(id, status) {
  const payload = await fetchJson(getDashboardApiUrl("/api/notion-actions"), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id, status })
  });
  return payload.item;
}

window.DATA = DATA;
window.DEMO_DATA = DEMO_DATA;
window.DASHBOARD_POLL_MS = DASHBOARD_POLL_MS;
window.fetchDashboardDataset = fetchDashboardDataset;
window.fetchDashboardNotes = fetchDashboardNotes;
window.createDashboardNote = createDashboardNote;
window.fetchDashboardActions = fetchDashboardActions;
window.updateDashboardAction = updateDashboardAction;
window.getDashboardApiUrl = getDashboardApiUrl;
window.setDashboardData = setDashboardData;
