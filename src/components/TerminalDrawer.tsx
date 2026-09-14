"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Minimize2, Cpu, Wifi } from "lucide-react";
import { useTheme, ThemeId, themes } from "@/lib/themes";
import { playSound } from "@/lib/audio";

type HistoryItem = {
  id: string;
  command: string;
  output: string | React.ReactNode;
};

export default function TerminalDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { theme, setTheme } = useTheme();
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "init-1",
      command: "sysinfo",
      output: (
        <div className="space-y-1 text-xs text-[var(--text-stone)]">
          <p className="text-[var(--text-parchment)] font-bold">
            VARUN-OS v2.6.0 [ESP32-S3 // IoT & Full-Stack Core]
          </p>
          <p>Hardware Architecture: Xtensa Dual-Core 240MHz | FreeRTOS</p>
          <p>
            Type <span className="text-[var(--accent)] font-semibold">help</span> to view available commands.
          </p>
        </div>
      ),
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isMinimized, setIsMinimized] = useState(false);
  const [prevOpen, setPrevOpen] = useState(isOpen);
  if (isOpen !== prevOpen) {
    setPrevOpen(isOpen);
    if (isOpen) {
      setIsMinimized(false);
    }
  }

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      playSound("beep");
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleCommand = useCallback(
    (cmdRaw: string) => {
      const trimmed = cmdRaw.trim();
      if (!trimmed) return;

      playSound("terminal");
      const [cmd, ...args] = trimmed.split(" ");
      const lowerCmd = cmd.toLowerCase();

      let output: React.ReactNode = "";

      switch (lowerCmd) {
        case "help":
          output = (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs py-1">
              <div>
                <span className="text-[var(--accent)] font-mono font-bold">whoami</span>
                <span className="text-[var(--text-stone)]"> - Bio & engineering background</span>
              </div>
              <div>
                <span className="text-[var(--accent)] font-mono font-bold">skills</span>
                <span className="text-[var(--text-stone)]"> - IoT & Full-Stack tech stack</span>
              </div>
              <div>
                <span className="text-[var(--accent)] font-mono font-bold">iot</span>
                <span className="text-[var(--text-stone)]"> - Live virtual ESP32 sensor telemetry</span>
              </div>
              <div>
                <span className="text-[var(--accent)] font-mono font-bold">projects</span>
                <span className="text-[var(--text-stone)]"> - Key engineering builds</span>
              </div>
              <div>
                <span className="text-[var(--accent)] font-mono font-bold">secrets</span>
                <span className="text-[var(--text-stone)]"> - Hidden portfolio Easter eggs</span>
              </div>
              <div>
                <span className="text-[var(--accent)] font-mono font-bold">theme &lt;id&gt;</span>
                <span className="text-[var(--text-stone)]"> - Switch palette (vermillion, indigo, gold, sakura, jade)</span>
              </div>
              <div>
                <span className="text-[var(--accent)] font-mono font-bold">contact</span>
                <span className="text-[var(--text-stone)]"> - Email & social channels</span>
              </div>
              <div>
                <span className="text-[var(--accent)] font-mono font-bold">clear</span>
                <span className="text-[var(--text-stone)]"> - Wipe terminal buffer</span>
              </div>
              <div>
                <span className="text-[var(--accent)] font-mono font-bold">exit</span>
                <span className="text-[var(--text-stone)]"> - Close this terminal drawer</span>
              </div>
            </div>
          );
          break;

        case "whoami":
          output = (
            <div className="text-xs space-y-1 text-[var(--text-parchment)]">
              <p className="font-bold text-[var(--accent)]">Varun Pahuja — Full Stack × IoT × AI</p>
              <p>• 3rd-year B.Tech in Internet of Things at MITS Gwalior (CGPA: 8.06)</p>
              <p>• Full Stack Developer Intern at Infotact Solutions (System design, APIs, UI)</p>
              <p>• Obsessed with hardware circuits, embedded microcontrollers, and fluid digital interfaces.</p>
            </div>
          );
          break;

        case "skills":
          output = (
            <div className="text-xs space-y-2 py-1">
              <div>
                <span className="text-[var(--accent)] font-bold">[EMBEDDED & IoT]:</span>{" "}
                <span className="text-[var(--text-stone)]">
                  ESP32, Arduino, Raspberry Pi, FreeRTOS, MQTT, C/C++, I2C, SPI, Sensor Interfacing
                </span>
              </div>
              <div>
                <span className="text-[var(--accent)] font-bold">[FULL STACK & WEB]:</span>{" "}
                <span className="text-[var(--text-stone)]">
                  Next.js 16, React 19, TypeScript, Node.js, Express, Tailwind CSS, REST APIs
                </span>
              </div>
              <div>
                <span className="text-[var(--accent)] font-bold">[CREATIVE & 3D]:</span>{" "}
                <span className="text-[var(--text-stone)]">
                  Three.js / React Three Fiber, WebGL, Framer Motion, Web Audio API
                </span>
              </div>
              <div>
                <span className="text-[var(--accent)] font-bold">[DATABASES & CLOUD]:</span>{" "}
                <span className="text-[var(--text-stone)]">PostgreSQL, MongoDB, Supabase, Git, Linux, Docker</span>
              </div>
            </div>
          );
          break;

        case "iot":
          output = (
            <div className="text-xs font-mono space-y-1 p-2 rounded bg-[var(--bg-lacquer)] border border-[var(--border-subtle)] text-[var(--text-stone)]">
              <div className="flex items-center justify-between text-[var(--accent)] border-b border-[var(--border-subtle)] pb-1 mb-1">
                <span className="flex items-center gap-1.5 font-bold">
                  <Cpu className="w-3.5 h-3.5" /> ESP32-WROOM-32D NODE #01
                </span>
                <span className="flex items-center gap-1 text-[10px]">
                  <Wifi className="w-3 h-3 text-emerald-400" /> RSSI: -48 dBm [ONLINE]
                </span>
              </div>
              <p>• Core 0 Clock: 240 MHz | Temp: {(36.8 + Math.random() * 2).toFixed(1)}°C</p>
              <p>• Free Heap: {(188 + Math.random() * 8).toFixed(0)} KB / 320 KB</p>
              <p>• Logic Bus: GPIO21 [SDA] / GPIO22 [SCL] 400kHz Active</p>
              <p>• MQTT Ping: broker.emqx.io:1883 latency 24ms [ACK]</p>
              <p>• Channel Status: CH1=PWM(64%), CH2=HIGH, CH3=LOW, CH4=HIGH</p>
            </div>
          );
          break;

        case "projects":
          output = (
            <div className="text-xs space-y-1 text-[var(--text-stone)]">
              <p>
                <span className="text-[var(--accent)] font-bold">1. AutoCure</span> — Automated
                Curing Tank with Smart Sensors & Real-Time Quality Tracking.
              </p>
              <p>
                <span className="text-[var(--accent)] font-bold">2. EcoSync</span> — IoT Energy
                Management Platform with automated power balancing.
              </p>
              <p>
                <span className="text-[var(--accent)] font-bold">3. Smart Agritech</span> — Soil
                chemistry & automated hydration telemetry node.
              </p>
            </div>
          );
          break;

        case "theme": {
          const target = args[0]?.toLowerCase() as ThemeId;
          if (target && themes[target]) {
            setTheme(target);
            output = (
              <span className="text-xs text-emerald-400">
                System palette updated to: <span className="font-bold">{themes[target].name}</span>
              </span>
            );
          } else {
            output = (
              <span className="text-xs text-amber-400">
                Invalid theme. Options: vermillion, indigo, gold, sakura, jade
              </span>
            );
          }
          break;
        }

        case "contact":
          output = (
            <div className="text-xs space-y-1 text-[var(--text-stone)]">
              <p>• Email: <span className="text-[var(--text-parchment)]">varunpahuja2005@gmail.com</span></p>
              <p>• GitHub: <a href="https://github.com/varunpahuja" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] underline">github.com/varunpahuja</a></p>
              <p>• LinkedIn: <a href="https://linkedin.com/in/varun-pahuja" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] underline">linkedin.com/in/varun-pahuja</a></p>
            </div>
          );
          break;

        case "secrets":
          output = (
            <div className="text-xs space-y-1.5 p-2.5 rounded bg-[var(--bg-lacquer)] border border-[var(--border-subtle)] text-[var(--text-parchment)]">
              <p className="font-bold text-[var(--accent)] font-mono flex items-center gap-1.5">
                <span>[HIDDEN PROTOCOLS // 2 SECRETS DETECTED]</span>
              </p>
              <p className="leading-relaxed">
                <span className="text-[var(--text-washi)] font-semibold font-mono">1. Konami Code:</span> Type{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-black/50 border border-[var(--border-dim)] text-[var(--accent)] font-mono text-[10px]">
                  ↑ ↑ ↓ ↓ ← → ← → B A
                </kbd>{" "}
                anywhere on the site (or click the footer pill) for the cyberpunk grand opening.
              </p>
              <p className="leading-relaxed">
                <span className="text-[var(--text-washi)] font-semibold font-mono">2. Taijitu Dissolve:</span> Click{" "}
                <span className="text-[var(--accent)] font-bold">道 — the way</span> in the footer for the Yin-Yang particle dispersion.
              </p>
            </div>
          );
          break;

        case "clear":
          setHistory([]);
          return;

        case "exit":
          onClose();
          return;

        default:
          output = (
            <span className="text-xs text-rose-400">
              Command not recognized: &quot;{cmd}&quot;. Type <span className="text-[var(--accent)]">help</span> for a list of commands.
            </span>
          );
      }

      setHistory((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          command: trimmed,
          output,
        },
      ]);
      setCmdHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);
    },
    [onClose, setTheme]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playSound("terminal");
    if (e.key === "Enter") {
      handleCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx < cmdHistory.length) {
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && isMinimized && (
        <motion.button
          key="docked-cli"
          initial={{ y: 20, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.9 }}
          onClick={() => {
            playSound("beep");
            setIsMinimized(false);
          }}
          className="fixed bottom-6 right-6 z-[9000] flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-lacquer)]/95 backdrop-blur-md shadow-2xl text-xs font-mono text-[var(--text-washi)] hover:border-[var(--accent)] cursor-pointer active:scale-95"
          aria-label="Restore Terminal"
          title="Restore Terminal CLI"
        >
          <TerminalIcon className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span className="font-bold">VARUN-OS [MINIMIZED]</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </motion.button>
      )}

      {isOpen && !isMinimized && (
        <motion.div
          key="full-cli"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9000] flex items-start justify-center pt-8 md:pt-16 px-4 bg-black/60 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ y: -40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-void)] shadow-2xl shadow-black/80 font-[family-name:var(--font-geist-mono)]"
          >
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg-lacquer)] border-b border-[var(--border-subtle)] select-none">
              <div className="flex items-center gap-2 text-xs text-[var(--text-stone)] font-medium">
                <TerminalIcon className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span className="text-[var(--text-washi)]">varun-lab@telemetry-cli</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--text-stone)]">
                  {theme.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playSound("click");
                    setIsMinimized(true);
                  }}
                  className="p-1 rounded hover:bg-white/5 text-[var(--text-stone)] hover:text-[var(--text-washi)] transition-colors"
                  aria-label="Minimize"
                  title="Minimize to dock"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playSound("click");
                    onClose();
                  }}
                  className="p-1 rounded hover:bg-rose-500/20 text-[var(--text-stone)] hover:text-rose-400 transition-colors"
                  aria-label="Close Terminal"
                  title="Close terminal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Terminal Buffer */}
            <div
              ref={scrollRef}
              className="p-4 max-h-[380px] overflow-y-auto space-y-3 text-xs leading-relaxed"
            >
              {history.map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center gap-2 text-[var(--text-stone)]">
                    <span className="text-[var(--accent)]">varun@lab:~$</span>
                    <span className="text-[var(--text-washi)]">{item.command}</span>
                  </div>
                  <div>{item.output}</div>
                </div>
              ))}

              {/* Active Prompt */}
              <div className="flex items-center gap-2 pt-1 text-[var(--text-stone)]">
                <span className="text-[var(--accent)] font-bold">varun@lab:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-[var(--text-washi)] outline-none border-none font-mono text-xs caret-[var(--accent)]"
                  placeholder="Type a command (try 'help' or 'iot')..."
                  autoFocus
                />
              </div>
            </div>

            {/* Terminal Footer Telemetry */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--border-subtle)] bg-[var(--bg-lacquer)]/60 text-[10px] text-[var(--text-stone)]">
              <span>Press [ESC] or [`] to toggle</span>
              <span className="flex items-center gap-2">
                <span>STATUS: READY</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
