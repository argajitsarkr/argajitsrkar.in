"use client";
import { apiPost } from "@/lib/api";

export default function DownloadButton({ slug, url }: { slug: string; url: string }) {
  function onClick() {
    apiPost(`/resources/${slug}/track`).catch(() => {});
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return (
    <button onClick={onClick} className="hero-link hero-link--primary" style={{ marginTop: 8 }}>
      Download
    </button>
  );
}
