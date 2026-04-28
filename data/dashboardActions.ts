import type { DashboardAction } from "@/lib/dashboardTypes";

export const dashboardDefaultActions: DashboardAction[] = [
  {
    id: "action-newsletter-archive",
    title: "Mettre en ligne l’archive newsletter avec capture d’inscription",
    why: "La promesse newsletter est claire, mais il faut maintenant une archive consultable et des points de capture bien répartis pour transformer le trafic éditorial en leads récurrents.",
    source: "Content",
    owner: "Équipe Strategy",
    due: "2026-05-02",
    impact: "high",
    effort: "medium",
    priority: "P1",
    status: "todo",
    metrics: [
      { label: "Cadence", val: "2 éditions / mois" },
      { label: "Temps lecture", val: "5 min max" }
    ]
  },
  {
    id: "action-ga4-events",
    title: "Vérifier les événements GA4 call, callback, newsletter et études",
    why: "Le dashboard doit suivre les vrais points de conversion du site. Sans ces événements, les KPIs marketing resteront partiellement estimés après déploiement.",
    source: "Conversion",
    owner: "Équipe Data",
    due: "2026-05-05",
    impact: "high",
    effort: "medium",
    priority: "P1",
    status: "in-progress",
    metrics: [
      { label: "Événements cibles", val: "4" },
      { label: "Priorité", val: "Tracking live" }
    ]
  },
  {
    id: "action-en-pages",
    title: "Créer la V1 anglaise native des pages qui convertissent le plus",
    why: "Le sélecteur FR / EN fonctionne déjà, mais les pages les plus business doivent exister nativement en anglais pour améliorer la conversion des visiteurs internationaux.",
    source: "SEO",
    owner: "Équipe SEO",
    due: "2026-05-09",
    impact: "high",
    effort: "high",
    priority: "P1",
    status: "todo",
    metrics: [
      { label: "Pages cibles", val: "Home + Services + Studies" },
      { label: "Langue", val: "EN native" }
    ]
  },
  {
    id: "action-salary-cta",
    title: "Renforcer les CTA sur benchmarks salaires et comparatifs",
    why: "Ces contenus attirent une intention très chaude. Ils doivent pousser plus clairement vers callback, call ou étude liée.",
    source: "Conversion",
    owner: "Équipe UX",
    due: "2026-05-12",
    impact: "medium",
    effort: "low",
    priority: "P2",
    status: "todo",
    metrics: [
      { label: "Zone chaude", val: "Salary / Compare" },
      { label: "Objectif", val: "+ appels qualifiés" }
    ]
  },
  {
    id: "action-orientation-funnel",
    title: "Mesurer précisément le funnel Orientation vers Purple",
    why: "La mini-formation dirigeant est une vraie porte d’entrée. Il faut distinguer clics, formulaires soumis et redirections effectives pour piloter ce tunnel.",
    source: "Ops",
    owner: "Équipe Strategy",
    due: "2026-05-16",
    impact: "medium",
    effort: "medium",
    priority: "P2",
    status: "todo",
    metrics: [
      { label: "Tunnel", val: "Orientation > Purple" },
      { label: "Mesure", val: "clics + submit + redirect" }
    ]
  },
  {
    id: "action-dashboard-secrets",
    title: "Renseigner les secrets de prod pour le dashboard avant déploiement",
    why: "Le dashboard local peut tourner en mode démo, mais le passage en production demande les accès GA4, Search Console, Ads et Notion pour remplacer les placeholders.",
    source: "Ops",
    owner: "Équipe Data",
    due: "2026-05-20",
    impact: "medium",
    effort: "medium",
    priority: "P2",
    status: "todo",
    metrics: [
      { label: "Sources", val: "GA4 + GSC + Ads + Notion" },
      { label: "État", val: "à brancher" }
    ]
  }
];
