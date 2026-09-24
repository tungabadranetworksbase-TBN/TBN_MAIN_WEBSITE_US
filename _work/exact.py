"""
Emit Fintra's page markup byte-for-byte, with only the copy swapped for TBN's.

Unlike build.py (which converted to JSX and had to strip Framer's hidden
initial state), this keeps the export exactly as shipped - including the
`opacity:0.001` inline styles - because the page also ships Framer's own inline
animation runtime, which is what reveals them. The result is rendered through
dangerouslySetInnerHTML so nothing is normalised on the way in.

Split-text headings are handled specially: Framer explodes them into one <span>
per character, and each span carries its own animation offset, so replacing the
copy means regenerating that structure rather than editing a text node.
"""
import html as H
import json
import os
import re

import content
import reveal
import splittext

ROOT = os.path.abspath("..")
OUT_TS = os.path.join(ROOT, "components", "fintra", "html")
os.makedirs(OUT_TS, exist_ok=True)

SRC = os.path.join(ROOT, "fintra", "index.html")
raw = open(SRC, encoding="utf-8").read()


# ----------------------------------------------------------------- extract --
def main_tag_attrs(doc: str) -> dict:
    """The #main attributes Framer's bundle needs in order to hydrate."""
    tag = re.search(r'<div id="main"([^>]*)>', doc).group(1)
    out = {}
    for m in re.finditer(r"""([\w-]+)(?:=(?:"([^"]*)"|'([^']*)'))?""", tag):
        name = m.group(1)
        if name == "id":
            continue
        out[name] = m.group(2) if m.group(2) is not None else (m.group(3) or "")
    return out


def main_inner(doc: str) -> str:
    """Everything inside <div id="main" ...> ... </div>."""
    m = re.search(r'<div id="main"[^>]*>', doc)
    open_end = m.end()
    depth = 1
    for t in re.finditer(r"</?div\b[^>]*?(/?)>", doc[open_end:]):
        if t.group(0).startswith("</"):
            depth -= 1
            if depth == 0:
                return doc[open_end:open_end + t.start()]
        elif not t.group(1):
            depth += 1
    raise ValueError("unbalanced #main")


# ------------------------------------------------------------- split text ---
# One word: <span style="white-space:nowrap"> wrapping per-character spans.
WORD = re.compile(
    r'<span style="white-space:nowrap">((?:<span style="[^"]*">[^<>]</span>)+)</span>')
CHAR = re.compile(r'<span style="([^"]*)">([^<>])</span>')


def rebuild_split_text(block: str, new_text: str) -> str:
    """Re-explode `new_text` into Framer's per-character span structure."""
    words = WORD.findall(block)
    if not words:
        return block
    # Reuse the first character span's style as the template for every new one.
    template = CHAR.findall(words[0])[0][0]

    def spans_for(word: str) -> str:
        chars = "".join(
            f'<span style="{template}">{H.escape(c, quote=False)}</span>' for c in word)
        return f'<span style="white-space:nowrap">{chars}</span>'

    replacement = " ".join(spans_for(w) for w in new_text.split(" "))

    # Swap the whole run of word-spans (and the spaces between them) in one go.
    first = block.index('<span style="white-space:nowrap">')
    last_word = words[-1]
    last_end = block.rindex(last_word) + len(last_word) + len("</span>")
    return block[:first] + replacement + block[last_end:]


SPLIT_TEXT = {
    "Fintra powers seamless global transactions with secure, enterprise-grade financial infrastructure. Built for modern businesses, we simplify cross-border payments, crypto-fiat operations, and compliance with unmatched reliability and precision.":
        "Tunga Bhadra Networks trains technology professionals across the United States. Every course and internship ends in reviewed, documented work, because people are hired for demonstrable ability rather than attendance.",
    "Engineering the future of modern financial systems":
        "Technology training built for careers in the US",
    "100+ Financial Integrations": "The Technologies You Will Use",
}


def replace_split_blocks(doc: str) -> tuple[str, int]:
    """Framer names each rich-text container after its own copy - use that."""
    n = 0
    for old, new in SPLIT_TEXT.items():
        m = re.search(
            r'<div class="framer-\w+" data-framer-name="%s"[^>]*>' % re.escape(old), doc)
        if not m:
            continue
        open_end = m.end()
        depth = 1
        for t in re.finditer(r"</?div\b[^>]*?(/?)>", doc[open_end:]):
            if t.group(0).startswith("</"):
                depth -= 1
                if depth == 0:
                    end = open_end + t.start()
                    break
            elif not t.group(1):
                depth += 1
        block = doc[open_end:end]
        doc = doc[:open_end] + rebuild_split_text(block, new) + doc[end:]
        n += 1
    return doc, n


# ---------------------------------------------------------------- copy ------
def substitute(doc: str, mapping: dict) -> tuple[str, int]:
    """Replace whole text nodes only; attributes and classes are never touched."""
    n = 0

    def repl(m):
        nonlocal n
        rawtxt = m.group(1)
        key = re.sub(r"\s+", " ", H.unescape(rawtxt)).strip()
        if key in mapping:
            n += 1
            lead = rawtxt[: len(rawtxt) - len(rawtxt.lstrip())]
            tail = rawtxt[len(rawtxt.rstrip()):]
            return ">" + lead + H.escape(mapping[key], quote=False) + tail + "<"
        return m.group(0)

    return re.sub(r">([^<>]+)<", repl, doc), n


# Fintra's two logo slots -> the real Tungabadra Networks brand assets,
# cut from public/images/logotbn hres1.png (the RGBA original).
#   shape slot -> the TB monogram
#   text slot  -> the name, set in the site's own typeface via SVG so it
#                 inherits colour and stays legible on light and dark bands.
#                 The supplied lockup's word half reads "NETWORKS" alone, which
#                 would not name the company.
BRAND_IMAGES = {
    "SxYDuuw1DIXjHMFTkcTYD2Gxw.7a514.svg": "tbn-mark.png",
    "SxYDuuw1DIXjHMFTkcTYD2Gxw.svg": "tbn-mark.png",
    "6MKctlUGgL1gpfl7mh3FN6Rbo0g.ecc03.svg": "tbn-mark.png",
    "wbdyZEAK4KSzNzRFMOoZwPz7uW8.81d5f.png": "tbn-mark.png",
}


def rewrite_paths(doc: str) -> str:
    doc = re.sub(r'(src|href)="(images|js|assets|fonts)/', r'\1="/\2/', doc)
    doc = re.sub(r'srcset="([^"]*)"',
                 lambda m: 'srcset="' + re.sub(r'(^|,\s*)images/', r'\1/images/', m.group(1)) + '"',
                 doc)
    for a, b in BRAND_IMAGES.items():
        doc = doc.replace(f"/images/{a}", f"/images/{b}")
    for a, b in content.LINKS.items():
        doc = doc.replace(f'href="{a}"', f'href="{b}"')
    # the logo alt text should name the company
    doc = doc.replace('alt="fintra abstract logo"', 'alt="Tungabadra Networks"')
    doc = doc.replace('alt="fintra text logo"', 'alt=""')
    doc = doc.replace('alt="fintra logo"', 'alt="Tungabadra Networks"')
    return doc


# ----------------------------------------------------------------- emit -----
TS = '''/* eslint-disable */
/**
 * {label}
 *
 * Fintra's markup exactly as the Originkit export ships it - every wrapper,
 * class, inline style and animation hook preserved, including the
 * `opacity:0.001` initial states that Framer's own inline runtime animates
 * away. Only the copy is Tunga Bhadra Networks'.
 *
 * Generated by _work/exact.py. Do not hand-edit.
 */
const html = {json};

export default html;
'''


def emit(name: str, label: str, markup: str):
    path = os.path.join(OUT_TS, f"{name}.ts")
    open(path, "w", encoding="utf-8").write(
        TS.format(label=label, json=json.dumps(markup)))
    print(f"  {name:14} {len(markup):9,} chars -> components/fintra/html/{name}.ts")



MAIN_ATTRS_TS = """/* eslint-disable */
/**
 * The #main attributes from the Fintra export.
 *
 * `data-framer-hydrate-v2` carries the route id and breakpoint table that
 * Framer's bundle reads in order to hydrate the page, so it has to survive
 * verbatim or the page never wakes up.
 *
 * Generated by _work/exact.py.
 */
const mainAttrs: Record<string, string> = %s;

export default mainAttrs;
"""


def emit_main_attrs(attrs: dict):
    path = os.path.join(OUT_TS, "mainAttrs.ts")
    open(path, "w", encoding="utf-8").write(MAIN_ATTRS_TS % json.dumps(attrs, indent=1))
    print(f"  {'mainAttrs':14} {len(attrs)} attributes -> components/fintra/html/mainAttrs.ts")



# --------------------------------------------------- Framer inline runtime --
RUNTIME_TS = """/* eslint-disable */
/**
 * Fintra's own inline runtime, copied verbatim from the export.
 *
 * The export ships every animated element pre-hidden at `opacity:0.001`.
 * Script 1 is Framer's `animator`; scripts 2 and 3 are the appear-animation
 * and breakpoint payloads (data, not code - the browser does not execute a
 * `framer/appear` type); script 4 reads them and plays the animations in.
 * Without these the page renders blank.
 *
 * Generated by _work/exact.py. Do not hand-edit.
 */
export type FramerScript = { attrs: Record<string, string>; body: string };

const scripts: FramerScript[] = %s;

export default scripts;
"""


def emit_runtime():
    items = json.load(open("runtime_scripts.json", encoding="utf-8"))
    out = []
    for it in items:
        attrs = dict(re.findall(r'([\w-]+)="([^"]*)"', it["attrs"]))
        out.append({"attrs": attrs, "body": it["body"]})
    path = os.path.join(OUT_TS, "runtime.ts")
    open(path, "w", encoding="utf-8").write(RUNTIME_TS % json.dumps(out, indent=1))
    total = sum(len(x["body"]) for x in out)
    print(f"  {'runtime':14} {total:9,} chars -> components/fintra/html/runtime.ts ({len(out)} scripts)")



def region_range(doc: str, container_class: str) -> tuple[int, int]:
    """Byte range of one top-level Framer container (the nav or the footer)."""
    m = re.search(r'<div class="%s"[^>]*>' % re.escape(container_class), doc)
    open_end = m.end()
    depth = 1
    for t in re.finditer(r"</?div\b[^>]*?(/?)>", doc[open_end:]):
        if t.group(0).startswith("</"):
            depth -= 1
            if depth == 0:
                return m.start(), open_end + t.end()
        elif not t.group(1):
            depth += 1
    raise ValueError(container_class)


def substitute_by_region(doc: str) -> tuple[str, int]:
    """
    Apply the nav, footer and body maps only inside their own regions.

    They share keys with different meanings - "About Us" is a nav link but also
    the About band's eyebrow, "Security" is a nav link but also a section name -
    so one merged map silently rewrites the wrong one.
    """
    nav_s, nav_e = region_range(doc, "framer-1j7zx2v-container")
    foot_s, foot_e = region_range(doc, "framer-t29m41-container")
    if nav_s > foot_s:
        nav_s, nav_e, foot_s, foot_e = foot_s, foot_e, nav_s, nav_e

    nav, n1 = substitute(doc[nav_s:nav_e], content.NAV)
    mid, n2 = substitute(doc[nav_e:foot_s], {**content.BODY, **content.HERO})
    foot, n3 = substitute(doc[foot_s:foot_e], content.FOOTER)
    return doc[:nav_s] + nav + mid + foot + doc[foot_e:], n1 + n2 + n3


if __name__ == "__main__":
    body = main_inner(raw)
    print(f"#main inner: {len(body):,} chars\n")

    body, report = splittext.replace_all(body, content.SPLIT)
    for k, v in report.items():
        print(f"   split-text [{v:>5}] {k}")

    body, ntext = substitute_by_region(body)
    print(f"text nodes replaced: {ntext}")

    body, freed, kept = reveal.free_hidden(body)
    body, risen = reveal.free_rise(body)
    print(f"hidden states freed: {freed} | left to Framer's animator: {kept}")
    print(f"frozen scroll offsets freed: {risen}")

    body = rewrite_paths(body)
    emit("home", "Home page", body)

    attrs = main_tag_attrs(raw)
    emit_main_attrs(attrs)
    emit_runtime()
