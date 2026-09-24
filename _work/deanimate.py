"""
Collapse Framer's split-text animation scaffolding back into plain text.

Framer explodes an animated heading into one <span> per character (or per word),
each carrying the hidden initial state that its JS runtime animates away. We do
not ship that runtime, so the spans have no purpose - and while they remain, the
copy is unreplaceable because "Fintra powers..." is 40 separate text nodes.

Collapsing is visually lossless: after the hidden styles are stripped the spans
only carry display:inline-block and white-space:nowrap, neither of which changes
the rendering of the reassembled text.
"""
import re

# <span style="...opacity:0.001...">X</span>  ->  X      (leaf spans only)
LEAF_ANIM_SPAN = re.compile(
    r'<span style="[^"]*(?:opacity:0\.001|display:inline-block)[^"]*">([^<>]*)</span>')

# <span style="white-space:nowrap">word</span>  ->  word  (once inner is plain)
NOWRAP_SPAN = re.compile(r'<span style="white-space:nowrap">([^<>]*)</span>')


def collapse(html: str) -> tuple[str, int]:
    n = 0
    while True:
        html, k1 = LEAF_ANIM_SPAN.subn(r"\1", html)
        html, k2 = NOWRAP_SPAN.subn(r"\1", html)
        n += k1 + k2
        if k1 + k2 == 0:
            return html, n


def visible_text(html: str) -> str:
    """Normalised visible text, for proving the collapse changed nothing."""
    s = re.sub(r'<(script|style)\b[^>]*>.*?</\1>', '', html, flags=re.S)
    s = re.sub(r'<!--.*?-->', '', s, flags=re.S)
    s = re.sub(r'<[^>]+>', '', s)
    return re.sub(r'\s+', ' ', s).strip()
