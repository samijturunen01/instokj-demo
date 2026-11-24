# Insinööritoimisto KJ Oy – website concept (Hades Design)

Speculative redesign of https://instokj.fi/ for **Insinööritoimisto KJ Oy**, an engineering office and FINAS-accredited
testing laboratory (T359) at Helatie 11, Joensuu. **Not the official website of Insinööritoimisto KJ Oy.** Every page is
`noindex`, the request form is a demo that sends and stores nothing, and no analytics or cookies are used.

Live demo: https://samijturunen01.github.io/instokj-demo/

## Stack

React 19 · Vite · TypeScript · Tailwind CSS 4 · React Router 7 · Lucide · static prerendering for GitHub Pages ·
Playwright + axe-core tests.

## Commands

```bash
npm install
npm run dev          # development server
npm run build        # type-check, build, prerender every route to dist/
npm run preview      # serve dist/ like GitHub Pages (http://127.0.0.1:4337/instokj-demo/)
npm test             # Playwright suite against the built site (desktop + mobile)
npm run lint
npm run images       # regenerate images/icons/OG image from source-assets/
```

On Windows run builds from an upper-case `C:\` working directory, or let `vite.config.ts` normalise it.

## Docs

`docs/PROJECT_STATUS.md` (start here) · `CONTENT_SOURCES.md` · `CONVERSION_STRATEGY.md` · `REDESIGN_IMPROVEMENTS.md` ·
`CONVERSION_MEASUREMENT.md` · `ASSET_PROVENANCE.md` · `IMAGE_REPLACEMENT_LIST.md` · `BACKEND_INTEGRATION.md`

## Configuration

See `.env.example`. Production switches (domain, Apps Script form, reCAPTCHA, indexing) stay off until the customer approves.
