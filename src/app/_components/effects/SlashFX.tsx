"use client";

import { useEffect, useRef } from "react";

/**
 * Every click is a katana cut.
 *
 * On pointerdown anywhere, a gold blade-arc slashes through the point —
 * a fast streak with a bloom, a handful of sparks, and (if sound is on)
 * a synthesized steel "shing" built in WebAudio. No assets, no network.
 *
 * Sound preference lives in localStorage("hagane-sound") and is toggled
 * by the TopBar button via a "hagane:sound" CustomEvent. Defaults ON,
 * volume is deliberately shy.
 */

type Slash = {
  x: number;
  y: number;
  angle: number;
  born: number;
  len: number;
};

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  born: number;
  life: number;
  size: number;
};

type TrailSeg = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  born: number;
};

const SLASH_MS = 420;
const TRAIL_MS = 280;
const TRAIL_SPEED_THRESHOLD = 1.1; // px per ms — only swift strokes leave steel

function soundEnabled(): boolean {
  try {
    return localStorage.getItem("hagane-sound") !== "0";
  } catch {
    return true;
  }
}

function playShing(ctx: AudioContext) {
  const now = ctx.currentTime;

  // A soft air-whoosh: dark filtered noise with a gentle attack — the
  // sound of a blade moving, not striking. Quiet by design.
  const dur = 0.22;
  const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2.2);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buf;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.setValueAtTime(900, now);
  bp.frequency.exponentialRampToValueAtTime(2200, now + 0.07);
  bp.frequency.exponentialRampToValueAtTime(700, now + dur);
  bp.Q.value = 1.1;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0, now);
  master.gain.linearRampToValueAtTime(0.028, now + 0.015);
  master.gain.exponentialRampToValueAtTime(0.0001, now + dur);

  noise.connect(bp).connect(master);
  master.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + dur);
}

export function SlashFX() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const slashesRef = useRef<Slash[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const trailRef = useRef<TrailSeg[]>([]);
  const lastMoveRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const frameRef = useRef(0);
  const audioRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    enabledRef.current = soundEnabled();
    const onSoundToggle = (e: Event) => {
      enabledRef.current = (e as CustomEvent<boolean>).detail;
    };
    window.addEventListener("hagane:sound", onSoundToggle);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onDown = (e: PointerEvent) => {
      const angle = (Math.random() * 50 - 115) * (Math.PI / 180); // mostly diagonal
      slashesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        angle,
        born: performance.now(),
        len: 130 + Math.random() * 110,
      });
      const sparkCount = 10 + Math.floor(Math.random() * 6);
      for (let i = 0; i < sparkCount; i++) {
        const a = angle + (Math.random() - 0.5) * 1.6;
        const speed = 2 + Math.random() * 6;
        sparksRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          born: performance.now(),
          life: 380 + Math.random() * 320,
          size: 1 + Math.random() * 2,
        });
      }
      if (enabledRef.current) {
        try {
          audioRef.current ??= new AudioContext();
          if (audioRef.current.state === "suspended") {
            void audioRef.current.resume();
          }
          playShing(audioRef.current);
        } catch {
          /* no audio available */
        }
      }
    };
    window.addEventListener("pointerdown", onDown);

    // The hover blade: a swift stroke of the pointer leaves a steel trail
    // along its path — appears with the motion, gone in a breath. If the
    // stroke crosses a data-slice card, the card takes the cut: a gold seam
    // flashes along the blade angle and the card flinches.
    const sliceCard = (e: PointerEvent, dx: number, dy: number) => {
      const target = e.target as Element | null;
      const card = target?.closest?.("[data-slice]") as HTMLElement | null;
      if (!card || card.dataset.sliceCooling === "1") return;
      card.dataset.sliceCooling = "1";

      const rect = card.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      const perp = Math.atan2(dy, dx) + Math.PI / 2;

      card.style.setProperty("--sx", `${px.toFixed(1)}%`);
      card.style.setProperty("--sy", `${py.toFixed(1)}%`);
      card.style.setProperty("--sa", `${angle.toFixed(1)}deg`);
      card.style.setProperty("--fx", `${(Math.cos(perp) * 3).toFixed(1)}px`);
      card.style.setProperty("--fy", `${(Math.sin(perp) * 3).toFixed(1)}px`);
      card.style.setProperty("--fr", `${(Math.random() < 0.5 ? -1 : 1) * 0.5}deg`);
      card.classList.add("slice-hit");

      // The wound stays. A permanent scar at the blade's angle — the card
      // carries every cut until the page is reloaded.
      const scars = card.querySelectorAll(".blade-scar");
      if (scars.length >= 6) scars[0].remove();
      const scar = document.createElement("span");
      scar.className = "blade-scar";
      scar.setAttribute("aria-hidden", "true");
      scar.style.left = `${px.toFixed(1)}%`;
      scar.style.top = `${py.toFixed(1)}%`;
      scar.style.setProperty("--scar-a", `${angle.toFixed(1)}deg`);
      card.appendChild(scar);

      // Sparks burst from the cut point.
      for (let i = 0; i < 7; i++) {
        const a = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.2;
        const speed = 1.5 + Math.random() * 4;
        sparksRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          born: performance.now(),
          life: 320 + Math.random() * 260,
          size: 0.8 + Math.random() * 1.8,
        });
      }

      setTimeout(() => {
        card.classList.remove("slice-hit");
        delete card.dataset.sliceCooling;
      }, 650);
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const prev = lastMoveRef.current;
      lastMoveRef.current = { x: e.clientX, y: e.clientY, t: now };
      if (!prev) return;
      const dt = now - prev.t;
      if (dt <= 0 || dt > 80) return;
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      const speed = Math.hypot(dx, dy) / dt;
      if (speed < TRAIL_SPEED_THRESHOLD) return;
      trailRef.current.push({
        x1: prev.x,
        y1: prev.y,
        x2: e.clientX,
        y2: e.clientY,
        born: now,
      });
      if (trailRef.current.length > 48) trailRef.current.shift();
      sliceCard(e, dx, dy);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = (now: number) => {
      ctx2d.clearRect(0, 0, w, h);

      // Hover trail — tapered steel streaks fading fast.
      trailRef.current = trailRef.current.filter((seg) => {
        const t = (now - seg.born) / TRAIL_MS;
        if (t >= 1) return false;
        const a = (1 - t) * 0.8;
        ctx2d.save();
        ctx2d.globalAlpha = a;
        const grad = ctx2d.createLinearGradient(seg.x1, seg.y1, seg.x2, seg.y2);
        grad.addColorStop(0, "rgba(232,193,113,0)");
        grad.addColorStop(0.5, "rgba(255,243,214,0.9)");
        grad.addColorStop(1, "rgba(232,193,113,0.15)");
        ctx2d.strokeStyle = grad;
        ctx2d.lineWidth = 1.6 * (1 - t * 0.6);
        ctx2d.lineCap = "round";
        ctx2d.shadowColor = "rgba(232,193,113,0.7)";
        ctx2d.shadowBlur = 10;
        ctx2d.beginPath();
        ctx2d.moveTo(seg.x1, seg.y1);
        ctx2d.lineTo(seg.x2, seg.y2);
        ctx2d.stroke();
        ctx2d.restore();
        return true;
      });

      slashesRef.current = slashesRef.current.filter((s) => {
        const t = (now - s.born) / SLASH_MS;
        if (t >= 1) return false;

        // The streak extends fast, then fades.
        const grow = Math.min(1, t * 2.6);
        const fade = t < 0.55 ? 1 : 1 - (t - 0.55) / 0.45;
        const half = s.len * grow;
        const dx = Math.cos(s.angle) * half;
        const dy = Math.sin(s.angle) * half;

        ctx2d.save();
        ctx2d.globalAlpha = fade;
        const grad = ctx2d.createLinearGradient(
          s.x - dx, s.y - dy, s.x + dx, s.y + dy,
        );
        grad.addColorStop(0, "rgba(232,193,113,0)");
        grad.addColorStop(0.5, "rgba(255,243,214,0.95)");
        grad.addColorStop(1, "rgba(232,193,113,0)");
        ctx2d.strokeStyle = grad;
        ctx2d.lineWidth = 2.2 * (1 - t * 0.5);
        ctx2d.shadowColor = "rgba(232,193,113,0.9)";
        ctx2d.shadowBlur = 18;
        ctx2d.beginPath();
        ctx2d.moveTo(s.x - dx, s.y - dy);
        ctx2d.lineTo(s.x + dx, s.y + dy);
        ctx2d.stroke();
        ctx2d.restore();
        return true;
      });

      sparksRef.current = sparksRef.current.filter((p) => {
        const t = (now - p.born) / p.life;
        if (t >= 1) return false;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
        p.vx *= 0.97;
        const a = (1 - t) * 0.9;
        const g = ctx2d.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.2);
        g.addColorStop(0, `rgba(255,222,150,${a})`);
        g.addColorStop(1, "rgba(226,82,30,0)");
        ctx2d.fillStyle = g;
        ctx2d.beginPath();
        ctx2d.arc(p.x, p.y, p.size * 3.2, 0, Math.PI * 2);
        ctx2d.fill();
        return true;
      });

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
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hagane:sound", onSoundToggle);
      clearTimeout(rt);
      void audioRef.current?.close();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[105]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
