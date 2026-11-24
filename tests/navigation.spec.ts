import { expect, test } from '@playwright/test'
import { isMobile, navLabels, openNav, PHONE, ready, routes, url } from './helpers'

test('"Etusivu" is the first main navigation item and the active page is highlighted', async ({ page }) => {
  await page.goto(url('laboratorio/'))
  await ready(page)
  const nav = await openNav(page)
  const links = nav.getByRole('link')
  await expect(links.first()).toHaveText(/Etusivu/)
  for (const label of navLabels) await expect(nav.getByRole('link', { name: new RegExp(`^(0\\d\\s*)?${label}$`) }).first()).toBeVisible()
  await expect(nav.locator('a[aria-current="page"]').first()).toHaveText(/Laboratorio/)
})

test('service pages mark "Palvelut" active', async ({ page }) => {
  test.skip(isMobile(page), 'desktop nav')
  await page.goto(url('palvelut/kosteusmittaus/'))
  await ready(page)
  const nav = page.getByRole('navigation', { name: 'Päävalikko' })
  await expect(nav.locator('a[aria-current="page"]')).toHaveText('Palvelut')
})

test('logo links to the homepage', async ({ page }) => {
  await page.goto(url('hinnasto/'))
  await ready(page)
  await page.getByRole('link', { name: 'Insinööritoimisto KJ Oy – etusivulle' }).first().click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[0].h1)
})

test('main navigation opens destination pages at the top; back/forward restore the position', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  await page.evaluate(() => window.scrollTo(0, 2200))
  await page.waitForTimeout(150)
  const nav = await openNav(page)
  await nav.getByRole('link', { name: /Hinnasto$/ }).first().click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[7].h1)
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
  // No blocking overlay/curtain: the page is interactive immediately
  await expect(page.locator('main')).toBeVisible()

  await page.goBack()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[0].h1)
  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBeGreaterThan(1800)
  await page.goForward()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[7].h1)
})

test('primary CTA leads to the request form section', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  await page.locator('#hero-title').locator('..').getByRole('link', { name: 'Pyydä tarjous' }).click()
  await expect(page).toHaveURL(/\/yhteystiedot\/?#tarjouspyynto$/)
  await expect(page.getByRole('heading', { name: 'Tarjouspyyntö ja tilaus', exact: true })).toBeInViewport()
})

test('anchor links scroll to their section (direct load and in-app link)', async ({ page }) => {
  await page.goto(url('yhteystiedot/#laskutus'))
  await ready(page)
  await expect(page.getByRole('heading', { name: 'Verkkolaskutus' })).toBeInViewport()
  await page.goto(url('hinnasto/'))
  await ready(page)
  await page.locator('footer').getByRole('link', { name: 'Verkkolaskutustiedot' }).click()
  await expect(page.getByRole('heading', { name: 'Verkkolaskutus' })).toBeInViewport()
})

test('direct links and refreshes of nested routes work', async ({ page }) => {
  await page.goto(url('palvelut/vastaava-tyonjohtaja/'))
  await ready(page)
  await page.reload()
  await ready(page)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[5].h1)
  // without trailing slash (GitHub Pages redirects to the directory)
  const res = await page.goto(url('palvelut/kuntotarkastus'))
  expect(res?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[2].h1)
})

test('click-to-call and email links use the verified contact details', async ({ page }) => {
  await page.goto(url('yhteystiedot/'))
  await ready(page)
  await expect(page.locator(`a[href="${PHONE}"]:visible`).first()).toBeVisible()
  expect(await page.locator('a[href^="tel:"]').evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute('href')))])).toEqual([PHONE])
  const mails = await page.locator('a[href^="mailto:"]').evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute('href')))])
  expect(mails.sort()).toEqual(['mailto:aleksanteri.juvonen@instokj.fi', 'mailto:toimisto@instokj.fi'])
})

test('mobile menu: opens as a dialog, closes with Escape and on navigation', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile only')
  await page.goto(url())
  await ready(page)
  const btn = page.getByRole('button', { name: 'Avaa valikko' })
  await btn.click()
  const dialog = page.getByRole('dialog', { name: 'Valikko' })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('navigation', { name: 'Mobiilivalikko' }).getByRole('link').first()).toHaveText(/Etusivu$/)
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(btn).toBeFocused()
  await btn.click()
  await dialog.getByRole('link', { name: 'Kuntotutkimus' }).click()
  await expect(dialog).toBeHidden()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[3].h1)
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
})

test('mobile call bar is visible and does not cover the footer content', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile only')
  await page.goto(url('palvelut/'))
  await ready(page)
  const bar = page.locator(`a[href="${PHONE}"]`).filter({ hasText: 'Soita' }).last()
  await expect(bar).toBeVisible()
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  const footerBottom = await page.locator('footer').evaluate((f) => f.getBoundingClientRect().bottom)
  const barTop = await page.locator('div.fixed.bottom-0').evaluate((d) => d.getBoundingClientRect().top)
  expect(footerBottom).toBeLessThanOrEqual(barTop + 1)
})
