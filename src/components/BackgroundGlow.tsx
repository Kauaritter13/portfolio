import { useEffect, useRef } from "react";

export default function BackgroundGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let raf = 0;
    let targetX = 50;
    let targetY = 40;
    let currentX = 50;
    let currentY = 40;

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      if (ref.current) {
        ref.current.style.setProperty("--cx", `${currentX.toFixed(2)}%`);
        ref.current.style.setProperty("--cy", `${currentY.toFixed(2)}%`);
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("pointermove", onMove as EventListener, {
      passive: true,
    });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointermove", onMove as EventListener);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 pointer-events-none [&_*]:pointer-events-none"
      style={
        {
          zIndex: -5,
          "--cx": "50%",
          "--cy": "40%",
          backgroundImage:
            "radial-gradient(circle 1100px at var(--cx) var(--cy), rgba(255, 106, 43, 0.38), transparent 50%), radial-gradient(circle 650px at var(--cx) var(--cy), rgba(96, 165, 250, 0.28), transparent 50%), radial-gradient(circle 320px at var(--cx) var(--cy), rgba(255, 200, 150, 0.22), transparent 60%)",
          willChange: "background-image",
        } as React.CSSProperties
      }
    />
  );
}
