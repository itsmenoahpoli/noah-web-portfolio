"use client";

import { useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import { motion } from "framer-motion";
import Projects from "./Projects";
import {
  SiReact,
  SiVuedotjs,
  SiNodedotjs,
  SiNestjs,
  SiLaravel,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiAmazon,
  SiDocker,
  SiServerless,
  SiAmazons3,
} from "react-icons/si";

const experiences = [
  {
    company: "Selfbook",
    role: "Frontend Engineer (Remote)",
    location: "US - New York",
    period: "Jul 2021 - Present",
    responsibilities: [
      "Developing screens and UI components for the web application using React and Tailwind.",
      "Fixing UI issues and integrating backend APIs with Redux Saga.",
    ],
  },
  {
    company: "Wevoz",
    role: "Full Stack Developer",
    location: "Remote",
    period: "Jan 2020 - Jun 2021",
    responsibilities: [
      "Built and maintained web applications using modern frameworks.",
      "Collaborated with cross-functional teams to deliver high-quality products.",
    ],
  },
  {
    company: "FreeBeings",
    role: "Software Engineer",
    location: "Remote",
    period: "Mar 2019 - Dec 2019",
    responsibilities: [
      "Developed responsive web applications.",
      "Implemented new features and optimized performance.",
    ],
  },
  {
    company: "TDF",
    role: "Junior Developer",
    location: "Remote",
    period: "Jun 2018 - Feb 2019",
    responsibilities: [
      "Assisted in developing web applications.",
      "Learned and applied best practices in software development.",
    ],
  },
  {
    company: "Upwork",
    role: "Freelance Developer",
    location: "Remote",
    period: "2017 - 2018",
    responsibilities: [
      "Completed various client projects.",
      "Built custom solutions for diverse requirements.",
    ],
  },
  {
    company: "Shoppy",
    role: "Frontend Developer",
    location: "Remote",
    period: "2016 - 2017",
    responsibilities: [
      "Created user interfaces for e-commerce platform.",
      "Improved user experience and accessibility.",
    ],
  },
];

export default function Hero() {
  const [selectedCompany, setSelectedCompany] = useState(
    experiences[0].company
  );
  const selectedExperience =
    experiences.find((exp) => exp.company === selectedCompany) ||
    experiences[0];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20">
      <div className="flex flex-col gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <p className="text-base sm:text-lg text-gray-700 dark:text-white">
            Hey, I'm
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            {/* <span className="bg-linear-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            </span> */}
            Patrick Niño Noah W Policarpio
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl"
        >
          <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-white">
            I'm a Senior Software Engineer and Tech Lead with 7+ years of
            experience building scalable web and mobile applications. I enjoy
            creating things that live on the internet, whether that be websites,
            applications, or anything in between. I specialize in React, Vue,
            Node.js, NestJS, Laravel, Python, and cloud-based architectures, and
            I've managed to gain a decent amount of experience and valuable
            knowledge from all different kinds of fields throughout my projects
            and work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-base sm:text-lg font-medium text-white bg-slate-900 dark:bg-slate-800 rounded-full hover:bg-slate-800 dark:hover:bg-slate-700 hover:gap-3 transition-all group shadow-lg hover:shadow-xl"
          >
            Hire me!
            <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 lg:mt-12"
        >
          <h2 className="text-sm sm:text-base font-semibold uppercase tracking-wider text-gray-500 dark:text-white mb-6">
            Tech Stack
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-4 sm:gap-6">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center p-3 sm:p-4 bg-white dark:bg-gray-950 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-gray-200 dark:border-gray-800"
              title="React"
            >
              <SiReact className="w-6 h-6 sm:w-8 sm:h-8 text-[#61DAFB]" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center p-3 sm:p-4 bg-white dark:bg-gray-950 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-gray-200 dark:border-gray-800"
              title="Vue.js"
            >
              <SiVuedotjs className="w-6 h-6 sm:w-8 sm:h-8 text-[#4FC08D]" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center p-3 sm:p-4 bg-white dark:bg-gray-950 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-gray-200 dark:border-gray-800"
              title="Node.js"
            >
              <SiNodedotjs className="w-6 h-6 sm:w-8 sm:h-8 text-[#339933]" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center p-3 sm:p-4 bg-white dark:bg-gray-950 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-gray-200 dark:border-gray-800"
              title="NestJS"
            >
              <SiNestjs className="w-6 h-6 sm:w-8 sm:h-8 text-[#E0234E]" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center p-3 sm:p-4 bg-white dark:bg-gray-950 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-gray-200 dark:border-gray-800"
              title="Laravel"
            >
              <SiLaravel className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF2D20]" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center p-3 sm:p-4 bg-white dark:bg-gray-950 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-gray-200 dark:border-gray-800"
              title="TypeScript"
            >
              <SiTypescript className="w-6 h-6 sm:w-8 sm:h-8 text-[#3178C6]" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center p-3 sm:p-4 bg-white dark:bg-gray-950 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-gray-200 dark:border-gray-800"
              title="JavaScript"
            >
              <SiJavascript className="w-6 h-6 sm:w-8 sm:h-8 text-[#F7DF1E]" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center p-3 sm:p-4 bg-white dark:bg-gray-950 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-gray-200 dark:border-gray-800"
              title="Tailwind CSS"
            >
              <SiTailwindcss className="w-6 h-6 sm:w-8 sm:h-8 text-[#06B6D4]" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center p-3 sm:p-4 bg-white dark:bg-gray-950 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-gray-200 dark:border-gray-800"
              title="Next.js"
            >
              <SiNextdotjs className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900 dark:text-white" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center p-3 sm:p-4 bg-white dark:bg-gray-950 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-gray-200 dark:border-gray-800"
              title="MongoDB"
            >
              <SiMongodb className="w-6 h-6 sm:w-8 sm:h-8 text-[#47A248]" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center p-3 sm:p-4 bg-white dark:bg-gray-950 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-gray-200 dark:border-gray-800"
              title="PostgreSQL"
            >
              <SiPostgresql className="w-6 h-6 sm:w-8 sm:h-8 text-[#4169E1]" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center p-3 sm:p-4 bg-white dark:bg-gray-950 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-gray-200 dark:border-gray-800"
              title="AWS"
            >
              <SiAmazon className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF9900]" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center p-3 sm:p-4 bg-white dark:bg-gray-950 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-gray-200 dark:border-gray-800"
              title="Docker"
            >
              <SiDocker className="w-6 h-6 sm:w-8 sm:h-8 text-[#2496ED]" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center p-3 sm:p-4 bg-white dark:bg-gray-950 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-gray-200 dark:border-gray-800"
              title="Serverless"
            >
              <SiServerless className="w-6 h-6 sm:w-8 sm:h-8 text-[#FD5750]" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center p-3 sm:p-4 bg-white dark:bg-gray-950 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-gray-200 dark:border-gray-800"
              title="AWS S3"
            >
              <SiAmazons3 className="w-6 h-6 sm:w-8 sm:h-8 text-[#569A31]" />
            </motion.div>
          </div>
        </motion.div>

        <Projects />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 lg:mt-12"
        >
          <h2 className="text-sm sm:text-base font-semibold uppercase tracking-wider text-gray-500 dark:text-white mb-6">
            Experience
          </h2>

          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2 -mx-6 sm:mx-0 px-6 sm:px-0">
            {experiences.map((exp) => (
              <button
                key={exp.company}
                onClick={() => setSelectedCompany(exp.company)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-medium rounded transition-all whitespace-nowrap ${
                  selectedCompany === exp.company
                    ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                    : "bg-transparent text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {exp.company}
              </button>
            ))}
          </div>

          <motion.div
            key={selectedCompany}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {selectedExperience.role}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-white">
                {selectedExperience.company} / {selectedExperience.location}
              </p>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-200 mt-1">
                {selectedExperience.period}
              </p>
            </div>

            <ul className="space-y-2 pl-4">
              {selectedExperience.responsibilities.map(
                (responsibility, index) => (
                  <li
                    key={index}
                    className="text-sm sm:text-base text-gray-600 dark:text-white relative before:content-['•'] before:absolute before:-left-4 before:text-gray-400 dark:before:text-gray-300"
                  >
                    {responsibility}
                  </li>
                )
              )}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
