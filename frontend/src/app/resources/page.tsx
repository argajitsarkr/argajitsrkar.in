import { apiGet, type Resource } from "@/lib/api";
import DownloadButton from "./DownloadButton";

export const revalidate = 300;
export const metadata = { title: "Resources - Argajit Sarkar" };

export default async function ResourcesPage() {
  let items: Resource[] = [];
  try {
    items = await apiGet<Resource[]>("/resources", { revalidate: 300 });
  } catch {
    items = [];
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Free Resources</h1>
          <p>PDF guides, templates, and cheatsheets for M.Sc and PhD students. Free, no signup.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          {items.length === 0 ? (
            <p>No resources available yet.</p>
          ) : (
            <div className="pub-grid">
              {items.map((r) => (
                <div key={r.id} className="card pub-card fade-in">
                  <div className="pub-card__content">
                    <h3 className="pub-card__title">{r.title}</h3>
                    {r.description && <p className="pub-card__authors">{r.description}</p>}
                    <p className="pub-card__journal">
                      {r.category} - {r.file_kind.toUpperCase()} - {r.downloads} downloads
                    </p>
                    <DownloadButton slug={r.slug} url={r.file_url} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
