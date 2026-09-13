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

export default function ClientShell() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        const target = e.target as HTMLElement;
        if (
          target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable)
        ) {
          // While typing in any input (including terminal prompt), do not intercept
          return;
        }
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <ThemeProvider>
      <ThemePicker />
      <InkWashBackground />
      <TerminalDrawer isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />
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