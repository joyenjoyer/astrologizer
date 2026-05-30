import { useMemo, useState } from "react";
import { loadKnowledgeBase } from "../engine/knowledgeBase.ts";
import { selectIssue, COMPLAINT_NATURES } from "../picker/picker.ts";
import type { PickerNode } from "../picker/picker.ts";
import { PICKER_TREE } from "../data/pickerTree.ts";
import { recommend } from "../engine/recommend.ts";
import { SEATS } from "../data/seats.ts";
import type { Configuration } from "../engine/types.ts";

// The UI is deliberately shallow: it walks the picker tree, drives the
// complaint-nature choice, calls recommend(), and renders the rich view.
// All domain logic lives in the engine/picker modules.
export function App() {
  const kb = useMemo(() => loadKnowledgeBase(SEATS), []);

  // A trail of levels for breadcrumb navigation; the last entry is shown.
  const [trail, setTrail] = useState<{ label: string; nodes: PickerNode[] }[]>([
    { label: "What's troubling you?", nodes: PICKER_TREE },
  ]);
  const [seatId, setSeatId] = useState<string | null>(null);
  const [natureIndex, setNatureIndex] = useState(0);

  const level = trail[trail.length - 1];
  const nature = COMPLAINT_NATURES[natureIndex];
  const seat = seatId ? kb.getSeat(seatId) : undefined;
  const recommendation = seat
    ? recommend(selectIssue(kb, seat.id, nature.quality))
    : null;

  const openBranch = (label: string, children: PickerNode[]) =>
    setTrail((t) => [...t, { label, nodes: children }]);
  const gotoCrumb = (index: number) => {
    setTrail((t) => t.slice(0, index + 1));
    setSeatId(null);
  };

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 900, margin: "2rem auto", padding: "0 1rem", lineHeight: 1.5 }}>
      <h1>Astrologizer</h1>
      <p>Find the part or faculty that's troubling you to see the planetary configurations best suited to address it.</p>

      <nav style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.75rem" }}>
        {trail.map((t, i) => (
          <span key={i}>
            {i > 0 && " › "}
            {i < trail.length - 1 ? (
              <button onClick={() => gotoCrumb(i)} style={linkButton}>
                {t.label}
              </button>
            ) : (
              <span>{t.label}</span>
            )}
          </span>
        ))}
      </nav>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {level.nodes.map((node) => (
          <button
            key={node.label}
            onClick={() =>
              node.kind === "branch"
                ? openBranch(node.label, node.children)
                : setSeatId(node.seatId)
            }
            style={{
              ...choiceButton,
              ...(node.kind === "seat" && seatId === node.seatId ? selectedButton : {}),
            }}
          >
            {node.label}
            {node.kind === "branch" ? " ›" : ""}
          </button>
        ))}
      </div>

      {seat && (
        <>
          <label style={{ display: "block", marginTop: "1.5rem" }}>
            Nature of the complaint in the <strong>{seat.label.toLowerCase()}</strong>:{" "}
            <select value={natureIndex} onChange={(e) => setNatureIndex(Number(e.target.value))}>
              {COMPLAINT_NATURES.map((n, i) => (
                <option key={n.label} value={i}>
                  {n.label}
                </option>
              ))}
            </select>
          </label>

          {recommendation && (
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
              <ConfigurationView config={recommendation.sympathy} />
              <ConfigurationView config={recommendation.antipathy} />
            </div>
          )}
        </>
      )}
    </main>
  );
}

const choiceButton: React.CSSProperties = {
  padding: "0.4rem 0.8rem",
  border: "1px solid #ccc",
  borderRadius: 6,
  background: "#fafafa",
  cursor: "pointer",
  font: "inherit",
};

const selectedButton: React.CSSProperties = {
  background: "#2b2b6b",
  color: "white",
  borderColor: "#2b2b6b",
};

const linkButton: React.CSSProperties = {
  background: "none",
  border: "none",
  padding: 0,
  color: "#2b2b6b",
  cursor: "pointer",
  font: "inherit",
  textDecoration: "underline",
};

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
