"use client";

import { Component, ReactNode, useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/lib/themes";

/* ─── Error Boundary — if 3D fails, render nothing, keep hero readable ─── */
class SceneBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

/* ─── Feature / environment detection ─── */
function supportsWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function usePrefersReducedMotion(): boolean {
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

/* ─── Kanji texture from an offscreen 2D canvas (no network font, no Suspense) ─── */
function makeKanjiTexture(char: string, size = 256): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = "#ffffff";
  ctx.font = `700 ${size * 0.72}px "Noto Serif JP", serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(char, size / 2, size / 2 + size * 0.04);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/* ─── Yin-Yang — mathematically correct flat disc ───
   Classic ☯ construction (R = outer radius):
   - Outer circle radius R
   - Two inner half-circles radius R/2, centers (0, ±R/2), form the S-curve
   - Black fish = right side, head bulging left at top
     S = LEFT semicircle of top inner circle  ∪  RIGHT semicircle of bottom inner circle
   - White dot inside black fish at (0,  R/2); black dot inside white fish at (0, -R/2)
   Verified: these arcs produce the true 180°-symmetrical yin-yang.
*/
function buildYinYangGeometry(R: number) {
  const shape = new THREE.Shape();

  shape.moveTo(0, R); // top

  // Outer RIGHT semicircle: from top (π/2) clockwise through 0 to bottom (-π/2)
  shape.absarc(0, 0, R, Math.PI / 2, -Math.PI / 2, true);

  // Bottom inner circle center (0, -R/2): from bottom (-π/2) counterclockwise
  // through 0 to center (π/2) → RIGHT bulge of the bottom circle
  shape.absarc(0, -R / 2, R / 2, -Math.PI / 2, Math.PI / 2, false);

  // Top inner circle center (0, R/2): from center (-π/2) clockwise through π
  // to top (π/2) → LEFT bulge of the top circle
  shape.absarc(0, R / 2, R / 2, -Math.PI / 2, Math.PI / 2, true);

  return shape;
}

const INK = "#10101a";
const WASH = "#eeeadd";

function YinYang() {
  const group = useRef<THREE.Group>(null);
  const { colors } = useTheme();
  // ~20s per full rotation → 2π/20 ≈ 0.314 rad/s
  const SPEED = Math.PI / 10;

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.z += delta * SPEED;
    }
  });

  const blackGeom = useMemo(() => {
    const s = buildYinYangGeometry(2);
    // flat disc: extrude only visually-tiny depth to keep crisp edges
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.02,
      bevelEnabled: false,
      curveSegments: 64,
    });
    return geo;
  }, []);

  // Simpler + robust: render the black comma AND the white remainder as two
  // shapes (black comma drawn on top of a full washi disc gives the yin-yang).
  const whiteDiscGeom = useMemo(
    () => new THREE.CircleGeometry(2, 96),
    []
  );

  return (
    <group ref={group} position={[0, 0.6, -4.2]}>
      {/* Washi (white) full disc behind */}
      <mesh geometry={whiteDiscGeom}>
        <meshBasicMaterial
          color={WASH}
          transparent
          opacity={0.13}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Black comma on top — forms the yin fish */}
      <mesh geometry={blackGeom} position={[0, 0, 0.01]}>
        <meshBasicMaterial
          color={INK}
          transparent
          opacity={0.13}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* White dot on the black fish (top, center (0, R/2)) */}
      <mesh position={[0, 1, 0.03]}>
        <circleGeometry args={[0.42, 48]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Theme-colored dot on the white fish (bottom, center (0, -R/2)) —
          changes color with the palette */}
      <mesh position={[0, -1, 0.03]}>
        <circleGeometry args={[0.42, 48]} />
        <meshBasicMaterial
          color={colors.accent}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ─── Floating kanji as sprites (always face camera, cheap, reliable) ─── */
const KANJI = [
  { char: "道", x: -4, y: 1.8, z: -5, scale: 1.1 },
  { char: "力", x: 4.2, y: -1.4, z: -6, scale: 0.85 },
  { char: "創", x: -3.2, y: -2.4, z: -4.5, scale: 0.75 },
  { char: "魂", x: 4.6, y: 2.4, z: -7, scale: 0.7 },
  { char: "劍", x: -4.8, y: 0, z: -7.5, scale: 0.8 },
];

function FloatingKanji() {
  const refs = useRef<(THREE.Sprite | null)[]>([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    KANJI.forEach((k, i) => {
      const s = refs.current[i];
      if (!s) return;
      s.position.x = k.x + Math.cos(t * 0.3 + i * 2) * 0.25 + mouse.current.x * 0.05;
      s.position.y = k.y + Math.sin(t * 0.4 + i) * 0.35 + mouse.current.y * 0.05;
    });
  });

  return (
    <>
      {KANJI.map((k, i) => (
        <SpriteKanji
          key={k.char}
          char={k.char}
          position={[k.x, k.y, k.z]}
          scale={k.scale}
          ref={(el) => {
            refs.current[i] = el;
          }}
        />
      ))}
    </>
  );
}

const SpriteKanji = ({
  char,
  position,
  scale,
  ref,
}: {
  char: string;
  position: [number, number, number];
  scale: number;
  ref?: React.Ref<THREE.Sprite>;
}) => {
  const [texture] = useState(() => makeKanjiTexture(char));
  return (
    <sprite ref={ref} position={position} scale={[scale * 2.4, scale * 2.4, 1]}>
      <spriteMaterial map={texture} transparent opacity={0.05} depthWrite={false} />
    </sprite>
  );
};

/* ─── Sakura petals (instanced) ─── */
const PETAL_COUNT = 55;

function SakuraPetals() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const [petals] = useState(() =>
    Array.from({ length: PETAL_COUNT }, () => ({
      x: (Math.random() - 0.5) * 16,
      y: Math.random() * 12 - 6,
      z: (Math.random() - 0.5) * 8 - 1.5,
      rot: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.35,
      drift: (Math.random() - 0.5) * 0.3,
      spin: 0.4 + Math.random() * 1.2,
      scale: 0.03 + Math.random() * 0.04,
    }))
  );

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;

    petals.forEach((p, i) => {
      p.y -= p.speed * 0.012;
      p.x += Math.sin(t * 0.5 + i) * 0.0025 + p.drift * 0.002;
      p.rot += p.spin * 0.01;
      if (p.y < -7) {
        p.y = 7;
        p.x = (Math.random() - 0.5) * 16;
      }
      const depth = p.z > -3 ? 0.14 : 0.04;
      dummy.position.set(p.x + mouse.current.x * depth, p.y + mouse.current.y * depth, p.z);
      dummy.rotation.set(p.rot, p.rot * 0.6, p.rot);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, PETAL_COUNT]}>
      <planeGeometry args={[1, 0.62]} />
      <meshBasicMaterial color="#f0b8c8" transparent opacity={0.14} side={THREE.DoubleSide} depthWrite={false} />
    </instancedMesh>
  );
}

/* ─── Scene root ─── */
function HeroScene() {
  return (
    <>
      <YinYang />
      <FloatingKanji />
      <SakuraPetals />
    </>
  );
}

/* ─── Smart wrapper: only render 3D when supported + desktop + motion allowed ─── */
export default function HeroCanvas() {
  const reduced = usePrefersReducedMotion();

  const canRun = useMemo(() => {
    if (reduced) return false;
    return (
      supportsWebGL() &&
      !window.matchMedia("(pointer: coarse)").matches
    );
  }, [reduced]);

  if (!canRun) return null;

  return (
    <SceneBoundary>
      <div className="absolute inset-0 z-0" style={{ pointerEvents: "none" }} aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
          style={{ background: "transparent" }}
        >
          <HeroScene />
        </Canvas>
      </div>
    </SceneBoundary>
  );
}