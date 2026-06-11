"use client";

import { useEffect, useRef, useState } from "react";

export function BladeCursor() {
  const tipRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (reduced || isTouch) return;
    setEnabled(true);

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      if (tipRef.current) {
        tipRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={trailRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-8 w-8 rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, color-mix(in srgb, var(--color-blade) 25%, transparent), transparent 70%)",
            mixBlendMode: "screen",
          }}
        />
      </div>
      <div
        ref={tipRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[101] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-2 w-2 rotate-45 bg-[var(--color-washi)]"
          style={{ boxShadow: "0 0 12px var(--color-blade)" }}
        />
      </div>
    </>
  );
}
