import Link from "next/link";
import { auth } from "@/lib/auth";
import { apiGet, type BlogPost } from "@/lib/api";
import DeleteButton from "./DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminBlogList() {
  const session = await auth();
  const token = session?.backendToken;
  let posts: BlogPost[] = [];
  try {
    posts = await apiGet<BlogPost[]>("/blog/admin/list", { token, cache: "no-store" });
  } catch {}

  return (
    <section className="section">
      <div className="container">
        <div className="page-header" style={{ background: "transparent" }}>
          <h1>Blog posts</h1>
          <Link href="/admin/blog/new" className="hero-link hero-link--primary">New post</Link>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>
              <th style={{ padding: 8 }}>Title</th>
              <th style={{ padding: 8 }}>Status</th>
              <th style={{ padding: 8 }}>Category</th>
              <th style={{ padding: 8 }}>Updated</th>
              <th style={{ padding: 8 }}></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: 8 }}>{p.title}</td>
                <td style={{ padding: 8 }}>{p.status}</td>
                <td style={{ padding: 8 }}>{p.category}</td>
                <td style={{ padding: 8 }}>{new Date(p.updated_at).toLocaleDateString()}</td>
                <td style={{ padding: 8, display: "flex", gap: 8 }}>
                  <Link href={`/admin/blog/${p.id}/edit`} className="hero-link hero-link--secondary">Edit</Link>
                  <DeleteButton id={p.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
