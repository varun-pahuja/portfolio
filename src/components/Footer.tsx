"use client";

import EasterEggs from "./EasterEggs";

export default function Footer() {
  return (
    <footer className="relative py-8 px-6 md:px-8 border-t border-[var(--border-subtle)]">
      <div className="mx-auto max-w-[1100px] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-[var(--text-stone)] text-center sm:text-left">
          Designed & Built by{" "}
          <span className="text-[var(--text-parchment)]">Varun Pahuja</span>{" "}
          <span className="text-[var(--accent-vermillion)]">·</span> 2026
        </div>
        <EasterEggs />
      </div>
    </footer>
  );
}