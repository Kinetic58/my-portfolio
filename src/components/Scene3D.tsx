import { Canvas } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

function FloatingCube({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.7;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#00ffff"
        transparent
        opacity={0.7}
        wireframe
        emissive="#001133"
      />
    </mesh>
  );
}

function FloatingSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.z += delta * 0.4;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 1.5) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial
        color="#ff00ff"
        transparent
        opacity={0.6}
        wireframe
        emissive="#330011"
      />
    </mesh>
  );
}

function FloatingTorus({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.6;
      meshRef.current.rotation.z += delta * 0.3;
      meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * 1.2) * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshStandardMaterial
        color="#00ff00"
        transparent
        opacity={0.8}
        wireframe
        emissive="#001100"
      />
    </mesh>
  );
}

function CameraControls() {
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    state.camera.position.x = Math.cos(time * 0.1) * 12;
    state.camera.position.z = Math.sin(time * 0.1) * 12;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Suspense fallback={null}>
        <Canvas 
          camera={{ position: [0, 0, 10], fov: 75 }}
          onCreated={({ gl }) => {
            gl.setClearColor('#000000', 0);
          }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ffff" />
          <pointLight position={[-10, -10, 5]} intensity={0.3} color="#ff00ff" />
          <pointLight position={[5, -10, -5]} intensity={0.4} color="#00ff00" />
          
          <FloatingCube position={[-3, 2, 0]} />
          <FloatingCube position={[4, -1, -2]} />
          <FloatingSphere position={[2, 3, 1]} />
          <FloatingSphere position={[-4, -2, 2]} />
          <FloatingTorus position={[0, -3, -1]} />
          <FloatingTorus position={[-2, 1, 3]} />
          
          <CameraControls />
        </Canvas>
      </Suspense>
    </div>
  );
}