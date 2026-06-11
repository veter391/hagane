"use client";

import Link from "next/link";
import { Reveal } from "../effects/Reveal";
import { Kanji } from "../ui/Kanji";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

type Craft = {
  num: string;
  kanji: string;
  romaji: string;
  name: string;
  lines: [string, string, string];
};

const CRAFTS: Craft[] = [
  {
    num: "01",
    kanji: "地",
    romaji: "Chi",
    name: "Earth",
    lines: [
      "Brand landing pages.",
      "The foundation that grounds everything.",
      "Built to load fast, render true.",
    ],
  },
  {
    num: "02",
    kanji: "水",
    romaji: "Mizu",
    name: "Water",
    lines: [
      "Portfolio sites.",
      "Shape that flows to fit.",
      "For makers who want their work to breathe.",
    ],
  },
  {
    num: "03",
    kanji: "火",
    romaji: "Hi",
    name: "Fire",
    lines: [
      "Launch and campaign sites.",
      "Built for urgency.",
      "Sharpened for the moment of strike.",
    ],
  },
  {
    num: "04",
    kanji: "風",
    romaji: "Kaze",
    name: "Wind",
    lines: [
      "Personal sites for writers, artists, founders.",
      "Lightweight. Particular.",
      "Alive.",
    ],
  },
  {
    num: "05",
    kanji: "空",
    romaji: "Kū",
    name: "Void",
    lines: [
      "Custom commission.",
      "Bring a vision we have not yet seen.",
      "We forge it.",
    ],
  },
];

function CraftRow({ craft, index }: { craft: Craft; index: number }) {
  const reduced = useReducedMotion();
  const rowRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const kanjiOnRight = index % 2 === 0;
  const direction = kanjiOnRight ? -1 : 1;

  const copyColumn = (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: 40 * direction }}
      whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className={
        kanjiOnRight
          ? "lg:col-start-1 lg:row-start-1 lg:pr-4"
          : "lg:col-start-3 lg:row-start-1 lg:pl-4"
      }
    >
      <div className="eyebrow mb-6">{craft.num}</div>
      <h3 className="display-heading text-4xl lg:text-6xl text-washi">
        <span className="text-gold-sheen">{craft.name.charAt(0)}</span>
        {craft.name.slice(1)}
      </h3>
      <div className="mt-3 text-blade text-sm tracking-[0.3em] uppercase">
        {craft.kanji} · {craft.romaji.toUpperCase()}
      </div>
      <div className="mt-8 max-w-md space-y-2 text-mist text-base leading-relaxed">
        {craft.lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </motion.div>
  );

  const kanjiColumn = (
    <motion.div
      style={reduced ? undefined : { y: parallaxY }}
      className={
        kanjiOnRight
          ? "lg:col-start-3 lg:row-start-1 flex justify-end items-center"
          : "lg:col-start-1 lg:row-start-1 flex justify-start items-center"
      }
    >
      <Kanji
        char={craft.kanji}
        style={{
          fontSize: "clamp(8rem, 14vw, 14rem)",
          opacity: 0.18,
        }}
      />
    </motion.div>
  );

  const divider = (
    <div
      aria-hidden
      className="hidden lg:flex lg:col-start-2 lg:row-start-1 justify-center items-center"
    >
      <div className="w-px h-48 bg-blade/30" />
    </div>
  );

  return (
    <article
      ref={rowRef}
      className="relative grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center py-16 border-t border-steel/20"
    >
      {kanjiColumn}
      {divider}
      {copyColumn}
    </article>
  );
}

export function FiveCrafts() {
  return (
    <section
      id="five-crafts"
      className="relative min-h-screen px-6 lg:px-16 py-32 lg:py-48 overflow-hidden"
    >
      <span
        aria-hidden
        className="text-outline display-heading pointer-events-none absolute left-0 top-10 z-0 select-none whitespace-nowrap"
        style={{ fontSize: "clamp(7rem, 16vw, 16rem)", opacity: 0.45 }}
      >
        GORIN
      </span>
      <span
        aria-hidden
        className="vertical-jp pointer-events-none absolute left-3 top-[12%] hidden xl:block text-[0.8rem]"
        style={{ color: "color-mix(in srgb, var(--color-gold) 30%, transparent)" }}
      >
        地水火風空
      </span>
      <header className="relative z-10 mb-24 lg:mb-32 lg:pl-[8%]">
        <Reveal>
          <div className="chapter-label mb-8">
            第三章 · CHAPTER 03 — FIVE RINGS
          </div>
        </Reveal>
        <Reveal delay={0.15} y={32}>
          <h2 className="display-heading text-5xl lg:text-7xl xl:text-8xl text-washi max-w-4xl">
            Five elements. Five disciplines. One blade.
          </h2>
        </Reveal>
      </header>

      <div className="relative z-10 lg:px-[4%]">
        {CRAFTS.map((craft, index) => (
          <CraftRow key={craft.num} craft={craft} index={index} />
        ))}
        <div className="border-t border-steel/20" />

        <Reveal delay={0.1} y={12}>
          <div className="pt-12 flex justify-center">
            <Link
              href="/way"
              className="font-mono text-[0.7rem] tracking-[0.25em] uppercase transition-colors duration-300 text-[var(--color-gold)] hover:text-[var(--color-ember)]"
            >
              The five rings, explained at length →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
