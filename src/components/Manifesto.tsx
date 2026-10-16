import { Fragment, useRef } from "react";
import { asset } from "@/lib/asset";
import { gsap, useGSAP, mq } from "@/lib/gsap";
import { profile } from "@/data/profile";

type Chunk = string | { img: string; alt: string; pos: string; wide?: boolean };

// The statement, with two real image fragments set inline like type.
const statement: Chunk[] = [
  "For three years I built and maintained power lines across southern Sweden.",
  { img: profile.portrait, alt: "", pos: "50% 38%" },
  "Now I build for the web,",
  { img: asset("/assets/optimized/georgianlanguage-800.webp"), alt: "", pos: "50% 35%", wide: true },
  "with the same habit of checking every connection twice. Things should work under load, read clearly, and hold up long after launch.",
];

const Manifesto = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motion, () => {
        // Each word charges up as the reader passes it.
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: "[data-statement]", start: "top 78%", end: "bottom 45%", scrub: true },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-chip]").forEach((chip) => {
          gsap.fromTo(
            chip,
            { clipPath: "inset(0 50% 0 50%)" },
            {
              clipPath: "inset(0 0% 0 0%)",
              ease: "none",
              scrollTrigger: { trigger: chip, start: "top 85%", end: "top 55%", scrub: true },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="manifesto-label" className="gutter relative py-[22vh]">
      <div className="mb-12 flex items-center gap-4 lg:mb-16">
        <span className="h-px w-10 bg-arc" />
        <h2 id="manifesto-label" className="label text-mute">
          The short version
        </h2>
      </div>

      <p
        data-statement
        className="max-w-[22ch] font-display text-[clamp(2rem,5.6vw,6.2rem)] font-medium leading-[1.02] tracking-[-0.03em] lg:max-w-[27ch]"
        style={{ fontVariationSettings: '"wdth" 88' }}
      >
        {statement.map((chunk, i) =>
          typeof chunk === "string" ? (
            <Fragment key={i}>
              {chunk.split(" ").map((w, j) => (
                <Fragment key={j}>
                  <span data-word className="inline-block">
                    {w}
                  </span>{" "}
                </Fragment>
              ))}
            </Fragment>
          ) : (
            <Fragment key={i}>
              <span
                data-chip
                aria-hidden="true"
                className={`relative inline-block h-[0.78em] translate-y-[0.08em] overflow-hidden align-baseline ${
                  chunk.wide ? "w-[2.2em]" : "w-[1.2em]"
                }`}
              >
                <img src={chunk.img} alt={chunk.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: chunk.pos }} />
              </span>{" "}
            </Fragment>
          ),
        )}
      </p>
    </section>
  );
};

export default Manifesto;
