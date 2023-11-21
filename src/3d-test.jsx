// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Clean up code if needed when component unmounts
      // For example, you might want to stop the animation loop here
      // and dispose of Three.js resources
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default ThreeAnimation;
