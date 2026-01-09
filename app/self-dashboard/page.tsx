"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  HiOutlineRocketLaunch, 
  HiOutlineBookOpen, 
  HiOutlineBriefcase, 
  HiOutlineArrowLeftOnRectangle,
  HiOutlineSquares2X2,
  HiChevronRight
} from "react-icons/hi2";
import ProjectsManager from "./ProjectsManager";
import BlogsManager from "./BlogsManager";
import ExperiencesManager from "./ExperiencesManager";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"projects" | "blogs" | "experiences">("projects");
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/self-dashboard/login");
  };

  const navItems = [
    { id: "projects", label: "Projects", icon: HiOutlineRocketLaunch },
    { id: "blogs", label: "Blogs", icon: HiOutlineBookOpen },
    { id: "experiences", label: "Experiences", icon: HiOutlineBriefcase },
  ] as const;

  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 dark:border-gray-800 flex flex-col fixed inset-y-0 bg-white/50 dark:bg-black/20 backdrop-blur-xl">
        <div className="p-8 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
              <HiOutlineSquares2X2 className="text-white dark:text-black w-5 h-5" />
            </div>
            <span className="font-medium tracking-tight">PNNWP CMS</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-black dark:bg-white text-white dark:text-black shadow-lg shadow-black/5 dark:shadow-white/5"
                    : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-300"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "opacity-100" : "opacity-60"}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-4">
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
          >
            Back to Site
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
          >
            <HiOutlineArrowLeftOnRectangle className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen bg-gray-50/30 dark:bg-black/40">
        <div className="max-w-5xl mx-auto px-8 py-12">
          <header className="mb-12">
            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
              <span className="cursor-default">Dashboard</span>
              <HiChevronRight className="w-3 h-3 text-gray-300 dark:text-gray-700" />
              <span className="text-black dark:text-white">{activeTab}</span>
            </nav>
            <h1 className="text-3xl font-medium tracking-tight capitalize">
              {activeTab} Management
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Add, edit or remove your portfolio {activeTab}
            </p>
          </header>

          <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            {activeTab === "projects" && <ProjectsManager />}
            {activeTab === "blogs" && <BlogsManager />}
            {activeTab === "experiences" && <ExperiencesManager />}
          </div>
        </div>
      </main>
    </div>
  );
}
