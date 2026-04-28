"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Download,
  GraduationCap,
  MoveRight,
  RefreshCcw,
  Scale,
  ThumbsDown,
  ThumbsUp
} from "lucide-react";
import { articles } from "@/data/articles";
import EditorialInsightVisual from "@/components/EditorialInsightVisual";
import {
  orientationQuestions,
  orientationRecommendations,
  purpleCareerUrl
} from "@/data/orientationAgent";
import { schools } from "@/data/resources";
import { useOrientation } from "@/hooks/useOrientation";
import TurnstileWidget from "@/components/TurnstileWidget";

function getRecommendationScore(scoreTags: string[], selectedTags: string[]) {
  return selectedTags.reduce((score, tag) => score + (scoreTags.includes(tag) ? 1 : 0), 0);
}

const schoolSectorPools: Record<string, string[]> = {
  Biotech: ["Biotech", "Life Sciences", "MedTech"],
  Diagnostic: ["Diagnostic", "MedTech", "Life Sciences"],
  "Animal Health": ["Animal Health", "Life Sciences", "Agro-industrie"],
  Petfood: ["Petfood", "Agro-industrie", "Green Engineering", "Life Sciences"],
  "Life Sciences": ["Life Sciences", "Biotech", "Diagnostic", "MedTech", "Cosmétique"]
};

export default function OrientationAgent() {
  const {
    profile,
    setProfile,
    answers,
    setAnswers,
    feedback,
    setFeedback,
    lead,
    setLead,
    resetOrientation
  } = useOrientation();
  const [step, setStep] = useState<"intro" | "quiz" | "results">("intro");
  const [comparison, setComparison] = useState<string[]>([]);
  const [downloadLead, setDownloadLead] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });
  const [botTrap, setBotTrap] = useState("");
  const [intakeTurnstileToken, setIntakeTurnstileToken] = useState("");
  const [reportTurnstileToken, setReportTurnstileToken] = useState("");
  const [downloadState, setDownloadState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [downloadMessage, setDownloadMessage] = useState("");
  const [intakeState, setIntakeState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [intakeMessage, setIntakeMessage] = useState("");
  const [pendingPath, setPendingPath] = useState<"student" | "professional">("student");
  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
  const purpleUrl = process.env.NEXT_PUBLIC_PURPLE_URL ?? purpleCareerUrl;

  const selectedTags = useMemo(() => {
    return orientationQuestions.flatMap((question) => {
      const selectedValue = answers[question.id];
      const selectedOption = question.options.find((option) => option.value === selectedValue);
      return selectedOption?.tags ?? [];
    });
  }, [answers]);

  const recommendations = useMemo(() => {
    return [...orientationRecommendations]
      .map((item) => ({
        ...item,
        score: getRecommendationScore(item.scoreTags, selectedTags)
      }))
      .sort((left, right) => right.score - left.score)
      .slice(0, 3);
  }, [selectedTags]);

  function handleAnswer(questionId: number, value: string) {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  }

  function handleReset() {
    setComparison([]);
    setDownloadLead({
      firstName: lead.firstName,
      lastName: lead.lastName,
      email: lead.email
    });
    setDownloadState("idle");
    setDownloadMessage("");
    setPendingPath("student");
    resetOrientation();
    setStep("intro");
  }

  const isQuizComplete = orientationQuestions.every((question) => Boolean(answers[question.id]));
  const canDownloadReport =
    downloadLead.firstName.trim().length > 1 &&
    downloadLead.lastName.trim().length > 1 &&
    /\S+@\S+\.\S+/.test(downloadLead.email) &&
    (!turnstileEnabled || reportTurnstileToken.length > 10);
  const canStartJourney =
    lead.firstName.trim().length > 1 &&
    lead.lastName.trim().length > 1 &&
    /\S+@\S+\.\S+/.test(lead.email) &&
    lead.phone.replace(/[^\d+]/g, "").length >= 8 &&
    lead.targetSector.trim().length > 1 &&
    (!turnstileEnabled || intakeTurnstileToken.length > 10);

  useEffect(() => {
    if (lead.firstName || lead.lastName || lead.email) {
      setDownloadLead({
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email
      });
    }
  }, [lead.email, lead.firstName, lead.lastName]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const scrollToIntakeFromHash = () => {
      if (window.location.hash !== "#orientation-intake") {
        return;
      }

      window.setTimeout(() => {
        const target = document.getElementById("orientation-intake");
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    };

    scrollToIntakeFromHash();
    window.addEventListener("hashchange", scrollToIntakeFromHash);

    return () => window.removeEventListener("hashchange", scrollToIntakeFromHash);
  }, []);

  function moveToIntake(desiredPath: "student" | "professional") {
    setPendingPath(desiredPath);
    setIntakeState("idle");
      setIntakeMessage(
        desiredPath === "student"
          ? "Complétez vos coordonnées ci-dessous, puis lancez le parcours étudiant."
          : "Complétez vos coordonnées ci-dessous, puis accédez à la mini-formation dirigeant."
      );

    if (typeof document !== "undefined") {
      const target = document.getElementById("orientation-intake");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function handlePathEntry(desiredPath: "student" | "professional") {
    if (!canStartJourney) {
      moveToIntake(desiredPath);
      return;
    }

    void handleStartJourney(desiredPath);
  }

  async function handleStartJourney(desiredPath: "student" | "professional") {
    if (!canStartJourney) {
      setIntakeState("error");
      setIntakeMessage(
        "Merci de renseigner prénom, nom, email, téléphone et secteur visé avant de commencer."
      );
      return;
    }

    setIntakeState("loading");
    setIntakeMessage("");

    try {
      const response = await fetch("/api/orientation-intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: lead.firstName,
          lastName: lead.lastName,
          email: lead.email,
          phone: lead.phone,
          targetSector: lead.targetSector,
          desiredPath,
          website: botTrap,
          turnstileToken: intakeTurnstileToken
        })
      });

      const payload = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !payload.ok) {
        setIntakeState("error");
        setIntakeMessage(payload.message ?? "Impossible d’enregistrer votre inscription.");
        return;
      }

      setDownloadLead({
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email
      });
      setIntakeTurnstileToken("");
      setIntakeState("success");
      setIntakeMessage("Inscription enregistrée. Vous pouvez maintenant poursuivre votre parcours.");

      if (desiredPath === "student") {
        setProfile("student");
        setStep("quiz");
        return;
      }

      setProfile("professional");
      window.location.assign(purpleUrl);
    } catch {
      setIntakeState("error");
      setIntakeMessage("Un incident temporaire empêche l’enregistrement. Réessayez dans quelques instants.");
    }
  }

  async function handleReportDownload() {
    if (!canDownloadReport) {
      setDownloadState("error");
      setDownloadMessage("Merci de renseigner prénom, nom et email avant le téléchargement.");
      return;
    }

    const reportWindow = window.open("", "_blank", "width=980,height=720");
    setDownloadState("loading");
    setDownloadMessage("");

    try {
      const response = await fetch("/api/orientation-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...downloadLead,
          profile,
          recommendations: recommendations.map((item) => item.title),
          website: botTrap,
          turnstileToken: reportTurnstileToken
        })
      });

      const payload = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !payload.ok) {
        setDownloadState("error");
        setDownloadMessage(payload.message ?? "Impossible d’enregistrer votre demande.");
        return;
      }

      const reportHtml = `
        <!DOCTYPE html>
        <html lang="fr">
          <head>
            <meta charset="utf-8" />
            <title>Rapport d'orientation SKS TALENTS</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 0; color: #163334; }
              .wrap { max-width: 860px; margin: 0 auto; padding: 40px 32px 64px; }
              .brand { color: #41a0a4; text-transform: uppercase; letter-spacing: .24em; font-size: 12px; font-weight: 700; }
              h1 { font-size: 34px; margin: 14px 0 8px; }
              h2 { font-size: 22px; margin: 30px 0 12px; }
              p, li { font-size: 15px; line-height: 1.8; }
              .card { border: 1px solid rgba(65,160,164,.18); border-radius: 20px; padding: 22px; margin-top: 16px; background: rgba(223,243,241,.35); }
              .score { height: 10px; border-radius: 999px; background: rgba(65,160,164,.18); overflow: hidden; }
              .score > span { display:block; height:100%; background:#41a0a4; }
            </style>
          </head>
          <body>
            <div class="wrap">
              <p class="brand">SKS TALENTS</p>
              <h1>Rapport d’orientation carrière</h1>
              <p>Scaling teams without losing soul.</p>
              <div class="card">
                <p><strong>Nom:</strong> ${downloadLead.firstName} ${downloadLead.lastName}</p>
                <p><strong>Email:</strong> ${downloadLead.email}</p>
                <p><strong>Profil:</strong> ${profile ?? "étudiant"}</p>
              </div>
              <h2>Vos recommandations</h2>
              ${recommendations
                .map((item) => {
                  const compatibilityScore = Math.max(
                    35,
                    Math.round((item.score / Math.max(selectedTags.length, 1)) * 100)
                  );
                  return `
                    <div class="card">
                      <p class="brand">${item.sector}</p>
                      <h2>${item.title}</h2>
                      <p><strong>Salaire observé:</strong> ${item.salary}</p>
                      <p>${item.description}</p>
                      <p><strong>Score de compatibilité:</strong> ${compatibilityScore}%</p>
                      <div class="score"><span style="width:${compatibilityScore}%"></span></div>
                    </div>
                  `;
                })
                .join("")}
              <h2>Prochaine étape</h2>
              <p>Pour un bilan plus approfondi, contactez SKS TALENTS via g.kengue@skstalents.com ou réservez directement un échange.</p>
            </div>
          </body>
        </html>
      `;

      if (reportWindow) {
        reportWindow.document.open();
        reportWindow.document.write(reportHtml);
        reportWindow.document.close();
        window.setTimeout(() => {
          reportWindow.focus();
          reportWindow.print();
        }, 300);
      }

      setDownloadState("success");
      setReportTurnstileToken("");
      setDownloadMessage("Rapport prêt. Utilisez la fenêtre d’impression pour l’enregistrer en PDF.");
    } catch {
      if (reportWindow && !reportWindow.closed) {
        reportWindow.close();
      }
      setDownloadState("error");
      setDownloadMessage("Une erreur est survenue pendant la préparation du rapport.");
    }
  }

  return (
    <div className="space-y-10">
      {step === "intro" ? (
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card-surface p-8 sm:p-10">
            <p className="eyebrow">Orientez-vous</p>
            <h2 className="font-display text-5xl leading-tight text-brand-ink">
              Un agent d’orientation pour trouver votre meilleure porte d’entrée.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-brand-stone">
              Deux parcours ont été pensés pour éviter les conseils trop génériques: l’un pour les
              étudiantes et étudiants qui cherchent leur place, l’autre pour les professionnels déjà
              en poste qui veulent clarifier leur prochaine étape.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => handlePathEntry("student")}
                className="rounded-[28px] border border-brand-teal/20 bg-gradient-to-br from-white to-brand-mint/60 p-6 text-left transition hover:-translate-y-1 hover:border-brand-teal/40"
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="text-brand-teal" size={28} />
                  <p className="text-lg font-semibold text-brand-ink">Étudiant / Jeune diplômé</p>
                </div>
                <p className="mt-4 text-sm leading-7 text-brand-stone">
                  Faites un mini diagnostic, comparez 2 à 3 métiers et récupérez des pistes
                  concrètes de rôles, d’écoles et de lectures.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-teal">
                  Commencer le parcours étudiant
                  <ArrowRight size={16} />
                </span>
              </button>

              <a
                href={purpleUrl}
                className="rounded-[28px] border border-brand-teal/20 bg-gradient-to-br from-[#163334] to-[#214b4d] p-6 text-left text-white transition hover:-translate-y-1 hover:border-teal-200/50"
              >
                <div className="flex items-center gap-3">
                  <BriefcaseBusiness className="text-teal-200" size={28} />
                  <p className="text-lg font-semibold">Mini-formation dirigeant</p>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/75">
                  Pour les cadres dirigeants en recherche d’emploi, en mobilité ou en
                  repositionnement, accédez directement à une formation gratuite pensée pour
                  clarifier votre suite de trajectoire.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-200">
                  Accéder à la mini-formation
                  <ArrowRight size={16} />
                </span>
              </a>
            </div>
          </div>

          <div id="orientation-intake" className="card-surface scroll-mt-32 p-8 sm:p-10">
            <p className="eyebrow">Inscription préalable</p>
            <h2 className="font-display text-4xl text-brand-ink">
              Laissez vos coordonnées avant de démarrer le parcours étudiant.
            </h2>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              L’inscription sert à lancer le diagnostic étudiant et à vous recontacter si besoin
              avec plus de contexte. Si vous êtes déjà cadre dirigeant, la mini-formation Purple
              reste accessible directement depuis la carte de droite.
            </p>
            <div className="mt-8 grid gap-4">
              <input
                value={botTrap}
                onChange={(event) => setBotTrap(event.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden opacity-0"
              />
              <input
                value={lead.firstName}
                onChange={(event) => {
                  setLead({ ...lead, firstName: event.target.value });
                  setIntakeState("idle");
                  setIntakeMessage("");
                }}
                placeholder="Prénom*"
                autoComplete="given-name"
                className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
              />
              <input
                value={lead.lastName}
                onChange={(event) => {
                  setLead({ ...lead, lastName: event.target.value });
                  setIntakeState("idle");
                  setIntakeMessage("");
                }}
                placeholder="Nom*"
                autoComplete="family-name"
                className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
              />
              <input
                value={lead.email}
                onChange={(event) => {
                  setLead({ ...lead, email: event.target.value });
                  setIntakeState("idle");
                  setIntakeMessage("");
                }}
                placeholder="Email*"
                autoComplete="email"
                inputMode="email"
                className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
              />
              <input
                value={lead.phone}
                onChange={(event) => {
                  setLead({ ...lead, phone: event.target.value });
                  setIntakeState("idle");
                  setIntakeMessage("");
                }}
                placeholder="Téléphone*"
                autoComplete="tel"
                inputMode="tel"
                className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
              />
              <div className="rounded-3xl border border-brand-teal/10 bg-brand-mint/45 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  Secteur visé*
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Life Sciences",
                    "Biotech",
                    "Diagnostic",
                    "Animal Health",
                    "Petfood",
                    "MedTech",
                    "Cosmétique"
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setLead({ ...lead, targetSector: item });
                        setIntakeState("idle");
                        setIntakeMessage("");
                      }}
                      className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                        lead.targetSector === item
                          ? "bg-brand-teal text-white"
                          : "bg-white text-brand-stone hover:bg-brand-mint"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              {[
                "Vous segmenter entre orientation initiale et évolution professionnelle.",
                "Faire émerger 3 métiers plausibles plutôt qu’une seule recommandation.",
                "Montrer des lectures, écoles et fiches métiers liées à vos réponses.",
                "Permettre une comparaison rapide avant de contacter SKS TALENTS."
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-brand-mint/50 p-4">
                  <CheckCircle2 className="mt-1 text-brand-teal" size={18} />
                  <p className="text-sm leading-7 text-brand-stone">{item}</p>
                </div>
              ))}
            </div>
            <TurnstileWidget
              onVerify={setIntakeTurnstileToken}
              className="mt-6 rounded-2xl border border-brand-teal/10 bg-brand-mint/35 px-4 py-4"
            />
            {intakeMessage ? (
              <p
                className={`mt-6 rounded-2xl px-4 py-3 text-sm ${
                  intakeState === "success"
                    ? "bg-brand-mint text-brand-teal"
                    : intakeState === "error"
                      ? "bg-red-50 text-red-700"
                      : "bg-white text-brand-stone"
                }`}
              >
                {intakeMessage}
              </p>
            ) : null}
            <p className="mt-4 text-sm leading-7 text-brand-stone">
              L’inscription est obligatoire avant l’orientation étudiant. Les cadres dirigeants
              peuvent accéder directement à la mini-formation dédiée.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => void handleStartJourney("student")}
                disabled={!canStartJourney}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-semibold transition ${
                  pendingPath === "student"
                    ? "bg-brand-teal text-white"
                    : "border border-brand-teal/20 text-brand-teal hover:bg-brand-mint"
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                Parcours étudiant
                <ArrowRight size={16} />
              </button>
              <a
                href={purpleUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-teal/20 px-5 py-4 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
              >
                Mini-formation dirigeant
                <MoveRight size={16} />
              </a>
            </div>
          </div>
        </section>
      ) : null}

      {step === "quiz" && profile === "student" ? (
        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="card-surface p-8 sm:p-10">
            <p className="eyebrow">Agent étudiant</p>
            <h2 className="font-display text-4xl text-brand-ink">
              Répondez à 4 questions pour orienter votre première trajectoire.
            </h2>
            <div className="mt-8 space-y-8">
              {orientationQuestions.map((question) => (
                <div key={question.id} className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-ink">{question.text}</h3>
                    <p className="mt-2 text-sm leading-7 text-brand-stone">{question.help}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {question.options.map((option) => {
                      const isActive = answers[question.id] === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleAnswer(question.id, option.value)}
                          className={`rounded-3xl border p-4 text-left transition ${
                            isActive
                              ? "border-brand-teal bg-brand-mint shadow-soft"
                              : "border-brand-teal/15 bg-white hover:border-brand-teal/35 hover:-translate-y-0.5"
                          }`}
                        >
                          <span className="text-sm font-semibold text-brand-ink">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setStep("results")}
                disabled={!isQuizComplete}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Voir mes recommandations
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-teal/20 px-6 py-4 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
              >
                Recommencer
                <RefreshCcw size={16} />
              </button>
            </div>
          </div>

          <div className="card-surface p-8 sm:p-10">
            <p className="eyebrow">À retenir</p>
            <h2 className="font-display text-4xl text-brand-ink">On ne cherche pas le métier parfait.</h2>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              Le but est de faire ressortir 2 ou 3 directions crédibles, puis de vous donner assez
              d’éléments pour comparer avant de creuser davantage.
            </p>
            <div className="mt-8 grid gap-4">
              <div className="rounded-3xl bg-brand-mint/60 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  SEO utile
                </p>
                <p className="mt-3 text-sm leading-7 text-brand-stone">
                  Pour les cadres dirigeants, les entrées qui convertissent le mieux restent
                  souvent “bilan de carrière”, “recherche d’emploi dirigeant” ou “évolution
                  professionnelle”.
                </p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-soft">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  Formation gratuite
                </p>
                <p className="mt-3 text-sm leading-7 text-brand-stone">
                  Le parcours approfondi renvoie vers une mini-formation dédiée aux cadres
                  dirigeants en transition, pour ne pas mélanger un agent découverte étudiant avec
                  une démarche beaucoup plus ciblée.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {step === "results" && profile === "student" ? (
        <section className="space-y-8">
          <div className="card-surface p-8 sm:p-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow">Résultats</p>
                <h2 className="font-display text-4xl text-brand-ink">
                  3 pistes cohérentes à comparer avant d’aller plus loin.
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-brand-stone">
                  Vos réponses pointent vers ces trajectoires. L’idée n’est pas de verrouiller une
                  voie, mais de vous aider à prioriser vos prochains pas.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-teal/20 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
                >
                  <RefreshCcw size={16} />
                  Refaire le diagnostic
                </button>
                <a
                  href={purpleUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-[#163334] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Bilan de carrière approfondi
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            {recommendations.map((recommendation) => {
              const relatedArticles = articles.filter((article) =>
                recommendation.articleSlugs.includes(article.slug)
              );
              const poolSectors = schoolSectorPools[recommendation.sector] ?? [recommendation.sector];
              const relatedSchools = schools
                .filter(
                  (school) =>
                    recommendation.schools.includes(school.slug) || poolSectors.includes(school.sector)
                )
                .slice(0, 8);
              const isCompared = comparison.includes(recommendation.slug);
              const localFeedback = feedback[recommendation.slug];

              return (
                <article key={recommendation.slug} className="card-surface p-8 sm:p-10">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-4xl text-brand-ink">{recommendation.title}</h3>
                        {recommendation.trending ? (
                          <span className="rounded-full bg-brand-mint px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal">
                            Tendance
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">
                        {recommendation.sector}
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-brand-ink">{recommendation.salary}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setComparison((current) =>
                            current.includes(recommendation.slug)
                              ? current.filter((item) => item !== recommendation.slug)
                              : current.length < 3
                                ? [...current, recommendation.slug]
                                : current
                          )
                        }
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition ${
                          isCompared
                            ? "bg-brand-teal text-white"
                            : "border border-brand-teal/20 text-brand-teal hover:bg-brand-mint"
                        }`}
                      >
                        <Scale size={16} />
                        {isCompared ? "Ajouté à la comparaison" : "Comparer"}
                      </button>
                      <Link
                        href={`/job-roles/${recommendation.jobRoleSlug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-brand-teal/20 px-4 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
                      >
                        Voir une fiche métier liée
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>

                  <p className="mt-6 text-base leading-8 text-brand-stone">{recommendation.description}</p>

                  <div className="mt-8 grid gap-4 lg:grid-cols-4">
                    <div className="rounded-3xl bg-[#163334] p-5 text-white">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-200">
                        Compatibilité
                      </p>
                      <p className="mt-3 text-4xl font-semibold">
                        {Math.max(
                          35,
                          Math.round((recommendation.score / Math.max(selectedTags.length, 1)) * 100)
                        )}
                        %
                      </p>
                      <div className="mt-4 h-3 rounded-full bg-white/15">
                        <div
                          className="h-3 rounded-full bg-brand-teal"
                          style={{
                            width: `${Math.max(
                              35,
                              Math.round((recommendation.score / Math.max(selectedTags.length, 1)) * 100)
                            )}%`
                          }}
                        />
                      </div>
                    </div>
                    <div className="rounded-3xl bg-brand-mint/55 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                        Forces clés
                      </p>
                      <ul className="mt-4 space-y-2 text-sm leading-7 text-brand-stone">
                        {recommendation.strengths.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-3xl bg-brand-mint/35 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                        Formations
                      </p>
                      <ul className="mt-4 space-y-2 text-sm leading-7 text-brand-stone">
                        {recommendation.formations.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-3xl bg-white p-5 shadow-soft">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                        Feedback
                      </p>
                      <div className="mt-4 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setFeedback({
                              ...feedback,
                              [recommendation.slug]: "up"
                            })
                          }
                          className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition ${
                            localFeedback === "up"
                              ? "bg-brand-teal text-white"
                              : "border border-brand-teal/20 text-brand-teal hover:bg-brand-mint"
                          }`}
                        >
                          <ThumbsUp size={16} />
                          Pertinent
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFeedback({
                              ...feedback,
                              [recommendation.slug]: "down"
                            })
                          }
                          className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition ${
                            localFeedback === "down"
                              ? "bg-[#163334] text-white"
                              : "border border-brand-teal/20 text-brand-teal hover:bg-brand-mint"
                          }`}
                        >
                          <ThumbsDown size={16} />
                          À challenger
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                        Écoles à regarder
                      </p>
                      <div className="mt-4 grid gap-3">
                        {relatedSchools.map((school) => (
                          <Link
                            key={school.slug}
                            href={`/schools/${school.slug}`}
                            className="rounded-2xl border border-brand-teal/10 bg-white px-4 py-4 text-sm font-semibold text-brand-ink transition hover:-translate-y-0.5 hover:border-brand-teal/30"
                          >
                            {school.title}
                            <span className="mt-1 block text-xs font-medium text-brand-stone">
                              {school.sector} · {school.location}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                        Articles pour creuser
                      </p>
                      <div className="mt-4 grid gap-3">
                        {relatedArticles.map((article) => (
                          <Link
                            key={article.slug}
                            href={`/blog/${article.slug}`}
                            className="rounded-2xl border border-brand-teal/10 bg-white px-4 py-4 text-sm font-semibold text-brand-ink transition hover:-translate-y-0.5 hover:border-brand-teal/30"
                          >
                            {article.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {comparison.length > 0 ? (
            <div className="card-surface p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <Scale className="text-brand-teal" size={24} />
                <h3 className="font-display text-3xl text-brand-ink">Comparaison rapide</h3>
              </div>
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-brand-teal/15 text-brand-stone">
                      <th className="px-4 py-3 font-semibold">Critère</th>
                      {recommendations
                        .filter((item) => comparison.includes(item.slug))
                        .map((item) => (
                          <th key={item.slug} className="px-4 py-3 font-semibold text-brand-ink">
                            {item.title}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-brand-teal/10">
                      <td className="px-4 py-4 font-semibold text-brand-stone">Secteur</td>
                      {recommendations
                        .filter((item) => comparison.includes(item.slug))
                        .map((item) => (
                          <td key={item.slug} className="px-4 py-4 text-brand-ink">
                            {item.sector}
                          </td>
                        ))}
                    </tr>
                    <tr className="border-b border-brand-teal/10">
                      <td className="px-4 py-4 font-semibold text-brand-stone">Salaire</td>
                      {recommendations
                        .filter((item) => comparison.includes(item.slug))
                        .map((item) => (
                          <td key={item.slug} className="px-4 py-4 text-brand-ink">
                            {item.salary}
                          </td>
                        ))}
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-semibold text-brand-stone">Orientation</td>
                      {recommendations
                        .filter((item) => comparison.includes(item.slug))
                        .map((item) => (
                          <td key={item.slug} className="px-4 py-4 text-brand-ink">
                            {item.description}
                          </td>
                        ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-3">
            <a
                  href={purpleUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="card-surface flex items-center justify-between p-6 transition hover:-translate-y-0.5"
            >
              <div>
                <p className="eyebrow">Professionnels en poste</p>
                <h3 className="font-display text-3xl text-brand-ink">Bilan de carrière</h3>
              </div>
              <ArrowRight className="text-brand-teal" size={20} />
            </a>
            <Link
              href="/schools"
              className="card-surface flex items-center justify-between p-6 transition hover:-translate-y-0.5"
            >
              <div>
                <p className="eyebrow">Répertoire</p>
                <h3 className="font-display text-3xl text-brand-ink">Écoles à cibler</h3>
              </div>
              <ArrowRight className="text-brand-teal" size={20} />
            </Link>
            <button
              type="button"
              onClick={handleReportDownload}
              className="card-surface flex items-center justify-between p-6 text-left transition hover:-translate-y-0.5"
            >
              <div>
                <p className="eyebrow">Export</p>
                <h3 className="font-display text-3xl text-brand-ink">Télécharger mes pistes</h3>
              </div>
              <Download className="text-brand-teal" size={20} />
            </button>
          </div>

          <div className="card-surface p-8 sm:p-10">
            <div className="grid gap-8 xl:grid-cols-[1fr_0.95fr] xl:items-start">
              <div>
                <p className="eyebrow">Téléchargement du rapport</p>
                <h3 className="font-display text-3xl text-brand-ink">
                  Le rapport est disponible après saisie de vos coordonnées.
                </h3>
                <p className="mt-4 max-w-3xl text-base leading-8 text-brand-stone">
                  Toute personne souhaitant télécharger son rapport d’orientation doit renseigner
                  son prénom, son nom et son email. Cela nous permet aussi d’identifier les profils
                  les plus engagés et de mieux vous recontacter si besoin.
                </p>
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  <input
                    value={downloadLead.firstName}
                    onChange={(event) =>
                      setDownloadLead((current) => ({ ...current, firstName: event.target.value }))
                    }
                    placeholder="Prénom*"
                    className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
                  />
                  <input
                    value={downloadLead.lastName}
                    onChange={(event) =>
                      setDownloadLead((current) => ({ ...current, lastName: event.target.value }))
                    }
                    placeholder="Nom*"
                    className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
                  />
                  <input
                    value={downloadLead.email}
                    onChange={(event) =>
                      setDownloadLead((current) => ({ ...current, email: event.target.value }))
                    }
                    placeholder="Email*"
                    inputMode="email"
                    className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
                  />
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={handleReportDownload}
                    disabled={!canDownloadReport}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Télécharger mon rapport
                    <Download size={16} />
                  </button>
                  <p className="text-sm text-brand-stone">
                    Les coordonnées sont demandées avant export, comme vous l’avez souhaité.
                  </p>
                </div>
                <TurnstileWidget
                  onVerify={setReportTurnstileToken}
                  className="mt-4 rounded-2xl border border-brand-teal/10 bg-brand-mint/35 px-4 py-4"
                />
                {downloadMessage ? (
                  <p
                    className={`mt-4 rounded-2xl px-4 py-3 text-sm ${
                      downloadState === "success"
                        ? "bg-brand-mint text-brand-teal"
                        : downloadState === "error"
                          ? "bg-red-50 text-red-700"
                          : "bg-white text-brand-stone"
                    }`}
                  >
                    {downloadMessage}
                  </p>
                ) : null}
              </div>

              <EditorialInsightVisual
                title="Livre blanc / rapport d’orientation"
                verticalLabel={lead.targetSector || "Life Sciences"}
                topicLabel="recruitment"
                audienceLabel="Profils, métiers, salaires, écoles"
                variant="lead"
              />
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
