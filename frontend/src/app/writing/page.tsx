import Link from "next/link";
import { apiGet, type BlogPost } from "@/lib/api";

export const revalidate = 300;
export const metadata = { title: "Writing - Argajit Sarkar" };

export default async function WritingPage() {
  let posts: BlogPost[] = [];
  try {
    posts = await apiGet<BlogPost[]>("/blog", { revalidate: 300 });
  } catch {
    posts = [];
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Writing</h1>
          <p>Notes on research, AI, drug discovery, grants, and academic life.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          {posts.length === 0 ? (
            <p>No posts published yet.</p>
          ) : (
            <div className="pub-grid">
              {posts.map((p) => (
                <Link key={p.id} href={`/writing/${p.slug}`} className="card pub-card fade-in" style={{ textDecoration: "none" }}>
                  {p.cover_image && (
                    <div className="pub-card__image">
                      <img src={p.cover_image} alt={p.title} />
                    </div>
                  )}
                  <div className="pub-card__content">
                    <h3 className="pub-card__title">{p.title}</h3>
                    {p.excerpt && <p className="pub-card__authors">{p.excerpt}</p>}
                    <p className="pub-card__journal">
                      {p.category} {p.read_time_min ? `- ${p.read_time_min} min read` : ""}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
