import { useMemo, useState } from "react";
import { loadKnowledgeBase } from "../engine/knowledgeBase.ts";
import { selectIssue } from "../picker/picker.ts";
import type { PickerNode } from "../picker/picker.ts";
import { PICKER_TREE } from "../data/pickerTree.ts";
import { recommend } from "../engine/recommend.ts";
import { SEATS } from "../data/seats.ts";
import type { Configuration, Planet } from "../engine/types.ts";
import { defineTerm } from "./glossary.ts";
import { planetGlyph, planetImage } from "./planetImage.ts";

// The UI is deliberately shallow: it walks the picker tree, calls recommend()
// for the selected seat, and renders the rich view. All domain logic lives in
// the engine/picker modules. Jargon is underlined and explained in place via
// <Term>, sourced from the same glossary as CONTEXT.md.
export function App() {
  const kb = useMemo(() => loadKnowledgeBase(SEATS), []);

  // A trail of levels for breadcrumb navigation; the last entry is shown.
  const [trail, setTrail] = useState<{ label: string; nodes: PickerNode[] }[]>([
    { label: "What's troubling you?", nodes: PICKER_TREE },
  ]);
  const [seatId, setSeatId] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const level = trail[trail.length - 1];
  const seat = seatId ? kb.getSeat(seatId) : undefined;
  const recommendation = seat ? recommend(selectIssue(kb, seat.id)) : null;

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

      {showIntro && <HowThisWorks onDismiss={() => setShowIntro(false)} />}

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

      {seat && recommendation && (
        <>
          <p style={{ marginTop: "1.5rem" }}>
            Configurations for the <strong>{seat.label.toLowerCase()}</strong>:
          </p>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <ConfigurationView config={recommendation.sympathy} />
            <ConfigurationView config={recommendation.antipathy} />
          </div>
        </>
      )}
    </main>
  );
}

/** A dismissible strip framing the three steps for a first-time visitor. */
function HowThisWorks({ onDismiss }: { onDismiss: () => void }) {
  return (
    <aside style={introStrip}>
      <button onClick={onDismiss} aria-label="Dismiss" style={dismissButton}>
        ×
      </button>
      <strong>How this works</strong>
      <ol style={{ margin: "0.5rem 0 0", paddingLeft: "1.2rem" }}>
        <li>Pick the part or faculty that's troubling you.</li>
        <li>
          We find its <Term term="seat">seat</Term> and its ruling planet from the classical melothesia (the
          “Zodiac Man”).
        </li>
        <li>
          You get two prescriptions — by <Term term="sympathy">sympathy</Term> and by{" "}
          <Term term="antipathy">antipathy</Term> — each quoting the classical source behind it.
        </li>
      </ol>
      <p style={{ margin: "0.5rem 0 0", fontSize: "0.85rem", color: "#666" }}>
        Underlined words have a definition — hover or tap them.
      </p>
    </aside>
  );
}

/**
 * An underlined jargon word with an in-place glossary definition. Hover (or
 * tap, on touch) reveals the popover; falls back to plain text for any word the
 * glossary doesn't define.
 */
function Term({ term, children }: { term: string; children?: React.ReactNode }) {
  const definition = defineTerm(term);
  const [open, setOpen] = useState(false);
  const label = children ?? term;
  if (!definition) return <>{label}</>;
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        title={definition}
        aria-expanded={open}
        style={termButton}
      >
        {label}
      </button>
      {open && (
        <span role="tooltip" style={popover}>
          {definition}
        </span>
      )}
    </span>
  );
}

/** The planet's bundled engraving if available, else its classical glyph. */
function PlanetMark({ planet }: { planet: Planet }) {
  const image = planetImage(planet);
  if (image) {
    return (
      <figure style={{ margin: 0, display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
        <img src={image.src} alt={planet} style={{ width: 48, height: 48, objectFit: "contain" }} />
        <figcaption style={{ fontSize: "0.65rem", color: "#999" }}>{image.credit}</figcaption>
      </figure>
    );
  }
  return (
    <span aria-hidden style={{ fontSize: "1.5rem", lineHeight: 1, color: "#2b2b6b" }}>
      {planetGlyph(planet)}
    </span>
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

const introStrip: React.CSSProperties = {
  position: "relative",
  background: "#f4f4fb",
  border: "1px solid #d9d9ec",
  borderRadius: 8,
  padding: "0.9rem 1.1rem",
  margin: "0 0 1.25rem",
};

const dismissButton: React.CSSProperties = {
  position: "absolute",
  top: 6,
  right: 10,
  background: "none",
  border: "none",
  fontSize: "1.2rem",
  lineHeight: 1,
  cursor: "pointer",
  color: "#888",
};

const termButton: React.CSSProperties = {
  background: "none",
  border: "none",
  padding: 0,
  font: "inherit",
  color: "inherit",
  cursor: "help",
  textDecoration: "underline dotted",
  textUnderlineOffset: "2px",
};

const popover: React.CSSProperties = {
  position: "absolute",
  top: "100%",
  left: 0,
  zIndex: 10,
  width: "16rem",
  marginTop: 4,
  padding: "0.5rem 0.6rem",
  background: "white",
  border: "1px solid #ccc",
  borderRadius: 6,
  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
  fontSize: "0.8rem",
  fontWeight: "normal",
  color: "#333",
  textAlign: "left",
  whiteSpace: "normal",
};

function ConfigurationView({ config }: { config: Configuration }) {
  return (
    <section style={{ flex: "1 1 18rem", border: "1px solid #ddd", borderRadius: 8, padding: "1rem" }}>
      <h2 style={{ marginTop: 0 }}>
        By <Term term={config.method}>{config.method}</Term>
      </h2>
      <p style={{ color: "#444" }}>{config.rationale}</p>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {config.entries.map((entry) => (
          <li key={entry.planet} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", marginBottom: "0.6rem" }}>
            <PlanetMark planet={entry.planet} />
            <span>
              <strong>{entry.planet}</strong> in{" "}
              {entry.signs.map((s, i) => (
                <span key={`${s.sign}-${s.dignity}`}>
                  {i > 0 && " or "}
                  {s.sign} (<Term term={s.dignity}>{s.dignity}</Term>)
                </span>
              ))}
              {entry.conditions.length > 0 && (
                <>
                  {"; "}
                  {entry.conditions.map((c, i) => (
                    <span key={c}>
                      {i > 0 && ", "}
                      <Term term={c}>{c}</Term>
                    </span>
                  ))}
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
      {config.citations.length > 0 && (
        <div style={{ fontSize: "0.85rem", color: "#555", marginTop: "0.75rem" }}>
          <strong>Sources</strong>
          <ul style={{ margin: "0.25rem 0 0", paddingLeft: "1.1rem" }}>
            {config.citations.map((c, i) => (
              <li key={i} style={{ marginBottom: "0.4rem" }}>
                <span style={{ fontStyle: "italic" }}>“{c.quote}”</span>
                <br />
                <span style={{ color: "#888" }}>
                  — {c.source}, {c.locator}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
