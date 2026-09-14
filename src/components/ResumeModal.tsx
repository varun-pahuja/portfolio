"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, Briefcase, GraduationCap, Award, Cpu, Mail } from "lucide-react";
import { playSound } from "@/lib/audio";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
            className="relative w-full max-w-2xl bg-[var(--bg-void)] border border-[var(--border-dim)] rounded-2xl shadow-2xl overflow-hidden text-left my-2 sm:my-4"
          >
            {/* Header - Sticky so it is ALWAYS visible */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-lacquer)]/95 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-[family-name:var(--font-geist-mono)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[var(--text-washi)] font-bold">VARUN PAHUJA</span>
                <span className="text-[var(--text-stone)]">// VERIFIED RESUME DOSSIER</span>
              </div>
              <button
                onClick={() => {
                  playSound("switch");
                  onClose();
                }}
                className="p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-stone)] hover:text-[var(--text-washi)] hover:bg-white/[0.05] transition-all cursor-pointer"
                aria-label="Close Resume"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Identity Banner */}
            <div className="border-b border-[var(--border-subtle)] pb-5">
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-washi)] font-sans">
                Varun Pahuja
              </h2>
              <p className="text-sm text-[var(--accent-vermillion)] font-[family-name:var(--font-geist-mono)] mt-1">
                Full-Stack Developer &amp; Internet of Things Engineer
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-[var(--text-stone)] font-mono">
                <span>📍 Gwalior, Madhya Pradesh</span>
                <span>📞 +91 7415710476</span>
                <span>✉️ varunpahuja2005@gmail.com</span>
                <span>🎓 CGPA: 8.06 (3rd Year)</span>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-[var(--accent-gold)] uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </div>
              <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-lacquer)]/40 space-y-1 text-xs">
                <div className="flex justify-between items-baseline font-bold text-[var(--text-washi)]">
                  <span>Madhav Institute of Technology and Science (MITS), Gwalior</span>
                  <span className="font-mono text-[var(--text-stone)]">2024 — 2028</span>
                </div>
                <div className="text-[var(--accent-vermillion)]">
                  B.Tech in Internet of Things (IoT) • Current CGPA: 8.06
                </div>
                <p className="text-[var(--text-stone)] pt-1">
                  Core: Embedded Systems, Distributed Computing, Computer Networks, Data Structures &amp; Algorithms.
                </p>
              </div>
            </div>

            {/* Work Experience */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-[var(--accent-gold)] uppercase tracking-wider">
                <Briefcase className="w-4 h-4" />
                <span>Experience</span>
              </div>
              
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-lacquer)]/40 space-y-1.5 text-xs">
                  <div className="flex justify-between items-baseline font-bold text-[var(--text-washi)]">
                    <span>Full Stack Developer Intern • Infotact Solutions</span>
                    <span className="font-mono text-emerald-400">Jul 2026 — Present</span>
                  </div>
                  <ul className="list-disc list-inside text-[var(--text-parchment)] space-y-1 leading-relaxed">
                    <li>Architected CRDT-based multi-user document engine with Yjs, Redis Pub/Sub, and WebSockets (&lt;15ms sync).</li>
                    <li>Developed high-concurrency Node.js/Express APIs and modular React 18 / TypeScript components.</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-lacquer)]/40 space-y-1.5 text-xs">
                  <div className="flex justify-between items-baseline font-bold text-[var(--text-washi)]">
                    <span>Cybersecurity Intern • Thiranex</span>
                    <span className="font-mono text-[var(--text-stone)]">May 2026 — Jun 2026</span>
                  </div>
                  <ul className="list-disc list-inside text-[var(--text-parchment)] space-y-1 leading-relaxed">
                    <li>Conducted vulnerability assessments across internal application endpoints against OWASP Top 10.</li>
                    <li>Built Scikit-learn machine learning classification models achieving 94.6% accuracy on phishing vectors.</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-lacquer)]/40 space-y-1.5 text-xs">
                  <div className="flex justify-between items-baseline font-bold text-[var(--text-washi)]">
                    <span>Webmaster Head • IEEE IAS Student Branch, MITS</span>
                    <span className="font-mono text-[var(--text-stone)]">Apr 2025 — Jan 2026</span>
                  </div>
                  <ul className="list-disc list-inside text-[var(--text-parchment)] space-y-1 leading-relaxed">
                    <li>Cut official branch website load latency by 40% through asset bundling and Next.js optimization.</li>
                    <li>Organized national hackathons, technical symposiums, and mentored 400+ engineering students.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Core Competencies */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-[var(--accent-gold)] uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>Technical Arsenal</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-white/[0.02]">
                  <strong className="text-[var(--text-washi)]">Languages &amp; Core:</strong>{" "}
                  <span className="text-[var(--text-stone)]">TypeScript, JavaScript, Python, C/C++, SQL, HTML/CSS</span>
                </div>
                <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-white/[0.02]">
                  <strong className="text-[var(--text-washi)]">Frameworks &amp; Web:</strong>{" "}
                  <span className="text-[var(--text-stone)]">Next.js 16, React 19, Node.js, Express, Tailwind CSS, Three.js</span>
                </div>
                <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-white/[0.02]">
                  <strong className="text-[var(--text-washi)]">Distributed &amp; DB:</strong>{" "}
                  <span className="text-[var(--text-stone)]">Yjs CRDT, Redis Pub/Sub, MongoDB, PostgreSQL, Firebase</span>
                </div>
                <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-white/[0.02]">
                  <strong className="text-[var(--text-washi)]">IoT &amp; Hardware:</strong>{" "}
                  <span className="text-[var(--text-stone)]">ESP32, Arduino, FreeRTOS, BLE HID, I2C/SPI, Sensor Interfacing</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--border-subtle)]">
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="/Resume.pdf"
                  download="Varun_Pahuja_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent-vermillion)] text-white text-xs font-semibold hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.4)] transition-all cursor-pointer"
                  onClick={() => playSound("click")}
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Resume (PDF)
                </a>
                <a
                  href="/Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--border-dim)] bg-white/[0.03] text-xs text-[var(--text-parchment)] hover:text-[var(--text-washi)] hover:border-[var(--accent-vermillion)]/40 transition-all font-semibold"
                  onClick={() => playSound("click")}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open in Tab
                </a>
                <a
                  href="https://www.linkedin.com/in/varun-pahuja475/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-[var(--text-stone)] hover:text-[var(--text-washi)] font-semibold"
                  onClick={() => playSound("click")}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              </div>
              <button
                onClick={() => {
                  playSound("switch");
                  onClose();
                }}
                className="px-4 py-2 rounded-lg bg-white/[0.05] border border-[var(--border-dim)] text-xs text-[var(--text-stone)] hover:text-[var(--text-washi)] cursor-pointer"
              >
                Close Dossier
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
