"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data: session } = useSession();
  const isAdmin = Boolean(session?.user?.isAdmin);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-brand">
          <img src="/images/a_logo.png" alt="Logo" />
          <span>Argajit Sarkar</span>
        </Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/research">Research</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/writing">Writing</Link></li>
          <li><Link href="/resources">Resources</Link></li>
          <li><Link href="/now">Now</Link></li>
          <li><Link href="/speaking">Speaking</Link></li>
          <li><a href="/data/Argajit CV 2026.pdf" target="_blank" className="nav-cta">Download CV</a></li>
          {isAdmin && (
            <>
              <li><Link href="/admin">Admin</Link></li>
              <li>
                <button className="nav-cta" onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
              </li>
            </>
          )}
          <li><ThemeToggle /></li>
        </ul>
      </div>
    </nav>
  );
}
