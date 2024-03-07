"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

function MeshComponent() {
  const fileUrl = "models/tekken7-king.gltf";
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);

  useFrame(() => {
    mesh.current.rotation.y += 0.01; // Auto-rotate model
  });

  return <primitive object={gltf.scene} ref={mesh} dispose={null} />;
}

export function Tekken7Model() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Canvas className="h-2xl w-2xl">
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
        />{" "}
        {/* Disable zoom and pan */}
        <ambientLight intensity={5} /> {/* Adjusted ambient light */}
        <pointLight position={[10, 10, 10]} />
        <MeshComponent />
      </Canvas>
    </div>
  );
}
