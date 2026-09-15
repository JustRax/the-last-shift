"use client";

import { useGameStore } from "@/store/gameStore";
import type { Theme } from "@/store/gameStore";

const themes: Array<{
  value: Theme;
  label: string;
}> = [
  {
    value: "dark",
    label: "Dark",
  },
  {
    value: "light",
    label: "Light",
  },
  {
    value: "system",
    label: "System",
  },
];

export function ThemeToggle() {
  const theme = useGameStore((state) => state.theme);
  const setTheme = useGameStore((state) => state.setTheme);

  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
        Appearance
      </p>

      <p className="mt-2 font-mono text-[10px] leading-5 text-white/20">
        Choose how the interface should appear.
      </p>

      <div
        className="mt-5 grid grid-cols-3 gap-2"
        role="group"
        aria-label="Appearance"
      >
        {themes.map((option) => {
          const active = theme === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setTheme(option.value)}
              aria-pressed={active}
              className={[
                "min-h-12",
                "border",
                "px-3 py-3",
                "font-mono text-[10px] uppercase tracking-[0.2em]",
                "transition-all duration-200",
                "focus:outline-none",
                "focus-visible:ring-2 focus-visible:ring-white/50",
                active
                  ? "border-white/40 bg-white/[0.08] text-white"
                  : "border-white/10 bg-black/30 text-white/40 hover:border-white/25 hover:text-white/70",
              ].join(" ")}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-white/20">
        Current: {theme}
      </p>
    </div>
  );
}