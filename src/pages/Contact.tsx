import { ExternalLink, Mail, Phone } from 'lucide-react'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { SectionMark, SectionHead } from '../components/ui/SectionMark'
import { PersonCard } from '../components/home/PersonTrust'
import { RequestForm } from '../components/forms/RequestForm'
import { MapEmbed } from '../components/contact/MapEmbed'
import { company } from '../data/company'
import { track } from '../lib/analytics'

export function Contact() {
  const b = company.billing
  return (
    <>
      <section className="grid-paper border-b border-ink/15">
        <div className="wrap grid gap-10 pb-14 pt-8 sm:pt-10 lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-12">
          <div className="lg:col-span-6">
            <Breadcrumbs items={[{ label: 'Etusivu', to: '/' }, { label: 'Yhteystiedot' }]} />
            <div className="mt-8 flex items-center gap-4">
              <SectionMark letter="Y" sheet="01" />
              <p className="label text-steel">{company.serviceDays}</p>
            </div>
            <h1 className="display-xl mt-6">Yhteystiedot</h1>
            <p className="lead mt-6 max-w-xl text-graphite">
              Kerro meille tarpeistasi. Soita, lähetä sähköpostia tai täytä tarjouspyyntö – lomake kysyy vain valitsemaasi palveluun tarvittavat tiedot.
            </p>
            <ul className="mt-9 grid gap-3">
              <li>
                <a
                  href={company.phone.href}
                  className="group flex items-center gap-4 border-[1.5px] border-ink bg-sheet p-4 transition-colors hover:bg-ink hover:text-paper"
                  onClick={() => track('phone_click', { location: 'contact_hero' })}
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-orange text-ink">
                    <Phone className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="label block text-steel group-hover:text-mist">Puhelin</span>
                    <span className="num block text-[1.5rem] font-semibold leading-tight sm:text-[1.8rem]">{company.phone.display}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email.office}`}
                  className="group flex items-center gap-4 border-[1.5px] border-ink bg-sheet p-4 transition-colors hover:bg-ink hover:text-paper"
                  onClick={() => track('email_click', { location: 'contact_hero' })}
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border-[1.5px] border-current">
                    <Mail className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="label block text-steel group-hover:text-mist">Sähköposti</span>
                    <span className="block break-all text-[1.2rem] font-semibold leading-tight sm:text-[1.35rem]">{company.email.office}</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6 lg:pt-24">
            <PersonCard location="contact_person" />
          </div>
        </div>
      </section>

      <section id="tarjouspyynto" className="py-16 sm:py-20 lg:py-24" aria-label="Tarjouspyyntö">
        <div className="wrap">
          <RequestForm />
        </div>
      </section>

      <section id="kartta" className="border-t border-ink/15 bg-paper-2 py-16 sm:py-20" aria-labelledby="kartta-title">
        <div className="wrap">
          <SectionHead letter="Y" sheet="02" kicker="Käyntiosoite" id="kartta-title" title="Toimisto ja laboratorio Helatiellä" />
          <div className="mt-10">
            <MapEmbed />
          </div>
        </div>
      </section>

      <section id="laskutus" className="py-16 sm:py-20" aria-labelledby="laskutus-title">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead
              letter="Y"
              sheet="03"
              kicker="Laskutus"
              id="laskutus-title"
              title="Verkkolaskutus"
              intro={
                <>
                  Käytämme verkkolaskutusta. Yrityksemme tiedot löytyvät myös{' '}
                  <a href={b.registryUrl} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
                    verkkolaskuosoitteistosta
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">(avautuu uuteen välilehteen)</span>
                  </a>
                  .
                </>
              }
            />
          </div>
          <div className="lg:col-span-7" data-reveal>
            <table className="w-full border-collapse border-t-[1.5px] border-ink text-left">
              <caption className="sr-only">Verkkolaskutustiedot</caption>
              <tbody>
                {[
                  ['Nimi', b.name],
                  ['Verkkolaskuosoite', b.eInvoiceAddress],
                  ['Välittäjätunnus', b.operatorId],
                  ['Välittäjä', b.operator],
                  ['Y-tunnus', b.businessId],
                  ['ALV-tunnus', b.vatId],
                ].map(([k, v]) => (
                  <tr key={k} className="border-b border-ink/20">
                    <th scope="row" className="label w-[42%] py-4 pr-4 align-baseline font-medium text-steel">
                      {k}
                    </th>
                    <td className="num py-4 text-[1.05rem] font-semibold">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
