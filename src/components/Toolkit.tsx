import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, ease, mq } from "@/lib/gsap";
import { toolkit } from "@/data/profile";

const phrases = ["Make it work", "Make it clear", "Make it last"];

/** One copy of the marquee phrase row. Rendered twice for a seamless loop. */
const MarqueeRow = ({ hidden = false }: { hidden?: boolean }) => (
  <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
    {phrases.map((p, i) => (
      <span key={p} className="flex items-center">
        <span className={i % 2 ? "serif-i px-[0.25em] text-arc" : "display px-[0.25em] [--wdth:75]"}>{p}</span>
        <span aria-hidden="true" className="mx-[0.35em] inline-block h-[0.14em] w-[0.14em] rounded-full bg-arc" />
      </span>
    ))}
  </div>
);

const Toolkit = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motion, () => {
        // Marquee: constant drift that speeds up, skews and flips with scroll velocity.
        const loop = gsap.to("[data-marquee]", { xPercent: -50, ease: "none", duration: 26, repeat: -1 });
        const skewTo = gsap.quickTo("[data-marquee]", "skewX", { duration: 0.5, ease: ease.soft });
        const st = ScrollTrigger.create({
          trigger: "[data-marquee-band]",
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = self.getVelocity();
            gsap.to(loop, { timeScale: gsap.utils.clamp(1, 6, Math.abs(v) / 300) * self.direction, duration: 0.3, overwrite: true });
            skewTo(gsap.utils.clamp(-8, 8, v / -220));
          },
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
        });
        const settle = () => {
          skewTo(0);
          gsap.to(loop, { timeScale: Math.sign(loop.timeScale()) || 1, duration: 1.2, ease: ease.soft });
        };
        ScrollTrigger.addEventListener("scrollEnd", settle);

        gsap.from("[data-tool]", {
          yPercent: 110,
          duration: 1,
          ease: ease.out,
          stagger: 0.03,
          scrollTrigger: { trigger: "[data-tools]", start: "top 75%", once: true },
        });

        return () => {
          st.kill();
          ScrollTrigger.removeEventListener("scrollEnd", settle);
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="toolkit" aria-labelledby="toolkit-title" className="relative overflow-hidden pb-28 lg:pb-40">
      <div data-marquee-band className="border-y hairline py-6 lg:py-8">
        <p className="sr-only">Make it work. Make it clear. Make it last.</p>
        <div data-marquee className="flex w-max text-[13vw] leading-[0.95] lg:text-[8vw]">
          <MarqueeRow hidden />
          <MarqueeRow hidden />
        </div>
      </div>

      <div className="gutter pt-24 lg:pt-36">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-10 bg-arc" />
              <p className="label text-mute">Toolkit</p>
            </div>
            <h2 id="toolkit-title" className="display text-[14vw] leading-[0.8] [--wdth:80] lg:text-[5.6vw]">
              Tools <span className="serif-i block text-paper/70">I reach for</span>
            </h2>
            <p className="mt-8 max-w-[34ch] leading-relaxed text-paper/70">
              A deliberately small stack: React and TypeScript at the front, Firebase or Supabase behind it, deployed on Vercel or
              Netlify. I plan in Figma and work in Scrum or Kanban.
            </p>
          </div>

          <div data-tools className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 lg:col-span-8">
            {toolkit.map((group, gi) => (
              <div key={group.group}>
                <p className="label mb-5 flex gap-2 border-b hairline pb-3 text-mute">
                  <span className="text-arc">0{gi + 1}</span> {group.group}
                </p>
                <ul className="grid gap-1">
                  {group.items.map((item) => (
                    <li key={item} className="overflow-hidden">
                      <span
                        data-tool
                        className="group/tool block font-display text-[clamp(1.35rem,2.1vw,2rem)] font-semibold leading-[1.15] tracking-[-0.02em] transition-colors duration-300 hover:text-arc"
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Toolkit;
