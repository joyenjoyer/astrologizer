import { useMemo, useState } from "react";
import { loadKnowledgeBase } from "../engine/knowledgeBase.ts";
import { selectSeat } from "../picker/picker.ts";
import { recommend } from "../engine/recommend.ts";
import { SEATS } from "../data/seats.ts";
import type { Configuration } from "../engine/types.ts";

// The UI is deliberately shallow: it drives the picker, calls recommend(),
// and renders the rich view. All logic lives in the engine/picker modules.
export function App() {
  const kb = useMemo(() => loadKnowledgeBase(SEATS), []);
  const seats = kb.listSeats();
  const [seatId, setSeatId] = useState(seats[0]?.id ?? "");

  const recommendation = seatId ? recommend(selectSeat(kb, seatId)) : null;

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 720, margin: "2rem auto", padding: "0 1rem", lineHeight: 1.5 }}>
      <h1>Astrologizer</h1>
      <p>Pick what's troubling you to see the planetary configuration best suited to address it.</p>

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

      {recommendation && <ConfigurationView config={recommendation.sympathy} />}
    </main>
  );
}

function ConfigurationView({ config }: { config: Configuration }) {
  return (
    <section style={{ marginTop: "1.5rem" }}>
      <h2 style={{ textTransform: "capitalize" }}>By {config.method}</h2>
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
