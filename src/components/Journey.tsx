import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SpotlightCard from "@/components/SpotlightCard";

type Step = {
  period: string;
  role: string;
  company: string;
  location: string;
  desc: string;
  bullets: string[];
  stack?: string[];
  color: string;
  active?: boolean;
};

const steps: Step[] = [
  {
    period: "mar 2026 — atual",
    role: "Desenvolvedor Full Stack Júnior",
    company: "Urban Company",
    location: "Porto Alegre · RS · Remoto",
    desc:
      "CRM SaaS multi-tenant para o mercado imobiliário, em produção e com alto volume. Entregas end-to-end, estabilidade em produção e evolução contínua de arquitetura.",
    bullets: [
      "Modelagem de banco, APIs e implementação de telas",
      "Correções de bugs críticos e melhorias de performance",
      "Integrações com WhatsApp, e-mail transacional e webhooks",
    ],
    stack: ["TypeScript", "Node.js", "React", "Prisma", "PostgreSQL"],
    color: "from-accent to-accent-soft",
    active: true,
  },
  {
    period: "mai 2025 — atual",
    role: "Software Developer",
    company: "Nidus Software",
    location: "Guaíba · RS",
    desc:
      "Sistema web seguro para atendimento social e proteção de públicos vulneráveis. Rodando em produção com múltiplos perfis institucionais.",
    bullets: [
      "RBAC multi-perfil com regras específicas por usuário",
      "Modelagem de banco com foco em integridade e LGPD",
      "Decisões de arquitetura e estruturação de backend",
    ],
    stack: ["Node.js", "PostgreSQL", "TypeScript", "RBAC"],
    color: "from-sky to-sky-soft",
    active: true,
  },
  {
    period: "jan 2025 — atual",
    role: "Software Developer",
    company: "Flesch Tech",
    location: "Guaíba · RS · Presencial",
    desc:
      "P&D de máquinas para a indústria eletrônica com contato direto com software, hardware e processos industriais em produção.",
    bullets: [
      "Sistemas de inspeção PTH/SMT e visão computacional",
      "Algoritmos de inspeção e automação de rotinas",
      "Integração entre módulos de máquina e dispositivos",
    ],
    stack: ["Python", "C/C++", "Visão Computacional", "Automação"],
    color: "from-sky-deep to-sky",
    active: true,
  },
  {
    period: "2024 — em andamento",
    role: "Engenharia da Computação",
    company: "UERGS · 5º semestre",
    location: "Universidade Estadual do Rio Grande do Sul",
    desc:
      "Bacharelado em andamento. Base em arquitetura, eletrônica embarcada, sistemas digitais e programação de baixo nível (MIPS, NASM).",
    bullets: [],
    color: "from-sky-ice to-sky-soft",
  },
];

export default function Journey() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="jornada" ref={ref} className="relative py-32 md:py-40 px-5 md:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20"
        >
          <div className="text-[10px] md:text-xs tracking-[0.3em] text-accent uppercase mb-4">
            /04 Jornada
          </div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight">
            Construindo{" "}
            <span className="italic text-white/55">em produção.</span>
          </h2>
          <p className="mt-5 text-white/60 max-w-xl text-sm md:text-base leading-relaxed">
            Três frentes ativas em paralelo — CRM SaaS imobiliário, sistema social
            de proteção integrada e P&D em máquinas industriais. Tudo em ambientes
            reais, com usuários reais.
          </p>
        </motion.div>

        <div className="relative pl-10 md:pl-12">
          <div className="absolute left-3 md:left-4 top-2 bottom-2 w-px bg-white/10" />
          <motion.div
            style={{ height }}
            className="absolute left-3 md:left-4 top-2 w-px bg-gradient-to-b from-accent via-sky to-sky-ice/0"
          />
          <div className="space-y-6">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div
                  className={`absolute -left-[2.35rem] md:-left-[2.6rem] top-7 md:top-8 h-3.5 w-3.5 rounded-full bg-gradient-to-br ${s.color} shadow-[0_0_24px_rgba(255,106,43,0.6)] ring-4 ring-ink-950 z-10`}
                />
                <SpotlightCard className="glass rounded-liquid lift-hover p-5 md:p-7">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-xs md:text-sm font-mono text-white/45 tracking-wider">
                      {s.period}
                    </span>
                    {s.active && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Em produção
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl md:text-2xl mt-2 leading-tight text-white">
                    {s.role}
                  </h3>
                  <div className="text-sm text-white/70 mt-1 font-medium">
                    {s.company}
                  </div>
                  <div className="text-[11px] text-white/45 mt-0.5">
                    {s.location}
                  </div>
                  <p className="text-white/65 mt-4 text-sm md:text-base leading-relaxed">
                    {s.desc}
                  </p>
                  {s.bullets.length > 0 && (
                    <ul className="mt-4 space-y-1.5">
                      {s.bullets.map((b) => (
                        <li
                          key={b}
                          className="text-xs md:text-sm text-white/60 flex items-start gap-2.5"
                        >
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.stack && s.stack.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {s.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] md:text-[10px] tracking-wider uppercase text-white/70 px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
