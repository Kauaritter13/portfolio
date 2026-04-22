import { motion, useScroll, useTransform } from "framer-motion";

export default function AuroraBackground() {
  const { scrollYProgress } = useScroll();
  const blobY1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const blobY3 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const blobY4 = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const sheenRotate = useTransform(scrollYProgress, [0, 1], [0, 25]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      <motion.div
        style={{ y: blobY1 }}
        animate={{ scale: [1, 1.12, 1], x: ["0%", "4%", "0%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] h-[720px] w-[720px] rounded-full bg-sky/25 blur-[140px]"
      />
      <motion.div
        style={{ y: blobY2 }}
        animate={{ scale: [1.1, 1, 1.1], x: ["0%", "-5%", "0%"] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[-15%] h-[640px] w-[640px] rounded-full bg-sky-deep/35 blur-[150px]"
      />
      <motion.div
        style={{ y: blobY3 }}
        animate={{ scale: [1, 1.18, 1], x: ["0%", "-3%", "0%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[55%] left-[10%] h-[560px] w-[560px] rounded-full bg-accent/22 blur-[140px]"
      />
      <motion.div
        style={{ y: blobY4 }}
        animate={{ scale: [1.05, 1, 1.05], x: ["0%", "4%", "0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[10%] h-[620px] w-[620px] rounded-full bg-sky-soft/20 blur-[150px]"
      />
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[35%] left-[45%] h-[380px] w-[380px] rounded-full bg-accent-soft/12 blur-[120px]"
      />

      <div
        aria-hidden
        className="absolute top-0 left-[-10%] right-[-10%] h-[70vh] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 40%, transparent 100%)",
          backdropFilter: "blur(40px) saturate(140%)",
          WebkitBackdropFilter: "blur(40px) saturate(140%)",
          maskImage: "linear-gradient(180deg, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, black 0%, transparent 100%)",
        }}
      />

      <motion.div
        style={{ rotate: sheenRotate }}
        className="absolute -top-1/4 -left-1/4 h-[150%] w-[150%] origin-center opacity-40"
      >
        <div
          className="absolute top-1/2 left-0 right-0 h-[220px] -translate-y-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 40%, rgba(255,178,122,0.05) 50%, rgba(255,255,255,0.04) 60%, transparent 100%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-grid-subtle opacity-30 radial-fade" />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
