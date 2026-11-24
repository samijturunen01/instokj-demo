const L = (d: number) => ({ '--d': `${d}ms` }) as React.CSSProperties

/**
 * Schematic of a cylinder compression test (SFS-EN 12390-3). Illustration only – not a picture of
 * the company's equipment. Lines draw in when scrolled into view; the hourglass fracture appears last.
 */
export function PressIllustration({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  const ink = dark ? '#f2f1ec' : '#141516'
  const accent = dark ? 'var(--color-orange-2)' : 'var(--color-rust)'
  const muted = dark ? '#a7a9ac' : '#5d6166'
  return (
    <figure className={className} data-draw>
      <svg viewBox="0 0 420 540" className="block h-auto w-full" role="img" aria-label="Havainnekuva: betonin lieriökoekappale puristuskokeessa puristimen levyjen välissä">
        <defs>
          <pattern id={`pc-${dark ? 'd' : 'l'}`} width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="5" r="1.2" fill={ink} fillOpacity=".5" />
            <circle cx="15" cy="13" r=".9" fill={ink} fillOpacity=".4" />
            <path d="M8 18l3 -4 3 4z" fill="none" stroke={ink} strokeOpacity=".4" strokeWidth=".8" />
          </pattern>
        </defs>
        <g fill="none" stroke={ink} strokeWidth="2">
          {/* frame */}
          <path className="draw" style={L(0)} pathLength={1} d="M44 40 H376 V92 H44 Z" />
          <path className="draw" style={L(120)} pathLength={1} d="M58 92 V470 M76 92 V470 M344 92 V470 M362 92 V470" />
          <path className="draw" style={L(200)} pathLength={1} d="M44 470 H376 V514 H44 Z" />
          {/* piston + platens */}
          <path className="draw" style={L(320)} pathLength={1} d="M190 92 V208 M230 92 V208" />
          <path className="draw" style={L(380)} pathLength={1} d="M146 208 H274 V228 H146 Z" />
          <path className="draw" style={L(420)} pathLength={1} d="M146 432 H274 V452 H146 Z M176 452 V470 M244 452 V470" />
        </g>
        {/* specimen */}
        <rect className="draw" style={L(520)} pathLength={1} x="160" y="228" width="100" height="204" fill={`url(#pc-${dark ? 'd' : 'l'})`} stroke={ink} strokeWidth="2.2" />
        {/* hourglass fracture */}
        <g className="draw-fade" style={L(1500)} fill="none" stroke={accent} strokeWidth="2.2" strokeLinejoin="bevel">
          <path d="M162 234 L184 280 L196 330 L186 380 L162 426" />
          <path d="M258 234 L238 282 L224 330 L236 378 L258 426" />
          <path d="M196 330 L210 318 L224 330" strokeWidth="1.4" />
        </g>
        {/* load arrows */}
        <g className="draw-fade" style={L(1100)} stroke={accent} strokeWidth="2" fill={accent}>
          <line x1="300" y1="150" x2="300" y2="196" />
          <path d="M292 192 L300 206 L308 192 Z" />
        </g>
        <text className="draw-fade" style={{ ...L(1100), fontFamily: 'var(--font-mono)', fontSize: 16 }} x="312" y="176" fill={accent}>
          F
        </text>
        {/* dimensions */}
        <g className="draw-fade" style={L(900)} stroke={muted} strokeWidth="1.2" fill="none">
          <path d="M118 228 V432 M110 228 H126 M110 432 H126" />
        </g>
        <text
          className="draw-fade"
          style={{ ...L(900), fontFamily: 'var(--font-mono)', fontSize: 13 }}
          x="104"
          y="338"
          fill={muted}
          transform="rotate(-90 104 338)"
          textAnchor="middle"
        >
          300 mm
        </text>
        <text className="draw-fade" style={{ ...L(950), fontFamily: 'var(--font-mono)', fontSize: 13 }} x="210" y="250" textAnchor="middle" fill={ink}>
          Ø 150
        </text>
        <text style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em' }} x="210" y="72" textAnchor="middle" fill={muted}>
          PURISTUSKOE
        </text>
      </svg>
      <figcaption className={`label mt-3 ${dark ? 'text-mist' : 'text-steel'}`}>Havainnekuva: lieriökoekappale (Ø150 × 300 mm) puristuskokeessa</figcaption>
    </figure>
  )
}
