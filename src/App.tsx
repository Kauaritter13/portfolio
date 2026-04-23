import Navbar from "@/components/Navbar";
import { PrismaHero } from "@/components/ui/prisma-hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import SiteIntro from "@/components/SiteIntro";
import MouseTrail from "@/components/MouseTrail";
import { StarsBackdrop } from "@/components/ui/stars";

export default function App() {
  return (
    <>
      <StarsBackdrop />
      <MouseTrail />
      <SiteIntro />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10 text-white">
        <PrismaHero />
        <About />
        <Projects />
        <Skills />
        <Journey />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
