import { useState } from 'react'
import { ExternalLink, MapPin, Navigation } from 'lucide-react'
import { company } from '../../data/company'
import { track } from '../../lib/analytics'

/**
 * Privacy-conscious Google Maps embed: nothing is loaded from Google until the visitor asks
 * for the map. No API key. The placeholder is a drawing-style location plan, not a map.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false)
  const lat = company.geo.lat.toFixed(4).replace('.', ',')
  const lon = company.geo.lon.toFixed(4).replace('.', ',')
  return (
    <div className="grid border-[1.5px] border-ink bg-ink lg:grid-cols-[1.55fr_1fr]">
      <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[30rem]">
        {loaded ? (
          <iframe
            title={`Kartta: ${company.name}, ${company.address.street}, ${company.address.city}`}
            src={company.mapEmbedUrl}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="grid-paper absolute inset-0 grid place-items-center overflow-hidden">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <g stroke="#141516" strokeOpacity=".22" fill="none">
                <circle cx="400" cy="250" r="90" strokeDasharray="6 8" />
                <circle cx="400" cy="250" r="190" strokeDasharray="6 8" />
                <line x1="0" y1="250" x2="800" y2="250" />
                <line x1="400" y1="0" x2="400" y2="500" />
              </g>
              <g stroke="#f46b36" strokeWidth="2" fill="none">
                <circle cx="400" cy="250" r="14" />
                <line x1="372" y1="250" x2="428" y2="250" />
                <line x1="400" y1="222" x2="400" y2="278" />
              </g>
              <text x="412" y="238" fill="#5d6166" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.08em' }}>
                {lat}° N · {lon}° E
              </text>
            </svg>
            <div className="relative flex flex-col items-center gap-4 bg-paper/85 px-6 py-6 text-center backdrop-blur-[2px]">
              <span className="grid size-12 place-items-center rounded-full bg-orange text-ink">
                <MapPin className="size-6" aria-hidden="true" />
              </span>
              <p className="font-[family-name:var(--font-display)] text-[1.7rem] font-extrabold leading-none">
                {company.address.street}, {company.address.city}
              </p>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => {
                  setLoaded(true)
                  track('map_load', { location: 'contact' })
                }}
              >
                Näytä kartta
              </button>
              <p className="max-w-sm text-[0.88rem] text-steel">Kartta ladataan Googlelta vasta, kun valitset ”Näytä kartta”.</p>
            </div>
          </div>
        )}
      </div>
      <div className="on-dark flex flex-col gap-5 p-7 text-paper sm:p-9">
        <p className="label text-mist">Toimisto ja laboratorio</p>
        <address className="not-italic">
          <span className="block font-[family-name:var(--font-display)] text-4xl font-extrabold leading-none">{company.address.street}</span>
          <span className="mt-2 block text-xl">
            {company.address.postalCode} {company.address.city}
          </span>
        </address>
        <p className="text-paper/80">
          Samassa osoitteessa toimivat insinööritoimisto ja testauslaboratorio {company.accreditation.id}. {company.serviceDays}.
        </p>
        <div className="mt-auto grid gap-3">
          <a
            href={company.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary w-full"
            onClick={() => track('directions_click', { location: 'contact_map' })}
          >
            <Navigation aria-hidden="true" />
            Katso reittiohjeet
            <span className="sr-only">(avautuu uuteen välilehteen)</span>
          </a>
          <a
            href={company.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost w-full"
            onClick={() => track('directions_click', { location: 'contact_map_open' })}
          >
            <ExternalLink aria-hidden="true" />
            Avaa Google Mapsissa
            <span className="sr-only">(avautuu uuteen välilehteen)</span>
          </a>
        </div>
      </div>
    </div>
  )
}
