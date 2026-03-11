import { useEffect, useRef, useState } from "react";

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
};

const projects = [
  {
    title: "VOID STUDIO",
    category: "BRANDING",
    year: "2024",
    description: "Complete brand identity for a Berlin-based architecture firm. Minimal, monolithic, unapologetic.",
  },
  {
    title: "NERVE MAG",
    category: "EDITORIAL",
    year: "2023",
    description: "Art direction and layout system for an independent culture magazine. Raw typography meets controlled chaos.",
  },
  {
    title: "FORM/LESS",
    category: "VISUAL IDENTITY",
    year: "2023",
    description: "Identity system for a contemporary art gallery. Deconstructed grid, fluid marks, systematic variation.",
  },
  {
    title: "BLACKPINE",
    category: "UI / DIGITAL",
    year: "2022",
    description: "Digital experience for a luxury outerwear brand. Dark, immersive, brutally elegant.",
  },
];

const SelectedWork = () => {
  const { ref, visible } = useReveal();

  return (
    <section id="work" className="px-6 md:px-12 py-24 md:py-40 border-t border-foreground/10">
      <div ref={ref} className={visible ? "animate-reveal" : "opacity-0"}>
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono-jb text-[10px] tracking-[0.3em] text-muted-foreground">002</span>
          <div className="w-12 h-px bg-foreground/30" />
          <span className="font-grotesk text-xs tracking-[0.3em] uppercase text-muted-foreground">SELECTED WORK</span>
        </div>

        <div className="space-y-2">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="group border border-foreground/10 hover:border-foreground hover:bg-foreground hover:text-primary-foreground transition-all duration-200 cursor-pointer"
            >
              <div className={`grid grid-cols-1 md:grid-cols-12 gap-4 p-6 md:p-8 ${i % 2 !== 0 ? 'md:text-right' : ''}`}>
                {/* Project image placeholder */}
                <div className={`md:col-span-4 ${i % 2 !== 0 ? 'md:col-start-9 md:order-last' : 'md:col-start-1'}`}>
                  <div className="aspect-[16/10] bg-foreground/5 group-hover:bg-primary-foreground/10 border border-foreground/10 group-hover:border-primary-foreground/20 flex items-center justify-center transition-all duration-200">
                    <span className="font-mono-jb text-[10px] tracking-widest text-muted-foreground group-hover:text-primary-foreground/50 uppercase">
                      [{String(i + 1).padStart(2, "0")}]
                    </span>
                  </div>
                </div>

                {/* Project info */}
                <div className={`md:col-span-7 flex flex-col justify-center ${i % 2 !== 0 ? 'md:col-start-1 md:items-end' : 'md:col-start-6'}`}>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-mono-jb text-[10px] tracking-[0.3em] text-muted-foreground group-hover:text-primary-foreground/50">
                      {project.category}
                    </span>
                    <span className="font-mono-jb text-[10px] text-muted-foreground group-hover:text-primary-foreground/50">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="font-grotesk text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-none mb-4">
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/70 max-w-md leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <span className="font-grotesk text-xs tracking-[0.2em] uppercase group-hover:tracking-[0.4em] transition-all duration-200">
                    VIEW PROJECT →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
