import * as React from "react";
import { motion, type Transition } from "framer-motion";

import { cn } from "@/lib/utils";

function generateStars(count: number, starColor: string) {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(", ");
}

type StarLayerProps = {
  count: number;
  size: number;
  transition: Transition;
  starColor: string;
};

const StarLayer = React.memo(function StarLayer({
  count,
  size,
  transition,
  starColor,
}: StarLayerProps) {
  const boxShadow = React.useMemo(
    () => generateStars(count, starColor),
    [count, starColor]
  );

  return (
    <motion.div
      data-slot="star-layer"
      animate={{ y: [0, -2000] }}
      transition={transition}
      className="absolute top-0 left-0 w-full h-[2000px] will-change-transform"
      style={{ transform: "translateZ(0)" }}
    >
      <div
        className="absolute bg-transparent rounded-full"
        style={{ width: `${size}px`, height: `${size}px`, boxShadow }}
      />
      <div
        className="absolute bg-transparent rounded-full top-[2000px]"
        style={{ width: `${size}px`, height: `${size}px`, boxShadow }}
      />
    </motion.div>
  );
});

type StarsBackgroundProps = React.ComponentProps<"div"> & {
  speed?: number;
  starColor?: string;
};

export function StarsBackground({
  children,
  className,
  speed = 60,
  starColor = "#F5E6D3",
  ...props
}: StarsBackgroundProps) {
  return (
    <div
      data-slot="stars-background"
      className={cn(
        "relative size-full overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,_#D9775733_0%,_#C6603F1A_30%,_#14100D_70%)]",
        className
      )}
      {...props}
    >
      <StarLayer
        count={250}
        size={1}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        starColor={starColor}
      />
      <StarLayer
        count={100}
        size={2}
        transition={{ repeat: Infinity, duration: speed * 2, ease: "linear" }}
        starColor={starColor}
      />
      <StarLayer
        count={40}
        size={3}
        transition={{ repeat: Infinity, duration: speed * 3, ease: "linear" }}
        starColor={starColor}
      />
      {children}
    </div>
  );
}

export function StarsBackdrop() {
  return (
    <StarsBackground
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
