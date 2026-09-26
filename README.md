# Tunga Bhadra Networks — US website

A Next.js 16 site for **Tunga Bhadra Networks (TBN)**: technology courses, internships,
career paths, certification preparation, corporate training and technology services for
the United States market.

Built on the visual language of the Originkit **Fintra** template.

---

## How the Fintra template was carried over

The Originkit CLI delivered Fintra as a **static Framer export**, not a React project:

```
fintra/
├── index.html            1.1 MB — Framer SSR output, ~250 KB inline CSS
├── contact.html          306 KB
├── privacy-policy.html   237 KB
├── js/                   4.4 MB of compiled Framer runtime modules (.mjs)
├── fonts/                87 vendored .woff2 files
├── images/               242 files
└── serve.py
```

That export cannot host a scalable course/internship architecture: its markup is
generated per-instance with hashed class names (`.framer-1j7zx2v`), and it ships the
same section three times over — once per breakpoint — hidden with `hidden-*` media
queries. Rewriting that by hand is not maintainable, and its per-breakpoint duplication
is directly at odds with the responsiveness and duplicate-content requirements.

**So the design system was extracted, not the runtime.** What came across verbatim or
near-verbatim from the extract:

| From Fintra | Where it lives now |
|---|---|
| All 112 `@font-face` rules — Inter Display, Inter Tight, Inter, Questrial, plus the metric-override `*Placeholder` faces | [app/fonts.css](app/fonts.css), unchanged apart from the `/fonts/` path prefix |
| The 87 vendored `.woff2` files | [public/fonts/](public/fonts/) — still zero external font requests |
| Colour tokens (`#e9ecea` ground, `#0f1512` dark, `#00bc5e` accent and the full ink ramp) | `:root` in [app/globals.css](app/globals.css) |
| Typography — serif display face at weight 400 with −0.04em tracking, Inter Display body, Inter Tight UI | `.h1`–`.h5`, `.lede`, `.eyebrow` in [app/globals.css](app/globals.css) |
| Metrics — 1170px container, 8px card radius, pill controls, 110/70/60px section rhythm, 1320/810px breakpoints | `--container`, `--radius`, `--section-y`, `--gutter` |
| Background artwork, textures, glows and pattern plates | [public/images/](public/images/) — renamed semantically (`hero-bg.png`, `faq-bg.png`, `cta-bg.png`, …) |
| Section rhythm — dark hero → light content → dark band → cards → FAQ → CTA | [app/page.tsx](app/page.tsx) |

Deliberately **not** carried over: the Framer JS runtime, the triplicated per-breakpoint
markup, Fintra's branding and stock team photography (using photos of real people as
TBN staff would be fabrication).

---

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
```

```bash
npm run build && npm start   # production
npm run typecheck            # tsc --noEmit
```

The original static extract is preserved untouched in `fintra/` and can still be served
with `python fintra/serve.py 8321` for side-by-side design reference.

---

## Structure

```
app/
├── layout.tsx                  root metadata, Organization + WebSite JSON-LD, font preloads
├── page.tsx                    home
├── globals.css                 the design system (tokens, type, buttons, cards, tables)
├── fonts.css                   vendored Fintra @font-face rules
├── courses/[slug]/             10 course detail pages
├── internships/[slug]/         6 internship detail pages
├── resources/[slug]/           7 article pages
├── sitemap.ts · robots.ts      generated from lib/routes.ts
└── api/contact/route.ts        inquiry endpoint (validates; delivery not yet wired)

components/                     Header, Footer, cards, ui primitives, InquiryForm, Icons
lib/
├── site.ts                     organization facts, navigation, contact details
├── courses.ts                  course catalog
├── internships.ts              internship catalog
├── programs.ts                 career paths + certification tracks
├── resources.ts                articles
├── faqs.ts                     site-wide FAQ (home page uses a subset of the same source)
├── routes.ts                   route registry — feeds both sitemaps
├── seo.ts                      buildMetadata(): canonical, OG, Twitter, robots
└── schema.ts                   JSON-LD builders
```

### Adding content

Append one object to the relevant array — nothing else needs editing. The listing page,
detail route, breadcrumbs, JSON-LD, internal links and both sitemaps all derive from it.

- **A course** → `lib/courses.ts` → live at `/courses/<slug>`
- **An internship** → `lib/internships.ts` → live at `/internships/<slug>`
- **An article** → `lib/resources.ts` → live at `/resources/<slug>`
- **A career path** → `lib/programs.ts` (references courses by slug, so it cannot drift)

---

## SEO, GEO and AEO

- **Metadata** — every page routes through `buildMetadata()`, so canonical, Open Graph,
  Twitter and robots tags cannot be forgotten. All 38 titles and descriptions are unique
  and within snippet length.
- **Structured data** — `EducationalOrganization` and `WebSite` site-wide; plus
  `BreadcrumbList`, `WebPage`/`AboutPage`/`ContactPage`/`CollectionPage`, `Course`,
  `EducationalOccupationalProgram`, `FAQPage`, `Article` and `ItemList` where they
  genuinely apply. No `aggregateRating`, `review`, `offer` or `JobPosting` is emitted,
  because none of those are verified facts.
- **Answer-engine formatting** — key pages open with a question-shaped `<h2>` and an
  `AnswerBox` giving the direct answer before any elaboration, followed by structured
  sections, tables and FAQs.
- **Entity clarity** — one canonical definition of TBN lives in `site.definition` and is
  reused in the schema graph, the About page and the footer, so the description an AI
  system extracts is identical everywhere.

---

## Environment variables

The contact form delivers into Chatwoot as a real conversation, so it lands in
the same inbox as the live chat. Copy `.env.example` to `.env.local` for local
work, and set the same four in Vercel under Project Settings -> Environment
Variables. `.env.local` is gitignored; `.env.example` deliberately carries no
comments so it can be pasted into Vercel's bulk importer as-is.

| Variable | Where to find it |
|---|---|
| `CHATWOOT_BASE_URL` | Your Chatwoot instance, no trailing slash |
| `CHATWOOT_API_TOKEN` | Chatwoot -> Profile Settings -> Access Token. An agent credential: never commit it, and it is **not** the public widget token in `components/Chatwoot.tsx` |
| `CHATWOOT_ACCOUNT_ID` | The number in the dashboard URL, `/app/accounts/<id>/dashboard` |
| `CHATWOOT_INBOX_ID` | Settings -> Inboxes -> the id in the inbox URL. Use an API-channel inbox, not the website one, so form submissions stay separable from live chats |

Env vars only reach new builds, so redeploy after changing them. With any of
them missing the form still validates and accepts, logging instead of
delivering, so local development runs without credentials. If delivery fails
the endpoint returns 502 and logs the full payload rather than reporting a
success that did not happen.

---

## Before launch — required edits

Every placeholder is marked `EDIT ME` in the source.

| What | Where |
|---|---|
| Production origin (canonical/OG URLs depend on it) | `site.url` in [lib/site.ts](lib/site.ts) |
| Email addresses, phone, postal address, office hours | `site.contact` |
| Social profile URLs | `site.social` |
| Course tuition figures | `tuitionUsd` in [lib/courses.ts](lib/courses.ts) |
| Program tuition figures | `tuitionUsd` in [lib/programs.ts](lib/programs.ts) |
| Internship compensation + cohort dates — **confirm the US DOL primary-beneficiary classification for unpaid tracks** | `compensation`, `nextCohort` in [lib/internships.ts](lib/internships.ts) |
| Refund policy, governing state and venue | [app/terms/page.tsx](app/terms/page.tsx) |
| Privacy policy — **needs counsel review** | [app/privacy-policy/page.tsx](app/privacy-policy/page.tsx) |
| Official TBN logo, if one exists | [components/Logo.tsx](components/Logo.tsx) |
| The pre-launch placeholder notice in the footer — delete once the above are done | [components/Footer.tsx](components/Footer.tsx) |

**No awards, accreditations, partnerships, client names, rankings, reviews, student
counts, placement rates or salary figures appear anywhere on this site.** Where a fact
was unavailable, the site shows an editable placeholder instead of inventing one. Please
keep it that way.

---

## Verified

Against the production build (`next build && next start`):

- 43 routes build; all but the inquiry API prerender as static HTML.
- 38 crawled pages: no broken internal links, no broken assets, unique titles and
  descriptions, correct self-referencing canonicals, exactly one `<h1>` per page, no
  heading-level jumps, every image has `alt`, all JSON-LD parses.
- Headless Chrome across 320 / 375 / 414 / 768 / 1024 / 1280 / 1440 / 1920 px: no console
  errors, no page exceptions, no failed requests, no horizontal overflow, all tap targets
  ≥ 24 px, every form control labelled, mobile menu opens/closes with correct
  `aria-expanded` and Escape handling.
- Core Web Vitals (local production): LCP 140–570 ms, CLS ≤ 0.019 on every page.
- Inquiry API: accepts valid input, rejects bad email / short message / missing consent
  with 422, rejects malformed JSON with 400, silently absorbs honeypot submissions.

Accessibility targets WCAG 2.2 AA practice: semantic landmarks, a skip link, visible
focus rings, native `<details>` accordions, labelled inputs with `aria-invalid` and
focus moved to the first error, and `prefers-reduced-motion` support.
