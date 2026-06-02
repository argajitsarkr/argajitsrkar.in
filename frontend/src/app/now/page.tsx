export const metadata = { title: "Now - Argajit Sarkar" };

export default function NowPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Now</h1>
          <p>What I am focused on this month.</p>
        </div>
      </div>
      <section className="section">
        <div className="container container--narrow">
          {/* TODO: keep this page updated monthly. */}
          <ul>
            <li>Running ICMR project on gut microbiome and metabolic risk in adolescents.</li>
            <li>Drafting the LLM-for-drug-repurposing chapter of my thesis.</li>
            <li>Growing GrantSetu - shipping the fellowship tracker.</li>
            <li>Preparing an ASM Future Leaders Mentorship cycle.</li>
          </ul>
          <p style={{ marginTop: 24, opacity: 0.7 }}>Last updated: {new Date().toISOString().slice(0, 10)}</p>
        </div>
      </section>
    </>
  );
}
