"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

import { useGameStore } from "@/store/gameStore";
import { MenuButton } from "../MenuButton";
import { Terminal } from "./Terminal";

const mechanics = [
  {
    number: "01",
    title: "Sanity",
    description:
      "Your connection to reality. What you experience may change as your sanity falls.",
  },
  {
    number: "02",
    title: "Knowledge",
    description:
      "What you discover matters. Information can reveal hidden choices and the truth.",
  },
  {
    number: "03",
    title: "Trust",
    description:
      "Your relationships affect what people tell you, what they hide, and what happens next.",
  },
  {
    number: "04",
    title: "Danger",
    description:
      "Some decisions bring immediate consequences. Higher danger can trigger urgent events.",
  },
];

const horrorLevels = [
  {
    level: "00",
    title: "Normal",
    description: "Clean scenes. Calm atmosphere.",
  },
  {
    level: "01",
    title: "Suspicious",
    description: "Small changes. Strange sounds. Incorrect details.",
  },
  {
    level: "02",
    title: "Distorted",
    description: "Glitches, strange audio, and unreliable environments.",
  },
  {
    level: "03",
    title: "Nightmare",
    description: "Entities appear. Reality begins to break.",
  },
  {
    level: "04",
    title: "Reality Break",
    description: "The interface, scenes, and story can become unreliable.",
  },
];

export function MainMenu() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const hasSave = useGameStore((state) => state.hasSave);
  const startNewGame = useGameStore((state) => state.startNewGame);

  const [showNewGameConfirm, setShowNewGameConfirm] = useState(false);
  const [time, setTime] = useState("11:47 PM");

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTime((current) =>
        current === "11:47 PM" ? "11:48 PM" : "11:47 PM",
      );
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  function handleNewGame() {
    if (hasSave) {
      setShowNewGameConfirm(true);
      return;
    }

    startNewGame();
    router.push("/game");
  }

  function confirmNewGame() {
    startNewGame();
    setShowNewGameConfirm(false);
    router.push("/game");
  }

  const revealTransition = {
    duration: 0.7,
    ease: "easeOut" as const,
  };

  return (
    <main className="landing-page">
      {/* Shared atmospheric layers */}
      <div className="office-background" />
      <div className="menu-vignette" />
      <div className="crt-overlay pointer-events-none" />
      <div className="scanlines pointer-events-none" />

      {/* =========================================
          MAIN MENU
          ========================================= */}
      <section id="main-menu" className="landing-section landing-menu">
        <div className="relative z-10 flex min-h-[100svh] flex-col px-5 py-8 sm:px-8 sm:py-10">
          <motion.header
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: -10,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={revealTransition}
            className="mx-auto flex w-full max-w-6xl items-center justify-between"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/30">
              RECALL // NIGHT OPERATIONS
            </p>

            <div className="font-mono text-[10px] tracking-[0.25em] text-white/30">
              {time}
            </div>
          </motion.header>

          <div className="flex flex-1 items-center justify-center py-12">
            <div className="w-full max-w-2xl">
              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 15,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  ...revealTransition,
                  delay: 0.15,
                }}
                className="mb-10 text-center"
              >
                <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.45em] text-white/30">
                  CORPORATE NIGHT SHIFT
                </p>

                <h1 className="menu-title font-mono text-4xl font-bold uppercase tracking-[0.15em] text-white sm:text-6xl md:text-7xl">
                  THE LAST SHIFT
                </h1>

                <div className="mx-auto mt-5 h-px w-24 bg-white/20" />
              </motion.div>

              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 20,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  ...revealTransition,
                  delay: 0.3,
                }}
              >
                <Terminal />
              </motion.div>

              <motion.nav
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 15,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  ...revealTransition,
                  delay: 0.5,
                }}
                className="mx-auto mt-8 flex w-full max-w-xl flex-col gap-2"
                aria-label="Main menu"
              >
                <MenuButton onClick={handleNewGame}>New</MenuButton>

                {hasSave && (
                  <MenuButton onClick={() => router.push("/game")}>
                    Continue
                  </MenuButton>
                )}

                <MenuButton onClick={() => router.push("/settings")}>
                  Settings
                </MenuButton>
              </motion.nav>

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.8,
                }}
                className="mt-8 text-center"
              >
                <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/20">
                  SURVIVE UNTIL 06:00 AM
                </p>
              </motion.div>
            </div>
          </div>

          <motion.footer
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 1,
            }}
            className="mx-auto flex w-full max-w-6xl items-end justify-between"
          >
            <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/20">
              BUILD 0.1.0
            </span>

            <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/20">
              EMPLOYEE #427
            </span>
          </motion.footer>
        </div>
      </section>

      {/* =========================================
          MECHANICS
          ========================================= */}
      <section id="mechanics" className="landing-section landing-content">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={revealTransition}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/30">
              SYSTEM // PLAYER MECHANICS
            </p>

            <h2 className="mt-4 font-mono text-3xl uppercase tracking-[0.12em] text-white sm:text-5xl">
              Mechanics
            </h2>

            <div className="mt-5 h-px w-16 bg-white/20" />

            <p className="mt-6 max-w-2xl font-mono text-xs leading-7 text-white/40 sm:text-sm">
              Your decisions shape the night. Investigate, discover clues,
              make choices, and live with their consequences.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-3 sm:grid-cols-2">
            {mechanics.map((mechanic, index) => (
              <motion.article
                key={mechanic.title}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 20,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="border border-white/10 bg-black/30 p-6 sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-white/20">
                    {mechanic.number}
                  </span>

                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
                    PLAYER STATE
                  </span>
                </div>

                <h3 className="mt-8 font-mono text-lg uppercase tracking-[0.2em] text-white/80">
                  {mechanic.title}
                </h3>

                <p className="mt-4 font-mono text-xs leading-6 text-white/35">
                  {mechanic.description}
                </p>
              </motion.article>
            ))}
          </div>

          <div className="mt-20">
            <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/30">
              HORROR SYSTEM
            </p>

            <h3 className="mt-4 font-mono text-xl uppercase tracking-[0.15em] text-white/80 sm:text-2xl">
              The Night Gets Worse
            </h3>

            <div className="mt-8 space-y-2">
              {horrorLevels.map((level, index) => (
                <motion.div
                  key={level.level}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: -15,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                    ease: "easeOut",
                  }}
                  className="grid grid-cols-[42px_1fr] gap-4 border border-white/10 bg-black/20 p-4 sm:grid-cols-[60px_180px_1fr] sm:items-center"
                >
                  <span className="font-mono text-[9px] tracking-[0.2em] text-white/20">
                    {level.level}
                  </span>

                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/70">
                    {level.title}
                  </span>

                  <span className="col-start-2 font-mono text-[10px] leading-5 text-white/30 sm:col-start-auto">
                    {level.description}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          BACKSTORY
          ========================================= */}
      <section id="backstory" className="landing-section landing-content">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={revealTransition}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/30">
              FILE // 427
            </p>

            <h2 className="mt-4 font-mono text-3xl uppercase tracking-[0.12em] text-white sm:text-5xl">
              Backstory
            </h2>

            <div className="mt-5 h-px w-16 bg-white/20" />
          </motion.div>

          <div className="mt-14 grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
            <motion.article
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={revealTransition}
              className="border border-white/10 bg-black/30 p-6 sm:p-10"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20">
                11:47 PM
              </p>

              <h3 className="mt-6 font-mono text-xl uppercase tracking-[0.15em] text-white/80 sm:text-2xl">
                Welcome Back, Employee #427.
              </h3>

              <div className="mt-7 space-y-5 font-mono text-xs leading-7 text-white/40 sm:text-sm">
                <p>
                  You wake inside a corporate office during a night shift.
                  You do not remember working here.
                </p>

                <p>
                  The terminal disagrees.
                </p>

                <p className="border-l border-white/20 pl-5 text-white/60">
                  WELCOME BACK, EMPLOYEE #427.
                </p>

                <p>
                  You are told to survive until 6:00 AM. As the night
                  continues, previous shifts, strange calls, photographs,
                  employees, and impossible memories begin to surface.
                </p>

                <p>
                  The building seems to remember you even when you cannot
                  remember it.
                </p>
              </div>
            </motion.article>

            <div className="grid gap-4">
              <motion.article
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  ...revealTransition,
                  delay: 0.1,
                }}
                className="border border-white/10 bg-black/20 p-6"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20">
                  PROJECT
                </p>

                <h3 className="mt-4 font-mono text-lg uppercase tracking-[0.15em] text-white/70">
                  RECALL
                </h3>

                <p className="mt-4 font-mono text-xs leading-6 text-white/35">
                  A memory-reconstruction experiment attempting to recreate a
                  person&apos;s consciousness from recorded behavior and
                  memories.
                </p>
              </motion.article>

              <motion.article
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  ...revealTransition,
                  delay: 0.16,
                }}
                className="border border-white/10 bg-black/20 p-6"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20">
                  UNKNOWN
                </p>

                <h3 className="mt-4 font-mono text-lg uppercase tracking-[0.15em] text-white/70">
                  The Observer
                </h3>

                <p className="mt-4 font-mono text-xs leading-6 text-white/35">
                  A consciousness assembled from fragments of previous
                  reconstructions. It appears through cameras, reflections,
                  monitors, glitches, and distorted silhouettes.
                </p>
              </motion.article>

              <motion.article
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  ...revealTransition,
                  delay: 0.22,
                }}
                className="border border-white/10 bg-black/20 p-6"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20">
                  EMPLOYEE
                </p>

                <h3 className="mt-4 font-mono text-lg uppercase tracking-[0.15em] text-white/70">
                  #428
                </h3>

                <p className="mt-4 font-mono text-xs leading-6 text-white/35">
                  Another reconstruction containing fragments of #427. Ally,
                  betrayer, victim, guide, or something else.
                </p>
              </motion.article>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SUGGESTION
          ========================================= */}
      <section id="suggestion" className="landing-section landing-content">
        <div className="relative z-10 mx-auto w-full max-w-3xl px-5 py-24 sm:px-8 sm:py-32">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={revealTransition}
            className="border border-white/10 bg-black/30 p-6 sm:p-10"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/30">
              COMMUNICATION // FEEDBACK
            </p>

            <h2 className="mt-4 font-mono text-3xl uppercase tracking-[0.12em] text-white sm:text-5xl">
              Suggestion
            </h2>

            <div className="mt-5 h-px w-16 bg-white/20" />

            <p className="mt-7 font-mono text-xs leading-7 text-white/40 sm:text-sm">
              Have a suggestion, idea, bug report, or something you want to
              see in The Last Shift?
            </p>

            <p className="mt-4 font-mono text-xs leading-7 text-white/30">
              Send it through the project Gmail.
            </p>

            {/*
              Replace YOUR_GMAIL_HERE with the actual project Gmail address.
            */}
            <a
              href="mailto:YOUR_GMAIL_HERE"
              className="
                mt-8
                flex
                min-h-12
                items-center
                justify-center
                border
                border-white/10
                bg-black/40
                px-6
                py-4
                font-mono
                text-xs
                uppercase
                tracking-[0.25em]
                text-white/60
                transition-all
                duration-200
                hover:border-white/30
                hover:bg-white/[0.06]
                hover:text-white
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-white/50
              "
            >
              &gt; Send a Suggestion
            </a>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          FOOTER
          ========================================= */}
      <section id="footer" className="landing-footer">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
          <div className="h-px w-full bg-white/10" />

          <div className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/30">
                THE LAST SHIFT
              </p>

              <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.25em] text-white/15">
                RECALL // NIGHT OPERATIONS
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/20">
                BUILD 0.1.0
              </p>

              <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.25em] text-white/20">
                EMPLOYEE #427
              </p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6">
            <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/15">
              SURVIVE UNTIL 06:00 AM
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          NEW GAME CONFIRMATION
          ========================================= */}
      {showNewGameConfirm && (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm"
        >
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 10,
                    scale: 0.98,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="w-full max-w-md border border-white/10 bg-black/90 p-6 shadow-2xl"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
              WARNING // EXISTING SHIFT
            </p>

            <h2 className="mt-5 font-mono text-lg uppercase tracking-[0.15em] text-white">
              Start a new shift?
            </h2>

            <p className="mt-4 font-mono text-xs leading-6 text-white/40">
              Your current shift will be replaced. Previously discovered
              endings and achievements will remain available.
            </p>

            <div className="mt-7 flex gap-2">
              <MenuButton
                className="flex-1"
                onClick={() => setShowNewGameConfirm(false)}
              >
                Cancel
              </MenuButton>

              <MenuButton className="flex-1" onClick={confirmNewGame}>
                Start
              </MenuButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}