import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function MouseTrail() {
  const initialX =
    typeof window !== "undefined" ? window.innerWidth / 2 : 0;
  const initialY =
    typeof window !== "undefined" ? window.innerHeight / 2 : 0;

  const mouseX = useMotionValue(initialX);
  const mouseY = useMotionValue(initialY);
  const ballX = useSpring(mouseX, { stiffness: 2200, damping: 70, mass: 0.04 });
  const ballY = useSpring(mouseY, { stiffness: 2200, damping: 70, mass: 0.04 });

  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const applyCursorClass = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        document.body.classList.add("cursor-custom");
      } else {
        document.body.classList.remove("cursor-custom");
      }
    };
    applyCursorClass();

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, [data-cursor]"
      );
      setHovering(Boolean(interactive));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("pointermove", onMove as EventListener, {
      passive: true,
    });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("resize", applyCursorClass);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointermove", onMove as EventListener);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("resize", applyCursorClass);
      document.body.classList.remove("cursor-custom");
    };
  }, [mouseX, mouseY]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 hidden md:block [&_*]:pointer-events-none pointer-events-none"
      style={{ zIndex: 9999 }}
    >
      <motion.div
        style={{ x: ballX, y: ballY }}
        className="absolute top-0 left-0"
      >
        <motion.div
          animate={{
            scale: pressed ? 0.75 : hovering ? 1.8 : 1,
            opacity: pressed ? 0.8 : 1,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          style={{ transform: "translate(-50%, -50%)" }}
          className="relative h-5 w-5 rounded-full"
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 45%, rgba(255,178,122,0.22) 100%)",
              backdropFilter: "blur(10px) saturate(200%) brightness(1.1)",
              WebkitBackdropFilter: "blur(10px) saturate(200%) brightness(1.1)",
              border: "1.5px solid rgba(255,255,255,0.32)",
              borderTopColor: "rgba(255,255,255,0.6)",
              boxShadow:
                "inset 0 1.5px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.12), 0 4px 18px rgba(255,106,43,0.4)",
            }}
          />
          <div
            className="absolute inset-[1.5px] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.55), transparent 55%)",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
