import { Link } from 'react-router-dom'
import { Photo } from '../ui/Photo'
import { SectionHead } from '../ui/SectionMark'
import type { PhotoKey } from '../../data/photos'
import { track } from '../../lib/analytics'

interface PathItem {
  label: string
  to: string
  price: string
  note: string
}

const paths: { id: string; kicker: string; title: string; text: string; photo: PhotoKey; dark: boolean; items: PathItem[] }[] = [
  {
    id: 'koti',
    kicker: 'Asuntokauppa ja koti',
    title: 'Myyt, ostat tai epäilet vauriota',
    text: 'Puolueeton tieto rakennuksen kunnosta ennen kauppaa – ja mittaukset, kun jokin herättää epäilyn.',
    photo: 'hirsipaaty',
    dark: false,
    items: [
      { label: 'Kuntotarkastus', to: '/palvelut/kuntotarkastus', price: '900–1 000 €', note: 'rakennusvuoden mukaan' },
      { label: 'Kosteusmittaus', to: '/palvelut/kosteusmittaus', price: '200–300 €', note: 'huoneisto tai pientalo' },
      { label: 'Kuntotutkimus', to: '/palvelut/kuntotutkimus', price: '1 500–2 000 €', note: 'hintaluokka pientalolle' },
    ],
  },
  {
    id: 'rakentaminen',
    kicker: 'Rakentaminen ja betoni',
    title: 'Rakennat, valat tai päällystät',
    text: 'Vastuuhenkilö rakennusluvalliselle työmaalle, betonin lujuus akkreditoidusta laboratoriosta ja laatan kosteus ennen päällystystä.',
    photo: 'valu',
    dark: true,
    items: [
      { label: 'Vastaava työnjohtaja ja valvonta', to: '/palvelut/vastaava-tyonjohtaja', price: 'Tapauskohtainen', note: 'sovitaan hankkeen mukaan' },
      { label: 'Betonin puristuslujuus', to: '/laboratorio', price: '50 €', note: 'alv 0 % · akkreditoitu' },
      { label: 'Betonin kosteusmittaus', to: '/palvelut/kosteusmittaus#betonin-kosteusmittaus', price: '250 €', note: 'kolme mittauspistettä' },
    ],
  },
]

export function Paths() {
  return (
    <section className="py-20 sm:py-24 lg:py-28" aria-labelledby="polut-title">
      <div className="wrap">
        <SectionHead
          letter="A"
          sheet="02"
          kicker="Palvelut kahdelle tarpeelle"
          id="polut-title"
          title="Mistä lähdetään liikkeelle?"
          intro="Palvelemme sekä yksityisiä että yrityksiä. Valitse lähtökohta – hinnat ovat näkyvillä jo tässä."
        />

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-0">
          {paths.map((p, idx) => (
            <article
              key={p.id}
              className={`flex flex-col ${p.dark ? 'on-dark bg-ink text-paper' : 'border-[1.5px] border-ink bg-sheet'} ${idx === 1 ? 'lg:translate-y-12' : ''}`}
              data-reveal
              style={{ '--d': `${idx * 120}ms` } as React.CSSProperties}
            >
              <Photo name={p.photo} sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[16/9]" wipe />
              <div className="flex flex-1 flex-col p-6 sm:p-9">
                <p className={`label ${p.dark ? 'text-orange-2' : 'text-rust'}`}>{p.kicker}</p>
                <h3 className="display-m mt-3">{p.title}</h3>
                <p className={`mt-3 max-w-xl ${p.dark ? 'text-paper/80' : 'text-graphite'}`}>{p.text}</p>
                <ul className={`mt-8 border-t ${p.dark ? 'border-white/20' : 'border-ink/20'}`}>
                  {p.items.map((it) => (
                    <li key={it.label} className={`border-b ${p.dark ? 'border-white/20' : 'border-ink/20'}`}>
                      <Link
                        to={it.to}
                        className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-0.5 py-4"
                        onClick={() => track('service_interest', { service: it.label, location: 'home_paths' })}
                      >
                        <span className="font-[family-name:var(--font-display)] text-[1.12rem] font-bold leading-tight group-hover:underline group-hover:decoration-orange group-hover:decoration-2 group-hover:underline-offset-4">
                          {it.label}
                        </span>
                        <span className={`num row-span-2 text-right text-[1.05rem] font-semibold ${p.dark ? 'text-orange-2' : 'text-rust'}`}>{it.price}</span>
                        <span className={`text-[0.88rem] ${p.dark ? 'text-mist' : 'text-steel'}`}>{it.note}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
