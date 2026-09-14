"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Zap,
  ExternalLink,
} from "lucide-react";
import { playSound } from "@/lib/audio";

export type CaseStudyId = "airmouse" | "syncdoc" | "oceanembed" | "webcmd";

interface CaseStudyData {
  id: CaseStudyId;
  title: string;
  badge: string;
  subtitle: string;
  overview: string;
  constraints: { label: string; value: string; detail: string }[];
  pipeline: { step: string; desc: string; tech: string }[];
  tradeoffs: { choice: string; why: string; alternative: string }[];
  benchmarks: { metric: string; result: string; unit: string }[];
  githubUrl: string;
}

const CASE_STUDIES: Record<CaseStudyId, CaseStudyData> = {
  airmouse: {
    id: "airmouse",
    title: "Air Mouse AI",
    badge: "HARDWARE × ML × BLE HID",
    subtitle: "Low-Latency FreeRTOS Inertial Mouse with scikit-learn Gesture Recognition",
    overview:
      "A handheld wireless mouse engineered on an ESP32 microcontroller that translates physical spatial orientation into desktop cursor displacement using an MPU-6050 6-axis IMU, complementary drift filters, and machine learning gesture classification without requiring any surface.",
    constraints: [
      {
        label: "Power Budget",
        value: "3.7V LiPo 500mAh",
        detail: "Dynamic power gating with FreeRTOS light sleep mode extending battery life to 14+ active hours.",
      },
      {
        label: "Transmission Latency",
        value: "< 14.2ms",
        detail: "Low-latency BLE HID connection interval tuned to 11.25ms to prevent human-perceptible cursor drag.",
      },
      {
        label: "Sensor Drift",
        value: "Complementary Filter",
        detail: "Combines high-pass gyroscope integration with low-pass accelerometer gravity vector tracking.",
      },
      {
        label: "ML Inference",
        value: "94.2% Classification",
        detail: "Trained random forest classifier on 4 distinct gesture primitives (flick-left, flick-right, circle, tap).",
      },
    ],
    pipeline: [
      {
        step: "01. Telemetry Capture",
        desc: "MPU-6050 samples 6-DOF angular rate & acceleration over I2C at 100Hz.",
        tech: "I2C Bus 400kHz",
      },
      {
        step: "02. FreeRTOS Core 0 Filtering",
        desc: "Executes complementary filter math to compute pitch and roll without yaw drift accumulation.",
        tech: "Xtensa LX6 240MHz",
      },
      {
        step: "03. HID Packet Dispatch",
        desc: "Formats mouse displacement reports into standardized 5-byte HID packets over Bluetooth Low Energy.",
        tech: "BLE 5.0 HID Profile",
      },
      {
        step: "04. Web Telemetry & Inference",
        desc: "Full-stack dashboard captures motion vectors via Flask & scikit-learn for model calibration.",
        tech: "Next.js + Flask API",
      },
    ],
    tradeoffs: [
      {
        choice: "Complementary Filter vs Kalman Filter",
        why: "Provides 92% of the noise reduction of an Extended Kalman Filter (EKF) with 80% lower CPU cycle overhead.",
        alternative: "Extended Kalman Filter was tested but throttled FreeRTOS task scheduling.",
      },
      {
        choice: "BLE HID vs 2.4GHz RF Transceiver",
        why: "Native plug-and-play OS compatibility with Windows/macOS/Linux without proprietary USB dongles.",
        alternative: "NRF24L01 required a hardware dongle plugged into the host device.",
      },
    ],
    benchmarks: [
      { metric: "Inference Latency", result: "8.4", unit: "ms" },
      { metric: "Gesture Accuracy", result: "94.2", unit: "%" },
      { metric: "BLE Sync Interval", result: "11.25", unit: "ms" },
      { metric: "Active Run Time", result: "14.6", unit: "Hours" },
    ],
    githubUrl: "https://github.com/varun-pahuja",
  },
  syncdoc: {
    id: "syncdoc",
    title: "SyncDoc CRDT Engine",
    badge: "DISTRIBUTED SYSTEMS × CRDT",
    subtitle: "Zero-Conflict Real-Time Document Synchronization with Lamport Vector Clocks",
    overview:
      "A distributed collaborative editing engine architected with Yjs Conflict-Free Replicated Data Types (CRDTs), WebSocket session lifecycles, and a Redis Pub/Sub cluster backplane to enable zero-collision concurrent editing without mutex locking or central coordinator bottlenecks.",
    constraints: [
      {
        label: "Sync Latency",
        value: "Sub-12ms Global",
        detail: "WebSocket fan-out across sharded Redis nodes delivers real-time updates across distributed sessions.",
      },
      {
        label: "Concurrency Model",
        value: "YATA CRDT Tree",
        detail: "Operation-based CRDT guarantees deterministic convergence even under network partitions (split-brain).",
      },
      {
        label: "Memory Overhead",
        value: "68% Binary Compression",
        detail: "Yjs lib0 variable-length integer encoding drastically reduces network bandwidth over raw JSON OT ops.",
      },
      {
        label: "Durability",
        value: "Checkpoint Persistence",
        detail: "State vector compaction flushed asynchronously to MongoDB with zero blocking on active typing threads.",
      },
    ],
    pipeline: [
      {
        step: "01. Local Mutation",
        desc: "User types into React 18 editor; mutation is instantly applied locally with 0ms perceived latency.",
        tech: "Optimistic UI",
      },
      {
        step: "02. CRDT Delta Encoding",
        desc: "Yjs computes differential binary delta with client ID and monotonic Lamport clock tick.",
        tech: "Yjs Lib0 V2 Format",
      },
      {
        step: "03. Redis Cluster Broadcast",
        desc: "Node.js WebSocket gateway relays update into Redis Pub/Sub channels to shard active document rooms.",
        tech: "Redis In-Memory Pub/Sub",
      },
      {
        step: "04. Remote Node Convergence",
        desc: "Distributed peers receive binary payload and deterministically merge into the local YATA tree.",
        tech: "CRDT Convergence (LWW)",
      },
    ],
    tradeoffs: [
      {
        choice: "CRDTs vs Operational Transformation (OT)",
        why: "OT requires a central authority server to serialize all operations; CRDTs converge peer-to-peer deterministically.",
        alternative: "OT (used by Google Docs) suffers high lock contention and server complexity.",
      },
      {
        choice: "Redis Pub/Sub vs Direct WebSockets",
        why: "Enables horizontal auto-scaling across multi-container instances without sticky session affinity lock.",
        alternative: "In-memory socket rooms fail when scaling beyond a single server instance.",
      },
    ],
    benchmarks: [
      { metric: "Convergence Latency", result: "11.8", unit: "ms" },
      { metric: "Payload Compression", result: "68.4", unit: "% reduction" },
      { metric: "Concurrent Peers", result: "250+", unit: "per room" },
      { metric: "Merge Conflicts", result: "0", unit: "guaranteed" },
    ],
    githubUrl: "https://github.com/varun-pahuja/infotact-project2",
  },
  oceanembed: {
    id: "oceanembed",
    title: "OceanEmbed Deep Learning",
    badge: "SATELLITE AI × CLIMATE TELEMETRY",
    subtitle: "3D Subsurface Ocean Thermal Profiling across 15 Depths (MoES / INCOIS)",
    overview:
      "A deep-learning spatial reconstruction system developed for the Ministry of Earth Sciences (MoES) and INCOIS to forecast 3D vertical ocean temperature columns down to 1,000m depth exclusively from 2D satellite surface observations (SST, SSS, and Altimetry).",
    constraints: [
      {
        label: "Vertical Stratification",
        value: "15 Depth Tiers (0–1000m)",
        detail: "Non-linear thermocline layer dynamics require stratified loss weighting to avoid over-smoothing shallow mixed layers.",
      },
      {
        label: "Satellite Data Fusion",
        value: "SST + SSS + Altimetry",
        detail: "Ingests Copernicus & INCOIS satellite rasters over the North Indian Ocean with coastline land masking.",
      },
      {
        label: "Ground Truth Telemetry",
        value: "Argo Profiling Floats",
        detail: "Validates against sparse physical Argo float vertical soundings using specialized spatial regularization.",
      },
      {
        label: "Inference Latency",
        value: "< 180ms / Grid Cell",
        detail: "Optimized model allows high-resolution spatial prediction across 0.25° oceanic grids in real time.",
      },
    ],
    pipeline: [
      {
        step: "01. Satellite Multi-Raster Ingestion",
        desc: "Ingests gridded Sea Surface Temperature, Salinity, and Altimetry anomaly rasters over 0°N–30°N, 40°E–100°E.",
        tech: "NetCDF4 / Xarray",
      },
      {
        step: "02. ViT + 3D-CNN Feature Fusion",
        desc: "Vision Transformer spatial patch attention captures mesoscale eddy dipole correlations while CNN extracts coastal upwelling.",
        tech: "PyTorch ViT",
      },
      {
        step: "03. Vertical Thermocline Projection",
        desc: "Decodes high-dimensional spatial embeddings into 15 continuous depth temperature estimates.",
        tech: "Physics-Informed Loss",
      },
      {
        step: "04. INCOIS Telemetry Validation",
        desc: "Evaluates predicted thermal profiles against real physical Argo profiling floats deployed across the Indian Ocean.",
        tech: "RMSE / MAE Scoring",
      },
    ],
    tradeoffs: [
      {
        choice: "Hybrid ViT + CNN vs Pure 3D CNN",
        why: "Captures both localized coastal upwelling (via CNN convolutions) and basin-wide dipole oscillations (via ViT self-attention).",
        alternative: "Pure CNN lost long-distance oceanic teleconnections across the Bay of Bengal.",
      },
      {
        choice: "Stratified Depth Weighting vs Uniform MSE",
        why: "Heavily penalizes errors inside the thermocline (100m–300m) where the vertical temperature drop is steepest.",
        alternative: "Uniform MSE achieved deceivingly low numerical error by prioritizing quiescent deep-water layers.",
      },
    ],
    benchmarks: [
      { metric: "RMSE (0–200m)", result: "0.68", unit: "°C" },
      { metric: "RMSE (200–1000m)", result: "0.34", unit: "°C" },
      { metric: "Monitored Depths", result: "15", unit: "Tiers" },
      { metric: "Validation Floats", result: "1,200+", unit: "Argo Points" },
    ],
    githubUrl: "https://github.com/varun-pahuja/SIHPS66",
  },
  webcmd: {
    id: "webcmd",
    title: "webcmd Agent Browser Engine",
    badge: "AGENT INFRASTRUCTURE × DOM COMPRESSION",
    subtitle: "Self-Learning Headless Browser Caching Sashing LLM Token Costs by up to 90%",
    overview:
      "A high-performance browser execution layer built for autonomous AI agents that hashes DOM accessibility trees, strips redundant styling and layout wrappers, and caches immutable page structures to prevent repetitive LLM context re-ingestion.",
    constraints: [
      {
        label: "Context Budget",
        value: "Up to 90% Savings",
        detail: "Standard web pages dump 25k–80k tokens of messy HTML into LLM context; webcmd prunes this down to <3k tokens.",
      },
      {
        label: "Action Integrity",
        value: "100% Target Retention",
        detail: "Every interactive DOM target (buttons, inputs, dropdowns) retains clean ARIA accessibility identifiers.",
      },
      {
        label: "Execution Latency",
        value: "< 40ms AST Prune",
        detail: "High-speed Tree Walker runs inside Node.js Playwright runtime without blocking page navigation.",
      },
      {
        label: "DOM Mutation Tracking",
        value: "Differential Hashes",
        detail: "Only sends changed node diffs on dynamic single-page application (SPA) client re-renders.",
      },
    ],
    pipeline: [
      {
        step: "01. Playwright CDP Ingestion",
        desc: "Captures raw accessibility tree and interactive coordinate layout via Chrome DevTools Protocol.",
        tech: "Playwright / CDP",
      },
      {
        step: "02. AST Structural Pruning",
        desc: "Recursively discards decorative containers (divs, svgs, styles) while retaining semantic interactive elements.",
        tech: "Custom Tree Walker",
      },
      {
        step: "03. Cryptographic DOM Hashing",
        desc: "Generates hierarchical hashes per component branch to identify repeated page layouts.",
        tech: "Branch AST Hashing",
      },
      {
        step: "04. Agent Action Execution",
        desc: "Translates LLM action outputs into synthetic user inputs with automated retry and assertion backoff.",
        tech: "Action Dispatcher",
      },
    ],
    tradeoffs: [
      {
        choice: "Accessibility Tree Hashing vs Raw HTML Minification",
        why: "Accessibility tree contains only what users and assistants can actually interact with; HTML minification keeps useless layout cruft.",
        alternative: "HTML minifiers only saved 18% tokens.",
      },
      {
        choice: "Client-Side In-Memory Cache vs Remote Redis Cache",
        why: "Zero network roundtrips during high-speed multi-step agent autonomous execution runs.",
        alternative: "Centralized cache added 20ms network latency per DOM step.",
      },
    ],
    benchmarks: [
      { metric: "Token Reduction", result: "89.6", unit: "% Avg" },
      { metric: "AST Prune Latency", result: "38.2", unit: "ms" },
      { metric: "Selector Accuracy", result: "100", unit: "% Valid" },
      { metric: "Test Scenarios", result: "500+", unit: "E2E Sites" },
    ],
    githubUrl: "https://github.com/varun-pahuja/webcmd",
  },
};

interface CaseStudyModalProps {
  isOpen: boolean;
  studyId: CaseStudyId | null;
  onClose: () => void;
}

export default function CaseStudyModal({ isOpen, studyId, onClose }: CaseStudyModalProps) {
  const [selectedId, setSelectedId] = useState<CaseStudyId | null>(studyId);
  const [activeTab, setActiveTab] = useState<"pipeline" | "tradeoffs" | "benchmarks">("pipeline");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (studyId) {
      setSelectedId(studyId);
    }
  }, [studyId]);

  // Lock body scroll & listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        playSound("switch");
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const currentId = selectedId || studyId || "airmouse";
  const study = CASE_STUDIES[currentId];

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              playSound("switch");
              onClose();
            }
          }}
          className="fixed inset-0 z-[99999] flex items-start justify-center p-4 pt-20 sm:p-6 sm:pt-24 md:pt-24 pb-12 sm:pb-16 overflow-y-auto bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-[var(--bg-void)] border border-[var(--border-dim)] rounded-2xl shadow-2xl overflow-hidden text-left my-2 sm:my-4"
          >
            {/* Top Architectural Header - Sticky so it is ALWAYS visible and never lost during scroll */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-lacquer)]/95 backdrop-blur-md gap-3">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar min-w-0 py-0.5">
                <div className="flex items-center gap-2 text-xs font-[family-name:var(--font-geist-mono)] shrink-0 mr-1">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-vermillion)] animate-pulse" />
                  <span className="text-[var(--accent-vermillion)] font-bold hidden sm:inline">{study.badge}</span>
                  <span className="text-[var(--text-stone)] hidden md:inline">// ARCHITECTURE DOSSIER</span>
                </div>

                {/* Quick System Switcher */}
                <div className="flex items-center gap-1 shrink-0">
                  {(["airmouse", "syncdoc", "oceanembed", "webcmd"] as const).map((id) => (
                    <button
                      key={id}
                      onClick={() => {
                        playSound("click");
                        setSelectedId(id);
                      }}
                      className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                        currentId === id
                          ? "bg-[var(--accent-vermillion)] text-black font-bold shadow-sm"
                          : "text-[var(--text-stone)] hover:text-[var(--text-washi)] bg-white/[0.03] border border-[var(--border-subtle)]"
                      }`}
                    >
                      {id === "airmouse" && "Air Mouse"}
                      {id === "syncdoc" && "SyncDoc"}
                      {id === "oceanembed" && "OceanEmbed"}
                      {id === "webcmd" && "webcmd"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pinned Close Button - Always visible and easily accessible */}
              <button
                onClick={() => {
                  playSound("switch");
                  onClose();
                }}
                className="p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-stone)] hover:text-[var(--text-washi)] hover:bg-white/[0.05] transition-all cursor-pointer shrink-0 ml-2"
                aria-label="Close Case Study"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Title & Subtitle */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-washi)] font-sans">
                  {study.title}
                </h2>
                <p className="text-sm text-[var(--accent-gold)] font-[family-name:var(--font-geist-mono)] mt-1">
                  {study.subtitle}
                </p>
                <p className="text-sm text-[var(--text-parchment)] leading-relaxed mt-3">
                  {study.overview}
                </p>
              </div>

              {/* Constraints HUD */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {study.constraints.map((c) => (
                  <div
                    key={c.label}
                    className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-lacquer)]/50 space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-[family-name:var(--font-geist-mono)]">
                      <span className="text-[var(--text-stone)]">{c.label}</span>
                      <span className="text-[var(--accent-vermillion)] font-bold">{c.value}</span>
                    </div>
                    <p className="text-xs text-[var(--text-parchment)] leading-normal">
                      {c.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Interactive Tab Switcher */}
              <div className="border-b border-[var(--border-subtle)] flex items-center gap-4 text-xs font-[family-name:var(--font-geist-mono)] pt-2">
                {(["pipeline", "tradeoffs", "benchmarks"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      playSound("click");
                      setActiveTab(tab);
                    }}
                    className={`pb-2 transition-all cursor-pointer uppercase tracking-wider relative ${
                      activeTab === tab
                        ? "text-[var(--accent-vermillion)] font-bold"
                        : "text-[var(--text-stone)] hover:text-[var(--text-washi)]"
                    }`}
                  >
                    {tab === "pipeline" && "Data Flow Pipeline"}
                    {tab === "tradeoffs" && "Architectural Trade-offs"}
                    {tab === "benchmarks" && "Empirical Benchmarks"}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="case-study-tab"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent-vermillion)]"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab 1: Data Flow Pipeline */}
              {activeTab === "pipeline" && (
                <div className="space-y-3 pt-1">
                  {study.pipeline.map((p, idx) => (
                    <div
                      key={p.step}
                      className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[rgba(6,6,10,0.7)] hover:border-[var(--accent-vermillion)]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-[var(--text-washi)] font-mono flex items-center gap-2">
                          <span className="text-[var(--accent-vermillion)]">{idx + 1}.</span>
                          <span>{p.step}</span>
                        </div>
                        <p className="text-xs text-[var(--text-parchment)] leading-normal pl-4">
                          {p.desc}
                        </p>
                      </div>
                      <div className="px-2.5 py-1 rounded bg-white/[0.04] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--accent-gold)] whitespace-nowrap self-start sm:self-center">
                        {p.tech}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Architectural Trade-offs */}
              {activeTab === "tradeoffs" && (
                <div className="space-y-3 pt-1">
                  {study.tradeoffs.map((t) => (
                    <div
                      key={t.choice}
                      className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[rgba(6,6,10,0.7)] space-y-2.5"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-washi)] font-mono">
                        <Zap className="w-3.5 h-3.5 text-[var(--accent-vermillion)]" />
                        <span>{t.choice}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-2.5 rounded-lg bg-[var(--accent-vermillion)]/5 border border-[var(--accent-vermillion)]/20 space-y-1">
                          <div className="text-[10px] uppercase font-mono text-[var(--accent-vermillion)] font-bold">
                            Engineered Choice &amp; Rationale
                          </div>
                          <p className="text-[var(--text-washi)] leading-relaxed">{t.why}</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-[var(--border-subtle)] space-y-1">
                          <div className="text-[10px] uppercase font-mono text-[var(--text-stone)]">
                            Alternative Evaluated &amp; Dropped
                          </div>
                          <p className="text-[var(--text-stone)] leading-relaxed">{t.alternative}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Empirical Benchmarks */}
              {activeTab === "benchmarks" && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  {study.benchmarks.map((b) => (
                    <div
                      key={b.metric}
                      className="p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[rgba(6,6,10,0.7)] text-center space-y-1"
                    >
                      <div className="text-2xl font-bold font-[family-name:var(--font-geist-mono)] text-[var(--accent-vermillion)]">
                        {b.result}
                      </div>
                      <div className="text-[10px] text-[var(--accent-gold)] uppercase font-mono">
                        {b.unit}
                      </div>
                      <div className="text-xs text-[var(--text-stone)]">{b.metric}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                <a
                  href={study.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound("click")}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-vermillion)] hover:underline"
                >
                  <span>Inspect Repository Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => {
                    playSound("switch");
                    onClose();
                  }}
                  className="px-4 py-1.5 rounded-lg bg-white/[0.05] border border-[var(--border-dim)] text-xs text-[var(--text-washi)] hover:bg-white/[0.1] transition-all cursor-pointer"
                >
                  Close Inspector
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
