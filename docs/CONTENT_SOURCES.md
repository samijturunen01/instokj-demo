# Content sources – Insinööritoimisto KJ Oy

Research date: 24.11.2026. Primary source: the company's own website https://instokj.fi/ (pages `/`, `/palvelut/`,
`/laboratorio/`, `/hinnasto/`, `/yhteystiedot/`, `sitemap.xml`) and its two PDFs. All facts used on the site live in
`src/data/*.ts`.

## Verified facts used on the site

| Fact | Value | Source |
|---|---|---|
| Official name | Insinööritoimisto KJ Oy | instokj.fi footer; PRH/YTJ open data |
| Business ID / VAT ID | 3015554-8 / FI30155548 | instokj.fi/yhteystiedot; YTJ (`avoindata.prh.fi/opendata-ytj-api/v3/companies?businessId=3015554-8`) |
| Registered | Trade Register 6.8.2019 (business ID 1.8.2019), osakeyhtiö | YTJ |
| Main line of business | 71129 Muu tekninen palvelu | YTJ |
| Office and laboratory | Helatie 11, 80100 Joensuu | instokj.fi/yhteystiedot ("Toimisto ja laboratorio"), Google Business Profile |
| Map pin | 62.6249839, 29.7820812 | Google Business Profile "Insinööritoimisto KJ Oy" (category Rakennusinsinööri) |
| Phone | +358 44 972 7738 (044 972 7738) | instokj.fi, PDFs, Google |
| Email | toimisto@instokj.fi (general), aleksanteri.juvonen@instokj.fi | instokj.fi footer / yhteystiedot, PDFs |
| Contact person | Aleksanteri Juvonen – Insinööri (rakennetekniikka), Laboratoriovastaava. Areas: valvonta ja vastaavan työnjohtajan tehtävät; kuntotarkastukset ja mittaukset; laboratoriopalvelut | instokj.fi/yhteystiedot |
| Service area | Joensuu, Pohjois-Karjala ja muu Itä-Suomi | instokj.fi |
| Service days | "Palvelemme arkipäivisin ja viikonloppuisin" | instokj.fi |
| Travel costs | "Kuntotarkastusten matkakustannukset Joensuun talousalueella ja Itä-Suomen alueella sisältyvät hintoihin. Korvaukset pidemmistä matkoista sovitaan erikseen." | instokj.fi/hinnasto, PDF |
| Accreditation | FINAS testing laboratory **T359**, SFS-EN ISO/IEC 17025 | instokj.fi; FINAS mark |
| Accreditation date | Decision 9.2.2023 | FINAS "Uudet akkreditointipäätökset" list (finas.fi/ajankohtaista/paatokset) |
| Accredited methods | Betonin puristuslujuus SFS-EN 12390-3, betonin tiheys SFS-EN 12390-7 | instokj.fi/laboratorio (marked "Akkreditoitu") |
| Other lab methods | Halkaisuvetolujuus SFS-EN 12390-6, vetolujuus SFS 5445, tartuntalujuus SFS 5446, karbonatisoitumissyvyys SFS-EN 14630, absoluuttinen kosteus VTT 2650 | instokj.fi/laboratorio |
| Lab results | "Testaustulokset toimitetaan yleensä seuraavana arkipäivänä koekappaleiden testaamisesta." | instokj.fi/laboratorio |
| Specimen handling | Stored according to the standard throughout the testing chain; drilled cores, cylinder and cube specimens; own mould stock usable per customer needs | instokj.fi/laboratorio |
| Equipment | Controls 2000 kN (betonipuristin), LLOYD 30 kN (vetokone), Toni Technik 50 kN (puristus- ja taivutuskone); class 1; regular independent calibration | instokj.fi/laboratorio |
| Service descriptions | Kuntotarkastus (KH 90-00394), kuntotutkimus, vastaava työnjohtaja, kosteusmittaus, betonin kosteusmittaus (RT 14-10984) | instokj.fi/palvelut |
| Prices | See below | instokj.fi/hinnasto + PDF ver. 1.06 |
| Order form fields | Tilaaja, laskutusviite, näytteenottopaikka, jakelu, päivämäärä; per specimen: tunnus, valmistuspäivämäärä, koestusikä, lujuusluokka | `instokj_tilauslomake.pdf` ver. 1.03 (25.3.2025) |
| E-invoicing | Verkkolaskuosoite 003730155548, välittäjätunnus 003723327487, Apix Messaging Oy | instokj.fi/yhteystiedot, PDF |
| Partners (names) | Destia, TimberBros, Insinööritoimisto Mari Hälinen, Kuopio, NRC Group, Karelia Puutec, Aalto-yliopisto (+ EU emblem, see below) | instokj.fi homepage "Yhteistyökumppaneitamme" (logo files) |
| Trust mark | "Vastuu Group Luotettava Kumppani®" | instokj.fi footer (company-reported) |

### Prices (price list ver. 1.06, updated 25.3.2025)

Service prices incl. VAT 25.5 % (VAT 0 % in brackets): kuntotarkastus – built before 1990 1 000 € (796,81), 1990–2010
950 € (756,97), after 2010 900 € (717,13); kuntotutkimus, price range for a detached house 1 500–2 000 €
(1 195,22–1 593,63); kosteusmittaus – huoneisto 200 € (159,36), pientalo 300 € (239,04); betonin kosteusmittaus, three
points 250 € (199,20); vastaava työnjohtaja and valvonta – agreed case by case. Laboratory (VAT 0 %, VAT 25.5 % in
brackets): puristuslujuus 50 € (62,75), karbonatisoituminen 20 € (25,10), vetolujuus 50 € (62,75), absoluuttinen
kosteus 50 € (62,75), koekappaleiden päiden sahaus 15 € (18,83). The site shows only these published figures.

## Not used / needs customer confirmation

1. **Stale sitemap entries.** `sitemap.xml` (lastmod 2024-10-01) lists anchors that no longer exist on the pages:
   contacts *Matti Korhonen* and *Mika Keskisalo*, and services *Konsultointi ja kehityspalvelut*, *Rakennus- ja
   rakennesuunnittelu*, *Tietomallinnus*, *Hiilijalanjälkilaskenta*. Not presented. Ask whether these services/people
   should return. (A LinkedIn profile lists Mika Keskisalo as a board member of the company – not used.)
2. **Travel costs scope.** /palvelut/ says travel costs are included generally; /hinnasto/ and the PDF say
   *kuntotarkastusten* travel costs. The site uses the narrower wording. Confirm whether it applies to all services.
3. **Price boundaries.** "Ennen 1990 / 1990–2010 / 2010 jälkeen" – the calculator treats 1990 and 2010 as the middle
   band (950 €). Confirm.
4. **Laboratory price unit.** "Puristuslujuus 50 €" – the price list does not say per specimen; the site never says
   "per koekappale". Confirm the unit.
5. **Opening hours.** Not published on instokj.fi. Google profile shows partial hours (Tue 7–21). The site only says
   "arkipäivisin ja viikonloppuisin". Confirm hours and holiday practice before showing hours.
6. **EU emblem.** Shown among partner logos on instokj.fi. If it relates to EU co-funding, the funding communication
   rules apply (emblem + "Euroopan unionin rahoittama" in the right place). Not shown in the demo – confirm.
7. **Vastuu Group Luotettava Kumppani®** – company-reported; not verified from Vastuu Group's register.
8. **Registered postal address** (c/o, Ylämylly) in YTJ looks private – deliberately not shown.
9. **Process details** – report format/delivery for kuntotarkastus, response times, booking lead times, specimen
   delivery/pick-up: not published, so nothing is promised on the site.
10. **Google reviews** – the Google Business Profile has no reviews (24.11.2026), so there is no review section.
11. **PDF typo** – the price list PDF shows "Y-tunnus 30155548" (missing hyphen); correct form 3015554-8.
12. **Portrait** – the only photo of Aleksanteri Juvonen is 283 × 365 px; a new portrait would help.

## Market context (competitor scan, 24.11.2026)

- **Concrete testing in the region:** Karelia-ammattikorkeakoulu's laboratory in Joensuu (FINAS T308, compressive
  strength SFS-EN 12390-3 in scope); national labs Eurofins Contesta (T195, Vantaa/Parainen) and Labroc (T314,
  compressive strength tested in Helsinki/Oulu/Tampere). → A private accredited lab in Joensuu with next-working-day
  results is a strong local differentiator.
- **Condition inspections / site supervision in Joensuu:** larger engineering firms (e.g. Raksystems, Kiwa, AINS,
  Sitowise, Granlund) operate locally; inspection prices are rarely published (Kaleva cites ~1 500 € as a typical
  national average for a 4–5 h inspection). → KJ's fixed, published prices and weekend availability are visible
  differentiators; the site states facts only and makes no comparative claims.
