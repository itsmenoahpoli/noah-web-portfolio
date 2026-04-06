"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export default function HeroExperience() {
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
                type="button"
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
                  {selectedExperience.company} / {selectedExperience.location}
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
  );
}
