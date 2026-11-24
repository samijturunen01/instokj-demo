import type { Qa } from './services'

/** General questions (homepage + Palvelut). Answers use verified facts only. */
export const faqs: Qa[] = [
  {
    q: 'Sisältyvätkö matkakulut hintoihin?',
    a: 'Kuntotarkastusten matkakustannukset Joensuun talousalueella ja Itä-Suomen alueella sisältyvät hintoihin. Korvaukset pidemmistä matkoista sovitaan erikseen.',
  },
  {
    q: 'Ovatko hinnat arvonlisäverollisia?',
    a: 'Palveluhinnasto (kuntotarkastukset, kuntotutkimukset ja mittaukset) on esitetty arvonlisäveron 25,5 % kanssa. Laboratoriohinnasto on esitetty ilman arvonlisäveroa. Hinnastossa voit vaihtaa näkymän alv 0 % ja alv 25,5 % välillä.',
  },
  {
    q: 'Mitä eroa on kuntotarkastuksella ja kuntotutkimuksella?',
    a: 'Asuntokaupan kuntotarkastus on aistienvarainen ja rakennetta rikkomaton tarkastus, jonka hinta määräytyy rakennusvuoden mukaan. Kuntotutkimuksessa selvitetään epäiltyjen vaurioiden laajuus, usein rakenneavauksin ja tarvittaessa näytteitä ottaen.',
  },
  {
    q: 'Palveletteko myös viikonloppuisin?',
    a: 'Kyllä. Palvelemme arkipäivisin ja viikonloppuisin Joensuussa, Pohjois-Karjalassa ja muualla Itä-Suomessa.',
  },
  {
    q: 'Teettekö töitä sekä yrityksille että yksityisille?',
    a: 'Kyllä. Palvelutarjontamme soveltuu niin yritysasiakkaiden kuin yksityishenkilöiden tarpeisiin.',
  },
  {
    q: 'Miten laskutus hoituu?',
    a: 'Käytämme verkkolaskutusta. Verkkolaskutustiedot löydät yhteystiedoista ja verkkolaskuosoitteistosta.',
  },
]
