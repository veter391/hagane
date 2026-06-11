import type { Metadata } from "next";
import Link from "next/link";
import { PageStage } from "../_components/effects/PageStage";
import { Reveal } from "../_components/effects/Reveal";
import { Kanji } from "../_components/ui/Kanji";

export const metadata: Metadata = {
  title: "The Way",
  description:
    "Why a web studio behaves like a sword forge. The five rings, the process, the code, and the questions asked at the gate.",
};

const WHY_PARAGRAPHS = [
  "Two of us came from big agencies. The kind with forty-slide decks, six-week discovery phases, and a different face in every meeting. The work shipped, mostly. It just never felt held.",
  "A sword smith holds one blade at a time. Knows where the steel came from. Signs the tang where nobody sees it. We wanted to build websites the way that smith builds blades — few at a time, fully held, signed in the hidden places.",
  "So we built a forge instead of an agency. Two commissions per quarter. Every line of type, every easing curve, every shadow chosen by the same two pairs of hands that answer your mail.",
  "Small is not our limitation. It is the entire point.",
];

const RINGS = [
  {
    kanji: "地",
    element: "EARTH",
    name: "Brand landing pages",
    description:
      "The foundation. One page that says one true thing so clearly the visitor stops scrolling. Most commissions begin here.",
  },
  {
    kanji: "水",
    element: "WATER",
    name: "Portfolio sites",
    description:
      "Shape that fits its content like water fits a vessel. For potters, photographers, writers — anyone whose work must speak before they do.",
  },
  {
    kanji: "火",
    element: "FIRE",
    name: "Launch and campaign sites",
    description:
      "Built for a moment of strike. A product launch, a book release, a fund announcement. Fast to forge, sharp on the day, graceful after.",
  },
  {
    kanji: "風",
    element: "WIND",
    name: "Personal sites",
    description: "Light, particular, alive. The web equivalent of a hand-written letter.",
  },
  {
    kanji: "空",
    element: "VOID",
    name: "Custom commission",
    description:
      "The ring without a name. Bring a vision we have not seen; if it is honest work, we will forge it.",
  },
];

const STAGES = [
  {
    number: "01",
    kanji: "鋼",
    name: "Raw Steel",
    description:
      "A 30-minute call, or three honest lines by mail. We listen, we ask what the thing must DO, and we tell you plainly if we are not the right forge. If we are, you receive one page describing the blade: scope, dates, price. No decks.",
  },
  {
    number: "02",
    kanji: "折",
    name: "Folded",
    description:
      "We design in the open. Twice a week you see the blade folded — type, motion, structure. You speak; we fold again. This is the only stage where speed is not a virtue.",
  },
  {
    number: "03",
    kanji: "焼",
    name: "Tempered",
    description:
      "We build. Strict types, real performance budgets, accessibility as a habit not a feature. You watch it harden on a private staging link.",
  },
  {
    number: "04",
    kanji: "研",
    name: "Polished",
    description:
      "We polish until you stop noticing the polish, hand you the keys, and teach you to hold them. Thirty days of free sharpening after launch — small cuts, no invoice.",
  },
];

const CODE = [
  {
    line: "We measure twice. We cut once.",
    note: "Scope is agreed before steel is heated. Changes are honest conversations, not surprise invoices.",
  },
  {
    line: "The site that survives is the site forged with restraint.",
    note: "Every effect must earn its weight in meaning or milliseconds.",
  },
  {
    line: "No ornament without function.",
    note: "If removing it changes nothing, it was already gone.",
  },
  {
    line: "Speed without grace is noise.",
    note: "Fast is the floor. Graceful is the craft.",
  },
  {
    line: "We finish what we begin.",
    note: "No commission has ever been left on the anvil.",
  },
];

const FAQ = [
  {
    question: "How much does a forging cost?",
    answer:
      "Each blade is priced as one number before work begins — no hourly meters running in the dark. Brand landings begin where a good laptop ends; full commissions vary with scope. Ask, and you will have the number in two days.",
  },
  {
    question: "How long does it take?",
    answer:
      "Three to five weeks for most blades. We take two commissions per quarter, so the forge is never crowded and your work is never queued behind someone louder.",
  },
  {
    question: "Do you work with agencies?",
    answer:
      "Sometimes, quietly. If you need a blade forged under your own banner, we can be the smiths nobody sees. The tang is still signed.",
  },
  {
    question: "What if I already have a site?",
    answer:
      "Then something brought you here anyway. Old blades can be reforged — sometimes that is the better commission.",
  },
  {
    question: "Why the samurai theatre?",
    answer:
      "Because discipline enjoys good clothes. Strip the kanji away and what remains is the actual practice: few commissions, full attention, finished work. The theatre just makes the promise memorable — and public promises are harder to break.",
  },
];

export default function WayPage() {
  return (
    <>
      <PageStage image="/img/way-smith.webp" weather="embers" position="center 40%" />

      <main className="relative">
        {/* ===== 1 · HERO ===== */}
        <section
          id="way-hero"
          className="relative flex min-h-screen items-end overflow-hidden px-6 pb-24 pt-32 lg:px-16"
        >
          <Kanji
            char="道"
            className="absolute -right-[10%] top-[18%] text-[clamp(18rem,38vw,38rem)]"
            style={{ opacity: 0.08 }}
          />

          <div className="relative z-10 w-full max-w-6xl">
            <Reveal>
              <div className="chapter-label">道 · THE WAY OF THE FORGE</div>
            </Reveal>

            <div className="relative mt-10">
              <span
                aria-hidden
                className="text-outline display-heading pointer-events-none absolute -left-[1%] -top-[42%] z-0 select-none whitespace-nowrap text-[clamp(5.5rem,15vw,15rem)] opacity-50"
              >
                MICHI
              </span>
              <Reveal delay={0.05} className="relative z-10">
                <h1 className="display-heading text-[clamp(4rem,11vw,11rem)] text-washi">
                  The Way.
                </h1>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="text-gold-sheen display-heading mt-8 max-w-xl text-2xl">
                Why a web studio behaves like a sword forge.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ===== 2 · WHY WE FORGE ===== */}
        <section id="why" className="relative px-6 py-28 lg:px-16 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="eyebrow">起 · WHY</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-heading mt-6 text-4xl text-washi lg:text-5xl">
                Why we forge.
              </h2>
            </Reveal>

            <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[40%_60%]">
              <div aria-hidden className="relative hidden lg:block">
                <Kanji
                  char="心"
                  className="sticky top-32 block text-[clamp(10rem,20vw,20rem)]"
                  style={{ opacity: 0.15 }}
                />
              </div>

              <div className="flex max-w-2xl flex-col gap-y-9">
                <Reveal>
                  <p className="display-heading text-2xl text-washi">
                    {WHY_PARAGRAPHS[0]}
                  </p>
                </Reveal>
                {WHY_PARAGRAPHS.slice(1).map((paragraph, i) => (
                  <Reveal key={paragraph.slice(0, 24)} delay={0.05 * (i + 1)}>
                    <p className="text-lg text-mist">{paragraph}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== 3 · THE FIVE RINGS ===== */}
        <section
          id="rings"
          className="relative overflow-hidden px-6 py-28 lg:px-16 lg:py-36"
        >
          <div
            aria-hidden
            className="vertical-jp pointer-events-none absolute right-8 top-32 hidden select-none text-sm text-mist/20 lg:block"
          >
            五輪の書
          </div>

          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="eyebrow">五輪 · THE FIVE RINGS</div>
            </Reveal>

            <div className="relative mt-6">
              <span
                aria-hidden
                className="text-outline display-heading pointer-events-none absolute -left-[1%] -top-[55%] z-0 select-none whitespace-nowrap text-[clamp(4rem,9vw,9rem)] opacity-40"
              >
                GORIN
              </span>
              <Reveal delay={0.05} className="relative z-10">
                <h2 className="display-heading text-4xl text-washi lg:text-5xl">
                  The five rings.
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg text-mist">
                Five kinds of commission. Five disciplines. Musashi wrote that
                the warrior who knows one ring knows a wall; the one who knows
                five knows a way through.
              </p>
            </Reveal>

            <div className="mt-20">
              {RINGS.map((ring, i) => {
                const flipped = i % 2 === 1;
                return (
                  <Reveal key={ring.kanji}>
                    <div
                      className={`grid grid-cols-1 items-center gap-x-16 gap-y-6 border-t border-steel/20 py-14 ${
                        flipped
                          ? "lg:grid-cols-[1fr_minmax(9rem,14rem)]"
                          : "lg:grid-cols-[minmax(9rem,14rem)_1fr]"
                      }`}
                    >
                      <div
                        className={
                          flipped
                            ? "lg:order-2 lg:justify-self-end"
                            : "lg:order-1"
                        }
                      >
                        <Kanji
                          char={ring.kanji}
                          className="block text-[clamp(6rem,9vw,9rem)]"
                          style={{ opacity: 0.2 }}
                        />
                      </div>

                      <div
                        className={
                          flipped
                            ? "lg:order-1 lg:pl-[8%]"
                            : "lg:order-2 lg:pr-[8%]"
                        }
                      >
                        <p className="eyebrow-mist">
                          {ring.element} · {ring.kanji}
                        </p>
                        <h3 className="display-heading mt-3 text-3xl text-washi lg:text-4xl">
                          {ring.name}
                        </h3>
                        <p className="mt-4 max-w-lg text-mist">
                          {ring.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== 4 · HOW A COMMISSION RUNS ===== */}
        <section id="process" className="relative px-6 py-28 lg:px-16 lg:py-36">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="eyebrow">工程 · THE PROCESS</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-heading mt-6 text-4xl text-washi lg:text-5xl">
                How a commission runs.
              </h2>
            </Reveal>

            <div className="mt-20">
              {STAGES.map((stage, i) => (
                <Reveal key={stage.number} delay={0.04 * i}>
                  <div className="grid grid-cols-1 gap-y-5 border-t border-steel/20 py-12 lg:grid-cols-[8rem_1fr] lg:gap-x-12">
                    <div className="flex flex-row items-baseline gap-5 lg:flex-col lg:items-start lg:gap-3">
                      <span className="font-mono text-sm tracking-[0.3em] text-gold">
                        {stage.number}
                      </span>
                      <Kanji
                        char={stage.kanji}
                        className="text-5xl lg:text-6xl"
                        style={{ opacity: 0.4 }}
                      />
                    </div>

                    <div>
                      <h3 className="display-heading text-2xl text-washi">
                        {stage.name}
                      </h3>
                      <p className="mt-4 max-w-2xl text-mist">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 5 · THE CODE ===== */}
        <section
          id="code"
          className="relative px-6 py-28 text-center lg:px-16 lg:py-36"
        >
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="eyebrow">掟 · THE CODE</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-heading mt-6 text-4xl text-washi lg:text-5xl">
                The code.
              </h2>
            </Reveal>

            <div className="mt-20 flex flex-col gap-y-16">
              {CODE.map((principle, i) => (
                <Reveal key={principle.line} delay={0.04 * i}>
                  <blockquote>
                    <p className="display-heading text-xl text-washi lg:text-2xl">
                      “{principle.line}”
                    </p>
                    <p className="mt-3 text-sm text-mist">{principle.note}</p>
                  </blockquote>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 6 · QUESTIONS AT THE GATE ===== */}
        <section id="gate" className="relative px-6 py-28 lg:px-16 lg:py-36">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="eyebrow">門 · ASKED AT THE GATE</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-heading mt-6 text-4xl text-washi lg:text-5xl">
                Questions at the gate.
              </h2>
            </Reveal>

            <div className="mt-16">
              {FAQ.map((item, i) => (
                <Reveal key={item.question} delay={0.03 * i}>
                  <div className="border-t border-steel/20 py-8">
                    <div className="flex flex-row items-baseline gap-6">
                      <span
                        aria-hidden
                        className="hidden shrink-0 font-mono text-xs tracking-[0.3em] text-mist/50 lg:inline"
                      >
                        問{String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="display-heading text-xl text-washi lg:text-2xl">
                          {item.question}
                        </h3>
                        <p className="mt-4 max-w-2xl text-mist">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 7 · FINAL CTA ===== */}
        <section id="begin" className="relative px-6 py-32 text-center lg:px-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="display-heading text-3xl text-washi lg:text-5xl">
                The forge is lit.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 text-mist">
                One commission this quarter is unclaimed.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <Link
                href="/#duel"
                className="ease-blade mt-12 inline-flex items-center gap-4 border border-gold/40 px-10 py-4 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:border-gold hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                Begin the brief
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
