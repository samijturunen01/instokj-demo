import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { company } from '../../data/company'
import { mainNav } from '../../data/nav'
import { services } from '../../data/services'
import { navScroll } from './ScrollManager'
import { track } from '../../lib/analytics'

export function Footer() {
  return (
    <footer className="on-dark border-t border-white/10 bg-ink text-paper">
      <div className="wrap grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Link to="/" onClick={navScroll} className="inline-flex items-center gap-4" aria-label="Insinööritoimisto KJ Oy – etusivulle">
            <Logo className="size-16 text-paper" />
            <span className="font-[family-name:var(--font-display)] text-xl font-bold leading-tight">
              Insinööritoimisto
              <br />
              KJ Oy
            </span>
          </Link>
          <p className="mt-6 max-w-sm text-paper/75">
            Kuntotarkastukset, mittaukset, vastaavan työnjohtajan tehtävät ja FINAS-akkreditoitu testauslaboratorio {company.accreditation.id}. {company.serviceArea}.
          </p>
          <p className="label mt-6 text-mist">{company.serviceDays}</p>
        </div>

        <div className="lg:col-span-3">
          <h2 className="label text-mist">Yhteystiedot</h2>
          <ul className="mt-5 grid gap-3">
            <li>
              <a href={company.phone.href} className="num text-lg font-semibold hover:text-orange-2" onClick={() => track('phone_click', { location: 'footer' })}>
                {company.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email.office}`} className="hover:text-orange-2" onClick={() => track('email_click', { location: 'footer' })}>
                {company.email.office}
              </a>
            </li>
            <li>
              <address className="not-italic text-paper/80">
                Toimisto ja laboratorio
                <br />
                {company.address.street}, {company.address.postalCode} {company.address.city}
              </address>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="label text-mist">Sivusto</h2>
          <ul className="mt-5 grid gap-2">
            {mainNav.map((n) => (
              <li key={n.path}>
                <Link to={n.path} onClick={navScroll} className="hover:text-orange-2">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="label text-mist">Palvelut</h2>
          <ul className="mt-5 grid gap-2">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={s.path} className="hover:text-orange-2">
                  {s.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/laboratorio" className="hover:text-orange-2">
                Betonitestaus
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-4 py-7 text-[0.88rem] text-paper/70 lg:flex-row lg:items-center lg:justify-between">
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <span>Y-tunnus {company.businessId}</span>
            <a href={company.accreditation.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-paper">
              FINAS {company.accreditation.id}
              <ExternalLink className="size-3" aria-hidden="true" />
              <span className="sr-only">(avautuu uuteen välilehteen)</span>
            </a>
            <a href={company.trustedPartner.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-paper">
              {company.trustedPartner.label}
              <ExternalLink className="size-3" aria-hidden="true" />
              <span className="sr-only">(avautuu uuteen välilehteen)</span>
            </a>
            <Link to="/yhteystiedot#laskutus" className="hover:text-paper">
              Verkkolaskutustiedot
            </Link>
          </p>
          <p className="max-w-xl lg:text-right">
            Konseptidemo, Hades Design. Ei Insinööritoimisto KJ Oy:n virallinen sivusto – virallinen sivusto:{' '}
            <a href={company.originalSite} className="underline underline-offset-4 hover:text-paper" target="_blank" rel="noopener noreferrer">
              instokj.fi
              <span className="sr-only"> (avautuu uuteen välilehteen)</span>
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
