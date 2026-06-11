"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useState } from "react";

/**
 * PORTAL STAGE — the "fly-through" engine.
 *
 * Instead of cross-fading flat backdrops, each scene behaves like a room
 * the camera pushes through:
 *
 *   APPROACH  scale 0.62 → 1.00, blur 12 → 0, opacity 0 → 1
 *             (the world rushes toward you out of the fog)
 *   INSIDE    scale 1.00 → 1.14
 *             (slow dolly forward — you're standing in it)
 *   PIERCE    scale 1.14 → 2.60, blur 0 → 16, opacity 1 → 0
 *             (the scene blows past the viewport edges as you fly through)
 *
 * The whole stage sits in a perspective container that tilts a few degrees
 * toward the cursor, so the world answers your hand like a window, not a poster.
 *
 * Only the active scene ± 1 neighbour is mounted — the other five layers
 * don't exist in the DOM, which keeps paint cost flat no matter how many
 * scenes the journey has.
 */

const SCENES = [
  { id: "hero", image: "/img/bg-hero-sunset.webp", pos: "center 35%" },
  { id: "manifesto", image: "/img/bg-manifesto.webp", pos: "center 60%" },
  { id: "five", image: "/img/bg-wind.webp", pos: "center 55%" },
  { id: "forge", image: "/img/bg-fire.webp", pos: "center 50%" },
  { id: "cuts", image: "/img/bg-water.webp", pos: "center 60%" },
  { id: "bushido", image: "/img/bg-bushido.webp", pos: "center 60%" },
  { id: "duel", image: "/img/bg-void.webp", pos: "center 55%" },
  { id: "footer", image: "/img/bg-earth.webp", pos: "center 50%" },
] as const;

const N = SCENES.length;
const WIN = 1 / N;

function windowAt(i: number): [number, number, number, number] {
  const start = Math.max(0, i * WIN - WIN * 0.42);
  const settleIn = i * WIN + WIN * 0.12;
  const settleOut = (i + 1) * WIN - WIN * 0.12;
  const end = Math.min(1, (i + 1) * WIN + WIN * 0.42);
  return [start, settleIn, settleOut, end];
}

function PortalLayer({
  index,
  p,
}: {
  index: number;
  p: MotionValue<number>;
}) {
  const [a, b, c, d] = windowAt(index);
  const first = index === 0;
  const last = index === N - 1;

  const opacity = useTransform(
    p,
    [a, b, c, d],
    [first ? 1 : 0, 1, 1, last ? 1 : 0],
  );
  const scale = useTransform(
    p,
    [a, b, c, d],
    [first ? 1 : 0.62, 1, 1.14, last ? 1.12 : 2.6],
  );
  const blurV = useTransform(
    p,
    [a, b, c, d],
    [first ? 0 : 12, 0, 0, last ? 0 : 16],
  );
  const filter = useTransform(blurV, (v) =>
    v < 0.3 ? "none" : `blur(${v.toFixed(1)}px)`,
  );

  const scene = SCENES[index];
  return (
    <motion.div
      className="portal-layer"
      style={{
        opacity,
        scale,
        filter,
        backgroundImage: `url(${scene.image})`,
        backgroundPosition: scene.pos,
        zIndex: N - index,
      }}
    />
  );
}

export function CinematicStage() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.max(0, Math.min(N - 1, Math.floor(v * N)));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  // Mouse-driven camera tilt — the world answers the cursor.
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 38, damping: 16, mass: 0.9 });
  const my = useSpring(myRaw, { stiffness: 38, damping: 16, mass: 0.9 });
  const rotateY = useTransform(mx, [-0.5, 0.5], [2.2, -2.2]);
  const rotateX = useTransform(my, [-0.5, 0.5], [-1.6, 1.6]);
  const camX = useTransform(mx, [-0.5, 0.5], [16, -16]);
  const camY = useTransform(my, [-0.5, 0.5], [10, -10]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      mxRaw.set(e.clientX / window.innerWidth - 0.5);
      myRaw.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, mxRaw, myRaw]);

  if (!mounted || reduced) {
    return (
      <div
        aria-hidden
        className="fixed inset-0 z-[-10]"
        style={{
          backgroundImage: `url(${SCENES[0].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    );
  }

  const visible = SCENES.map((_, i) => i).filter(
    (i) => Math.abs(i - active) <= 1,
  );

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[-10] overflow-hidden bg-sumi"
      style={{ perspective: 1100 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          rotateX,
          rotateY,
          x: camX,
          y: camY,
          scale: 1.06,
          transformStyle: "preserve-3d",
        }}
      >
        {visible.map((i) => (
          <PortalLayer key={SCENES[i].id} index={i} p={scrollYProgress} />
        ))}
      </motion.div>

      {/* Global vignette — the tunnel walls */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 52%, rgba(10,9,8,0) 0%, rgba(10,9,8,0.22) 48%, rgba(10,9,8,0.6) 82%, rgba(10,9,8,0.92) 100%)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none h-[32vh]"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,9,8,0) 0%, rgba(10,9,8,0.55) 55%, rgba(10,9,8,0.94) 100%)",
        }}
      />
    </div>
  );
}
