import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import { Contact, Header, Toolbox } from "@/components/Sections";
import { GridOverlay, LensDock } from "@/components/lens-ui";

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to the work
      </a>
      <GridOverlay />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Toolbox />
        <Contact />
      </main>
      <LensDock />
    </>
  );
}
