#!/usr/bin/env python3
"""
Genere des covers OG (1200x627) SKS-branded pour articles blog.

Utilise Chrome headless en mode --screenshot pour render HTML+CSS -> PNG.
Palette SKS Talents (teal + cream + Playfair Display serif).

Usage:
    python3 scripts/generate-blog-covers.py

Lit les 8 articles depuis /docs/newsletters/*.md (frontmatter YAML)
et genere output/blog-covers/{slug}.png a copier ensuite dans /public/blog-covers/.
"""

import json
import re
import shutil
import subprocess
import sys
from html import escape
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
NEWSLETTERS_DIR = PROJECT_ROOT / "docs" / "newsletters"
OUTPUT_DIR = PROJECT_ROOT / "output" / "blog-covers"
PUBLIC_DIR = PROJECT_ROOT / "public" / "blog-covers"

W = 1200
H = 627

CHROME_CANDIDATES = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
]

VERTICAL_LABEL = {
    "life-sciences": "LIFE SCIENCES",
    "animal-health": "ANIMAL HEALTH",
}

VERTICAL_EMOJI = {
    "life-sciences": "🧬",
    "animal-health": "🐾",
}

HTML_TPL = """<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>{title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  html, body {{ width: {w}px; height: {h}px; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
  body {{
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background: #EFEDE4;
    color: #163334;
    overflow: hidden;
  }}
  .cover {{
    width: {w}px;
    height: {h}px;
    padding: 60px 70px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }}
  .cover::before {{
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 90px;
    background: #4A9B9B;
  }}
  .cover-top {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    position: relative;
    z-index: 1;
  }}
  .vertical-badge {{
    color: #FFFFFF;
    font-weight: 700;
    letter-spacing: 0.28em;
    font-size: 16px;
    text-transform: uppercase;
  }}
  .emoji {{
    font-size: 48px;
    line-height: 1;
    color: #FFFFFF;
  }}
  .cover-body {{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
  }}
  .title {{
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700;
    font-size: 48px;
    line-height: 1.1;
    color: #163334;
    letter-spacing: -0.01em;
    max-width: 1000px;
  }}
  .divider {{
    width: 80px;
    height: 5px;
    background: #4A9B9B;
    margin: 25px 0 15px;
  }}
  .subtitle {{
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 20px;
    color: #17A7A0;
    letter-spacing: 0.05em;
  }}
  .cover-bottom {{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 18px;
  }}
  .brand {{
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 22px;
    color: #163334;
  }}
  .tagline {{
    color: #17A7A0;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 0.04em;
  }}
</style>
</head>
<body>
<div class="cover">
  <div class="cover-top">
    <div class="vertical-badge">{vertical_label}</div>
    <div class="emoji">{emoji}</div>
  </div>
  <div class="cover-body">
    <div class="title">{title}</div>
    <div class="divider"></div>
    <div class="subtitle">{topic}</div>
  </div>
  <div class="cover-bottom">
    <div class="brand">SKS Talents</div>
    <div class="tagline">Your Talent · Our Future</div>
  </div>
</div>
</body>
</html>
"""


def parse_frontmatter(text):
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.DOTALL)
    if not m:
        return {}
    yaml_block = m.group(1)
    fm = {}
    for line in yaml_block.split("\n"):
        line = line.rstrip()
        if not line or ":" not in line:
            continue
        key, _, val = line.partition(":")
        key = key.strip()
        val = val.strip()
        if val.startswith("[") and val.endswith("]"):
            fm[key] = re.findall(r'"([^"]+)"', val[1:-1])
        elif val.startswith('"') and val.endswith('"'):
            fm[key] = val[1:-1]
        elif val.isdigit():
            fm[key] = int(val)
        else:
            fm[key] = val
    return fm


def find_chrome():
    for p in CHROME_CANDIDATES:
        if Path(p).exists():
            return p
    return shutil.which("google-chrome") or shutil.which("chromium")


def generate_cover(fm, chrome_bin, out_dir):
    slug = fm.get("slug")
    title = fm.get("title", "")
    vertical = fm.get("vertical", "life-sciences")
    topic = fm.get("topic", "")

    html = HTML_TPL.format(
        w=W,
        h=H,
        title=escape(title),
        vertical_label=escape(VERTICAL_LABEL.get(vertical, vertical.upper())),
        emoji=VERTICAL_EMOJI.get(vertical, "📄"),
        topic=escape(topic),
    )

    html_path = out_dir / f"{slug}.html"
    png_path = out_dir / f"{slug}.png"
    html_path.write_text(html, encoding="utf-8")

    result = subprocess.run(
        [
            chrome_bin,
            "--headless=new",
            "--disable-gpu",
            "--no-sandbox",
            "--virtual-time-budget=20000",
            "--hide-scrollbars",
            f"--window-size={W},{H}",
            f"--screenshot={png_path}",
            f"file://{html_path}",
        ],
        capture_output=True,
        text=True,
        timeout=60,
    )
    return png_path, result


def main():
    chrome_bin = find_chrome()
    if not chrome_bin:
        print("Chrome/Chromium introuvable.")
        return 1

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)

    files = sorted(NEWSLETTERS_DIR.glob("*.md"))
    print(f"=== SKS Blog Cover Generator ===\n")
    print(f"Chrome: {chrome_bin}")
    print(f"Output: {OUTPUT_DIR.relative_to(PROJECT_ROOT)}\n")

    ok, ko = 0, 0
    for f in files:
        fm = parse_frontmatter(f.read_text(encoding="utf-8"))
        if not fm or not fm.get("slug"):
            continue
        try:
            png_path, result = generate_cover(fm, chrome_bin, OUTPUT_DIR)
            if png_path.exists() and png_path.stat().st_size > 0:
                # Copy to /public/blog-covers/ for the site
                dest = PUBLIC_DIR / png_path.name
                shutil.copy2(png_path, dest)
                ok += 1
                size_kb = dest.stat().st_size // 1024
                print(f"OK {png_path.name} ({size_kb} KB) -> public/blog-covers/")
            else:
                ko += 1
                print(f"KO {fm.get('slug')} · Chrome err : {result.stderr[-200:]}")
        except Exception as exc:
            ko += 1
            print(f"KO {fm.get('slug')} · {exc}")

    print(f"\nDone: {ok} covers generated, {ko} errors")
    return 0 if ko == 0 else 2


if __name__ == "__main__":
    sys.exit(main())
