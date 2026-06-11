# HAGANE (鋼) — Brand & Build Specification

Single source of truth for every subagent building this site. Read first.

## What we are

**Hagane** (Japanese 鋼, *steel*) — a small studio that forges hand-crafted, themed landing pages and small sites. We don't build SaaS, multi-tenant systems, or enterprise platforms. We forge experiences: one page, one purpose, sharpened until it cuts.

This site is the studio's own surface. It exists to (a) demonstrate the craft level, (b) take inbound briefs from people who want a beautiful site, and (c) function as portfolio.

## Voice register

Quiet, sharp, samurai-philosophy-flavoured but never cosplay. Reads like a master sword-smith's plain-spoken page. Never "epic", never "wow", never marketing-speak.

Examples:
- "We don't build sites. We forge them."
- "Every blade begins as raw ore. So does every site."
- "The cut you don't see is the truest."
- "Five elements. Five disciplines. One blade."

Sprinkle kanji as visual anchors, not as primary text: 鋼 (steel) · 刃 (blade) · 静 (stillness) · 道 (way) · 鍛 (forge) · 切 (cut).

## Palette

| Token | Hex | Use |
|---|---|---|
| `--sumi` | `#0a0908` | Primary background, deep ink |
| `--washi` | `#f5ecd9` | Paper / light surfaces |
| `--blade` | `#c9a961` | Wide-spread gold-leaf accent (kintsugi) |
| `--blood` | `#8b2a2a` | Sparse crimson accent, only for emphasis |
| `--fog` | `#3a3a3f` | Mid-tone slate |
| `--mist` | `#8b8b8f` | Subdued text |
| `--ash` | `#1a1817` | Dark surfaces (cards) |
| `--steel` | `#5b5b62` | Borders, dividers |

Dark mode is the default. Light mode optional later.

## Typography

- **Display** — `Cormorant Garamond` (serif, restrained, period-appropriate for traditional feel) at heavy weights (500-700) with tight tracking.
- **Body** — `Inter` for English body text, weight 400-500.
- **Kanji** — `Noto Serif JP` (or Noto Sans JP), weight 500-700, used as oversized decorative elements alongside Latin headlines.
- **Mono** — `JetBrains Mono` for code-like markers (timestamps, version, "by appointment", etc.).

All four loaded via `next/font/google` in `app/layout.tsx`.

## Aesthetics that must show up

These are the differentiators. No section ships generic without at least one of these:

1. **Negative space (*ma*)** — Japanese aesthetic of intentional emptiness. Sections breathe. Hero is mostly empty.
2. **Asymmetric composition** — copy off-axis, never dead-center. Diagonal balance.
3. **Ink-bleed animations** — reveals look like ink soaking into paper, not standard fade.
4. **Layered kanji + Latin** — oversized kanji behind smaller English text. Translation-as-design.
5. **Fog and depth** — Three.js fog volumes in hero. Layered parallax for scroll.
6. **Imperfection (*wabi-sabi*)** — slight rotations, subtle grain texture, hand-rough edges.
7. **Cursor presence** — custom cursor (blade-tip), trails through dark surfaces.
8. **Smooth scroll** via Lenis. Snappy yet smoothed.
9. **No card sprawl** — sections are full-bleed, not boxed grids.

## Hard bans

- ❌ No "Get Started" / "Learn More" / "Sign Up Free" CTA copy. Use Japanese-tinged verbs: "Begin the brief", "Send the request", "Step into the forge".
- ❌ No gradient text (overused). Use texture or material.
- ❌ No emoji icons. Use Lucide line icons or SVG glyphs.
- ❌ No stock photography of samurai. Generated abstract assets only (Higgsfield).
- ❌ No "trusted by" logo wall.

## Sections (exact list, exact order)

1. **Hero** (`<Hero />`) — Full-bleed. Three.js scene: stylised katana suspended in fog, slow rotation, ink-bleed reveal of brand name 鋼 HAGANE. Slogan beneath: *"Web carved with samurai precision."* One CTA: "Begin the brief" → scrolls to `#duel`.

2. **Manifesto** (`<Manifesto />`) — Single oversized paragraph in display serif, off-axis. Asymmetric. Subtle ink texture behind. Closing line: "We don't build sites. We forge them." → kanji 鍛 (*forge*) anchor.

3. **FiveCrafts** (`<FiveCrafts />`) — Five services as Miyamoto Musashi's five elements (*Gorin no Sho*). Layout: vertical stack with a subtle horizontal scroll within each (not parallax). Each element a craft we forge.
   - 地 (*Earth*) — Brand landing pages
   - 水 (*Water*) — Portfolio sites
   - 火 (*Fire*) — Launch / campaign sites
   - 風 (*Wind*) — Personal sites for makers, writers, founders
   - 空 (*Void*) — Custom commission: bring a vision, we forge it

4. **ForgeProcess** (`<ForgeProcess />`) — Four-step process visualised as forge progression: raw steel → folded → tempered → polished. Horizontal step-through with animation. Plain copy explaining each phase.

5. **RecentCuts** (`<RecentCuts />`) — Portfolio shells. Three or four "blades" — each a card-less surface with thumbnail, name, one-line poetic description. Placeholder content for now; real projects fill later.

6. **BushidoCode** (`<BushidoCode />`) — Studio principles as five short bushidō-flavoured statements:
   - *We measure twice. We cut once.*
   - *The site that survives is the site forged with restraint.*
   - *No ornament without function.*
   - *Speed without grace is noise.*
   - *We finish what we begin.*

7. **Duel** (`<Duel />`) — Contact form. Single column, generous space. Fields: name, email, project nature (select: Brand landing / Portfolio / Launch / Personal / Custom), brief (textarea). CTA: "Send the request". Submits via `/api/contact` (Formspree-style endpoint OR Resend OR Cloudflare Email Worker reuse from SM later — for testing, mock console.log + show success state).

8. **Footer** — Minimal: brand mark 鋼, year, single contact email `forge@hagane.studio` (placeholder), `Bushidō` link to a future code-of-honor page, `Vellum` link to optional blog (not built this session).

## Stack & file conventions

- Next.js 16 App Router, TypeScript strict, React 19
- Tailwind CSS v4 (config via `@theme` directive in `globals.css`)
- Three.js via `@react-three/fiber` + `@react-three/drei`
- Animation: Framer Motion 12 for component-level; GSAP 3 for ScrollTrigger; Lenis for smooth scroll
- Path alias: `@/` → `src/`
- Components live at `src/app/_components/`
  - `sections/` — one file per section above (`Hero.tsx`, `Manifesto.tsx`, ...)
  - `ui/` — primitives (`Button.tsx`, `Field.tsx`, `Kanji.tsx`)
  - `three/` — 3D scenes (`KatanaScene.tsx`, `FogVolume.tsx`)
  - `effects/` — particles, cursor, reveal helpers
- Hooks at `src/app/_hooks/`
- Lib at `src/app/_lib/`
- API routes at `src/app/api/`
- Generated assets at `public/img/` and `public/video/`

## Contact form delivery

For this build: API route `src/app/api/contact/route.ts` accepts POST `{ name, email, project, brief }`, validates, logs to server, returns 200. Real email delivery is owner's choice later (Resend account or reuse SM's CF Email Worker). Web UI shows clean success state regardless.

## Performance budget

- LCP < 2.5s on cable / 3G typical
- All Three.js work behind Suspense
- Images served via Next/Image with `priority` only on hero
- Lenis only mounted client-side

## Subagent rules

If you are a subagent building one section:

1. Read this `BRAND.md` first.
2. Implement ONLY your section. Don't touch other files unless asked.
3. Use design tokens via CSS variables (`var(--sumi)`, `var(--washi)`, etc.) and Tailwind v4 `@theme`-declared aliases (`bg-sumi`, `text-washi`, etc.). NEVER hardcode hex colors.
4. Import fonts via the global `<body>` class set up in layout — do not import `next/font` inside section files.
5. Every section is a default-export `function SectionName()` returning a `<section>` with an `id`.
6. Animations use Framer Motion's `motion.*` + `useInView` for entry reveals. Use the `useReducedMotion` hook to respect accessibility.
7. Avoid generic shadcn shapes (boxed cards, three-column grids, big rounded buttons). Lean into the aesthetics-must-show-up list above.
8. Mark TODOs explicitly with `// TODO(asset)` for missing Higgsfield-generated images so the next pass knows where to slot them in.

Done. Build sharp.
