import { useState, useEffect } from "react";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const links = [
    { label: "ABOUT", href: "#about" },
    { label: "WORK", href: "#work" },
    { label: "SKILLS", href: "#skills" },
    { label: "CONTACT", href: "#contact" },
  ];

  const LinkItem = ({ l }: { l: (typeof links)[0] }) => (
    <a
      href={l.href}
      onClick={() => setMobileOpen(false)}
      className="text-muted-foreground hover:text-foreground transition-colors duration-150 py-3 min-h-[44px] flex items-center"
    >
      {l.label}
    </a>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 font-grotesk text-xs sm:text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
        scrolled ? "bg-background/90 backdrop-blur-sm border-b border-foreground/10" : ""
      }`}
    >
      {/* Desktop links */}
      <div className="hidden md:flex gap-8 md:ml-auto">
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
      {/* Mobile menu button */}
      <button
        type="button"
        aria-label="Toggle menu"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden p-3 -mr-3 min-h-[44px] min-w-[44px] flex flex-col justify-center gap-1.5"
      >
        <span className={`block w-5 h-0.5 bg-foreground transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-5 h-0.5 bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-0.5 bg-foreground transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>
      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 top-[52px] bg-background z-40 md:hidden flex flex-col px-6 py-6 gap-1 border-t border-foreground/10 transition-opacity duration-200 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {links.map((l) => (
          <LinkItem key={l.href} l={l} />
        ))}
      </div>
    </nav>
  );
};

export default Nav;
