"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Embers } from "../effects/Embers";
import { Reveal } from "../effects/Reveal";
import { Kanji } from "../ui/Kanji";

type Stage = {
  num: string;
  kanji: string;
  name: string;
  lines: [string, string];
};

const stages: Stage[] = [
  {
    num: "01",
    kanji: "鋼",
    name: "Raw Steel",
    lines: [
      "We listen first. No template. No assumption.",
      "The brief is the ore.",
    ],
  },
  {
    num: "02",
    kanji: "折",
    name: "Folded",
    lines: [
      "We sketch, fold, refold.",
      "Architecture, copy, motion — every fold tightens the grain.",
    ],
  },
  {
    num: "03",
    kanji: "焼",
    name: "Tempered",
    lines: [
      "We build. Strict types, real performance, real accessibility.",
      "Shipped to a staging blade you can test.",
    ],
  },
  {
    num: "04",
    kanji: "研",
    name: "Polished",
    lines: [
      "We polish until you stop noticing the polish.",
      "Then we hand you the key.",
    ],
  },
];

export function ForgeProcess() {
  const reduced = useReducedMotion();
  const hairlineRef = useRef<HTMLDivElement>(null);
  const hairlineInView = useInView(hairlineRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="process"
      className="relative min-h-screen w-full overflow-hidden px-6 py-32 md:px-12 lg:px-20"
    >
      <Embers density={0.7} className="z-[5]" />
      <span
        aria-hidden
        className="text-outline display-heading pointer-events-none absolute right-0 top-12 z-0 select-none whitespace-nowrap"
        style={{ fontSize: "clamp(7rem, 16vw, 16rem)", opacity: 0.45 }}
      >
        FORGE
      </span>
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="grid grid-cols-12 gap-x-6">
          <Reveal className="col-span-12 md:col-span-10 md:col-start-2 xl:col-span-8 xl:col-start-2">
            <p className="chapter-label mb-8">第四章 · CHAPTER 04 — THE FORGE</p>
            <h2 className="display-heading text-washi text-5xl md:text-7xl xl:text-[5.5rem]">
              From ore to blade.
            </h2>
          </Reveal>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {stages.map((stage, i) => (
            <motion.article
              key={stage.num}
              initial={reduced ? false : { opacity: 0, x: -16 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative px-6 py-10 md:px-8 xl:py-4 ${
                i === 0
                  ? ""
                  : i === 1
                  ? "md:border-l md:border-steel/30 xl:border-l xl:border-steel/30"
                  : i === 2
                  ? "xl:border-l xl:border-steel/30"
                  : "md:border-l md:border-steel/30 xl:border-l xl:border-steel/30"
              }`}
            >
              <p className="eyebrow text-mist">{stage.num}</p>

              <div className="relative my-6 h-[clamp(4rem,6vw,6rem)]">
                <Kanji
                  char={stage.kanji}
                  className="absolute left-0 top-0 text-blade"
                  style={{
                    fontSize: "clamp(4rem, 6vw, 6rem)",
                    opacity: 0.3,
                  }}
                />
              </div>

              <h3 className="display-heading text-washi text-3xl">
                {stage.name}
              </h3>

              <div className="mt-5 max-w-[18rem] space-y-1 text-mist text-sm leading-relaxed">
                <p>{stage.lines[0]}</p>
                <p>{stage.lines[1]}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          ref={hairlineRef}
          initial={{ scaleX: 0 }}
          animate={hairlineInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0, transformOrigin: "left center" }}
          className="mt-48 h-px w-full bg-steel/40"
          aria-hidden
        />
      </div>
    </section>
  );
}
