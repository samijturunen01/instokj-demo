import { useState } from 'react'
import { FileDown } from 'lucide-react'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { SectionMark, SectionHead } from '../components/ui/SectionMark'
import { TitleBlock } from '../components/ui/TitleBlock'
import { BuildYearPrice } from '../components/ui/BuildYearPrice'
import { Faq } from '../components/ui/Faq'
import { CtaBand } from '../components/ui/CtaBand'
import { PriceTable, VatToggle, type VatView } from '../components/pricing/PriceTable'
import { company } from '../data/company'
import { labPrices, servicePrices, PRICE_LIST_UPDATED, PRICE_LIST_VERSION } from '../data/prices'
import { services } from '../data/services'
import { faqs } from '../data/faq'
import { asset } from '../lib/asset'
import { track } from '../lib/analytics'

const linkFor = (serviceId: string) => (serviceId === 'laboratorio' ? '/laboratorio' : services.find((s) => s.id === serviceId)?.path)

export function Pricing() {
  const [view, setView] = useState<VatView>('quoted')
  return (
    <>
      <section className="grid-paper border-b border-ink/15">
        <div className="wrap grid gap-10 pb-14 pt-8 sm:pt-10 lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-12">
          <div className="lg:col-span-7">
            <Breadcrumbs items={[{ label: 'Etusivu', to: '/' }, { label: 'Hinnasto' }]} />
            <div className="mt-8 flex items-center gap-4">
              <SectionMark letter="H" sheet="01" />
              <p className="label text-steel">Palvelu- ja laboratoriohinnasto</p>
            </div>
            <h1 className="display-xl mt-6">Hinnasto</h1>
            <p className="lead mt-6 max-w-2xl text-graphite">
              Kiinteät hinnat kuntotarkastuksille ja mittauksille, laboratoriotestit kappalehinnoin. {company.travelNote}
            </p>
            <div className="mt-8">
              <VatToggle value={view} onChange={setView} />
              <p className="mt-3 max-w-xl text-[0.9rem] text-steel">
                Palveluhinnasto on julkaistu arvonlisäveron {`25,5 %`} kanssa ja laboratoriohinnasto ilman arvonlisäveroa. Kaikki luvut ovat
                virallisesta hinnastosta.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <TitleBlock
              title="Hinnaston tiedot"
              sheet="H–H"
              className="shadow-[8px_8px_0_0_rgb(20_21_22/0.9)]"
              rows={[
                { label: 'Versio', value: PRICE_LIST_VERSION },
                { label: 'Päivitetty', value: PRICE_LIST_UPDATED },
                { label: 'Palvelut', value: 'Sis. alv 25,5 %' },
                { label: 'Laboratorio', value: 'Alv 0 %' },
                {
                  label: 'Tulostettava',
                  value: (
                    <a
                      href={asset(company.documents.priceList.file)}
                      download
                      className="inline-flex items-center gap-1.5 underline decoration-orange decoration-2 underline-offset-4"
                      onClick={() => track('document_download', { document: 'hinnasto', location: 'pricing_hero' })}
                    >
                      <FileDown className="size-4" aria-hidden="true" />
                      Hinnasto (PDF)
                    </a>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="palveluhinnat-title">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-8">
            <SectionHead letter="H" sheet="02" kicker="Tarkastukset, tutkimukset ja mittaukset" id="palveluhinnat-title" title="Palveluhinnasto" />
            <div className="mt-10 grid gap-12">
              {servicePrices.map((g) => (
                <PriceTable key={g.id} group={g} view={view} serviceLink={linkFor(g.serviceId)} />
              ))}
            </div>
          </div>
          <aside className="lg:col-span-4" aria-label="Kuntotarkastuksen hintalaskuri">
            <div className="lg:sticky lg:top-28">
              <BuildYearPrice location="pricing" />
              <p className="mt-4 text-[0.9rem] text-steel">
                Hinnaston versio {PRICE_LIST_VERSION.replace('Ver. ', '')}, päivitetty {PRICE_LIST_UPDATED}. Ajantasainen hinnasto on aina tällä sivulla.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-ink/15 bg-paper-2 py-16 sm:py-20" aria-labelledby="labhinnat-title">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-8">
            <SectionHead letter="H" sheet="03" kicker="Testauslaboratorio T359" id="labhinnat-title" title={'Laboratorio\u00adhinnasto'} />
            <div className="mt-10">
              <PriceTable group={labPrices} view={view} serviceLink="/laboratorio" />
            </div>
          </div>
          <div className="lg:col-span-4 lg:pt-28">
            <TitleBlock
              title="Tilaaminen"
              rows={[
                {
                  label: 'Lomake',
                  value: (
                    <a
                      href={asset(company.documents.orderForm.file)}
                      download
                      className="underline decoration-orange decoration-2 underline-offset-4"
                      onClick={() => track('document_download', { document: 'tilauslomake', location: 'pricing_lab' })}
                    >
                      Tilauslomake (PDF) {company.documents.orderForm.version}
                    </a>
                  ),
                },
                { label: 'Tulokset', value: 'Yleensä seuraavana arkipäivänä testauksesta' },
                { label: 'Muotit', value: 'Oma muottikalusto asiakkaan tarpeiden mukaan' },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="hinta-ukk-title">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead letter="H" sheet="04" kicker="Hinnoista" id="hinta-ukk-title" title="Kysyttyä hinnoista" />
          </div>
          <div className="lg:col-span-8">
            <Faq items={faqs.slice(0, 3)} />
          </div>
        </div>
      </section>

      <CtaBand
        location="pricing_closing"
        title="Hinta on tiedossa – sovitaan ajankohta."
        text="Tapauskohtaisesti hinnoiteltavissa töissä, kuten vastaavan työnjohtajan tehtävissä ja valvonnassa, kerro hankkeesta, niin sovitaan sisältö ja hinta."
      />
    </>
  )
}
