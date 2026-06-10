import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import { CinematicHero } from "@/components/ui/motion-footer";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Industries from "@/components/Industries";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <CinematicHero />
        <Marquee />
        <Services />
        <Projects />
        <Industries />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
