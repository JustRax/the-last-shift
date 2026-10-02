"use client";

import { motion, useReducedMotion } from "motion/react";
import { MenuButton } from "@/components/MenuButton";

interface EvidenceModalProps {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  onClose: () => void;
}

export function EvidenceModal({
  title,
  eyebrow,
  children,
  onClose,
}: EvidenceModalProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        className="w-full max-w-xl border border-[var(--ui-border)] bg-[var(--ui-surface)]"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="border-b border-[var(--ui-border)] p-5">
          <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-[var(--ui-text-faint)]">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-mono text-lg uppercase tracking-[0.12em] text-[var(--ui-text)]">
            {title}
          </h2>
        </div>
        <div className="p-5 font-mono text-xs leading-7 text-[var(--ui-text-muted)]">
          {children}
        </div>
        <div className="border-t border-[var(--ui-border)] p-4">
          <MenuButton onClick={onClose}>Close</MenuButton>
        </div>
      </motion.div>
    </motion.div>
  );
}
