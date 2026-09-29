import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Toolbox from "@/components/Toolbox";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Toolbox />
        <Contact />
      </main>
    </>
  );
}
