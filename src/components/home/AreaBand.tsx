import { Photo } from '../ui/Photo'
import { company } from '../../data/company'

const places = ['Joensuu', 'Pohjois-Karjala', 'Itä-Suomi']

/** Service area – full-bleed winter road with a drawing-style overlay. */
export function AreaBand() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-paper" aria-labelledby="alue-title">
      <Photo name="talvitie" sizes="100vw" className="absolute inset-0 -z-10 h-full w-full opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/20" aria-hidden="true" />
      <div className="wrap grid min-h-[30rem] content-center gap-8 py-20 lg:min-h-[34rem] lg:grid-cols-12">
        <div className="lg:col-span-7" data-reveal>
          <p className="label text-orange-2">Palvelualue</p>
          <h2 id="alue-title" className="display-l mt-4 max-w-[16ch]">
            Joensuusta koko Itä-Suomeen.
          </h2>
          <p className="lead mt-5 max-w-xl text-paper/85">
            {company.serviceDays}. {company.travelNote}
          </p>
          <ul className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2" aria-label="Palvelualue">
            {places.map((p, i) => (
              <li key={p} className="flex items-center gap-4">
                {i > 0 && <span className="h-px w-8 bg-orange" aria-hidden="true" />}
                <span className="num text-[1.05rem] font-semibold">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
