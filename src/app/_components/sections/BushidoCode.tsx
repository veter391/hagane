"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Kanji } from "../ui/Kanji";

const PRINCIPLES = [
  "We measure twice. We cut once.",
  "The site that survives is the site forged with restraint.",
  "No ornament without function.",
  "Speed without grace is noise.",
  "We finish what we begin.",
] as const;

const SHEEN_SENTENCE = "We cut once.";

function FirstPrinciple({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduced = useReducedMotion();

  const sheenStart = text.indexOf(SHEEN_SENTENCE);
  const lead = sheenStart === -1 ? text : text.slice(0, sheenStart);
  const sheen = sheenStart === -1 ? "" : text.slice(sheenStart);

  if (reduced) {
    return (
      <p
        ref={ref}
        className="display-heading text-2xl lg:text-4xl text-washi text-center"
      >
        {lead}
        {sheen && <span className="text-gold-sheen">{sheen}</span>}
      </p>
    );
  }

  const renderChars = (part: string, offset: number) =>
    Array.from(part).map((ch, i) => (
        <motion.span
          key={`${ch}-${offset + i}`}
          aria-hidden
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{
            duration: 0.55,
            delay: (offset + i) * 0.025,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
    ));

  return (
    <p
      ref={ref}
      className="display-heading text-2xl lg:text-4xl text-washi text-center"
      aria-label={text}
    >
      {renderChars(lead, 0)}
      {sheen && (
        <span className="text-gold-sheen">
          {renderChars(sheen, Array.from(lead).length)}
        </span>
      )}
    </p>
  );
}

function Principle({ text, index }: { text: string; index: number }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <p className="display-heading text-2xl lg:text-4xl text-washi text-center">
        {text}
      </p>
    );
  }

  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="display-heading text-2xl lg:text-4xl text-washi text-center"
    >
      {text}
    </motion.p>
  );
}

function Divider() {
  return (
    <div
      aria-hidden
      className="mx-auto h-px w-16"
      style={{
        background: "color-mix(in srgb, var(--color-blade) 40%, transparent)",
      }}
    />
  );
}

export function BushidoCode() {
  const reduced = useReducedMotion();

  return (
    <section
      id="code"
      className="relative min-h-screen overflow-hidden grain"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[6] flex items-center justify-center select-none"
      >
        <Kanji
          char="道"
          className=""
          style={{
            fontSize: "clamp(20rem, 38vw, 38rem)",
            opacity: 0.06,
            lineHeight: 0.9,
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-32 lg:py-44">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="chapter-label">第六章 · CHAPTER 06 — THE CODE</span>
        </motion.div>

        <div className="relative">
          <span
            aria-hidden
            className="text-outline display-heading pointer-events-none select-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
            style={{ fontSize: "clamp(7rem, 16vw, 16rem)", opacity: 0.45 }}
          >
            BUSHIDO
          </span>

          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="display-heading text-4xl lg:text-6xl text-washi text-center mt-6 relative z-10"
          >
            Five principles. Kept.
          </motion.h2>
        </div>

        <div className="mt-20 lg:mt-28 flex flex-col items-stretch">
          <div className="py-8">
            <FirstPrinciple text={PRINCIPLES[0]} />
          </div>

          {PRINCIPLES.slice(1).map((text, i) => (
            <div key={text} className="flex flex-col">
              <Divider />
              <div className="py-8">
                <Principle text={text} index={i} />
              </div>
            </div>
          ))}
        </div>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-24 lg:mt-32 text-center text-mist"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
          }}
        >
          鋼 — HAGANE · KEPT QUIETLY.
        </motion.p>
      </div>
    </section>
  );
}
