"use client";

import type { GameStats } from "@/store/gameStore";

interface StatsHudProps {
  stats: GameStats;
}

export function StatsHud({ stats }: StatsHudProps) {
  const values = [
    ["SANITY", stats.sanity],
    ["KNOWLEDGE", stats.knowledge],
    ["TRUST", stats.trust],
    ["DANGER", stats.danger],
  ] as const;

  return (
    <aside
      aria-label="Player statistics"
      className="grid grid-cols-2 gap-px border border-[var(--ui-border)] bg-[var(--ui-border)] sm:grid-cols-4"
    >
      {values.map(([label, value]) => (
        <div key={label} className="bg-[var(--ui-panel)] px-3 py-2">
          <p className="font-mono text-[8px] tracking-[0.22em] text-[var(--ui-text-faint)]">
            {label}
          </p>
          <p className="mt-1 font-mono text-sm tabular-nums text-[var(--ui-text-muted)]">
            {value}
          </p>
        </div>
      ))}
    </aside>
  );
}
