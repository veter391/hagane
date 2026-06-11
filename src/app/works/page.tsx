import type { Metadata } from "next";
import Link from "next/link";
import { PageStage } from "../_components/effects/PageStage";
import { Reveal } from "../_components/effects/Reveal";
import { Kanji } from "../_components/ui/Kanji";
import { CASES } from "../_lib/cases";

export const metadata: Metadata = { title: "Works" };

export default function WorksPage() {
  return (
    <>
      <PageStage image="/img/bg-water.webp" weather="mist" />

      <main className="relative">
        {/* ===== Page hero ===== */}
        <section className="relative flex min-h-[70vh] items-end overflow-hidden px-6 pt-32 pb-20 lg:px-16 lg:pb-28">
          <span
            aria-hidden
            className="text-outline display-heading pointer-events-none absolute left-[2%] top-[18%] z-0 select-none whitespace-nowrap text-[clamp(8rem,20vw,20rem)] leading-none opacity-40"
          >
            WORKS
          </span>

          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <Reveal>
              <div className="chapter-label">作 · THE FORGED WORKS</div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="display-heading mt-6 text-[clamp(3.5rem,9vw,9rem)] text-washi">
                Recent forgings.
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-lg text-base text-mist">
                Three commissions, told the way we remember them — by what
                arrived, what was folded, and what left the forge. Names are
                kept private; the work speaks.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ===== The forged works ===== */}
        <section className="relative px-6 py-24 lg:px-16 lg:py-32">
          <div className="mx-auto flex max-w-7xl flex-col gap-28 lg:gap-44">
            {CASES.map((c, i) => {
              const flip = i % 2 === 1;
              return (
                <Reveal key={c.slug}>
                  <article className="group grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
                    <div
                      data-slice
                      className={`relative aspect-[16/10] overflow-hidden border border-steel/30 ${
                        flip ? "lg:order-2" : ""
                      }`}
                    >
                      <div
                        aria-hidden
                        className="ease-blade absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-[1.04]"
                        style={{ backgroundImage: `url(${c.heroImage})` }}
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(165deg, rgba(10,9,8,0.1) 0%, rgba(10,9,8,0.35) 60%, rgba(10,9,8,0.65) 100%)",
                        }}
                      />
                      <Kanji
                        char={c.elementKanji}
                        className="absolute -bottom-10 right-2 text-[9rem] leading-none lg:text-[12rem]"
                        style={{ opacity: 0.2 }}
                      />
                    </div>

                    <div className={flip ? "lg:order-1" : ""}>
                      <p className="eyebrow-mist">
                        {c.number} · {c.element}
                      </p>

                      <h2 className="display-heading mt-5 text-4xl text-washi lg:text-6xl">
                        <Link
                          href={`/works/${c.slug}`}
                          className="transition-colors duration-500 hover:text-gold"
                        >
                          {c.title}
                        </Link>
                      </h2>

                      <p className="text-gold-sheen display-heading mt-5 text-xl lg:text-2xl">
                        {c.poetic}
                      </p>

                      <p className="mt-5 max-w-md text-base text-mist">
                        {c.oneLiner}
                      </p>

                      <Link
                        href={`/works/${c.slug}`}
                        className="group/link mt-9 inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-gold"
                      >
                        <span className="relative">
                          Read the forging
                          <span
                            aria-hidden
                            className="ease-blade absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover/link:scale-x-100"
                          />
                        </span>
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ===== The fourth blade ===== */}
        <section className="relative w-full overflow-hidden border-y border-steel/30 px-6 py-24 lg:py-32">
          <div className="relative mx-auto max-w-4xl text-center">
            <Kanji
              char="四"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[16rem] leading-none lg:text-[24rem]"
              style={{ opacity: 0.06 }}
            />

            <Reveal className="relative z-10">
              <h2 className="display-heading text-3xl text-washi lg:text-5xl">
                The fourth blade is not forged yet.
              </h2>
              <p className="mx-auto mt-6 max-w-md text-base text-mist">
                It could carry your name. Two commissions are taken per
                quarter; one is open.
              </p>
              <Link
                href="/#duel"
                className="eyebrow mt-12 inline-block border border-[color:rgba(232,193,113,0.35)] px-8 py-4 transition-all duration-400 hover:border-[var(--color-gold)] hover:bg-[color:rgba(232,193,113,0.08)]"
              >
                Begin the brief
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ===== Footer strip ===== */}
        <footer className="px-6 py-16 text-center">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-mist/60">
            鋼 HAGANE · works are told with client consent · EST. 2026
          </p>
        </footer>
      </main>
    </>
  );
}
