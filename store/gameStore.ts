import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "dark" | "light" | "system";

export interface GameStats {
  sanity: number;
  knowledge: number;
  trust: number;
  danger: number;
}

export interface GameState {
  currentScenarioId: string;
  currentChapter: number;

  stats: GameStats;

  flags: Record<string, boolean>;
  clues: string[];
  choices: string[];
  triggeredEvents: string[];
  endings: string[];
  achievements: string[];

  playthroughCount: number;
  horrorLevel: number;

  hasSave: boolean;

  theme: Theme;

  startNewGame: () => void;
  setTheme: (theme: Theme) => void;
}

const initialStats: GameStats = {
  sanity: 100,
  knowledge: 0,
  trust: 0,
  danger: 0,
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      currentScenarioId: "chapter-00-wake-up",
      currentChapter: 0,

      stats: initialStats,

      flags: {},
      clues: [],
      choices: [],
      triggeredEvents: [],
      endings: [],
      achievements: [],

      playthroughCount: 0,
      horrorLevel: 0,

      hasSave: false,

      // SETTINGS
      theme: "dark",

      startNewGame: () =>
        set((state) => ({
          currentScenarioId: "chapter-00-wake-up",
          currentChapter: 0,

          stats: {
            ...initialStats,
          },

          flags: {},
          clues: [],
          choices: [],
          triggeredEvents: [],

          endings: state.endings,
          achievements: state.achievements,

          playthroughCount: state.playthroughCount + 1,
          horrorLevel: 0,

          hasSave: true,

          // Preserve settings when starting a new game
          theme: state.theme,
        })),

      setTheme: (theme) =>
        set({
          theme,
        }),
    }),
    {
      name: "the-last-shift-save",
    },
  ),
);