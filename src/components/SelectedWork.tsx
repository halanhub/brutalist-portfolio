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

const useActiveProject = (count: number) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const refsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const ratiosRef = useRef<number[]>(Array(count).fill(0));

  const setRef = (i: number) => (el: HTMLAnchorElement | null) => {
    refsRef.current[i] = el;
  };

  useEffect(() => {
    const refs = refsRef.current.filter(Boolean);
    if (refs.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = refsRef.current.indexOf(entry.target as HTMLAnchorElement);
          if (idx >= 0) ratiosRef.current[idx] = entry.intersectionRatio;
        });
        const best = ratiosRef.current.reduce((best, r, idx) => (r > ratiosRef.current[best] ? idx : best), 0);
        setActiveIndex(best);
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], rootMargin: "-15% 0px -15% 0px" }
    );
    refs.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [count]);

  return { activeIndex, setRef };
};

const projects = [
  {
    title: "GEORGIAN LANGUAGE",
    category: "PLATFORM",
    year: "2024",
    description: "Comprehensive language learning platform. Structured progression, interactive quizzes, and premium audio playback guiding learners from beginner to intermediate.",
    image: "/assets/projects/georgian-language-webiste.webp",
    url: "https://georgianlanguage.online/",
  },
  {
    title: "AMINDI24",
    category: "WEATHER DATA",
    year: "2023",
    description: "Localized weather forecasting interface across Georgia. Real-time API integration, regional insights, and a clean, data-driven responsive design.",
    image: "/assets/projects/amindi24.webp",
    url: "https://amindi24.ge/",
  },
  {
    title: "YOUNG SCIENTISTS",
    category: "PORTAL",
    year: "2023",
    description: "Official academic portal for the Georgian National Academy of Sciences. Structured information architecture, event management, and accessibility-first design.",
    image: "/assets/projects/youngscientists.webp",
    url: "https://youngscientists.ge/",
  },
  {
    title: "NORDIC EL",
    category: "DIGITAL PRESENCE",
    year: "2022",
    description: "Conversion-focused digital presence for Swedish electrical contractors. Clean, mobile-first experience designed to streamline local service inquiries.",
    image: "/assets/projects/nordic-el.webp",
    url: "https://nordic-el.se/",
  },
  {
    title: "OPUS EDU",
    category: "DASHBOARD",
    year: "2022",
    description: "Modular dashboard interface for educators. Strongly-typed architecture prioritizing simplicity, hierarchical clarity, and extendable scalability.",
    image: "/assets/projects/opusedu.webp",
    url: "https://opusedu.ge/",
  },
];

const SelectedWork = () => {
  const { ref, visible } = useReveal();
  const { activeIndex, setRef } = useActiveProject(projects.length);

  return (
    <section id="work" className="px-4 sm:px-6 md:px-12 py-16 sm:py-24 md:py-40 border-t border-foreground/10">
      <div ref={ref} className={visible ? "animate-reveal" : "opacity-0"}>
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono-jb text-[10px] tracking-[0.3em] text-muted-foreground">002</span>
          <div className="w-12 h-px bg-foreground/30" />
          <span className="font-grotesk text-xs tracking-[0.3em] uppercase text-muted-foreground">SELECTED WORK</span>
        </div>

        <div className="space-y-2">
          {projects.map((project, i) => {
            const isActive = activeIndex === i;
            return (
            <a
              key={project.title}
              ref={setRef(i)}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block border transition-all duration-300 cursor-pointer ${
                isActive ? "max-md:border-foreground/40" : ""
              } border-foreground/10 hover:border-foreground hover:bg-foreground hover:text-primary-foreground`}
            >
              <div className={`grid grid-cols-1 md:grid-cols-12 gap-4 p-4 sm:p-6 md:p-8 ${i % 2 !== 0 ? 'md:text-right' : ''}`}>
                {/* Project image placeholder */}
                <div className={`md:col-span-4 ${i % 2 !== 0 ? 'md:col-start-9 md:order-last' : 'md:col-start-1'}`}>
                  <div className="aspect-[16/10] bg-foreground/5 group-hover:bg-primary-foreground/10 border border-foreground/10 group-hover:border-primary-foreground/20 flex items-center justify-center transition-all duration-500 overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 grayscale opacity-50 mix-blend-luminosity group-hover:grayscale-0 group-hover:opacity-100 group-hover:mix-blend-normal ${
                        isActive ? "max-md:grayscale-0 max-md:opacity-100 max-md:mix-blend-normal" : ""
                      }`}
                    />
                    <div className={`absolute inset-0 transition-colors duration-500 bg-background/20 ${
                      isActive ? "max-md:bg-transparent" : ""
                    } group-hover:bg-transparent`} />
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

                  <p className="text-base sm:text-sm text-muted-foreground group-hover:text-primary-foreground/70 max-w-md leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <span className="font-grotesk text-xs tracking-[0.2em] uppercase group-hover:tracking-[0.4em] transition-all duration-200">
                    VIEW PROJECT -
                  </span>
                </div>
              </div>
            </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
