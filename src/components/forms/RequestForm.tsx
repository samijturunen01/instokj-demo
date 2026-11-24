import { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AlertCircle, CheckCircle2, FileDown, Info, Loader2, Plus, Trash2 } from 'lucide-react'
import { company } from '../../data/company'
import { topics, type TopicId } from '../../data/services'
import { euro, inspectionPriceFor, labPrices, servicePrices } from '../../data/prices'
import { emptyRequest, newSpecimen, type FieldErrors, type FieldKey, type QuoteRequest, type Specimen } from '../../lib/forms/types'
import { needsDescription, testDate, validate } from '../../lib/forms/validate'
import { getFormAdapter, isDemoMode } from '../../lib/forms/submit'
import { asset } from '../../lib/asset'
import { track } from '../../lib/analytics'
import { useIsClient } from '../../hooks/useIsClient'

const order: FieldKey[] = ['topic', 'buildYear', 'points', 'specimens', 'message', 'name', 'contact', 'phone', 'email']
const focusName: Partial<Record<FieldKey, string>> = { contact: 'phone' }
const isTopic = (v: string | null): v is TopicId => !!v && topics.some((t) => t.id === v)

const messageLabel: Record<TopicId, string> = {
  kuntotarkastus: 'Lisätiedot',
  kuntotutkimus: 'Mitä epäilette ja missä?',
  kosteusmittaus: 'Lisätiedot',
  'betonin-kosteusmittaus': 'Lisätiedot',
  'vastaava-tyonjohtaja': 'Kerro hankkeesta',
  laboratorio: 'Lisätiedot',
  muu: 'Viesti',
}
const messageHint: Partial<Record<TopicId, string>> = {
  kuntotarkastus: 'Esim. talotyyppi, kerrosala tai kiinteistönvälittäjän yhteystiedot.',
  kuntotutkimus: 'Esim. havaittu haju, kosteusjälki tai rakenne, josta olette huolissanne.',
  'betonin-kosteusmittaus': 'Esim. laatan pinta-ala ja tuleva päällyste.',
  'vastaava-tyonjohtaja': 'Esim. omakotitalon uudisrakennus, luvan tilanne ja arvioitu aloitus. Kerro myös, jos tarvitset valvontaa.',
  laboratorio: 'Esim. koekappaleiden toimitus tai muottien tarve.',
}
const locationLabel: Partial<Record<TopicId, string>> = {
  kuntotarkastus: 'Kohteen osoite tai paikkakunta',
  kuntotutkimus: 'Kohteen osoite tai paikkakunta',
  kosteusmittaus: 'Kohteen osoite tai paikkakunta',
  'betonin-kosteusmittaus': 'Kohteen osoite tai paikkakunta',
  'vastaava-tyonjohtaja': 'Rakennuspaikka (paikkakunta)',
  laboratorio: 'Näytteenottopaikka',
}

/** Price from the published price list for the current selection – null when it depends on the case. */
function priceHint(d: QuoteRequest): { value: string; note: string } | null {
  if (d.topic === 'kuntotarkastus') {
    const y = Number(d.buildYear)
    if (/^\d{4}$/.test(d.buildYear) && y >= 1700 && y <= new Date().getFullYear()) {
      const r = inspectionPriceFor(y)
      if (r.amount && !Array.isArray(r.amount)) return { value: euro(r.amount.gross), note: `${r.label.toLowerCase()} · sis. alv 25,5 %` }
    }
    return { value: '900–1 000 €', note: 'rakennusvuoden mukaan · sis. alv 25,5 %' }
  }
  if (d.topic === 'kosteusmittaus') {
    const rows = servicePrices.find((g) => g.id === 'kosteusmittaus')!.rows
    const r = d.propertyType === 'huoneisto' ? rows[0] : d.propertyType === 'pientalo' ? rows[1] : null
    if (r?.amount && !Array.isArray(r.amount)) return { value: euro(r.amount.gross), note: `${r.label.toLowerCase()}, kaikki vesipisteelliset tilat · sis. alv 25,5 %` }
    return { value: '200 € / 300 €', note: 'huoneisto / pientalo · sis. alv 25,5 %' }
  }
  if (d.topic === 'betonin-kosteusmittaus') {
    const p = Number(d.points)
    if (d.points && p > 3) return { value: 'Tapauskohtainen', note: 'suuremmat kokonaisuudet sovitaan erikseen' }
    return { value: '250 €', note: 'kolme mittauspistettä · sis. alv 25,5 %' }
  }
  if (d.topic === 'kuntotutkimus') return { value: '1 500–2 000 €', note: 'hintaluokka pientalolle · sis. alv 25,5 %' }
  if (d.topic === 'laboratorio') {
    const r = labPrices.rows[0]
    return { value: `${euro((r.amount as { net: number }).net)}`, note: 'puristuslujuus SFS-EN 12390-3 · alv 0 %' }
  }
  if (d.topic === 'vastaava-tyonjohtaja') return { value: 'Tapauskohtainen', note: 'sovitaan hankkeen mukaan' }
  return null
}

/**
 * Quote request / order ("tarjouspyyntö"). Pre-selection comes from ?palvelu=…&vuosi=… (applied after
 * hydration so the prerendered HTML matches). Delivery is delegated to lib/forms/submit –
 * in the demo nothing leaves the browser and nothing is stored.
 */
export function RequestForm() {
  const client = useIsClient()
  const { search } = useLocation()
  const [data, setData] = useState<QuoteRequest>(() => emptyRequest())
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const started = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)

  // Apply URL pre-selection once per distinct query (adjust-state-during-render pattern).
  const query = client ? search : ''
  const [appliedQuery, setAppliedQuery] = useState('')
  if (query !== appliedQuery) {
    setAppliedQuery(query)
    const p = new URLSearchParams(query)
    const topic = p.get('palvelu')
    const year = p.get('vuosi')
    if (isTopic(topic)) {
      setData((d) => ({
        ...d,
        topic,
        buildYear: topic === 'kuntotarkastus' && year && /^\d{4}$/.test(year) ? year : d.buildYear,
        specimens: topic === 'laboratorio' && d.specimens.length === 0 ? [newSpecimen()] : d.specimens,
      }))
    }
  }

  const touch = () => {
    if (!started.current) {
      started.current = true
      track('form_start', { form: 'tarjouspyynto' })
    }
    if (status !== 'idle' && status !== 'sending') setStatus('idle')
  }
  const set = <K extends keyof QuoteRequest>(key: K, value: QuoteRequest[K]) => {
    touch()
    setData((d) => ({ ...d, [key]: value }))
    const clear: FieldKey[] = key === 'phone' || key === 'email' ? [key, 'contact'] : [key as FieldKey]
    if (clear.some((k) => errors[k])) setErrors((e) => ({ ...e, ...Object.fromEntries(clear.map((k) => [k, undefined])) }))
  }
  const setTopic = (t: TopicId) => {
    touch()
    setData((d) => ({ ...d, topic: t, specimens: t === 'laboratorio' && d.specimens.length === 0 ? [newSpecimen()] : d.specimens }))
    setErrors((e) => ({ ...e, topic: undefined, message: undefined }))
  }
  const setSpecimen = (key: string, patch: Partial<Specimen>) => {
    touch()
    setData((d) => ({ ...d, specimens: d.specimens.map((s) => (s.key === key ? { ...s, ...patch } : s)) }))
    if (errors.specimens) setErrors((e) => ({ ...e, specimens: undefined }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (data.website) return // honeypot
    const found = validate(data)
    setErrors(found)
    const first = order.find((k) => found[k])
    if (first) {
      track('form_validation_error', { field: first })
      const name = focusName[first] ?? first
      formRef.current?.querySelector<HTMLElement>(`[name="${name}"]`)?.focus()
      return
    }
    setStatus('sending')
    try {
      const res = await getFormAdapter().submit(data)
      setStatus('done')
      setMessage(res.message)
      track('form_submit_success', { topic: data.topic, demo: res.demo })
    } catch {
      setStatus('error')
      setMessage(`Lähetys ei onnistunut. Soita ${company.phone.display} tai lähetä sähköpostia ${company.email.office}.`)
    }
  }

  const err = (k: FieldKey) =>
    errors[k] ? (
      <p id={`${k}-virhe`} className="field-error">
        <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        {errors[k]}
      </p>
    ) : null
  const aria = (k: FieldKey, hint?: string, alsoError?: FieldKey) => {
    const describedBy = [errors[k] ? `${k}-virhe` : '', alsoError && errors[alsoError] ? `${alsoError}-virhe` : '', hint ?? ''].filter(Boolean).join(' ')
    return {
      'aria-invalid': errors[k] || (alsoError && errors[alsoError]) ? (true as const) : undefined,
      'aria-describedby': describedBy || undefined,
    }
  }

  const t = data.topic
  const descRequired = needsDescription(t)
  const price = priceHint(data)
  const errorCount = Object.values(errors).filter(Boolean).length
  const topicLabel = topics.find((x) => x.id === t)?.label

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
      <form ref={formRef} noValidate onSubmit={onSubmit} className="relative grid gap-8 lg:col-span-8" aria-labelledby="tarjouspyynto-title">
        <div>
          <p className="label text-rust">Lomake · vastaa muutamaan kysymykseen</p>
          <h2 id="tarjouspyynto-title" className="display-l mt-3">
            Tarjouspyyntö ja tilaus
          </h2>
          <p className="mt-4 max-w-2xl text-graphite">
            Valitse palvelu, niin lomake kysyy vain siihen tarvittavat tiedot. Pakolliset kentät on merkitty tähdellä (*).
          </p>
          {isDemoMode() && (
            <p className="mt-5 flex gap-3 border-[1.5px] border-ink/25 bg-paper-2 p-4 text-[0.95rem]">
              <Info className="mt-0.5 size-5 shrink-0 text-rust" aria-hidden="true" />
              <span>
                <strong>Konseptidemo:</strong> lomake ei lähetä eikä tallenna tietoja. Ota yhteyttä suoraan:{' '}
                <a href={company.phone.href} className="link">
                  {company.phone.display}
                </a>{' '}
                tai{' '}
                <a href={`mailto:${company.email.office}`} className="link">
                  {company.email.office}
                </a>
                .
              </span>
            </p>
          )}
          {errorCount > 0 && (
            <div role="alert" className="mt-5 flex gap-3 border-[1.5px] border-rust bg-sheet p-4 text-[0.95rem] text-rust">
              <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <span className="font-semibold">
                {errorCount === 1 ? 'Lomakkeessa on yksi korjattava kohta.' : `Lomakkeessa on ${errorCount} korjattavaa kohtaa.`}
              </span>
            </div>
          )}
        </div>

        {/* 1 · Service */}
        <fieldset className="field" aria-describedby={errors.topic ? 'topic-virhe' : undefined}>
          <legend className="mb-3 flex items-center gap-3">
            <span className="num grid size-7 place-items-center rounded-full border-[1.5px] border-ink text-[0.78rem]" aria-hidden="true">
              1
            </span>
            Mitä palvelua tarvitset? *
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {topics.map((x) => (
              <label key={x.id} className="choice">
                <input
                  type="radio"
                  name="topic"
                  value={x.id}
                  checked={t === x.id}
                  onChange={() => setTopic(x.id)}
                  aria-invalid={errors.topic ? true : undefined}
                />
                <span className="choice__mark" aria-hidden="true" />
                {x.label}
              </label>
            ))}
          </div>
          {err('topic')}
        </fieldset>

        {/* 2 · Topic-specific details (progressive disclosure) */}
        {t && (
          <fieldset className="grid gap-6 border-t-[1.5px] border-ink pt-7">
            <legend className="float-left mb-1 flex w-full items-center gap-3 font-[family-name:var(--font-display)] text-[1rem] font-bold">
              <span className="num grid size-7 place-items-center rounded-full border-[1.5px] border-ink text-[0.78rem]" aria-hidden="true">
                2
              </span>
              Kohde ja tiedot · {topicLabel}
            </legend>

            {t === 'kuntotarkastus' && (
              <div className="field">
                <label htmlFor="buildYear">Rakennusvuosi</label>
                <input
                  id="buildYear"
                  name="buildYear"
                  className="input num max-w-[12rem]"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="esim. 1985"
                  value={data.buildYear}
                  onChange={(e) => set('buildYear', e.target.value.replace(/\D/g, '').slice(0, 4))}
                  {...aria('buildYear', 'buildYear-ohje')}
                />
                <p id="buildYear-ohje" className="hint">
                  Kuntotarkastuksen hinta määräytyy rakennusvuoden mukaan.
                </p>
                {err('buildYear')}
              </div>
            )}

            {t === 'kosteusmittaus' && (
              <fieldset className="field">
                <legend>Kohde</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {(
                    [
                      ['huoneisto', 'Huoneisto'],
                      ['pientalo', 'Pientalo'],
                      ['', 'Muu kohde'],
                    ] as const
                  ).map(([v, l]) => (
                    <label key={l} className="choice">
                      <input type="radio" name="propertyType" value={v} checked={data.propertyType === v} onChange={() => set('propertyType', v)} />
                      <span className="choice__mark" aria-hidden="true" />
                      {l}
                    </label>
                  ))}
                </div>
                <p className="hint">Mittaamme kaikki vesipisteelliset tilat. Kohteitamme ovat myös liikerakennukset ja julkiset kiinteistöt.</p>
              </fieldset>
            )}

            {t === 'betonin-kosteusmittaus' && (
              <div className="field">
                <label htmlFor="points">Mittauspisteiden määrä</label>
                <input
                  id="points"
                  name="points"
                  className="input num max-w-[12rem]"
                  inputMode="numeric"
                  maxLength={3}
                  placeholder="esim. 3"
                  value={data.points}
                  onChange={(e) => set('points', e.target.value.replace(/\D/g, '').slice(0, 3))}
                  {...aria('points', 'points-ohje')}
                />
                <p id="points-ohje" className="hint">
                  Kolme mittauspistettä 250 €. Suuremmat kokonaisuudet sovitaan tapauskohtaisesti. Jos et tiedä, jätä tyhjäksi.
                </p>
                {err('points')}
              </div>
            )}

            {t === 'laboratorio' && (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="field">
                    <label htmlFor="billingRef">
                      Laskutusviite <span className="font-normal text-steel">(valinnainen)</span>
                    </label>
                    <input id="billingRef" name="billingRef" className="input" value={data.billingRef} onChange={(e) => set('billingRef', e.target.value)} />
                  </div>
                  <div className="field">
                    <label htmlFor="distribution">
                      Tulosten jakelu <span className="font-normal text-steel">(valinnainen)</span>
                    </label>
                    <input
                      id="distribution"
                      name="distribution"
                      className="input"
                      placeholder="sähköpostiosoitteet"
                      value={data.distribution}
                      onChange={(e) => set('distribution', e.target.value)}
                      aria-describedby="distribution-ohje"
                    />
                    <p id="distribution-ohje" className="hint">
                      Kenelle tulokset toimitetaan.
                    </p>
                  </div>
                </div>

                <fieldset className="field" aria-describedby={errors.specimens ? 'specimens-virhe' : 'specimens-ohje'}>
                  <legend>Koekappaleet</legend>
                  <p id="specimens-ohje" className="hint -mt-1">
                    Samat tiedot kuin tilauslomakkeessa. Koestuspäivä lasketaan valmistuspäivästä ja koestusiästä – laboratorio vahvistaa testauksen.
                  </p>
                  <ol className="grid gap-3">
                    {data.specimens.map((s, i) => {
                      const td = testDate(s.castDate, s.ageDays)
                      return (
                        <li key={s.key} className="border-[1.5px] border-ink/25 bg-sheet p-4">
                          <div className="flex items-center justify-between gap-3">
                            <p className="label text-steel">Koekappale {i + 1}</p>
                            {data.specimens.length > 1 && (
                              <button
                                type="button"
                                className="inline-flex min-h-[2.5rem] items-center gap-1.5 px-2 text-[0.88rem] font-semibold text-rust hover:underline"
                                onClick={() => setData((d) => ({ ...d, specimens: d.specimens.filter((x) => x.key !== s.key) }))}
                              >
                                <Trash2 className="size-4" aria-hidden="true" />
                                Poista<span className="sr-only"> koekappale {i + 1}</span>
                              </button>
                            )}
                          </div>
                          <div className="mt-2 grid gap-3 sm:grid-cols-4">
                            <div className="field">
                              <label htmlFor={`tag-${s.key}`} className="!text-[0.9rem]">
                                Tunnus
                              </label>
                              <input
                                id={`tag-${s.key}`}
                                name={i === 0 ? 'specimens' : undefined}
                                className="input"
                                value={s.tag}
                                onChange={(e) => setSpecimen(s.key, { tag: e.target.value })}
                              />
                            </div>
                            <div className="field">
                              <label htmlFor={`cast-${s.key}`} className="!text-[0.9rem]">
                                Valmistuspäivä
                              </label>
                              <input
                                id={`cast-${s.key}`}
                                type="date"
                                className="input"
                                value={s.castDate}
                                onChange={(e) => setSpecimen(s.key, { castDate: e.target.value })}
                              />
                            </div>
                            <div className="field">
                              <label htmlFor={`age-${s.key}`} className="!text-[0.9rem]">
                                Koestusikä (vrk)
                              </label>
                              <input
                                id={`age-${s.key}`}
                                className="input num"
                                inputMode="numeric"
                                maxLength={3}
                                value={s.ageDays}
                                onChange={(e) => setSpecimen(s.key, { ageDays: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                                aria-invalid={errors.specimens && s.ageDays && !/^\d{1,3}$/.test(s.ageDays) ? true : undefined}
                              />
                            </div>
                            <div className="field">
                              <label htmlFor={`class-${s.key}`} className="!text-[0.9rem]">
                                Lujuusluokka
                              </label>
                              <input
                                id={`class-${s.key}`}
                                className="input"
                                placeholder="esim. C30/37"
                                value={s.strengthClass}
                                onChange={(e) => setSpecimen(s.key, { strengthClass: e.target.value })}
                              />
                            </div>
                          </div>
                          <p className="mt-3 text-[0.9rem] text-steel" aria-live="polite">
                            {td ? (
                              <>
                                Laskennallinen koestuspäivä: <strong className="num text-ink">{td.label}</strong>
                              </>
                            ) : (
                              'Laskennallinen koestuspäivä näkyy, kun valmistuspäivä ja koestusikä on annettu.'
                            )}
                          </p>
                        </li>
                      )
                    })}
                  </ol>
                  {err('specimens')}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    {data.specimens.length < 30 && (
                      <button
                        type="button"
                        className="btn btn--ghost min-h-[2.75rem] px-4 py-2 text-[0.95rem]"
                        onClick={() => {
                          touch()
                          setData((d) => ({ ...d, specimens: [...d.specimens, newSpecimen()] }))
                        }}
                      >
                        <Plus aria-hidden="true" />
                        Lisää koekappale
                      </button>
                    )}
                    <a
                      href={asset(company.documents.orderForm.file)}
                      download
                      className="inline-flex items-center gap-2 text-[0.95rem] font-semibold underline decoration-orange decoration-2 underline-offset-4"
                      onClick={() => track('document_download', { document: 'tilauslomake', location: 'form' })}
                    >
                      <FileDown className="size-4" aria-hidden="true" />
                      Tai lataa tilauslomake (PDF)
                    </a>
                  </div>
                </fieldset>

                <label className="flex items-start gap-3 text-[0.98rem]">
                  <input
                    type="checkbox"
                    className="mt-1 size-5 shrink-0 accent-[var(--color-ink)]"
                    checked={data.moulds}
                    onChange={(e) => set('moulds', e.target.checked)}
                  />
                  <span>Haluan kysyä laboratorion muottikaluston käytöstä</span>
                </label>
              </>
            )}

            {t !== 'muu' && (
              <div className={`grid gap-5 ${t !== 'laboratorio' ? 'sm:grid-cols-2' : ''}`}>
                <div className="field">
                  <label htmlFor="location">
                    {locationLabel[t]} <span className="font-normal text-steel">(valinnainen)</span>
                  </label>
                  <input id="location" name="location" className="input" autoComplete="off" value={data.location} onChange={(e) => set('location', e.target.value)} />
                </div>
                {t !== 'laboratorio' && (
                  <div className="field">
                    <label htmlFor="timing">
                      Toivottu ajankohta <span className="font-normal text-steel">(valinnainen)</span>
                    </label>
                    <input
                      id="timing"
                      name="timing"
                      className="input"
                      placeholder="esim. viikko 50 tai viikonloppuna"
                      value={data.timing}
                      onChange={(e) => set('timing', e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="field">
              <label htmlFor="message">
                {messageLabel[t]} {descRequired ? '*' : <span className="font-normal text-steel">(valinnainen)</span>}
              </label>
              {messageHint[t] && (
                <p id="message-ohje" className="hint -mt-1">
                  {messageHint[t]}
                </p>
              )}
              <textarea
                id="message"
                name="message"
                className="input"
                maxLength={3000}
                value={data.message}
                onChange={(e) => set('message', e.target.value)}
                aria-required={descRequired || undefined}
                {...aria('message', messageHint[t] ? 'message-ohje' : undefined)}
              />
              {err('message')}
            </div>
          </fieldset>
        )}

        {/* 3 · Contact details */}
        <fieldset className="grid gap-6 border-t-[1.5px] border-ink pt-7">
          <legend className="float-left mb-1 flex w-full items-center gap-3 font-[family-name:var(--font-display)] text-[1rem] font-bold">
            <span className="num grid size-7 place-items-center rounded-full border-[1.5px] border-ink text-[0.78rem]" aria-hidden="true">
              {t ? 3 : 2}
            </span>
            Yhteystietosi
          </legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="field">
              <label htmlFor="name">Nimi *</label>
              <input id="name" name="name" className="input" autoComplete="name" value={data.name} onChange={(e) => set('name', e.target.value)} aria-required {...aria('name')} />
              {err('name')}
            </div>
            <div className="field">
              <label htmlFor="company">
                {t === 'laboratorio' ? 'Tilaaja / yritys' : 'Yritys'} <span className="font-normal text-steel">(valinnainen)</span>
              </label>
              <input id="company" name="company" className="input" autoComplete="organization" value={data.company} onChange={(e) => set('company', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="phone">Puhelin</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="input"
                autoComplete="tel"
                inputMode="tel"
                value={data.phone}
                onChange={(e) => set('phone', e.target.value)}
                {...aria('phone', 'contact-ohje', 'contact')}
              />
              {err('phone')}
            </div>
            <div className="field">
              <label htmlFor="email">Sähköposti</label>
              <input
                id="email"
                name="email"
                type="email"
                className="input"
                autoComplete="email"
                inputMode="email"
                value={data.email}
                onChange={(e) => set('email', e.target.value)}
                {...aria('email', 'contact-ohje', 'contact')}
              />
              {err('email')}
            </div>
          </div>
          <p id="contact-ohje" className="hint -mt-2">
            Anna vähintään toinen: puhelinnumero tai sähköposti.
          </p>
          {err('contact')}
        </fieldset>

        {/* Honeypot – hidden from people and assistive tech */}
        <div className="absolute -left-[9999px] size-px overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Jätä tämä kenttä tyhjäksi</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => setData((d) => ({ ...d, website: e.target.value }))} />
        </div>

        <div className="grid gap-4">
          <button type="submit" className="btn btn--primary w-full sm:w-auto sm:justify-self-start" disabled={status === 'sending'}>
            {status === 'sending' ? <Loader2 className="animate-spin" aria-hidden="true" /> : null}
            {status === 'sending' ? 'Lähetetään…' : 'Lähetä tarjouspyyntö'}
          </button>
          <div aria-live="polite" role="status">
            {status === 'done' && (
              <div className="flex gap-3 border-[1.5px] border-ink bg-ink p-5 text-paper">
                <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-orange-2" aria-hidden="true" />
                <div>
                  <p className="font-[family-name:var(--font-display)] text-[1.2rem] font-bold">{message}</p>
                  {isDemoMode() && (
                    <p className="mt-1 text-paper/80">
                      Tämä on konseptidemo: tietoja ei lähetetty eikä tallennettu. Ota yhteyttä puhelimitse {company.phone.display} tai sähköpostilla{' '}
                      {company.email.office}.
                    </p>
                  )}
                </div>
              </div>
            )}
            {status === 'error' && (
              <p className="field-error">
                <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {message}
              </p>
            )}
          </div>
        </div>
      </form>

      {/* Live summary */}
      <aside className="lg:col-span-4" aria-label="Pyynnön yhteenveto">
        <div className="lg:sticky lg:top-28">
          <div className="border-[1.5px] border-ink bg-sheet">
            <div className="flex items-center justify-between border-b-[1.5px] border-ink px-4 py-2.5">
              <p className="label">Yhteenveto</p>
              <p className="label text-rust">Nimiö</p>
            </div>
            <dl className="divide-y divide-ink/20">
              <div className="grid grid-cols-[7rem_1fr] gap-3 px-4 py-3">
                <dt className="label pt-0.5 text-steel">Palvelu</dt>
                <dd className="font-semibold">{topicLabel ?? '–'}</dd>
              </div>
              {t === 'laboratorio' && (
                <div className="grid grid-cols-[7rem_1fr] gap-3 px-4 py-3">
                  <dt className="label pt-0.5 text-steel">Koekappaleet</dt>
                  <dd className="num font-semibold">{data.specimens.length} kpl</dd>
                </div>
              )}
              <div className="grid grid-cols-[7rem_1fr] gap-3 px-4 py-3">
                <dt className="label pt-0.5 text-steel">Hinnasto</dt>
                <dd>
                  {price ? (
                    <>
                      <span className="num block text-[1.35rem] font-semibold leading-tight text-rust">{price.value}</span>
                      <span className="text-[0.85rem] text-steel">{price.note}</span>
                    </>
                  ) : (
                    <span className="text-steel">Valitse palvelu</span>
                  )}
                </dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-3 px-4 py-3">
                <dt className="label pt-0.5 text-steel">Yhteyshenkilö</dt>
                <dd className="text-[0.95rem]">
                  <span className="font-semibold">{company.person.name}</span>
                  <br />
                  <a href={company.phone.href} className="num underline decoration-orange decoration-2 underline-offset-4" onClick={() => track('phone_click', { location: 'form_summary' })}>
                    {company.phone.display}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <p className="mt-4 text-[0.9rem] text-steel">{company.serviceDays}. Kuntotarkastusten matkat Joensuun talousalueella ja Itä-Suomessa sisältyvät hintaan.</p>
        </div>
      </aside>
    </div>
  )
}
