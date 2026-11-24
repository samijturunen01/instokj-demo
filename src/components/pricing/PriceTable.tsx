import { useId } from 'react'
import { Link } from 'react-router-dom'
import { amountText, VAT_RATE, type PriceGroup } from '../../data/prices'
import { requestHref } from '../../data/nav'
import type { TopicId } from '../../data/services'
import { track } from '../../lib/analytics'

export type VatView = 'quoted' | 'net' | 'gross'

const views: { id: VatView; label: string }[] = [
  { id: 'quoted', label: 'Hinnaston mukaan' },
  { id: 'net', label: 'Alv 0 %' },
  { id: 'gross', label: `Sis. alv ${VAT_RATE}` },
]

export function VatToggle({ value, onChange }: { value: VatView; onChange: (v: VatView) => void }) {
  const id = useId()
  return (
    <fieldset className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <legend className="label float-left mr-2 text-steel">Näytä hinnat</legend>
      <div className="inline-flex flex-wrap border-[1.5px] border-ink">
        {views.map((v) => (
          <label
            key={v.id}
            className={`relative cursor-pointer px-3.5 py-2.5 text-[0.92rem] font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-orange ${
              value === v.id ? 'bg-ink text-paper' : 'bg-sheet hover:bg-paper-2'
            }`}
          >
            <input
              type="radio"
              name={`${id}-alv`}
              value={v.id}
              checked={value === v.id}
              onChange={() => {
                onChange(v.id)
                track('vat_toggle', { view: v.id })
              }}
              className="absolute size-px opacity-0"
            />
            {v.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

const topicFor = (g: PriceGroup): TopicId =>
  g.id === 'betonin-kosteusmittaus' ? 'betonin-kosteusmittaus' : (g.serviceId as TopicId)

export function PriceTable({ group, view, serviceLink }: { group: PriceGroup; view: VatView; serviceLink?: string }) {
  const basis = view === 'quoted' ? group.quotedVat : view
  const basisLabel = basis === 'gross' ? `sis. alv ${VAT_RATE}` : 'alv 0 %'
  return (
    <div id={`hinta-${group.id}`} className="border-t-[1.5px] border-ink pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="display-m">{group.service}</h3>
        {group.rows.some((r) => r.amount) && <p className="label text-rust">{basisLabel}</p>}
      </div>
      <table className="mt-4 w-full border-collapse text-left">
        <caption className="sr-only">
          {group.service}, hinnat {basisLabel}
        </caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Palvelu</th>
            <th scope="col">Hinta</th>
          </tr>
        </thead>
        <tbody>
          {group.rows.map((r) => {
            const txt = amountText(r.amount, basis)
            return (
              <tr key={r.id} className="border-b border-ink/15 align-baseline">
                <th scope="row" className="py-3.5 pr-4 font-normal">
                  <span className="block text-[1.05rem] font-semibold">{r.label}</span>
                  {r.detail && <span className="block text-[0.88rem] text-steel">{r.detail}</span>}
                </th>
                <td className="num whitespace-nowrap py-3.5 text-right text-[1.15rem] font-semibold sm:text-[1.3rem]">
                  {txt ?? <span className="font-[family-name:var(--font-sans)] text-[0.95rem] font-semibold text-steel">{r.note}</span>}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        {group.footnote ? <p className="text-[0.9rem] text-steel">{group.footnote}</p> : <span />}
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {serviceLink && (
            <Link to={serviceLink} className="text-[0.92rem] font-semibold underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              Palvelun kuvaus
            </Link>
          )}
          <Link
            to={requestHref(topicFor(group))}
            className="text-[0.92rem] font-semibold underline decoration-orange decoration-2 underline-offset-4 hover:decoration-ink"
            onClick={() => track('cta_click', { location: 'pricing_row', topic: topicFor(group) })}
          >
            Pyydä tarjous<span className="sr-only">: {group.service}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
