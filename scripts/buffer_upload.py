#!/usr/bin/env python3
"""
Upload en batch de posts LinkedIn vers Buffer pour programmation.

Usage :
    python3 scripts/buffer_upload.py

Le script demande interactivement :
    - Clé API Buffer (access_token) : https://publish.buffer.com/developers/api
    - Chemin CSV : docs/buffer-batch-pilote-sem36.csv
    - Channel ID Buffer : 6a7b4c19b2d9d5774359e4eb (par exemple)

Format CSV attendu (headers) :
    Text,Image URL,Posting Time,Channel

    - Text       : contenu du post (échappé avec guillemets si contient virgule/retour ligne)
    - Image URL  : URL publique de l'image ou vide
    - Posting Time : ISO 8601 "2026-08-31 07:30" (fuseau Europe/Paris)
    - Channel    : "page" ou "perso" pour router vers le bon canal

API utilisée : Buffer API v1 (https://buffer.com/developers/api/updates)
"""

import csv
import sys
import time
from datetime import datetime
from getpass import getpass

import requests
from zoneinfo import ZoneInfo

BUFFER_API_BASE = "https://api.bufferapp.com/1"
PARIS_TZ = ZoneInfo("Europe/Paris")


def parse_scheduled_at(value: str) -> int:
    """Convertit '2026-08-31 07:30' Europe/Paris en timestamp Unix pour Buffer."""
    if not value or not value.strip():
        return 0
    dt = datetime.strptime(value.strip(), "%Y-%m-%d %H:%M").replace(tzinfo=PARIS_TZ)
    return int(dt.timestamp())


def main() -> int:
    print("\n=== Buffer Bulk Upload · SKS Talents ===\n")

    access_token = getpass("🔑 Buffer access_token (masqué à la saisie) : ").strip()
    if not access_token:
        print("❌ access_token vide, abandon.")
        return 1

    csv_path = input("📁 Chemin CSV (ex: docs/buffer-batch-pilote-sem36.csv) : ").strip()
    if not csv_path:
        print("❌ chemin CSV vide, abandon.")
        return 1

    channel_page = input("📢 Channel ID PAGE SKS Talents (Enter pour skipper) : ").strip()
    channel_perso = input("👤 Channel ID PERSO Georges (Enter pour skipper) : ").strip()

    if not channel_page and not channel_perso:
        print("❌ au moins un channel ID doit être renseigné.")
        return 1

    with open(csv_path, "r", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    print(f"\n✅ {len(rows)} posts à programmer\n")

    ok, ko = 0, 0
    for i, row in enumerate(rows, 1):
        text = (row.get("Text") or "").strip()
        image_url = (row.get("Image URL") or "").strip()
        scheduled_at = (row.get("Posting Time") or "").strip()
        channel = (row.get("Channel") or "page").strip().lower()

        if not text:
            print(f"⚠️  Post {i} : Text vide, skip.")
            continue

        # Choix du channel selon la colonne
        if channel == "perso" and channel_perso:
            channel_id = channel_perso
        elif channel_page:
            channel_id = channel_page
        else:
            print(f"⚠️  Post {i} : channel '{channel}' non configuré, skip.")
            continue

        payload = {
            "text": text,
            "profile_ids[]": channel_id,
            "shorten": "false",
            "now": "false",
        }
        if image_url:
            payload["media[link]"] = image_url
            payload["media[photo]"] = image_url
        if scheduled_at:
            payload["scheduled_at"] = str(parse_scheduled_at(scheduled_at))

        url = f"{BUFFER_API_BASE}/updates/create.json?access_token={access_token}"

        try:
            resp = requests.post(url, data=payload, timeout=30)
            if resp.status_code == 200 and resp.json().get("success"):
                ok += 1
                print(f"✅ Post {i:>3} programmé · {scheduled_at} · {channel}")
            else:
                ko += 1
                print(f"❌ Post {i:>3} · HTTP {resp.status_code} · {resp.text[:200]}")
        except Exception as exc:
            ko += 1
            print(f"❌ Post {i:>3} · exception : {exc}")

        time.sleep(0.5)  # rate limit safety

    print(f"\n🎉 Terminé · {ok} programmés · {ko} erreurs.")
    return 0 if ko == 0 else 2


if __name__ == "__main__":
    sys.exit(main())
