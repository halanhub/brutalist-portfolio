import { useEffect, useRef, useState } from "react";

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
};

const About = () => {
  const { ref, visible } = useReveal();

  return (
    <section id="about" className="px-6 md:px-12 py-24 md:py-40 border-t border-foreground/10">
      <div ref={ref} className={visible ? "animate-reveal" : "opacity-0"}>
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono-jb text-[10px] tracking-[0.3em] text-muted-foreground">001</span>
          <div className="w-12 h-px bg-foreground/30" />
          <span className="font-grotesk text-xs tracking-[0.3em] uppercase text-muted-foreground">ABOUT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4">
          {/* Image placeholder */}
          <div className="md:col-span-4 md:col-start-1">
            <div className="aspect-[3/4] bg-foreground/5 border border-foreground/20 relative">
              <div className="absolute inset-0 flex items-center justify-center font-mono-jb text-[10px] text-muted-foreground tracking-widest uppercase">
                [PORTRAIT]
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-foreground/10" />
            </div>
            <p className="font-mono-jb text-[10px] text-muted-foreground mt-4 tracking-widest">
              FIG.01 — SELF, 2024
            </p>
          </div>

          {/* Bio text */}
          <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center">
            <h2 className="font-grotesk text-3xl md:text-5xl lg:text-6xl font-bold uppercase leading-[0.9] tracking-tight mb-8">
              I DESIGN
              <br />
              FOR THOSE
              <br />
              <span className="text-accent">WHO DARE</span>
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-lg mb-6">
              I'm a designer and art director based in New York, specializing in
              brand identity, visual systems, and editorial design. I work with
              brands, studios, and individuals who want to stand apart — not fit in.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-lg">
              Every project is an exercise in tension: between restraint and expression,
              structure and chaos, clarity and mystery. I don't design to decorate.
              I design to provoke.
            </p>

            <div className="mt-10 pt-6 border-t border-foreground/10">
              <div className="grid grid-cols-2 gap-4 font-mono-jb text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                <div>
                  <span className="block text-foreground text-xs font-grotesk mb-1">8+</span>
                  YEARS EXPERIENCE
                </div>
                <div>
                  <span className="block text-foreground text-xs font-grotesk mb-1">40+</span>
                  PROJECTS DELIVERED
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
