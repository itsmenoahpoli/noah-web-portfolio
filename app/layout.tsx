import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import ProgressBar from "./components/ProgressBar";
import Footer from "./components/Footer";
import { themeScript } from "./utils/theme-script";
import { ThemeProvider } from "../contexts/ThemeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "Patrick Niño Noah W Policarpio",
  description:
    "Senior Software Engineer and Tech Lead with 7+ years of experience building scalable web and mobile applications. Expert in React, Vue, Node.js, NestJS, Laravel, and cloud-based architectures.",
  openGraph: {
    title: "Patrick Niño Noah W Policarpio",
    description:
      "Senior Software Engineer and Tech Lead with 7+ years of experience building scalable web and mobile applications. Expert in React, Vue, Node.js, NestJS, Laravel, and cloud-based architectures.",
    images: [
      {
        url: "/noah-self.jpg",
        width: 1200,
        height: 630,
        alt: "Noah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrick Niño Noah W Policarpio",
    description:
      "Senior Software Engineer and Tech Lead with 7+ years of experience building scalable web and mobile applications. Expert in React, Vue, Node.js, NestJS, Laravel, and cloud-based architectures.",
    images: ["/noah-self.jpg"],
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
          <Suspense fallback={null}>
            <ProgressBar />
          </Suspense>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
