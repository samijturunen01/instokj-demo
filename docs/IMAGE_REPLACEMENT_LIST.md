# Image replacement list

The company already has two strong authentic photos (lab specimens, moisture measurement). The illustrative Pexels
photos below may stay in production (licensed, clearly labelled, not misleading), but authentic photos would build more
trust. Priority = how much an authentic photo would help. Photos should be landscape unless noted, min. 2400 px wide,
no clients' faces without consent.

| Priority | Page / section | Current (Pexels) | Recommended authentic replacement | Size / orientation | Required before production? |
|---|---|---|---|---|---|
| 1 | Contact + home person card | `juvonen` 283 × 365 (authentic, low-res) | New portrait of Aleksanteri Juvonen, neutral background, B&W friendly | ≥ 900 × 1160, portrait | Recommended |
| 2 | Laboratorio | (only one lab photo exists) | Compression machine (Controls 2000 kN) with a specimen; specimen storage; tested cylinder showing fracture | 2400 px, landscape + 1 portrait | Recommended |
| 3 | Kuntotarkastus hero | `hirsipaaty` – log gable | An inspection in progress (attic, crawl space or façade) in Eastern Finland, client property anonymised | 2400 px, 4:5 or 4:3 | Optional |
| 4 | Vastaava työnjohtaja hero | `suunnitelmat` – supervisor with plans | Own site visit: checking documents/rebar on a real site (with permission) | 2400 px, 4:5 | Optional |
| 5 | Kuntotutkimus hero | `betonikaytava` | Structural opening (rakenneavaus) with insulation visible, sampling | 2400 px, 4:5 | Optional |
| 6 | Kosteusmittaukset "Milloin tilata" | `lattiakaivo` | Wet-room surface moisture measurement | 2400 px, landscape | Optional |
| 7 | Home service-area band | `talvitie` | Any Eastern Finland site photo by the company | 2400 × 1200 | Optional |
| 8 | Palvelut hero | `talo` | Collage-free single photo of company work | 2400 px, 4:5 | Optional |

Process: drop originals into `source-assets/`, point the entry in `scripts/process-images.mjs` to the new file,
set `authentic: true` and a credit in `src/data/photos.ts`, run `npm run images`.
