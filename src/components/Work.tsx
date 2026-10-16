import { useRef } from "react";
import { asset } from "@/lib/asset";
import { gsap, ScrollTrigger, useGSAP, ease, mq } from "@/lib/gsap";
import { projects, srcSet, type Project } from "@/data/projects";

/** Mix a project accent into the ink background so each scene gets its own charge. */
const tint = (hex: string, amount = 0.16) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const ink = [11, 11, 10];
  const mix = (c: number, i: number) => Math.round(ink[i] + (c - ink[i]) * amount);
  return `rgb(${mix(r, 0)}, ${mix(g, 1)}, ${mix(b, 2)})`;
};

const ProjectPanel = ({ project, total }: { project: Project; total: number }) => (
  <article
    data-panel
    data-accent={project.accent}
    aria-labelledby={`${project.slug}-title`}
    className="work-panel relative gutter py-20 lg:h-[100svh] lg:w-screen lg:shrink-0 lg:py-0"
    style={{ "--accent": project.accent } as React.CSSProperties}
  >
    {/* Meta + copy */}
    <div data-copy className="relative z-20 flex flex-col gap-6 lg:absolute lg:left-[var(--gutter)] lg:top-[calc(var(--nav-h)+6vh)] lg:w-[27vw] lg:max-w-[420px]">
      <div className="flex items-baseline gap-4">
        <span className="serif-i text-5xl leading-none text-[var(--accent)] lg:text-6xl">{project.index}</span>
        <span className="label text-mute">/ {String(total).padStart(2, "0")}</span>
        <span className="label ml-auto text-paper/70 lg:hidden">{project.kicker}</span>
      </div>
      <p className="label hidden text-paper/70 lg:block">{project.kicker}</p>

      <h3
        id={`${project.slug}-title`}
        className="display text-[15.5vw] leading-[0.8] [--wdth:72] lg:sr-only"
      >
        {project.title}
      </h3>

      <p className="text-[1.05rem] leading-relaxed text-paper/85 lg:text-[clamp(0.95rem,1.05vw,1.1rem)]">{project.lede}</p>

      <ul className="grid gap-2 border-t hairline pt-5">
        {project.points.map((p) => (
          <li key={p} className="flex gap-3 text-sm leading-snug text-paper/70">
            <span aria-hidden="true" className="mt-[0.55em] h-px w-3 shrink-0 bg-[var(--accent)]" />
            {p}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {project.role && <span className="label text-mute">{project.role}</span>}
        <span className="label text-mute">{project.stack.join(" / ")}</span>
      </div>

      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex w-fit items-center gap-3 border border-paper/25 px-5 py-3 label transition-colors duration-500 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-ink"
        >
          {project.linkLabel}
          <span aria-hidden="true" className="transition-transform duration-500 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
            ↗
          </span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : (
        <p className="label w-fit border border-paper/15 px-5 py-3 text-mute">Private tool, not public</p>
      )}
    </div>

    {/* Visual composition */}
    <div className="relative mb-[24%] mt-12 md:mb-[12%] lg:absolute lg:mb-0 lg:right-[var(--gutter)] lg:top-[calc(var(--nav-h)+4vh)] lg:mt-0 lg:w-[58vw]" style={{ perspective: "1600px" }}>
      <div data-frame className="relative" style={{ transformStyle: "preserve-3d" }}>
        <a
          href={project.url}
          target={project.url ? "_blank" : undefined}
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          data-tilt
          className="block will-change-transform"
        >
          <div data-shot className="relative">
            <img
              src={asset(`/assets/optimized/${project.image}-1400.webp`)}
              srcSet={srcSet(project.image)}
              sizes="(min-width: 1024px) 58vw, 100vw"
              alt={project.alt}
              width={2200}
              height={1184}
              loading="lazy"
              decoding="async"
              className="relative block h-auto w-full"
            />
          </div>
        </a>
        {/* Soft accent light under the screenshot */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[10%] -bottom-[6%] -z-10 h-1/3 opacity-50 blur-3xl"
          style={{ background: project.accent }}
        />
      </div>

      {project.mobile ? (
        // Phone: the same site captured at phone size, shown in a handset frame
        <div
          data-loupe
          aria-hidden="true"
          className="absolute -bottom-[26%] right-[2%] z-10 w-[31%] sm:w-[24%] md:-bottom-[16%] md:-left-[5%] md:right-auto md:w-[19%]"
        >
          <div className="rounded-[13%/6%] bg-[#0f0f0f] p-[3.5%] shadow-[0_40px_70px_-20px_rgba(0,0,0,0.85)] ring-1 ring-paper/20">
            <div className="relative aspect-[390/844] overflow-hidden rounded-[10%/4.6%] bg-ink">
              <img
                src={asset(`/assets/optimized/${project.image}-mobile-400.webp`)}
                srcSet={`${asset(`/assets/optimized/${project.image}-mobile-400.webp`)} 400w, ${asset(`/assets/optimized/${project.image}-mobile-800.webp`)} 800w`}
                sizes="(min-width: 1024px) 11vw, 31vw"
                alt=""
                width={400}
                height={866}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
          </div>
          <span className="label mt-2 hidden text-[0.6rem] text-paper/60 md:block">Mobile</span>
        </div>
      ) : (
        // Loupe: a magnified crop of the desktop screenshot
        <div
          data-loupe
          aria-hidden="true"
          className="absolute -bottom-[14%] -left-[6%] z-10 hidden aspect-[4/5] w-[22%] overflow-hidden border border-[var(--accent)] bg-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] md:block"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${asset(`/assets/optimized/${project.image}-2200.webp`)})`,
              backgroundSize: `${project.detail.zoom * 100 * 1.85}% auto`,
              backgroundPosition: `${project.detail.x}% ${project.detail.y}%`,
            }}
          />
          <span className="label absolute bottom-2 left-2 bg-ink/80 px-1.5 py-0.5 text-[0.6rem] text-paper/80">
            Detail ×{project.detail.zoom}
          </span>
        </div>
      )}
    </div>

    {/* Giant title — desktop scene element */}
    <p
      aria-hidden="true"
      data-title
      className="display pointer-events-none absolute bottom-[7vh] left-[var(--gutter)] z-30 hidden whitespace-nowrap text-[11.5vw] leading-[0.8] text-paper [--wdth:70] lg:block"
    >
      {project.title}
    </p>
  </article>
);

const Work = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");

      // Desktop: pinned horizontal sequence.
      mm.add(`${mq.desktop} and ${mq.motion}`, () => {
        const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
        const bg = root.current!.querySelector<HTMLElement>("[data-bg]")!;
        const counter = root.current!.querySelector<HTMLElement>("[data-counter]")!;
        const name = root.current!.querySelector<HTMLElement>("[data-name]")!;
        track.classList.add("is-horizontal");
        gsap.set("[data-hud]", { display: "block" });

        const distance = () => track.scrollWidth - window.innerWidth;

        const scroll = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: "[data-pin]",
            pin: true,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set("[data-progress]", { scaleX: self.progress }),
          },
        });

        gsap.from("[data-hud]", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: ease.out,
          scrollTrigger: { trigger: "[data-pin]", start: "top 40%", toggleActions: "play none none reverse" },
        });

        panels.forEach((panel, i) => {
          const accent = panel.dataset.accent!;
          const frame = panel.querySelector("[data-frame]");
          const shot = panel.querySelector("[data-shot]");
          const loupe = panel.querySelector("[data-loupe]");
          const title = panel.querySelector("[data-title]");

          // Frame swings in from depth, settles at centre stage, swings away.
          gsap
            .timeline({
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scroll,
                start: "left right",
                end: "right left",
                scrub: true,
              },
              defaults: { ease: "none" },
            })
            .fromTo(frame, { rotateY: -32, rotateX: 6, z: -260, xPercent: 18 }, { rotateY: 0, rotateX: 0, z: 0, xPercent: 0, duration: 1 })
            .to(frame, { rotateY: 22, z: -180, xPercent: -10, duration: 1 })
            .fromTo(loupe, { yPercent: 70, xPercent: 60 }, { yPercent: -10, xPercent: 0, duration: 1 }, 0)
            .to(loupe, { yPercent: -60, xPercent: -40, duration: 1 }, 1)
            .fromTo(title, { xPercent: 28 }, { xPercent: -28, duration: 2 }, 0);

          // Screenshot wipes open as it arrives.
          gsap.fromTo(
            shot,
            { clipPath: "inset(0% 100% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: { trigger: panel, containerAnimation: scroll, start: "left 95%", end: "left 35%", scrub: true },
            },
          );

          // Copy rises as the panel takes the stage.
          gsap.from(panel.querySelectorAll("[data-copy] > *:not(h3)"), {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: ease.out,
            stagger: 0.05,
            scrollTrigger: { trigger: panel, containerAnimation: scroll, start: "left 55%", toggleActions: "play none none reverse" },
          });

          // Scene colour + HUD update when a panel owns the centre of the screen.
          ScrollTrigger.create({
            trigger: panel,
            containerAnimation: scroll,
            start: "left center",
            end: "right center",
            onToggle: (self) => {
              if (!self.isActive) return;
              gsap.to(bg, { backgroundColor: tint(accent), duration: 1.1, ease: ease.soft, overwrite: true });
              gsap.fromTo(counter, { yPercent: 100 }, { yPercent: 0, duration: 0.6, ease: ease.out, overwrite: true });
              counter.textContent = projects[i].index;
              name.textContent = projects[i].title;
            },
          });
        });

        // Return to ink when scrolling back to the intro.
        ScrollTrigger.create({
          trigger: "[data-pin]",
          start: "top top",
          end: () => `+=${window.innerWidth * 0.5}`,
          onEnterBack: () => gsap.to(bg, { backgroundColor: "rgb(11, 11, 10)", duration: 1, ease: ease.soft, overwrite: true }),
        });

        // Pointer tilt on the active screenshot.
        const tilts = panels.map((p) => {
          const el = p.querySelector("[data-tilt]");
          return { el, rx: gsap.quickTo(el, "rotateX", { duration: 0.9, ease: ease.soft }), ry: gsap.quickTo(el, "rotateY", { duration: 0.9, ease: ease.soft }) };
        });
        const onMove = (e: PointerEvent) => {
          const x = e.clientX / window.innerWidth - 0.5;
          const y = e.clientY / window.innerHeight - 0.5;
          tilts.forEach((t) => {
            t.ry(x * 7);
            t.rx(-y * 5);
          });
        };
        const finePointer = window.matchMedia(mq.finePointer).matches;
        if (finePointer) window.addEventListener("pointermove", onMove);

        return () => {
          track.classList.remove("is-horizontal");
          gsap.set("[data-hud]", { clearProps: "display" });
          window.removeEventListener("pointermove", onMove);
          gsap.set(bg, { clearProps: "backgroundColor" });
        };
      });

      // Mobile & tablet: a vertical sequence with masked reveals.
      mm.add(`(max-width: 1023px) and ${mq.motion}`, () => {
        panels.forEach((panel) => {
          gsap.fromTo(
            panel.querySelector("[data-shot]"),
            { clipPath: "inset(12% 12% 12% 12%)", scale: 1.04 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: panel.querySelector("[data-frame]"), start: "top 90%", end: "top 40%", scrub: true },
            },
          );
          gsap.fromTo(
            panel.querySelector("[data-loupe]"),
            { yPercent: 40 },
            { yPercent: -20, ease: "none", scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work" aria-labelledby="work-title" className="relative">
      <div data-pin className="relative overflow-x-clip">
        <div data-bg className="absolute inset-0 -z-10 bg-ink" aria-hidden="true" />

        <div data-track className="work-track flex flex-col">
          {/* Title card */}
          <header className="gutter relative flex flex-col justify-center pb-8 pt-[14vh] lg:h-[100svh] lg:w-[78vw] lg:shrink-0 lg:pb-0 lg:pt-0">
            <p className="label mb-6 text-mute">
              <span className="text-arc">●</span>&nbsp; Selected work — {String(projects.length).padStart(2, "0")} projects
            </p>
            <h2 id="work-title" className="display text-[23vw] leading-[0.78] lg:text-[16vw]">
              <span className="serif-i block text-[0.42em] leading-none text-paper/80">Selected</span>
              Builds
            </h2>
            <p className="mt-8 max-w-[38ch] text-lg leading-relaxed text-paper/70">
              Eight projects across Sweden and Georgia, from a casino comparison site and an affiliate dashboard to a
              zero-knowledge secrets manager.
            </p>
            <p className="label mt-10 hidden items-center gap-3 text-mute lg:flex">
              Keep scrolling <span aria-hidden="true" className="inline-block h-px w-16 bg-paper/40" /> →
            </p>
          </header>

          {projects.map((p) => (
            <ProjectPanel key={p.slug} project={p} total={projects.length} />
          ))}
        </div>

        {/* HUD — only shown during the pinned sequence */}
        <div data-hud aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-40 hidden gutter pb-[2vh]">
          <div className="flex items-end justify-between gap-6 label text-paper/70">
            <span className="flex items-baseline gap-2">
              <span className="inline-block overflow-hidden">
                <span data-counter className="inline-block text-paper">01</span>
              </span>
              / {String(projects.length).padStart(2, "0")}
              <span data-name className="ml-4 text-paper/50">
                {projects[0].title}
              </span>
            </span>
          </div>
          <div className="mt-3 h-px w-full bg-paper/15">
            <div data-progress className="h-px w-full origin-left bg-arc" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
