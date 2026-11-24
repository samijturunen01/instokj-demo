import type { Page } from '@playwright/test'

export const BASE = '/instokj-demo/'
export const url = (p = '') => `${BASE}${p}`

export const routes = [
  { path: '', h1: /Tieto, jonka varaan voi rakentaa/i },
  { path: 'palvelut/', h1: /^Palvelut$/ },
  { path: 'palvelut/kuntotarkastus/', h1: /Asuntokaupan kuntotarkastus kiinteällä hinnalla/ },
  { path: 'palvelut/kuntotutkimus/', h1: /Kuntotutkimus, kun epäilet vauriota rakenteessa/ },
  { path: 'palvelut/kosteusmittaus/', h1: /Kosteusmittaukset märkätiloihin ja betonilaattoihin/ },
  { path: 'palvelut/vastaava-tyonjohtaja/', h1: /Vastaava työnjohtaja ja valvonta rakennushankkeeseen/ },
  { path: 'laboratorio/', h1: /Betoni\u00ad?laboratorio Joensuussa/ },
  { path: 'hinnasto/', h1: /^Hinnasto$/ },
  { path: 'yhteystiedot/', h1: /^Yhteystiedot$/ },
]

export const navLabels = ['Etusivu', 'Palvelut', 'Laboratorio', 'Hinnasto', 'Yhteystiedot']

export const PHONE = 'tel:+358449727738'

export const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 1024

/** Wait until the app has hydrated. */
export const ready = (page: Page) => page.waitForFunction(() => (window as unknown as { __kjReady?: boolean }).__kjReady === true)

export async function openNav(page: Page) {
  if (isMobile(page)) {
    await page.getByRole('button', { name: 'Avaa valikko' }).click()
    await page.getByRole('dialog', { name: 'Valikko' }).waitFor()
    return page.getByRole('navigation', { name: 'Mobiilivalikko' })
  }
  return page.getByRole('navigation', { name: 'Päävalikko' })
}

export const hasIntro = (page: Page) => page.evaluate(() => document.documentElement.classList.contains('intro'))

/** The request form on the contact page. */
export const requestForm = (page: Page) => page.locator('form').filter({ has: page.getByRole('heading', { name: 'Tarjouspyyntö ja tilaus', exact: true }) })

/** "1 000 €" with any kind of space. */
export const eur = (s: string) => new RegExp(s.replace(/ /g, '\\s'))
