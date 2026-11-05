import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Monochrome wireframe object for the hero — tuned to be cheap:
 * DPR 1, no antialias, ~30 fps cap, small geometry, pauses off-screen / hidden tab.
 */
export default function Scene3D({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
    } catch {
      return; // no WebGL → nothing rendered, page still fine
    }
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 9.5);

    const group = new THREE.Group();
    scene.add(group);

    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
    const outerGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const outerEdges = new THREE.EdgesGeometry(outerGeo);
    group.add(new THREE.LineSegments(outerEdges, lineMat));

    const innerGeo = new THREE.OctahedronGeometry(0.95, 0);
    const innerEdges = new THREE.EdgesGeometry(innerGeo);
    const inner = new THREE.LineSegments(innerEdges, new THREE.LineBasicMaterial({ color: 0xffffff }));
    group.add(inner);

    const ringMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 });
    const ringGeo = new THREE.BufferGeometry().setFromPoints(
      Array.from({ length: 64 }, (_, a) => {
        const t = (a / 64) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(t) * 3.1, Math.sin(t) * 3.1, 0);
      })
    );
    const ring = new THREE.LineLoop(ringGeo, ringMat);
    ring.rotation.set(1.25, 0.35, 0);
    scene.add(ring);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const target = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let visible = true;
    let raf = 0;
    let running = false;
    let last = 0;
    let t = 0;
    const FRAME = 1000 / 30;

    const tick = (now: number) => {
      if (!visible || document.hidden) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
      if (now - last < FRAME) return;
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      t += dt;
      group.rotation.y = t * 0.2 + target.x * 0.35;
      group.rotation.x = t * 0.08 + target.y * 0.25;
      inner.rotation.y = -t * 0.5;
      ring.rotation.z = t * 0.1;
      renderer.render(scene, camera);
    };
    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(mount);
    const onVis = () => !document.hidden && start();
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      [outerGeo, outerEdges, innerGeo, innerEdges, ringGeo].forEach((g) => g.dispose());
      [lineMat, ringMat, inner.material as THREE.Material].forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden />;
}
