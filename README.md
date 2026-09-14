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

A bespoke developer portfolio blending Japanese cyberpunk minimalism with tactile hardware telemetry, 3D WebGL scenes, interactive architectural micro-proofs, and a procedural synthesizer audio engine.

[Live Demo](https://varunpahuja04.vercel.app) • [Report Issue](https://github.com/varun-pahuja/portfolio/issues) • [Contact](mailto:varunpahuja2005@gmail.com)

</div>

---

## 🧭 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Interactive Systems & Micro-Proofs](#-interactive-systems--micro-proofs)
- [Tech Stack](#-tech-stack)
- [Architecture & Design Aesthetics](#-architecture--design-aesthetics)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Featured Projects](#-featured-projects)
- [Performance & Accessibility](#-performance--accessibility)
- [Contact & Connect](#-contact--connect)

---

## ⚡ Overview

This portfolio showcases the work and technical philosophy of **Varun Pahuja** — Full-Stack Developer & IoT Engineer (B.Tech in Internet of Things at MITS Gwalior, CGPA: 8.06). 

Engineered with **Next.js 16 (Turbopack)**, **React 19**, and **Three.js / React Three Fiber**, this site eschews static portfolios in favor of live, tactile interactions: an interactive 3D ESP32 logic analyzer playboard, real-time CRDT multi-user convergence simulators, AI vector similarity query consoles, and a Quake-style drop-down terminal.

---

## ✨ Key Features

- **🥋 Cyberpunk & Washi Japanese Aesthetic:** Designed with a palette inspired by Japanese lacquerware, aged parchment, and futuristic HUD displays.
- **🎨 5 Dynamic Kanji Themes:** Instant runtime palette switching with persistent `localStorage` support:
  - **Vermillion (朱)** — `#dc3545`
  - **Indigo (藍)** — `#4f46e5`
  - **Gold (金)** — `#c9a84c`
  - **Sakura (桜)** — `#e879a8`
  - **Jade (翠)** — `#2dd4a8`
- **🎮 Interactive Terminal Drawer:** Press <kbd>`</kbd> or <kbd>~</kbd> (or toggle via navigation) to summon an integrated terminal with commands like `ask <query>`, `exec`, `whoami`, `skills`, `iot`, `projects`, `resume`, `bench`, `matrix`, `secrets`, `theme <id>`, `contact`, and `clear`.
- **🤖 Tactical Terminal AI Copilot (`ask <query>`):** Zero-latency client-side semantic engine answering arbitrary recruiter and engineer questions regarding Varun's system architecture, sensor drift math, CRDT models, or career background.
- **⚡ Recruiter Fast-Track / Executive Dossier:** Press <kbd>E</kbd> or trigger `EXEC` from the navbar/terminal for an instant 15-second high-signal engineering scan with 1-click email copy, verified metrics, and PDF CV download.
- **📐 4-System Architecture Dossiers:** Interactive deep-dive case study drawers for *Air Mouse AI*, *SyncDoc*, *OceanEmbed*, and *webcmd* detailing hardware constraints, data flow pipelines, engineering trade-offs, and empirical benchmarks.
- **🖼️ Dynamic OpenGraph Image Engine:** Prerendered 1200×630 cyberpunk card for high-conversion social previews on LinkedIn, Twitter, and messaging apps.
- **📡 Real-Time GitHub Telemetry:** Live streaming ticker pulling verified public commit activity for `varun-pahuja` via the GitHub API.
- **📄 Verified Resume Dossier:** Interactive CV modal accessible via navbar `CV` trigger, hero CTA, or CLI `resume` command.
- **📬 Direct Transmission Console:** Tactical client-side comms terminal with subject protocols, character telemetry, and audio packet dispatch.
- **🔊 Procedural Web Audio SFX:** 100% synthetic sound design generated via the Web Audio API without audio assets (clicks, relays, terminal typing, switches, and boot tones).
- **🕹️ Easter Eggs:**
  - Live Konami keycap tracker in the footer (<kbd>↑</kbd> <kbd>↑</kbd> <kbd>↓</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> <kbd>←</kbd> <kbd>→</kbd> <kbd>B</kbd> <kbd>A</kbd>) with real-time key glow and click-to-launch trigger.
  - Interactive Yin-Yang particle dispersion canvas animation (`道 — the way`).
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
- **Motion:** [Framer Motion](https://www.framer.com/motion/)

### Audio & Telemetry
- **Audio:** Web Audio API Procedural Synthesizer (`lib/audio.ts`)
- **Analytics:** `@vercel/analytics` & `@vercel/speed-insights`

---

## 📂 Project Structure

```text
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css           # Global tokens, theme variables, scanline CRT effects
│   │   ├── layout.tsx            # Root layout with Geist fonts & Vercel telemetry
│   │   └── page.tsx              # Root page rendering the ClientShell
│   ├── components/
│   │   ├── About.tsx             # Bio, credentials, interactive tech matrix & stats
│   │   ├── ClientShell.tsx       # Dynamic client mounting, shortcut listeners & theme wrapper
│   │   ├── CockpitRail.tsx       # Sector navigation & telemetry scroll HUD
│   │   ├── Contact.tsx           # Contact cards, copy-to-clipboard email & socials
│   │   ├── CustomCursor.tsx      # Fluid spring-physics cursor with particle trails
│   │   ├── EasterEggs.tsx        # Konami code trigger & Yin-Yang particle canvas
│   │   ├── Experience.tsx        # Timeline of internships & technical leadership
│   │   ├── FeaturedProject.tsx   # Hero showcase for Air Mouse AI
│   │   ├── Footer.tsx            # Footer with git commit stamp & status
│   │   ├── HardwarePlayboard.tsx # 3D ESP32 board & CRT logic analyzer oscilloscope
│   │   ├── Hero.tsx              # Hero header with commanding typography & CTA
│   │   ├── HeroCanvas.tsx        # 3D R3F Taijitu disc & kanji medallion scene
│   │   ├── InkWashBackground.tsx # Ambient procedural ink-wash background canvas
│   │   ├── Navbar.tsx            # Navigation header with sound & terminal triggers
│   │   ├── ProjectsGrid.tsx      # Asymmetric bento grid with live micro-proofs
│   │   ├── SectionHeading.tsx    # Blueprint-style indexed section headers
│   │   ├── TerminalDrawer.tsx    # Quake-style dropdown terminal with virtual ESP32 IoT
│   │   └── ThemePicker.tsx       # Kanji theme selection modal & sound controls
│   └── lib/
│       ├── audio.ts              # Web Audio API procedural sound engine
│       └── themes.tsx            # Theme definitions, CSS variable mapping & context
├── public/                       # Static public assets & favicons
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

## 🏆 Featured Projects

| Project | Domain | Key Technologies | Description |
| :--- | :--- | :--- | :--- |
| **Air Mouse AI** | Embedded / ML / Web | ESP32, BLE HID, Next.js, Flask, scikit-learn | Wireless gesture-controlled mouse running ML models (~94% accuracy) with real-time web telemetry. |
| **SyncDoc** | Distributed Systems | React 18, Yjs CRDT, Socket.io, Redis, MongoDB | Multi-user collaborative document editor with Lamport vector clocks and zero-collision convergence. |
| **Hackmatrix** | AI / Space Biology | FastAPI, ChromaDB, HuggingFace, Groq LLM | Semantic RAG platform querying 630+ NASA Open Science Data Repository datasets. |
| **OceanEmbed** | Deep Learning / Climate | PyTorch, Vision Transformers, CNNs, Satellite Data | Reconstructing 3D ocean temperature profiles down to 1000m depth across 15 layers for MoES/INCOIS. |
| **webcmd** | Agent Infra / DevTools | TypeScript, Node.js, Playwright, DOM Hashing | High-speed browser execution layer for AI agents cutting LLM context token usage by up to 90%. |
| **Omnipost** | Generative AI | React 19, Gemini 1.5 Flash, Express, Firebase | Multi-platform AI content generator adapting tone across X, LinkedIn, and Instagram. |

---

## ⚡ Performance & Accessibility

- **Viewport Gating:** 3D canvases and animation loops automatically pause when scrolled out of viewport via `IntersectionObserver`.
- **Code-Splitting & Dynamic Imports:** Heavy 3D components (`HeroCanvas`, `HardwarePlayboard`), audio modules, and terminal drawers are dynamically imported with `ssr: false`.
- **Motion Preferences:** Full support for `prefers-reduced-motion: reduce` disabling intensive canvas and 3D animations for users with motion sensitivity.
- **WebGL Fallback Boundaries:** Wrapped in custom React Error Boundaries; if WebGL is unavailable or fails, fallback layouts render gracefully without breaking page content.

---

## 📬 Contact & Connect

- **Engineer:** Varun Pahuja
- **Email:** [varunpahuja2005@gmail.com](mailto:varunpahuja2005@gmail.com)
- **GitHub:** [@varun-pahuja](https://github.com/varun-pahuja)
- **LinkedIn:** [Varun Pahuja](https://linkedin.com/in/varun-pahuja)
