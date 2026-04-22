import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";

type Project = {
  year: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  accent: "sky" | "accent" | "mix" | "green";
  images: { src: string; label: string }[];
  repo?: string;
  live?: string;
  status: string;
  statusTone: "live" | "dev" | "prod";
  stack: string[];
};

const projects: Project[] = [
  {
    year: "2026",
    title: "Urban Company · CRM",
    subtitle: "Mercado Imobiliário · SaaS Multi-tenant",
    tag: "Produto em Produção · Alto Volume",
    description:
      "CRM SaaS multi-tenant para o mercado imobiliário. Atuo end-to-end — da modelagem do banco e APIs até telas, bug fixes críticos, ganhos de performance e integrações com WhatsApp, e-mail transacional e webhooks.",
    accent: "accent",
    images: [{ src: "/projects/urban-crm.jpg", label: "urbancompany.com — Login" }],
    status: "Em produção",
    statusTone: "prod",
    stack: ["TypeScript", "Node.js", "React", "Prisma", "PostgreSQL"],
  },
  {
    year: "2025",
    title: "Pedal Sustentável",
    subtitle: "Guaíba · RS",
    tag: "Mobilidade Urbana · Projeto Social",
    description:
      "Plataforma de empréstimo gratuito de bicicletas compartilhadas em Guaíba/RS. Ano II do projeto — estações geolocalizadas, cadastro de usuários, controle de frota e alertas de disponibilidade em tempo real.",
    accent: "green",
    images: [
      { src: "/projects/pedal-landing.jpg", label: "pedalars.org — Landing" },
      { src: "/projects/pedal-stations.jpg", label: "App · Estações" },
    ],
    live: "https://pedalars.org/",
    status: "Em produção",
    statusTone: "live",
    stack: ["Web", "Geolocalização", "Mobilidade", "Sustentabilidade"],
  },
  {
    year: "2026",
    title: "Nidus Sentinela",
    subtitle: "Sistema de Proteção Integrada",
    tag: "Impacto Social · Plataforma SaaS",
    description:
      "Plataforma integrada de monitoramento e proteção de mulheres e crianças em situação de vulnerabilidade. RBAC multi-perfil, alertas em tempo real, gestão de casos e conformidade LGPD. Backend Node.js + PostgreSQL.",
    accent: "sky",
    images: [
      { src: "/projects/nidus-login.jpg", label: "Login · LGPD" },
      { src: "/projects/nidus-dashboard.jpg", label: "Dashboard · Casos" },
    ],
    status: "Em produção",
    statusTone: "prod",
    stack: ["Node.js", "PostgreSQL", "RBAC", "LGPD"],
  },
];

const accentGlow: Record<Project["accent"], string> = {
  sky: "from-sky-deep/45 via-sky/25 to-transparent",
  accent: "from-accent/40 via-accent-soft/15 to-transparent",
  mix: "from-sky/30 via-accent/20 to-transparent",
  green: "from-emerald-500/30 via-accent/15 to-transparent",
};

const statusTone: Record<Project["statusTone"], string> = {
  live: "text-emerald-400 [&_.dot]:bg-emerald-400",
  prod: "text-emerald-400 [&_.dot]:bg-emerald-400",
  dev: "text-accent-soft [&_.dot]:bg-accent",
};

function BrowserFrame({
  image,
  label,
  className = "",
}: {
  image: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl glass-strong overflow-hidden w-full ${className}`}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 md:py-2.5 border-b border-white/10 bg-white/[0.02]">
        <div className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-rose-500/70" />
        <div className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-amber-500/70" />
        <div className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-emerald-500/70" />
        <div className="ml-3 flex-1 h-5 md:h-6 rounded-md bg-white/[0.06] border border-white/10 flex items-center px-2.5 text-[9px] md:text-[10px] text-white/55 truncate">
          {label}
        </div>
      </div>
      <div className="relative aspect-[16/10] bg-ink-900 overflow-hidden">
        <img
          src={image}
          alt={label}
          loading="lazy"
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
}

function Frames({ images }: { images: Project["images"] }) {
  if (images.length === 1) {
    return (
      <div className="relative h-full w-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 4 }}
          whileInView={{ opacity: 1, y: 0, rotate: 2 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[640px]"
          style={{ transform: "rotate(2deg)" }}
        >
          <BrowserFrame
            image={images[0].src}
            label={images[0].label}
            className="shadow-[0_40px_110px_-25px_rgba(5,10,24,0.9)]"
          />
        </motion.div>
      </div>
    );
  }
  const [primary, secondary] = images;
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <div className="relative w-full max-w-[640px]">
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -6 }}
          whileInView={{ opacity: 1, y: 0, rotate: -5 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-6 -left-10 w-[82%] origin-bottom-right"
          style={{ transform: "rotate(-5deg)" }}
        >
          <BrowserFrame
            image={secondary.src}
            label={secondary.label}
            className="shadow-[0_30px_80px_-25px_rgba(5,10,24,0.8)] opacity-85"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 6 }}
          whileInView={{ opacity: 1, y: 0, rotate: 3 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full"
          style={{ transform: "rotate(3deg)" }}
        >
          <BrowserFrame
            image={primary.src}
            label={primary.label}
            className="shadow-[0_40px_110px_-25px_rgba(5,10,24,0.9)]"
          />
        </motion.div>
      </div>
    </div>
  );
}

function ProjectSlide({
  project,
  index,
  progress,
  total,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  total: number;
}) {
  const step = 1 / total;
  const center = (index + 0.5) * step;
  const scale = useTransform(
    progress,
    [center - step * 0.7, center, center + step * 0.7],
    [0.88, 1, 0.88]
  );
  const opacity = useTransform(
    progress,
    [center - step * 0.8, center, center + step * 0.8],
    [0.3, 1, 0.3]
  );
  const rotateY = useTransform(
    progress,
    [center - step * 0.7, center, center + step * 0.7],
    [10, 0, -10]
  );

  return (
    <motion.div
      style={{ scale, opacity }}
      className="shrink-0 w-screen h-screen flex items-center justify-center px-4 md:px-[5vw]"
    >
      <div
        className="relative w-full max-w-[1280px] h-[88vh] md:h-[80vh]"
        style={{ perspective: 1600 }}
      >
        <motion.div
          style={{ rotateY, transformStyle: "preserve-3d" }}
          className="relative w-full h-full rounded-[24px] md:rounded-[32px] overflow-hidden glass-strong"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${accentGlow[project.accent]} opacity-90 pointer-events-none`}
          />
          <div className="absolute inset-0 noise pointer-events-none" />
          <div className="absolute top-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="relative h-full grid grid-rows-[auto_1fr] md:grid-rows-none md:grid-cols-[1fr_1.15fr] gap-4 md:gap-12 p-5 md:p-14 overflow-y-auto md:overflow-hidden">
            <div className="order-2 md:order-1 flex flex-col justify-between min-h-0 gap-5 md:gap-0">
              <div>
                <div className="flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] tracking-[0.25em] md:tracking-[0.3em] uppercase text-white/55 flex-wrap">
                  <span className="text-accent">/0{index + 1}</span>
                  <span className="h-px w-8 md:w-10 bg-white/25" />
                  <span>{project.year}</span>
                  <span className="h-px w-8 md:w-10 bg-white/25" />
                  <span className={`inline-flex items-center gap-1.5 ${statusTone[project.statusTone]}`}>
                    <span className="dot h-1.5 w-1.5 rounded-full animate-pulse" />
                    {project.status}
                  </span>
                </div>
                <h3 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95] mt-4 md:mt-6 text-balance text-white">
                  {project.title}
                </h3>
                <div className="text-sm text-white/70 mt-2 md:mt-3 font-medium">
                  {project.subtitle}
                </div>
                <div className="text-[11px] md:text-xs text-white/55 mt-1.5 md:mt-2 tracking-wide">
                  {project.tag}
                </div>
              </div>
              <div>
                <p className="max-w-md text-white/80 text-sm md:text-lg leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-4 md:mt-6 flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[9px] md:text-[10px] tracking-wider uppercase text-white/75 px-2 md:px-2.5 py-1 rounded-full glass"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-5 md:mt-8 flex flex-wrap gap-3">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 text-sm text-white hover:text-accent transition-colors"
                    >
                      Acessar site
                      <span className="h-7 w-7 rounded-full glass flex items-center justify-center group-hover:border-accent/60 transition-all">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                    >
                      Repositório
                      <span className="h-7 w-7 rounded-full glass flex items-center justify-center group-hover:border-white/40 transition-all">
                        <Github className="h-3.5 w-3.5" />
                      </span>
                    </a>
                  )}
                  {!project.live && !project.repo && (
                    <div className="inline-flex items-center gap-2 text-xs md:text-sm text-white/60">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      Sistema privado — rodando em produção
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="md:hidden">
                <BrowserFrame
                  image={project.images[0].src}
                  label={project.images[0].label}
                  className="shadow-[0_20px_60px_-20px_rgba(5,10,24,0.8)]"
                />
              </div>
              <div className="hidden md:block h-full">
                <Frames images={project.images} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function DotIndicator({
  progress,
  range,
}: {
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const width = useTransform(progress, range, [8, 36]);
  const opacity = useTransform(progress, range, [0.3, 1]);
  return (
    <motion.div
      style={{ width, opacity }}
      className="h-[3px] rounded-full bg-accent"
    />
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(projects.length - 1) * 100}vw`]
  );
  const indicator = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="projetos"
      ref={ref}
      className="relative"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute top-[10vh] md:top-[12vh] left-0 right-0 flex items-end justify-between px-4 md:px-[5vw] z-20 pointer-events-none">
          <div>
            <div className="text-[10px] md:text-xs tracking-[0.3em] text-accent uppercase mb-2 md:mb-3">
              /02 Projetos
            </div>
            <h2 className="font-display text-2xl md:text-4xl leading-tight">
              Em <span className="italic text-white/55">produção.</span>
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2">
            <div className="text-[10px] tracking-[0.3em] uppercase text-white/40">
              Role para explorar
            </div>
            <div className="h-[2px] w-40 bg-white/10 rounded overflow-hidden">
              <motion.div
                style={{ width: indicator }}
                className="h-full bg-gradient-to-r from-sky-soft via-accent to-accent-deep"
              />
            </div>
          </div>
        </div>

        <motion.div style={{ x }} className="flex h-full will-change-transform">
          {projects.map((p, i) => (
            <ProjectSlide
              key={p.title}
              project={p}
              index={i}
              progress={scrollYProgress}
              total={projects.length}
            />
          ))}
        </motion.div>

        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {projects.map((_, i) => {
            const start = i / projects.length;
            const end = (i + 1) / projects.length;
            return (
              <DotIndicator
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
