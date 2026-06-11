"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { ParticleField, type ParticleMode } from "./ParticleField";

/**
 * Inner-page world. One fixed atmospheric scene with:
 *  - slow scroll dolly (scale + drift)
 *  - mouse-tilt (the window answers the hand, same as the home portal)
 *  - page-specific particle weather
 *  - vignette + bottom wash for legibility
 *
 * Mount once per inner page, before <main>.
 */
export function PageStage({
  image,
  weather,
  position = "center 50%",
}: {
  image: string;
  weather: ParticleMode;
  position?: string;
}) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.22]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const dim = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.82, 0.62]);
  const filter = useTransform(dim, (v) => `brightness(${v})`);

  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 38, damping: 16, mass: 0.9 });
  const my = useSpring(myRaw, { stiffness: 38, damping: 16, mass: 0.9 });
  const rotateY = useTransform(mx, [-0.5, 0.5], [1.6, -1.6]);
  const rotateX = useTransform(my, [-0.5, 0.5], [-1.2, 1.2]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      mxRaw.set(e.clientX / window.innerWidth - 0.5);
      myRaw.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, mxRaw, myRaw]);

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 z-[-10] overflow-hidden bg-sumi"
        style={{ perspective: 1100 }}
      >
        <motion.div
          className="absolute inset-[-4%]"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: position,
            scale: reduced ? 1 : scale,
            y: reduced ? "0%" : y,
            rotateX: reduced ? 0 : rotateX,
            rotateY: reduced ? 0 : rotateY,
            filter,
            willChange: "transform, filter",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, rgba(10,9,8,0) 0%, rgba(10,9,8,0.3) 52%, rgba(10,9,8,0.72) 85%, rgba(10,9,8,0.94) 100%)",
            mixBlendMode: "multiply",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none h-[40vh]"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,9,8,0) 0%, rgba(10,9,8,0.6) 55%, rgba(10,9,8,0.96) 100%)",
          }}
        />
      </div>
      <ParticleField mode={weather} />
    </>
  );
}
