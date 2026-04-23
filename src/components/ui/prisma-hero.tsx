import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({
  text,
  className = "",
  showAsterisk = false,
  style,
}: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({
  segments,
  className = "",
  style,
}: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap justify-center ${className}`}
      style={style}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- PrismaHero ---------------- */
const PRIMARY = "#E1E0CC";
const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

const HeroBottomContent = () => {
  return (
    <div className="mx-auto max-w-3xl flex flex-col items-center gap-6 text-center">
      <p className="text-sm sm:text-base" style={{ color: `${PRIMARY}CC` }}>
        Engenharia da Computação · Desenvolvedor Full Stack. Três sistemas em produção —
        CRM SaaS imobiliário, plataforma social de proteção e P&D em máquinas industriais.
      </p>

      <motion.a
        href="#projetos"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        className="group inline-flex items-center gap-2 self-center rounded-full py-1 pl-5 pr-1 text-sm font-medium text-black hover:gap-3 sm:text-base"
        style={{
          backgroundColor: PRIMARY,
          boxShadow:
            "0 0 0 1px rgba(217, 119, 87, 0.35), 0 18px 50px -12px rgba(217, 119, 87, 0.55)",
        }}
      >
        Ver projetos
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1A1410] transition-transform group-hover:rotate-[-45deg] sm:h-10 sm:w-10">
          <ArrowRight className="h-4 w-4" style={{ color: "#D97757" }} />
        </span>
      </motion.a>
    </div>
  );
};

const HeroMediaOverlay = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 sm:px-6 sm:pb-6 md:px-10 md:pb-8">
      <h1
        className="font-medium leading-[0.85] tracking-[-0.07em] text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[15vw] relative inline-block"
        style={{ color: PRIMARY }}
      >
        Kauã
        <span
          className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]"
          style={{ color: PRIMARY }}
        >
          *
        </span>
      </h1>
    </div>
  );
};

const PrismaHero = () => {
  return (
    <section id="hero" className="w-full">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={HERO_VIDEO}
        title="Kauã Ritter"
        scrollToExpand="Role para expandir"
        textColor={PRIMARY}
        mediaOverlay={<HeroMediaOverlay />}
      >
        <HeroBottomContent />
      </ScrollExpandMedia>
    </section>
  );
};

export { PrismaHero };
