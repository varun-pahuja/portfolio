"use client";

import { useEffect, useState } from "react";
import { playSound } from "@/lib/audio";

interface Sector {
  id: string;
  code: string;
  label: string;
}

const SECTORS: Sector[] = [
  { id: "home", code: "00", label: "HOME" },
  { id: "about", code: "01", label: "BIO" },
  { id: "projects", code: "02", label: "CAD" },
  { id: "bento", code: "03", label: "BENTO" },
  { id: "experience", code: "04", label: "LOGS" },
  { id: "contact", code: "05", label: "COMMS" },
];

export default function CockpitRail() {
  const [activeSector, setActiveSector] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = docHeight > 0 ? Math.round((window.scrollY / docHeight) * 100) : 0;
          setScrollProgress(Math.min(100, Math.max(0, currentProgress)));

          // Determine active sector
          for (let i = SECTORS.length - 1; i >= 0; i--) {
            const sector = SECTORS[i];
            const el = document.getElementById(sector.id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= window.innerHeight * 0.4) {
                setActiveSector(sector.id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWarp = (id: string) => {
    playSound("switch");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Flight Telemetry HUD"
      className="hidden 2xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end pointer-events-auto select-none font-[family-name:var(--font-geist-mono)]"
    >
      {/* Flight Tape Container */}
      <div className="bg-[rgba(6,6,10,0.88)] backdrop-blur-md border border-[var(--border-dim)] rounded-xl p-3 py-4 shadow-2xl flex flex-col items-end gap-3 text-xs">
        {/* Top Altitude / Scroll Percentage Readout */}
        <div className="flex flex-col items-end border-b border-[var(--border-subtle)] pb-2.5 w-full">
          <span className="text-[9px] uppercase tracking-widest text-[var(--text-stone)] font-bold">
            FLIGHT ALT
          </span>
          <span className="text-[11px] font-bold text-[var(--accent-vermillion)] tabular-nums">
            {String(scrollProgress).padStart(2, "0")}%
          </span>
        </div>

        {/* Vertical Sector Navigation Ribbon */}
        <nav className="flex flex-col items-end gap-1.5 py-1 w-full" aria-label="Sector Jumper">
          {SECTORS.map((sector) => {
            const isActive = activeSector === sector.id;
            return (
              <button
                key={sector.id}
                onClick={() => handleWarp(sector.id)}
                className={`group flex items-center justify-end gap-2.5 w-full py-1 text-right transition-all cursor-pointer ${
                  isActive
                    ? "text-[var(--text-washi)] font-bold"
                    : "text-[var(--text-stone)] hover:text-[var(--text-parchment)]"
                }`}
                title={`Warp to Sector ${sector.code} (${sector.label})`}
              >
                {/* Sector Label revealed on hover or active */}
                <span
                  className={`text-[10px] tracking-wider transition-all ${
                    isActive
                      ? "opacity-100 text-[var(--accent-vermillion)]"
                      : "opacity-40 group-hover:opacity-100"
                  }`}
                >
                  {sector.label}
                </span>

                {/* Sector Code */}
                <span className="text-[10px] font-mono opacity-80">{sector.code}</span>

                {/* Tactical Indicator Tick */}
                <div
                  className={`w-1.5 rounded-none transition-all duration-300 ${
                    isActive
                      ? "h-4 bg-[var(--accent-vermillion)] shadow-[0_0_8px_var(--accent-vermillion)]"
                      : "h-2 bg-[var(--border-dim)] group-hover:bg-[var(--text-stone)] group-hover:h-3"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Bottom Hardware Stamp */}
        <div className="pt-2 border-t border-[var(--border-subtle)] flex flex-col items-end text-[9px] text-[var(--text-stone)] w-full">
          <span className="opacity-50">REV 2.6</span>
          <span className="text-emerald-400/80 font-bold tracking-tighter">NAV: OK</span>
        </div>
      </div>
    </aside>
  );
}
