"use client";

import { useGameStore } from "@/store/gameStore";
import type { Theme } from "@/store/gameStore";

const themes: Array<{
  value: Theme;
  label: string;
}> = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "system", label: "System" },
];

export function ThemeToggle() {
  const theme = useGameStore((state) => state.theme);
  const setTheme = useGameStore((state) => state.setTheme);

  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--ui-text-subtle)]">
        Appearance
      </p>

      <p className="mt-2 font-mono text-[10px] leading-5 text-[var(--ui-text-muted)]">
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
                "font-mono text-[10px]",
                "uppercase tracking-[0.2em]",
                "transition-all duration-200",
                "focus:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-[var(--ui-border-strong)]",

                active
                  ? [
                      "border-[var(--ui-border-strong)]",
                      "bg-[var(--ui-accent-soft)]",
                      "text-[var(--ui-text)]",
                    ].join(" ")
                  : [
                      "border-[var(--ui-border)]",
                      "bg-[var(--ui-panel)]",
                      "text-[var(--ui-text-muted)]",
                      "hover:border-[var(--ui-border-strong)]",
                      "hover:bg-[var(--ui-panel-hover)]",
                      "hover:text-[var(--ui-text)]",
                    ].join(" "),
              ].join(" ")}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--ui-text-subtle)]">
        Current: {theme}
      </p>
    </div>
  );
}