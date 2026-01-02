"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiLink } from "react-icons/hi2";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React and Node.js",
    image: "/api/placeholder/400/300",
    technologies: "React - Node.js - MongoDB",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    image: "/api/placeholder/400/300",
    technologies: "Vue.js - NestJS - PostgreSQL",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Data visualization and analytics platform",
    image: "/api/placeholder/400/300",
    technologies: "React - TypeScript - AWS",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 4,
    title: "Mobile Banking App",
    description: "Secure mobile banking application",
    image: "/api/placeholder/400/300",
    technologies: "React Native - Node.js - Docker",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 5,
    title: "Social Media Platform",
    description: "Social networking platform with real-time features",
    image: "/api/placeholder/400/300",
    technologies: "Vue.js - Laravel - Redis",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 6,
    title: "Cloud Storage Service",
    description: "File storage and sharing platform",
    image: "/api/placeholder/400/300",
    technologies: "Next.js - AWS S3 - Serverless",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 7,
    title: "Healthcare Management",
    description: "Patient management and scheduling system",
    image: "/api/placeholder/400/300",
    technologies: "React - NestJS - PostgreSQL",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 8,
    title: "Learning Management System",
    description: "Online education platform",
    image: "/api/placeholder/400/300",
    technologies: "Vue.js - Laravel - MongoDB",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 9,
    title: "Real Estate Platform",
    description: "Property listing and management system",
    image: "/api/placeholder/400/300",
    technologies: "Next.js - Node.js - AWS",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 10,
    title: "Food Delivery App",
    description: "Restaurant ordering and delivery platform",
    image: "/api/placeholder/400/300",
    technologies: "React Native - Node.js - MongoDB",
    githubUrl: "#",
    liveUrl: "#",
  },
];

const getTagColor = (tech: string): string => {
  const techLower = tech.toLowerCase();
  const colorMap: Record<string, string> = {
    react: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    "react.js":
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    "react native":
      "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300",
    vue: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    "vue.js":
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    nuxt: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
    "node.js":
      "bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-700",
    nestjs: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
    laravel:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
    typescript:
      "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
    javascript:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    "next.js": "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
    mongodb:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
    postgresql:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    redis: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
    aws: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    "aws s3":
      "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    docker: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    serverless:
      "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300",
    bootstrap:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    "styled components":
      "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300",
    tailwindcss:
      "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300",
    "context api":
      "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
    redux:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    vuex: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    firebase:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
    "github api":
      "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
    "themoviedb api":
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    "theaudiodb api":
      "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
    netlify: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300",
  };

  return (
    colorMap[techLower] ||
    "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
  );
};

export default function Projects() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="mt-8 lg:mt-12"
      id="projects"
    >
      <h2 className="text-sm sm:text-base font-semibold uppercase tracking-wider text-gray-500 dark:text-white mb-6">
        Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group cursor-pointer h-full"
          >
            <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-950 h-full flex flex-col">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden shrink-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl font-bold text-gray-400 dark:text-gray-600">
                    {project.id}
                  </div>
                </div>
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
                  {project.technologies.split(" - ").map((tech, techIndex) => (
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
    </motion.div>
  );
}
