"""Walk immediate children of an element range in the Fintra body markup."""
import re, html, json, sys

TAG = re.compile(r'<(/?)([A-Za-z][\w-]*)([^>]*?)(/?)>')
VOID = {"img","br","hr","input","meta","link","source","path","circle","rect","use","stop",
        "line","polyline","polygon","ellipse","area","base","col","embed","param","track","wbr"}

def children(b, start, end):
    """Immediate element children within b[start:end], where start is just past the parent's open tag."""
    depth, out, cur = 0, [], None
    for m in TAG.finditer(b, start, end):
        closing, tag, attrs, selfclose = m.groups()
        t = tag.lower()
        if t in VOID or selfclose:
            continue
        if not closing:
            if depth == 0:
                cls = re.search(r'class="([^"]*)"', attrs)
                nm  = re.search(r'data-framer-name="([^"]*)"', attrs)
                cur = {"tag": t, "cls": cls.group(1) if cls else "",
                       "name": nm.group(1) if nm else "", "start": m.start(), "end": None,
                       "open_end": m.end()}
            depth += 1
        else:
            depth -= 1
            if depth == 0 and cur:
                cur["end"] = m.end(); out.append(cur); cur = None
            if depth < 0:
                break
    return out

def preview(b, node, n=64):
    chunk = b[node["start"]:node["end"]]
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', chunk))).strip()[:n]

def show(b, nodes, indent=""):
    for i, s in enumerate(nodes):
        size = s["end"] - s["start"]
        print(f"{indent}{i:2}  {size:8,}b  {s['cls'][:32]:34} {s['name'][:20]:22} {preview(b,s)}")
