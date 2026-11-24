import type { Qa } from './services'

/** Laboratory facts – instokj.fi/laboratorio, hinnasto and tilauslomake PDF (ver. 1.03). */
export interface LabMethod {
  id: string
  name: string
  standard: string
  accredited: boolean
  /** price id in labPrices, if a published price exists */
  priceId?: string
}

export const labMethods: LabMethod[] = [
  { id: 'puristuslujuus', name: 'Betonin puristuslujuus', standard: 'SFS-EN 12390-3', accredited: true, priceId: 'puristuslujuus' },
  { id: 'tiheys', name: 'Betonin tiheys', standard: 'SFS-EN 12390-7', accredited: true },
  { id: 'halkaisuvetolujuus', name: 'Halkaisuvetolujuus', standard: 'SFS-EN 12390-6', accredited: false },
  { id: 'vetolujuus', name: 'Vetolujuus', standard: 'SFS 5445', accredited: false, priceId: 'vetolujuus' },
  { id: 'tartuntalujuus', name: 'Tartuntalujuus', standard: 'SFS 5446', accredited: false },
  { id: 'karbonatisoituminen', name: 'Karbonatisoitumissyvyyden määritys', standard: 'SFS-EN 14630', accredited: false, priceId: 'karbonatisoituminen' },
  { id: 'absoluuttinen-kosteus', name: 'Absoluuttisen kosteuden määritys', standard: 'VTT 2650', accredited: false, priceId: 'absoluuttinen-kosteus' },
]

export const labEquipment = [
  { model: 'Controls 2000 kN', type: 'Betonipuristin', kn: 2000 },
  { model: 'Toni Technik 50 kN', type: 'Puristus- ja taivutuskone', kn: 50 },
  { model: 'LLOYD 30 kN', type: 'Vetokone', kn: 30 },
]

export const specimenTypes = [
  { id: 'porakoe', label: 'Porakoenäytteet', text: 'Valmiista rakenteesta otetut rakennekoekappaleet.' },
  { id: 'lierio', label: 'Lieriökoekappaleet', text: 'Valmistuksen yhteydessä vakimuotteihin tehdyt koekappaleet.' },
  { id: 'kuutio', label: 'Kuutiokoekappaleet', text: 'Valmistuksen yhteydessä vakimuotteihin tehdyt koekappaleet.' },
]

/** The testing chain, as described on instokj.fi/laboratorio. */
export const labChain = [
  { n: '01', title: 'Vastaanotto', text: 'Koekappaleet vastaanotetaan laboratorioon Helatielle Joensuuhun.' },
  { n: '02', title: 'Säilytys', text: 'Koekappaleet säilytetään standardin vaatimusten mukaisesti koko testausketjun ajan.' },
  { n: '03', title: 'Testaus', text: 'Puristuslujuus testataan akkreditoidulla menetelmällä luokan 1 laitteilla, jotka kalibroidaan säännöllisesti ja riippumattomasti.' },
  { n: '04', title: 'Tulokset', text: 'Testaustulokset toimitetaan yleensä seuraavana arkipäivänä koekappaleiden testaamisesta.' },
]

/** Fields of the official order form (tilauslomake ver. 1.03). */
export const orderFormFields = {
  order: ['Tilaaja', 'Laskutusviite', 'Näytteenottopaikka', 'Jakelu', 'Päivämäärä'],
  specimen: ['Koekappaleen tunnus', 'Valmistuspäivämäärä', 'Koestusikä', 'Lujuusluokka'],
}

export const labFaq: Qa[] = [
  {
    q: 'Milloin saan testitulokset?',
    a: 'Testaustulokset toimitetaan yleensä seuraavana arkipäivänä koekappaleiden testaamisesta.',
  },
  {
    q: 'Mitkä menetelmät ovat akkreditoituja?',
    a: 'Betonin puristuslujuus (SFS-EN 12390-3) ja betonin tiheys (SFS-EN 12390-7). Akkreditoituun pätevyysalueeseen sisältyvän toiminnan tiedot ovat nähtävissä FINASin verkkosivuilla tunnuksella T359.',
  },
  {
    q: 'Millaisia koekappaleita testaatte?',
    a: 'Valmiista rakenteesta otettuja rakennekoekappaleita eli porakoenäytteitä sekä valmistuksen yhteydessä vakimuotteihin tehtyjä lieriö- ja kuutiokoekappaleita – sekä uudis- että korjausrakentamisen kohteista.',
  },
  {
    q: 'Voiko laboratorion muotteja hyödyntää?',
    a: 'Kyllä. Laboratoriollamme on oma muottikalusto, jota voidaan hyödyntää asiakkaan tarpeiden mukaisesti. Kerro tarpeesta tilauksen yhteydessä.',
  },
  {
    q: 'Mitä tietoja tilaukseen tarvitaan?',
    a: 'Tilauslomakkeelle merkitään tilaaja, laskutusviite, näytteenottopaikka, jakelu ja päivämäärä sekä jokaisesta koekappaleesta tunnus, valmistuspäivämäärä, koestusikä ja lujuusluokka.',
  },
  {
    q: 'Ovatko laboratoriohinnat arvonlisäverottomia?',
    a: 'Kyllä. Laboratoriohinnasto on esitetty ilman arvonlisäveroa. Esimerkiksi puristuslujuuden testaus maksaa 50 € (alv 0 %) eli 62,75 € arvonlisäveron 25,5 % kanssa.',
  },
]
