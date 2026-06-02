export const metadata = { title: "Projects - Argajit Sarkar" };

export default function ProjectsPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Projects</h1>
          <p>GrantSetu and ongoing research projects.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: 24, marginBottom: 24 }}>
            <div className="section-label">Founder</div>
            <h2 className="section-title">GrantSetu</h2>
            <p>
              GrantSetu helps Indian researchers discover, apply for, and track grants and
              fellowships. Built to remove the information gap that holds back early-career
              scientists outside metro institutions.
            </p>
            <a href="https://grantsetu.in" target="_blank" rel="noopener noreferrer" className="hero-link hero-link--primary">Visit GrantSetu</a>
          </div>

          <div className="card" style={{ padding: 24, marginBottom: 24 }}>
            <div className="section-label">ICMR-Funded</div>
            <h2 className="section-title">AI-Driven Metabolic Risk Prediction</h2>
            <p>
              Integrating gut microbiome, hormonal profiles, and lifestyle factors for AI-driven
              metabolic risk prediction in adolescents from Tripura, with adipocyte validation.
            </p>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <div className="section-label">PhD Thesis</div>
            <h2 className="section-title">Deep Learning for Drug Discovery</h2>
            <p>
              Applying deep learning and large language models to repurpose drugs against
              multidrug-resistant priority pathogens.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
