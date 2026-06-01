# PRD: Astrologizer — Citable Antipathy, Seat-Only Issues, and the Explainer

> Status: ready-for-agent (no issue tracker configured — published as a doc, per repo convention)
> Vocabulary: see `CONTEXT.md`. Respects `docs/adr/0001`, `0002`, `0003`.
> Supersedes the antipathy/quality model in `docs/PRD.md` (the melothesia seat data and engine/UI split from that PRD still stand).

## Problem Statement

The first build (slices 1–3) shipped a working recommender, but a design review surfaced four problems from the user's perspective:

1. **The recommendations aren't actually trustworthy to verify.** Citations are bare per-seat strings, and the antipathy result cites the seat's body-part source (Culpeper's melothesia) for a result derived from planetary *temperaments* that source never discusses. A skeptic who checks the citation finds it doesn't back the claim.
2. **The antipathy doctrine doesn't match practice and can't be quoted.** It recomputes a humoral opposite from a user-picked complaint nature — a reconstruction no classical text states verbatim, and one that contradicts Culpeper for the luminaries.
3. **People don't understand the app** — neither the mechanics (how the picker flows) nor the dense jargon in the result (sympathy, antipathy, domicile, exaltation, condition).
4. **The result is visually bare** — nothing evokes the planet a recommendation centers on.

## Solution

Rework the engine and data so every recommendation is **traceable to a verified verbatim quote** from one of two classical sources (Ptolemy's *Tetrabiblos*, Culpeper's *Astrological Judgement of Diseases*), and so **antipathy follows Culpeper's practiced rule** — strengthen the **contrary planet** of the seat's ruling planet (paired by opposing rulership), rather than recomputing a humoral opposite.

Because the contrary-planet rule is fully determined by the seat's ruler, the **humoral-quality picker is removed** and an **Issue collapses to a seat alone**. Humoral quality survives only as explanatory commentary in the rationale.

Make the app self-explanatory: a dismissible **"How this works"** intro for the mechanics, and **glossary popovers** on every underlined jargon term (sourced from the same glossary as `CONTEXT.md`) for the concepts. Give each planet in a result a **public-domain classical engraving** of its deity, bundled offline, with the astrological glyph as a fallback.

The app stays fully offline, deterministic, no AI, no backend.

## User Stories

1. As a skeptical user, I want each recommendation to show the actual quoted classical passage behind it, so that I can read the source's own words rather than chase a reference.
2. As a skeptical user, I want the quote to match what the recommendation actually used — the dignities, the contrary pairing, the rulership — so that the citation genuinely backs the claim.
3. As a skeptical user, I want the antipathy result to cite where its contrary-planet pairing comes from (Culpeper), so that it is not justified by an unrelated body-part source.
4. As a skeptical user, I want each citation to name its source and locator (work + book/chapter), so that I can find the passage myself.
5. As a maintainer, I want every sourceable knowledge unit (seat→ruler, dignities, contrary pairs, planet temperaments) to carry its own citation with a verbatim quote, so that recommendations assemble their citations from the units actually used.
6. As a maintainer, I want load-time validation to reject any knowledge unit missing a source, locator, or quote, so that an un-citable recommendation can never ship.
7. As a maintainer, I want `unafflicted` exempt from the quote requirement, so that a generic prescriptive instruction isn't blocked for lack of a passage.
8. As a person with a health concern, I want to pick what's troubling me and immediately get a recommendation, so that I don't have to also classify the "nature" of my complaint.
9. As a person with a health concern, I want treatment by antipathy to strengthen the planet contrary to the one governing my affected part, so that the contrary follows the classical pairing (Sun/Moon↔Saturn, Mars↔Venus, Mercury↔Jupiter).
10. As a user with a complaint in a Sun- or Moon-ruled seat, I want Saturn offered as the antipathy planet, so that the recommendation matches Culpeper rather than a humoral guess.
11. As a user, I want treatment by sympathy to still strengthen the planet governing the affected seat, so that the two methods remain a clear contrast.
12. As a user, I want each planet shown with its dignified signs labeled domicile or exaltation, so that I understand the choices.
13. As a user, I want each planet's conditions shown — dignified and unafflicted, plus waxing when it's the Moon — so that I get the full prescription.
14. As a user, I want a one-line plain-language rationale per method, including the humoral reasoning where it applies ("Mars is hot and dry; Venus, its cold and moist contrary, counters it"), so that I understand the why.
15. As a first-time user, I want a short "How this works" introduction I can dismiss, so that I understand the three steps before I start.
16. As a confused user, I want every astrological term underlined, so that I can tell which words have an explanation.
17. As a confused user, I want to hover (or tap, on touch) an underlined term to see a plain-language definition, so that I learn the jargon in place without leaving the result.
18. As a maintainer, I want the popover definitions to come from the same glossary as `CONTEXT.md`, so that the in-app help and the canonical vocabulary can't drift apart.
19. As a user, I want each planet in a result shown with an aesthetic classical engraving of its deity, so that the result feels grounded in the tradition rather than bare.
20. As a user, I want the images to load offline with the rest of the app, so that nothing is fetched from a server.
21. As a user, I want a small credit line under each engraving, so that the artwork's provenance is as honest as the text citations.
22. As a user, I want a clean planetary glyph shown when an engraving isn't available, so that every planet still has a visual mark.
23. As a maintainer, I want `seat.quality` removed from the seat model and its validation, so that a never-read field stops implying the complaint's nature lives on the seat.
24. As a maintainer, I want `COMPLAINT_NATURES` and the nature-selection UI removed, so that the picker reflects that an Issue is just a seat.
25. As a maintainer, I want the `system` field preserved throughout (per ADR-0001), so that multi-system support stays a data addition.
26. As a maintainer, I want results to remain deterministic and offline, so that the same seat always yields the same recommendation with no network calls.
27. As a maintainer, I want the stale complaint-nature user stories in `docs/PRD.md` rewritten or marked superseded, so that the original PRD doesn't contradict the new model.

## Implementation Decisions

**Shared types (`types.ts`)**
- New `Citation = { source: string; locator: string; quote: string }`.
- `Configuration.citations` becomes `Citation[]` (was `string[]`), aggregated by the engine from the knowledge units used.
- `Issue` becomes `{ seat: Seat }` — drop `quality`.
- `Seat` drops `quality`.
- `ConfigurationEntry.conditions` stays `Condition[]`.

**Antipathy resolver (`contraryPlanetsOf`, reshaping `humors.ts`)** — deep module.
- Replaces `contraryOf` / `planetsWithQuality`.
- Interface: `contraryPlanetsOf(planet: Planet): Planet[]`, a fixed map grounded in opposing rulership: Sun→[Saturn], Moon→[Saturn], Saturn→[Sun, Moon], Mars→[Venus], Venus→[Mars], Mercury→[Jupiter], Jupiter→[Mercury].
- Planet temperaments remain as data, exposed (e.g. `temperamentOf(planet)`) only to flavor the rationale — they no longer compute the antipathy set.
- The contrary pairing carries its own Culpeper citation (per ADR-0002/0003).

**Recommendation engine (`recommend.ts`)** — the core deep module. Interface: `recommend(issue: { seat }) → { sympathy, antipathy }`.
- Sympathy: `seat → rulingPlanet → strengthen` (dignified signs).
- Antipathy: `seat → rulingPlanet → contraryPlanetsOf → strengthen each`.
- `strengthen(planet)` emits dignities (labeled) and conditions `["dignified","unafflicted"]`, appending `"waxing"` iff `planet === "Moon"`.
- Each Configuration's `citations` are the de-duplicated `Citation`s of the exact units used (sympathy: melothesia + dignities; antipathy: contrary-pair + dignities + temperaments referenced in the rationale).
- Rationale text uses humoral commentary where the pair is a clean humoral opposite; otherwise states the opposing-rulership basis.

**Dignities resolver (`dignities.ts`)** — interface `dignitiesOf(planet)` unchanged; entries gain Ptolemy citations.

**Knowledge base + loader (`knowledgeBase.ts`)** — deepened to validate all sourced units, not just seats.
- Drops the `seat.quality` check.
- Validates that each sourced unit (seat→ruler, each dignity entry, each contrary pair, each temperament) has a `Citation` with non-empty `source`, `locator`, and `quote`. `unafflicted` is exempt (it is not a sourced fact).
- Invalid data fails loudly at load.

**Picker (`picker.ts`, `pickerTree.ts`)**
- Remove `COMPLAINT_NATURES` and the second selection level.
- `selectIssue(kb, seatId): Issue` returns `{ seat }`.
- Tree navigation (`flattenSeatIds`, branch drilling) unchanged.

**Glossary (`glossary.ts`)** — new pure data module.
- Term → plain-language definition, covering every jargon term the UI underlines: `sympathy`, `antipathy`, `dignity`, `domicile`, `exaltation`, `condition`, `dignified`, `unafflicted`, `waxing`, `humoral quality`, `contrary planet`, `seat`, `configuration`.
- Kept aligned with the `CONTEXT.md` glossary (single source of truth for the plain-language definitions).

**Planet imagery (`planetImage.ts` + bundled assets)** — registry.
- `planetImage(planet): { src; credit } | undefined`; UI falls back to the glyph when absent.
- Assets are public-domain (pre-1900) engravings, bundled locally (no external requests, per ADR-0001 ethos).

**React UI (`App.tsx`)** — stays shallow.
- Remove the nature dropdown.
- Add a dismissible "How this works" intro strip framing the steps.
- Render conditions; render the per-planet engraving (with credit) or glyph fallback.
- A `Term` popover component: dotted-underline + hover/tap → glossary definition.
- Render the richer `Citation` (quote + source + locator) per configuration.

## Testing Decisions

A good test asserts **external behavior through a module's public interface** — feed an input, assert the returned shape/values — not private helpers or data-file layout. Prior art: `src/engine/recommend.test.ts`, `dignities.test.ts`, `knowledgeBase.test.ts` (Vitest, pure-function unit tests). The existing antipathy tests in `recommend.test.ts` that expect the humoral result (`["Moon","Venus"]` for a hot/dry heart issue, and the `quality` fields on the fixture) must be **rewritten** to the contrary-planet model.

Modules to test (all selected):
- **`recommend` (core):** sympathy strengthens the seat's ruler with labeled dignities; antipathy returns the correct contrary planet(s) per Culpeper's pairs — including **Saturn** for a Sun- or Moon-ruled seat (the case the old rule got wrong); a Moon entry carries `waxing` while others do not; `citations` aggregate the actual units used (and are `Citation` objects with quotes); determinism (same seat → same result). Cover at least one seat per planet so all dignity and contrary logic is exercised.
- **`contraryPlanetsOf`:** each of the seven planets maps to its correct contrary by opposing rulership; Saturn maps to both luminaries.
- **`dignitiesOf`:** each planet returns its correct domicile(s) and exaltation (carry forward existing).
- **KB loader + citations:** valid data loads; a unit missing `source`/`locator`/`quote` fails loudly; `seat.quality` is no longer required (its absence loads fine); the full starter set passes validation.
- **`glossary` completeness:** every jargon term the UI underlines resolves to a definition (no underlined term without a popover).
- **Picker:** navigating the tree to a leaf yields `Issue { seat }`; broad branches (e.g. "Back") resolve to atomic seats; `flattenSeatIds` covers the tree; there is no quality step.

## Out of Scope

- Exact planetary degrees in configurations.
- A graphical chart / zodiac wheel.
- Free-text symptom entry and any AI/LLM classification.
- Additional astrological systems beyond classical Western (modeled for, not built — ADR-0001).
- Multi-ruler seats (seats stay atomic).
- Time-bound / ephemeris recommendations.
- A verbosity toggle.
- Secondary seats per sign (shoulders, breast, ears) — still a fast follow.
- Any backend, accounts, persistence, or analytics.
- Re-introducing a humoral-quality input expecting it to drive antipathy (ADR-0003 deliberately removes it).

## Further Notes

- The single biggest behavioral change: a Sun- or Moon-ruled seat now yields **Saturn** by antipathy, not the old cold/wet planets. Tests and any reviewer should treat that as the intended fix, not a regression.
- Suggested slicing, smallest blast radius first: **① engine + data** (contrary-planet antipathy, drop quality, rewrite stale PRD stories) → **② citation model** (Citation type, unit-level quotes, loader validation, richer citation rendering) → **③ UI** (intro, glossary popovers, engravings). The glossary module lands with ③ but its content mirrors `CONTEXT.md`.
- Sourcing the verbatim quotes (all dignity cells, temperaments, contrary pairs, melothesia) is real authoring work; per ADR-0002 a recommendation does not ship until its units are quoted, so quote-sourcing is part of slice ②'s definition of done.
