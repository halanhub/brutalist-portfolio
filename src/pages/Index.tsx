import { useCallback, useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Work from "@/components/Work";
import Story from "@/components/Story";
import Toolkit from "@/components/Toolkit";
import Contact from "@/components/Contact";

const Index = () => {
  // Flips when the preloader lifts (immediately on repeat visits / reduced motion).
  const [ready, setReady] = useState(false);
  const onIntroDone = useCallback(() => setReady(true), []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Preloader onDone={onIntroDone} />
      <Nav ready={ready} />
      <div className="grain" aria-hidden="true" />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <SmoothScroll />
          <main id="main">
            <Hero ready={ready} />
            <Manifesto />
            <Work />
            <Story />
            <Toolkit />
            <Contact />
          </main>
        </div>
      </div>
    </>
  );
};

export default Index;
