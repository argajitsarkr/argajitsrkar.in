"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { apiDelete } from "@/lib/api";

export default function DeleteButton({ id }: { id: number }) {
  const { data: session } = useSession();
  const router = useRouter();

  async function onDelete() {
    if (!confirm("Delete this post?")) return;
    await apiDelete(`/blog/admin/${id}`, { token: session?.backendToken });
    router.refresh();
  }

  return <button onClick={onDelete} className="hero-link hero-link--secondary">Delete</button>;
}
