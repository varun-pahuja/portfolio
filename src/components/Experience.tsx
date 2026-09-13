"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Briefcase,
  Globe,
  Radio,
  Clock,
  MapPin,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { playSound } from "@/lib/audio";
import SectionHeading from "./SectionHeading";

const experiences = [
  {
    id: "infotact",
    nodeIndex: "01",
    role: "Full Stack Developer Intern",
    company: "Infotact Solutions",
    period: "Jul 2026 — Present",
    type: "Production Engineering",
    location: "Remote",
    status: "ACTIVE MISSION",
    accent: "var(--accent-vermillion)",
    icon: Briefcase,
    highlights: [
      "Architected CRDT-based multi-user document engine using Yjs and Redis Pub/Sub, guaranteeing deterministic conflict-free convergence across concurrent distributed sessions.",
      "Engineered high-throughput RESTful API endpoints and WebSocket connection lifecycles in Node.js/Express with sub-15ms sync latency.",
      "Implemented modular, type-safe frontend UI systems in React 18 & TypeScript with granular state isolation to eliminate unnecessary re-renders.",
    ],
    tech: ["React", "TypeScript", "Node.js", "MongoDB", "Redis", "Yjs CRDT", "Socket.io"],
    current: true,
  },
  {
    id: "thiranex",
    nodeIndex: "02",
    role: "Cybersecurity Intern",
    company: "Thiranex",
    period: "May 2026 — Jun 2026",
    type: "Security & Threat Modeling",
    location: "Remote",
    status: "COMPLETED",
    accent: "#60a5fa",
    icon: Shield,
    highlights: [
      "Conducted automated vulnerability scans and threat modeling across internal application surfaces to detect OWASP Top 10 vectors.",
      "Engineered machine-learning phishing detection models using Scikit-learn, achieving 94.6% classification accuracy on simulated test sets.",
      "Authored remediation guidelines for API access controls, token entropy, and sanitized input validation protocols.",
    ],
    tech: ["Python", "Scikit-learn", "Network Security", "Vulnerability Assessment", "OWASP"],
    current: false,
  },
  {
    id: "ieee",
    nodeIndex: "03",
    role: "Webmaster Head",
    company: "IEEE IAS Student Branch, MITS",
    period: "Apr 2025 — Jan 2026",
    type: "Technical Leadership",
    location: "Gwalior, India",
    status: "COMPLETED",
    accent: "#34d399",
    icon: Globe,
    highlights: [
      "Led digital strategy and infrastructure for the official IEEE chapter website, cutting initial load times by 40% through asset optimization.",
      "Organized technical workshops, national hackathons, and technical symposiums engaging over 400+ engineering participants.",
      "Mentored junior developers in Git workflows, responsive design principles, and collaborative coding standards.",
    ],
    tech: ["Web Development", "UI/UX", "Digital Strategy", "Technical Leadership"],
    current: false,
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeExpIndex, setActiveExpIndex] = useState(0);

  const scrollToMilestone = (index: number) => {
    playSound("switch");
    setActiveExpIndex(index);
    const element = document.getElementById(`exp-card-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section id="experience" className="relative py-24 md:py-32 px-6 md:px-8 bg-[rgba(10,10,18,0.95)]">
      {/* Blueprint divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-dim)] to-transparent"
        aria-hidden="true"
      />

      <div ref={ref} className="mx-auto max-w-[1240px]">
        {/* Section Heading */}
        <SectionHeading index="03" label="Experience" inView={isInView} />

        {/* 2-Column Asymmetric Split-Scroll Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* ─────────────────────────────────────────────────────────────
           * LEFT COLUMN: Sticky Mission Telemetry Console (lg:col-span-5)
           * ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <div className="bg-[var(--bg-lacquer)] border border-[var(--border-dim)] rounded-xl p-6 relative overflow-hidden shadow-xl">
              {/* Telemetry header */}
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-5 text-xs font-[family-name:var(--font-geist-mono)] text-[var(--text-stone)]">
                <div className="flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-[var(--accent-vermillion)] animate-pulse" />
                  <span className="font-semibold text-[var(--text-washi)]">TELEMETRY // FLIGHT RECORDER</span>
                </div>
                <span className="text-[var(--accent-vermillion)]">3 MILESTONES</span>
              </div>

              <h3 className="font-sans text-2xl font-bold text-[var(--text-washi)] mb-2">
                Mission Chronology
              </h3>
              <p className="text-xs md:text-sm text-[var(--text-parchment)] leading-relaxed mb-6">
                Hands-on engineering tracks across production web systems, machine learning security,
                and technical community leadership.
              </p>

              {/* Interactive Node Scrubber / Jump Selector */}
              <div className="space-y-2 mb-6">
                <div className="text-[11px] font-[family-name:var(--font-geist-mono)] text-[var(--text-stone)] uppercase tracking-wider mb-2">
                  Interactive Node Selector:
                </div>
                {experiences.map((exp, idx) => {
                  const isActive = activeExpIndex === idx;
                  const Icon = exp.icon;
                  return (
                    <button
                      key={exp.id}
                      onClick={() => scrollToMilestone(idx)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        isActive
                          ? "bg-[var(--bg-ink)] border-[var(--accent-vermillion)] shadow-md text-[var(--text-washi)]"
                          : "border-[var(--border-subtle)] bg-white/[0.01] text-[var(--text-stone)] hover:text-[var(--text-parchment)] hover:border-[var(--border-dim)]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded flex items-center justify-center text-xs font-mono font-bold ${
                            isActive
                              ? "bg-[var(--accent-vermillion)] text-black"
                              : "bg-[var(--bg-ink)] text-[var(--text-stone)] border border-[var(--border-dim)]"
                          }`}
                        >
                          {exp.nodeIndex}
                        </div>
                        <div>
                          <div className="text-xs font-semibold font-sans">{exp.company}</div>
                          <div className="text-[10px] font-mono opacity-70">{exp.role}</div>
                        </div>
                      </div>
                      <Icon className={`w-4 h-4 ${isActive ? "text-[var(--accent-vermillion)]" : "opacity-40"}`} />
                    </button>
                  );
                })}
              </div>

              {/* Status metrics footer */}
              <div className="pt-4 border-t border-[var(--border-subtle)] grid grid-cols-2 gap-3 text-xs font-[family-name:var(--font-geist-mono)]">
                <div>
                  <div className="text-[10px] text-[var(--text-stone)]">ACTIVE SPECIALIZATION</div>
                  <div className="text-[var(--accent-vermillion)] font-bold truncate mt-0.5">
                    CRDT &amp; Dist. Web
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-stone)]">PRODUCTION LOGS</div>
                  <div className="text-emerald-400 font-bold mt-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
           * RIGHT COLUMN: Scrolling Detailed Milestone Cards (lg:col-span-7)
           * ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 space-y-8">
            {experiences.map((exp, i) => {
              const Icon = exp.icon;
              return (
                <motion.article
                  key={exp.id}
                  id={`exp-card-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onMouseEnter={() => setActiveExpIndex(i)}
                  className={`bg-[var(--bg-lacquer)] border rounded-xl p-6 md:p-8 relative overflow-hidden shadow-xl transition-all duration-300 ${
                    activeExpIndex === i
                      ? "border-[var(--accent-vermillion)]/60 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                      : "border-[var(--border-dim)] hover:border-[var(--border-subtle)]"
                  }`}
                >
                  {/* Top telemetry badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-4 mb-5 text-xs font-[family-name:var(--font-geist-mono)]">
                    <div className="flex items-center gap-2 text-[var(--text-stone)]">
                      <Icon className="w-4 h-4 text-[var(--accent-vermillion)]" />
                      <span className="font-bold text-[var(--text-washi)]">NODE {exp.nodeIndex}</span>
                      <span>{"// "}{exp.type}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded font-mono font-bold ${
                          exp.current
                            ? "bg-[var(--accent-vermillion)]/15 border border-[var(--accent-vermillion)] text-[var(--accent-vermillion)] animate-pulse"
                            : "bg-white/[0.03] border border-[var(--border-dim)] text-[var(--text-stone)]"
                        }`}
                      >
                        {exp.status}
                      </span>
                    </div>
                  </div>

                  {/* Title & Metadata */}
                  <div className="mb-4">
                    <h3 className="font-sans text-xl md:text-2xl font-bold text-[var(--text-washi)] mb-1">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--text-stone)] font-[family-name:var(--font-geist-mono)]">
                      <span className="text-[var(--accent-vermillion)] font-medium text-sm">
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Key Highlights / Engineering Proof */}
                  <ul className="space-y-2.5 mb-6 text-sm text-[var(--text-parchment)] leading-relaxed">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <ChevronRight className="w-4 h-4 text-[var(--accent-vermillion)] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-subtle)]">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-[11px] rounded border border-[var(--border-dim)] bg-[var(--bg-ink)] text-[var(--text-stone)] font-[family-name:var(--font-geist-mono)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
