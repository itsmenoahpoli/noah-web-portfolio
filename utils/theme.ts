export type Theme = "light" | "dark";

export function getInitialTheme(): Theme {
  return "dark";
}

export function setTheme(theme: Theme): void {
  if (typeof window === "undefined") return;

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  localStorage.setItem("theme", theme);
}

export function toggleTheme(currentTheme: Theme): Theme {
  const newTheme: Theme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
  return newTheme;
}

export function initializeTheme(): Theme {
  const theme = getInitialTheme();
  setTheme(theme);
  return theme;
}

