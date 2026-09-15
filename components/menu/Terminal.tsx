"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export function Terminal() {
  const shouldReduceMotion = useReducedMotion();

  const [message, setMessage] = useState(
    "WELCOME, EMPLOYEE #427.",
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMessage("WELCOME BACK, EMPLOYEE #427.");
    }, 3200);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 12,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        delay: 0.35,
        ease: "easeOut",
      }}
      className="terminal-shell relative mx-auto w-full max-w-xl"
    >
      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0.7,
              }
        }
        animate={{
          opacity: [0.7, 1, 0.8, 1],
        }}
        transition={{
          duration: 1.4,
          delay: 0.8,
          ease: "easeInOut",
        }}
        className="terminal-frame relative overflow-hidden"
      >
        <div className="terminal-screen">
          <div className="terminal-noise" />

          <div className="relative z-10 p-5 sm:p-7">
            {/* Terminal header */}
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-[0.3em] text-white/30">
                RECALL TERMINAL
              </span>

              {shouldReduceMotion ? (
                <span className="terminal-light h-2 w-2 rounded-full bg-white/50" />
              ) : (
                <motion.span
                  animate={{
                    opacity: [0.3, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="terminal-light h-2 w-2 rounded-full bg-white/50"
                />
              )}
            </div>

            {/* System status */}
            <div className="space-y-3 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                SECURITY NETWORK // ACTIVE
              </motion.p>

              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                EMPLOYEE DATABASE // CONNECTED
              </motion.p>

              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                SHIFT STATUS // WAITING
              </motion.p>
            </div>

            <div className="my-8 h-px bg-white/10" />

            {/* Terminal message */}
            <div className="min-h-[80px]">
              <motion.p
                key={message}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: -4,
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                }}
                className="
                  terminal-text
                  font-mono
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-white/80
                  sm:text-base
                "
              >
                {message}
              </motion.p>
            </div>

            {/* Terminal footer */}
            <div className="mt-8 flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.25em] text-white/30">
                ID: 427
              </span>

              <span className="font-mono text-[10px] tracking-[0.25em] text-white/30">
                ACCESS: ACTIVE
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}