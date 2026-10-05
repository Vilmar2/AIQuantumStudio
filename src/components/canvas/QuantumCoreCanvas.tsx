import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface QuantumCoreCanvasProps {
  scrollProgress?: number;
  activeSection?: string;
  className?: string;
}

export const QuantumCoreCanvas: React.FC<QuantumCoreCanvasProps> = ({
  scrollProgress = 0,
  activeSection = 'hero',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Depth Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070b, 0.045);

    // 2. Camera setup with cinematic depth of field perspective
    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 100);
    camera.position.z = 5.2;

    // 3. WebGL Renderer
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL init error', e);
      return;
    }

    // --- QUANTUM SYSTEM GRAPH (Neural Network & Quantum Core) ---
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 4. Central Quantum Core (Geodesic Nucleus)
    const coreGroup = new THREE.Group();
    masterGroup.add(coreGroup);

    // Quantum Outer Icosahedron Mesh
    const cageGeom = new THREE.IcosahedronGeometry(1.3, 2);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const cageMesh = new THREE.Mesh(cageGeom, cageMat);
    coreGroup.add(cageMesh);

    // Inner Octahedron
    const innerGeom = new THREE.OctahedronGeometry(0.85, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    coreGroup.add(innerMesh);

    // Glowing Central Nucleus
    const nucleusGeom = new THREE.SphereGeometry(0.4, 24, 24);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeom, nucleusMat);
    coreGroup.add(nucleusMesh);

    // Orbital Quantum Rings
    const createRing = (radius: number, color: number, rx: number, ry: number) => {
      const ringGeom = new THREE.BufferGeometry();
      const points = 80;
      const pos = new Float32Array(points * 3);
      for (let i = 0; i < points; i++) {
        const theta = (i / points) * Math.PI * 2;
        pos[i * 3] = Math.cos(theta) * radius;
        pos[i * 3 + 1] = Math.sin(theta) * radius;
        pos[i * 3 + 2] = 0;
      }
      ringGeom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const ringMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 });
      const line = new THREE.LineLoop(ringGeom, ringMat);
      line.rotation.x = rx;
      line.rotation.y = ry;
      return line;
    };
    const ring1 = createRing(1.8, 0x00e5ff, Math.PI / 3, Math.PI / 6);
    const ring2 = createRing(2.1, 0x0066ff, -Math.PI / 4, Math.PI / 4);
    coreGroup.add(ring1);
    coreGroup.add(ring2);

    // 5. GLOBAL 3D NEURAL NETWORK (Nodes, Synaptic Lines & Travelling Action Potentials)
    const neuralGroup = new THREE.Group();
    masterGroup.add(neuralGroup);

    const nodeCount = 55;
    const nodePositions: THREE.Vector3[] = [];
    const nodeSpheres: THREE.Mesh[] = [];

    const sphereGeom = new THREE.SphereGeometry(0.04, 12, 12);
    const cyanNodeMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.85 });
    const blueNodeMat = new THREE.MeshBasicMaterial({ color: 0x0077ff, transparent: true, opacity: 0.75 });

    // Distribute nodes in a 3D spherical / synaptic cloud surrounding the core
    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.2 + Math.random() * 2.8;

      const pos = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.85,
        r * Math.cos(phi) * 0.9
      );
      nodePositions.push(pos);

      const mesh = new THREE.Mesh(sphereGeom, Math.random() > 0.4 ? cyanNodeMat : blueNodeMat);
      mesh.position.copy(pos);
      neuralGroup.add(mesh);
      nodeSpheres.push(mesh);
    }

    // Connect close nodes with synaptic line segments
    const connections: { a: number; b: number; line: THREE.Line }[] = [];
    const maxConnectionDistance = 1.9;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < maxConnectionDistance) {
          const lineGeom = new THREE.BufferGeometry().setFromPoints([
            nodePositions[i],
            nodePositions[j],
          ]);
          const lineMat = new THREE.LineBasicMaterial({
            color: 0x00e5ff,
            transparent: true,
            opacity: 0.15 + (1 - dist / maxConnectionDistance) * 0.25,
          });
          const line = new THREE.Line(lineGeom, lineMat);
          neuralGroup.add(line);
          connections.push({ a: i, b: j, line });
        }
      }
    }

    // Dynamic Travelling Energy Pulses along neural connections
    const pulseCount = 18;
    const pulseGeom = new THREE.SphereGeometry(0.025, 8, 8);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
    });
    const pulses: { mesh: THREE.Mesh; connIndex: number; progress: number; speed: number }[] = [];

    for (let i = 0; i < pulseCount; i++) {
      const mesh = new THREE.Mesh(pulseGeom, pulseMat);
      const connIndex = Math.floor(Math.random() * connections.length);
      neuralGroup.add(mesh);
      pulses.push({
        mesh,
        connIndex,
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.009,
      });
    }

    // Ambient floating quantum dust particles (Layer 01: Atmósfera)
    const dustCount = 200;
    const dustGeom = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 12;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x00e5ff,
      size: 0.025,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const dustSystem = new THREE.Points(dustGeom, dustMat);
    masterGroup.add(dustSystem);

    // Mouse listener with smooth target lerp
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x * 0.55;
      mouseRef.current.targetY = y * 0.55;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Window resize handler
    const onResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Context lost safety
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn('WebGL context lost');
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Base Core Rotation
      cageMesh.rotation.y = elapsed * 0.2 + mouseRef.current.x * 0.8;
      cageMesh.rotation.x = elapsed * 0.12 + mouseRef.current.y * 0.8;
      innerMesh.rotation.y = -elapsed * 0.35 + mouseRef.current.x * 0.5;
      innerMesh.rotation.z = elapsed * 0.25;
      ring1.rotation.z = elapsed * 0.28;
      ring2.rotation.z = -elapsed * 0.22;

      // Pulse nucleus
      const pulse = 1 + Math.sin(elapsed * 3.5) * 0.08;
      nucleusMesh.scale.set(pulse, pulse, pulse);

      // Neural Network slow cosmic spin & node subtle breathing
      neuralGroup.rotation.y = elapsed * 0.04 + mouseRef.current.x * 0.3;
      neuralGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.08 + mouseRef.current.y * 0.3;

      // Update travelling pulses along neural connections
      pulses.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.connIndex = Math.floor(Math.random() * connections.length);
        }
        if (connections[p.connIndex]) {
          const start = nodePositions[connections[p.connIndex].a];
          const end = nodePositions[connections[p.connIndex].b];
          p.mesh.position.lerpVectors(start, end, p.progress);
        }
      });

      // Atmospheric dust drift
      dustSystem.rotation.y = elapsed * 0.02;

      // Section-based scroll transformation
      const scrollFactor = Math.min(scrollProgress * 2.5, 2.0);
      const coreExpansion = 1 + scrollFactor * 0.65;
      coreGroup.scale.set(coreExpansion, coreExpansion, coreExpansion);

      // Camera position responds to scroll & mouse tilt
      camera.position.x = mouseRef.current.x * 0.9;
      camera.position.y = mouseRef.current.y * 0.7;
      camera.position.z = 5.2 - scrollProgress * 1.4; // Camera dives inward into the system
      camera.lookAt(0, 0, 0);

      renderer?.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      // Dispose Geometries and materials
      cageGeom.dispose();
      cageMat.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      nucleusGeom.dispose();
      nucleusMat.dispose();
      sphereGeom.dispose();
      cyanNodeMat.dispose();
      blueNodeMat.dispose();
      pulseGeom.dispose();
      pulseMat.dispose();
      dustGeom.dispose();
      dustMat.dispose();

      connections.forEach((c) => {
        c.line.geometry.dispose();
        (c.line.material as THREE.Material).dispose();
      });

      renderer?.dispose();
      if (renderer?.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Background Gradient Mesh (Layer 01) */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-radial from-cyan-950/20 via-transparent to-[#05070b] opacity-80" />
    </div>
  );
};
