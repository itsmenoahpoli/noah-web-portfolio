"use client";

import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi2";
import Link from "next/link";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";

interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  tags: string[];
  image?: string;
  slug: string;
  publishedAt: string;
}

export default function BlogsPage() {
  const { data: blogsData, isLoading } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      return res.json();
    },
  });

  const blogs = Array.isArray(blogsData) ? blogsData : [];

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

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : blogs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center py-20"
            >
              <p className="text-gray-500 dark:text-gray-400 text-base text-ce">
                No data to show
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
                  <Link href={`/blogs/${blog.slug}`}>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 cursor-pointer hover:text-blue-500 transition-colors">
                      {blog.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {blog.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>
                      {new Date(blog.publishedAt).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span>{blog.author}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
