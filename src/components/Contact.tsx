import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Github, Instagram, Linkedin, MessageCircle } from "lucide-react";

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "WhatsApp",
    href: "https://wa.me/5551996601565",
    primary: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "/in/kauaritter",
    href: "https://www.linkedin.com/in/kauaritter/",
    primary: false,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@Kauaritter13",
    href: "https://github.com/Kauaritter13",
    primary: false,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@RitterKaua",
    href: "https://github.com/RitterKaua",
    primary: false,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@silvaritter_",
    href: "https://www.instagram.com/silvaritter_/",
    primary: false,
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 0.8], [60, 0]);

  return (
    <section
      id="contato"
      ref={ref}
      className="relative py-44 md:py-56 px-6 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none -z-[1]"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[700px] bg-accent/30 blur-[170px] rounded-full" />
        <div className="absolute top-1/3 left-[20%] -translate-y-1/2 w-[700px] h-[500px] bg-sky/30 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[600px] h-[500px] bg-accent-soft/25 blur-[140px] rounded-full" />
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-sky-soft/20 blur-[130px] rounded-full" />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/40 blur-[120px] rounded-full"
        />
      </div>

      <motion.div
        style={{ scale, y }}
        className="relative max-w-6xl mx-auto text-center"
      >
        <div className="text-xs tracking-[0.3em] text-accent uppercase mb-6">
          /06 Vamos conversar
        </div>
        <h2 className="font-display text-[clamp(3rem,13vw,11rem)] leading-[1] tracking-tighter text-balance pb-[0.15em]">
          <span className="block text-white">Um próximo</span>
          <span className="block italic text-gradient-warm pb-[0.1em]">
            projeto juntos?
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 max-w-lg mx-auto text-white/75 text-lg leading-relaxed"
        >
          Aberto a colaborações, oportunidades full stack e projetos com
          propósito. A porta de entrada mais rápida é pelo WhatsApp.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {channels.map((c) =>
            c.primary ? (
              <a
                key={c.label + c.value}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="liquid-pill btn-accent-liquid group h-14 px-8 inline-flex items-center gap-3 rounded-full font-medium"
              >
                <c.icon className="h-5 w-5" />
                {c.label}
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ) : (
              <a
                key={c.label + c.value}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="liquid-pill group h-14 px-6 inline-flex items-center gap-3 rounded-full glass hover:brightness-110 transition-all"
              >
                <c.icon className="h-4 w-4 text-white/75 group-hover:text-accent transition-colors" />
                <span className="text-sm">{c.value}</span>
              </a>
            )
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-xs text-white/55"
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Resposta rápida
          </div>
          <div className="h-3 w-px bg-white/15" />
          <div>UTC -3 · Rio Grande do Sul, Brasil</div>
        </motion.div>
      </motion.div>
    </section>
  );
}
