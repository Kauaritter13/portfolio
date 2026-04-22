import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.8], ["blur(0px)", "blur(6px)"]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-28 pb-16 md:pt-0 md:pb-0"
    >
      <motion.div
        style={{ y, scale, opacity, filter: blur }}
        className="relative z-10 text-center px-5 md:px-6 max-w-[1400px] mx-auto w-full"
      >
        <motion.h1
          initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="font-display leading-[0.9] tracking-tight text-[clamp(2.8rem,12vw,11rem)] text-balance"
        >
          <span className="block text-white">Kauã Ritter</span>
          <motion.span
            initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
            className="block italic font-normal text-gradient-warm"
          >
            da Silva
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 md:mt-10 max-w-xl mx-auto text-white/65 text-sm md:text-lg leading-relaxed px-2"
        >
          Engenharia da Computação · Desenvolvedor Full Stack com 3 sistemas
          em produção — CRM SaaS imobiliário, plataforma social de proteção e
          P&D em máquinas industriais. Do banco ao hardware.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 md:mt-10 flex items-center justify-center gap-3 flex-wrap"
        >
          <Button asChild variant="accent" size="lg">
            <a href="#projetos">Ver projetos</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#contato">Contato direto</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.25 }}
          className="mt-12 md:mt-20 grid grid-cols-3 gap-2 md:gap-3 max-w-2xl mx-auto"
        >
          {[
            { label: "Em produção", value: "3 sistemas ativos" },
            { label: "Stack", value: "TS · Node · React · PG" },
            { label: "Base", value: "Guaíba · RS" },
          ].map((item) => (
            <div
              key={item.label}
              className="glass glass-interactive rounded-3xl px-3 py-2.5 md:px-4 md:py-3 text-left lift-hover"
            >
              <div className="text-[8px] md:text-[10px] tracking-widest uppercase text-white/40">
                {item.label}
              </div>
              <div className="text-[11px] md:text-sm text-white/80 mt-0.5 md:mt-1 truncate">
                {item.value}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-[10px] tracking-[0.3em] uppercase z-10"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3 w-3" />
        </motion.div>
      </motion.div>
    </section>
  );
}
