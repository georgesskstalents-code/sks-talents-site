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
    background: #1D5457;
    color: #FFFFFF;
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
  .cover-top {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    position: relative;
    z-index: 1;
  }}
  .vertical-badge {{
    color: #E8E2D4;
    font-weight: 700;
    letter-spacing: 0.28em;
    font-size: 16px;
    text-transform: uppercase;
  }}
  .emoji {{
    display: none;
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
    font-size: {title_size}px;
    line-height: 1.14;
    color: #FFFFFF;
    letter-spacing: -0.008em;
    max-width: 980px;
  }}
  .divider {{
    width: 90px;
    height: 5px;
    background: #E8E2D4;
    margin: 25px 0 15px;
  }}
  .subtitle {{
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 21px;
    color: #DED7C6;
    letter-spacing: 0.03em;
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
    font-size: 24px;
    color: #FFFFFF;
  }}
  .tagline {{
    color: #E8E2D4;
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

    # Le corps de titre s'adapte a la longueur, pour que le cadrage reste
    # constant d'un article a l'autre : un titre long ne doit pas deborder,
    # un titre court ne doit pas flotter.
    n = len(title)
    if n > 95:
        title_size = 42
    elif n > 78:
        title_size = 46
    elif n > 60:
        title_size = 51
    elif n > 42:
        title_size = 58
    else:
        title_size = 64

    html = HTML_TPL.format(
        w=W,
        h=H,
        title_size=title_size,
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



ARTICLES_TS = PROJECT_ROOT / "data" / "articles.ts"


def read_articles_dataset():
    """Extrait slug, titre, verticale et sujet de chaque article de data/articles.ts.

    On decoupe le fichier sur les lignes `    slug: "..."` plutot que sur les
    accolades : le champ `content` contient du markdown qui casse tout decoupage
    structurel naif.
    """
    if not ARTICLES_TS.exists():
        return []
    src = ARTICLES_TS.read_text(encoding="utf-8")
    # On ancre sur `id:`, premier champ de chaque entree. Ancrer sur `slug:`
    # decalait la fenetre d'une entree : le titre etait juste, mais le sujet et
    # la verticale etaient ceux de l'article precedent.
    anchors = [m for m in re.finditer(r'^    id: "([^"]+)"', src, re.M)]
    out = []
    for i, m in enumerate(anchors):
        lo = m.start()
        hi = anchors[i + 1].start() if i + 1 < len(anchors) else len(src)
        window = src[lo:hi]

        def field(name):
            f = re.search(r'^    %s: "((?:[^"\\]|\\.)*)"' % name, window, re.M)
            return f.group(1) if f else ""

        vertical = field("vertical") or "life-sciences"
        if vertical not in ("life-sciences", "animal-health"):
            vertical = "animal-health" if ("vet" in vertical or "petfood" in vertical) else "life-sciences"
        slug = field("slug")
        if not slug:
            continue
        out.append({
            "slug": slug,
            "title": field("title"),
            "vertical": vertical,
            "topic": field("topic"),
        })
    return out


def main():
    chrome_bin = find_chrome()
    if not chrome_bin:
        print("Chrome/Chromium introuvable.")
        return 1

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)

    files = sorted(NEWSLETTERS_DIR.glob("*.md"))
    entries = []
    for f in files:
        fm = parse_frontmatter(f.read_text(encoding="utf-8"))
        if fm and fm.get("slug"):
            entries.append(fm)

    # docs/newsletters ne couvre qu'une partie du blog. La source de verite des
    # articles publies est data/articles.ts : on la lit pour generer une
    # couverture par article, sans quoi les anciennes couvertures restent en
    # place avec l'ancienne palette.
    entries += read_articles_dataset()

    seen = set()
    unique = []
    for fm in entries:
        if fm["slug"] in seen:
            continue
        seen.add(fm["slug"])
        unique.append(fm)
    entries = unique
    print(f"=== SKS Blog Cover Generator ===\n")
    print(f"Chrome: {chrome_bin}")
    print(f"Output: {OUTPUT_DIR.relative_to(PROJECT_ROOT)}\n")

    ok, ko = 0, 0
    script_mtime = Path(__file__).stat().st_mtime
    for fm in entries:
        existing = PUBLIC_DIR / f"{fm['slug']}.png"
        if existing.exists() and existing.stat().st_mtime > script_mtime:
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
