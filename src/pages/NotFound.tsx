import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { company } from '../data/company'
import { requestHref } from '../data/nav'

const links = [
  { to: '/', label: 'Etusivu' },
  { to: '/palvelut', label: 'Palvelut' },
  { to: '/laboratorio', label: 'Laboratorio' },
  { to: '/hinnasto', label: 'Hinnasto' },
  { to: '/yhteystiedot', label: 'Yhteystiedot' },
]

export function NotFound() {
  return (
    <section className="grid-paper border-b border-ink/15" aria-labelledby="ei-loydy-title">
      <div className="wrap grid gap-12 py-16 sm:py-24 lg:grid-cols-12 lg:items-center lg:py-28">
        <div className="lg:col-span-7">
          <p className="label text-rust">Virhe 404 · lehteä ei löydy</p>
          <h1 id="ei-loydy-title" className="display-xl mt-5 max-w-[14ch]">
            Tätä leikkausta ei ole piirretty.
          </h1>
          <p className="lead mt-6 max-w-xl text-graphite">
            Hakemaasi sivua ei löytynyt – osoite voi olla vanha tai kirjoitettu väärin. Jatka alla olevista linkeistä tai soita{' '}
            <a href={company.phone.href} className="link num">
              {company.phone.display}
            </a>
            .
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/" className="btn btn--primary">
              Etusivulle
              <ArrowRight className="btn__arrow" aria-hidden="true" />
            </Link>
            <Link to={requestHref()} className="btn btn--ghost">
              Pyydä tarjous
            </Link>
          </div>
        </div>
        <nav className="lg:col-span-5" aria-label="Sivuston pääsivut">
          <div className="border-[1.5px] border-ink bg-sheet">
            <div className="flex items-center justify-between border-b-[1.5px] border-ink px-4 py-2.5">
              <p className="label">Piirustusluettelo</p>
              <p className="label text-rust">?–?</p>
            </div>
            <ul className="divide-y divide-ink/20">
              {links.map((l, i) => (
                <li key={l.to}>
                  <Link to={l.to} className="group flex items-center justify-between gap-4 px-4 py-3.5 hover:bg-paper">
                    <span className="flex items-baseline gap-4">
                      <span className="num text-[0.8rem] text-rust">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold">{l.label}</span>
                    </span>
                    <span className="dimlink__line" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </section>
  )
}
