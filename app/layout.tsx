import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://lalitchaudhari.dev"),
  title: "Lalit Chaudhari — AI Engineer & Full Stack Developer",
  description:
    "Lalit Chaudhari builds AI-powered systems and scalable web products — RAG pipelines, LLM workflows, and full-stack SaaS.",
  authors: [{ name: "Lalit Chaudhari" }],
  openGraph: {
    title: "Lalit Chaudhari — AI Engineer & Full Stack Developer",
    description: "AI Engineer specializing in RAG, LLM orchestration, and full-stack SaaS development.",
    type: "website",
    url: "https://lalitchaudhari.dev",
    siteName: "Lalit Chaudhari",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
