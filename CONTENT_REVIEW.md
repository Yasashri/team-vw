# Team VW content review

This file records migration questions instead of silently guessing. The website can ship with the verified content currently available, but these items should be checked by a Team VW administrator before final production launch.

## 1. Current roster vs. recent news

The live **People** page currently lists:

- Vincent C.-C. Wang
- Yu-Syuan Tsai
- Charasee Laddika Dayawansa
- Ramasubramanian Ramamoorthy
- Yu-Wei Chen
- Sulakshi Heenatigala
- Ganga Udayan
- Yi-Ching Lee
- Kun-Lin Wu
- Tsung-Yuan Wu
- Nicholas Huang
- Anjana E S
- Sharon Hsing

The live **News** archive also reports these 2026 arrivals/mentions which are not yet represented as current People-page profiles:

- Ben
- Cher
- Hailey
- Evian

Before adding profile cards, confirm full names, roles, bios and whether they should appear in the current roster.

## 2. February 2026 wording inconsistency

The live news entry says: “Welcome to two new members, Ganga, Nicolas and Evian,” which names three people. The redesign normalizes the visible title to **Welcome Ganga, Nicolas and Evian** without stating a number.

Confirm the intended wording.

## 3. Nicholas / Nicolas spelling

The People page uses **Nicholas Huang**. The February 2026 news entry spells the name **Nicolas**. The current profile preserves the People-page spelling. Please confirm the preferred spelling for historical news.

## 4. Hanna / Shi-Han Huang

The Alumni page lists **Shi-Han Huang (Hanna)** as a former undergraduate researcher. 2025–2026 news includes multiple recent Hanna awards and activities. Confirm whether Hanna should remain in Alumni, move back to Current Team, or appear in another status.

## 5. Yu-Syuan Tsai biography

The current People page identifies Yu-Syuan as a PhD student but part of the biography still says she “just completed” an MS thesis. This may simply be historical context. Consider updating the bio to reflect the current PhD project and status more clearly.

## 6. Current member photography

Google Sites image endpoints block reliable direct extraction and should not be used as production hotlinks. The new site currently uses branded initials-based portrait fallbacks.

Please provide original approved portraits for:

- PI
- postdoctoral researchers
- current PhD students
- current MS students
- undergraduate researchers/interns
- administration

Drop files into `public/images/team/` and add the `image` path in `src/data/people.ts`.

## 7. News and lab-life photography

Original Google Sites photos were not copied because of access/hotlink restrictions. Provide approved originals for the news/lab-life archive and connect paths in `src/data/news.ts`.

## 8. Publication metadata

The current live publication page now contains five 2026 records. The redesign preserves all publication entries displayed there and adds DOI links where they were directly verifiable.

Before launch, consider checking:

- final volume/issue/pages for items currently marked ASAP
- equal-contribution symbols (`‡`, `+`) and corresponding notes
- corresponding-author markers (`*`)
- whether all preprint links should be retained
- graphical-abstract reuse permission

## 9. Journal title normalization

The original 2026 copper-CO₂ entry displays “J. Am. Soc. Chem.” while its publisher destination is a JACS DOI. The redesign uses the standard full journal title **Journal of the American Chemical Society**. Confirm this normalization is preferred.

## 10. Recruitment availability

The original site says Team VW expects to accept **2–3 MS students every year** and is “always looking” for postdoctoral researchers. Treat these as lab statements rather than guaranteed openings. Confirm availability before launch and whenever recruitment status changes.

## 11. TEEP / IIPP

The redesign links to the official TEEP and IIPP program portals rather than preserving potentially stale deep links. Program dates and funding change annually. Review the Join Us page once per recruitment cycle.

## 12. Source-of-truth recommendation

After migration, maintain people, publications and news in this React project rather than separately editing Google Sites. That will prevent the new site and legacy site from drifting apart.
