"use client";

import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import {
  HiOutlineRocketLaunch,
  HiOutlineBookOpen,
  HiOutlineBriefcase,
  HiOutlineEnvelope,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { parseApiError } from "@/lib/api-error";
import DashboardLoading from "./DashboardLoading";

interface Project {
  id: string;
  image: string;
  images?: string[];
}

interface Blog {
  id: string;
  tags: string[];
}

interface Experience {
  id: string;
}

interface ContactSubmission {
  id: string;
}

interface StatCardProps {
  label: string;
  value: number;
  helper: string;
  icon: React.ComponentType<{ className?: string }>;
  iconClassName: string;
}

function StatCard({
  label,
  value,
  helper,
  icon: Icon,
  iconClassName,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10 backdrop-blur-xl">
      <div
        className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${iconClassName}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-xs uppercase tracking-wider text-gray-500">
        {helper}
      </p>
    </div>
  );
}

export default function MetricsManager() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["projects"],
        queryFn: async () => {
          const res = await fetch("/api/projects");
          if (!res.ok) {
            throw new Error(await parseApiError(res, "Failed to fetch projects"));
          }
          return res.json() as Promise<Project[]>;
        },
      },
      {
        queryKey: ["blogs"],
        queryFn: async () => {
          const res = await fetch("/api/blogs");
          if (!res.ok) {
            throw new Error(await parseApiError(res, "Failed to fetch blogs"));
          }
          return res.json() as Promise<Blog[]>;
        },
      },
      {
        queryKey: ["experiences"],
        queryFn: async () => {
          const res = await fetch("/api/experiences");
          if (!res.ok) {
            throw new Error(
              await parseApiError(res, "Failed to fetch experiences"),
            );
          }
          return res.json() as Promise<Experience[]>;
        },
      },
      {
        queryKey: ["contact-submissions"],
        queryFn: async () => {
          const res = await fetch("/api/contact-submissions");
          if (!res.ok) {
            throw new Error(
              await parseApiError(res, "Failed to fetch contact submissions"),
            );
          }
          return res.json() as Promise<ContactSubmission[]>;
        },
      },
    ],
  });

  const [projectsQuery, blogsQuery, experiencesQuery, contactSubmissionsQuery] =
    results;
  const isLoading = results.some((result) => result.isLoading);
  const error = results.find((result) => result.error)?.error;

  const stats = useMemo(() => {
    const projects = projectsQuery.data ?? [];
    const blogs = blogsQuery.data ?? [];
    const experiences = experiencesQuery.data ?? [];
    const contactSubmissions = contactSubmissionsQuery.data ?? [];

    const totalProjectImages = projects.reduce((total, project) => {
      const imageCount = project.images?.length ?? (project.image ? 1 : 0);
      return total + imageCount;
    }, 0);

    const totalBlogTags = blogs.reduce((total, blog) => total + blog.tags.length, 0);

    return {
      projects: projects.length,
      blogs: blogs.length,
      experiences: experiences.length,
      contactSubmissions: contactSubmissions.length,
      totalProjectImages,
      totalBlogTags,
      totalEntries:
        projects.length +
        blogs.length +
        experiences.length +
        contactSubmissions.length,
    };
  }, [
    projectsQuery.data,
    blogsQuery.data,
    experiencesQuery.data,
    contactSubmissionsQuery.data,
  ]);

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
        {error instanceof Error ? error.message : "Failed to load metrics"}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-medium">Metrics</h2>
        <p className="mt-2 text-sm text-gray-500">
          Snapshot of your CMS content across projects, blogs, and experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StatCard
          label="Projects"
          value={stats.projects}
          helper={`${stats.totalProjectImages} uploaded images`}
          icon={HiOutlineRocketLaunch}
          iconClassName="bg-sky-400/10 text-sky-300"
        />
        <StatCard
          label="Blogs"
          value={stats.blogs}
          helper={`${stats.totalBlogTags} total tags`}
          icon={HiOutlineBookOpen}
          iconClassName="bg-violet-400/10 text-violet-300"
        />
        <StatCard
          label="Experiences"
          value={stats.experiences}
          helper="Career timeline entries"
          icon={HiOutlineBriefcase}
          iconClassName="bg-emerald-400/10 text-emerald-300"
        />
        <StatCard
          label="Contact Submissions"
          value={stats.contactSubmissions}
          helper="Incoming contact form leads"
          icon={HiOutlineEnvelope}
          iconClassName="bg-cyan-400/10 text-cyan-300"
        />
        <StatCard
          label="Total Entries"
          value={stats.totalEntries}
          helper="All CMS records combined"
          icon={HiOutlineSquares2X2}
          iconClassName="bg-amber-400/10 text-amber-300"
        />
      </div>
    </div>
  );
}
