/**
 * Adapter email leger pour Chloe Live.
 * Reprend la strategie de lib/email.ts (Resend d'abord, sendmail en fallback)
 * mais expose une fonction publique reutilisable pour la route chloe-chat.
 */

import { spawn } from "node:child_process";

function sanitizeHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

async function sendViaResend(args: {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: args.from,
      to: [args.to],
      reply_to: args.replyTo,
      subject: args.subject,
      text: args.text
    }),
    cache: "no-store"
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend failed with ${res.status}: ${body}`);
  }
  return true;
}

async function sendViaSendmail(args: {
  recipient: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
}) {
  const safeRecipient = sanitizeHeader(args.recipient);
  const safeFrom = sanitizeHeader(args.from);
  const safeSubject = sanitizeHeader(args.subject);

  const body = [
    `To: ${safeRecipient}`,
    `From: ${safeFrom}`,
    ...(args.replyTo ? [`Reply-To: ${sanitizeHeader(args.replyTo)}`] : []),
    `Subject: ${safeSubject}`,
    "Content-Type: text/plain; charset=UTF-8",
    "",
    args.text
  ].join("\n");

  await new Promise<void>((resolve, reject) => {
    const proc = spawn("/usr/sbin/sendmail", ["-f", safeFrom, "-t", "-i"]);
    let stderr = "";
    proc.stdin.write(body);
    proc.stdin.end();
    proc.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    proc.on("error", reject);
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(stderr || `sendmail failed with code ${code}`));
    });
  });
}

export async function sendPlainTextEmailPublic(args: {
  recipient: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
}) {
  const sentViaResend = await sendViaResend({
    to: sanitizeHeader(args.recipient),
    from: sanitizeHeader(args.from),
    replyTo: args.replyTo ? sanitizeHeader(args.replyTo) : undefined,
    subject: sanitizeHeader(args.subject),
    text: args.text
  }).catch((err) => {
    console.error("chloe-email-adapter Resend error", err);
    return false;
  });

  if (sentViaResend) return;

  try {
    await sendViaSendmail({
      recipient: args.recipient,
      from: args.from,
      replyTo: args.replyTo,
      subject: args.subject,
      text: args.text
    });
  } catch (err) {
    console.error("chloe-email-adapter sendmail fallback failed", err);
  }
}
