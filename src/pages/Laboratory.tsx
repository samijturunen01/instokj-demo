import { Link } from 'react-router-dom'
import { ArrowRight, Check, ExternalLink, FileDown } from 'lucide-react'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { Photo } from '../components/ui/Photo'
import { SectionMark, SectionHead } from '../components/ui/SectionMark'
import { Faq } from '../components/ui/Faq'
import { CtaBand } from '../components/ui/CtaBand'
import { TitleBlock } from '../components/ui/TitleBlock'
import { PressIllustration } from '../components/lab/PressIllustration'
import { company } from '../data/company'
import { labChain, labEquipment, labFaq, labMethods, orderFormFields, specimenTypes } from '../data/lab'
import { euro, labPrices } from '../data/prices'
import { requestHref } from '../data/nav'
import { asset } from '../lib/asset'
import { track } from '../lib/analytics'

const priceOf = (id?: string) => {
  const r = labPrices.rows.find((x) => x.id === id)
  return r?.amount && !Array.isArray(r.amount) ? euro(r.amount.net) : null
}

export function Laboratory() {
  return (
    <>
      {/* Hero */}
      <section className="concrete on-dark relative overflow-hidden text-paper">
        <div className="wrap grid gap-10 pb-16 pt-8 sm:pt-10 lg:grid-cols-12 lg:gap-12 lg:pb-24 lg:pt-12">
          <div className="lg:col-span-7">
            <Breadcrumbs dark items={[{ label: 'Etusivu', to: '/' }, { label: 'Laboratorio' }]} />
            <div className="mt-8 flex items-center gap-4">
              <SectionMark letter="L" sheet="01" dark />
              <p className="label text-mist">FINAS-akkreditoitu testauslaboratorio {company.accreditation.id}</p>
            </div>
            <h1 className="display-xl mt-6 max-w-[14ch]">{'Betoni\u00adlaboratorio'} Joensuussa</h1>
            <p className="lead mt-6 max-w-2xl text-paper/85">
              Insinööritoimisto KJ Oy:n laboratorio on FINAS-akkreditointipalvelun akkreditoima testauslaboratorio {company.accreditation.id}, akkreditointivaatimus{' '}
              {company.accreditation.standard}. Akkreditoitu testausmenetelmä takaa paikkansapitävän tuloksen betonin puristuslujuuden todentamiseen.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to={requestHref('laboratorio')} className="btn btn--primary" onClick={() => track('cta_click', { location: 'lab_hero', topic: 'laboratorio' })}>
                Tilaa betonitestaus
                <ArrowRight className="btn__arrow" aria-hidden="true" />
              </Link>
              <a
                href={asset(company.documents.orderForm.file)}
                download
                className="btn btn--ghost"
                onClick={() => track('document_download', { document: 'tilauslomake', location: 'lab_hero' })}
              >
                <FileDown aria-hidden="true" />
                Tilauslomake (PDF)
              </a>
            </div>
            <dl className="mt-12 grid grid-cols-2 gap-px bg-white/15 sm:grid-cols-4">
              {[
                ['50 €', 'puristuslujuus, alv 0 %'],
                ['1 arkipäivä', 'tulokset yleensä testausta seuraavana arkipäivänä'],
                ['2000 kN', 'betonipuristin'],
                [company.accreditation.since, 'akkreditointipäätös'],
              ].map(([k, v]) => (
                <div key={v} className="bg-ink-2 p-4">
                  <dt className="num text-[1.15rem] font-semibold text-orange-2">{k}</dt>
                  <dd className="mt-1 text-[0.85rem] leading-snug text-paper/75">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative lg:col-span-5">
            <Photo name="laboratorio" priority sizes="(min-width: 1024px) 38vw, 100vw" className="aspect-[4/3] w-full lg:aspect-[4/5]" />
            <div className="relative -mt-12 ml-4 flex items-center gap-4 border-[1.5px] border-white/30 bg-ink p-4 sm:ml-10 lg:-ml-14">
              <div className="w-28 shrink-0 bg-white p-2">
                <img src={asset('images/finas-t359.png')} width={480} height={310} alt="FINAS-akkreditointitunnus T359 (EN ISO/IEC 17025)" className="h-auto w-full" />
              </div>
              <p className="text-[0.9rem] text-paper/85">
                Tiedot akkreditoituun pätevyysalueeseen sisältyvästä toiminnasta:{' '}
                <a href={company.accreditation.url} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1 text-paper">
                  finas.fi
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">(avautuu uuteen välilehteen)</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testing chain */}
      <section className="grid-paper border-b border-ink/15 py-16 sm:py-20 lg:py-24" aria-labelledby="ketju-title">
        <div className="wrap">
          <SectionHead
            letter="L"
            sheet="02"
            kicker="Testausketju"
            id="ketju-title"
            title="Vastaanotosta tuloksiin"
            intro="Säilytämme koekappaleet standardin vaatimusten mukaisesti koko testausketjun ajan vastaanottamisesta testaukseen asti."
          />
          <ol className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            <span className="absolute left-0 right-0 top-[1.4rem] hidden h-px bg-ink lg:block" aria-hidden="true" />
            {labChain.map((c, i) => (
              <li key={c.n} className="relative lg:pr-8" data-reveal style={{ '--d': `${i * 110}ms` } as React.CSSProperties}>
                <span className="relative z-10 grid size-11 place-items-center rounded-full border-[1.5px] border-ink bg-orange font-[family-name:var(--font-mono)] text-[0.85rem] font-semibold">
                  {c.n}
                </span>
                <h3 className="display-m mt-5 !text-[1.4rem]">{c.title}</h3>
                <p className="mt-2 text-graphite">{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Methods */}
      <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="menetelmat-title">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHead
              letter="L"
              sheet="03"
              kicker="Menetelmät ja hinnat"
              id="menetelmat-title"
              title="Mitä testaamme"
              intro="Tyypillisesti betonista määritetään puristuslujuus, mutta laitteistomme mahdollistaa myös muiden ominaisuuksien tutkimisen."
            />
            <p className="mt-6 text-[0.92rem] text-steel">
              Hinnat alv 0 %. Arvonlisäverolliset hinnat: <Link to="/hinnasto#hinta-laboratorio" className="link text-ink">hinnasto</Link>.
            </p>
          </div>
          <div className="min-w-0 lg:col-span-8" data-reveal>
            <div className="overflow-x-auto" role="region" aria-label="Testausmenetelmät ja hinnat" tabIndex={0}>
              <table className="w-full min-w-[34rem] border-collapse border-t-[1.5px] border-ink text-left">
                <caption className="sr-only">Laboratorion testausmenetelmät, akkreditointi ja hinnat (alv 0 %)</caption>
                <thead>
                  <tr className="border-b-[1.5px] border-ink">
                    <th scope="col" className="label py-3 pr-4 font-medium text-steel">
                      Menetelmä
                    </th>
                    <th scope="col" className="label py-3 pr-4 font-medium text-steel">
                      Standardi
                    </th>
                    <th scope="col" className="label py-3 pr-4 font-medium text-steel">
                      Akkreditoitu
                    </th>
                    <th scope="col" className="label py-3 text-right font-medium text-steel">
                      Hinta
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {labMethods.map((m) => (
                    <tr key={m.id} className="border-b border-ink/20 align-baseline">
                      <th scope="row" className="py-4 pr-4 text-[1.05rem] font-semibold">
                        {m.name}
                      </th>
                      <td className="num py-4 pr-4 text-[0.95rem]">{m.standard}</td>
                      <td className="py-4 pr-4">
                        {m.accredited ? (
                          <span className="inline-flex items-center gap-1.5 bg-ink px-2 py-1 text-[0.8rem] font-semibold text-paper">
                            <Check className="size-3.5 text-orange-2" aria-hidden="true" />
                            Akkreditoitu
                          </span>
                        ) : (
                          <span className="text-[0.9rem] text-steel">–</span>
                        )}
                      </td>
                      <td className="num py-4 text-right text-[1.1rem] font-semibold">
                        {priceOf(m.priceId) ?? <span className="font-[family-name:var(--font-sans)] text-[0.9rem] font-semibold text-steel">Kysy hinta</span>}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-b border-ink/20 align-baseline">
                    <th scope="row" className="py-4 pr-4 text-[1.05rem] font-semibold">
                      Koekappaleiden päiden sahaus
                    </th>
                    <td className="py-4 pr-4 text-[0.95rem]">Betonitestaus</td>
                    <td className="py-4 pr-4 text-[0.9rem] text-steel">–</td>
                    <td className="num py-4 text-right text-[1.1rem] font-semibold">{priceOf('sahaus')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Specimens + equipment */}
      <section className="concrete on-dark text-paper" aria-labelledby="kalusto-title">
        <div className="wrap grid gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:py-24">
          <div className="lg:col-span-7">
            <SectionHead
              dark
              letter="L"
              sheet="04"
              kicker="Betonin elinkaari ja laitteisto"
              id="kalusto-title"
              title={'Uudis\u00adrakentamisesta korjaus\u00adrakentamiseen'}
              intro="Laboratoriomme toimii kaikissa betonin elinkaaren vaiheissa ja tuottaa luotettavia testaustuloksia uudis- ja korjausrakentamiskohteisiin."
            />
            <ul className="mt-10 grid gap-px bg-white/15 sm:grid-cols-3">
              {specimenTypes.map((s) => (
                <li key={s.id} className="bg-ink-2 p-5" data-reveal>
                  <h3 className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold">{s.label}</h3>
                  <p className="mt-2 text-[0.92rem] text-paper/75">{s.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-2xl text-paper/85">
              Laboratoriollamme on myös oma <strong>muottikalusto</strong>, jota voidaan hyödyntää asiakkaan tarpeiden mukaisesti.
            </p>

            <h3 className="label mt-14 text-mist">Laitteistomme – luokan 1 koneita</h3>
            <ul className="mt-5 border-t border-white/25">
              {labEquipment.map((e) => (
                <li key={e.model} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-white/15 py-4">
                  <span className="num w-28 text-[1.5rem] font-semibold text-orange-2">{e.kn} kN</span>
                  <span className="font-[family-name:var(--font-display)] text-[1.1rem] font-bold">{e.model}</span>
                  <span className="leader hidden sm:block" aria-hidden="true" />
                  <span className="text-paper/75">{e.type}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-2xl text-[0.95rem] text-paper/75">
              Laitteiden säännöllinen ja riippumaton kalibrointi varmistaa testaustulosten tarkkuuden ja jäljitettävyyden. Laitteemme ovat nykyaikaisia ja
              täyttävät testausmenetelmien asettamat vaatimukset.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="border-[1.5px] border-white/25 bg-ink/60 p-6 sm:p-8 lg:sticky lg:top-28">
              <PressIllustration dark className="mx-auto max-w-[22rem]" />
            </div>
          </div>
        </div>
      </section>

      {/* How to order */}
      <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="tilaus-title">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <SectionHead
              letter="L"
              sheet="05"
              kicker="Tilaaminen"
              id="tilaus-title"
              title="Näin tilaat testauksen"
              intro="Täytä tilaus verkossa – lomake kysyy samat tiedot kuin virallinen tilauslomake ja laskee koestuspäivän valmistuspäivästä – tai lataa tilauslomake PDF-muodossa."
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to={requestHref('laboratorio')} className="btn btn--primary" onClick={() => track('cta_click', { location: 'lab_order', topic: 'laboratorio' })}>
                Täytä tilaus verkossa
                <ArrowRight className="btn__arrow" aria-hidden="true" />
              </Link>
              <a
                href={asset(company.documents.orderForm.file)}
                download
                className="btn btn--ghost"
                onClick={() => track('document_download', { document: 'tilauslomake', location: 'lab_order' })}
              >
                <FileDown aria-hidden="true" />
                Tilauslomake (PDF)
              </a>
            </div>
          </div>
          <div className="lg:col-span-6" data-reveal>
            <TitleBlock
              title="Tilauslomake – puristuslujuus SFS-EN 12390-3"
              sheet={company.documents.orderForm.version}
              rows={[
                { label: 'Tilauksen tiedot', value: orderFormFields.order.join(' · ') },
                { label: 'Jokaisesta koekappaleesta', value: orderFormFields.specimen.join(' · ') },
                { label: 'Lisäksi', value: 'Lisätietoja-kenttä' },
                { label: 'Laboratorio', value: `${company.address.street}, ${company.address.postalCode} ${company.address.city}` },
                { label: 'Yhteyshenkilö', value: `${company.person.name}, ${company.person.role.toLowerCase()}` },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-ink/15 bg-paper-2 py-16 sm:py-20" aria-labelledby="lab-ukk-title">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead letter="L" sheet="06" kicker="Usein kysyttyä" id="lab-ukk-title" title="Kysyttyä laboratoriosta" />
          </div>
          <div className="lg:col-span-8" data-reveal>
            <Faq items={labFaq} />
          </div>
        </div>
      </section>

      <CtaBand
        location="lab_closing"
        topic="laboratorio"
        cta="Tilaa betonitestaus"
        title="Koekappaleet testiin – tulokset yleensä seuraavana arkipäivänä."
        text="Täytä tilaus verkossa tai lataa tilauslomake. Laboratoriovastaava vastaa kysymyksiin menetelmistä, muoteista ja aikatauluista."
      />
    </>
  )
}
