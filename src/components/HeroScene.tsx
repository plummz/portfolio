"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import { useEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";

type ShapeProps = { position: [number, number, number]; speed?: number; children: ReactNode };

function Floaty({ position, speed = 1.6, children }: ShapeProps) {
  return (
    <Float speed={speed} rotationIntensity={1.4} floatIntensity={1.8} floatingRange={[-0.25, 0.25]}>
      <group position={position}>{children}</group>
    </Float>
  );
}

function glossy(color: string) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={0.18}
      metalness={0.05}
      clearcoat={1}
      clearcoatRoughness={0.1}
      iridescence={0.35}
      iridescenceIOR={1.3}
    />
  );
}

function Shapes() {
  const rig = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  // shrink the whole constellation on narrow screens so shapes frame the portrait instead of covering it
  const s = Math.min(1, viewport.width / 11);

  useFrame((state, dt) => {
    if (!rig.current) return;
    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, state.pointer.x * 0.35, 2.5, dt);
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -state.pointer.y * 0.2, 2.5, dt);
    rig.current.position.x = THREE.MathUtils.damp(rig.current.position.x, state.pointer.x * 0.3, 2, dt);
  });

  return (
    <group ref={rig} scale={s}>
      <Floaty position={[-4.3, 1.9, -1]} speed={1.4}>
        <mesh rotation={[0.6, 0.4, 0]}>
          <torusGeometry args={[0.75, 0.3, 32, 80]} />
          {glossy("#ff5fa8")}
        </mesh>
      </Floaty>
      <Floaty position={[4.4, -1.5, -0.3]} speed={1.8}>
        <mesh>
          <sphereGeometry args={[0.85, 48, 48]} />
          {glossy("#c6f432")}
        </mesh>
      </Floaty>
      <Floaty position={[3.6, 2.2, -2.2]} speed={1.2}>
        <RoundedBox args={[1.1, 1.1, 1.1]} radius={0.22} smoothness={6} rotation={[0.5, 0.7, 0.2]}>
          {glossy("#7b5cff")}
        </RoundedBox>
      </Floaty>
      <Floaty position={[-3.9, -1.9, 0.2]} speed={2}>
        <mesh rotation={[0, 0, 0.9]}>
          <capsuleGeometry args={[0.36, 0.9, 12, 32]} />
          {glossy("#ff7a1a")}
        </mesh>
      </Floaty>
      <Floaty position={[-1.7, 3, -3]} speed={1.1}>
        <mesh>
          <icosahedronGeometry args={[0.45, 0]} />
          {glossy("#5ec8ff")}
        </mesh>
      </Floaty>
      <Floaty position={[1.9, -3, -2]} speed={1.5}>
        <mesh>
          <torusKnotGeometry args={[0.38, 0.13, 96, 12]} />
          {glossy("#f3efe6")}
        </mesh>
      </Floaty>
      {/* bubbles */}
      {(
        [
          [-2.4, 0.4, 1.2, 0.2],
          [2.7, 0.6, 1, 0.16],
          [5.4, 0.8, -1.5, 0.28],
          [-5.4, -0.3, -1.8, 0.24],
          [0.6, 3.3, -1, 0.14],
          [-0.9, -3.3, 0, 0.18],
        ] as const
      ).map(([x, y, z, r], i) => (
        <Floaty key={i} position={[x, y, z]} speed={2.4}>
          <mesh>
            <sphereGeometry args={[r, 20, 20]} />
            <meshPhysicalMaterial
              color="#ffffff"
              roughness={0.05}
              metalness={0.1}
              clearcoat={1}
              transparent
              opacity={0.28}
              depthWrite={false}
            />
          </mesh>
        </Floaty>
      ))}
    </group>
  );
}

export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // stop rendering once the hero is off screen
  useEffect(() => {
    if (!wrap.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 9], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        eventPrefix="client"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 5]} intensity={2.2} />
        <Shapes />
        {/* studio lighting built from light panels, so nothing is downloaded at runtime */}
        <Environment resolution={256}>
          <Lightformer intensity={3} position={[0, 5, -4]} scale={[10, 2, 1]} />
          <Lightformer intensity={2} position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} color="#ff5fa8" />
          <Lightformer
            intensity={2}
            position={[6, -1, 2]}
            rotation-y={-Math.PI / 2}
            scale={[8, 3, 1]}
            color="#5ec8ff"
          />
          <Lightformer
            intensity={1.5}
            position={[0, -5, 3]}
            rotation-x={-Math.PI / 2}
            scale={[10, 4, 1]}
            color="#c6f432"
          />
        </Environment>
      </Canvas>
    </div>
  );
}
