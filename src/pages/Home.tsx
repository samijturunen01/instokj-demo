import { Hero } from '../components/home/Hero'
import { Paths } from '../components/home/Paths'
import { HouseSection } from '../components/home/HouseSection'
import { LabBand } from '../components/home/LabBand'
import { PriceLedger } from '../components/home/PriceLedger'
import { PersonTrust } from '../components/home/PersonTrust'
import { AreaBand } from '../components/home/AreaBand'
import { SectionHead } from '../components/ui/SectionMark'
import { Faq } from '../components/ui/Faq'
import { CtaBand } from '../components/ui/CtaBand'
import { faqs } from '../data/faq'

export function Home() {
  return (
    <>
      <Hero />
      <Paths />
      <HouseSection />
      <LabBand />
      <PriceLedger />
      <PersonTrust />
      <AreaBand />
      <section className="py-20 sm:py-24 lg:py-28" aria-labelledby="ukk-title">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead letter="F" sheet="07" kicker="Usein kysyttyä" id="ukk-title" title="Ennen kuin tilaat" />
          </div>
          <div className="lg:col-span-8" data-reveal>
            <Faq items={faqs} />
          </div>
        </div>
      </section>
      <CtaBand
        location="home_closing"
        title="Kerro kohteesta – sovitaan tarkastus, mittaus tai testaus."
        text="Kuntotarkastukseen riittää usein osoite ja rakennusvuosi, betonitestaukseen koekappaleiden tiedot. Hinnat ovat valmiiksi tiedossa, ja palvelemme myös viikonloppuisin."
      />
    </>
  )
}
