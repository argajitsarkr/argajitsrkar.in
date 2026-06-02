import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { SignJWT } from "jose";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "argajit05@gmail.com")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

async function mintBackendToken(email: string): Promise<string> {
  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "");
  return await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        // TODO: replace with real backend verification once /auth/login is wired.
        // For now, allow any admin email with a non-empty password (dev only).
        const email = String(creds?.email || "").toLowerCase();
        const password = String(creds?.password || "");
        if (!email || !password) return null;
        if (!ADMIN_EMAILS.includes(email)) return null;
        return { id: email, email, name: email.split("@")[0] };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const email = (user?.email || token.email || "").toString().toLowerCase();
      if (email) {
        token.email = email;
        token.isAdmin = ADMIN_EMAILS.includes(email);
        if (!token.backendToken) {
          token.backendToken = await mintBackendToken(email);
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.backendToken = token.backendToken as string | undefined;
      if (session.user) {
        session.user.isAdmin = Boolean(token.isAdmin);
        session.user.email = (token.email as string) || session.user.email;
      }
      return session;
    },
  },
  pages: { signIn: "/auth/signin" },
});
