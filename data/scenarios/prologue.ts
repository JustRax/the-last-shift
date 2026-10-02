import type { ChoiceDefinition, DialogueLine, InvestigationItem } from "@/types/game";

export const wakeUpDialogue: DialogueLine[] = [
  {
    speaker: "SYSTEM",
    text: "11:47 PM. NIGHT SHIFT INITIALIZED.",
  },
  {
    speaker: "YOU",
    text: "Employee #427?",
  },
  {
    speaker: "YOU",
    text: "I don't remember having an employee number.",
  },
];

export const officeInvestigations: InvestigationItem[] = [
  {
    id: "computer",
    label: "COMPUTER",
    description: "The office terminal is already awake.",
  },
  {
    id: "id-card",
    label: "ID CARD",
    description: "A plastic employee card rests beside the keyboard.",
    availableAfter: "computer",
  },
  {
    id: "desk-files",
    label: "FILES",
    description: "A thin stack of paperwork sits beneath the desk lamp.",
    availableAfter: "computer",
  },
  {
    id: "phone",
    label: "PHONE",
    description: "The desk phone is silent for now.",
    availableAfter: "computer",
  },
];

export const phoneChoices: ChoiceDefinition[] = [
  {
    id: "answer-phone",
    label: "Answer",
    description: "Pick up the receiver.",
    effects: { knowledge: 5, danger: 5 },
    flags: { answeredPhone: true },
  },
  {
    id: "ignore-phone",
    label: "Ignore",
    description: "Let it keep ringing.",
    effects: {},
    flags: { phoneIgnored: true },
  },
];
