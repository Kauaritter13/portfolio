import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const paragraph =
  "Engenharia da Computação na UERGS, com três frentes ativas em produção: CRM SaaS imobiliário na Urban Company, sistema social de proteção na Nidus Software e P&D de máquinas industriais na Flesch Tech. Atuo do backend à interface, do banco ao hardware, sempre com foco em produto que vive em ambiente real.";

const words = paragraph.split(" ");

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block mr-[0.22em] mb-[0.1em]"
    >
      {children}
    </motion.span>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });

  return (
    <section
      id="sobre"
      ref={ref}
      className="relative py-32 md:py-56 px-5 md:px-6"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-[320px,1fr] gap-10 md:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="md:sticky md:top-32 h-max"
        >
          <div className="glass rounded-liquid p-6 md:p-7">
            <div className="text-xs tracking-[0.3em] text-accent uppercase mb-4">
              /01 Sobre
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-tight">
              Um pouco <br />
              <span className="italic text-white/55">sobre mim.</span>
            </h2>
            <div className="mt-6 space-y-2 text-xs text-white/55">
              <div className="flex items-center gap-2">
                <span className="text-white/35">📍</span>
                Guaíba · Rio Grande do Sul
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/35">🎓</span>
                Eng. da Computação · UERGS · 5º sem
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/35">💼</span>
                3 empresas em paralelo
              </div>
              <div className="flex items-center gap-2 pt-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400/80">
                  Sistemas em produção
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="text-xl md:text-[2.2rem] font-light leading-[1.45] tracking-tight text-balance text-white/95">
          {words.map((w, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {w}
              </Word>
            );
          })}
        </div>
      </div>
    </section>
  );
}
