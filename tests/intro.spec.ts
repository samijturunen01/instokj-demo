import { expect, test, type Page } from '@playwright/test'
import { hasIntro, openNav, ready, routes, url } from './helpers'

/** Final state of the visible logo drawing: pour finished, guides hidden. */
const finalState = (page: Page) =>
  page.locator('.logo-draw:visible').first().evaluate((svg) => ({
    pour: getComputedStyle(svg.querySelector('.ld-pour')!).transform,
    guide: getComputedStyle(svg.querySelector('.ld-guide')!).opacity,
    ring: getComputedStyle(svg.querySelector('.ld-ring-stroke')!).strokeDashoffset,
  }))

test('intro plays on every fresh homepage load and refresh, and content is usable at once', async ({ page }) => {
  await page.goto(url())
  expect(await hasIntro(page)).toBe(true)
  // H1 and primary CTA are visible immediately – the intro never blocks the page
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Pyydä tarjous' }).first()).toBeVisible()
  await ready(page)
  await expect.poll(() => hasIntro(page), { timeout: 6000 }).toBe(false)
  expect(await finalState(page)).toEqual({ pour: 'none', guide: '0', ring: '0px' })

  await page.reload()
  expect(await hasIntro(page)).toBe(true)
})

test('intro is mid-animation shortly after load (it really animates)', async ({ page }) => {
  await page.goto(url(), { waitUntil: 'commit' })
  await page.waitForSelector('.logo-draw', { state: 'attached' })
  await page.waitForTimeout(500)
  const s = await finalState(page)
  expect(s.pour).not.toBe('none')
})

test('intro does not replay when returning to the homepage via in-app navigation', async ({ page }) => {
  await page.goto(url('palvelut/'))
  await ready(page)
  expect(await hasIntro(page)).toBe(false)
  const nav = await openNav(page)
  await nav.getByRole('link', { name: /Etusivu$/ }).first().click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[0].h1)
  expect(await hasIntro(page)).toBe(false)

  // also: start on the homepage, leave during the intro and come back
  await page.goto(url())
  await ready(page)
  const nav2 = await openNav(page)
  await nav2.getByRole('link', { name: /Laboratorio$/ }).first().click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[6].h1)
  await page.goBack()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[0].h1)
  expect(await hasIntro(page)).toBe(false)
  expect(await finalState(page)).toEqual({ pour: 'none', guide: '0', ring: '0px' })
})

test('reduced motion: no intro, final logo shown', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  await page.goto(url())
  expect(await hasIntro(page)).toBe(false)
  expect(await finalState(page)).toEqual({ pour: 'none', guide: '0', ring: '0px' })
  await ctx.close()
})

test('without JavaScript the prerendered page shows content and the finished logo', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false })
  const page = await ctx.newPage()
  await page.goto(url())
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[0].h1)
  // inline script cannot run → no intro class → final state
  expect(await page.evaluate(() => document.documentElement.className)).toBe('')
  await ctx.close()
})
