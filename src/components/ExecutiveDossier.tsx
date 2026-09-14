"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Mail,
  Check,
  Award,
  Cpu,
  Server,
  Terminal,
  Printer,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { playSound } from "@/lib/audio";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

interface ExecutiveDossierProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExecutiveDossier({ isOpen, onClose }: ExecutiveDossierProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    playSound("click");
    navigator.clipboard.writeText("varunpahuja2005@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handlePrint = () => {
    playSound("switch");
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#09090e] border border-[var(--border-dim)] rounded-2xl shadow-2xl overflow-hidden my-6 text-left"
        >
          {/* Top Tactical Status Bar */}
          <div className="flex items-center justify-between px-6 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-lacquer)]/70">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-[var(--accent-vermillion)] uppercase tracking-wider">
                EXECUTIVE DOSSIER // RECRUITER FAST-TRACK
              </span>
              <span className="hidden sm:inline text-xs font-mono text-[var(--text-stone)]">
                [15-SEC HIGH-SIGNAL SUMMARY]
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-stone)] hover:text-[var(--text-washi)] hover:bg-white/[0.05] transition-all cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Dossier</span>
              </button>
              <button
                onClick={() => {
                  playSound("switch");
                  onClose();
                }}
                className="p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-stone)] hover:text-[var(--text-washi)] hover:bg-white/[0.05] transition-all cursor-pointer"
                aria-label="Close Executive Mode"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-7 max-h-[85vh] overflow-y-auto font-sans">
            {/* Header: Candidate Identity & Direct Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--border-subtle)]">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-washi)] tracking-tight">
                    Varun Pahuja
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    AVAILABLE FOR HIRE
                  </span>
                </div>
                <p className="text-sm text-[var(--accent-gold)] font-mono mt-1">
                  Full-Stack Developer &amp; IoT Embedded Systems Engineer
                </p>
                <p className="text-xs text-[var(--text-stone)] font-mono mt-1">
                  MITS Gwalior (B.Tech IoT, 2024–2028) • CGPA: 8.06 • Gwalior, MP, India • +91 7415710476
                </p>
              </div>

              {/* Fast Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="/Resume.pdf"
                  download="Varun_Pahuja_Resume.pdf"
                  onClick={() => playSound("click")}
                  className="px-3.5 py-2 rounded-lg bg-[var(--accent-vermillion)] text-black font-semibold text-xs flex items-center gap-1.5 hover:brightness-110 transition-all shadow-md cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resume (PDF)</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2 rounded-lg bg-white/[0.06] border border-[var(--border-dim)] hover:bg-white/[0.1] text-[var(--text-washi)] text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-mono">Email Copied!</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-3.5 h-3.5 text-[var(--accent-vermillion)]" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href="https://linkedin.com/in/varun-pahuja"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound("click")}
                  className="p-2 rounded-lg bg-white/[0.06] border border-[var(--border-dim)] hover:bg-white/[0.1] text-[var(--text-washi)] text-xs flex items-center transition-all cursor-pointer"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4 text-sky-400" />
                </a>

                <a
                  href="https://github.com/varun-pahuja"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound("click")}
                  className="p-2 rounded-lg bg-white/[0.06] border border-[var(--border-dim)] hover:bg-white/[0.1] text-[var(--text-washi)] text-xs flex items-center transition-all cursor-pointer"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Core Impact Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Gesture ML Accuracy", val: "94.2%", sub: "ESP32 BLE HID Inertial Mouse" },
                { label: "CRDT Sync Latency", val: "<12ms", sub: "Distributed Zero-Conflict State" },
                { label: "Subsurface Ocean Depths", val: "15 Layers", sub: "MoES/INCOIS Deep Learning" },
                { label: "LLM Token Savings", val: "Up to 90%", sub: "webcmd DOM Tree Caching" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.02)] space-y-0.5"
                >
                  <div className="text-xl font-bold font-mono text-[var(--accent-vermillion)]">
                    {m.val}
                  </div>
                  <div className="text-xs font-semibold text-[var(--text-washi)]">{m.label}</div>
                  <div className="text-[10px] text-[var(--text-stone)] font-mono truncate">{m.sub}</div>
                </div>
              ))}
            </div>

            {/* Flagship Systems Breakdown */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-gold)] uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>Flagship Engineering Systems</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Air Mouse AI */}
                <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-lacquer)]/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--text-washi)] text-sm">
                      1. Air Mouse AI (Hardware × ML)
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-red-500/10 text-red-400 border border-red-500/20">
                      ESP32 / BLE HID
                    </span>
                  </div>
                  <p className="text-[var(--text-parchment)] leading-relaxed">
                    Wearable gesture mouse converting hand motion to cursor displacement via MPU-6050 IMU, FreeRTOS Core 0 complementary filter math, and scikit-learn ML gesture classification.
                  </p>
                  <div className="text-mono text-[10px] text-[var(--text-stone)]">
                    Stack: C++, ESP-IDF, FreeRTOS, BLE 5.0, Next.js, Flask, Python
                  </div>
                </div>

                {/* SyncDoc */}
                <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-lacquer)]/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--text-washi)] text-sm">
                      2. SyncDoc (Distributed Systems)
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      CRDT / Yjs
                    </span>
                  </div>
                  <p className="text-[var(--text-parchment)] leading-relaxed">
                    Real-time multi-peer document collaboration engine using Yjs CRDTs, Lamport vector clocks, and Redis Pub/Sub cluster backplane to guarantee deterministic convergence with zero merge conflicts.
                  </p>
                  <div className="text-mono text-[10px] text-[var(--text-stone)]">
                    Stack: React 18, Yjs, WebSockets, Redis Pub/Sub, Node.js, MongoDB
                  </div>
                </div>

                {/* OceanEmbed */}
                <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-lacquer)]/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--text-washi)] text-sm">
                      3. OceanEmbed (Climate Deep Learning)
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      MoES / INCOIS Hackathon
                    </span>
                  </div>
                  <p className="text-[var(--text-parchment)] leading-relaxed">
                    Vision Transformer + 3D CNN model predicting 3D subsurface temperature profiles down to 1,000m depth from satellite sea surface observations with low RMSE across 15 depth tiers.
                  </p>
                  <div className="text-mono text-[10px] text-[var(--text-stone)]">
                    Stack: PyTorch, Vision Transformers, 3D CNNs, NumPy, NetCDF4
                  </div>
                </div>

                {/* webcmd */}
                <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-lacquer)]/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--text-washi)] text-sm">
                      4. webcmd (Agent Browser Engine)
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-violet-500/10 text-violet-400 border border-violet-500/20">
                      Agent Infra
                    </span>
                  </div>
                  <p className="text-[var(--text-parchment)] leading-relaxed">
                    Self-learning headless browser caching layer for autonomous AI agents that hashes DOM accessibility trees and strips redundant markup, reducing LLM context token expenditure by 90%.
                  </p>
                  <div className="text-mono text-[10px] text-[var(--text-stone)]">
                    Stack: TypeScript, Node.js, Playwright, DOM Hashing, NPM
                  </div>
                </div>
              </div>
            </div>

            {/* Experience & Leadership */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-gold)] uppercase tracking-wider">
                <Server className="w-4 h-4" />
                <span>Work Experience &amp; Leadership</span>
              </div>

              <div className="space-y-2.5 text-xs">
                {/* Infotact */}
                <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.015)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="font-bold text-[var(--text-washi)]">
                      Full Stack Developer Intern — Infotact Solutions
                    </div>
                    <div className="font-mono text-[11px] text-[var(--text-stone)]">
                      Jan 2026 – Present • Remote
                    </div>
                  </div>
                  <p className="text-[var(--text-parchment)] mt-1.5 leading-relaxed">
                    Engineered high-throughput REST APIs and responsive Next.js/React frontends. Optimized MongoDB/Redis database queries and integrated secure authentication workflows.
                  </p>
                </div>

                {/* Thiranex */}
                <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.015)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="font-bold text-[var(--text-washi)]">
                      Cybersecurity Intern — Thiranex
                    </div>
                    <div className="font-mono text-[11px] text-[var(--text-stone)]">
                      Oct 2025 – Dec 2025 • Remote
                    </div>
                  </div>
                  <p className="text-[var(--text-parchment)] mt-1.5 leading-relaxed">
                    Conducted network vulnerability assessments and penetration testing on web infrastructures. Deployed Python ML threat classification models for automated intrusion detection.
                  </p>
                </div>

                {/* IEEE IAS */}
                <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.015)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="font-bold text-[var(--text-washi)]">
                      Webmaster Head &amp; Technical Lead — IEEE IAS MITS Chapter
                    </div>
                    <div className="font-mono text-[11px] text-[var(--text-stone)]">
                      May 2024 – Present • Gwalior
                    </div>
                  </div>
                  <p className="text-[var(--text-parchment)] mt-1.5 leading-relaxed">
                    Architected official web platforms serving 1,000+ active student members. Mentored 50+ engineers in web development, Git version control, and IoT microcontroller prototyping.
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Skills Matrix */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-gold)] uppercase tracking-wider">
                <Terminal className="w-4 h-4" />
                <span>Technical Skills Matrix</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs font-mono">
                <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-lacquer)]/50">
                  <div className="text-[var(--accent-vermillion)] font-bold mb-1">// EMBEDDED &amp; IoT</div>
                  <div className="text-[var(--text-parchment)] text-[11px] leading-relaxed">
                    ESP32, FreeRTOS, Arduino, Raspberry Pi, C/C++, I2C, SPI, UART, BLE HID, MQTT
                  </div>
                </div>
                <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-lacquer)]/50">
                  <div className="text-[var(--accent-gold)] font-bold mb-1">// WEB &amp; FRONTEND</div>
                  <div className="text-[var(--text-parchment)] text-[11px] leading-relaxed">
                    Next.js 16, React 19, TypeScript, Tailwind CSS v4, Three.js / R3F, Framer Motion
                  </div>
                </div>
                <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-lacquer)]/50">
                  <div className="text-cyan-400 font-bold mb-1">// BACKEND &amp; DISTRIBUTED</div>
                  <div className="text-[var(--text-parchment)] text-[11px] leading-relaxed">
                    Node.js, Express, Yjs CRDTs, Redis Pub/Sub, WebSockets, MongoDB, PostgreSQL
                  </div>
                </div>
                <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-lacquer)]/50">
                  <div className="text-violet-400 font-bold mb-1">// AI, ML &amp; TOOLS</div>
                  <div className="text-[var(--text-parchment)] text-[11px] leading-relaxed">
                    Python, PyTorch, scikit-learn, ChromaDB, HuggingFace, Docker, Linux, Git
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
              <div className="text-xs text-[var(--text-stone)] font-mono">
                Direct inquiry:{" "}
                <a
                  href="mailto:varunpahuja2005@gmail.com"
                  className="text-[var(--accent-vermillion)] underline"
                >
                  varunpahuja2005@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/Resume.pdf"
                  download="Varun_Pahuja_Resume.pdf"
                  className="px-4 py-1.5 rounded-lg bg-[var(--accent-vermillion)] text-black font-semibold text-xs hover:brightness-110 transition-all"
                >
                  Download PDF
                </a>
                <button
                  onClick={() => {
                    playSound("switch");
                    onClose();
                  }}
                  className="px-4 py-1.5 rounded-lg bg-white/[0.05] border border-[var(--border-dim)] text-xs text-[var(--text-washi)] hover:bg-white/[0.1] transition-all cursor-pointer"
                >
                  Exit Fast-Track
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
