"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Volumetric light shafts. Two skewed gradient cones drift slowly and
 * breathe with scroll — strongest on the sunset / wind / dawn scenes,
 * dimmed elsewhere so the forge and night scenes keep their dark.
 */
export function GodRays() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Bright on scenes 0 (sunset), 2-3 boundary (wind), 5 (dawn garden); dim elsewhere.
  const intensity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.45, 0.58, 0.66, 0.78, 1],
    [0.8, 0.7, 0.25, 0.55, 0.15, 0.3, 0.75, 0.2, 0.1],
  );
  const drift = useTransform(scrollYProgress, [0, 1], ["-4%", "6%"]);

  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[-4] overflow-hidden">
      <motion.div
        className="absolute -top-[20%] left-[8%] h-[140%] w-[34%]"
        style={{
          opacity: intensity,
          x: drift,
          background:
            "linear-gradient(195deg, rgba(232,193,113,0.16) 0%, rgba(232,193,113,0.05) 45%, transparent 75%)",
          transform: "skewX(-14deg)",
          filter: "blur(28px)",
          mixBlendMode: "screen",
        }}
      />
      <motion.div
        className="absolute -top-[15%] left-[42%] h-[130%] w-[22%]"
        style={{
          opacity: intensity,
          x: drift,
          background:
            "linear-gradient(192deg, rgba(245,230,196,0.10) 0%, rgba(232,193,113,0.04) 50%, transparent 78%)",
          transform: "skewX(-18deg)",
          filter: "blur(36px)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
