"use client";

import type { ComponentType } from "react";

interface EmptyStateProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white/60 p-8 text-center dark:border-gray-800 dark:bg-white/5">
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-300">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-base font-medium text-foreground">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}
