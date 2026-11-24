import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { Photo } from '../components/ui/Photo'
import { SectionHead } from '../components/ui/SectionMark'
import { Faq } from '../components/ui/Faq'
import { CtaBand } from '../components/ui/CtaBand'
import { BuildYearPrice } from '../components/ui/BuildYearPrice'
import { PriceTable, VatToggle, type VatView } from '../components/pricing/PriceTable'
import { serviceById, services, type Service } from '../data/services'
import { servicePrices } from '../data/prices'
import { requestHref } from '../data/nav'
import { track } from '../lib/analytics'
import { NotFound } from './NotFound'

const letters: Record<Service['id'], string> = { kuntotarkastus: 'K', kuntotutkimus: 'T', kosteusmittaus: 'M', 'vastaava-tyonjohtaja': 'V' }

/** Moisture page: two distinct measurements, each with its own audience and price. */
function MoistureParts() {
  return (
    <section className="border-b border-ink/15 py-16 sm:py-20" aria-label="Mittaukset">
      <div className="wrap grid gap-6 lg:grid-cols-2">
        <article id="markatilat" className="border-[1.5px] border-ink bg-sheet p-6 sm:p-9" data-reveal>
          <p className="label text-rust">Mittaus 1</p>
          <h2 className="display-m mt-3">Märkätilojen kosteusmittaus</h2>
          <p className="mt-4 text-graphite">
            Teemme kosteusmittaukset kaikista vesipisteellisistä tiloista. Kohteitamme ovat huoneistot ja pientalot, liikerakennukset sekä julkiset kiinteistöt.
            Usein ensimmäinen tutkimus on pintakosteusmittaus – teemme pintakosteusmittauksia myös asuntokauppaa varten.
          </p>
          <dl className="mt-6 grid grid-cols-2 border-t border-ink/20">
            <div className="py-4 pr-4">
              <dt className="label text-steel">Huoneisto</dt>
              <dd className="num mt-1 text-[1.7rem] font-semibold text-rust">200 €</dd>
            </div>
            <div className="border-l border-ink/20 py-4 pl-4">
              <dt className="label text-steel">Pientalo</dt>
              <dd className="num mt-1 text-[1.7rem] font-semibold text-rust">300 €</dd>
            </div>
          </dl>
          <p className="text-[0.86rem] text-steel">Kaikki vesipisteelliset tilat · sis. alv 25,5 %</p>
          <Link
            to={requestHref('kosteusmittaus')}
            className="btn btn--primary mt-7"
            onClick={() => track('cta_click', { location: 'moisture_wet', topic: 'kosteusmittaus' })}
          >
            Tilaa kosteusmittaus
            <ArrowRight className="btn__arrow" aria-hidden="true" />
          </Link>
        </article>
        <article id="betonin-kosteusmittaus" className="on-dark bg-ink p-6 text-paper sm:p-9" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
          <p className="label text-orange-2">Mittaus 2 · RT 14-10984</p>
          <h2 className="display-m mt-3">Betonin kosteusmittaus</h2>
          <p className="mt-4 text-paper/80">
            Mittauksella selvitetään esimerkiksi maanvaraisen betonilaatan suhteellinen kosteus. Betonin suhteellinen kosteusmittaus suoritetaan RT 14-10984
            Betonin suhteellisen kosteuden mittaus -kortin mukaisesti, ja mittaustulosta voidaan käyttää betonilaatan päällystettävyyden arviointiin.
          </p>
          <dl className="mt-6 border-t border-white/20">
            <div className="py-4">
              <dt className="label text-mist">Kolme mittauspistettä</dt>
              <dd className="num mt-1 text-[1.7rem] font-semibold text-orange-2">250 €</dd>
            </div>
          </dl>
          <p className="text-[0.86rem] text-mist">Sis. alv 25,5 % · suuremmat kokonaisuudet sovitaan tapauskohtaisesti</p>
          <Link
            to={requestHref('betonin-kosteusmittaus')}
            className="btn btn--primary mt-7"
            onClick={() => track('cta_click', { location: 'moisture_concrete', topic: 'betonin-kosteusmittaus' })}
          >
            Tilaa betonin kosteusmittaus
            <ArrowRight className="btn__arrow" aria-hidden="true" />
          </Link>
        </article>
      </div>
    </section>
  )
}

export function ServicePage({ id }: { id: string }) {
  const s = serviceById(id)
  const [view, setView] = useState<VatView>('quoted')
  if (!s) return <NotFound />
  const L = letters[s.id]
  const groups = servicePrices.filter((g) => s.priceGroups.includes(g.id))
  const others = services.filter((x) => x.id !== s.id)

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Etusivu', to: '/' }, { label: 'Palvelut', to: '/palvelut' }, { label: s.label }]}
        mark={{ letter: L, sheet: '01' }}
        kicker={s.kicker}
        title={s.title}
        lead={s.lead}
        photo={s.photo}
        facts={[...s.facts, { label: 'Hinta', value: <span className="num text-rust">{s.priceFrom}</span> }]}
        factsTitle={s.label}
        topic={s.topic}
        cta={s.cta}
        location={`service_${s.id}_hero`}
      />

      {/* Need + what it covers */}
      <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="tarve-title">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <SectionHead letter={L} sheet="02" kicker="Miksi" id="tarve-title" title={s.need.title} intro={s.need.text} />
          </div>
          <div className="lg:col-span-6 lg:pt-6" data-reveal>
            <h3 className="label text-steel">{s.includesTitle}</h3>
            <ol className="mt-5 border-t-[1.5px] border-ink">
              {s.includes.map((it, i) => (
                <li key={it} className="flex items-baseline gap-5 border-b border-ink/20 py-4">
                  <span className="num text-[0.8rem] text-rust">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[1.12rem] font-semibold first-letter:uppercase">{it}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {s.id === 'kosteusmittaus' && <MoistureParts />}

      {/* When to order */}
      <section className="on-dark bg-ink text-paper" aria-labelledby="milloin-title">
        <div className="grid lg:grid-cols-2">
          {s.photoAlt && <Photo name={s.photoAlt} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[16/10] lg:aspect-auto lg:min-h-[28rem]" fill wipe />}
          <div className="px-[clamp(1rem,4vw,3rem)] py-14 sm:py-16 lg:px-14 lg:py-20">
            <p className="label text-orange-2">Milloin tilata</p>
            <h2 id="milloin-title" className="display-m mt-3 max-w-[22ch]">
              Tyypillisiä tilanteita
            </h2>
            <ul className="mt-8 grid gap-5">
              {s.useCases.map((u) => (
                <li key={u} className="flex gap-4" data-reveal>
                  <span className="mt-[0.7em] h-px w-6 shrink-0 bg-orange" aria-hidden="true" />
                  <span className="text-paper/90">{u}</span>
                </li>
              ))}
            </ul>
            <Link
              to={requestHref(s.topic)}
              className="btn btn--primary mt-10"
              onClick={() => track('cta_click', { location: `service_${s.id}_usecases`, topic: s.topic })}
            >
              {s.cta}
              <ArrowRight className="btn__arrow" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Price */}
      <section className="grid-paper border-b border-ink/15 py-16 sm:py-20" aria-labelledby="hinta-title">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHead letter={L} sheet="03" kicker="Hinnasto" id="hinta-title" title="Hinta" />
            <div className="mt-8">
              <VatToggle value={view} onChange={setView} />
            </div>
            <div className="mt-8 grid gap-10">
              {groups.map((g) => (
                <PriceTable key={g.id} group={g} view={view} />
              ))}
            </div>
            <p className="mt-6 text-[0.92rem] text-steel">
              Kaikki hinnat: <Link to="/hinnasto" className="link text-ink">hinnasto</Link>.
            </p>
          </div>
          <div className="lg:col-span-5 lg:pt-28">
            {s.id === 'kuntotarkastus' ? (
              <BuildYearPrice location="service_kuntotarkastus" />
            ) : (
              <div className="border-[1.5px] border-ink bg-sheet p-6">
                <p className="label text-rust">Tarjous</p>
                <p className="mt-3 font-[family-name:var(--font-display)] text-[1.3rem] font-bold leading-snug">
                  {s.id === 'vastaava-tyonjohtaja' ? 'Hinta sovitaan hankkeen mukaan.' : 'Kerro kohteesta, niin laajuus ja hinta sovitaan ennen töitä.'}
                </p>
                <Link to={requestHref(s.topic)} className="btn btn--primary mt-6 w-full sm:w-auto" onClick={() => track('cta_click', { location: `service_${s.id}_price`, topic: s.topic })}>
                  {s.cta}
                  <ArrowRight className="btn__arrow" aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20" aria-labelledby="palvelu-ukk-title">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead letter={L} sheet="04" kicker="Usein kysyttyä" id="palvelu-ukk-title" title={`Kysyttyä: ${s.label.toLowerCase()}`} />
          </div>
          <div className="lg:col-span-8" data-reveal>
            <Faq items={s.faq} />
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-ink/15 bg-paper-2 py-14" aria-labelledby="muut-title">
        <div className="wrap">
          <h2 id="muut-title" className="label text-steel">
            Muut palvelut
          </h2>
          <ul className="mt-5 grid gap-px border-[1.5px] border-ink bg-ink/80 sm:grid-cols-2 lg:grid-cols-4">
            {[...others.map((o) => ({ to: o.path, label: o.label, price: o.priceFrom })), { to: '/laboratorio', label: 'Betonitestaus', price: '50 € (alv 0 %)' }].map(
              (o) => (
                <li key={o.to}>
                  <Link to={o.to} className="group flex h-full flex-col justify-between gap-6 bg-sheet p-5 transition-colors hover:bg-paper">
                    <span className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold">{o.label}</span>
                    <span className="flex items-center justify-between gap-3">
                      <span className="num text-[0.95rem] text-rust">{o.price}</span>
                      <span className="dimlink__line text-ink" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </section>

      <CtaBand
        location={`service_${s.id}_closing`}
        topic={s.topic}
        cta={s.cta}
        title={s.id === 'vastaava-tyonjohtaja' ? 'Kerro hankkeesta – sovitaan tehtävät ja hinta.' : 'Kerro kohteesta – sovitaan ajankohta.'}
        text={`${s.summary} Palvelemme Joensuussa ja koko Itä-Suomessa, myös viikonloppuisin.`}
      />
    </>
  )
}
