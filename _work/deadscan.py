"""Find files no live import resolves to, by walking real import specifiers."""
import glob
import os
import re

SEP = chr(92)  # backslash, kept out of literals so nothing escapes oddly

srcs = []
for pat in ("app/**/*.tsx", "app/**/*.ts", "components/**/*.tsx",
            "components/**/*.ts", "lib/**/*.ts"):
    srcs += glob.glob(pat, recursive=True)

specs = set()
for p in srcs:
    text = open(p, encoding="utf-8", errors="ignore").read()
    for m in re.finditer(r"""import\s+(?:[^'"]*?from\s+)?['"]([^'"]+)['"]""", text):
        specs.add((p, m.group(1)))


def norm(x: str) -> str:
    return x.replace(SEP, "/")


def resolved(target: str) -> bool:
    t = norm(target)
    stem = t.rsplit(".", 1)[0]
    for src, spec in specs:
        sp = norm(spec)
        if sp.startswith("@/"):
            cand = sp[2:]
        elif sp.startswith("."):
            cand = norm(os.path.normpath(os.path.join(os.path.dirname(src), sp)))
        else:
            continue
        if cand in (t, stem):
            return True
    return False


check = (glob.glob("app/**/*.css", recursive=True)
         + glob.glob("components/**/*.css", recursive=True)
         + glob.glob("components/fintra/**/*.ts", recursive=True)
         + glob.glob("components/fintra/**/*.tsx", recursive=True))

dead = [c for c in sorted(set(check)) if not resolved(c)]
for c in dead:
    print("  DEAD  " + norm(c))
print("\ndead count:", len(dead))
open("_work/dead.txt", "w").write("\n".join(norm(x) for x in dead))
