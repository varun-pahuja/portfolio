"use client";

import {
  Component,
  ReactNode,
  useMemo,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { Zap, Play, Square, RotateCcw, Layers, Activity, Cpu } from "lucide-react";
import { useTheme } from "@/lib/themes";
import { playSound } from "@/lib/audio";

/* ─────────────────────────  guards  ───────────────────────── */
class BoardBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

function supportsWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

/* ─────────────────────────  constants  ───────────────────────── */
const DEFAULT_ROT = { x: -0.3, y: 0.2, z: 0 };
const SPRING_K = 80;
const SPRING_C = 20;

type SceneCtl = {
  ang: { x: number; y: number; z: number };
  vel: { x: number; y: number; z: number };
  dragging: boolean;
};

const LED_DEFS = [
  { id: 0, color: "#ff4d4d", name: "Red LED", x: -0.82, z: 1.72 },
  { id: 1, color: "#4dff4d", name: "Green LED", x: -0.3, z: 1.72 },
  { id: 2, color: "#4da2ff", name: "Blue LED", x: 0.22, z: 1.72 },
  { id: 3, color: "#ffe04d", name: "Yellow LED", x: 0.74, z: 1.72 },
] as const;

type CompInfo = {
  id: string;
  title: string;
  rows: [string, string][];
  color: string;
};

/* ─────────────────────────  logic analyzer widget  ───────────────────────── */

function LogicAnalyzer({
  running,
  speed,
  manualOn,
}: {
  running: boolean;
  speed: number;
  manualOn: boolean[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let lastT = performance.now();

    const render = () => {
      const now = performance.now();
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;

      if (running) {
        timeRef.current += dt * speed * 3.5;
      }

      const w = cv.width;
      const h = cv.height;

      // Dark CRT background
      ctx.fillStyle = "#060a12";
      ctx.fillRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = "rgba(0, 229, 255, 0.08)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 22) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 12) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const channels = [
        { name: "D18", color: "#ff4d4d", id: 0 },
        { name: "D19", color: "#4dff4d", id: 1 },
        { name: "D21", color: "#4da2ff", id: 2 },
        { name: "D22", color: "#ffe04d", id: 3 },
      ];

      const chHeight = (h - 6) / 4;

      channels.forEach((ch, idx) => {
        const topY = 3 + idx * chHeight;
        const lowY = topY + chHeight - 2.5;
        const highY = topY + 1.5;

        ctx.strokeStyle = ch.color;
        ctx.lineWidth = 1.4;
        ctx.beginPath();

        const isHigh = manualOn[ch.id];

        let prevLevel = 0;
        for (let x = 0; x < w; x += 2) {
          let level = 0;
          if (running) {
            const tVal = (x * 0.08 - timeRef.current + idx * 1.5) % 6;
            const normalizedT = ((tVal % 6) + 6) % 6;
            level = normalizedT < 1.4 ? 1 : 0;
          } else {
            level = isHigh ? 1 : 0;
          }

          const y = level ? highY : lowY;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            if (level !== prevLevel) {
              ctx.lineTo(x, prevLevel ? highY : lowY);
            }
            ctx.lineTo(x, y);
          }
          prevLevel = level;
        }
        ctx.stroke();

        // Channel label
        ctx.fillStyle = ch.color;
        ctx.font = "8px monospace";
        ctx.fillText(ch.name, 3, highY + 6);
      });

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animRef.current);
  }, [running, speed, manualOn]);

  return (
    <div className="flex flex-col gap-1 p-2 rounded-lg bg-black/60 border border-[var(--border-dim)] font-mono text-[10px]">
      <div className="flex items-center justify-between text-[var(--text-stone)] text-[9px] uppercase tracking-wider">
        <span className="flex items-center gap-1 text-[var(--accent)] font-bold">
          <Activity className="w-2.5 h-2.5" /> LOGIC ANALYZER
        </span>
        <span className="text-[var(--text-parchment)]">24MS/s</span>
      </div>
      <canvas
        ref={canvasRef}
        width={180}
        height={50}
        className="w-full h-[50px] rounded bg-[#060910] border border-cyan-950/40"
      />
    </div>
  );
}

/* ─────────────────────────  baked textures  ───────────────────────── */

function makeBoardTexture(isBlueprint = false): THREE.Texture {
  const cv = document.createElement("canvas");
  cv.width = 1024;
  cv.height = 512;
  const ctx = cv.getContext("2d")!;

  if (isBlueprint) {
    // Blueprint CAD Navy substrate
    ctx.fillStyle = "#051329";
    ctx.fillRect(0, 0, 1024, 512);

    // Fine CAD Grid
    ctx.strokeStyle = "rgba(0, 229, 255, 0.14)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= 1024; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    for (let y = 0; y <= 512; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Major Grid
    ctx.strokeStyle = "rgba(0, 229, 255, 0.32)";
    ctx.lineWidth = 2;
    for (let x = 0; x <= 1024; x += 128) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    for (let y = 0; y <= 512; y += 128) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Silkscreen / CAD Border & Crosshairs
    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 3;
    ctx.strokeRect(16, 16, 992, 480);

    // Corner crosshairs
    const corners = [
      [16, 16],
      [1008, 16],
      [16, 496],
      [1008, 496],
    ];
    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 2;
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.moveTo(cx - 12, cy);
      ctx.lineTo(cx + 12, cy);
      ctx.moveTo(cx, cy - 12);
      ctx.lineTo(cx, cy + 12);
      ctx.stroke();
    });

    // Technical Blueprint Typography
    ctx.fillStyle = "#00e5ff";
    ctx.font = "bold 44px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.fillText("SCHEMATIC BLUEPRINT // ESP32-S3", 512, 110);

    ctx.fillStyle = "#70e2ff";
    ctx.font = "26px 'Courier New', monospace";
    ctx.fillText("CAD SPEC: 102.4mm x 51.2mm | REV 3.4", 512, 160);

    // Chip footprint CAD outline
    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 2;
    ctx.strokeRect(300, 210, 424, 200);
    ctx.fillStyle = "rgba(0, 229, 255, 0.08)";
    ctx.fillRect(300, 210, 424, 200);

    ctx.fillStyle = "#00e5ff";
    ctx.font = "bold 28px 'Courier New', monospace";
    ctx.fillText("U1: ESP32-D0WD", 512, 290);
    ctx.font = "22px 'Courier New', monospace";
    ctx.fillStyle = "#70e2ff";
    ctx.fillText("240MHz XTENSA LX6", 512, 330);

    // Pin labels
    ctx.font = "bold 26px 'Courier New', monospace";
    ctx.textAlign = "left";
    const pinLeft = [
      "GPIO18",
      "GPIO19",
      "GPIO21",
      "GPIO22",
      "GPIO23",
      "GPIO25",
      "GPIO26",
      "GPIO27",
    ];
    pinLeft.forEach((p, i) => {
      ctx.fillStyle = "#00e5ff";
      ctx.fillText(p, 30, 245 + i * 34);
    });

    const pinRight = [
      "3V3_REG",
      "VCC_5V",
      "GND_0",
      "GND_1",
      "GND_2",
      "VBUS",
      "TXD0",
      "RXD0",
    ];
    ctx.textAlign = "right";
    pinRight.forEach((p, i) => {
      ctx.fillStyle = "#70e2ff";
      ctx.fillText(p, 994, 245 + i * 34);
    });
  } else {
    // PCB green surface
    ctx.fillStyle = "#0c4a32";
    ctx.fillRect(0, 0, 1024, 512);
    // subtle trace hinting
    ctx.strokeStyle = "rgba(190,230,200,0.10)";
    ctx.lineWidth = 2;
    for (let y = 32; y < 512; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y + Math.sin(y) * 20);
      ctx.lineTo(1024, y + Math.cos(y) * 20);
      ctx.stroke();
    }
    // silkscreen border
    ctx.strokeStyle = "#f2f2e8";
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, 1004, 492);
    // title
    ctx.fillStyle = "#f2f2e8";
    ctx.font = "bold 52px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.fillText("ESP32 WROOM-32", 512, 120);
    ctx.fillStyle = "#c9d6c4";
    ctx.font = "32px 'Courier New', monospace";
    ctx.fillText("240MHz · 520KB SRAM · BLE + WiFi", 512, 175);
    // chip footprint
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(300, 210, 424, 200);
    ctx.strokeStyle = "#f2f2e8";
    ctx.strokeRect(300, 210, 424, 200);
    ctx.fillStyle = "#f2f2e8";
    ctx.font = "28px 'Courier New', monospace";
    ctx.fillText("ESP32-D0WD", 512, 300);
    ctx.fillText("2024", 512, 340);
    // pin labels — left column (D pins)
    ctx.font = "30px 'Courier New', monospace";
    ctx.textAlign = "left";
    const pinLeft = ["D18", "D19", "D21", "D22", "D23", "D25", "D26", "D27"];
    pinLeft.forEach((p, i) => {
      ctx.fillText(p, 30, 250 + i * 34);
    });
    // pin labels — right column (power)
    const pinRight = ["3V3", "VCC", "GND", "GND", "GND", "VCC", "GND", "GND"];
    ctx.textAlign = "right";
    pinRight.forEach((p, i) => {
      ctx.fillText(p, 994, 250 + i * 34);
    });
  }

  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

function makeBreadboardTexture(isBlueprint = false): THREE.Texture {
  const cv = document.createElement("canvas");
  cv.width = 1024;
  cv.height = 512;
  const ctx = cv.getContext("2d")!;

  if (isBlueprint) {
    ctx.fillStyle = "#07162b";
    ctx.fillRect(0, 0, 1024, 512);

    // power rails
    ctx.fillStyle = "#00e5ff";
    ctx.fillRect(0, 0, 1024, 24);
    ctx.fillStyle = "#0066cc";
    ctx.fillRect(0, 488, 1024, 24);

    // holes: 8 rows × 20 cols
    ctx.fillStyle = "#0e2d52";
    ctx.strokeStyle = "rgba(0, 229, 255, 0.4)";
    ctx.lineWidth = 2;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 20; col++) {
        const x0 = 40 + col * (940 / 19);
        const y0 = 70 + row * 100;
        ctx.beginPath();
        ctx.arc(x0, y0, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x0, y0 + 170, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }
  } else {
    // translucent white body
    ctx.fillStyle = "#e7e4db";
    ctx.fillRect(0, 0, 1024, 512);
    // power rails
    ctx.fillStyle = "#d83830";
    ctx.fillRect(0, 0, 1024, 30);
    ctx.fillStyle = "#2c5fdc";
    ctx.fillRect(0, 482, 1024, 30);
    // holes: 8 rows × 20 cols
    ctx.fillStyle = "#8a867d";
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 20; col++) {
        const x0 = 40 + col * (940 / 19);
        const y0 = 70 + row * 100;
        ctx.beginPath();
        ctx.arc(x0, y0, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x0, y0 + 170, 14, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

/* ─────────────────────────  scene  ───────────────────────── */

function CircuitScene(props: {
  running: boolean;
  speed: number;
  manualOn: boolean[];
  selected: CompInfo | null;
  setSelected: (c: CompInfo | null) => void;
  hoverId: string | null;
  setHoverId: (s: string | null) => void;
  ctl: { current: SceneCtl | null };
  isBlueprint: boolean;
}) {
  const { colors } = useTheme();
  const {
    running,
    speed,
    manualOn,
    setSelected,
    hoverId,
    setHoverId,
    ctl,
    isBlueprint,
  } = props;

  const groupRef = useRef<THREE.Group>(null);

  const boardTex = useMemo(() => makeBoardTexture(isBlueprint), [isBlueprint]);
  const breadTex = useMemo(
    () => makeBreadboardTexture(isBlueprint),
    [isBlueprint]
  );

  const ledBodies = useRef<(THREE.Mesh | null)[]>([]);
  const ledLenses = useRef<(THREE.Mesh | null)[]>([]);
  const ledHalos = useRef<(THREE.Mesh | null)[]>([]);
  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);

  const simTime = useRef(0);

  /* wire pulse paths (orthogonal, like real wiring) */
  const wirePaths = useMemo(() => {
    // LED cathode → GND rail, LED anode → resistor → ESP32 pin
    return LED_DEFS.map((led) => {
      const from = new THREE.Vector3(led.x, 0.14, led.z - 0.16); // anode under LED
      const viaR = new THREE.Vector3(led.x - 0.1, 0.11, 1.45); // resistor midpoint
      const pin = new THREE.Vector3(led.x, 0.1, 0.45); // espp32 pin row
      // orthogonal: anode up to breadboard top edge, horizontal to resistor, down
      const p1 = new THREE.Vector3(from.x, 0.14, from.z);
      const p2 = new THREE.Vector3(p1.x, 0.11, viaR.z);
      const p3 = new THREE.Vector3(viaR.x, 0.11, viaR.z);
      const p4 = new THREE.Vector3(pin.x, 0.11, pin.z);
      return {
        curve: new THREE.CatmullRomCurve3([p1, p2, p3, p4], false, "catmullrom", 0.3),
        color: led.color,
      };
    });
  }, []);

  const gndWire = useMemo(() => {
    const p1 = new THREE.Vector3(1.1, 0.1, 0.35);
    const p2 = new THREE.Vector3(1.1, 0.11, 1.6);
    const p3 = new THREE.Vector3(1.1, 0.11, 1.95);
    return new THREE.CatmullRomCurve3([p1, p2, p3], false, "catmullrom", 0.3);
  }, []);

  /* wiring tube geometries */
  const wireGeoms = useMemo(
    () =>
      wirePaths.map((w) => new THREE.TubeGeometry(w.curve, 40, 0.014, 6, false)),
    [wirePaths]
  );
  const gndGeom = useMemo(() => new THREE.TubeGeometry(gndWire, 40, 0.02, 6, false), [gndWire]);

  /* resistor band geometries */
  const resistorGeoms = useMemo(
    () =>
      LED_DEFS.map(() => {
        const g = new THREE.CylinderGeometry(0.045, 0.045, 0.26, 16);
        g.rotateZ(Math.PI / 2);
        return g;
      }),
    []
  );

  /* LED body / halo materials update per frame (sim blink) */
  // eslint-disable-next-line react-hooks/immutability -- frame loop writes refs imperatively (R3F standard)
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (running) simTime.current += dt * speed;
    else simTime.current += dt;

    // drive LED brightness: manual vs chase
    const chasePhase = Math.floor(simTime.current * 1.6) % 4;
    const chaseActive = running;

    LED_DEFS.forEach((led, i) => {
      let on: boolean;
      if (chaseActive) on = chasePhase === i;
      else on = manualOn[i] ?? true;

      const body = ledBodies.current[i];
      if (body) {
        const m = body.material as THREE.MeshStandardMaterial;
        m.emissive.set(on ? led.color : "#000000");
        m.emissiveIntensity = on ? 2.2 : 0;
        const base = new THREE.Color(led.color);
        m.color.copy(base).multiplyScalar(on ? 1 : 0.12);
      }
      const lens = ledLenses.current[i];
      if (lens) {
        const m = lens.material as THREE.MeshStandardMaterial;
        m.emissive.set(on ? led.color : "#000000");
        m.emissiveIntensity = on ? 2.4 : 0;
        m.color.set(led.color);
        m.opacity = on ? 0.9 : 0.55;
      }
      const halo = ledHalos.current[i];
      if (halo) {
        const hm = halo.material as THREE.MeshBasicMaterial;
        hm.color.set(led.color);
        hm.opacity = on ? 0.55 : 0;
      }
    });

    // pulse dots along wires
    pulseRefs.current.forEach((p, i) => {
      if (!p) return;
      if (!chaseActive) {
        p.visible = false;
        return;
      }
      p.visible = true;
      const t = ((simTime.current * 0.9 + i * 0.25) % 1);
      const pt = wirePaths[i].curve.getPoint(t);
      p.position.copy(pt);
    });

    // spring back to rest position
    if (groupRef.current && ctl.current) {
      const { ang, vel } = ctl.current;
      if (ctl.current.dragging) {
        // eslint-disable-next-line react-hooks/immutability -- frame loop writes refs imperatively
        vel.x = vel.y = vel.z = 0;
      } else {
        const ax = -SPRING_K * (ang.x - DEFAULT_ROT.x) - SPRING_C * vel.x;
        const ay = -SPRING_K * (ang.y - DEFAULT_ROT.y) - SPRING_C * vel.y;
        const az = -SPRING_K * (ang.z - DEFAULT_ROT.z) - SPRING_C * vel.z;
        vel.x += ax * dt;
        vel.y += ay * dt;
        vel.z += az * dt;
        ang.x += vel.x * dt;
        ang.y += vel.y * dt;
        ang.z += vel.z * dt;
      }
      groupRef.current.rotation.set(ang.x, ang.y, ang.z);
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 9, 4]} intensity={1.3} />
      <directionalLight position={[-6, 4, -3]} intensity={0.35} color={colors.accent} />

      {/* engineering grid floor */}
      <gridHelper args={[30, 30, "#3a3f4f", "#232833"]} position={[0, -0.05, 0]} />

      <group ref={groupRef}>
        {/* ESP32 board */}
        <group
          position={[0, 0.02, 0]}
          onClick={(e) => {
            e.stopPropagation();
            playSound("click");
            setSelected({
              id: "esp32",
              title: "ESP32 WROOM-32",
              rows: [
                ["MCU", "Xtensa LX6 dual-core"],
                ["Clock", "240 MHz"],
                ["SRAM", "520 KB"],
                ["BLE", "4.2 + WiFi 802.11 bgn"],
                ["GPIO", "34 programmable"],
              ],
              color: "#27ae60",
            });
          }}
          onPointerOver={() => setHoverId("esp32")}
          onPointerOut={() => setHoverId(null)}
        >
          {/* board slab */}
          <mesh position={[0, -0.015, 0]}>
            <boxGeometry args={[3.0, 0.03, 1.6]} />
            <meshStandardMaterial color={isBlueprint ? "#041122" : "#0b3d29"} roughness={0.8} />
          </mesh>
          {/* top face with silkscreen + pins */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
            <planeGeometry args={[3.0, 1.6]} />
            <meshStandardMaterial map={boardTex} roughness={0.6} metalness={0.1} />
          </mesh>
          {/* mounting pads */}
          {[-1.28, 1.28].map((x) =>
            [-0.62, 0.62].map((z) => (
              <mesh key={`${x}-${z}`} position={[x, 0.02, z]}>
                <torusGeometry args={[0.1, 0.02, 12, 24]} />
                <meshStandardMaterial color="#c9c9c9" metalness={0.9} roughness={0.3} />
              </mesh>
            ))
          )}
          {hoverId === "esp32" && (
            <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[3.1, 1.7]} />
              <meshBasicMaterial color={colors.accent} transparent opacity={0.06} depthWrite={false} />
            </mesh>
          )}
        </group>

        {/* Breadboard */}
        <group position={[0, 0.03, 1.85]}>
          <mesh position={[0, -0.02, 0]}>
            <boxGeometry args={[2.6, 0.045, 0.9]} />
            <meshStandardMaterial color={isBlueprint ? "#06182c" : "#ddd9cd"} roughness={0.7} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]}>
            <planeGeometry args={[2.6, 0.9]} />
            <meshStandardMaterial map={breadTex} roughness={0.8} transparent opacity={0.95} />
          </mesh>
          {/* side labels */}
          {[-1.19, -0.79, -0.39, 0.01, 0.41, 0.81].map((x, i) => (
            <mesh key={`l${i}`} position={[x, 0.01, -0.5]}>
              <boxGeometry args={[0.26, 0.012, 0.06]} />
              <meshBasicMaterial color="#b7b2a6" />
            </mesh>
          ))}
          {hoverId === "bread" && (
            <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[2.7, 1.0]} />
              <meshBasicMaterial color={colors.accent} transparent opacity={0.07} depthWrite={false} />
            </mesh>
          )}
        </group>

        {/* LEDs */}
        {LED_DEFS.map((led) => {
          const on = running ? false : manualOn[led.id] ?? true; // runtime drives brightness
          return (
            <group
              key={led.id}
              position={[led.x, 0.09, led.z]}
              onClick={(e) => {
                e.stopPropagation();
                setSelected({
                  id: `led${led.id}`,
                  title: led.name,
                  rows: [
                    ["Forward voltage", "2.0 V"],
                    ["Current", "20 mA"],
                    ["Wavelength", led.id === 0 ? "~625 nm" : led.id === 1 ? "~525 nm" : led.id === 2 ? "~470 nm" : "~590 nm"],
                    ["Pin", `GPIO ${21 + led.id * 2}`],
                  ],
                  color: led.color,
                });
              }}
              onPointerOver={() => setHoverId(`led${led.id}`)}
              onPointerOut={() => setHoverId(null)}
            >
              {/* leads */}
              <mesh position={[-0.035, -0.09, 0]}>
                <cylinderGeometry args={[0.012, 0.012, 0.2, 8]} />
                <meshStandardMaterial color="#aaa" metalness={0.8} roughness={0.3} />
              </mesh>
              <mesh position={[0.035, -0.09, 0]}>
                <cylinderGeometry args={[0.012, 0.012, 0.2, 8]} />
                <meshStandardMaterial color="#aaa" metalness={0.8} roughness={0.3} />
              </mesh>
              {/* body */}
              <mesh
                ref={(el) => {
                  ledBodies.current[led.id] = el;
                }}
                position={[0, 0.04, 0]}
              >
                <cylinderGeometry args={[0.06, 0.06, 0.1, 20]} />
                <meshStandardMaterial
                  color={on ? led.color : "#111"}
                  emissive={on ? led.color : "#000"}
                  emissiveIntensity={2.2}
                  roughness={0.2}
                  transparent
                  opacity={0.95}
                />
              </mesh>
              {/* lens */}
              <mesh
                ref={(el) => {
                  ledLenses.current[led.id] = el;
                }}
                position={[0, 0.12, 0]}
              >
                <sphereGeometry args={[0.045, 16, 16]} />
                <meshStandardMaterial
                  color={led.color}
                  emissive={on ? led.color : "#000"}
                  emissiveIntensity={2.4}
                  transparent
                  opacity={0.9}
                />
              </mesh>
              {/* halo */}
              <mesh
                ref={(el) => {
                  ledHalos.current[led.id] = el;
                }}
                position={[0, 0.12, 0]}
                rotation={[0, 0, 0]}
                renderOrder={2}
              >
                <circleGeometry args={[0.13, 24]} />
                <meshBasicMaterial
                  color={led.color}
                  transparent
                  opacity={0}
                  blending={THREE.AdditiveBlending}
                  depthWrite={false}
                />
              </mesh>
              {/* hover ring */}
              {hoverId === `led${led.id}` && (
                <mesh position={[0, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]} renderOrder={3}>
                  <ringGeometry args={[0.09, 0.105, 32]} />
                  <meshBasicMaterial color={colors.accent} transparent opacity={0.9} side={THREE.DoubleSide} />
                </mesh>
              )}
            </group>
          );
        })}

        {/* Resistors */}
        {LED_DEFS.map((led, i) => (
          <group
            key={`r${i}`}
            position={[led.x - 0.1, 0.12, 1.45]}
            rotation={[0, Math.PI / 2, 0]}
            onClick={(e) => {
              e.stopPropagation();
              setSelected({
                id: `res${i}`,
                title: "Resistor",
                rows: [
                  ["Resistance", "220 Ω"],
                  ["Power", "¼ W"],
                  ["Tolerance", "±5%"],
                  ["Band", "red · red · brown· gold"],
                ],
                color: "#c9a84c",
              });
            }}
            onPointerOver={() => setHoverId(`res${i}`)}
            onPointerOut={() => setHoverId(null)}
          >
            <mesh geometry={resistorGeoms[i]}>
              <meshStandardMaterial color="#8a5a2b" roughness={0.6} />
            </mesh>
            {[[0, "#d83830"], [0.06, "#d83830"], [0.12, "#7a4a11"], [0.185, "#c9a84c"]].map(
              ([off, color], b) => (
                <mesh key={b} position={[off as number, 0, 0]}>
                  <cylinderGeometry args={[0.048, 0.048, 0.035, 12]} />
                  <meshStandardMaterial color={color as string} roughness={0.5} />
                </mesh>
              )
            )}
            {/* leads */}
            <mesh position={[-0.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.012, 0.012, 0.16, 8]} />
              <meshStandardMaterial color="#bbb" metalness={0.8} />
            </mesh>
            <mesh position={[0.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.012, 0.012, 0.16, 8]} />
              <meshStandardMaterial color="#bbb" metalness={0.8} />
            </mesh>
            {hoverId === `res${i}` && (
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.07, 0.07, 0.3, 20]} />
                <meshBasicMaterial color={colors.accent} transparent opacity={0.15} />
              </mesh>
            )}
          </group>
        ))}

        {/* Signal wires */}
        {wireGeoms.map((g, i) => (
          <mesh key={`w${i}`} geometry={g}>
            <meshStandardMaterial color={wirePaths[i].color} roughness={0.3} metalness={0.3} transparent opacity={0.85} />
          </mesh>
        ))}
        {/* GND wire */}
        <mesh geometry={gndGeom}>
          <meshStandardMaterial color="#111" roughness={0.3} metalness={0.4} />
        </mesh>

        {/* flowing pulse dots */}
        {LED_DEFS.map((led) => (
          <mesh
            key={`p${led.id}`}
            ref={(el) => {
              pulseRefs.current[led.id] = el;
            }}
            visible={false}
          >
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshBasicMaterial color={led.color} />
          </mesh>
        ))}

        {/* All-Wire join point marker */}
        <mesh position={[1.1, 0.12, 1.62]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#222" metalness={0.6} />
        </mesh>
      </group>

      <OrbitControls
        enableRotate={false}
        enablePan
        enableZoom
        mouseButtons={{ LEFT: undefined, MIDDLE: THREE.MOUSE.PAN, RIGHT: undefined }}
        minDistance={3}
        maxDistance={11}
        target={[0, 0.4, 0.7]}
        makeDefault
      />

      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.35} luminanceSmoothing={0.2} mipmapBlur />
      </EffectComposer>
    </>
  );
}

/* ─────────────────────────  main wrapper with sidebar  ───────────────────────── */

export default function HardwarePlayboard() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<CompInfo | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [manualOn, setManualOn] = useState<boolean[]>(Array(4).fill(true));
  const ctl = useRef<SceneCtl>({ ang: DEFAULT_ROT, vel: { x: 0, y: 0, z: 0 }, dragging: false });
  const dragLast = useRef({ x: 0, y: 0 });

  const [isBlueprint, setIsBlueprint] = useState(false);

  const canRun = useMemo(() => {
    if (reduced) return false;
    if (!supportsWebGL()) return false;
    if (window.matchMedia("(pointer: coarse)").matches) return false;
    return true;
  }, [reduced]);

  const toggleLed = useCallback((i: number) => {
    playSound("switch");
    setManualOn((prev) => prev.map((v, vi) => (vi === i ? !v : v)));
  }, []);

  const resetView = useCallback(() => {
    playSound("click");
    if (ctl.current) {
      ctl.current.dragging = false;
      ctl.current.ang = { ...DEFAULT_ROT };
      ctl.current.vel = { x: 0, y: 0, z: 0 };
    }
  }, []);

  /* DOM-level right-drag rotation (works over empty space too) */
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button === 2) {
      if (ctl.current) ctl.current.dragging = true;
      dragLast.current = { x: e.clientX, y: e.clientY };
      e.preventDefault();
    }
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const c = ctl.current;
    if (!c || !c.dragging) return;
    const dx = e.clientX - dragLast.current.x;
    const dy = e.clientY - dragLast.current.y;
    dragLast.current = { x: e.clientX, y: e.clientY };
    c.ang.y += dx * 0.006;
    c.ang.x += dy * 0.006;
    c.ang.x = Math.max(-1.2, Math.min(0.6, c.ang.x));
    c.ang.y = Math.max(-2.2, Math.min(2.2, c.ang.y));
  }, []);

  const endDrag = useCallback(() => {
    if (ctl.current) ctl.current.dragging = false;
  }, []);

  const onContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  if (!canRun) return null;

  return (
    <BoardBoundary>
      <div className="relative rounded-2xl border border-[var(--border-dim)] overflow-hidden bg-[#0a0a14] max-h-[560px]">
        {/* side simulation panel */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[220px] z-10 hidden sm:flex flex-col gap-2.5 p-3 bg-[#0d0d18]/90 border-r border-[var(--border-dim)] backdrop-blur-sm overflow-y-auto"
        >
          <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[var(--text-stone)] font-semibold">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-[var(--accent-vermillion)]" />
              Simulation
            </span>
            <span className="text-[8px] px-1 py-0.5 rounded bg-white/5 font-mono text-cyan-400">
              {isBlueprint ? "CAD" : "PCB"}
            </span>
          </div>

          <button
            onClick={() => {
              playSound("relay");
              setRunning((s) => !s);
            }}
            className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
              running
                ? "bg-[var(--accent-vermillion)] text-white shadow-lg shadow-[var(--accent-vermillion)]/30"
                : "border border-[var(--border-dim)] text-[var(--text-parchment)] hover:border-[var(--accent-vermillion)]/40"
            }`}
          >
            {running ? (
              <>
                <Square className="w-3 h-3" />
                STOP SIMULATION
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                START SIMULATION
              </>
            )}
          </button>

          {/* Blueprint vs Reality Mode Toggle */}
          <button
            onClick={() => {
              playSound("beep");
              setIsBlueprint((b) => !b);
            }}
            className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono transition-all border active:scale-95 ${
              isBlueprint
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-500/20"
                : "border-[var(--border-dim)] text-[var(--text-stone)] hover:text-[var(--text-parchment)] hover:border-white/20"
            }`}
            title="Toggle CAD Blueprint View"
          >
            <Layers className="w-3 h-3 text-cyan-400" />
            {isBlueprint ? "MODE: BLUEPRINT" : "MODE: PCB REALITY"}
          </button>

          <div className="flex flex-col gap-1.5 pt-0.5">
            <div className="text-[10px] uppercase tracking-wider text-[var(--text-stone)] font-mono">
              Channels (GPIO)
            </div>
            {LED_DEFS.map((led) => (
              <div
                key={led.id}
                onClick={() => toggleLed(led.id)}
                className="flex items-center gap-2 text-xs text-[var(--text-parchment)] cursor-pointer select-none py-0.5"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLed(led.id);
                  }}
                  disabled={running}
                  className={`w-3.5 h-3.5 rounded-full border-2 transition-all active:scale-90 ${
                    manualOn[led.id] || running
                      ? ""
                      : "opacity-30 border-gray-600"
                  } ${running ? "opacity-70" : ""}`}
                  style={{
                    background: manualOn[led.id] || running ? led.color : "#222",
                    borderColor: manualOn[led.id] || running ? led.color : "#444",
                  }}
                  aria-label={`Toggle ${led.name}`}
                />
                <span className="font-mono text-[11px]">{led.name}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] text-[var(--text-stone)]">
              <span>PWM Speed</span>
              <span className="font-mono">{speed.toFixed(1)}×</span>
            </div>
            <input
              type="range"
              min={0.2}
              max={3}
              step={0.1}
              value={speed}
              onChange={(e) => {
                setSpeed(parseFloat(e.target.value));
              }}
              className="w-full accent-[var(--accent-vermillion)] cursor-pointer"
              aria-label="PWM speed"
            />
          </div>

          {/* Real-time Logic Analyzer Waveform Stream */}
          <LogicAnalyzer running={running} speed={speed} manualOn={manualOn} />

          <div className="mt-auto pt-1.5 border-t border-[var(--border-dim)] flex flex-col gap-1">
            <div className="text-[10px] text-[var(--text-stone)] flex justify-between">
              <span>Status</span>
              <span className="text-emerald-400 font-mono">3.3V BUS</span>
            </div>
            <div className="font-mono text-[11px] text-[var(--text-washi)]">
              {manualOn.filter(Boolean).length}/4 LEDs Active
            </div>
          </div>

          <button
            onClick={resetView}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-dim)] text-[11px] text-[var(--text-parchment)] hover:border-[var(--accent-vermillion)]/40 transition-all active:scale-95"
          >
            <RotateCcw className="w-3 h-3" />
            Reset View
          </button>
        </div>

        {/* 3D canvas */}
        <div
          className="sm:ml-[220px] h-[400px] md:h-[480px] select-none relative"
          style={{ cursor: "grab" }}
          aria-label="Interactive 3D circuit — click LEDs, drag to rotate, scroll to zoom"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onContextMenu={onContextMenu}
        >
          <Canvas
            camera={{ position: [4.6, 5.2, 6.4], fov: 35 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: false, failIfMajorPerformanceCaveat: false }}
            onPointerMissed={() => setSelected(null)}
          >
            <CircuitScene
              running={running}
              speed={speed}
              manualOn={manualOn}
              selected={selected}
              setSelected={setSelected}
              hoverId={hoverId}
              setHoverId={setHoverId}
              ctl={ctl}
              isBlueprint={isBlueprint}
            />
          </Canvas>

          {/* Top canvas instruction hint */}
          <div className="absolute top-2 left-2 flex items-center gap-2 text-[10px] tracking-wider text-[var(--text-stone)] uppercase pointer-events-none font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>drag to rotate · scroll to zoom · click parts</span>
          </div>

          {/* Bottom Telemetry HUD Bar (Industrial Brutalism Telemetry) */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] font-mono text-[var(--text-stone)] pointer-events-none px-2.5 py-1.5 rounded bg-black/60 backdrop-blur-md border border-white/5">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-[var(--accent-vermillion)]" />
              <span className="text-[var(--text-parchment)]">ESP32-S3</span>
              <span className="hidden md:inline text-white/40">|</span>
              <span className="hidden md:inline">240MHz DUAL-CORE</span>
            </span>
            <span className="hidden sm:inline text-cyan-400/90">
              I2C: 400kHz · SPI: ACTIVE · HEAP: 194KB
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-emerald-400">TELEMETRY: LIVE</span>
            </span>
          </div>
        </div>

        {/* info panel */}
        {selected && (
          <div
            key={selected.id}
            className="absolute top-3 right-3 w-[220px] z-20 rounded-xl border bg-[#0d0d18]/95 backdrop-blur-md p-3 animate-[fadein_0.2s_ease]"
            style={{ borderColor: "var(--border-dim)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: selected.color }} />
              <div className="text-xs font-bold text-[var(--text-washi)]">{selected.title}</div>
            </div>
            <div className="flex flex-col gap-1">
              {selected.rows.map(([k, v]) => (
                <div key={k} className="flex justify-between text-[11px]">
                  <span className="text-[var(--text-stone)]">{k}</span>
                  <span className="text-[var(--text-parchment)] font-mono">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </BoardBoundary>
  );
}