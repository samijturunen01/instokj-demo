import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { company } from '../../data/company'
import { requestHref } from '../../data/nav'
import type { PhotoKey } from '../../data/photos'
import type { TopicId } from '../../data/services'
import { track } from '../../lib/analytics'
import { Breadcrumbs } from './Breadcrumbs'
import { Photo } from './Photo'
import { SectionMark } from './SectionMark'
import { TitleBlock } from './TitleBlock'

interface Props {
  crumbs: { label: string; to?: string }[]
  kicker: string
  title: React.ReactNode
  lead: React.ReactNode
  photo: PhotoKey
  facts?: { label: string; value: React.ReactNode }[]
  factsTitle?: string
  topic?: TopicId
  cta?: string
  secondary?: { to: string; label: string }
  mark: { letter: string; sheet: string }
  location: string
  children?: React.ReactNode
}

/** Sub-page hero: drawing-paper grid, H1 + lead + CTA, photo cut in from the right with a title block. */
export function PageHero({ crumbs, kicker, title, lead, photo, facts, factsTitle, topic, cta = 'Pyydä tarjous', secondary, mark, location, children }: Props) {
  return (
    <section className="grid-paper relative overflow-hidden border-b border-ink/15">
      <div className="wrap grid gap-10 pb-14 pt-8 sm:pt-10 lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-12">
        <div className="lg:col-span-7 lg:pt-4">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 flex items-center gap-4">
            <SectionMark letter={mark.letter} sheet={mark.sheet} />
            <p className="label text-steel">{kicker}</p>
          </div>
          <h1 className="display-xl mt-6 max-w-[16ch]">{title}</h1>
          <div className="lead mt-6 max-w-2xl text-graphite">{lead}</div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to={requestHref(topic)} className="btn btn--primary" onClick={() => track('cta_click', { location, topic: topic ?? '' })}>
              {cta}
              <ArrowRight className="btn__arrow" aria-hidden="true" />
            </Link>
            {secondary ? (
              <Link to={secondary.to} className="btn btn--ghost">
                {secondary.label}
              </Link>
            ) : (
              <a href={company.phone.href} className="btn btn--ghost" onClick={() => track('phone_click', { location })}>
                <Phone aria-hidden="true" />
                <span className="num">{company.phone.display}</span>
              </a>
            )}
          </div>
          {children}
        </div>
        <div className="relative lg:col-span-5">
          <Photo name={photo} priority sizes="(min-width: 1024px) 38vw, 100vw" className="aspect-[4/3] w-full lg:aspect-[4/5]" />
          {facts && (
            <TitleBlock rows={facts} title={factsTitle ?? 'Nimiö'} sheet={`${mark.letter}–${mark.letter}`} className="relative -mt-10 ml-4 shadow-[8px_8px_0_0_rgb(20_21_22/0.9)] sm:ml-10 lg:-ml-16 lg:-mt-24" />
          )}
        </div>
      </div>
    </section>
  )
}
