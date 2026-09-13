"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeId = "vermillion" | "indigo" | "gold" | "sakura" | "jade";

export interface ThemeColors {
  name: string;
  accent: string;
  accentGlow: string;
  accentSubtle: string;
  accentRgb: string;
  kanji: string;
}

export const themes: Record<ThemeId, ThemeColors> = {
  vermillion: {
    name: "Vermillion 朱",
    accent: "#dc3545",
    accentGlow: "#ff4757",
    accentSubtle: "rgba(220, 53, 69, 0.1)",
    accentRgb: "220, 53, 69",
    kanji: "朱",
  },
  indigo: {
    name: "Indigo 藍",
    accent: "#4f46e5",
    accentGlow: "#6366f1",
    accentSubtle: "rgba(79, 70, 229, 0.1)",
    accentRgb: "79, 70, 229",
    kanji: "藍",
  },
  gold: {
    name: "Gold 金",
    accent: "#c9a84c",
    accentGlow: "#e0c068",
    accentSubtle: "rgba(201, 168, 76, 0.1)",
    accentRgb: "201, 168, 76",
    kanji: "金",
  },
  sakura: {
    name: "Sakura 桜",
    accent: "#e879a8",
    accentGlow: "#f09dc0",
    accentSubtle: "rgba(232, 121, 168, 0.1)",
    accentRgb: "232, 121, 168",
    kanji: "桜",
  },
  jade: {
    name: "Jade 翠",
    accent: "#2dd4a8",
    accentGlow: "#4ee8c0",
    accentSubtle: "rgba(45, 212, 168, 0.1)",
    accentRgb: "45, 212, 168",
    kanji: "翠",
  },
};

interface ThemeContextType {
  theme: ThemeId;
  colors: ThemeColors;
  setTheme: (t: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "gold",
  colors: themes.gold,
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window === "undefined") return "gold";
    const saved = localStorage.getItem("portfolio-theme") as ThemeId | null;
    return saved && themes[saved] ? saved : "gold";
  });

  useEffect(() => {
    const c = themes[theme];
    const root = document.documentElement;
    root.style.setProperty("--accent", c.accent);
    root.style.setProperty("--accent-glow", c.accentGlow);
    root.style.setProperty("--accent-subtle", c.accentSubtle);
    root.style.setProperty("--accent-rgb", c.accentRgb);
    root.style.setProperty("--accent-vermillion", c.accent);
    root.style.setProperty("--accent-vermillion-glow", c.accentGlow);
    root.style.setProperty("--accent-gold-dim", c.accentSubtle);
    root.style.setProperty("--accent-gold", c.accent);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const setTheme = (t: ThemeId) => setThemeState(t);

  return (
    <ThemeContext.Provider value={{ theme, colors: themes[theme], setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
