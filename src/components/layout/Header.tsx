import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, Phone, X } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { company } from '../../data/company'
import { mainNav, requestHref } from '../../data/nav'
import { services } from '../../data/services'
import { navScroll } from './ScrollManager'
import { track } from '../../lib/analytics'

const isActive = (pathname: string, path: string) =>
  path === '/' ? pathname === '/' || pathname === '' : pathname === path || pathname.startsWith(`${path}/`)

function Brand({ onClick }: { onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <Link to="/" onClick={onClick} className="group flex items-center gap-3 py-2 text-paper">
      <span className="grid size-10 place-items-center rounded-full border border-white/30 transition-colors group-hover:border-orange">
        <Logo monogramOnly className="h-[1.45rem] w-auto" />
      </span>
      <span className="leading-none">
        <span className="block font-[family-name:var(--font-display)] text-[1.02rem] font-bold tracking-tight sm:text-[1.08rem]">
          Insinööritoimisto KJ<span className="sr-only"> Oy – etusivulle</span>
        </span>
        <span className="label mt-1 block text-[0.64rem] text-mist" aria-hidden="true">
          <span className="hidden sm:inline">Joensuu · Testauslaboratorio </span>
          <span className="sm:hidden">Joensuu · </span>T359
        </span>
      </span>
    </Link>
  )
}

export function Header() {
  const { pathname: raw } = useLocation()
  const pathname = raw.replace(/\/+$/, '') || '/'
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Close the menu whenever the route changes (React's "adjust state during render" pattern).
  const [lastPath, setLastPath] = useState(raw)
  if (raw !== lastPath) {
    setLastPath(raw)
    if (open) setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    const focusables = () => Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button') ?? [])
    focusables()[0]?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
      if (e.key === 'Tab') {
        const f = focusables()
        if (!f.length) return
        const firstEl = f[0]
        const lastEl = f[f.length - 1]
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault()
          lastEl.focus()
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <header className="on-dark sticky top-0 z-40 border-b border-white/10 bg-ink text-paper">
      <div className="wrap flex h-16 items-center gap-6 lg:h-[4.75rem]">
        <div className="mr-auto">
          <Brand onClick={navScroll} />
        </div>

        <nav aria-label="Päävalikko" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.path)
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    onClick={navScroll}
                    aria-current={active ? 'page' : undefined}
                    className={`relative block px-3 py-2.5 font-[family-name:var(--font-display)] text-[0.98rem] font-semibold transition-colors xl:px-3.5 ${
                      active ? 'text-paper' : 'text-paper/70 hover:text-paper'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute inset-x-3 -bottom-[0.95rem] h-[2px] bg-orange xl:inset-x-3.5" aria-hidden="true">
                        <span className="absolute -top-[3px] left-0 h-2 w-px bg-orange" />
                        <span className="absolute -top-[3px] right-0 h-2 w-px bg-orange" />
                      </span>
                    )}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={company.phone.href}
            className="num flex items-center gap-2 py-2 text-[0.95rem] font-semibold text-paper hover:text-orange-2"
            onClick={() => track('phone_click', { location: 'header' })}
          >
            <Phone className="size-4" aria-hidden="true" />
            {company.phone.display}
          </a>
          <Link to={requestHref()} className="btn btn--primary min-h-[2.75rem] px-4 py-2 text-[0.95rem]" onClick={() => track('cta_click', { location: 'header' })}>
            Pyydä tarjous
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={company.phone.href}
            className="grid size-11 place-items-center rounded-full bg-orange text-ink"
            aria-label={`Soita ${company.phone.display}`}
            onClick={() => track('phone_click', { location: 'header_mobile' })}
          >
            <Phone className="size-5" aria-hidden="true" />
          </a>
          <button
            ref={btnRef}
            type="button"
            className="grid size-11 place-items-center rounded-full border border-white/40"
            aria-label="Avaa valikko"
            aria-expanded={open}
            aria-controls="mobiilivalikko"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobiilivalikko"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Valikko"
          className="grid-dark on-dark fixed inset-0 z-50 flex flex-col overflow-y-auto text-paper lg:hidden"
        >
          <div className="wrap flex h-16 shrink-0 items-center justify-between border-b border-white/10">
            <Brand onClick={navScroll} />
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-white/40"
              aria-label="Sulje valikko"
              onClick={() => {
                setOpen(false)
                btnRef.current?.focus()
              }}
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobiilivalikko" className="wrap mt-6 flex-1">
            <ul className="grid gap-1">
              {mainNav.map((item, i) => {
                const active = isActive(pathname, item.path)
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      onClick={navScroll}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-baseline gap-4 py-3 font-[family-name:var(--font-display)] text-[2rem] font-extrabold leading-none tracking-tight ${
                        active ? 'text-orange-2' : 'text-paper'
                      }`}
                    >
                      <span className="label w-7 text-[0.7rem] text-mist" aria-hidden="true">
                        0{i + 1}
                      </span>
                      {item.label}
                    </NavLink>
                    {item.path === '/palvelut' && (
                      <ul className="mb-2 ml-11 grid gap-0.5 border-l border-white/15 pl-4">
                        {services.map((s) => (
                          <li key={s.id}>
                            <NavLink
                              to={s.path}
                              onClick={navScroll}
                              className={({ isActive: a }) => `block py-2 text-[1.05rem] font-semibold ${a ? 'text-orange-2' : 'text-mist'}`}
                            >
                              {s.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="wrap grid shrink-0 gap-3 pb-8 pt-6">
            <Link to={requestHref()} className="btn btn--primary w-full" onClick={() => track('cta_click', { location: 'menu' })}>
              Pyydä tarjous
              <ArrowRight className="btn__arrow" aria-hidden="true" />
            </Link>
            <a href={company.phone.href} className="btn btn--ghost w-full" onClick={() => track('phone_click', { location: 'menu' })}>
              <Phone aria-hidden="true" />
              Soita <span className="num">{company.phone.display}</span>
            </a>
            <p className="label mt-2 text-center text-mist">{company.serviceDays}</p>
          </div>
        </div>
      )}
    </header>
  )
}
