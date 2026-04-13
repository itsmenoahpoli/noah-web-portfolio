"use client";

import { Suspense, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  HiOutlineRocketLaunch,
  HiOutlineBookOpen,
  HiOutlineBriefcase,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineSquares2X2,
  HiChevronRight,
  HiOutlineChartBar,
  HiBars3,
  HiXMark,
} from "react-icons/hi2";
import ProjectsManager from "./ProjectsManager";
import BlogsManager from "./BlogsManager";
import ExperiencesManager from "./ExperiencesManager";
import MetricsManager from "./MetricsManager";
import DashboardLoading from "./DashboardLoading";

type DashboardTab = "metrics" | "projects" | "blogs" | "experiences";

const navItems = [
  { id: "metrics", label: "Metrics", icon: HiOutlineChartBar },
  { id: "projects", label: "Projects", icon: HiOutlineRocketLaunch },
  { id: "blogs", label: "Blogs", icon: HiOutlineBookOpen },
  { id: "experiences", label: "Experiences", icon: HiOutlineBriefcase },
] as const;

interface SidebarContentProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  onBackToSite: () => void;
  onLogout: () => void;
}

function SidebarContent({
  activeTab,
  onSelectTab,
  onBackToSite,
  onLogout,
}: SidebarContentProps) {
  return (
    <>
      <div className="border-b border-gray-200 p-6 dark:border-gray-800 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black dark:bg-white">
            <HiOutlineSquares2X2 className="h-5 w-5 text-white dark:text-black" />
          </div>
          <span className="font-medium tracking-tight">PNNWP CMS</span>
        </div>
      </div>

      <nav className="mt-4 flex-1 space-y-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? "bg-black text-white shadow-lg shadow-black/5 dark:bg-white dark:text-black dark:shadow-white/5"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/5 dark:hover:text-gray-300"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "opacity-100" : "opacity-60"}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="space-y-4 border-t border-gray-200 p-4 dark:border-gray-800">
        <button
          onClick={onBackToSite}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 dark:hover:bg-white/5"
        >
          Back to Site
        </button>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-all hover:bg-red-50 dark:hover:bg-red-950/20"
        >
          <HiOutlineArrowLeftOnRectangle className="h-5 w-5" />
          Logout
        </button>
      </div>
    </>
  );
}

function DashboardPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeTab = useMemo<DashboardTab>(() => {
    const tab = searchParams.get("tab");
    return navItems.some((item) => item.id === tab)
      ? (tab as DashboardTab)
      : "metrics";
  }, [searchParams]);

  const setActiveTab = (tab: DashboardTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setIsSidebarOpen(false);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/self-dashboard/login");
  };

  const heading = activeTab === "metrics" ? "Dashboard Metrics" : `${activeTab} Management`;
  const subheading =
    activeTab === "metrics"
      ? "Monitor your current CMS totals and content footprint."
      : `Add, edit or remove your portfolio ${activeTab}`;

  return (
    <div
      className="min-h-screen bg-transparent font-sans text-[var(--foreground)] lg:[zoom:90%]"
    >
      <div className="flex min-h-screen">
        <div className="fixed inset-x-0 top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-xl dark:border-gray-800 dark:bg-black/40 md:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black dark:bg-white">
                <HiOutlineSquares2X2 className="h-5 w-5 text-white dark:text-black" />
              </div>
              <div>
                <p className="text-sm font-medium">PNNWP CMS</p>
                <p className="text-xs capitalize text-gray-500">{activeTab}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/70 text-black transition-colors hover:bg-white dark:border-gray-800 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              aria-label="Open sidebar"
            >
              <HiBars3 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close sidebar overlay"
            />
            <aside className="absolute inset-y-0 left-0 flex w-[85vw] max-w-xs flex-col border-r border-gray-200 bg-white/95 shadow-2xl dark:border-gray-800 dark:bg-[#0b0b0f]/95">
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-800">
                <span className="text-sm font-medium">Navigation</span>
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/70 text-black transition-colors hover:bg-white dark:border-gray-800 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  aria-label="Close sidebar"
                >
                  <HiXMark className="h-5 w-5" />
                </button>
              </div>
              <SidebarContent
                activeTab={activeTab}
                onSelectTab={setActiveTab}
                onBackToSite={() => router.push("/")}
                onLogout={handleLogout}
              />
            </aside>
          </div>
        )}

        <aside className="fixed inset-y-0 hidden w-64 flex-col border-r border-gray-200 bg-white/50 backdrop-blur-xl dark:border-gray-800 dark:bg-black/20 md:flex">
          <SidebarContent
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            onBackToSite={() => router.push("/")}
            onLogout={handleLogout}
          />
        </aside>

        <main className="min-h-screen flex-1 bg-gray-50/30 pt-20 dark:bg-black/40 md:ml-64 md:pt-0">
          <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
            <header className="mb-8 lg:mb-12">
              <nav className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <span className="cursor-default">Dashboard</span>
                <HiChevronRight className="h-3 w-3 text-gray-300 dark:text-gray-700" />
                <span className="text-black dark:text-white">{activeTab}</span>
              </nav>
              <h1 className="text-2xl font-medium tracking-tight capitalize sm:text-3xl">
                {heading}
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                {subheading}
              </p>
            </header>

            <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-white/5 sm:p-6 lg:p-8">
              {activeTab === "metrics" && <MetricsManager />}
              {activeTab === "projects" && <ProjectsManager />}
              {activeTab === "blogs" && <BlogsManager />}
              {activeTab === "experiences" && <ExperiencesManager />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardPageContent />
    </Suspense>
  );
}
