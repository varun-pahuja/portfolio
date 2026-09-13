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

  const springCfg = { damping: 20, stiffness: 400, mass: 0.4 };
  const mainX = useSpring(cursorX, springCfg);
  const mainY = useSpring(cursorY, springCfg);

  const t1X = useSpring(cursorX, { damping: 28, stiffness: 280, mass: 0.6 });
  const t1Y = useSpring(cursorY, { damping: 28, stiffness: 280, mass: 0.6 });
  const t2X = useSpring(cursorX, { damping: 32, stiffness: 220, mass: 0.8 });
  const t2Y = useSpring(cursorY, { damping: 32, stiffness: 220, mass: 0.8 });
  const t3X = useSpring(cursorX, { damping: 38, stiffness: 160, mass: 1.0 });
  const t3Y = useSpring(cursorY, { damping: 38, stiffness: 160, mass: 1.0 });
  const t4X = useSpring(cursorX, { damping: 42, stiffness: 120, mass: 1.3 });
  const t4Y = useSpring(cursorY, { damping: 42, stiffness: 120, mass: 1.3 });

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

    const onEnter = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onFocus = () => setVisible(true);
    const onBlur = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, [cursorX, cursorY, isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const links = document.querySelectorAll("a, button, [role='button'], input, label");
    const cards = document.querySelectorAll("article, [data-card]");

    const linkEnter = () => {
      setMode("link");
      const now = performance.now();
      if (now - lastSoundTime.current > 350) {
        playSound("slash");
        lastSoundTime.current = now;
      }
    };
    const linkLeave = () => setMode("idle");
    const cardEnter = () => setMode("card");
    const cardLeave = () => setMode("idle");

    links.forEach((el) => {
      el.addEventListener("mouseenter", linkEnter);
      el.addEventListener("mouseleave", linkLeave);
    });
    cards.forEach((el) => {
      el.addEventListener("mouseenter", cardEnter);
      el.addEventListener("mouseleave", cardLeave);
    });

    return () => {
      links.forEach((el) => {
        el.removeEventListener("mouseenter", linkEnter);
        el.removeEventListener("mouseleave", linkLeave);
      });
      cards.forEach((el) => {
        el.removeEventListener("mouseenter", cardEnter);
        el.removeEventListener("mouseleave", cardLeave);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      className="fixed inset-0 z-[999999] pointer-events-none"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Trail ghosts */}
      {[t4X, t3X, t2X, t1X].map((tx, i) => {
        const ty = [t4Y, t3Y, t2Y, t1Y][i];
        const sizes = [3, 4, 5, 6];
        const opacities = [0.08, 0.12, 0.18, 0.28];
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              x: tx,
              y: ty,
              translateX: "-50%",
              translateY: "-50%",
              width: sizes[i],
              height: sizes[i],
              background: colors.accent,
              opacity: opacities[i],
              filter: `blur(${i === 0 ? 2 : 1}px)`,
            }}
          />
        );
      })}

      {/* IDLE — Shuriken */}
      {mode === "idle" && (
        <motion.div
          className="absolute"
          style={{ x: mainX, y: mainY, translateX: "-50%", translateY: "-50%" }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 1L15 12L12 23L9 12Z" fill={colors.accent} opacity="0.9" />
              <path d="M1 12L12 9L23 12L12 15Z" fill={colors.accent} opacity="0.7" />
              <circle cx="12" cy="12" r="2" fill="white" opacity="0.8" />
            </svg>
          </motion.div>
          <div
            className="absolute inset-0 -m-3 rounded-full"
            style={{
              background: `radial-gradient(circle, ${colors.accentGlow}40 0%, transparent 70%)`,
              filter: "blur(4px)",
            }}
          />
        </motion.div>
      )}

      {/* LINK — Katana slash */}
      {mode === "link" && (
        <motion.div
          className="absolute"
          style={{ x: mainX, y: mainY, translateX: "-50%", translateY: "-50%" }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <path d="M28 4 A24 24 0 0 1 52 28" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
              <path d="M52 28 A24 24 0 0 1 28 52" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
              <path d="M28 52 A24 24 0 0 1 4 28" stroke={colors.accent} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
              <line x1="8" y1="48" x2="48" y2="8" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
              <line x1="12" y1="44" x2="44" y2="12" stroke={colors.accent} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
              <text x="28" y="32" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="serif" opacity="0.9">斬</text>
            </svg>
          </motion.div>
          <div
            className="absolute -inset-6 rounded-full"
            style={{
              background: `radial-gradient(circle, ${colors.accent}50 0%, transparent 60%)`,
              filter: "blur(8px)",
            }}
          />
        </motion.div>
      )}

      {/* CARD — Energy burst */}
      {mode === "card" && (
        <motion.div
          className="absolute"
          style={{ x: mainX, y: mainY, translateX: "-50%", translateY: "-50%" }}
        >
          <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <motion.line
                  key={angle}
                  x1="24" y1="24"
                  x2={24 + Math.cos((angle * Math.PI) / 180) * 20}
                  y2={24 + Math.sin((angle * Math.PI) / 180) * 20}
                  stroke={colors.accent}
                  strokeWidth={i % 2 === 0 ? 1.5 : 0.8}
                  strokeLinecap="round"
                  opacity={i % 2 === 0 ? 0.7 : 0.35}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                />
              ))}
              <circle cx="24" cy="24" r="8" fill={colors.accent} opacity="0.15" />
              <circle cx="24" cy="24" r="8" stroke={colors.accent} strokeWidth="1.5" opacity="0.8" />
              <circle cx="24" cy="24" r="3" fill="white" opacity="0.9" />
              <motion.circle
                cx="24" cy="4" r="2" fill={colors.accent} opacity="0.6"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "24px 24px" }}
              />
            </svg>
          </motion.div>
          <div
            className="absolute -inset-8 rounded-full"
            style={{
              background: `radial-gradient(circle, ${colors.accent}55 0%, ${colors.accent}15 40%, transparent 70%)`,
              filter: "blur(10px)",
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
