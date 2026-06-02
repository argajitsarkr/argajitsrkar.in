import BlogForm from "@/components/BlogForm";

export const dynamic = "force-dynamic";

export default function NewBlogPage() {
  return (
    <section className="section">
      <div className="container container--narrow">
        <h1>New post</h1>
        <BlogForm />
      </div>
    </section>
  );
}
