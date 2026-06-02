export default function GrantSetuCTA({ topic }: { topic?: string }) {
  return (
    <aside className="card" style={{ padding: "20px", margin: "24px 0", borderLeft: "4px solid var(--accent, #4a90e2)" }}>
      <div className="section-label">From GrantSetu</div>
      <h3 style={{ margin: "8px 0" }}>
        {topic ? `Need help with ${topic}?` : "Looking for grants and fellowships?"}
      </h3>
      <p style={{ marginBottom: "12px" }}>
        GrantSetu helps Indian researchers discover, apply for, and track funding opportunities.
      </p>
      <a href="https://grantsetu.in" target="_blank" rel="noopener noreferrer" className="hero-link hero-link--primary">
        Visit GrantSetu -&gt;
      </a>
    </aside>
  );
}
