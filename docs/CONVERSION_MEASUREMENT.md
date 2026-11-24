# Conversion measurement plan (future production)

Demo status: **no analytics, pixels or cookies are active.** `src/lib/analytics.ts` exposes `track(event, params)`, which
only logs in development. In production, connect it to an approved tool after consent (GA4 via GTM, or a privacy-friendly
alternative such as Plausible/Matomo without cookies). Never send personal data (names, phone numbers, emails,
addresses, free text).

## Metrics

- **Primary:** qualified inquiries = successful form submissions (`form_submit_success`) + phone contacts, per service
  topic. Qualification is confirmed by the company (e.g. monthly tally of real jobs), not by the website.
- **Micro-conversions:** `phone_click`, `email_click`, `cta_click`, `price_check`, `document_download`, `directions_click`.
- **Engagement:** service page views, `service_interest` (section drawing / paths), `vat_toggle`, FAQ opens (optional).
- Keep separate: micro-conversions ≠ qualified inquiries ≠ confirmed jobs ≠ revenue.

## Event definitions (implemented as no-op calls)

| Event | When | Params |
|---|---|---|
| `cta_click` | Any CTA leading to the request form | `location`, `topic` |
| `phone_click` | `tel:` link | `location` |
| `email_click` | `mailto:` link | `location` |
| `form_start` | First interaction with the request form | `form` |
| `form_validation_error` | Submit blocked by validation | `field` |
| `form_submit_success` | Adapter returns ok | `topic`, `demo` |
| `service_interest` | Service chosen in the paths list or the section drawing | `service`, `location` |
| `price_check` | Four-digit year entered in the calculator | `service`, `location` |
| `vat_toggle` | VAT view changed | `view` |
| `document_download` | Price list / order form PDF | `document`, `location` |
| `directions_click` | Directions / open in Google Maps | `location` |
| `map_load` | Visitor loads the embedded map | `location` |

## Implementation requirements

1. Consent banner/CMP only if cookies or identifiers are used; cookieless analytics may not need one – confirm with
   the customer's privacy policy.
2. Wire `track()` to `window.dataLayer.push` (GTM) or the chosen tool; keep the event names above.
3. Phone calls: count `phone_click` as intent; ask the company to note "mistä löysit meidät" for real call attribution.
4. Production privacy notice (tietosuojaseloste) must cover the form, Apps Script storage and analytics.

## Baseline

No data from the current site is available. Record 4–8 weeks of the metrics above after launch before evaluating changes.

## Optimisation ideas after launch

- Hero headline variants (benefit vs. service list first).
- CTA wording "Pyydä tarjous" vs. "Tilaa kuntotarkastus" on the homepage.
- Calculator placement (homepage vs. hero).
- Form completion rate per topic (drop-off fields).
- Mobile call bar vs. inline CTAs.
