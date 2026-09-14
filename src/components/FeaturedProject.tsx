"use client";

import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { ExternalLink, Layers } from "lucide-react";
import dynamic from "next/dynamic";
import SectionHeading from "./SectionHeading";
import CaseStudyModal from "./CaseStudyModal";
import { playSound } from "@/lib/audio";

const HardwarePlayboard = dynamic(() => import("./HardwarePlayboard"), {
  ssr: false,
  loading: () => null,
});

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function FeaturedProject() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);

  return (
    <section id="projects" className="relative py-24 md:py-32 px-6 md:px-8 bg-[rgba(12,12,20,0.93)]">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-dim)] to-transparent" aria-hidden="true" />

      <div ref={ref} className="mx-auto max-w-[1100px]">
        {/* Section label */}
        <SectionHeading index="02" label="Featured Project" inView={isInView} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Architecture diagram — left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative bg-[var(--bg-lacquer)] border border-[var(--border-dim)] rounded-xl p-2 md:p-3 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[var(--accent-vermillion)]/20 rounded-tr-xl" aria-hidden="true" />

              {/* Interactive 3D hardware playboard */}
              <HardwarePlayboard />

              {/* Glow effect */}
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[var(--accent-vermillion)]/5 rounded-full blur-3xl" aria-hidden="true" />
            </div>
          </motion.div>

          {/* Project info — right */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded bg-[var(--accent-vermillion)]/10 text-[var(--accent-vermillion)] border border-[var(--accent-vermillion)]/20">
                HERO PROJECT
              </span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-3xl md:text-4xl font-bold"
            >
              Air Mouse AI
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-[var(--text-parchment)] leading-relaxed text-base md:text-lg"
            >
              Turn an ESP32 into a wireless gesture-controlled mouse — with a
              full-stack dashboard and ML recognition. Point. Flick. Click. No
              surface needed.
            </motion.p>

            {/* Key stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="text-center p-3 rounded-lg bg-[var(--bg-lacquer)] border border-[var(--border-subtle)]">
                <div className="text-lg font-bold text-[var(--accent-vermillion)] tabular-nums">~94%</div>
                <div className="text-xs text-[var(--text-stone)]">ML Accuracy</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-[var(--bg-lacquer)] border border-[var(--border-subtle)]">
                <div className="text-lg font-bold text-[var(--accent-gold)] tabular-nums">4</div>
                <div className="text-xs text-[var(--text-stone)]">Gestures</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-[var(--bg-lacquer)] border border-[var(--border-subtle)]">
                <div className="text-lg font-bold text-[var(--text-washi)] tabular-nums">6</div>
                <div className="text-xs text-[var(--text-stone)]">Components</div>
              </div>
            </motion.div>

            {/* Tech tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-2"
            >
              {["ESP32", "BLE HID", "Next.js", "Node.js", "Flask", "MongoDB", "scikit-learn", "Arduino"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs rounded border border-[var(--border-dim)] text-[var(--text-stone)]"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 pt-2"
            >
              <a
                href="https://github.com/varun-pahuja/air-mouse"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound("click")}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[var(--accent-vermillion)] text-white hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] transition-all duration-300"
              >
                <GithubIcon className="w-4 h-4" />
                Source Code
              </a>
              <button
                onClick={() => {
                  playSound("switch");
                  setCaseStudyOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-[var(--border-dim)] text-[var(--text-parchment)] hover:border-[var(--accent-vermillion)]/50 hover:text-[var(--text-washi)] transition-all duration-300 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[var(--accent-vermillion)]" />
                Inspect Architecture
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <CaseStudyModal
        isOpen={caseStudyOpen}
        studyId="airmouse"
        onClose={() => setCaseStudyOpen(false)}
      />
    </section>
  );
}
