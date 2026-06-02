import Link from "next/link";
import { auth } from "@/lib/auth";
import { apiGet, type BlogPost, type Resource } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await auth();
  const token = session?.backendToken;
  let posts: BlogPost[] = [];
  let resources: Resource[] = [];
  try {
    posts = await apiGet<BlogPost[]>("/blog/admin/list", { token, cache: "no-store" });
  } catch {}
  try {
    resources = await apiGet<Resource[]>("/resources", { cache: "no-store" });
  } catch {}

  return (
    <section className="section">
      <div className="container">
        <div className="page-header" style={{ background: "transparent" }}>
          <h1>Admin</h1>
          <p>Signed in as {session?.user?.email}</p>
        </div>
        <div className="stats-row">
          <Link href="/admin/blog" className="stat-card card" style={{ textDecoration: "none" }}>
            <div className="stat-card__number">{posts.length}</div>
            <div className="stat-card__label">Blog posts</div>
          </Link>
          <Link href="/admin/resources" className="stat-card card" style={{ textDecoration: "none" }}>
            <div className="stat-card__number">{resources.length}</div>
            <div className="stat-card__label">Resources</div>
          </Link>
          <Link href="/admin/blog/new" className="stat-card card" style={{ textDecoration: "none" }}>
            <div className="stat-card__number">+</div>
            <div className="stat-card__label">New post</div>
          </Link>
        </div>
      </div>
    </section>
  );
}
