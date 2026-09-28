# Implementation Plan: Polar Science Portal Functional Architecture & Layout

**Spec Reference:** `docs/superpowers/specs/2026-09-28-polar-portal-functional-architecture-design.md`  
**Problem Statement:** SIH26063 (Ministry of Earth Sciences / NCPOR)  
**Date:** 2026-09-28  
**Status:** In Progress  

---

## 1. Goal

Implement the approved functional architecture and screen layout updates for the Polar Science Portal:
1. Refactor navigation and terminology across the entire app to replace all AI-slop/buzzword labels with clean, human names.
2. Structure the top-level navigation into Primary Tabs (*Home, Map, Data, Papers, Media*) and Action Tools (*Explainer, Draft Posts, Approvals, Voyages, Q&A, Alerts*).
3. Align the screen layouts so the Data Studio follows the 30% Catalog / 70% Interactive Plot workbench layout.
4. Wire active 1-click cross-module data pipelines (Map ➔ Data, Papers ➔ Explainer, Papers ➔ Draft Posts, Draft Posts ➔ Approvals).

---

## 2. Proposed Changes & Task Breakdown

### Task 1: Navigation & Terminology Refactor (`src/components/Header.jsx`)
- **Files Touched:** `src/components/Header.jsx`
- **Details:**
  - Rename primary navigation links to:
    - `home`: **Home** (icon: `Compass`)
    - `explore`: **Map** (icon: `MapPin`)
    - `data`: **Data** (icon: `BarChart3`)
    - `papers`: **Papers** (icon: `BookOpen`)
    - `media`: **Media** (icon: `Film`)
  - Structure the dropdown menu into **Action Tools**:
    - `research`: **Explainer** (*Read simplified research at 4 reading levels*)
    - `outreach`: **Draft Posts** (*Turn papers into news articles & social threads*)
    - `review`: **Approvals** (*Scientist fact-check & sign-off gate*)
    - `expeditions`: **Voyages** (*Ship journey route tracker from Goa to Antarctica*)
    - `scientist`: **Q&A** (*Ask active polar researchers questions*)
    - `anomalies`: **Alerts** (*Weather storms & telemetry warnings*)
  - Add clean visual badges to the dropdown indicating real-time status (e.g., active review count, alert status).

### Task 2: Central App Routing & State Handoffs (`src/App.jsx`)
- **Files Touched:** `src/App.jsx`
- **Details:**
  - Update `handleNavigate` to support clean aliases (`papers`, `data`, `map`, `explainer`, `drafts`, `approvals`, `voyages`, `media`, `qa`, `alerts`).
  - Add state for filtering across screens: `preselectedStationId`, `preselectedReportId`, `preselectedDatasetId`.
  - Update page header titles and breadcrumbs for each active view to reflect human-readable titles (e.g. "Research Papers & Reports", "Data & Charts", "Scientist Approvals").
  - Update the footer quick links and descriptions to match the new taxonomy.

### Task 3: Papers & Repository Layout & Action Handoffs (`src/components/KnowledgeRepository.jsx`)
- **Files Touched:** `src/components/KnowledgeRepository.jsx`, `src/components/DatasetsHub.jsx`
- **Details:**
  - Ensure the Papers view has clear 1-click action buttons on selected reports:
    - `[📖 Read Simplified Version]` ➔ triggers navigation to `research` (Explainer) with the selected report.
    - `[✍️ Generate News / Social Post]` ➔ triggers navigation to `outreach` (Draft Posts) with the selected report.
    - `[⬇ Download PDF]` ➔ direct mock report access.
  - In `DatasetsHub.jsx`, ensure the 30% Catalog / 70% Interactive Plot workbench layout is maintained with seamless metric toggling.

### Task 4: Station Map Floating Dossier & Shortcuts (`src/components/PolarExplorerMap.jsx`)
- **Files Touched:** `src/components/PolarExplorerMap.jsx`
- **Details:**
  - In the Station Dossier panel (Bharati, Maitri, Himadri, IndARC, Himansh), ensure the action buttons trigger real navigation:
    - `[📊 View Station Datasets]` ➔ calls `onNavigate('data', { stationId })`.
    - `[🚢 Track Expedition Voyages]` ➔ calls `onNavigate('expeditions')`.
    - `[📸 Open Photos & Videos]` ➔ calls `onNavigate('media', { stationId })`.

### Task 5: Post Generator to Approvals Pipeline Verification (`src/components/OutreachHub.jsx`, `src/components/EditorialQueue.jsx`)
- **Files Touched:** `src/components/OutreachHub.jsx`, `src/components/OutreachStudioView.jsx`, `src/components/EditorialQueue.jsx`
- **Details:**
  - Ensure the citation locking side-by-side view clearly highlights source lines upon citation pill click.
  - Ensure clicking `[✉ Dispatch to Scientist Approvals]` dispatches the item to the review queue with reviewer assignment.
  - Ensure the Approvals Kanban board lets the user approve drafts and schedule them on the calendar.

---

## 3. Verification & Validation

1. **Lint & Build Check:** Run `npm run build` or `npx oxlint` to ensure 0 syntax or runtime errors.
2. **Browser Interaction Test:**
   - Test clicking each tab in the refactored header.
   - Test Map station dossier shortcut ➔ jumps to Data.
   - Test Paper "Read Simplified" ➔ jumps to Explainer with pre-selected report.
   - Test Paper "Generate Post" ➔ jumps to Draft Posts with pre-loaded document.
   - Test Draft Posts "Dispatch to Approvals" ➔ shows toast and adds card to Approvals Kanban.
