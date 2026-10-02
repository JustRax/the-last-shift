"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";

import { useGameStore } from "@/store/gameStore";
import type { ChoiceDefinition, GameStage, InvestigationId } from "@/types/game";
import { canInvestigate } from "@/engine/prologueEngine";
import { officeInvestigations, phoneChoices, wakeUpDialogue } from "@/data/scenarios/prologue";
import { ChoicePanel } from "./ChoicePanel";
import { EvidenceModal } from "./EvidenceModal";
import { InvestigationPanel } from "./InvestigationPanel";
import { StatsHud } from "./StatsHud";
import { TerminalOverlay } from "./TerminalOverlay";
import { MenuButton } from "@/components/MenuButton";

export function GameScene() {
  const router = useRouter();
  const reduced = useReducedMotion();

  const {
    stats,
    flags,
    currentChapter,
    currentScenarioId,
    setScenario,
    setChapter,
    markInvestigated,
    applyEffects,
    setFlag,
    hasSave,
  } = useGameStore();

  const [stage, setStage] = useState<GameStage>("wake-up");
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [modal, setModal] = useState<InvestigationId | null>(null);
  const [showTerminal, setShowTerminal] = useState(false);
  const [phoneReady, setPhoneReady] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const investigated = useGameStore((state) =>
    officeInvestigations
      .map((item) => item.id)
      .filter((id) => state.flags[`investigated:${id}`]),
  );

  const currentLine = wakeUpDialogue[dialogueIndex];

  const sceneLabel = useMemo(() => {
    if (stage === "chapter-end") return "CHECKPOINT";
    if (stage === "phone-choice") return "MAIN OFFICE // INCOMING CALL";
    return "MAIN OFFICE // 11:47 PM";
  }, [stage]);

  function beginOffice() {
    setStage("office");
    setScenario("chapter-00-wake-up");
  }

  function startInvestigation() {
    setChapter(1);
    setStage("investigation");
    setScenario("chapter-01-welcome-back");
  }

  function advanceDialogue() {
    if (dialogueIndex < wakeUpDialogue.length - 1) {
      setDialogueIndex((index) => index + 1);
      return;
    }
    startInvestigation();
  }

  function handleInvestigation(id: InvestigationId) {
    if (!canInvestigate("investigation", investigated, id)) return;

    markInvestigated(id);

    if (id === "computer") {
      setShowTerminal(true);
      setNotice("The terminal recognizes you.");
      return;
    }

    setModal(id);

    if (id === "phone") {
      setPhoneReady(true);
    }
  }

  function closeTerminal() {
    setShowTerminal(false);
    setNotice("The terminal displays: PLEASE BEGIN YOUR SHIFT.");
  }

  function choosePhone(choice: ChoiceDefinition) {
    applyEffects(choice.effects);
    Object.entries(choice.flags).forEach(([key, value]) => setFlag(key, value));
    useGameStore.getState().recordChoice(choice.id);

    setPhoneReady(false);
    setStage("chapter-end");
    setScenario("chapter-01-end");
    setNotice(
      choice.id === "answer-phone"
        ? "The line goes quiet. Someone whispers: “If they ask whether you remember, say no.”"
        : "The ringing stops. The silence lasts longer than it should.",
    );
  }

  function continueToChapterOne() {
    setStage("investigation");
    setScenario("chapter-01-welcome-back");
  }

  if (!hasSave) {
    return (
      <main className="min-h-[100svh] bg-[var(--ui-bg)] p-5 font-mono text-[var(--ui-text)]">
        <div className="mx-auto flex min-h-[90svh] max-w-xl items-center justify-center">
          <div className="w-full border border-[var(--ui-border)] bg-[var(--ui-panel)] p-6">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--ui-text-faint)]">
              NO ACTIVE SHIFT
            </p>
            <p className="mt-5 text-xs leading-6 text-[var(--ui-text-muted)]">
              Start a new game from the main menu before entering the night shift.
            </p>
            <div className="mt-6">
              <MenuButton onClick={() => router.push("/")}>Return to menu</MenuButton>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[var(--ui-bg)] text-[var(--ui-text)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.035),transparent_42%),linear-gradient(180deg,#151515,#070707)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:repeating-linear-gradient(to_bottom,transparent_0,transparent_2px,rgba(255,255,255,0.035)_3px,transparent_4px)]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.32em] text-[var(--ui-text-faint)]">
              THE LAST SHIFT // RECALL
            </p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--ui-text-subtle)]">
              {sceneLabel}
            </p>
          </div>
          <StatsHud stats={stats} />
        </header>

        <div className="flex flex-1 items-center justify-center py-8">
          <div className="w-full max-w-5xl">
            <AnimatePresence mode="wait">
              {stage === "wake-up" && (
                <motion.section
                  key="wake-up"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center text-center"
                >
                  <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--ui-text-faint)]">
                    11:47 PM
                  </p>
                  <h1 className="mt-8 font-mono text-2xl uppercase tracking-[0.12em] text-[var(--ui-text-muted)]">
                    The Wake Up
                  </h1>
                  <p className="mt-6 max-w-md font-mono text-xs leading-7 text-[var(--ui-text-subtle)]">
                    You wake inside a corporate office during a night shift.
                    You do not remember working here.
                  </p>
                  <div className="mt-10 w-full max-w-sm">
                    <MenuButton onClick={beginOffice}>Continue</MenuButton>
                  </div>
                </motion.section>
              )}

              {stage === "office" && (
                <motion.section
                  key="office"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid min-h-[60vh] gap-5 lg:grid-cols-[1fr_320px]"
                >
                  <div className="relative min-h-[440px] overflow-hidden border border-[var(--ui-border)] bg-[#161616]">
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_35%),linear-gradient(90deg,rgba(255,255,255,0.025),transparent_50%)]" />
                    <div className="absolute left-[8%] top-[14%] h-[18%] w-[84%] border border-[var(--ui-border)] bg-[#0f0f0f]" />
                    <div className="absolute left-[15%] top-[32%] h-[8%] w-[70%] bg-[#111111]" />
                    <button
                      type="button"
                      aria-label="Inspect the computer"
                      onClick={() => startInvestigation()}
                      className="absolute left-[34%] top-[24%] h-[23%] w-[30%] border border-transparent bg-transparent hover:border-[var(--ui-border-strong)] focus:outline-none focus-visible:border-[var(--ui-border-strong)]"
                    />
                    <div className="absolute bottom-[13%] left-[8%] h-[25%] w-[84%] border border-[var(--ui-border)] bg-[#121212]" />
                    <div className="absolute bottom-[18%] left-[20%] h-[13%] w-[18%] border border-[var(--ui-border)] bg-[#0a0a0a]" />
                    <div className="absolute bottom-[20%] right-[20%] h-[8%] w-[12%] border border-[var(--ui-border)] bg-[#0a0a0a]" />
                    <div className="absolute right-[8%] top-[12%] h-3 w-3 rounded-full bg-[var(--ui-text-faint)]" />
                    <div className="absolute bottom-4 left-4 font-mono text-[8px] uppercase tracking-[0.25em] text-[var(--ui-text-faint)]">
                      PLACEHOLDER OFFICE // ASSETS PENDING
                    </div>
                  </div>

                  <div className="flex flex-col justify-end border border-[var(--ui-border)] bg-[var(--ui-panel)] p-5">
                    <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-[var(--ui-text-faint)]">
                      FIRST CONTACT
                    </p>
                    <p className="mt-4 font-mono text-xs leading-7 text-[var(--ui-text-muted)]">
                      The office is quiet. The terminal is the only thing that
                      seems to be waiting for you.
                    </p>
                    <div className="mt-6">
                      <MenuButton onClick={() => startInvestigation()}>
                        Investigate the desk
                      </MenuButton>
                    </div>
                  </div>
                </motion.section>
              )}

              {stage === "dialogue" && (
                <motion.section
                  key="dialogue"
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-auto max-w-2xl"
                >
                  <div className="border border-[var(--ui-border)] bg-[var(--ui-panel)] p-6 sm:p-8">
                    <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-[var(--ui-text-faint)]">
                      {currentLine.speaker}
                    </p>
                    <p className="mt-5 font-mono text-sm leading-8 text-[var(--ui-text-muted)]">
                      {currentLine.text}
                    </p>
                    <div className="mt-8">
                      <MenuButton onClick={advanceDialogue}>
                        {dialogueIndex === wakeUpDialogue.length - 1 ? "Begin investigation" : "Continue"}
                      </MenuButton>
                    </div>
                  </div>
                </motion.section>
              )}

              {stage === "investigation" && (
                <motion.section
                  key="investigation"
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid gap-5 lg:grid-cols-[1fr_340px]"
                >
                  <div className="relative min-h-[440px] overflow-hidden border border-[var(--ui-border)] bg-[#151515]">
                    <div className="absolute inset-x-[8%] top-[12%] h-[24%] border border-[var(--ui-border)] bg-[#0c0c0c]" />
                    <button
                      type="button"
                      onClick={() => handleInvestigation("computer")}
                      className="absolute left-[31%] top-[18%] h-[25%] w-[38%] border border-transparent hover:border-[var(--ui-border-strong)] focus:outline-none focus-visible:border-[var(--ui-border-strong)]"
                      aria-label="Inspect computer"
                    />
                    <button
                      type="button"
                      onClick={() => handleInvestigation("id-card")}
                      className="absolute left-[16%] bottom-[31%] h-[9%] w-[16%] border border-transparent hover:border-[var(--ui-border-strong)] focus:outline-none focus-visible:border-[var(--ui-border-strong)]"
                      aria-label="Inspect ID card"
                    />
                    <button
                      type="button"
                      onClick={() => handleInvestigation("desk-files")}
                      className="absolute right-[18%] bottom-[27%] h-[14%] w-[20%] border border-transparent hover:border-[var(--ui-border-strong)] focus:outline-none focus-visible:border-[var(--ui-border-strong)]"
                      aria-label="Inspect desk files"
                    />
                    <button
                      type="button"
                      onClick={() => handleInvestigation("phone")}
                      className="absolute right-[11%] bottom-[18%] h-[15%] w-[15%] border border-transparent hover:border-[var(--ui-border-strong)] focus:outline-none focus-visible:border-[var(--ui-border-strong)]"
                      aria-label="Inspect phone"
                    />
                    <div className="absolute bottom-4 left-4 font-mono text-[8px] uppercase tracking-[0.25em] text-[var(--ui-text-faint)]">
                      MAIN OFFICE // PLACEHOLDER BACKGROUND
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="border border-[var(--ui-border)] bg-[var(--ui-panel)] p-5">
                      <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-[var(--ui-text-faint)]">
                        EMPLOYEE #427
                      </p>
                      <p className="mt-4 font-mono text-xs leading-7 text-[var(--ui-text-muted)]">
                        Something has already been arranged for your shift.
                        Decide what to look at first.
                      </p>
                    </div>
                    <InvestigationPanel
                      items={officeInvestigations}
                      investigated={investigated}
                      onInvestigate={handleInvestigation}
                    />
                    {notice && (
                      <div className="border-l border-[var(--ui-border-strong)] px-4 py-2 font-mono text-[10px] leading-5 text-[var(--ui-text-subtle)]">
                        {notice}
                      </div>
                    )}
                  </div>
                </motion.section>
              )}

              {stage === "phone-choice" && (
                <motion.section
                  key="phone-choice"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mx-auto max-w-xl"
                >
                  <ChoicePanel choices={phoneChoices} onChoose={choosePhone} />
                </motion.section>
              )}

              {stage === "chapter-end" && (
                <motion.section
                  key="chapter-end"
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-auto max-w-xl"
                >
                  <div className="border border-[var(--ui-border)] bg-[var(--ui-panel)] p-6 sm:p-8">
                    <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-[var(--ui-text-faint)]">
                      SHIFT CHECKPOINT REACHED
                    </p>
                    <h1 className="mt-5 font-mono text-xl uppercase tracking-[0.12em] text-[var(--ui-text)]">
                      12:00 AM
                    </h1>
                    <p className="mt-5 font-mono text-xs leading-7 text-[var(--ui-text-muted)]">
                      Employee #428: “Are you still there?”
                    </p>
                    {notice && (
                      <p className="mt-5 border-l border-[var(--ui-border-strong)] pl-4 font-mono text-[10px] leading-6 text-[var(--ui-text-subtle)]">
                        {notice}
                      </p>
                    )}
                    <div className="mt-8 grid gap-2 sm:grid-cols-2">
                      <MenuButton onClick={continueToChapterOne}>Continue</MenuButton>
                      <MenuButton onClick={() => router.push("/")}>Main menu</MenuButton>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        </div>

        <footer className="flex items-center justify-between border-t border-[var(--ui-border)] pt-3">
          <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[var(--ui-text-faint)]">
            SCENARIO: {currentScenarioId}
          </span>
          <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[var(--ui-text-faint)]">
            CHAPTER {currentChapter}
          </span>
        </footer>
      </div>

      <AnimatePresence>
        {showTerminal && <TerminalOverlay onClose={closeTerminal} />}

        {modal === "id-card" && (
          <EvidenceModal
            eyebrow="EMPLOYEE RECORD // PHYSICAL"
            title="Employee #427"
            onClose={() => setModal(null)}
          >
            <p>EMPLOYEE #427</p>
            <p>STATUS: ACTIVE</p>
            <p>LAST SHIFT: TODAY</p>
          </EvidenceModal>
        )}

        {modal === "desk-files" && (
          <EvidenceModal
            eyebrow="DOCUMENT // DESK"
            title="Previous Shift Note"
            onClose={() => setModal(null)}
          >
            <p>
              The top sheet contains a routine handover checklist. Most of the
              entries are ordinary.
            </p>
            <p className="mt-4">
              One line has been crossed out: “Confirm employee memory before
              morning.”
            </p>
          </EvidenceModal>
        )}

        {modal === "phone" && phoneReady && (
          <EvidenceModal
            eyebrow="DESK PHONE"
            title="The Phone"
            onClose={() => {
              setModal(null);
              setPhoneReady(false);
            }}
          >
            <p>The receiver is cold.</p>
            <p className="mt-4">
              Before you can put it down, the phone rings once.
            </p>
            <p className="mt-4">Then it rings again.</p>
            <div className="mt-6">
              <MenuButton
                onClick={() => {
                  setModal(null);
                  setPhoneReady(false);
                  setStage("phone-choice");
                }}
              >
                Answer the situation
              </MenuButton>
            </div>
          </EvidenceModal>
        )}
      </AnimatePresence>
    </main>
  );
}
