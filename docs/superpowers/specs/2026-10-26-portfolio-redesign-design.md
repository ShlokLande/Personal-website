# Portfolio redesign — design spec

Date: 2026-10-26 · Owner: Shlok Lande · Status: approved in chat, pending spec review

## 1. Goal

Replace the breadboard-themed site with a clean, cozy, easy-to-scan portfolio for co-op and internship recruiters.
Every piece of work opens its own page with more detail than the resume: diagrams, screenshots or labelled
placeholders, and short sections a recruiter can read in about a minute.

**Success criteria**
- From the home page, a recruiter can tell in one screen who Shlok is and what to click.
- Every card reads as clickable without hovering: a visible "Read more →" button, and the whole card is a link.
- Every write-up states what it is, what Shlok did, and the result, before any long text.
- No filler copy ("I ship things that work", taglines, buzzwords). Every sentence carries a fact.
- Works on phones (390px) and desktop (1440px) with no horizontal scroll.

## 2. Pages and URLs

| URL | Page |
|---|---|
| `/` | Home |
| `/solar/` | UBC Solar: team intro, Shlok's role, and **all of his Solar work as sections on this one page** (no sub-pages) |
| `/projects/match-a/` | match-a |
| `/projects/commuteity/` | COMMUTEity |
| `/projects/code-unity/` | Code Unity |
| `/projects/dermai/` | DermAI |
| `/projects/learnloop/` | LearnLoop |

LOOP (Junior Achievement) appears only as one plain line under Experience on the home page. It has no page.

## 3. Visual design (direction "B, refined")

- **Desk:** the dark green cutting-mat background with the two-scale grid (24px minor, 120px major), kept from the
  current site. It stays fixed behind everything.
- **Paper:** content that needs reading sits on cream paper (`#fbf7ee`) with a soft drop shadow and a strip of sage
  tape. Cards on the home page are slightly rotated (±0.7°) and straighten and lift on hover.
- **Type:** Instrument Serif for display and headings, Inter for body, JetBrains Mono for small labels, dates and
  figure numbers. Body text 16–17px, line-height ~1.65, measure ≤ 38em.
- **Colour tokens:** desk `#1c3a30`, desk-ink `#efe9d6`, paper `#fbf7ee`, ink `#22201b`, muted `#5d574d`,
  accent green `#1f5a45`, tape/sage `#c9dcb0`, tag background `#e6eee4`.
- **Clickability:** whole card is a link (stretched-link pattern); a solid "Read more →" pill in every card footer; on
  hover the pill fills dark green; focus-visible ring for keyboard users; one-line hint under each section heading
  ("Click a card for the full write-up.").
- **Top bar:** sticky, translucent desk colour: name (home link) · Experience · Projects · Contact · **Resume** pill.
- **Motion:** only the card hover lift and a short fade-in. Respects `prefers-reduced-motion`.
- **Diagrams:** inline SVG drawn in the paper palette (ink strokes, green accents, mono labels) so they look
  hand-made rather than stock. Each has a caption ("Fig. n").
- **Screenshots:** shown in a simple browser frame (three dots + URL). Missing images render as a striped
  placeholder that prints the exact file path to drop the image at, so Shlok can see where it goes.

## 4. Home page

1. Name (large serif, "Lande" in sage italic) and one factual line: second-year computer engineering at UBC,
   embedded firmware on UBC Solar, open to co-op and internships. Links: GitHub, LinkedIn, email.
2. **Experience.** A wide taped card for UBC Solar, linking to `/solar/`: role and dates, two or three sentences on
   what the team does (a student team building solar-powered race cars; building the next-generation car, Cascadia,
   to compete at FSGP 2027) and what Shlok works on, plus the small data-path diagram. **No metric strip.**
   Below the card, one plain line: "Before that: VP Technology, Loop (Junior Achievement company), 2024–25".
3. **Projects.** A grid of taped cards (3 columns desktop, 2 tablet, 1 phone), in this order: match-a, COMMUTEity,
   Code Unity, DermAI, LearnLoop, then a sixth dashed "More on GitHub ↗" card. Each card has a picture (screenshot,
   diagram or placeholder), a small kicker (event/context), title, one sentence, 1–2 tags, the "Read more →" pill,
   and a separate "Live site ↗" link when one exists.
4. **Contact** footer: email (assembled on click to dodge scrapers), LinkedIn, GitHub, resume.

## 5. Write-up page template (projects)

On one large taped paper sheet:
1. Back link "← All projects".
2. Kicker (small mono): context, e.g. "youCode 2026 · 2nd place, SAP Non-Profit category".
3. Title (large serif) and a one-sentence summary.
4. Fact strip: **What I did** · **Built with** · **When** · **Links**. Hackathon projects show a small
   "Hackathon project" tag inside the strip. **No team-size field.**
5. Two-column body on desktop: a small sticky contents list on the left; content on the right (one column on
   phones).
6. Sections, short paragraphs and bullets: **Overview** (with Fig. 1 screenshot/placeholder) → **The problem** →
   **How it works** (diagram) → **What I built** → **Result**.
7. "Next project →" card at the bottom, cycling through the list.

## 6. UBC Solar page (`/solar/`)

Same paper-sheet layout, longer:
1. Kicker: "Experience · May 2026 – present · Vancouver". Title "UBC Solar". Summary: Embedded Software Developer on
   the embedded subteam.
2. **The team.** UBC Solar is a student design team (since 1997) that designs and builds solar-powered race cars.
   The team is building its next-generation car, Cascadia, to compete at Formula Sun Grand Prix 2027.
   Photo placeholder for the car/team.
3. **Where my work sits.** Car data-path diagram: BNO086 IMU → (I2C, SHTP/SH-2) → STM32 on FreeRTOS → CAN bus →
   radio / cellular → InfluxDB → Grafana for the pit crew.
4. A jump list of the four pieces of work below, then each as its own section with a diagram:
   - **IMU bring-up and telemetry.** SHTP/SH-2 host protocol written from scratch in C; validated on a bare-metal
     bench build (Nucleo-F103RB) before FreeRTOS integration; orientation, acceleration and magnetic-field data packed
     into CAN frames at 100 Hz; sent over the air by radio and cellular. Diagram: bench → RTOS bring-up path and the
     IMU CAN message layout.
   - **Debugging I2C lockups.** Bus hangs during bring-up found with a logic analyzer; wrote a bus-recovery routine
     that ended the hangs that needed a manual power-cycle. Diagram: SDA stuck low → clock SCL until released → STOP.
   - **Keeping the boards alive.** Independent watchdogs (IWDG) on 5 boards for automatic recovery from firmware
     hangs; a CAN bus-load metric reporting live utilisation so new messages can be scheduled without saturating the
     bus. Diagram: watchdog refresh timeline and a bus-load gauge.
   - **Telemetry dashboards.** Grafana over InfluxDB with Flux queries, streaming live CAN signals to the pit crew
     during testing; stack run locally in Docker. Diagram: CAN → parser → InfluxDB → Grafana.
5. Skills strip: C, STM32 HAL, FreeRTOS, I2C, CAN/DBC, logic analyzer, InfluxDB, Grafana, Docker.

## 7. Content per project (sources: Oct 22 resume + earlier notes; nothing invented)

- **match-a** (youCode 2026, 2nd place SAP Non-Profit, hackathon). Two-sided volunteer matching for BC nonprofits,
  under 24 hours. Shlok: Supabase Realtime dashboards, logistic-regression churn model (Python), role-based access via
  Supabase Auth with separate volunteer/coordinator dashboards, urgent-request alerts and interest-based onboarding.
  Diagram: Next.js ↔ Supabase (Auth, Postgres, Realtime) + Python churn model. Screenshot: live site.
- **COMMUTEity** (AWS hackathon, 6 hours, hackathon). Finds students who already share a commute. Shlok: AWS backend
  (Cognito, DynamoDB, Lambda matching pipeline), geohash location model so raw GPS never leaves the phone, pairwise
  overlap engine, Bedrock (Claude Sonnet 4.5) match explanations, mutual opt-in. Diagrams: geohash overlap grid and the
  AWS pipeline. No live site.
- **Code Unity** (nonprofit, co-founder & VP). Free intro-programming classes for youth; 24 weekly lessons, ~10
  students on average; Saturday Google Meet classes, rotating instructors, practice problems with answer keys,
  recordings. Diagram: weekly lesson loop. Screenshot: Wix site.
- **DermAI** (hackathon, built with a friend). Selfie → Gemini → structured skincare recommendations; no sign-up.
  Diagram: request flow. Screenshot: live site.
- **LearnLoop** (solo). Study-group scheduling platform: HTML/CSS/JS front end, Node.js backend scheduling logic and
  automated workflow handling. Diagram: scheduling flow. Screenshot placeholder; link to GitHub.

## 8. Images

- Try to capture screenshots of match-a, DermAI and Code Unity through the browser in Shlok's desktop app.
- Everything else (car photos, bench setup, hackathon photos, LearnLoop) is a labelled placeholder showing the path
  to drop the file at, e.g. `public/images/solar/car.jpg`. Adding a file there makes it appear with no code change.

## 9. Build

- Vite multi-page build: one HTML entry per URL (`index.html`, `solar/index.html`,
  `projects/<slug>/index.html`), all loading shared React components. Clean URLs work on any static host with no
  rewrite rules.
- Content lives in one data module per write-up (`src/content/*.jsx`) so text can be edited without touching layout.
- Delete the breadboard code (`bench.jsx`, `font5x7.js`, breadboard components). Git history keeps it.
- `public/ShlokLandeResume.pdf` is the Oct 22 resume with the phone number removed and the email link fixed.
- Fonts: Google Fonts (Instrument Serif, Inter, JetBrains Mono).

## 10. Verification

- `vite build` passes; every route is emitted as its own `index.html`.
- Screenshots at 1440 and 390 for every page; no horizontal scroll; no console errors.
- Every card is reachable and opens with the keyboard; links resolve (no 404s between pages).
- Placeholders show their file paths; real images render when present.

## 11. For Shlok to check

1. `[500 kbps]` is in brackets on your resume. Is the CAN bus speed confirmed? If not, I'll leave the number out.
2. I2C recovery: OK to describe it as "clock SCL until the IMU releases SDA, then send a STOP"?
3. Code Unity dates: show 2024–2025, or no dates?
4. DermAI: anything specific you built (front end, Gemini prompt), or keep it as "built with a friend"?
5. LearnLoop: is there a repo link to use instead of your GitHub profile?
