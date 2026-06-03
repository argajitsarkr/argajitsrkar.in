// Force dynamic rendering on /auth/* - the signin page uses useSearchParams
// and NextAuth's signIn helper, neither of which work under static prerendering.
export const dynamic = "force-dynamic";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
