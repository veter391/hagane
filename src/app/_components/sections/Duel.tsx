"use client";

import { Reveal } from "../effects/Reveal";
import { Kanji } from "../ui/Kanji";
import { motion, useReducedMotion } from "framer-motion";
import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "ok" | "error";

export function Duel() {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      project: String(data.get("project") ?? "").trim(),
      brief: String(data.get("brief") ?? "").trim(),
    };

    const endpoint =
      process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ??
      "https://hagane-contact.nazdev405.workers.dev";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(
          (json && typeof json.error === "string" && json.error) ||
            "Something went wrong. Try again."
        );
        setStatus("error");
        return;
      }
      setStatus("ok");
    } catch {
      setErrorMsg("Something went wrong. Try again.");
      setStatus("error");
    }
  }

  const formInitial = reduced ? false : { opacity: 0, y: 16 };
  const formAnimate = reduced ? undefined : { opacity: 1, y: 0 };

  return (
    <section
      id="duel"
      className="relative min-h-screen w-full overflow-hidden px-6 py-32 lg:px-16 lg:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute z-[6] right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-6 font-mono text-[0.7rem] tracking-[0.4em] text-mist/20 lg:flex"
      >
        <span>戦</span>
        <span className="text-mist/15">·</span>
        <span>鋼</span>
        <span className="text-mist/15">·</span>
        <span>切</span>
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative z-10">
          <span
            aria-hidden
            className="text-outline display-heading pointer-events-none absolute -left-[2%] -top-[10%] z-0 select-none whitespace-nowrap text-[clamp(8rem,18vw,18rem)] opacity-50"
          >
            DUEL
          </span>

          <Reveal className="relative z-10 mb-8">
            <div className="chapter-label">第七章 · CHAPTER 07 — THE DUEL</div>
          </Reveal>

          <Reveal delay={0.05} className="relative z-10">
            <h2 className="display-heading text-5xl text-washi lg:text-7xl">
              Step into the forge.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="relative z-10">
            <p className="mt-6 max-w-md text-base text-mist">
              Tell us what you want forged. We reply within one business day.
            </p>
          </Reveal>

          <div className="relative z-10 mt-14 max-w-xl">
            {status === "ok" ? (
              <motion.div
                initial={formInitial}
                animate={formAnimate}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative border border-steel/40 bg-ash/60 px-8 py-14"
              >
                <Kanji
                  char="完"
                  className="text-gold-sheen absolute -right-2 -top-6 text-[9rem] leading-none"
                  style={{ opacity: 0.5 }}
                />
                <p className="eyebrow mb-5">FORGE · 受 JU</p>
                <p className="display-heading text-4xl text-washi lg:text-5xl">
                  Received.
                </p>
                <p className="mt-5 max-w-sm text-base text-mist">
                  We will reply within one business day. The forge does not rush.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={formInitial}
                animate={formAnimate}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={onSubmit}
                noValidate
                className="flex flex-col gap-y-6"
              >
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="duel-name" className="eyebrow">
                    NAME · 名
                  </label>
                  <div className="brush-wrap">
                    <input
                      id="duel-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      autoComplete="name"
                      className="brush-field"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-y-2">
                  <label htmlFor="duel-email" className="eyebrow">
                    EMAIL · 文
                  </label>
                  <div className="brush-wrap">
                    <input
                      id="duel-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@studio.com"
                      autoComplete="email"
                      className="brush-field"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-y-2">
                  <label htmlFor="duel-project" className="eyebrow">
                    PROJECT · 道
                  </label>
                  <div className="brush-wrap">
                    <select
                      id="duel-project"
                      name="project"
                      required
                      defaultValue=""
                      className="brush-field"
                    >
                      <option value="" disabled>
                        — Choose a forging —
                      </option>
                      <option value="brand">Brand landing page</option>
                      <option value="portfolio">Portfolio site</option>
                      <option value="launch">Launch / campaign</option>
                      <option value="personal">Personal site</option>
                      <option value="custom">Custom commission</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-y-2">
                  <label htmlFor="duel-brief" className="eyebrow">
                    BRIEF · 言
                  </label>
                  <div className="brush-wrap">
                    <textarea
                      id="duel-brief"
                      name="brief"
                      required
                      rows={5}
                      placeholder="A portfolio for a hand-thrown pottery studio. Calm, slow, full-bleed photos…"
                      className="brush-field resize-none"
                    />
                  </div>
                </div>

                {status === "error" && errorMsg ? (
                  <p className="text-sm text-blood" role="alert">
                    {errorMsg}
                  </p>
                ) : null}

                <div className="mt-4 flex flex-row flex-wrap items-center gap-8">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    aria-busy={status === "sending"}
                    className="hanko shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  >
                    <span aria-hidden className="text-3xl">
                      {status === "sending" ? "待" : "印"}
                    </span>
                    <span className="font-mono text-[0.55rem] tracking-[0.3em]">
                      SEND
                    </span>
                  </button>

                  <p className="max-w-[18rem] font-mono text-[0.7rem] tracking-[0.15em] text-mist/70">
                    By submitting, you accept the studio sees your email. We do
                    not share, ever.
                  </p>
                </div>
              </motion.form>
            )}
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none relative hidden h-full min-h-[60vh] lg:block"
        >
          <Kanji
            char="切"
            className="absolute -bottom-16 left-0 text-[28rem] leading-[0.8]"
            style={{ opacity: 0.07 }}
          />
        </div>
      </div>
    </section>
  );
}
