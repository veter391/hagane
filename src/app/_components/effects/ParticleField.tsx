"use client";

import { useEffect, useRef } from "react";

/**
 * Unified atmospheric particle engine. One canvas, seven weathers.
 *
 * Modes:
 *   petals     — sakura petals, slow fall with sway          (sunset scenes)
 *   fireflies  — drifting motes with pulsing glow            (bamboo dusk)
 *   windPetals — fast horizontal petal streaks               (wind grove)
 *   embers     — rising sparks with flicker                  (the forge)
 *   mist       — large soft orbs drifting laterally          (river / water)
 *   dust       — barely-moving golden motes                  (zen garden dawn)
 *   stars      — sparse slow twinkles                        (predawn torii)
 *
 * mode="scroll" maps the page's scroll progress onto the eight home scenes
 * and lets the weather change as the camera flies between worlds. New
 * particles spawn in the new mode; old ones live out their lives — so a
 * boundary crossing feels like weather shifting, not a hard cut.
 */

export type ParticleMode =
  | "petals"
  | "fireflies"
  | "windPetals"
  | "embers"
  | "mist"
  | "dust"
  | "stars";

const SCENE_WEATHER: ParticleMode[] = [
  "petals", // hero — sunset cliff
  "fireflies", // manifesto — bamboo dusk
  "windPetals", // five crafts — wind grove
  "embers", // forge
  "mist", // recent cuts — river
  "dust", // bushido — zen garden
  "stars", // duel — torii predawn
  "embers", // footer — dim forge
];

type P = {
  mode: ParticleMode;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  seed: number;
};

const TARGET_COUNT: Record<ParticleMode, number> = {
  petals: 55,
  fireflies: 36,
  windPetals: 70,
  embers: 60,
  mist: 14,
  dust: 80,
  stars: 40,
};

function spawn(mode: ParticleMode, w: number, h: number, initial = false): P {
  const seed = Math.random();
  const base: P = {
    mode,
    x: Math.random() * w,
    y: Math.random() * h,
    vx: 0,
    vy: 0,
    size: 1,
    life: initial ? Math.random() * 4000 : 0,
    maxLife: 6000 + Math.random() * 6000,
    seed,
  };
  switch (mode) {
    case "petals":
      return { ...base, y: initial ? Math.random() * h : -20, vy: 0.5 + seed * 1.3, vx: (seed - 0.5) * 0.5, size: 3 + seed * 7 };
    case "fireflies":
      return { ...base, vx: (seed - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.3, size: 1.5 + seed * 2.5, maxLife: 5000 + seed * 5000 };
    case "windPetals":
      return { ...base, x: initial ? Math.random() * w : -30, vx: 3.2 + seed * 4.5, vy: (Math.random() - 0.35) * 0.8, size: 2.5 + seed * 5, maxLife: 4000 + seed * 3000 };
    case "embers":
      return { ...base, y: initial ? Math.random() * h : h + 15, vy: -(0.5 + seed * 1.6), vx: (Math.random() - 0.5) * 0.55, size: 1 + seed * 2.4, maxLife: 4000 + seed * 5000 };
    case "mist":
      return { ...base, vx: 0.12 + seed * 0.3, vy: (Math.random() - 0.5) * 0.05, size: 90 + seed * 180, maxLife: 14000 + seed * 8000 };
    case "dust":
      return { ...base, vx: (seed - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.1, size: 0.8 + seed * 1.6, maxLife: 9000 + seed * 7000 };
    case "stars":
      return { ...base, y: Math.random() * h * 0.75, vx: 0, vy: 0.02, size: 0.8 + seed * 1.8, maxLife: 7000 + seed * 7000 };
  }
}

function draw(ctx: CanvasRenderingContext2D, p: P, t: number) {
  const lifeT = p.life / p.maxLife;
  const fadeIn = Math.min(1, p.life / 800);
  const fadeOut = lifeT > 0.78 ? 1 - (lifeT - 0.78) / 0.22 : 1;
  const alpha = fadeIn * fadeOut;
  if (alpha <= 0.01) return;

  switch (p.mode) {
    case "petals":
    case "windPetals": {
      const rot = p.seed * Math.PI * 2 + t * 0.0006 * (p.seed > 0.5 ? 1 : -1) * (p.mode === "windPetals" ? 4 : 1);
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha * (0.4 + p.seed * 0.45);
      const g = ctx.createLinearGradient(0, -p.size, 0, p.size);
      g.addColorStop(0, "rgba(232,193,113,0.9)");
      g.addColorStop(0.55, "rgba(216,177,189,0.95)");
      g.addColorStop(1, "rgba(196,77,31,0.55)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.quadraticCurveTo(p.size * 0.7, -p.size * 0.3, 0, p.size);
      ctx.quadraticCurveTo(-p.size * 0.7, -p.size * 0.3, 0, -p.size);
      ctx.fill();
      ctx.restore();
      break;
    }
    case "fireflies": {
      const pulse = 0.45 + 0.55 * Math.sin(t * 0.003 + p.seed * 20);
      const a = alpha * pulse;
      const r = p.size * (2 + pulse * 2);
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3);
      g.addColorStop(0, `rgba(255,238,170,${0.85 * a})`);
      g.addColorStop(0.4, `rgba(232,193,113,${0.4 * a})`);
      g.addColorStop(1, "rgba(232,193,113,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "embers": {
      const flick = 0.7 + 0.3 * Math.sin(t * 0.01 + p.seed * 40);
      const a = alpha * flick;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
      g.addColorStop(0, `rgba(255,200,110,${0.85 * a})`);
      g.addColorStop(0.5, `rgba(226,82,30,${0.5 * a})`);
      g.addColorStop(1, "rgba(184,52,26,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = a;
      ctx.fillStyle = "rgba(255,222,150,1)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      break;
    }
    case "mist": {
      const a = alpha * 0.05;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      g.addColorStop(0, `rgba(200,205,215,${a})`);
      g.addColorStop(1, "rgba(200,205,215,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "dust": {
      const a = alpha * (0.25 + 0.3 * Math.sin(t * 0.002 + p.seed * 30));
      ctx.globalAlpha = Math.max(0, a);
      ctx.fillStyle = "rgba(232,193,113,1)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      break;
    }
    case "stars": {
      const tw = 0.3 + 0.7 * Math.abs(Math.sin(t * 0.0015 + p.seed * 50));
      const a = alpha * tw;
      ctx.globalAlpha = a;
      ctx.fillStyle = "rgba(245,236,217,1)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5);
      g.addColorStop(0, `rgba(232,193,113,${0.3 * a})`);
      g.addColorStop(1, "rgba(232,193,113,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      break;
    }
  }
}

function step(p: P, dt: number, w: number, h: number, t: number) {
  const k = dt / 16;
  switch (p.mode) {
    case "petals":
      p.x += (p.vx + Math.sin(p.y * 0.012 + p.seed * 8) * 0.45) * k;
      p.y += p.vy * k;
      break;
    case "windPetals":
      p.x += p.vx * k;
      p.y += (p.vy + Math.sin(p.x * 0.01 + p.seed * 6) * 0.5) * k;
      break;
    case "fireflies":
      p.x += (p.vx + Math.sin(t * 0.001 + p.seed * 25) * 0.25) * k;
      p.y += (p.vy + Math.cos(t * 0.0013 + p.seed * 18) * 0.22) * k;
      break;
    case "embers":
      p.x += p.vx * k;
      p.y += p.vy * k;
      p.vy -= 0.004 * k;
      break;
    case "mist":
      p.x += p.vx * k;
      p.y += p.vy * k;
      break;
    case "dust":
      p.x += (p.vx + Math.sin(t * 0.0008 + p.seed * 40) * 0.06) * k;
      p.y += (p.vy + Math.cos(t * 0.001 + p.seed * 30) * 0.05) * k;
      break;
    case "stars":
      p.y += p.vy * k;
      break;
  }
  // wrap
  if (p.x < -220) p.x = w + 200;
  else if (p.x > w + 220) p.x = -200;
  if (p.y > h + 220) p.y = -60;
  else if (p.y < -240) p.y = h + 60;
}

export function ParticleField({
  mode,
  className = "",
}: {
  mode: ParticleMode | "scroll";
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;
    // Mobile particle budget — fewer particles below 768px.
    const budget = window.innerWidth < 768 ? 0.45 : 1;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const currentMode = (): ParticleMode => {
      if (mode !== "scroll") return mode;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const prog = max > 0 ? window.scrollY / max : 0;
      const idx = Math.max(0, Math.min(SCENE_WEATHER.length - 1, Math.floor(prog * SCENE_WEATHER.length)));
      return SCENE_WEATHER[idx];
    };

    let particles: P[] = [];
    const initMode = currentMode();
    for (let i = 0; i < Math.round(TARGET_COUNT[initMode] * budget); i++) {
      particles.push(spawn(initMode, w, h, true));
    }

    // Scroll-wind: fast scrolling gusts through the weather. The gust value
    // chases scroll velocity and decays — petals streak, embers scatter.
    let lastScrollY = window.scrollY;
    let gust = 0;

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(40, now - last);
      last = now;
      const m = currentMode();
      const target = Math.round(TARGET_COUNT[m] * budget);

      const sy = window.scrollY;
      const scrollDelta = sy - lastScrollY;
      lastScrollY = sy;
      const targetGust = Math.max(-1, Math.min(1, scrollDelta / 60));
      gust += (targetGust - gust) * 0.12;

      ctx.clearRect(0, 0, w, h);

      particles = particles.filter((p) => {
        p.life += dt;
        if (p.life > p.maxLife) return false;
        step(p, dt, w, h, now);
        // Wind shear from scrolling — vertical drag plus a sideways push.
        if (Math.abs(gust) > 0.02 && p.mode !== "mist") {
          p.y -= gust * (3.5 + p.seed * 5) * (dt / 16);
          p.x += gust * (p.seed - 0.5) * 2.4 * (dt / 16);
        }
        draw(ctx, p, now);
        return true;
      });

      const alive = particles.length;
      if (alive < target) {
        const deficit = target - alive;
        const burst = Math.min(3, deficit);
        for (let i = 0; i < burst; i++) particles.push(spawn(m, w, h));
      }

      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);

    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(resize, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
      clearTimeout(rt);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[80] ${className}`}
      style={{ mixBlendMode: "screen" }}
    />
  );
}
