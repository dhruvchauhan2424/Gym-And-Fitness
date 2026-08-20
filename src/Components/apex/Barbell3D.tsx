import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import type { Group } from "three";

function Plate({ x }: { x: number }) {
  return (
    <group position={[x, 0, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[1.05, 1.05, 0.26, 64]} />

        <meshStandardMaterial
          color="#0d0d0d"
          metalness={0.85}
          roughness={0.32}
        />
      </mesh>

      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.05, 0.035, 16, 96]} />

        <meshStandardMaterial
          color="#c6f24a"
          emissive="#c6f24a"
          emissiveIntensity={0.45}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

function Barbell({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;

    const target = scrollRef.current * Math.PI * 2.2;

    group.current.rotation.y +=
      (target - group.current.rotation.y) * Math.min(1, delta * 3);

    group.current.rotation.z = -0.18 + Math.sin(target * 0.5) * 0.06;
  });

  return (
    <group ref={group} rotation={[0.15, 0, -0.18]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.14, 0.14, 8.4, 48]} />

        <meshStandardMaterial color="#b8b8b8" metalness={1} roughness={0.22} />
      </mesh>

      {[-3.6, -3.3, -3.0, 3.0, 3.3, 3.6].map((x) => (
        <Plate key={x} x={x} />
      ))}

      {[-2.4, 2.4].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.5, 32]} />

          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.9}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function BarbellScene() {
  const scrollRef = useRef(0);
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);

    const onScroll = () => {
      const el = host.current;

      if (!el) return;

      const r = el.getBoundingClientRect();

      const total = r.height + window.innerHeight;

      scrollRef.current = Math.min(
        1,
        Math.max(0, (window.innerHeight - r.top) / total),
      );
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={host}
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
    >
      {ready && (
        <Canvas
          camera={{
            position: [0, 0.6, 9],
            fov: 42,
          }}
          dpr={[1, 1.6]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <ambientLight intensity={0.35} />

          <spotLight
            position={[6, 8, 6]}
            angle={0.4}
            penumbra={1}
            intensity={90}
            color="#ffffff"
          />

          <pointLight position={[-7, -3, 3]} intensity={35} color="#c6f24a" />

          <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.25}>
            <Barbell scrollRef={scrollRef} />
          </Float>

          <Environment preset="warehouse" />
        </Canvas>
      )}
    </div>
  );
}
