# Ansible DevEx Slide Deck Builder — Design Spec

## Overview

A reveal.js + Vite slide deck builder that produces branded Red Hat Ansible Automation Platform presentations. The first deck tells the Ansible Developer Experience evolution story — from individual developer chaos to enterprise-governed workspaces — in a simplified, modular narrative.

## Goals

1. **Simplified narrative** — distill 4 overlapping PDF decks (60+ slides total) into one coherent ~12-slide core story with optional deep-dive modules
2. **Red Hat branding** — match the official Ansible Automation Platform presentation template (colors, typography, layouts, logo placement)
3. **Modular sections** — core narrative works standalone; presenters add/skip deep-dive modules per audience
4. **Content-driven** — all slides inline in `index.html`, theme in CSS, easy to update without touching framework code
5. **Deployable** — GitHub Actions builds and deploys to GitHub Pages on push to main

## Framework

**Reveal.js 5.x + Vite** — chosen for mature ecosystem (speaker notes, PDF export, vertical slides for modules), CSS theming that maps directly to the Red Hat template layouts, and high confidence in delivery.

## Brand Design System

### Colors (from official template)

| Token | Hex | Usage |
|-------|-----|-------|
| red-50 (Red Hat Red) | `#ee0000` | Primary accent, headings, CTAs |
| red-60 | `#a60000` | Hover/active states |
| red-70 | `#5f0000` | Dark red accents |
| black | `#000000` | Dark backgrounds, primary text |
| gray-80 | `#292929` | Dark content slides |
| gray-60 | `#4d4d4d` | Secondary text |
| gray-20 | `#e0e0e0` | Borders, subtle dividers |
| white | `#ffffff` | Light backgrounds, reversed text |
| purple-50 | `#5e40be` | Reserved — template guide/skip slides only |
| purple-70 | `#21134d` | Reserved — template guide/skip slides only |
| teal-50 | `#37a3a3` | Diagram accents, tertiary color |

### Typography

- **Red Hat Display** — headings (Bold, Medium)
- **Red Hat Text** — body copy (Regular, Light)
- **Placeholder** — `system-ui, -apple-system, sans-serif` until font files are provided
- Google Fonts fallback: `https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700;900&family=Red+Hat+Text:wght@300;400;500&display=swap`

### Slide Layout Types

Mapped from the official template PDF:

1. **Title slide (red bg)** — full red background, white product logo top-left, large white title, subtitle below, presenter names, Red Hat logo bottom-right
2. **Title slide (dark bg)** — black/gray-80 background, same layout, optionally with Ansible icon imagery on right
3. **Section divider (red)** — full red background, large white centered text, Red Hat logo bottom-right
4. **Section divider (dark)** — gray-80 background, white text, red vertical accent bar left
5. **Content slide (light)** — white background, red section marker text + red vertical bar top-left, title area, content area, Red Hat logo bottom-right, version number placeholder
6. **Content slide (dark)** — gray-80 background, same structural layout, white/light text
7. **Agenda/list slide** — large red heading left (~40% width), bullet list right (~60% width), light or dark variants
8. **Split layout** — image/diagram area left, text content right (or reversed)
9. **Thank you slide** — red or dark background, "Thank you" heading, company boilerplate, social links, Red Hat logo

### Persistent Elements

- **Red vertical accent bar** — 4px wide, top-left corner on content slides
- **Section marker** — red text label top-left (below accent bar) identifying current section
- **Red Hat logo** — bottom-right on all slides (fedora hat icon + "Red Hat" wordmark)
- **Version number** — bottom-right, small text (optional)

## Deck Content: Ansible Developer Experience

### Core Narrative (~12 slides)

| # | Layout Type | Title | Content | Speaker Notes |
|---|------------|-------|---------|---------------|
| 1 | Title (red) | The Ansible Developer Experience | Subtitle: "From individual setup to enterprise workspace" / Presenter name + title | Set context: this is about the journey every automation team goes through |
| 2 | Content (light) | The onboarding problem | Timeline visualization: Day 1 (kick-off) -> Day 10 (laptop) -> Day 20 (IDE) -> Day 30 (git access) -> Day 60 (still waiting for Linux/sudo). Key message: "Months before writing a single playbook" | "Adjust these numbers to your customer — regulated industries skew higher, cloud-native shops lower. The point isn't the exact days, it's that none of them are 5 minutes." |
| 3 | Divider (red) | What if it took 5 minutes? | | Pause for effect. This is the thesis of the talk. |
| 4 | Content (light) | Ansible Development Tools | Unified view of the bundled toolchain organized by lifecycle stage: Create (ansible-creator, ade), Test (molecule, ansible-lint, pytest-ansible, tox-ansible), Deploy (ansible-builder, ansible-navigator, ansible-sign). One slide, not tool-by-tool. | "ADT is one install — `adt --version` shows all tools with compatible versions. No more dependency conflicts." |
| 5 | Content (light) | The maturity path | 4-column visual: Crawl (pip, ~30min, low consistency) -> Walk (RPM, ~15min, medium) -> Run (Dev Container, ~10min, high) -> Fly (Dev Spaces, ~5min, highest). Arrow progression left to right. | "Most customers are somewhere between Crawl and Walk. The container-based methods are the target." |
| 6 | Content (light) | The content lifecycle | Simplified Create -> Test -> Deploy flow. Inner loop (developer: write, lint, test, iterate) + outer loop (CI/CD: PR, GitHub Actions, controller sync). Clean diagram, not the busy existing versions. | "Two loops: the inner loop is your developer's daily experience, the outer loop is what happens when they push." |
| 7 | Divider (dark) | Scaling to the enterprise | | Transition: we've shown the tools, now how do you roll them out to 50 or 500 developers? |
| 8 | Content (light) | Dev Containers: team consistency | Key points: same image, same tools, same config. `.devcontainer/` in repo. Works on any OS with VS Code + container runtime. Nested Podman for molecule/builder. | "This is the sweet spot for most teams starting out. Zero infrastructure investment, immediate consistency." |
| 9 | Content (light) | Dev Spaces: zero local dependencies | Key points: browser-only, ~5 minutes to coding, centrally governed, devfile.yaml defines everything. Platform team manages images, developers just click Create. | "The value prop for Dev Spaces is governance + zero desktop requirements. IT loves it because nothing runs locally." |
| 10 | Content (light) | AI-assisted development | Two MCP servers: Ansible Devtools MCP (lint, scaffold, navigate, build) + AAP MCP (jobs, inventory, monitoring). AI as pair programmer across the full lifecycle. | "Both MCP servers are tech preview. Works with Claude Code, VS Code Copilot Chat, Gemini, Cursor, and other MCP-compatible tools — list is illustrative, not exhaustive." |
| 11 | Agenda (light) | What should I do next? | 4 steps: Development Assessment (1-day workshop) -> Proof of Concept (Red Hat demos feasibility) -> Implementation & Onboarding (deploy tooling, onboard teams) -> Data-Driven Improvement (Grafana monitoring, iterate) | "This is the engagement model. Start with the assessment — it's a 1-day whiteboard session." |
| 12 | Thank you (red) | Thank you | Red Hat boilerplate + social links (LinkedIn, YouTube, Facebook, X) + Red Hat logo | |

### Optional Deep-Dive Modules

Implemented as vertical slides (press down-arrow to enter, right-arrow to skip). Each module has a section divider slide as its entry point. Module entry points in the core narrative:

| Module | Entry after core slide | Trigger |
|--------|----------------------|---------|
| A | Slide 4 (ADT tools) | Down-arrow after tools overview |
| B | Slide 10 (AI-assisted dev) | Down-arrow after AI overview |
| C | Slide 9 (Dev Spaces) | Down-arrow after Dev Spaces overview |
| D | Slide 6 (Content lifecycle) | Down-arrow after lifecycle diagram |
| E | Slide 11 (What should I do next?) | Down-arrow before call-to-action |

**Module A: ADT Tools in Detail** (3 slides)
- ansible-creator: scaffolding collections, playbooks, devcontainers, EE templates
- ansible-lint: opinionated profiles, `--fix`, CI integration
- molecule: testing scenarios, shared state, collection-aware testing

**Module B: AI-Assisted Development** (2 slides)
- MCP architecture: Devtools MCP (lint, scaffold, navigate, build) + AAP MCP (gateway endpoints, job management, inventory)
- Demo scenarios: AI pair programming from devcontainer/Dev Spaces across the full content lifecycle

**Module C: Dev Spaces & Image Customization** (3 slides)
- Tiered image strategy: Upstream -> Org -> Team -> Personal
- Auto-rebuild cascade via OpenShift ImageStream triggers
- Self-service workflow for team/personal image requests

**Module D: CI/CD Integration** (2 slides)
- Outer loop: GitHub Actions (molecule CI, ansible-lint, compliance scanning)
- Monitoring: Grafana dashboards for development workflow observability

**Module E: Legacy Automation to Ansible** (1-2 slides)
- x2Ansible: Chef/Puppet/Bladelogic to Ansible conversion with OpenShift AI
- Migration workflow and assessment approach

## Project Structure

```
ansible-devex/
  deck/
    package.json            # vite, reveal.js deps
    vite.config.js          # vite config with reveal.js setup
    index.html              # main deck — reveal.js sections
    css/
      redhat-theme.css      # Red Hat branded reveal.js theme
    assets/
      redhat-logo-white.svg
      redhat-logo-color.svg
      ansible-icon.svg
      redhat-hat.svg
    js/
      main.js               # reveal.js initialization + plugins
  resources/                # existing PDFs and docs (unchanged)
  .github/
    workflows/
      deploy.yml            # build + deploy to GitHub Pages
  .gitignore
  CLAUDE.md
```

## Dev Workflow

- `cd deck && npm install` — install dependencies
- `npm run dev` — start Vite dev server with hot reload
- `npm run build` — produce static `dist/` for deployment
- `npm run preview` — preview production build locally

## GitHub Actions Pipeline

On push to `main`:
1. Checkout repo
2. `cd deck && npm ci && npm run build`
3. Deploy `deck/dist/` to GitHub Pages

## Font Strategy

1. Try Google Fonts CDN for Red Hat Display + Red Hat Text (available on Google Fonts)
2. If unavailable or offline, fall back to system sans-serif
3. User can later drop `.woff2` files into `assets/fonts/` and update CSS `@font-face`

## Open Items

- **Logo SVGs** — need Red Hat logo and Ansible icon SVG files (can placeholder with CSS text initially)
- **Font files** — Red Hat Display available on Google Fonts; user will confirm or provide `.woff2` files
- **Onboarding timeline** — Day counts are a first draft, will iterate based on feedback
- **Background imagery** — title slide variants use 3D rendered Ansible artwork from the template; we'll use solid color backgrounds initially, can add imagery later
