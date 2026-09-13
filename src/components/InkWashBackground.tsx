"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/themes";

/* Fixed full-page ink-wash background.
   Canvas 2D: ~6 slow-drifting radial-gradient "ink" blobs.
   - Cheap: redraw only when a tab is visible & motion allowed
   - Static single paint on mobile / reduced-motion
   - Tinted by theme accent at very low alpha
*/
export default function InkWashBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { colors } = useTheme();
  const accentRgb = colors.accentRgb;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let raf = 0;
    let running = true;

    // blobs: x,y,r eased as fractions of viewport, plus per-axis speed/phase
    const BLOB_COUNT = 6;
    const blobs = Array.from({ length: BLOB_COUNT }, (_, i) => ({
      nx: 0.12 + 0.17 * i,
      ny: 0.18 + 0.13 * ((i * 7) % 5),
      r: 0.22 + (i % 3) * 0.07,
      sx: 0.016 + (i % 4) * 0.009,
      sy: 0.012 + ((i * 3) % 4) * 0.008,
      px: 2.1 + (i % 3) * 1.7,
      py: 1.7 + ((i * 5) % 3) * 2.3,
    }));

    const paint = (now: number) => {
      const time = now * 0.001;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        // drift: slow sine wander
        const x = (b.nx + Math.sin(time * b.sx + b.px) * 0.03) * w;
        const y = (b.ny + Math.cos(time * b.sy + b.py) * 0.03) * h;
        const r = b.r * Math.min(w, h) * (1 + Math.sin(time * 0.05 + i * 1.3) * 0.08);

        // ink gradient: lighter mist core → faint halo → transparent
        // (visible against the dark bg; soft "washi mist" rather than dark-on-dark)
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        if (i % 3 === 2) {
          grad.addColorStop(0, `rgba(${accentRgb}, 0.10)`);
          grad.addColorStop(0.5, `rgba(${accentRgb}, 0.05)`);
          grad.addColorStop(1, "rgba(0,0,0,0)");
        } else {
          grad.addColorStop(0, "rgba(226,226,238,0.07)");
          grad.addColorStop(0.5, "rgba(226,226,238,0.03)");
          grad.addColorStop(1, "rgba(0,0,0,0)");
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (now: number) => {
      if (!running) return;
      paint(now);
      raf = requestAnimationFrame(frame);
    };

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const onVisibility = () => {
      const visible = document.visibilityState === "visible";
      if (visible && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!visible && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    if (coarse || reduced) {
      // static single paint, no animation loop
      paint(window.performance.now());
    } else {
      raf = requestAnimationFrame(frame);
    }

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onVisibility);
    };
  }, [colors.accent, accentRgb]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}