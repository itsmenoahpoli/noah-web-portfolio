import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import ProgressBar from "./components/ProgressBar";
import Footer from "./components/Footer";
import Cursor from "./components/AnimatedCursor";
import QueryProvider from "./components/QueryProvider";
import { themeScript } from "@/utils/theme-script";
import { ThemeProvider } from "../contexts/ThemeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Patrick Niño Noah W Policarpio",
    template: "%s | Patrick Niño Noah W Policarpio",
  },
  description:
    "Senior Software Engineer and Tech Lead with 7+ years of experience building scalable web and mobile applications. Expert in React, Vue, Node.js, NestJS, Laravel, and cloud-based architectures.",
  keywords: ["Software Engineer", "Tech Lead", "Full Stack Developer", "React", "Node.js", "Portfolio"],
  authors: [{ name: "Patrick Niño Noah W Policarpio" }],
  creator: "Patrick Niño Noah W Policarpio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Patrick Niño Noah W Policarpio Portfolio",
    title: "Patrick Niño Noah W Policarpio",
    description:
      "Senior Software Engineer and Tech Lead with 7+ years of experience building scalable web and mobile applications.",
    images: [
      {
        url: "/noah-self.jpg",
        width: 1200,
        height: 630,
        alt: "Patrick Niño Noah W Policarpio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrick Niño Noah W Policarpio",
    description:
      "Senior Software Engineer and Tech Lead with 7+ years of experience building scalable web and mobile applications.",
    images: ["/noah-self.jpg"],
    creator: "@yourtwitterhandle", // User should update this
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
        <ThemeProvider>
          <QueryProvider>
            <Cursor />
            <Suspense fallback={null}>
              <ProgressBar />
            </Suspense>
            {children}
            <Footer />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
