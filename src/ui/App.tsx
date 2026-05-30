import { useMemo, useState } from "react";
import { loadKnowledgeBase } from "../engine/knowledgeBase.ts";
import { selectIssue, COMPLAINT_NATURES } from "../picker/picker.ts";
import { recommend } from "../engine/recommend.ts";
import { SEATS } from "../data/seats.ts";
import type { Configuration } from "../engine/types.ts";

// The UI is deliberately shallow: it drives the two-level picker, calls
// recommend(), and renders the rich view. All logic lives in the engine/picker.
export function App() {
  const kb = useMemo(() => loadKnowledgeBase(SEATS), []);
  const seats = kb.listSeats();
  const [seatId, setSeatId] = useState(seats[0]?.id ?? "");
  const [natureIndex, setNatureIndex] = useState(0);

  const nature = COMPLAINT_NATURES[natureIndex];
  const recommendation = seatId
    ? recommend(selectIssue(kb, seatId, nature.quality))
    : null;

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 900, margin: "2rem auto", padding: "0 1rem", lineHeight: 1.5 }}>
      <h1>Astrologizer</h1>
      <p>Pick what's troubling you to see the planetary configurations best suited to address it.</p>

      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        <label>
          Affected area:{" "}
          <select value={seatId} onChange={(e) => setSeatId(e.target.value)}>
            {seats.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Nature of the complaint:{" "}
          <select value={natureIndex} onChange={(e) => setNatureIndex(Number(e.target.value))}>
            {COMPLAINT_NATURES.map((n, i) => (
              <option key={n.label} value={i}>
                {n.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {recommendation && (
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
          <ConfigurationView config={recommendation.sympathy} />
          <ConfigurationView config={recommendation.antipathy} />
        </div>
      )}
    </main>
  );
}

function ConfigurationView({ config }: { config: Configuration }) {
  return (
    <section style={{ flex: "1 1 18rem", border: "1px solid #ddd", borderRadius: 8, padding: "1rem" }}>
      <h2 style={{ textTransform: "capitalize", marginTop: 0 }}>By {config.method}</h2>
      <p style={{ color: "#444" }}>{config.rationale}</p>
      <ul>
        {config.entries.map((entry) => (
          <li key={entry.planet}>
            <strong>{entry.planet}</strong> —{" "}
            {entry.signs
              .map((s) => `${s.sign} (${s.dignity})`)
              .join(" or ")}
            {entry.conditions.length > 0 && `; ${entry.conditions.join(", ")}`}
          </li>
        ))}
      </ul>
      {config.citations.length > 0 && (
        <p style={{ fontSize: "0.85rem", color: "#666" }}>
          Sources: {config.citations.join("; ")}
        </p>
      )}
    </section>
  );
}
