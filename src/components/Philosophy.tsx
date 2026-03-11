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

const Philosophy = () => {
  const { ref, visible } = useReveal();

  return (
    <section className="px-6 md:px-12 py-32 md:py-48 border-t border-foreground/10">
      <div ref={ref} className={visible ? "animate-reveal" : "opacity-0"}>
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono-jb text-[10px] tracking-[0.3em] text-muted-foreground">004</span>
          <div className="w-12 h-px bg-foreground/30" />
          <span className="font-grotesk text-xs tracking-[0.3em] uppercase text-muted-foreground">PHILOSOPHY</span>
        </div>

        <div className="max-w-5xl">
          <blockquote className="font-grotesk text-3xl md:text-5xl lg:text-7xl font-bold uppercase leading-[0.95] tracking-tight">
            "GOOD DESIGN IS
            <br />
            NOT ABOUT BEING
            <br />
            <span className="text-accent">LIKED</span>. IT'S ABOUT
            <br />
            BEING{" "}
            <span className="inline-block border-b-4 border-foreground pb-1">
              REMEMBERED
            </span>
            ."
          </blockquote>

          <p className="font-mono-jb text-xs text-muted-foreground mt-12 tracking-[0.2em] uppercase">
            - A.M., On purpose and permanence
          </p>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
