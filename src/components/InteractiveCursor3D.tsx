import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FollowingSphere: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetPosition = useRef(new THREE.Vector3());

  useFrame(() => {
    if (meshRef.current) {
      targetPosition.current.set(mousePosition.x * 5, -mousePosition.y * 5, 0);
      meshRef.current.position.lerp(targetPosition.current, 0.1);
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.5, 1]} />
      <meshStandardMaterial
        color="#ff6b35"
        wireframe
        emissive="#ff6b35"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

const ParticleField: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 100;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = mousePosition.x * 0.5;
      pointsRef.current.rotation.x = -mousePosition.y * 0.5;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#4f46e5" transparent opacity={0.6} />
    </points>
  );
};

const InteractiveCursor3D: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = (event.clientY / window.innerHeight) * 2 - 1;
    setMousePosition({ x, y });
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      onMouseMove={handleMouseMove}
      style={{ pointerEvents: 'none' }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <FollowingSphere mousePosition={mousePosition} />
        <ParticleField mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default InteractiveCursor3D;
