import { expect, test } from '@playwright/test'
import { ready, routes, url } from './helpers'

test.describe('every page', () => {
  for (const r of routes) {
    test(`/${r.path} renders, is noindex and has unique metadata`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (e) => errors.push(String(e)))
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
      const res = await page.goto(url(r.path))
      expect(res?.status()).toBe(200)
      await ready(page)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(r.h1)
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
      expect(await page.title()).toMatch(/Insinööritoimisto KJ/)
      expect(await page.locator('meta[name="description"]').getAttribute('content')).toBeTruthy()
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og-instokj\.jpg$/)
      // Prerendered HTML already contains the page content (no client-only rendering)
      const html = await (await page.request.get(url(r.path))).text()
      expect(html).toContain('<h1')
      expect(errors).toEqual([])
    })
  }

  test('titles and descriptions are unique', async ({ request }) => {
    const titles = new Set<string>()
    const descs = new Set<string>()
    for (const r of routes) {
      const html = await (await request.get(url(r.path))).text()
      titles.add(html.match(/<title>([^<]+)<\/title>/)![1])
      descs.add(html.match(/<meta name="description" content="([^"]+)"/)![1])
    }
    expect(titles.size).toBe(routes.length)
    expect(descs.size).toBe(routes.length)
  })

  test('structured data uses verified facts only (no ratings)', async ({ request }) => {
    const html = await (await request.get(url())).text()
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]))
    const biz = blocks.find((b) => b['@type'] === 'ProfessionalService')
    expect(biz.identifier.value).toBe('3015554-8')
    expect(biz.telephone).toBe('+358449727738')
    expect(biz.address.streetAddress).toBe('Helatie 11')
    expect(JSON.stringify(blocks)).not.toMatch(/aggregateRating|"review"/)
  })

  test('custom 404 page for unknown URLs', async ({ page }) => {
    const res = await page.goto(url('ei-tallaista-sivua/'))
    expect(res?.status()).toBe(404)
    await ready(page)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Tätä leikkausta ei ole piirretty/)
    await page.getByRole('link', { name: 'Etusivulle', exact: true }).click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[0].h1)
  })

  test('robots.txt allows crawling so the noindex directive can be read; sitemap exists', async ({ request }) => {
    const robots = await (await request.get(url('robots.txt'))).text()
    expect(robots).toContain('Allow: /')
    expect(robots).not.toMatch(/Disallow:\s*\/\s*$/m)
    const sitemap = await request.get(url('sitemap.xml'))
    expect(sitemap.status()).toBe(200)
    expect(await sitemap.text()).toContain('laboratorio/')
  })

  test('price list and order form PDFs are downloadable', async ({ request }) => {
    for (const f of ['docs/instokj_hinnasto.pdf', 'docs/instokj_tilauslomake.pdf']) {
      const res = await request.get(url(f))
      expect(res.status(), f).toBe(200)
      expect((await res.body()).subarray(0, 4).toString()).toBe('%PDF')
    }
  })
})

test.describe('layout at representative widths', () => {
  for (const width of [360, 390, 768, 1024, 1440]) {
    test(`no horizontal overflow at ${width}px`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport: { width, height: 900 } })
      const page = await ctx.newPage()
      for (const r of [...routes, { path: 'ei-loydy/' }]) {
        await page.goto(url(r.path))
        await ready(page)
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
        expect(overflow, `/${r.path} at ${width}px`).toBeLessThanOrEqual(0)
      }
      await ctx.close()
    })
  }
})

test('no third-party requests, cookies or trackers on load', async ({ page, context }) => {
  const external: string[] = []
  page.on('request', (req) => {
    const u = new URL(req.url())
    if (!['127.0.0.1', 'localhost', 'samijturunen01.github.io'].includes(u.hostname)) external.push(u.hostname)
  })
  for (const r of routes) {
    await page.goto(url(r.path))
    await ready(page)
  }
  expect(external).toEqual([])
  expect(await context.cookies()).toEqual([])
})

test('images load, have alt text, and stock photos are labelled', async ({ page }) => {
  for (const r of routes) {
    await page.goto(url(r.path))
    await ready(page)
    await page.evaluate(() => document.querySelectorAll('img').forEach((i) => (i.loading = 'eager')))
    await page.waitForLoadState('networkidle')
    const broken = await page.evaluate(() =>
      [...document.images].filter((i) => !i.complete || i.naturalWidth === 0 || i.getAttribute('alt') === null).map((i) => i.src),
    )
    expect(broken, `/${r.path}`).toEqual([])
    // every illustrative stock photo carries a visible "Kuvituskuva" label and says so in its alt text
    const unlabelled = await page.evaluate(() =>
      [...document.querySelectorAll('figure img')]
        .filter((i) => i.getAttribute('alt')?.startsWith('Kuvituskuva'))
        .filter((i) => !i.closest('figure')?.querySelector('.photo-badge'))
        .map((i) => (i as HTMLImageElement).src),
    )
    expect(unlabelled, `/${r.path}`).toEqual([])
  }
})
