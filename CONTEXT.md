# Astrologizer

A person describes a health concern (physical, mental, emotional) and the app returns the planetary **configuration** best suited to address it. Recommendations are timeless prescriptions — a set of target placements — not tied to any calendar date or live sky.

## Language

**Configuration**:
A set of planets, each with a recommended sign and condition (e.g. dignified, unafflicted, waxing), prescribed to address a given issue. The core output of the app. Exact degrees are intentionally out of scope for now, but the model leaves room to add them later.
_Avoid_: Constellation (a fixed star-pattern, unrelated), chart, placement set.

**Issue**:
A health concern a person wants to address, identified as a **seat plus a humoral quality** (e.g. eyes + hot/dry). Selected through a two-level guided picker (seat, then the nature of the complaint). The input to the app.
_Avoid_: Problem, ailment, symptom.

**System**:
A named astrological tradition whose correspondences produce a configuration — e.g. classical Western medical astrology, Vedic/Jyotish. The app anchors to one system now but is modeled so more can be added.
_Avoid_: Tradition, school (use interchangeably in prose, but "system" is canonical in code/data).

**Seat**:
What an issue afflicts — a physical region (eyes, spine), a faculty (mind, emotions), or a vital function (digestion, circulation). The finite, citable bridge between a person's issue and the astrological correspondences. A seat is **atomic for now**: it maps to exactly one ruling sign and planet. Anatomically broad words ("back") are not seats but branches in the picker that drill down to atomic seats ("upper back/spine" → Leo/Sun, "lower back/loins" → Libra/Venus). The model leaves room to later let a seat carry multiple rulers. Physical seats are drawn from the classical melothesia (the "Zodiac Man"); faculties/functions from planetary rulerships (mind→Mercury, emotions→Moon).
_Avoid_: Body part (too physical), affected domain / domain (overloaded in software), organ, region.

**Treatment method**:
The doctrinal rule used to derive a configuration from an issue. Two are supported: **by sympathy** (strengthen the planets/signs that govern the affected part) and **by antipathy** (counter the affliction's humoral quality with its contrary). The app produces a configuration under each method.
_Avoid_: Approach, strategy.

**Humoral quality**:
The Galenic hot/cold/wet/dry classification underlying classical medical astrology. Attached to issues, planets, and signs; the antipathy method works by opposing the affliction's quality.
_Avoid_: Temperament, humour (reserve for the four classical humours specifically).

**Dignity**:
A sign in which a planet is essentially strong — its **domicile** (rulership) or **exaltation**. "Strengthening" a planet means placing it in one of its dignities. Derived from the classical dignity tables.
_Avoid_: Rulership (that's specifically domicile; "dignity" covers both domicile and exaltation).

**Condition**:
The required state of a planet in a configuration, from a controlled vocabulary: `dignified` (in domicile/exaltation), `unafflicted` (free of hard aspects from malefics), `waxing` (Moon only). Extensible.
_Avoid_: State, status.
