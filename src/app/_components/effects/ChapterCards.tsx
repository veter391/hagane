"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Chapter title cards — the Ghost-of-Tsushima beat.
 *
 * Crossing into a new scene on the home journey stamps a brief card in the
 * centre of the screen: the chapter kanji presses in like a seal, the
 * chapter name fades under it, everything dissolves in ~1.4s. Throttled so
 * fast scrolling never spams; pointer-events: none so it never blocks.
 */

const CHAPTERS = [
  null, // hero handles its own arrival
  { kanji: "鍛", title: "THE OATH", num: "第二章" },
  { kanji: "五", title: "FIVE RINGS", num: "第三章" },
  { kanji: "火", title: "THE FORGE", num: "第四章" },
  { kanji: "作", title: "RECENT CUTS", num: "第五章" },
  { kanji: "道", title: "THE CODE", num: "第六章" },
  { kanji: "戦", title: "THE DUEL", num: "第七章" },
  null, // footer — journey's end needs no card
] as const;

const MIN_GAP_MS = 2600;

export function ChapterCards() {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const [card, setCard] = useState<(typeof CHAPTERS)[number] | null>(null);
  const lastIndexRef = useRef(0);
  const lastShownRef = useRef(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduced || pathname !== "/") return;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      const idx = Math.max(0, Math.min(CHAPTERS.length - 1, Math.floor(p * CHAPTERS.length)));
      if (idx === lastIndexRef.current) return;
      lastIndexRef.current = idx;

      const now = performance.now();
      const chapter = CHAPTERS[idx];
      if (!chapter || now - lastShownRef.current < MIN_GAP_MS) return;
      lastShownRef.current = now;

      setCard(chapter);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => setCard(null), 1500);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [reduced, pathname]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[108] flex items-center justify-center"
    >
      <AnimatePresence>
        {card ? (
          <motion.div
            key={card.num}
            initial={{ opacity: 0, scale: 1.35, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-3"
          >
            <span
              className="relative flex items-center justify-center"
              style={{ width: "9.5rem", height: "9.5rem" }}
            >
              {/* Seal ring pulse */}
              <motion.span
                initial={{ opacity: 0.9, scale: 0.7 }}
                animate={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="absolute inset-0 rounded-full"
                style={{ border: "2px solid rgba(212, 66, 46, 0.65)" }}
              />
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 38% 32%, rgba(212,66,46,0.32), rgba(139,42,42,0.18) 70%, transparent 100%)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-kanji)",
                  fontSize: "5.5rem",
                  fontWeight: 900,
                  color: "var(--color-washi)",
                  textShadow: "0 0 40px rgba(232,193,113,0.45), 0 4px 22px rgba(10,9,8,0.9)",
                  lineHeight: 1,
                }}
              >
                {card.kanji}
              </span>
            </span>
            <span className="eyebrow" style={{ letterSpacing: "0.4em" }}>
              {card.num} · {card.title}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
