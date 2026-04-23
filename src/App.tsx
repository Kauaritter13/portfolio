import Navbar from "@/components/Navbar";
import { PrismaHero } from "@/components/ui/prisma-hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import TechMarquee from "@/components/TechMarquee";
import Journey from "@/components/Journey";
import Differentials from "@/components/Differentials";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import AuroraBackground from "@/components/AuroraBackground";
import BackgroundGlow from "@/components/BackgroundGlow";
import MouseTrail from "@/components/MouseTrail";
import SiteIntro from "@/components/SiteIntro";

export default function App() {
  return (
    <>
      <AuroraBackground />
      <BackgroundGlow />
      <MouseTrail />
      <SiteIntro />
      <ScrollProgress />
      <Navbar />
      <main className="relative text-white">
        <PrismaHero />
        <About />
        <Projects />
        <Skills />
        <TechMarquee />
        <Journey />
        <Differentials />
        <Stats />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
