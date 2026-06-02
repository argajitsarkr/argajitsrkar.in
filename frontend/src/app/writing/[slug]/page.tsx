import { notFound } from "next/navigation";
import { apiGet, type BlogPost } from "@/lib/api";
import MarkdownView from "@/components/MarkdownView";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const post = await apiGet<BlogPost>(`/blog/${params.slug}`, { revalidate: 300 });
    return { title: `${post.title} - Argajit Sarkar`, description: post.excerpt || undefined };
  } catch {
    return { title: "Post - Argajit Sarkar" };
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  let post: BlogPost;
  try {
    post = await apiGet<BlogPost>(`/blog/${params.slug}`, { revalidate: 300 });
  } catch {
    notFound();
  }

  return (
    <>
      <div className="page-header">
        <div className="container container--narrow">
          <h1>{post!.title}</h1>
          {post!.excerpt && <p>{post!.excerpt}</p>}
          <p style={{ opacity: 0.7, fontSize: 14 }}>
            {post!.published_at ? new Date(post!.published_at).toLocaleDateString() : ""}
            {post!.read_time_min ? ` - ${post!.read_time_min} min read` : ""}
          </p>
        </div>
      </div>
      <section className="section">
        <div className="container container--narrow">
          {post!.cover_image && (
            <img src={post!.cover_image} alt={post!.title} style={{ width: "100%", marginBottom: 24, borderRadius: 8 }} />
          )}
          <MarkdownView source={post!.body_md} />
        </div>
      </section>
    </>
  );
}
