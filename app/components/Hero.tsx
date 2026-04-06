"use client";

import { useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import Projects from "./Projects";
import { useQuery } from "@tanstack/react-query";
import { WordsStagger } from "@/components/words-stagger";
import { SlideUpText } from "@/components/slide-up-text";
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
  SiPython,
  SiFastapi,
  SiDjango,
} from "react-icons/si";

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

const HERO_NAME = "Patrick Niño Noah W Policarpio";

const HERO_BIO =
  "I'm a Senior Software Engineer and Tech Lead with 7+ years of experience building scalable web and mobile applications. I enjoy creating things that live on the internet, whether that be websites, applications, or anything in between. I specialize in React, Vue, Node.js, NestJS, Laravel, Python, and cloud-based architectures, and I've managed to gain a decent amount of experience and valuable knowledge from all different kinds of fields throughout my projects and work.";

export default function Hero() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const { data: experiencesData, isLoading } = useQuery<Experience[]>({
    queryKey: ["experiences"],
    queryFn: async () => {
      const res = await fetch("/api/experiences");
      if (!res.ok) throw new Error("Failed to fetch experiences");
      return res.json();
    },
  });

  const experiences = Array.isArray(experiencesData) ? experiencesData : [];

  const selectedExperience =
    experiences.find((exp) => exp.company === selectedCompany) ||
    experiences[0];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20">
      <div className="flex flex-col gap-8 lg:gap-12">
        <div className="flex flex-col gap-4">
          <p className="text-base sm:text-lg text-gray-700 dark:text-white">
            Hey, I’m
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-tight text-gray-900 dark:text-white">
            <SlideUpText
              inView
              once
              split="words"
              delay={0.1}
              stagger={0.08}
              className="text-inherit text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-tight"
            >
              {HERO_NAME}
            </SlideUpText>
          </h1>
        </div>

        <div className="max-w-3xl">
          <WordsStagger
            className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-white"
            inView
            once
            stagger={0.05}
            speed={0.2}
            delay={0.15}
          >
            {HERO_BIO}
          </WordsStagger>
        </div>

        <div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-base sm:text-lg font-medium text-white bg-slate-900 dark:bg-slate-800 rounded-full hover:bg-slate-800 dark:hover:bg-slate-700 hover:gap-3 transition-all group shadow-lg hover:shadow-xl"
          >
            Hire me!
            <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="mt-8 lg:mt-12">
          <h2 className="text-sm sm:text-base font-semibold uppercase tracking-wider text-gray-500 dark:text-white mb-6">
            Tech Stack
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-4 sm:gap-6">
            <div
              className="flex items-center justify-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-gray-800"
              title="React"
            >
              <SiReact className="w-6 h-6 sm:w-8 sm:h-8 text-[#61DAFB]" />
            </div>
            <div
              className="flex items-center justify-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-gray-800"
              title="Vue.js"
            >
              <SiVuedotjs className="w-6 h-6 sm:w-8 sm:h-8 text-[#42b883]" />
            </div>
            <div
              className="flex items-center justify-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-gray-800"
              title="Node.js"
            >
              <SiNodedotjs className="w-6 h-6 sm:w-8 sm:h-8 text-[#339933]" />
            </div>
            <div
              className="flex items-center justify-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-gray-800"
              title="NestJS"
            >
              <SiNestjs className="w-6 h-6 sm:w-8 sm:h-8 text-[#E0234E]" />
            </div>
            <div
              className="flex items-center justify-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-gray-800"
              title="Laravel"
            >
              <SiLaravel className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF2D20]" />
            </div>
            <div
              className="flex items-center justify-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-gray-800"
              title="TypeScript"
            >
              <SiTypescript className="w-6 h-6 sm:w-8 sm:h-8 text-[#3178C6]" />
            </div>
            <div
              className="flex items-center justify-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-gray-800"
              title="JavaScript"
            >
              <SiJavascript className="w-6 h-6 sm:w-8 sm:h-8 text-[#F7DF1E]" />
            </div>
            <div
              className="flex items-center justify-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-gray-800"
              title="Tailwind CSS"
            >
              <SiTailwindcss className="w-6 h-6 sm:w-8 sm:h-8 text-[#06B6D4]" />
            </div>
            <div
              className="flex items-center justify-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-gray-800"
              title="Next.js"
            >
              <SiNextdotjs className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900 dark:text-white" />
            </div>
            <div
              className="flex items-center justify-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-gray-800"
              title="MongoDB"
            >
              <SiMongodb className="w-6 h-6 sm:w-8 sm:h-8 text-[#47A248]" />
            </div>
            <div
              className="flex items-center justify-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-gray-800"
              title="PostgreSQL"
            >
              <SiPostgresql className="w-6 h-6 sm:w-8 sm:h-8 text-[#4169E1]" />
            </div>
            <div
              className="flex items-center justify-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-gray-800"
              title="AWS"
            >
              <SiAmazon className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF9900]" />
            </div>
            <div
              className="flex items-center justify-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-gray-800"
              title="Docker"
            >
              <SiDocker className="w-6 h-6 sm:w-8 sm:h-8 text-[#2496ED]" />
            </div>
            <div
              className="flex items-center justify-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-gray-800"
              title="Serverless"
            >
              <SiServerless className="w-6 h-6 sm:w-8 sm:h-8 text-[#FD5750]" />
            </div>
            <div
              className="flex items-center justify-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-gray-800"
              title="AWS S3"
            >
              <SiAmazons3 className="w-6 h-6 sm:w-8 sm:h-8 text-[#569A31]" />
            </div>
            <div
              className="flex items-center justify-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-gray-800"
              title="Python"
            >
              <SiPython className="w-6 h-6 sm:w-8 sm:h-8 text-[#3776AB]" />
            </div>
            <div
              className="flex items-center justify-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-gray-800"
              title="FastAPI"
            >
              <SiFastapi className="w-6 h-6 sm:w-8 sm:h-8 text-[#009688]" />
            </div>
            <div
              className="flex items-center justify-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-gray-800"
              title="Django"
            >
              <SiDjango className="w-6 h-6 sm:w-8 sm:h-8 text-[#092E20]" />
            </div>
          </div>
        </div>

        <Projects />

        <div className="mt-8 lg:mt-12">
          <h2 className="text-sm sm:text-base font-semibold uppercase tracking-wider text-gray-500 dark:text-white mb-6">
            Experience
          </h2>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : experiences.length === 0 ? (
            <p className="text-gray-500 text-center">No data to show</p>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2 -mx-6 sm:mx-0 px-6 sm:px-0">
                {experiences.map((exp) => (
                  <button
                    key={exp.id}
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

              {selectedExperience && (
                <div key={selectedCompany} className="space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {selectedExperience.position}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-white">
                      {selectedExperience.company} /{" "}
                      {selectedExperience.location}
                    </p>
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-200 mt-1">
                      {selectedExperience.startDate} -{" "}
                      {selectedExperience.endDate || "Present"}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-gray-600 dark:text-white whitespace-pre-wrap">
                    {selectedExperience.description}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
