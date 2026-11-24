import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { Photo } from '../components/ui/Photo'
import { SectionHead } from '../components/ui/SectionMark'
import { Faq } from '../components/ui/Faq'
import { CtaBand } from '../components/ui/CtaBand'
import { company } from '../data/company'
import { services, type TopicId } from '../data/services'
import { requestHref } from '../data/nav'
import type { PhotoKey } from '../data/photos'
import { faqs } from '../data/faq'
import { track } from '../lib/analytics'

interface Row {
  id: string
  to: string
  label: string
  title: string
  summary: string
  includes: string[]
  price: string
  priceNote: string
  photo: PhotoKey
  topic: TopicId
  cta: string
}

const rows: Row[] = [
  ...services.map((s) => ({
    id: s.id,
    to: s.path,
    label: s.label,
    title: s.title,
    summary: s.summary,
    includes: s.includes.slice(0, 3),
    price: s.priceFrom,
    priceNote: s.priceNote,
    photo: s.photo,
    topic: s.topic,
    cta: s.cta,
  })),
  {
    id: 'laboratorio',
    to: '/laboratorio',
    label: 'Laboratorio',
    title: 'Betonitestaus FINAS-akkreditoidussa laboratoriossa',
    summary: 'Betonin puristuslujuus akkreditoidulla menetelmällä sekä muut betonin ominaisuudet – tulokset yleensä seuraavana arkipäivänä testauksesta.',
    includes: ['puristuslujuus SFS-EN 12390-3 (akkreditoitu)', 'tiheys SFS-EN 12390-7 (akkreditoitu)', 'veto-, halkaisuveto- ja tartuntalujuus, karbonatisoituminen'],
    price: '50 €',
    priceNote: 'puristuslujuus · alv 0 %',
    photo: 'laboratorio',
    topic: 'laboratorio',
    cta: 'Tilaa betonitestaus',
  },
]

const compare = [
  { k: 'Tarkoitus', a: 'Puolueeton tieto rakennuksen kunnosta asuntokaupan osapuolille', b: 'Rakennuksen kunnon sekä vaurioiden, virheiden ja niiden laajuuden selvittäminen' },
  { k: 'Menetelmä', a: 'Aistienvarainen, rakennetta rikkomaton', b: 'Usein rakenneavauksia, tarvittaessa materiaalinäytteet' },
  { k: 'Ohje', a: 'KH 90-00394', b: 'Laajuus sovitaan kohteen mukaan' },
  { k: 'Hinta', a: '900–1 000 € rakennusvuoden mukaan', b: '1 500–2 000 € (hintaluokka pientalolle)' },
]

export function Services() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Etusivu', to: '/' }, { label: 'Palvelut' }]}
        mark={{ letter: 'P', sheet: '01' }}
        kicker="Yrityksille ja yksityisille"
        title="Palvelut"
        lead="Monipuolinen palvelutarjontamme soveltuu niin yritysasiakkaiden kuin yksityishenkilöiden tarpeisiin: tarkastukset ja tutkimukset, kosteusmittaukset, vastaavan työnjohtajan tehtävät ja betonitestaus omassa laboratoriossa."
        photo="talo"
        factsTitle="Palvelualue"
        facts={[
          { label: 'Alue', value: company.serviceArea },
          { label: 'Palvelupäivät', value: 'Arkipäivät ja viikonloput' },
          { label: 'Matkat', value: 'Kuntotarkastuksissa sisältyvät hintaan Joensuun talousalueella ja Itä-Suomessa' },
          { label: 'Yhteyshenkilö', value: `${company.person.name}, ${company.phone.display}` },
        ]}
        location="services_hero"
      />

      <section className="py-16 sm:py-20 lg:py-24" aria-label="Palveluluettelo">
        <div className="wrap">
          <ol className="grid gap-16 lg:gap-24">
            {rows.map((r, i) => (
              <li key={r.id} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2 lg:col-start-8' : ''}`}>
                  <Photo name={r.photo} sizes="(min-width: 1024px) 38vw, 100vw" className="aspect-[4/3]" wipe />
                </div>
                <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-1 lg:col-start-1 lg:row-start-1' : ''}`} data-reveal>
                  <p className="label flex items-center gap-3 text-rust">
                    <span className="num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="h-px w-8 bg-orange" aria-hidden="true" />
                    {r.label}
                  </p>
                  <h2 className="display-m mt-4 max-w-[24ch]">
                    <Link to={r.to} className="hover:underline hover:decoration-orange hover:decoration-2 hover:underline-offset-[6px]">
                      {r.title}
                    </Link>
                  </h2>
                  <p className="mt-4 max-w-2xl text-graphite">{r.summary}</p>
                  <ul className="mt-5 grid gap-1.5 text-[0.98rem]">
                    {r.includes.map((it) => (
                      <li key={it} className="flex gap-3">
                        <span className="mt-[0.75em] h-px w-3 shrink-0 bg-ink" aria-hidden="true" />
                        <span className="first-letter:uppercase">{it}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap items-end gap-x-8 gap-y-5 border-t border-ink/20 pt-5">
                    <div>
                      <p className="num text-[1.6rem] font-semibold leading-none text-rust">{r.price}</p>
                      <p className="mt-1.5 text-[0.86rem] text-steel">{r.priceNote}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                      <Link to={r.to} className="dimlink">
                        <span className="dimlink__line" aria-hidden="true" />
                        Lue lisää<span className="sr-only">: {r.label}</span>
                      </Link>
                      <Link
                        to={requestHref(r.topic)}
                        className="inline-flex items-center gap-2 font-semibold underline decoration-orange decoration-2 underline-offset-4 hover:decoration-ink"
                        onClick={() => track('cta_click', { location: 'services_list', topic: r.topic })}
                      >
                        {r.cta}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="grid-paper border-y border-ink/15 py-16 sm:py-20" aria-labelledby="vertailu-title">
        <div className="wrap">
          <SectionHead
            letter="P"
            sheet="02"
            kicker="Vertailu"
            id="vertailu-title"
            title="Kuntotarkastus vai kuntotutkimus?"
            intro="Asuntokaupan kuntotarkastus kertoo kunnosta rakenteita rikkomatta. Kun epäily vauriosta pitää selvittää, tarvitaan kuntotutkimus."
          />
          <div className="mt-10 overflow-x-auto" data-reveal>
            <table className="w-full min-w-[40rem] border-collapse border-[1.5px] border-ink bg-sheet text-left">
              <caption className="sr-only">Kuntotarkastuksen ja kuntotutkimuksen erot</caption>
              <thead>
                <tr className="border-b-[1.5px] border-ink">
                  <td className="w-[18%] p-4" />
                  <th scope="col" className="p-4 font-[family-name:var(--font-display)] text-[1.2rem] font-bold">
                    <Link to="/palvelut/kuntotarkastus" className="underline decoration-orange decoration-2 underline-offset-4">
                      Kuntotarkastus
                    </Link>
                  </th>
                  <th scope="col" className="border-l border-ink/20 p-4 font-[family-name:var(--font-display)] text-[1.2rem] font-bold">
                    <Link to="/palvelut/kuntotutkimus" className="underline decoration-orange decoration-2 underline-offset-4">
                      Kuntotutkimus
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {compare.map((c) => (
                  <tr key={c.k} className="border-b border-ink/15 align-top last:border-b-0">
                    <th scope="row" className="label p-4 pt-[1.15rem] font-medium text-steel">
                      {c.k}
                    </th>
                    <td className="p-4">{c.a}</td>
                    <td className="border-l border-ink/20 p-4">{c.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="palvelut-ukk-title">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead letter="P" sheet="03" kicker="Usein kysyttyä" id="palvelut-ukk-title" title="Kysymyksiä palveluista" />
          </div>
          <div className="lg:col-span-8" data-reveal>
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <CtaBand
        location="services_closing"
        title="Kerro tarpeesi – ohjataan oikeaan palveluun."
        text="Jos et ole varma, tarvitsetko tarkastuksen, mittauksen vai tutkimuksen, kuvaile tilanne lyhyesti. Yhteystiedoista löydät henkilöstömme vastuualueittain."
      />
    </>
  )
}
