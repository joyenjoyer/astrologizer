# Slice 1 — Tracer: one seat, sympathy only, full rich view

> Type: AFK · ready-for-agent · Source: docs/PRD.md

## What to build

The thinnest end-to-end path through every layer, to prove they integrate. A person opens the app, picks a single available seat, and sees a complete recommendation rendered in the one rich view.

Scope:
- A minimal **knowledge base** holding one seat (e.g. heart / upper-back-spine → Leo / Sun) plus the dignity table entries for that seat's ruling planet, with a citation. The loader validates the data on load (ruler, humoral quality, and citation present).
- The **recommendation engine**'s `recommend()` implemented for the **by-sympathy** path only: seat → ruling planet → dignified signs → configuration, with a rationale and citations populated. (Antipathy may return empty / be omitted for now.)
- A **picker** that lets the person select the single available seat.
- The **rich view**: render the sympathy configuration — each planet with its dignified sign(s) labeled domicile/exaltation, the condition(s), the one-line rationale, and the citation.

Respects ADR-0001: the `system` field flows through the data and the configuration even though only `classical-western` is populated.

## Acceptance criteria

- [ ] Selecting the available seat in the running app produces a rendered sympathy configuration end-to-end.
- [ ] Each planet entry shows its dignified sign(s) labeled as domicile or exaltation, plus condition(s).
- [ ] The rich view shows a plain-language rationale and a citation for the recommendation.
- [ ] The knowledge-base loader rejects data missing a ruler, humoral quality, or citation.
- [ ] Tests cover: KB validation, the dignities resolver, the sympathy path of `recommend()`, and picker selection → `Issue`.
- [ ] `recommend()` is deterministic (same issue → same output).

## Blocked by

- None — can start immediately (builds on the committed scaffold).
