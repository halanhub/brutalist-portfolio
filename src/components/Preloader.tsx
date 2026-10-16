import { useRef, useState } from "react";
import { gsap, useGSAP, ease, prefersReducedMotion } from "@/lib/gsap";
import { profile } from "@/data/profile";

const SEEN_KEY = "hl-intro-seen";

const hasSeenIntro = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
};

const waitForPortrait = () =>
  new Promise<void>((resolve) => {
    const img = new Image();
    img.src = profile.portrait;
    if (typeof img.decode !== "function") return resolve();
    img.decode().then(() => resolve(), () => resolve());
  });

/**
 * A short "charging" sequence on the first visit of a session: a counter and
 * a live wire run to 100 while fonts and the portrait load, then the curtain
 * lifts into the hero. Skipped on repeat visits and with reduced motion.
 */
const Preloader = ({ onDone }: { onDone: () => void }) => {
  const root = useRef<HTMLDivElement>(null);
  const [skip] = useState(() => prefersReducedMotion() || hasSeenIntro());

  useGSAP(
    () => {
      if (skip) {
        onDone();
        return;
      }
      document.documentElement.style.overflow = "hidden";
      const count = { v: 0 };
      const counter = root.current!.querySelector<HTMLElement>("[data-count]")!;
      const ready = Promise.all([document.fonts?.ready, waitForPortrait()]);

      const tl = gsap.timeline();
      tl.from("[data-pre-label]", { yPercent: 100, duration: 0.8, ease: ease.out, stagger: 0.06 })
        .to(count, {
          v: 86,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: () => (counter.textContent = String(Math.round(count.v)).padStart(3, "0")),
        }, 0.1)
        .to("[data-wire]", { scaleX: 0.86, duration: 1.1, ease: "power2.inOut" }, 0.1)
        .addPause("+=0", () => {
          ready.then(() => tl.resume());
        })
        .to(count, {
          v: 100,
          duration: 0.35,
          ease: "power1.out",
          onUpdate: () => (counter.textContent = String(Math.round(count.v)).padStart(3, "0")),
        })
        .to("[data-wire]", { scaleX: 1, duration: 0.35, ease: "power1.out" }, "<")
        .to("[data-wire]", { backgroundColor: "rgb(255 79 26)", duration: 0.12, repeat: 1, yoyo: true })
        .to("[data-pre-label]", { yPercent: -100, duration: 0.6, ease: "power3.in", stagger: 0.03 }, "+=0.05")
        .add(() => {
          document.documentElement.style.overflow = "";
          try {
            sessionStorage.setItem(SEEN_KEY, "1");
          } catch {
            /* storage unavailable — intro will simply replay */
          }
          onDone();
        }, "-=0.15")
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: ease.inOut }, "<")
        .set(root.current, { display: "none" });

      return () => {
        document.documentElement.style.overflow = "";
      };
    },
    { scope: root },
  );

  if (skip) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[150] flex flex-col justify-between bg-ink text-paper gutter py-6"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="flex justify-between label text-mute">
        <span className="overflow-hidden">
          <span data-pre-label className="block">Hampus Lang</span>
        </span>
        <span className="overflow-hidden">
          <span data-pre-label className="block">Tbilisi — GE</span>
        </span>
      </div>

      <div>
        <div className="flex items-end justify-between gap-6">
          <span className="overflow-hidden">
            <span data-pre-label className="block label text-mute">Bringing the grid online</span>
          </span>
          <span className="overflow-hidden">
            <span data-pre-label data-count className="block display text-[22vw] md:text-[13vw] tabular-nums">
              000
            </span>
          </span>
        </div>
        <div className="mt-4 h-px w-full bg-paper/15">
          <div data-wire className="h-px w-full origin-left bg-paper" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
