const Contact = () => {
  return (
    <section id="contact" className="border-t border-foreground/10">
      {/* Main contact */}
      <div className="px-4 sm:px-6 md:px-12 py-16 sm:py-24 md:py-40">
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono-jb text-[10px] tracking-[0.3em] text-muted-foreground">005</span>
          <div className="w-12 h-px bg-foreground/30" />
          <span className="font-grotesk text-xs tracking-[0.3em] uppercase text-muted-foreground">CONTACT</span>
        </div>

        <h2 className="font-grotesk text-4xl sm:text-5xl md:text-7xl lg:text-[8rem] font-bold uppercase tracking-tight leading-[0.85] mb-12">
          LET'S
          <br />
          <span className="text-accent">WORK</span>
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12">
          <a
            href="mailto:me@hampuslang.com"
            className="font-mono-jb text-base sm:text-lg md:text-2xl text-foreground hover:text-accent transition-colors duration-150 border-b-2 border-foreground hover:border-accent pb-1 inline-block w-fit break-all"
          >
            me@hampuslang.com
          </a>
          <a
            href="/assets/Hampus-lang-CV.pdf"
            download="Hampus-Lang-CV.pdf"
            className="font-grotesk text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-150 border border-foreground/30 hover:border-foreground px-6 py-4 sm:py-3 inline-flex items-center justify-center min-h-[48px] w-full sm:w-fit"
          >
            DOWNLOAD CV
          </a>
        </div>

        <div className="flex flex-wrap gap-6 sm:gap-8 mt-12 font-grotesk text-sm sm:text-xs tracking-[0.2em] uppercase">
          {[
            { label: "GITHUB", href: "https://github.com/halanhub" },
            { label: "LINKEDIN", href: "https://www.linkedin.com/in/hampus-lang/" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-150 py-2 min-h-[44px] flex items-center"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Marquee strip - clipped to same width as content & footer */}
      <div className="border-t border-foreground/10 py-4 px-4 sm:px-6 md:px-12">
        <div className="overflow-hidden min-w-0 w-full">
          <div className="animate-marquee whitespace-nowrap flex w-max">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="font-grotesk text-sm tracking-[0.3em] uppercase text-muted-foreground mx-8"
            >
              IT WORKS ON MY MACHINE • PUSH TO PROD AND PRAY •&nbsp;
            </span>
          ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-foreground/10 px-4 sm:px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="font-mono-jb text-xs sm:text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          © 2025 HAMPUS LANG - ALL RIGHTS RESERVED
        </div>
        <div className="font-mono-jb text-xs sm:text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          TBILISI - 41.7151° N, 44.8271° E
        </div>
      </div>
    </section>
  );
};

export default Contact;
