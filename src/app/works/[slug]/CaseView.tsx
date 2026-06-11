"use client";

import Link from "next/link";
import { PageStage } from "../../_components/effects/PageStage";
import { Reveal } from "../../_components/effects/Reveal";
import { Kanji } from "../../_components/ui/Kanji";
import type { CaseStudy } from "../../_lib/cases";

export function CaseView({
  case: c,
  next,
}: {
  case: CaseStudy;
  next: CaseStudy;
}) {
  return (
    <>
      <PageStage image={c.heroImage} weather={c.weather} />

      <main className="relative z-10">
        {/* ===== HERO ===== */}
        <section className="relative flex min-h-screen items-end overflow-hidden px-6 pb-24 pt-32 lg:px-16">
          <span
            aria-hidden
            className="text-outline display-heading pointer-events-none absolute left-0 top-[18%] z-0 select-none whitespace-nowrap text-[clamp(7rem,20vw,18rem)] opacity-60"
          >
            {c.element}
          </span>

          <Kanji
            char={c.elementKanji}
            className="absolute -right-[8%] top-1/2 -translate-y-1/2 text-[clamp(16rem,30vw,30rem)] leading-[0.8]"
            style={{ opacity: 0.1 }}
          />

          <div className="relative z-10 max-w-5xl">
            <Reveal>
              <div className="chapter-label">
                {c.number} · {c.element} — A FORGING
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="display-heading mt-7 text-[clamp(3.5rem,10vw,10rem)] text-washi">
                {c.title}
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="display-heading text-gold-sheen mt-8 text-2xl">
                {c.poetic}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ===== ARRIVAL ===== */}
        <section className="relative px-6 py-32 lg:px-16">
          <div className="max-w-2xl lg:ml-[14%]">
            <Reveal>
              <p className="eyebrow mb-10">如何 · HOW IT ARRIVED</p>
            </Reveal>

            {c.arrival.map((p, i) => (
              <Reveal key={i} delay={0.05 * (i + 1)}>
                {p.startsWith("“") ? (
                  <p className="display-heading mb-8 text-2xl text-washi lg:text-3xl">
                    {p}
                  </p>
                ) : (
                  <p className="mb-8 text-lg text-mist">{p}</p>
                )}
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== FOUR STAGES ===== */}
        <section className="relative">
          {c.stages.map((stage, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={stage.name}
                className="border-t border-steel/20 px-6 py-20 lg:px-16"
              >
                <Reveal>
                  <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-20">
                    <div
                      className={
                        reversed ? "lg:order-2 lg:text-right" : undefined
                      }
                    >
                      <Kanji
                        char={stage.kanji}
                        className="block text-[clamp(6rem,10vw,10rem)] leading-[0.85]"
                        style={{ opacity: 0.22, color: "var(--color-gold)" }}
                      />
                      <h2 className="display-heading mt-6 text-3xl text-washi lg:text-5xl">
                        {stage.name}
                      </h2>
                    </div>

                    <div
                      className={
                        reversed ? "lg:order-1" : "lg:justify-self-end"
                      }
                    >
                      {stage.body.map((p, j) => (
                        <p
                          key={j}
                          className="mb-7 max-w-xl text-lg leading-relaxed text-mist"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </section>

        {/* ===== STEEL FACTS ===== */}
        <section className="relative px-6 py-24 lg:px-16">
          <Reveal>
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px lg:grid-cols-4">
              {c.steel.map((fact, i) => (
                <div
                  key={fact.label}
                  className={`px-6 py-8 ${
                    i % 2 === 1
                      ? "border-l border-steel/30"
                      : i > 0
                        ? "lg:border-l lg:border-steel/30"
                        : ""
                  }`}
                >
                  <p className="eyebrow-mist mb-4">{fact.label}</p>
                  <p
                    className={`display-heading text-2xl lg:text-4xl ${
                      i === c.steel.length - 1 ? "text-gold" : "text-washi"
                    }`}
                  >
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ===== PARTING ===== */}
        <section className="relative px-6 py-32 text-center lg:px-16">
          <Reveal>
            <span aria-hidden className="mx-auto mb-14 block h-px w-16 bg-blade/40" />
            <p className="display-heading text-gold-sheen mx-auto max-w-3xl text-2xl lg:text-4xl">
              {c.parting}
            </p>
            <span aria-hidden className="mx-auto mt-14 block h-px w-16 bg-blade/40" />
          </Reveal>
        </section>

        {/* ===== NEXT CASE ===== */}
        <section className="relative border-t border-steel/30 px-6 py-24 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="eyebrow mb-8">NEXT FORGING</p>
            </Reveal>

            <Reveal delay={0.06}>
              <Link
                href={`/works/${next.slug}`}
                className="display-heading inline-block text-4xl text-washi transition-colors duration-500 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold lg:text-7xl"
              >
                {next.title}
              </Link>
            </Reveal>

            <Reveal delay={0.12}>
              <Link
                href="/works"
                className="mt-12 inline-block font-mono text-[0.7rem] tracking-[0.22em] text-mist transition-colors duration-300 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                ← All works
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
