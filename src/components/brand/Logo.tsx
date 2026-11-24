import logo from './logo.json'

/**
 * The authentic Insinööritoimisto KJ Oy logo (instokj.fi, instokj_logo2_bk.svg) – paths unmodified.
 * `ring` = circle with ground line and diagonal (even-odd fill), `monogram` = KJ gable monogram.
 */
export const logoPaths = logo

interface Props {
  className?: string
  /** Monogram only (as in the original site header) */
  monogramOnly?: boolean
  title?: string
}

export function Logo({ className = '', monogramOnly = false, title }: Props) {
  return (
    <svg
      viewBox={monogramOnly ? '180 188 450 625' : logo.viewBox}
      className={className}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {!monogramOnly && <path d={logo.ring} fillRule="evenodd" />}
      <path d={logo.monogram} />
    </svg>
  )
}
