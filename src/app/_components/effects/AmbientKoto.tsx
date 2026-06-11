"use client";

import { useEffect, useRef } from "react";

/**
 * 琴 — ambience under the sakura.
 *
 * A real koto recording (royalty-free, Pixabay Content License — free for
 * commercial use, no attribution required) looping quietly under the site.
 *
 * Behaviour:
 *  - arms on the first pointerdown (browser autoplay policy)
 *  - fades in over ~6s to a deliberately shy volume
 *  - the TopBar 音/静 toggle fades it in/out ("hagane:sound" event)
 *  - tab hidden → fades to silence, returns when you come back
 *  - reduced-motion users are left in peace
 */

const TRACK = "/audio/ambient-koto.mp3";
const LEVEL = 0.16;
const FADE_MS = 6000;

function soundEnabled(): boolean {
  try {
    return localStorage.getItem("hagane-sound") !== "0";
  } catch {
    return true;
  }
}

export function AmbientKoto() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const enabledRef = useRef(true);
  const armedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    enabledRef.current = soundEnabled();

    const fadeTo = (target: number, ms: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (fadeRef.current) clearInterval(fadeRef.current);
      const stepMs = 80;
      const steps = Math.max(1, Math.round(ms / stepMs));
      const delta = (target - audio.volume) / steps;
      let i = 0;
      fadeRef.current = setInterval(() => {
        const a = audioRef.current;
        if (!a) return;
        i += 1;
        a.volume = Math.max(0, Math.min(1, a.volume + delta));
        if (i >= steps) {
          a.volume = target;
          if (fadeRef.current) clearInterval(fadeRef.current);
          if (target === 0) a.pause();
        }
      }, stepMs);
    };

    const arm = () => {
      if (armedRef.current) return;
      armedRef.current = true;
      const audio = new Audio(TRACK);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0;
      audioRef.current = audio;
      if (enabledRef.current) {
        void audio.play().then(() => fadeTo(LEVEL, FADE_MS)).catch(() => {
          armedRef.current = false;
        });
      }
      window.removeEventListener("pointerdown", arm);
    };
    window.addEventListener("pointerdown", arm);

    const onToggle = (e: Event) => {
      enabledRef.current = (e as CustomEvent<boolean>).detail;
      const audio = audioRef.current;
      if (!armedRef.current || !audio) return;
      if (enabledRef.current) {
        void audio.play().then(() => fadeTo(LEVEL, 1500)).catch(() => undefined);
      } else {
        fadeTo(0, 1200);
      }
    };
    window.addEventListener("hagane:sound", onToggle);

    const onVisibility = () => {
      const audio = audioRef.current;
      if (!armedRef.current || !audio) return;
      if (document.hidden) {
        fadeTo(0, 400);
      } else if (enabledRef.current) {
        void audio.play().then(() => fadeTo(LEVEL, 2500)).catch(() => undefined);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("hagane:sound", onToggle);
      document.removeEventListener("visibilitychange", onVisibility);
      if (fadeRef.current) clearInterval(fadeRef.current);
      audioRef.current?.pause();
      audioRef.current = null;
      armedRef.current = false;
    };
  }, []);

  return null;
}
