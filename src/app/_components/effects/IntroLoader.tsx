"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * The site opens with a katana cut — on every full page load.
 *
 *  1. Black. The kanji 鋼 breathes in from blur.
 *  2. A gold edge slashes horizontally across the screen.
 *  3. The screen splits along the cut — both halves slide apart
 *     revealing the world behind. You enter through the wound.
 *
 * Client-side route changes do NOT replay it (the component mounts once
 * in the root layout). A click anywhere skips ahead. Reduced-motion skips
 * it entirely.
 */

export function IntroLoader() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "kanji" | "slash" | "open" | "done">(
    "idle",
  );

  useEffect(() => {
    if (reduced) {
      setPhase("done");
      return;
    }

    setPhase("kanji");
    const t1 = setTimeout(() => setPhase("slash"), 1400);
    const t2 = setTimeout(() => setPhase("open"), 2050);
    const t3 = setTimeout(() => setPhase("done"), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [reduced]);

  // Click skips straight to the cut.
  useEffect(() => {
    if (phase !== "kanji" && phase !== "slash") return;
    const skip = () => setPhase("open");
    window.addEventListener("pointerdown", skip);
    const t = setTimeout(() => window.removeEventListener("pointerdown", skip), 4000);
    return () => {
      window.removeEventListener("pointerdown", skip);
      clearTimeout(t);
    };
  }, [phase]);

  // After a manual skip, still resolve to done.
  useEffect(() => {
    if (phase !== "open") return;
    const t = setTimeout(() => setPhase("done"), 1150);
    return () => clearTimeout(t);
  }, [phase]);

  // Lock scroll while the gate is closed.
  useEffect(() => {
    if (phase === "done" || phase === "idle") {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done" || phase === "idle") return null;

  const opened = phase === "open";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] pointer-events-auto" aria-hidden>
        {/* Top half */}
        <motion.div
          className="absolute inset-x-0 top-0 h-1/2 bg-sumi"
          animate={opened ? { y: "-100%" } : { y: 0 }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.18, 1] }}
        />
        {/* Bottom half */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-sumi"
          animate={opened ? { y: "100%" } : { y: 0 }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.18, 1] }}
        />

        {/* The blade line */}
        <motion.div
          className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--color-gold) 18%, #fff3d6 50%, var(--color-gold) 82%, transparent)",
            boxShadow:
              "0 0 24px rgba(232,193,113,0.8), 0 0 64px rgba(226,82,30,0.5)",
          }}
          initial={{ width: "0%", opacity: 0 }}
          animate={
            phase === "slash" || opened
              ? { width: "100%", opacity: opened ? 0 : 1 }
              : { width: "0%", opacity: 0 }
          }
          transition={{
            width: { duration: 0.55, ease: [0.85, 0, 0.15, 1] },
            opacity: { duration: opened ? 0.7 : 0.15 },
          }}
        />

        {/* Kanji breath */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center gap-6"
          animate={opened ? { opacity: 0, scale: 1.06 } : { opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            initial={{ opacity: 0, filter: "blur(18px)", scale: 1.18 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-gold-sheen"
            style={{
              fontFamily: "var(--font-kanji)",
              fontSize: "clamp(7rem, 18vw, 14rem)",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            鋼
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="eyebrow"
            style={{ letterSpacing: "0.5em" }}
          >
            HAGANE STUDIO
          </motion.span>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
