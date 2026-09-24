"""
Rebuild Framer's split-text animation structures with new copy.

Framer explodes an animated heading into one <span> per unit so each unit can
carry its own animation offset. It uses two shapes:

  word-level     <span style="…">Engineering</span> <span style="…">the</span>
  character-level  <span style="white-space:nowrap">
                     <span style="…">F</span><span style="…">i</span>…
                   </span>

Replacing the copy means regenerating the structure - editing a text node only
ever reaches one letter. The style attribute of the first unit is reused as the
template so the animation the export defined still applies.
"""
import html as H
import re

NOWRAP_WORD = re.compile(
    r'<span style="white-space:nowrap">((?:<span style="[^"]*">[^<>]</span>)+)</span>')
LEAF_SPAN = re.compile(r'<span style="([^"]*)">([^<>]*)</span>')


def _char_level(block: str, new_text: str) -> str | None:
    words = NOWRAP_WORD.findall(block)
    if not words:
        return None
    template = LEAF_SPAN.findall(words[0])[0][0]

    def word_span(word: str) -> str:
        chars = "".join(
            f'<span style="{template}">{H.escape(c, quote=False)}</span>' for c in word)
        return f'<span style="white-space:nowrap">{chars}</span>'

    replacement = " ".join(word_span(w) for w in new_text.split(" ") if w)
    first = block.index('<span style="white-space:nowrap">')
    tail = block.rindex(words[-1]) + len(words[-1]) + len("</span>")
    return block[:first] + replacement + block[tail:]


def _word_level(block: str, new_text: str) -> str | None:
    """Leaf spans sitting directly in the heading, one per word."""
    spans = [m for m in LEAF_SPAN.finditer(block)
             if "inline-block" in m.group(1) or "opacity:0.001" in m.group(1)]
    if not spans:
        return None
    template = spans[0].group(1)
    replacement = " ".join(
        f'<span style="{template}">{H.escape(w, quote=False)}</span>'
        for w in new_text.split(" ") if w)
    return block[:spans[0].start()] + replacement + block[spans[-1].end():]


def rebuild(block: str, new_text: str) -> tuple[str, str]:
    """Returns (markup, which-shape-was-used). 'none' means nothing matched."""
    out = _char_level(block, new_text)
    if out is not None:
        return out, "char"
    out = _word_level(block, new_text)
    if out is not None:
        return out, "word"
    return block, "none"


def container_range(doc: str, framer_name: str) -> tuple[int, int] | None:
    """Framer names each rich-text container after its own copy."""
    m = re.search(r'<div class="framer-\w+" data-framer-name="%s"[^>]*>' % re.escape(framer_name), doc)
    if not m:
        return None
    open_end = m.end()
    depth = 1
    for t in re.finditer(r"</?div\b[^>]*?(/?)>", doc[open_end:]):
        if t.group(0).startswith("</"):
            depth -= 1
            if depth == 0:
                return open_end, open_end + t.start()
        elif not t.group(1):
            depth += 1
    return None


def replace_all(doc: str, mapping: dict) -> tuple[str, dict]:
    """
    Rebuild every copy of each heading.

    Framer emits one copy per breakpoint, so stopping at the first match leaves
    the tablet and mobile variants still showing the original copy.
    """
    report = {}
    for old, new_text in mapping.items():
        # Framer emits one copy per breakpoint, and a heading reused across
        # sections can have many. The cap only guards against a pathological
        # loop, so it is generous.
        shapes, guard = [], 0
        while guard < 60:
            guard += 1
            rng = container_range(doc, old)
            if rng is None:
                break
            start, end = rng
            rebuilt, shape = rebuild(doc[start:end], new_text)
            if shape == "none":
                break
            shapes.append(shape)
            doc = doc[:start] + rebuilt + doc[end:]
            # the container is located by its data-framer-name, which still
            # holds the old copy - rename it so the next pass finds the next
            # breakpoint variant instead of looping on this one
            tag_start = doc.rindex("<div", 0, start)
            head = doc[tag_start:start].replace(
                'data-framer-name="%s"' % old,
                'data-framer-name="%s"' % new_text[:120], 1)
            doc = doc[:tag_start] + head + doc[start:]
        report[old[:40]] = ("%s x%d" % (shapes[0], len(shapes))) if shapes else "not found"
    return doc, report
