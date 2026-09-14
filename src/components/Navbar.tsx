"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Terminal as TerminalIcon, FileText, Zap } from "lucide-react";
import { playSound, setSoundEnabled, getInitialSoundState } from "@/lib/audio";
import ResumeModal from "./ResumeModal";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({
  onOpenTerminal,
  onOpenExecutive,
}: {
  onOpenTerminal?: () => void;
  onOpenExecutive?: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(() => getInitialSoundState());
  const [resumeOpen, setResumeOpen] = useState(false);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) {
      playSound("switch");
    }
  };

  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;
    let lastSection = "";

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isPast50 = window.scrollY > 50;
          if (isPast50 !== lastScrolled) {
            lastScrolled = isPast50;
            setScrolled(isPast50);
          }

          const sections = ["about", "projects", "experience", "contact"];
          let foundSection = "";
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el && el.getBoundingClientRect().top <= 200) {
              foundSection = sections[i];
              break;
            }
          }
          if (foundSection !== lastSection) {
            lastSection = foundSection;
            setActiveSection(foundSection);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--bg-void)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[1100px] flex items-center justify-between px-6 md:px-8 h-16 md:h-20">
        {/* Logo / Name */}
        <a
          href="#"
          onClick={() => playSound("click")}
          className="font-sans text-lg md:text-xl font-bold tracking-tight text-[var(--text-washi)] hover:text-[var(--accent-vermillion)] transition-colors duration-300 active:scale-95"
        >
          V<span className="text-[var(--accent-vermillion)]">.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => playSound("click")}
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                activeSection === link.href.slice(1)
                  ? "text-[var(--text-washi)]"
                  : "text-[var(--text-stone)] hover:text-[var(--text-parchment)]"
              }`}
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-4 right-4 h-[2px] bg-[var(--accent-vermillion)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Quick controls: Sound + Terminal + Status badge */}
        <div className="flex items-center gap-2">
          {/* SFX toggle */}
          <button
            onClick={toggleSound}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[var(--border-dim)] bg-[var(--bg-lacquer)]/50 text-xs text-[var(--text-stone)] hover:text-[var(--text-washi)] hover:border-[var(--accent-vermillion)]/40 transition-all active:scale-95"
            title={soundOn ? "Sound Effects ON (Click to Mute)" : "Sound Effects OFF (Click to Unmute)"}
            aria-label="Toggle Sound Effects"
          >
            {soundOn ? (
              <Volume2 className="w-3.5 h-3.5 text-[var(--accent-vermillion)]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline font-mono text-[10px] tracking-wider">
              {soundOn ? "SFX" : "SFX"}
            </span>
          </button>

          {/* Terminal CLI drawer trigger */}
          <button
            onClick={() => {
              playSound("beep");
              onOpenTerminal?.();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[var(--border-dim)] bg-[var(--bg-lacquer)]/50 text-xs text-[var(--text-stone)] hover:text-[var(--accent-vermillion)] hover:border-[var(--accent-vermillion)]/40 transition-all active:scale-95"
            title="Open Hacker Terminal (press `)"
            aria-label="Open Terminal Drawer"
          >
            <TerminalIcon className="w-3.5 h-3.5 text-[var(--accent-vermillion)]" />
            <span className="hidden sm:inline font-mono text-[10px] tracking-wider">CLI</span>
          </button>

          {/* Resume CV trigger */}
          <button
            onClick={() => {
              playSound("switch");
              setResumeOpen(true);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[var(--border-dim)] bg-[var(--bg-lacquer)]/50 text-xs text-[var(--text-stone)] hover:text-[var(--accent-vermillion)] hover:border-[var(--accent-vermillion)]/40 transition-all active:scale-95 cursor-pointer"
            title="View Verified Resume / CV"
            aria-label="Open Resume Dossier"
          >
            <FileText className="w-3.5 h-3.5 text-[var(--accent-vermillion)]" />
            <span className="hidden sm:inline font-mono text-[10px] tracking-wider">CV</span>
          </button>

          {/* Recruiter Fast-Track Trigger */}
          <button
            onClick={() => {
              playSound("switch");
              onOpenExecutive?.();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--accent-gold)]/50 bg-[var(--accent-gold)]/10 text-xs text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/20 hover:border-[var(--accent-gold)] transition-all active:scale-95 cursor-pointer font-mono shadow-sm"
            title="Recruiter Fast-Track Mode (Press 'E')"
            aria-label="Open Recruiter Fast-Track"
          >
            <Zap className="w-3.5 h-3.5 fill-[var(--accent-gold)] text-[var(--accent-gold)] animate-pulse" />
            <span className="font-bold tracking-wider">EXEC</span>
            <span className="hidden xl:inline text-[9px] px-1 rounded bg-[var(--accent-gold)]/20 text-[var(--accent-gold)]">
              E
            </span>
          </button>

          {/* Status badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-dim)] bg-[var(--bg-lacquer)]/50">
            <span className="relative flex h-2 w-2">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[var(--accent-vermillion)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-vermillion)]" />
            </span>
            <span className="text-xs font-medium text-[var(--text-parchment)]">
              Open to work
            </span>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col justify-center items-end gap-1.5 p-2"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span
            className={`block w-5 h-[1.5px] bg-[var(--text-washi)] transition-transform duration-300 ${
              mobileOpen ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-[var(--text-washi)] transition-opacity duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] bg-[var(--accent-vermillion)] transition-all duration-300 ${
              mobileOpen ? "w-5 -translate-y-[6px] -rotate-45" : "w-3"
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-[var(--bg-ink)]/95 backdrop-blur-xl border-t border-[var(--border-subtle)]"
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="py-3 text-lg font-medium text-[var(--text-parchment)] hover:text-[var(--accent-vermillion)] transition-colors border-b border-[var(--border-subtle)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <button
                onClick={() => {
                  playSound("switch");
                  setMobileOpen(false);
                  setResumeOpen(true);
                }}
                className="py-3 text-lg font-medium text-[var(--accent-vermillion)] text-left flex items-center gap-2 border-b border-[var(--border-subtle)]"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume / CV</span>
              </button>
              <button
                onClick={() => {
                  playSound("switch");
                  setMobileOpen(false);
                  onOpenExecutive?.();
                }}
                className="py-3 text-lg font-medium text-[var(--accent-gold)] text-left flex items-center gap-2 border-b border-[var(--border-subtle)] font-mono"
              >
                <Zap className="w-4 h-4" />
                <span>Executive Dossier (Fast-Track)</span>
              </button>
              <div className="flex items-center gap-2 mt-4">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[var(--accent-vermillion)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-vermillion)]" />
                </span>
                <span className="text-sm text-[var(--text-parchment)]">
                  Open to work
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </motion.header>
  );
}
