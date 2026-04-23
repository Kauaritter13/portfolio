import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SiteIntro() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("intro-shown") === "1") {
      setDone(true);
      return;
    }
    const t = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem("intro-shown", "1");
    }, 2600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (done) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-ink-950 flex items-center justify-center overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky/25 blur-[150px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/25 blur-[130px] rounded-full" />

          <div className="relative text-center px-6 z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <span className="relative h-4 w-4">
                <span className="absolute inset-0 rounded-full bg-accent shadow-[0_0_24px_rgba(255,106,43,0.9)]" />
                <motion.span
                  animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full bg-accent"
                />
              </span>
              <span className="font-display text-4xl md:text-5xl text-white">
                kauã.ritter
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="font-display italic text-base md:text-xl text-white/55"
            >
              Full Stack Developer
            </motion.div>

            <div className="mt-10 flex flex-col items-center gap-3">
              <div className="w-[220px] h-[2px] bg-white/10 rounded overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.9, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-sky-soft via-accent to-accent-deep"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
