import { motion } from "framer-motion";

const items = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "WebSocket",
  "WebRTC",
  "Tailwind",
  "Prisma",
  "shadcn/ui",
  "Vercel",
  "Figma",
];

export default function TechMarquee() {
  return (
    <section
      aria-label="Stack técnica"
      className="relative py-14 overflow-hidden border-y border-white/[0.05] mask-fade-bottom"
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        className="flex gap-14 whitespace-nowrap will-change-transform"
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-14 shrink-0"
          >
            <span className="font-display italic text-4xl md:text-5xl text-white/35 hover:text-accent transition-colors">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent/70 shrink-0" />
          </span>
        ))}
      </motion.div>
    </section>
  );
}
