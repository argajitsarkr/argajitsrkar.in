const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api/v1";

type Opts = { token?: string; revalidate?: number; cache?: RequestCache };

async function request<T>(method: string, path: string, body?: unknown, opts: Opts = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (body && !(body instanceof FormData)) headers["Content-Type"] = "application/json";
  if (opts.token) headers["Authorization"] = `Bearer ${opts.token}`;

  const init: RequestInit = { method, headers };
  if (body) init.body = body instanceof FormData ? body : JSON.stringify(body);
  if (opts.revalidate !== undefined) (init as any).next = { revalidate: opts.revalidate };
  if (opts.cache) init.cache = opts.cache;

  const res = await fetch(`${BASE}${path}`, init);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${method} ${path} failed: ${res.status} ${text}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const apiGet = <T>(path: string, opts?: Opts) => request<T>("GET", path, undefined, opts);
export const apiPost = <T>(path: string, body?: unknown, opts?: Opts) => request<T>("POST", path, body, opts);
export const apiPut = <T>(path: string, body?: unknown, opts?: Opts) => request<T>("PUT", path, body, opts);
export const apiDelete = <T>(path: string, opts?: Opts) => request<T>("DELETE", path, undefined, opts);

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  body_md: string;
  cover_image?: string | null;
  category?: string | null;
  tags: string[];
  read_time_min?: number | null;
  status: "draft" | "published";
  featured: boolean;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
};

export type Resource = {
  id: number;
  slug: string;
  title: string;
  description?: string | null;
  category?: string | null;
  file_url: string;
  file_kind: string;
  file_size_bytes?: number | null;
  status: string;
  downloads: number;
  created_at: string;
  updated_at: string;
};
