import { Link } from 'react-router-dom'
import { SectionHead } from '../ui/SectionMark'
import { BuildYearPrice } from '../ui/BuildYearPrice'
import { company } from '../../data/company'

const rows = [
  { label: 'Kuntotarkastus', note: 'rakennusvuoden mukaan', price: '900–1 000 €', to: '/palvelut/kuntotarkastus' },
  { label: 'Kosteusmittaus, huoneisto', note: 'kaikki vesipisteelliset tilat', price: '200 €', to: '/palvelut/kosteusmittaus' },
  { label: 'Kosteusmittaus, pientalo', note: 'kaikki vesipisteelliset tilat', price: '300 €', to: '/palvelut/kosteusmittaus' },
  { label: 'Betonin kosteusmittaus', note: 'kolme mittauspistettä', price: '250 €', to: '/palvelut/kosteusmittaus#betonin-kosteusmittaus' },
  { label: 'Kuntotutkimus', note: 'hintaluokka pientalolle', price: '1 500–2 000 €', to: '/palvelut/kuntotutkimus' },
  { label: 'Betonin puristuslujuus', note: 'SFS-EN 12390-3 · alv 0 %', price: '50 €', to: '/laboratorio' },
]

export function PriceLedger() {
  return (
    <section className="py-20 sm:py-24 lg:py-28" aria-labelledby="hinnat-title">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHead
            letter="D"
            sheet="05"
            kicker="Hinnasto"
            id="hinnat-title"
            title="Hinta selviää ennen kuin soitat."
            intro={
              <>
                Palveluhinnat sisältävät arvonlisäveron 25,5 %, laboratoriohinnat ovat alv 0 %. {company.travelNote.split('. ')[0]}.
              </>
            }
          />
          <div className="mt-10" data-reveal>
            <BuildYearPrice location="home" />
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-4" data-reveal>
          <div className="border-t-[1.5px] border-ink">
            <ul>
              {rows.map((r) => (
                <li key={r.label} className="border-b border-ink/20">
                  <Link to={r.to} className="group flex flex-wrap items-baseline gap-x-3 gap-y-1 py-5">
                    <span className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold group-hover:underline group-hover:decoration-orange group-hover:decoration-2 group-hover:underline-offset-4 sm:text-[1.3rem]">
                      {r.label}
                    </span>
                    <span className="leader hidden sm:block" aria-hidden="true" />
                    <span className="num ml-auto text-[1.2rem] font-semibold text-rust sm:ml-0 sm:text-[1.4rem]">{r.price}</span>
                    <span className="w-full text-[0.88rem] text-steel">{r.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link to="/hinnasto" className="dimlink">
              <span className="dimlink__line" aria-hidden="true" />
              Koko hinnasto (alv 0 % / 25,5 %)
            </Link>
            <p className="label text-steel">
              Hinnasto {company.documents.priceList.version} · päivitetty {company.documents.priceList.updated}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
