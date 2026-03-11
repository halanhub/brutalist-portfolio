import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SelectedWork from "@/components/SelectedWork";
import Skills from "@/components/Skills";
import Philosophy from "@/components/Philosophy";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <About />
      <SelectedWork />
      <Skills />
      <Philosophy />
      <Contact />
    </div>
  );
};

export default Index;
