"use client";

import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi2";
import Link from "next/link";
import Header from "../components/Header";
import { services, getCategoryLabel } from "@/utils/services";
import { getTagColor } from "@/utils/techColors";

export default function OfferedServicesPage() {
  const categories = ["development", "tutorial"] as const;

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
              Offered Services
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
              Professional services I provide
            </p>
          </motion.div>

          <div className="space-y-12">
            {categories.map((category, categoryIndex) => {
              const categoryServices = services.filter(
                (service) => service.category === category
              );

              if (categoryServices.length === 0) return null;

              const isDevelopmentCategory = category === "development";

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  className="space-y-6 hover:cursor-pointer"
                >
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                    {getCategoryLabel(category)}
                  </h2>
                  <div
                    className={
                      isDevelopmentCategory
                        ? "flex flex-col sm:flex-row gap-6"
                        : "grid grid-cols-1 md:grid-cols-2 gap-6"
                    }
                  >
                    {categoryServices.map((service, index) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: categoryIndex * 0.1 + index * 0.05,
                        }}
                        className={`p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow ${
                          isDevelopmentCategory ? "flex-1" : ""
                        }`}
                      >
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                          {service.description}
                        </p>
                        {service.technologies &&
                          service.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {service.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className={`text-xs px-2 py-1 rounded ${getTagColor(
                                    tech
                                  )}`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
