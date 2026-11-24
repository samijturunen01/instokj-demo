import { Mail, Phone } from 'lucide-react'
import { Photo } from '../ui/Photo'
import { SectionHead } from '../ui/SectionMark'
import { TitleBlock } from '../ui/TitleBlock'
import { company, partners } from '../../data/company'
import { track } from '../../lib/analytics'

export function PersonCard({ location, compact = false }: { location: string; compact?: boolean }) {
  const p = company.person
  return (
    <div className={`grid gap-6 border-[1.5px] border-ink bg-sheet p-5 sm:grid-cols-[9rem_1fr] sm:p-7 ${compact ? '' : 'lg:gap-8'}`}>
      <Photo name="juvonen" sizes="144px" plain className="aspect-[283/365] w-28 border border-ink/20 sm:w-36" />
      <div>
        <p className="label text-rust">Yhteyshenkilö</p>
        <h3 className="display-m mt-2">{p.name}</h3>
        <p className="mt-1 font-semibold">
          {p.title}
          <br />
          {p.role}
        </p>
        <ul className="mt-4 grid gap-1 text-[0.95rem] text-graphite">
          {p.areas.map((a) => (
            <li key={a} className="flex gap-2">
              <span className="mt-[0.7em] h-px w-3 shrink-0 bg-orange" aria-hidden="true" />
              {a}
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-2 sm:flex sm:flex-wrap sm:gap-3">
          <a href={company.phone.href} className="btn btn--dark min-h-[2.9rem] px-4 py-2" onClick={() => track('phone_click', { location })}>
            <Phone aria-hidden="true" />
            <span className="num">{company.phone.display}</span>
          </a>
          <a
            href={`mailto:${company.email.person}`}
            className="btn btn--ghost min-h-[2.9rem] px-4 py-2 text-[0.92rem]"
            onClick={() => track('email_click', { location })}
          >
            <Mail aria-hidden="true" />
            <span className="break-all">{company.email.person}</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export function PersonTrust() {
  return (
    <section className="border-t border-ink/15 bg-paper-2 py-20 sm:py-24 lg:py-28" aria-labelledby="tekija-title">
      <div className="wrap">
        <SectionHead
          letter="E"
          sheet="06"
          kicker="Kuka tekee"
          id="tekija-title"
          title="Rakennetekniikan insinööri – ja laboratoriovastaava."
          intro="Yhteyshenkilö vastaa kaikista palvelualueista: valvonnasta ja vastaavan työnjohtajan tehtävistä, kuntotarkastuksista ja mittauksista sekä laboratoriopalveluista."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7" data-reveal>
            <PersonCard location="home_person" />
          </div>
          <div className="lg:col-span-5" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            <TitleBlock
              title="Yritystiedot"
              sheet="Nimiö"
              rows={[
                { label: 'Yritys', value: company.name },
                { label: 'Y-tunnus', value: <span className="num">{company.businessId}</span> },
                { label: 'Rekisteröity', value: `Kaupparekisteriin ${company.registered}` },
                { label: 'Akkreditointi', value: `FINAS ${company.accreditation.id} · ${company.accreditation.since} alkaen` },
                { label: 'Luotettavuus', value: company.trustedPartner.label },
                { label: 'Toimipaikka', value: `${company.address.street}, ${company.address.city}` },
              ]}
            />
          </div>
        </div>

        <div className="mt-16 border-t-[1.5px] border-ink pt-8" data-reveal>
          <h3 className="label text-steel">Yhteistyökumppaneitamme</h3>
          <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((p, i) => (
              <li key={p} className="flex items-baseline gap-3 border-b border-ink/15 pb-3">
                <span className="num text-[0.75rem] text-rust" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold">{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.85rem] text-steel">Yhteistyökumppanit kuten Insinööritoimisto KJ Oy:n nykyisellä verkkosivustolla.</p>
        </div>
      </div>
    </section>
  )
}
