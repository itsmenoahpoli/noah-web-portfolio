import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-transparent text-[var(--foreground)] font-sans flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-16 pt-28 sm:pt-32 pb-20">
        <div className="w-full max-w-7xl mx-auto">
          <p className="text-base sm:text-lg text-gray-700 dark:text-white mb-2">
            Error 404
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-medium leading-tight text-gray-900 dark:text-white tracking-tight mb-6">
            This page doesn&apos;t exist
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-white max-w-xl leading-relaxed mb-10">
            The link may be broken, or the page may have been removed. Head
            back home or get in touch from the contact page.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base sm:text-lg font-medium text-white bg-slate-900 dark:bg-slate-800 rounded-full hover:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-lg hover:shadow-xl w-fit"
            >
              Back to home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors w-fit"
            >
              <HiArrowLeft className="w-4 h-4 shrink-0" />
              Contact
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
