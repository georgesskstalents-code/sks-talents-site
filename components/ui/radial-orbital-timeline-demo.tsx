"use client";

import { Activity, BriefcaseBusiness, Calendar, FileSearch, Users } from "lucide-react";

import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Cadrage",
    date: "Semaine 1",
    content: "Clarification du contexte business, du rôle réel à ouvrir et du niveau de rareté du profil.",
    category: "Planning",
    icon: Calendar,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100
  },
  {
    id: 2,
    title: "Narration",
    date: "Semaine 1",
    content: "Construction du message marché et de la proposition d’opportunité pour parler juste aux bons candidats.",
    category: "Design",
    icon: FileSearch,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90
  },
  {
    id: 3,
    title: "Sourcing",
    date: "Semaine 2",
    content: "Activation du réseau spécialisé, mapping ciblé et approche directe des profils les plus plausibles.",
    category: "Execution",
    icon: BriefcaseBusiness,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 72
  },
  {
    id: 4,
    title: "Sélection",
    date: "Semaine 2-3",
    content: "Lecture comparative des candidats, calibration des entretiens et alignement avec la direction.",
    category: "Selection",
    icon: Users,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 44
  },
  {
    id: 5,
    title: "Intégration",
    date: "Après décision",
    content: "Sécurisation de la prise de poste, onboarding et points de vigilance pour tenir l’échelle dans le temps.",
    category: "Integration",
    icon: Activity,
    relatedIds: [4],
    status: "pending" as const,
    energy: 24
  }
];

export function RadialOrbitalTimelineDemo() {
  return <RadialOrbitalTimeline timelineData={timelineData} />;
}
