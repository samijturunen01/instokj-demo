import generated from './photos.generated.json'

export type PhotoKey = keyof typeof generated

interface PhotoInfo {
  alt: string
  /** true = Insinööritoimisto KJ Oy's own photo (instokj.fi); false = illustrative stock (labelled "Kuvituskuva") */
  authentic: boolean
  /** object-position for crops */
  focus?: string
  credit?: string
}

/** Provenance and licences: docs/ASSET_PROVENANCE.md */
export const photoInfo: Record<PhotoKey, PhotoInfo> = {
  laboratorio: {
    alt: 'Kymmeniä betonikoekappaleita lieriömuoteissa riveissä laboratorion lattialla',
    authentic: true,
    focus: '40% 60%',
    credit: 'Kuva: Insinööritoimisto KJ Oy',
  },
  kosteusmittari: {
    alt: 'Kosteusmittarin anturi painettuna seinään, mittarin näytöllä lukemat',
    authentic: true,
    focus: '70% 60%',
    credit: 'Kuva: Insinööritoimisto KJ Oy',
  },
  juvonen: {
    alt: 'Aleksanteri Juvonen, insinööri (rakennetekniikka) ja laboratoriovastaava',
    authentic: true,
    focus: '50% 30%',
    credit: 'Kuva: Insinööritoimisto KJ Oy',
  },
  hirsipaaty: { alt: 'Kuvituskuva: lumisen hirsitalon pääty ja ikkunat lumisateessa', authentic: false, focus: '50% 40%' },
  talvitie: { alt: 'Kuvituskuva: talvinen tie metsän keskellä ja omakotitalo tien päässä', authentic: false, focus: '50% 65%' },
  betonikaytava: { alt: 'Kuvituskuva: keskeneräisen rakennuksen betoninen käytävä ja harkkoseinät', authentic: false, focus: '50% 50%' },
  valu: { alt: 'Kuvituskuva: betonia valetaan perustuskuoppaan pumppuletkulla', authentic: false, focus: '50% 45%' },
  valu2: { alt: 'Kuvituskuva: tuoretta betonia perustuskuopassa ja raudoitustankoja maassa', authentic: false, focus: '50% 40%' },
  kattotuolit: { alt: 'Kuvituskuva: rakenteilla olevan talon puiset kattotuolit ja yläpohja', authentic: false, focus: '50% 40%' },
  lattiakaivo: { alt: 'Kuvituskuva: märkätilan lattiakaivo laatoitetussa lattiassa', authentic: false, focus: '50% 50%' },
  puutalo: { alt: 'Kuvituskuva: punainen puutalo valkoisin ikkunanpielin', authentic: false, focus: '50% 60%' },
  talo: { alt: 'Kuvituskuva: moderni omakotitalo lumisessa maisemassa iltavalaistuksessa', authentic: false, focus: '50% 55%' },
  suunnitelmat: {
    alt: 'Kuvituskuva: kypäräpäinen työnjohtaja tarkastelee pohjapiirustusta keskeneräisessä rakennuksessa, kuvattu takaa',
    authentic: false,
    focus: '45% 40%',
  },
}

export const photoSize = (name: PhotoKey) => generated[name]
