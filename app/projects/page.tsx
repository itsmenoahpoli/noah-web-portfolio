"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiLink, HiArrowLeft } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import { projects, getTagColor } from "../utils/projects";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
      <Header />
      <main>
        <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
            >
              <HiArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 dark:text-white mb-4">
              Projects
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
              A collection of projects I've built
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group cursor-pointer h-full"
              >
                <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-950 h-full flex flex-col hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                  <div className="aspect-[4/3] relative overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-900">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/20 transition-colors" />
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <a
                          href={project.githubUrl}
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                          aria-label="GitHub"
                        >
                          <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                        </a>
                        <a
                          href={project.liveUrl}
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                          aria-label="Live Demo"
                        >
                          <HiLink className="w-4 h-4 sm:w-5 sm:h-5" />
                        </a>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3 grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies
                        .split(" - ")
                        .map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`text-xs px-2 py-1 rounded ${getTagColor(
                              tech
                            )}`}
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
