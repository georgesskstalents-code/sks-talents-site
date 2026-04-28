export type DashboardMetricChip = {
  label: string;
  val: string;
};

export type DashboardNoteTag = "Insight" | "Gain" | "Risque" | "Lancement";

export type DashboardNote = {
  id: string;
  title: string;
  date: string;
  author: string;
  tag: DashboardNoteTag;
  body: string;
};

export type DashboardActionSource = "Paid ads" | "SEO" | "Conversion" | "Content" | "Ops";
export type DashboardActionImpact = "high" | "medium" | "low";
export type DashboardActionEffort = "low" | "medium" | "high";
export type DashboardActionPriority = "P1" | "P2" | "P3";
export type DashboardActionStatus = "todo" | "in-progress" | "done";

export type DashboardAction = {
  id: string;
  title: string;
  why: string;
  source: DashboardActionSource;
  owner: string;
  due: string;
  impact: DashboardActionImpact;
  effort: DashboardActionEffort;
  priority: DashboardActionPriority;
  status: DashboardActionStatus;
  metrics: DashboardMetricChip[];
};

export type DashboardSourceStatus = {
  id: string;
  label: string;
  status: "demo" | "configured" | "missing";
  detail: string;
};

