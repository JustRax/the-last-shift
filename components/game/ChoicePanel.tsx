"use client";

import type { ChoiceDefinition } from "@/types/game";
import { MenuButton } from "@/components/MenuButton";

interface ChoicePanelProps {
  choices: ChoiceDefinition[];
  onChoose: (choice: ChoiceDefinition) => void;
}

export function ChoicePanel({ choices, onChoose }: ChoicePanelProps) {
  return (
    <div className="border border-[var(--ui-border)] bg-[var(--ui-panel)] p-4 sm:p-5">
      <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-[var(--ui-text-faint)]">
        INCOMING CALL // 11:58 PM
      </p>
      <h2 className="mt-4 font-mono text-base uppercase tracking-[0.12em] text-[var(--ui-text)]">
        The phone is ringing.
      </h2>
      <div className="mt-5 grid gap-2">
        {choices.map((choice) => (
          <MenuButton key={choice.id} onClick={() => onChoose(choice)}>
            <span className="block">{choice.label}</span>
            <span className="mt-1 block text-[9px] normal-case tracking-normal text-[var(--ui-text-faint)]">
              {choice.description}
            </span>
          </MenuButton>
        ))}
      </div>
    </div>
  );
}
