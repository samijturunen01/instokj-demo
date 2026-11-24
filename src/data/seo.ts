import { services } from './services'

export interface RouteMeta {
  path: string
  label: string
  title: string
  description: string
}

/** Every prerendered route with its unique title and meta description. */
export const routes: RouteMeta[] = [
  {
    path: '/',
    label: 'Etusivu',
    title: 'Kuntotarkastus ja betonilaboratorio Joensuu | Insinööritoimisto KJ Oy',
    description:
      'Kuntotarkastukset, kosteusmittaukset, vastaavan työnjohtajan tehtävät ja FINAS-akkreditoitu betonilaboratorio T359 Joensuussa ja Itä-Suomessa. Hinnat näkyvillä – palvelemme myös viikonloppuisin.',
  },
  {
    path: '/palvelut',
    label: 'Palvelut',
    title: 'Palvelut – kuntotarkastus, kosteusmittaus ja työnjohto | Insinööritoimisto KJ',
    description:
      'Asuntokaupan kuntotarkastus, kuntotutkimus, kosteusmittaukset, vastaava työnjohtaja ja betonitestaus yrityksille ja yksityisille Joensuussa ja Itä-Suomessa.',
  },
  ...services.map((s) => ({ path: s.path, label: s.label, title: s.seo.title, description: s.seo.description })),
  {
    path: '/laboratorio',
    label: 'Laboratorio',
    title: 'Betonilaboratorio Joensuu – FINAS T359, puristuslujuus | Insinööritoimisto KJ',
    description:
      'FINAS-akkreditoitu testauslaboratorio T359 (SFS-EN ISO/IEC 17025) Joensuussa: betonin puristuslujuus SFS-EN 12390-3 ja muut betonitestit. Tulokset yleensä seuraavana arkipäivänä.',
  },
  {
    path: '/hinnasto',
    label: 'Hinnasto',
    title: 'Hinnasto – kuntotarkastus, kosteusmittaus ja betonitestaus | Insinööritoimisto KJ',
    description:
      'Kuntotarkastus 900–1 000 €, kosteusmittaus 200–300 €, betonin kosteusmittaus 250 €, puristuslujuus 50 € (alv 0 %). Katso koko hinnasto arvonlisäverolla tai ilman.',
  },
  {
    path: '/yhteystiedot',
    label: 'Yhteystiedot',
    title: 'Yhteystiedot ja tarjouspyyntö | Insinööritoimisto KJ Oy, Helatie 11 Joensuu',
    description:
      'Insinööritoimisto KJ Oy, Helatie 11, 80100 Joensuu. Puhelin 044 972 7738. Pyydä tarjous kuntotarkastuksesta, mittauksesta, työnjohdosta tai betonitestauksesta.',
  },
  {
    path: '/404',
    label: 'Sivua ei löytynyt',
    title: 'Sivua ei löytynyt | Insinööritoimisto KJ Oy',
    description: 'Hakemaasi sivua ei löytynyt. Palaa etusivulle tai ota yhteyttä Insinööritoimisto KJ Oy:hyn.',
  },
]

export const metaFor = (path: string) => routes.find((r) => r.path === path) ?? routes[routes.length - 1]
