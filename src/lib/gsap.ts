import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, useGSAP);

/**
 * Motion system. Every animation in the site draws from these values so
 * timing feels like one hand made it.
 */
export const ease = {
  /** Reveals: fast start, long settle. */
  out: "expo.out",
  /** Scene changes, curtains, menu. */
  inOut: "power4.inOut",
  /** Small UI responses. */
  soft: "power3.out",
} as const;

export const dur = {
  quick: 0.45,
  base: 0.9,
  slow: 1.4,
} as const;

/** matchMedia conditions shared by all components. */
export const mq = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px)",
  finePointer: "(hover: hover) and (pointer: fine)",
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(mq.reduce).matches;

/** Scroll to an in-page target, through ScrollSmoother when it is active. */
export const scrollToTarget = (selector: string) => {
  const smoother = ScrollSmoother.get();
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;
  if (smoother) smoother.scrollTo(el, true, "top top");
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  // Move focus for keyboard and screen-reader users without a second jump.
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
};

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, useGSAP };
