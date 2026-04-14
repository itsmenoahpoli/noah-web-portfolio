"use client";

import type { ComponentType } from "react";
import { HiArrowRight } from "react-icons/hi2";
import Projects from "@/components/Projects";
import HeroExperience from "@/components/HeroExperience";
import { GradientWaveText } from "@/components/GradientWaveText";
import { Marquee } from "@/components/Marquee";
import { RandomizedText } from "@/components/RandomizedText";
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

type TechStackItem = {
  name: string;
  icon: ComponentType<{ className?: string }>;
  colorClassName: string;
};

const TECH_STACK: TechStackItem[] = [
  { name: "React", icon: SiReact, colorClassName: "text-[#7DD3FC]" },
  { name: "Vue.js", icon: SiVuedotjs, colorClassName: "text-[#6EE7B7]" },
  { name: "Node.js", icon: SiNodedotjs, colorClassName: "text-[#86EFAC]" },
  { name: "NestJS", icon: SiNestjs, colorClassName: "text-[#FB7185]" },
  { name: "Laravel", icon: SiLaravel, colorClassName: "text-[#FF8A65]" },
  { name: "TypeScript", icon: SiTypescript, colorClassName: "text-[#60A5FA]" },
  { name: "JavaScript", icon: SiJavascript, colorClassName: "text-[#FDE047]" },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    colorClassName: "text-[#67E8F9]",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    colorClassName: "text-gray-900 dark:text-white",
  },
  { name: "MongoDB", icon: SiMongodb, colorClassName: "text-[#4ADE80]" },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    colorClassName: "text-[#60A5FA]",
  },
  { name: "AWS", icon: SiAmazon, colorClassName: "text-[#FDBA74]" },
  { name: "Docker", icon: SiDocker, colorClassName: "text-[#7DD3FC]" },
  { name: "Serverless", icon: SiServerless, colorClassName: "text-[#FCA5A5]" },
  { name: "AWS S3", icon: SiAmazons3, colorClassName: "text-[#A3E635]" },
  { name: "Python", icon: SiPython, colorClassName: "text-[#93C5FD]" },
  { name: "FastAPI", icon: SiFastapi, colorClassName: "text-[#5EEAD4]" },
  { name: "Django", icon: SiDjango, colorClassName: "text-[#86EFAC]" },
];

const techStackRows = [
  TECH_STACK.slice(0, Math.ceil(TECH_STACK.length / 2)),
  TECH_STACK.slice(Math.ceil(TECH_STACK.length / 2)),
];

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
          <div className="flex flex-col gap-4">
            {techStackRows.map((row, index) => (
              <Marquee
                key={index}
                pauseOnHover
                direction={index % 2 === 1 ? "right" : "left"}
                duration={index % 2 === 1 ? 26 : 22}
                className="py-1"
              >
                <div className="flex gap-4 pr-4 sm:gap-6 sm:pr-6">
                  {row.map(({ name, icon: Icon, colorClassName }) => (
                    <div
                      key={name}
                      className="group flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-gray-200/80 bg-white/70 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-gray-300 hover:bg-white dark:border-slate-700/80 dark:bg-slate-950 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.03)] dark:hover:border-slate-500 dark:hover:bg-slate-900 sm:h-24 sm:w-24"
                      title={name}
                    >
                      <Icon
                        className={`h-8 w-8 sm:h-10 sm:w-10 ${colorClassName} saturate-150 brightness-125 transition-transform duration-300 group-hover:scale-110 dark:brightness-150`}
                      />
                    </div>
                  ))}
                </div>
              </Marquee>
            ))}
          </div>
        </div>

        <Projects />

        <HeroExperience />
      </div>
    </section>
  );
}
