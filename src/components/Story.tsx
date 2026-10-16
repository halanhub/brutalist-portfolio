import { useRef } from "react";
import { gsap, useGSAP, ease, mq } from "@/lib/gsap";
import { profile, timeline, languages } from "@/data/profile";
import RevealText from "@/components/RevealText";

const SLATS = 7;

const Story = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motion, () => {
        // The paper chapter rises over the dark page like a sheet being laid down.
        gsap.fromTo(
          "[data-sheet]",
          { clipPath: "inset(10% 5% 0% 5%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 15%", scrub: true },
          },
        );

        // Portrait reassembles from horizontal slats, alternating sides.
        gsap.from("[data-slat]", {
          xPercent: (i) => (i % 2 ? 105 : -105),
          duration: 1.4,
          ease: ease.inOut,
          stagger: 0.07,
          scrollTrigger: { trigger: "[data-slats]", start: "top 75%", once: true },
        });
        gsap.to("[data-slats]", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: "[data-slats]", start: "top bottom", end: "bottom top", scrub: true },
        });

        // A live wire draws down the timeline; each stop lights as it's reached.
        gsap.fromTo(
          "[data-wire]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-timeline]", start: "top 70%", end: "bottom 60%", scrub: true },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-stop]").forEach((stop) => {
          gsap
            .timeline({ scrollTrigger: { trigger: stop, start: "top 66%", toggleActions: "play none none reverse" } })
            .to(stop.querySelector("[data-node]"), { scale: 1, backgroundColor: "rgb(255 79 26)", duration: 0.4, ease: ease.soft })
            .from(stop.querySelectorAll("[data-row]"), { x: -24, opacity: 0, duration: 0.8, ease: ease.out, stagger: 0.06 }, 0);
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="story" aria-labelledby="story-title" className="relative">
      <div data-sheet className="bg-paper text-ink">
        <div className="gutter pb-24 pt-28 lg:pb-40 lg:pt-40">
          <div className="mb-14 flex items-center gap-4 lg:mb-20">
            <span className="h-px w-10 bg-arc" />
            <p className="label text-ink/55">The story</p>
          </div>

          <h2 id="story-title" className="display text-[15vw] leading-[0.8] lg:text-[9.5vw]">
            I came to code <span className="serif-i block pt-[0.08em] text-arc">through cables.</span>
          </h2>

          <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-8">
            {/* Portrait, reassembled from slats of the original photograph */}
            <figure className="lg:col-span-5">
              <div data-slats className="relative aspect-[747/965] w-full overflow-hidden bg-ink" role="img" aria-label="Portrait of Hampus Lang.">
                {Array.from({ length: SLATS }).map((_, i) => (
                  <img
                    key={i}
                    data-slat
                    src={profile.portrait}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ clipPath: `inset(${(i / SLATS) * 100}% 0 ${100 - ((i + 1) / SLATS) * 100 - 0.2}% 0)` }}
                  />
                ))}
              </div>
              <figcaption className="label mt-4 flex justify-between text-ink/55">
                <span>Fig. 02 — Hampus Lang</span>
                <span>Swedish, in Tbilisi</span>
              </figcaption>
            </figure>

            <div className="flex flex-col justify-between gap-12 lg:col-span-6 lg:col-start-7">
              <div className="grid gap-6 text-[1.1rem] leading-relaxed text-ink/80 lg:text-[1.2rem]">
                <RevealText className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.02em] text-ink">
                  Before frontend I was a high-voltage electrician at Kraftringen, working on overhead and underground power lines,
                  transformers and cable.
                </RevealText>
                <RevealText>
                  Before that I worked in customer success at Visma, digital sales at Eniro, technical support and field service.
                  Different jobs with the same lesson: a system only matters if people can rely on it.
                </RevealText>
                <RevealText>
                  Now I build web products from Tbilisi, including my own subscription platform, while studying frontend development
                  at Noroff. I bring the electrician's habits with me: structured problem-solving, respect for
                  safety standards, and plain communication.
                </RevealText>
              </div>

              <dl className="grid grid-cols-3 gap-4 border-t border-ink/15 pt-6">
                {languages.map((l) => (
                  <div key={l.name}>
                    <dt className="label text-ink/55">{l.name}</dt>
                    <dd className="serif-i mt-1 text-2xl">{l.level}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-28 lg:mt-40">
            <p className="label mb-10 text-ink/55">The route here</p>
            <ol data-timeline className="relative">
              <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-0 w-px bg-ink/15" />
              <span data-wire aria-hidden="true" className="absolute bottom-0 left-[5px] top-0 w-px origin-top bg-arc" />
              {timeline.map((t) => (
                <li
                  key={t.years}
                  data-stop
                  className="relative grid grid-cols-[auto_1fr] gap-x-6 border-b border-ink/10 py-6 pl-0 lg:grid-cols-12 lg:items-baseline lg:py-8"
                >
                  <span
                    data-node
                    aria-hidden="true"
                    className={`relative z-10 mt-2 block h-[11px] w-[11px] rounded-full border border-ink/40 bg-paper lg:col-span-1 lg:mt-0 ${t.current ? "scale-100" : "scale-75"}`}
                  />
                  <span data-row className="label text-ink/55 lg:col-span-2">
                    {t.years}
                  </span>
                  <span
                    data-row
                    className={`col-start-2 font-display text-[clamp(1.6rem,3.6vw,3.4rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] [font-variation-settings:'wdth'_80] lg:col-span-5 lg:col-start-auto ${t.current ? "text-arc" : ""}`}
                  >
                    {t.title}
                  </span>
                  <span data-row className="serif-i col-start-2 mt-1 text-xl text-ink/70 lg:col-span-4 lg:col-start-auto lg:mt-0 lg:text-right lg:text-2xl">
                    {t.place}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
