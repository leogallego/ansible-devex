# Ansible DevEx Deck Builder — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reveal.js 5.x + Vite slide deck with Red Hat Ansible Automation Platform branding that tells the Ansible Developer Experience evolution story in 12 core slides plus 5 optional deep-dive modules.

**Architecture:** Single-page HTML presentation using reveal.js with a custom CSS theme matching the Red Hat AAP template. All slides inline in `index.html`, themed via CSS custom properties and layout classes. Vertical slides implement optional deep-dive modules. Vite handles dev server and static build.

**Tech Stack:** Reveal.js 5.x, Vite 6.x, Google Fonts (Red Hat Display + Red Hat Text), GitHub Actions for deployment.

---

## File Map

| File | Responsibility |
|------|---------------|
| `deck/package.json` | Project metadata, dependencies (reveal.js, vite), npm scripts |
| `deck/vite.config.js` | Vite config — dev server, build output to `dist/` |
| `deck/index.html` | All slide content — 12 core slides + 5 modules as vertical slides |
| `deck/css/redhat-theme.css` | Complete Red Hat branded theme — colors, typography, 9 layout types, persistent elements |
| `deck/js/main.js` | Reveal.js initialization with plugins (notes) and config |
| `deck/assets/` | SVG placeholders for logos (Red Hat logo, Ansible icon) |
| `.github/workflows/deploy.yml` | GitHub Actions — build and deploy to GitHub Pages |
| `.gitignore` | Ignore `node_modules/`, `dist/`, `tmp/` |

---

### Task 1: Project scaffold and Vite setup

**Files:**
- Create: `deck/package.json`
- Create: `deck/vite.config.js`
- Create: `deck/js/main.js`
- Create: `deck/index.html` (minimal — just one test slide)
- Create: `.gitignore`

- [ ] **Step 1: Create `.gitignore`**

```
node_modules/
dist/
tmp/
*.log
.DS_Store
```

- [ ] **Step 2: Create `deck/package.json`**

```json
{
  "name": "ansible-devex-deck",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "reveal.js": "^5.2.1"
  },
  "devDependencies": {
    "vite": "^6.3.5"
  }
}
```

- [ ] **Step 3: Create `deck/vite.config.js`**

```js
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
});
```

- [ ] **Step 4: Create `deck/js/main.js`**

```js
import Reveal from 'reveal.js';
import RevealNotes from 'reveal.js/plugin/notes/notes';

import 'reveal.js/dist/reset.css';
import 'reveal.js/dist/reveal.css';

const deck = new Reveal({
  hash: true,
  controls: true,
  progress: true,
  center: false,
  transition: 'slide',
  backgroundTransition: 'fade',
  width: 1280,
  height: 720,
  margin: 0.04,
  slideNumber: 'c/t',
  plugins: [RevealNotes],
});

deck.initialize();
```

- [ ] **Step 5: Create minimal `deck/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ansible Developer Experience</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700;900&family=Red+Hat+Text:wght@300;400;500&display=swap" rel="stylesheet" />
</head>
<body>
  <div class="reveal">
    <div class="slides">
      <section data-background-color="#ee0000">
        <h1 style="color: #fff;">Scaffold works</h1>
      </section>
    </div>
  </div>
  <script type="module" src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 6: Install dependencies and verify dev server**

```bash
cd deck && npm install
npm run dev
```

Expected: browser opens with a single red slide showing "Scaffold works".

- [ ] **Step 7: Verify production build**

```bash
cd deck && npm run build && npm run preview
```

Expected: `dist/` directory created, preview server shows the same red slide.

- [ ] **Step 8: Commit**

```bash
git add .gitignore deck/package.json deck/vite.config.js deck/js/main.js deck/index.html
git commit -m "$(cat <<'EOF'
feat: scaffold reveal.js + Vite deck project

Assisted-by: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Red Hat branded CSS theme

**Files:**
- Create: `deck/css/redhat-theme.css`
- Modify: `deck/js/main.js` (add theme import)

This task implements all 9 layout types from the spec as CSS classes, the color system as custom properties, typography via Google Fonts, and persistent elements (accent bar, section marker, Red Hat logo placeholder).

- [ ] **Step 1: Create `deck/css/redhat-theme.css`**

```css
/* Red Hat Ansible Automation Platform — reveal.js theme */

:root {
  /* Color tokens */
  --rh-red-50: #ee0000;
  --rh-red-60: #a60000;
  --rh-red-70: #5f0000;
  --rh-black: #000000;
  --rh-gray-80: #292929;
  --rh-gray-60: #4d4d4d;
  --rh-gray-20: #e0e0e0;
  --rh-white: #ffffff;
  --rh-teal-50: #37a3a3;

  /* Reveal.js theme overrides */
  --r-background-color: var(--rh-white);
  --r-main-font: 'Red Hat Text', system-ui, -apple-system, sans-serif;
  --r-main-font-size: 28px;
  --r-main-color: var(--rh-black);
  --r-heading-font: 'Red Hat Display', system-ui, -apple-system, sans-serif;
  --r-heading-color: var(--rh-black);
  --r-heading-font-weight: 700;
  --r-heading-text-transform: none;
  --r-heading-line-height: 1.15;
  --r-heading1-size: 2.4em;
  --r-heading2-size: 1.6em;
  --r-heading3-size: 1.2em;
  --r-link-color: var(--rh-red-50);
  --r-link-color-hover: var(--rh-red-60);
  --r-selection-background-color: rgba(238, 0, 0, 0.2);
}

/* ── Base slide reset ──────────────────────────────── */

.reveal .slides section {
  text-align: left;
  padding: 40px 60px;
  box-sizing: border-box;
}

.reveal .slides section h1,
.reveal .slides section h2,
.reveal .slides section h3 {
  text-align: left;
}

/* ── Layout 1: Title slide (red bg) ────────────────── */

.reveal .slides section.title-red {
  background-color: var(--rh-red-50);
  color: var(--rh-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 80px;
}

.reveal .slides section.title-red h1 {
  color: var(--rh-white);
  font-size: 2.2em;
  margin-bottom: 0.2em;
}

.reveal .slides section.title-red .subtitle {
  font-family: var(--r-main-font);
  font-size: 1.1em;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5em;
}

.reveal .slides section.title-red .presenter {
  font-family: var(--r-main-font);
  font-size: 0.8em;
  color: rgba(255, 255, 255, 0.85);
}

/* ── Layout 2: Title slide (dark bg) ───────────────── */

.reveal .slides section.title-dark {
  background-color: var(--rh-gray-80);
  color: var(--rh-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 80px;
}

.reveal .slides section.title-dark h1 {
  color: var(--rh-white);
  font-size: 2.2em;
  margin-bottom: 0.2em;
}

.reveal .slides section.title-dark .subtitle {
  font-family: var(--r-main-font);
  font-size: 1.1em;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5em;
}

/* ── Layout 3: Section divider (red) ───────────────── */

.reveal .slides section.divider-red {
  background-color: var(--rh-red-50);
  color: var(--rh-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 60px 80px;
}

.reveal .slides section.divider-red h2 {
  color: var(--rh-white);
  font-size: 2.4em;
  text-align: center;
  font-weight: 900;
}

/* ── Layout 4: Section divider (dark) ──────────────── */

.reveal .slides section.divider-dark {
  background-color: var(--rh-gray-80);
  color: var(--rh-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 80px;
  border-left: 6px solid var(--rh-red-50);
}

.reveal .slides section.divider-dark h2 {
  color: var(--rh-white);
  font-size: 2.4em;
  font-weight: 900;
}

/* ── Layout 5: Content slide (light) ───────────────── */

.reveal .slides section.content-light {
  background-color: var(--rh-white);
  color: var(--rh-black);
  padding: 50px 60px 50px 70px;
}

.reveal .slides section.content-light::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 80px;
  background-color: var(--rh-red-50);
}

.reveal .slides section.content-light .section-marker {
  font-family: var(--r-main-font);
  font-size: 0.65em;
  font-weight: 500;
  color: var(--rh-red-50);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.3em;
}

.reveal .slides section.content-light h2 {
  color: var(--rh-black);
  margin-top: 0.1em;
}

.reveal .slides section.content-light ul {
  font-size: 0.85em;
  line-height: 1.6;
  color: var(--rh-gray-60);
}

.reveal .slides section.content-light li {
  margin-bottom: 0.4em;
}

/* ── Layout 6: Content slide (dark) ────────────────── */

.reveal .slides section.content-dark {
  background-color: var(--rh-gray-80);
  color: var(--rh-white);
  padding: 50px 60px 50px 70px;
}

.reveal .slides section.content-dark::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 80px;
  background-color: var(--rh-red-50);
}

.reveal .slides section.content-dark .section-marker {
  font-family: var(--r-main-font);
  font-size: 0.65em;
  font-weight: 500;
  color: var(--rh-red-50);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.3em;
}

.reveal .slides section.content-dark h2 {
  color: var(--rh-white);
  margin-top: 0.1em;
}

.reveal .slides section.content-dark ul {
  font-size: 0.85em;
  line-height: 1.6;
  color: var(--rh-gray-20);
}

/* ── Layout 7: Agenda / list slide ─────────────────── */

.reveal .slides section.agenda {
  display: grid;
  grid-template-columns: 38% 58%;
  gap: 4%;
  align-items: start;
  padding: 60px;
}

.reveal .slides section.agenda h2 {
  color: var(--rh-red-50);
  font-size: 2em;
  font-weight: 900;
  align-self: start;
}

.reveal .slides section.agenda .agenda-list {
  font-size: 0.85em;
  line-height: 1.7;
}

.reveal .slides section.agenda .agenda-list li {
  margin-bottom: 0.5em;
}

/* ── Layout 8: Split layout ────────────────────────── */

.reveal .slides section.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  padding: 50px 60px;
}

.reveal .slides section.split.split-reverse {
  direction: rtl;
}

.reveal .slides section.split.split-reverse > * {
  direction: ltr;
}

.reveal .slides section.split .split-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.reveal .slides section.split .split-text h2 {
  margin-top: 0;
}

/* ── Layout 9: Thank you slide ─────────────────────── */

.reveal .slides section.thank-you {
  background-color: var(--rh-red-50);
  color: var(--rh-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 60px 80px;
}

.reveal .slides section.thank-you h2 {
  color: var(--rh-white);
  font-size: 2.8em;
  font-weight: 900;
  text-align: center;
  margin-bottom: 0.5em;
}

.reveal .slides section.thank-you .boilerplate {
  font-family: var(--r-main-font);
  font-size: 0.7em;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}

.reveal .slides section.thank-you .social-links {
  margin-top: 1em;
  font-size: 0.65em;
  color: rgba(255, 255, 255, 0.75);
}

/* ── Persistent elements ───────────────────────────── */

.reveal .slides section .rh-logo {
  position: absolute;
  bottom: 20px;
  right: 30px;
  font-family: var(--r-heading-font);
  font-size: 0.55em;
  font-weight: 700;
  opacity: 0.7;
}

.reveal .slides section.title-red .rh-logo,
.reveal .slides section.divider-red .rh-logo,
.reveal .slides section.thank-you .rh-logo {
  color: var(--rh-white);
}

.reveal .slides section.content-light .rh-logo,
.reveal .slides section.agenda .rh-logo {
  color: var(--rh-gray-60);
}

.reveal .slides section.divider-dark .rh-logo,
.reveal .slides section.content-dark .rh-logo {
  color: rgba(255, 255, 255, 0.6);
}

/* ── Utility classes ───────────────────────────────── */

.text-red { color: var(--rh-red-50); }
.text-teal { color: var(--rh-teal-50); }
.text-muted { color: var(--rh-gray-60); }
.text-center { text-align: center; }
.text-small { font-size: 0.75em; }

.mt-0 { margin-top: 0; }
.mt-1 { margin-top: 0.5em; }
.mt-2 { margin-top: 1em; }
.mb-0 { margin-bottom: 0; }
.mb-1 { margin-bottom: 0.5em; }

/* ── Diagram helpers ───────────────────────────────── */

.maturity-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 1em;
}

.maturity-grid .stage {
  background: var(--rh-gray-20);
  border-radius: 8px;
  padding: 20px 16px;
  text-align: center;
  font-size: 0.75em;
  line-height: 1.5;
}

.maturity-grid .stage h3 {
  text-align: center;
  color: var(--rh-red-50);
  font-size: 1.2em;
  margin: 0 0 0.4em 0;
}

.maturity-grid .stage .method {
  font-weight: 500;
  color: var(--rh-black);
}

.maturity-grid .stage .time {
  color: var(--rh-gray-60);
  font-size: 0.9em;
}

.maturity-arrow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5em;
  padding: 0 20px;
  color: var(--rh-gray-60);
  font-size: 0.7em;
}

.lifecycle-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 1em;
  font-size: 0.85em;
}

.lifecycle-flow .phase {
  background: var(--rh-gray-20);
  border-radius: 8px;
  padding: 14px 24px;
  font-weight: 500;
  text-align: center;
}

.lifecycle-flow .phase.active {
  background: var(--rh-red-50);
  color: var(--rh-white);
}

.lifecycle-flow .arrow {
  font-size: 1.4em;
  color: var(--rh-gray-60);
}

.timeline {
  display: flex;
  align-items: flex-start;
  gap: 0;
  margin-top: 1.5em;
  position: relative;
}

.timeline::after {
  content: '';
  position: absolute;
  top: 28px;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--rh-gray-20);
}

.timeline .event {
  flex: 1;
  text-align: center;
  position: relative;
  padding-top: 45px;
  font-size: 0.7em;
  line-height: 1.4;
}

.timeline .event::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--rh-red-50);
  z-index: 1;
}

.timeline .event .day {
  font-family: var(--r-heading-font);
  font-weight: 700;
  font-size: 1.3em;
  color: var(--rh-red-50);
  display: block;
  margin-bottom: 0.2em;
}

.timeline .event:last-child {
  color: var(--rh-red-50);
  font-weight: 500;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 1em;
}

.tool-grid .tool-group h3 {
  text-align: center;
  color: var(--rh-red-50);
  font-size: 0.85em;
  margin: 0 0 0.5em 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tool-grid .tool-group ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.8em;
}

.tool-grid .tool-group li {
  padding: 4px 0;
  color: var(--rh-gray-60);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 1em;
}

.steps-grid .step {
  text-align: center;
  padding: 16px;
  font-size: 0.72em;
  line-height: 1.5;
}

.steps-grid .step .step-number {
  display: inline-block;
  width: 32px;
  height: 32px;
  line-height: 32px;
  border-radius: 50%;
  background: var(--rh-red-50);
  color: var(--rh-white);
  font-family: var(--r-heading-font);
  font-weight: 700;
  font-size: 1.2em;
  margin-bottom: 0.5em;
}

.steps-grid .step h3 {
  text-align: center;
  font-size: 1.1em;
  margin: 0.3em 0;
  color: var(--rh-black);
}

.mcp-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 1em;
}

.mcp-layout .mcp-card {
  background: var(--rh-gray-20);
  border-radius: 8px;
  padding: 20px;
  font-size: 0.78em;
}

.mcp-layout .mcp-card h3 {
  color: var(--rh-red-50);
  margin: 0 0 0.5em 0;
  font-size: 1.1em;
  text-align: left;
}

.mcp-layout .mcp-card ul {
  margin: 0;
  padding-left: 1.2em;
  line-height: 1.6;
}

.tier-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 1em;
}

.tier-stack .tier {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 16px;
  align-items: center;
  background: var(--rh-gray-20);
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 0.78em;
}

.tier-stack .tier .tier-label {
  font-family: var(--r-heading-font);
  font-weight: 700;
  color: var(--rh-red-50);
  font-size: 0.95em;
}
```

- [ ] **Step 2: Add theme import to `deck/js/main.js`**

Add this import line after the reveal.css import:

```js
import '../css/redhat-theme.css';
```

The full import block in `deck/js/main.js` should now be:

```js
import Reveal from 'reveal.js';
import RevealNotes from 'reveal.js/plugin/notes/notes';

import 'reveal.js/dist/reset.css';
import 'reveal.js/dist/reveal.css';
import '../css/redhat-theme.css';
```

- [ ] **Step 3: Update `deck/index.html` to test multiple layouts**

Replace the single test slide with layout samples to verify all 9 types render correctly:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ansible Developer Experience</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700;900&family=Red+Hat+Text:wght@300;400;500&display=swap" rel="stylesheet" />
</head>
<body>
  <div class="reveal">
    <div class="slides">

      <!-- Layout test: title-red -->
      <section class="title-red">
        <h1>Title Red Layout</h1>
        <p class="subtitle">Subtitle text goes here</p>
        <p class="presenter">Presenter Name — Title</p>
        <div class="rh-logo">Red Hat</div>
      </section>

      <!-- Layout test: title-dark -->
      <section class="title-dark">
        <h1>Title Dark Layout</h1>
        <p class="subtitle">Subtitle text goes here</p>
        <div class="rh-logo">Red Hat</div>
      </section>

      <!-- Layout test: divider-red -->
      <section class="divider-red">
        <h2>Section Divider (Red)</h2>
        <div class="rh-logo">Red Hat</div>
      </section>

      <!-- Layout test: divider-dark -->
      <section class="divider-dark">
        <h2>Section Divider (Dark)</h2>
        <div class="rh-logo">Red Hat</div>
      </section>

      <!-- Layout test: content-light -->
      <section class="content-light">
        <p class="section-marker">Section Name</p>
        <h2>Content Light Layout</h2>
        <ul>
          <li>First point with detail</li>
          <li>Second point with detail</li>
          <li>Third point with detail</li>
        </ul>
        <div class="rh-logo">Red Hat</div>
      </section>

      <!-- Layout test: content-dark -->
      <section class="content-dark">
        <p class="section-marker">Section Name</p>
        <h2>Content Dark Layout</h2>
        <ul>
          <li>First point with detail</li>
          <li>Second point with detail</li>
        </ul>
        <div class="rh-logo">Red Hat</div>
      </section>

      <!-- Layout test: agenda -->
      <section class="agenda">
        <h2>Agenda Layout</h2>
        <ol class="agenda-list">
          <li>First agenda item</li>
          <li>Second agenda item</li>
          <li>Third agenda item</li>
        </ol>
        <div class="rh-logo">Red Hat</div>
      </section>

      <!-- Layout test: split -->
      <section class="split">
        <div class="split-visual">
          <div style="width:200px;height:200px;background:var(--rh-gray-20);border-radius:8px;display:flex;align-items:center;justify-content:center;">Diagram</div>
        </div>
        <div class="split-text">
          <h2>Split Layout</h2>
          <p>Text content beside a visual element.</p>
        </div>
        <div class="rh-logo">Red Hat</div>
      </section>

      <!-- Layout test: thank-you -->
      <section class="thank-you">
        <h2>Thank you</h2>
        <p class="boilerplate">Red Hat is the world's leading provider of enterprise open source software solutions.</p>
        <p class="social-links">linkedin.com/company/red-hat</p>
        <div class="rh-logo">Red Hat</div>
      </section>

    </div>
  </div>
  <script type="module" src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 4: Visual verification**

```bash
cd deck && npm run dev
```

Walk through all 9 slides and verify:
- Red Hat Display font on headings, Red Hat Text on body
- Color tokens match spec (red `#ee0000`, gray-80 `#292929`, etc.)
- Red accent bar appears on content-light and content-dark slides
- Section marker renders in red uppercase above heading
- "Red Hat" logo placeholder appears bottom-right on every slide
- Agenda slide uses 38/58% grid split
- Split layout shows two-column grid

- [ ] **Step 5: Commit**

```bash
git add deck/css/redhat-theme.css deck/js/main.js deck/index.html
git commit -m "$(cat <<'EOF'
feat: add Red Hat branded CSS theme with all 9 layout types

Assisted-by: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Core slides 1–6 (individual → tools → lifecycle)

**Files:**
- Modify: `deck/index.html` (replace test slides with actual content)

This task builds the first half of the core narrative: title, onboarding problem, thesis, ADT tools, maturity path, and content lifecycle. Also wires up Module A (ADT deep dive) and Module D (CI/CD) as vertical slides.

- [ ] **Step 1: Replace `deck/index.html` content**

Replace the entire `<div class="slides">` block with the actual deck content. The full file becomes:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ansible Developer Experience</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700;900&family=Red+Hat+Text:wght@300;400;500&display=swap" rel="stylesheet" />
</head>
<body>
  <div class="reveal">
    <div class="slides">

      <!-- ══ Slide 1: Title ══════════════════════════ -->
      <section class="title-red">
        <h1>The Ansible Developer Experience</h1>
        <p class="subtitle">From individual setup to enterprise workspace</p>
        <p class="presenter">Presenter Name — Title</p>
        <div class="rh-logo">Red Hat</div>
        <aside class="notes">
          Set context: this is about the journey every automation team goes through.
        </aside>
      </section>

      <!-- ══ Slide 2: The onboarding problem ═════════ -->
      <section class="content-light">
        <p class="section-marker">The Challenge</p>
        <h2>The onboarding problem</h2>
        <div class="timeline">
          <div class="event">
            <span class="day">Day 1</span>
            Kick-off &amp; paperwork
          </div>
          <div class="event">
            <span class="day">Day 10</span>
            Laptop arrives
          </div>
          <div class="event">
            <span class="day">Day 20</span>
            IDE &amp; tools installed
          </div>
          <div class="event">
            <span class="day">Day 30</span>
            Git access granted
          </div>
          <div class="event">
            <span class="day">Day 60</span>
            Still waiting for Linux / sudo
          </div>
        </div>
        <p class="text-muted text-small mt-2">Months before writing a single playbook</p>
        <div class="rh-logo">Red Hat</div>
        <aside class="notes">
          Adjust these numbers to your customer — regulated industries skew higher,
          cloud-native shops lower. The point isn't the exact days, it's that none
          of them are 5 minutes.
        </aside>
      </section>

      <!-- ══ Slide 3: Thesis ═════════════════════════ -->
      <section class="divider-red">
        <h2>What if it took 5 minutes?</h2>
        <div class="rh-logo">Red Hat</div>
        <aside class="notes">
          Pause for effect. This is the thesis of the talk.
        </aside>
      </section>

      <!-- ══ Slide 4: ADT tools + Module A ═══════════ -->
      <section>

        <!-- Core slide 4 -->
        <section class="content-light">
          <p class="section-marker">The Toolchain</p>
          <h2>Ansible Development Tools</h2>
          <div class="tool-grid">
            <div class="tool-group">
              <h3>Create</h3>
              <ul>
                <li>ansible-creator</li>
                <li>ade</li>
              </ul>
            </div>
            <div class="tool-group">
              <h3>Test</h3>
              <ul>
                <li>molecule</li>
                <li>ansible-lint</li>
                <li>pytest-ansible</li>
                <li>tox-ansible</li>
              </ul>
            </div>
            <div class="tool-group">
              <h3>Deploy</h3>
              <ul>
                <li>ansible-builder</li>
                <li>ansible-navigator</li>
                <li>ansible-sign</li>
              </ul>
            </div>
          </div>
          <div class="rh-logo">Red Hat</div>
          <aside class="notes">
            ADT is one install — `adt --version` shows all tools with compatible
            versions. No more dependency conflicts.
          </aside>
        </section>

        <!-- Module A: ADT Tools in Detail -->
        <section class="divider-red">
          <h2>ADT Tools in Detail</h2>
          <div class="rh-logo">Red Hat</div>
        </section>

        <section class="content-light">
          <p class="section-marker">Module A — ADT Deep Dive</p>
          <h2>ansible-creator</h2>
          <ul>
            <li>Scaffold collections, playbooks, devcontainers, EE templates</li>
            <li>Opinionated project structure out of the box</li>
            <li>Consistent starting point for every automation project</li>
          </ul>
          <div class="rh-logo">Red Hat</div>
        </section>

        <section class="content-light">
          <p class="section-marker">Module A — ADT Deep Dive</p>
          <h2>ansible-lint</h2>
          <ul>
            <li>Opinionated profiles: min → basic → moderate → safety → shared → production</li>
            <li>Auto-fix with <code>--fix</code> for common violations</li>
            <li>CI integration: exit codes, SARIF output, GitHub Actions</li>
          </ul>
          <div class="rh-logo">Red Hat</div>
        </section>

        <section class="content-light">
          <p class="section-marker">Module A — ADT Deep Dive</p>
          <h2>molecule</h2>
          <ul>
            <li>Multi-scenario testing with shared state</li>
            <li>Collection-aware: test roles in collection context</li>
            <li>Pluggable drivers: Podman, Docker, delegated, cloud</li>
          </ul>
          <div class="rh-logo">Red Hat</div>
        </section>

      </section>

      <!-- ══ Slide 5: Maturity path ══════════════════ -->
      <section class="content-light">
        <p class="section-marker">The Journey</p>
        <h2>The maturity path</h2>
        <div class="maturity-grid">
          <div class="stage">
            <h3>Crawl</h3>
            <p class="method">pip / uv</p>
            <p class="time">~30 min</p>
            <p class="text-muted">Low consistency</p>
          </div>
          <div class="stage">
            <h3>Walk</h3>
            <p class="method">RPM</p>
            <p class="time">~15 min</p>
            <p class="text-muted">Medium consistency</p>
          </div>
          <div class="stage">
            <h3>Run</h3>
            <p class="method">Dev Container</p>
            <p class="time">~10 min</p>
            <p class="text-muted">High consistency</p>
          </div>
          <div class="stage">
            <h3>Fly</h3>
            <p class="method">Dev Spaces</p>
            <p class="time">~5 min</p>
            <p class="text-muted">Highest consistency</p>
          </div>
        </div>
        <div class="maturity-arrow">
          <span>← Less governed</span>
          <span>More governed →</span>
        </div>
        <div class="rh-logo">Red Hat</div>
        <aside class="notes">
          Most customers are somewhere between Crawl and Walk. The container-based
          methods are the target.
        </aside>
      </section>

      <!-- ══ Slide 6: Content lifecycle + Module D ═══ -->
      <section>

        <!-- Core slide 6 -->
        <section class="content-light">
          <p class="section-marker">The Workflow</p>
          <h2>The content lifecycle</h2>
          <div class="lifecycle-flow">
            <div class="phase active">Create</div>
            <div class="arrow">→</div>
            <div class="phase active">Test</div>
            <div class="arrow">→</div>
            <div class="phase active">Deploy</div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:1.5em;font-size:0.78em;">
            <div>
              <h3 class="text-red mt-0" style="font-size:1em;">Inner loop (developer)</h3>
              <p class="text-muted">Write → Lint → Test → Iterate</p>
              <p class="text-muted">Fast feedback, local or container</p>
            </div>
            <div>
              <h3 class="text-red mt-0" style="font-size:1em;">Outer loop (CI/CD)</h3>
              <p class="text-muted">PR → GitHub Actions → Controller sync</p>
              <p class="text-muted">Automated gates, compliance scanning</p>
            </div>
          </div>
          <div class="rh-logo">Red Hat</div>
          <aside class="notes">
            Two loops: the inner loop is your developer's daily experience, the outer
            loop is what happens when they push.
          </aside>
        </section>

        <!-- Module D: CI/CD Integration -->
        <section class="divider-dark">
          <h2>CI/CD Integration</h2>
          <div class="rh-logo">Red Hat</div>
        </section>

        <section class="content-light">
          <p class="section-marker">Module D — CI/CD</p>
          <h2>The outer loop</h2>
          <ul>
            <li>GitHub Actions: molecule CI, ansible-lint, compliance scanning</li>
            <li>Automated PR gates enforce quality before merge</li>
            <li>Controller sync deploys approved content to AAP</li>
          </ul>
          <div class="rh-logo">Red Hat</div>
        </section>

        <section class="content-light">
          <p class="section-marker">Module D — CI/CD</p>
          <h2>Development observability</h2>
          <ul>
            <li>Grafana dashboards for workflow metrics</li>
            <li>Track: build times, lint violations, test coverage trends</li>
            <li>Data-driven improvement across teams</li>
          </ul>
          <div class="rh-logo">Red Hat</div>
        </section>

      </section>

    </div><!-- /.slides -->
  </div><!-- /.reveal -->
  <script type="module" src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Visual verification**

```bash
cd deck && npm run dev
```

Verify:
- Slide 1: red background, white title, subtitle, presenter placeholder
- Slide 2: timeline with 5 events (Day 1→60), red dots connected by gray line
- Slide 3: red divider, large centered text
- Slide 4: 3-column tool grid (Create/Test/Deploy). Press down-arrow to enter Module A (4 additional slides)
- Slide 5: 4-column maturity grid with arrow below
- Slide 6: lifecycle flow with inner/outer loop grid. Press down-arrow to enter Module D (2 additional slides)
- Speaker notes visible when pressing S

- [ ] **Step 3: Commit**

```bash
git add deck/index.html
git commit -m "$(cat <<'EOF'
feat: add core slides 1-6 with Module A (ADT) and Module D (CI/CD)

Assisted-by: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Core slides 7–12 (enterprise → thank you) with Modules B, C, E

**Files:**
- Modify: `deck/index.html` (add remaining slides after slide 6)

This task completes the core narrative and adds the remaining 3 deep-dive modules as vertical slides.

- [ ] **Step 1: Add slides 7–12 to `deck/index.html`**

Insert the following sections immediately after the closing `</section>` of the slide 6 group (the CI/CD module block) and before the closing `</div><!-- /.slides -->`:

```html
      <!-- ══ Slide 7: Enterprise divider ═════════════ -->
      <section class="divider-dark">
        <h2>Scaling to the enterprise</h2>
        <div class="rh-logo">Red Hat</div>
        <aside class="notes">
          Transition: we've shown the tools, now how do you roll them out to 50
          or 500 developers?
        </aside>
      </section>

      <!-- ══ Slide 8: Dev Containers ═════════════════ -->
      <section class="content-light">
        <p class="section-marker">Enterprise Scale</p>
        <h2>Dev Containers: team consistency</h2>
        <ul>
          <li>Same image, same tools, same config — every developer</li>
          <li><code>.devcontainer/</code> lives in the repo, versioned with code</li>
          <li>Works on any OS with VS Code + container runtime</li>
          <li>Nested Podman for molecule and ansible-builder</li>
        </ul>
        <div class="rh-logo">Red Hat</div>
        <aside class="notes">
          This is the sweet spot for most teams starting out. Zero infrastructure
          investment, immediate consistency.
        </aside>
      </section>

      <!-- ══ Slide 9: Dev Spaces + Module C ══════════ -->
      <section>

        <!-- Core slide 9 -->
        <section class="content-light">
          <p class="section-marker">Enterprise Scale</p>
          <h2>Dev Spaces: zero local dependencies</h2>
          <ul>
            <li>Browser-only — ~5 minutes to coding</li>
            <li>Centrally governed by platform team</li>
            <li><code>devfile.yaml</code> defines everything: tools, config, extensions</li>
            <li>Developers just click Create — no local setup</li>
          </ul>
          <div class="rh-logo">Red Hat</div>
          <aside class="notes">
            The value prop for Dev Spaces is governance + zero desktop requirements.
            IT loves it because nothing runs locally.
          </aside>
        </section>

        <!-- Module C: Dev Spaces & Image Customization -->
        <section class="divider-dark">
          <h2>Dev Spaces &amp; Image Customization</h2>
          <div class="rh-logo">Red Hat</div>
        </section>

        <section class="content-light">
          <p class="section-marker">Module C — Dev Spaces Deep Dive</p>
          <h2>Tiered image strategy</h2>
          <div class="tier-stack">
            <div class="tier">
              <span class="tier-label">Tier 1</span>
              <span>Upstream base — ansible-devspaces (managed by ansible-dev-tools project)</span>
            </div>
            <div class="tier">
              <span class="tier-label">Tier 2</span>
              <span>Org/domain image — via OpenShift BuildConfig or CEKit factory</span>
            </div>
            <div class="tier">
              <span class="tier-label">Tier 3</span>
              <span>Team image — Containerfile in workspace repo, auto-rebuilds</span>
            </div>
            <div class="tier">
              <span class="tier-label">Tier 4</span>
              <span>Personal image — opt-in fork, self-service</span>
            </div>
          </div>
          <div class="rh-logo">Red Hat</div>
        </section>

        <section class="content-light">
          <p class="section-marker">Module C — Dev Spaces Deep Dive</p>
          <h2>Auto-rebuild cascade</h2>
          <ul>
            <li>OpenShift ImageStream triggers connect tiers</li>
            <li>Upstream update → Org rebuild → Team rebuild (automatic)</li>
            <li>Security patches flow through the chain without manual intervention</li>
          </ul>
          <div class="rh-logo">Red Hat</div>
        </section>

        <section class="content-light">
          <p class="section-marker">Module C — Dev Spaces Deep Dive</p>
          <h2>Self-service workflow</h2>
          <ul>
            <li>Teams request image customizations via PR to config repo</li>
            <li>Platform team approves; rebuild is automatic</li>
            <li>Personal tier: opt-in fork for individual experimentation</li>
          </ul>
          <div class="rh-logo">Red Hat</div>
        </section>

      </section>

      <!-- ══ Slide 10: AI-assisted dev + Module B ════ -->
      <section>

        <!-- Core slide 10 -->
        <section class="content-light">
          <p class="section-marker">AI-Assisted Development</p>
          <h2>AI-assisted development</h2>
          <div class="mcp-layout">
            <div class="mcp-card">
              <h3>Ansible Devtools MCP</h3>
              <ul>
                <li>Lint &amp; auto-fix</li>
                <li>Scaffold projects</li>
                <li>Navigate collections</li>
                <li>Build execution environments</li>
              </ul>
            </div>
            <div class="mcp-card">
              <h3>AAP MCP</h3>
              <ul>
                <li>Job management</li>
                <li>Inventory queries</li>
                <li>System monitoring</li>
                <li>Gateway endpoints</li>
              </ul>
            </div>
          </div>
          <div class="rh-logo">Red Hat</div>
          <aside class="notes">
            Both MCP servers are tech preview. Works with Claude Code, VS Code
            Copilot Chat, Gemini, Cursor, and other MCP-compatible tools — list
            is illustrative, not exhaustive.
          </aside>
        </section>

        <!-- Module B: AI-Assisted Development -->
        <section class="divider-dark">
          <h2>AI-Assisted Development Deep Dive</h2>
          <div class="rh-logo">Red Hat</div>
        </section>

        <section class="content-light">
          <p class="section-marker">Module B — AI Deep Dive</p>
          <h2>MCP architecture</h2>
          <ul>
            <li>Devtools MCP: exposes ADT toolchain to any MCP-compatible AI assistant</li>
            <li>AAP MCP: connects to AAP 2.6.4+ gateway for job, inventory, and monitoring APIs</li>
            <li>Both run inside devcontainers and Dev Spaces — no extra setup</li>
          </ul>
          <div class="rh-logo">Red Hat</div>
        </section>

        <section class="content-light">
          <p class="section-marker">Module B — AI Deep Dive</p>
          <h2>Demo scenarios</h2>
          <ul>
            <li>Scaffold a collection, lint it, fix violations — all via AI prompt</li>
            <li>Query AAP inventory, launch a job template, check status</li>
            <li>AI pair programming across the full content lifecycle</li>
          </ul>
          <div class="rh-logo">Red Hat</div>
        </section>

      </section>

      <!-- ══ Slide 11: Next steps + Module E ═════════ -->
      <section>

        <!-- Core slide 11 -->
        <section class="agenda">
          <h2>What should I do next?</h2>
          <div class="agenda-list">
            <div class="steps-grid" style="grid-template-columns:1fr;">
              <div class="step">
                <div class="step-number">1</div>
                <h3>Development Assessment</h3>
                <p class="text-muted">1-day workshop</p>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <h3>Proof of Concept</h3>
                <p class="text-muted">Red Hat demos feasibility</p>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <h3>Implementation &amp; Onboarding</h3>
                <p class="text-muted">Deploy tooling, onboard teams</p>
              </div>
              <div class="step">
                <div class="step-number">4</div>
                <h3>Data-Driven Improvement</h3>
                <p class="text-muted">Grafana monitoring, iterate</p>
              </div>
            </div>
          </div>
          <div class="rh-logo">Red Hat</div>
          <aside class="notes">
            This is the engagement model. Start with the assessment — it's a 1-day
            whiteboard session.
          </aside>
        </section>

        <!-- Module E: Legacy Automation to Ansible -->
        <section class="divider-dark">
          <h2>Legacy Automation to Ansible</h2>
          <div class="rh-logo">Red Hat</div>
        </section>

        <section class="content-light">
          <p class="section-marker">Module E — Migration</p>
          <h2>x2Ansible</h2>
          <ul>
            <li>AI-assisted conversion: Chef, Puppet, BMC Bladelogic → Ansible</li>
            <li>Powered by OpenShift AI</li>
            <li>Converts recipes/manifests/jobs to Ansible roles and playbooks</li>
          </ul>
          <div class="rh-logo">Red Hat</div>
        </section>

        <section class="content-light">
          <p class="section-marker">Module E — Migration</p>
          <h2>Migration workflow</h2>
          <ul>
            <li>Assessment: inventory existing automation, identify conversion candidates</li>
            <li>Conversion: x2Ansible generates initial Ansible code</li>
            <li>Validation: review, test with molecule, refine</li>
            <li>Rollout: gradual cutover with parallel-run period</li>
          </ul>
          <div class="rh-logo">Red Hat</div>
        </section>

      </section>

      <!-- ══ Slide 12: Thank you ═════════════════════ -->
      <section class="thank-you">
        <h2>Thank you</h2>
        <p class="boilerplate">Red Hat is the world's leading provider of enterprise
          open source software solutions, using a community-powered approach to deliver
          high-performing Linux, cloud, container, and Kubernetes technologies.</p>
        <p class="social-links">
          linkedin.com/company/red-hat · youtube.com/user/RedHatVideos · facebook.com/redhatinc
        </p>
        <div class="rh-logo">Red Hat</div>
      </section>
```

- [ ] **Step 2: Visual verification**

```bash
cd deck && npm run dev
```

Walk through all slides sequentially with right-arrow. Verify:
- Slide 7: dark divider, "Scaling to the enterprise"
- Slide 8: content-light, Dev Containers with 4 bullet points
- Slide 9: content-light, Dev Spaces. Down-arrow → Module C (3 slides: tiers, rebuild, self-service)
- Slide 10: content-light, two MCP cards side by side. Down-arrow → Module B (2 slides: architecture, demos)
- Slide 11: agenda layout with 4 numbered steps. Down-arrow → Module E (2 slides: x2Ansible, workflow)
- Slide 12: red thank-you, centered text, boilerplate, social links

Press S to verify speaker notes on slides 7, 8, 9, 10, 11.

- [ ] **Step 3: Commit**

```bash
git add deck/index.html
git commit -m "$(cat <<'EOF'
feat: add core slides 7-12 with Modules B, C, E

Assisted-by: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: SVG logo placeholders

**Files:**
- Create: `deck/assets/redhat-logo-white.svg`
- Create: `deck/assets/redhat-logo-color.svg`

Simple text-based SVG placeholders. These will be replaced with real logo files later.

- [ ] **Step 1: Create `deck/assets/` directory**

```bash
mkdir -p deck/assets
```

- [ ] **Step 2: Create `deck/assets/redhat-logo-white.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 613 145" fill="none">
  <text x="10" y="90" font-family="Red Hat Display, sans-serif" font-size="72" font-weight="700" fill="#ffffff">Red Hat</text>
</svg>
```

- [ ] **Step 3: Create `deck/assets/redhat-logo-color.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 613 145" fill="none">
  <text x="10" y="90" font-family="Red Hat Display, sans-serif" font-size="72" font-weight="700" fill="#ee0000">Red Hat</text>
</svg>
```

- [ ] **Step 4: Update `.rh-logo` in `deck/css/redhat-theme.css` to use SVG (optional enhancement)**

For now, the text placeholder approach works. When real SVGs are provided, replace the `.rh-logo` div in every slide with:

```html
<img class="rh-logo" src="assets/redhat-logo-white.svg" alt="Red Hat" />
```

And update the CSS `.rh-logo` rule to:

```css
.reveal .slides section .rh-logo {
  position: absolute;
  bottom: 20px;
  right: 30px;
  height: 24px;
  width: auto;
  opacity: 0.7;
}
```

Skip this sub-step for now — text placeholders are fine until real logos arrive.

- [ ] **Step 5: Commit**

```bash
git add deck/assets/
git commit -m "$(cat <<'EOF'
feat: add SVG logo placeholders

Assisted-by: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: GitHub Actions deploy pipeline

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```bash
mkdir -p .github/workflows
```

```yaml
name: Deploy deck to GitHub Pages

on:
  push:
    branches: [main]
    paths:
      - 'deck/**'
      - '.github/workflows/deploy.yml'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: deck/package-lock.json

      - name: Install dependencies
        working-directory: deck
        run: npm ci

      - name: Build
        working-directory: deck
        run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: deck/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "$(cat <<'EOF'
ci: add GitHub Actions pipeline for deck deployment

Assisted-by: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Final integration test and polish

**Files:**
- Possibly modify: `deck/css/redhat-theme.css` (fixes from visual review)
- Possibly modify: `deck/index.html` (fixes from visual review)

- [ ] **Step 1: Full visual walkthrough**

```bash
cd deck && npm run dev
```

Walk through the entire deck verifying:
1. Slide count: 12 core slides visible with right-arrow only
2. Module entry: down-arrow on slides 4, 6, 9, 10, 11 enters vertical slides
3. Module skip: right-arrow on slides 4, 6, 9, 10, 11 skips to next core slide
4. Speaker notes: press S, verify notes appear on slides 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
5. Typography: Red Hat Display on all headings, Red Hat Text on body
6. Colors: red (`#ee0000`) on accents/dividers, gray-80 (`#292929`) on dark slides
7. Persistent elements: red accent bar on content slides, "Red Hat" bottom-right on all slides
8. Slide number: shows current/total in bottom corner

- [ ] **Step 2: Production build verification**

```bash
cd deck && npm run build && npm run preview
```

Verify preview matches dev server exactly.

- [ ] **Step 3: Fix any visual issues found**

Apply CSS or HTML fixes as needed. Common issues:
- Text overflow on dense slides → reduce font-size or break content
- Vertical alignment on flex/grid layouts → adjust `align-items`
- Module slides not nesting correctly → verify `<section>` wrapping

- [ ] **Step 4: Final commit (if changes were made)**

```bash
git add deck/
git commit -m "$(cat <<'EOF'
fix: polish visual issues from integration review

Assisted-by: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```
