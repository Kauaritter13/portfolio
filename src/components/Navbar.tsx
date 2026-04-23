import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { smoothScrollTo } from "@/lib/scroll";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#projetos", label: "Projetos" },
  { href: "#stack", label: "Stack" },
  { href: "#jornada", label: "Jornada" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    smoothScrollTo(href, 80);
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] transition-[width] duration-500 ease-out ${
          scrolled
            ? "w-[min(92vw,680px)]"
            : "w-[min(94vw,880px)]"
        }`}
      >
        <div className="flex items-center justify-between gap-3 px-3 md:px-4 py-2.5 rounded-full glass">
          <a
            href="#"
            onClick={(e) => handleClick(e, "#")}
            className="flex items-center gap-2.5 text-sm font-semibold tracking-tight pl-2"
          >
            <span className="relative h-2.5 w-2.5">
              <span className="absolute inset-0 rounded-full bg-accent shadow-[0_0_12px_rgba(255,106,43,0.8)]" />
              <span className="absolute inset-0 rounded-full bg-accent-soft animate-pulse-slow" />
            </span>
            <span className="text-white/90">kauã.ritter</span>
          </a>

          <nav className="hidden md:flex items-center gap-0.5">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleClick(e, l.href)}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="relative px-3 py-1.5 text-xs transition-colors rounded-full"
                >
                  <span
                    className={`relative z-10 ${
                      isActive ? "text-white" : "text-white/65 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="navPill"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/15"
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 28,
                      }}
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>

          <motion.a
            href="#contato"
            onClick={(e) => handleClick(e, "#contato")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="liquid-pill btn-accent-liquid hidden md:inline-flex text-xs font-medium px-4 py-2 rounded-full"
          >
            Falar comigo
          </motion.a>

          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden h-9 w-9 rounded-full glass-strong flex items-center justify-center text-white"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[4.75rem] left-1/2 -translate-x-1/2 w-[94vw] max-w-[480px] z-[60] md:hidden"
          >
            <div className="glass-strong rounded-liquid p-3 flex flex-col gap-1">
              {links.map((l, i) => {
                const isActive = active === l.href;
                return (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => handleClick(e, l.href)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-colors ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/75 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="text-sm font-medium">{l.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-white/50" />
                  </motion.a>
                );
              })}
              <motion.a
                href="#contato"
                onClick={(e) => handleClick(e, "#contato")}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: links.length * 0.05 + 0.05 }}
                className="liquid-pill btn-accent-liquid mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium"
              >
                Falar comigo
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
