import { Link } from 'react-router-dom'
import { ArrowRight, FileDown } from 'lucide-react'
import { PressIllustration } from '../lab/PressIllustration'
import { SectionMark } from '../ui/SectionMark'
import { company } from '../../data/company'
import { requestHref } from '../../data/nav'
import { asset } from '../../lib/asset'
import { track } from '../../lib/analytics'

const facts = [
  { k: 'SFS-EN 12390-3', v: 'Puristuslujuus akkreditoidulla menetelmällä' },
  { k: 'Seuraava arkipäivä', v: 'Tulokset yleensä seuraavana arkipäivänä testauksesta' },
  { k: 'Oma muottikalusto', v: 'Hyödynnettävissä asiakkaan tarpeiden mukaisesti' },
  { k: 'Luokan 1 laitteet', v: 'Säännöllinen ja riippumaton kalibrointi' },
]

export function LabBand() {
  return (
    <section className="concrete on-dark relative overflow-hidden text-paper" aria-labelledby="lab-title">
      <div className="wrap grid gap-14 py-20 sm:py-24 lg:grid-cols-12 lg:gap-12 lg:py-28">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-4" data-reveal>
            <SectionMark letter="C" sheet="04" dark />
            <p className="label text-mist">FINAS-akkreditoitu testauslaboratorio</p>
          </div>
          <p
            className="num mt-8 select-none text-[clamp(4.5rem,13vw,10rem)] font-bold leading-[0.82] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_var(--color-orange-2)]"
            aria-hidden="true"
            data-reveal
          >
            T359
          </p>
          <h2 id="lab-title" className="display-l mt-6 max-w-[18ch]" data-reveal>
            Betonin lujuus testattuna omassa laboratoriossa Joensuussa
          </h2>
          <p className="lead mt-5 max-w-2xl text-paper/80" data-reveal>
            Laboratoriomme toimii kaikissa betonin elinkaaren vaiheissa ja tuottaa testaustuloksia uudis- ja korjausrakentamisen kohteisiin – porakoenäytteistä
            lieriö- ja kuutiokoekappaleisiin. Akkreditointivaatimus {company.accreditation.standard}.
          </p>

          <dl className="mt-10 grid gap-px bg-white/15 sm:grid-cols-2" data-reveal>
            {facts.map((f) => (
              <div key={f.k} className="bg-ink-2 p-5">
                <dt className="num text-[1.02rem] font-semibold text-orange-2">{f.k}</dt>
                <dd className="mt-1.5 text-[0.95rem] text-paper/80">{f.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-4" data-reveal>
            <Link to={requestHref('laboratorio')} className="btn btn--primary" onClick={() => track('cta_click', { location: 'home_lab', topic: 'laboratorio' })}>
              Tilaa betonitestaus
              <ArrowRight className="btn__arrow" aria-hidden="true" />
            </Link>
            <a
              href={asset(company.documents.orderForm.file)}
              className="btn btn--ghost"
              download
              onClick={() => track('document_download', { document: 'tilauslomake', location: 'home_lab' })}
            >
              <FileDown aria-hidden="true" />
              Tilauslomake (PDF)
            </a>
            <Link to="/laboratorio" className="dimlink text-paper">
              <span className="dimlink__line" aria-hidden="true" />
              Laboratorio ja menetelmät
            </Link>
          </div>
        </div>

        <div className="grid content-start gap-6 lg:col-span-5 lg:pt-6">
          <div className="border-[1.5px] border-white/25 bg-ink/60 p-6 sm:p-8">
            <PressIllustration dark className="mx-auto max-w-[22rem]" />
          </div>
          <div className="flex items-center gap-5 border-[1.5px] border-white/25 p-4" data-reveal>
            <div className="w-32 shrink-0 bg-white p-2.5">
              <img src={asset('images/finas-t359.png')} width={480} height={310} alt="FINAS-akkreditointitunnus T359 (EN ISO/IEC 17025)" loading="lazy" className="h-auto w-full" />
            </div>
            <p className="text-[0.92rem] text-paper/80">
              Akkreditoitu {company.accreditation.since} alkaen. Pätevyysalue:{' '}
              <a href={company.accreditation.url} target="_blank" rel="noopener noreferrer" className="link text-paper">
                finas.fi<span className="sr-only"> (avautuu uuteen välilehteen)</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
