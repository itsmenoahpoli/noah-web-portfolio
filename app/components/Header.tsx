"use client";

import { useState, useEffect } from "react";
import { HiSun, HiMoon } from "react-icons/hi2";
import { motion } from "framer-motion";
import { initializeTheme, toggleTheme, type Theme } from "../utils/theme";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initialTheme = initializeTheme();
    setThemeState(initialTheme);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleTheme = () => {
    const newTheme = toggleTheme(theme);
    setThemeState(newTheme);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md"
          : "bg-transparent dark:bg-black/20"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="text-lg font-medium text-black dark:text-white hover:opacity-70 transition-opacity"
          >
            PNNWP.
          </a>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-8">
              <a
                href="#blogs"
                className="text-sm font-normal text-gray-500 dark:text-white hover:text-black dark:hover:text-gray-200 transition-colors"
              >
                Blogs
              </a>
              <a
                href="#offered-services"
                className="text-sm font-normal text-gray-500 dark:text-white hover:text-black dark:hover:text-gray-200 transition-colors"
              >
                Offered Services
              </a>
              <a
                href="#projects"
                className="text-sm font-normal text-gray-500 dark:text-white hover:text-black dark:hover:text-gray-200 transition-colors"
              >
                Projects
              </a>
              <a
                href="#resume"
                className="text-sm font-normal text-gray-500 dark:text-white hover:text-black dark:hover:text-gray-200 transition-colors"
              >
                Resume
              </a>
              <a
                href="#contact"
                className="text-sm font-normal text-gray-500 dark:text-white hover:text-black dark:hover:text-gray-200 transition-colors"
              >
                Contact
              </a>
            </div>

            <button
              onClick={handleToggleTheme}
              className="hidden p-2 text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              aria-label="Toggle theme"
            >
              {mounted &&
                (theme === "dark" ? (
                  <HiSun className="w-5 h-5 text-white" />
                ) : (
                  <HiMoon className="w-5 h-5 text-black dark:text-white" />
                ))}
            </button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
