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

const services = [
  { title: "BRANDING", desc: "Identity systems that cut through noise and leave a mark." },
  { title: "UI DESIGN", desc: "Interfaces that feel intentional, never templated." },
  { title: "ART DIRECTION", desc: "Visual leadership for campaigns, publications, and products." },
  { title: "VISUAL SYSTEMS", desc: "Scalable design languages built for evolution." },
  { title: "CREATIVE DEVELOPMENT", desc: "From concept to code — design that performs." },
];

const Services = () => {
  const { ref, visible } = useReveal();

  return (
    <section id="services" className="px-6 md:px-12 py-24 md:py-40 border-t border-foreground/10">
      <div ref={ref} className={visible ? "animate-reveal" : "opacity-0"}>
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono-jb text-[10px] tracking-[0.3em] text-muted-foreground">003</span>
          <div className="w-12 h-px bg-foreground/30" />
          <span className="font-grotesk text-xs tracking-[0.3em] uppercase text-muted-foreground">CAPABILITIES</span>
        </div>

        <div className="space-y-0">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group border-t border-foreground/10 last:border-b py-6 md:py-8 flex items-start md:items-center gap-4 md:gap-8 cursor-default hover:pl-4 transition-all duration-200"
            >
              <span className="font-mono-jb text-[10px] tracking-[0.3em] text-muted-foreground shrink-0 mt-1 md:mt-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2 md:gap-8">
                <h3 className="font-grotesk text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground md:text-right max-w-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
