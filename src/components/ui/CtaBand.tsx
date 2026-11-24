import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Phone } from 'lucide-react'
import { company } from '../../data/company'
import { requestHref } from '../../data/nav'
import type { TopicId } from '../../data/services'
import { track } from '../../lib/analytics'
import { Logo } from '../brand/Logo'

interface Props {
  title: React.ReactNode
  text: React.ReactNode
  topic?: TopicId
  cta?: string
  location: string
}

/** Closing call to action – graphite concrete band with the logo's ground line as the divider. */
export function CtaBand({ title, text, topic, cta = 'Pyydä tarjous', location }: Props) {
  return (
    <section className="concrete on-dark relative overflow-hidden text-paper" aria-label="Ota yhteyttä">
      <Logo className="pointer-events-none absolute -right-24 -top-24 size-[30rem] text-white/[0.045] sm:-right-10" />
      <div className="wrap relative grid gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:items-end lg:py-28">
        <div className="lg:col-span-7" data-reveal>
          <p className="label text-orange-2">Seuraava askel</p>
          <h2 className="display-l mt-4">{title}</h2>
          <p className="lead mt-5 max-w-2xl text-paper/80">{text}</p>
        </div>
        <div className="grid gap-4 lg:col-span-5" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
          <Link to={requestHref(topic)} className="btn btn--primary w-full sm:w-auto" onClick={() => track('cta_click', { location, topic: topic ?? '' })}>
            {cta}
            <ArrowRight className="btn__arrow" aria-hidden="true" />
          </Link>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <a href={company.phone.href} className="btn btn--ghost w-full justify-start" onClick={() => track('phone_click', { location })}>
              <Phone aria-hidden="true" />
              <span>
                Soita <span className="num">{company.phone.display}</span>
              </span>
            </a>
            <a href={`mailto:${company.email.office}`} className="btn btn--ghost w-full justify-start" onClick={() => track('email_click', { location })}>
              <Mail aria-hidden="true" />
              <span className="truncate">{company.email.office}</span>
            </a>
          </div>
          <p className="label text-mist">{company.serviceDays} · {company.serviceArea}</p>
        </div>
      </div>
    </section>
  )
}
