"use client";

import { HiArrowRight } from "react-icons/hi2";
import Projects from "./Projects";
import HeroExperience from "./HeroExperience";
import { GradientWaveText } from "@/components/gradient-wave-text";
import { RandomizedText } from "@/components/randomized-text";
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

const HERO_NAME = "Patrick Niño Noah W Policarpio";

const HERO_BIO =
  "I'm a Senior Software Engineer and Tech Lead with 7+ years of experience building scalable web and mobile applications. I enjoy creating things that live on the internet, whether that be websites, applications, or anything in between. I specialize in React, Vue, Node.js, NestJS, Laravel, Python, and cloud-based architectures, and I've managed to gain a decent amount of experience and valuable knowledge from all different kinds of fields throughout my projects and work.";

export default function Hero() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20">
      <div className="flex flex-col gap-8 lg:gap-12">
        <div className="flex flex-col gap-4">
          <p className="text-base sm:text-lg text-gray-700 dark:text-white">
            Hey, I’m
          </p>
          <h1 className="leading-tight text-gray-900! dark:text-white!">
            <GradientWaveText className="text-3xl md:text-5xl font-medium tracking-[-.03em]">
              {HERO_NAME}
            </GradientWaveText>
          </h1>
        </div>

        <div className="max-w-3xl">
          <RandomizedText
            className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-white"
            inView
            once
            split="words"
            delay={0.15}
          >
            {HERO_BIO}
          </RandomizedText>
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

        <HeroExperience />
      </div>
    </section>
  );
}
