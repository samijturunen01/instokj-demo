import { Plus } from 'lucide-react'
import type { Qa } from '../../data/services'

export function Faq({ items, className = '', dark = false }: { items: Qa[]; className?: string; dark?: boolean }) {
  const line = dark ? 'divide-white/15 border-white/15' : 'divide-ink/15 border-ink/15'
  return (
    <div className={`faq divide-y border-y ${line} ${className}`}>
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex items-start justify-between gap-6 py-5 font-[family-name:var(--font-display)] text-[1.12rem] font-bold leading-snug sm:text-[1.22rem]">
            <span>{f.q}</span>
            <span
              className={`faq__icon mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border-[1.5px] ${
                dark ? 'border-paper/60 group-hover:border-orange' : 'border-ink/60 group-hover:border-ink'
              }`}
            >
              <Plus className="size-4" aria-hidden="true" />
            </span>
          </summary>
          <p className={`max-w-3xl pb-6 pr-12 ${dark ? 'text-paper/80' : 'text-graphite'}`}>{f.a}</p>
        </details>
      ))}
    </div>
  )
}
