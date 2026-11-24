/**
 * Drawing callout bubble ("leikkausmerkki"): a circle split by a horizontal line – the same
 * construction as the KJ logo. Top: section letter, bottom: sheet number. Decorative.
 */
export function SectionMark({ letter, sheet, className = '', dark = false }: { letter: string; sheet: string; className?: string; dark?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={`size-12 shrink-0 overflow-visible sm:size-14 ${className}`} aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="2" y1="34" x2="62" y2="34" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 34 L-6 34" stroke="var(--color-orange)" strokeWidth="1.5" />
      <text
        x="32"
        y="26"
        textAnchor="middle"
        fill="currentColor"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 19 }}
      >
        {letter}
      </text>
      <text
        x="32"
        y="51"
        textAnchor="middle"
        fill={dark ? 'var(--color-orange-2)' : 'var(--color-rust)'}
        style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 11, letterSpacing: '0.04em' }}
      >
        {sheet}
      </text>
    </svg>
  )
}

interface HeadProps {
  letter: string
  sheet: string
  kicker: string
  title: React.ReactNode
  intro?: React.ReactNode
  id?: string
  dark?: boolean
  className?: string
  /** heading level (default h2) */
  as?: 'h2' | 'h3'
}

export function SectionHead({ letter, sheet, kicker, title, intro, id, dark = false, className = '', as: H = 'h2' }: HeadProps) {
  return (
    <div className={`max-w-3xl ${className}`} data-reveal>
      <div className="flex items-center gap-4">
        <SectionMark letter={letter} sheet={sheet} dark={dark} />
        <p className={`label ${dark ? 'text-mist' : 'text-steel'}`}>{kicker}</p>
      </div>
      <H id={id} className="display-l mt-5">
        {title}
      </H>
      {intro && <div className={`lead mt-5 ${dark ? 'text-paper/80' : 'text-graphite'}`}>{intro}</div>}
    </div>
  )
}
