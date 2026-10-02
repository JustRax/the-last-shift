"use client";

import type { InvestigationId, InvestigationItem } from "@/types/game";
import { motion } from "motion/react";

interface InvestigationPanelProps {
  items: InvestigationItem[];
  investigated: InvestigationId[];
  onInvestigate: (id: InvestigationId) => void;
  disabled?: boolean;
}

export function InvestigationPanel({
  items,
  investigated,
  onInvestigate,
  disabled = false,
}: InvestigationPanelProps) {
  return (
    <section aria-labelledby="investigation-title">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-[var(--ui-text-faint)]">
            INVESTIGATION
          </p>
          <h2 id="investigation-title" className="mt-2 font-mono text-base uppercase tracking-[0.12em] text-[var(--ui-text-muted)]">
            What do you inspect?
          </h2>
        </div>
        <span className="font-mono text-[8px] text-[var(--ui-text-faint)]">
          {investigated.length}/{items.length}
        </span>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => {
          const done = investigated.includes(item.id);
          const locked = item.id !== "computer" && !investigated.includes("computer");

          return (
            <motion.button
              key={item.id}
              type="button"
              disabled={disabled || locked}
              onClick={() => onInvestigate(item.id)}
              whileTap={disabled || done || locked ? undefined : { scale: 0.99 }}
              className={[
                "border p-4 text-left transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-border-strong)]",
                done
                  ? "border-[var(--ui-border-strong)] bg-[var(--ui-surface)]"
                  : locked
                    ? "border-[var(--ui-border)] bg-[var(--ui-surface)] opacity-35"
                    : "border-[var(--ui-border-strong)] bg-[var(--ui-panel)] hover:bg-[var(--ui-panel-hover)]",
              ].join(" ")}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--ui-text-muted)]">
                {item.label}
              </p>
              <p className="mt-2 font-mono text-[10px] leading-5 text-[var(--ui-text-subtle)]">
                {locked ? "LOCKED." : done ? "VIEW AGAIN." : item.description}
              </p>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
