# Anchor to one system, model for many

The app derives configurations from classical Western medical astrology only, but the knowledge base and engine carry an explicit `system` dimension from day one (e.g. on seat→ruler mappings and configurations), even though just one system is populated.

We chose this deliberately so the future side-by-side comparison experience ("here's what Western vs. Vedic would prescribe") becomes "add more data," not "rewrite the engine." A reader seeing a single-valued `system` field should not treat it as dead code and simplify it away — it is load-bearing for the planned multi-system feature.
