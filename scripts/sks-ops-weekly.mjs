#!/usr/bin/env node
/**
 * sks-ops-weekly.mjs
 *
 * Orchestrateur "lundi matin" · SKS Autonomous Cabinet v3.
 *
 * 1. Genere le digest hebdomadaire (via generate-weekly-site-intelligence-digest.mjs)
 * 2. Ecrit une copie horodatee dans docs/automations/sks-weekly-intelligence-YYYY-MM-DD.md
 * 3. Optionnel: envoie l'email digest (--send) via Resend
 *
 * Usage :
 *   node scripts/sks-ops-weekly.mjs                # genere + affiche + ecrit fichier
 *   node scripts/sks-ops-weekly.mjs --send         # + envoi email a g.kengue
 *   node scripts/sks-ops-weekly.mjs --preview 40   # + preview 40 premieres lignes console
 */

import { spawn } from "node:child_process";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");

function readFlag(name) {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx === -1) return "";
  return String(process.argv[idx + 1] ?? "").trim();
}

function readBool(name) {
  return process.argv.includes(`--${name}`);
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

async function loadEnvLocal() {
  const env = {};
  try {
    const raw = await readFile(path.join(PROJECT_ROOT, ".env.local"), "utf8");
    for (const rawLine of raw.split("\n")) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#") || !line.includes("=")) continue;
      const eq = line.indexOf("=");
      const key = line.slice(0, eq).trim();
      let val = line.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
  } catch {}
  return env;
}

function runDigest() {
  return new Promise((resolve, reject) => {
    const script = path.join(PROJECT_ROOT, "scripts", "generate-weekly-site-intelligence-digest.mjs");
    const proc = spawn("node", [script], {
      cwd: PROJECT_ROOT,
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"]
    });
    let stdout = "";
    let stderr = "";
    proc.stdout.on("data", (chunk) => (stdout += chunk.toString("utf8")));
    proc.stderr.on("data", (chunk) => (stderr += chunk.toString("utf8")));
    proc.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`generate-weekly-site-intelligence-digest exited ${code}: ${stderr.slice(0, 500)}`));
      } else {
        if (stderr.trim()) {
          process.stderr.write(`[digest stderr]\n${stderr}\n`);
        }
        resolve(stdout);
      }
    });
    proc.on("error", reject);
  });
}

async function sendDigestEmail(markdown) {
  const env = { ...(await loadEnvLocal()), ...process.env };
  const apiKey = env.RESEND_API_KEY;
  const to = env.CONTACT_NOTIFICATION_EMAIL || "g.kengue@skstalents.fr";
  const from = env.MAIL_FROM_EMAIL
    ? `SKS Ops Weekly <${env.MAIL_FROM_EMAIL}>`
    : "SKS Ops Weekly <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("[send] RESEND_API_KEY absent - email non envoye");
    return { sent: false, reason: "no-api-key" };
  }

  const html = `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#111;max-width:720px;margin:0 auto;padding:24px;">
  <h1 style="margin:0 0 8px;">SKS Ops Weekly · ${todayIso()}</h1>
  <p style="color:#555;margin:0 0 16px;">Genere par scripts/sks-ops-weekly.mjs</p>
  <pre style="white-space:pre-wrap;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;background:#f7f7f7;padding:16px;border-radius:8px;">${markdown.replace(/</g, "&lt;")}</pre>
</body></html>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `SKS Ops Weekly · ${todayIso()}`,
      html
    })
  });
  const bodyTxt = await res.text().catch(() => "");
  if (!res.ok) {
    console.warn(`[send] Resend ${res.status}: ${bodyTxt.slice(0, 200)}`);
    return { sent: false, reason: `resend-${res.status}` };
  }
  return { sent: true, to };
}

async function main() {
  const send = readBool("send");
  const previewN = parseInt(readFlag("preview") || "0", 10) || 0;

  console.log(`\n=== SKS Ops Weekly · ${todayIso()} ===\n`);
  console.log("[1/3] Generation du digest hebdomadaire...");
  const markdown = await runDigest();

  console.log("[2/3] Ecriture du fichier archive...");
  const outDir = path.join(PROJECT_ROOT, "docs", "automations");
  await mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, `sks-weekly-intelligence-${todayIso()}.md`);
  await writeFile(outFile, markdown, "utf8");
  console.log(`      -> ${path.relative(PROJECT_ROOT, outFile)}`);

  if (send) {
    console.log("[3/3] Envoi email a Georges...");
    const res = await sendDigestEmail(markdown);
    console.log(res.sent ? `      OK envoye a ${res.to}` : `      KO (${res.reason})`);
  } else {
    console.log("[3/3] --send absent, email non envoye.");
  }

  if (previewN > 0) {
    console.log(`\n--- Preview (${previewN} premieres lignes) ---\n`);
    console.log(markdown.split("\n").slice(0, previewN).join("\n"));
    console.log(`\n--- Fin preview ---`);
  }

  console.log(`\nTermine.`);
}

main().catch((err) => {
  console.error(`\nErreur fatale: ${err.message}`);
  process.exit(1);
});
