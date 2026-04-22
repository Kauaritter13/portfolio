import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SpotlightCard from "@/components/SpotlightCard";

function Counter({
  value,
  suffix = "",
  duration = 1600,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    function step(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.floor(eased * value));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

const items = [
  { value: 3, suffix: "", label: "Sistemas em produção" },
  { value: 3, suffix: "", label: "Empresas em paralelo" },
  { value: 5, suffix: "º", label: "Semestre · Eng. Comp." },
  { value: 100, suffix: "%", label: "Produto real · users reais" },
];

export default function Stats() {
  return (
    <section className="relative py-10 md:py-16 px-5 md:px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.6,
              delay: i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <SpotlightCard className="glass rounded-2xl lift-hover p-3 md:p-4 text-center overflow-hidden h-full">
              <div className="relative font-display text-2xl md:text-3xl leading-none text-gradient-warm">
                <Counter value={item.value} suffix={item.suffix} />
              </div>
              <div className="relative text-[8px] md:text-[10px] text-white/60 mt-2 uppercase tracking-[0.18em] leading-tight">
                {item.label}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
