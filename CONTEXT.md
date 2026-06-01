# Astrologizer

A person describes a health concern (physical, mental, emotional) and the app returns the planetary **configuration** best suited to address it. Recommendations are timeless prescriptions — a set of target placements — not tied to any calendar date or live sky.

## Language

**Configuration**:
A set of planets, each with a recommended sign and condition (e.g. dignified, unafflicted, waxing), prescribed to address a given issue. The core output of the app. Exact degrees are intentionally out of scope for now, but the model leaves room to add them later.
_Avoid_: Constellation (a fixed star-pattern, unrelated), chart, placement set.

**Issue**:
A health concern a person wants to address, identified by the **seat** it afflicts (e.g. the eyes, the digestion, the mind). Selected through a guided picker that drills broad regions down to an atomic seat. The input to the app — a seat, and nothing more (the humoral nature of the complaint is no longer asked for; see **Humoral quality**).
_Avoid_: Problem, ailment, symptom.

**System**:
A named astrological tradition whose correspondences produce a configuration — e.g. classical Western medical astrology, Vedic/Jyotish. The app anchors to one system now but is modeled so more can be added.
_Avoid_: Tradition, school (use interchangeably in prose, but "system" is canonical in code/data).

**Seat**:
What an issue afflicts — a physical region (eyes, spine), a faculty (mind, emotions), or a vital function (digestion, circulation). The finite, citable bridge between a person's issue and the astrological correspondences. A seat is **atomic for now**: it maps to exactly one ruling sign and planet. Anatomically broad words ("back") are not seats but branches in the picker that drill down to atomic seats ("upper back/spine" → Leo/Sun, "lower back/loins" → Libra/Venus). The model leaves room to later let a seat carry multiple rulers. Physical seats are drawn from the classical melothesia (the "Zodiac Man"); faculties/functions from planetary rulerships (mind→Mercury, emotions→Moon).
_Avoid_: Body part (too physical), affected domain / domain (overloaded in software), organ, region.

**Treatment method**:
The doctrinal rule used to derive a configuration from an issue. Two are supported: **by sympathy** (strengthen the planet that governs the affected seat) and **by antipathy** (strengthen that planet's **contrary planet**). The app produces a configuration under each method. See `docs/adr/0003-antipathy-by-contrary-planet.md`.
_Avoid_: Approach, strategy.

**Contrary planet**:
The planet paired to another **by opposing rulership** — it rules the signs opposite the first planet's signs. Culpeper's antipathy pairs: **Sun ↔ Saturn**, **Moon ↔ Saturn**, **Mars ↔ Venus**, **Mercury ↔ Jupiter** (so Saturn is the contrary of both lights). Antipathy strengthens the seat ruler's contrary planet. Citable to Culpeper, not a recomputed humoral opposite.
_Avoid_: Opposite, enemy.

**Humoral quality**:
The Galenic hot/cold/wet/dry classification of the classical planets and signs (Ptolemy). It is the **explanatory commentary** behind the methods — e.g. "Mars is hot and dry; Venus, cold and wet, is its contrary" — but it does **not** compute the recommendation: antipathy pairs planets by opposing rulership, which is why **Sun ↔ Saturn** (both dry) is a valid pair even though it is not a clean humoral opposite. No longer attached to an issue and never asked of the user.
_Avoid_: Temperament, humour (reserve for the four classical humours specifically).

**Dignity**:
A sign in which a planet is essentially strong — its **domicile** (rulership) or **exaltation**. "Strengthening" a planet means placing it in one of its dignities. Derived from the classical dignity tables.
_Avoid_: Rulership (that's specifically domicile; "dignity" covers both domicile and exaltation).

**Condition**:
A required state of a planet in a configuration, from a controlled vocabulary: `dignified` (in domicile/exaltation), `unafflicted` (free of hard aspects from malefics), `waxing` (Moon only). A planet carries **one or more** conditions at once — every entry is `dignified` and `unafflicted`; the Moon additionally carries `waxing`. Extensible.
_Avoid_: State, status.

**Citation**:
A verbatim passage from a classical source that backs a single **knowledge unit** — a body-part rulership, a planet's dignities, a planet's temperament, or the cure-by-contraries doctrine. Carries the quoted words, the source (author/work/year), and a locator (book/chapter). Citations attach to the knowledge units, not to results; the engine gathers the citations of every unit a configuration was actually derived from. The two sources are **Ptolemy's _Tetrabiblos_** (the astrological mechanics — dignities, planetary natures, contraries) and **Culpeper's _Astrological Judgement of Diseases_, 1655** (the melothesia and medical application). See `docs/adr/0002-citations-on-knowledge-units.md`.
_Avoid_: Reference (reserve "source" for the work a citation points to, not the citation itself).

**Knowledge unit**:
The smallest sourceable fact in the knowledge base — one seat→ruler mapping, one planet's dignities, one planet's temperament, or the contraries doctrine. Each carries its own **citation**. Recommendations are assembled from knowledge units, which is why citations aggregate up from them rather than being attached to the output.
_Avoid_: Fact, rule, entry.
