import { useState, useEffect } from "react";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "ABOUT", href: "#about" },
    { label: "WORK", href: "#work" },
    { label: "SKILLS", href: "#skills" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 font-grotesk text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
        scrolled ? "bg-background/90 backdrop-blur-sm border-b border-foreground/10" : ""
      }`}
    >
      <a href="#" className="text-foreground font-bold text-sm tracking-[0.15em]">
        HAMPUS LANG
      </a>
      <div className="hidden md:flex gap-8">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
