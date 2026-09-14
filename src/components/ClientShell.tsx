"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@/lib/themes";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedProject from "@/components/FeaturedProject";
import ProjectsGrid from "@/components/ProjectsGrid";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const ThemePicker = dynamic(() => import("@/components/ThemePicker"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const InkWashBackground = dynamic(() => import("@/components/InkWashBackground"), { ssr: false });
const TerminalDrawer = dynamic(() => import("@/components/TerminalDrawer"), { ssr: false });
const CockpitRail = dynamic(() => import("@/components/CockpitRail"), { ssr: false });
const ExecutiveDossier = dynamic(() => import("@/components/ExecutiveDossier"), { ssr: false });

export default function ClientShell() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [executiveOpen, setExecutiveOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (e.key === "`" || e.key === "~") {
        if (isTyping) return;
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      } else if (e.key === "e" || e.key === "E") {
        if (isTyping || terminalOpen) return;
        e.preventDefault();
        setExecutiveOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Easter Egg DevTools Console Diagnostics Greeting
    console.log(
      "%c⛩️ VARUN PAHUJA // SYSTEM PROTOCOL\n" +
      "%cLooking under the hood? Here are the hidden Easter eggs:\n" +
      "  • Keyboard: ↑ ↑ ↓ ↓ ← → ← → B A  (Konami Code)\n" +
      "  • Footer: Click '道 — the way' for Yin-Yang particle dissolve\n" +
      "  • Terminal: Press ` (backtick) or type 'secrets'",
      "color: #dc3545; font-size: 13px; font-weight: bold; font-family: monospace;",
      "color: #a1a1aa; font-size: 11px; font-family: monospace;"
    );

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <ThemeProvider>
      <ThemePicker />
      <InkWashBackground />
      <TerminalDrawer
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenExecutive={() => setExecutiveOpen(true)}
      />
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenExecutive={() => setExecutiveOpen(true)}
      />
      <ExecutiveDossier
        isOpen={executiveOpen}
        onClose={() => setExecutiveOpen(false)}
      />
      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <FeaturedProject />
        <ProjectsGrid />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <CockpitRail />
      <CustomCursor />
    </ThemeProvider>
  );
}