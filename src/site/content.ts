import { projectsEn, projectsPt } from "./projects";

const base = import.meta.env.BASE_URL;

export type Lang = "en" | "pt";

export type Project = {
  title: string;
  kind: string;
  text: string;
  points: string[];
  stack: string[];
  status: string;
  live?: boolean;
  images?: { src: string; label: string }[];
  href?: string;
  compact?: boolean;
};

export type Content = {
  lang: Lang;
  otherLang: { label: string; href: string };
  nav: { agents: string; work: string; experience: string; contact: string };
  openMenu: string;
  closeMenu: string;
  hero: { badge: string; line1: string; line2: string; text: string; cta: string; stats: [string, string][] };
  terminal: string[];
  agents: { label: string; h1: string; h2: string; h3: string; text: string; practices: { title: string; text: string }[] };
  work: { label: string; h1: string; h2: string; text: string; live: string; noShot: string; more: string };
  projects: Project[];
  exp: { label: string; h1: string; h2: string; items: { period: string; role: string; org: string; text: string }[]; languages: string };
  contact: { label: string; h1: string; h2: string; text: string; footer: string; built: string };
};

/* ================================================================= EN */

export const en: Content = {
  lang: "en",
  otherLang: { label: "PT", href: base },
  nav: { agents: "How I work", work: "Work", experience: "Experience", contact: "Contact" },
  openMenu: "Open menu",
  closeMenu: "Close menu",
  hero: {
    badge: "Open to full-time roles · remote · UTC−3",
    line1: "Kauã Ritter",
    line2: "ships with agents.",
    text: "Full stack developer and Computer Engineering student from Brazil. I build secure, multi-tenant software that runs in production. I can write all of it by hand — solid fundamentals, from C and assembly to system design — but I ship faster with Claude Code. I own the architecture, the logic and every merge.",
    cta: "See the work",
    stats: [
      ["09", "systems live in production"],
      ["16", "projects on this page"],
      ["03", "agent tools I built"],
    ],
  },
  terminal: [
    "$ claude",
    "> read CLAUDE.md + vault/decisions, then add tenant-",
    "  scoped audit logging to /api/vehicles. Deny by default.",
    "● Reading 4 files · planning",
    "● Edit  src/server/audit.ts",
    "● Edit  src/app/api/vehicles/route.ts",
    "● Bash  npm run typecheck && npm test",
    "  ✓ typecheck ok · tests passed",
    "> review diff → I own the merge.",
  ],
  agents: {
    label: "How I work",
    h1: "Coding agents are my",
    h2: "default workflow,",
    h3: "not an experiment.",
    text: "Claude Code is my main environment — not because I can't code without it, but because it lets me spend my time on the logic and the architecture instead of the typing. What makes it work isn't the prompt — it's the context, the guardrails and a developer who understands every line it writes.",
    practices: [
      {
        title: "Context engineering first",
        text: "Every serious project has a written \"brain\": CLAUDE.md / AGENTS.md plus an Obsidian vault with product rules, ADRs and a session log. Agents read it before touching code, so their output follows the same decisions a teammate would.",
      },
      {
        title: "Custom skills & commands",
        text: "Recurring work becomes a skill or slash command — e.g. one that proposes and implements the next improvement straight from the vault, another that audits a codebase and refreshes its context docs. Repeatable, reviewable, shared with the team.",
      },
      {
        title: "Parallel sessions, one owner",
        text: "Several Claude Code sessions at once on separate concerns, coordinated through an \"active sessions\" board in the vault so they don't step on each other. Subagents for search and review. I split the work, set guardrails and merge.",
      },
      {
        title: "Verify, don't trust",
        text: "Typecheck, tests and running the real app are part of the loop. Security rules — authz on the backend, nothing sensitive client-side, never write secrets to notes — are written down for the agent to follow, and checked by me.",
      },
    ],
  },
  work: {
    label: "Selected work",
    h1: "Real users,",
    h2: "real data.",
    text: "Factory software, products from my own software house, client work, the agent tooling I built for myself — and an experiment where the honest answer mattered more than a nice chart. Several of these are private systems, so not all have public screenshots.",
    live: "Visit site",
    noShot: "private system",
    more: "Also built",
  },
  projects: projectsEn,
  exp: {
    label: "Experience",
    h1: "Work, a company and a degree,",
    h2: "in parallel.",
    items: [
      { period: "2025.01 — now", role: "Software Developer (R&D)", org: "Conecta Indústria Eletroeletrônica · Flesch Tech R&D team · Guaíba, BR", text: "R&D for electronics-industry machines (AOI/PCB inspection, computer vision, automation) and the Ankora factory systems." },
      { period: "2026 — now", role: "Founder & developer", org: "ALT.software · altsoftware.com.br", text: "My own software house. Products in production — ALT.chat, Sales SDR, Reativa, Acervo — plus client work like Four Imóveis (site, admin and CRM)." },
      { period: "2026.03 — 2026.07", role: "Full Stack Developer", org: "Urban Company · remote", text: "Multi-tenant real-estate CRM in production. Data modelling, APIs, UI, integrations, performance." },
      { period: "2025.05 — now", role: "Software Developer", org: "Nidus Software · Guaíba, BR", text: "Secure social-protection platform for public institutions — fully built, not deployed. RBAC, LGPD, backend architecture." },
      { period: "2024 — ongoing", role: "B.Sc. Computer Engineering", org: "UERGS — Rio Grande do Sul State University", text: "Computer architecture, embedded systems, digital systems, low-level programming." },
    ],
    languages: "Languages — Portuguese (native) · English",
  },
  contact: {
    label: "Contact",
    h1: "Let's",
    h2: "talk.",
    text: "Happy to walk through any of these projects live — including how the agents were set up — or to take a small task as a trial.",
    footer: "© 2026 Kauã Ritter da Silva · Guaíba, Brazil",
    built: "React · Tailwind · three.js · Framer Motion",
  },
};

/* ================================================================= PT */

export const pt: Content = {
  lang: "pt",
  otherLang: { label: "EN", href: `${base}en/` },
  nav: { agents: "Como trabalho", work: "Projetos", experience: "Experiência", contact: "Contato" },
  openMenu: "Abrir menu",
  closeMenu: "Fechar menu",
  hero: {
    badge: "Aberto a vagas full-time · remoto · UTC−3",
    line1: "Kauã Ritter",
    line2: "entrega com agentes.",
    text: "Desenvolvedor full stack e estudante de Engenharia da Computação. Construo software seguro e multi-tenant que roda em produção. Sei escrever tudo na mão — base sólida, do C e assembly ao desenho de sistemas — mas entrego mais rápido com o Claude Code. A arquitetura, a lógica e cada merge são meus.",
    cta: "Ver projetos",
    stats: [
      ["09", "sistemas no ar em produção"],
      ["16", "projetos nesta página"],
      ["03", "ferramentas de agente que criei"],
    ],
  },
  terminal: [
    "$ claude",
    "> leia CLAUDE.md + vault/decisoes e adicione log de",
    "  auditoria por tenant em /api/vehicles. Negar por padrão.",
    "● Lendo 4 arquivos · planejando",
    "● Edit  src/server/audit.ts",
    "● Edit  src/app/api/vehicles/route.ts",
    "● Bash  npm run typecheck && npm test",
    "  ✓ typecheck ok · testes passando",
    "> revisar diff → o merge é meu.",
  ],
  agents: {
    label: "Como trabalho",
    h1: "Agentes de código são meu",
    h2: "fluxo padrão,",
    h3: "não um experimento.",
    text: "O Claude Code é meu ambiente principal — não porque eu não saiba programar sem ele, mas porque me deixa gastar o tempo na lógica e na arquitetura em vez de digitar. O que faz funcionar não é o prompt — é o contexto, as regras e um desenvolvedor que entende cada linha que ele escreve.",
    practices: [
      {
        title: "Contexto em primeiro lugar",
        text: "Todo projeto sério tem um \"cérebro\" escrito: CLAUDE.md / AGENTS.md mais um vault no Obsidian com regras de produto, ADRs e log de sessões. Os agentes leem antes de mexer no código, então seguem as mesmas decisões que um colega seguiria.",
      },
      {
        title: "Skills e comandos próprios",
        text: "Trabalho recorrente vira skill ou slash command — um que propõe e implementa a próxima melhoria direto do vault, outro que audita o código e atualiza a documentação de contexto. Repetível, revisável, compartilhado com o time.",
      },
      {
        title: "Sessões em paralelo, um dono",
        text: "Várias sessões de Claude Code ao mesmo tempo em frentes separadas, coordenadas por um quadro de \"sessões ativas\" no vault pra uma não pisar na outra. Subagentes pra busca e revisão. Eu divido o trabalho, defino as regras e faço o merge.",
      },
      {
        title: "Verificar, não confiar",
        text: "Typecheck, testes e rodar o app de verdade fazem parte do ciclo. Regras de segurança — autorização no backend, nada sensível no front, nunca gravar segredo em nota — ficam escritas pro agente seguir, e eu confiro.",
      },
    ],
  },
  work: {
    label: "Projetos",
    h1: "Usuários reais,",
    h2: "dados reais.",
    text: "Software de fábrica, produtos da minha software house, projetos para clientes, as ferramentas de agente que fiz pra mim — e um experimento em que a resposta honesta valeu mais que um gráfico bonito. Vários são sistemas privados, então nem todos têm print público.",
    live: "Acessar site",
    noShot: "sistema privado",
    more: "Também fiz",
  },
  projects: projectsPt,
  exp: {
    label: "Experiência",
    h1: "Trabalho, empresa e graduação,",
    h2: "em paralelo.",
    items: [
      { period: "2025.01 — atual", role: "Desenvolvedor de Software (P&D)", org: "Conecta Indústria Eletroeletrônica · time de P&D Flesch Tech · Guaíba/RS", text: "P&D de máquinas para a indústria eletrônica (inspeção AOI de placas, visão computacional, automação) e os sistemas Ankora da fábrica." },
      { period: "2026 — atual", role: "Fundador e desenvolvedor", org: "ALT.software · altsoftware.com.br", text: "Minha software house. Produtos em produção — ALT.chat, Sales SDR, Reativa, Acervo — e projetos para clientes como a Four Imóveis (site, painel e CRM)." },
      { period: "2026.03 — 2026.07", role: "Desenvolvedor Full Stack", org: "Urban Company · remoto", text: "CRM imobiliário multi-tenant em produção. Modelagem, APIs, telas, integrações, performance." },
      { period: "2025.05 — atual", role: "Desenvolvedor de Software", org: "Nidus Software · Guaíba/RS", text: "Plataforma segura de proteção social para instituições públicas — sistema completo, não implantado. RBAC, LGPD, arquitetura de backend." },
      { period: "2024 — em andamento", role: "Engenharia da Computação", org: "UERGS — Universidade Estadual do Rio Grande do Sul", text: "Arquitetura de computadores, sistemas embarcados, sistemas digitais, programação de baixo nível." },
    ],
    languages: "Idiomas — Português (nativo) · Inglês",
  },
  contact: {
    label: "Contato",
    h1: "Vamos",
    h2: "conversar.",
    text: "Posso apresentar qualquer um desses projetos ao vivo — inclusive como os agentes foram configurados — ou fazer uma tarefa pequena como teste.",
    footer: "© 2026 Kauã Ritter da Silva · Guaíba/RS",
    built: "React · Tailwind · three.js · Framer Motion",
  },
};
