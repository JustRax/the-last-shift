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
  setScenario: (scenarioId: string) => void;
  setChapter: (chapter: number) => void;
  markInvestigated: (id: string) => void;
  setFlag: (key: string, value: boolean) => void;
  applyEffects: (effects: Partial<GameStats>) => void;
  addClue: (clueId: string) => void;
  recordChoice: (choiceId: string) => void;
}

const initialStats: GameStats = {
  sanity: 100,
  knowledge: 0,
  trust: 0,
  danger: 0,
};

const clampStat = (value: number) => Math.max(0, value);

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      currentScenarioId: "chapter-00-wake-up",
      currentChapter: 0,
      stats: { ...initialStats },
      flags: {},
      clues: [],
      choices: [],
      triggeredEvents: [],
      endings: [],
      achievements: [],
      playthroughCount: 0,
      horrorLevel: 0,
      hasSave: false,
      theme: "dark",

      startNewGame: () =>
        set((state) => ({
          currentScenarioId: "chapter-00-wake-up",
          currentChapter: 0,
          stats: { ...initialStats },
          flags: {},
          clues: [],
          choices: [],
          triggeredEvents: [],
          endings: state.endings,
          achievements: state.achievements,
          playthroughCount: state.playthroughCount + 1,
          horrorLevel: 0,
          hasSave: true,
          theme: state.theme,
        })),

      setTheme: (theme) => set({ theme }),

      setScenario: (scenarioId) =>
        set({
          currentScenarioId: scenarioId,
          hasSave: true,
        }),

      setChapter: (chapter) =>
        set({
          currentChapter: chapter,
          hasSave: true,
        }),

      markInvestigated: (id) =>
        set((state) => ({
          flags: {
            ...state.flags,
            [`investigated:${id}`]: true,
          },
          hasSave: true,
        })),

      setFlag: (key, value) =>
        set((state) => ({
          flags: {
            ...state.flags,
            [key]: value,
          },
          hasSave: true,
        })),

      applyEffects: (effects) =>
        set((state) => ({
          stats: {
            sanity: clampStat(state.stats.sanity + (effects.sanity ?? 0)),
            knowledge: clampStat(state.stats.knowledge + (effects.knowledge ?? 0)),
            trust: clampStat(state.stats.trust + (effects.trust ?? 0)),
            danger: clampStat(state.stats.danger + (effects.danger ?? 0)),
          },
          hasSave: true,
        })),

      addClue: (clueId) =>
        set((state) => ({
          clues: state.clues.includes(clueId)
            ? state.clues
            : [...state.clues, clueId],
          hasSave: true,
        })),

      recordChoice: (choiceId) =>
        set((state) => ({
          choices: state.choices.includes(choiceId)
            ? state.choices
            : [...state.choices, choiceId],
          hasSave: true,
        })),
    }),
    {
      name: "the-last-shift-save",
    },
  ),
);
