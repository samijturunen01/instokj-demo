import { Link } from 'react-router-dom'
import { ClipboardList, Phone } from 'lucide-react'
import { company } from '../../data/company'
import { requestHref } from '../../data/nav'
import { track } from '../../lib/analytics'

/** Mobile-only sticky contact bar: one thumb away from calling or asking for a quote. */
export function CallBar() {
  return (
    <div className="on-dark fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-ink/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-[6px] lg:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-2.5">
        <a href={company.phone.href} className="btn btn--ghost min-h-[3rem] px-3" onClick={() => track('phone_click', { location: 'callbar' })}>
          <Phone aria-hidden="true" />
          Soita
          <span className="sr-only">{company.phone.display}</span>
        </a>
        <Link to={requestHref()} className="btn btn--primary min-h-[3rem] px-3 !shadow-none" onClick={() => track('cta_click', { location: 'callbar' })}>
          <ClipboardList aria-hidden="true" />
          Pyydä tarjous
        </Link>
      </div>
    </div>
  )
}
