# Deploy publicly while some citations are still placeholders

We are publishing Astrologizer to a public GitHub Pages site (continuous deploy
on every green push to `main`) **before** all knowledge-unit citations are
verified. This is a deliberate, temporary exception to
[ADR-0002](0002-citations-on-knowledge-units.md), which states that "a
recommendation does not ship until every knowledge unit behind it has a
transcribed, verified quote." Today the Culpeper melothesia and contrary-pairing
quotes are 🔴 placeholders (see [citations-verification.md](../citations-verification.md)),
explicitly marked inline as `[unverified placeholder — needs real ... passage]`.

We accept this because the placeholders are honestly self-labelled (a reader is
told the quote is not yet sourced, rather than being misled), and getting the
app reachable at a public URL now is worth more than withholding it until the
Culpeper sourcing — which could not be done freely online — is complete.

## Consequences

- The live site will display text marked as unverified. The inline marker is the
  guardrail that keeps this from being dishonest; it must stay until the real
  passage replaces it.
- Publishing is hard to fully retract (caches, indexing). This exception is a
  conscious trade, not an oversight.
- This ADR should be marked superseded once every unit reaches ✅ VERIFIED and
  ADR-0002's bar is met without exception. A future reader should not read this
  as licence to ship *new* unverified facts — it covers the existing placeholders
  only.
