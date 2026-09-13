"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useTheme, ThemeId, themes } from "@/lib/themes";

const themeOrder: ThemeId[] = ["gold", "vermillion", "indigo", "sakura", "jade"];

export default function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="relative w-12 h-12 rounded-full border border-[var(--border-dim)] bg-[var(--bg-lacquer)] flex items-center justify-center overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Change color theme"
      >
        {/* Current accent color circle */}
        <div
          className="w-5 h-5 rounded-full"
          style={{ background: themes[theme].accent }}
        />
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, ${themes[theme].accentGlow}40, transparent 70%)`,
          }}
        />
      </motion.button>

      {/* Theme options */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 right-0 bg-[var(--bg-lacquer)] border border-[var(--border-dim)] rounded-xl p-2 min-w-[180px] shadow-2xl"
          >
            <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-stone)] px-3 py-1.5 mb-1">
              Theme
            </div>
            {themeOrder.map((id) => {
              const t = themes[id];
              const active = theme === id;
              return (
                <button
                  key={id}
                  onClick={() => {
                    setTheme(id);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-white/5"
                      : "hover:bg-white/[0.03]"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                      active ? "scale-110" : "scale-100"
                    }`}
                    style={{
                      background: t.accent,
                      borderColor: active ? t.accentGlow : "transparent",
                      boxShadow: active
                        ? `0 0 10px ${t.accentGlow}50`
                        : "none",
                    }}
                  />
                  <span
                    className={`text-sm font-medium ${
                      active ? "text-[var(--text-washi)]" : "text-[var(--text-stone)]"
                    }`}
                  >
                    {t.name}
                  </span>
                  {active && (
                    <span className="ml-auto text-[var(--text-stone)]">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
