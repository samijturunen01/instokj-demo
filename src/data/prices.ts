/**
 * Prices exactly as published by Insinööritoimisto KJ Oy:
 *  - https://instokj.fi/hinnasto/ (checked 24.11.2026)
 *  - Tulostushinnasto PDF, ver. 1.06, updated 25.3.2025 (public/docs/instokj_hinnasto.pdf)
 * Both VAT 0 % and VAT 25.5 % amounts are copied from the PDF – never recomputed or rounded here.
 * Service prices are quoted including VAT (alv 25,5 %), laboratory prices excluding VAT (alv 0 %).
 */
export const VAT_RATE = '25,5 %'
export const PRICE_LIST_VERSION = 'Ver. 1.06'
export const PRICE_LIST_UPDATED = '25.3.2025'

export interface Amount {
  /** euros, VAT 0 % */
  net: number
  /** euros, VAT 25,5 % */
  gross: number
}

export interface PriceRow {
  id: string
  label: string
  detail?: string
  /** single amount or [min, max] range; undefined = agreed case by case */
  amount?: Amount | [Amount, Amount]
  note?: string
}

export interface PriceGroup {
  id: string
  service: string
  serviceId: string
  /** Which VAT basis the company quotes for this group */
  quotedVat: 'gross' | 'net'
  rows: PriceRow[]
  footnote?: string
}

const a = (net: number, gross: number): Amount => ({ net, gross })

export const servicePrices: PriceGroup[] = [
  {
    id: 'kuntotarkastus',
    service: 'Kuntotarkastus',
    serviceId: 'kuntotarkastus',
    quotedVat: 'gross',
    rows: [
      { id: 'kt-ennen-1990', label: 'Rakennettu ennen 1990', amount: a(796.81, 1000) },
      { id: 'kt-1990-2010', label: 'Rakennettu 1990–2010', amount: a(756.97, 950) },
      { id: 'kt-2010-jalkeen', label: 'Rakennettu 2010 jälkeen', amount: a(717.13, 900) },
    ],
    footnote: 'Hinta määräytyy kohteen rakennusvuoden mukaan.',
  },
  {
    id: 'kuntotutkimus',
    service: 'Kuntotutkimus',
    serviceId: 'kuntotutkimus',
    quotedVat: 'gross',
    rows: [{ id: 'kuntotutkimus-pientalo', label: 'Hintaluokka pientalolle', amount: [a(1195.22, 1500), a(1593.63, 2000)] }],
    footnote: 'Laajuus sovitaan aina tapauskohtaisesti.',
  },
  {
    id: 'kosteusmittaus',
    service: 'Kosteusmittaus',
    serviceId: 'kosteusmittaus',
    quotedVat: 'gross',
    rows: [
      { id: 'km-huoneisto', label: 'Huoneisto', detail: 'Kaikki vesipisteelliset tilat', amount: a(159.36, 200) },
      { id: 'km-pientalo', label: 'Pientalo', detail: 'Kaikki vesipisteelliset tilat', amount: a(239.04, 300) },
    ],
  },
  {
    id: 'betonin-kosteusmittaus',
    service: 'Betonin kosteusmittaus',
    serviceId: 'kosteusmittaus',
    quotedVat: 'gross',
    rows: [{ id: 'bkm-3', label: 'Kolme mittauspistettä', amount: a(199.2, 250) }],
    footnote: 'Suuremmat kokonaisuudet sovitaan tapauskohtaisesti.',
  },
  {
    id: 'vastaava-tyonjohtaja',
    service: 'Vastaavan työnjohtajan tehtävät ja valvonta',
    serviceId: 'vastaava-tyonjohtaja',
    quotedVat: 'gross',
    rows: [
      { id: 'vtj', label: 'Vastaavan työnjohtajan tehtävät', note: 'Sovitaan aina tapauskohtaisesti' },
      { id: 'valvonta', label: 'Valvonta', note: 'Sovitaan aina tapauskohtaisesti' },
    ],
  },
]

export const labPrices: PriceGroup = {
  id: 'laboratorio',
  service: 'Laboratoriopalvelut – betonitestaus',
  serviceId: 'laboratorio',
  quotedVat: 'net',
  rows: [
    { id: 'puristuslujuus', label: 'Puristuslujuus', detail: 'SFS-EN 12390-3 · akkreditoitu', amount: a(50, 62.75) },
    { id: 'karbonatisoituminen', label: 'Karbonatisoituminen', detail: 'SFS-EN 14630', amount: a(20, 25.1) },
    { id: 'vetolujuus', label: 'Vetolujuus', detail: 'SFS 5445', amount: a(50, 62.75) },
    { id: 'absoluuttinen-kosteus', label: 'Absoluuttisen kosteuden määritys', detail: 'VTT 2650', amount: a(50, 62.75) },
    { id: 'sahaus', label: 'Koekappaleiden päiden sahaus', detail: 'Betonitestaus', amount: a(15, 18.83) },
  ],
}

/** Kuntotarkastus price by year of construction ("ennen 1990", "1990–2010", "2010 jälkeen"). */
export function inspectionPriceFor(year: number) {
  const rows = servicePrices[0].rows
  if (year < 1990) return rows[0]
  if (year <= 2010) return rows[1]
  return rows[2]
}

const fmt = new Intl.NumberFormat('fi-FI', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fmtWhole = new Intl.NumberFormat('fi-FI', { maximumFractionDigits: 0 })

const NBSP = String.fromCharCode(0xa0)

/** "1 000 €", "62,75 €" – whole euros without decimals. No-break space before €. */
export function euro(v: number) {
  const s = Number.isInteger(v) ? fmtWhole.format(v) : fmt.format(v)
  return `${s}${NBSP}€`
}

export function amountText(amount: PriceRow['amount'], basis: 'net' | 'gross') {
  if (!amount) return null
  if (Array.isArray(amount)) return `${euro(amount[0][basis]).replace(`${NBSP}€`, '')}–${euro(amount[1][basis])}`
  return euro(amount[basis])
}
