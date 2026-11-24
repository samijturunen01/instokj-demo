import { Link } from 'react-router-dom'

export function Breadcrumbs({ items, dark = false }: { items: { label: string; to?: string }[]; dark?: boolean }) {
  return (
    <nav aria-label="Murupolku" className="label">
      <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${dark ? 'text-mist' : 'text-steel'}`}>
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {it.to ? (
              <Link to={it.to} className={`underline-offset-4 hover:underline ${dark ? 'hover:text-paper' : 'hover:text-ink'}`}>
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className={dark ? 'text-paper' : 'text-ink'}>
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
