import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { LogoDrawing } from '../brand/LogoDrawing'
import { Photo } from '../ui/Photo'
import { company } from '../../data/company'
import { requestHref } from '../../data/nav'
import { track } from '../../lib/analytics'
import { INTRO_MS, endIntro } from '../../lib/intro'

const proof = [
  { k: 'FINAS T359', v: 'Akkreditoitu testauslaboratorio' },
  { k: 'KH 90-00394', v: 'Kuntotarkastuksen suoritusohje' },
  { k: '900–1 000 €', v: 'Kuntotarkastus, matkat sisältyvät' },
  { k: 'Arki ja viikonloppu', v: 'Palvelemme myös viikonloppuisin' },
]

export function Hero() {
  // The intro is CSS-only; this just removes the flag once it has finished.
  useEffect(() => {
    const t = window.setTimeout(endIntro, INTRO_MS)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <section className="grid-paper relative overflow-hidden border-b border-ink/15" aria-labelledby="hero-title">
      <div className="wrap grid gap-12 pb-14 pt-8 sm:pt-12 lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-14">
        <div className="relative z-10 lg:col-span-7 lg:pr-2">
          <div className="flex items-center gap-4">
            <LogoDrawing className="size-[4.5rem] shrink-0 text-ink lg:hidden" />
            <p className="label max-w-[26ch] text-steel sm:max-w-none">Insinööritoimisto ja testauslaboratorio · Joensuu</p>
          </div>

          <h1 id="hero-title" className="mt-6 lg:mt-7">
            <span className="block max-w-[16ch] font-[family-name:var(--font-display)] text-[clamp(2.6rem,5.1vw,4.7rem)] font-extrabold leading-[0.96] tracking-[-0.035em]">
              Tieto, jonka varaan voi rakentaa.
            </span>
            <span className="mt-5 block max-w-[34ch] font-[family-name:var(--font-display)] text-[1.28rem] font-semibold leading-snug tracking-tight text-graphite sm:text-[1.5rem]">
              Kuntotarkastukset, kosteusmittaukset, vastaava työnjohtaja ja FINAS-akkreditoitu betonilaboratorio Joensuussa.
            </span>
          </h1>

          <p className="lead mt-6 max-w-[38rem] text-graphite">
            Insinööri tarkastaa, mittaa ja testaa puolueettomasti – ja hinnat näet jo ennen yhteydenottoa. Palvelemme Joensuussa ja koko Itä-Suomessa,
            myös viikonloppuisin.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <Link to={requestHref()} className="btn btn--primary" onClick={() => track('cta_click', { location: 'hero' })}>
              Pyydä tarjous
              <ArrowRight className="btn__arrow" aria-hidden="true" />
            </Link>
            <Link to="/hinnasto" className="btn btn--ghost" onClick={() => track('cta_click', { location: 'hero_prices' })}>
              Katso hinnasto
            </Link>
            <a
              href={company.phone.href}
              className="group inline-flex min-h-[2.75rem] items-center gap-2 px-1 font-semibold"
              onClick={() => track('phone_click', { location: 'hero' })}
            >
              <Phone className="size-4 text-rust" aria-hidden="true" />
              <span className="underline decoration-orange decoration-2 underline-offset-4 group-hover:decoration-ink">
                tai soita <span className="num">{company.phone.display}</span>
              </span>
            </a>
          </div>

          <dl className="mt-11 grid grid-cols-2 border-t-[1.5px] border-ink/80 sm:grid-cols-4">
            {proof.map((p, i) => (
              <div key={p.k} className={`py-4 pr-3 ${i % 2 === 1 ? 'border-l border-ink/20 pl-4' : ''} ${i === 2 ? 'sm:border-l sm:border-ink/20 sm:pl-4' : ''}`}>
                <dt className="num text-[1rem] font-bold text-ink">{p.k}</dt>
                <dd className="mt-1 text-[0.85rem] leading-snug text-steel">{p.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative lg:col-span-5">
          <div className="hero-cut relative lg:ml-10">
            <Photo name="laboratorio" priority sizes="(min-width: 1024px) 36vw, 100vw" className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[5/6]" />
            <span className="pointer-events-none absolute -left-4 top-8 hidden h-px w-16 bg-orange lg:block" aria-hidden="true" />
          </div>

          {/* Drawing sheet with the signature logo intro (desktop) */}
          <div className="relative -mt-44 hidden w-[17.5rem] border-[1.5px] border-ink bg-sheet shadow-[8px_8px_0_0_var(--color-ink)] lg:block">
            <div className="flex items-center justify-between border-b-[1.5px] border-ink px-4 py-2">
              <p className="label text-steel">Lehti 01</p>
              <p className="label text-rust">Mittapiirros</p>
            </div>
            <div className="grid-paper grid place-items-center px-6 py-6">
              <LogoDrawing className="size-36 text-ink" />
            </div>
            <dl className="divide-y divide-ink/20 border-t-[1.5px] border-ink text-[0.84rem]">
              {[
                ['Laatija', 'Insinööritoimisto KJ Oy'],
                ['Akkred.', 'FINAS T359 · ISO/IEC 17025'],
                ['Alue', 'Joensuu – Itä-Suomi'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[5.2rem_1fr] gap-2 px-4 py-2">
                  <dt className="label pt-0.5 text-steel">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
