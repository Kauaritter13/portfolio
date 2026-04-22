const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kauaritter/" },
  { label: "GitHub · Kauaritter13", href: "https://github.com/Kauaritter13" },
  { label: "GitHub · RitterKaua", href: "https://github.com/RitterKaua" },
  { label: "Instagram", href: "https://www.instagram.com/silvaritter_/" },
];

export default function Footer() {
  return (
    <footer className="relative px-6 py-14">
      <div className="max-w-6xl mx-auto glass rounded-liquid p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_rgba(255,106,43,0.8)]" />
              <span className="font-display text-3xl">kauã.ritter</span>
            </div>
            <div className="text-xs text-white/45 mt-3 max-w-xs leading-relaxed">
              Kauã Ritter da Silva · Full Stack Developer. Feito à mão com
              React, TypeScript, Tailwind e Framer Motion.
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-1"
              >
                {s.label}
                <span className="text-white/30 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex justify-between items-center text-[10px] uppercase tracking-[0.3em] text-white/30">
          <span>© 2026 Kauã Ritter da Silva</span>
          <span>v1.0</span>
        </div>
      </div>
    </footer>
  );
}
