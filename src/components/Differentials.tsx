import { motion } from "framer-motion";
import { Factory, Workflow, HeartHandshake, Cpu } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";

const items = [
  {
    icon: Factory,
    title: "Sistemas em produção",
    desc: "Três produtos rodando em ambientes reais — CRM SaaS imobiliário, sistema social de proteção e máquinas industriais.",
    tint: "accent",
  },
  {
    icon: Cpu,
    title: "Do software ao silício",
    desc: "Arduino, sensores, visão computacional e inspeção PTH/SMT. Entendo o stack inteiro.",
    tint: "sky",
  },
  {
    icon: Workflow,
    title: "Automação de processos",
    desc: "Fluxos n8n, integrações com WhatsApp/ERP e webhooks. Manual vira pipeline.",
    tint: "accent",
  },
  {
    icon: HeartHandshake,
    title: "Impacto social",
    desc: "Nidus Sentinela protege vulneráveis. Pedal Sustentável serve mobilidade. Código que resolve.",
    tint: "sky",
  },
];

const tintGlow: Record<string, string> = {
  sky: "group-hover:bg-sky/25",
  accent: "group-hover:bg-accent/25",
};

const tintIcon: Record<string, string> = {
  sky: "text-sky-soft",
  accent: "text-accent",
};

export default function Differentials() {
  return (
    <section className="relative py-20 md:py-28 px-5 md:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mb-10 md:mb-12"
        >
          <div className="text-[10px] tracking-[0.3em] text-accent uppercase mb-3">
            /05 Diferenciais
          </div>
          <h2 className="font-display text-2xl md:text-4xl leading-[1.05] tracking-tight">
            Como eu <span className="italic text-white/55">entrego valor.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-2.5 md:gap-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <SpotlightCard className="group rounded-2xl glass lift-hover p-4 md:p-5 overflow-hidden h-full">
                <div
                  className={`absolute -top-12 -right-12 h-28 w-28 rounded-full blur-3xl transition-all duration-700 bg-white/0 ${tintGlow[item.tint]}`}
                />
                <div className="relative flex items-start gap-3">
                  <div className="shrink-0 h-8 w-8 rounded-lg glass-strong flex items-center justify-center">
                    <item.icon className={`h-3.5 w-3.5 ${tintIcon[item.tint]}`} />
                  </div>
                  <div>
                    <h3 className="font-display text-base md:text-lg leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/65 mt-1.5 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
