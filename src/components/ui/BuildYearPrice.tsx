import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { euro, inspectionPriceFor } from '../../data/prices'
import { requestHref } from '../../data/nav'
import { track } from '../../lib/analytics'

const THIS_YEAR = new Date().getFullYear()

/** "Mitä kuntotarkastus maksaa?" – the published price for the entered year of construction. */
export function BuildYearPrice({ dark = false, location }: { dark?: boolean; location: string }) {
  const id = useId()
  const [year, setYear] = useState('')
  const n = Number(year)
  const valid = /^\d{4}$/.test(year) && n >= 1700 && n <= THIS_YEAR
  const row = valid ? inspectionPriceFor(n) : null

  return (
    <div className={`border-[1.5px] p-5 sm:p-6 ${dark ? 'border-white/25 bg-ink-2' : 'border-ink bg-sheet'}`}>
      <p className={`label ${dark ? 'text-orange-2' : 'text-rust'}`}>Hintalaskuri · kuntotarkastus</p>
      <label htmlFor={`${id}-vuosi`} className="mt-3 block font-[family-name:var(--font-display)] text-[1.2rem] font-bold leading-tight">
        Minä vuonna talo on rakennettu?
      </label>
      <div className="mt-4 flex flex-wrap items-stretch gap-3">
        <input
          id={`${id}-vuosi`}
          inputMode="numeric"
          autoComplete="off"
          maxLength={4}
          placeholder="esim. 1985"
          value={year}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, '').slice(0, 4)
            setYear(v)
            if (v.length === 4) track('price_check', { service: 'kuntotarkastus', location })
          }}
          className="input num w-36 text-[1.15rem]"
          aria-describedby={`${id}-tulos`}
        />
        <div id={`${id}-tulos`} aria-live="polite" className="flex min-h-[3.1rem] flex-1 flex-col justify-center">
          {row && row.amount && !Array.isArray(row.amount) ? (
            <>
              <span className="num text-[1.7rem] font-semibold leading-none">{euro(row.amount.gross)}</span>
              <span className={`mt-1 text-[0.85rem] ${dark ? 'text-mist' : 'text-steel'}`}>
                {row.label.toLowerCase()} · sis. alv 25,5 %
              </span>
            </>
          ) : (
            <span className={`text-[0.92rem] ${dark ? 'text-mist' : 'text-steel'}`}>
              {year.length === 4 && !valid ? 'Tarkista vuosiluku.' : 'Hinta näkyy tässä – 900, 950 tai 1 000 €.'}
            </span>
          )}
        </div>
      </div>
      <p className={`mt-4 text-[0.88rem] ${dark ? 'text-paper/70' : 'text-steel'}`}>Matkat Joensuun talousalueella ja Itä-Suomessa sisältyvät hintaan.</p>
      {row && (
        <Link
          to={requestHref('kuntotarkastus', { vuosi: year })}
          className="btn btn--primary mt-5 w-full sm:w-auto"
          onClick={() => track('cta_click', { location: `${location}_calculator`, topic: 'kuntotarkastus' })}
        >
          Tilaa kuntotarkastus
          <ArrowRight className="btn__arrow" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}
