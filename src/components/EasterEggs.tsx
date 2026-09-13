"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSound } from "@/lib/audio";

const KONAMI_CODE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

/* ─────────────────────── Yin-Yang Dissolve Overlay ─────────────────────── */
function YinYangDissolve({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    cv.width = width * dpr;
    cv.height = height * dpr;
    cv.style.width = `${width}px`;
    cv.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const cx = width / 2;
    const cy = height / 2;
    const R = Math.min(width, height) * 0.28;
    const t0 = performance.now();
    const DURATION = 2400;

    // Petals: each starts at a yin-yang surface coordinate and drifts outward
    const PETALS = 64;
    const petals = Array.from({ length: PETALS }, (_, i) => {
      const angle = (i / PETALS) * Math.PI * 2;
      const r = R * (0.15 + Math.random() * 0.85);
      return {
        sx: cx + Math.cos(angle) * r,
        sy: cy + Math.sin(angle) * r,
        vx: Math.cos(angle) * (2.2 + Math.random() * 3.2),
        vy: Math.sin(angle) * (2.2 + Math.random() * 3.2) - 0.8,
        size: 3.5 + Math.random() * 4.5,
        color:
          i % 4 === 0
            ? "#c9a84c" // Gold accent
            : i % 2 === 0
              ? "#f5f2eb" // Washi White
              : "#07070d", // Lacquer Ink
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.15,
      };
    });

    let raf: number;
    const draw = () => {
      const now = performance.now();
      const elapsed = now - t0;
      const t = Math.min(elapsed / DURATION, 1);
      ctx.clearRect(0, 0, width, height);

      // Phase 1 (0–0.5): Perfect Taijitu Yin-Yang spins smoothly
      // Phase 2 (0.5–1.0): Dissolves into ink & gold petals and fades out
      if (t < 0.5) {
        const spin = t * Math.PI * 6.5; // Smooth exponential acceleration
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(spin);
        ctx.globalAlpha = Math.min(1, t * 8) * (1 - t * 0.3);

        // 1. Full Base Circle (White/Parchment side)
        ctx.beginPath();
        ctx.arc(0, 0, R, 0, Math.PI * 2);
        ctx.fillStyle = "#f5f2eb";
        ctx.fill();

        // 2. Black/Ink Fish (Mathematically precise S-curve)
        // Outer right semicircle: from top (0, -R) to bottom (0, R)
        ctx.beginPath();
        ctx.arc(0, 0, R, -Math.PI / 2, Math.PI / 2, false);
        // Bottom inner curve: from (0, R) to (0, 0) counter-clockwise (carving out white bottom lobe)
        ctx.arc(0, R / 2, R / 2, Math.PI / 2, -Math.PI / 2, true);
        // Top inner curve: from (0, 0) to (0, -R) clockwise (enclosing black top lobe)
        ctx.arc(0, -R / 2, R / 2, Math.PI / 2, -Math.PI / 2, false);
        ctx.closePath();
        ctx.fillStyle = "#07070d";
        ctx.fill();

        // 3. Eye Dots
        // White dot inside the black top lobe (centered at (0, -R/2))
        ctx.beginPath();
        ctx.arc(0, -R / 2, R * 0.125, 0, Math.PI * 2);
        ctx.fillStyle = "#f5f2eb";
        ctx.fill();

        // Black dot inside the white bottom lobe (centered at (0, R/2))
        ctx.beginPath();
        ctx.arc(0, R / 2, R * 0.125, 0, Math.PI * 2);
        ctx.fillStyle = "#07070d";
        ctx.fill();

        // 4. Subtle Gold Outer Trim
        ctx.beginPath();
        ctx.arc(0, 0, R, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(201, 168, 76, 0.45)";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.restore();
      } else {
        // Phase 2: Petals dissolving & dispersing outward
        const dt = (t - 0.5) * 2; // 0 -> 1
        const fade = 1 - dt;
        ctx.globalAlpha = fade;

        petals.forEach((p) => {
          const px = p.sx + p.vx * dt * 140;
          const py = p.sy + p.vy * dt * 140 + dt * dt * 50; // gravity curve
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(p.rot + p.rotSpeed * dt * 80);
          ctx.fillStyle = p.color;

          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      if (t < 1) {
        raf = requestAnimationFrame(draw);
      } else {
        onDone();
      }
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      key="yinyang-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer"
      onClick={onDone}
    >
      <canvas ref={canvasRef} className="pointer-events-none" />
    </motion.div>
  );
}

/* ─────────────────────── Konami Anime Opening Overlay ─────────────────────── */
function KonamiOpening({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const id = setTimeout(onDone, 3500);
    return () => clearTimeout(id);
  }, [onDone]);

  return (
    <motion.div
      key="konami-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9998] bg-[var(--bg-void)] flex items-center justify-center overflow-hidden"
    >
      {/* Background flash lines */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0, 0.08, 0] }}
        transition={{ duration: 3.5, ease: "easeOut" }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-[2px] bg-[var(--accent-vermillion)]"
            style={{
              top: `${10 + i * 7}%`,
              left: 0,
              right: 0,
              transform: `rotate(${(i - 6) * 2}deg)`,
              opacity: 0.3 + (i % 3) * 0.1,
            }}
          />
        ))}
      </motion.div>

      {/* Massive name reveal */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ scale: 3, opacity: 0, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="text-[clamp(80px,18vw,220px)] font-[family-name:var(--font-geist-sans)] font-black leading-none text-[var(--accent-vermillion)] drop-shadow-[0_0_60px_rgba(var(--accent-rgb),0.5)]"
          initial={{ letterSpacing: "0.5em", opacity: 0 }}
          animate={{ letterSpacing: "0.08em", opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          VARUN
        </motion.div>
        <motion.div
          className="mt-4 text-[clamp(14px,2vw,24px)] tracking-[0.4em] text-[var(--text-washi)] uppercase font-[family-name:var(--font-geist-mono)]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          PAHUJA
        </motion.div>
      </motion.div>

      {/* Flash bang on arrival */}
      <motion.div
        className="absolute inset-0 bg-white pointer-events-none"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />

      {/* Subtitle */}
      <motion.div
        className="absolute bottom-16 text-xs tracking-[0.5em] text-[var(--text-stone)] uppercase font-[family-name:var(--font-geist-mono)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        FULL-STACK × IoT × AI
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────── Main Easter Egg Manager ─────────────────────── */
export default function EasterEggs() {
  const [yyActive, setYyActive] = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);
  const konamiRef = useRef<number[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // no keyboard on touch

    const onKeyDown = (e: KeyboardEvent) => {
      konamiRef.current.push(e.keyCode);
      if (konamiRef.current.length > KONAMI_CODE.length) {
        konamiRef.current.shift();
      }
      const match = KONAMI_CODE.every((k, i) => konamiRef.current[i] === k);
      if (match) {
        konamiRef.current = [];
        playSound("terminal");
        setKonamiActive(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleTriggerYinYang = () => {
    playSound("relay");
    setYyActive(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {yyActive && (
          <YinYangDissolve
            key="yinyang-overlay"
            onDone={() => setYyActive(false)}
          />
        )}
        {konamiActive && (
          <KonamiOpening
            key="konami-overlay"
            onDone={() => setKonamiActive(false)}
          />
        )}
      </AnimatePresence>

      {/* The 道 button in the footer — activates the yin-yang dissolve */}
      <button
        onClick={handleTriggerYinYang}
        className="absolute bottom-4 right-6 md:right-8 z-40 text-[10px] text-[var(--text-stone)] hover:text-[var(--accent-vermillion)] transition-colors font-[family-name:var(--font-geist-mono)] tracking-wider cursor-pointer select-none py-1 px-2 rounded hover:bg-white/[0.04]"
        aria-label="Easter egg: yin-yang dissolve animation"
      >
        道 — the way
      </button>
    </>
  );
}