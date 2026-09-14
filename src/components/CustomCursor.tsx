"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "@/lib/themes";
import { playSound } from "@/lib/audio";

export default function CustomCursor() {
  const { colors } = useTheme();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const lastSoundTime = useRef(0);
  const isVisibleRef = useRef(false);

  // 1:1 Instant Zero-Latency Primary Pointer (direct hardware mouse tracking)
  const mainX = cursorX;
  const mainY = cursorY;

  // Snappy ultra-lightweight micro-trail (ultra-low mass 0.06, instant recovery)
  const trailX = useSpring(cursorX, { damping: 32, stiffness: 600, mass: 0.06 });
  const trailY = useSpring(cursorY, { damping: 32, stiffness: 600, mass: 0.06 });

  const [mode, setMode] = useState<"idle" | "link" | "card">("idle");
  const [visible, setVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const fn = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setVisible(true);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onLeave = () => {
      isVisibleRef.current = false;
      setVisible(false);
    };
    const onFocus = () => {
      isVisibleRef.current = true;
      setVisible(true);
    };
    const onBlur = () => {
      isVisibleRef.current = false;
      setVisible(false);
    };

    // Event Delegation: single high-performance listener instead of attaching to all DOM nodes
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, label, select, textarea");
      if (interactive) {
        setMode("link");
        const now = performance.now();
        if (now - lastSoundTime.current > 350) {
          playSound("slash");
          lastSoundTime.current = now;
        }
        return;
      }

      const card = target.closest("article, [data-card]");
      if (card) {
        setMode("card");
        return;
      }

      setMode("idle");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, [cursorX, cursorY, isMobile]);

  if (isMobile) return null;

  return (
    <div
      className="fixed inset-0 z-[999999] pointer-events-none transform-gpu"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* High-speed Snappy Trail Ghost */}
      <motion.div
        className="absolute rounded-full pointer-events-none transform-gpu"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          background: colors.accent,
          opacity: 0.28,
          boxShadow: `0 0 8px ${colors.accentGlow}70`,
        }}
      />

      {/* IDLE — Shuriken with Precision Center Pinpoint */}
      {mode === "idle" && (
        <motion.div
          className="absolute pointer-events-none transform-gpu"
          style={{ x: mainX, y: mainY, translateX: "-50%", translateY: "-50%" }}
          animate={{ scale: isClicking ? 0.8 : 1 }}
          transition={{ duration: 0.1 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 1L15 12L12 23L9 12Z" fill={colors.accent} opacity="0.9" />
              <path d="M1 12L12 9L23 12L12 15Z" fill={colors.accent} opacity="0.7" />
              <circle cx="12" cy="12" r="2.5" fill="white" opacity="0.9" />
            </svg>
          </motion.div>
          {/* Exact Pixel Center Pinpoint */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_3px_#fff]"
          />
          <div
            className="absolute inset-0 -m-2 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${colors.accentGlow}35 0%, transparent 70%)`,
            }}
          />
        </motion.div>
      )}

      {/* LINK — Katana slash with click feedback and center pinpoint */}
      {mode === "link" && (
        <motion.div
          className="absolute pointer-events-none transform-gpu"
          style={{ x: mainX, y: mainY, translateX: "-50%", translateY: "-50%" }}
          animate={{ scale: isClicking ? 0.82 : 1 }}
          transition={{ duration: 0.1 }}
        >
          <motion.div
            initial={{ scale: 0.7, rotate: -60, opacity: 0 }}
            animate={{ scale: 1.05, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
              <line
                x1="4"
                y1="28"
                x2="28"
                y2="4"
                stroke={colors.accent}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="6"
                y1="26"
                x2="26"
                y2="6"
                stroke="white"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.95"
              />
              <circle cx="28" cy="4" r="2.5" fill={colors.accent} />
              <circle cx="16" cy="16" r="1.5" fill="white" />
              <circle cx="4" cy="28" r="2.5" fill="#ffffff" opacity="0.5" />
            </svg>
          </motion.div>
          {/* Exact Pixel Center Pinpoint */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_3px_#fff]"
          />
        </motion.div>
      )}

      {/* CARD — Target reticle with click feedback */}
      {mode === "card" && (
        <motion.div
          className="absolute pointer-events-none transform-gpu"
          style={{ x: mainX, y: mainY, translateX: "-50%", translateY: "-50%" }}
          animate={{ scale: isClicking ? 0.85 : 1 }}
          transition={{ duration: 0.1 }}
        >
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
              <path
                d="M4 12V4H12"
                stroke={colors.accent}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M24 4H32V12"
                stroke={colors.accent}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M32 24V32H24"
                stroke={colors.accent}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 32H4V24"
                stroke={colors.accent}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="18" cy="18" r="2" fill="white" />
            </svg>
          </motion.div>
          {/* Exact Pixel Center Pinpoint */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_3px_#fff]"
          />
        </motion.div>
      )}
    </div>
  );
}
