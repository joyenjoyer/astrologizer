# PRD: Astrologizer — Medical Astrology Configuration Recommender (Starter)

> Status: ready-for-agent (not yet published to an issue tracker — none configured)
> Vocabulary: see `CONTEXT.md`. Respects `docs/adr/0001-anchor-one-system-model-for-many.md`.

## Problem Statement

A person has a health concern — physical, mental, or emotional — and wants to know which planetary **configuration** would be most beneficial for addressing it according to classical medical astrology. Today that knowledge is locked in scattered, hard-to-read classical texts. There's no simple, trustworthy tool that turns "my eyes are inflamed" into a clear, source-cited astrological prescription.

## Solution

A static web app. The person navigates a short guided picker to identify their **issue** (a *seat* — what's afflicted — plus the *humoral quality* of the complaint). The app returns the recommended **configuration(s)**: which planets to strengthen and in which signs, derived two ways — **by sympathy** (strengthen what governs the seat) and **by antipathy** (counter the affliction's quality with its contrary) — shown side by side in one rich view with a plain-language rationale and citations to classical sources.

The app is fully offline and deterministic: no AI, no external API, no backend. All knowledge is hand-authored static data, citable to its source.

## User Stories

1. As a person with a health concern, I want to pick what's bothering me from a guided list, so that I don't have to know any astrological or medical terminology.
2. As a person with a back ache, I want to drill from a broad area ("Back") down to the specific seat ("upper back / spine" vs "lower back / loins"), so that I get an accurate recommendation.
3. As a person with a mental concern (e.g. anxiety, rumination), I want to find it under a non-physical category (Mind / Emotions), so that the tool works for more than just bodily ailments.
4. As a person with an emotional concern, I want the same guided flow as physical ones, so that the experience is consistent.
5. As a user, after choosing the seat, I want to specify the *nature* of the complaint (e.g. hot/inflamed vs cold/watery), so that the antipathy recommendation is correct.
6. As a user, I want to see the recommended configuration **by sympathy**, listing each planet and the sign(s) where it should be placed, so that I know what to strengthen.
7. As a user, I want to see the recommended configuration **by antipathy**, so that I have the contrary-treatment option as well.
8. As a user, I want both methods shown side by side and clearly labeled, so that I can compare them.
9. As a user, I want each planet shown with its dignified sign options labeled as *domicile* or *exaltation*, so that I understand my choices rather than being handed an arbitrary pick.
10. As a user, I want each planet's required **condition** shown (dignified / unafflicted / waxing), so that I know the full prescription, not just the sign.
11. As a user, I want a one-line plain-language rationale for each method, so that I understand *why* these planets were chosen.
12. As a skeptical user, I want citations to the classical source for each recommendation, so that I can trust it and verify it.
13. As a user, I want everything in a single rich view (configuration + rationale + citations), so that I don't have to toggle between modes.
14. As a user, I want the result in clear text, so that it's readable before any graphical chart exists.
15. As a user, I want the app to load and run entirely in my browser, so that it works offline and sends none of my health concerns to a server.
16. As a user, I want results to be deterministic, so that the same issue always yields the same recommendation.
17. As a user on the web, I want to reach the app from a public URL (GitHub Pages), so that I don't have to install anything.
18. As a maintainer, I want the astrological logic to live in a pure engine module separate from the UI, so that I can test it without a browser and reuse it later.
19. As a maintainer, I want the knowledge base to be hand-authored static data with citations, so that recommendations stay credible and reviewable.
20. As a maintainer, I want the data model to carry a `system` field even though only classical Western is populated, so that other systems (e.g. Vedic) can be added later without re-architecting (per ADR-0001).
21. As a maintainer, I want seats modeled as atomic (one ruling sign + planet each), so that the engine is a clean lookup and antipathy stays well-defined.
22. As a maintainer, I want the knowledge base validated on load (every seat has a ruler, a humoral quality, and a citation), so that authoring mistakes surface immediately.
23. As a maintainer, I want a starter knowledge base covering the full melothesia (one atomic seat per zodiac sign, head to toe) plus Mind and Emotions, so that every common complaint lands somewhere and all 7 planets / 12 signs are exercised.
24. As a future maintainer, I want the model to leave room for exact degrees, multi-ruler seats, free-text input, additional systems, a verbosity toggle, and a graphical chart, so that these are additive rather than rewrites.

## Implementation Decisions

**Architecture**
- Static, offline, deterministic web app. No AI, no external API, no backend. Deployed to GitHub Pages via a build step.
- **Engine/UI split:** a pure TypeScript engine (no DOM, no network) under a thin React UI. Tech: TypeScript + React + Vite.

**Modules**
- **Knowledge base** — hand-authored static data + a typed loader that validates on load. Holds: seats (ruling sign, ruling planet, humoral quality, citation, `system`), dignity tables (planet → domicile + exaltation signs), planet/sign humoral qualities, and a contraries map (quality → contrary quality). Interface: typed accessors. Invalid data (missing ruler/quality/citation) fails loudly at load.
- **Recommendation engine** — the core deep module.
  - Interface: `recommend(seat, quality) → { sympathy: Configuration, antipathy: Configuration }`.
  - Pure and deterministic. Composes two pure sub-resolvers:
    - **Dignities resolver:** `planet → { domicile, exaltation }` signs.
    - **Contraries resolver:** `humoral quality → contrary quality → planets/signs carrying that contrary quality` (the antipathy brain).
  - Sympathy path: seat → ruling planet → dignified signs → configuration entries.
  - Antipathy path: issue quality → contrary quality → contrary-quality planets → their dignified signs → configuration entries.
- **Picker model** — the seat catalog as a navigable tree. Broad regions ("Back") are branches; leaves are atomic seats; a second level captures the humoral quality of the complaint. Interface: tree structure + `selection → Issue(seat, quality)`. Pure data, no React.
- **React UI** — deliberately shallow. Renders the picker, calls `recommend`, renders one rich view: both methods side by side, each entry as planet + labeled dignified sign(s) + condition, plus per-method rationale and citations.

**Data shapes (decisions, not final types)**
- `Issue` = `{ seat, quality }`.
- `Configuration` = a labeled set of entries, each `{ planet, signs: [{ sign, dignity: 'domicile' | 'exaltation' }], condition }`, plus `method` ('sympathy' | 'antipathy'), `rationale`, `citations`, and `system`.
- `Condition` ∈ controlled vocabulary `{ dignified, unafflicted, waxing }` (waxing applies to the Moon only).
- Exact degrees are intentionally **excluded** from `Configuration` for now (un-citable), but the shape leaves room to add them.

**Starter knowledge-base scope (14 seats)**
- Full melothesia, one atomic seat per sign: Aries/head (Mars), Taurus/neck-throat (Venus), Gemini/arms-hands-lungs (Mercury), Cancer/chest-stomach (Moon), Leo/heart-upper-back-spine (Sun), Virgo/abdomen-intestines-digestion (Mercury), Libra/lower-back-kidneys (Venus), Scorpio/genitals-bladder (Mars), Sagittarius/hips-thighs (Jupiter), Capricorn/knees-bones-skin (Saturn), Aquarius/calves-ankles-circulation (Saturn), Pisces/feet (Jupiter).
- Plus two non-physical seats: Mind/intellect/nerves (Mercury), Emotions/moods (Moon).
- Source: classical Western medical astrology (e.g. Ptolemy *Tetrabiblos*, Culpeper, Lilly); each seat carries its citation.

## Testing Decisions

A good test here asserts **external behavior through a module's public interface**, not its internals: feed an input, assert the returned shape/values. Tests must not couple to private helpers or data-file layout.

Modules to test (the user asked for **all** testable modules):
- **Recommendation engine** (`recommend`): for representative issues, assert the returned sympathy and antipathy configurations contain the expected planets, dignified signs (labeled domicile/exaltation), and conditions. E.g. eyes → sympathy strengthens Sun & Moon; hot/dry affliction → antipathy brings in cooling/moist planets and not the afflicting ones. Cover at least one seat per planet so all dignity logic is exercised. Assert determinism (same input → same output).
- **Dignities resolver:** each planet returns its correct domicile and exaltation signs.
- **Contraries resolver:** each humoral quality maps to the correct contrary and to the right contrary-quality planets/signs.
- **Picker model:** navigating the tree to a leaf + quality yields the correct `Issue(seat, quality)`; broad branches resolve to atomic seats.
- **Knowledge base loader/validation:** valid data loads; data missing a ruler, humoral quality, or citation fails loudly. The full 14-seat starter set passes validation.

Prior art: none yet (greenfield). Establish the convention with this PRD's tests — pure-function unit tests against module interfaces, using Vitest (Vite-native).

## Out of Scope

- Exact planetary degrees in configurations.
- A graphical chart / zodiac wheel (text only for now).
- Free-text symptom entry and any AI/LLM symptom classification.
- Additional astrological systems beyond classical Western (modeled for, not built).
- Multi-ruler seats (seats are atomic for now).
- Time-bound recommendations / ephemeris / "when does the sky match" computation.
- A verbosity toggle (one rich view only for now).
- Secondary seats per sign (shoulders, breast, ears, …) — a fast follow, not in the starter 14.
- Any backend, account system, persistence, or analytics.

## Further Notes

- The only genuinely fuzzy step in the domain (free text → known issue) is sidestepped entirely by the guided picker; this is what keeps the app deterministic and AI-free.
- The `system` field is load-bearing despite having one value — see ADR-0001 so it isn't "simplified" away.
- Resolution chain for implementers: `Issue(seat + quality)` → seat's ruling sign+planet (**sympathy**) and contrary of quality (**antipathy**) → `Configuration(s)`, both shown.
