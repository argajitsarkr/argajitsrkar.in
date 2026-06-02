import type { Metadata } from "next";
import type { ReactNode } from "react";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Argajit Sarkar - Doctoral Scholar | AI-Driven Drug Discovery",
  description:
    "Doctoral Scholar at Tripura University. ICMR Project Technical Support-III. ASM-FLMF Fellow (2026-28). Bridging microbial pathogenesis with AI for drug discovery.",
  icons: { icon: "/images/a_logo.png" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="stylesheet" href="/styles.css" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');",
          }}
        />
      </head>
      <body>
        <Providers>
          <div className="progress-bar"></div>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
