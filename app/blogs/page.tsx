"use client";

import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi2";
import Link from "next/link";
import Header from "../components/Header";
import { blogs } from "../utils/blogs";

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
      <Header />
      <main>
        <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
            >
              <HiArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 dark:text-white mb-4">
              Blogs
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
              Thoughts, tutorials, and insights on software development
            </p>
          </motion.div>

          {blogs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center py-20"
            >
              <p className="text-gray-500 dark:text-gray-400 text-base">
                No posts available yet
              </p>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {blog.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

