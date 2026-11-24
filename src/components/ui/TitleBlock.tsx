/**
 * "Nimiö" – the title block of a construction drawing, used for verified key facts.
 */
interface Props {
  rows: { label: string; value: React.ReactNode }[]
  title?: string
  sheet?: string
  className?: string
  dark?: boolean
}

export function TitleBlock({ rows, title, sheet, className = '', dark = false }: Props) {
  const border = dark ? 'border-white/25' : 'border-ink/70'
  const inner = dark ? 'divide-white/15 border-white/15' : 'divide-ink/20 border-ink/20'
  return (
    <div className={`border-[1.5px] ${border} ${dark ? 'bg-ink-2/60 text-paper' : 'bg-sheet text-ink'} ${className}`}>
      {(title || sheet) && (
        <div className={`flex items-center justify-between gap-4 border-b-[1.5px] ${border} px-4 py-2.5`}>
          {title && <p className="label">{title}</p>}
          {sheet && <p className={`label ${dark ? 'text-orange-2' : 'text-rust'}`}>{sheet}</p>}
        </div>
      )}
      <dl className={`divide-y ${inner}`}>
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[minmax(6.5rem,34%)_1fr] gap-3 px-4 py-2.5">
            <dt className={`label pt-[0.2rem] ${dark ? 'text-mist' : 'text-steel'}`}>{r.label}</dt>
            <dd className="text-[0.95rem] font-semibold leading-snug">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
