"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Embers } from "../effects/Embers";
import { Kanji } from "../ui/Kanji";

export function Hero() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 120]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);

  // Video is desktop-only — never fetched on small screens.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const v = videoRef.current;
    if (!v) return;
    if (v.readyState >= 2) {
      setVideoReady(true);
      return;
    }
    const onReady = () => setVideoReady(true);
    v.addEventListener("canplay", onReady);
    v.addEventListener("loadeddata", onReady);
    return () => {
      v.removeEventListener("canplay", onReady);
      v.removeEventListener("loadeddata", onReady);
    };
  }, [isDesktop]);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Layer 2 — video overlay (Hero-only, sits above the global stage; desktop-only) */}
      {isDesktop && (
        <motion.video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 z-[1] h-full w-full object-cover"
          style={{
            y: bgY,
            scale: bgScale,
            opacity: videoReady ? 0.78 : 0,
            transition: "opacity 1.6s cubic-bezier(0.16,1,0.3,1)",
            mixBlendMode: "screen",
          }}
          onError={() => setVideoReady(false)}
        >
          <source src="/video/hero-blade.mp4" type="video/mp4" />
        </motion.video>
      )}

      {/* Layer 3 — vignette + bottom fade for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at 30% 60%, rgba(10,9,8,0) 0%, rgba(10,9,8,0.35) 55%, rgba(10,9,8,0.85) 95%), linear-gradient(180deg, rgba(10,9,8,0.4) 0%, rgba(10,9,8,0) 25%, rgba(10,9,8,0) 60%, rgba(10,9,8,0.96) 100%)",
        }}
      />

      {/* Layer 4 — embers floating */}
      <Embers density={1.4} className="z-[3]" />

      {/* Layer 5 — oversized kanji bleeding off-canvas */}
      <Kanji
        char="鋼"
        className="absolute z-[4]"
        style={{
          top: "-12vh",
          left: "-6vw",
          fontSize: "clamp(22rem, 42vw, 52rem)",
          opacity: 0.07,
          color: "var(--color-gold)",
        }}
      />

      {/* Layer 6 — content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 pt-32 lg:pt-44 pb-24 min-h-screen flex flex-col justify-between"
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="chapter-label"
        >
          第一章 · CHAPTER 01 — THE STEEL
        </motion.div>

        {/* Vertical katakana rail, right edge of content zone */}
        <span
          aria-hidden
          className="vertical-jp pointer-events-none absolute right-2 top-[18%] hidden xl:block text-[0.85rem]"
          style={{ color: "color-mix(in srgb, var(--color-gold) 36%, transparent)" }}
        >
          鋼の道・一頁一心
        </span>

        <div className="max-w-[72rem]" style={{ perspective: 900 }}>
          <h1
            data-slice
            className="hero-headline text-washi"
            style={{ fontSize: "clamp(3.4rem, 9.5vw, 11rem)" }}
          >
            {(
              [
                { text: "Web carved", sheen: false },
                { text: "with samurai", sheen: true },
                { text: "precision.", sheen: false },
              ] as const
            ).map((line, lineIdx) => {
              let charCounter = 0;
              return (
                <span
                  key={line.text}
                  className="block"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {line.text.split(" ").map((word, wordIdx) => {
                    const chars = word.split("").map((ch) => {
                      const idx = charCounter++;
                      return (
                        <motion.span
                          key={`${lineIdx}-${idx}`}
                          className={`inline-block ${line.sheen ? "text-gold-sheen" : ""}`}
                          style={{ transformOrigin: "50% 100%" }}
                          initial={
                            reduced
                              ? { opacity: 0 }
                              : {
                                  opacity: 0,
                                  rotateY: 88,
                                  y: 28,
                                  filter: "blur(6px)",
                                }
                          }
                          animate={
                            reduced
                              ? { opacity: 1 }
                              : {
                                  opacity: 1,
                                  rotateY: 0,
                                  y: 0,
                                  filter: "blur(0px)",
                                }
                          }
                          transition={{
                            duration: 1.1,
                            delay: 0.4 + lineIdx * 0.3 + idx * 0.028,
                            ease: [0.16, 1, 0.3, 1] as const,
                          }}
                        >
                          {ch}
                        </motion.span>
                      );
                    });
                    charCounter++; // account for the space
                    return (
                      <span
                        key={`${lineIdx}-w${wordIdx}`}
                        className="inline-block whitespace-nowrap"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {chars}
                        {wordIdx < line.text.split(" ").length - 1 ? (
                          <span>&nbsp;</span>
                        ) : null}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-lg text-base lg:text-lg text-washi/85 leading-relaxed"
            style={{ textShadow: "0 2px 16px rgba(10,9,8,0.85)" }}
          >
            A small studio that forges hand-crafted, themed landing pages.
            One page, one purpose, sharpened until it cuts.
          </motion.p>

          <motion.a
            href="#duel"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
            className="group mt-10 inline-flex items-center gap-3 text-[var(--color-gold)] text-base hover:text-[var(--color-ember)] transition-colors"
          >
            <span className="border-b border-[var(--color-gold)]/40 pb-1 group-hover:border-[var(--color-ember)] transition-colors">
              Begin the brief
            </span>
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              →
            </motion.span>
          </motion.a>
        </div>

        <div className="flex items-end justify-between gap-6">
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1.2, delay: 2.4 }}
            className="eyebrow-mist"
          >
            EST. 2026 · TOKYO ↔ MADRID
          </motion.div>
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1.2, delay: 2.4 }}
            className="eyebrow-mist flex items-center gap-2"
          >
            <span>SCROLL</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              ↓
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
