"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/themes";

/* Fixed full-page ink-wash background.
   Performance-optimized Canvas 2D:
   - Downscaled 3x internal raster with CSS blur: 90% reduction in pixel fill cost
   - Throttled to ~25fps: ambient drift is gentle, no need for 60fps CPU wakeups
   - Pauses during fast scrolling: guarantees 60fps scrolling without compositor contention
   - Static single paint on mobile (coarse pointer) & reduced-motion
*/
export default function InkWashBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { colors } = useTheme();
  const accentRgb = colors.accentRgb;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    // Render at 1/3 resolution with CSS scaling and blur for diffuse mist
    const SCALE = 0.33;
    let w = (canvas.width = Math.max(1, Math.floor(window.innerWidth * SCALE)));
    let h = (canvas.height = Math.max(1, Math.floor(window.innerHeight * SCALE)));
    let raf = 0;
    let running = true;
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout | null = null;
    let lastPaint = 0;
    const FRAME_INTERVAL = 1000 / 25; // 25 fps is optimal for slow-drifting mist

    const BLOB_COUNT = 5;
    const blobs = Array.from({ length: BLOB_COUNT }, (_, i) => ({
      nx: 0.15 + 0.18 * i,
      ny: 0.2 + 0.14 * ((i * 7) % 5),
      r: 0.25 + (i % 3) * 0.08,
      sx: 0.015 + (i % 4) * 0.008,
      sy: 0.011 + ((i * 3) % 4) * 0.007,
      px: 2.1 + (i % 3) * 1.7,
      py: 1.7 + ((i * 5) % 3) * 2.3,
    }));

    const paint = (now: number) => {
      const time = now * 0.001;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        const x = (b.nx + Math.sin(time * b.sx + b.px) * 0.03) * w;
        const y = (b.ny + Math.cos(time * b.sy + b.py) * 0.03) * h;
        const r = b.r * Math.min(w, h) * (1 + Math.sin(time * 0.05 + i * 1.3) * 0.08);

        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        if (i % 3 === 2) {
          grad.addColorStop(0, `rgba(${accentRgb}, 0.12)`);
          grad.addColorStop(0.5, `rgba(${accentRgb}, 0.05)`);
          grad.addColorStop(1, "rgba(0,0,0,0)");
        } else {
          grad.addColorStop(0, "rgba(226,226,238,0.06)");
          grad.addColorStop(0.5, "rgba(226,226,238,0.02)");
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

      // Skip painting while actively scrolling or if interval hasn't elapsed
      if (!isScrolling && now - lastPaint >= FRAME_INTERVAL) {
        lastPaint = now;
        paint(now);
      }
      raf = requestAnimationFrame(frame);
    };

    const onResize = () => {
      w = canvas.width = Math.max(1, Math.floor(window.innerWidth * SCALE));
      h = canvas.height = Math.max(1, Math.floor(window.innerHeight * SCALE));
      paint(performance.now());
    };

    const onScroll = () => {
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100);
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
      // Single paint on low power / touch devices
      paint(window.performance.now());
    } else {
      raf = requestAnimationFrame(frame);
      window.addEventListener("resize", onResize, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [accentRgb]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ willChange: "transform" }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover blur-3xl opacity-75 transform-gpu"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}