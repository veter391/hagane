"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Blade() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.18;
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.05 - 0.08;
  });

  // Blade ~ 1.0 in length along Y, very thin in X and Z
  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI * 0.18]}>
      {/* Blade body — polished steel */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.045, 1.6, 0.005]} />
        <meshPhysicalMaterial
          color="#dcdcde"
          metalness={1}
          roughness={0.15}
          envMapIntensity={1.5}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Cutting edge — gold glow */}
      <mesh position={[0.022, 0.5, 0]} castShadow>
        <boxGeometry args={[0.004, 1.6, 0.005]} />
        <meshStandardMaterial
          color="#e6c578"
          emissive="#c9a961"
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* Hand-guard (tsuba) */}
      <mesh position={[0, -0.32, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.018, 32]} />
        <meshStandardMaterial
          color="#3a3a3f"
          metalness={0.7}
          roughness={0.45}
        />
      </mesh>

      {/* Hilt (tsuka) */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.04, 0.32, 16]} />
        <meshStandardMaterial
          color="#1a1817"
          roughness={0.85}
          metalness={0.2}
        />
      </mesh>

      {/* Pommel */}
      <mesh position={[0, -0.68, 0]} castShadow>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial
          color="#c9a961"
          metalness={0.85}
          roughness={0.3}
          emissive="#c9a961"
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  );
}

function FogVolume() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = Math.sin(t * 0.3) * 0.04;
    ref.current.rotation.z = t * 0.02;
  });
  return (
    <mesh ref={ref} position={[0, 0, -1]}>
      <planeGeometry args={[6, 6]} />
      <meshBasicMaterial
        color="#1a1817"
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </mesh>
  );
}

export function KatanaScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.05, 2.4], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.8]}
    >
      <color attach="background" args={["#0a0908"]} />
      <fog attach="fog" args={["#0a0908", 2, 5]} />

      <ambientLight intensity={0.18} />
      <directionalLight position={[2, 3, 2]} intensity={1.4} color="#f5ecd9" />
      <directionalLight position={[-3, -1, 1]} intensity={0.4} color="#c9a961" />
      <pointLight position={[0, 0, 2]} intensity={0.6} color="#c9a961" distance={3} />

      <Suspense fallback={null}>
        <Environment preset="warehouse" />
        <FogVolume />
        <Float speed={0.6} rotationIntensity={0.18} floatIntensity={0.4}>
          <Blade />
        </Float>
      </Suspense>
    </Canvas>
  );
}
