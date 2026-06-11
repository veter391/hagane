/**
 * hagane-contact — the forge's letterbox.
 *
 * Accepts POST { name, email, project, brief } from the Hagane site,
 * validates hard, rate-limits per IP, and delivers via Resend — the same
 * provider the shypot.com portfolio already uses, so the sender domain is
 * verified and this stays entirely inside the personal-portfolio world.
 *
 * Graceful start: if RESEND_API_KEY / CONTACT_TO_EMAIL secrets are not set
 * yet, the brief is logged (wrangler tail) and the endpoint still returns
 * ok — the form never breaks while wiring completes.
 */

const PROJECT_KINDS = new Set(["brand", "portfolio", "launch", "personal", "custom"]);

const ALLOWED_ORIGINS = new Set([
  "https://hagane.shypot.com",
  "http://localhost:3000",
  "http://localhost:3088",
]);

// In-memory per-isolate rate limit — adequate for a portfolio letterbox.
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip) {
  const now = Date.now();
  const rec = hits.get(ip) ?? { count: 0, start: now };
  if (now - rec.start > WINDOW_MS) {
    rec.count = 0;
    rec.start = now;
  }
  rec.count += 1;
  hits.set(ip, rec);
  if (hits.size > 5000) hits.clear();
  return rec.count > MAX_PER_WINDOW;
}

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : "https://hagane.shypot.com";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function clean(value, max) {
  if (typeof value !== "string") return "";
  const s = value.trim();
  if (!s || s.length > max) return "";
  return s.replace(/[\r\n]+/g, " ");
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") ?? "";
    const cors = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== "POST") {
      return Response.json({ error: "method-not-allowed" }, { status: 405, headers: cors });
    }

    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    const country = request.headers.get("CF-IPCountry") ?? "??";

    if (rateLimited(ip)) {
      return Response.json({ error: "too-many-requests" }, { status: 429, headers: cors });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return Response.json({ error: "invalid-json" }, { status: 400, headers: cors });
    }

    const name = clean(payload.name, 80);
    const email = clean(payload.email, 160);
    const project = clean(payload.project, 24);
    const brief = typeof payload.brief === "string" ? payload.brief.trim().slice(0, 2000) : "";

    if (!name || !email || !brief) {
      return Response.json({ error: "missing-fields" }, { status: 400, headers: cors });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "bad-email" }, { status: 400, headers: cors });
    }
    if (!PROJECT_KINDS.has(project)) {
      return Response.json({ error: "bad-project" }, { status: 400, headers: cors });
    }

    const subject = `[Hagane] Brief — ${name}`;
    const text = [
      "Hagane · A brief has arrived",
      "================================",
      "",
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Forging: ${project}`,
      "",
      "Brief:",
      "--------------------------------",
      brief,
      "--------------------------------",
      "",
      `IP: ${ip} · ${country}`,
      `At: ${new Date().toISOString()}`,
    ].join("\n");

    const apiKey = env.RESEND_API_KEY;
    const toEmail = env.CONTACT_TO_EMAIL;
    const fromEmail = env.RESEND_FROM ?? "Hagane Forge <forge@shypot.com>";

    if (!apiKey || !toEmail) {
      console.warn("[hagane-contact] secrets missing — brief logged, not delivered", {
        name,
        email,
        project,
        briefLength: brief.length,
      });
      console.log(text);
      return Response.json({ ok: true, delivered: false }, { status: 200, headers: cors });
    }

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: toEmail,
          reply_to: email,
          subject,
          text,
        }),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        console.error("[hagane-contact] resend error", res.status, body.slice(0, 200));
        return Response.json({ error: "delivery-failed" }, { status: 502, headers: cors });
      }
    } catch (err) {
      console.error("[hagane-contact] send threw:", err?.message ?? err);
      return Response.json({ error: "delivery-failed" }, { status: 502, headers: cors });
    }

    return Response.json({ ok: true, delivered: true }, { status: 200, headers: cors });
  },
};
