"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Mid-depth parallax layer. Sits BETWEEN the global CinematicStage
 * (z: -10, very far) and the section content (z: 10+, near). Three
 * SVG turbulence layers each travel at a different speed so depth
 * reads as real: foreground fog races by, mid drifts, far barely moves.
 *
 * Mounted at body level via layout.tsx.
 */

function fogDataUrl(baseFrequency: number, seed: number) {
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'>` +
      `<filter id='f' x='0' y='0' width='100%' height='100%'>` +
      `<feTurbulence baseFrequency='${baseFrequency}' numOctaves='3' seed='${seed}' stitchTiles='stitch'/>` +
      `<feColorMatrix values='0 0 0 0 1  0 0 0 0 0.92  0 0 0 0 0.7  0 0 0 0.45 0'/>` +
      `</filter>` +
      `<rect width='800' height='800' filter='url(%23f)'/></svg>`,
  )}")`;
}

// Hoisted — generated once at module load, not on every render.
const FOG_FAR = fogDataUrl(0.011, 4);
const FOG_MID = fogDataUrl(0.016, 9);
const FOG_NEAR = fogDataUrl(0.025, 17);

export function MidFog() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const farY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "8%"]);
  const midY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "20%"]);
  const nearY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "44%"]);

  const farOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.16, 0.12, 0.08]);
  const midOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.12, 0.18, 0.1]);
  const nearOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.06, 0.1, 0.18]);

  return (
    <div aria-hidden className="fixed inset-0 z-[-5] pointer-events-none">
      {/* Far layer — barely moves, very soft */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: FOG_FAR,
          backgroundSize: "120% 120%",
          backgroundPosition: "center",
          mixBlendMode: "screen",
          opacity: farOpacity,
          y: farY,
          filter: "blur(40px)",
        }}
      />
      {/* Mid layer — drifts at moderate pace */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: FOG_MID,
          backgroundSize: "150% 150%",
          backgroundPosition: "30% 40%",
          mixBlendMode: "screen",
          opacity: midOpacity,
          y: midY,
          filter: "blur(28px)",
        }}
      />
      {/* Near layer — races past, sharper */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: FOG_NEAR,
          backgroundSize: "180% 180%",
          backgroundPosition: "70% 60%",
          mixBlendMode: "screen",
          opacity: nearOpacity,
          y: nearY,
          filter: "blur(14px)",
        }}
      />
    </div>
  );
}
