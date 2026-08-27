#!/usr/bin/env node
/**
 * buffer-drafts-only.mjs
 *
 * Push posts LinkedIn dans Buffer en tant que DRAFTS uniquement.
 * Aucune publication auto. Georges valide et publie manuellement.
 *
 * Usage :
 *   node scripts/buffer-drafts-only.mjs --dir docs/posts-additionnels-q4-2026 --channel page
 *   node scripts/buffer-drafts-only.mjs --dir docs/posts-additionnels-q4-2026 --channel perso
 *   node scripts/buffer-drafts-only.mjs --file docs/posts-additionnels-q4-2026/post-1.md --channel page
 *   node scripts/buffer-drafts-only.mjs --dir docs/posts-additionnels-q4-2026 --channel page --dry-run
 *
 * Env attendues dans .env.local :
 *   BUFFER_ACCESS_TOKEN (ou BUFFER_API_KEY en fallback)
 *   BUFFER_CHANNEL_PAGE   (URL Buffer OU id brut du canal Page SKS Talents)
 *   BUFFER_CHANNEL_PERSO  (URL Buffer OU id brut du profil perso Georges)
 *
 * Log append dans data/buffer-drafts-log.jsonl.
 */

import { readFile, readdir, appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const ENV_PATH = path.join(PROJECT_ROOT, ".env.local");
const LOG_PATH = path.join(PROJECT_ROOT, "data", "buffer-drafts-log.jsonl");

const BUFFER_API_BASE = "https://api.bufferapp.com/1";

function readFlag(name) {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx === -1) return "";
  return String(process.argv[idx + 1] ?? "").trim();
}

function readBool(name) {
  return process.argv.includes(`--${name}`);
}

async function loadEnvLocal() {
  const env = {};
  try {
    const raw = await readFile(ENV_PATH, "utf8");
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
  } catch {
    // .env.local optional
  }
  return env;
}

function extractChannelId(raw) {
  if (!raw) return "";
  const trimmed = raw.trim();
  const match = trimmed.match(/channels\/([a-f0-9]{16,})/i);
  if (match) return match[1];
  return trimmed;
}

function stripFrontmatter(md) {
  const trimmed = md.replace(/^﻿/, "");
  if (!trimmed.startsWith("---")) return { frontmatter: {}, body: trimmed };
  const endIdx = trimmed.indexOf("\n---", 3);
  if (endIdx === -1) return { frontmatter: {}, body: trimmed };
  const fmBlock = trimmed.slice(3, endIdx).trim();
  const body = trimmed.slice(endIdx + 4).replace(/^\s*\n/, "");
  const frontmatter = {};
  for (const line of fmBlock.split("\n")) {
    const eq = line.indexOf(":");
    if (eq === -1) continue;
    const k = line.slice(0, eq).trim();
    let v = line.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    frontmatter[k] = v;
  }
  return { frontmatter, body };
}

async function collectPosts({ dir, file }) {
  const paths = [];
  if (file) {
    paths.push(path.resolve(PROJECT_ROOT, file));
  } else if (dir) {
    const absDir = path.resolve(PROJECT_ROOT, dir);
    let entries = [];
    try {
      entries = await readdir(absDir);
    } catch (err) {
      throw new Error(`Impossible de lire le dossier ${absDir}: ${err.message}`);
    }
    for (const name of entries.sort()) {
      if (!name.toLowerCase().endsWith(".md")) continue;
      if (/^(readme|index)\.md$/i.test(name)) continue;
      paths.push(path.join(absDir, name));
    }
  } else {
    throw new Error("Passer --dir <chemin> OU --file <chemin>");
  }

  const posts = [];
  for (const p of paths) {
    const raw = await readFile(p, "utf8");
    const { frontmatter, body } = stripFrontmatter(raw);
    const text = body.trim();
    if (!text) continue;
    posts.push({
      file: path.relative(PROJECT_ROOT, p),
      frontmatter,
      text
    });
  }
  return posts;
}

async function pushDraft({ accessToken, channelId, text, dryRun }) {
  if (dryRun) {
    return { ok: true, dryRun: true, preview: text.slice(0, 120) };
  }
  const params = new URLSearchParams();
  params.append("text", text);
  params.append("profile_ids[]", channelId);
  params.append("shorten", "false");
  params.append("now", "false");
  params.append("top", "false");
  params.append("draft", "true");

  const url = `${BUFFER_API_BASE}/updates/create.json?access_token=${encodeURIComponent(accessToken)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString()
  });
  const bodyTxt = await res.text().catch(() => "");
  let parsed = null;
  try {
    parsed = JSON.parse(bodyTxt);
  } catch {
    parsed = { raw: bodyTxt };
  }
  return {
    ok: res.ok && parsed?.success !== false,
    status: res.status,
    body: parsed
  };
}

async function appendLog(entry) {
  try {
    await mkdir(path.dirname(LOG_PATH), { recursive: true });
    await appendFile(LOG_PATH, `${JSON.stringify(entry)}\n`, "utf8");
  } catch (err) {
    console.warn(`[log] append echoue: ${err.message}`);
  }
}

async function main() {
  const dir = readFlag("dir");
  const file = readFlag("file");
  const channelKey = (readFlag("channel") || "page").toLowerCase();
  const dryRun = readBool("dry-run");

  if (!["page", "perso"].includes(channelKey)) {
    console.error("--channel doit valoir 'page' ou 'perso'");
    process.exit(1);
  }

  const env = { ...(await loadEnvLocal()), ...process.env };
  const accessToken = env.BUFFER_ACCESS_TOKEN || env.BUFFER_API_KEY;
  if (!accessToken && !dryRun) {
    console.error("BUFFER_ACCESS_TOKEN (ou BUFFER_API_KEY) manquant dans .env.local");
    process.exit(1);
  }

  const rawChannel = channelKey === "perso" ? env.BUFFER_CHANNEL_PERSO : env.BUFFER_CHANNEL_PAGE;
  const channelId = extractChannelId(rawChannel);
  if (!channelId && !dryRun) {
    console.error(`BUFFER_CHANNEL_${channelKey.toUpperCase()} manquant ou invalide dans .env.local`);
    process.exit(1);
  }

  const posts = await collectPosts({ dir, file });
  console.log(`\n=== Buffer drafts-only · SKS Talents ===`);
  console.log(`Mode        : ${dryRun ? "DRY-RUN (aucun appel API)" : "LIVE (push drafts Buffer)"}`);
  console.log(`Channel     : ${channelKey} (id: ${channelId ? `${channelId.slice(0, 8)}...` : "n/a"})`);
  console.log(`Posts trouves: ${posts.length}\n`);

  if (!posts.length) {
    console.log("Rien a envoyer.");
    return;
  }

  let ok = 0;
  let ko = 0;
  const startedAt = new Date().toISOString();

  for (let i = 0; i < posts.length; i += 1) {
    const post = posts[i];
    const label = `Post ${String(i + 1).padStart(2, "0")}/${posts.length} · ${post.file}`;
    try {
      const result = await pushDraft({ accessToken, channelId, text: post.text, dryRun });
      if (result.ok) {
        ok += 1;
        console.log(`  OK  ${label}${result.dryRun ? "  [dry-run] " + result.preview : ""}`);
      } else {
        ko += 1;
        const errMsg = result.body?.message || JSON.stringify(result.body).slice(0, 160);
        console.log(`  KO  ${label}  · status ${result.status} · ${errMsg}`);
      }
      await appendLog({
        ts: new Date().toISOString(),
        run_started_at: startedAt,
        channel: channelKey,
        channel_id: channelId,
        file: post.file,
        chars: post.text.length,
        frontmatter: post.frontmatter,
        dry_run: dryRun,
        ok: result.ok,
        status: result.status ?? null,
        error: result.ok ? null : (result.body?.message || null)
      });
    } catch (err) {
      ko += 1;
      console.log(`  KO  ${label}  · exception ${err.message}`);
      await appendLog({
        ts: new Date().toISOString(),
        run_started_at: startedAt,
        channel: channelKey,
        file: post.file,
        dry_run: dryRun,
        ok: false,
        error: err.message
      });
    }
    if (!dryRun) await new Promise((r) => setTimeout(r, 400));
  }

  console.log(`\nTermine · ${ok} drafts pousses · ${ko} erreurs.`);
  console.log(`Log      · ${path.relative(PROJECT_ROOT, LOG_PATH)}`);
  if (!dryRun) {
    console.log(`\nGeorges: connecte-toi a Buffer > onglet Drafts pour valider et publier.`);
  }
  process.exit(ko === 0 ? 0 : 2);
}

main().catch((err) => {
  console.error(`\nErreur fatale: ${err.message}`);
  process.exit(1);
});
