"""
Decide which elements Fintra's inline animator can still reveal, and free the rest.

The export hides ~350 elements at `opacity:0.001`. Two different mechanisms
bring them back:

  * 5 elements carry `data-framer-appear-id`. Fintra's inline `animator`
    script plays those, and it works standalone - so they are left untouched.
  * The other ~346 were revealed by Framer's React bundle as it hydrated. That
    bundle cannot ship (it re-renders the page from Fintra's own copy, undoing
    every TBN string), so their hidden state is stripped here and replaced by a
    scroll-triggered reveal in tbn.css.

Without this the page loads and simply stays blank below the hero.
"""
import re

HIDDEN = re.compile(r'(^|;)\s*(opacity\s*:\s*0\.001|filter\s*:\s*blur\([^)]*\))\s*(?=;|$)', re.I)
ENTRANCE = re.compile(
    r'(^|;)\s*transform\s*:\s*[^;]*(translateY\(\s*-?\d|translateX\(|scale\(0?\.\d)[^;]*(?=;|$)', re.I)

TAG = re.compile(r'<(\w+)([^>]*?)>')


def free_hidden(doc: str) -> tuple[str, int, int]:
    """Strip the hidden initial state except where the inline animator owns it."""
    freed = kept = 0

    def fix(m):
        nonlocal freed, kept
        tag, attrs = m.group(1), m.group(2)
        if "opacity:0.001" not in attrs and "blur(" not in attrs:
            return m.group(0)
        if "data-framer-appear-id" in attrs:
            kept += 1                      # Fintra's own animator handles this one
            return m.group(0)

        def clean(sm):
            q = sm.group(1)
            style = sm.group(2)
            style = HIDDEN.sub(r"\1", style)
            style = ENTRANCE.sub(r"\1", style)
            style = re.sub(r";{2,}", ";", style).strip(" ;")
            return f'style={q}{style}{q}' if style else ""

        new_attrs = re.sub(r"""style=(["'])(.*?)\1""", clean, attrs, flags=re.S)
        freed += 1
        # mark it so the stylesheet can fade it in on scroll
        return f"<{tag}{new_attrs} data-tbn-reveal>"

    return TAG.sub(fix, doc), freed, kept


# Fintra also ships scroll-linked "rise" offsets as inline transforms - a card
# sits at translateY(150px) and its bundle animates it to 0 as you scroll. Those
# elements are NOT hidden with opacity, so free_hidden() skipped them and they
# stayed frozen: the About band's three cards sat 0/150/200px apart instead of
# aligned. Strip the vertical offset and let ScrollReveal play them in.
#
# Only positive pixel offsets are entrance state. translateY(-50%) and
# translateX(-50%) are centring, and rotate() is design - all preserved.
RISE = re.compile(r'translateY\(\s*\+?(\d+(?:\.\d+)?)px\s*\)', re.I)


def free_rise(doc: str) -> tuple[str, int]:
    freed = 0

    def fix(m):
        nonlocal freed
        tag, attrs = m.group(1), m.group(2)
        if "translateY(" not in attrs or "opacity:0.001" in attrs:
            return m.group(0)          # hidden ones are free_hidden's business

        def clean(sm):
            q, style = sm.group(1), sm.group(2)

            def transform(tm):
                value = RISE.sub("", tm.group(1)).strip()
                value = re.sub(r"\s{2,}", " ", value)
                return ("transform:" + value) if value else ""

            new = re.sub(r"transform\s*:\s*([^;]+)", transform, style, flags=re.I)
            new = re.sub(r";{2,}", ";", new).strip(" ;")
            return f"style={q}{new}{q}" if new else ""

        new_attrs = re.sub(r"""style=(["'])(.*?)\1""", clean, attrs, flags=re.S)
        if new_attrs == attrs:
            return m.group(0)
        freed += 1
        mark = "" if "data-tbn-reveal" in new_attrs else " data-tbn-reveal"
        return f"<{tag}{new_attrs}{mark}>"

    return TAG.sub(fix, doc), freed
