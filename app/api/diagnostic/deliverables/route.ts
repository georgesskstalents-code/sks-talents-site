import { NextResponse } from "next/server";
import { buildDeliverablesEmailHtml } from "@/lib/diagnosticDeliverables";
import type { Answers } from "@/lib/recruitmentDiagnostic";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.skstalents.fr";
const CEO_NOTIFICATION_EMAIL = process.env.CONTACT_NOTIFICATION_EMAIL ?? "g.kengue@skstalents.fr";

type RequestBody = {
  email?: string;
  firstName?: string;
  company?: string;
  answers?: Answers;
};

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

async function postResend(apiKey: string, body: Record<string, unknown>) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    cache: "no-store"
  });
}

export async function POST(request: Request) {
  let payload: RequestBody = {};
  try {
    payload = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  const email = (payload.email ?? "").trim();
  const firstName = (payload.firstName ?? "").trim().slice(0, 64);
  const company = (payload.company ?? "").trim().slice(0, 120);
  const answers = payload.answers;

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, message: "Email pro requis." }, { status: 400 });
  }
  if (!answers || typeof answers !== "object") {
    return NextResponse.json({ ok: false, message: "Diagnostic incomplet." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, message: "Service email non configure. Contactez-nous directement." },
      { status: 503 }
    );
  }

  const html = buildDeliverablesEmailHtml({ firstName, answers });
  const subject = "Vos benchmarks salaires + plan d'action 12 mois - SKS Talents";

  const preferredFrom = `SKS Talents <${process.env.MAIL_FROM_EMAIL ?? "g.kengue@skstalents.fr"}>`;
  const onboardingFrom = "SKS Talents <onboarding@resend.dev>";

  // 1) Envoi vers l'utilisateur final.
  let response = await postResend(apiKey, { from: preferredFrom, to: [email], subject, html });
  let body = await response.text().catch(() => "");
  let usedFrom = preferredFrom;

  if (!response.ok && response.status === 403 && body.includes("not verified")) {
    response = await postResend(apiKey, { from: onboardingFrom, to: [email], subject, html });
    body = await response.text().catch(() => "");
    usedFrom = onboardingFrom;
  }

  if (!response.ok && response.status === 403 && (body.includes("testing emails") || body.includes("own email"))) {
    // Resend en mode test : impossible d'envoyer a l'utilisateur. On notifie le CEO uniquement.
    const fallbackHtml = `<p>Mode test Resend actif. Lead capture :</p>
      <ul>
        <li><strong>Email :</strong> ${email}</li>
        <li><strong>Prenom :</strong> ${firstName || "-"}</li>
        <li><strong>Entreprise :</strong> ${company || "-"}</li>
      </ul>
      <hr/>${html}`;
    await postResend(apiKey, {
      from: onboardingFrom,
      to: [CEO_NOTIFICATION_EMAIL],
      subject: `[Diagnostic lead] ${email} - mode test Resend`,
      html: fallbackHtml
    });
    return NextResponse.json({
      ok: true,
      note: "Email differe (Resend en mode test). Nous vous recontactons sous 24h."
    });
  }

  if (!response.ok) {
    return NextResponse.json(
      { ok: false, message: `Echec envoi: ${response.status}` },
      { status: 502 }
    );
  }

  // 2) Notification CEO (best-effort, ne bloque pas la reponse utilisateur).
  const notifySubject = `[Diagnostic] ${email}${company ? ` - ${company}` : ""}`;
  const notifyHtml = `
    <p><strong>Nouveau lead diagnostic :</strong></p>
    <ul>
      <li>Email : ${email}</li>
      <li>Prenom : ${firstName || "-"}</li>
      <li>Entreprise : ${company || "-"}</li>
      <li>Hiring volume 12 mois : ${answers.hiringVolume || "-"}</li>
      <li>Time-to-hire : ${answers.timeToHire || "-"}</li>
      <li>Leader time/sem : ${answers.leaderTime || "-"}</li>
      <li>Process maturity : ${answers.processMaturity || "-"}</li>
      <li>Blocker principal : ${answers.mainBlocker || "-"}</li>
    </ul>
    <p><a href="${SITE_URL}/diagnostic/rapport">Ouvrir le rapport</a></p>
  `;
  postResend(apiKey, {
    from: usedFrom,
    to: [CEO_NOTIFICATION_EMAIL],
    subject: notifySubject,
    html: notifyHtml
  }).catch((err) => console.error("Diagnostic lead CEO notify failed", err));

  return NextResponse.json({ ok: true });
}
