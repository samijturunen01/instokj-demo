import type { FieldErrors, QuoteRequest } from './types'

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const PHONE = /^\+?[0-9 ()-]{6,20}$/

/** Services where the request needs a short description to be useful. */
export const needsDescription = (topic: QuoteRequest['topic']) =>
  topic === 'kuntotutkimus' || topic === 'vastaava-tyonjohtaja' || topic === 'muu'

/** Client-side validation. A future backend must validate again server-side. */
export function validate(d: QuoteRequest, now = new Date()): FieldErrors {
  const e: FieldErrors = {}
  if (!d.topic) e.topic = 'Valitse, mitä palvelua pyyntö koskee.'
  if (d.name.trim().length < 2) e.name = 'Kirjoita nimesi.'

  const phone = d.phone.trim()
  const email = d.email.trim()
  if (!phone && !email) e.contact = 'Anna puhelinnumero tai sähköpostiosoite, jotta sinuun voidaan olla yhteydessä.'
  if (phone && !PHONE.test(phone)) e.phone = 'Tarkista puhelinnumero (esim. 040 123 4567).'
  if (email && !EMAIL.test(email)) e.email = 'Tarkista sähköpostiosoite (esim. nimi@yritys.fi).'

  if (d.topic === 'kuntotarkastus' && d.buildYear.trim()) {
    const y = Number(d.buildYear)
    if (!/^\d{4}$/.test(d.buildYear.trim()) || y < 1700 || y > now.getFullYear()) e.buildYear = 'Tarkista rakennusvuosi (esim. 1985) – tai jätä kenttä tyhjäksi.'
  }
  if (d.topic === 'betonin-kosteusmittaus' && d.points.trim()) {
    const p = Number(d.points)
    if (!Number.isInteger(p) || p < 1 || p > 500) e.points = 'Kirjoita mittauspisteiden määrä numerona – tai jätä kenttä tyhjäksi.'
  }
  if (d.topic === 'laboratorio') {
    const bad = d.specimens.find((s) => s.ageDays.trim() && (!/^\d{1,3}$/.test(s.ageDays.trim()) || Number(s.ageDays) < 1))
    if (bad) e.specimens = 'Tarkista koestusikä: kirjoita vuorokausien määrä numerona (esim. 28).'
  }
  if (needsDescription(d.topic) && d.message.trim().length < 5) e.message = 'Kerro lyhyesti kohteesta tai hankkeesta.'
  if (d.message.length > 3000) e.message = 'Viesti on liian pitkä (enintään 3000 merkkiä).'
  return e
}

/** Calculated test date = casting date + test age in days (for display only; the laboratory confirms). */
export function testDate(castDate: string, ageDays: string) {
  const days = Number(ageDays)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(castDate) || !Number.isInteger(days) || days < 1 || days > 999) return null
  const [y, m, d] = castDate.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d + days))
  const label = new Intl.DateTimeFormat('fi-FI', { weekday: 'short', day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(dt)
  const wd = dt.getUTCDay()
  return { label, weekend: wd === 0 || wd === 6 }
}
