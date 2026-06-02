import { notFound } from "next/navigation";
import BlogForm from "@/components/BlogForm";
import { auth } from "@/lib/auth";
import { apiGet, type BlogPost } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const token = session?.backendToken;
  let posts: BlogPost[] = [];
  try {
    posts = await apiGet<BlogPost[]>("/blog/admin/list", { token, cache: "no-store" });
  } catch {}
  const post = posts.find((p) => String(p.id) === params.id);
  if (!post) notFound();

  return (
    <section className="section">
      <div className="container container--narrow">
        <h1>Edit post</h1>
        <BlogForm initial={post} />
      </div>
    </section>
  );
}
