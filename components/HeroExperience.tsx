"use client";

import { useQuery } from "@tanstack/react-query";
import {
  compareExperienceStartDates,
  formatExperienceDuration,
  formatExperienceMonthYear,
} from "@/lib/experience-dates";

interface Experience {
  id: string;
  company: string;
  companyLogo: string | null;
  categories: string[];
  position: string;
  startDate: string;
  endDate: string | null;
}

export default function HeroExperience() {
  const { data: experiencesData, isLoading } = useQuery<Experience[]>({
    queryKey: ["experiences"],
    queryFn: async () => {
      const res = await fetch("/api/experiences");
      if (!res.ok) throw new Error("Failed to fetch experiences");
      return res.json();
    },
  });

  const experiences = Array.isArray(experiencesData)
    ? [...experiencesData].sort((a, b) =>
        compareExperienceStartDates(a.startDate, b.startDate),
      )
    : [];

  return (
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
        <div className="relative mx-auto max-w-4xl space-y-0">
          <div className="absolute left-1/2 top-2 bottom-2 hidden w-px -translate-x-1/2 bg-gray-200 dark:bg-gray-800 sm:block" />
          {experiences.map((exp, index) => {
            const duration = formatExperienceDuration(exp.startDate, exp.endDate);
            const isLeftAligned = index % 2 === 0;
            const startLabel = formatExperienceMonthYear(exp.startDate);
            const endLabel = exp.endDate?.trim()
              ? formatExperienceMonthYear(exp.endDate)
              : "Present";
            const timelineMeta = exp.endDate?.trim()
              ? duration
                ? `${startLabel} - ${endLabel} • ${duration}`
                : `${startLabel} - ${endLabel}`
              : "Present";

            return (
              <div
                key={exp.id}
                className="relative grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-4 pb-8 last:pb-0"
              >
                {isLeftAligned ? (
                  <div className="justify-self-end text-right">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                      {exp.company}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-200">
                      {exp.position}
                    </p>
                    {exp.categories.length > 0 && (
                      <p className="mt-1 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        {exp.categories.join(" • ")}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="self-center justify-self-end text-right">
                    {timelineMeta ? (
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">
                        {timelineMeta}
                      </p>
                    ) : (
                      <div aria-hidden className="h-5" />
                    )}
                  </div>
                )}

                <div className="relative flex w-8 shrink-0 justify-center">
                  {index < experiences.length - 1 && (
                    <div className="absolute top-8 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />
                  )}
                  <div className="relative mt-1 h-3 w-3 rounded-full border border-gray-300 bg-white dark:border-gray-600 dark:bg-slate-900" />
                </div>

                {isLeftAligned ? (
                  <div className="self-center justify-self-start text-left">
                    {timelineMeta ? (
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">
                        {timelineMeta}
                      </p>
                    ) : (
                      <div aria-hidden className="h-5" />
                    )}
                  </div>
                ) : (
                  <div className="justify-self-start text-left">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                      {exp.company}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-200">
                      {exp.position}
                    </p>
                    {exp.categories.length > 0 && (
                      <p className="mt-1 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        {exp.categories.join(" • ")}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
