export type InvestigationId = "computer" | "id-card" | "desk-files" | "phone";

export type GameStage =
  | "wake-up"
  | "office"
  | "computer"
  | "dialogue"
  | "investigation"
  | "phone-choice"
  | "chapter-end";

export interface DialogueLine {
  speaker: string;
  text: string;
}

export interface InvestigationItem {
  id: InvestigationId;
  label: string;
  description: string;
  availableAfter?: string;
}

export interface ChoiceDefinition {
  id: "answer-phone" | "ignore-phone";
  label: string;
  description: string;
  effects: {
    knowledge?: number;
    danger?: number;
    trust?: number;
    sanity?: number;
  };
  flags: Record<string, boolean>;
}

export interface PrologueProgress {
  stage: GameStage;
  investigated: InvestigationId[];
  dialogueIndex: number;
  phoneChoiceAvailable: boolean;
}
