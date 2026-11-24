# Backend integration (prepared, not active)

The demo form never sends or stores anything (`src/lib/forms/submit.ts` → demo adapter, message
"Demoversio – viestiä ei lähetetty."). UI and delivery are separated, so production only needs configuration.

## Production setup (after customer approval)

1. **Google Apps Script web app** (company's Google account)
   - `doPost(e)`: parse JSON (`text/plain` body, avoids CORS preflight), validate again server-side, drop requests
     with a non-empty honeypot (`website` is already removed client-side), send an email to `toimisto@instokj.fi`
     and/or append to a Sheet, return `{ ok: true }`.
   - Fields: `topic`, `name`, `company`, `phone`, `email`, `location`, `timing`, `message`, `buildYear`,
     `propertyType`, `points`, `billingRef`, `distribution`, `moulds`, `specimens[] {tag, castDate, ageDays, strengthClass}`.
2. **reCAPTCHA v3**: public site key in `VITE_RECAPTCHA_SITE_KEY`; load the reCAPTCHA script only in production (and
   mention it in the privacy notice). Verify the token **server-side** in Apps Script with the secret key
   (`https://www.google.com/recaptcha/api/siteverify`). The secret key never goes into this repository.
3. Build with `VITE_FORM_MODE=apps-script`, `VITE_FORM_ENDPOINT=<web app URL>` (see `.env.example`).
4. Privacy: tietosuojaseloste describing purpose (answering requests/orders), retention, processors (Google), and the
   rights of the data subject. Do not request consent that is not needed for answering an inquiry.

## Also for production

- `VITE_BASE_PATH=/`, `SITE_URL=https://instokj.fi/`, `VITE_ALLOW_INDEXING=true` (switches robots meta, canonical,
  sitemap in robots.txt).
- Analytics per CONVERSION_MEASUREMENT.md.
