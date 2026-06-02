import Link from "next/link";
import { apiGet, type BlogPost } from "@/lib/api";

export const revalidate = 300;

async function getLatest(): Promise<BlogPost[]> {
  try {
    return await apiGet<BlogPost[]>("/blog?per_page=3", { revalidate: 300 });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const latest = await getLatest();

  return (
    <>
      <section className="section section--hero">
        <div className="container">
          <div className="hero">
            <div className="hero-content">
              <div className="hero-pill">
                <span className="hero-pill-dot"></span>
                Doctoral Scholar &bull; ICMR Project Staff &bull; ASM-FLMF Fellow
              </div>
              <h1 className="hero-name">Argajit Sarkar</h1>
              <p className="hero-title">
                Microbial Pathogenesis &bull; Deep Learning &bull; LLMs &bull; Drug Discovery
              </p>
              <p className="hero-bio">
                I am a <strong>PhD Candidate</strong> bridging microbial pathogenesis with Artificial
                Intelligence. My research applies <strong>Deep Learning and Large Language Models</strong>{" "}
                for Drug Discovery against priority pathogens. I also founded{" "}
                <a href="https://grantsetu.in" target="_blank" rel="noopener noreferrer">
                  GrantSetu
                </a>{" "}
                to help Indian researchers find and win funding.
              </p>
              <p className="hero-bio">
                Currently <strong>Project Technical Support - III</strong> on an ICMR-funded project and
                an <strong>ASM Future Leaders Mentorship Fellow (2026-28)</strong>. NEP Saarthi
                Ambassador appointed by UGC.
              </p>
              <div className="hero-links">
                <a href="/data/Argajit CV 2026.pdf" target="_blank" className="hero-link hero-link--primary">Download CV</a>
                <a href="mailto:argajit05@gmail.com" className="hero-link hero-link--secondary">Email</a>
                <a href="https://www.linkedin.com/in/argajit/" target="_blank" rel="noopener noreferrer" className="hero-link hero-link--secondary">LinkedIn</a>
                <a href="https://github.com/argajitsarkr" target="_blank" rel="noopener noreferrer" className="hero-link hero-link--secondary">GitHub</a>
                <a href="https://scholar.google.com/citations?hl=en&user=7eeI0zUAAAAJ" target="_blank" rel="noopener noreferrer" className="hero-link hero-link--secondary">Scholar</a>
              </div>
            </div>
            <div className="hero-image">
              <img src="/images/profile3.jpg" alt="Profile photo of Argajit Sarkar" />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="stats-row fade-in">
            <div className="stat-card card"><div className="stat-card__number">7</div><div className="stat-card__label">Publications</div></div>
            <div className="stat-card card"><div className="stat-card__number">30</div><div className="stat-card__label">Citations</div></div>
            <div className="stat-card card"><div className="stat-card__number">1</div><div className="stat-card__label">Patent Filed</div></div>
            <div className="stat-card card"><div className="stat-card__number">81+</div><div className="stat-card__label">GitHub Commits</div></div>
            <div className="stat-card card"><div className="stat-card__number">5+</div><div className="stat-card__label">Conferences</div></div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-label">From the blog</div>
            <h2 className="section-title">Latest writing</h2>
          </div>
          {latest.length === 0 ? (
            <p>No posts yet. Check back soon.</p>
          ) : (
            <div className="featured-pubs fade-in">
              {latest.map((p) => (
                <Link key={p.id} href={`/writing/${p.slug}`} className="card featured-pub" style={{ textDecoration: "none" }}>
                  {p.cover_image && (
                    <div className="featured-pub__image">
                      <img src={p.cover_image} alt={p.title} />
                    </div>
                  )}
                  <div className="featured-pub__body">
                    <h3 className="featured-pub__title">{p.title}</h3>
                    {p.excerpt && <p className="featured-pub__journal">{p.excerpt}</p>}
                    {p.read_time_min && <p className="featured-pub__citation">{p.read_time_min} min read</p>}
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: "32px" }} className="fade-in">
            <Link href="/writing" className="hero-link hero-link--secondary">All writing -&gt;</Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container container--narrow">
          <div className="cta-box fade-in">
            <h2>Let's Connect</h2>
            <p>Interested in collaboration, research discussions, or just want to say hello?</p>
            <div className="cta-links">
              <a href="mailto:argajit05@gmail.com" className="hero-link hero-link--primary">Get in Touch</a>
              <a href="https://www.linkedin.com/in/argajit/" target="_blank" rel="noopener noreferrer" className="hero-link hero-link--secondary">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
