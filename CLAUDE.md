# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`hrm-wc` — A Lit 3 web component (`<hr-career-pyramid>`) that renders an interactive HR organizational pyramid with column-based highlighting.

## Commands

- `bun dev` — Start Vite dev server
- `bun run build` — Production build via Vite

## Architecture

- **Single component**: `src/hr-career-pyramid.js` — `HrCareerPyramid extends LitElement`, registered as `<hr-career-pyramid>`
- **Entry point**: `index.html` loads the component on a black background
- **Build config**: `vite.config.js` — builds as IIFE (`dist/hr-career-pyramid.iife.js`) with Lit bundled in for direct browser use
- **Package manager**: Bun (`bun.lock`)

## Component Design

- 3 shared top rows (CHRO, HRD, HRBP MANAGER) — always visible, not interactive
- 5 branch rows × 6 columns (C&B, TA, HRBP, HR GENERAL, OD, L&D) — clicking a filled cell highlights the entire column
- Pyramid shape via `_rowWidth(index)` linear interpolation (8% tip → 100% base)
- SVG overlay for diagonal angle lines
- Responsive sizing using container query units (`cqw`) with `clamp()` fallbacks
