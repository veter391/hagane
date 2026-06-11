"use client";

import Link from "next/link";
import { Reveal } from "../effects/Reveal";
import { Kanji } from "../ui/Kanji";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

type Cut = {
  n: string;
  cls: string;
  title: string;
  desc: string;
  kanji: string;
  image: string;
  tint: string;
  slug: string;
};

const cuts: Cut[] = [
  {
    n: "01",
    cls: "EARTH · BRAND",
    title: "The Ceramicist",
    desc: "A portfolio for a hand-thrown pottery studio. Slow scroll, hand-laid type, no rush.",
    kanji: "陶",
    image: "/img/bg-earth.webp",
    tint:
      "linear-gradient(135deg, rgba(201, 169, 97, 0.18) 0%, rgba(26, 22, 20, 0.55) 60%, rgba(10, 9, 8, 0.82) 100%)",
    slug: "the-ceramicist",
  },
  {
    n: "02",
    cls: "WIND · PERSONAL",
    title: "The Wanderer",
    desc: "A launch site for a long-form travel essay collection. Built to be read on a phone in motion.",
    kanji: "旅",
    image: "/img/bg-wind.webp",
    tint:
      "linear-gradient(60deg, rgba(216, 177, 189, 0.14) 0%, rgba(26, 22, 20, 0.62) 55%, rgba(10, 9, 8, 0.85) 100%)",
    slug: "the-wanderer",
  },
  {
    n: "03",
    cls: "WATER · PORTFOLIO",
    title: "The Founder",
    desc: "A landing for a deep-tech startup. Quiet credibility instead of loud marketing.",
    kanji: "源",
    image: "/img/bg-water.webp",
    tint:
      "linear-gradient(200deg, rgba(26, 59, 92, 0.28) 0%, rgba(139, 42, 42, 0.18) 55%, rgba(10, 9, 8, 0.86) 100%)",
    slug: "the-founder",
  },
];

function CutRow({ cut, index }: { cut: Cut; index: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  const stagger = index * 0.12;

  return (
    <div
      ref={ref}
      className="group grid lg:grid-cols-[auto_1fr_2fr] gap-8 items-center py-16 border-t border-steel/20"
    >
      <div
        aria-hidden
        className="text-[3rem] lg:text-[9rem] leading-none font-mono tracking-tighter"
        style={{ color: "color-mix(in srgb, var(--color-gold) 45%, transparent)" }}
      >
        {cut.n}
      </div>

      <div className="relative w-full">
        <div
          data-slice
          className="group/thumb aspect-[16/10] relative w-full overflow-hidden border border-steel/30"
          style={{
            backgroundImage: `${cut.tint}, url(${cut.image})`,
            backgroundSize: "cover, cover",
            backgroundPosition: "center, center",
            backgroundBlendMode: "normal",
          }}
        >
          <motion.div
            initial={
              reduced
                ? { clipPath: "inset(0 0% 0 0)" }
                : { clipPath: "inset(0 100% 0 0)" }
            }
            animate={
              inView
                ? { clipPath: "inset(0 0% 0 0)" }
                : { clipPath: "inset(0 100% 0 0)" }
            }
            transition={{
              duration: reduced ? 0 : 1.4,
              delay: reduced ? 0 : 0.15 + stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
          >
            <Kanji
              char={cut.kanji}
              className="absolute right-4 bottom-2 text-9xl"
              style={{ opacity: 0.18, color: "var(--color-blade)" }}
            />

            <div
              aria-hidden
              className="absolute inset-0 transition-opacity duration-700 ease-out"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 35%, color-mix(in srgb, var(--color-sumi) 40%, transparent) 100%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 15%, color-mix(in srgb, var(--color-sumi) 75%, transparent) 100%)",
              }}
            />

            <div
              aria-hidden
              className="absolute top-3 left-3 font-mono text-[0.65rem] tracking-[0.2em] text-washi/40"
            >
              FORGED · {cut.n}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <Reveal delay={0.1 + stagger} y={12}>
          <span className="font-mono text-[0.7rem] tracking-[0.25em] text-blade">
            {cut.cls}
          </span>
        </Reveal>

        <Reveal delay={0.2 + stagger} y={16}>
          <h3 className="display-heading text-3xl lg:text-5xl text-washi inline-block relative">
            <Link href={`/works/${cut.slug}`}>{cut.title}</Link>
            <span
              aria-hidden
              className="block absolute left-0 -bottom-2 h-px w-0 bg-blade/70 group-hover:w-full transition-[width] duration-700 ease-out"
            />
          </h3>
        </Reveal>

        <Reveal delay={0.3 + stagger} y={12}>
          <p className="text-mist max-w-md leading-relaxed">{cut.desc}</p>
        </Reveal>

        <Reveal delay={0.35 + stagger} y={8}>
          <Link
            href={`/works/${cut.slug}`}
            className="inline-block text-[0.7rem] font-mono tracking-[0.25em] transition-colors duration-300 text-[var(--color-gold)] hover:text-[var(--color-ember)]"
          >
            Read the forging →
          </Link>
        </Reveal>

        <Reveal delay={0.4 + stagger} y={8}>
          <div className="flex items-center gap-4 pt-2 font-mono text-[0.65rem] tracking-[0.25em] text-mist/70">
            <span className="h-px w-8 bg-steel/40" aria-hidden />
            <span>
              {cut.n} OF 3 · BY APPOINTMENT
            </span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export function RecentCuts() {
  return (
    <section
      id="cuts"
      className="relative min-h-screen w-full overflow-hidden px-6 lg:px-16 py-32 lg:py-40"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="relative flex flex-col gap-6 mb-20 lg:mb-28 lg:pl-[10%]">
          <span
            aria-hidden
            className="text-outline display-heading pointer-events-none select-none absolute right-0 -top-10 z-0 whitespace-nowrap"
            style={{
              fontSize: "clamp(7rem, 16vw, 16rem)",
              opacity: 0.45,
              lineHeight: 0.85,
            }}
          >
            WORKS
          </span>

          <Reveal className="relative z-10">
            <span className="chapter-label">
              第五章 · CHAPTER 05 — RECENT CUTS
            </span>
          </Reveal>

          <Reveal delay={0.12} y={28} className="relative z-10">
            <h2 className="display-heading text-5xl lg:text-7xl text-washi max-w-2xl">
              Recent forgings.
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col">
          {cuts.map((cut, i) => (
            <CutRow key={cut.n} cut={cut} index={i} />
          ))}
        </div>

        <Reveal delay={0.2} y={12}>
          <div className="border-t border-steel/20 pt-12 mt-4 flex flex-col items-center gap-4">
            <p className="font-mono text-[0.7rem] tracking-[0.25em] text-mist/60 text-center">
              More cuts on request — by appointment only.
            </p>
            <Link
              href="/works"
              className="font-mono text-[0.7rem] tracking-[0.25em] text-center transition-colors duration-300 text-[var(--color-gold)] hover:text-[var(--color-ember)]"
            >
              View all works →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
