"use client";

import { motion, useReducedMotion } from "motion/react";
import { MenuButton } from "@/components/MenuButton";

interface TerminalOverlayProps {
  onClose: () => void;
}

export function TerminalOverlay({ onClose }: TerminalOverlayProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="terminal-title"
    >
      <motion.div
        className="w-full max-w-2xl border border-[var(--ui-border-strong)] bg-[var(--ui-panel)] shadow-2xl"
        initial={reduced ? false : { opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
      >
        <div className="border-b border-[var(--ui-border)] px-4 py-3">
          <div className="flex items-center justify-between">
            <p id="terminal-title" className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--ui-text-subtle)]">
              RECALL TERMINAL // MAIN OFFICE
            </p>
            <span className="h-2 w-2 rounded-full bg-[var(--ui-text-muted)]" aria-hidden="true" />
          </div>
        </div>

        <div className="min-h-[360px] p-5 font-mono text-xs leading-7 text-[var(--ui-text-muted)] sm:p-8">
          <p>11:47 PM</p>
          <p className="mt-6 text-[var(--ui-text)]">WELCOME BACK,</p>
          <p className="text-[var(--ui-text)]">EMPLOYEE #427.</p>
          <p className="mt-6">PLEASE BEGIN YOUR SHIFT.</p>
          <p className="mt-2">SHIFT END: 06:00 AM</p>
          <p className="mt-8 border-t border-[var(--ui-border)] pt-6 text-[var(--ui-text-subtle)]">
            LAST SHIFT: TODAY
          </p>
        </div>

        <div className="border-t border-[var(--ui-border)] p-4">
          <MenuButton onClick={onClose}>Acknowledge</MenuButton>
        </div>
      </motion.div>
    </motion.div>
  );
}
