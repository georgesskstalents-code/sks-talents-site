#!/usr/bin/env node
/**
 * Helper OAuth pour generer le refresh_token GSC.
 *
 * Usage :
 *   node scripts/gsc-oauth-helper.mjs
 *
 * Prerequis :
 *   - Le fichier client_secret_*.json est dans ~/Downloads (telecharge depuis Google Cloud Console)
 *   - L'URI redirect "http://localhost:42424/oauth/callback" est dans les Authorized redirect URIs
 *   - kenguesylrice@gmail.com est dans les Test users du OAuth consent screen
 *
 * Le script :
 *   1. Lit le fichier JSON pour extraire client_id + client_secret
 *   2. Demarre un serveur local sur :42424
 *   3. Ouvre Chrome sur l'URL OAuth de Google
 *   4. Capture le authorization code via le callback
 *   5. Echange le code contre un refresh_token + access_token
 *   6. Affiche le refresh_token + le sauvegarde dans /tmp/gsc-refresh-token.txt
 *   7. Le copie dans le presse-papiers via pbcopy
 */

import { createServer } from "node:http";
import { exec } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync, chmodSync } from "node:fs";
import { homedir } from "node:os";
import { URL, URLSearchParams } from "node:url";
import { spawn } from "node:child_process";

const PORT = 42424;
const REDIRECT_URI = `http://localhost:${PORT}/oauth/callback`;
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

function findClientSecretJson() {
  const downloadsDir = `${homedir()}/Downloads`;
  const files = readdirSync(downloadsDir)
    .filter((f) => f.startsWith("client_secret_") && f.endsWith(".json"))
    .map((f) => ({ name: f, path: `${downloadsDir}/${f}` }))
    .sort((a, b) => b.name.localeCompare(a.name)); // most recent first by name
  if (files.length === 0) {
    throw new Error("Aucun fichier client_secret_*.json trouve dans ~/Downloads");
  }
  return files[0].path;
}

function loadClient(path) {
  const raw = readFileSync(path, "utf-8");
  const data = JSON.parse(raw);
  const web = data.web || data.installed;
  if (!web?.client_id || !web?.client_secret) {
    throw new Error(`Fichier ${path} : client_id ou client_secret manquant`);
  }
  return { client_id: web.client_id, client_secret: web.client_secret };
}

function buildAuthUrl(clientId) {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPE,
    access_type: "offline",
    prompt: "consent" // force la generation d'un refresh_token meme si deja autorise
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

async function exchangeCode(code, clientId, clientSecret) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code"
    })
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`OAuth exchange failed ${response.status}: ${text.slice(0, 400)}`);
  }
  return JSON.parse(text);
}

async function main() {
  console.log("🔍 Recherche du fichier client_secret_*.json dans ~/Downloads...");
  const jsonPath = findClientSecretJson();
  console.log(`✓ Trouve : ${jsonPath}`);

  const { client_id, client_secret } = loadClient(jsonPath);
  console.log(`✓ Client ID : ${client_id.slice(0, 30)}...`);

  const authUrl = buildAuthUrl(client_id);

  // Demarre serveur local
  const tokenPromise = new Promise((resolve, reject) => {
    const server = createServer(async (req, res) => {
      const url = new URL(req.url, `http://localhost:${PORT}`);
      if (url.pathname !== "/oauth/callback") {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      const code = url.searchParams.get("code");
      const error = url.searchParams.get("error");
      if (error) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`<html><body style="font-family:system-ui;padding:40px;max-width:600px"><h1>❌ Erreur OAuth</h1><p>${error}</p><p>Tu peux fermer cet onglet et retourner au terminal.</p></body></html>`);
        server.close();
        reject(new Error(`OAuth error: ${error}`));
        return;
      }
      if (!code) {
        res.writeHead(400);
        res.end("Pas de code dans le callback");
        return;
      }
      try {
        const tokens = await exchangeCode(code, client_id, client_secret);
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`<html><body style="font-family:system-ui;padding:40px;max-width:600px;text-align:center"><h1 style="color:#1a7a3e">✅ Authorization reussie</h1><p>Refresh token capture. Tu peux fermer cet onglet et retourner au terminal.</p></body></html>`);
        server.close();
        resolve(tokens);
      } catch (err) {
        res.writeHead(500);
        res.end(`Exchange failed: ${err.message}`);
        server.close();
        reject(err);
      }
    });
    server.listen(PORT, () => {
      console.log(`\n🌐 Serveur local demarre sur http://localhost:${PORT}`);
      console.log(`\n📋 Ouverture de Chrome sur l'URL OAuth...`);
      console.log(`\nSi le navigateur ne s'ouvre pas, copie-colle cette URL :\n${authUrl}\n`);
      // open in default browser
      exec(`open "${authUrl}"`, (err) => {
        if (err) console.error("Failed to open browser automatically:", err.message);
      });
    });
    // Timeout 5 minutes
    setTimeout(() => {
      server.close();
      reject(new Error("Timeout (5 min sans callback). As-tu clique Allow ?"));
    }, 300000);
  });

  console.log("\n⏳ En attente du callback OAuth (clique 'Allow' dans Chrome)...");
  const tokens = await tokenPromise;

  if (!tokens.refresh_token) {
    console.error("\n❌ Pas de refresh_token dans la reponse. Possible cause : tu as deja autorise cette app, Google ne re-renvoie pas le refresh_token.");
    console.error("Fix : va sur https://myaccount.google.com/permissions, revoke l'acces de 'SKS Talents Internal', puis relance ce script.");
    process.exit(1);
  }

  // Save token to file
  const tokenPath = "/tmp/gsc-refresh-token.txt";
  writeFileSync(tokenPath, tokens.refresh_token, "utf-8");
  chmodSync(tokenPath, 0o600);

  // Copy to clipboard via pbcopy
  const pbcopy = spawn("pbcopy");
  pbcopy.stdin.write(tokens.refresh_token);
  pbcopy.stdin.end();

  console.log("\n✅ SUCCESS !");
  console.log(`\nRefresh token : ${tokens.refresh_token.slice(0, 20)}... (${tokens.refresh_token.length} chars)`);
  console.log(`Sauvegarde dans : ${tokenPath}`);
  console.log(`Copie dans le presse-papiers ✓`);
  console.log(`\nClient ID : ${client_id}`);
  console.log(`\nProchaines etapes :`);
  console.log(`  1. Va sur Vercel > Settings > Environment Variables`);
  console.log(`  2. Ajoute 3 vars (Production + Preview + Dev cochees) :`);
  console.log(`       GSC_OAUTH_CLIENT_ID = ${client_id}`);
  console.log(`       GSC_OAUTH_CLIENT_SECRET = (depuis ${jsonPath})`);
  console.log(`       GSC_OAUTH_REFRESH_TOKEN = (presse-papiers - Cmd+V dans Vercel)`);
  console.log(`  3. Redeploy puis test : https://www.skstalents.fr/api/dashboard/gsc-test?token=DASHBOARD_PRIVATE_TOKEN&debug=1`);
}

main().catch((err) => {
  console.error("\n❌ Erreur :", err.message);
  process.exit(1);
});
