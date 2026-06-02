"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const res = await signIn("credentials", { email, password, callbackUrl, redirect: true });
    if (res && (res as any).error) setErr("Invalid credentials");
  }

  return (
    <section className="section">
      <div className="container container--narrow">
        <div className="card" style={{ padding: 32, maxWidth: 420, margin: "0 auto" }}>
          <h1>Sign in</h1>
          <button onClick={() => signIn("google", { callbackUrl })} className="hero-link hero-link--primary" style={{ width: "100%", margin: "16px 0" }}>
            Continue with Google
          </button>
          <div style={{ textAlign: "center", opacity: 0.6, margin: "16px 0" }}>or</div>
          <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: 8 }} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: 8 }} />
            {err && <div style={{ color: "crimson" }}>{err}</div>}
            <button type="submit" className="hero-link hero-link--secondary">Sign in</button>
          </form>
        </div>
      </div>
    </section>
  );
}
