"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiLink, HiClock } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";
import { getTagColor } from "@/utils/projects";
import { useQuery } from "@tanstack/react-query";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string;
  githubUrl: string;
  liveUrl: string;
}

export default function Projects() {
  const { data: projectsData, isLoading } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
  });

  const projects = Array.isArray(projectsData) ? projectsData : [];
  const displayedProjects = projects.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="mt-8 lg:mt-12 dark:bg-gray-950/50 -mx-6 sm:-mx-8 lg:-mx-12 px-6 sm:px-8 lg:px-12 py-8 lg:py-12 rounded-lg"
      id="projects"
    >
      <h2 className="text-sm sm:text-base font-semibold uppercase tracking-wider text-gray-500 dark:text-white mb-6">
        Projects
      </h2>
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : displayedProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-base">
            No data to show
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group cursor-pointer h-full"
              >
                <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-950 h-full flex flex-col">
                  <div className="aspect-4/3 relative overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-900">
                    <Image
                      src={project.image || "/next.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/20 transition-colors" />
                  </div>
                  <div className="p-4 flex flex-col grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <a
                          href={project.githubUrl}
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                          aria-label="GitHub"
                        >
                          <FaGithub className="w-4 h-4" />
                        </a>
                        <a
                          href={project.liveUrl}
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                          aria-label="Live Demo"
                        >
                          <HiLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-white mb-3 line-clamp-2 grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies
                        .split(",")
                        .map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`text-xs px-2 py-1 rounded ${getTagColor(
                              tech.trim()
                            )}`}
                          >
                            {tech.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex justify-center mt-8"
          >
            <Link
              href="/projects"
              className="px-6 py-3 text-base font-medium text-slate-900 dark:text-white bg-transparent border border-slate-900 dark:border-white rounded-full hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors"
            >
              See All
            </Link>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
