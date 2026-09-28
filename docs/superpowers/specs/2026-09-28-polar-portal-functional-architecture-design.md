# Polar Science Portal: Functional Architecture & Layout Specification

**Problem Statement Code:** SIH26063  
**Agency:** Ministry of Earth Sciences (MoES) / National Centre for Polar and Ocean Research (NCPOR)  
**Topic:** Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal  
**Date:** 2026-09-28  
**Status:** Approved Design Specification  

---

## 1. Executive Summary & Purpose

India operates continuous scientific missions across the **Three Poles**:
- **Antarctica (South Pole):** Maitri (1989), Bharati (2012), and historical Dakshin Gangotri (1983).
- **Arctic (North Pole):** Himadri Station (Ny-Ålesund, Svalbard), IndARC underwater mooring observatory.
- **Himalayas (The Third Pole):** Himansh Station (Chandra Basin, Spiti Valley, 4,080m).

Over 40+ years of expeditions, scientists have gathered petabytes of atmospheric sensors, ocean CTD profiles, ice core data, 4K UAV drone mapping, and field photography. However, this knowledge remains trapped in dense academic PDFs and obsolete archives that neither students nor journalists can access.

The portal provides an end-to-end bridge:
1. **The Knowledge Repository:** Searchable scientific papers, Dublin Core metadata, and in-browser interactive plotting for researchers.
2. **The Outreach & Publishing Engine:** Translating dense 50-page monographs into plain-English explainers, PIB press releases, and social media posts with verifiable, citation-locked source proofs.
3. **The Governance Gate:** Mandatory scientist sign-off before any public communication is scheduled.

---

## 2. No-Slop Terminology & Navigation Architecture

All over-engineered, buzzword-heavy labels have been replaced with clear, intuitive, human terms:

| Legacy / Buzzwordy Label | Clean, Human Name | Navbar Label | Core Purpose |
| :--- | :--- | :--- | :--- |
| **Polar Command Center** | Live Stations & Overview | **Home** | Live temperature ticker, Three Poles gateway, and portal search. |
| **Polar Explorer Map** | Station Map | **Map** | Circumpolar map of India's research bases, ship voyages, and sea ice. |
| **Ask-the-Data / In-Browser Visualizer** | Data & Charts | **Data** | Select weather or ocean data and view instant interactive graphs. |
| **Knowledge Repository** | Research Papers & Reports | **Papers** | Searchable archive of official expedition reports, PDFs, and DOIs. |
| **Multi-Tier Research Explainer** | Simplified Research | **Explainer** | Read dense academic papers at 4 reading levels (Middle School to Researcher). |
| **AI Outreach Studio** | Post & News Generator | **Draft Posts** | Turn a heavy report into news articles and social posts with citation locks. |
| **Mandatory Editorial Review Queue** | Scientist Approvals | **Approvals** | Governance Kanban where scientists fact-check and sign off on drafts. |
| **Media Vault (MAM)** | Photos & Videos | **Media** | High-res drone reels, photographs, and field audio with CC licensing. |
| **Expedition Replay** | Ship Journey Tracker | **Voyages** | Replay MV Vasiliy Golovnin’s route from Goa port to Antarctica day-by-day. |
| **Ask a Scientist Hub** | Ask a Scientist | **Q&A** | Public-to-researcher inquiry channel. |
| **Telemetry Anomaly Alerts** | Weather & Station Alerts | **Alerts** | Automated alerts for extreme weather storms or telemetry anomalies. |

---

## 3. High-Level Website Flow

The user journey is organized into three natural paths originating from the front door:

```text
                           ┌─────────────────────────┐
                           │      1. HOME PAGE       │
                           │  (Live Weather + Stats) │
                           └────────────┬────────────┘
                                        │
        ┌───────────────────────────────┼───────────────────────────────┐
        ▼                               ▼                               ▼
 [ PATH A: EXPLORE ]           [ PATH B: RESEARCH ]            [ PATH C: PUBLISH ]
 2. Station Map                4. Papers & Reports             6. Easy Explainer
    (Where are stations?)         (Official PDFs)                 (Simplified text)
        │                               │                               │
        ▼                               ▼                               ▼
 3. Photos & Videos            5. Data & Charts                7. Draft Posts ➔ 8. Approvals
    (High-res drone & pics)       (Interactive graphs)            (Generate & scientist check)
```

---

## 4. Screen-by-Screen Layout Specifications ("What Goes Where")

### Screen 1: Home Page (Live Stations & Overview)
* **Top Weather Ticker (Height: ~44px):** Streaming live conditions from AWS sensors (Bharati: -14°C, 32 km/h wind | Maitri: -11°C | Himadri: -2°C | Himansh: -6°C).
* **Hero Search Bar:** Centralized search supporting natural language (e.g., *"IndARC salinity"*, *"Bharati winter storms"*, *"41st IAE report"*).
* **Three Poles Cards Grid (3 Columns):**
  - Card 1: Antarctica (Bharati & Maitri, 40+ years history).
  - Card 2: Arctic (Himadri Station & IndARC underwater fjord mooring).
  - Card 3: Himalayas (Himansh High-Altitude Station, Lahaul-Spiti).
* **Quick Access Action Strip:** 4 prominent shortcuts: `[Explore Map]`, `[Plot Data]`, `[Read Papers]`, `[View Photos]`.

### Screen 2: Data & Charts (The Interactive Graph Workbench)
* **Top Filter Bar:** Dropdowns for Station (All, Bharati, Maitri, Himadri, IndARC), Scientific Domain (Atmosphere, Cryosphere, Ocean, Biology), and Year.
* **Left Panel (30% Width) - Dataset Catalog:**
  - Searchable list of 700+ verified datasets.
  - Cards show: Title, File Format tag (`.nc`, `.csv`), Year, and station badge.
  - Active selection indicator.
* **Right Panel (70% Width) - Interactive Plotting Workbench:**
  - Dataset Header with title, DOI, and Dublin Core metadata.
  - Dynamic interactive SVG/Canvas chart (time-series, depth profiles) with hover tooltips and metric toggles (Min, Max, Mean).
  - Statistical Summary Cards: Instant min, max, average, and data completeness metrics.
  - Data Export & Handoff Action Bar: `[Download CSV]`, `[Download NetCDF Meta]`, `[⚡ Create Public Post from this Data]`.

### Screen 3: Research Papers & Reports (The Digital Archive)
* **Top Search & Category Filter:** Full-text keyword search + expedition number filter (e.g. *1st to 45th IAE*).
* **Left Panel (35% Width) - Reports List:**
  - Card list showing report title, expedition number, lead scientist/PI, publication year, and format badges.
* **Right Panel (65% Width) - Paper Dossier & Action Hub:**
  - Document Title, Abstract, Participating Scientists, and Station affiliation.
  - Direct Functional Handoffs:
    - Button 1: `[📖 Read Simplified Version]` ➔ Navigates to **Explainer** with this paper pre-loaded.
    - Button 2: `[✍️ Generate News Release / Post]` ➔ Navigates to **Draft Posts** with this document attached.
    - Button 3: `[⬇ Download Official PDF]` ➔ Direct archive PDF access.

### Screen 4: Draft Posts (The Grounded Outreach Studio)
* **Top Controls:** Document picker dropdown + Format selector pills (`[Newspaper Press Release]`, `[High School Explainer]`, `[Twitter/X Thread]`, `[Policy Brief]`).
* **50/50 Split Canvas:**
  - **Left Half (50%) - Source Evidence Inspector:**
    - Authentic document text, tables, and figures.
    - Active glowing highlights over source passages.
    - Auto-scrolls to the exact page/paragraph when a citation is clicked.
  - **Right Half (50%) - Generated Public Draft:**
    - Generated article or social thread formatted with numerical citation tags `[1]`, `[2]`.
    - Clicking `[1]` smoothly focuses and outlines the source passage in the Left Half.
    - Verification Badge: *"100% Citation Locked · 0 Hallucinations"*.
* **Bottom Action Drawer:**
  - `[✎ Edit Text Manually]`
  - `[✉ Dispatch to Scientist Approvals]` (assigns scientist reviewer).
  - `[⬇ Export Press Kit ZIP]`.

### Screen 5: Scientist Approvals (The Review Queue)
* **Top Metric Banner:** Real-time counts (`4 In Review`, `2 Revisions Requested`, `7 Approved`, `3 Scheduled`).
* **4-Column Kanban Governance Board:**
  1. *Column 1: AI Drafts Generated*
  2. *Column 2: In Scientist Review (Fact-Checking & Source Audit)*
  3. *Column 3: Approved & Digitally Signed (Reviewer Sign-off)*
  4. *Column 4: Scheduled Dissemination (Antarctica Day, National Science Day)*
* **Inspection Modal:** Clicking `[Review & Sign]` opens side-by-side citation verification, reviewer notes box, and `[Approve]` / `[Request Edits]` actions.

### Screen 6: Station Map (Geospatial Context)
* **Top Layer Toggles:** Pole Switcher (Antarctica EPSG:3031, Arctic EPSG:3413, Himalayas), Station markers, Sea ice boundaries, Vessel voyage routes.
* **Interactive Map Canvas (70%):** Vector circumpolar visualization with active station pins.
* **Floating Station Dossier (30%):** Clicking any station displays live weather telemetry, station history, and 3 1-click links:
  - `[📊 View Station Datasets]`
  - `[🚢 Track Expedition Voyages]`
  - `[📸 Open Station Photos & Videos]`

---

## 5. Cross-Module Data Handoffs & State Flow

To ensure the portal operates as a single cohesive system:
1. **Map ➔ Data / Media:** Clicking a station pin on the Map passes `stationId` to Data or Media to pre-filter assets.
2. **Papers ➔ Explainer:** Clicking "Read Simplified" on any report passes `reportId` to Explainer, immediately displaying the 4 reading levels.
3. **Papers ➔ Draft Posts:** Clicking "Generate Post" passes `reportId` to Draft Posts, pre-loading the PDF on the left and drafting text on the right.
4. **Draft Posts ➔ Approvals:** Clicking "Dispatch to Approvals" adds a new ticket to the Scientist Review Queue with citation locks intact.
5. **Data ➔ Draft Posts:** Clicking "Create Post from Data" transfers calibrated telemetry charts and summary stats directly into the Post Generator.

---

## 6. Implementation Phasing

1. **Phase 1: Navigation & Terminology Refactor:**
   - Update `Header.jsx`, `App.jsx`, and all view titles to use the clean human names.
   - Group the navigation into Primary Tabs and Action Tools without clutter.
2. **Phase 2: Data Studio & Repository Layout Alignment:**
   - Standardize `DatasetsHub.jsx` and `KnowledgeRepository.jsx` into the Left Catalog + Center Interactive Graph layout.
3. **Phase 3: Cross-Module Pipeline Connections:**
   - Wire explicit 1-click handoffs between Papers, Explainer, Draft Posts, and Approvals.
4. **Phase 4: Station Map & Media Integration:**
   - Wire station clicks to filter data and photo archives.
