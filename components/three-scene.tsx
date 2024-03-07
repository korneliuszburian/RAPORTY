import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && containerRef.current) {
      // Scene
      const scene = new THREE.Scene();

      // Camera
      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // Renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
      containerRef.current.appendChild(renderer.domElement);

      // Geometry
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Rotation
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        // Render the scene
        renderer.render(scene, camera);
      };
      animate();

      const onWindowResize = () => {
        camera.aspect =
          containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          containerRef.current.clientWidth,
          containerRef.current.clientHeight
        );
      };

      window.addEventListener("resize", onWindowResize, false);

      return () => {
        window.removeEventListener("resize", onWindowResize);
        containerRef.current.removeChild(renderer.domElement);
      };
    }
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default ThreeScene;
