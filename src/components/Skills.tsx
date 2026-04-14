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

const techStack = [
  { name: "HTML", icon: "html" },
  { name: "CSS", icon: "css" },
  { name: "Bootstrap", icon: "bootstrap" },
  { name: "Tailwind", icon: "tailwind" },
  { name: "JavaScript", icon: "js" },
  { name: "TypeScript", icon: "ts" },
  { name: "React", icon: "react" },
  { name: "Firebase", icon: "firebase" },
  { name: "Supabase", icon: "supabase" },
  { name: "GitHub", icon: "github" },
  { name: "Vercel", icon: "vercel" },
  { name: "Netlify", icon: "netlify" },
  { name: "Figma", icon: "figma" },
];

const workflows = [
  {
    title: "SCRUM",
    desc: "Sprint planning, standups, reviews, retrospectives",
  },
  {
    title: "KANBAN",
    desc: "Visual workflow management with WIP limits",
  },
];

const Skills = () => {
  const { ref, visible } = useReveal();

  return (
    <section id="skills" className="px-4 sm:px-6 md:px-12 py-16 sm:py-24 md:py-40 border-t border-foreground/10">
      <div ref={ref} className={visible ? "animate-reveal" : "opacity-0"}>
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono-jb text-[10px] tracking-[0.3em] text-muted-foreground">003</span>
          <div className="w-12 h-px bg-foreground/30" />
          <span className="font-grotesk text-xs tracking-[0.3em] uppercase text-muted-foreground">SKILLS</span>
        </div>

        {/* Tech Stack */}
        <div className="mb-16 md:mb-24">
          <p className="font-mono-jb text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-8">
            TECH STACK
          </p>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="group border border-foreground/20 px-3 sm:px-4 py-3 min-h-[48px] flex items-center gap-2 sm:gap-3 hover:bg-foreground hover:text-primary-foreground transition-colors duration-150 cursor-default"
              >
                <img
                  src={`https://skillicons.dev/icons?i=${tech.icon}`}
                  alt=""
                  className="w-5 h-5 shrink-0 group-hover:invert group-hover:scale-110 transition-all duration-150"
                />
                <span className="font-grotesk text-xs sm:text-sm tracking-wide uppercase font-bold">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Ways of Working */}
        <div>
          <p className="font-mono-jb text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-8">
            WAYS OF WORKING
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workflows.map((w) => (
              <div
                key={w.title}
                className="border border-foreground/20 p-5 sm:p-6 md:p-8 hover:border-foreground transition-colors duration-150"
              >
                <h3 className="font-grotesk text-2xl md:text-3xl font-bold uppercase tracking-tight mb-3">
                  {w.title}
                </h3>
                <p className="text-base sm:text-sm text-muted-foreground leading-relaxed">
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
