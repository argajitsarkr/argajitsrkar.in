export const metadata = { title: "Research - Argajit Sarkar" };

type Pub = { title: string; authors: string; journal: string; href?: string; image?: string; cited?: string };

const published: Pub[] = [
  {
    title: "Quercetin as an additive adjuvant enhances ciprofloxacin and tetracycline efficacy against Vibrio cholerae by disrupting membranes, inhibiting biofilms, and reducing virulence levels",
    authors: "Paul, S., Sarkar, A., Ghosh, M. et al.",
    journal: "3 Biotech 16, 3 (2026)",
    href: "https://link.springer.com/article/10.1007/s13205-025-04621-x",
    image: "/images/qer.png",
  },
  {
    title: "Biofilm-mediated bioremediation of xenobiotics and heavy metals: a comprehensive review",
    authors: "Sarkar, A., Bhattacharjee, S.",
    journal: "3 Biotech 15, 78 (2025)",
    href: "https://link.springer.com/article/10.1007/s13205-025-04252-2",
    image: "/images/rem.png",
    cited: "Cited by 13",
  },
  {
    title: "TGF-beta plays dual roles in immunity and pathogenesis in leishmaniasis",
    authors: "Barik, S., Goswami, S., Nanda, P. K., Sarkar, A., Saha, B., Sarkar, A., & Bhattacharjee, S.",
    journal: "Cytokine, 156865 (2025)",
    href: "https://www.sciencedirect.com/science/article/abs/pii/S1043466625000122",
    image: "/images/tgf.png",
    cited: "Cited by 8",
  },
];

const preprints: Pub[] = [
  {
    title: "Harnessing Generative AI for Periodontitis Prediction: A Machine Learning Approach",
    authors: "Sarkar, A., Ghosh, E., Bhattacharjee, S.",
    journal: "Frontiers in Dental Medicine (Under Revision) - SSRN Preprint",
    href: "https://dx.doi.org/10.2139/ssrn.5334047",
    image: "/images/PreML.png",
  },
  {
    title: "The Emerging Landscape of Agentic AI for pharmaceutical efficiency",
    authors: "Sarkar, A., Bhattacharjee, B., Chackraborty, C., Bhattacharjee, S.",
    journal: "Briefings in Bioinformatics (Submitted)",
  },
];

function Card({ p }: { p: Pub }) {
  return (
    <div className="card pub-card fade-in">
      {p.image && (
        <div className="pub-card__image">
          <img src={p.image} alt={p.title} />
        </div>
      )}
      <div className="pub-card__content">
        <h3 className="pub-card__title">
          {p.href ? <a href={p.href} target="_blank" rel="noopener noreferrer">{p.title}</a> : p.title}
        </h3>
        <p className="pub-card__authors">{p.authors}</p>
        <p className="pub-card__journal">{p.journal}</p>
        {p.cited && <div className="pub-card__meta"><span className="pub-card__citation">{p.cited}</span></div>}
      </div>
    </div>
  );
}

export default function ResearchPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Research & Publications</h1>
          <p>Published papers, preprints, book chapters, and patent filings.</p>
        </div>
      </div>
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-label">Published</div>
            <h2 className="section-title">Journal Articles</h2>
          </div>
          <div className="pub-grid">{published.map((p) => <Card key={p.title} p={p} />)}</div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-label">In Progress</div>
            <h2 className="section-title">Preprints & Under Review</h2>
          </div>
          <div className="pub-grid">{preprints.map((p) => <Card key={p.title} p={p} />)}</div>
        </div>
      </section>
    </>
  );
}
