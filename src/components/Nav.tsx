import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP, ease, scrollToTarget, ScrollSmoother, prefersReducedMotion } from "@/lib/gsap";
import { useTbilisiTime } from "@/hooks/useTbilisiTime";
import { profile } from "@/data/profile";

const links = [
  { label: "Work", href: "#work", note: "06 projects" },
  { label: "Story", href: "#story", note: "Cables to code" },
  { label: "Toolkit", href: "#toolkit", note: "Stack & process" },
  { label: "Contact", href: "#contact", note: "Say hello" },
];

const Nav = ({ ready }: { ready: boolean }) => {
  const [open, setOpen] = useState(false);
  const time = useTbilisiTime();
  const barRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline>();

  // Bar enters with the hero.
  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return;
      gsap.from("[data-nav-item]", { yPercent: -120, opacity: 0, duration: 1, ease: ease.out, stagger: 0.06, delay: 0.5 });
    },
    { scope: barRef, dependencies: [ready] },
  );

  // Menu curtain timeline, built once and played forwards or backwards.
  useGSAP(
    () => {
      const reduce = prefersReducedMotion();
      tl.current = gsap
        .timeline({ paused: true, onReverseComplete: () => gsap.set(menuRef.current, { visibility: "hidden" }) })
        .set(menuRef.current, { visibility: "visible" })
        .fromTo(
          menuRef.current,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: reduce ? 0.01 : 0.9, ease: ease.inOut },
        )
        .from(
          "[data-menu-link]",
          { yPercent: 110, duration: reduce ? 0.01 : 0.9, ease: ease.out, stagger: 0.06 },
          reduce ? 0 : "-=0.45",
        )
        .from("[data-menu-meta]", { opacity: 0, y: 12, duration: reduce ? 0.01 : 0.6, ease: ease.soft, stagger: 0.05 }, "<0.2");
    },
    { scope: menuRef },
  );

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const smoother = ScrollSmoother.get();
    const page = document.getElementById("smooth-wrapper");
    if (open) {
      gsap.set(menuRef.current, { visibility: "visible" });
      tl.current?.timeScale(1).play();
      smoother?.paused(true);
      document.documentElement.style.overflow = "hidden";
      page?.setAttribute("inert", "");
      menuRef.current?.querySelector<HTMLElement>("[data-menu-link]")?.focus();
    } else {
      tl.current?.timeScale(1.6).reverse();
      smoother?.paused(false);
      document.documentElement.style.overflow = "";
      page?.removeAttribute("inert");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);
    // Wait for the curtain to start closing before moving the page.
    window.setTimeout(() => scrollToTarget(href), wasOpen ? 350 : 0);
  };

  return (
    <>
      <header
        ref={barRef}
        className="fixed inset-x-0 top-0 z-[120] gutter mix-blend-difference text-paper"
        style={{ height: "var(--nav-h)" }}
      >
        <nav aria-label="Primary" className="flex h-full items-center justify-between gap-4">
          <a
            href="#top"
            onClick={go("#top")}
            data-nav-item
            className="label flex items-center gap-3"
            aria-label="Hampus Lang — back to top"
          >
            <span className="display text-[1.35rem] tracking-[-0.04em] normal-case">HL</span>
            <span className="hidden sm:inline text-paper/70">Frontend developer</span>
          </a>

          <ul className="hidden lg:flex items-center gap-8 label">
            {links.map((l) => (
              <li key={l.href} data-nav-item>
                <a href={l.href} onClick={go(l.href)} className="wipe pb-0.5 text-paper/80 hover:text-paper">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <span data-nav-item className="label hidden xs:inline text-paper/70 tabular-nums">
              TBS {time}
            </span>
            <button
              ref={buttonRef}
              type="button"
              data-nav-item
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="label group flex min-h-[44px] items-center gap-3 lg:hidden"
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span className="relative block h-3 w-6" aria-hidden="true">
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "top-1.5 rotate-45" : "top-0.5"}`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div
        ref={menuRef}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        className="fixed inset-0 z-[110] flex flex-col justify-between bg-paper text-ink gutter pb-8"
        style={{ visibility: "hidden", paddingTop: "calc(var(--nav-h) + 2rem)" }}
      >
        <ul className="flex flex-col">
          {links.map((l, i) => (
            <li key={l.href} className="overflow-hidden border-b border-ink/15">
              <a
                href={l.href}
                onClick={go(l.href)}
                data-menu-link
                tabIndex={open ? 0 : -1}
                className="group flex items-baseline justify-between gap-4 py-3"
              >
                <span className="flex items-baseline gap-4">
                  <span className="label text-ink/50">0{i + 1}</span>
                  <span className="display text-[17vw] sm:text-[13vw] transition-[font-variation-settings] duration-700 group-hover:[--wdth:125]">
                    {l.label}
                  </span>
                </span>
                <span className="serif-i hidden sm:block text-2xl text-ink/60">{l.note}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-end justify-between gap-6 pt-8">
          <a data-menu-meta tabIndex={open ? 0 : -1} href={`mailto:${profile.email}`} className="serif-i text-3xl wipe">
            {profile.email}
          </a>
          <div data-menu-meta className="flex gap-6 label">
            {profile.socials.map((s) => (
              <a key={s.href} tabIndex={open ? 0 : -1} href={s.href} target="_blank" rel="noopener noreferrer" className="wipe">
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
