import { useRef } from "react";
import { gsap, useGSAP, ease, mq, scrollToTarget } from "@/lib/gsap";
import { profile } from "@/data/profile";

const lines = [
  { text: "Let's build", serif: false },
  { text: "something", serif: true },
  { text: "that holds.", serif: false },
];

const Contact = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motion, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: "[data-headline]", start: "top 75%", once: true } })
          .from("[data-line] > span", { yPercent: 110, duration: 1.3, ease: ease.out, stagger: 0.1 })
          .fromTo("[data-line]", { "--wdth": 125 }, { "--wdth": (i) => (i === 1 ? 100 : 82), duration: 1.6, ease: ease.out, stagger: 0.1 }, 0)
          .from("[data-cta]", { y: 30, opacity: 0, duration: 0.9, ease: ease.out, stagger: 0.08 }, 0.5);

        // The headline drifts up into the footer as the page ends.
        gsap.to("[data-headline]", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true },
        });
      });

      // Magnetic pull on the primary links.
      mm.add(`${mq.motion} and ${mq.finePointer}`, () => {
        const cleanups = gsap.utils.toArray<HTMLElement>("[data-magnetic]").map((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
          const strength = Number(el.dataset.magnetic) || 0.3;
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * strength);
            yTo((e.clientY - (r.top + r.height / 2)) * strength);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          return () => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          };
        });
        return () => cleanups.forEach((c) => c());
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t hairline">
      <div className="gutter pb-16 pt-28 lg:pt-40">
        <div className="mb-16 flex items-center gap-4 lg:mb-24">
          <span className="h-px w-10 bg-arc" />
          <p className="label text-mute">Contact</p>
        </div>

        <h2 id="contact-title" data-headline className="display text-[17.5vw] leading-[0.8] lg:text-[13.5vw]">
          {lines.map((l, i) => (
            <span
              key={l.text}
              data-line
              className={`block overflow-hidden pb-[0.05em] ${i === 1 ? "pl-[8vw]" : ""} ${i === 2 ? "text-right" : ""}`}
              style={{ "--wdth": i === 1 ? 100 : 82 } as React.CSSProperties}
            >
              <span className={`inline-block ${l.serif ? "serif-i text-arc" : ""}`}>{l.text}</span>
            </span>
          ))}
        </h2>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p data-cta className="label mb-4 text-mute">
              Projects, roles, or just a hello
            </p>
            <a
              data-cta
              data-magnetic="0.15"
              href={`mailto:${profile.email}`}
              className="serif-i inline-block break-all text-[clamp(2.1rem,6vw,5.5rem)] leading-none text-paper transition-colors duration-500 hover:text-arc"
            >
              <span className="wipe pb-1">{profile.email}</span>
            </a>
          </div>

          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <a
              data-cta
              data-magnetic="0.3"
              href={profile.cv}
              download="Hampus-Lang-CV.pdf"
              className="label inline-flex min-h-[52px] items-center gap-3 bg-arc px-6 text-ink transition-colors duration-500 hover:bg-paper"
            >
              Download CV <span aria-hidden="true">↓</span>
            </a>
            {profile.socials.map((s) => (
              <a
                key={s.href}
                data-cta
                data-magnetic="0.3"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label inline-flex min-h-[52px] items-center gap-3 border border-paper/25 px-6 transition-colors duration-500 hover:border-paper hover:bg-paper hover:text-ink"
              >
                {s.label} <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer className="gutter flex flex-col gap-4 border-t hairline py-6 label text-mute md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} Hampus Lang</span>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget("#top");
          }}
          className="wipe w-fit pb-0.5 hover:text-paper"
        >
          Back to top ↑
        </a>
      </footer>
    </section>
  );
};

export default Contact;
