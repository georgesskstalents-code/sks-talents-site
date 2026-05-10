/**
 * Shared Resend sender with the same 3-step fallback used by the weekly digest:
 *  1. preferred from (skstalents.fr) → primary recipient
 *  2. onboarding@resend.dev → primary recipient (if domain not verified)
 *  3. onboarding@resend.dev → fallback recipient (Gmail) if primary refused (Resend test mode)
 */

const PRIMARY_RECIPIENT = process.env.CONTACT_NOTIFICATION_EMAIL ?? "g.kengue@skstalents.fr";
const FALLBACK_RECIPIENT = process.env.CRON_FALLBACK_RECIPIENT ?? "georges.skstalents@gmail.com";

async function postResend(apiKey: string, from: string, to: string, html: string, subject: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: to,
      subject,
      html
    }),
    cache: "no-store"
  });
  const body = await response.text().catch(() => "");
  return { ok: response.ok, status: response.status, body };
}

export async function sendDigestEmail(opts: {
  html: string;
  subject: string;
  fromLabel?: string;
}): Promise<
  | { sent: true; from: string; to: string; note?: string }
  | { sent: false; reason: string }
> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { sent: false, reason: "RESEND_API_KEY missing" };
  }

  const fromLabel = opts.fromLabel ?? "SKS Talents Suivi";
  const preferredFromBase = process.env.MAIL_FROM_EMAIL ?? "g.kengue@skstalents.fr";
  const preferredFrom = `${fromLabel} <${preferredFromBase}>`;
  const onboardingFrom = `${fromLabel} <onboarding@resend.dev>`;

  let attempt = await postResend(apiKey, preferredFrom, PRIMARY_RECIPIENT, opts.html, opts.subject);
  if (attempt.ok) return { sent: true, from: preferredFrom, to: PRIMARY_RECIPIENT };

  if (attempt.status === 403 && attempt.body.includes("not verified")) {
    attempt = await postResend(apiKey, onboardingFrom, PRIMARY_RECIPIENT, opts.html, opts.subject);
    if (attempt.ok) {
      return {
        sent: true,
        from: onboardingFrom,
        to: PRIMARY_RECIPIENT,
        note: "Sent via Resend default domain. Verify skstalents.fr on https://resend.com/domains for proper branding."
      };
    }
  }

  if (
    attempt.status === 403 &&
    (attempt.body.includes("testing emails") || attempt.body.includes("own email"))
  ) {
    attempt = await postResend(apiKey, onboardingFrom, FALLBACK_RECIPIENT, opts.html, opts.subject);
    if (attempt.ok) {
      return {
        sent: true,
        from: onboardingFrom,
        to: FALLBACK_RECIPIENT,
        note: `Resend is in test mode - email sent to the account-holder address (${FALLBACK_RECIPIENT}) instead of ${PRIMARY_RECIPIENT}.`
      };
    }
  }

  return { sent: false, reason: `Resend ${attempt.status}: ${attempt.body.slice(0, 240)}` };
}
