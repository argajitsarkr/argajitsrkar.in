"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import MarkdownView from "./MarkdownView";
import { apiPost, apiPut, type BlogPost } from "@/lib/api";

type Props = { initial?: Partial<BlogPost> & { id?: number } };

export default function BlogForm({ initial }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.backendToken;

  const [title, setTitle] = useState(initial?.title || "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [body, setBody] = useState(initial?.body_md || "");
  const [cover, setCover] = useState(initial?.cover_image || "");
  const [category, setCategory] = useState(initial?.category || "general");
  const [tags, setTags] = useState((initial?.tags || []).join(", "));
  const [readTime, setReadTime] = useState<number | "">(initial?.read_time_min ?? "");
  const [status, setStatus] = useState<"draft" | "published">((initial?.status as any) || "draft");
  const [featured, setFeatured] = useState<boolean>(initial?.featured || false);
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const payload = {
      title,
      excerpt: excerpt || null,
      body_md: body,
      cover_image: cover || null,
      category: category || null,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      read_time_min: readTime === "" ? null : Number(readTime),
      status,
      featured,
    };
    try {
      if (initial?.id) {
        await apiPut(`/blog/admin/${initial.id}`, payload, { token });
      } else {
        await apiPost(`/blog/admin`, payload, { token });
      }
      router.push("/admin/blog");
      router.refresh();
    } catch (e: any) {
      setErr(e.message || "Failed to save");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card" style={{ padding: "24px", display: "grid", gap: "16px" }}>
      <label>
        <div>Title</div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: "100%", padding: "8px" }} />
      </label>
      <label>
        <div>Excerpt</div>
        <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} style={{ width: "100%", padding: "8px" }} />
      </label>
      <label>
        <div>Cover image URL</div>
        <input value={cover} onChange={(e) => setCover(e.target.value)} style={{ width: "100%", padding: "8px" }} />
      </label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
        <label>
          <div>Category</div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: "100%", padding: "8px" }}>
            <option value="general">General</option>
            <option value="research">Research</option>
            <option value="ai">AI</option>
            <option value="career">Career</option>
            <option value="grants">Grants</option>
            <option value="teaching">Teaching</option>
          </select>
        </label>
        <label>
          <div>Read time (min)</div>
          <input type="number" min={1} value={readTime} onChange={(e) => setReadTime(e.target.value === "" ? "" : Number(e.target.value))} style={{ width: "100%", padding: "8px" }} />
        </label>
        <label>
          <div>Status</div>
          <select value={status} onChange={(e) => setStatus(e.target.value as any)} style={{ width: "100%", padding: "8px" }}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
      </div>
      <label>
        <div>Tags (comma-separated)</div>
        <input value={tags} onChange={(e) => setTags(e.target.value)} style={{ width: "100%", padding: "8px" }} />
      </label>
      <label style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
        Featured
      </label>

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <strong>Body (Markdown)</strong>
        <button type="button" onClick={() => setPreview((p) => !p)} className="hero-link hero-link--secondary">
          {preview ? "Edit" : "Preview"}
        </button>
      </div>
      {preview ? (
        <div className="card" style={{ padding: "16px" }}>
          <MarkdownView source={body} />
        </div>
      ) : (
        <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={20} required style={{ width: "100%", padding: "8px", fontFamily: "monospace" }} />
      )}

      {err && <div style={{ color: "crimson" }}>{err}</div>}
      <div>
        <button type="submit" disabled={busy} className="hero-link hero-link--primary">
          {busy ? "Saving..." : initial?.id ? "Update post" : "Create post"}
        </button>
      </div>
    </form>
  );
}
