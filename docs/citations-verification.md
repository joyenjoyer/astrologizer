# Citation verification tracker

Per [ADR-0002](adr/0002-citations-on-knowledge-units.md), every knowledge unit
behind a recommendation must carry a **verified verbatim quote**. This file
tracks the provenance and verification status of each quote shipped in the data
so a reviewer can confirm (or correct) every one. A recommendation is not truly
"done" until all the units it uses are `VERIFIED`.

Status legend: ✅ VERIFIED (human-checked against the source) · 🟡 TRANSCRIBED
(pulled from a source online, needs a human to confirm wording + edition) ·
🔴 PLACEHOLDER (not a real quote — must be replaced).

## Ptolemy, *Tetrabiblos* — temperaments & dignities

Source fetched: full-text PDF at
`classicalastrologer.com/wp-content/uploads/2012/12/tetrabiblos_01a1d11.pdf`
(also at sacred-texts.com/astro/ptb/ and archive.org). **Caveat:** the file is
labelled as the Ashmand (1822, public-domain) translation, but the prose
("humidifying", "fertilizing winds", "absorptive of moisture") reads as the
Robbins/Loeb (1940) translation. **A reviewer must confirm which edition this is
and whether it is clear for reuse** — if it is Robbins, either swap in the
Ashmand wording or confirm fair-use is acceptable for these short excerpts.

| Unit | Locator | Status |
|---|---|---|
| Planet temperaments (Sun, Moon, Saturn, Mars, Jupiter, Venus, Mercury) | Book I, ch. 4 | 🟡 TRANSCRIBED — `src/engine/humors.ts` `TEMPERAMENT_CITATIONS` |
| Planet dignities (all 7) | Book I, chs. 17 & 19 | 🟡 TRANSCRIBED — `src/engine/dignities.ts` `DIGNITY_CITATIONS`. Quotes use `…` ellipses and `[ ]` editorial insertions to join the house + exaltation sentences; confirm these are faithful. |

## Culpeper, *Astrological Judgement of Diseases* (1655) — melothesia & antipathy

**Could not be sourced freely online.** No clean full text is available
(EEBO/Wellcome is behind institutional access; Google Books preview is
partial). Every Culpeper quote currently shipped is a 🔴 PLACEHOLDER paraphrase,
clearly marked inline with `[unverified placeholder — needs real Culpeper
passage]` so it cannot be mistaken for a transcription.

| Unit | Locator | Status |
|---|---|---|
| Contrary-pairing / cure-by-antipathy doctrine | "Of the Cure of Diseases by Antipathy" | 🔴 PLACEHOLDER — `src/engine/humors.ts` `CONTRARY_CITATION` |
| Seat → ruler melothesia (all 14 seats) | per sign | 🔴 PLACEHOLDER — `src/data/seats.ts` |

## Planet engravings (slice ③)

Per the "nothing fake ships" ethos, no engraving assets are bundled yet:
`planetImage()` returns `undefined` for every planet and the UI falls back to
the real Unicode glyph (`planetGlyph`). 🔴 TODO: source public-domain (pre-1900)
deity engravings, bundle them locally under the repo, and register them in
`src/ui/planetImage.ts` with a credit line each. Until then the glyphs stand in.

### To finish slice ② (Culpeper)
1. Obtain a copy of the 1655 text (or a faithful reprint, e.g. Astrology Classics).
2. Replace each placeholder with the verbatim passage + accurate locator.
3. Flip the inline marker off and update this table to ✅.
4. The load-time validator only checks a quote is *present*, not *correct* — so
   this human pass is the real guardrail ADR-0002 relies on.
