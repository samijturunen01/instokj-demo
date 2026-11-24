import type { PhotoKey } from './photos'

/**
 * Service content. Every factual statement comes from instokj.fi (palvelut, hinnasto,
 * laboratorio) or the official price list PDF – see docs/CONTENT_SOURCES.md.
 * General guidance (e.g. typical use cases) is written as guidance, not as company facts.
 */
export interface Qa {
  q: string
  a: string
}

export type TopicId =
  | 'kuntotarkastus'
  | 'kuntotutkimus'
  | 'kosteusmittaus'
  | 'betonin-kosteusmittaus'
  | 'vastaava-tyonjohtaja'
  | 'laboratorio'
  | 'muu'

export const topics: { id: TopicId; label: string; short: string }[] = [
  { id: 'kuntotarkastus', label: 'Kuntotarkastus asuntokauppaan', short: 'Kuntotarkastus' },
  { id: 'kuntotutkimus', label: 'Kuntotutkimus', short: 'Kuntotutkimus' },
  { id: 'kosteusmittaus', label: 'Kosteusmittaus (märkätilat)', short: 'Kosteusmittaus' },
  { id: 'betonin-kosteusmittaus', label: 'Betonin kosteusmittaus', short: 'Betonin kosteus' },
  { id: 'vastaava-tyonjohtaja', label: 'Vastaava työnjohtaja tai valvonta', short: 'Työnjohto / valvonta' },
  { id: 'laboratorio', label: 'Betonitestaus laboratoriossa', short: 'Betonitestaus' },
  { id: 'muu', label: 'Muu asia', short: 'Muu asia' },
]

export interface Service {
  id: 'kuntotarkastus' | 'kuntotutkimus' | 'kosteusmittaus' | 'vastaava-tyonjohtaja'
  path: string
  label: string
  kicker: string
  title: string
  lead: string
  audience: 'koti' | 'rakentaminen'
  photo: PhotoKey
  photoAlt?: PhotoKey
  summary: string
  priceFrom: string
  priceNote: string
  need: { title: string; text: string }
  includesTitle: string
  includes: string[]
  facts: { label: string; value: string }[]
  useCases: string[]
  priceGroups: string[]
  topic: TopicId
  cta: string
  faq: Qa[]
  seo: { title: string; description: string }
}

export const services: Service[] = [
  {
    id: 'kuntotarkastus',
    path: '/palvelut/kuntotarkastus',
    label: 'Kuntotarkastus',
    kicker: 'Asuntokauppa · KH 90-00394',
    title: 'Asuntokaupan kuntotarkastus kiinteällä hinnalla',
    lead: 'Puolueeton, aistienvarainen ja rakennetta rikkomaton kuntotarkastus pientalon kauppaan KH 90-00394 -suoritusohjeen mukaisesti. Hinta määräytyy rakennusvuoden mukaan, ja matkat Joensuun talousalueella ja Itä-Suomessa sisältyvät hintaan.',
    audience: 'koti',
    photo: 'hirsipaaty',
    photoAlt: 'puutalo',
    summary: 'Puolueeton tieto rakennuksen kunnosta myyjälle ja ostajalle ennen kauppaa.',
    priceFrom: '900–1 000 €',
    priceNote: 'sis. alv 25,5 % · rakennusvuoden mukaan',
    need: {
      title: 'Myyjä ja ostaja tarvitsevat saman, puolueettoman tiedon',
      text: 'Kuntotarkastuksen tavoite on tuottaa asuntokaupan osapuolille puolueetonta tietoa rakennuksen rakennusteknisestä kunnosta. Kun havainnot, riskit ja korjaustarpeet ovat molempien tiedossa ennen kauppaa, kaupasta voidaan neuvotella tosiasioiden pohjalta.',
    },
    includesTitle: 'Tarkastus tuottaa tietoa',
    includes: [
      'rakennuksen rakennusteknisestä kunnosta',
      'korjaustarpeista',
      'vaurio-, käyttöturvallisuus- ja terveysriskeistä',
      'toimenpide-ehdotuksista',
    ],
    facts: [
      { label: 'Ohje', value: 'KH 90-00394' },
      { label: 'Menetelmä', value: 'Aistienvarainen, rakennetta rikkomaton' },
      { label: 'Kohteet', value: 'Pientalot asuntokaupassa' },
      { label: 'Matkat', value: 'Sisältyvät Joensuun talousalueella ja Itä-Suomessa' },
    ],
    useCases: [
      'Myyt omakotitaloa tai muuta pientaloa ja haluat kunnosta puolueettoman selvityksen ostajien nähtäväksi.',
      'Olet ostamassa pientaloa ja haluat tietää rakennuksen kunnon ennen kaupantekoa.',
      'Välität pientaloa ja kohteeseen tarvitaan asuntokaupan kuntotarkastus.',
    ],
    priceGroups: ['kuntotarkastus'],
    topic: 'kuntotarkastus',
    cta: 'Tilaa kuntotarkastus',
    faq: [
      {
        q: 'Mihin ohjeeseen kuntotarkastus perustuu?',
        a: 'Teemme pientalojen kuntotarkastukset asuntokauppaa varten KH 90-00394 -suoritusohjeen mukaisesti.',
      },
      {
        q: 'Avataanko rakenteita kuntotarkastuksessa?',
        a: 'Ei. Kuntotarkastus on aistienvarainen ja rakennetta rikkomaton. Rakenneavauksia ja näytteenottoa tehdään tarvittaessa kuntotutkimuksessa.',
      },
      {
        q: 'Mistä kuntotarkastuksen hinta muodostuu?',
        a: 'Hinta määräytyy kohteen rakennusvuoden mukaan: ennen vuotta 1990 rakennettu 1 000 €, vuosina 1990–2010 rakennettu 950 € ja vuoden 2010 jälkeen rakennettu 900 € (sis. alv 25,5 %). Matkakustannukset Joensuun talousalueella ja Itä-Suomen alueella sisältyvät hintaan; korvaukset pidemmistä matkoista sovitaan erikseen.',
      },
      {
        q: 'Voiko tarkastuksen tehdä viikonloppuna?',
        a: 'Kyllä. Palvelemme arkipäivisin ja viikonloppuisin – ajankohdasta sovitaan yhdessä.',
      },
    ],
    seo: {
      title: 'Kuntotarkastus Joensuu – asuntokaupan kuntotarkastus 900–1 000 € | Insinööritoimisto KJ',
      description:
        'Asuntokaupan kuntotarkastus pientaloon KH 90-00394 -ohjeen mukaan. Kiinteä hinta rakennusvuoden mukaan, matkat Joensuun seudulla ja Itä-Suomessa sisältyvät. Myös viikonloppuisin.',
    },
  },
  {
    id: 'kuntotutkimus',
    path: '/palvelut/kuntotutkimus',
    label: 'Kuntotutkimus',
    kicker: 'Vauriot · rakenneavaukset · näytteet',
    title: 'Kuntotutkimus, kun epäilet vauriota rakenteessa',
    lead: 'Kuntotutkimuksella selvitetään rakennuksen kunto sekä mahdolliset vauriot, virheet ja niiden laajuus. Rakenneavauksin varmistetaan todellinen rakenne ja sen kunto, ja tarvittaessa rakennusmateriaaleista otetaan näytteitä jatkotutkimuksia varten.',
    audience: 'koti',
    photo: 'betonikaytava',
    photoAlt: 'kattotuolit',
    summary: 'Rakenneavauksin selvitetään, mitä pinnan alla on ja kuinka laaja vaurio on.',
    priceFrom: '1 500–2 000 €',
    priceNote: 'hintaluokka pientalolle · sis. alv 25,5 %',
    need: {
      title: 'Epäily ei ratkea katsomalla',
      text: 'Kun rakenteessa epäillään kosteus- tai mikrobivauriota, pelkkä silmämääräinen arvio ei riitä. Kuntotutkimuksessa rakenne avataan, jotta nähdään, millainen rakenne todellisuudessa on, missä kunnossa se on ja kuinka laajalle mahdollinen vaurio ulottuu.',
    },
    includesTitle: 'Kuntotutkimuksessa selvitetään',
    includes: [
      'rakennuksen kunto',
      'mahdolliset vauriot, virheet ja niiden laajuus',
      'todellinen rakenne ja sen kunto rakenneavauksin',
      'tarvittaessa materiaalinäytteet jatkotutkimuksia varten',
    ],
    facts: [
      { label: 'Tyypillinen syy', value: 'Epäilty kosteus- tai mikrobivaurio' },
      { label: 'Menetelmä', value: 'Rakenneavaukset, tarvittaessa näytteenotto' },
      { label: 'Laajuus', value: 'Sovitaan aina tapauskohtaisesti' },
      { label: 'Alue', value: 'Joensuu ja Itä-Suomi' },
    ],
    useCases: [
      'Asunnossa tai sen rakenteissa on epäily kosteus- tai mikrobivauriosta.',
      'Kuntotarkastuksen havainnot antavat aihetta selvittää jokin rakenne tarkemmin.',
      'Suunnittelet korjausta ja haluat tietää rakenteen todellisen kunnon ennen kuin korjaus suunnitellaan.',
    ],
    priceGroups: ['kuntotutkimus'],
    topic: 'kuntotutkimus',
    cta: 'Kysy kuntotutkimuksesta',
    faq: [
      {
        q: 'Mitä kuntotutkimus maksaa?',
        a: 'Pientalon kuntotutkimuksen hintaluokka on 1 500–2 000 € (sis. alv 25,5 %). Tutkimuksen laajuus sovitaan aina kohteen mukaan.',
      },
      {
        q: 'Miten kuntotutkimus eroaa kuntotarkastuksesta?',
        a: 'Kuntotarkastus on aistienvarainen ja rakennetta rikkomaton. Kuntotutkimuksessa tehdään usein rakenneavauksia ja tarvittaessa otetaan materiaalinäytteitä, jotta vaurion laajuus saadaan selville.',
      },
      {
        q: 'Miksi rakenteita pitää avata?',
        a: 'Rakenneavauksen avulla selvitetään todellinen rakenne ja varmistetaan sen kunto, jos epäillään kosteus- tai mikrobivaurioita.',
      },
    ],
    seo: {
      title: 'Kuntotutkimus Joensuu – kosteus- ja mikrobivaurioiden selvitys | Insinööritoimisto KJ',
      description:
        'Kuntotutkimus rakenneavauksin ja tarvittaessa näytteenotolla, kun epäilet kosteus- tai mikrobivauriota. Hintaluokka pientalolle 1 500–2 000 €. Joensuu ja Itä-Suomi.',
    },
  },
  {
    id: 'kosteusmittaus',
    path: '/palvelut/kosteusmittaus',
    label: 'Kosteusmittaukset',
    kicker: 'Märkätilat · betonilaatat · RT 14-10984',
    title: 'Kosteusmittaukset märkätiloihin ja betonilaattoihin',
    lead: 'Kosteusmittauksella vaurio tai rakennustekninen puute voidaan havaita ennen kuin se on edennyt kalliiksi remontiksi. Mittaamme kaikki vesipisteelliset tilat – ja betonin suhteellisen kosteuden RT 14-10984 -kortin mukaisesti.',
    audience: 'koti',
    photo: 'kosteusmittari',
    photoAlt: 'lattiakaivo',
    summary: 'Märkätilojen ja betonilaattojen kosteus mitattuna ennen kuin pieni vaurio kasvaa.',
    priceFrom: '200–300 €',
    priceNote: 'märkätilat · betonin kosteus 250 € · sis. alv 25,5 %',
    need: {
      title: 'Pieni kosteusvaurio on halvin korjata ajoissa',
      text: 'Kosteusmittauksen avulla on mahdollista havaita vaurio tai rakennustekninen puute, ennen kuin se on edennyt liian pitkälle aiheuttaen kalliin remontin. Usein ensimmäinen tutkimus on pintakosteusmittaus.',
    },
    includesTitle: 'Mittaamme',
    includes: [
      'kaikki vesipisteelliset tilat',
      'huoneistot ja pientalot, liikerakennukset sekä julkiset kiinteistöt',
      'pintakosteuden myös asuntokauppaa varten',
      'betonilaatan suhteellisen kosteuden RT 14-10984 -kortin mukaisesti',
    ],
    facts: [
      { label: 'Märkätilat', value: 'Kaikki vesipisteelliset tilat' },
      { label: 'Betoni', value: 'RT 14-10984, suhteellinen kosteus' },
      { label: 'Kohteet', value: 'Huoneistot, pientalot, liike- ja julkiset kiinteistöt' },
      { label: 'Alue', value: 'Joensuu ja Itä-Suomi' },
    ],
    useCases: [
      'Haluat varmistaa kylpyhuoneen ja muiden märkätilojen kunnon ennen asuntokauppaa.',
      'Märkätilassa on merkkejä, jotka herättävät epäilyn kosteudesta.',
      'Maanvarainen betonilaatta pitää päällystää, ja päällystettävyys on arvioitava mittaamalla.',
    ],
    priceGroups: ['kosteusmittaus', 'betonin-kosteusmittaus'],
    topic: 'kosteusmittaus',
    cta: 'Tilaa kosteusmittaus',
    faq: [
      {
        q: 'Mitä kosteusmittaus maksaa?',
        a: 'Huoneiston kaikkien vesipisteellisten tilojen kosteusmittaus maksaa 200 € ja pientalon 300 € (sis. alv 25,5 %). Betonin kosteusmittaus kolmesta mittauspisteestä maksaa 250 €; suuremmat kokonaisuudet sovitaan tapauskohtaisesti.',
      },
      {
        q: 'Mihin betonin kosteusmittausta tarvitaan?',
        a: 'Mittauksella selvitetään esimerkiksi maanvaraisen betonilaatan suhteellinen kosteus. Tulosta voidaan käyttää betonilaatan päällystettävyyden arviointiin. Mittaus tehdään RT 14-10984 Betonin suhteellisen kosteuden mittaus -kortin mukaisesti.',
      },
      {
        q: 'Mittaatteko myös liike- ja julkisia kiinteistöjä?',
        a: 'Kyllä. Kohteitamme ovat huoneistot ja pientalot, liikerakennukset sekä julkiset kiinteistöt.',
      },
    ],
    seo: {
      title: 'Kosteusmittaus Joensuu – märkätilat ja betonin kosteus | Insinööritoimisto KJ',
      description:
        'Märkätilojen kosteusmittaus huoneistoon 200 € ja pientaloon 300 €, betonin kosteusmittaus RT 14-10984 mukaan 250 €. Myös pintakosteusmittaukset asuntokauppaan. Joensuu ja Itä-Suomi.',
    },
  },
  {
    id: 'vastaava-tyonjohtaja',
    path: '/palvelut/vastaava-tyonjohtaja',
    label: 'Vastaava työnjohtaja',
    kicker: 'Rakennusluvalliset hankkeet · valvonta',
    title: 'Vastaava työnjohtaja ja valvonta rakennushankkeeseen',
    lead: 'Rakennusluvallisessa rakentamisessa hankkeelle on nimettävä vastaava työnjohtaja. Hoidamme vastaavan työnjohtajan tehtävät ja valvonnan – tehtävien sisältö ja hinta sovitaan aina hankkeen mukaan.',
    audience: 'rakentaminen',
    photo: 'suunnitelmat',
    photoAlt: 'valu',
    summary: 'Rakennusluvallisen hankkeen asiakirjat, katselmukset ja viranomaisyhteistyö yhdeltä tekijältä.',
    priceFrom: 'Tapauskohtainen',
    priceNote: 'hinta sovitaan hankkeen mukaan',
    need: {
      title: 'Lupa edellyttää vastuuhenkilöä työmaalle',
      text: 'Rakennusluvallisessa rakentamisessa hankkeelle on nimettävä vastaava työnjohtaja. Vastaava työnjohtaja huolehtii muun muassa työmaan asiakirjoista ja vastaa viranomaisyhteistyöstä, katselmuksista sekä työturvallisuudesta.',
    },
    includesTitle: 'Vastaava työnjohtaja huolehtii muun muassa',
    includes: [
      'työmaan asiakirjoista, kuten tarkastusasiakirjoista',
      'huoltokirjan kokoamisesta',
      'viranomaisyhteistyöstä ja katselmuksista',
      'työturvallisuudesta',
    ],
    facts: [
      { label: 'Tekijä', value: 'Insinööri (rakennetekniikka)' },
      { label: 'Hankkeet', value: 'Rakennusluvallinen rakentaminen' },
      { label: 'Lisäksi', value: 'Valvonta' },
      { label: 'Hinta', value: 'Sovitaan aina tapauskohtaisesti' },
    ],
    useCases: [
      'Rakennat omakotitaloa tai muuta rakennusluvallista kohdetta, ja hankkeelle on nimettävä vastaava työnjohtaja.',
      'Rakennusluvallinen laajennus tai korjaus tarvitsee vastuuhenkilön työmaalle.',
      'Tarvitset hankkeeseesi valvontaa – kerro kohteesta, niin sovitaan tehtävien sisältö.',
    ],
    priceGroups: ['vastaava-tyonjohtaja'],
    topic: 'vastaava-tyonjohtaja',
    cta: 'Kysy tarjous hankkeeseen',
    faq: [
      {
        q: 'Mitä vastaavan työnjohtajan palvelu maksaa?',
        a: 'Hinta sovitaan aina tapauskohtaisesti hankkeen laajuuden mukaan. Kerro hankkeesta lomakkeella tai soita, niin sovitaan tehtävät ja hinta.',
      },
      {
        q: 'Mistä vastaava työnjohtaja vastaa?',
        a: 'Vastaava työnjohtaja huolehtii muun muassa työmaan asiakirjoista, kuten tarkastusasiakirjoista ja huoltokirjan kokoamisesta. Lisäksi vastaava työnjohtaja vastaa viranomaisyhteistyöstä, katselmuksista sekä työturvallisuudesta.',
      },
      {
        q: 'Milloin vastaava työnjohtaja kannattaa sopia?',
        a: 'Hyvissä ajoin ennen rakennustöiden aloittamista, sillä rakennusluvallisille hankkeille on nimettävä vastaava työnjohtaja.',
      },
    ],
    seo: {
      title: 'Vastaava työnjohtaja Joensuu – työnjohto ja valvonta | Insinööritoimisto KJ',
      description:
        'Vastaavan työnjohtajan tehtävät ja valvonta rakennusluvallisiin hankkeisiin Joensuussa ja Itä-Suomessa: työmaan asiakirjat, huoltokirja, katselmukset ja viranomaisyhteistyö.',
    },
  },
]

export const serviceById = (id: string) => services.find((s) => s.id === id)
