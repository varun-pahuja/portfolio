"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Cpu,
  Terminal,
  Layers,
  Database,
  ShieldCheck,
  Activity,
  Code2,
} from "lucide-react";
import { playSound } from "@/lib/audio";
import SectionHeading from "./SectionHeading";

type Category = "all" | "frontend" | "backend" | "database" | "iot" | "tools";

const categories: { id: Category; label: string; icon: typeof Code2 }[] = [
  { id: "all", label: "ALL", icon: Layers },
  { id: "frontend", label: "FRONTEND", icon: Code2 },
  { id: "backend", label: "BACKEND & CRDT", icon: Terminal },
  { id: "database", label: "DATA & STATE", icon: Database },
  { id: "iot", label: "IOT & EMBEDDED", icon: Cpu },
  { id: "tools", label: "SYSTEMS & TOOLS", icon: ShieldCheck },
];

const techStack: { name: string; category: Category; spec: string }[] = [
  { name: "React 19", category: "frontend", spec: "UI & Component Architecture" },
  { name: "Next.js 16", category: "frontend", spec: "App Router & SSR/SSG" },
  { name: "TypeScript", category: "frontend", spec: "Strict Static Typing" },
  { name: "Node.js", category: "backend", spec: "Asynchronous I/O Runtime" },
  { name: "Express", category: "backend", spec: "RESTful API Services" },
  { name: "Python", category: "backend", spec: "ML & Scientific Computing" },
  { name: "Yjs CRDT", category: "backend", spec: "Conflict-Free State Sync" },
  { name: "MongoDB", category: "database", spec: "Document Store" },
  { name: "PostgreSQL", category: "database", spec: "Relational Persistence" },
  { name: "Redis", category: "database", spec: "Pub/Sub & In-Memory Cache" },
  { name: "Firebase", category: "database", spec: "Real-time Database & Auth" },
  { name: "ESP32", category: "iot", spec: "Dual-Core WiFi/BLE Microcontroller" },
  { name: "Arduino", category: "iot", spec: "Hardware Prototyping" },
  { name: "Linux", category: "tools", spec: "POSIX Kernel & Server Admin" },
  { name: "Git", category: "tools", spec: "Version Control & Branching" },
  { name: "Figma", category: "tools", spec: "UI/UX & Design Systems" },
  { name: "Bash", category: "tools", spec: "Shell Scripting & Automation" },
];

const stats = [
  { value: "3", label: "Internships", sub: "Infotact, Thiranex, IEEE" },
  { value: "8.06", label: "CGPA", sub: "MITS Gwalior (IoT Spec)" },
  { value: "15+", label: "Projects", sub: "Web, AI & Hardware" },
  { value: "2", label: "Hackathons", sub: "NASA SpaceApps & Regional" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  const filteredTech =
    selectedCategory === "all"
      ? techStack
      : techStack.filter((t) => t.category === selectedCategory);

  const handleSelectCategory = (cat: Category) => {
    playSound("click");
    setSelectedCategory(cat);
  };

  return (
    <section id="about" className="relative py-24 md:py-32 px-6 md:px-8 bg-[rgba(7,7,13,0.94)]">
      {/* Blueprint Top Divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-dim)] to-transparent"
        aria-hidden="true"
      />

      <div ref={ref} className="mx-auto max-w-[1240px]">
        {/* Section Heading */}
        <SectionHeading index="01" label="About" inView={isInView} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* ─────────────────────────────────────────────────────────────
           * LEFT COLUMN: Bio & Hardware System Status HUD (lg:col-span-6)
           * ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-sans text-3xl md:text-5xl font-bold leading-tight text-[var(--text-washi)]">
                Building at the
                <br />
                <span className="text-[var(--accent-vermillion)]">intersection</span> of
                <br />
                web, hardware &amp; intelligence
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[var(--text-parchment)] leading-relaxed text-base md:text-lg"
            >
              3rd-year B.Tech undergraduate in Internet of Things at MITS Gwalior. Currently a Full
              Stack Developer Intern at <strong className="text-[var(--text-washi)] font-semibold">Infotact Solutions</strong>,
              where I design distributed systems, build CRDT-backed real-time document engines, and
              engineer resilient frontend architectures.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[var(--text-parchment)] leading-relaxed text-base md:text-lg"
            >
              From gesture-controlled IoT microcontrollers and 4-channel logic analyzers to
              NASA-indexed RAG pipelines and ML phishing detectors, I believe software reaches its
              highest expression when it touches the physical world.
            </motion.p>

            {/* Tactical System Diagnostics Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="rounded-xl border border-[var(--border-dim)] bg-[var(--bg-lacquer)] p-5 relative overflow-hidden font-[family-name:var(--font-geist-mono)] text-xs shadow-lg"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 mb-3 text-[var(--text-stone)]">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[var(--accent-vermillion)] animate-pulse" />
                  <span className="font-bold text-[var(--text-washi)]">SYSTEM TELEMETRY</span>
                </div>
                <span className="text-emerald-400 font-bold">STATUS: NOMINAL</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px]">
                <div>
                  <span className="text-[var(--text-stone)] block text-[9px] uppercase">Node Target</span>
                  <span className="text-[var(--text-washi)] font-semibold">MITS Gwalior</span>
                </div>
                <div>
                  <span className="text-[var(--text-stone)] block text-[9px] uppercase">Discipline</span>
                  <span className="text-[var(--accent-vermillion)] font-semibold">IoT &amp; Systems</span>
                </div>
                <div>
                  <span className="text-[var(--text-stone)] block text-[9px] uppercase">Audio Engine</span>
                  <span className="text-[var(--text-washi)] font-semibold">Synth 24-bit</span>
                </div>
                <div>
                  <span className="text-[var(--text-stone)] block text-[9px] uppercase">Current Role</span>
                  <span className="text-[var(--text-washi)] font-semibold">Full Stack Intern</span>
                </div>
                <div>
                  <span className="text-[var(--text-stone)] block text-[9px] uppercase">Focus</span>
                  <span className="text-[var(--text-washi)] font-semibold">CRDT &amp; WebSockets</span>
                </div>
                <div>
                  <span className="text-[var(--text-stone)] block text-[9px] uppercase">Build Mode</span>
                  <span className="text-emerald-400 font-semibold">Production Ready</span>
                </div>
              </div>
            </motion.div>

            {/* Stats Matrix */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[var(--border-subtle)]"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="p-3 rounded-lg bg-[var(--bg-lacquer)] border border-[var(--border-subtle)]">
                  <div className="text-2xl md:text-3xl font-bold text-[var(--accent-vermillion)] tabular-nums font-sans">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-[var(--text-washi)] mt-1 font-sans">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-[var(--text-stone)] mt-0.5 font-[family-name:var(--font-geist-mono)]">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
           * RIGHT COLUMN: Interactive Categorized Tech Matrix (lg:col-span-6)
           * ───────────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 bg-[var(--bg-lacquer)] border border-[var(--border-dim)] rounded-xl p-6 md:p-8 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-6">
              <div>
                <h3 className="text-xs tracking-[0.25em] uppercase text-[var(--accent-vermillion)] font-bold font-[family-name:var(--font-geist-mono)]">
                  TECHNICAL CAPABILITIES
                </h3>
                <h4 className="font-sans text-xl font-bold text-[var(--text-washi)] mt-1">
                  Categorized Stack Matrix
                </h4>
              </div>
              <span className="text-xs font-[family-name:var(--font-geist-mono)] text-[var(--text-stone)]">
                {filteredTech.length} Technologies
              </span>
            </div>

            {/* Interactive Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-[family-name:var(--font-geist-mono)] rounded-md border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[var(--accent-vermillion)] text-black border-[var(--accent-vermillion)] font-bold shadow-md"
                        : "border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)] text-[var(--text-stone)] hover:text-[var(--text-washi)] hover:border-[var(--border-subtle)]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Animated Repacking Tech Tags */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 min-h-[280px]">
              <AnimatePresence>
                {filteredTech.map((tech) => (
                  <motion.div
                    key={tech.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="p-3 rounded-lg border border-[var(--border-dim)] bg-[rgba(6,6,10,0.6)] hover:border-[var(--accent-vermillion)]/50 hover:bg-[var(--bg-ink)] transition-all group cursor-default"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[var(--text-washi)] group-hover:text-[var(--accent-vermillion)] transition-colors">
                        {tech.name}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-[var(--border-subtle)] text-[var(--text-stone)] font-[family-name:var(--font-geist-mono)]">
                        {tech.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-stone)] mt-1 font-[family-name:var(--font-geist-mono)] truncate">
                      {tech.spec}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Quick links */}
            <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/varun-pahuja"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound("click")}
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--text-stone)] hover:text-[var(--accent-vermillion)] transition-colors font-[family-name:var(--font-geist-mono)]"
                >
                  <span>GITHUB</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/varun-pahuja475/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound("click")}
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--text-stone)] hover:text-[var(--accent-vermillion)] transition-colors font-[family-name:var(--font-geist-mono)]"
                >
                  <span>LINKEDIN</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <span className="text-[11px] text-[var(--text-stone)] font-[family-name:var(--font-geist-mono)]">
                {"/// LIVE REPO INDEX"}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
