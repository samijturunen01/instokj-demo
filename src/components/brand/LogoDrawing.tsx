import { useId } from 'react'
import { logoPaths } from './Logo'

/**
 * Signature intro "Mittapiirros" – the KJ logo is drafted and cast like a structure:
 * construction lines and a centre mark appear, a compass draws the circle, the ground line
 * and diagonal are ruled in, the monogram's formwork is outlined and concrete "pours" into it
 * from the bottom. Then the guides lift away and the original logo remains.
 *
 * The visible artwork is always the ORIGINAL logo paths – the animation only reveals them
 * through masks, so the final frame is identical to the authentic logo. Pure CSS
 * (html.intro, see index.css): it starts before JavaScript loads, never blocks the page and is
 * skipped entirely with reduced motion or on in-app navigation.
 */
export function LogoDrawing({ className = '' }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const ringMask = `ld-ring-${uid}`
  const monoMask = `ld-mono-${uid}`
  // Geometry in the logo's own units (viewBox 1.06 5.06 912.9 912.9): centre 457.5 / 461.5, r ≈ 453,
  // ground line y ≈ 619.5, diagonal at 45° through (344, 616).
  return (
    <svg
      viewBox="-100 -50 1115 1015"
      className={`logo-draw overflow-visible ${className}`}
      role="img"
      aria-label="Insinööritoimisto KJ Oy:n logo"
      focusable="false"
    >
      <defs>
        <mask id={ringMask} maskUnits="userSpaceOnUse" x="-100" y="-50" width="1115" height="1015">
          <circle
            className="ld-mask-stroke ld-ring-stroke"
            cx="457.5"
            cy="461.5"
            r="453"
            transform="rotate(-90 457.5 461.5)"
            pathLength={1}
            fill="none"
            stroke="#fff"
            strokeWidth="28"
          />
          <line
            className="ld-mask-stroke ld-line-stroke"
            style={{ '--d': '0.75s' } as React.CSSProperties}
            x1="20"
            y1="619.5"
            x2="895"
            y2="619.5"
            pathLength={1}
            stroke="#fff"
            strokeWidth="28"
          />
          <line
            className="ld-mask-stroke ld-line-stroke"
            style={{ '--d': '0.9s' } as React.CSSProperties}
            x1="20"
            y1="292"
            x2="625"
            y2="897"
            pathLength={1}
            stroke="#fff"
            strokeWidth="28"
          />
        </mask>
        <mask id={monoMask} maskUnits="userSpaceOnUse" x="-100" y="-50" width="1115" height="1015">
          <rect className="ld-pour" x="170" y="180" width="470" height="640" fill="#fff" />
        </mask>
      </defs>

      {/* Construction guides (orange) – visible only during the intro */}
      <g className="text-orange" stroke="currentColor" strokeWidth="7" fill="none" aria-hidden="true">
        <line className="ld-guide" style={{ '--d': '0s' } as React.CSSProperties} x1="-90" y1="619.5" x2="1005" y2="619.5" pathLength={1} />
        <line className="ld-guide" style={{ '--d': '0.12s' } as React.CSSProperties} x1="-62" y1="210" x2="690" y2="962" pathLength={1} />
        <line className="ld-guide" style={{ '--d': '0.22s' } as React.CSSProperties} x1="457.5" y1="-40" x2="457.5" y2="960" pathLength={1} />
        <g className="ld-centre">
          <circle cx="457.5" cy="461.5" r="22" />
          <line x1="417.5" y1="461.5" x2="497.5" y2="461.5" />
          <circle cx="457.5" cy="461.5" r="453" strokeDasharray="14 22" strokeWidth="5" />
        </g>
        <path className="ld-form" d={logoPaths.monogram} pathLength={1} strokeWidth="9" strokeLinejoin="miter" />
      </g>

      {/* The original logo artwork */}
      <path d={logoPaths.ring} fillRule="evenodd" fill="currentColor" mask={`url(#${ringMask})`} />
      <path d={logoPaths.monogram} fill="currentColor" mask={`url(#${monoMask})`} />
    </svg>
  )
}
