# Varun Pahuja — Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel&logoColor=white)

<br />

**"I build systems where web meets hardware."**

A bespoke developer portfolio blending Japanese cyberpunk minimalism with tactile hardware telemetry, 3D WebGL scenes, interactive architectural micro-proofs, a procedural Web Audio synthesizer, and a client-side AI copilot.

[Live Demo](https://varunpahuja04.vercel.app) • [Report Issue](https://github.com/varun-pahuja/portfolio/issues) • [Contact](mailto:varunpahuja2005@gmail.com)

</div>

---

## 🧭 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Interactive Systems & Micro-Proofs](#-interactive-systems--micro-proofs)
- [Architecture Dossiers & Case Studies](#-architecture-dossiers--case-studies)
- [Terminal Drawer & AI Copilot](#-terminal-drawer--ai-copilot)
- [Recruiter Fast-Track (Executive Mode)](#-recruiter-fast-track-executive-mode)
- [Social Sharing & OpenGraph Engine](#-social-sharing--opengraph-engine)
- [Tech Stack](#-tech-stack)
- [Performance & Zero-Jitter Optimization](#-performance--zero-jitter-optimization)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Featured Flagship Projects](#-featured-flagship-projects)
- [Contact & Connect](#-contact--connect)

---

## ⚡ Overview

This portfolio showcases the technical philosophy and flagship engineering builds of **Varun Pahuja** — Full-Stack Developer & IoT Engineer (B.Tech in Internet of Things at MITS Gwalior, CGPA: 8.06).

Engineered with **Next.js 16 (Turbopack)**, **React 19**, and **Three.js / React Three Fiber**, this site eschews static portfolios in favor of live, tactile interactions: an interactive 3D ESP32 logic analyzer playboard, real-time CRDT multi-user convergence simulators, AI vector similarity query consoles, an instant Quake-style drop-down CLI copilot, and a dedicated 15-second recruiter executive dossier.

---

## ✨ Key Features

- **🥋 Cyberpunk & Washi Japanese Aesthetic:** High-contrast palette inspired by traditional Japanese lacquerware, aged washi parchment, and futuristic cockpit telemetry HUDs.
- **🎨 5 Dynamic Kanji Themes:** Runtime palette switching with persistent `localStorage` support:
  - **Vermillion (朱)** — `#dc3545`
  - **Indigo (藍)** — `#4f46e5`
  - **Gold (金)** — `#c9a84c`
  - **Sakura (桜)** — `#e879a8`
  - **Jade (翠)** — `#2dd4a8`
- **⚡ Recruiter Fast-Track / Executive Mode:** Press <kbd>E</kbd> or click `EXEC` in the navbar/terminal for an instant 15-second high-signal engineering scan with 1-click email copy, verified impact metrics, and PDF CV export.
- **🤖 Tactical Terminal AI Copilot (`ask <query>`):** Zero-latency client-side semantic query engine in a Quake-style CLI drawer answering questions about sensor drift, CRDT models, or career background.
- **📐 4-System Architectural Dossiers:** Deep-dive case study inspectors covering *Air Mouse AI*, *SyncDoc*, *OceanEmbed*, and *webcmd* with hardware constraints, data pipelines, trade-offs, and empirical benchmarks.
- **🖼️ Universal Social Sharing Cards (WhatsApp / LinkedIn / X):** Dual RGB JPEG (`og-image.jpg`) and square mobile thumbnail (`og-thumb.jpg`) with OpenGraph `prefix` and `secure_url` tags for instant social link previews.
- **📡 Real-Time GitHub Telemetry:** Live streaming ticker pulling verified public commit activity for `varun-pahuja` via the GitHub API.
- **📄 Verified Resume Dossier:** Interactive CV modal accessible via navbar `CV` trigger, hero CTA, or CLI `resume` command.
- **📬 Direct Transmission Console:** Tactical client-side comms terminal with subject protocol routing, character telemetry, and audio packet dispatch.
- **🔊 Procedural Web Audio SFX:** 100% synthetic sound design generated via the Web Audio API without downloading audio assets (clicks, relays, terminal typing, switches, and boot tones).
- **🕹️ Easter Eggs & Diagnostics:**
  - Live Konami keycap tracker in the footer (<kbd>↑</kbd> <kbd>↑</kbd> <kbd>↓</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> <kbd>←</kbd> <kbd>→</kbd> <kbd>B</kbd> <kbd>A</kbd>) with real-time key glow and click-to-launch trigger.
  - Interactive Yin-Yang particle dispersion canvas animation (`道 — the way`).
  - DevTools console welcome greeting with diagnostic shortcuts.
- **🛰️ Cockpit Telemetry Rail:** Persistent vertical HUD side-rail tracking real-time sector progression (`00 HOME`, `01 BIO`, `02 CAD`, `03 BENTO`, `04 LOGS`, `05 COMMS`) with live scroll percentage telemetry.

---

## 🔬 Interactive Systems & Micro-Proofs

### 1. Hardware Playboard (`HardwarePlayboard.tsx`)
A fully interactive 3D WebGL circuit board simulator built with React Three Fiber:
- **Interactive LEDs:** Toggle 4 individually addressable surface-mount LEDs (Red, Green, Blue, Yellow).
- **CRT Logic Analyzer & Oscilloscope:** Real-time canvas rendering digital trace waveforms corresponding to pin logic states.
- **Microcontroller Controls:** Clock speed adjustments (0.5x to 3.0x), auto-sequencer triggers, and component telemetry inspection HUD.

### 2. SyncDoc CRDT Concurrency Engine (`ProjectsGrid.tsx`)
- Demonstrates distributed state consensus using **Yjs CRDTs** and **Lamport vector clocks**.
- Step-by-step interactive simulator displaying concurrent edits between Tokyo and Berlin nodes converging with zero merge conflicts.

### 3. Hackmatrix NASA Space Biology RAG (`ProjectsGrid.tsx`)
- Live vector similarity test bench querying NASA's Open Science Data Repository (630+ datasets).
- Interactive cosine similarity calculation and cited scientific evidence chunks.

### 4. OceanEmbed Subsurface Ocean Temp Reconstruction (`ProjectsGrid.tsx`)
- AI-driven oceanographic telemetry model predicting subsurface temperatures down to 1,000m depth from sea surface satellite observations (MoES / INCOIS Hackathon).
- Interactive depth probe HUD inspecting RMSE error tolerances across 15 depth layers.

### 5. webcmd Autonomous Agent Browser Infrastructure (`ProjectsGrid.tsx`)
- Self-learning browser caching infrastructure that cuts autonomous AI agent LLM token consumption by up to 90% via DOM hash pruning.
- Interactive token savings benchmark simulator comparing raw context costs against pruned DOM execution.

### 6. Omnipost Live Output Morphing (`ProjectsGrid.tsx`)
- Multi-platform AI content generator preview simulating dynamic tone adaptation across **X/Twitter**, **LinkedIn**, and **Instagram** with live latency metrics.

---

## 📐 Architecture Dossiers & Case Studies

Accessible by clicking **"Inspect Architecture"** on any project or toggling systems inside the inspector modal (`CaseStudyModal.tsx`):

| Case Study | Domain | Core Focus | Key Engineering Trade-off |
| :--- | :--- | :--- | :--- |
| **Air Mouse AI** | Embedded / ML | FreeRTOS Core 0, MPU-6050 I2C, BLE 5.0 HID report timing | *Complementary Filter vs Extended Kalman Filter (EKF):* 92% noise reduction with 80% lower CPU cycle overhead. |
| **SyncDoc** | Distributed Systems | YATA CRDT tree convergence, Lamport vector clocks, Redis Pub/Sub | *CRDTs vs Operational Transformation (OT):* Deterministic peer-to-peer merge without central mutex locks. |
| **OceanEmbed** | Deep Learning | ViT + 3D CNN, Copernicus SST/SSS/Altimetry fusion | *Hybrid ViT+CNN vs Pure 3D CNN:* Captures coastal upwelling + basin-wide dipole oscillations across 15 depths. |
| **webcmd** | Agent Infrastructure | Headless browser DOM AST parsing, Playwright CDP | *Accessibility Tree Hashing vs Raw HTML Minification:* Retains 100% interactive targets while pruning 90% tokens. |

---

## 🎮 Terminal Drawer & AI Copilot

Press <kbd>`</kbd> or <kbd>~</kbd> (or click **`CLI`** in the navigation bar) to summon the Quake-style drop-down terminal drawer (`TerminalDrawer.tsx`):

### Commands Reference:
- `ask <query>` or `ai <query>` — Query the client-side semantic AI Copilot regarding Varun's architecture, drift math, skills, or background.
- `exec` or `recruiter` — Launch the 15-second Recruiter Fast-Track Executive Dossier.
- `whoami` — Bio and technical philosophy.
- `skills` — Full-Stack & IoT technical arsenal.
- `iot` — Live virtual ESP32-WROOM-32D node telemetry (clock, heap, I2C bus, MQTT ping).
- `projects` — Key engineering builds and repositories.
- `resume` or `cv` — Display credentials and download the verified PDF resume.
- `bench` — Run an in-browser WebGL and JavaScript compute benchmark.
- `matrix` — Cyberpunk Kanji digital rain stream animation.
- `secrets` — Display hidden portfolio Easter eggs.
- `theme <id>` — Switch system palette (`vermillion`, `indigo`, `gold`, `sakura`, `jade`).
- `contact` — Display direct email, GitHub, and LinkedIn links.
- `clear` — Wipe the terminal output buffer.
- `exit` — Close the terminal drawer.

---

## ⚡ Recruiter Fast-Track (Executive Mode)

Designed specifically for hiring managers, founders, and recruiters who need high-signal credentials in under 15 seconds:
- **Instant Trigger:** Press <kbd>E</kbd> anywhere on the site, click `⚡ EXEC` in the navbar, or run `exec` in the terminal.
- **Core Metrics Bar:** 94.2% ML accuracy, <12ms CRDT sync, 15 ocean depth tiers, 90% agent token reduction.
- **One-Click Actions:** Direct email copy (with audio feedback), LinkedIn link, and verified PDF resume download.
- **Clean 1–2 Page Print Isolation:** Custom `@media print` rules hide all background 3D canvases, navigation bars, and website scroll pages, printing a crisp, ink-saving monochrome 1-to-2 page executive document without page duplication.

---

## 🖼️ Social Sharing & OpenGraph Engine

Optimized for high-conversion social link previews across **WhatsApp**, **LinkedIn**, **Twitter/X**, **Slack**, and **Discord**:
- **Dual Optimized Assets:**
  - `public/og-image.jpg` — 81 KB RGB JPEG (1200×630) formatted to satisfy strict WhatsApp mobile crawler requirements.
  - `public/og-thumb.jpg` — 33 KB RGB JPEG (400×400) square thumbnail for mobile chat bubbles.
  - `public/og-image.png` — 113 KB RGB PNG fallback.
- **Dynamic Origin Detection:** Automatically resolves `process.env.VERCEL_PROJECT_PRODUCTION_URL` or defaults to `https://varunpahuja04.vercel.app`.
- **OpenGraph Protocol Compliant:** Injects `prefix="og: http://ogp.me/ns#"` and explicit `og:image:secure_url` tags.

---

## 🛠️ Tech Stack

### Core Framework & Runtime
- **Framework:** [Next.js 16.3.5](https://nextjs.org/) (App Router, Turbopack, SSR/SSG)
- **Library:** [React 19.2.8](https://react.dev/)
- **Language:** [TypeScript 5.x](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & PostCSS
- **Icons:** [Lucide React](https://lucide.dev/)

### 3D Graphics & Animation
- **3D Engine:** [Three.js](https://threejs.org/)
- **R3F Ecosystem:** `@react-three/fiber` & `@react-three/drei`
- **Postprocessing:** `@react-three/postprocessing`
- **Motion:** [Framer Motion](https://www.framer.com/motion/) & GSAP

### Audio & Telemetry
- **Audio:** Web Audio API Procedural Synthesizer (`lib/audio.ts`)
- **Analytics:** `@vercel/analytics` & `@vercel/speed-insights`

---

## ⚡ Performance & Zero-Jitter Optimization

Strictly engineered for locked 60 FPS performance without lag or frame drops:

- **Viewport Gating:** 3D canvases (`HeroCanvas.tsx` and `HardwarePlayboard.tsx`) automatically freeze render loops when scrolled out of view (`frameloop={inView ? "always" : "never"}`).
- **InkWash Background Canvas:** 3x downscaled raster resolution, throttled to 25 FPS, and automatically paused during active user scrolling.
- **Custom Cursor:** Uses 2 springs instead of 8, event delegation, and is completely disabled on mobile/touch screens.
- **Scroll HUD Rail:** Runs inside passive scroll event listeners with `requestAnimationFrame` and a 2% delta deadband threshold.
- **Zero WebGL Context Bloat in Bento:** All interactive micro-proofs in `ProjectsGrid.tsx` use pure DOM and CSS transitions (0 extra WebGL contexts).
- **Code-Splitting & Dynamic Imports:** Overlays, 3D scenes, audio engines, and drawers are dynamically imported with `ssr: false`.
- **Motion Preferences:** Full support for `prefers-reduced-motion: reduce`.

---

## 📂 Project Structure

```text
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css           # Global tokens, theme variables, scanline CRT effects, print styles
│   │   ├── layout.tsx            # Root layout with Geist fonts, OpenGraph tags, Vercel telemetry
│   │   └── page.tsx              # Root page rendering the ClientShell
│   ├── components/
│   │   ├── About.tsx             # Bio, credentials, interactive tech matrix & stats
│   │   ├── CaseStudyModal.tsx    # 4-system deep-dive architecture inspector (Air Mouse, SyncDoc, Ocean, webcmd)
│   │   ├── ClientShell.tsx       # Dynamic client mounting, shortcut listeners & theme wrapper
│   │   ├── CockpitRail.tsx       # Sector navigation & telemetry scroll HUD
│   │   ├── Contact.tsx           # Tactical transmission console & direct comms
│   │   ├── CustomCursor.tsx      # Fluid spring-physics cursor with particle trails
│   │   ├── EasterEggs.tsx        # Konami code tracker & Yin-Yang particle canvas
│   │   ├── ExecutiveDossier.tsx  # Recruiter Fast-Track mode & 1-2 page print-isolated CV
│   │   ├── Experience.tsx        # Timeline of internships & technical leadership
│   │   ├── FeaturedProject.tsx   # Hero showcase for Air Mouse AI
│   │   ├── Footer.tsx            # Footer with git commit stamp & status
│   │   ├── GitHubTelemetry.tsx   # Live GitHub commit activity ticker
│   │   ├── HardwarePlayboard.tsx # 3D ESP32 board & CRT logic analyzer oscilloscope
│   │   ├── Hero.tsx              # Hero header with commanding typography & CTA
│   │   ├── HeroCanvas.tsx        # 3D R3F Taijitu disc & kanji medallion scene
│   │   ├── InkWashBackground.tsx # Ambient procedural ink-wash background canvas
│   │   ├── Navbar.tsx            # Navigation header with sound, terminal, and fast-track triggers
│   │   ├── ProjectsGrid.tsx      # Asymmetric bento grid with live interactive micro-proofs
│   │   ├── ResumeModal.tsx       # Verified resume CV modal with PDF viewer
│   │   ├── SectionHeading.tsx    # Blueprint-style indexed section headers
│   │   ├── TerminalDrawer.tsx    # Quake-style dropdown terminal with virtual ESP32 IoT & AI Copilot
│   │   └── ThemePicker.tsx       # Kanji theme selection modal & sound controls
│   └── lib/
│       ├── audio.ts              # Web Audio API procedural sound engine
│       ├── terminalCopilot.ts    # Client-side semantic AI intent engine
│       └── themes.tsx            # Theme definitions, CSS variable mapping & context
├── public/                       # Static public assets, Resume.pdf, og-image.jpg, og-thumb.jpg
├── package.json                  # Dependencies & build scripts
├── tsconfig.json                 # TypeScript compiler configuration
└── next.config.ts                # Next.js configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v20.x or later recommended)
- **pnpm** (preferred) or **npm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/varun-pahuja/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
npm run start
```

---

## 🏆 Featured Flagship Projects

| Project | Domain | Key Technologies | Description |
| :--- | :--- | :--- | :--- |
| **Air Mouse AI** | Embedded / ML / Web | ESP32, BLE HID, Next.js, Flask, scikit-learn | Wireless gesture-controlled mouse running ML models (~94% accuracy) with real-time web telemetry. |
| **SyncDoc** | Distributed Systems | React 18, Yjs CRDT, Socket.io, Redis, MongoDB | Multi-user collaborative document editor with Lamport vector clocks and zero-collision convergence. |
| **Hackmatrix** | AI / Space Biology | FastAPI, ChromaDB, HuggingFace, Groq LLM | Semantic RAG platform querying 630+ NASA Open Science Data Repository datasets. |
| **OceanEmbed** | Deep Learning / Climate | PyTorch, Vision Transformers, CNNs, Satellite Data | Reconstructing 3D ocean temperature profiles down to 1000m depth across 15 layers for MoES/INCOIS. |
| **webcmd** | Agent Infra / DevTools | TypeScript, Node.js, Playwright, DOM Hashing | High-speed browser execution layer for AI agents cutting LLM context token usage by up to 90%. |
| **Omnipost** | Generative AI | React 19, Gemini 1.5 Flash, Express, Firebase | Multi-platform AI content generator adapting tone across X, LinkedIn, and Instagram. |

---

## 📬 Contact & Connect

- **Engineer:** Varun Pahuja
- **Email:** [varunpahuja2005@gmail.com](mailto:varunpahuja2005@gmail.com)
- **Portfolio:** [https://varunpahuja04.vercel.app](https://varunpahuja04.vercel.app)
- **GitHub:** [@varun-pahuja](https://github.com/varun-pahuja)
- **LinkedIn:** [Varun Pahuja](https://www.linkedin.com/in/varun-pahuja475/)
