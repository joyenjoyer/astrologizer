# Slice 2 — Add antipathy as the second treatment method

> Type: AFK · ready-for-agent · Source: docs/PRD.md

## What to build

Extend the end-to-end path so the app derives and shows the **by-antipathy** recommendation alongside sympathy. The person now also tells the app the *nature* of the complaint, and sees both methods compared.

Scope:
- Add **humoral-quality** data to planets and signs, and a **contraries** map (humoral quality → contrary quality) in the knowledge base.
- A **contraries resolver**: humoral quality → contrary quality → the planets/signs carrying that contrary quality.
- The **antipathy** derivation path in `recommend()`: issue quality → contrary quality → contrary-quality planets → their dignified signs → configuration, with rationale and citations.
- Extend the **picker** to its second level: after choosing the seat, choose the nature of the complaint (e.g. hot/inflamed vs cold/watery), producing an `Issue(seat, quality)`.
- The **rich view** now shows **both** methods side by side, each clearly labeled, each with its own rationale and citations.

## Acceptance criteria

- [ ] After picking a seat, the person picks the complaint's nature, and both sympathy and antipathy configurations render side by side.
- [ ] The antipathy configuration brings in planets/signs of the quality contrary to the affliction (and not the afflicting ones).
- [ ] Each method is labeled and carries its own rationale and citations.
- [ ] Tests cover the contraries resolver and the antipathy path of `recommend()` (e.g. a hot & dry affliction yields cooling, moist planets).

## Blocked by

- Slice 1 — Tracer: one seat, sympathy only, full rich view.
