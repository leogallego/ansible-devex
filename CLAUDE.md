# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repository Is

This repository supports the **Ansible Developer Experience (DevEx)** initiative -- the evolution of Ansible development from individual developer setup to enterprise-governed workspaces. It currently contains reference materials (presentations, RFCs, solution guides) and will grow to include tooling such as a slide deck maker, automation scripts, and other utilities.

## Domain Context

The Ansible DevEx initiative addresses three interconnected areas:

1. **Ansible Development Tools (ADT)** -- a bundled toolchain (ansible-creator, ansible-lint, molecule, ansible-navigator, ansible-builder, ansible-sign, pytest-ansible, tox-ansible) delivered via uv/pip, RPM, dev container, or Dev Spaces. The maturity path is: Crawl (uv/pip) -> Walk (RPM) -> Run (Dev Container) -> Fly (Dev Spaces).

2. **Ansible Development Workspaces** -- browser-based environments using Red Hat OpenShift Dev Spaces with the ADT container image (`ghcr.io/ansible/community-ansible-dev-tools` or the Red Hat supported variant). Zero local dependencies -- developers only need a browser.

3. **Tiered Image Layering Strategy** -- a 4-tier model for customizing Dev Spaces container images:
   - Tier 1: Upstream base (ansible-devspaces, managed by ansible-dev-tools project)
   - Tier 2: Org/domain image (via OpenShift BuildConfig or CEKit factory for 5+ variants)
   - Tier 3: Team image (Containerfile in workspace repo, auto-rebuilds via ImageStream triggers)
   - Tier 4: Personal image (opt-in fork, self-service)

4. **AI-Assisted Development** -- MCP servers that connect AI assistants to Ansible tooling:
   - Ansible Devtools MCP Server (`@ansible/ansible-mcp-server`) -- exposes ADT tools (lint, scaffold, navigate, build)
   - AAP MCP Server -- exposes AAP 2.6.4+ gateway endpoints (job management, inventory, system monitoring, etc.)

## Current Repository Structure

### Slide Decks

- **`open-slide/`** -- **primary presentation deck**, built with [open-slide.dev](https://open-slide.dev). Slides are React/TSX components under `open-slide/slides/ansible-devex/index.tsx`. Run with `pnpm dev` from the `open-slide/` directory. See `open-slide/CLAUDE.md` for authoring rules and available skills.
- **`deck/`** -- legacy Reveal.js deck (v5.2.1, Vite-based). Kept for reference but no longer the active presentation. Run with `npm run dev` from the `deck/` directory.

### Reference Content

All reference content lives under `resources/`:

- `README-Ansible-DevTools.md` -- main solution guide: ADT installation methods, AI-assisted development setup, validation steps
- `rfc-tiered-image-strategy.md` -- draft RFC for tiered image layering (tracks `ansible-devspaces-cop#1`, related to `ansible/ansible-dev-tools#738`)
- PDF presentations -- conference and internal slide decks covering the content lifecycle and developer journey

## Working With This Content

- Some PDFs contain Red Hat confidential/NDA-only material -- do not extract or redistribute that content
- YAML examples in the RFC use OpenShift-specific API objects (ImageStream, BuildConfig) -- verify against OpenShift docs when modifying
- The RFC references several upstream repos: `ansible/ansible-dev-tools`, `redhat-cop/devspaces-images`, `rhpds/ansible-dev-tools-automation`
