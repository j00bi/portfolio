"""
Kami Resume Editor — local UI to edit content and export PDF.
Run: python editor.py
Opens http://localhost:5555 in your browser.
"""

import json
import os
import re
import subprocess
import tempfile
import webbrowser
from pathlib import Path

from flask import Flask, Response, jsonify, request

PORTAL_DIR = Path(__file__).parent
RESUME_HTML = PORTAL_DIR / "resume.html"
TEMPLATE_HTML = PORTAL_DIR / "resume-template.html"
DATA_JSON = PORTAL_DIR / "resume-data.json"

# Track which file is currently loaded
current_file = str(RESUME_HTML)

app = Flask(__name__)


def extract_data_from_html(html: str) -> dict:
    """Pull editable text content out of the Kami HTML."""
    data = {}

    m = re.search(r'<div class="name serif">(.*?)</div>', html)
    data["name"] = m.group(1).strip() if m else ""

    m = re.search(r'<span class="role">(.*?)</span>', html)
    data["role"] = m.group(1).strip() if m else ""

    m = re.search(r'<div class="summary">\s*(.*?)\s*</div>', html, re.DOTALL)
    data["summary"] = m.group(1).strip() if m else ""

    metrics = re.findall(
        r'<div class="metric">.*?<span class="metric-value serif">(.*?)</span>.*?<span class="metric-label">(.*?)</span></div>',
        html, re.DOTALL
    )
    data["metrics"] = [{"value": m[0].strip(), "label": m[1].strip()} for m in metrics]

    exp_blocks = re.findall(
        r'<div class="proj-head">\s*<span class="proj-name serif">(.*?)</span>\s*<span class="proj-kind">(.*?)</span>\s*<span class="proj-role">(.*?)</span>\s*</div>\s*<div class="proj-lines">(.*?)</div>\s*</div>\s*</div>',
        html, re.DOTALL
    )

    data["experience"] = []
    for name, kind, role_label, lines_html in exp_blocks:
        rows = re.findall(
            r'<div class="proj-row">\s*<div class="proj-label">(.*?)</div>\s*<div class="proj-text">(.*?)</div>\s*</div>',
            lines_html, re.DOTALL
        )
        block = {
            "company": name.strip(),
            "kind": kind.strip().lstrip("· "),
            "role": role_label.strip(),
            "rows": {r[0].strip(): r[1].strip() for r in rows}
        }
        data["experience"].append(block)

    sp_blocks = re.findall(
        r'<div class="side-project">\s*<div class="sp-header">\s*<span class="sp-name serif">(.*?)</span>\s*<span class="sp-tech">(.*?)</span>\s*</div>\s*<div class="sp-desc">(.*?)</div>\s*</div>',
        html, re.DOTALL
    )
    data["projects"] = [
        {"name": n.strip(), "tech": t.strip(), "desc": d.strip()}
        for n, t, d in sp_blocks
    ]

    skill_blocks = re.findall(
        r'<div class="skill-row">\s*<div class="skill-label">(.*?)</div>\s*<div class="skill-body">(.*?)</div>\s*</div>',
        html, re.DOTALL
    )
    data["skills"] = [
        {"label": s[0].strip(), "body": s[1].strip()}
        for s in skill_blocks
    ]

    edu_blocks = re.findall(
        r'<div class="edu-row">\s*<div>\s*<span class="school serif">(.*?)</span>\s*<span class="major">(.*?)</span>\s*</div>\s*<div class="date">(.*?)</div>\s*</div>',
        html, re.DOTALL
    )
    data["education"] = [
        {"school": e[0].strip(), "major": e[1].strip().lstrip("· "), "date": e[2].strip()}
        for e in edu_blocks
    ]

    tl_steps = re.findall(
        r'<div class="tl-step">\s*<div class="tl-top"><div class="tl-year serif">(.*?)</div><div class="tl-head">(.*?)</div></div>\s*<div class="tl-body">(.*?)</div>\s*</div>',
        html, re.DOTALL
    )
    data["timeline"] = [
        {"year": t[0].strip(), "head": t[1].strip(), "body": t[2].strip()}
        for t in tl_steps
    ]

    return data


def load_data(filepath: str = None) -> dict:
    """Load data from JSON cache, or extract from the given HTML file."""
    global current_file
    if filepath:
        current_file = filepath
        p = Path(filepath)
        if p.exists():
            html = p.read_text(encoding="utf-8")
            data = extract_data_from_html(html)
            # Cache to JSON next to the HTML file
            json_path = str(p.with_suffix(".json"))
            with open(json_path, "w") as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            return data
        else:
            return {"error": f"File not found: {filepath}"}

    # Default: load from JSON cache or extract from default HTML
    if DATA_JSON.exists():
        with open(DATA_JSON) as f:
            cached = json.load(f)
        if cached.get("name"):  # Only use cache if it has real data
            return cached
    html = RESUME_HTML.read_text(encoding="utf-8")
    data = extract_data_from_html(html)
    save_data(data)
    return data


def save_data(data: dict):
    with open(DATA_JSON, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def build_html(data: dict) -> str:
    """Build the full Kami HTML from data dict, reusing the template CSS."""
    template = TEMPLATE_HTML.read_text()

    metrics_html = ""
    for m in data.get("metrics", []):
        metrics_html += f'    <div class="metric"><span class="metric-value serif">{m["value"]}</span><span class="metric-label">{m["label"]}</span></div>\n'

    timeline_html = ""
    for t in data.get("timeline", []):
        timeline_html += f'''    <div class="tl-step">
      <div class="tl-top"><div class="tl-year serif">{t["year"]}</div><div class="tl-head">{t["head"]}</div></div>
      <div class="tl-body">{t["body"]}</div>
    </div>\n'''

    exp_html = ""
    for exp in data.get("experience", []):
        rows_html = ""
        for label, text in exp.get("rows", {}).items():
            rows_html += f'''      <div class="proj-row">
        <div class="proj-label">{label}</div>
        <div class="proj-text">{text}</div>
      </div>\n'''
        exp_html += f'''  <div class="project">
    <div class="proj-head">
      <span class="proj-name serif">{exp["company"]}</span>
      <span class="proj-kind">· {exp["kind"]}</span>
      <span class="proj-role">{exp["role"]}</span>
    </div>
    <div class="proj-lines">
{rows_html}    </div>
  </div>\n'''

    proj_html = ""
    for p in data.get("projects", []):
        proj_html += f'''  <div class="side-project">
    <div class="sp-header">
      <span class="sp-name serif">{p["name"]}</span>
      <span class="sp-tech">{p["tech"]}</span>
    </div>
    <div class="sp-desc">{p["desc"]}</div>
  </div>\n'''

    skills_html = ""
    for s in data.get("skills", []):
        skills_html += f'''  <div class="skill-row">
    <div class="skill-label">{s["label"]}</div>
    <div class="skill-body">{s["body"]}</div>
  </div>\n'''

    edu_html = ""
    for e in data.get("education", []):
        edu_html += f'''  <div class="edu-row">
    <div>
      <span class="school serif">{e["school"]}</span>
      <span class="major"> · {e["major"]}</span>
    </div>
    <div class="date">{e["date"]}</div>
  </div>\n'''

    body = f'''

<!-- ═══════════ PAGE 1 ═══════════ -->

<div class="header">
  <div>
    <div class="name serif">{data.get("name", "")}</div>
  </div>
  <div class="contact">
    <span class="role">{data.get("role", "")}</span>
    <br>
    <a href="https://github.com/j00bi">github.com/j00bi</a>
    <span class="sep">·</span>
    <a href="https://x.com/whoshusni">x.com/whoshusni</a>
    <span class="sep">·</span>
    <a href="mailto:husnisarafi17@gmail.com">husnisarafi17@gmail.com</a>
    <span class="sep">·</span>
    <span class="loc">Kuala Lumpur, Malaysia</span>
  </div>
</div>

<div class="metrics">
{metrics_html}</div>

<section>
  <div class="section-title">Summary</div>
  <div class="summary">
    {data.get("summary", "")}
  </div>
</section>

<section>
  <div class="section-title">Experience<span class="sub">2023 - Present · IBM → EOA → EY</span></div>

  <div class="timeline">
{timeline_html}  </div>

{exp_html}</section>


<!-- ═══════════ PAGE 2 ═══════════ -->

<section class="page-break">
  <div class="section-title">Independent Projects<span class="sub">2023 - Present · self-taught builder</span></div>

  <div class="os-intro">
    <span class="hl">Automation engineer by day, tinkerer by night.</span> Self-taught developer building tools that scratch real itches — meeting transcription, automotive UI, smart home lighting, and generative art. Gravitates toward tools that give control: self-hosting over SaaS, local LLMs over cloud-only APIs, CLIs over GUIs.
  </div>

{proj_html}  <div class="os-highlight">
    <span class="tag">Builder instinct</span>Every project starts with "I wish this existed" and ends with something running on actual hardware — a car head unit, a living room lamp, a Teams meeting. The through-line is the same: understand the system from the inside, then automate it.
  </div>
</section>

<section>
  <div class="section-title">Core Skills</div>
{skills_html}</section>

<section class="no-break">
  <div class="section-title">Education</div>
{edu_html}</section>

'''

    result = re.sub(r'(<body>)(.*?)(</body>)', r'\1' + body + r'\3', template, flags=re.DOTALL)
    return result


# ── Routes ──────────────────────────────────────────────────────

@app.route("/")
def index():
    return PORTAL_DIR.joinpath("editor.html").read_text(encoding="utf-8")


@app.route("/api/data")
def get_data():
    return jsonify(load_data())


@app.route("/api/open", methods=["POST"])
def open_file():
    """Load a Kami HTML file from a given path."""
    body = request.json or {}
    filepath = body.get("path", "")
    if not filepath:
        return jsonify({"error": "No path provided"}), 400
    filepath = os.path.expanduser(filepath)
    if not os.path.exists(filepath):
        return jsonify({"error": f"File not found: {filepath}"}), 404
    data = load_data(filepath)
    if "error" in data:
        return jsonify(data), 404
    return jsonify({"ok": True, "data": data, "file": filepath})


@app.route("/api/save", methods=["POST"])
def save():
    data = request.json
    save_data(data)
    html = build_html(data)
    RESUME_HTML.write_text(html, encoding="utf-8")
    return jsonify({"ok": True, "file": str(RESUME_HTML)})


@app.route("/api/save-as", methods=["POST"])
def save_as():
    """Save to a specific file path."""
    body = request.json or {}
    data = body.get("data", {})
    filepath = body.get("path", "")
    if not filepath:
        return jsonify({"error": "No path provided"}), 400
    filepath = os.path.expanduser(filepath)
    html = build_html(data)
    Path(filepath).parent.mkdir(parents=True, exist_ok=True)
    Path(filepath).write_text(html, encoding="utf-8")
    # Also save JSON cache next to it
    json_path = str(Path(filepath).with_suffix(".json"))
    with open(json_path, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    return jsonify({"ok": True, "file": filepath})


@app.route("/api/pdf", methods=["POST"])
def pdf():
    data = request.json
    save_data(data)
    html = build_html(data)

    with tempfile.NamedTemporaryFile(suffix=".html", delete=False, mode="w") as f:
        f.write(html)
        tmp_html = f.name
    tmp_pdf = tmp_html.replace(".html", ".pdf")

    try:
        from weasyprint import HTML
        HTML(tmp_html).write_pdf(tmp_pdf)
        with open(tmp_pdf, "rb") as f:
            pdf_bytes = f.read()
    finally:
        os.unlink(tmp_html)
        if os.path.exists(tmp_pdf):
            os.unlink(tmp_pdf)

    return Response(pdf_bytes, mimetype="application/pdf",
                    headers={"Content-Disposition": "attachment; filename=Husni_Sarafi_Resume.pdf"})


@app.route("/api/preview", methods=["GET", "POST"])
def preview():
    """GET = render from disk. POST = render from submitted JSON data."""
    if request.method == "POST" and request.is_json:
        data = request.json
    else:
        data = load_data()
    html = build_html(data)
    return Response(html, mimetype="text/html")


@app.route("/api/list-dir", methods=["POST"])
def list_dir():
    """List .html files in a directory for the file browser."""
    body = request.json or {}
    dirpath = body.get("path", str(PORTAL_DIR))
    dirpath = os.path.expanduser(dirpath)
    if not os.path.isdir(dirpath):
        return jsonify({"error": f"Not a directory: {dirpath}"}), 400

    entries = []
    for name in sorted(os.listdir(dirpath)):
        full = os.path.join(dirpath, name)
        if os.path.isdir(full):
            entries.append({"name": name, "type": "dir", "path": full})
        elif name.endswith((".html", ".htm")):
            entries.append({"name": name, "type": "file", "path": full})

    parent = os.path.dirname(dirpath)
    return jsonify({"dir": dirpath, "parent": parent, "entries": entries})


@app.route("/api/current-file")
def current_file_route():
    return jsonify({"file": current_file})


if __name__ == "__main__":
    # Create template (CSS-only version) on first run
    if not TEMPLATE_HTML.exists():
        full = RESUME_HTML.read_text(encoding="utf-8")
        style_match = re.search(r'(<style>.*?</style>)', full, re.DOTALL)
        style_block = style_match.group(1) if style_match else ""
        template = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Husni Sarafi · Resume</title>
{style_block}
</head>
<body>
{{BODY}}
</body>
</html>"""
        TEMPLATE_HTML.write_text(template, encoding="utf-8")

    print(f"  Resume Editor running at http://localhost:5555")
    print(f"  Resume HTML: {RESUME_HTML}")
    webbrowser.open(f"http://localhost:5555")
    app.run(port=5555, debug=False)
