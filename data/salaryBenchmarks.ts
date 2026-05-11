/**
 * Benchmark salaires fixes annuels brut (k€), package total avec BSPCE/bonus en commentaire.
 * Source : observations terrain SKS Talents 2024-2026 sur 100+ placements Life Sciences & Animal Health France.
 * Note : ces fourchettes sont des reperes, les packages reels varient selon Series, geo, dilution BSPCE, equity.
 */

export type SalaryRange = {
  role: string;
  seriesA: string;
  seriesB: string;
  seriesC: string;
  note?: string;
};

export type Vertical = "biotech" | "animal-health";

export const salaryBenchmarks: Record<Vertical, SalaryRange[]> = {
  biotech: [
    {
      role: "CEO / Co-founder",
      seriesA: "120-160",
      seriesB: "160-220",
      seriesC: "220-300",
      note: "BSPCE 1-3% Series A, dilue ensuite. Bonus 15-30% du fixe."
    },
    {
      role: "CTO / VP Technology",
      seriesA: "110-140",
      seriesB: "140-180",
      seriesC: "180-230",
      note: "BSPCE 0.5-1.5%. Profils deeptech ou medtech regules avec ISO 13485."
    },
    {
      role: "Head of CMC / VP Manufacturing",
      seriesA: "100-130",
      seriesB: "130-170",
      seriesC: "170-220",
      note: "Tres recherche sur GMP/GLP, phase clinique II/III. Bonus 10-20%."
    },
    {
      role: "VP Regulatory Affairs (ANSM/EMA/FDA)",
      seriesA: "95-125",
      seriesB: "125-160",
      seriesC: "160-210",
      note: "Marche tres concurrentiel. Premium si experience FDA + EMA."
    },
    {
      role: "Director Clinical Operations",
      seriesA: "95-125",
      seriesB: "120-155",
      seriesC: "150-200",
      note: "Phase II/III, gestion CRO. Bonus 15-25% des le seuil Series B."
    },
    {
      role: "Head of Engineering / Bioprocedes (deeptech)",
      seriesA: "85-115",
      seriesB: "115-150",
      seriesC: "150-200",
      note: "Scale industriel, transferts d'echelle. Marche tendu en France."
    },
    {
      role: "BD Director / Pharma Partnerships",
      seriesA: "100-140",
      seriesB: "140-190",
      seriesC: "190-260",
      note: "Variable 30-50% souvent indexe sur deals signes."
    },
    {
      role: "Director Medical Affairs",
      seriesA: "100-130",
      seriesB: "130-170",
      seriesC: "170-220",
      note: "Profil MD ou PharmD requis. Marche IVD + therapeutique."
    }
  ],
  "animal-health": [
    {
      role: "CEO Groupement veterinaire",
      seriesA: "90-130",
      seriesB: "130-180",
      seriesC: "180-250",
      note: "Variable indexe sur EBITDA. Pas de BSPCE, equity selon structure (LBO, holding)."
    },
    {
      role: "Plant Director / Site Manager Petfood",
      seriesA: "85-115",
      seriesB: "110-145",
      seriesC: "140-190",
      note: "Industriel. Bonus 15-25%. Premium si HACCP + Lean."
    },
    {
      role: "Account Manager EMEA / BD International",
      seriesA: "75-100",
      seriesB: "95-130",
      seriesC: "125-175",
      note: "Variable 30-50% sur volumes signes."
    },
    {
      role: "Technico-Commercial Petfood / Diagnostic veto",
      seriesA: "55-80",
      seriesB: "75-105",
      seriesC: "100-140",
      note: "Variable 20-40%. Voiture societe quasi systematique."
    },
    {
      role: "Lab Operations Manager / R&D Petfood",
      seriesA: "65-90",
      seriesB: "85-115",
      seriesC: "110-150",
      note: "PhD nutrition animale ou agroalimentaire valorise."
    },
    {
      role: "VP Sales Animal Health (cabinets veto / distrib)",
      seriesA: "100-135",
      seriesB: "130-180",
      seriesC: "175-240",
      note: "Variable 30-45% indexe quota. Premium grandes references."
    }
  ]
};

export function getVerticalLabel(v: Vertical): string {
  return v === "biotech" ? "Biotech / Life Sciences" : "Animal Health & Petfood";
}
