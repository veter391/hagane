"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Chapter rail — fixed right edge. Seven kanji waypoints, a scroll progress
 * thread, gold glow on the active chapter. Turns a one-page scroll into a
 * narrated journey.
 */

const CHAPTERS = [
  { id: "top", kanji: "鋼", label: "Steel" },
  { id: "manifesto", kanji: "鍛", label: "Forge" },
  { id: "five-crafts", kanji: "五", label: "Five" },
  { id: "process", kanji: "工", label: "Craft" },
  { id: "cuts", kanji: "作", label: "Works" },
  { id: "code", kanji: "道", label: "Way" },
  { id: "duel", kanji: "戦", label: "Begin" },
] as const;

export function NavRail() {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState("top");
  const { scrollYProgress } = useScroll();
  const thread = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
  });

  useEffect(() => {
    if (!onHome) return;
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome]);

  if (!onHome) return null;

  return (
    <nav
      aria-label="Chapters"
      className="fixed right-5 top-1/2 z-[90] hidden -translate-y-1/2 lg:flex flex-col items-center gap-1"
    >
      {/* Progress thread */}
      <div className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2 bg-steel/25" />
      <motion.div
        className="absolute top-2 left-1/2 w-px -translate-x-1/2 origin-top"
        style={{
          height: "calc(100% - 1rem)",
          scaleY: reduced ? 1 : thread,
          background:
            "linear-gradient(180deg, var(--color-gold), var(--color-ember))",
          boxShadow: "0 0 8px rgba(232,193,113,0.5)",
        }}
      />

      {CHAPTERS.map((ch) => {
        const isActive = active === ch.id;
        return (
          <a
            key={ch.id}
            href={`#${ch.id}`}
            aria-label={ch.label}
            aria-current={isActive ? "true" : undefined}
            className="group relative z-10 flex h-11 w-11 items-center justify-center"
          >
            <span
              className="text-[0.95rem] transition-all duration-500"
              style={{
                fontFamily: "var(--font-kanji)",
                color: isActive ? "var(--color-gold)" : "var(--color-steel)",
                textShadow: isActive
                  ? "0 0 14px rgba(232,193,113,0.75)"
                  : "none",
                transform: isActive ? "scale(1.35)" : "scale(1)",
              }}
            >
              {ch.kanji}
            </span>
            <span
              className="pointer-events-none absolute right-full mr-3 whitespace-nowrap font-mono text-[0.6rem] tracking-[0.25em] uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ color: "var(--color-gold)" }}
            >
              {ch.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
