#!/usr/bin/env python3
"""
Genere des carrousels LinkedIn en PDF (branding SKS Talents · V2).

V2 (2026-08-25) : refonte design pour matcher le template SKS Talents officiel
- Wave teal + petit rectangle decoratif slide 1
- Emoji sectoriel gros + titre serif Playfair Display
- Alternance slides teal / cream
- Grand numero de slide top-right
- Slide CTA type "Vous n'etes pas a l'ecoute ? Parfait."
- Icones rondes teal (heart, bookmark, LinkedIn, site)

Usage:
    python3 scripts/generate-carousels.py [MANIFEST_JSON]

Manifest par defaut: scripts/carrousels-manifest.json
Sortie: /output/carrousels/{slug}.pdf (1080x1350px LinkedIn portrait 4:5)

Requis: Chrome ou Chromium installe.
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

SLIDE_W = 1080
SLIDE_H = 1350

WAVE_SVG_URL = (
    "url(\"data:image/svg+xml;utf8,"
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1080 40' preserveAspectRatio='none'>"
    "<path d='M0,20 Q60,5 120,20 T240,20 T360,20 T480,20 T600,20 T720,20 T840,20 T960,20 T1080,20 L1080,40 L0,40 Z' fill='%23EFEDE4'/>"
    "</svg>\")"
)

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>{title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root {{
    --teal: #4A9B9B;
    --teal-dark: #163334;
    --teal-deep: #1A5A5A;
    --cream: #EFEDE4;
    --cream-soft: #F5F1E8;
    --white: #FFFFFF;
    --text: #163334;
  }}
  @page {{ size: {w}px {h}px; margin: 0; }}
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  html, body {{
    width: {w}px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }}
  body {{
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background: var(--cream);
    color: var(--text);
    line-height: 1.4;
  }}
  .slide {{
    width: {w}px;
    height: {h}px;
    page-break-after: always;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }}
  .slide:last-child {{ page-break-after: auto; }}

  /* ============ COVER SLIDE ============ */
  .cover {{ background: var(--cream); padding-bottom: 70px; }}
  .cover-wave {{
    background: var(--teal);
    padding: 100px 90px 60px;
    position: relative;
    color: var(--white);
  }}
  .cover-wave-label {{
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    letter-spacing: 0.35em;
    font-size: 42px;
    text-align: center;
    color: var(--white);
  }}
  .cover-wave::after {{
    content: '';
    position: absolute;
    bottom: -1px; left: 0; right: 0;
    height: 40px;
    background: {wave_svg} no-repeat center bottom;
    background-size: 100% 100%;
  }}
  .cover-wave-notch {{
    position: absolute;
    bottom: -35px;
    left: 50%;
    transform: translateX(-50%);
    width: 46px;
    height: 90px;
    background: var(--cream);
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  }}
  .cover-body {{ padding: 100px 90px 0; flex: 1; }}
  .cover-emoji {{ font-size: 88px; margin-bottom: 40px; line-height: 1; }}
  .cover-title, .cta-title, .cta-highlight, .footer-brand, .teal-list .tagline, .cta-button {{
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  }}
  .cover-title {{
    font-weight: 700;
    font-size: 74px;
    line-height: 1.05;
    color: var(--text);
    margin-bottom: 20px;
    letter-spacing: -0.01em;
  }}
  .cover-subtitle {{
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-size: 28px;
    color: var(--teal);
    margin-bottom: 24px;
  }}
  .cover-divider {{ width: 70px; height: 5px; background: var(--teal); margin-bottom: 32px; }}
  .cover-desc {{
    font-size: 28px;
    line-height: 1.45;
    color: var(--text);
    margin-bottom: 60px;
    max-width: 820px;
  }}
  .cover-cta {{
    color: var(--teal);
    font-weight: 700;
    font-size: 26px;
  }}

  /* ============ TEAL LIST SLIDE ============ */
  .teal-list {{ background: var(--teal); color: var(--white); padding: 90px 90px 70px; }}
  .teal-list .eyebrow {{
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    font-size: 24px;
    color: rgba(255,255,255,0.75);
    margin-bottom: 60px;
  }}

  /* ============ CREAM LIST SLIDE ============ */
  .cream-list {{ background: var(--cream); color: var(--text); padding: 90px 90px 70px; }}
  .cream-list .eyebrow {{
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    font-size: 24px;
    color: var(--teal);
    margin-bottom: 60px;
  }}

  /* Big number top-right for list slides */
  .slide-num-big {{
    position: absolute;
    top: 80px;
    right: 90px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 96px;
    line-height: 1;
  }}
  .teal-list .slide-num-big {{ color: rgba(255,255,255,0.85); }}
  .cream-list .slide-num-big, .cta .slide-num-big {{ color: rgba(22,51,52,0.15); }}

  /* Bulleted lists */
  ul.bullets {{ list-style: none; }}
  ul.bullets li {{
    font-size: 32px;
    line-height: 1.45;
    padding-left: 44px;
    position: relative;
    margin-bottom: 22px;
  }}
  ul.bullets li::before {{
    content: '';
    position: absolute;
    left: 4px;
    top: 15px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }}
  .teal-list ul.bullets li::before {{ background: var(--white); }}
  .cream-list ul.bullets li::before {{ background: var(--teal); }}

  /* Section blocks (for CONDITIONS + DEPLACEMENTS combined) */
  .cream-list .section + .section {{ margin-top: 40px; }}
  .cream-list .section-title {{
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    font-size: 22px;
    color: var(--teal);
    margin-bottom: 20px;
  }}
  .cream-list .section-text {{
    font-size: 26px;
    line-height: 1.55;
    color: var(--text);
  }}

  /* Teal list tagline (bottom) */
  .teal-list .tagline {{
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 34px;
    color: var(--white);
    margin-top: 40px;
    align-self: flex-start;
  }}

  /* ============ FOOTER (shared) ============ */
  .slide-footer {{
    margin-top: auto;
    padding-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 22px;
  }}
  .footer-brand {{
    font-family: 'Playfair Display', serif;
    font-weight: 700;
  }}
  .footer-tagline {{ font-weight: 400; }}
  .teal-list .slide-footer, .teal-list .footer-brand {{ color: var(--white); }}

  /* ============ CTA SLIDE ============ */
  .cta {{ background: var(--cream); padding: 100px 90px 70px; }}
  .cta-title {{
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 62px;
    line-height: 1.05;
    color: var(--text);
    margin-bottom: 8px;
  }}
  .cta-highlight {{
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 62px;
    line-height: 1.1;
    color: var(--teal);
    margin-bottom: 28px;
  }}
  .cta-desc {{
    font-size: 28px;
    line-height: 1.4;
    color: var(--text);
    max-width: 820px;
    margin-bottom: 40px;
  }}
  .cta-button {{
    display: inline-flex;
    align-items: center;
    gap: 16px;
    padding: 26px 42px;
    background: var(--white);
    border: 2px solid var(--teal);
    border-radius: 10px;
    color: var(--text);
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 32px;
    margin-bottom: 12px;
  }}
  .cta-button-icon {{ font-size: 30px; color: var(--teal); }}
  .cta-caption {{
    font-size: 22px;
    color: var(--teal-deep);
    opacity: 0.75;
    margin-bottom: 40px;
  }}
  .cta-links {{ display: flex; flex-direction: column; gap: 22px; margin-bottom: 40px; }}
  a.cta-link, .cta-link {{
    display: flex;
    align-items: center;
    gap: 20px;
    color: var(--teal);
    font-weight: 700;
    font-size: 22px;
    text-decoration: none;
    white-space: nowrap;
    line-height: 1.2;
    max-width: 900px;
  }}
  .cta-link-label {{
    display: inline-block;
    white-space: nowrap;
    overflow: visible;
  }}
  .cta-link-icon {{
    width: 50px;
    height: 50px;
    min-width: 50px;
    flex-shrink: 0;
    background: var(--teal);
    color: var(--white);
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: 700;
    line-height: 1;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    letter-spacing: 0;
  }}
  .cta-actions {{
    display: flex;
    gap: 60px;
    margin-top: 20px;
  }}
  .cta-action {{ text-align: center; }}
  .cta-action-circle {{
    width: 96px;
    height: 96px;
    background: var(--teal);
    color: var(--white);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 42px;
    margin: 0 auto 14px;
  }}
  .cta-action-label {{
    font-weight: 700;
    font-size: 22px;
    color: var(--text);
  }}
  .cta-action-sub {{
    font-weight: 400;
    font-size: 20px;
    color: var(--text);
  }}
</style>
</head>
<body>
{slides_html}
</body>
</html>
"""


def render_cover_slide(slide: dict) -> str:
    wave_label = escape(slide.get("wave_label", "WE ARE HIRING"))
    emoji = slide.get("emoji", "")
    title = escape(slide.get("title", ""))
    subtitle = escape(slide.get("subtitle", ""))
    desc = escape(slide.get("description", ""))
    cta = escape(slide.get("cta", "Faites défiler"))
    signature = escape(slide.get("signature", "SKS Talents"))
    tagline = escape(slide.get("tagline", "Your Talent · Our Future"))
    return f"""
    <div class="slide cover">
      <div class="cover-wave">
        <div class="cover-wave-label">{wave_label}</div>
        <div class="cover-wave-notch"></div>
      </div>
      <div class="cover-body">
        <div class="cover-emoji">{emoji}</div>
        <div class="cover-title">{title}</div>
        <div class="cover-subtitle">{subtitle}</div>
        <div class="cover-divider"></div>
        <div class="cover-desc">{desc}</div>
        <div class="cover-cta">→ {cta}</div>
      </div>
      <div class="slide-footer" style="padding: 0 90px;">
        <span class="footer-brand">{signature}</span>
        <span class="footer-tagline">{tagline}</span>
      </div>
    </div>
    """


def render_list_slide(slide: dict, index: int, variant: str) -> str:
    eyebrow = escape(slide.get("eyebrow", ""))
    bullets = slide.get("bullets", [])
    tagline = escape(slide.get("tagline", ""))
    signature = escape(slide.get("signature", "SKS Talents"))
    footer_tagline = escape(slide.get("footer_tagline", "Your Talent · Our Future"))
    num = slide.get("num") or f"{index+1:02d}"

    bullets_html = ''.join(f'<li>{escape(b)}</li>' for b in bullets)
    tagline_html = f'<div class="tagline">{tagline}</div>' if tagline else ''

    return f"""
    <div class="slide {variant}">
      <div class="eyebrow">{eyebrow}</div>
      <div class="slide-num-big">{escape(str(num))}</div>
      <ul class="bullets">{bullets_html}</ul>
      {tagline_html}
      <div class="slide-footer">
        <span class="footer-brand">{signature}</span>
        <span class="footer-tagline">{footer_tagline}</span>
      </div>
    </div>
    """


def render_two_sections_slide(slide: dict, index: int) -> str:
    """Slide cream avec 2-3 sections (ex: REMUNERATION + DEPLACEMENTS).

    Chaque section accepte soit `text` (paragraphe), soit `bullets` (liste).
    """
    sections = slide.get("sections", [])
    num = slide.get("num") or f"{index+1:02d}"
    signature = escape(slide.get("signature", "SKS Talents"))
    footer_tagline = escape(slide.get("footer_tagline", "Your Talent · Our Future"))

    sections_html = ""
    for sec in sections:
        title = escape(sec.get("title", ""))
        text = sec.get("text", "")
        bullets = sec.get("bullets", [])
        body_html = ""
        if text:
            body_html = f'<p class="section-text">{escape(text)}</p>'
        elif bullets:
            items = ''.join(f'<li>{escape(b)}</li>' for b in bullets)
            body_html = f'<ul class="bullets">{items}</ul>'
        sections_html += f"""
        <div class="section">
          <div class="section-title">{title}</div>
          {body_html}
        </div>
        """

    return f"""
    <div class="slide cream-list">
      <div class="slide-num-big">{escape(str(num))}</div>
      {sections_html}
      <div class="slide-footer">
        <span class="footer-brand">{signature}</span>
        <span class="footer-tagline">{footer_tagline}</span>
      </div>
    </div>
    """


def render_cta_slide(slide: dict, index: int) -> str:
    title = escape(slide.get("title", "Vous n'êtes pas à l'écoute ?"))
    highlight = escape(slide.get("highlight", "Parfait."))
    desc = escape(slide.get("description", ""))
    button_label = escape(slide.get("button_label", "Écrivez-nous en privé"))
    button_icon = escape(slide.get("button_icon", "✉"))
    caption = escape(slide.get("caption", "Pour un échange en toute confidentialité."))
    links = slide.get("links", [])
    actions = slide.get("actions", [])
    num = slide.get("num") or f"{index+1:02d}"
    signature = escape(slide.get("signature", "SKS Talents"))
    footer_tagline = escape(slide.get("footer_tagline", "Your Talent · Our Future"))

    links_html = ""
    for link in links:
        icon = escape(link.get("icon", "→"))
        label = escape(link.get("label", ""))
        url = escape(link.get("url", ""))
        if url:
            links_html += f"""
        <a href="{url}" class="cta-link">
          <span class="cta-link-icon">{icon}</span>
          <span class="cta-link-label">{label}</span>
        </a>
        """
        else:
            links_html += f"""
        <div class="cta-link">
          <span class="cta-link-icon">{icon}</span>
          <span class="cta-link-label">{label}</span>
        </div>
        """

    actions_html = ""
    for act in actions:
        icon = escape(act.get("icon", ""))
        label = escape(act.get("label", ""))
        sub = escape(act.get("sub", ""))
        actions_html += f"""
        <div class="cta-action">
          <div class="cta-action-circle">{icon}</div>
          <div class="cta-action-label">{label}</div>
          <div class="cta-action-sub">{sub}</div>
        </div>
        """

    return f"""
    <div class="slide cta">
      <div class="slide-num-big">{escape(str(num))}</div>
      <div class="cta-title">{title}</div>
      <div class="cta-highlight">{highlight}</div>
      <div class="cta-desc">{desc}</div>
      <div class="cta-button"><span class="cta-button-icon">{button_icon}</span> {button_label}</div>
      <div class="cta-caption">{caption}</div>
      <div class="cta-links">{links_html}</div>
      <div class="cta-actions">{actions_html}</div>
      <div class="slide-footer">
        <span class="footer-brand">{signature}</span>
        <span class="footer-tagline">{footer_tagline}</span>
      </div>
    </div>
    """


def render_slide(slide: dict, index: int) -> str:
    variant = slide.get("variant", "cream-list")
    if variant == "cover":
        return render_cover_slide(slide)
    if variant == "teal-list":
        return render_list_slide(slide, index, "teal-list")
    if variant == "cream-list":
        return render_list_slide(slide, index, "cream-list")
    if variant == "cream-two-sections":
        return render_two_sections_slide(slide, index)
    if variant == "cta":
        return render_cta_slide(slide, index)
    return render_list_slide(slide, index, "cream-list")


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

    slides_html = "\n".join(render_slide(s, i) for i, s in enumerate(slides))
    html_content = HTML_TEMPLATE.format(
        title=escape(title),
        w=SLIDE_W,
        h=SLIDE_H,
        wave_svg=WAVE_SVG_URL,
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
            "--virtual-time-budget=20000",
            "--font-render-hinting=none",
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
        print("❌ Chrome/Chromium introuvable.")
        return 1

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    carrousels = manifest.get("carrousels", [])

    print("\n=== SKS Talents · Carousel Generator V2 ===\n")
    print(f"Manifest : {manifest_path.relative_to(PROJECT_ROOT)}")
    print(f"Chrome   : {chrome_bin}")
    print(f"Output   : {OUTPUT_DIR.relative_to(PROJECT_ROOT)}")
    print(f"Format   : {SLIDE_W}x{SLIDE_H}px\n")

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
