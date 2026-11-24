import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SectionHead } from '../ui/SectionMark'
import { requestHref } from '../../data/nav'
import type { TopicId } from '../../data/services'
import { track } from '../../lib/analytics'

interface Zone {
  id: string
  n: number
  zone: string
  service: string
  text: string
  price: string
  priceNote: string
  to: string
  topic: TopicId
  spot: [number, number]
}

/** Each zone maps a part of a building or site to the matching service. Texts and prices: instokj.fi. */
const zones: Zone[] = [
  {
    id: 'rakennus',
    n: 1,
    zone: 'Koko rakennus',
    service: 'Asuntokaupan kuntotarkastus',
    text: 'Aistienvarainen ja rakennetta rikkomaton tarkastus KH 90-00394 -ohjeen mukaan: rakennustekninen kunto, korjaustarpeet sekä vaurio-, käyttöturvallisuus- ja terveysriskit.',
    price: '900–1 000 €',
    priceNote: 'rakennusvuoden mukaan · sis. alv 25,5 %',
    to: '/palvelut/kuntotarkastus',
    topic: 'kuntotarkastus',
    spot: [420, 222],
  },
  {
    id: 'markatila',
    n: 2,
    zone: 'Märkätilat',
    service: 'Kosteusmittaus',
    text: 'Mittaamme kaikki vesipisteelliset tilat. Usein ensimmäinen tutkimus on pintakosteusmittaus – teemme niitä myös asuntokauppaa varten.',
    price: '200 € / 300 €',
    priceNote: 'huoneisto / pientalo · sis. alv 25,5 %',
    to: '/palvelut/kosteusmittaus',
    topic: 'kosteusmittaus',
    spot: [543, 392],
  },
  {
    id: 'seina',
    n: 3,
    zone: 'Rakenteet',
    service: 'Kuntotutkimus',
    text: 'Kun epäillään kosteus- tai mikrobivauriota, rakenneavauksin selvitetään todellinen rakenne, sen kunto ja vaurion laajuus – tarvittaessa näytteitä ottaen.',
    price: '1 500–2 000 €',
    priceNote: 'hintaluokka pientalolle · sis. alv 25,5 %',
    to: '/palvelut/kuntotutkimus',
    topic: 'kuntotutkimus',
    spot: [212, 428],
  },
  {
    id: 'laatta',
    n: 4,
    zone: 'Maanvarainen betonilaatta',
    service: 'Betonin kosteusmittaus',
    text: 'Betonin suhteellinen kosteus RT 14-10984 -kortin mukaan. Tulosta voidaan käyttää betonilaatan päällystettävyyden arviointiin.',
    price: '250 €',
    priceNote: 'kolme mittauspistettä · sis. alv 25,5 %',
    to: '/palvelut/kosteusmittaus',
    topic: 'betonin-kosteusmittaus',
    spot: [340, 481],
  },
  {
    id: 'tyomaa',
    n: 5,
    zone: 'Työmaa',
    service: 'Vastaava työnjohtaja ja valvonta',
    text: 'Rakennusluvalliselle hankkeelle on nimettävä vastaava työnjohtaja: työmaan asiakirjat, huoltokirja, katselmukset, viranomaisyhteistyö ja työturvallisuus.',
    price: 'Tapauskohtainen',
    priceNote: 'sovitaan hankkeen mukaan',
    to: '/palvelut/vastaava-tyonjohtaja',
    topic: 'vastaava-tyonjohtaja',
    spot: [762, 318],
  },
  {
    id: 'koekappale',
    n: 6,
    zone: 'Betonin lujuus',
    service: 'Betonitestaus laboratoriossa',
    text: 'Puristuslujuus akkreditoidulla menetelmällä SFS-EN 12390-3 testauslaboratoriossa T359. Tulokset yleensä seuraavana arkipäivänä testauksesta.',
    price: '50 €',
    priceNote: 'puristuslujuus · alv 0 %',
    to: '/laboratorio',
    topic: 'laboratorio',
    spot: [915, 372],
  },
]

const L = (d: number) => ({ '--d': `${d}ms` }) as React.CSSProperties

function Bubble({ n, active }: { n: number; active: boolean }) {
  return (
    <span
      className={`grid size-8 shrink-0 place-items-center rounded-full border-[1.5px] border-ink font-[family-name:var(--font-mono)] text-[0.8rem] font-semibold transition-colors ${
        active ? 'bg-orange text-ink' : 'bg-sheet text-ink'
      }`}
      aria-hidden="true"
    >
      {n}
    </span>
  )
}

export function HouseSection() {
  const [active, setActive] = useState(zones[0].id)
  const z = zones.find((x) => x.id === active) ?? zones[0]
  const pick = (id: string, via: string) => {
    setActive(id)
    track('service_interest', { service: id, location: `home_section_${via}` })
  }

  return (
    <section className="grid-paper border-y border-ink/15 py-20 sm:py-24 lg:py-28" aria-labelledby="leikkaus-title">
      <div className="wrap">
        <SectionHead
          letter="B"
          sheet="03"
          kicker="Leikkaus A–A · valitse kohta"
          id="leikkaus-title"
          title="Mistä haluat varmuuden?"
          intro="Valitse rakennuksen tai työmaan kohta – näet, mikä palvelu siihen sopii, mitä se maksaa ja miten pääset alkuun."
        />

        <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          {/* Drawing (pointer shortcut – the button list below is the accessible control) */}
          <div className="relative border-[1.5px] border-ink bg-sheet lg:col-span-8" data-draw>
            <div className="flex items-center justify-between border-b-[1.5px] border-ink px-4 py-2">
              <p className="label text-steel">Havainnekuva · Leikkaus A–A</p>
              <p className="label text-rust">Lehti 03</p>
            </div>
            <svg viewBox="128 56 872 492" className="block h-auto w-full" aria-hidden="true" focusable="false">
              <defs>
                <pattern id="hs-concrete" width="26" height="26" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="6" r="1.3" fill="#141516" fillOpacity=".55" />
                  <circle cx="17" cy="15" r="1" fill="#141516" fillOpacity=".45" />
                  <path d="M10 20l3 -4 3 4z" fill="none" stroke="#141516" strokeOpacity=".45" strokeWidth=".9" />
                  <circle cx="22" cy="4" r=".8" fill="#141516" fillOpacity=".4" />
                </pattern>
                <pattern id="hs-soil" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="16" stroke="#141516" strokeOpacity=".16" strokeWidth="1.2" />
                </pattern>
              </defs>

              {/* Soil */}
              <rect className="draw-fade" style={L(300)} x="0" y="471" width="1000" height="149" fill="url(#hs-soil)" />

              {/* Zones (highlight) */}
              <g fill="var(--color-orange)" fillOpacity=".09" stroke="var(--color-orange)" strokeWidth="2.4" strokeDasharray="8 6">
                <polygon className={`hs-zone ${active === 'rakennus' ? 'is-active' : ''}`} points="160,318 420,104 680,318 640,318 640,470 200,470 200,318" />
                <rect className={`hs-zone ${active === 'markatila' ? 'is-active' : ''}`} x="474" y="302" width="139" height="166" />
                <rect className={`hs-zone ${active === 'seina' ? 'is-active' : ''}`} x="192" y="398" width="42" height="60" />
                <rect className={`hs-zone ${active === 'laatta' ? 'is-active' : ''}`} x="228" y="470" width="384" height="22" />
                <rect className={`hs-zone ${active === 'tyomaa' ? 'is-active' : ''}`} x="700" y="80" width="290" height="390" />
                <rect className={`hs-zone ${active === 'koekappale' ? 'is-active' : ''}`} x="890" y="398" width="52" height="76" />
              </g>

              {/* Footings + slab (concrete) */}
              <g stroke="#141516" strokeWidth="1.6">
                <rect className="draw" style={L(200)} pathLength={1} x="182" y="470" width="58" height="72" fill="url(#hs-concrete)" />
                <rect className="draw" style={L(260)} pathLength={1} x="600" y="470" width="58" height="72" fill="url(#hs-concrete)" />
                <rect className="draw" style={L(320)} pathLength={1} x="240" y="470" width="360" height="20" fill="url(#hs-concrete)" />
              </g>
              <path className="draw-fade" style={L(600)} d="M240 497 H600" stroke="#141516" strokeWidth="1" strokeDasharray="10 5" fill="none" />
              <text className="hidden sm:inline" x="250" y="516" fill="#5d6166" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em' }}>
                MAANVARAINEN BETONILAATTA
              </text>

              {/* Walls */}
              <g fill="none" stroke="#141516" strokeWidth="2.2">
                <path className="draw" style={L(0)} pathLength={1} d="M200 470 V316 M226 470 V300" />
                <path className="draw" style={L(80)} pathLength={1} d="M640 470 V316 M614 470 V300" />
                <path className="draw" style={L(160)} pathLength={1} d="M226 300 H614 M226 292 H614" />
                <path className="draw" style={L(220)} pathLength={1} d="M472 470 V300 M478 470 V300" />
              </g>
              {/* Insulation zigzags */}
              <path
                className="draw-fade"
                style={L(700)}
                d="M205 320 l10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8"
                fill="none"
                stroke="#141516"
                strokeOpacity=".5"
                strokeWidth="1"
              />
              <path
                className="draw-fade"
                style={L(750)}
                d="M232 288 l8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10 8 -10 8 10"
                fill="none"
                stroke="#141516"
                strokeOpacity=".4"
                strokeWidth="1"
              />
              {/* Window */}
              <rect className="draw-fade" style={L(500)} x="200" y="336" width="26" height="54" fill="#fbfaf7" stroke="#141516" strokeWidth="1.4" />
              <line className="draw-fade" style={L(500)} x1="213" y1="336" x2="213" y2="390" stroke="#141516" strokeWidth="1" />
              {/* Structural opening (rakenneavaus) */}
              <rect className="draw-fade" style={L(900)} x="196" y="404" width="34" height="48" fill="#fbfaf7" stroke="var(--color-rust)" strokeWidth="1.6" strokeDasharray="5 4" />
              <path className="draw-fade" style={L(950)} d="M203 410 l8 6 -8 6 8 6 -8 6 8 6 -8 6" fill="none" stroke="var(--color-rust)" strokeWidth="1.2" />

              {/* Roof, trusses, chimney */}
              <g fill="none" stroke="#141516" strokeLinejoin="miter">
                <path className="draw" style={L(300)} pathLength={1} d="M160 318 L420 104 L680 318" strokeWidth="2.6" />
                <path className="draw" style={L(380)} pathLength={1} d="M184 318 L420 124 L656 318" strokeWidth="1.4" />
                <path className="draw" style={L(520)} pathLength={1} d="M420 124 V292 M420 292 L318 208 M420 292 L522 208" strokeWidth="1.2" />
                <path className="draw" style={L(560)} pathLength={1} d="M508 176 V138 H538 V200" strokeWidth="1.8" />
              </g>
              <text className="hidden sm:inline" x="434" y="270" fill="#5d6166" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em' }}>
                YLÄPOHJA
              </text>

              {/* Wet room: tiles, shower, drain */}
              <g className="draw-fade" style={L(800)} stroke="#141516" strokeOpacity=".35" strokeWidth=".8">
                {Array.from({ length: 8 }, (_, i) => (
                  <line key={`h${i}`} x1="486" y1={352 + i * 14} x2="606" y2={352 + i * 14} />
                ))}
                {Array.from({ length: 9 }, (_, i) => (
                  <line key={`v${i}`} x1={486 + i * 15} y1="352" x2={486 + i * 15} y2="466" />
                ))}
              </g>
              <g className="draw-fade" style={L(850)} stroke="#141516" strokeWidth="1.6" fill="none">
                <path d="M596 312 V336 h-14" />
                <path d="M578 332 h10 l-3 8 h-4z" fill="#141516" />
                <path d="M522 470 l20 -4 20 4" strokeWidth="1.2" />
                <rect x="534" y="464" width="16" height="5" fill="#141516" />
              </g>
              <text className="hidden sm:inline" x="486" y="342" fill="#5d6166" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em' }}>
                MÄRKÄTILA
              </text>

              {/* Ground line – as in the logo */}
              <line className="draw" style={L(0)} pathLength={1} x1="0" y1="470" x2="1000" y2="470" stroke="#141516" strokeWidth="2.6" />

              {/* Site: tower crane, formwork, test cylinder */}
              <g fill="none" stroke="#141516" strokeWidth="1.6">
                <path className="draw" style={L(400)} pathLength={1} d="M862 470 V94 M874 470 V94" />
                <path
                  className="draw"
                  style={L(520)}
                  pathLength={1}
                  d="M862 450 L874 430 L862 410 L874 390 L862 370 L874 350 L862 330 L874 310 L862 290 L874 270 L862 250 L874 230 L862 210 L874 190 L862 170 L874 150 L862 130 L874 110"
                  strokeWidth="1"
                />
                <path className="draw" style={L(600)} pathLength={1} d="M706 94 H990 M706 106 H990 M868 94 L868 70 L706 94 M868 70 L990 94" />
                <rect className="draw" style={L(700)} pathLength={1} x="958" y="106" width="28" height="26" fill="#141516" fillOpacity=".75" />
                <path className="draw" style={L(760)} pathLength={1} d="M762 106 V250" strokeWidth="1.2" />
                <path className="draw" style={L(820)} pathLength={1} d="M754 250 h16 l-8 10z M736 262 h52 v40 h-52z" strokeWidth="1.4" />
                <path className="draw" style={L(700)} pathLength={1} d="M716 470 V438 M716 438 H812 M812 470 V438 M722 470 V444 M806 470 V444" strokeWidth="1.8" />
              </g>
              <rect className="draw-fade" style={L(900)} x="722" y="444" width="84" height="26" fill="url(#hs-concrete)" />
              <text className="hidden sm:inline" x="712" y="426" fill="#5d6166" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em' }}>
                TYÖMAA
              </text>
              {/* Test cylinder with dimension lines */}
              <g>
                <rect className="draw" style={L(900)} pathLength={1} x="900" y="410" width="30" height="60" fill="url(#hs-concrete)" stroke="#141516" strokeWidth="1.6" />
                <g className="draw-fade" style={L(1100)} stroke="var(--color-rust)" strokeWidth="1.2" fill="none">
                  <path d="M944 410 V470 M938 410 h12 M938 470 h12" />
                  <path d="M900 488 H930 M900 482 v12 M930 482 v12" />
                </g>
                <text className="hidden sm:inline" x="954" y="445" fill="var(--color-rust)" style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                  300
                </text>
                <text className="hidden sm:inline" x="898" y="510" fill="var(--color-rust)" style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                  Ø150
                </text>
              </g>

              {/* Hotspots */}
              {zones.map((zz) => {
                const on = zz.id === active
                return (
                  <g key={zz.id} className="hs-spot" onClick={() => pick(zz.id, 'drawing')}>
                    {zz.n === 1 && <circle className="hs-ping" cx={zz.spot[0]} cy={zz.spot[1]} r="22" fill="none" stroke="var(--color-orange)" strokeWidth="2" />}
                    <circle className="hs-ring" cx={zz.spot[0]} cy={zz.spot[1]} r={on ? 22 : 19} fill={on ? 'var(--color-orange)' : '#fbfaf7'} stroke="#141516" strokeWidth="2" />
                    <line x1={zz.spot[0] - (on ? 22 : 19)} y1={zz.spot[1] + 1} x2={zz.spot[0] + (on ? 22 : 19)} y2={zz.spot[1] + 1} stroke="#141516" strokeWidth="1" strokeOpacity=".35" />
                    <text
                      x={zz.spot[0]}
                      y={zz.spot[1] + 6}
                      textAnchor="middle"
                      fill="#141516"
                      style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 17, pointerEvents: 'none' }}
                    >
                      {zz.n}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Accessible control + result panel */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <div role="group" aria-label="Valitse rakennuksen tai työmaan kohta" className="grid grid-cols-2 gap-2">
              {zones.map((zz) => {
                const on = zz.id === active
                return (
                  <button
                    key={zz.id}
                    type="button"
                    aria-pressed={on}
                    aria-controls="leikkaus-paneeli"
                    onClick={() => pick(zz.id, 'list')}
                    className={`flex min-h-[3.25rem] items-center gap-2.5 border-[1.5px] px-2.5 py-2 text-left text-[0.92rem] font-semibold leading-tight transition-colors ${
                      on ? 'border-ink bg-ink text-paper' : 'border-ink/25 bg-sheet hover:border-ink'
                    }`}
                  >
                    <Bubble n={zz.n} active={on} />
                    {zz.zone}
                  </button>
                )
              })}
            </div>

            <div id="leikkaus-paneeli" aria-live="polite" className="on-dark flex flex-1 flex-col bg-ink p-6 text-paper sm:p-8">
              <p className="label text-orange-2">
                {z.n} · {z.zone}
              </p>
              <h3 className="display-m mt-3">{z.service}</h3>
              <p className="mt-3 text-paper/80">{z.text}</p>
              <div className="mt-6 flex items-end justify-between gap-4 border-t border-white/20 pt-5">
                <div>
                  <p className="num text-[1.9rem] font-semibold leading-none text-orange-2">{z.price}</p>
                  <p className="mt-2 text-[0.86rem] text-mist">{z.priceNote}</p>
                </div>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link to={requestHref(z.topic)} className="btn btn--primary" onClick={() => track('cta_click', { location: 'home_section', topic: z.topic })}>
                  Pyydä tarjous
                  <ArrowRight className="btn__arrow" aria-hidden="true" />
                </Link>
                <Link to={z.to} className="dimlink text-paper">
                  <span className="dimlink__line" aria-hidden="true" />
                  Lue lisää<span className="sr-only">: {z.service}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
