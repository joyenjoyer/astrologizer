// The UI is deliberately shallow: it drives the picker, calls the engine's
// recommend(), and renders the one rich view. Logic lives below it, in the
// engine and picker modules. This is a placeholder shell.

export function App() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 720, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Astrologizer</h1>
      <p>
        Identify what's troubling you, and see the planetary configuration best
        suited to address it — by sympathy and by antipathy.
      </p>
      <p style={{ color: "#666" }}>
        The guided picker and recommendation view are not built yet. See{" "}
        <code>docs/PRD.md</code>.
      </p>
    </main>
  );
}
