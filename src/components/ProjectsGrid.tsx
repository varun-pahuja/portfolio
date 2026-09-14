"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ExternalLink,
  Terminal,
  Radio,
  Share2,
  Sparkles,
  Layers,
  CheckCircle2,
  RotateCcw,
  Waves,
  Bot,
} from "lucide-react";
import { playSound } from "@/lib/audio";
import CaseStudyModal from "./CaseStudyModal";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Mock Datasets for Interactive Modules
 * ───────────────────────────────────────────────────────────── */
const CRDT_STEPS = [
  {
    author: "Node A [Tokyo]",
    color: "#c9a84c", // Gold
    insert: "RFC-912: Distributed State Consensus",
    clock: { A: 1, B: 0 },
    status: "Initial broadcast",
  },
  {
    author: "Node B [Berlin]",
    color: "#60a5fa", // Blue
    insert: "RFC-912: Distributed State Consensus // CRDT YATA tree active",
    clock: { A: 1, B: 1 },
    status: "Concurrent update received",
  },
  {
    author: "Concurrent Merge",
    color: "#34d399", // Emerald
    insert:
      "RFC-912: Distributed State Consensus // CRDT YATA tree active [0-Conflict Convergence: Lamport Vector T+18]",
    clock: { A: 4, B: 5 },
    status: "LWW deterministic convergence",
  },
];

const NASA_QUERIES = [
  {
    query: "Bone mineral density loss in microgravity",
    dataset: "NASA OSDR-630",
    score: "0.962",
    retrievedChunk:
      "Osteoclast marker RANKL upregulated by 42% in hindlimb-unloaded Murine models post-14d orbital exposure; Wnt/β-catenin pathway suppressed.",
    vectorsCount: "630+ Datasets",
  },
  {
    query: "Deep-space cosmic radiation DNA double-strand breaks",
    dataset: "NASA OSDR-421",
    score: "0.941",
    retrievedChunk:
      "HZE ion bombardment triggers persistent γ-H2AX foci in human fibroblast cultures; non-homologous end-joining fidelity decreased by 31%.",
    vectorsCount: "630+ Datasets",
  },
  {
    query: "Arabidopsis root gravitropism under altered g-force",
    dataset: "NASA OSDR-512",
    score: "0.918",
    retrievedChunk:
      "Statolith sedimentation kinetics disrupted in 0.05g centrifuge; PIN-formed auxin efflux carriers show depolarized redistribution.",
    vectorsCount: "630+ Datasets",
  },
];

const OCEAN_DEPTHS = [
  { depth: "10m", temp: "28.4°C", error: "±0.51°C", layer: "Surface Mixed Layer" },
  { depth: "50m", temp: "26.1°C", error: "±0.68°C", layer: "Thermocline Upper Boundary" },
  { depth: "150m", temp: "18.9°C", error: "±0.74°C", layer: "Rapid Thermocline Transition" },
  { depth: "500m", temp: "10.2°C", error: "±0.62°C", layer: "Intermediate Water Mass" },
  { depth: "1000m", temp: "6.4°C", error: "±0.48°C", layer: "Deep Abyssal Layer" },
];

const WEBCMD_SCENARIOS = [
  { name: "Multi-Step Auth & Form", raw: "128,400", cached: "12,200", saved: "90.5%" },
  { name: "E-Commerce Checkout", raw: "84,600", cached: "9,100", saved: "89.2%" },
  { name: "SPA Table Extraction", raw: "196,000", cached: "18,400", saved: "90.6%" },
];

const OMNIPOST_PLATFORMS = {
  x: {
    label: "X / Twitter",
    icon: "𝕏",
    handle: "@varun_pahuja",
    content:
      "Engineered a zero-collision CRDT collaborative editor with React 18 + Yjs + Redis.\n\n⚡️ Sub-12ms sync across distributed nodes\n🔒 Formal vector clock deterministic convergence\n🚀 Production-ready WebSocket cluster\n\n#SoftwareEngineering #WebDev #DistributedSystems",
    meta: "142 Retweets • 894 Likes • 242/280 Chars",
  },
  linkedin: {
    label: "LinkedIn",
    icon: "in",
    handle: "Varun Pahuja • Full Stack Engineer",
    content:
      "Excited to share insights from architecting real-time document synchronization engines.\n\nHandling concurrent updates without centralized mutex locks requires moving beyond naive OT to Conflict-Free Replicated Data Types (CRDTs). By modeling state as a directed acyclic operation graph, distributed clients achieve deterministic convergence even during intermittent network partitions.\n\nKey takeaways:\n• Lamport clocks provide absolute causal ordering\n• Redis pub/sub shards connection state across microservices\n• Yjs memory compression reduces network payload overhead by 68%",
    meta: "Executive Thought Leadership • 1.2k Impressions",
  },
  instagram: {
    label: "Instagram",
    icon: "ig",
    handle: "varun.dev",
    content:
      "Behind the architecture: Building distributed state systems with zero merge conflicts ⚡️✨\n\nFrom Tokyo to Berlin in under 15ms. Swipe to see the vector clock math in action! 📱💻\n\n.\n.\n#coding #systemdesign #engineering #techlife #fullstack",
    meta: "Carousel Slide 1/4 • Visual Code Spec Format",
  },
};

export default function ProjectsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Interactive State: SyncDoc CRDT
  const [crdtStep, setCrdtStep] = useState(0);
  const [crdtModalOpen, setCrdtModalOpen] = useState(false);

  // Interactive State: NASA RAG
  const [selectedNasaIdx, setSelectedNasaIdx] = useState(0);
  const [isQuerying, setIsQuerying] = useState(false);

  // Interactive State: Omnipost Switcher
  const [platform, setPlatform] = useState<"x" | "linkedin" | "instagram">("x");

  // Interactive State: OceanEmbed & webcmd
  const [oceanDepthIdx, setOceanDepthIdx] = useState(1);
  const [webcmdIdx, setWebcmdIdx] = useState(0);

  const handleNextCrdt = () => {
    playSound("switch");
    setCrdtStep((prev) => (prev + 1) % CRDT_STEPS.length);
  };

  const handleSelectNasa = (idx: number) => {
    playSound("click");
    setIsQuerying(true);
    setSelectedNasaIdx(idx);
    setTimeout(() => {
      setIsQuerying(false);
      playSound("relay");
    }, 280);
  };

  const handlePlatformChange = (p: "x" | "linkedin" | "instagram") => {
    playSound("click");
    setPlatform(p);
  };

  return (
    <section id="bento" className="relative py-24 md:py-32 px-6 md:px-8 bg-[rgba(7,7,13,0.95)]">
      {/* Blueprint decorative grid lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-dim)] to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-[var(--border-subtle)] opacity-40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute right-6 md:right-12 top-0 bottom-0 w-px bg-[var(--border-subtle)] opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      <div ref={ref} className="mx-auto max-w-[1240px]">
        {/* Section Header with Tactical Telemetry HUD */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16 border-b border-[var(--border-subtle)] pb-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-2"
            >
              <span className="inline-block w-2 h-2 rounded-none bg-[var(--accent-vermillion)] animate-pulse" />
              <span className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.25em] uppercase text-[var(--accent-vermillion)] font-bold">
                02 // ASYMMETRIC BENTO MATRIX
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans text-3xl md:text-5xl font-bold text-[var(--text-washi)] tracking-tight"
            >
              Selected Systems & Engines
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4 text-xs font-[family-name:var(--font-geist-mono)] text-[var(--text-stone)]"
          >
            <div className="px-2.5 py-1 rounded border border-[var(--border-dim)] bg-[var(--bg-lacquer)] flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-[var(--accent-vermillion)] animate-pulse" />
              <span>LIVE MICRO-PROOFS ENGAGED</span>
            </div>
          </motion.div>
        </div>

        {/* Asymmetric Bento Grid (12-Column Architectural System) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* ─────────────────────────────────────────────────────────────
           * TILE 1: SyncDoc — Collaborative CRDT Engine (7 Columns)
           * ───────────────────────────────────────────────────────────── */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-between bg-[var(--bg-lacquer)] border border-[var(--border-dim)] rounded-xl p-6 md:p-8 relative overflow-hidden shadow-2xl group hover:border-[var(--accent-vermillion)]/40 transition-all duration-300"
          >
            {/* Top architectural border stamp */}
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-6 text-xs font-[family-name:var(--font-geist-mono)] text-[var(--text-stone)]">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[var(--accent-vermillion)]" />
                <span className="font-semibold text-[var(--text-washi)]">RFC-CRDT-01</span>
                <span>{"// REAL-TIME CONCURRENCY"}</span>
              </div>
              <span className="tabular-nums text-[var(--accent-vermillion)] font-mono">
                VECTOR CLOCK: T+{crdtStep * 7 + 14}
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="font-sans text-2xl md:text-3xl font-bold text-[var(--text-washi)]">
                  SyncDoc
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full border border-[var(--accent-vermillion)]/30 text-[var(--accent-vermillion)] font-medium">
                  CRDT Engine
                </span>
              </div>
              <p className="text-sm md:text-base text-[var(--text-parchment)] leading-relaxed mb-6">
                Real-time multi-user document engine with Lamport vector clocks and Conflict-Free
                Replicated Data Types (CRDTs). Enables zero-collision concurrent editing across
                distributed clients without lock blocking or central coordination overhead.
              </p>

              {/* Interactive Live CRDT Simulator */}
              <div className="rounded-lg border border-[var(--border-dim)] bg-[rgba(6,6,10,0.85)] p-4 md:p-5 mb-6">
                <div className="flex items-center justify-between mb-3 text-xs font-[family-name:var(--font-geist-mono)]">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#c9a84c]">
                      <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-ping" />
                      Node A [Tokyo]
                    </span>
                    <span className="text-[var(--text-stone)]">⇄</span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#60a5fa]">
                      <span className="w-2 h-2 rounded-full bg-[#60a5fa]" />
                      Node B [Berlin]
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> 0 Merge Conflicts
                  </span>
                </div>

                {/* Simulated Document Buffer */}
                <div className="bg-[var(--bg-ink)] border border-[var(--border-subtle)] rounded p-3 font-[family-name:var(--font-geist-mono)] text-xs text-[var(--text-washi)] min-h-[72px] flex items-center leading-relaxed">
                  <span>
                    {CRDT_STEPS[crdtStep].insert}
                    <span
                      className="inline-block w-2 h-4 ml-1 translate-y-0.5 animate-pulse"
                      style={{ backgroundColor: CRDT_STEPS[crdtStep].color }}
                    />
                  </span>
                </div>

                {/* Control Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-[var(--border-subtle)] text-xs">
                  <div className="text-[11px] font-[family-name:var(--font-geist-mono)] text-[var(--text-stone)]">
                    STATUS:{" "}
                    <span className="text-[var(--text-parchment)]">
                      {CRDT_STEPS[crdtStep].status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleNextCrdt}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--accent-vermillion)] text-black font-semibold text-xs hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Step Concurrency ({crdtStep + 1}/3)
                    </button>
                  </div>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["React 18", "TypeScript", "Yjs CRDT", "Socket.io", "Redis Pub/Sub", "MongoDB"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs rounded border border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)] text-[var(--text-parchment)] font-[family-name:var(--font-geist-mono)]"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--border-subtle)]">
              <a
                href="https://github.com/varun-pahuja/infotact-project2"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound("click")}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-washi)] hover:text-[var(--accent-vermillion)] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                Inspect Repository
              </a>
              <button
                onClick={() => {
                  playSound("switch");
                  setCrdtModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-vermillion)] hover:underline cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                Inspect CRDT Architecture
              </button>
            </div>
          </motion.article>

          {/* ─────────────────────────────────────────────────────────────
           * TILE 2: Hackmatrix — NASA Space Biology RAG (5 Columns)
           * ───────────────────────────────────────────────────────────── */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 flex flex-col justify-between bg-[var(--bg-lacquer)] border border-[var(--border-dim)] rounded-xl p-6 md:p-8 relative overflow-hidden shadow-2xl group hover:border-[var(--accent-vermillion)]/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-6 text-xs font-[family-name:var(--font-geist-mono)] text-[var(--text-stone)]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[var(--accent-vermillion)]" />
                <span className="font-semibold text-[var(--text-washi)]">NASA OSDR</span>
                <span>{"// RAG ENGINE"}</span>
              </div>
              <span className="text-emerald-400 font-mono">630+ DATASETS</span>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="font-sans text-2xl md:text-3xl font-bold text-[var(--text-washi)]">
                  Hackmatrix
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full border border-sky-400/30 text-sky-300 font-medium">
                  NASA RAG
                </span>
              </div>
              <p className="text-sm text-[var(--text-parchment)] leading-relaxed mb-6">
                RAG intelligence platform querying NASA&apos;s Open Science Data Repository. Answers
                orbital biology queries with citation-backed semantic embeddings and local vector
                retrieval.
              </p>

              {/* Interactive NASA Query Terminal */}
              <div className="rounded-lg border border-[var(--border-dim)] bg-[rgba(6,6,10,0.85)] p-4 mb-6">
                <div className="text-[11px] font-[family-name:var(--font-geist-mono)] text-[var(--text-stone)] mb-2 uppercase tracking-wider flex items-center justify-between">
                  <span>Select Test Vector:</span>
                  <span className="text-amber-300/80">
                    {isQuerying ? "COMPUTING COSINE..." : "SIMILARITY READY"}
                  </span>
                </div>

                {/* Query selector pills */}
                <div className="flex flex-col gap-1.5 mb-3">
                  {NASA_QUERIES.map((item, idx) => (
                    <button
                      key={item.query}
                      onClick={() => handleSelectNasa(idx)}
                      className={`text-left text-xs px-2.5 py-1.5 rounded transition-all font-[family-name:var(--font-geist-mono)] cursor-pointer truncate ${
                        selectedNasaIdx === idx
                          ? "bg-[var(--accent-vermillion)]/15 border border-[var(--accent-vermillion)] text-[var(--text-washi)]"
                          : "border border-transparent bg-white/[0.02] text-[var(--text-stone)] hover:text-[var(--text-parchment)] hover:bg-white/[0.04]"
                      }`}
                    >
                      &gt; {item.query}
                    </button>
                  ))}
                </div>

                {/* Similarity score bar */}
                <div className="space-y-1.5 pt-2 border-t border-[var(--border-subtle)]">
                  <div className="flex justify-between text-[11px] font-[family-name:var(--font-geist-mono)]">
                    <span className="text-[var(--text-stone)]">
                      Ref: {NASA_QUERIES[selectedNasaIdx].dataset}
                    </span>
                    <span className="text-[var(--accent-vermillion)] font-bold">
                      Cosine: {NASA_QUERIES[selectedNasaIdx].score}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--accent-vermillion)] transition-all duration-500 rounded-full"
                      style={{
                        width: isQuerying
                          ? "20%"
                          : `${parseFloat(NASA_QUERIES[selectedNasaIdx].score) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-[var(--text-parchment)] font-[family-name:var(--font-geist-mono)] leading-relaxed mt-2 pt-1 line-clamp-2">
                    {NASA_QUERIES[selectedNasaIdx].retrievedChunk}
                  </p>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["FastAPI", "ChromaDB", "HuggingFace", "Groq LLM", "React"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs rounded border border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)] text-[var(--text-parchment)] font-[family-name:var(--font-geist-mono)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-4 pt-4 border-t border-[var(--border-subtle)]">
              <a
                href="https://github.com/varun-pahuja/Hackmatrix"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound("click")}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-washi)] hover:text-[var(--accent-vermillion)] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                Inspect NASA Code
              </a>
            </div>
          </motion.article>

          {/* ─────────────────────────────────────────────────────────────
           * TILE 3: OceanEmbed — Satellite AI Subsurface Reconstruction (6 Columns)
           * ───────────────────────────────────────────────────────────── */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="lg:col-span-6 flex flex-col justify-between bg-[var(--bg-lacquer)] border border-[var(--border-dim)] rounded-xl p-6 md:p-8 relative overflow-hidden shadow-2xl group hover:border-[var(--accent-vermillion)]/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-6 text-xs font-[family-name:var(--font-geist-mono)] text-[var(--text-stone)]">
              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-[var(--text-washi)]">MoES // INCOIS</span>
                <span>{"// SATELLITE RECONSTRUCTION"}</span>
              </div>
              <span className="text-cyan-400 font-mono">0.25° RESOLUTION</span>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="font-sans text-2xl md:text-3xl font-bold text-[var(--text-washi)]">
                  OceanEmbed
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full border border-cyan-400/30 text-cyan-300 font-medium">
                  Vision Transformer
                </span>
              </div>
              <p className="text-sm text-[var(--text-parchment)] leading-relaxed mb-6">
                Reconstructs 3D depth-wise ocean temperature profiles (2m to 1000m) across the North
                Indian Ocean strictly from 2D satellite surface observations using Vision Transformers and CNNs.
              </p>

              {/* Interactive Depth Telemetry Probe */}
              <div className="rounded-lg border border-[var(--border-dim)] bg-[rgba(6,6,10,0.85)] p-4 mb-6">
                <div className="text-[11px] font-[family-name:var(--font-geist-mono)] text-[var(--text-stone)] mb-2 uppercase tracking-wider flex items-center justify-between">
                  <span>Target Subsurface Depth:</span>
                  <span className="text-cyan-400 font-mono">ARGO BENCHMARK</span>
                </div>

                {/* Depth selector pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {OCEAN_DEPTHS.map((item, idx) => (
                    <button
                      key={item.depth}
                      onClick={() => {
                        playSound("click");
                        setOceanDepthIdx(idx);
                      }}
                      className={`text-xs px-2.5 py-1 rounded transition-all font-[family-name:var(--font-geist-mono)] cursor-pointer ${
                        oceanDepthIdx === idx
                          ? "bg-cyan-500/20 border border-cyan-400 text-cyan-200 font-bold"
                          : "border border-transparent bg-white/[0.02] text-[var(--text-stone)] hover:text-[var(--text-parchment)]"
                      }`}
                    >
                      {item.depth}
                    </button>
                  ))}
                </div>

                {/* Telemetry Output HUD */}
                <div className="p-3 rounded bg-[var(--bg-ink)] border border-[var(--border-subtle)] space-y-1 text-xs font-[family-name:var(--font-geist-mono)]">
                  <div className="flex justify-between items-center text-[var(--text-washi)]">
                    <span className="text-[var(--text-stone)]">Ocean Layer:</span>
                    <span>{OCEAN_DEPTHS[oceanDepthIdx].layer}</span>
                  </div>
                  <div className="flex justify-between items-center text-[var(--text-washi)]">
                    <span className="text-[var(--text-stone)]">Reconstructed Temp:</span>
                    <span className="text-cyan-400 font-bold text-sm">{OCEAN_DEPTHS[oceanDepthIdx].temp}</span>
                  </div>
                  <div className="flex justify-between items-center text-[var(--text-stone)] text-[11px] pt-1 border-t border-[var(--border-subtle)]">
                    <span>Validation Error:</span>
                    <span className="text-emerald-400">{OCEAN_DEPTHS[oceanDepthIdx].error} RMSE</span>
                  </div>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["PyTorch", "Vision Transformer", "CNN", "INCOIS Data", "ARGO Telemetry", "Python"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs rounded border border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)] text-[var(--text-parchment)] font-[family-name:var(--font-geist-mono)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-4 pt-4 border-t border-[var(--border-subtle)]">
              <a
                href="https://github.com/varun-pahuja/SIHPS66"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound("click")}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-washi)] hover:text-cyan-400 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                Inspect Model Architecture
              </a>
            </div>
          </motion.article>

          {/* ─────────────────────────────────────────────────────────────
           * TILE 4: webcmd — Autonomous Agent Browser Infrastructure (6 Columns)
           * ───────────────────────────────────────────────────────────── */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-6 flex flex-col justify-between bg-[var(--bg-lacquer)] border border-[var(--border-dim)] rounded-xl p-6 md:p-8 relative overflow-hidden shadow-2xl group hover:border-[var(--accent-vermillion)]/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-6 text-xs font-[family-name:var(--font-geist-mono)] text-[var(--text-stone)]">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-violet-400" />
                <span className="font-semibold text-[var(--text-washi)]">AGENT INFRA</span>
                <span>{"// DOM COMPACTION"}</span>
              </div>
              <span className="text-violet-400 font-mono">90% SAVINGS</span>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="font-sans text-2xl md:text-3xl font-bold text-[var(--text-washi)]">
                  webcmd
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full border border-violet-400/30 text-violet-300 font-medium">
                  Browser Engine
                </span>
              </div>
              <p className="text-sm text-[var(--text-parchment)] leading-relaxed mb-6">
                Self-learning browser infrastructure for autonomous AI agents that stops agents from
                rediscovering the web. Slashes LLM token expenditure by up to 90% via DOM hashing.
              </p>

              {/* Interactive Token Savings Telemetry */}
              <div className="rounded-lg border border-[var(--border-dim)] bg-[rgba(6,6,10,0.85)] p-4 mb-6">
                <div className="text-[11px] font-[family-name:var(--font-geist-mono)] text-[var(--text-stone)] mb-2 uppercase tracking-wider flex items-center justify-between">
                  <span>Agent Execution Context:</span>
                  <span className="text-violet-400 font-mono">TOKEN BENCHMARK</span>
                </div>

                {/* Scenario selector */}
                <div className="flex flex-col gap-1.5 mb-3">
                  {WEBCMD_SCENARIOS.map((item, idx) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        playSound("click");
                        setWebcmdIdx(idx);
                      }}
                      className={`text-left text-xs px-2.5 py-1.5 rounded transition-all font-[family-name:var(--font-geist-mono)] cursor-pointer truncate ${
                        webcmdIdx === idx
                          ? "bg-violet-500/20 border border-violet-400 text-violet-200"
                          : "border border-transparent bg-white/[0.02] text-[var(--text-stone)] hover:text-[var(--text-parchment)]"
                      }`}
                    >
                      &gt; {item.name}
                    </button>
                  ))}
                </div>

                {/* Token Comparison Bar */}
                <div className="p-3 rounded bg-[var(--bg-ink)] border border-[var(--border-subtle)] space-y-2 text-xs font-[family-name:var(--font-geist-mono)]">
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--text-stone)]">Raw Context Cost:</span>
                    <span className="text-rose-400 line-through">{WEBCMD_SCENARIOS[webcmdIdx].raw} tokens</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--text-stone)]">webcmd Cached Cost:</span>
                    <span className="text-emerald-400 font-bold">{WEBCMD_SCENARIOS[webcmdIdx].cached} tokens</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-violet-400 rounded-full w-[90%]" />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-violet-300 pt-1">
                    <span>DOM Hash Pruning Active</span>
                    <span className="font-bold">{WEBCMD_SCENARIOS[webcmdIdx].saved} Tokens Saved</span>
                  </div>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["TypeScript", "Node.js", "Playwright", "DOM Tree Hashing", "AI Agents", "NPM"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs rounded border border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)] text-[var(--text-parchment)] font-[family-name:var(--font-geist-mono)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-4 pt-4 border-t border-[var(--border-subtle)]">
              <a
                href="https://github.com/varun-pahuja/webcmd"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound("click")}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-washi)] hover:text-violet-400 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                Inspect webcmd Engine
              </a>
            </div>
          </motion.article>

          {/* ─────────────────────────────────────────────────────────────
           * TILE 5: Omnipost — Multi-Platform AI Engine (12 Columns Full-Width)
           * ───────────────────────────────────────────────────────────── */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="lg:col-span-12 bg-[var(--bg-lacquer)] border border-[var(--border-dim)] rounded-xl p-6 md:p-8 relative overflow-hidden shadow-2xl group hover:border-[var(--accent-vermillion)]/40 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Details */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-[family-name:var(--font-geist-mono)] text-[var(--text-stone)]">
                  <Sparkles className="w-4 h-4 text-[var(--accent-vermillion)]" />
                  <span className="font-semibold text-[var(--text-washi)]">OMNIPOST // V2</span>
                  <span>• MULTI-PLATFORM SYNTHESIS</span>
                </div>

                <h3 className="font-sans text-2xl md:text-3xl font-bold text-[var(--text-washi)]">
                  Omnipost
                </h3>
                <p className="text-sm md:text-base text-[var(--text-parchment)] leading-relaxed">
                  High-throughput AI content generator. Takes a single architectural concept and
                  compiles platform-tailored publications for X/Twitter, LinkedIn, and Instagram
                  simultaneously with contextual tone adaptation.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["React 19", "Vite", "Gemini 1.5 Flash", "Express", "Firebase"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs rounded border border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)] text-[var(--text-parchment)] font-[family-name:var(--font-geist-mono)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <a
                    href="https://omnipost-eight.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound("click")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[var(--accent-vermillion)] text-black font-semibold text-xs hover:brightness-110 active:scale-95 transition-all shadow-md"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Launch Live Production App
                  </a>
                  <a
                    href="https://github.com/varun-pahuja/omnipost"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound("click")}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-stone)] hover:text-[var(--text-washi)] transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    Source
                  </a>
                </div>
              </div>

              {/* Right Interactive Platform Switcher */}
              <div className="lg:col-span-7 bg-[rgba(6,6,10,0.85)] border border-[var(--border-dim)] rounded-xl p-5 md:p-6">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 mb-4">
                  <span className="text-xs font-[family-name:var(--font-geist-mono)] text-[var(--text-stone)] uppercase tracking-wider flex items-center gap-2">
                    <Share2 className="w-3.5 h-3.5 text-[var(--accent-vermillion)]" />
                    Live Output Morphing
                  </span>

                  {/* Platform Pills */}
                  <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[var(--bg-ink)] border border-[var(--border-subtle)]">
                    {(["x", "linkedin", "instagram"] as const).map((p) => (
                      <button
                        key={p}
                        onClick={() => handlePlatformChange(p)}
                        className={`px-3 py-1 text-xs font-[family-name:var(--font-geist-mono)] rounded transition-all cursor-pointer ${
                          platform === p
                            ? "bg-[var(--accent-vermillion)] text-black font-bold shadow-sm"
                            : "text-[var(--text-stone)] hover:text-[var(--text-washi)]"
                        }`}
                      >
                        {OMNIPOST_PLATFORMS[p].label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Morphing Preview Card */}
                <div className="space-y-3 min-h-[160px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-[var(--accent-vermillion)]/20 border border-[var(--accent-vermillion)]/50 flex items-center justify-center text-[10px] font-bold text-[var(--accent-vermillion)]">
                        {OMNIPOST_PLATFORMS[platform].icon}
                      </div>
                      <span className="text-xs font-semibold text-[var(--text-washi)]">
                        {OMNIPOST_PLATFORMS[platform].handle}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-[var(--text-parchment)] whitespace-pre-line leading-relaxed font-sans">
                      {OMNIPOST_PLATFORMS[platform].content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-[family-name:var(--font-geist-mono)] text-[var(--text-stone)] pt-3 border-t border-[var(--border-subtle)]">
                    <span>{OMNIPOST_PLATFORMS[platform].meta}</span>
                    <span className="text-[var(--accent-vermillion)]">TOKEN LATENCY: 340ms</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </div>

      <CaseStudyModal
        isOpen={crdtModalOpen}
        studyId="syncdoc"
        onClose={() => setCrdtModalOpen(false)}
      />
    </section>
  );
}
