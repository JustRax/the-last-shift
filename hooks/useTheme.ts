"use client";

import { useEffect } from "react";

import { useGameStore } from "@/store/gameStore";

export function useTheme() {
  const theme = useGameStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = () => {
      const resolvedTheme =
        theme === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : theme;

      root.dataset.theme = resolvedTheme;
      root.style.colorScheme = resolvedTheme;
    };

    applyTheme();

    if (theme !== "system") {
      return;
    }

    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    mediaQuery.addEventListener("change", applyTheme);

    return () => {
      mediaQuery.removeEventListener("change", applyTheme);
    };
  }, [theme]);

  return theme;
}