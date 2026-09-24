"""
Convert Fintra's Framer-exported HTML into JSX, preserving the DOM exactly.

The point is fidelity: every class, every wrapper div and every inline style
survives, because Fintra's 248KB stylesheet is written against that exact
structure. Only three things change:

  1. Framer's hidden initial state (opacity:0.001 / blur / entrance transform)
     is stripped, because those are revealed by the Framer JS runtime which we
     do not ship. Without stripping, the page renders blank.
  2. <script> tags and React SSR comment markers are dropped.
  3. HTML attribute names and inline styles are rewritten for JSX.
"""
import re

# True HTML void elements only. SVG children (path, use, ...) are explicitly
# paired in this export, so force-closing them produced an orphan </use>.
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta",
        "param", "source", "track", "wbr"}

# HTML attribute -> JSX attribute
RENAME = {
    "class": "className", "for": "htmlFor", "srcset": "srcSet", "tabindex": "tabIndex",
    "fetchpriority": "fetchPriority", "viewbox": "viewBox", "crossorigin": "crossOrigin",
    "stroke-width": "strokeWidth", "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin", "fill-rule": "fillRule", "clip-rule": "clipRule",
    "xlink:href": "xlinkHref", "colspan": "colSpan", "rowspan": "rowSpan",
    "maxlength": "maxLength", "autocomplete": "autoComplete", "readonly": "readOnly",
}

# Framer-only attributes that React would warn about on a DOM node.
DROP_ATTRS = {"as", "parentsize", "_constraints", "rotation", "shadows", "name",
              "data-framer-appear-id", "data-framer-hydrate-v2",
              "data-framer-ssr-released-at", "data-framer-page-optimized-at",
              "data-framer-generated-page", "data-code-component-plugin-id"}

# Declarations that only exist to hide an element until Framer animates it in.
HIDDEN_RE = re.compile(r'(^|;)\s*(opacity\s*:\s*0\.001|filter\s*:\s*blur\([^)]*\))\s*(?=;|$)', re.I)
ENTRANCE_TRANSFORM_RE = re.compile(
    r'(^|;)\s*transform\s*:\s*[^;]*(translateY\(\s*-?\d|translateX\(|scale\(0?\.\d|blur\()[^;]*(?=;|$)', re.I)


def split_decls(style: str):
    """Split a style attribute on top-level semicolons (data: URIs contain their own)."""
    out, depth, buf = [], 0, ""
    for ch in style:
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
        if ch == ";" and depth == 0:
            out.append(buf); buf = ""
        else:
            buf += ch
    if buf.strip():
        out.append(buf)
    return [d for d in (x.strip() for x in out) if d]


def camel(prop: str) -> str:
    if prop.startswith("--"):          # CSS custom property: React keeps it verbatim
        return prop
    head, *rest = prop.split("-")
    return head + "".join(p[:1].upper() + p[1:] for p in rest)


def style_to_jsx(style: str) -> str | None:
    """Return a JSX style object literal, or None when nothing survives."""
    style = HIDDEN_RE.sub(r"\1", style)
    style = ENTRANCE_TRANSFORM_RE.sub(r"\1", style)

    pairs = []
    for decl in split_decls(style):
        if ":" not in decl:
            continue
        prop, _, val = decl.partition(":")
        prop, val = prop.strip(), val.strip()
        if not prop or not val:
            continue
        key = camel(prop)
        quoted_key = f'"{key}"' if not re.fullmatch(r"[A-Za-z_$][\w$]*", key) else key
        pairs.append(f'{quoted_key}: {js_string(val)}')
    return "{{ " + ", ".join(pairs) + " }}" if pairs else None


def js_string(v: str) -> str:
    return '"' + v.replace("\\", "\\\\").replace('"', '\\"') + '"'


# Attributes React types as numbers, so they must be emitted as {0} not "0".
NUMERIC = {"tabindex", "rowspan", "colspan", "span", "start", "maxlength", "minlength",
           "size", "aria-posinset", "aria-setsize", "aria-level", "aria-rowcount",
           "aria-colcount", "aria-rowindex", "aria-colindex", "aria-valuenow",
           "aria-valuemin", "aria-valuemax"}

BOOLEAN = {"async", "defer", "disabled", "hidden", "multiple", "muted", "readonly",
           "required", "selected", "open", "checked", "controls", "loop", "reversed",
           "playsinline", "itemscope", "autofocus", "novalidate"}

# Framer emits single-quoted values when the value itself contains a quote,
# e.g. style='--framer-font-family:"Inter Display", sans-serif'.
ATTR_RE = re.compile(r"""([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'))?""")


def convert_attrs(raw: str) -> str:
    out = []
    for m in ATTR_RE.finditer(raw):
        name = m.group(1)
        val = m.group(2) if m.group(2) is not None else m.group(3)
        if not name or name in ("/",):
            continue
        low = name.lower()
        if low in DROP_ATTRS:
            continue
        if low == "style":
            s = style_to_jsx(val or "")
            if s:
                out.append(f"style={s}")
            continue
        jsx_name = RENAME.get(low, name if name.startswith(("data-", "aria-")) else low)
        if val is None:
            # A bare attribute in HTML means empty string. In JSX a bare
            # attribute means `true`, which React rejects on e.g. `alt`.
            out.append(jsx_name if low in BOOLEAN else f'{jsx_name}=""')
        elif low in NUMERIC and re.fullmatch(r"-?\d+", val.strip()):
            out.append(f"{jsx_name}={{{val.strip()}}}")
        else:
            out.append(f"{jsx_name}={js_string(val)}")
    return (" " + " ".join(out)) if out else ""


TAG_RE = re.compile(
    r"""<(/?)([A-Za-z][\w:-]*)((?:[^<>"']|"[^"]*"|'[^']*')*?)(/?)>""")


def html_to_jsx(src: str) -> str:
    # 1. drop scripts, styles and comments (incl. React's <!--$--> SSR markers)
    src = re.sub(r'<script\b[^>]*>.*?</script>', '', src, flags=re.S | re.I)
    src = re.sub(r'<style\b[^>]*>.*?</style>', '', src, flags=re.S | re.I)
    src = re.sub(r'<!--.*?-->', '', src, flags=re.S)

    out, pos = [], 0
    for m in TAG_RE.finditer(src):
        # text between tags
        text = src[pos:m.start()]
        if text:
            out.append(text.replace("{", "&#123;").replace("}", "&#125;"))
        pos = m.end()

        closing, tag, attrs, selfclose = m.groups()
        t = tag.lower()
        if closing:
            out.append(f"</{t}>")
        else:
            a = convert_attrs(attrs)
            if t in VOID or selfclose:
                out.append(f"<{t}{a} />")
            else:
                out.append(f"<{t}{a}>")

    tail = src[pos:]
    if tail:
        out.append(tail.replace("{", "&#123;").replace("}", "&#125;"))
    return "".join(out)
