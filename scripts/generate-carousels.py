#!/usr/bin/env python3
"""
Genere des carrousels LinkedIn en PDF (branding SKS Talents).

Usage:
    python3 scripts/generate-carousels.py [MANIFEST_JSON]

Manifest par defaut: scripts/carrousels-manifest.json

Sortie: /output/carrousels/{slug}.pdf (format 1080x1350 · LinkedIn portrait 4:5)

Requis:
    - Chrome ou Chromium installe (macOS: Google Chrome recommande)
    - Python 3.9+

Le script embarque un template HTML+CSS aux couleurs SKS Talents
(teal #163334, mint accent, cream). Chaque carrousel = N slides genereees
via Chrome headless en PDF paginated ready-to-upload sur LinkedIn / Buffer.
"""

import json
import shutil
import subprocess
import sys
from html import escape
from pathlib import Path
from typing import Optional, Tuple

PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = PROJECT_ROOT / "output" / "carrousels"
DEFAULT_MANIFEST = PROJECT_ROOT / "scripts" / "carrousels-manifest.json"

CHROME_CANDIDATES = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
]

# LinkedIn carrousel optimal: 1080x1350 (portrait 4:5) - occupe plus le feed
SLIDE_W = 1080
SLIDE_H = 1350

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>{title}</title>
<style>
  @page {{ size: {w}px {h}px; margin: 0; }}
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  html, body {{ width: {w}px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
  body {{
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
    background: #FEFEFE;
    color: #163334;
    line-height: 1.4;
    font-feature-settings: 'ss01' 1, 'cv11' 1;
  }}
  .slide {{
    width: {w}px;
    height: {h}px;
    padding: 90px 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    page-break-after: always;
    position: relative;
    overflow: hidden;
  }}
  .slide:last-child {{ page-break-after: auto; }}
  .slide.cover {{ background: linear-gradient(135deg, #163334 0%, #1a4548 100%); color: #FEFEFE; }}
  .slide.body {{ background: #FEFEFE; }}
  .slide.highlight {{ background: #E8F4F1; }}
  .slide.data {{ background: #F5F1E8; }}
  .slide.cta {{ background: linear-gradient(135deg, #0f3a3c 0%, #163334 100%); color: #FEFEFE; }}

  .slide-header {{ display: flex; justify-content: space-between; align-items: center; }}
  .slide-num {{ font-size: 18px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: #6B8080; }}
  .slide.cover .slide-num, .slide.cta .slide-num {{ color: rgba(232,244,241,0.6); }}
  .brand {{ font-size: 18px; font-weight: 700; letter-spacing: 0.06em; color: #163334; }}
  .slide.cover .brand, .slide.cta .brand {{ color: #E8F4F1; }}

  .slide-body {{ flex: 1; display: flex; flex-direction: column; justify-content: center; }}
  .eyebrow {{ font-size: 20px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #17A7A0; margin-bottom: 28px; }}
  .slide.cover .eyebrow, .slide.cta .eyebrow {{ color: #85C5C0; }}
  h1 {{ font-size: 68px; line-height: 1.05; font-weight: 700; margin-bottom: 24px; letter-spacing: -0.01em; }}
  h2 {{ font-size: 48px; line-height: 1.1; font-weight: 700; margin-bottom: 22px; letter-spacing: -0.005em; }}
  h3 {{ font-size: 34px; line-height: 1.2; font-weight: 600; margin-bottom: 18px; }}
  p {{ font-size: 26px; line-height: 1.5; margin-bottom: 14px; }}
  ul {{ list-style: none; margin-top: 22px; }}
  li {{ font-size: 26px; line-height: 1.5; padding-left: 44px; position: relative; margin-bottom: 18px; }}
  li::before {{ content: "→"; position: absolute; left: 0; color: #17A7A0; font-weight: 700; font-size: 28px; }}
  .slide.cover li::before, .slide.cta li::before {{ color: #85C5C0; }}
  em, .italic {{ font-style: italic; color: #17A7A0; }}
  .slide.cover em, .slide.cta em {{ color: #85C5C0; }}
  strong {{ font-weight: 700; }}

  .slide-footer {{ display: flex; justify-content: space-between; align-items: flex-end; font-size: 18px; margin-top: 40px; }}
  .signature {{ font-weight: 700; letter-spacing: 0.05em; }}
  .slide-swipe {{ color: #17A7A0; font-weight: 600; }}
  .slide.cover .slide-swipe, .slide.cta .slide-swipe {{ color: #85C5C0; }}

  .divider {{ width: 60px; height: 4px; background: #17A7A0; margin: 30px 0; }}
  .slide.cover .divider, .slide.cta .divider {{ background: #85C5C0; }}
</style>
</head>
<body>
{slides_html}
</body>
</html>
"""


def render_slide(slide: dict, index: int, total: int) -> str:
    variant = slide.get("variant", "body")
    eyebrow = slide.get("eyebrow", "")
    title = slide.get("title", "")
    body = slide.get("body", "")
    bullets = slide.get("bullets", [])
    signature = slide.get("signature", "SKS Talents")
    swipe_default = "Swipe →" if index < total - 1 else ""
    swipe = slide.get("swipe", swipe_default)

    eyebrow_html = f'<div class="eyebrow">{escape(eyebrow)}</div>' if eyebrow else ''
    tag = "h1" if variant == "cover" else "h2"
    title_html = f'<{tag}>{escape(title)}</{tag}>' if title else ''
    divider = '<div class="divider"></div>' if title and body else ''
    body_html = f'<p>{escape(body)}</p>' if body else ''
    bullets_html = ''
    if bullets:
        items = ''.join(f'<li>{escape(b)}</li>' for b in bullets)
        bullets_html = f'<ul>{items}</ul>'

    return f"""
    <div class="slide {variant}">
      <div class="slide-header">
        <span class="slide-num">{index+1:02d} / {total:02d}</span>
        <span class="brand">{escape(signature)}</span>
      </div>
      <div class="slide-body">
        {eyebrow_html}
        {title_html}
        {divider}
        {body_html}
        {bullets_html}
      </div>
      <div class="slide-footer">
        <span class="signature">{escape(signature)}</span>
        <span class="slide-swipe">{escape(swipe)}</span>
      </div>
    </div>
    """


def find_chrome() -> Optional[str]:
    for path in CHROME_CANDIDATES:
        if Path(path).exists():
            return path
    for name in ("google-chrome", "chromium", "chromium-browser", "chrome"):
        found = shutil.which(name)
        if found:
            return found
    return None


def generate_pdf(carrousel: dict, chrome_bin: str) -> Tuple[Path, subprocess.CompletedProcess]:
    slug = carrousel["slug"]
    title = carrousel.get("title", slug)
    slides = carrousel["slides"]

    slides_html = "\n".join(render_slide(s, i, len(slides)) for i, s in enumerate(slides))
    html_content = HTML_TEMPLATE.format(
        title=escape(title),
        w=SLIDE_W,
        h=SLIDE_H,
        slides_html=slides_html,
    )

    html_path = OUTPUT_DIR / f"{slug}.html"
    pdf_path = OUTPUT_DIR / f"{slug}.pdf"
    html_path.write_text(html_content, encoding="utf-8")

    result = subprocess.run(
        [
            chrome_bin,
            "--headless=new",
            "--disable-gpu",
            "--no-sandbox",
            "--no-pdf-header-footer",
            f"--print-to-pdf={pdf_path}",
            f"file://{html_path}",
        ],
        capture_output=True,
        text=True,
        timeout=90,
    )
    return pdf_path, result


def main() -> int:
    manifest_path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_MANIFEST

    if not manifest_path.exists():
        print(f"❌ Manifest introuvable: {manifest_path}")
        return 1

    chrome_bin = find_chrome()
    if not chrome_bin:
        print("❌ Chrome/Chromium introuvable. Installe Google Chrome.")
        return 1

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    carrousels = manifest.get("carrousels", [])

    print("\n=== SKS Talents · Carousel Generator ===\n")
    print(f"Manifest : {manifest_path.relative_to(PROJECT_ROOT)}")
    print(f"Chrome   : {chrome_bin}")
    print(f"Output   : {OUTPUT_DIR.relative_to(PROJECT_ROOT)}")
    print(f"Format   : {SLIDE_W}x{SLIDE_H}px (LinkedIn portrait 4:5)\n")

    ok, ko = 0, 0
    for c in carrousels:
        try:
            pdf_path, result = generate_pdf(c, chrome_bin)
            if pdf_path.exists() and pdf_path.stat().st_size > 0:
                ok += 1
                size_kb = pdf_path.stat().st_size // 1024
                print(f"✅ {c['slug']:<40} → {size_kb} KB ({len(c['slides'])} slides)")
            else:
                ko += 1
                stderr = (result.stderr or "").strip().splitlines()[-3:]
                print(f"❌ {c['slug']} · Chrome err : {stderr}")
        except Exception as exc:
            ko += 1
            print(f"❌ {c['slug']} · exception : {exc}")

    print(f"\n\U0001F389 Termine · {ok} PDF générés · {ko} erreurs")
    return 0 if ko == 0 else 2


if __name__ == "__main__":
    sys.exit(main())
