import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProgressBar from "./components/ProgressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
