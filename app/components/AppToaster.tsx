"use client";

import { Toaster } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";

export function AppToaster() {
  const { theme, mounted } = useTheme();

  return (
    <Toaster
      theme={mounted ? theme : "light"}
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: "font-sans",
        },
      }}
    />
  );
}
