# Project status – Insinööritoimisto KJ Oy (Hades Design · Apollo)

_Last updated: 24.11.2026_

## Project

- **Target company:** Insinööritoimisto KJ Oy, Y-tunnus 3015554-8, Helatie 11, 80100 Joensuu – engineering office and
  FINAS-accredited testing laboratory T359 (registered 2019, accreditation 9.2.2023)
- **Original website:** https://instokj.fi/ (Datenstrom Yellow; 5 pages + 2 PDFs)
- **Package:** Apollo (multi-page) – Master Prompt `C:\VERKKOSIVUT\Prompt.md`, no Hermes/Zeus module
- **Additional user instructions:** none beyond the Master Prompt. Carried-over convention from sibling projects: no
  demo strip above the header (disclaimer in footer + form only).
- **Repository:** https://github.com/samijturunen01/instokj-demo
- **Live demo:** https://samijturunen01.github.io/instokj-demo/

## Strategy (CONVERSION_STRATEGY.md)

- Primary conversion: qualified quote request/order (form, service pre-selected) or phone call 044 972 7738.
- Two audiences: *asuntokauppa ja koti* (kuntotarkastus, kosteusmittaus, kuntotutkimus) and *rakentaminen ja betoni*
  (vastaava työnjohtaja/valvonta, betonilaboratorio, betonin kosteusmittaus).
- Trust: FINAS T359 (+ scope link), KH 90-00394, fixed published prices, travel included for inspections, weekend
  service, named engineer, registry facts, partners (as text). No Google reviews exist → no review section.

## Creative direction – "Leikkausmerkki" (section mark)

- The original logo is itself a drawing symbol (circle cut by a ground line and a diagonal, KJ gable monogram). The
  site reads like a clean set of construction drawings: drawing-paper surfaces with drafting grid, graphite, section-mark
  bubbles (A–F) derived from the logo, title blocks ("nimiö") for verified facts, dimension-line links, concrete stipple
  on dark bands, monochrome photography, and the original brand orange `#f46b36` (instokj.fi link colour) for actions
  and measured values.
- Palette: paper `#f2f1ec`, sheet `#fbfaf7`, ink `#141516`, steel `#5d6166`, orange `#f46b36` (ink text on orange 6.1:1),
  rust `#b0431a` for orange-ish text on light backgrounds.
- Type: Chivo (display + figures), Public Sans (body), Chivo Mono (labels) – self-hosted, not used in earlier demos.
- **Signature intro "Mittapiirros"** (`src/components/brand/LogoDrawing.tsx` + `index.css`): construction lines and a
  centre mark appear, a compass draws the circle, ground line and diagonal are ruled in, the monogram's formwork is
  outlined and concrete "pours" into it; guides lift away (~2.3 s). The visible artwork is always the **original logo
  paths** revealed through masks. Pure CSS keyed on `html.intro` (set in `index.html` before paint): every fresh
  load/refresh of the homepage, never with reduced motion, never replayed on in-app navigation. Desktop: drawing-sheet
  card over the hero photo; mobile: beside the eyebrow. H1/CTAs never wait.
- **Custom interaction:** "Mistä haluat varmuuden?" – interactive section drawing (Leikkaus A–A) of a house and a site;
  six zones map to services with verified price and a pre-filled request link (`src/components/home/HouseSection.tsx`).
- Other features: build-year price calculator (kuntotarkastus), VAT view switch (as published / 0 % / 25,5 %), online
  lab order with specimen rows and calculated test date (demo), compression-test schematic, click-to-load map.

## Pages

Etusivu · Palvelut (editorial list + tarkastus vs. tutkimus comparison) · Kuntotarkastus · Kuntotutkimus ·
Kosteusmittaukset (märkätilat + betoni) · Vastaava työnjohtaja · Laboratorio · Hinnasto · Yhteystiedot (person, form,
map, e-invoicing) · branded 404 ("Tätä leikkausta ei ole piirretty.").

## Completed

- Research + all docs (CONTENT_SOURCES, REDESIGN_IMPROVEMENTS, CONVERSION_STRATEGY, CONVERSION_MEASUREMENT,
  ASSET_PROVENANCE, IMAGE_REPLACEMENT_LIST, BACKEND_INTEGRATION)
- Full site, prerendered routes with unique titles/descriptions, canonical (demo URL), OG image, JSON-LD
  (ProfessionalService with published-price offers, Service, BreadcrumbList, FAQPage – no ratings), sitemap, robots
  (allows crawling so `noindex` is visible), `.nojekyll`
- Demo form (progressive disclosure per service, validation, honeypot, "Demoversio – viestiä ei lähetetty.", prepared
  Apps Script + server-verified reCAPTCHA adapter), analytics no-op layer
- Scroll manager (nav → top instantly, hash links → section, back/forward restore)
- Image pipeline (`npm run images`), lab perf script, screenshot tool

## Testing status (local production build, 24.11.2026)

- `tsc -b`, `eslint .`, `npm run build` – pass
- Playwright (desktop 1440 + Pixel 7): **111 passed, 3 skipped** (device-specific) – pages/metadata/noindex/JSON-LD,
  404, robots/sitemap, PDFs, overflow at 360/390/768/1024/1440, no third-party requests/cookies, images + alt +
  "Kuvituskuva" labels, navigation (Etusivu first, active state, top-of-page on nav, anchors, back/forward, nested direct
  links, mobile dialog, call bar), intro (plays on load/refresh, mid-animation check, not on in-app return, reduced
  motion, no-JS), form (validation, demo submit sends/stores nothing, price summary, lab specimens + test date,
  pre-selection), calculator, section explorer, VAT views, map click-to-load + correct place, FAQ
- axe-core WCAG 2.2 A/AA: no serious/critical violations on any page (automated only; keyboard flows covered by tests;
  no screen-reader testing done)
- Lab performance (Chromium, 4× CPU on mobile, ~1.6 Mbps, 150 ms RTT, **uncompressed local server** – not real-user
  data): LCP mobile 1.6–2.3 s, desktop 1.4–1.9 s, CLS 0 on all measured pages

## Fixed during QA

- Lab methods table widened the page on phones (grid item min-width) → `min-w-0`, focusable scroll region
- Long Finnish compound headings overflowed at 360 px → soft hyphens + `overflow-wrap: anywhere` on headings
- Duplicate id on the moisture page (price table vs. section) → price tables use `hinta-*` ids
- Portrait photo in a stretched grid cell set the row height → `Photo fill` mode
- Monospace numerals looked gappy → figures use Chivo with tabular numerals

## Known issues / notes

- Open content questions (travel-cost scope, price boundaries, lab price unit, hours, EU emblem, stale sitemap
  services/people): docs/CONTENT_SOURCES.md.
- Only one low-resolution portrait and two authentic work photos exist; see IMAGE_REPLACEMENT_LIST.md.
- JS bundle ~124 kB gzip (single chunk); acceptable, could be split per route if needed.

## Asset permissions

Company logo, photos, FINAS mark and PDFs: covered by the user's authorisation. Partner logos (third-party
trademarks) are not used. Stock: Pexels licence, labelled "Kuvituskuva". Details: ASSET_PROVENANCE.md.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`): lint → build → Playwright → upload `dist` → deploy Pages.

## Next recommended action

Present the demo; collect answers to CONTENT_SOURCES.md open questions and authentic photos (portrait, lab machine).
