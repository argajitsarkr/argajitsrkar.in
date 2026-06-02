"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { apiPost } from "@/lib/api";

export default function ResourceUploadForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.backendToken;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setErr("Pick a file first");
      return;
    }
    setBusy(true);
    setErr(null);
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("category", category);
    fd.append("file", file);
    try {
      await apiPost(`/resources/admin/upload`, fd, { token });
      setTitle("");
      setDescription("");
      setFile(null);
      router.refresh();
    } catch (e: any) {
      setErr(e.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card" style={{ padding: "20px", display: "grid", gap: "12px" }}>
      <h3>Upload a new resource</h3>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ padding: "8px" }} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={{ padding: "8px" }} />
      <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: "8px" }}>
        <option value="general">General</option>
        <option value="guides">Guides</option>
        <option value="templates">Templates</option>
        <option value="cheatsheets">Cheatsheets</option>
        <option value="slides">Slides</option>
      </select>
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
      {err && <div style={{ color: "crimson" }}>{err}</div>}
      <button type="submit" disabled={busy} className="hero-link hero-link--primary">
        {busy ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
