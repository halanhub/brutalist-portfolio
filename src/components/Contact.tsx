const Contact = () => {
  return (
    <section id="contact" className="border-t border-foreground/10">
      {/* Main contact */}
      <div className="px-6 md:px-12 py-24 md:py-40">
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono-jb text-[10px] tracking-[0.3em] text-muted-foreground">005</span>
          <div className="w-12 h-px bg-foreground/30" />
          <span className="font-grotesk text-xs tracking-[0.3em] uppercase text-muted-foreground">CONTACT</span>
        </div>

        <h2 className="font-grotesk text-5xl md:text-7xl lg:text-[8rem] font-bold uppercase tracking-tight leading-[0.85] mb-12">
          LET'S
          <br />
          <span className="text-accent">WORK</span>
        </h2>

        <a
          href="mailto:hello@alexmercer.design"
          className="font-mono-jb text-lg md:text-2xl text-foreground hover:text-accent transition-colors duration-150 border-b-2 border-foreground hover:border-accent pb-1 inline-block"
        >
          hello@alexmercer.design
        </a>

        <div className="flex gap-8 mt-12 font-grotesk text-xs tracking-[0.2em] uppercase">
          {["INSTAGRAM", "TWITTER", "DRIBBBLE", "LINKEDIN"].map((s) => (
            <a
              key={s}
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      {/* Marquee strip */}
      <div className="border-t border-foreground/10 py-4 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="font-grotesk text-sm tracking-[0.3em] uppercase text-muted-foreground mx-8"
            >
              DESIGN IS RESISTANCE • FORM FOLLOWS INTENTION •&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-foreground/10 px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="font-mono-jb text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          © 2024 ALEX MERCER - ALL RIGHTS RESERVED
        </div>
        <div className="font-mono-jb text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          NEW YORK, NY - 40.7128° N, 74.0060° W
        </div>
      </div>
    </section>
  );
};

export default Contact;
