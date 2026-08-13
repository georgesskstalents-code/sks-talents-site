"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import CalendlyButton from "@/components/CalendlyButton";
import ComplianceSection from "@/components/landings/ComplianceSection";
import FAQHomeTabs from "@/components/FAQHomeTabs";
import { StructurationHero } from "@/components/sections/StructurationHero";
import DemoStage from "@/components/landings/DemoStage";
import DiagnosticForm from "@/components/landings/DiagnosticForm";
import GlossaireIA from "@/components/landings/GlossaireIA";
import OperatingSuite from "@/components/landings/OperatingSuite";
import ProblemesProduitsResultats from "@/components/landings/ProblemesProduitsResultats";
import PrincipesFondateurs from "@/components/landings/PrincipesFondateurs";
import CyberUrgenceBloc from "@/components/landings/CyberUrgenceBloc";
import MethodologieBlocs from "@/components/landings/MethodologieBlocs";
import FinancementsBloc from "@/components/landings/FinancementsBloc";
import AILeadershipBriefing from "@/components/landings/AILeadershipBriefing";
import { animalHealthScenes } from "./animalHealthScenes";
import { animalHealthQuestions } from "./animalHealthQuestions";

const trustSignals = ["★ 4,6/5 Trustpilot", "France Biotech", "Saclay", "100+ placements"];

export default function AnimalHealthLanding() {
  return (
    <main className="bg-white">
      {/* ===== Section 1 - HERO ===== */}
      <StructurationHero
        vertical="animal-health"
        eyebrow="Digitalisation santé animale par l'IA  ·  Groupements vétérinaires, Cliniques vétérinaires & petfood"
        headlineLines={[
          "Pilotez 30 cliniques",
          "comme si vous en aviez",
          "une."
        ]}
        subtitle="Digitalisez votre santé animale par l'IA. Vos process RH, juridique et pilotage suivent enfin la croissance de votre groupement, de votre clinique ou de votre marque petfood."
        question={{
          thematicLabel: "Passer de 3 jours à 4 minutes de reporting mensuel",
          questionText:
            "Pourquoi consacrer encore plusieurs jours par mois à compiler ce que vos cliniques produisent déjà ?",
          answer: "Parce que vos ",
          answerHighlight: "données opérationnelles sont dispersées",
          italicPhrase:
            " entre cliniques, et qu'il faut tout reconstruire à la main pour obtenir une vue consolidée. Le pilotage ne devrait pas être un projet, mais un réflexe.",
          punchline: "Et si votre reporting mensuel devenait l'affaire de quelques minutes ?"
        }}
        constat={{
          line1Prefix: "Vos process RH ",
          line1Bold: "ne suivent plus",
          line1Suffix: " votre croissance.",
          line2Italic: "Chez SKS Talents, nos assistants IA, oui."
        }}
        response={{
          cibleBold: "Pour les groupements de cliniques vétérinaires en consolidation",
          cibleSuffix: " et les cliniques vétérinaires en croissance.",
          description:
            "Anticipez vos recrutements et structurez votre exécution opérationnelle.",
          enjeux: "3 enjeux structurels",
          agents: "4 assistants IA sectoriels",
          agentsDetail: "",
          roi: "ROI mesuré sur vos propres données."
        }}
        pourquoiSKS="8 ans d'expertise vétérinaire  ·  Réseau vétérinaire national  ·  100+ placements  ·  4,6/5 Trustpilot"
      />

      {/* ===== Section 2 - DÉMO ===== */}
      <section id="demo" className="bg-white py-10 sm:py-14">
        <div className="container-shell">
          <p className="eyebrow">Démo interactive · 30 secondes</p>
          <h2 className="t-h1 max-w-3xl font-display">
            Passer de 3 jours à <span className="italic text-brand-teal">4 minutes</span> de reporting mensuel.
          </h2>
          <p className="mt-3 max-w-3xl t-body">
            C&apos;est ce qu&apos;on a mis en place chez un groupement vétérinaire.
          </p>
          <div className="mt-8">
            <DemoStage
              sector="animal_health"
              scenes={animalHealthScenes}
              totalSeconds={30}
              ariaLabel="Démo interactive Assistant Reporting Multi-Sites"
            />
          </div>
        </div>
      </section>

      {/* ===== Section 3 - GLOSSAIRE assistant IA ===== */}
      <GlossaireIA />

      {/* ===== Section 4 - OPERATING SUITE ===== */}
      <OperatingSuite vertical="animal-health" />

      {/* ===== Section 5 - 3 PROBLÈMES → ASSISTANT IA → RÉSULTAT ===== */}
      <ProblemesProduitsResultats vertical="animal-health" />

      {/* ===== Section 6 - DIAGNOSTIC ===== */}
      <section id="diagnostic" className="scroll-mt-24 bg-gradient-to-b from-brand-mint/15 to-white py-10 sm:py-14">
        <div className="container-shell">
          <p className="eyebrow">Diagnostic personnalisé · 5 min</p>
          <h2 className="t-h1 max-w-3xl font-display">Quel assistant IA déployer en premier ?</h2>
          <p className="mt-3 max-w-3xl t-body">
            5 questions ciblées. Résultat immédiat. 3 priorités personnalisées.
          </p>
          <div className="mt-8 max-w-2xl">
            <DiagnosticForm sector="animal-health" questions={animalHealthQuestions} />
          </div>
        </div>
      </section>

      {/* ===== Section 7 - 3 PRINCIPES FONDATEURS ===== */}
      <PrincipesFondateurs />

      {/* ===== Section 8 - CAS CYBER URGENCE MARCHÉ ===== */}
      <CyberUrgenceBloc vertical="animal-health" />

      {/* ===== Section 9-14 - MÉTHODOLOGIE (timeline + phases + tailles + formation + investissement + prochaines etapes) ===== */}
      <MethodologieBlocs vertical="animal-health" />

      {/* ===== Section 15 - FINANCEMENTS ===== */}
      <FinancementsBloc vertical="animal-health" />

      {/* ===== Section 16 - AI LEADERSHIP BRIEFING ===== */}
      <AILeadershipBriefing />

      {/* ===== Section 17 - COMPLIANCE ===== */}
      <ComplianceSection
        ownershipBody="Vos données RH, juridiques et financières sont parmi les plus sensibles de votre groupement. Nos assistants IA sont conçus pour les protéger : hébergement en Europe, conformité RGPD, et aucune donnée de votre groupement utilisée pour entraîner des modèles tiers."
        iaActBody="Le règlement européen sur l'IA encadre désormais les usages RH algorithmiques. Nos assistants sont pensés pour la conformité dès la conception : traçabilité des décisions, supervision humaine, transparence des traitements. Vous adoptez l'IA aujourd'hui sans dette réglementaire demain."
      />

      {/* ===== Section 18 - FAQ ===== */}
      <FAQHomeTabs defaultVertical="animal-health" />

      {/* ===== Section 19 - CTA FINAL ===== */}
      <section className="bg-brand-ink py-14 text-white sm:py-20">
        <div className="container-shell">
          <p className="text-eyebrow font-semibold uppercase text-white/60">Dernière étape</p>
          <h2 className="t-h1 mt-2 max-w-3xl font-display text-white">
            Prêt à déployer{" "}
            <span className="italic text-brand-mint">votre premier assistant IA</span> ?
          </h2>
          <p className="mt-3 max-w-2xl !text-white/70 t-body">
            15 min avec Georges. ROI projeté chiffré sur 6 mois. Pas de pitch commercial.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CalendlyButton label="Réserver mes 15 min →" tone="solid" />
            <Link
              href="#diagnostic"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-4 t-body font-semibold !text-white transition hover:bg-white/10"
            >
              Diagnostic
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-caption text-white/50">
            {trustSignals.map((s) => (
              <li key={s} className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
