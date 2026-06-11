"use client";

import { Kanji } from "../ui/Kanji";
import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef } from "react";

const SENTENCES = [
  "We do not build sites.",
  "We forge them.",
  "Each begins as raw ore.",
  "We fold it. Temper it. Polish it for as long as it asks.",
  "What you receive is not a template. Not a product.",
  "It is a blade — sharpened to one purpose.",
];

export function Manifesto() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(copyRef, { once: true, margin: "-25%" });

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });

  const kanjiY = useTransform(scrollYProgress, [0, 1], ["6%", "-14%"]);
  const headlineY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  const sentenceVariants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.01 } },
      }
    : {
        hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        visible: (i: number) => ({
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          transition: {
            clipPath: {
              duration: 1.0,
              ease: [0.22, 1, 0.36, 1] as const,
              delay: i * 0.18,
            },
            opacity: {
              duration: 0.45,
              ease: "linear" as const,
              delay: i * 0.18,
            },
          },
        }),
      };

  const cutDelay = reduced ? 0 : SENTENCES.length * 0.18 + 0.4;

  return (
    <section
      id="manifesto"
      ref={rootRef}
      className="relative overflow-hidden grain min-h-screen flex items-center"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -left-10 top-0 h-px w-40 bg-steel/40 z-10"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-12 hidden lg:block eyebrow text-mist"
        style={{ color: "var(--color-mist)" }}
      >
        02 · 鍛
      </span>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-32 lg:px-16 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-12 lg:gap-20 items-end">
          <motion.div
            style={reduced ? undefined : { y: kanjiY }}
            className="relative h-[40vh] lg:h-[80vh] flex items-end justify-start"
          >
            <Kanji
              char="鍛"
              className="leading-none"
              style={{
                fontSize: "clamp(14rem, 26vw, 28rem)",
                opacity: 0.18,
                transform: "translate(-4%, 8%) rotate(-2deg)",
              }}
            />
            <span
              aria-hidden
              className="absolute bottom-6 left-2 h-24 w-px bg-blade/30"
            />
          </motion.div>

          <div ref={copyRef} className="relative pt-8 lg:pt-0 lg:pb-24">
            <span
              aria-hidden
              className="text-outline display-heading pointer-events-none absolute -top-8 right-0 z-0 select-none whitespace-nowrap"
              style={{ fontSize: "clamp(7rem, 16vw, 16rem)", opacity: 0.45 }}
            >
              OATH
            </span>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="chapter-label relative z-10 mb-10 lg:mb-14"
            >
              第二章 · CHAPTER 02 — THE OATH
            </motion.div>

            <motion.div
              style={reduced ? undefined : { y: headlineY }}
              className="relative z-10 space-y-5 lg:space-y-7 max-w-[58ch]"
            >
              {SENTENCES.map((line, i) => (
                <motion.p
                  key={line}
                  custom={i}
                  variants={sentenceVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="display-heading text-washi text-2xl lg:text-4xl leading-[1.05]"
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>

            <motion.p
              initial={
                reduced
                  ? { opacity: 0 }
                  : { clipPath: "inset(0 100% 0 0)", opacity: 0 }
              }
              animate={
                inView
                  ? reduced
                    ? { opacity: 1 }
                    : { clipPath: "inset(0 0% 0 0)", opacity: 1 }
                  : {}
              }
              transition={{
                clipPath: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: cutDelay },
                opacity: { duration: 0.5, ease: "linear", delay: cutDelay },
              }}
              className="display-heading text-gold-sheen relative z-10 text-5xl lg:text-7xl leading-[0.95] mt-14 lg:mt-20 -tracking-[0.03em]"
            >
              It cuts.
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                delay: cutDelay + 0.3,
              }}
              style={{ transformOrigin: "left center" }}
              className="mt-10 h-px w-32 bg-blade/50"
            />
          </div>
        </div>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-6 lg:right-16 eyebrow text-mist/70"
      >
        — 鋼 / HAGANE
      </span>
    </section>
  );
}
