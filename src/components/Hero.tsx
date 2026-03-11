const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-start sm:justify-center px-4 sm:px-6 md:px-12 pt-20 pb-24 sm:pb-12 overflow-hidden">
      {/* Grid overlay lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[20%] top-0 bottom-0 w-px bg-foreground/5" />
        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-foreground/5" />
        <div className="absolute left-[80%] top-0 bottom-0 w-px bg-foreground/5" />
        <div className="absolute top-[30%] left-0 right-0 h-px bg-foreground/5" />
        <div className="absolute top-[70%] left-0 right-0 h-px bg-foreground/5" />
      </div>

      {/* Rotating stamp - hidden on mobile */}
      <div className="hidden sm:block absolute top-20 right-8 md:right-20 w-28 h-28 md:w-36 md:h-36">
        <div className="animate-spin-slow w-full h-full relative">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <path
                id="circlePath"
                d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              />
            </defs>
            <text className="fill-foreground text-[14px] font-grotesk uppercase tracking-[0.35em]">
              <textPath href="#circlePath">
                FRONTEND • DEVELOPER • CREATIVE •&nbsp;
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-accent" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-[90vw]">
        <p className="font-mono-jb text-[10px] md:text-xs tracking-[0.3em] text-muted-foreground mb-6 uppercase">
          Portfolio / 2024 - Present
        </p>

        <h1 className="font-grotesk font-bold text-[12vw] md:text-[9vw] lg:text-[8rem] leading-[0.85] uppercase tracking-[-0.03em] text-foreground">
          HAMPUS
          <br />
          <span className="inline-block ml-[5vw] md:ml-[8vw]">LANG</span>
        </h1>

        <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
          <p className="font-mono-jb text-xs md:text-sm leading-relaxed text-muted-foreground max-w-md">
            Building fast, functional web applications
            <br />
            with React, TypeScript & Firebase.
          </p>

          <a
            href="#work"
            className="inline-flex items-center justify-center gap-3 border-2 border-foreground px-6 py-4 sm:py-3 font-grotesk text-xs tracking-[0.2em] uppercase text-foreground hover:bg-foreground hover:text-primary-foreground transition-colors duration-150 w-fit min-h-[48px]"
          >
            VIEW WORK <span className="text-lg leading-none">↓</span>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-6 left-4 right-4 sm:left-6 sm:right-6 md:left-12 md:right-12 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 font-mono-jb text-xs sm:text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
        <span>Based in Tbilisi, Georgia</span>
        <span>Scroll to explore</span>
      </div>

      {/* Geometric accent */}
      <div className="absolute bottom-[15%] left-[60%] w-32 h-32 md:w-48 md:h-48 border border-foreground/10 pointer-events-none" />
      <div className="absolute bottom-[18%] left-[62%] w-32 h-32 md:w-48 md:h-48 bg-accent/5 pointer-events-none" />
    </section>
  );
};

export default Hero;
