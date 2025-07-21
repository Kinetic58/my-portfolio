import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import { Mesh, Vector3, Points } from 'three';

const FloatingCube = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.5;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 1.5) * 0.3;
    }
  });

  return (
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshPhongMaterial
            color="#00ffff"
            transparent
            opacity={0.7}
            emissive="#001122"
            wireframe={Math.random() > 0.5}
        />
      </mesh>
  );
};

const FloatingSphere = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.6;
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 3) * 0.4;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshPhongMaterial
            color="#ff00ff"
            transparent
            opacity={0.8}
            emissive="#220022"
        />
      </mesh>
  );
};

const FloatingTorus = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.7;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.8;
      meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * 2.5) * 0.6;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 1.8) * 0.4;
    }
  });

  return (
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.7, 0.3, 8, 20]} />
        <meshPhongMaterial
            color="#00ff00"
            transparent
            opacity={0.6}
            emissive="#002200"
            wireframe
        />
      </mesh>
  );
};

const FloatingPyramid = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.9;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.4;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.8) * 0.7;
    }
  });

  return (
      <mesh ref={meshRef} position={position}>
        <coneGeometry args={[0.6, 1.2, 4]} />
        <meshPhongMaterial
            color="#ffff00"
            transparent
            opacity={0.7}
            emissive="#222200"
        />
      </mesh>
  );
};

const CameraControls = () => {
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x = Math.cos(t * 0.1) * 8;
    camera.position.y = Math.sin(t * 0.05) * 3 + 2;
    camera.position.z = Math.sin(t * 0.08) * 8 + 6;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const ParticleField = () => {
  const meshRef = useRef<Points>(null);
  const particleCount = 100;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  return (
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={positions}
              itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
            color="#ffffff"
            size={0.1}
            transparent
            opacity={0.6}
            sizeAttenuation
        />
      </points>
  );
};

export function Scene3D() {
  return (
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
            <spotLight position={[0, 10, 0]} intensity={0.6} color="#ffff00" />

            <FloatingCube position={[2, 1, 0]} />
            <FloatingCube position={[-3, -2, 2]} />
            <FloatingCube position={[1, -1, -3]} />

            <FloatingSphere position={[-2, 0, 1]} />
            <FloatingSphere position={[3, 2, -1]} />
            <FloatingSphere position={[0, -3, 2]} />

            <FloatingTorus position={[0, 2, -2]} />
            <FloatingTorus position={[-1, -1, 1]} />
            <FloatingTorus position={[4, 0, 0]} />

            <FloatingPyramid position={[-4, 1, -1]} />
            <FloatingPyramid position={[2, -2, 3]} />
            <FloatingPyramid position={[0, 3, 1]} />

            <ParticleField />

            <CameraControls />
          </Suspense>
        </Canvas>
      </div>
  );
}