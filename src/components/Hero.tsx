import { useEffect, useRef } from "react";
import { gsap, SplitText, useGSAP, ease, mq } from "@/lib/gsap";
import { profile } from "@/data/profile";

/** Renders a word as individually animatable letters, hidden from screen readers. */
const Letters = ({ word }: { word: string }) => (
  <span aria-hidden="true" className="flex">
    {word.split("").map((c, i) => (
      <span key={i} className="inline-block overflow-hidden pb-[0.04em] -mb-[0.04em]">
        <span data-char className="inline-block will-change-transform">
          {c}
        </span>
      </span>
    ))}
  </span>
);

const Hero = ({ ready }: { ready: boolean }) => {
  const root = useRef<HTMLElement>(null);
  const intro = useRef<gsap.core.Timeline>();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(mq.motion, () => {
        const split = SplitText.create("[data-hero-lines]", { type: "lines", mask: "lines" });

        // Opening sequence — built paused, played when the preloader lifts.
        intro.current = gsap
          .timeline({ paused: true, defaults: { ease: ease.out } })
          .fromTo("[data-portrait]", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" }, 0)
          .from("[data-portrait] img", { scale: 1.45, yPercent: 8, duration: 2.2 }, 0)
          .from("[data-word='first'] [data-char]", { yPercent: 108, duration: 1.3, stagger: { each: 0.05, from: "start" } }, 0.35)
          .from("[data-word='last'] [data-char]", { yPercent: -108, duration: 1.3, stagger: { each: 0.05, from: "end" } }, 0.5)
          .fromTo("[data-word]", { "--wdth": 125 }, { "--wdth": 100, duration: 1.8, ease: "expo.out" }, 0.35)
          .from(split.lines, { yPercent: 110, duration: 1.1, stagger: 0.08 }, 1.0)
          .from("[data-hero-meta]", { opacity: 0, y: 14, duration: 0.9, stagger: 0.07 }, 1.1)
          .from("[data-scroll-cue]", { scaleY: 0, transformOrigin: "top", duration: 1, ease: ease.inOut }, 1.3);

        // Scroll: the name splits apart while the portrait drifts forward.
        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
            defaults: { ease: "none" },
          })
          .to("[data-word='first']", { xPercent: -22 }, 0)
          .to("[data-word='last']", { xPercent: 22 }, 0)
          .to("[data-portrait]", { yPercent: 14, scale: 1.06 }, 0)
          .to("[data-portrait] img", { scale: 1.12 }, 0)
          .to("[data-hero-copy]", { yPercent: -40, opacity: 0 }, 0);

        // Idle loop on the scroll cue.
        gsap.to("[data-scroll-cue] span", { yPercent: 200, duration: 1.6, ease: ease.inOut, repeat: -1, delay: 2.5 });

        return () => split.revert();
      });

      // Portrait follows the pointer very slightly on desktop.
      mm.add(`${mq.motion} and ${mq.finePointer}`, () => {
        const img = root.current!.querySelector("[data-portrait-inner]");
        const xTo = gsap.quickTo(img, "x", { duration: 1.2, ease: ease.soft });
        const yTo = gsap.quickTo(img, "y", { duration: 1.2, ease: ease.soft });
        const onMove = (e: PointerEvent) => {
          xTo((e.clientX / window.innerWidth - 0.5) * -18);
          yTo((e.clientY / window.innerHeight - 0.5) * -12);
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  useEffect(() => {
    if (ready) intro.current?.play();
  }, [ready]);

  return (
    <section
      ref={root}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden gutter"
      style={{ paddingTop: "calc(var(--nav-h) + 1.5rem)" }}
    >
      <h1 id="hero-title" className="sr-only">
        Hampus Lang — frontend developer
      </h1>

      {/* Portrait — the original photograph, masked and lit by the page itself */}
      <div
        data-portrait
        style={{ translate: "-50% -50%" }}
        className="absolute left-1/2 top-[44%] z-10 w-[62vw] sm:w-[44vw] lg:top-1/2 lg:w-[25vw] lg:max-w-[440px]"
      >
        <div
          data-portrait-inner
          className="relative aspect-[747/965] overflow-hidden"
          style={{
            maskImage: "radial-gradient(68% 58% at 50% 40%, #000 45%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(68% 58% at 50% 40%, #000 45%, transparent 100%)",
          }}
        >
          <img
            src={profile.portrait}
            alt="Portrait of Hampus Lang in a dark jacket against a black background."
            width={747}
            height={965}
            {...{ fetchpriority: "high" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Name */}
      <div aria-hidden="true" className="relative flex flex-1 flex-col justify-between py-[3vh] lg:py-[2vh]">
        <span data-word="first" className="display relative z-20 block text-[21.2vw] leading-[0.78] text-paper">
          <Letters word="Hampus" />
        </span>
        <span
          data-word="last"
          className="display relative z-20 mt-[58vw] block self-end text-[21.2vw] leading-[0.78] text-paper sm:mt-[40vw] lg:mt-0"
        >
          <Letters word="Lang" />
        </span>
      </div>

      {/* Supporting copy */}
      <div
        data-hero-copy
        className="relative z-20 grid gap-6 pb-8 pt-6 lg:absolute lg:bottom-[22vh] lg:left-[var(--gutter)] lg:w-[25vw] lg:p-0"
      >
        <p data-hero-lines className="serif-i text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.02]">
          From high-voltage lines to the web.
        </p>
        <p data-hero-lines className="max-w-[34ch] text-[0.95rem] leading-relaxed text-paper/70">
          Developer building subscription platforms, affiliate sites and fast, search-friendly websites with React,
          TypeScript and WordPress. Swedish, based in Tbilisi.
        </p>
      </div>

      <div className="relative z-20 hidden items-end justify-between pb-6 lg:flex">
        <span data-hero-meta className="label text-mute">
          {profile.coords}
        </span>
        <span data-hero-meta className="label flex items-center gap-3 text-mute">
          Scroll for the work
          <span data-scroll-cue className="relative block h-10 w-px overflow-hidden bg-paper/20">
            <span className="absolute inset-x-0 -top-1/2 h-1/2 bg-arc" />
          </span>
        </span>
        <span data-hero-meta className="label text-mute">
          Sweden → Georgia
        </span>
      </div>
    </section>
  );
};

export default Hero;
