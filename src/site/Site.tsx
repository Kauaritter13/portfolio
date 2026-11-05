import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Brain,
  Github,
  GitBranch,
  Linkedin,
  Menu,
  MessageCircle,
  ShieldCheck,
  Workflow,
  X,
} from "lucide-react";
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import type { Content, Project } from "./content";

const Scene3D = lazy(() => import("./Scene3D"));

const ease = [0.22, 1, 0.36, 1] as const;

const links = {
  linkedin: "https://www.linkedin.com/in/kauaritter/",
  github: "https://github.com/Kauaritter13",
  whatsapp: "https://wa.me/5551996601565",
};

const practiceIcons = [Brain, Workflow, GitBranch, ShieldCheck];

/* ------------------------------------------------------------ helpers */

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Label({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-white/50 mb-6">
      <span className="text-white">{n}</span>
      <span className="h-px w-10 bg-white/30" />
      {children}
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[10px] tracking-wider uppercase text-white/70 px-2 py-1 border border-white/15">
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- Nav */

function Nav({ c }: { c: Content }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items = [
    ["#agents", c.nav.agents],
    ["#work", c.nav.work],
    ["#experience", c.nav.experience],
    ["#contact", c.nav.contact],
  ] as const;

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/95 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-5 md:px-6 h-14 flex items-center justify-between">
        <a href="#top" onClick={() => setOpen(false)} className="font-mono text-sm text-white tracking-tight">
          kaua<span className="text-white/40">.ritter</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 font-mono text-[11px] uppercase tracking-[0.15em] text-white/55">
          {items.slice(0, 3).map(([href, label]) => (
            <a key={href} href={href} className="hover:text-white transition-colors">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a href={c.otherLang.href} className="font-mono text-[11px] text-white/45 hover:text-white transition-colors">
            {c.otherLang.label}
          </a>
          <a href="#contact" className="hidden md:inline-block font-mono text-[11px] uppercase tracking-[0.15em] px-4 py-2 bg-white text-black hover:bg-white/80 transition-colors">
            {c.nav.contact}
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? c.closeMenu : c.openMenu}
            aria-expanded={open}
            className="md:hidden -mr-2 p-2 text-white"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden fixed inset-x-0 top-14 bottom-0 bg-black border-t border-white/10 px-5 pt-4 flex flex-col overflow-y-auto">
          {items.map(([href, label], i) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-4 border-b border-white/10">
              <span className="font-mono text-[11px] text-white/35">0{i + 1}</span>
              <span className="font-display text-4xl text-white">{label}</span>
            </a>
          ))}
          <div className="mt-auto py-8 flex gap-3">
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 py-3 border border-white/25 text-sm">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a href={links.whatsapp} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-white text-black text-sm">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

/* ----------------------------------------------------------------- 3D */

/** WebGL only on wide screens with decent hardware; everything else gets a static SVG. */
function useCan3D() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cores = navigator.hardwareConcurrency ?? 8;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    const update = () => setOk(wide.matches && !reduced && cores > 4 && mem > 4);
    update();
    wide.addEventListener("change", update);
    return () => wide.removeEventListener("change", update);
  }, []);
  return ok;
}

/** Static wireframe (projected icosahedron) — zero runtime cost. */
function StaticWire({ className = "" }: { className?: string }) {
  const p = (1 + Math.sqrt(5)) / 2;
  const v = [
    [-1, p, 0], [1, p, 0], [-1, -p, 0], [1, -p, 0],
    [0, -1, p], [0, 1, p], [0, -1, -p], [0, 1, -p],
    [p, 0, -1], [p, 0, 1], [-p, 0, -1], [-p, 0, 1],
  ];
  const ry = 0.6, rx = 0.35;
  const pts = v.map(([x, y, z]) => {
    const x1 = x * Math.cos(ry) + z * Math.sin(ry);
    const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
    const y1 = y * Math.cos(rx) - z1 * Math.sin(rx);
    return [x1 * 52, y1 * 52];
  });
  const edges: [number, number][] = [];
  for (let i = 0; i < 12; i++)
    for (let j = i + 1; j < 12; j++) {
      const d = Math.hypot(v[i][0] - v[j][0], v[i][1] - v[j][1], v[i][2] - v[j][2]);
      if (Math.abs(d - 2) < 0.01) edges.push([i, j]);
    }
  return (
    <svg viewBox="-160 -160 320 320" className={className} aria-hidden>
      <ellipse cx="0" cy="0" rx="150" ry="46" fill="none" stroke="white" strokeOpacity="0.18" transform="rotate(-18)" />
      {edges.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke="white" strokeOpacity="0.55" strokeWidth="0.8" />
      ))}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill="white" />
      ))}
    </svg>
  );
}

/* --------------------------------------------------------------- Hero */

function Hero({ c }: { c: Content }) {
  const can3D = useCan3D();
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center px-5 md:px-6 pt-24 pb-16 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-[0.07]" />
      {can3D ? (
        <Suspense fallback={null}>
          <Scene3D className="absolute right-0 top-14 bottom-0 w-[46%] pointer-events-none" />
        </Suspense>
      ) : (
        <StaticWire className="absolute -right-24 top-16 w-[340px] opacity-30 lg:opacity-70 lg:right-[4%] lg:top-1/2 lg:-translate-y-1/2 lg:w-[520px] pointer-events-none" />
      )}

      <div className="relative max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 border border-white/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-white/70"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          {c.hero.badge}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="font-display text-[3.2rem] sm:text-7xl md:text-[6.5rem] leading-[0.9] tracking-tight mt-8 max-w-3xl"
        >
          {c.hero.line1}
          <span className="block italic text-white/45">{c.hero.line2}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          className="mt-8 text-white/65 text-base md:text-lg leading-relaxed max-w-xl"
        >
          {c.hero.text}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease }}
          className="mt-10 grid grid-cols-2 sm:flex sm:flex-wrap gap-3"
        >
          <a href="#work" className="col-span-2 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium hover:bg-white/85 transition-colors">
            {c.hero.cta} <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/25 text-sm hover:border-white transition-colors">
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <a href={links.github} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/25 text-sm hover:border-white transition-colors">
            <Github className="h-4 w-4" /> GitHub
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-14 md:mt-16 grid grid-cols-3 max-w-lg border-t border-white/15"
        >
          {c.hero.stats.map(([n, l]) => (
            <div key={l} className="pt-5 pr-3">
              <div className="font-mono text-2xl md:text-3xl text-white">{n}</div>
              <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider text-white/45 leading-snug mt-2">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Agents */

function Terminal({ lines }: { lines: string[] }) {
  const tone = (l: string) =>
    l.startsWith(">") || l.startsWith("  ") && !l.includes("✓") ? "text-white/55" : l.startsWith("●") ? "text-white/85" : "text-white";
  return (
    <div className="border border-white/15 bg-black">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10">
        <div className="h-2.5 w-2.5 rounded-full border border-white/40" />
        <div className="h-2.5 w-2.5 rounded-full border border-white/40" />
        <div className="h-2.5 w-2.5 rounded-full bg-white/80" />
        <span className="ml-3 text-[10px] text-white/40 font-mono">~/crion/web — claude code</span>
      </div>
      <div className="p-4 md:p-5 font-mono text-[10.5px] md:text-[12px] leading-relaxed overflow-x-auto">
        {lines.map((l, i) => (
          <div key={i} className={`${tone(l)} whitespace-pre`}>
            {l}
          </div>
        ))}
        <span className="inline-block w-2 h-4 bg-white align-middle mt-1 animate-pulse" />
      </div>
    </div>
  );
}

function Agents({ c }: { c: Content }) {
  return (
    <section id="agents" className="relative py-24 md:py-40 px-5 md:px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-12 items-end">
          <Reveal>
            <Label n="01">{c.agents.label}</Label>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight max-w-3xl">
              {c.agents.h1} <span className="italic text-white/45">{c.agents.h2}</span> {c.agents.h3}
            </h2>
            <p className="mt-6 text-white/55 max-w-2xl text-sm md:text-base leading-relaxed">{c.agents.text}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <Terminal lines={c.terminal} />
          </Reveal>
        </div>
        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {c.agents.practices.map((p, i) => {
            const Icon = practiceIcons[i];
            return (
              <Reveal key={p.title} delay={(i % 2) * 0.06} className="bg-black">
                <div className="p-6 md:p-9 h-full hover:bg-white/[0.03] transition-colors">
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
                    <span className="font-mono text-[10px] text-white/30">0{i + 1}</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl mt-5 md:mt-6 text-white">{p.title}</h3>
                  <p className="mt-3 text-sm md:text-[15px] text-white/55 leading-relaxed">{p.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Claude Code", "Claude API", "MCP", "Hooks", "Subagents", "Skills", "Obsidian"].map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Work */

function Cover({ title, idx, note }: { title: string; idx: number; note: string }) {
  const initials = title
    .split(/[\s·]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-black border-b border-white/10">
      <div className="absolute inset-0 bg-grid opacity-[0.12]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-display italic text-[7.5rem] sm:text-[9rem] md:text-[11rem] leading-none text-transparent select-none"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.55)" }}
        >
          {initials}
        </span>
      </div>
      <div className="absolute left-4 top-4 font-mono text-[10px] text-white/40">/{String(idx + 1).padStart(2, "0")}</div>
      <div className="absolute right-4 bottom-4 font-mono text-[10px] text-white/40 uppercase tracking-widest">{note}</div>
    </div>
  );
}

function Shots({ images, title }: { images: NonNullable<Project["images"]>; title: string }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-black border-b border-white/10">
      <img
        src={images[0].src}
        alt={`${title} — ${images[0].label}`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-top grayscale transition-[filter] duration-500 group-hover:grayscale-0"
      />
      {images[1] && (
        <img
          src={images[1].src}
          alt={`${title} — ${images[1].label}`}
          loading="lazy"
          decoding="async"
          className="absolute right-3 bottom-3 w-[38%] aspect-[16/10] object-cover object-top border border-white/30 grayscale transition-[filter] duration-500 group-hover:grayscale-0"
        />
      )}
      <div className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-widest bg-black/80 px-2 py-1 text-white/70">
        {images[0].label}
      </div>
    </div>
  );
}

function ProjectCard({ p, i, c }: { p: Project; i: number; c: Content }) {
  const Wrapper = p.href ? "a" : "div";
  return (
    <Reveal delay={(i % 2) * 0.06}>
      <article className="group border border-white/10 bg-white/[0.02] hover:border-white/30 transition-colors duration-300 h-full flex flex-col">
        <Wrapper {...(p.href ? { href: p.href, target: "_blank", rel: "noreferrer" } : {})} className="block">
          {p.images ? <Shots images={p.images} title={p.title} /> : <Cover title={p.title} idx={i} note={c.work.noShot} />}
        </Wrapper>
        <div className="p-5 md:p-7 flex flex-col flex-1">
          <div className="flex items-center justify-between gap-3 font-mono text-[10px] tracking-[0.15em] uppercase">
            <span className="text-white/35">{String(i + 1).padStart(2, "0")}</span>
            <span className="inline-flex items-center gap-1.5 text-white/60">
              <span className={`h-1.5 w-1.5 rounded-full ${p.live ? "bg-white" : "border border-white/50"}`} />
              {p.status}
            </span>
          </div>
          <h3 className="font-display text-3xl md:text-4xl mt-3 text-white">{p.title}</h3>
          <div className="font-mono text-[11px] text-white/45 mt-1">{p.kind}</div>
          <p className="mt-5 text-sm text-white/70 leading-relaxed">{p.text}</p>
          <ul className="mt-4 space-y-2">
            {p.points.map((pt) => (
              <li key={pt} className="text-[13px] text-white/55 flex items-start gap-3 leading-relaxed">
                <span className="mt-[9px] h-px w-3 bg-white/50 shrink-0" />
                {pt}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-6 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
          {p.href && (
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex items-center justify-between gap-3 border border-white/25 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] hover:bg-white hover:text-black transition-colors"
            >
              <span>{c.work.live}</span>
              <span className="inline-flex items-center gap-1.5 normal-case tracking-normal text-current opacity-70">
                {p.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}

function Work({ c }: { c: Content }) {
  const main = c.projects.filter((p) => !p.compact);
  const more = c.projects.filter((p) => p.compact);
  return (
    <section id="work" className="relative py-24 md:py-40 px-5 md:px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Label n="02">{c.work.label}</Label>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
            {c.work.h1} <span className="italic text-white/45">{c.work.h2}</span>
          </h2>
          <p className="mt-6 text-white/55 max-w-2xl text-sm md:text-base leading-relaxed">{c.work.text}</p>
        </Reveal>
        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-4 md:gap-5">
          {main.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} c={c} />
          ))}
        </div>
        {more.length > 0 && (
          <div className="mt-10 border-t border-white/15">
            <div className="py-4 font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">{c.work.more}</div>
            {more.map((p, i) => {
              const Row = p.href ? "a" : "div";
              return (
                <Row
                  key={p.title}
                  {...(p.href ? { href: p.href, target: "_blank", rel: "noreferrer" } : {})}
                  className={`grid md:grid-cols-[48px_220px_1fr_auto] gap-1 md:gap-6 py-5 border-t border-white/10 items-baseline ${p.href ? "group hover:bg-white/[0.03]" : ""}`}
                >
                  <span className="font-mono text-[10px] text-white/35">{String(main.length + i + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="font-display text-2xl text-white">{p.title}</div>
                    <div className="font-mono text-[10px] text-white/45 mt-0.5">{p.kind}</div>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed mt-2 md:mt-0">{p.text}</p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/50 inline-flex items-center gap-1.5 mt-2 md:mt-0 whitespace-nowrap">
                    {p.href ? (
                      <>
                        {c.work.live} <ArrowUpRight className="h-3.5 w-3.5 group-hover:text-white" />
                      </>
                    ) : (
                      p.status
                    )}
                  </span>
                </Row>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Experience */

function Experience({ c }: { c: Content }) {
  return (
    <section id="experience" className="relative py-24 md:py-40 px-5 md:px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Label n="03">{c.exp.label}</Label>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
            {c.exp.h1} <span className="italic text-white/45">{c.exp.h2}</span>
          </h2>
        </Reveal>
        <div className="mt-12 md:mt-16 border-t border-white/15">
          {c.exp.items.map((e) => (
            <div key={e.role + e.org} className="grid md:grid-cols-[200px_1fr_1.2fr] gap-2 md:gap-8 py-7 md:py-8 border-b border-white/15">
              <div className="font-mono text-xs text-white/45 tracking-wider pt-1">{e.period}</div>
              <div>
                <h3 className="font-display text-2xl md:text-3xl text-white">{e.role}</h3>
                <div className="font-mono text-[11px] text-white/50 mt-1">{e.org}</div>
              </div>
              <p className="text-sm text-white/55 leading-relaxed">{e.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          {["TypeScript", "Node.js", "Express", "React", "Next.js", "PostgreSQL", "Prisma", "Drizzle", "Python", "Flask", "PyTorch", "OpenCV", "C/C++", "Vercel", "nginx"].map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
        <div className="mt-5 font-mono text-[11px] uppercase tracking-wider text-white/45">{c.exp.languages}</div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Contact */

function Contact({ c }: { c: Content }) {
  const channels = [
    { icon: Linkedin, label: "LinkedIn", value: "/in/kauaritter", href: links.linkedin },
    { icon: Github, label: "GitHub", value: "@Kauaritter13", href: links.github },
    { icon: MessageCircle, label: "WhatsApp", value: "+55 51 99660-1565", href: links.whatsapp },
  ];
  return (
    <section id="contact" className="relative py-24 md:py-44 px-5 md:px-6 border-t border-white/10 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <Label n="04">{c.contact.label}</Label>
          <h2 className="font-display text-6xl md:text-[9rem] leading-[0.9] tracking-tight">
            {c.contact.h1} <span className="italic text-white/45">{c.contact.h2}</span>
          </h2>
          <p className="mt-8 text-white/60 max-w-xl leading-relaxed">{c.contact.text}</p>
        </Reveal>
        <div className="mt-12 md:mt-14 grid sm:grid-cols-3 gap-px bg-white/15 border border-white/15">
          {channels.map((ch) => (
            <a key={ch.label} href={ch.href} target="_blank" rel="noreferrer" className="bg-black p-6 md:p-7 group hover:bg-white hover:text-black transition-colors">
              <ch.icon className="h-5 w-5" strokeWidth={1.5} />
              <div className="mt-6 md:mt-8 font-mono text-[10px] tracking-[0.2em] uppercase opacity-50">{ch.label}</div>
              <div className="mt-1 flex items-center justify-between">
                {ch.value}
                <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
              </div>
            </a>
          ))}
        </div>
      </div>
      <footer className="relative max-w-6xl mx-auto mt-20 md:mt-28 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-2 justify-between font-mono text-[11px] text-white/40">
        <span>{c.contact.footer}</span>
        <span>{c.contact.built}</span>
      </footer>
    </section>
  );
}

export default function Site({ c }: { c: Content }) {
  return (
    <main className="relative text-white bg-black min-h-screen">
      <Nav c={c} />
      <Hero c={c} />
      <Agents c={c} />
      <Work c={c} />
      <Experience c={c} />
      <Contact c={c} />
    </main>
  );
}
