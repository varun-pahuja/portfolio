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

  // Snappy primary cursor spring
  const springCfg = { damping: 24, stiffness: 450, mass: 0.35 };
  const mainX = useSpring(cursorX, springCfg);
  const mainY = useSpring(cursorY, springCfg);

  // 2 Lightweight trail springs (reduced from 8 springs to 4 for 50% lower physics solver CPU load)
  const t1X = useSpring(cursorX, { damping: 30, stiffness: 280, mass: 0.5 });
  const t1Y = useSpring(cursorY, { damping: 30, stiffness: 280, mass: 0.5 });
  const t2X = useSpring(cursorX, { damping: 36, stiffness: 180, mass: 0.7 });
  const t2Y = useSpring(cursorY, { damping: 36, stiffness: 180, mass: 0.7 });

  const [mode, setMode] = useState<"idle" | "link" | "card">("idle");
  const [visible, setVisible] = useState(false);
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
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onFocus = () => setVisible(true);
    const onBlur = () => setVisible(false);

    // Event Delegation: single high-performance listener instead of attaching to all DOM nodes
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, label, select, textarea");
      if (interactive) {
        setMode("link");
        const now = performance.now();
        if (now - lastSoundTime.current > 400) {
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
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("mousemove", onMove);
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
      {/* 2 Lightweight Trail Ghosts with GPU composite shadows */}
      {[
        { x: t2X, y: t2Y, size: 4, opacity: 0.12 },
        { x: t1X, y: t1Y, size: 6, opacity: 0.25 },
      ].map((trail, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none transform-gpu"
          style={{
            x: trail.x,
            y: trail.y,
            translateX: "-50%",
            translateY: "-50%",
            width: trail.size,
            height: trail.size,
            background: colors.accent,
            opacity: trail.opacity,
            boxShadow: `0 0 6px ${colors.accentGlow}60`,
          }}
        />
      ))}

      {/* IDLE — Shuriken */}
      {mode === "idle" && (
        <motion.div
          className="absolute pointer-events-none transform-gpu"
          style={{ x: mainX, y: mainY, translateX: "-50%", translateY: "-50%" }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 1L15 12L12 23L9 12Z" fill={colors.accent} opacity="0.9" />
              <path d="M1 12L12 9L23 12L12 15Z" fill={colors.accent} opacity="0.7" />
              <circle cx="12" cy="12" r="2" fill="white" opacity="0.85" />
            </svg>
          </motion.div>
          <div
            className="absolute inset-0 -m-2 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${colors.accentGlow}35 0%, transparent 70%)`,
            }}
          />
        </motion.div>
      )}

      {/* LINK — Katana slash */}
      {mode === "link" && (
        <motion.div
          className="absolute pointer-events-none transform-gpu"
          style={{ x: mainX, y: mainY, translateX: "-50%", translateY: "-50%" }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
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
                opacity="0.9"
              />
              <circle cx="28" cy="4" r="2" fill={colors.accent} />
              <circle cx="4" cy="28" r="3" fill="#ffffff" opacity="0.4" />
            </svg>
          </motion.div>
        </motion.div>
      )}

      {/* CARD — Target reticle */}
      {mode === "card" && (
        <motion.div
          className="absolute pointer-events-none transform-gpu"
          style={{ x: mainX, y: mainY, translateX: "-50%", translateY: "-50%" }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
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
              <circle cx="18" cy="18" r="2" fill={colors.accent} />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
