"use client";

import { useEffect, useRef } from "react";

type Ember = {
  x: number;
  y: number;
  vy: number;
  vx: number;
  life: number;
  maxLife: number;
  size: number;
};

export function Embers({
  density = 1,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const embersRef = useRef<Ember[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const spawn = (n: number) => {
      for (let i = 0; i < n; i++) {
        embersRef.current.push({
          x: Math.random() * w,
          y: h + Math.random() * 20,
          vy: -(0.4 + Math.random() * 1.4),
          vx: (Math.random() - 0.5) * 0.6,
          life: 0,
          maxLife: 120 + Math.random() * 180,
          size: 1 + Math.random() * 2.5,
        });
      }
    };

    let last = performance.now();
    let spawnAccum = 0;
    const baseSpawnRate = 0.6 * density;

    const tick = (now: number) => {
      const dt = Math.min(32, now - last);
      last = now;
      spawnAccum += dt * baseSpawnRate * 0.04;
      while (spawnAccum >= 1) {
        spawn(1);
        spawnAccum -= 1;
      }

      ctx.clearRect(0, 0, w, h);

      embersRef.current = embersRef.current.filter((e) => {
        e.x += e.vx * (dt / 16);
        e.y += e.vy * (dt / 16);
        e.vy -= 0.005 * (dt / 16);
        e.life += dt;
        if (e.life > e.maxLife || e.y < -20) return false;

        const t = e.life / e.maxLife;
        const alpha = (1 - t) * 0.85;
        const r = e.size * (1 - t * 0.4);

        ctx.beginPath();
        const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, r * 4);
        grad.addColorStop(0, `rgba(255, 200, 110, ${alpha})`);
        grad.addColorStop(0.5, `rgba(226, 82, 30, ${alpha * 0.6})`);
        grad.addColorStop(1, `rgba(184, 52, 26, 0)`);
        ctx.fillStyle = grad;
        ctx.arc(e.x, e.y, r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 220, 140, ${alpha})`;
        ctx.arc(e.x, e.y, r, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ mixBlendMode: "screen" }}
    />
  );
}
