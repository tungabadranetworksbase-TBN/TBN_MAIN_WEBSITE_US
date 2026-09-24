"""
Emit the complete Fintra document with TBN copy.

Framer's application bundle mounts its own React root on #main. Nesting that
inside Next's React tree makes both roots fight over the same DOM (React error
#405, and half the nodes torn out), so the page is served as its own document
instead - which is also the only way the replica stays exact.
"""
import html as H
import os
import re

import content
import splittext
from exact import rewrite_paths, substitute_by_region

ROOT = os.path.abspath("..")
OUT = os.path.join(ROOT, "public", "fintra-pages")
os.makedirs(OUT, exist_ok=True)

HEAD = {
    "title": "Tunga Bhadra Networks - Technology Courses, Internships and Training in the US",
    "description": ("Project-based technology courses, mentored internships, certification prep "
                    "and corporate training for learners and employers across the United States."),
    "canonical": "https://www.tungabhadranetworks.com/",
}


def retitle(doc: str) -> str:
    doc = re.sub(r"<title>.*?</title>", f"<title>{H.escape(HEAD['title'])}</title>", doc, flags=re.S)
    for name, attr in (("description", "name"), ("og:description", "property"),
                       ("twitter:description", "name")):
        doc = re.sub(rf'(<meta {attr}="{re.escape(name)}" content=")[^"]*(")',
                     rf'\1{H.escape(HEAD["description"])}\2', doc)
    for name, attr in (("og:title", "property"), ("twitter:title", "name")):
        doc = re.sub(rf'(<meta {attr}="{re.escape(name)}" content=")[^"]*(")',
                     rf'\1{H.escape(HEAD["title"])}\2', doc)
    doc = re.sub(r'(<link rel="canonical" href=")[^"]*(")', rf'\1{HEAD["canonical"]}\2', doc)
    # the export points these at Framer's CDN; keep everything local
    doc = re.sub(r'<link href="https://fonts\.gstatic\.com"[^>]*>', "", doc)
    return doc


def build(src_name: str, out_name: str) -> None:
    doc = open(os.path.join(ROOT, "fintra", src_name), encoding="utf-8").read()
    doc, report = splittext.replace_all(doc, content.SPLIT)
    for k, v in report.items():
        print(f"      split-text [{v:>5}] {k}")
    nsplit = sum(1 for v in report.values() if v in ("char", "word"))
    doc, ntext = substitute_by_region(doc)
    doc = rewrite_paths(doc)
    # @font-face urls live inside the inline <style>, which rewrite_paths (an
    # attribute-level pass) never sees; without this they resolve against
    # /fintra-pages/ and 404.
    doc = doc.replace('url("fonts/', 'url("/fonts/')
    doc = retitle(doc)
    open(os.path.join(OUT, out_name), "w", encoding="utf-8").write(doc)
    print(f"  {out_name:22} {len(doc):9,} chars   {ntext} strings, {nsplit} split headings")


if __name__ == "__main__":
    print("emitting complete Fintra documents:\n")
    build("index.html", "home.html")
