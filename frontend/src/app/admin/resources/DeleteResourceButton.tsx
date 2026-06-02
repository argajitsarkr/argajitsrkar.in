"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { apiDelete } from "@/lib/api";

export default function DeleteResourceButton({ id }: { id: number }) {
  const { data: session } = useSession();
  const router = useRouter();

  async function onDelete() {
    if (!confirm("Delete this resource?")) return;
    await apiDelete(`/resources/admin/${id}`, { token: session?.backendToken });
    router.refresh();
  }

  return <button onClick={onDelete} className="hero-link hero-link--secondary">Delete</button>;
}
