"use client";

import { useState, useEffect } from "react";
import { HiSun, HiMoon } from "react-icons/hi2";
import Hamburger from "hamburger-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "../../contexts/ThemeContext";

export default function Header() {
  const pathname = usePathname();
  const { theme, toggle: handleToggleTheme, mounted } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "#blogs", label: "Blogs", route: "/blogs" },
    {
      href: "#offered-services",
      label: "Offered Services",
      route: "/offered-services",
    },
    { href: "#projects", label: "Projects", route: "/projects" },
    { href: "#resume", label: "Resume", route: "/resume" },
    { href: "#contact", label: "Contact", route: "/contact" },
  ];

  const isActive = (link: { href: string; route: string }) => {
    return pathname === link.route;
  };

  return (
    <>
      <header
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
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => {
                  const active = isActive(link);
                  const className = `text-sm font-normal transition-colors ${
                    active
                      ? "text-black dark:text-white font-medium underline decoration-slate-900 dark:decoration-white underline-offset-4"
                      : "text-gray-500 dark:text-white hover:text-black dark:hover:text-gray-200"
                  }`;

                  return (
                    <Link
                      key={link.href}
                      href={link.route}
                      className={className}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <button
                onClick={handleToggleTheme}
                className="p-2 text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                aria-label="Toggle theme"
              >
                {mounted &&
                  (theme === "dark" ? (
                    <HiSun className="w-5 h-5" />
                  ) : (
                    <HiMoon className="w-5 h-5" />
                  ))}
              </button>

              <div className="md:hidden">
                <Hamburger
                  toggled={isMenuOpen}
                  toggle={setIsMenuOpen}
                  size={24}
                  color={theme === "dark" ? "#ffffff" : "#000000"}
                />
              </div>
            </div>
          </div>
        </nav>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-black z-40 md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => {
              const active = isActive(link);
              const className = `text-2xl font-medium transition-opacity ${
                active
                  ? "text-black dark:text-white opacity-100 underline decoration-slate-900 dark:decoration-white underline-offset-4"
                  : "text-black dark:text-white hover:opacity-70"
              }`;

              return (
                <Link
                  key={link.href}
                  href={link.route}
                  onClick={handleNavClick}
                  className={className}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={handleToggleTheme}
              className="p-3 text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              aria-label="Toggle theme"
            >
              {mounted &&
                (theme === "dark" ? (
                  <HiSun className="w-6 h-6" />
                ) : (
                  <HiMoon className="w-6 h-6" />
                ))}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
