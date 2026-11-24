/**
 * Verified company facts – single source of truth for the whole site.
 * Sources and verification status: docs/CONTENT_SOURCES.md
 */
export const company = {
  name: 'Insinööritoimisto KJ Oy',
  shortName: 'Insinööritoimisto KJ',
  businessId: '3015554-8',
  vatId: 'FI30155548',
  /** Registered in the Trade Register 6.8.2019 (PRH / YTJ). */
  registered: '2019',
  sector: 'Insinööritoimisto ja testauslaboratorio',
  phone: {
    display: '044 972 7738',
    international: '+358 44 972 7738',
    href: 'tel:+358449727738',
    e164: '+358449727738',
  },
  email: {
    office: 'toimisto@instokj.fi',
    person: 'aleksanteri.juvonen@instokj.fi',
  },
  /** Office and laboratory – the customer-facing location shown on instokj.fi and Google. */
  address: {
    street: 'Helatie 11',
    postalCode: '80100',
    city: 'Joensuu',
    region: 'Pohjois-Karjala',
  },
  /** Google Business Profile pin for "Insinööritoimisto KJ Oy", Helatie 11 (checked 24.11.2026). */
  geo: { lat: 62.6249839, lon: 29.7820812 },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Insin%C3%B6%C3%B6ritoimisto+KJ+Oy%2C+Helatie+11%2C+80100+Joensuu',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Insin%C3%B6%C3%B6ritoimisto+KJ+Oy%2C+Helatie+11%2C+80100+Joensuu',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Insin%C3%B6%C3%B6ritoimisto%20KJ%20Oy%2C%20Helatie%2011%2C%2080100%20Joensuu&t=m&z=15&hl=fi&output=embed',
  serviceArea: 'Joensuu, Pohjois-Karjala ja muu Itä-Suomi',
  serviceDays: 'Palvelemme arkipäivisin ja viikonloppuisin',
  travelNote:
    'Kuntotarkastusten matkakustannukset Joensuun talousalueella ja Itä-Suomen alueella sisältyvät hintoihin. Korvaukset pidemmistä matkoista sovitaan erikseen.',
  accreditation: {
    id: 'T359',
    body: 'FINAS-akkreditointipalvelu',
    standard: 'SFS-EN ISO/IEC 17025',
    /** FINAS decisions list: Insinööritoimisto KJ Oy, T359, decision 9.2.2023. */
    since: '9.2.2023',
    url: 'https://www.finas.fi/toimijat/Sivut/default.aspx#k=T359',
  },
  trustedPartner: {
    label: 'Vastuu Group Luotettava Kumppani®',
    url: 'https://www.vastuugroup.fi/',
  },
  person: {
    name: 'Aleksanteri Juvonen',
    title: 'Insinööri (rakennetekniikka)',
    role: 'Laboratoriovastaava',
    areas: ['Valvonta ja vastaavan työnjohtajan tehtävät', 'Kuntotarkastukset ja mittaukset', 'Laboratoriopalvelut'],
  },
  billing: {
    name: 'Insinööritoimisto KJ Oy',
    eInvoiceAddress: '003730155548',
    operatorId: '003723327487',
    operator: 'Apix Messaging Oy',
    businessId: '3015554-8',
    vatId: 'FI30155548',
    registryUrl: 'https://verkkolaskuosoite.fi/client/index.html#/detail?id=727442&searchText=301555',
  },
  documents: {
    priceList: { file: 'docs/instokj_hinnasto.pdf', label: 'Tulostettava hinnasto (PDF)', version: 'Ver. 1.06', updated: '25.3.2025' },
    orderForm: { file: 'docs/instokj_tilauslomake.pdf', label: 'Tilauslomake, puristuslujuus (PDF)', version: 'Ver. 1.03' },
  },
  originalSite: 'https://instokj.fi/',
} as const

/** Partners listed on instokj.fi ("Yhteistyökumppaneitamme"). Shown as names, not logos – see docs/ASSET_PROVENANCE.md. */
export const partners = [
  'Destia',
  'NRC Group',
  'Aalto-yliopisto',
  'Kuopio',
  'Karelia Puutec',
  'TimberBros',
  'Insinööritoimisto Mari Hälinen',
] as const
