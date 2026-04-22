import { motion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";

const groups = [
  {
    title: "Frontend",
    index: "01",
    tint: "sky",
    items: ["React", "Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
  },
  {
    title: "Backend",
    index: "02",
    tint: "accent",
    items: ["Node.js · Express", "FastAPI", "APIs REST", "RBAC · Auth"],
  },
  {
    title: "Banco de Dados",
    index: "03",
    tint: "sky",
    items: ["PostgreSQL", "MySQL", "SQLite", "Prisma"],
  },
  {
    title: "Infra & Integrações",
    index: "04",
    tint: "accent",
    items: ["Docker · Compose", "Git · GitHub", "Linux · VPS", "n8n · WhatsApp"],
  },
  {
    title: "Hardware",
    index: "05",
    tint: "sky",
    items: ["Arduino", "Sensores", "Visão Computacional", "PTH · SMT"],
  },
  {
    title: "Baixo Nível",
    index: "06",
    tint: "accent",
    items: ["C · C++", "Python", "Assembly MIPS/NASM", "Circuitos"],
  },
];

const tintGlow: Record<string, string> = {
  sky: "group-hover:bg-sky/30",
  accent: "group-hover:bg-accent/30",
};

const tintDot: Record<string, string> = {
  sky: "bg-sky-soft shadow-[0_0_8px_rgba(96,165,250,0.9)]",
  accent: "bg-accent shadow-[0_0_8px_rgba(255,106,43,0.9)]",
};

export default function Skills() {
  return (
    <section id="stack" className="relative py-20 md:py-24 px-5 md:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mb-10 md:mb-12"
        >
          <div className="text-[10px] tracking-[0.3em] text-accent uppercase mb-3">
            /03 Stack
          </div>
          <h2 className="font-display text-2xl md:text-4xl leading-[1.05] tracking-tight">
            Stack completa — <br />
            <span className="italic text-white/55">
              do frontend ao silício.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-3">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 0.6,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <SpotlightCard className="group rounded-2xl glass lift-hover p-4 overflow-hidden h-full">
                <div
                  className={`absolute -top-14 -right-14 h-28 w-28 rounded-full blur-3xl transition-all duration-700 bg-white/0 ${tintGlow[g.tint]}`}
                />
                <div className="relative">
                  <div className="text-[9px] tracking-widest text-white/40 uppercase">
                    {g.index}
                  </div>
                  <h3 className="font-display text-base md:text-lg mt-1.5 leading-tight">
                    {g.title}
                  </h3>
                  <ul className="mt-3 space-y-1.5">
                    {g.items.map((item, idx) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -6 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.35,
                          delay: i * 0.05 + idx * 0.04 + 0.15,
                        }}
                        className="text-[11px] md:text-xs text-white/70 flex items-center gap-2 leading-tight"
                      >
                        <span
                          className={`h-1 w-1 rounded-full ${tintDot[g.tint]} shrink-0`}
                        />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
