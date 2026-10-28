# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the breadboard site with the cozy "paper on a green desk" portfolio: home, one UBC Solar page, five project write-ups.

**Architecture:** Vite multi-page build: one HTML entry per URL, each sets `data-page` on `<body>`; a single `src/main.jsx` renders the matching page component. Content lives in `src/content/*`, layout in `src/components/*`, SVG diagrams in `src/diagrams/*`.

**Tech Stack:** Vite 5, React 18, plain CSS (no new runtime deps). Verification with Playwright (Python, outside the repo).

**Spec:** `docs/superpowers/specs/2026-10-26-portfolio-redesign-design.md`

## Global Constraints

- **Do not commit.** Shlok reviews the working tree himself. (User instruction; overrides the usual commit steps.)
- First discard the uncommitted breadboard work so the tree starts from `HEAD` (user instruction).
- No filler copy. Every sentence states a fact from the Oct 22 resume or Shlok's notes.
- Cautious defaults for the open checks: no "500 kbps"; describe I2C recovery generally; no Code Unity dates; DermAI "built with a friend"; LearnLoop links to the GitHub profile.
- No team-size field on write-ups; hackathon projects show a small "Hackathon project" tag inside the fact strip.
- Solar work lives as sections on `/solar/` only (no sub-pages). No "6th of 24". Cascadia → FSGP 2027.
- All internal links go through `BASE_URL` and end in `/`.
- Colour tokens and fonts exactly as spec §3.

## Review Focus

1. Site deployed under a sub-path (e.g. GitHub Pages `/Personal-website/`): every internal link and asset must still resolve → Task 1 test builds with `--base=/sub/` and checks hrefs.
2. A screenshot file missing or misnamed: the figure must show the striped placeholder with the expected path, never a broken-image icon → Task 2 test.
3. Phone width 390px with long tokens ("COMMUTEity", URLs, stack lists): no horizontal scroll on any page → Task 7 test.
4. Keyboard-only visitor: Tab reaches each card and Enter opens it; focus ring visible → Task 3 test.
5. Reloading a deep link such as `/projects/match-a/` directly: page renders without the home page's JS state → Task 1 test loads each URL cold.

---

### Task 1: Clean slate + multi-page scaffold

**Files:**
- Restore to HEAD, then delete untracked breadboard files: `src/bench.jsx`, `src/font5x7.js`, `src/data.js`, `src/components/*`, `public/ShlokLandeResume.webp`, `Claude outputs/`
- Modify: `index.html`, `vite.config.js`, `src/main.jsx`
- Create: `solar/index.html`, `projects/{match-a,commuteity,code-unity,dermai,learnloop}/index.html`, `src/styles/base.css`
- Delete: `src/App.jsx`, `src/index.css`
- Test: `scratchpad/tests/test_build.py`

**Interfaces:**
- Produces: `<body data-page="home|solar|project" data-slug="<slug>">`; `src/main.jsx` exports nothing, mounts `<Page/>` into `#root`; `href(path: string) => string` in `src/lib/href.js` (prefixes `import.meta.env.BASE_URL`, guarantees trailing slash).

- [ ] Step 1: test_build.py asserts `dist/` contains the 7 `index.html` files and that, built with `--base=/sub/`, every `<a href>` starting with `/` starts with `/sub/`.
- [ ] Step 2: run it, expect FAIL.
- [ ] Step 3: discard breadboard changes (`git reset`, remove the untracked files above), write the entries, `vite.config.js` with `build.rollupOptions.input` covering all 7 entries, and `main.jsx` dispatching on `data-page`.
- [ ] Step 4: run, expect PASS. Load each URL cold in Playwright → `h1` present.

### Task 2: Shared components

**Files:** Create `src/components/{Layout,PaperSheet,Card,Figure,FactStrip,Toc,NextProject}.jsx`, `src/styles/components.css`. Test: `tests/test_components.py`.

**Interfaces (produces):**
- `Layout({children, current})`: desk background, sticky `TopBar` (name, Experience, Projects, Contact, Resume pill), `Footer` (contact).
- `PaperSheet({children})`: taped cream sheet.
- `Card({href, kicker, title, summary, tags, image, live, cta='Read more'})`: stretched-link card; `live` = `{href,label}` rendered above the stretched link.
- `Figure({src, alt, caption, n, frame:'browser'|'plain', url, placeholder})`: renders the image; on missing src or `onError` renders the striped placeholder showing `placeholder` (the expected path).
- `FactStrip({items:[{label, value}], tag})`; `Toc({items:[{id,label}]})`; `NextProject({slug})`.

- [ ] Step 1: test asserts a `Figure` with a non-existent src shows its placeholder text and no `<img>` with `naturalWidth==0`.
- [ ] Step 2: FAIL → implement → PASS.

### Task 3: Home page

**Files:** Create `src/pages/Home.jsx`, `src/content/site.js` (name, line, links, email parts, resume path, project order). Test: `tests/test_home.py`.

- [ ] Step 1: test asserts: one experience card linking to `/solar/`; 5 project cards + 1 GitHub card; every project card has a visible "Read more" and an `href` to `/projects/<slug>/`; the LOOP line contains no link; Tab to the first card + Enter navigates to `/solar/`.
- [ ] Step 2: FAIL → implement per spec §4 → PASS.

### Task 4: Diagrams

**Files:** Create `src/diagrams/kit.jsx` (`Box`, `Arrow`, `Label` primitives), plus `SolarDataPath`, `ImuBringup`, `I2cRecovery`, `Watchdogs`, `BusLoad`, `TelemetryPipeline`, `MatchaArch`, `CommuteGeohash`, `CommutePipeline`, `CodeUnityLoop`, `DermaiFlow`, `LearnloopFlow`. Test: `tests/test_diagrams.py`.

- [ ] Step 1: test asserts each page's diagrams render an `<svg role="img">` with a non-empty `aria-label`.
- [ ] Step 2: FAIL → implement (paper palette, mono labels, readable at 390px) → PASS.

### Task 5: Project write-ups

**Files:** Create `src/pages/ProjectPage.jsx`, `src/content/projects/{match-a,commuteity,code-unity,dermai,learnloop}.jsx`, each exporting `{slug, title, kicker, summary, hackathon:boolean, facts, links, hero, sections:[{id,label,body}]}`. Test: `tests/test_projects.py`.

- [ ] Step 1: test asserts for each slug: `h1` = title; fact strip has no "Team" label; "Hackathon project" tag present iff hackathon (match-a, COMMUTEity, DermAI); a "Next project" link to the next slug in order.
- [ ] Step 2: FAIL → write content per spec §5, §7 → PASS.

### Task 6: UBC Solar page

**Files:** Create `src/pages/SolarPage.jsx`, `src/content/solar.jsx`. Test: `tests/test_solar.py`.

- [ ] Step 1: test asserts sections `#imu`, `#i2c`, `#reliability`, `#dashboards` exist, the jump list links to each, text contains "Cascadia" and "FSGP 2027", and does not contain "500 kbps" or "6th".
- [ ] Step 2: FAIL → write per spec §6 → PASS.

### Task 7: Images, resume, full verification

**Files:** `public/ShlokLandeResume.pdf` (Oct 22, phone removed, email link fixed); `public/images/...` screenshots if capturable. Test: `tests/test_full.py`.

- [ ] Step 1: test asserts: PDF text has no `403-953`, its mailto is `shloklande@gmail.com`; every page at 390px has `scrollWidth <= 390`; no console errors on any page; every internal link resolves to a built page.
- [ ] Step 2: capture screenshots (desktop app browser) or leave placeholders; run all tests → PASS; screenshot every page at 1440 and 390 for review.
- [ ] Step 3: copy the working tree into Shlok's folder. **No commit.**
