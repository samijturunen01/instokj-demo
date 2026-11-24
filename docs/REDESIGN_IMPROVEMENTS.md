# Redesign improvements – instokj.fi audit

Audit of https://instokj.fi/ on 24.11.2026 (Datenstrom Yellow CMS, "Berlin" theme).

## What the current site does well

- Real, specific content: published prices with VAT detail, accredited methods with standard numbers, equipment list,
  downloadable price list and order form PDFs, e-invoicing details.
- FINAS T359 accreditation is mentioned on several pages.
- HTTPS works (http → https redirect).

## Weaknesses and what the redesign does about them

| Area | Current site | Redesign |
|---|---|---|
| First impression | Generic stock (glass façade, laptop) and a pale blueprint strip; the H1 is just the company name | H1 states the offer + location within seconds; authentic lab photo; signature logo drawing |
| Value proposition | "Monipuolinen palvelutarjontamme…" – no reason to choose | Concrete strengths only: FINAS T359, KH 90-00394, fixed published prices, travel included (inspections), weekend service |
| Calls to action | No CTA buttons, no form – only "Yhteystiedot →" text links | Consistent CTA system ("Pyydä tarjous", "Tilaa kuntotarkastus", "Tilaa betonitestaus"), click-to-call everywhere, mobile call bar |
| Customer journeys | One long services page mixing consumers and B2B lab clients | Two clear paths (Asuntokauppa ja koti / Rakentaminen ja betoni), dedicated pages per service, lab page for B2B |
| Pricing | Price table separated from service descriptions; VAT bases differ (25,5 % vs 0 %) without help | Prices on every service page + VAT view switch; build-year price calculator; ledger on the homepage |
| Lab ordering | PDF order form only | Online order with the same fields as the official PDF, specimen rows and calculated test date (demo) – PDF still offered |
| Trust | Partner logos without alt text; contact person far down a sub-page | Person card with role and areas, title block with registry facts, FINAS mark with scope link, partners as readable list |
| Accessibility | `lang="en"` on Finnish pages; images "Image without description"; nested `<a>` inside `<a>` in the footer email; low-contrast grey nav | `lang="fi"`, meaningful alt texts, valid markup, WCAG 2.2 AA contrast, keyboard-operable components, reduced motion |
| Mobile | Basic responsive theme, tiny nav, no quick contact | Designed mobile layout, large touch targets, sticky call/quote bar, accessible menu dialog |
| SEO | Generic titles ("Palvelut - Insinööritoimisto KJ Oy"), truncated descriptions with soft hyphens, no structured data, stale sitemap anchors | Unique service + location titles/descriptions, prerendered HTML, JSON-LD (ProfessionalService, Service, Offer with published prices, FAQPage, BreadcrumbList), clean sitemap |
| Map | Google iframe loads on every visit (privacy, performance) | Click-to-load map, directions + "Avaa Google Mapsissa" |
| Content accuracy | Sitemap still lists removed services and people | Only currently published content used; open questions documented in CONTENT_SOURCES.md |

## Most commercially meaningful changes for this business

1. **Price transparency where the decision is made** – fixed inspection prices are rare in the market; surfacing them
   with a calculator answers the first question of a house buyer/seller immediately.
2. **Making the accredited lab visible and orderable** – T359 is the company's clearest differentiator in Eastern
   Finland; the lab now has its own conversion path and an online order matching the official form.
3. **Low-friction contact** – phone one tap away on every page; a form that asks only what the chosen service needs.

## Production migration notes

- Keep URLs `/palvelut/`, `/laboratorio/`, `/hinnasto/`, `/yhteystiedot/` (the redesign uses the same paths). Add
  redirects for old anchors if needed (e.g. `/palvelut/#kuntotarkastus` → `/palvelut/kuntotarkastus/`).
- The demo is not a statement about the security of the existing hosting; HTTPS on the production domain must be
  verified at migration.
