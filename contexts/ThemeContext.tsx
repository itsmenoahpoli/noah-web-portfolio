"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { getInitialTheme, setTheme, type Theme } from "@/utils/theme";

interface ThemeContextType {
  theme: Theme;
  toggle: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = getInitialTheme();
  const mounted = true;

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  const toggle = () => {
    setTheme("dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

