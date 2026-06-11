"use client";

import { Reveal } from "../effects/Reveal";
import { Kanji } from "../ui/Kanji";
import { motion, useReducedMotion } from "framer-motion";

export function Footer() {
  const reduced = useReducedMotion();
  const year = new Date().getFullYear();

  const links = [
    { label: "Works", href: "/works" },
    { label: "The Way", href: "/way" },
    { label: "Bushidō", href: "#code" },
    { label: "The forge", href: "#process" },
    { label: "Begin the brief", href: "#duel" },
    { label: "Mail", href: "mailto:forge@hagane.studio" },
  ];

  return (
    <section
      id="footer"
      className="relative bg-ash py-16 lg:py-24 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-steel/30"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-wrap items-start gap-x-8 gap-y-6">
            <div className="relative -ml-2 lg:-ml-4">
              <Kanji
                char="鋼"
                className="block text-7xl lg:text-9xl text-blade leading-none"
                style={{ opacity: 0.4 }}
              />
            </div>

            <div className="flex flex-col">
              <motion.span
                initial={reduced ? false : { opacity: 0, x: -12 }}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="display-heading text-4xl text-gold-sheen"
              >
                HAGANE
              </motion.span>
              <span className="mt-4 font-mono text-xs tracking-[0.18em] text-mist">
                Studio — Tokyo ↔ Madrid
              </span>
            </div>

            <span
              aria-hidden
              className="vertical-jp text-[0.7rem] ml-6 hidden lg:block"
              style={{
                color: "color-mix(in srgb, var(--color-gold) 35%, transparent)",
                maxHeight: "8rem",
              }}
            >
              鋼の工房
            </span>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 border-y border-steel/30 py-10 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal delay={0.05} className="lg:col-span-5">
            <p className="display-heading text-xl text-washi/85 leading-snug">
              <span className="text-blade">鋼</span> — Steel from raw ore. Sites
              from raw briefs. We work by appointment with two open commissions
              per quarter.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3 lg:col-start-7">
            <nav aria-label="Footer">
              <ul className="flex flex-col gap-3">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="group inline-flex items-baseline text-sm text-washi/80 transition-colors duration-300 hover:text-blade"
                    >
                      <span className="border-b border-steel/40 pb-1 transition-colors duration-300 group-hover:border-blade/60">
                        {l.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-3 lg:col-start-10">
            <div className="flex flex-col gap-4">
              <span className="eyebrow">EST. 2026 · By appointment only.</span>
              <aside className="text-sm text-mist leading-relaxed">
                Speak in plain language. We answer the same way.
              </aside>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[0.7rem] tracking-[0.18em] text-mist">
              © {year} Hagane Studio · No template. Ever.
            </p>
            <p
              className="font-mono text-[0.7rem] tracking-[0.32em] text-blade/70"
              aria-hidden
            >
              鍛 · 折 · 焼 · 研
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
