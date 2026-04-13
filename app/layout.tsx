import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import ProgressBar from "./components/ProgressBar";
import Footer from "./components/Footer";
import Cursor from "./components/AnimatedCursor";
import QueryProvider from "./components/QueryProvider";
import LenisProvider from "./components/LenisProvider";
import { AppToaster } from "./components/AppToaster";
import { themeScript } from "@/utils/theme-script";
import { ThemeProvider } from "../contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
  keywords: [
    "Software Engineer",
    "Tech Lead",
    "Full Stack Developer",
    "React",
    "Node.js",
    "Portfolio",
  ],
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
    creator: "@itsmenoahpoli", // User should update this
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
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <body
        className={`${inter.variable} bg-background text-foreground font-sans antialiased`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
        <Analytics />
        <SpeedInsights />
        <ThemeProvider>
          <div className="relative min-h-screen overflow-x-hidden">
            <div className="pointer-events-none fixed inset-0">
              <div className="absolute inset-0 bg-background" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.22),transparent_52%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_46%)] dark:bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.2),transparent_56%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.16),transparent_50%)]" />
              <DotPattern
                width={14}
                height={14}
                cx={1}
                cy={1}
                cr={1.2}
                className={cn(
                  "absolute inset-0 text-black/[0.12] dark:text-white/[0.12]",
                  "[mask-image:radial-gradient(ellipse_at_center,white,transparent_92%)]",
                )}
              />
            </div>

            <div className="relative">
              <LenisProvider />
              <QueryProvider>
                <AppToaster />
                <Cursor />
                <Suspense fallback={null}>
                  <ProgressBar />
                </Suspense>
                {children}
                <Footer />
              </QueryProvider>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
