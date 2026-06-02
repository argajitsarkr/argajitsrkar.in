import { auth } from "@/lib/auth";
import { apiGet, type Resource } from "@/lib/api";
import ResourceUploadForm from "@/components/ResourceUploadForm";
import DeleteResourceButton from "./DeleteResourceButton";

export const dynamic = "force-dynamic";

export default async function AdminResourcesPage() {
  const session = await auth();
  const token = session?.backendToken;
  let items: Resource[] = [];
  try {
    items = await apiGet<Resource[]>("/resources", { token, cache: "no-store" });
  } catch {}

  return (
    <section className="section">
      <div className="container">
        <h1>Resources</h1>
        <ResourceUploadForm />
        <div style={{ marginTop: 24 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>
                <th style={{ padding: 8 }}>Title</th>
                <th style={{ padding: 8 }}>Category</th>
                <th style={{ padding: 8 }}>Downloads</th>
                <th style={{ padding: 8 }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: 8 }}>
                    <a href={r.file_url} target="_blank" rel="noopener noreferrer">{r.title}</a>
                  </td>
                  <td style={{ padding: 8 }}>{r.category}</td>
                  <td style={{ padding: 8 }}>{r.downloads}</td>
                  <td style={{ padding: 8 }}><DeleteResourceButton id={r.id} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
