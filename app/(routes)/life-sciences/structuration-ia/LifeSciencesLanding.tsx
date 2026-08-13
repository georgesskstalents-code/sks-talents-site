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
import { lifeSciencesScenes } from "./lifeSciencesScenes";
import { lifeSciencesQuestions } from "./lifeSciencesQuestions";

const trustSignals = ["★ 4,6/5 Trustpilot", "France Biotech", "Saclay", "100+ placements"];

export default function LifeSciencesLanding() {
  return (
    <main className="bg-white">
      {/* ===== Section 1 - HERO ===== */}
      <StructurationHero
        vertical="life-sciences"
        eyebrow="Digitalisation RH par l'IA  ·  Life Sciences"
        headlineLines={[
          "Anticipez vos recrutements",
          "6 mois à l'avance.",
          "Sans y passer vos week-ends."
        ]}
        subtitle="Digitalisation RH par l'IA pour scale-ups biotech, medtech et deeptech Series A à C. Nous transformons votre pilotage talents, reporting board et rétention en assistants IA qui travaillent pour vous."
        question={{
          thematicLabel: "Le copilot IA qui transforme vos board meetings",
          questionText:
            "Pourquoi vos décisions stratégiques talents reposent-elles encore sur des données fragmentées ?",
          answer: "Peut-être parce que vos ",
          answerHighlight: "KPIs talents sont éparpillés dans plusieurs outils",
          italicPhrase:
            " et que chaque board mobilise des heures de retraitement manuel. Quand l'information arrive, elle est déjà dépassée.",
          punchline: "Et si vos boards reposaient sur une lecture en temps réel ?"
        }}
        constat={{
          line1Prefix: "Vos process talent ",
          line1Bold: "ne suivent plus",
          line1Suffix: " votre croissance.",
          line2Italic: "Chez SKS Talents, notre CEO Copilot, oui."
        }}
        response={{
          cibleBold: "Pour les CEO biotech, medtech et deeptech en industrialisation",
          cibleSuffix: ", de la Series A à la Series C.",
          description:
            "Anticipez vos recrutements stratégiques selon l'évolution de vos programmes.",
          enjeux: "3 enjeux structurels",
          agents: "4 assistants IA sectoriels",
          agentsDetail: "(dont le duo Talent Intelligence & Rétention)",
          roi: "ROI mesuré sur vos propres données."
        }}
        pourquoiSKS="8 ans d'expertise  ·  Commission RH France Biotech  ·  100+ placements  ·  4,6/5 Trustpilot"
      />

      {/* ===== Section 2 - DÉMO ===== */}
      <section id="demo" className="bg-white py-10 sm:py-14">
        <div className="container-shell">
          <p className="eyebrow">Démo interactive · 30 secondes</p>
          <h2 className="t-h1 max-w-3xl font-display">
            Le copilot IA qui transforme{" "}
            <span className="italic text-brand-teal">vos board meetings</span>.
          </h2>
          <p className="mt-3 max-w-3xl t-body">
            Une CEO biotech Series B en oncologie anticipe ses recrutements 6 mois à l&apos;avance et
            reporte au board en 5 minutes. Voici comment.
          </p>
          <div className="mt-8">
            <DemoStage
              sector="life_sciences"
              scenes={lifeSciencesScenes}
              totalSeconds={30}
              ariaLabel="Démo interactive Assistant CEO Copilot stratégique"
            />
          </div>
        </div>
      </section>

      {/* ===== Section 3 - GLOSSAIRE assistant IA ===== */}
      <GlossaireIA />

      {/* ===== Section 4 - OPERATING SUITE ===== */}
      <OperatingSuite vertical="life-sciences" />

      {/* ===== Section 5 - 3 PROBLÈMES → ASSISTANT IA → RÉSULTAT ===== */}
      <ProblemesProduitsResultats vertical="life-sciences" />

      {/* ===== Section 6 - DIAGNOSTIC ===== */}
      <section id="diagnostic" className="scroll-mt-24 bg-gradient-to-b from-brand-mint/15 to-white py-10 sm:py-14">
        <div className="container-shell">
          <p className="eyebrow">Diagnostic personnalisé · 5 min</p>
          <h2 className="t-h1 max-w-3xl font-display">Quel assistant IA déployer en premier ?</h2>
          <p className="mt-3 max-w-3xl t-body">
            5 questions ciblées. Résultat immédiat. 3 priorités personnalisées.
          </p>
          <div className="mt-8 max-w-2xl">
            <DiagnosticForm sector="life-sciences" questions={lifeSciencesQuestions} />
          </div>
        </div>
      </section>

      {/* ===== Section 7 - 3 PRINCIPES FONDATEURS ===== */}
      <PrincipesFondateurs />

      {/* ===== Section 8 - CAS CYBER URGENCE MARCHÉ ===== */}
      <CyberUrgenceBloc vertical="life-sciences" />

      {/* ===== Section 9-14 - MÉTHODOLOGIE (timeline + phases + tailles + formation + investissement + prochaines etapes) ===== */}
      <MethodologieBlocs vertical="life-sciences" />

      {/* ===== Section 15 - FINANCEMENTS ===== */}
      <FinancementsBloc vertical="life-sciences" />

      {/* ===== Section 16 - AI LEADERSHIP BRIEFING ===== */}
      <AILeadershipBriefing />

      {/* ===== Section 17 - COMPLIANCE ===== */}
      <ComplianceSection
        ownershipBody="Vos données talents, R&D et financières sont parmi les plus sensibles de votre entreprise. Nos assistants IA sont conçus pour les protéger : hébergement en Europe, conformité RGPD, et aucune donnée de votre société utilisée pour entraîner des modèles tiers."
        iaActBody="Le règlement européen sur l'IA encadre désormais les usages RH algorithmiques (tri, scoring, aide à la décision). Nos assistants sont pensés pour la conformité dès la conception : traçabilité des décisions, supervision humaine, transparence des traitements. Vous adoptez l'IA aujourd'hui sans dette réglementaire demain."
      />

      {/* ===== Section 18 - FAQ ===== */}
      <FAQHomeTabs defaultVertical="life-sciences" />

      {/* ===== Section 19 - CTA FINAL ===== */}
      <section className="bg-brand-ink py-14 text-white sm:py-20">
        <div className="container-shell">
          <p className="text-eyebrow font-semibold uppercase text-white/60">Dernière étape</p>
          <h2 className="t-h1 mt-2 max-w-3xl font-display text-white">
            Prêt à transformer votre talent strategy{" "}
            <span className="italic text-brand-mint">en avantage stratégique</span> ?
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
