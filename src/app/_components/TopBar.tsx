"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/works", label: "Works", kanji: "作" },
  { href: "/way", label: "The Way", kanji: "道" },
] as const;

function readSound(): boolean {
  try {
    return localStorage.getItem("hagane-sound") !== "0";
  } catch {
    return true;
  }
}

/**
 * Slim fixed bar — brand mark left, section links + CTA right.
 * On the home journey it materialises after the hero; on inner pages
 * it is present from the first frame.
 */
export function TopBar() {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [sound, setSound] = useState(true);

  useEffect(() => {
    setSound(readSound());
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    try {
      localStorage.setItem("hagane-sound", next ? "1" : "0");
    } catch {
      /* private mode */
    }
    window.dispatchEvent(new CustomEvent("hagane:sound", { detail: next }));
  };

  const visible = !onHome || scrolled;

  return (
    <motion.header
      initial={false}
      animate={
        visible ? { y: 0, opacity: 1 } : { y: reduced ? 0 : -64, opacity: 0 }
      }
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-[95] pointer-events-none"
    >
      <div
        className="flex items-center justify-between px-6 lg:px-12 h-16"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,9,8,0.82) 0%, rgba(10,9,8,0.5) 70%, transparent 100%)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-3 group"
          aria-label="Hagane — back to the beginning"
        >
          <span
            className="text-2xl transition-transform duration-500 group-hover:rotate-[-6deg]"
            style={{
              fontFamily: "var(--font-kanji)",
              color: "var(--color-gold)",
              fontWeight: 900,
            }}
          >
            鋼
          </span>
          <span
            className="display-heading text-lg tracking-wide"
            style={{ color: "var(--color-washi)" }}
          >
            HAGANE
          </span>
        </Link>

        <nav className="pointer-events-auto flex items-center gap-1 lg:gap-2" aria-label="Primary">
          {LINKS.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-label={l.label}
                className="group inline-flex items-center gap-2 px-3 sm:px-4 py-2 font-mono text-[0.68rem] tracking-[0.2em] uppercase transition-colors duration-300"
                style={{
                  color: active ? "var(--color-gold)" : "var(--color-mist)",
                }}
              >
                <span
                  aria-hidden
                  className="text-base transition-colors duration-300 group-hover:text-[var(--color-gold)]"
                  style={{ fontFamily: "var(--font-kanji)" }}
                >
                  {l.kanji}
                </span>
                <span className="hidden sm:inline transition-colors duration-300 group-hover:text-[var(--color-washi)]">
                  {l.label}
                </span>
              </Link>
            );
          })}

          <button
            type="button"
            onClick={toggleSound}
            aria-label={sound ? "Mute sound" : "Enable sound"}
            aria-pressed={sound}
            className="px-3 py-2 font-mono text-[0.68rem] tracking-[0.2em] transition-colors duration-300"
            style={{
              color: sound ? "var(--color-gold)" : "var(--color-steel)",
              fontFamily: "var(--font-kanji)",
            }}
          >
            {sound ? "音" : "静"}
          </button>

          <Link
            href={onHome ? "#duel" : "/#duel"}
            className="eyebrow ml-1 hidden md:inline-block border border-[color:rgba(232,193,113,0.35)] px-5 py-2.5 transition-all duration-400 hover:border-[var(--color-gold)] hover:bg-[color:rgba(232,193,113,0.08)]"
          >
            Begin the brief
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
