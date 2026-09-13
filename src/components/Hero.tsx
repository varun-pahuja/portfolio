"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-8 overflow-hidden"
    >
      {/* 3D Background Scene */}
      <HeroCanvas />

      {/* Cyberpunk grid floor */}
      <div className="hero-grid" aria-hidden="true" />

      {/* Enso circle — background element */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 400 400"
          className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] opacity-[0.06]"
          aria-hidden="true"
        >
          <circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="var(--text-washi)"
            strokeWidth="2"
            strokeLinecap="round"
            className="enso-circle"
          />
        </svg>
      </div>

      {/* Yin-yang divider — subtle */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-dim)] to-transparent" aria-hidden="true" />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-dim)] bg-[var(--bg-lacquer)]/50 text-xs font-medium tracking-widest uppercase text-[var(--text-stone)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[var(--accent-vermillion)] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent-vermillion)]" />
            </span>
            Full-Stack Developer & IoT Engineer
          </span>
        </motion.div>

        {/* Name — commanding type */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.0]"
        >
          <span className="text-[var(--text-washi)]">Varun</span>
          <br />
          <span className="text-[var(--accent-vermillion)]">Pahuja</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 md:mt-8 text-lg md:text-xl text-[var(--text-parchment)] max-w-2xl mx-auto leading-relaxed"
        >
          I build systems where{" "}
          <span className="text-[var(--text-washi)] font-medium">web</span> meets{" "}
          <span className="text-[var(--accent-gold)] font-medium">hardware</span>
          <span className="text-[var(--accent-vermillion)]">.</span>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-vermillion)] text-white text-sm font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)]"
          >
            <span className="relative z-10">View Projects</span>
            <ArrowDown className="relative z-10 w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-vermillion)] to-[var(--accent-vermillion-glow)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-dim)] text-[var(--text-parchment)] text-sm font-medium rounded-lg hover:border-[var(--text-stone)] hover:text-[var(--text-washi)] transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="scroll-hint flex flex-col items-center gap-2 text-[var(--text-stone)]">
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[var(--text-stone)] to-transparent" />
        </div>
      </motion.div>

      {/* Decorative kanji — subtle background element */}
      <div
        className="absolute bottom-20 right-8 md:right-16 text-[120px] md:text-[180px] font-bold leading-none text-[var(--bg-lacquer)] select-none pointer-events-none"
        aria-hidden="true"
      >
        道
      </div>
    </section>
  );
}
